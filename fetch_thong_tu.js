import fs from 'fs';
import https from 'https';

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            // Need to set encoding to utf-8 properly
            res.setEncoding('utf8');
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function decodeHtml(html) {
    return html.replace(/&nbsp;/g, ' ')
               .replace(/&quot;/g, '"')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&amp;/g, '&')
               .replace(/&#160;/g, ' ');
}

async function run() {
    try {
        console.log("Fetching URL...");
        const html = await fetchUrl("https://vbpl.vn/botaichinh/Pages/vbpq-toanvan.aspx?ItemID=46368");
        
        let mainHtml = html;
        const contentMatch = html.match(/<div class="toanvancontent"[^>]*>([\s\S]*?)<\/div>\s*<div class="tailieu"/);
        if(contentMatch) {
            mainHtml = contentMatch[1];
        } else {
            // Fallback
            const contentFallback = html.match(/<div class="item fulltext"[^>]*>([\s\S]*?)<\/div><div/);
            if(contentFallback) mainHtml = contentFallback[1];
        }

        // Strip scripts and styles
        mainHtml = mainHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        mainHtml = mainHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

        const pRegex = /<[p|div][^>]*>([\s\S]*?)<\/[p|div]>/g;
        let pMatch;
        let paragraphs = [];
        
        while ((pMatch = pRegex.exec(mainHtml)) !== null) {
            let text = pMatch[1].replace(/<br\s*\/?>/gi, '\n'); 
            text = text.replace(/<[^>]+>/g, '').trim();
            text = decodeHtml(text);
            
            const lines = text.split('\n').map(l => l.trim().replace(/\s+/g, ' ')).filter(l => l);
            paragraphs.push(...lines);
        }

        // Clean out footer signatures and other junk
        let startIndex = paragraphs.findIndex(p => p.includes('CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM') || p.includes('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'));
        if (startIndex === -1) {
            startIndex = paragraphs.findIndex(p => /^Căn cứ/i.test(p) || /THÔNG TƯ/i.test(p));
        }
        if (startIndex === -1) startIndex = 0;
        
        // Find end of document
        let endIndex = paragraphs.findIndex((p, i) => i > startIndex && p.includes('Đỗ Hoàng Anh Tuấn'));
        if (endIndex === -1) {
            endIndex = paragraphs.length - 1;
        } else {
            endIndex = endIndex + 1; // Include the name
        }

        const validParagraphs = paragraphs.slice(startIndex, endIndex + 1);
        const content = [];
        let idCounter = 1;

        for (let p of validParagraphs) {
            // Final strip
            p = p.replace(/\t/g, ' ').replace(/\s+/g, ' ').trim();
            
            if(!p || p === '_' || p.startsWith('___') || p.startsWith('***')) continue;
            // Ignore common footer buttons/labels
            if(['CSDL quốc gia về VBPL »', 'CSDL Bộ Tài chính »', 'Văn bản pháp luật »', 'Thông tư 78/2014/TT-BTC', 'Toàn văn', 'Thuộc tính', 'Lịch sử', 'VB liên quan', 'Lược đồ', 'Bản PDF', 'VB hợp nhất', 'Tải về', 'Bản in', 'Hiệu lực:', 'Ngày có hiệu lực:', 'Hết hiệu lực một phần', 'Ngày hết hiệu lực:', 'BỘ TÀI CHÍNH'].includes(p)) continue;
            // Ignore some typical UI junk
            if(p.includes('urlLists =') || p.includes('$(document)')) continue;
            
            if (/^Căn cứ /i.test(p) || /^Theo đề nghị/i.test(p)) {
                content.push({ id: `cancu_${idCounter++}`, type: 'cancu', text: p });
            }
            else if (/^BỘ TRƯỞNG.*QUY ĐỊNH|^BỘ TRƯỞNG.*THÔNG TƯ/i.test(p)) {
                content.push({ id: `quyetdinh_${idCounter++}`, type: 'quyetdinh', text: p });
            }
            else if (/^Chương [IVXLCDM]+$/i.test(p) || /^Chương [IVXLCDM]+\s/i.test(p)) {
                content.push({ id: `chuong_${idCounter++}`, type: 'chuong', label: p, text: '' });
            }
            else if (/^Điều \d+\./i.test(p)) {
                 const match = p.match(/^(Điều \d+\.)\s*(.*)/);
                 if (match) {
                     content.push({ id: `dieu_${idCounter++}`, type: 'dieu', label: match[1], text: match[2] });
                 } else {
                     content.push({ id: `dieu_${idCounter++}`, type: 'dieu', label: p, text: '' });
                 }
            }
            else if (/^\d+\.\s/.test(p)) {
                const match = p.match(/^(\d+\.)\s*(.*)/);
                 if (match) {
                     content.push({ id: `khoan_${idCounter++}`, type: 'khoan', label: match[1], text: match[2] });
                 } else {
                     content.push({ id: `khoan_${idCounter++}`, type: 'khoan', label: '', text: p });
                 }
            }
            else {
                if (content.length > 0 && content[content.length - 1].type === 'chuong' && !content[content.length - 1].text) {
                    content[content.length - 1].text = p;
                } else {
                    content.push({ id: `text_${idCounter++}`, type: 'text', text: p });
                }
            }
        }
        
        const dir = 'd:/CPLQG/CPLQG-Template/src/data';
        const fileContent = `export const THONG_TU_78_CONTENT = ${JSON.stringify(content, null, 4)};\n`;
        fs.writeFileSync(dir + '/thongTu78.js', fileContent, 'utf-8');
        console.log("Successfully wrote data to src/data/thongTu78.js");

    } catch(err) {
        console.error(err);
    }
}

run();

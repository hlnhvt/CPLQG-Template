import fs from 'fs';
import path from 'path';

function run() {
    try {
        const txtPath = 'd:/CPLQG/CPLQG-Template/public/78.2014.TT.BTC.txt';
        const fileData = fs.readFileSync(txtPath, 'utf8');

        const lines = fileData.split(/\r?\n/).map(l => l.trim().replace(/\s+/g, ' ')).filter(l => l);

        const content = [];
        let idCounter = 1;

        // Start exactly at 'Căn cứ'
        let startIndex = lines.findIndex(p => p.startsWith('Căn cứ'));
        if (startIndex === -1) startIndex = 0;

        // End exactly before 'Nơi nhận:'
        let endIndex = lines.findIndex((p, i) => i > startIndex && p.includes('Nơi nhận'));
        if (endIndex === -1) endIndex = lines.length - 1;
        else endIndex = endIndex - 1;

        const validLines = lines.slice(startIndex, endIndex + 1);

        for (let p of validLines) {
            if (/^\d+$/.test(p)) continue; // ignore pagination numbers
            
            p = p.replace(/\t/g, ' ').replace(/\s+/g, ' ').trim();
            if(!p || p === '_' || p.startsWith('___') || p.startsWith('***')) continue;
            
            if (/^Căn cứ /i.test(p)) {
                 content.push({ id: `cancu_${idCounter++}`, type: 'cancu', text: p });
            }
            else if (/^Xét đề nghị/i.test(p) || /^Theo đề nghị/i.test(p)) {
                 content.push({ id: `quyetdinh_${idCounter++}`, type: 'quyetdinh', text: p });
            }
            else if (/^Chương\s+[IVXLCDM]+\.*/i.test(p)) {
                 const match = p.match(/^(Chương\s+[IVXLCDM]+\.*)\s*(.*)/i);
                 let label = p; let text = '';
                 if (match) {
                     label = match[1];
                     text = match[2] || '';
                 }
                 content.push({ id: `chuong_${idCounter++}`, type: 'chuong', label: label, text: text });
            }
            else if (/^Điều \d+\./i.test(p)) {
                 const match = p.match(/^(Điều \d+\.)\s*(.*)/);
                 if (match) {
                     content.push({ id: `dieu_${idCounter++}`, type: 'dieu', label: match[1], text: match[2] });
                 } else {
                     content.push({ id: `dieu_${idCounter++}`, type: 'dieu', label: p, text: '' });
                 }
            }
            else if (/^\d+\.\s/.test(p) || /^[a-z]\)\s/.test(p) || /^- /.test(p)) {
                 // if it is a list item like a), b), c) or - it's also just text but can be mapped to khoan or text.
                 // We will map "1. " to khoan, and "a) " or "- " to text.
                 const match = p.match(/^(\d+\.)\s*(.*)/);
                 if (match) {
                     content.push({ id: `khoan_${idCounter++}`, type: 'khoan', label: match[1], text: match[2] });
                 } else {
                     content.push({ id: `text_${idCounter++}`, type: 'text', text: p });
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
        const jsContent = `export const THONG_TU_78_CONTENT = ${JSON.stringify(content, null, 4)};\n`;
        fs.writeFileSync(path.join(dir, 'thongTu78.js'), jsContent, 'utf-8');
        console.log("Successfully converted from doc to src/data/thongTu78.js. Extracted", content.length, "blocks.");

    } catch(err) {
        console.error("Error occurred:", err);
    }
}

run();

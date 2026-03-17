import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srsDir = path.join(__dirname, 'SRS');

const dataTypeDictionary = [
    {regex: /văn bản chỉ đọc/i, repl: "Text (readonly)"},
    {regex: /văn bản/i, repl: "Text"},
    {regex: /nút radio/i, repl: "Radio button"},
    {regex: /nút/i, repl: "Button"},
    {regex: /danh sách thả xuống/i, repl: "Dropdown"},
    {regex: /hộp thoại/i, repl: "Modal"},
    {regex: /liên kết/i, repl: "Link"},
    {regex: /ngày tháng/i, repl: "Date picker"},
    {regex: /hình ảnh/i, repl: "Image"},
    {regex: /tải lên/i, repl: "File upload"},
    {regex: /đa lựa chọn/i, repl: "Multi-select"},
    {regex: /hộp kiểm/i, repl: "Checkbox"},
    {regex: /nhãn/i, repl: "Badge"},
    {regex: /trạng thái/i, repl: "Status badge"}
];

const descriptionDictionary = [
    {regex: /\binline edit\b/gi, repl: "chỉnh sửa trực tiếp"},
    {regex: /\binline error message\b/gi, repl: "thông báo lỗi trực tiếp"},
    {regex: /\binline\b/gi, repl: "trực tiếp"},
    {regex: /\bdialog\b/gi, repl: "hộp thoại"},
    {regex: /\bmodal\b/gi, repl: "hộp thoại"},
    {regex: /\bdropdown\b/gi, repl: "danh sách thả xuống"},
    {regex: /\bcheckbox\b/gi, repl: "hộp kiểm"},
    {regex: /\bradio button\b/gi, repl: "nút chọn"},
    {regex: /\bbutton\b/gi, repl: "nút"},
    {regex: /\banchor link\b/gi, repl: "liên kết neo"},
    {regex: /\blink\b/gi, repl: "liên kết"},
    {regex: /\bbadge\b/gi, repl: "nhãn"},
    {regex: /\btext input\b/gi, repl: "ô nhập văn bản"},
    {regex: /\bdate picker\b/gi, repl: "bộ chọn ngày"},
    {regex: /\btoast\b/gi, repl: "thông báo nhỏ"},
    {regex: /\bprogress bar\b/gi, repl: "thanh tiến trình"},
    {regex: /\bsidebar\b/gi, repl: "thanh bên"},
    {regex: /\bheader\b/gi, repl: "phần đầu trang"},
    {regex: /\bfooter\b/gi, repl: "phần cuối trang"},
    {regex: /\blayout\b/gi, repl: "bố cục"},
    {regex: /\bsection\b/gi, repl: "phần"},
    {regex: /\bhover\b/gi, repl: "rê chuột"},
    {regex: /\bscroll\b/gi, repl: "cuộn trang"},
    {regex: /\bview mode\b/gi, repl: "chế độ xem"},
    {regex: /\bedit mode\b/gi, repl: "chế độ chỉnh sửa"},
    {regex: /\bprimary\b/gi, repl: "chính"},
    {regex: /\bsecondary\b/gi, repl: "phụ"},
    {regex: /\bvalidate\b/gi, repl: "kiểm tra tính hợp lệ"},
    {regex: /\bcover image\b/gi, repl: "ảnh bìa"},
    {regex: /\bavatar\b/gi, repl: "ảnh đại diện"},
    {regex: /\bcircular progress\b/gi, repl: "tiến trình dạng vòng"},
    {regex: /\bsticky header\b/gi, repl: "phần đầu trang cố định"},
    {regex: /\bsticky bar\b/gi, repl: "thanh cố định"},
    {regex: /\bbadge\b/gi, repl: "nhãn"},
    {regex: /\bbackground\b/gi, repl: "màu nền"},
    {regex: /\bicon\b/gi, repl: "biểu tượng"},
    {regex: /\btool\b/gi, repl: "công cụ"},
    {regex: /\bform\b/gi, repl: "biểu mẫu"},
    {regex: /\btop header\b/gi, repl: "phần trên cùng"},
    {regex: /\bcover\b/gi, repl: "ảnh bìa"},
    {regex: /\bcollapse\b/gi, repl: "thu gọn"},
    {regex: /\bexpand\b/gi, repl: "mở rộng"},
    {regex: /\bmessage\b/gi, repl: "thông báo"}
];

function translateDataType(dataType) {
    let lowerObj = dataType.trim();
    for (const item of dataTypeDictionary) {
        if (item.regex.test(lowerObj)) {
             lowerObj = lowerObj.replace(item.regex, item.repl);
        }
    }
    return lowerObj;
}

function translateDescription(desc) {
    let text = desc;
    for (const item of descriptionDictionary) {
        text = text.replace(item.regex, item.repl);
    }
    // Also capitalize the first letter of the sentence if it was modified at the start
    return text;
}

function processMarkdown(content) {
    let lines = content.split('\n');
    let output = [];
    let skipMode = false;

    let inTable = false;
    let descColumnIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].replace('\r', '');

        // 1. Remove "Thông tin tham chiếu" block
        if (/^#+\s*(Thông tin tham chiếu|Tham chiếu)/i.test(line)) {
            skipMode = true;
            continue;
        }
        if (skipMode && (line.match(/^#+\s+[^\s]/) || line.match(/^---/))) {
            skipMode = false;
        } else if (skipMode) {
            continue;
        }

        // 2. Remove "Thông tin UC" from the line entirely if it's there and Not in a table
        if (/thông tin UC/i.test(line) && !line.startsWith('|')) {
            continue;
        }

        // 3. Process tables
        if (line.trim().startsWith('|')) {
            if (!inTable) {
                inTable = true;
            }
            let cells = line.split('|');
            
            // Identify header row
            if (line.includes('Trường thông tin') || line.includes('Tên chức năng')) {
                // Find the index of the "Mô tả" column
                descColumnIndex = cells.findIndex(c => c.trim().toLowerCase() === 'mô tả');
            } else if (!line.includes('| --- |')) {
                // It's a data row
                
                // Translate Data Type column (index 2 usually for Trường thông tin)
                if (cells.length >= 6 && cells[2]) {
                    // Make sure it's the Kiểu dữ liệu column by checking if it's the 2nd column in a 5-column table (indices 1 to 5)
                    // The "Trường thông tin" table has headers: Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả
                    // indices: 0:empty, 1:Trường thông tin, 2:Kiểu dữ liệu, 3:Bắt buộc, 4:Mặc định, 5:Mô tả, 6:empty
                    let kiemDuLieu = cells[2].trim();
                    let translated = translateDataType(kiemDuLieu);
                    if (kiemDuLieu !== translated) {
                        cells[2] = ' ' + translated + ' ';
                    }
                }

                // Translate Description column
                if (descColumnIndex !== -1 && cells.length > descColumnIndex) {
                    let desc = cells[descColumnIndex];
                    let translatedDesc = translateDescription(desc);
                    if (desc !== translatedDesc) {
                        cells[descColumnIndex] = translatedDesc;
                    }
                }
                
                line = cells.join('|');
            }
        } else {
            if (inTable) {
                inTable = false;
                descColumnIndex = -1;
            }
            
            // Translate outside tables as well if needed, but the prompt says "hạn chế tiếng anh nhất có thể trong các cột Mô tả của tài liệu". We will also loosely translate regular text just in case.
            if (line.trim() !== '' && !line.startsWith('#') && !line.startsWith('![')) {
                line = translateDescription(line);
            }
        }
        
        output.push(line);
    }
    return output.join('\n');
}

try {
    const files = fs.readdirSync(srsDir);
    let count = 0;
    files.forEach(file => {
        let match = file.match(/^(\d+)\./);
        if (match) {
            let num = parseInt(match[1]);
            if (num >= 187 && num <= 217) {
                let filePath = path.join(srsDir, file);
                let content = fs.readFileSync(filePath, 'utf8');
                let newContent = processMarkdown(content);
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    count++;
                }
            }
        }
    });
    console.log(`Processed ${count} files successfully.`);
} catch (err) {
    console.error(err);
}

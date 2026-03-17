import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srsDir = path.join(__dirname, 'SRS');

const dictionary = [
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

function translateDataType(dataType) {
    let lowerObj = dataType.trim();
    for (const item of dictionary) {
        if (item.regex.test(lowerObj)) {
             lowerObj = lowerObj.replace(item.regex, item.repl);
        }
    }
    return lowerObj;
}

function processMarkdown(content) {
    let lines = content.split('\n');
    let output = [];
    let skipMode = false;

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

        // 3. Translate Data Type in Markdown tables
        if (line.trim().startsWith('|')) {
            let cells = line.split('|');
            // If it's the header or separator, skip translation
            if (!line.includes('| --- |') && !line.includes('Trường thông tin') && cells.length >= 6) {
                let kiemDuLieu = cells[2].trim();
                let translated = translateDataType(kiemDuLieu);
                // check if it was changed
                if (kiemDuLieu !== translated) {
                    cells[2] = ' ' + translated + ' ';
                    line = cells.join('|');
                }
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

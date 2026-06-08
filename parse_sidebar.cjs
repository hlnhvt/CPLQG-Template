const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\nhanhl2\\.gemini\\antigravity-ide\\brain\\e747a05e-d494-4f74-bd56-dbcdcf7a9452\\.system_generated\\steps\\1258\\content.md', 'utf8');

const items = [];
const itemRegex = /<a[^>]*class="[^"]*menu-item[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
while ((match = itemRegex.exec(data)) !== null) {
    const html = match[1];
    const text = html.replace(/<[^>]+>/g, '').trim();
    if (text) {
        items.push(text);
    }
}
console.log(JSON.stringify(items, null, 2));

const sectionsRegex = /<div class="menu-section-title">([\s\S]*?)<\/div>([\s\S]*?)(?=<div class="menu-section-title">|$)/gi;
let secMatch;
const sections = [];
while ((secMatch = sectionsRegex.exec(data)) !== null) {
    const title = secMatch[1].replace(/<[^>]+>/g, '').trim();
    const contentHtml = secMatch[2];
    const subItems = [];
    let subMatch;
    while ((subMatch = itemRegex.exec(contentHtml)) !== null) {
        subItems.push(subMatch[1].replace(/<[^>]+>/g, '').trim());
    }
    sections.push({ title, subItems });
}
console.log("Sections:", JSON.stringify(sections, null, 2));

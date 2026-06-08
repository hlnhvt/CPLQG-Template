const fs = require('fs');
const data = fs.readFileSync('C:\\Users\\nhanhl2\\.gemini\\antigravity-ide\\brain\\e747a05e-d494-4f74-bd56-dbcdcf7a9452\\.system_generated\\steps\\1258\\content.md', 'utf8');

const navRegex = /<ul[^>]*class="[^"]*main-nav-menu[^"]*"[^>]*>([\s\S]*?)<\/ul>/i;
const match = data.match(navRegex);
if (!match) {
    console.log("No main-nav-menu found");
    return;
}

const items = [];
const itemRegex = /<li[^>]*class="[^"]*main-nav-item[^"]*"[^>]*>([\s\S]*?)<\/li>(?=\s*<li|\s*$)/gi;
let itemMatch;
while ((itemMatch = itemRegex.exec(match[1])) !== null) {
    const itemHtml = itemMatch[1];
    const labelMatch = itemHtml.match(/<a[^>]*class="[^"]*main-nav-link[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    if (labelMatch) {
        const labelText = labelMatch[1].replace(/<[^>]+>/g, '').trim();
        const label = labelText.replace(/▼/g, '').trim();
        
        const subItems = [];
        const subItemRegex = /<a[^>]*class="[^"]*(mega-dropdown-item|dropdown-item)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
        let subMatch;
        while ((subMatch = subItemRegex.exec(itemHtml)) !== null) {
            subItems.push(subMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        if (label) items.push({ label, subItems });
    }
}
console.log(JSON.stringify(items, null, 2));

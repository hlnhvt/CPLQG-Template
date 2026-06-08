const fs = require('fs');
const data = fs.readFileSync('C:\\Users\\nhanhl2\\.gemini\\antigravity-ide\\brain\\e747a05e-d494-4f74-bd56-dbcdcf7a9452\\.system_generated\\steps\\1258\\content.md', 'utf8');

const sidebarRegex = /<div[^>]*class="[^"]*sidebar[^"]*"[^>]*>([\s\S]*?)<\/div>(?=\s*<div class="main-content")/i;
const match = data.match(sidebarRegex);
if (match) {
    console.log(match[1]);
} else {
    // Just find any ul that has menu items in it, maybe the user means something else
    console.log("No sidebar found");
}

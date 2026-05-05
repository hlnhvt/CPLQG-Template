const fs = require('fs');
const content = fs.readFileSync('d:/CPLQG/CPLQG-Template/src/pages/HienKeNoiBatV2Page.jsx', 'utf8');
try {
    // Basic check for balanced braces and parens
    let braces = 0;
    let parens = 0;
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '{') braces++;
        if (content[i] === '}') braces--;
        if (content[i] === '(') parens++;
        if (content[i] === ')') parens--;
    }
    console.log(`Braces: ${braces}, Parens: ${parens}`);
    
    // Simple check for unclosed div tags (very naive)
    const openDivs = (content.match(/<div(?![^>]*\/>)[^>]*>/g) || []).length;
    const closeDivs = (content.match(/<\/div>/g) || []).length;
    console.log(`Open Divs: ${openDivs}, Close Divs: ${closeDivs}`);
} catch (e) {
    console.log(e);
}

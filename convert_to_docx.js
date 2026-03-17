import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srsDir = path.join(__dirname, 'SRS');
const docxDir = path.join(__dirname, 'docx');
const originalScriptPath = path.join(__dirname, 'promt', 'md-to-docx.js');
const scriptPath = path.join(__dirname, 'promt', 'md-to-docx.cjs');

// Copy .js to .cjs to force Node to treat it as CommonJS
fs.copyFileSync(originalScriptPath, scriptPath);

if (!fs.existsSync(docxDir)) {
    fs.mkdirSync(docxDir, { recursive: true });
}

let count = 0;
const files = fs.readdirSync(srsDir);
files.forEach(file => {
    let match = file.match(/^(\d+)\./);
    if (match) {
        let num = parseInt(match[1]);
        if (num >= 85 && num <= 94 && file.endsWith('.md')) {
            const inputPath = path.join(srsDir, file);
            const outFileName = file.replace(/\.md$/, '.docx');
            const outputPath = path.join(docxDir, outFileName);
            
            try {
                // Execute the .cjs version
                execSync(`node "${scriptPath}" "${inputPath}" "${outputPath}"`);
                count++;
            } catch (err) {
                console.error(`Error converting ${file}:`, err.message);
                if (err.stdout) console.log(err.stdout.toString());
                if (err.stderr) console.error(err.stderr.toString());
            }
        }
    }
});

// Clean up
fs.unlinkSync(scriptPath);

console.log(`Successfully converted ${count} files.`);

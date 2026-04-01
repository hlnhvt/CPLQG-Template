const fs = require('fs');

let code = fs.readFileSync('d:/CPLQG/CPLQG-Template/src/pages/forum/LivestreamEventPage.jsx', 'utf-8');
const newStructureTemplate = fs.readFileSync('d:/CPLQG/CPLQG-Template/tmp/new_structure.txt', 'utf-8');

// 1. Add mainTab state
if (code.includes("const [activeTab, setActiveTab] = useState('chat');")) {
    code = code.replace(
        "const [activeTab, setActiveTab] = useState('chat');",
        "const [mainTab, setMainTab] = useState('info');\n    const [activeTab, setActiveTab] = useState('chat');"
    );
}

// 2. Extract Event Info Block
const blockStart = "                            {/* Block 2: Event Info Tabs & Content */}";
const blockEndStr = "                            </div>\n                        </div>\n\n                        {/* Right Column";

const eventBlockIdx = code.indexOf(blockStart);
const eventBlockEndIdx = code.indexOf(blockEndStr);

if (eventBlockIdx === -1 || eventBlockEndIdx === -1) {
    console.error("Could not find Event Info Block. Indices:", eventBlockIdx, eventBlockEndIdx);
    process.exit(1);
}

// Extract block and add missing closing div for the extracted content itself since we'll wrap it
const eventBlockCode = code.substring(eventBlockIdx, eventBlockEndIdx + "                            </div>\n".length);

// Remove the event info block from its original location
code = code.slice(0, eventBlockIdx) + "                        </div>\n\n                        {/* Right Column" + code.slice(eventBlockEndIdx + blockEndStr.length);

// 3. Form the new structure by injecting the block
const newStructure = newStructureTemplate.replace("__EVENT_BLOCK_PLACEHOLDER__", eventBlockCode.replace(/                            /g, '                            '));

// 4. Inject into the main React tree
code = code.replace("                {!isRegistered ? (", newStructure);

// 5. Close the bracket at the end of the file
// Find the exact place to close the bracket: right before `            </div>\n            {/* Custom scrollbar styles`
code = code.replace(
    "                )}\n            </div>\n            {/* Custom scrollbar styles",
    "                )}\n                )}\n            </div>\n            {/* Custom scrollbar styles"
);

fs.writeFileSync('d:/CPLQG/CPLQG-Template/src/pages/forum/LivestreamEventPage.jsx', code);
console.log("Refactoring complete.");

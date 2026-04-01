const fs = require('fs');
let code = fs.readFileSync('d:/CPLQG/CPLQG-Template/src/pages/forum/LivestreamEventPage.jsx', 'utf-8');

// 1. Add mainTab state
code = code.replace(
    "const [activeTab, setActiveTab] = useState('chat');",
    "const [mainTab, setMainTab] = useState('info'); // info, livestream\n    const [activeTab, setActiveTab] = useState('chat');"
);

// 2. Extract Event Info Block
const blockStart = "                            {/* Block 2: Event Info Tabs & Content */}";
const blockEnd = "                            </div>\n                        </div>\n\n                        {/* Right Column";
const eventBlockIdx = code.indexOf(blockStart);
const eventBlockEndIdx = code.indexOf(blockEnd);

if (eventBlockIdx === -1 || eventBlockEndIdx === -1) {
    console.error("Could not find Event Info Block. Indices:", eventBlockIdx, eventBlockEndIdx);
    process.exit(1);
}

// Extract block and add missing closing div for the extracted content itself since we'll wrap it
const eventBlockCode = code.substring(eventBlockIdx, eventBlockEndIdx + "                            </div>\n".length);

// Remove the event info block from its original location
code = code.slice(0, eventBlockIdx) + "                        </div>\n\n                        {/* Right Column" + code.slice(eventBlockEndIdx + blockEnd.length);

// 3. Insert Main Tabs & new structure
const newStructure = `                {/* Main Event Tabs */}
                <div className={\`flex border-b mb-6 \${highContrast ? 'border-gray-200' : 'border-gray-800'}\`}>
                    <button
                        onClick={() => setMainTab('info')}
                        className={\`py-3 px-6 md:px-8 text-[15px] font-bold uppercase transition-colors border-b-4 \${mainTab === 'info' ? 'border-blue-500 text-blue-500' : \`border-transparent hover:text-gray-400 \${highContrast ? 'text-gray-500' : 'text-gray-400'}\`}\`}
                    >Thông tin chung</button>
                    <button
                        onClick={() => setMainTab('livestream')}
                        className={\`py-3 px-6 md:px-8 text-[15px] font-bold uppercase transition-colors border-b-4 flex items-center gap-2 \${mainTab === 'livestream' ? 'border-blue-500 text-blue-500' : \`border-transparent hover:text-gray-400 \${highContrast ? 'text-gray-500' : 'text-gray-400'}\`}\`}
                    >
                        <PlayCircle size={18} /> Chi tiết buổi phát
                    </button>
                </div>

                {mainTab === 'info' && (
                    <div className="flex justify-center mb-10">
                        <div className="w-full lg:w-4/5 xl:w-3/4">
${eventBlockCode.replace(/                            /g, '                            ')}
                        </div>
                    </div>
                )}

                {mainTab === 'livestream' && (
                    !isRegistered ? (`;

code = code.replace("                {!isRegistered ? (", newStructure);

// 4. Close the mainTab === 'livestream' bracket at the end
code = code.replace(
    "                )}\n            </div>\n            {/* Custom scrollbar styles",
    "                )}\n                )}\n            </div>\n            {/* Custom scrollbar styles"
);

fs.writeFileSync('d:/CPLQG/CPLQG-Template/src/pages/forum/LivestreamEventPage.jsx', code);
console.log("Refactoring complete.");

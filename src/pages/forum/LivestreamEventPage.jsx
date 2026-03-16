import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Home, ChevronRight, PlayCircle, Users, Send, 
    ArrowUpCircle, BarChart2, CheckCircle, Clock, Info
} from 'lucide-react';

const LivestreamEventPage = () => {
    const [activeTab, setActiveTab] = useState('chat'); // chat, qa, poll, results
    const [chatInput, setChatInput] = useState('');
    
    // Auto scroll chat mock
    const chatMessages = [
        { id: 1, user: "Nguyễn V.", text: "Chào ban tổ chức và các chuyên gia.", role: "Cộng đồng", time: "09:00" },
        { id: 2, user: "BTC CPLQG", text: "Xin chào quý vị, buổi hội thảo sẽ bắt đầu trong ít phút nữa.", role: "Ban tổ chức", time: "09:05", isHost: true },
        { id: 3, user: "Trần H.", text: "Cho tôi hỏi tài liệu hội thảo có thể tải ở đâu ạ?", role: "Doanh nghiệp", time: "09:12" },
        { id: 4, user: "Luật sư L.", text: "Chào mọi người, rất vui được tham gia thảo luận.", role: "Luật sư", time: "09:15" },
    ];

    const questions = [
        { id: 1, user: "Lê A.", text: "Theo dự thảo mới, quy định về miễn thuế thu nhập doanh nghiệp đối với startup công nghệ có thay đổi gì không?", votes: 145, status: "answering" },
        { id: 2, user: "Phạm T.", text: "Cho hỏi nếu doanh nghiệp nước ngoài đầu tư vào lĩnh vực giáo dục thì tỷ lệ sở hữu tối đa là bao nhiêu?", votes: 89, status: "pending" },
        { id: 3, user: "Trần V.", text: "Xin giải thích rõ hơn về khái niệm 'nhà đầu tư chiến lược' trong luật hiện hành.", votes: 312, status: "answered" },
    ];

    return (
        <div className="bg-[#111827] min-h-screen pb-12 text-gray-200">
            {/* Breadcrumb - Dark Theme */}
            <div className="bg-[#1f2937] border-b border-gray-800 sticky top-0 z-30 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Link to="/" className="hover:text-blue-400"><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan" className="hover:text-blue-400">Diễn đàn</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-200 font-medium">Sự kiện Trực tuyến</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-6">
                <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
                    
                    {/* Left Column - Video Player & Info (70%) */}
                    <div className="w-full lg:w-8/12 xl:w-9/12 flex flex-col h-full bg-[#1f2937] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                        
                        {/* Video Area (Zoom SDK Placeholder) */}
                        <div className="w-full aspect-video bg-black relative flex flex-col items-center justify-center">
                            {/* Overlay UI elements */}
                            <div className="absolute top-4 left-4 z-10 flex gap-3">
                                <span className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded shadow-lg text-sm font-bold uppercase tracking-wider animate-pulse">
                                    <span className="w-2 h-2 bg-white rounded-full"></span> Trực tiếp
                                </span>
                                <span className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded shadow-lg text-sm font-medium">
                                    <Users size={16} /> 1,245
                                </span>
                            </div>

                            {/* Center placeholder */}
                            <PlayCircle size={64} className="text-white/20 mb-4" />
                            <p className="text-gray-400">Zoom Web SDK Container Overlay</p>
                            <p className="text-xs text-gray-500 mt-2">Đang kết nối đến phiên livestream...</p>
                        </div>

                        {/* Event Info */}
                        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Hội thảo trực tuyến: Góp ý Dự thảo Luật Doanh nghiệp sửa đổi</h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                                <span className="flex items-center gap-2 font-medium text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg">
                                    Cổng Pháp luật Quốc gia
                                </span>
                                <span className="flex items-center gap-2"><Clock size={16}/> 09:00 - 11:30 | 18/03/2026</span>
                            </div>

                            <div className="prose prose-invert max-w-none text-gray-300">
                                <p>Sự kiện thảo luận chuyên sâu lấy ý kiến đối với các nội dung trọng tâm trong Dự thảo Luật Doanh nghiệp (sửa đổi), với sự tham gia của đại diện Bộ Kế hoạch và Đầu tư, Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) và các chuyên gia kinh tế, luật sư.</p>
                                
                                <h3>Khách mời:</h3>
                                <ul>
                                    <li>Ông Phan Đức Hiếu - Ủy ban Kinh tế của Quốc hội</li>
                                    <li>Bà Viễn Thị B - Đại diện VCCI</li>
                                    <li>Luật sư Nguyễn C - Đoàn Luật sư TP. Hà Nội</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Interaction area (30%) */}
                    <div className="w-full lg:w-4/12 xl:w-3/12 flex flex-col h-full bg-[#1f2937] rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-800 bg-[#111827]">
                            <button 
                                onClick={() => setActiveTab('chat')} 
                                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'chat' ? 'border-blue-500 text-blue-400 bg-[#1f2937]' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                            >Live Chat</button>
                            <button 
                                onClick={() => setActiveTab('qa')} 
                                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'qa' ? 'border-blue-500 text-blue-400 bg-[#1f2937]' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                            >Câu hỏi (3)</button>
                            <button 
                                onClick={() => setActiveTab('poll')} 
                                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 relative ${activeTab === 'poll' ? 'border-blue-500 text-blue-400 bg-[#1f2937]' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                            >
                                Bình chọn
                                <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-0 bg-[#1f2937]">
                            {activeTab === 'chat' && (
                                <div className="flex flex-col h-full">
                                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                        {chatMessages.map(msg => (
                                            <div key={msg.id} className={`flex flex-col ${msg.isHost ? 'bg-blue-900/20 p-3 rounded-xl border border-blue-500/20' : ''}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`font-bold text-sm ${msg.isHost ? 'text-blue-400' : 'text-gray-300'}`}>{msg.user}</span>
                                                    {msg.isHost && <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">BTC</span>}
                                                    <span className="text-gray-600 text-[10px] ml-auto">{msg.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 break-words">{msg.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'qa' && (
                                <div className="p-4 space-y-4">
                                    <div className="bg-[#111827] rounded-xl p-3 border border-gray-800">
                                        <textarea 
                                            placeholder="Đặt câu hỏi cho diễn giả..." 
                                            className="w-full bg-transparent outline-none text-sm text-gray-200 resize-none h-16"
                                        ></textarea>
                                        <div className="flex justify-end mt-2">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                                                Gửi <Send size={14}/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-gray-400 text-xs font-medium uppercase">Sắp xếp: Phổ biến nhất</span>
                                    </div>

                                    <div className="space-y-3">
                                        {questions.map(q => (
                                            <div key={q.id} className={`bg-[#273345] rounded-xl p-4 border transition-colors ${
                                                q.status === 'answering' ? 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)] bg-green-900/10' : 'border-gray-700/50'
                                            }`}>
                                                <div className="flex items-start gap-3">
                                                    <button className="flex flex-col items-center justify-center bg-[#111827] rounded-lg p-2 min-w-[50px] shrink-0 group border border-gray-800 hover:border-gray-600 transition-colors">
                                                        <ArrowUpCircle size={18} className="text-gray-500 mb-1 group-hover:text-white transition-colors"/>
                                                        <span className="font-bold text-sm text-gray-300 group-hover:text-white">{q.votes}</span>
                                                    </button>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="font-bold text-sm text-blue-400">{q.user}</span>
                                                            {q.status === 'answering' && (
                                                                <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-green-500/20">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                                                    Đang trả lời
                                                                </span>
                                                            )}
                                                            {q.status === 'answered' && (
                                                                <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-blue-500/20">
                                                                    <CheckCircle size={10} /> Đã trả lời
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-300 leading-relaxed">{q.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'poll' && (
                                <div className="p-4">
                                    <div className="bg-[#273345] rounded-xl p-5 border border-gray-700 shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                                        <h3 className="font-bold text-lg text-white mb-4 leading-snug">
                                            Bạn đánh giá thế nào về quy định nới lỏng điều kiện đầu tư đối với startup công nghệ?
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            {/* Poll Option 1 */}
                                            <label className="block relative cursor-pointer group">
                                                <input type="radio" name="poll1" className="peer sr-only" />
                                                <div className="w-full bg-[#111827] border border-gray-600 rounded-lg p-3 text-sm text-gray-300 peer-checked:border-orange-500 peer-checked:text-white transition-all overflow-hidden relative z-10 z-index">
                                                    Hoàn toàn đồng ý, tạo động lực tốt
                                                </div>
                                                {/* Pre-fill progress mock to show visual */}
                                                <div className="absolute top-0 left-0 h-full bg-orange-500/20 rounded-lg pointer-events-none transition-all w-[65%] border border-transparent"></div>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-400 pointer-events-none">65%</div>
                                            </label>

                                            {/* Poll Option 2 */}
                                            <label className="block relative cursor-pointer group">
                                                <input type="radio" name="poll1" className="peer sr-only" />
                                                <div className="w-full bg-[#111827] border border-gray-600 rounded-lg p-3 text-sm text-gray-300 peer-checked:border-orange-500 peer-checked:text-white transition-all overflow-hidden relative z-10">
                                                    Đồng ý một phần
                                                </div>
                                                <div className="absolute top-0 left-0 h-full bg-orange-500/20 rounded-lg pointer-events-none transition-all w-[25%] border border-transparent"></div>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-400 pointer-events-none">25%</div>
                                            </label>

                                            {/* Poll Option 3 */}
                                            <label className="block relative cursor-pointer group">
                                                <input type="radio" name="poll1" className="peer sr-only" />
                                                <div className="w-full bg-[#111827] border border-gray-600 rounded-lg p-3 text-sm text-gray-300 peer-checked:border-orange-500 peer-checked:text-white transition-all overflow-hidden relative z-10">
                                                    Không đồng ý
                                                </div>
                                                <div className="absolute top-0 left-0 h-full bg-orange-500/20 rounded-lg pointer-events-none transition-all w-[10%] border border-transparent"></div>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-400 pointer-events-none">10%</div>
                                            </label>
                                        </div>

                                        <div className="mt-5 flex justify-between items-center text-xs text-gray-500">
                                            <span>245 người đã bầu chọn</span>
                                            <span className="flex items-center gap-1 text-orange-400"><Clock size={12}/> Còn 2 phút</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Input Area Chat (if chat active) */}
                        {activeTab === 'chat' && (
                            <div className="p-4 bg-[#111827] border-t border-gray-800 shrink-0">
                                <div className="flex bg-[#1f2937] border border-gray-700 rounded-xl overflow-hidden focus-within:border-blue-500 hover:border-gray-600 transition-colors">
                                    <input 
                                        type="text" 
                                        placeholder="Nhập tin nhắn..." 
                                        className="w-full bg-transparent text-sm text-white px-4 py-3 outline-none"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => { 
                                            // Mock submit
                                            if(e.key === 'Enter') setChatInput(''); 
                                        }}
                                    />
                                    <button 
                                        disabled={!chatInput.trim()}
                                        className="bg-transparent text-blue-500 hover:text-white hover:bg-blue-600 px-4 transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-blue-500"
                                        onClick={() => setChatInput('')}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {/* Custom scrollbar styles would be in index.css */}
        </div>
    );
};

export default LivestreamEventPage;

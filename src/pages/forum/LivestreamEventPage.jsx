import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Home, ChevronRight, PlayCircle, Users, Send,
    ArrowUpCircle, BarChart2, CheckCircle, Clock, Info,
    FileText, Download, Contrast, PanelRightClose, PanelRightOpen
} from 'lucide-react';
import LivestreamRegistrationModal from '../../components/LivestreamRegistrationModal';
import { useAuth } from '../../contexts/AuthContext';

const LivestreamEventPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('chat'); // chat, qa, poll, results
    const [infoTab, setInfoTab] = useState('overview'); // overview, documents
    const [chatInput, setChatInput] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // Mock registration gate
    const [highContrast, setHighContrast] = useState(false);
    const [isInteractionCollapsed, setIsInteractionCollapsed] = useState(false);
    const [registrationModalState, setRegistrationModalState] = useState({ isOpen: false, eventTitle: 'Hội thảo trực tuyến: Góp ý Dự thảo Luật Doanh nghiệp sửa đổi' });

    const handleConfirmRegistration = () => {
        // Set registered to true for demo bypass after modal success
        setIsRegistered(true);
    };

    // Auto scroll chat mock
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: "Nguyễn V.", text: "Chào ban tổ chức và các chuyên gia.", role: "Cộng đồng", time: "09:00" },
        { id: 2, user: "BTC CPLQG", text: "Xin chào quý vị, buổi hội thảo sẽ bắt đầu trong ít phút nữa.", role: "Ban tổ chức", time: "09:05", isHost: true },
        { id: 3, user: "Trần H.", text: "Cho tôi hỏi tài liệu hội thảo có thể tải ở đâu ạ?", role: "Doanh nghiệp", time: "09:12" },
        { id: 4, user: "Luật sư L.", text: "Chào mọi người, rất vui được tham gia thảo luận.", role: "Luật sư", time: "09:15" },
    ]);

    const [questions, setQuestions] = useState([
        { id: 1, user: "Lê A.", text: "Theo dự thảo mới, quy định về miễn thuế thu nhập doanh nghiệp đối với startup công nghệ có thay đổi gì không?", votes: 145, status: "answering" },
        { id: 2, user: "Phạm T.", text: "Cho hỏi nếu doanh nghiệp nước ngoài đầu tư vào lĩnh vực giáo dục thì tỷ lệ sở hữu tối đa là bao nhiêu?", votes: 89, status: "pending" },
        { id: 3, user: "Trần V.", text: "Xin giải thích rõ hơn về khái niệm 'nhà đầu tư chiến lược' trong luật hiện hành.", votes: 312, status: "answered" },
    ]);

    const [qaInput, setQaInput] = useState('');
    const [pollVoted, setPollVoted] = useState(false);
    const [pollOption, setPollOption] = useState(null);

    const handleChatSubmit = () => {
        if (!chatInput.trim()) return;
        const newMsg = {
            id: Date.now(),
            user: "Bạn",
            realName: user?.name || "Khách",
            text: chatInput.trim(),
            role: "Người tham gia",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages([...chatMessages, newMsg]);
        setChatInput('');
    };

    const handleQASubmit = () => {
        if (!qaInput.trim()) return;
        const newQ = {
            id: Date.now(),
            user: "Bạn",
            realName: user?.name || "Khách",
            text: qaInput.trim(),
            votes: 0,
            status: "pending"
        };
        setQuestions([newQ, ...questions]);
        setQaInput('');
    };

    const handleVotePoll = (option) => {
        if (pollVoted) return;
        setPollOption(option);
        setPollVoted(true);
    };

    return (
        <div className={`${highContrast ? 'bg-gray-50 text-gray-900' : 'bg-[#111827] text-gray-200'} min-h-screen pb-12 transition-colors duration-300`}>
            {/* Breadcrumb Toggle */}
            <div className={`${highContrast ? 'bg-white border-gray-200' : 'bg-[#1f2937] border-gray-800'} border-b sticky top-0 z-30 shadow-sm transition-colors duration-300`}>
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className={`flex items-center gap-2 text-sm ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}>
                        <Link to="/" className={`hover:text-blue-500 transition-colors ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan" className={`hover:text-blue-500 transition-colors ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}>Diễn đàn</Link>
                        <ChevronRight size={14} />
                        <span className={`font-semibold ${highContrast ? 'text-gray-900' : 'text-white'}`}>Buổi phát trực tuyến</span>
                    </div>

                    <button
                        onClick={() => setHighContrast(!highContrast)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${highContrast
                            ? 'bg-gray-800 text-white border-gray-700 hover:bg-black'
                            : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'
                            }`}
                        title="Đổi Giao diện"
                    >
                        <Contrast size={16} />
                        <span className="hidden sm:inline">{highContrast ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-6">
                {!isRegistered ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-[#1f2937] rounded-2xl border border-gray-800 shadow-2xl p-8 max-w-2xl mx-auto mt-12">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                            <Info size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Bạn chưa có quyền truy cập</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg hover:text-gray-300">
                            Bạn cần đăng ký tham gia hoặc sự kiện này chưa được phê duyệt cho tải khoản của bạn.<br /><br />
                            Vui lòng kiểm tra lại trạng thái đăng ký tại danh sách sự kiện.
                        </p>

                        <div className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto">
                            <Link
                                to="/dien-dan/su-kien"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors min-w-[200px]"
                            >
                                Quay lại Danh sách
                            </Link>

                            {/* Registration Button */}
                            <button
                                onClick={() => setRegistrationModalState(prev => ({ ...prev, isOpen: true }))}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 py-3 px-8 rounded-xl transition-colors min-w-[200px] shadow-lg hover:-translate-y-0.5"
                            >
                                Đăng ký tham gia ngay
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col xl:flex-row gap-6 min-h-[85vh] items-start relative">
                        {/* Left Column - Video Player & Info */}
                        <div className={`w-full transition-all duration-300 ease-in-out flex flex-col gap-6 ${isInteractionCollapsed ? 'xl:w-full' : 'xl:w-8/12 lg:w-7/12'}`}>

                            {/* Block 1: Video Area */}
                            <div className={`w-full aspect-video rounded-2xl overflow-hidden border shadow-2xl bg-black relative flex flex-col items-center justify-center transition-colors duration-300 ${highContrast ? 'border-gray-200' : 'border-gray-800'}`}>
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

                            {/* Block 2: Event Info Tabs & Content */}
                            <div className={`w-full rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-300 flex flex-col ${highContrast ? 'bg-white border-gray-200' : 'bg-[#1f2937] border-gray-800'}`}>
                                {/* Event Info Tabs */}
                                <div className="flex border-b border-gray-800 mt-2 px-6 gap-6">
                                    <button
                                        onClick={() => setInfoTab('overview')}
                                        className={`py-4 text-sm font-bold uppercase transition-colors border-b-2 ${infoTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
                                    >Tổng quan sự kiện</button>
                                    <button
                                        onClick={() => setInfoTab('documents')}
                                        className={`py-4 text-sm font-bold uppercase transition-colors border-b-2 ${infoTab === 'documents' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
                                    >Tài liệu đính kèm</button>
                                </div>

                                {/* Event Info Content */}
                                <div className="p-6">
                                    {infoTab === 'overview' && (
                                        <>
                                            <h1 className={`text-2xl md:text-2xl font-bold mb-2 ${highContrast ? 'text-gray-900' : 'text-white'}`}>Hội thảo trực tuyến: Góp ý Dự thảo Luật Doanh nghiệp sửa đổi</h1>
                                            <div className={`flex flex-wrap items-center gap-6 text-sm mb-6 ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}>
                                                <span className="flex items-center gap-2 font-medium text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                                                    Cổng Pháp luật Quốc gia
                                                </span>
                                                <span className="flex items-center gap-2"><Clock size={16} /> 09:00 - 11:30 | 18/03/2026</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div className={`p-4 rounded-xl border transition-colors ${highContrast ? 'bg-gray-50 border-gray-200' : 'bg-[#111827] border-gray-800'}`}>
                                                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}>Chủ trì / Đơn vị tổ chức</h3>
                                                    <p className={`text-sm font-bold ${highContrast ? 'text-gray-900' : 'text-gray-200'}`}>Bộ Kế hoạch và Đầu tư</p>
                                                </div>
                                                <div className={`p-4 rounded-xl border transition-colors ${highContrast ? 'bg-gray-50 border-gray-200' : 'bg-[#111827] border-gray-800'}`}>
                                                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}>Lĩnh vực</h3>
                                                    <p className={`text-sm font-bold ${highContrast ? 'text-gray-900' : 'text-gray-200'}`}>Luật Doanh nghiệp, Đầu tư</p>
                                                </div>
                                            </div>

                                            <div className={`prose max-w-none text-sm ${highContrast ? 'text-gray-700' : 'prose-invert text-gray-300'}`}>
                                                <h3 className={`text-lg font-bold mb-2 ${highContrast ? 'text-gray-900' : 'text-white'}`}>Mô tả chung</h3>
                                                <p className="mb-4">Sự kiện thảo luận chuyên sâu lấy ý kiến đối với các nội dung trọng tâm trong Dự thảo Luật Doanh nghiệp (sửa đổi), với sự tham gia của đại diện Bộ Kế hoạch và Đầu tư, Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) và các chuyên gia kinh tế, luật sư.</p>

                                                <h3 className={`text-lg font-bold mb-2 mt-6 ${highContrast ? 'text-gray-900' : 'text-white'}`}>Khách mời / Diễn giả:</h3>
                                                <ul className={`list-disc pl-5 mb-4 space-y-2 ${highContrast ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    <li><strong className={highContrast ? 'text-gray-900' : 'text-white'}>Ông Phan Đức Hiếu</strong> - Ủy ban Kinh tế của Quốc hội</li>
                                                    <li><strong className={highContrast ? 'text-gray-900' : 'text-white'}>Bà Viễn Thị B</strong> - Đại diện VCCI</li>
                                                    <li><strong className={highContrast ? 'text-gray-900' : 'text-white'}>Luật sư Nguyễn C</strong> - Đoàn Luật sư TP. Hà Nội</li>
                                                </ul>

                                                <h3 className={`text-lg font-bold mb-2 mt-6 ${highContrast ? 'text-gray-900' : 'text-white'}`}>Lịch trình dự kiến:</h3>
                                                <ul className={`space-y-3 ${highContrast ? 'text-gray-700' : 'text-gray-400'}`}>
                                                    <li className="flex gap-3"><strong className="text-blue-500 min-w-[100px]">09:00 - 09:15:</strong> Khai mạc và phát biểu chào mừng</li>
                                                    <li className="flex gap-3"><strong className="text-blue-500 min-w-[100px]">09:15 - 10:00:</strong> Trình bày những điểm mới của Dự thảo</li>
                                                    <li className="flex gap-3"><strong className="text-blue-500 min-w-[100px]">10:00 - 11:15:</strong> Phiên thảo luận và Hỏi đáp (Q&A)</li>
                                                    <li className="flex gap-3"><strong className="text-blue-500 min-w-[100px]">11:15 - 11:30:</strong> Tổng kết và bế mạc</li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                    {infoTab === 'documents' && (
                                        <div className="space-y-4">
                                            <div className={`border rounded-xl p-4 flex items-center justify-between group transition-colors cursor-pointer ${highContrast ? 'bg-gray-50 border-gray-200 hover:border-blue-300' : 'bg-[#111827] border-gray-800 hover:border-gray-600'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                                                        <FileText size={20} className="text-red-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-sm font-bold group-hover:text-blue-500 transition-colors ${highContrast ? 'text-gray-900' : 'text-gray-200'}`}>Dự thảo Luật Doanh nghiệp (sửa đổi) lần 3.pdf</h4>
                                                        <p className="text-xs text-gray-500 mt-1">PDF • 2.4 MB • Tải lên 2 ngày trước</p>
                                                    </div>
                                                </div>
                                                <button className="text-sm shrink-0 flex items-center gap-1.5 font-medium text-blue-500 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg border border-blue-500/30 transition-colors">
                                                    <Download size={14} /> Tải xuống
                                                </button>
                                            </div>
                                            <div className={`border rounded-xl p-4 flex items-center justify-between group transition-colors cursor-pointer ${highContrast ? 'bg-gray-50 border-gray-200 hover:border-blue-300' : 'bg-[#111827] border-gray-800 hover:border-gray-600'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center shrink-0">
                                                        <FileText size={20} className="text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-sm font-bold group-hover:text-blue-500 transition-colors ${highContrast ? 'text-gray-900' : 'text-gray-200'}`}>Slide Trình bày - Những điểm mới trọng tâm.pptx</h4>
                                                        <p className="text-xs text-gray-500 mt-1">PPTX • 5.1 MB • Tải lên hôm nay</p>
                                                    </div>
                                                </div>
                                                <button className="text-sm shrink-0 flex items-center gap-1.5 font-medium text-blue-500 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg border border-blue-500/30 transition-colors">
                                                    <Download size={14} /> Tải xuống
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Interaction area (Taller layout and collapsible) */}
                        {isInteractionCollapsed ? (
                            <div className="hidden xl:flex flex-col gap-2 h-[550px] xl:h-[calc(100vh-200px)] xl:sticky xl:top-24 items-center w-12 pt-4">
                                <button
                                    onClick={() => setIsInteractionCollapsed(false)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border shadow-md ${highContrast ? 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700' : 'bg-[#1f2937] border-gray-700 hover:bg-gray-700 text-gray-300'}`}
                                    title="Mở rộng khung tương tác"
                                >
                                    <PanelRightOpen size={20} />
                                </button>
                                <span className={`writing-vertical text-xs font-bold uppercase tracking-wider py-4 ${highContrast ? 'text-gray-500' : 'text-gray-500'}`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}></span>
                            </div>
                        ) : (
                            <div className={`w-full lg:w-5/12 xl:w-4/12 flex-col h-[550px] xl:h-[calc(100vh-200px)] xl:sticky xl:top-24 rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 flex ${highContrast ? 'bg-white border-gray-200' : 'bg-[#1f2937] border-gray-800'}`}>
                                {/* Tabs */}
                                <div className={`flex border-b transition-colors ${highContrast ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-[#111827]'}`}>
                                    <button
                                        onClick={() => setActiveTab('chat')}
                                        className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'chat' ? `border-blue-500 text-blue-500 ${highContrast ? 'bg-white' : 'bg-[#1f2937]'}` : `border-transparent hover:text-gray-900 hover:bg-black/5 ${highContrast ? 'text-gray-500' : 'text-gray-500'}`}`}
                                    >Live Chat</button>
                                    <button
                                        onClick={() => setActiveTab('qa')}
                                        className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'qa' ? `border-blue-500 text-blue-500 ${highContrast ? 'bg-white' : 'bg-[#1f2937]'}` : `border-transparent hover:text-gray-900 hover:bg-black/5 ${highContrast ? 'text-gray-500' : 'text-gray-500'}`}`}
                                    >Câu hỏi (3)</button>
                                    <button
                                        onClick={() => setActiveTab('poll')}
                                        className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 relative ${activeTab === 'poll' ? `border-blue-500 text-blue-500 ${highContrast ? 'bg-white' : 'bg-[#1f2937]'}` : `border-transparent hover:text-gray-900 hover:bg-black/5 ${highContrast ? 'text-gray-500' : 'text-gray-500'}`}`}
                                    >
                                        Bình chọn
                                        <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                        <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>
                                    <button
                                        onClick={() => setIsInteractionCollapsed(!isInteractionCollapsed)}
                                        className={`px-3 flex items-center justify-center transition-colors border-l ${highContrast ? 'border-gray-200 hover:bg-gray-100' : 'border-gray-800 hover:bg-[#1f2937]'}`}
                                        title={isInteractionCollapsed ? 'Mở rộng khung tương tác' : 'Ẩn khung tương tác'}
                                    >
                                        {isInteractionCollapsed ? <PanelRightOpen size={18} className={highContrast ? 'text-gray-600' : 'text-gray-400'} /> : <PanelRightClose size={18} className={highContrast ? 'text-gray-600' : 'text-gray-400'} />}
                                    </button>
                                </div>

                                {/* Content Area */}
                                <div className={`flex-grow overflow-y-auto custom-scrollbar p-0 transition-colors ${highContrast ? 'bg-white' : 'bg-[#1f2937]'}`}>
                                    {activeTab === 'chat' && (
                                        <div className="flex flex-col h-full">
                                            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                                {chatMessages.map(msg => (
                                                    <div key={msg.id} className={`flex flex-col ${msg.isHost ? `p-3 rounded-xl border ${highContrast ? 'bg-blue-50 border-blue-200' : 'bg-blue-900/20 border-blue-500/20'}` : msg.user === 'Bạn' ? `p-3 rounded-xl border ${highContrast ? 'bg-purple-50 border-purple-200' : 'bg-purple-900/20 border-purple-500/20'}` : ''}`}>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`font-bold text-sm ${msg.isHost ? 'text-blue-500' : msg.user === 'Bạn' ? 'text-purple-500' : (highContrast ? 'text-gray-900' : 'text-gray-300')}`}>{msg.user === 'Bạn' ? msg.realName : msg.user}</span>
                                                            {msg.isHost && <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">BTC</span>}
                                                            {msg.user === 'Bạn' && <span className="bg-purple-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ml-1">Bạn</span>}
                                                            <span className={`text-[10px] ml-auto ${highContrast ? 'text-gray-500' : 'text-gray-600'}`}>{msg.time}</span>
                                                        </div>
                                                        <p className={`text-sm break-words ${highContrast ? 'text-gray-700' : 'text-gray-200'}`}>{msg.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'qa' && (
                                        <div className="p-4 space-y-4">
                                            <div className={`rounded-xl p-3 border transition-colors ${highContrast ? 'bg-gray-50 border-gray-200' : 'bg-[#111827] border-gray-800'}`}>
                                                <textarea
                                                    placeholder="Đặt câu hỏi cho diễn giả..."
                                                    value={qaInput}
                                                    onChange={(e) => setQaInput(e.target.value)}
                                                    className={`w-full bg-transparent outline-none text-sm resize-none h-16 ${highContrast ? 'text-gray-900 placeholder-gray-500' : 'text-gray-200'}`}
                                                ></textarea>
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={handleQASubmit}
                                                        disabled={!qaInput.trim()}
                                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                                    >
                                                        Gửi <Send size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center px-1 mt-4">
                                                <span className={`text-xs font-medium uppercase ${highContrast ? 'text-gray-500' : 'text-gray-400'}`}>Sắp xếp: Phổ biến nhất</span>
                                            </div>

                                            <div className="space-y-3">
                                                {questions.map(q => (
                                                    <div key={q.id} className={`rounded-xl p-4 border transition-colors ${highContrast ? 'bg-white border-gray-200' : 'bg-[#273345] border-gray-700/50'} ${q.status === 'answering' ? `border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)] ${highContrast ? 'bg-green-50' : 'bg-green-500/10'}` : q.user === 'Bạn' ? `border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)] ${highContrast ? 'bg-purple-50' : 'bg-purple-500/10'}` : ''
                                                        }`}>
                                                        <div className="flex items-start gap-3">
                                                            <button className={`flex flex-col items-center justify-center rounded-lg p-2 min-w-[50px] shrink-0 group border transition-colors ${highContrast ? 'bg-gray-50 border-gray-200 hover:border-gray-300' : 'bg-[#111827] border-gray-800 hover:border-gray-600'}`}>
                                                                <ArrowUpCircle size={18} className={`mb-1 transition-colors ${highContrast ? 'text-gray-400 group-hover:text-gray-600' : 'text-gray-500 group-hover:text-white'}`} />
                                                                <span className={`font-bold text-sm transition-colors ${highContrast ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'}`}>{q.votes}</span>
                                                            </button>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1.5">
                                                                    <span className={`font-bold text-sm ${q.user === 'Bạn' ? 'text-purple-500' : 'text-blue-500'}`}>{q.user === 'Bạn' ? q.realName : q.user}</span>
                                                                    {q.user === 'Bạn' && <span className="bg-purple-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ml-1">Bạn</span>}
                                                                    {q.status === 'answering' && (
                                                                        <span className="bg-green-500/20 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-green-500/20">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                                            Đang trả lời
                                                                        </span>
                                                                    )}
                                                                    {q.status === 'answered' && (
                                                                        <span className="bg-blue-500/20 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-blue-500/20">
                                                                            <CheckCircle size={10} /> Đã trả lời
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className={`text-sm leading-relaxed ${highContrast ? 'text-gray-800' : 'text-gray-300'}`}>{q.text}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'poll' && (
                                        <div className="p-4">
                                            <div className={`rounded-xl p-5 border shadow-xl relative overflow-hidden transition-colors ${highContrast ? 'bg-white border-gray-200' : 'bg-[#273345] border-gray-700'}`}>
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                                                <h3 className={`font-bold text-lg mb-4 leading-snug ${highContrast ? 'text-gray-900' : 'text-white'}`}>
                                                    Bạn đánh giá thế nào về quy định nới lỏng điều kiện đầu tư đối với startup công nghệ?
                                                </h3>

                                                <div className="space-y-3">
                                                    {/* Poll Option 1 */}
                                                    <label className="block relative cursor-pointer group">
                                                        <input type="radio" name="poll1" className="peer sr-only" onChange={() => handleVotePoll(1)} disabled={pollVoted} checked={pollOption === 1} />
                                                        <div className={`w-full border rounded-lg p-3 text-sm transition-all overflow-hidden relative z-10 z-index ${pollVoted && pollOption === 1 ? 'border-orange-500' : ''} ${highContrast ? `bg-gray-50 border-gray-200 text-gray-800 ${pollVoted && pollOption === 1 ? 'bg-orange-50' : ''}` : `bg-[#111827] border-gray-600 text-gray-300 ${pollVoted && pollOption === 1 ? 'text-white' : ''}`}`}>
                                                            Hoàn toàn đồng ý, tạo động lực tốt
                                                        </div>
                                                        <div className={`absolute top-0 left-0 h-full bg-orange-500/20 rounded-lg pointer-events-none transition-all border border-transparent ${pollVoted ? 'w-[65%]' : 'w-0'}`}></div>
                                                        {pollVoted && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-500 pointer-events-none">65%</div>}
                                                    </label>

                                                    {/* Poll Option 2 */}
                                                    <label className="block relative cursor-pointer group">
                                                        <input type="radio" name="poll1" className="peer sr-only" onChange={() => handleVotePoll(2)} disabled={pollVoted} checked={pollOption === 2} />
                                                        <div className={`w-full border rounded-lg p-3 text-sm transition-all overflow-hidden relative z-10 ${pollVoted && pollOption === 2 ? 'border-orange-500' : ''} ${highContrast ? `bg-gray-50 border-gray-200 text-gray-800 ${pollVoted && pollOption === 2 ? 'bg-orange-50' : ''}` : `bg-[#111827] border-gray-600 text-gray-300 ${pollVoted && pollOption === 2 ? 'text-white' : ''}`}`}>
                                                            Đồng ý một phần
                                                        </div>
                                                        <div className={`absolute top-0 left-0 h-full bg-orange-500/20 rounded-lg pointer-events-none transition-all border border-transparent ${pollVoted ? 'w-[25%]' : 'w-0'}`}></div>
                                                        {pollVoted && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-500 pointer-events-none">25%</div>}
                                                    </label>

                                                    {/* Poll Option 3 */}
                                                    <label className="block relative cursor-pointer group">
                                                        <input type="radio" name="poll1" className="peer sr-only" onChange={() => handleVotePoll(3)} disabled={pollVoted} checked={pollOption === 3} />
                                                        <div className={`w-full border rounded-lg p-3 text-sm transition-all overflow-hidden relative z-10 ${pollVoted && pollOption === 3 ? 'border-orange-500' : ''} ${highContrast ? `bg-gray-50 border-gray-200 text-gray-800 ${pollVoted && pollOption === 3 ? 'bg-orange-50' : ''}` : `bg-[#111827] border-gray-600 text-gray-300 ${pollVoted && pollOption === 3 ? 'text-white' : ''}`}`}>
                                                            Không đồng ý
                                                        </div>
                                                        <div className={`absolute top-0 left-0 h-full bg-orange-500/20 rounded-lg pointer-events-none transition-all border border-transparent ${pollVoted ? 'w-[10%]' : 'w-0'}`}></div>
                                                        {pollVoted && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-500 pointer-events-none">10%</div>}
                                                    </label>
                                                </div>

                                                <div className="mt-5 flex justify-between items-center text-xs text-gray-500">
                                                    <span>{pollVoted ? '246' : '245'} người đã bầu chọn</span>
                                                    <span className="flex items-center gap-1 text-orange-500"><Clock size={12} /> Còn 2 phút</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Input Area Chat (if chat active) */}
                                {activeTab === 'chat' && (
                                    <div className={`p-4 border-t shrink-0 transition-colors ${highContrast ? 'bg-gray-50 border-gray-200' : 'bg-[#111827] border-gray-800'}`}>
                                        <div className={`flex rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors border ${highContrast ? 'bg-white border-gray-300 hover:border-gray-400' : 'bg-[#1f2937] border-gray-700 hover:border-gray-600'}`}>
                                            <input
                                                type="text"
                                                placeholder="Nhập tin nhắn..."
                                                className={`w-full bg-transparent text-sm px-4 py-3 outline-none ${highContrast ? 'text-gray-900 placeholder-gray-500' : 'text-white'}`}
                                                value={chatInput}
                                                onChange={(e) => setChatInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    // Mock submit
                                                    if (e.key === 'Enter') handleChatSubmit();
                                                }}
                                            />
                                            <button
                                                disabled={!chatInput.trim()}
                                                className="bg-transparent text-blue-500 hover:text-white hover:bg-blue-600 px-4 transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-blue-500"
                                                onClick={handleChatSubmit}
                                            >
                                                <Send size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Custom scrollbar styles would be in index.css */}

            <LivestreamRegistrationModal
                isOpen={registrationModalState.isOpen}
                onClose={() => setRegistrationModalState(prev => ({ ...prev, isOpen: false }))}
                onRegister={handleConfirmRegistration}
                eventTitle={registrationModalState.eventTitle}
            />
        </div>
    );
};

export default LivestreamEventPage;

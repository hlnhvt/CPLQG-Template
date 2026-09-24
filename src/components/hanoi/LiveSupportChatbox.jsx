import React, { useState } from 'react';
import { 
    X, 
    ChevronRight, 
    Send, 
    Bot, 
    ArrowLeft, 
    Sparkles, 
    Calendar, 
    MessageSquare,
    CheckCircle2
} from 'lucide-react';

const LiveSupportChatbox = ({ isOpen, onClose }) => {
    const [viewMode, setViewMode] = useState('menu'); // 'menu' | 'chat' | 'booking'
    const [chatTopic, setChatTopic] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingData, setBookingData] = useState({ name: '', phone: '', date: '', time: '', topic: '' });

    if (!isOpen) return null;

    const handleSelectAI = (topicTitle) => {
        setChatTopic(topicTitle);
        setViewMode('chat');
        setMessages([
            {
                id: 1,
                sender: 'bot',
                text: `Xin chào! Tôi là Trợ lý ${topicTitle}. Bạn cần giải đáp hoặc hướng dẫn về nội dung pháp lý nào?`,
                time: 'Vừa xong'
            }
        ]);
    };

    const handleStartDirectChat = () => {
        setChatTopic('Tư vấn viên trực tuyến');
        setViewMode('chat');
        setMessages([
            {
                id: 1,
                sender: 'agent',
                text: 'Xin chào quý công dân! Tư vấn viên của Cổng Pháp luật Thủ đô đang trực tuyến và sẵn sàng hỗ trợ bạn.',
                time: 'Vừa xong'
            }
        ]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputMsg,
            time: 'Vừa xong'
        };

        setMessages(prev => [...prev, newMsg]);
        const question = inputMsg;
        setInputMsg('');

        // Simulated AI/Agent reply
        setTimeout(() => {
            let replyText = "Cảm ơn bạn đã gửi câu hỏi. Chúng tôi đã ghi nhận nội dung và đang đối chiếu quy định pháp luật liên quan (Luật Thủ Đô 2024 và các Nghị định hướng dẫn). Chuyên viên sẽ phản hồi chi tiết ngay!";
            if (question.toLowerCase().includes('sandbox')) {
                replyText = "Về cơ chế Sandbox (Điều 25 Luật Thủ Đô): Hà Nội cho phép thử nghiệm có kiểm soát các sản phẩm, giải pháp công nghệ mới (AI, Fintech, Smart City) với chính sách miễn trừ trách nhiệm hành chính và ưu đãi ươm tạo tại Khu CNC Hòa Lạc.";
            } else if (question.toLowerCase().includes('đất đai') || question.toLowerCase().includes('thu hồi')) {
                replyText = "Về bồi thường đất đai theo QĐ 61/2024/QĐ-UBND: Người dân được bồi thường bằng đất tái định cư hoặc tiền mặt theo giá đất cụ thể do UBND cấp thẩm quyền phê duyệt, cộng các khoản hỗ trợ ổn định đời sống.";
            }

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: viewMode === 'chat' && chatTopic.includes('AI') ? 'bot' : 'agent',
                    text: replyText,
                    time: 'Vừa xong'
                }
            ]);
        }, 800);
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setBookingSuccess(true);
        setTimeout(() => {
            setBookingSuccess(false);
            setViewMode('menu');
        }, 3000);
    };

    return (
        <div className="fixed bottom-20 right-4 sm:right-6 md:right-8 z-[200] w-[92vw] sm:w-[380px] max-h-[85vh] flex flex-col bg-white rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.25)] border border-gray-200/90 overflow-hidden animate-slideUp font-sans">
            {/* Header */}
            <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    {viewMode !== 'menu' && (
                        <button 
                            onClick={() => setViewMode('menu')}
                            className="p-1 -ml-1 text-gray-400 hover:text-gray-700 rounded-lg transition"
                            title="Quay lại"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 text-[15px] sm:text-base leading-none">
                                {viewMode === 'menu' ? 'Tư vấn viên' : chatTopic}
                            </h3>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_6px_#10b981]" />
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 leading-none">
                            Thường trả lời sau vài phút
                        </p>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                    title="Đóng cửa sổ"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Body */}
            {viewMode === 'menu' && (
                <div className="p-4 space-y-4 overflow-y-auto max-h-[500px] bg-slate-50/60">
                    {/* CARD 1: AI ASSISTANCE */}
                    <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm space-y-3.5">
                        {/* Greeting Message Bubble */}
                        <div className="bg-slate-100/90 rounded-2xl p-3.5 text-xs sm:text-[13px] text-slate-800 leading-relaxed text-justify">
                            Xin chào bạn. Tôi sẵn sàng tư vấn, hỗ trợ bạn về các vấn đề liên quan đến Pháp luật.
                        </div>

                        {/* Subtitle instruction */}
                        <p className="text-xs sm:text-[12.5px] text-slate-600 font-medium text-center px-1">
                            Để hỗ trợ nhanh vui lòng chọn hỗ trợ AI của chúng tôi
                        </p>

                        {/* 3 AI Action Buttons */}
                        <div className="space-y-2 pt-0.5">
                            <button
                                onClick={() => handleSelectAI('AI Pháp luật - Cổng pháp luật quốc gia')}
                                className="w-full py-2.5 px-3 bg-white hover:bg-sky-50/70 border border-sky-200/90 hover:border-sky-400 rounded-xl text-[#0088cc] hover:text-[#0077b5] font-semibold text-xs sm:text-[13px] text-center transition-all shadow-sm active:scale-[0.99]"
                            >
                                AI Pháp luật - Cổng pháp luật quốc gia
                            </button>

                            <button
                                onClick={() => handleSelectAI('Trợ lý AI pháp lý')}
                                className="w-full py-2.5 px-3 bg-white hover:bg-sky-50/70 border border-sky-200/90 hover:border-sky-400 rounded-xl text-[#0088cc] hover:text-[#0077b5] font-semibold text-xs sm:text-[13px] text-center transition-all shadow-sm active:scale-[0.99]"
                            >
                                Trợ lý AI pháp lý
                            </button>

                            <button
                                onClick={() => handleSelectAI('Cẩm nang về công tác tư pháp địa phương')}
                                className="w-full py-2.5 px-3 bg-white hover:bg-sky-50/70 border border-sky-200/90 hover:border-sky-400 rounded-xl text-[#0088cc] hover:text-[#0077b5] font-semibold text-xs sm:text-[13px] text-center transition-all shadow-sm active:scale-[0.99]"
                            >
                                Cẩm nang về công tác tư pháp địa phương
                            </button>
                        </div>
                    </div>

                    {/* CARD 2: DIRECT ONLINE SUPPORT */}
                    <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm space-y-3.5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                                    Chúng tôi đang trực tuyến
                                </h4>
                                <p className="text-[11.5px] text-slate-500 mt-0.5">
                                    Thường trả lời sau vài phút
                                </p>
                            </div>
                            {/* Avatar Badge */}
                            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-200 shrink-0">
                                TV
                            </div>
                        </div>

                        {/* Action Links */}
                        <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs sm:text-[13px]">
                            <button
                                onClick={() => setViewMode('booking')}
                                className="w-full flex items-center justify-between text-[#0088cc] hover:text-[#0077b5] font-bold group text-left transition"
                            >
                                <span className="group-hover:underline">Đặt lịch tư vấn</span>
                                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            <button
                                onClick={handleStartDirectChat}
                                className="w-full flex items-center justify-between text-[#0088cc] hover:text-[#0077b5] font-bold group text-left transition"
                            >
                                <span className="group-hover:underline">Bắt đầu một cuộc trò chuyện</span>
                                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Mode: Interactive Chat */}
            {viewMode === 'chat' && (
                <div className="flex flex-col h-[440px] bg-slate-50/50">
                    {/* Messages Area */}
                    <div className="flex-grow p-4 space-y-3 overflow-y-auto">
                        {messages.map(msg => (
                            <div 
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                                    msg.sender === 'user'
                                        ? 'bg-[#0088cc] text-white rounded-br-xs'
                                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                                }`}>
                                    <p>{msg.text}</p>
                                    <span className={`block text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-sky-100' : 'text-slate-400'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Nhập nội dung cần hỗ trợ..."
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            className="flex-grow px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088cc] bg-slate-50 focus:bg-white"
                        />
                        <button
                            type="submit"
                            className="w-8 h-8 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white flex items-center justify-center shrink-0 transition"
                        >
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            )}

            {/* View Mode: Booking */}
            {viewMode === 'booking' && (
                <div className="p-4 overflow-y-auto max-h-[440px] bg-slate-50/50">
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                        <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-[#0088cc]" />
                            <span>Đặt lịch hẹn tư vấn pháp luật</span>
                        </h4>

                        {bookingSuccess ? (
                            <div className="p-5 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 animate-fadeIn">
                                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                                <h5 className="font-bold text-sm">Đặt lịch thành công!</h5>
                                <p className="text-xs text-emerald-700">
                                    Tư vấn viên sẽ gọi điện xác nhận lịch hẹn với bạn trong vòng 2 giờ làm việc.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleBookingSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Họ và tên *</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Nguyễn Văn A"
                                        value={bookingData.name}
                                        onChange={e => setBookingData({...bookingData, name: e.target.value})}
                                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0088cc]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Số điện thoại *</label>
                                    <input 
                                        type="tel" 
                                        required 
                                        placeholder="0912..."
                                        value={bookingData.phone}
                                        onChange={e => setBookingData({...bookingData, phone: e.target.value})}
                                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0088cc]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Ngày hẹn *</label>
                                        <input 
                                            type="date" 
                                            required
                                            value={bookingData.date}
                                            onChange={e => setBookingData({...bookingData, date: e.target.value})}
                                            className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0088cc]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Khung giờ *</label>
                                        <select 
                                            value={bookingData.time}
                                            onChange={e => setBookingData({...bookingData, time: e.target.value})}
                                            className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0088cc]"
                                        >
                                            <option value="">Chọn giờ</option>
                                            <option value="08:30 - 09:30">08:30 - 09:30</option>
                                            <option value="10:00 - 11:00">10:00 - 11:00</option>
                                            <option value="14:00 - 15:00">14:00 - 15:00</option>
                                            <option value="15:30 - 16:30">15:30 - 16:30</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nội dung vướng mắc</label>
                                    <textarea 
                                        rows={2}
                                        placeholder="Tóm tắt vấn đề cần tư vấn..."
                                        value={bookingData.topic}
                                        onChange={e => setBookingData({...bookingData, topic: e.target.value})}
                                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0088cc]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl text-xs font-semibold transition"
                                >
                                    Xác nhận đặt lịch
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveSupportChatbox;

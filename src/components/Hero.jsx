import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookA, Landmark, Users, Bot, Flame, Sparkles, Send, MessageSquare, HelpCircle, ChevronRight, ChevronLeft, User, Tag, Clock, Paperclip } from 'lucide-react';

const highlightSlides = [
    {
        id: 1,
        title: "Dự thảo Luật Đất đai (Sửa đổi): Điểm mới quan trọng",
        summary: "Cập nhật các quy định mới về bảng giá đất, bồi thường giải phóng mặt bằng và đất đai cho người dân tộc thiểu số.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "Tiêu chuẩn phòng cháy chữa cháy mới cho nhà ở xã hội",
        summary: "Bộ Xây dựng bổ sung yêu cầu lắp đặt hệ thống báo cháy tự động và lối thoát hiểm thứ hai cho chung cư dưới 5 tầng.",
        image: "https://picsum.photos/400/250"
    },
    {
        id: 3,
        title: "Quy trình đăng ký thành lập doanh nghiệp số hóa 100%",
        summary: "Người dân có thể đăng ký trực tuyến toàn bộ hồ sơ kinh doanh và nhận giấy phép qua bưu điện trong vòng 48 giờ.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "Tiêu chuẩn phòng cháy chữa cháy mới cho nhà ở xã hội",
        summary: "Bộ Xây dựng bổ sung yêu cầu lắp đặt hệ thống báo cháy tự động và lối thoát hiểm thứ hai cho chung cư dưới 5 tầng.",
        image: "https://picsum.photos/400/250"
    },
    {
        id: 5,
        title: "Quy trình đăng ký thành lập doanh nghiệp số hóa 100%",
        summary: "Người dân có thể đăng ký trực tuyến toàn bộ hồ sơ kinh doanh và nhận giấy phép qua bưu điện trong vòng 48 giờ.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        title: "Tăng cường ứng dụng công nghệ thông tin trong phổ biến pháp luật",
        summary: "Chính phủ phê duyệt đề án phát triển Cổng thông tin phổ biến giáo dục pháp luật quốc gia đến năm 2030.",
        image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=400&q=80"
    }
];

const Hero = ({ isV2 = false }) => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [isHoveredSec, setIsHoveredSec] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [quickFormData, setQuickFormData] = useState({ domain: '', title: '', content: '' });
    const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
    const [isHoveredList, setIsHoveredList] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleQuickSubmit = (e) => {
        e.preventDefault();
        if (!quickFormData.domain || !quickFormData.title || !quickFormData.content) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        const newQuestion = {
            id: 'user-' + Date.now(),
            title: quickFormData.title,
            content: quickFormData.content,
            domain: quickFormData.domain,
            date: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
            status: 'Đang chờ trả lời',
            views: 1,
            likes: 0,
            author: 'Nguyễn Văn A',
            replies: 0
        };

        const existing = JSON.parse(localStorage.getItem('cplqg_user_questions') || '[]');
        localStorage.setItem('cplqg_user_questions', JSON.stringify([newQuestion, ...existing]));

        setQuickFormData({ domain: '', title: '', content: '' });
        alert('Gửi câu hỏi nhanh thành công! Đang chuyển hướng đến danh sách câu hỏi...');
        navigate('/cau-hoi-phap-luat');
    };

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isV2 || activeSection !== 0 || isHoveredList) return;
        const interval = setInterval(() => {
            setActiveHighlightIndex((prev) => (prev + 1) % 6);
        }, 3000);
        return () => clearInterval(interval);
    }, [isV2, activeSection, isHoveredList]);



    return (
        <div
            className="relative bg-[var(--bg-header-bottom)] text-white pt-24 pb-20 overflow-hidden shadow-inner min-h-screen flex items-center h-screen"
        >
            {/* Animated Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
                style={{
                    backgroundImage: "url('/hero-bg-3.png')",
                    transform: isLoaded ? 'scale(1.05)' : 'scale(1.2)'
                }}
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-header-bottom)]/60 via-[var(--bg-header-bottom)]/40 to-transparent z-0 mix-blend-multiply"></div>

            {!isV2 ? (
                /* Original 1-column layout for V1 */
                <div className="container mx-auto px-4 relative z-10 flex flex-col w-full h-full justify-center pb-48">
                    <div className={`max-w-4xl transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-2 text-white drop-shadow-md">
                            Đồng hành cùng<br />người dân, doanh nghiệp
                        </h2>
                        <h3
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] drop-shadow-xl mb-10 italic tracking-tight whitespace-nowrap transition-all duration-1000 delay-300 transform pt-2 pb-2 leading-relaxed ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
                            style={{ textShadow: '0px 0px 20px rgba(255,255,255,0.4)' }}
                        >
                            BƯỚC VÀO KỶ NGUYÊN MỚI
                        </h3>

                        <div className={`flex flex-col md:flex-row items-center gap-4 mt-6 transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="flex gap-3 shrink-0">
                                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                    <Landmark size={18} className="text-white group-hover:drop-shadow-md" />
                                </button>
                                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                    <Users size={18} className="text-white group-hover:drop-shadow-md" />
                                </button>
                                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                    <BookA size={18} className="text-white group-hover:drop-shadow-md" />
                                </button>
                            </div>

                            <div className="bg-white rounded-full flex items-center pl-5 pr-1.5 py-1.5 shadow-2xl w-full max-w-xl transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] focus-within:ring-4 ring-blue-400 group">
                                <input
                                    type="text"
                                    placeholder="Tra cứu nhanh văn bản quy phạm pháp luật"
                                    className="flex-grow text-gray-800 outline-none bg-transparent placeholder-gray-400 text-xs md:text-sm font-medium"
                                />
                                <button className="bg-[#1a3b8b] text-white p-2 md:p-2.5 rounded-full group-hover:bg-[#0a3a73] transition-colors shadow-md ml-2 shrink-0">
                                    <Search size={18} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* V2 2-column layout with Tiêu Điểm Hôm Nay */
                <div className="container mx-auto px-4 relative z-10 w-full h-full flex items-center pt-16 pb-16">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between w-full lg:-translate-y-16 transition-all duration-500 gap-8">
                        {/* LEFT COLUMN: Main Typography & Search Bar */}
                        <div className={`transition-all duration-500 ease-in-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} flex flex-col justify-center lg:ml-[30px] ${isCollapsed ? 'w-full lg:w-full' : 'w-full lg:w-[58%]'}`}>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-2 text-white drop-shadow-md">
                                Đồng hành cùng<br />người dân, doanh nghiệp
                            </h2>
                            <h3
                                className={`text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] drop-shadow-xl mb-10 italic tracking-tight transition-all duration-1000 delay-300 transform pt-2 pb-2 leading-relaxed ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
                                style={{ textShadow: '0px 0px 20px rgba(255,255,255,0.4)' }}
                            >
                                BƯỚC VÀO KỶ NGUYÊN MỚI
                            </h3>

                            <div className={`flex flex-col md:flex-row items-center gap-4 mt-6 transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <div className="flex gap-3 shrink-0">
                                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                        <Landmark size={18} className="text-white group-hover:drop-shadow-md" />
                                    </button>
                                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                        <Users size={18} className="text-white group-hover:drop-shadow-md" />
                                    </button>
                                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                        <BookA size={18} className="text-white group-hover:drop-shadow-md" />
                                    </button>
                                </div>

                                <div className="bg-white rounded-full flex items-center pl-5 pr-1.5 py-1.5 shadow-2xl w-full max-w-xl transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] focus-within:ring-4 ring-blue-400 group">
                                    <input
                                        type="text"
                                        placeholder="Tra cứu nhanh văn bản quy phạm pháp luật"
                                        className="flex-grow text-gray-800 outline-none bg-transparent placeholder-gray-400 text-xs md:text-sm font-medium"
                                    />
                                    <button className="bg-[#1a3b8b] text-white p-2 md:p-2.5 rounded-full group-hover:bg-[#0a3a73] transition-colors shadow-md ml-2 shrink-0">
                                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: TIÊU ĐIỂM HÔM NAY WITH VERTICAL TABS */}
                        <div className={`transition-all duration-700 ease-in-out transform mt-8 lg:mt-0 flex justify-center lg:justify-end shrink-0 ${isCollapsed ? 'w-0 max-w-0 opacity-0 scale-95 pointer-events-none overflow-hidden h-0 lg:h-auto' : 'w-full lg:w-[38%] opacity-100 scale-100'}`}>
                            <div className="w-[100vw] sm:w-[530px] max-w-[530px] flex flex-row items-stretch gap-3 h-[75vh] min-h-[600px] animate-float">
                                {/* Vertical Tab Bar on the Left */}
                                <div className="flex flex-col gap-3 shrink-0 justify-start py-2">
                                    <button
                                        type="button"
                                        onClick={() => setActiveSection(0)}
                                        className={`flex flex-col-reverse items-center justify-center py-5 px-1 w-[40px] rounded-2xl border transition-all duration-300 cursor-pointer ${activeSection === 0
                                            ? 'bg-white/20 backdrop-blur-xl border-amber-400 text-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                                            : 'bg-[#162e55]/30 backdrop-blur-md border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                            }`}
                                    >
                                        <Sparkles size={18} className={activeSection === 0 ? 'text-amber-400 animate-pulse shrink-0' : 'text-white/50 shrink-0'} />
                                        <span
                                            className="text-[11px] uppercase font-semibold mb-4 whitespace-nowrap"
                                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                        >
                                            Tiêu điểm
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSection(1)}
                                        className={`flex flex-col-reverse items-center justify-center py-5 px-1 w-[40px] rounded-2xl border transition-all duration-300 cursor-pointer ${activeSection === 1
                                            ? 'bg-white/20 backdrop-blur-xl border-amber-400 text-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                                            : 'bg-[#162e55]/30 backdrop-blur-md border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                            }`}
                                    >
                                        <MessageSquare size={18} className={activeSection === 1 ? 'text-amber-400 shrink-0' : 'text-white/50 shrink-0'} />
                                        <span
                                            className="text-[11px] uppercase font-semibold mb-4 whitespace-nowrap"
                                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                        >
                                            Hỏi đáp
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSection(2)}
                                        className={`flex flex-col-reverse items-center justify-center py-5 px-1 w-[40px] rounded-2xl border transition-all duration-300 cursor-pointer ${activeSection === 2
                                            ? 'bg-white/20 backdrop-blur-xl border-amber-400 text-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                                            : 'bg-[#162e55]/30 backdrop-blur-md border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                            }`}
                                    >
                                        <Bot size={18} className={activeSection === 2 ? 'text-amber-400 shrink-0' : 'text-white/50 shrink-0'} />
                                        <span
                                            className="text-[10px] uppercase font-semibold mb-4 whitespace-nowrap"
                                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                        >
                                            AI pháp luật
                                        </span>
                                    </button>
                                </div>

                                <div
                                    className={`flex-grow bg-gradient-to-br from-[#162e55]/60 via-[#102444]/60 to-[#0b172e]/65 backdrop-blur-xl border border-white/20 rounded-[28px] pt-6 pb-6 px-6 shadow-[0_25px_60px_rgba(0,0,0,0.65)] text-white relative overflow-hidden group select-none hover:shadow-[0_30px_60px_rgba(59,130,246,0.3)] hover:border-white/30 transition-all duration-500 flex flex-col`}
                                >
                                    {/* Decorative glowing gradient border glow */}
                                    <div className="absolute -inset-px bg-gradient-to-r from-sky-500/30 via-indigo-500/20 to-amber-500/25 rounded-[28px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Decorative background glows */}
                                    <div className="absolute -top-16 -left-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-700"></div>
                                    <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-colors duration-700"></div>

                                    {/* Card Header */}
                                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 shrink-0">
                                        <h3 className="text-[18px] md:text-[20px] font-bold uppercase flex items-center gap-2">
                                            {activeSection === 0 ? 'TIÊU ĐIỂM NỔI BẬT' : activeSection === 1 ? 'HỎI ĐÁP PHÁP LUẬT' : 'AI PHÁP LUẬT'}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-white/10 border border-white/10 rounded-full flex justify-center items-center">
                                                {activeSection === 0 ? (
                                                    <Sparkles size={14} className="text-amber-400 animate-pulse" />
                                                ) : activeSection === 1 ? (
                                                    <HelpCircle size={14} className="text-sky-400" />
                                                ) : (
                                                    <Bot size={14} className="text-amber-400 animate-pulse" />
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsCollapsed(true)}
                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full flex justify-center items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-105"
                                                title="Thu gọn bảng tin"
                                            >
                                                Thu gọn <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    {activeSection === 0 ? (
                                        /* TAB 1: LIST OF 5 ARTICLES */
                                        <div
                                            className="flex flex-col gap-2.5 flex-grow mt-2 overflow-hidden"
                                            onMouseEnter={() => setIsHoveredList(true)}
                                            onMouseLeave={() => setIsHoveredList(false)}
                                        >
                                            {/* Top Banner (Item 1) */}
                                            <div
                                                className={`w-full rounded-xl transition-all duration-300 cursor-pointer shadow-md shrink-0 group relative p-[1.5px] bg-gradient-to-r from-[#d4af37] via-[#fff3a8] to-[#aa7c11] animate-reveal-item ${activeHighlightIndex === 0
                                                    ? 'shadow-[0_10px_25px_rgba(212,175,55,0.45)] -translate-y-1 scale-[1.025] z-10'
                                                    : 'opacity-90 hover:opacity-100 hover:-translate-y-0.5 hover:scale-[1.01] hover:z-10 z-0'
                                                    }`}
                                                style={{ height: 'calc(16% - 8px)', animationDelay: '60ms' }}
                                                onClick={() => navigate('/tong-ra-soat')}
                                                onMouseEnter={() => setActiveHighlightIndex(0)}
                                            >
                                                <div className="w-full h-full rounded-[10px] overflow-hidden bg-black/20">
                                                    <img
                                                        src="/BO NHAN DIEN TONG RA SOAT/800x150.Banner chay.modern.jpg?v=1"
                                                        alt="Tổng rà soát hệ thống văn bản"
                                                        className={`w-full h-full object-fill transition-transform duration-700 ${activeHighlightIndex === 0 ? 'scale-105' : 'group-hover:scale-105'}`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Remaining 5 Articles */}
                                            {highlightSlides.slice(1, 6).map((slide, index) => {
                                                const slideIndex = index + 1;
                                                const isActive = activeHighlightIndex === slideIndex;
                                                return (
                                                    <div
                                                        key={slide.id}
                                                        className={`flex items-center gap-3 p-2 border rounded-xl transition-all duration-300 cursor-pointer group/item overflow-hidden shrink-0 relative animate-reveal-item ${isActive
                                                            ? 'bg-white/15 border-amber-500/40 shadow-[0_10px_25px_rgba(245,158,11,0.25)] -translate-y-1 scale-[1.025] z-10'
                                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15 hover:-translate-y-0.5 hover:scale-[1.01] hover:z-10 z-0'
                                                            }`}
                                                        style={{
                                                            height: 'calc(16.8% - 8px)',
                                                            animationDelay: `${(index + 1) * 80 + 60}ms`
                                                        }}
                                                        onClick={() => alert(`Xem chi tiết bài viết: ${slide.title}`)}
                                                        onMouseEnter={() => setActiveHighlightIndex(slideIndex)}
                                                    >
                                                        {/* Left glow line */}
                                                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />

                                                        {/* Left: Image (37% width) */}
                                                        <div className="w-[37%] shrink-0 h-full relative rounded-lg overflow-hidden border border-white/10">
                                                            <img
                                                                src={slide.image}
                                                                alt={slide.title}
                                                                className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-105' : 'group-hover/item:scale-105'}`}
                                                            />
                                                        </div>

                                                        {/* Right: Content (Chủ đề, Tiêu đề, Nội dung) (63% width) */}
                                                        <div className="w-[63%] flex-grow flex flex-col justify-center min-w-0 pr-1 gap-1">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase transition-all duration-300 ${slide.title.toLowerCase().includes('dự thảo')
                                                                    ? isActive
                                                                        ? 'bg-amber-500 text-slate-900 border border-amber-500'
                                                                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                                    : isActive
                                                                        ? 'bg-blue-500 text-white border border-blue-500'
                                                                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                                    }`}>
                                                                    {slide.title.toLowerCase().includes('dự thảo') ? 'Dự thảo' : 'Tiêu điểm'}
                                                                </span>
                                                                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">Hôm nay</span>
                                                            </div>
                                                            <h5 className={`text-[11px] md:text-[12px] font-bold transition-colors duration-300 line-clamp-1 leading-snug ${isActive ? 'text-amber-300' : 'text-white group-hover/item:text-amber-300'}`}>
                                                                {slide.title}
                                                            </h5>
                                                            <p className="text-[10px] md:text-[11px] text-gray-300 line-clamp-2 leading-normal">
                                                                {slide.summary}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : activeSection === 1 ? (
                                        /* TAB 2: DETAILED QUESTION FORM */
                                        <form onSubmit={handleQuickSubmit} className="flex flex-col flex-grow text-gray-800 justify-between h-full gap-4">
                                            <div className="flex flex-col gap-4 flex-grow justify-start">
                                                {/* Premium Stepper / Empathy Guide */}
                                                <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-3 flex flex-col gap-3 transition-all duration-300">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="flex h-2 w-2 relative">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                            </span>
                                                            <span className="text-[11px] font-bold text-sky-300 uppercase font-sans">Quy trình hỏi đáp</span>
                                                        </div>
                                                    </div>

                                                    {/* Interactive-looking Process Timeline */}
                                                    <div className="grid grid-cols-3 gap-2 text-[9px] text-gray-300 text-center font-medium relative">
                                                        {/* Connector lines */}

                                                        <div className="flex flex-col items-center gap-1 bg-white/5 py-2 px-1 rounded-xl border border-white/10 relative z-10 scale-105 shadow-md">
                                                            <span className="w-4.5 h-4.5 text-white rounded-full flex items-center justify-center font-bold text-[9px] shadow-[0_0_10px_rgba(14,165,233,0.3)]">1</span>
                                                            <span className="text-white font-semibold">Gửi câu hỏi</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1 bg-white/5 py-2 px-1 rounded-xl border border-white/10 relative z-10 scale-105 shadow-md">
                                                            <span className="w-4.5 h-4.5 text-white/60 rounded-full flex items-center justify-center font-bold text-[9px]">2</span>
                                                            <span className="text-white">Tiếp nhận</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1 bg-white/5 py-2 px-1 rounded-xl border border-white/10 relative z-10 scale-105 shadow-md">
                                                            <span className="w-4.5 h-4.5 text-white/60 rounded-full flex items-center justify-center font-bold text-[9px]">3</span>
                                                            <span className="text-white">Trả lời</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Form Inputs with Left Icons */}
                                                <div className="flex flex-col gap-3">
                                                    {/* Name and Domain Row */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[11px] font-bold text-gray-300 mb-1">Họ và tên *</label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                                    <User size={12} />
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    value="Nguyễn Văn A"
                                                                    disabled
                                                                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-2.5 py-2 text-[11px] text-white/70 cursor-not-allowed outline-none font-medium"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-bold text-gray-300 mb-1">Lĩnh vực *</label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                                    <Tag size={12} />
                                                                </span>
                                                                <select
                                                                    required
                                                                    name="quickDomain"
                                                                    value={quickFormData.domain}
                                                                    onChange={(e) => setQuickFormData({ ...quickFormData, domain: e.target.value })}
                                                                    className="w-full bg-white/15 border border-white/20 rounded-xl pl-9 pr-2.5 py-2 text-[11px] text-white outline-none focus:border-sky-400 focus:bg-white/25 transition cursor-pointer font-medium"
                                                                >
                                                                    <option value="" disabled className="text-gray-500">-- Chọn lĩnh vực --</option>
                                                                    <option value="Dân sự" className="bg-[#0c1e3d] text-white">Dân sự</option>
                                                                    <option value="Hình sự" className="bg-[#0c1e3d] text-white">Hình sự</option>
                                                                    <option value="Lao động" className="bg-[#0c1e3d] text-white">Lao động</option>
                                                                    <option value="Doanh nghiệp" className="bg-[#0c1e3d] text-white">Doanh nghiệp</option>
                                                                    <option value="Đất đai" className="bg-[#0c1e3d] text-white">Đất đai</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Question Title */}
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Tiêu đề câu hỏi *</label>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                                <HelpCircle size={12} />
                                                            </span>
                                                            <input
                                                                required
                                                                type="text"
                                                                placeholder="Nhập tiêu đề ngắn gọn..."
                                                                value={quickFormData.title}
                                                                onChange={(e) => setQuickFormData({ ...quickFormData, title: e.target.value })}
                                                                className="w-full bg-white/15 border border-white/20 rounded-xl pl-9 pr-2.5 py-2 text-[11px] text-white placeholder-white/50 outline-none focus:border-sky-400 focus:bg-white/25 transition font-medium"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Detailed Content */}
                                                    <div className="flex flex-col">
                                                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Nội dung chi tiết *</label>
                                                        <textarea
                                                            required
                                                            placeholder="Mô tả hoàn cảnh và vấn đề pháp lý bạn cần giải đáp..."
                                                            value={quickFormData.content}
                                                            onChange={(e) => setQuickFormData({ ...quickFormData, content: e.target.value })}
                                                            className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2.5 text-[11px] text-white placeholder-white/50 outline-none focus:border-sky-400 focus:bg-white/25 transition resize-none leading-normal h-[105px] font-medium"
                                                            maxLength={500}
                                                        />
                                                        <p className="text-right text-[9px] text-gray-400 mt-1 font-semibold">{quickFormData.content.length}/500 ký tự</p>
                                                    </div>

                                                    {/* File Attachment */}
                                                    <div className="flex flex-col">
                                                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Tài liệu đính kèm (tùy chọn)</label>
                                                        <div className="relative">
                                                            <input
                                                                type="file"
                                                                multiple
                                                                className="hidden"
                                                                id="file-upload"
                                                            />
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="flex items-center justify-between w-full bg-white/10 border border-white/20 border-dashed rounded-xl px-3 py-2 text-[11px] text-gray-300 hover:bg-white/20 hover:border-sky-400 transition cursor-pointer font-medium"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <Paperclip size={12} className="text-sky-300" />
                                                                    <span className="text-white/70">Đính kèm file (Tối đa 5 file, &lt; 10MB)</span>
                                                                </div>
                                                                <span className="bg-sky-500 hover:bg-sky-400 text-white px-2 py-1 rounded-md text-[9px] transition-colors shadow-sm">Chọn file</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom actions & stats */}
                                            <div className="flex flex-col gap-3 mt-auto font-medium">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-[#00bdf2] to-[#0072ff] hover:from-[#33cbf5] hover:to-[#338dff] text-white font-bold py-2.5 px-4 rounded-xl text-[13px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,114,255,0.4)] hover:shadow-[0_4px_20px_rgba(0,114,255,0.6)] hover:scale-[1.01] cursor-pointer shrink-0"
                                                >
                                                    <Send size={14} className="animate-pulse" /> Gửi câu hỏi nhanh
                                                </button>

                                                {/* Empathy statistics bar */}
                                                <div className="flex items-center justify-between border-t border-white/10 pt-3 px-1 text-[10px] text-gray-400 font-medium">

                                                </div>
                                            </div>
                                        </form>
                                    ) : null}

                                    {/* TAB 3: AI PHÁP LUẬT */}
                                    {activeSection === 2 && (
                                        <div className="flex flex-col gap-2 h-full flex-grow mt-2 overflow-hidden pb-1">
                                            {/* AI 1: AI BKAV (BLEGAL) */}
                                            <div className="flex-1 border border-white/10 rounded-xl p-3 hover:border-sky-400/40 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 shadow-md hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)] flex flex-col items-center text-center group relative overflow-hidden">
                                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-500/20 rounded-full blur-[20px] group-hover:bg-sky-500/30 transition-all duration-500 pointer-events-none"></div>

                                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-sky-400/40 p-1.5 transition-all duration-300 mb-1.5 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.2)] group-hover:-translate-y-0.5">
                                                    <img src="/BO NHAN DIEN TONG RA SOAT/icon_BLegal.png" alt="Logo BKAV BLegal" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                                                </div>

                                                <div className="z-10 mb-2 flex-grow flex flex-col justify-center w-full">
                                                    <h3 className="font-bold text-white text-[12px] md:text-[14px] uppercase group-hover:text-sky-400 transition-colors mb-0.5 line-clamp-1">Trợ lý số BKAV</h3>
                                                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">Hỗ trợ tư vấn pháp luật tự động cho công dân, dựa trên mô hình ngôn ngữ lớn chuyên sâu.</p>
                                                </div>

                                                <div className="w-full flex gap-2 z-10 mt-auto">
                                                    <button onClick={() => navigate('/tong-ra-soat/ai/blegal')} className="flex-1 bg-white/5 border border-white/20 hover:border-white/50 text-white/90 hover:text-white font-semibold py-1.5 px-2 rounded-lg transition-all text-[11px] backdrop-blur-md hover:bg-white/10">
                                                        Giới thiệu
                                                    </button>
                                                    <a href="https://chatbotlandingpage.demozone.vn" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] border border-transparent text-white font-bold py-1.5 px-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] transition-all text-center text-[11px] flex items-center justify-center group-hover:scale-[1.02]">
                                                        Truy cập
                                                    </a>
                                                </div>
                                            </div>

                                            {/* AI 2: CMC AI - CLS */}
                                            <div className="flex-1 border border-white/10 rounded-xl p-3 hover:border-sky-400/40 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 shadow-md hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)] flex flex-col items-center text-center group relative overflow-hidden">
                                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-500/20 rounded-full blur-[20px] group-hover:bg-sky-500/30 transition-all duration-500 pointer-events-none"></div>

                                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-sky-400/40 p-1.5 transition-all duration-300 mb-1.5 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.2)] group-hover:-translate-y-0.5">
                                                    <img src="/BO NHAN DIEN TONG RA SOAT/Logo C-AI Legal.png" alt="Logo C-AI Legal" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                                                </div>

                                                <div className="z-10 mb-2 flex-grow flex flex-col justify-center w-full">
                                                    <h3 className="font-bold text-white text-[12px] md:text-[14px] uppercase group-hover:text-sky-400 transition-colors mb-0.5 line-clamp-1">C-AI Legal</h3>
                                                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">Hệ thống AI rà soát mâu thuẫn, kiểm tra tính hợp pháp và đồng bộ của văn bản.</p>
                                                </div>

                                                <div className="w-full flex gap-2 z-10 mt-auto">
                                                    <button onClick={() => navigate('/tong-ra-soat/ai/cls')} className="flex-1 bg-white/5 border border-white/20 hover:border-white/50 text-white/90 hover:text-white font-semibold py-1.5 px-2 rounded-lg transition-all text-[11px] backdrop-blur-md hover:bg-white/10">
                                                        Giới thiệu
                                                    </button>
                                                    <a href="https://cls.cmcai.vn/" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] border border-transparent text-white font-bold py-1.5 px-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] transition-all text-center text-[11px] flex items-center justify-center group-hover:scale-[1.02]">
                                                        Truy cập
                                                    </a>
                                                </div>
                                            </div>

                                            {/* AI 3: AI LEXcentra */}
                                            <div className="flex-1 border border-white/10 rounded-xl p-3 hover:border-sky-400/40 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 shadow-md hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)] flex flex-col items-center text-center group relative overflow-hidden">
                                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-sky-500/20 rounded-full blur-[20px] group-hover:bg-sky-500/30 transition-all duration-500 pointer-events-none"></div>

                                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-sky-400/40 p-1.5 transition-all duration-300 mb-1.5 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.2)] group-hover:-translate-y-0.5">
                                                    <img src="/BO NHAN DIEN TONG RA SOAT/logo-lex.svg" alt="Logo LEXcentra" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 brightness-0 invert opacity-90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]" />
                                                </div>

                                                <div className="z-10 mb-2 flex-grow flex flex-col justify-center w-full">
                                                    <h3 className="font-bold text-white text-[12px] md:text-[14px] uppercase group-hover:text-sky-400 transition-colors mb-0.5 line-clamp-1">AI LEXCENTRA</h3>
                                                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">Phân tích rủi ro pháp lý, rà soát tính đồng bộ, mâu thuẫn và đề xuất phương án.</p>
                                                </div>

                                                <div className="w-full flex gap-2 z-10 mt-auto">
                                                    <button onClick={() => navigate('/tong-ra-soat/ai/lex')} className="flex-1 bg-white/5 border border-white/20 hover:border-white/50 text-white/90 hover:text-white font-semibold py-1.5 px-2 rounded-lg transition-all text-[11px] backdrop-blur-md hover:bg-white/10">
                                                        Giới thiệu
                                                    </button>
                                                    <a href="https://lexcentra.phapluat.gov.vn/home" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] border border-transparent text-white font-bold py-1.5 px-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] transition-all text-center text-[11px] flex items-center justify-center group-hover:scale-[1.02]">
                                                        Truy cập
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Collapsed Restore Button */}
            {isCollapsed && (
                <div
                    onClick={() => setIsCollapsed(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-[#0c1e3d]/95 backdrop-blur-md border border-r-0 border-white/20 hover:border-amber-500/40 text-white rounded-l-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-[#0e2a52] hover:-translate-x-1 transition-all duration-300 flex flex-col items-center py-5 px-3 gap-2 group/restore"
                    title="Mở rộng bảng Tiêu điểm & Hỏi đáp"
                >
                    <ChevronLeft size={16} className="text-amber-400 animate-pulse group-hover/restore:-translate-x-0.5 transition-transform" />
                    <span
                        className="text-[10px] uppercase font-bold text-amber-400 select-none mt-1 font-sans"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        Hiện Tiêu điểm & Hỏi đáp
                    </span>
                </div>
            )}

            {/* Scroll indicator animation */}
            <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-white/60 text-[10px] uppercase mb-1.5">Khám phá</span>
                <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

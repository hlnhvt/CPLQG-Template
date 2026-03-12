import React, { useState, useRef } from 'react';
import { Clock, PlayCircle, Star, Radio, Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Sub-Navigator Category Tabs ---
const NEWS_CATEGORIES = [
    { label: 'Tin hoạt động', path: '/tin-tuc/noi-bat' },
    { label: 'Đưa Nghị quyết Đại hội XIV của Đảng vào cuộc sống', path: '/tin-tuc/noi-bat' },
    { label: 'Multimedia', path: '/tin-tuc/noi-bat' },
    { label: 'Chính sách mới', path: '/tin-tuc/noi-bat' },
    { label: 'Thời sự pháp luật', path: '/tin-tuc/noi-bat' },
    { label: 'Radio pháp luật', path: '/tin-tuc/noi-bat' },
    { label: 'Kỳ họp thứ 10, Quốc hội khóa XV', path: '/tin-tuc/noi-bat' },
    { label: 'Câu chuyện thành công', path: '/cau-chuyen-thanh-cong' },
    { label: 'Trung tâm trợ lý pháp luật', path: '/tin-tuc/noi-bat' },
];

const SubNavigator = ({ activeLabel }) => {
    const scrollRef = useRef(null);
    const [showArrow, setShowArrow] = useState(true);
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowArrow(scrollLeft + clientWidth < scrollWidth - 8);
    };
    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[90]">
            <div className="container mx-auto px-4 max-w-[1400px]">
                <div className="flex items-center h-11">
                    <div className="shrink-0 pr-3 border-r border-gray-200 flex items-center text-blue-600">
                        <Newspaper size={18} />
                    </div>
                    <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-x-auto flex items-center gap-1 px-3" style={{ scrollbarWidth: 'none' }}>
                        {NEWS_CATEGORIES.map((cat) => {
                            const isActive = cat.label === activeLabel;
                            return (
                                <Link key={cat.label} to={cat.path} className={`whitespace-nowrap text-[13px] font-medium px-3 py-2 border-b-2 transition-colors shrink-0 ${isActive ? 'border-red-600 text-red-600 font-semibold' : 'border-transparent text-gray-600 hover:text-red-600 hover:border-red-300'}`}>
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                    {showArrow && (
                        <button onClick={scrollRight} className="shrink-0 pl-2 border-l border-gray-200 text-gray-400 hover:text-blue-600 transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-video w-full relative overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
);

// Sample news IDs - in real app these come from API
const ARTICLE_IDS = { main: 1, left1: 2, left2: 3, left3: 4, right1: 5, right2: 6 };

const NewsHighlightsPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            {/* Sub Navigator */}
            <SubNavigator activeLabel="Tin hoạt động" />

            <div className="container mx-auto px-4 py-8 max-w-[1400px]">
                
                {/* 1. Top Banner */}
                <div className="mb-8 rounded-lg overflow-hidden relative shadow-md bg-red-700 h-28 md:h-36 flex items-center justify-center border-b-4 border-yellow-400">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                    <div className="relative text-center z-10">
                        <div className="flex justify-center mb-1">
                            <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        </div>
                        <h2 className="text-white text-xl md:text-3xl font-bold tracking-wider uppercase drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Đưa nghị quyết đại hội XIV của Đảng vào cuộc sống
                        </h2>
                    </div>
                </div>

                {/* 2. Tin tức nổi bật */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase">Tin tức nổi bật</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Cột Trái (3 tin nhỏ) */}
                        <div className="lg:col-span-1 flex flex-col space-y-4">
                            {[2, 3, 4].map((id) => (
                                <Link key={id} to={`/news/${id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt={`News ${id}`} className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h3 className="font-bold text-[13px] md:text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-3 leading-snug">Bộ Tư pháp đề nghị mang tới các giải pháp tháo gỡ khó khăn cho doanh nghiệp...</h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                            <Clock size={12} /> <span>12/03/2026</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Cột Giữa (1 tin cực lớn) */}
                        <Link to="/news/1" className="lg:col-span-2 group flex flex-col">
                            <div className="w-full mb-4 shrink-0">
                                <Image16x9 src="/thumb1.png" alt="Main News" className="rounded-lg shadow-sm border border-gray-100" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className="text-xl md:text-[22px] font-bold text-[#0f4c81] group-hover:text-blue-700 mb-2 leading-tight">
                                    Hướng tới bầu cử đại biểu Quốc hội khóa XVI và đại biểu HĐND các cấp nhiệm kỳ 2026-2031: Đặt công tác bảo đảm an ninh, trật tự lên hàng đầu
                                </h3>
                                <p className="text-gray-600 text-[14px] mb-3 line-clamp-2 leading-relaxed">
                                    Chiều 10/3, Đoàn công tác của Hội đồng bầu cử quốc gia do Phó Chủ tịch Quốc hội Nguyễn Khắc Định làm Trưởng đoàn đã có buổi làm việc với Ủy ban bầu cử tỉnh...
                                </p>
                                <div className="mt-auto flex items-center gap-1 text-[12px] text-gray-400">
                                    <Clock size={14} /> <span>11/03/2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* Cột Phải (2 tin) */}
                        <div className="lg:col-span-1 flex flex-col space-y-6">
                            {[5, 6].map((id) => (
                                <Link key={id} to={`/news/${id}`} className="group flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-full mb-3 shrink-0">
                                        <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt={`News Side ${id}`} className="rounded" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#0f4c81] mb-2 leading-snug line-clamp-3">
                                            Xây dựng đội ngũ luật sư và bàn thảo chính sách nâng cao kỷ nguyên...
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                            <Clock size={12} /> <span>11/03/2026</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Chính sách mới */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">Chính sách mới</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Chiếm 3 cột trái */}
                        <div className="lg:col-span-3 flex flex-col">
                            {/* Tin lớn nằm ngang */}
                            <Link to="/news/7" className="flex items-start gap-6 group border-b border-gray-100 pb-8 mb-8">
                                <div className="w-[50%] shrink-0">
                                    <Image16x9 src="/thumb1.png" alt="Policy" className="rounded-lg shadow-sm border border-gray-100" />
                                </div>
                                <div className="w-[50%] flex flex-col min-w-0">
                                    <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 group-hover:text-[#0f4c81] mb-3 leading-tight line-clamp-4">Cử tri có thể đổi nơi bỏ phiếu, xem danh sách ứng cử viên trên VNeID trong thời gian sớm nhất</h3>
                                    <p className="text-gray-600 text-[14px] leading-relaxed mb-4 line-clamp-2">
                                        Cục Cảnh sát quản lý hành chính về trật tự xã hội (Bộ Công an) cho biết cử tri có thể báo cáo khai danh tính điện tử mức 2 có thể tra cứu khu vực bỏ phiếu...
                                    </p>
                                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                        <Clock size={14} /> <span>10/03/2026</span>
                                    </div>
                                </div>
                            </Link>
                            
                            {/* 3 tin nhỏ phía dưới */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[8, 9, 10].map((id) => (
                                    <Link key={id} to={`/news/${id}`} className="group flex flex-col">
                                        <div className="w-full shrink-0 mb-3">
                                            <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt="Sub Policy" className="rounded-lg" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h4 className="font-bold text-[14px] text-gray-800 group-hover:text-[#0f4c81] line-clamp-3 leading-snug mb-2">Thủ tục tham gia bảo hiểm xã hội bắt buộc qua giao dịch điện tử được đơn giản hóa</h4>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                                <Clock size={12} /> <span>09/03/2026</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        
                        {/* Banner bên phải */}
                        <div className="lg:col-span-1 h-full">
                            <div className="rounded-xl overflow-hidden bg-[#fff2e6] text-[#c92a2a] p-6 h-full flex flex-col items-center justify-center text-center shadow border border-red-200 cursor-pointer min-h-[350px]">
                                <Star className="text-yellow-500 fill-yellow-500 mb-2" size={32} />
                                <Star className="text-yellow-500 fill-yellow-500 mb-6" size={56} />
                                <h3 className="font-bold text-[22px] uppercase tracking-wide leading-snug">Hoàn thiện <br/>Chính sách, thể chế <br/>Góp phần đưa đất nước <br/>Bước vào kỷ nguyên mới</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Tin hoạt động & Thời sự pháp luật */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    {/* Tin hoạt động */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">Tin hoạt động</h2>
                        <Link to="/news/11" className="flex items-start gap-4 group mb-6 border-b border-gray-100 pb-6">
                            <div className="w-[50%] shrink-0">
                                <Image16x9 src="/thumb2.png" alt="Activity" className="rounded" />
                            </div>
                            <div className="w-[50%] flex flex-col min-w-0">
                                <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">Tiếp tục ưu tiên nguồn lực trọng tâm vào xây dựng pháp luật tại các vùng kinh tế</h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                    <Clock size={12} /> <span>10/03/2026</span>
                                </div>
                            </div>
                        </Link>
                        <div className="space-y-4">
                            {[12, 13].map((id) => (
                                <Link key={id} to={`/news/${id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt="Sub Activity" className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">Hướng dẫn giải quyết vướng mắc trong phân bổ nguồn thu ngân sách nhà nước</h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>09/03/2026</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    {/* Thời sự pháp luật */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">Thời sự pháp luật</h2>
                        <Link to="/news/14" className="flex items-start gap-4 group mb-6 border-b border-gray-100 pb-6">
                            <div className="w-[50%] shrink-0">
                                <Image16x9 src="/thumb3.png" alt="Current Affairs" className="rounded" />
                            </div>
                            <div className="w-[50%] flex flex-col min-w-0">
                                <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">Hướng tới bầu cử đại biểu Quốc hội khoá XVI và đại biểu HĐND các cấp</h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                    <Clock size={12} /> <span>08/03/2026</span>
                                </div>
                            </div>
                        </Link>
                        <div className="space-y-4">
                            {[15, 16].map((id) => (
                                <Link key={id} to={`/news/${id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt="Sub Affair" className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">Bộ Tư pháp đề nghị tăng cường hỗ trợ tháo gỡ khó khăn doanh nghiệp</h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>07/03/2026</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. Radio Pháp Luật */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-red-700 pb-2 inline-flex pr-8">
                        <h2 className="text-2xl font-bold text-[#0f4c81] uppercase tracking-wide">Radio Pháp luật</h2>
                    </div>
                    
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-3">
                        {/* Video Player */}
                        <Link to="/news/20" className="lg:col-span-2 relative group aspect-video bg-black overflow-hidden shadow-sm block">
                            <img src="/thumb1.png" alt="Video Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all drop-shadow-md" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-left">
                                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow">Nhiều góp ý hoàn thiện dự thảo văn kiện trình Đại hội Đảng XIV</h3>
                            </div>
                        </Link>
                        
                        {/* Playlist */}
                        <div className="lg:col-span-1 p-4 h-full flex flex-col bg-white">
                            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                {[21, 22, 23, 24].map((id, idx) => (
                                    <Link key={id} to={`/news/${id}`} className="flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-gray-50 group">
                                        <div className="w-[100px] shrink-0">
                                            <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-200 rounded">
                                                <img src={`/thumb${(idx % 3) + 1}.png`} alt="Thumb" className="absolute inset-0 w-full h-full object-cover" />
                                                {idx === 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><PlayCircle size={20} className="text-white" /></div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h5 className="font-semibold text-[13px] line-clamp-2 leading-snug text-gray-800 group-hover:text-[#0f4c81]">
                                                {idx === 0 ? "Thủ tướng phân tích tầm nhìn cao, tầm nhìn dài hạn..." : "Đồng bộ về pháp lý để tháo gỡ khó khăn cho các dự án..."}
                                            </h5>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                                <Clock size={12} /> <span>12/11/2025</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Filter Menu */}
                <div className="py-4 border-y border-gray-100 mb-10 overflow-x-auto hidden md:block">
                    <ul className="flex justify-center items-center gap-8 min-w-max text-[14px] font-bold text-gray-700">
                        <li><span className="text-white bg-blue-50 px-4 py-1.5 rounded-full cursor-pointer whitespace-nowrap shadow-sm"><Radio className="inline text-blue-500 mr-2" size={16}/>Mới nhất</span></li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Tin hoạt động</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Đưa Nghị quyết vào cuộc sống</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Chính sách mới</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Thời sự pháp luật</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Radio pháp luật</li>
                    </ul>
                </div>

                {/* 7. Hai cột cuối cùng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Cột trái */}
                    <div className="space-y-6 md:pr-4">
                        {[30, 31, 32].map((id) => (
                            <Link key={id} to={`/news/${id}`} className="flex items-start gap-5 group border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <div className="w-[40%] shrink-0">
                                    <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt="List" className="rounded shadow-sm" />
                                </div>
                                <div className="w-[60%] flex flex-col min-w-0">
                                    <h3 className="font-bold text-[15px] xl:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight line-clamp-3 mb-2">
                                        Khẩn trương xây dựng hạ tầng công nghệ thông tin lớn mạnh, chuyển đổi số quốc gia
                                    </h3>
                                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                        <Clock size={12} /> <span>06/03/2026</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Cột phải */}
                    <div className="space-y-6 md:pl-4">
                        {[33, 34, 35].map((id) => (
                            <Link key={id} to={`/news/${id}`} className="flex items-start gap-5 group border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <div className="w-[40%] shrink-0">
                                    <Image16x9 src={`/thumb${(id % 3) + 1}.png`} alt="List" className="rounded shadow-sm" />
                                </div>
                                <div className="w-[60%] flex flex-col min-w-0">
                                    <h3 className="font-bold text-[15px] xl:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight line-clamp-3 mb-2">
                                        Cần rà soát lại phạm vi cải cách thủ tục hành chính dựa trên dữ liệu chuẩn
                                    </h3>
                                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                        <Clock size={12} /> <span>04/03/2026</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewsHighlightsPage;

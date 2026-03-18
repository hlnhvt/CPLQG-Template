import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Users, BookOpen, Newspaper, FileText, Database, ChevronRight,
    ArrowRight, Globe, MonitorPlay, CheckCircle2, Clock, ChevronLeft
} from 'lucide-react';

const MOCK_NEWS_HOAT_DONG = [
    { id: 1, title: 'Tiếp tục ưu tiên nguồn lực trọng tâm vào xây dựng pháp luật tại các vùng kinh tế', date: '10/03/2026', image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 2, title: 'Hướng dẫn giải quyết vướng mắc trong phân bổ nguồn thu ngân sách nhà nước', date: '09/03/2026', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 3, title: 'Ban Chỉ đạo Trung ương kiểm tra tiến độ rà soát tại các tỉnh phía Nam', date: '08/03/2026', image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=200&h=150' },
];

const MOCK_NEWS_THOI_SU = [
    { id: 4, title: 'Hướng tới bầu cử đại biểu Quốc hội khoá XVI và đại biểu HĐND các cấp', date: '08/03/2026', image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 5, title: 'Bộ Tư pháp đề nghị tăng cường hỗ trợ tháo gỡ khó khăn doanh nghiệp', date: '07/03/2026', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 6, title: 'Triển khai công tác kiểm tra văn bản quy phạm pháp luật năm 2026', date: '06/03/2026', image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=200&h=150' },
];

const MOCK_MEMBERS = [
    {
        id: 1, name: 'Nguyễn Văn Lập',
        role: 'Trưởng Ban Chỉ đạo, Bộ trưởng',
        image: '/images/officials/vietnamese_official_4_1773807527731.png'
    },
    {
        id: 2, name: 'Trần Đình Tùng',
        role: 'Phó Trưởng Ban Chỉ đạo thường trực',
        image: '/images/officials/vietnamese_official_1_1773807475011.png'
    },
    {
        id: 3, name: 'Lê Minh Quang',
        role: 'Phó Trưởng Ban Chỉ đạo',
        image: '/images/officials/vietnamese_official_2_1773807493162.png'
    },
    {
        id: 4, name: 'Phạm Tuấn Anh',
        role: 'Ủy viên Ban Chỉ đạo, Cục trưởng',
        image: '/images/officials/vietnamese_official_3_1773807510279.png'
    },
    {
        id: 5, name: 'Hoàng Thanh Bình',
        role: 'Ủy viên Ban Chỉ đạo, Vụ trưởng',
        image: '/images/officials/vietnamese_official_1_1773807475011.png'
    },
    {
        id: 6, name: 'Vũ Ngọc Thắng',
        role: 'Ủy viên Ban Chỉ đạo, Giám đốc Sở',
        image: '/images/officials/vietnamese_official_2_1773807493162.png'
    },
    {
        id: 7, name: 'Lê Hoài Thanh',
        role: 'Ủy viên Ban Chỉ đạo, Chánh Văn phòng',
        image: '/images/officials/vietnamese_official_3_1773807510279.png'
    },
];

const MOCK_DOCS = [
    { title: 'Quyết định số 123/QĐ-TTg về việc thành lập Ban Chỉ đạo Trung ương', type: 'Văn bản chỉ đạo' },
    { title: 'Kế hoạch số 45/KH-BTP triển khai tổng rà soát hệ thống VBQPPL', type: 'Văn bản chỉ đạo' },
    { title: 'Sổ tay nghiệp vụ rà soát, hệ thống hóa VBQPPL (Phát hành năm 2026)', type: 'Hướng dẫn nghiệp vụ' },
    { title: 'Công văn số 789/BTP-KTrVB đôn đốc báo cáo kết quả rà soát', type: 'Văn bản chỉ đạo' },
];

const MOCK_LINKS = [
    { name: 'CSDL quốc gia về VBPL', url: 'https://vbpl.vn', icon: Database },
    { name: 'Cổng thông tin Đảng Cộng sản', url: '#', icon: Globe },
    { name: 'Trang thông tin Chính phủ', url: '#', icon: Globe },
    { name: 'CSDL Điều ước quốc tế', url: '#', icon: Database },
];

const TongRaSoatPage = () => {
    const [activeTab, setActiveTab] = useState('ban-chi-dao');
    const scrollContainerRef = useRef(null);

    const scrollTabs = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Scrolling marquee text
    const marqueeText = "Tin mới nhận: Báo cáo kết quả rà soát quý I/2026 phải được gửi trước ngày 15/04/2026. | Trọng tâm công tác rà soát năm nay tập trung vào các văn bản liên quan đến đất đai và đầu tư công.";

    const tabs = [
        { id: 'ban-chi-dao', label: 'Ban Chỉ đạo' },
        { id: 'chi-dao-huong-dan', label: 'Chỉ đạo, hướng dẫn nghiệp vụ' },
        { id: 'tin-tuc-hoat-dong', label: 'Tin tức hoạt động' },
        { id: 'van-ban-tai-lieu', label: 'Văn bản, tài liệu phục vụ tổng rà soát hệ thống VBQPPL' },
        { id: 'he-thong-thong-tin', label: 'Hệ thống thông tin báo cáo' }
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16 font-sans">
            {/* Header / Banner Area */}
            <div className="bg-[#1a3b8b] text-white">


                {/* Horizontal Navigation Tabs */}
                <div className="bg-white px-4 border-b border-gray-200 shadow-sm mt-4 text-black">
                    <div className="container mx-auto max-w-[1400px]">
                        <div className="mb-4 pt-6">
                            <h2 className="text-[#0a3a73] gap-1 text-base md:text-lg font-bold text-center block max-w-5xl mx-auto leading-relaxed px-4">
                                Nghị quyết số 66-NQ/TW ngày 30/4/2025 của Bộ Chính trị về đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới
                            </h2>
                        </div>
                        <div className="relative flex items-center mb-6 max-w-7xl mx-auto px-10">
                            <button
                                onClick={() => scrollTabs('left')}
                                className="absolute left-0 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 focus:outline-none"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <ul
                                ref={scrollContainerRef}
                                className="flex flex-nowrap overflow-x-auto items-center justify-start gap-2 md:gap-4 py-4 px-2 no-scrollbar border-b border-gray-100 mx-auto w-full scroll-smooth"
                            >
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <li key={tab.id} className="shrink-0 text-center">
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`py-2 px-6 rounded-full font-bold transition-all text-sm whitespace-nowrap
                                                    ${isActive
                                                        ? 'bg-[#007bff] text-white shadow-md'
                                                        : 'text-gray-600 hover:text-[#007bff] hover:bg-gray-50'
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                onClick={() => scrollTabs('right')}
                                className="absolute right-0 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 focus:outline-none"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chạy Title (Marquee) */}
                <div className="bg-red-700 text-white font-medium text-sm py-2 overflow-hidden flex items-center shadow-md relative z-10">
                    <div className="container mx-auto px-4 max-w-[1280px] flex">
                        <span className="shrink-0 font-bold bg-white text-red-700 px-3 py-0.5 rounded mr-4 uppercase text-xs flex items-center shadow-sm z-20">
                            Tin nổi bật
                        </span>
                        <div className="marquee-container flex-1 overflow-hidden relative">
                            {/* Simple CSS animation fallback implementation */}
                            <div className="whitespace-nowrap animate-marquee">
                                {marqueeText} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {marqueeText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px] mt-6">
                {/* Breadcrumb */}
                {/* <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-6">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium">Tổng rà soát hệ thống VBQPPL</span>
                    <ChevronRight size={12} />
                    <span className="text-[#1a3b8b] font-bold">{tabs.find(t => t.id === activeTab)?.label}</span>
                </nav> */}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content Area (3 Columns) */}
                    <div className="lg:col-span-3">
                        {/* Tab 1: Ban Chỉ đạo */}
                        {activeTab === 'ban-chi-dao' && (
                            <div className="space-y-10 animate-fadeIn bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-2">
                                {/* Trưởng ban */}
                                <div className="flex justify-center">
                                    <div className="group cursor-pointer rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 w-[240px] border border-gray-200 bg-white">
                                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                                            <img src={MOCK_MEMBERS[0].image} alt={MOCK_MEMBERS[0].name} className="w-full h-full object-cover object-top" />
                                        </div>
                                        <div className="bg-[#0a3a73] text-center p-4">
                                            <div className="text-[#fdb714] font-bold text-sm mb-1 uppercase">Đồng chí</div>
                                            <h3 className="text-white font-bold text-lg mb-2">{MOCK_MEMBERS[0].name}</h3>
                                            <p className="text-white text-[10px] uppercase leading-snug">
                                                {MOCK_MEMBERS[0].role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Phó Trưởng ban */}
                                <div className="flex justify-center gap-8 flex-wrap">
                                    {MOCK_MEMBERS.slice(1, 3).map((member) => (
                                        <div key={member.id} className="group cursor-pointer rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 w-[220px] border border-gray-200 bg-white">
                                            <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                                            </div>
                                            <div className="bg-[#0a3a73] text-center p-3 h-[130px] flex flex-col justify-center">
                                                <div className="text-[#fdb714] font-bold text-xs mb-1 uppercase">Đồng chí</div>
                                                <h3 className="text-white font-bold text-base mb-1">{member.name}</h3>
                                                <p className="text-white text-[10px] uppercase leading-tight line-clamp-3">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Ủy viên */}
                                <div className="flex justify-center gap-6 flex-wrap">
                                    {MOCK_MEMBERS.slice(3, 7).map((member) => (
                                        <div key={member.id} className="group cursor-pointer rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 w-[200px] border border-gray-200 bg-white">
                                            <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                                            </div>
                                            <div className="bg-[#0a3a73] text-center p-3 h-[130px] flex flex-col justify-center">
                                                <div className="text-[#fdb714] font-bold text-xs mb-1 uppercase">Đồng chí</div>
                                                <h3 className="text-white font-bold text-[15px] mb-1">{member.name}</h3>
                                                <p className="text-white text-[9px] uppercase leading-tight line-clamp-4">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Chỉ đạo - Hướng dẫn nghiệp vụ */}
                        {activeTab === 'chi-dao-huong-dan' && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fadeIn mt-2">
                                <h2 className="text-xl font-bold text-[#1a3b8b] mb-6 border-l-4 border-[#fdb714] pl-3 uppercase">
                                    Chỉ đạo & Hướng dẫn nghiệp vụ
                                </h2>

                                <div className="space-y-8">
                                    {/* Nhóm 1 */}
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                            1. Văn bản chỉ đạo
                                        </h3>
                                        <ul className="space-y-3 pl-2">
                                            {MOCK_DOCS.filter(d => d.type === 'Văn bản chỉ đạo').map((doc, idx) => (
                                                <li key={idx} className="flex items-start gap-3 group">
                                                    <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                                    <Link to="#" className="text-gray-700 hover:text-blue-700 hover:underline font-medium">
                                                        {doc.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Nhóm 2 */}
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                            2. Hướng dẫn nghiệp vụ
                                        </h3>
                                        <ul className="space-y-3 pl-2">
                                            {MOCK_DOCS.filter(d => d.type === 'Hướng dẫn nghiệp vụ').map((doc, idx) => (
                                                <li key={idx} className="flex items-start gap-3 group">
                                                    <BookOpen size={18} className="text-amber-600 mt-0.5 shrink-0" />
                                                    <Link to="#" className="text-gray-700 hover:text-blue-700 hover:underline font-medium">
                                                        {doc.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200 flex gap-3">
                                    <Globe className="shrink-0 mt-0.5" size={18} />
                                    <span><strong>Yêu cầu cấu hình kỹ thuật:</strong> Các văn bản có chứa liên kết nội bộ sẽ tự động được điều hướng tới Trang nguồn đăng tải chính thống khi nhấn vào.</span>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Tin tức */}
                        {activeTab === 'tin-tuc-hoat-dong' && (
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 animate-fadeIn mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Cột 1: TIN HOẠT ĐỘNG */}
                                    <div>
                                        <div className="border-b border-gray-200 mb-6">
                                            <h2 className="text-[#0a3a73] font-bold text-lg uppercase pb-2 border-b-[3px] border-red-600 inline-block mb-[-2px]">
                                                TIN HOẠT ĐỘNG
                                            </h2>
                                        </div>

                                        <div className="space-y-6">
                                            {MOCK_NEWS_HOAT_DONG.map((news, index) => (
                                                <div key={news.id} className={`flex ${index === 0 ? 'flex-col' : 'flex-row'} gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0`}>
                                                    <div className={`shrink-0 overflow-hidden rounded border border-gray-100 ${index === 0 ? 'w-full aspect-[16/9]' : 'w-[140px] h-[90px]'}`}>
                                                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    </div>
                                                    <div className="flex flex-col flex-1">
                                                        <h3 className={`font-bold text-gray-800 hover:text-[#007bff] leading-snug mb-2 line-clamp-3 transition-colors ${index === 0 ? 'text-lg mt-2' : 'text-sm'}`}>
                                                            {news.title}
                                                        </h3>
                                                        <div className="mt-auto flex items-center gap-1.5 text-gray-400 text-xs">
                                                            <Clock size={12} />
                                                            <span>{news.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cột 2: THỜI SỰ PHÁP LUẬT */}
                                    <div>
                                        <div className="border-b border-gray-200 mb-6">
                                            <h2 className="text-[#0a3a73] font-bold text-lg uppercase pb-2 border-b-[3px] border-red-600 inline-block mb-[-2px]">
                                                THỜI SỰ PHÁP LUẬT
                                            </h2>
                                        </div>

                                        <div className="space-y-6">
                                            {MOCK_NEWS_THOI_SU.map((news, index) => (
                                                <div key={news.id} className={`flex ${index === 0 ? 'flex-col' : 'flex-row'} gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0`}>
                                                    <div className={`shrink-0 overflow-hidden rounded border border-gray-100 ${index === 0 ? 'w-full aspect-[16/9]' : 'w-[140px] h-[90px]'}`}>
                                                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    </div>
                                                    <div className="flex flex-col flex-1">
                                                        <h3 className={`font-bold text-gray-800 hover:text-[#007bff] leading-snug mb-2 line-clamp-3 transition-colors ${index === 0 ? 'text-lg mt-2' : 'text-sm'}`}>
                                                            {news.title}
                                                        </h3>
                                                        <div className="mt-auto flex items-center gap-1.5 text-gray-400 text-xs">
                                                            <Clock size={12} />
                                                            <span>{news.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 4: Văn kiện, VBQPPL */}
                        {activeTab === 'van-ban-tai-lieu' && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fadeIn space-y-8 mt-2">
                                <h2 className="text-xl font-bold text-[#1a3b8b] mb-4 border-l-4 border-[#fdb714] pl-3 uppercase">
                                    Văn bản, tài liệu phục vụ rà soát
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50/50 text-center flex flex-col items-center">
                                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                            <Database size={28} />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm px-2">Hệ thống VBQPPL</h3>
                                        <p className="text-xs text-gray-500 mb-4 px-2">Liên kết đến Cơ sở dữ liệu quốc gia về pháp luật</p>
                                        <a href="https://vbpl.vn" target="_blank" rel="noreferrer" className="mt-auto bg-white border border-blue-600 text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-600 hover:text-white transition w-full">
                                            Truy cập
                                        </a>
                                    </div>

                                    <div className="border border-red-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-red-50/50 text-center flex flex-col items-center">
                                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                            <BookOpen size={28} />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm px-2">Văn kiện Đảng</h3>
                                        <p className="text-xs text-gray-500 mb-4 px-2">Liên kết chuyên mục, Trang của các Ban Đảng Trung ương</p>
                                        <Link to="#" className="mt-auto bg-white border border-red-600 text-red-600 font-bold py-2 px-6 rounded-full hover:bg-red-600 hover:text-white transition w-full">
                                            Truy cập
                                        </Link>
                                    </div>

                                    <div className="border border-teal-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-teal-50/50 text-center flex flex-col items-center">
                                        <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                                            <Globe size={28} />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm px-2">Điều ước quốc tế</h3>
                                        <p className="text-xs text-gray-500 mb-4 px-2">Liên kết danh sách Điều ước cập nhật từ Bộ Ngoại giao</p>
                                        <Link to="#" className="mt-auto bg-white border border-teal-600 text-teal-600 font-bold py-2 px-6 rounded-full hover:bg-teal-600 hover:text-white transition w-full">
                                            Truy cập
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 5: Hệ thống thông tin */}
                        {activeTab === 'he-thong-thong-tin' && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fadeIn text-center py-16 mt-2">
                                <MonitorPlay size={64} className="mx-auto text-blue-300 mb-6" />
                                <h2 className="text-2xl font-bold text-[#1a3b8b] mb-4">
                                    Hệ thống thông tin quản lý & báo cáo
                                </h2>
                                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                                    Chuyển hướng an toàn tới phần mềm quản lý nội bộ chuyên ngành phục vụ công tác báo cáo trực tuyến, tổng hợp số liệu rà soát toàn quốc.
                                </p>
                                <a href="#" className="inline-flex items-center gap-2 bg-[#fdb714] text-[#1a3b8b] font-bold uppercase tracking-wide py-3.5 px-8 rounded-lg shadow-md hover:bg-yellow-400 hover:translate-y-px transition">
                                    Đăng nhập hệ thống <ArrowRight size={20} />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar (Liên kết trang) - Appears on all tabs */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Tin Nổi Bật Sidebar */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-[#0f4c81] px-4 py-3 border-b border-[#0b3b64]">
                                <h3 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                                    <Newspaper size={18} /> Tin tức nổi bật
                                </h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="group cursor-pointer">
                                    <div className="aspect-video w-full bg-gray-200 rounded-lg mb-2 overflow-hidden object-cover relative">
                                        <img src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400&h=250" alt="News thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Mới</div>
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-800 group-hover:text-blue-700 leading-tight">
                                        Thủ tướng Chính phủ chủ trì họp Đánh giá tiến độ rà soát pháp luật tháng 3
                                    </h4>
                                </div>
                            </div>
                        </div>

                        {/* Banner Liên kết Sidebar */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-[#fdb714] px-4 py-3 border-b border-yellow-500">
                                <h3 className="font-bold text-[#1a3b8b] uppercase text-sm flex items-center gap-2">
                                    <Globe size={18} /> Liên kết trang
                                </h3>
                            </div>
                            <div className="p-4 flex flex-col gap-3">
                                {MOCK_LINKS.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition group"
                                    >
                                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 text-gray-500 group-hover:text-blue-600 rounded-md flex items-center justify-center shrink-0 transition-colors">
                                            <link.icon size={20} />
                                        </div>
                                        <span className="font-semibold text-sm text-gray-700 group-hover:text-blue-800 line-clamp-2">
                                            {link.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
                .marquee-container:hover .animate-marquee {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0%   { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default TongRaSoatPage;

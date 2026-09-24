import React, { useState, useEffect } from 'react';
import { 
    Newspaper, 
    Calendar, 
    Clock, 
    ChevronRight, 
    Search, 
    Eye, 
    Share2, 
    Tag, 
    ArrowRight,
    TrendingUp,
    Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';

const CATEGORIES = [
    { id: 'all', label: 'Tất cả tin tức' },
    { id: 'chinh-sach', label: 'Chính sách Thủ đô' },
    { id: 'tu-phap', label: 'Hoạt động Tư pháp' },
    { id: 'pbgdpl', label: 'Tuyên truyền PBGDPL' },
    { id: 'doanh-nghiep', label: 'Hỗ trợ Doanh nghiệp' },
    { id: 'tro-giup', label: 'Trợ giúp pháp lý' }
];

const ARTICLES = [
    {
        id: 1,
        title: "Hà Nội ban hành kế hoạch triển khai thi hành Luật Thủ Đô số 39/2024/QH15 sâu rộng đến cơ sở",
        summary: "UBND Thành phố Hà Nội vừa ký ban hành Kế hoạch tổng thể nhằm đưa các cơ chế, chính sách đặc thù của Luật Thủ Đô đi vào cuộc sống, phục vụ người dân và doanh nghiệp hiệu quả nhất.",
        category: 'chinh-sach',
        categoryLabel: 'Chính sách Thủ đô',
        date: "23/03/2026",
        readTime: "4 phút",
        views: 2450,
        image: "/images/collections/news.png",
        featured: true
    },
    {
        id: 2,
        title: "Tăng cường phổ biến giáo dục pháp luật lưu động tại các xã vùng xa của Thủ đô",
        summary: "Hội đồng phối hợp PBGDPL thành phố phối hợp các sở, ngành tổ chức chuỗi chương trình tuyên truyền lưu động và tư vấn pháp luật miễn phí cho đồng bào các huyện ngoại thành.",
        category: 'pbgdpl',
        categoryLabel: 'Tuyên truyền PBGDPL',
        date: "22/03/2026",
        readTime: "3 phút",
        views: 1820,
        image: "/images/infographic/thumb_1.png",
        featured: true
    },
    {
        id: 3,
        title: "Khai mạc tuần lễ đối thoại tháo gỡ điểm nghẽn pháp lý cho hơn 500 doanh nghiệp vừa và nhỏ",
        summary: "Sở Tư pháp Hà Nội chủ trì phối hợp Hiệp hội Doanh nghiệp TP tổ chức hội nghị giải đáp trực tiếp 120 vướng mắc về thuế, thủ tục đầu tư và quy định cấp phép thử nghiệm Sandbox.",
        category: 'doanh-nghiep',
        categoryLabel: 'Hỗ trợ Doanh nghiệp',
        date: "21/03/2026",
        readTime: "5 phút",
        views: 3100,
        image: "/images/collections/corp_tax.png"
    },
    {
        id: 4,
        title: "Trung tâm Trợ giúp pháp lý Nhà nước mở rộng tư vấn miễn phí qua tổng đài và ứng dụng iHanoi",
        summary: "Người dân thuộc diện chính sách, hộ nghèo và người yếu thế tại 30 quận, huyện có thể kết nối ngay với Trợ giúp viên pháp lý để được thụ lý hồ sơ và cử luật sư bào chữa miễn phí.",
        category: 'tro-giup',
        categoryLabel: 'Trợ giúp pháp lý',
        date: "20/03/2026",
        readTime: "4 phút",
        views: 1420,
        image: "/images/collections/labor.png"
    },
    {
        id: 5,
        title: "Hà Nội hoàn thành số hóa 100% văn bản quy phạm pháp luật tích hợp tra cứu thông minh AI",
        summary: "Hệ thống Cổng Pháp luật Thành phố chính thức vận hành công cụ tra cứu số, hỗ trợ người dân và doanh nghiệp tiếp cận thông tin pháp điển hóa nhanh chóng và chuẩn xác.",
        category: 'tu-phap',
        categoryLabel: 'Hoạt động Tư pháp',
        date: "19/03/2026",
        readTime: "3 phút",
        views: 2890,
        image: "/images/collections/land_law.png"
    },
    {
        id: 6,
        title: "Tập huấn kỹ năng hòa giải cơ sở giải quyết tranh chấp đất đai cho 500 hòa giải viên",
        summary: "Các chuyên gia đầu ngành hướng dẫn thực hành kỹ năng hòa giải tranh chấp ranh giới, ngõ đi chung và quyền sử dụng đất, nâng tỷ lệ hòa giải thành công trên địa bàn đạt trên 85%.",
        category: 'pbgdpl',
        categoryLabel: 'Tuyên truyền PBGDPL',
        date: "18/03/2026",
        readTime: "4 phút",
        views: 1650,
        image: "/images/infographic/thumb_2.png"
    }
];

const HanoiNewsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Tin tức & Sự kiện - Cổng Pháp luật Thành phố Hà Nội";
        window.scrollTo(0, 0);
    }, []);

    const filteredArticles = ARTICLES.filter(art => {
        const matchCategory = selectedCategory === 'all' || art.category === selectedCategory;
        const matchQuery = !searchQuery.trim() || 
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchQuery;
    });

    const featuredArticles = ARTICLES.filter(a => a.featured);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-[#0f4c81] transition-colors">Trang chủ Hà Nội</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Tin tức & Sự kiện</span>
                </div>
            </div>

            {/* Page Header Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        Tin tức & Sự kiện Pháp luật Thủ đô
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Cập nhật liên tục chủ trương, chính sách, hoạt động tư pháp và các sự kiện pháp luật nổi bật của Thành phố Hà Nội
                    </p>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-[1286px] space-y-8">
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Category tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-indigo-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-72 shrink-0">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tin tức..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition"
                        />
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map(art => (
                        <div 
                            key={art.id}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <img 
                                        src={art.image} 
                                        alt={art.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 bg-indigo-900/90 text-white text-[10.5px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                                        {art.categoryLabel}
                                    </span>
                                </div>
                                <div className="p-5 space-y-2.5">
                                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={13} /> {art.date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={13} /> {art.readTime}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug line-clamp-2">
                                        {art.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed text-justify">
                                        {art.summary}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                                    <Eye size={13} /> {art.views.toLocaleString()} lượt xem
                                </span>
                                <span className="text-indigo-900 font-semibold group-hover:underline flex items-center gap-1">
                                    Chi tiết <ChevronRight size={14} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                        <Newspaper size={40} className="mx-auto text-slate-300 mb-3" />
                        <p className="font-medium text-sm">Không tìm thấy tin tức phù hợp</p>
                        <p className="text-xs text-slate-400 mt-1">Vui lòng thử lại với từ khóa hoặc danh mục khác</p>
                    </div>
                )}
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiNewsPage;

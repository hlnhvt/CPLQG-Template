import React, { useState } from 'react';
import { 
    Search, 
    FileText, 
    CheckCircle2, 
    Clock, 
    Scale, 
    Sparkles, 
    BookOpen, 
    Building, 
    ChevronRight,
    MapPin,
    ArrowUpRight
} from 'lucide-react';
import { hanoiSiteConfig } from '../../data/hanoiMockData';

const HanoiHero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [docType, setDocType] = useState('all');
    const [field, setField] = useState('all');

    const handleSearch = (e) => {
        e.preventDefault();
        const element = document.getElementById('van-ban-ha-noi');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const stats = [
        { label: 'Văn bản QPPL Thành phố', value: '2.486', sub: 'Đang có hiệu lực', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Văn bản mới ban hành', value: '184', sub: 'Trong năm 2025 - 2026', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Dự thảo lấy ý kiến', value: '18', sub: 'Đang chờ góp ý', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Phòng Tư pháp & TGPL', value: '30/30', sub: 'Quận, huyện, thị xã', icon: Scale, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const quickKeywords = [
        'Luật Thủ đô 2024',
        'Bồi thường đất đai QĐ 61',
        'Cơ chế thử nghiệm Sandbox',
        'Chuyển đổi giao thông xanh',
        'Ứng dụng iHanoi',
        'Tủ sách pháp luật điện tử'
    ];

    return (
        <section className="relative bg-gradient-to-b from-[#0a2f52] via-[#0d3b66] to-[#124d85] text-white pt-10 pb-16 overflow-hidden">
            {/* Background Decorative patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hanoi-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1.5" fill="#facc15" />
                            <path d="M0 20 L40 20 M20 0 L20 40" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hanoi-pattern)" />
                </svg>
            </div>

            {/* Glowing orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-[1400px] mx-auto px-4">
                {/* Hero Header Badge & Title */}
                <div className="text-center max-w-4xl mx-auto space-y-3.5 mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/80 to-amber-600/80 text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-amber-300/40 shadow-sm backdrop-blur-sm">
                        <Sparkles size={14} className="text-amber-300" />
                        <span>HỆ THỐNG PHÂN HỆ ĐỊA PHƯƠNG - THÀNH PHỐ HÀ NỘI</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-tight drop-shadow-md">
                        CỔNG THÔNG TIN PHÁP LUẬT <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                            THÀNH PHỐ HÀ NỘI
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
                        Tra cứu toàn diện hệ thống Văn bản QPPL của HĐND & UBND Thành phố Hà Nội, đồng hành thực thi Luật Thủ Đô, hỗ trợ pháp lý và tiếp nhận phản ánh kiến nghị nhân dân.
                    </p>
                </div>

                {/* Hero Search Box */}
                <div id="tim-kiem-van-ban" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-white/20 backdrop-blur-md">
                    <form onSubmit={handleSearch} className="space-y-3">
                        <div className="flex flex-col md:flex-row gap-2.5">
                            {/* Input Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Nhập số hiệu, trích yếu văn bản QPPL Hà Nội (VD: 61/2024, Luật Thủ đô, đất đai...)"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                                />
                            </div>

                            {/* Doc type filter */}
                            <div className="w-full md:w-48">
                                <select 
                                    value={docType}
                                    onChange={(e) => setDocType(e.target.value)}
                                    className="w-full py-3 px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="all">Tất cả loại văn bản</option>
                                    <option value="nq">Nghị quyết HĐND TP</option>
                                    <option value="qd">Quyết định UBND TP</option>
                                    <option value="ct">Chỉ thị UBND TP</option>
                                </select>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="w-full md:w-auto px-7 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-red-600/30 transition flex items-center justify-center gap-2 shrink-0"
                            >
                                <Search size={18} />
                                <span>Tìm kiếm</span>
                            </button>
                        </div>

                        {/* Quick filter keywords */}
                        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                            <span className="font-semibold text-gray-700 flex items-center gap-1">
                                <Sparkles size={13} className="text-amber-500" />
                                Từ khóa tiêu điểm:
                            </span>
                            {quickKeywords.map((kw, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSearchQuery(kw)}
                                    className="bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 px-2.5 py-1 rounded-md text-[11px] transition font-medium"
                                >
                                    {kw}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>

                {/* 4 Key Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-10">
                    {stats.map((s, idx) => {
                        const Icon = s.icon;
                        return (
                            <div 
                                key={idx}
                                className="bg-white/95 rounded-xl p-4 shadow-lg border border-white/20 flex items-center gap-3.5 transition-transform hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                                        {s.value}
                                    </div>
                                    <div className="text-xs font-bold text-gray-800 leading-tight">
                                        {s.label}
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                        {s.sub}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HanoiHero;

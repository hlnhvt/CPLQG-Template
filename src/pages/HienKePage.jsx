import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, ArrowRight, Users, Calendar, ChevronRight,
    Scale, Landmark, Heart, TrendingUp,
    Store, Globe, Car, HeartHandshake, Building2, GraduationCap, Activity, Leaf, Briefcase, Rocket, ShieldAlert
} from 'lucide-react';

// ======================== MOCK DATA ========================

// Thumbnail pool from /public directory
const THUMBS = [
    '/thumb1.png',
    '/thumb2.png',
    '/thumb3.png',
    '/poster1.png',
    '/banner-nghi-quyet.png',
    '/1870-210-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg',
];
const thumb = (i) => THUMBS[i % THUMBS.length];

const HOT_ITEMS = [
    { id: 'h1', title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)', agency: 'Bộ Tài nguyên và Môi trường', status: 'open', deadline: '30/04/2026', participants: 3821, thumb: thumb(0) },
    { id: 'h2', title: 'Góp ý chính sách nhà ở xã hội cho công nhân', agency: 'Bộ Xây dựng', status: 'open', deadline: '15/04/2026', participants: 2140, thumb: thumb(1) },
    { id: 'h3', title: 'Quy hoạch tổng thể quốc gia 2021–2030', agency: 'Bộ Kế hoạch và Đầu tư', status: 'upcoming', deadline: '01/05/2026', participants: 0, thumb: thumb(2) },
    { id: 'h4', title: 'Chính sách phát triển kinh tế tuần hoàn', agency: 'Bộ Tài nguyên và Môi trường', status: 'closed', deadline: '15/03/2026', participants: 4230, thumb: thumb(3) },
];

const LIFE_CATEGORIES = [
    { id: 1, icon: Store, name: 'Kinh tế và Đời sống' },
    { id: 2, icon: Globe, name: 'Lưu trú và Nhập tịch' },
    { id: 3, icon: Car, name: 'Giao thông vận tải' },
    { id: 4, icon: HeartHandshake, name: 'Hôn nhân và Gia đình' },
    { id: 5, icon: Building2, name: 'Bất động sản' },
    { id: 6, icon: GraduationCap, name: 'Giáo dục và Đào tạo' },
    { id: 7, icon: Activity, name: 'Sức khỏe và Y tế' },
    { id: 8, icon: Leaf, name: 'An sinh xã hội' },
    { id: 9, icon: Briefcase, name: 'Việc làm và Lao động' },
    { id: 10, icon: Rocket, name: 'Khởi nghiệp' },
    { id: 11, icon: ShieldAlert, name: 'An toàn lao động' },
];

const DAILY_CONSULTATIONS = [
    { id: 1, title: 'Khảo sát sự hài lòng với dịch vụ y tế công lập', category: 'Sức khỏe và Y tế', status: 'open', deadline: '30/04/2026', participants: 2100, agency: 'Bộ Y tế', thumb: thumb(0) },
    { id: 2, title: 'Lấy ý kiến về điều chỉnh lương tối thiểu vùng 2026', category: 'Việc làm và Lao động', status: 'open', deadline: '15/04/2026', participants: 5340, agency: 'Bộ Lao động – TB&XH', thumb: thumb(1) },
    { id: 3, title: 'Ý kiến về chất lượng giáo dục mầm non công lập', category: 'Giáo dục và Đào tạo', status: 'upcoming', deadline: '01/05/2026', participants: 0, agency: 'Bộ Giáo dục và Đào tạo', thumb: thumb(2) },
    { id: 4, title: 'Tham vấn chính sách vay mua nhà lần đầu', category: 'Bất động sản', status: 'open', deadline: '25/04/2026', participants: 3240, agency: 'Ngân hàng Nhà nước', thumb: thumb(3) },
    { id: 5, title: 'Ý kiến về chính sách bảo hiểm xã hội tự nguyện', category: 'An sinh xã hội', status: 'open', deadline: '10/04/2026', participants: 2670, agency: 'Bộ Lao động – TB&XH', thumb: thumb(4) },
    { id: 6, title: 'Đánh giá chính sách hỗ trợ khởi nghiệp đổi mới sáng tạo', category: 'Khởi nghiệp', status: 'closed', deadline: '20/03/2026', participants: 1890, agency: 'Bộ Khoa học và Công nghệ', thumb: thumb(5) },
];

const LEGAL_CONSULTATIONS = [
    { id: 1, title: 'Góp ý Bộ luật Dân sự sửa đổi – Phần hợp đồng điện tử', domain: 'Pháp luật dân sự', status: 'open', deadline: '30/04/2026', participants: 1240, agency: 'Bộ Tư pháp', thumb: thumb(0) },
    { id: 2, title: 'Dự thảo Luật Doanh nghiệp sửa đổi – Quản trị công ty', domain: 'Pháp luật kinh doanh', status: 'open', deadline: '20/04/2026', participants: 2870, agency: 'Bộ Kế hoạch và Đầu tư', thumb: thumb(1) },
    { id: 3, title: 'Nghị định xử phạt vi phạm hành chính về môi trường', domain: 'Pháp luật môi trường', status: 'upcoming', deadline: '05/05/2026', participants: 0, agency: 'Bộ Tài nguyên và Môi trường', thumb: thumb(2) },
    { id: 4, title: 'Sửa đổi Bộ luật Lao động – Hợp đồng lao động linh hoạt', domain: 'Pháp luật lao động', status: 'open', deadline: '01/05/2026', participants: 4120, agency: 'Bộ Lao động – TB&XH', thumb: thumb(3) },
    { id: 5, title: 'Góp ý Luật Tố tụng hành chính sửa đổi', domain: 'Pháp luật hành chính', status: 'closed', deadline: '01/03/2026', participants: 1890, agency: 'Bộ Tư pháp', thumb: thumb(4) },
    { id: 6, title: 'Dự thảo Luật Hình sự sửa đổi – Tội phạm mạng', domain: 'Pháp luật hình sự', status: 'open', deadline: '10/05/2026', participants: 930, agency: 'Bộ Công an', thumb: thumb(5) },
];

const FUND_CONSULTATIONS = [
    { id: 1, title: 'Nghiên cứu hiệu quả thực thi Luật Hôn nhân và Gia đình', category: 'Nghiên cứu đề xuất', status: 'open', deadline: '15/04/2026', budget: '500 triệu đồng', agency: 'Quỹ Hỗ trợ Pháp luật', thumb: thumb(0) },
    { id: 2, title: 'Hội thảo: Chính sách thuế xanh và phát triển bền vững', category: 'Hội thảo tham vấn', status: 'upcoming', deadline: '25/04/2026', budget: '200 triệu đồng', agency: 'Quỹ Hỗ trợ Pháp luật', thumb: thumb(1) },
    { id: 3, title: 'Tập huấn kỹ năng tham gia xây dựng pháp luật cho tổ chức dân sự', category: 'Chương trình tập huấn', status: 'open', deadline: '30/04/2026', budget: '300 triệu đồng', agency: 'Quỹ Hỗ trợ Pháp luật', thumb: thumb(2) },
    { id: 4, title: 'Giám sát độc lập thực hiện Nghị quyết về cải cách hành chính', category: 'Giám sát thực thi', status: 'open', deadline: '20/04/2026', budget: '400 triệu đồng', agency: 'Quỹ Hỗ trợ Pháp luật', thumb: thumb(3) },
    { id: 5, title: 'Hội thảo: Luật Tiếp cận thông tin sau 5 năm thực hiện', category: 'Hội thảo tham vấn', status: 'closed', deadline: '10/03/2026', budget: '180 triệu đồng', agency: 'Quỹ Hỗ trợ Pháp luật', thumb: thumb(4) },
    { id: 6, title: 'Đề xuất nghiên cứu cơ chế bảo vệ người tố cáo', category: 'Nghiên cứu đề xuất', status: 'open', deadline: '05/05/2026', budget: '350 triệu đồng', agency: 'Quỹ Hỗ trợ Pháp luật', thumb: thumb(5) },
];

// ======================== HELPERS ========================

const StatusBadge = ({ status, small = false }) => {
    const base = `inline-flex items-center gap-1.5 font-semibold ${small ? 'text-[11px]' : 'text-[12px]'}`;
    if (status === 'open') return (
        <span className={`${base} text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
            Đang mở
        </span>
    );
    if (status === 'upcoming') return (
        <span className={`${base} text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Sắp mở
        </span>
    );
    return (
        <span className={`${base} text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
            Đã kết thúc
        </span>
    );
};

// ======================== CARD COMPONENT ========================
// Horizontal card: thumbnail LEFT, content RIGHT
const ConsultCard = ({ item, to, tag, accentColor = '#1e3a8a' }) => (
    <Link
        to={to}
        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 flex flex-row h-[130px]"
    >
        {/* Left: Thumbnail */}
        <div className="relative w-[160px] shrink-0 overflow-hidden">
            <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.target.src = '/images/dong_son_cover.png'; }}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            {/* Tag overlay */}
            {tag && (
                <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full leading-tight">
                        {tag}
                    </span>
                </div>
            )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
            {/* Top: status + agency */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <StatusBadge status={item.status} small />
                <span className="text-[11px] text-gray-400 font-medium truncate">{item.agency}</span>
            </div>

            {/* Title */}
            <h3
                className="text-[14px] font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors flex-1"
                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
                {item.title}
            </h3>

            {/* Footer meta */}
            <div className="flex items-center gap-3 mt-2">
                {item.deadline && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Calendar size={11} /> {item.deadline}
                    </span>
                )}
                {item.participants > 0 && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Users size={11} /> {item.participants.toLocaleString('vi-VN')}
                    </span>
                )}
                {item.budget && (
                    <span className="text-[11px] font-semibold text-amber-600">💰 {item.budget}</span>
                )}
                <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
        </div>
    </Link>
);

// ======================== SECTION WRAPPER ========================
const Section = ({ id, icon: Icon, color, label, title, subtitle, children, viewAllTo }) => (
    <section id={id} className="py-5 border-b border-gray-100 animate-fade-up">
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: color + '15' }}>
                        <Icon size={17} style={{ color }} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase mb-0.5" style={{ color }}>{label}</p>
                        <h2 className="text-[18px] md:text-[22px] font-bold text-gray-900 leading-tight">{title}</h2>
                        {subtitle && <p className="text-gray-500 text-[12px] mt-0.5 max-w-2xl">{subtitle}</p>}
                    </div>
                </div>
                {viewAllTo && (
                    <Link to={viewAllTo} className="shrink-0 flex items-center gap-1.5 text-[12px] font-semibold hover:underline mt-1 transition-colors" style={{ color }}>
                        Xem tất cả <ArrowRight size={13} />
                    </Link>
                )}
            </div>
            {children}
        </div>
    </section>
);

// ======================== PAGE ========================

export default function HienKePage() {
    const [selectedLifeCat, setSelectedLifeCat] = useState(null);
    const [selectedLegalDomain, setSelectedLegalDomain] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDaily = DAILY_CONSULTATIONS.filter(c =>
        !selectedLifeCat || c.category === selectedLifeCat
    );

    const legalDomains = ['Tất cả', 'Pháp luật dân sự', 'Pháp luật hình sự', 'Pháp luật kinh doanh', 'Pháp luật lao động', 'Pháp luật hành chính', 'Pháp luật môi trường'];
    const filteredLegal = LEGAL_CONSULTATIONS.filter(c =>
        selectedLegalDomain === 'Tất cả' || c.domain === selectedLegalDomain
    );

    return (
        <div className="bg-gray-50 min-h-screen font-sans">

            {/* =====================================================
                HERO — Full trống đồng background
            ===================================================== */}
            <div
                className="relative overflow-hidden"
                style={{ minHeight: '480px' }}
            >
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                {/* Subtle gold shimmer overlay matching trống đồng */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-[1280px] py-16 md:py-24">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] mb-8 animate-fade-in">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90">Hiến kế hoàn thiện chính sách, pháp luật</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 pt-6 lg:pt-8">
                        {/* Left side: Text, Search, Stats */}
                        <div className="flex-1 max-w-2xl w-full">
                            {/* Title */}
                            <h1 className="text-[38px] md:text-[52px] lg:text-[60px] font-bold text-white leading-[1.2] mb-5 animate-fade-up">
                                <span className="inline-block py-1 animate-text-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Hiến kế</span>
                                <span className="block text-[24px] md:text-[32px] lg:text-[38px] font-bold mt-4 leading-[1.4] text-amber-300 animate-text-gradient bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 bg-clip-text text-transparent max-w-[650px] py-1">
                                    Hoàn thiện hệ thống pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới
                                </span>
                            </h1>
                            <p className="text-blue-100 text-[16px] md:text-[17px] leading-relaxed mb-8 max-w-xl animate-fade-up delay-100">
                                Tiếng nói của bạn định hình chính sách quốc gia.
                            </p>

                            {/* Search bar */}
                            <div className="flex max-w-lg mb-10 animate-fade-up delay-200">
                                <div className="relative flex-1">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Tìm kiếm cuộc tham vấn..."
                                        className="w-full pl-10 pr-4 py-3.5 rounded-l-xl text-[14px] text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-lg"
                                    />
                                </div>
                                <button className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-r-xl text-[14px] transition-colors whitespace-nowrap shadow-lg">
                                    Tìm kiếm
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-12 animate-fade-up delay-300">
                                {[
                                    { label: 'Cuộc tham vấn\nđang mở', value: '24' },
                                    { label: 'Lượt người\ntham gia đóng góp', value: '85K+' },
                                    { label: 'Lĩnh vực\ntrọng điểm', value: '32' },
                                ].map(s => (
                                    <div key={s.label} className="text-white min-w-[120px]">
                                        <div className="text-[36px] md:text-[42px] font-black leading-none text-amber-300">{s.value}</div>
                                        <div className="text-blue-200 text-[13.5px] font-medium mt-2 leading-snug whitespace-pre-line">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side: 4 Feature Overview Cards */}
                        <div className="lg:w-[480px] xl:w-[540px] shrink-0 w-full animate-fade-up delay-400">
                            <div className="grid grid-cols-2 gap-4 lg:gap-5">
                                {[
                                    { id: '#section-hot', label: 'Vấn đề nổi bật', desc: 'Các dự thảo tài liệu đang thu hút nhiều sự quan tâm.', icon: TrendingUp, color: 'text-blue-600', hue: 'bg-blue-500' },
                                    { id: '#section-life', label: 'Đời sống', desc: 'Đóng góp ý kiến về y tế, giáo dục, giao thông...', icon: Heart, color: 'text-green-600', hue: 'bg-green-500' },
                                    { id: '#section-legal', label: 'Luật pháp', desc: 'Tham gia xây dựng các bộ luật, nghị định.', icon: Scale, color: 'text-purple-600', hue: 'bg-purple-500' },
                                    { id: '#section-fund', label: 'Hỗ trợ', desc: 'Tài trợ cho sáng kiến, hoàn thiện pháp luật.', icon: Landmark, color: 'text-amber-600', hue: 'bg-amber-500' },
                                ].map(item => (
                                    <a key={item.id} href={item.id} className="relative overflow-hidden flex flex-col justify-between p-5 xl:p-6 min-h-[160px] xl:min-h-[190px] bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/15 hover:border-white/30 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 group">
                                        <div className={`absolute top-0 left-0 w-full h-1.5 ${item.hue} opacity-80`} />
                                        <div className={`w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shrink-0 ${item.color}`}>
                                            <item.icon size={22} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-[16px] xl:text-[18px] mb-1.5">{item.label}</h3>
                                            <p className="text-blue-100/70 text-[13px] leading-relaxed line-clamp-2">{item.desc}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                QUICK NAV
            ===================================================== */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
                    <nav className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        {[
                            { href: '#section-hot', label: 'Vấn đề nổi bật', icon: TrendingUp, color: '#1e3a8a' },
                            { href: '#section-life', label: 'Đời sống thường ngày', icon: Heart, color: '#16a34a' },
                            { href: '#section-legal', label: 'Lĩnh vực pháp lý', icon: Scale, color: '#7c3aed' },
                            { href: '#section-fund', label: 'Hỗ trợ chính sách', icon: Landmark, color: '#b45309' },
                        ].map(item => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 px-5 py-4 text-[13px] font-semibold text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 transition-all whitespace-nowrap"
                            >
                                <item.icon size={14} style={{ color: item.color }} />
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* =====================================================
                SECTION 1: VẤN ĐỀ NỔI BẬT — 2-col + 2-col card grid
            ===================================================== */}
            <Section
                id="section-hot"
                icon={TrendingUp}
                color="#1e3a8a"
                label="Các vấn đề nổi bật"
                title="Nhà nước cần ý kiến cộng đồng"
                subtitle="Dự thảo luật và chính sách đang cần sự đóng góp của người dân, tổ chức và doanh nghiệp."
                viewAllTo="/hien-ke/tat-ca"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {HOT_ITEMS.map(item => (
                        <ConsultCard
                            key={item.id}
                            item={item}
                            to={`/hien-ke/${item.id}`}
                            accentColor="#1e3a8a"
                        />
                    ))}
                </div>
                <div className="text-center">
                    <Link to="/hien-ke/tat-ca" className="inline-flex items-center gap-2 px-6 py-2 border border-[#1e3a8a] text-[#1e3a8a] font-semibold rounded-lg hover:bg-[#1e3a8a] hover:text-white transition-all duration-200 text-[13px]">
                        Xem toàn bộ <ArrowRight size={14} />
                    </Link>
                </div>
            </Section>

            {/* =====================================================
                SECTION 2: PHÁP LÝ
            ===================================================== */}
            <Section
                id="section-legal"
                icon={Scale}
                color="#7c3aed"
                label="Tham vấn pháp lý"
                title="Hiến kế về các lĩnh vực pháp luật"
                subtitle="Góp ý cho các dự thảo luật, nghị định và văn bản pháp quy đang được xây dựng."
                viewAllTo="/hien-ke/phap-ly"
            >
                {/* Category navigation grid */}
                <div className="mb-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {LIFE_CATEGORIES.map(c => (
                            <Link
                                key={c.id}
                                to={`/hien-ke/gop-y-nhanh?domain=${encodeURIComponent(c.name)}`}
                                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-[#7c3aed] hover:bg-purple-50 hover:-translate-y-1 hover:shadow-md transition-all group duration-300"
                            >
                                <c.icon size={32} strokeWidth={1.25} className="mb-1 text-purple-400 group-hover:text-[#7c3aed] group-hover:scale-110 transition-all duration-300" />
                                <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#7c3aed] leading-tight px-1">{c.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>

            {/* =====================================================
                SECTION 3: ĐỜI SỐNG THƯỜNG NGÀY
            ===================================================== */}
            <Section
                id="section-life"
                icon={Heart}
                color="#16a34a"
                label="Tham vấn đời sống"
                title="Hiến kế trong đời sống thường ngày"
                subtitle="Đóng góp ý kiến về các lĩnh vực thiết yếu từ y tế, giáo dục, nhà ở đến việc làm."
                viewAllTo="/hien-ke/doi-song"
            >
                {/* CTA Banner Daily Life */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mb-4">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-green-200 text-green-700 rounded-full flex items-center justify-center shrink-0">
                            <Heart size={28} />
                        </div>
                        <div>
                            <h3 className="text-[20px] font-bold text-gray-900 mb-2">Chia sẻ vấn đề đời sống của bạn</h3>
                            <p className="text-gray-700 max-w-2xl leading-relaxed text-[15px]">
                                Mọi ý kiến đóng góp của bạn về các vấn đề dân sinh, sức khoẻ, giáo dục, hạ tầng giao thông... đều được tổng hợp và phân tích để chuyển tới các cơ quan chức năng, nhằm xây dựng môi trường sống thiết thực và tốt đẹp hơn.
                            </p>
                        </div>
                    </div>
                    <Link to="/hien-ke/gop-y-nhanh?topic=doi-song" className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shrink-0 text-[15px] flex items-center gap-2">
                        Bắt đầu góp ý <ArrowRight size={16} />
                    </Link>
                </div>
            </Section>


            {/* =====================================================
                SECTION 4: QUỸ HỖ TRỢ CHÍNH SÁCH
            ===================================================== */}
            <Section
                id="section-fund"
                icon={Landmark}
                color="#b45309"
                label="Quỹ hỗ trợ"
                title="Ứng tuyển quỹ hỗ trợ xây dựng chính sách, pháp luật"
                subtitle="Hỗ trợ, tài trợ cho công tác xây dựng chính sách, pháp luật, nhằm tạo thay đổi đột phá, tích cực, hiệu quả, bền vững về xây dựng chính sách, pháp luật."
                viewAllTo="/hien-ke/quy"
            >
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-3">
                    {[
                        { label: 'Nghiên cứu đề xuất', count: 9 },
                        { label: 'Hội thảo tham vấn', count: 14 },
                        { label: 'Chương trình tập huấn', count: 6 },
                        { label: 'Giám sát thực thi', count: 5 },
                    ].map(c => (
                        <div key={c.label} className="bg-white border border-amber-100 rounded-lg p-3 text-center hover:shadow-md transition-shadow shadow-sm">
                            <div className="text-lg mb-0.5">{c.emoji}</div>
                            <div className="text-[22px] font-bold text-amber-700">{c.count}</div>
                            <div className="text-[11px] text-gray-500 font-medium leading-snug">{c.label}</div>
                        </div>
                    ))}
                </div>

                {/* Card grid — 2-3 columns, horizontal cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-3">
                    {FUND_CONSULTATIONS.map(item => (
                        <ConsultCard
                            key={item.id}
                            item={item}
                            to={`/hien-ke/${item.id}`}
                            tag={item.category}
                            accentColor="#b45309"
                        />
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/hien-ke/quy" className="inline-flex items-center gap-2 px-6 py-2 border border-amber-600 text-amber-700 font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-200 text-[13px]">
                        Xem toàn bộ <ArrowRight size={14} />
                    </Link>
                </div>
            </Section>

            {/* =====================================================
                BOTTOM CTA
            ===================================================== */}
            <div className="bg-[#1e3a8a] relative overflow-hidden">
                {/* trống đồng watermark */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-[400px] opacity-10 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-[1280px] py-14 animate-fade-in">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h3 className="text-[28px] md:text-[34px] font-bold text-white mb-3">
                                Bạn muốn đóng góp ý kiến?
                            </h3>
                            <p className="text-blue-200 text-[15px] leading-relaxed mb-6 max-w-lg">
                                Đăng nhập để tham gia hiến kế trực tuyến, nhận thông báo về các cuộc tham vấn mới và theo dõi thông tin từ Cổng Pháp luật quốc gia.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/dang-nhap" className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-xl transition-colors text-[14px] shadow-lg">
                                    Đăng nhập ngay
                                </Link>
                                <Link to="/gioi-thieu" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-[14px] border border-white/30 backdrop-blur-sm">
                                    Tìm hiểu thêm
                                </Link>
                            </div>
                        </div>

                        <div className="shrink-0 grid grid-cols-2 gap-4 text-center">
                            {[
                                { val: '85K+', label: 'Lượt tham gia' },
                                { val: '24', label: 'Cuộc đang mở' },
                                { val: '98%', label: 'Ý kiến được ghi nhận' },
                                { val: '32', label: 'Lĩnh vực' },
                            ].map(s => (
                                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                                    <div className="text-[26px] font-bold text-amber-300">{s.val}</div>
                                    <div className="text-blue-200 text-[12px] font-medium mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
                .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeIn { to { opacity: 1; } }

                @keyframes bgPan {
                    0% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.03) translate(-1%, 1.5%); }
                    100% { transform: scale(1) translate(0, 0); }
                }
                .animate-bg-pan { animation: bgPan 40s ease-in-out infinite; }

                @keyframes textGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-text-gradient {
                    background-size: 200% auto;
                    animation: textGradient 6s linear infinite;
                }
            `}</style>
        </div>
    );
}

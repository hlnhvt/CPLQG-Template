import React from 'react';
import { Link } from 'react-router-dom';
import {
    Search, ArrowRight, Users, Calendar, ChevronRight,
    Scale, Landmark, Heart, TrendingUp,
    Store, Globe, Car, HeartHandshake, Building2, GraduationCap, Activity, Leaf, 
    Briefcase, Rocket, ShieldAlert, ShoppingBag, Sprout, CloudSun, Smartphone, Map, 
    Baby, Grid, MoreHorizontal
} from 'lucide-react';

// ======================== MOCK DATA ========================

// Thumbnail pool from /public directory
export const THUMBS = [
    '/thumb1.png',
    '/thumb2.png',
    '/thumb3.png',
    '/poster1.png',
    '/banner-nghi-quyet.png',
    '/1870-210-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg',
];

export const thumb = (i) => THUMBS[i % THUMBS.length];

export const HOT_ITEMS = [
    { id: 'h1', title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)', agency: 'Bộ Tài nguyên và Môi trường', status: 'open', deadline: '30/04/2026', participants: 3821, thumb: thumb(0), description: 'Dự thảo quan trọng nhằm điều chỉnh khung pháp lý về quyền sử dụng đất, bồi thường, tái định cư và quy định về bảng giá đất định kỳ.' },
    { id: 'h2', title: 'Góp ý chính sách nhà ở xã hội cho công nhân', agency: 'Bộ Xây dựng', status: 'open', deadline: '15/04/2026', participants: 2140, thumb: thumb(1), description: 'Khuyến khích và hỗ trợ xây dựng nhà ở, cho thuê mua đối với nhóm người lao động thu nhập thấp ở các khu công nghiệp.' },
    { id: 'h3', title: 'Quy hoạch tổng thể quốc gia 2021–2030', agency: 'Bộ Kế hoạch và Đầu tư', status: 'upcoming', deadline: '01/05/2026', participants: 0, thumb: thumb(2), description: 'Chiến lược phát triển kinh tế xã hội và định hướng phân bổ không gian quốc gia tầm nhìn 2050.' },
    { id: 'h4', title: 'Chính sách phát triển kinh tế tuần hoàn', agency: 'Bộ Tài nguyên và Môi trường', status: 'closed', deadline: '15/03/2026', participants: 4230, thumb: thumb(3), description: 'Kiểm soát rác thải nhựa, yêu cầu doanh nghiệp tái chế tái sử dụng sản phẩm để phát triển bền vững.' },
];

export const LIFE_CATEGORIES = [
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
    { id: 11, icon: Grid, name: 'An toàn lao động' },
    { id: 12, icon: ShoppingBag, name: 'Tiêu dùng và Dịch vụ' },
    { id: 13, icon: Sprout, name: 'Nông nghiệp và Nông thôn' },
    { id: 14, icon: CloudSun, name: 'Môi trường và Khí hậu' },
    { id: 15, icon: Smartphone, name: 'Công nghệ và Viễn thông' },
    { id: 16, icon: Map, name: 'Văn hóa và Du lịch' },
    { id: 17, icon: Baby, name: 'Trẻ em và Gia đình' },
    { id: 18, icon: MoreHorizontal, name: 'Lĩnh vực khác' },
];

export const DAILY_CONSULTATIONS = [
    { id: 1, title: 'Khảo sát sự hài lòng với dịch vụ y tế công lập', category: 'Sức khỏe và Y tế', status: 'open', deadline: '30/04/2026', participants: 2100, agency: 'Bộ Y tế', thumb: thumb(0) },
    { id: 2, title: 'Lấy ý kiến về điều chỉnh lương tối thiểu vùng 2026', category: 'Việc làm và Lao động', status: 'open', deadline: '15/04/2026', participants: 5340, agency: 'Bộ Lao động – TB&XH', thumb: thumb(1) },
    { id: 3, title: 'Ý kiến về chất lượng giáo dục mầm non công lập', category: 'Giáo dục và Đào tạo', status: 'upcoming', deadline: '01/05/2026', participants: 0, agency: 'Bộ Giáo dục và Đào tạo', thumb: thumb(2) },
    { id: 4, title: 'Hiến kế chính sách vay mua nhà lần đầu', category: 'Bất động sản', status: 'open', deadline: '25/04/2026', participants: 3240, agency: 'Ngân hàng Nhà nước', thumb: thumb(3) },
    { id: 5, title: 'Ý kiến về chính sách bảo hiểm xã hội tự nguyện', category: 'An sinh xã hội', status: 'open', deadline: '10/04/2026', participants: 2670, agency: 'Bộ Lao động – TB&XH', thumb: thumb(4) },
    { id: 6, title: 'Đánh giá chính sách hỗ trợ khởi nghiệp đổi mới sáng tạo', category: 'Khởi nghiệp', status: 'closed', deadline: '20/03/2026', participants: 1890, agency: 'Bộ Khoa học và Công nghệ', thumb: thumb(5) },
];

export const LEGAL_CONSULTATIONS = [
    { id: 1, title: 'Góp ý Bộ luật Dân sự sửa đổi – Phần hợp đồng điện tử', domain: 'Pháp luật dân sự', status: 'open', deadline: '30/04/2026', participants: 1240, agency: 'Bộ Tư pháp', thumb: thumb(0) },
    { id: 2, title: 'Dự thảo Luật Doanh nghiệp sửa đổi – Quản trị công ty', domain: 'Pháp luật kinh doanh', status: 'open', deadline: '20/04/2026', participants: 2870, agency: 'Bộ Kế hoạch và Đầu tư', thumb: thumb(1) },
    { id: 3, title: 'Nghị định xử phạt vi phạm hành chính về môi trường', domain: 'Pháp luật môi trường', status: 'upcoming', deadline: '05/05/2026', participants: 0, agency: 'Bộ Tài nguyên và Môi trường', thumb: thumb(2) },
    { id: 4, title: 'Sửa đổi Bộ luật Lao động – Hợp đồng lao động linh hoạt', domain: 'Pháp luật lao động', status: 'open', deadline: '01/05/2026', participants: 4120, agency: 'Bộ Lao động – TB&XH', thumb: thumb(3) },
    { id: 5, title: 'Góp ý Luật Tố tụng hành chính sửa đổi', domain: 'Pháp luật hành chính', status: 'closed', deadline: '01/03/2026', participants: 1890, agency: 'Bộ Tư pháp', thumb: thumb(4) },
    { id: 6, title: 'Dự thảo Luật Hình sự sửa đổi – Tội phạm mạng', domain: 'Pháp luật hình sự', status: 'open', deadline: '10/05/2026', participants: 930, agency: 'Bộ Công an', thumb: thumb(5) },
];

// ======================== HELPERS ========================

export const StatusBadge = ({ status, small = false }) => {
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

export const ConsultCard = ({ item, to, tag, accentColor = '#1e3a8a' }) => (
    <Link
        to={to}
        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 flex flex-row h-[160px]"
    >
        {/* Left: Thumbnail */}
        <div className="relative w-[150px] md:w-[180px] shrink-0 overflow-hidden">
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
        <div className="flex-1 min-w-0 px-4 py-3.5 flex flex-col">
            {/* Top: status + agency */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
                <StatusBadge status={item.status} small />
                <span className="text-[11px] text-gray-400 font-medium truncate">{item.agency}</span>
            </div>

            {/* Title */}
            <h3
                className="text-[14px] md:text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors"
                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
                {item.title}
            </h3>
            
            {/* Description */}
            {item.description ? (
                <p 
                    className="text-[12.5px] text-gray-500 mt-1.5 leading-snug flex-1"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                    {item.description}
                </p>
            ) : (
                <div className="flex-1" />
            )}

            {/* Footer meta */}
            <div className="flex items-center gap-3 mt-3">
                {item.deadline && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 shrink-0">
                        <Calendar size={12} /> {item.deadline}
                    </span>
                )}
                {item.participants > 0 && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 shrink-0">
                        <Users size={12} /> {item.participants.toLocaleString('vi-VN')}
                    </span>
                )}
                {item.budget && (
                    <span className="text-[11px] font-semibold text-amber-600">💰 {item.budget}</span>
                )}
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
        </div>
    </Link>
);

// ======================== SECTION WRAPPER ========================

export const Section = ({ id, icon: Icon, color, label, title, subtitle, children, viewAllTo }) => (
    <section id={id} className="py-5 border-b border-gray-100 animate-fade-up">
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: color + '15' }}>
                        {Icon && <Icon size={17} style={{ color }} />}
                    </div>
                    <div>
                        {label && <p className="text-[10px] font-bold uppercase mb-0.5" style={{ color }}>{label}</p>}
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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Image, ChevronRight, Phone, MessageSquare } from 'lucide-react';

// ── Mock data (shared with detail page via URL param) ────────────────────────
const THUMBNAILS = [
    '/images/infographic/thumb_1.png',
    '/images/infographic/thumb_2.png',
    '/images/infographic/thumb_3.png',
];

const DETAIL_IMAGES = [
    '/images/infographic/detail_1.png',
];

export const INFOGRAPHIC_LIST = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
    slug: `infographic-${i + 1}`,
    title: [
        '10 điểm nổi bật của Luật Đất đai 2024 có hiệu lực từ tháng 8',
        'Thủ tục hành chính mới: 5 bước đăng ký doanh nghiệp online',
        'Quyền và nghĩa vụ của người lao động theo Bộ luật Lao động',
        'Hệ thống cơ quan tư pháp Việt Nam – Sơ đồ tổng quan',
        'Quy trình xét xử vụ án hình sự tại tòa án nhân dân',
        'Các loại hợp đồng lao động và điều kiện áp dụng',
        'Trợ cấp thất nghiệp: Điều kiện, mức hưởng, thời gian',
        'Bảo hiểm y tế 2025: Mức đóng, quyền lợi, thủ tục',
        'Luật Doanh nghiệp 2020: Những thay đổi quan trọng cần biết',
        'Thủ tục cấp Giấy chứng nhận quyền sử dụng đất',
        'Quy định mới về phòng chống tham nhũng năm 2025',
        'Các hình thức xử phạt vi phạm hành chính và mức phạt',
        'Chính sách hỗ trợ doanh nghiệp vừa và nhỏ năm 2025',
        'Hướng dẫn thủ tục đăng ký kết hôn từ A đến Z',
        'Luật Bảo vệ quyền lợi người tiêu dùng – Tổng quan',
        'Quy trình giải quyết tranh chấp đất đai theo pháp luật',
        'Chính sách hỗ trợ người có công với cách mạng 2025',
        'Hệ thống thuế tại Việt Nam – Các sắc thuế chính',
        'Quyền bình đẳng giới trong pháp luật Việt Nam',
        'Quy định về bảo vệ dữ liệu cá nhân năm 2024',
        'Luật Tố tụng hành chính: Quy trình khiếu kiện hành chính',
        'Pháp luật về sở hữu trí tuệ: Những điểm cần biết',
    ][i],
    desc: 'Infographic tổng hợp các quy định pháp luật mới nhất, trình bày trực quan giúp người dân và doanh nghiệp dễ dàng nắm bắt.',
    date: `${String((i % 28) + 1).padStart(2, '0')}/0${(i % 3) + 1}/2026`,
    source: ['Bộ Tư pháp', 'Bộ Tài chính', 'Cổng PLQG', 'Bộ Lao động – TB&XH', 'Chính phủ'][i % 5],
    thumbnail: THUMBNAILS[i % THUMBNAILS.length],
    images: Array.from({ length: (i % 3) + 1 }, (_, imgIdx) => DETAIL_IMAGES[imgIdx % DETAIL_IMAGES.length]),
}));

// ── Image placeholder wrapper ────────────────────────────────────────────────
const ImageContainer = ({ src, alt, className = '' }) => {
    return (
        <div className={`overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <Image size={24} className="text-gray-300" />
            )}
        </div>
    );
};

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ current, total, onChange }) => {
    if (total <= 1) return null;
    const pages = () => {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
        if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        return [1, '...', current - 1, current, current + 1, '...', total];
    };
    return (
        <div className="flex justify-center items-center gap-1.5 mt-8">
            <button onClick={() => onChange(current - 1)} disabled={current === 1}
                className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
                <ChevronRight size={13} className="rotate-180" /> Trước
            </button>
            {pages().map((p, i) => p === '...'
                ? <span key={i} className="w-8 h-8 flex items-center justify-center text-gray-400 text-[12px]">...</span>
                : <button key={p} onClick={() => onChange(p)}
                    className={`w-8 h-8 rounded text-[12px] font-semibold border ${current === p ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400'}`}>
                    {p}
                </button>
            )}
            <button onClick={() => onChange(current + 1)} disabled={current === total}
                className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
                Sau <ChevronRight size={13} />
            </button>
        </div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const InfographicPage = () => {
    const navigate = useNavigate();
    const PER_PAGE = 8;
    const [page, setPage] = useState(1);

    const featured = INFOGRAPHIC_LIST.slice(0, 4);
    const listAll = INFOGRAPHIC_LIST.slice(4);
    const totalPages = Math.ceil(listAll.length / PER_PAGE);
    const listPage = listAll.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const sidebarLatest = INFOGRAPHIC_LIST.slice(0, 5);

    const goDetail = (item) => navigate(`/infographic/${item.slug}`);
    const goPage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="container mx-auto px-4 max-w-[1280px] pt-5">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 text-[12px] text-gray-500 mb-5">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <Link to="/tin-tuc/noi-bat" className="hover:text-blue-600">Tin tức và truyền thông</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium">Infographic</span>
                </nav>

                <div className="flex gap-6">
                    {/* ── Main Column ── */}
                    <div className="flex-1 min-w-0">

                        {/* ─ Featured (MH01) ─ */}
                        <section className="mb-8">
                            <h2 className="text-[18px] font-bold text-[#0f4c81] mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-[#1a3b8b] rounded-full inline-block"></span>
                                Infographic nổi bật
                            </h2>

                            {/* Hero – click → detail */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-4 cursor-pointer group"
                                onClick={() => goDetail(featured[0])}>
                                <ImageContainer src={featured[0].thumbnail} alt={featured[0].title}
                                    className="aspect-[16/7] relative" />
                                <div className="p-4">
                                    <h3 className="text-[16px] font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                                        {featured[0].title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-[12px] text-gray-400">
                                        <span className="flex items-center gap-1"><Calendar size={11} />{featured[0].date}</span>
                                        <span>Nguồn: {featured[0].source}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3 sub-cards */}
                            <div className="grid grid-cols-3 gap-4">
                                {featured.slice(1).map((item) => (
                                    <div key={item.id}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group"
                                        onClick={() => goDetail(item)}>
                                        <ImageContainer src={item.thumbnail} alt={item.title} className="aspect-[4/3]" />
                                        <div className="p-3">
                                            <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </p>
                                            <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1.5">
                                                <Calendar size={10} />{item.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ─ List (MH02) ─ */}
                        <section>
                            <h2 className="text-[18px] font-bold text-[#0f4c81] mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-[#1a3b8b] rounded-full inline-block"></span>
                                Danh sách Infographic
                            </h2>

                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                                {listPage.map((item) => (
                                    <div key={item.id}
                                        className="flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                                        onClick={() => goDetail(item)}>
                                        {/* Thumbnail */}
                                        <ImageContainer src={item.thumbnail} alt={item.title}
                                            className="w-32 h-24 rounded-lg shrink-0" />
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[14px] font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-[12px] text-gray-500 line-clamp-1 mb-2">{item.desc}</p>
                                            <div className="flex items-center gap-4 text-[11px] text-gray-400">
                                                <span className="flex items-center gap-1"><Calendar size={10} />{item.date}</span>
                                                <span>Nguồn: {item.source}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Pagination current={page} total={totalPages} onChange={goPage} />
                        </section>
                    </div>

                    {/* ── Sidebar (MH04) ── */}
                    <aside className="hidden lg:block w-[280px] shrink-0">
                        {/* Latest */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
                            <h3 className="font-bold text-[14px] text-gray-800 border-b border-gray-100 pb-2 mb-3">
                                Infographic mới nhất
                            </h3>
                            <div className="space-y-3">
                                {sidebarLatest.map((item) => (
                                    <div key={item.id}
                                        className="flex gap-2 cursor-pointer group"
                                        onClick={() => goDetail(item)}>
                                        <ImageContainer src={item.thumbnail} alt={item.title}
                                            className="w-16 h-12 rounded-lg shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                                <Calendar size={9} />{item.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/infographic"
                                className="block w-full mt-3 text-[12px] text-blue-600 hover:underline text-center">
                                Xem tất cả →
                            </Link>
                        </div>

                        {/* Contact widget */}
                        <div className="bg-gradient-to-br from-[#0f4c81] to-[#1a3b8b] rounded-xl p-4 text-white">
                            <h3 className="font-bold text-[14px] mb-1">Chúng tôi luôn lắng nghe &amp; phản hồi</h3>
                            <p className="text-[12px] text-white/70 mb-4">Mọi thắc mắc về pháp luật, hãy liên hệ với chúng tôi ngay!</p>
                            <a href="tel:19001234"
                                className="flex items-center justify-center gap-2 w-full py-2 bg-white/15 hover:bg-white/25 rounded-lg text-[13px] font-semibold transition-colors mb-2">
                                <Phone size={14} /> Gọi tổng đài: 1900 1234
                            </a>
                            <Link to="/lien-he"
                                className="flex items-center justify-center gap-2 w-full py-2 bg-cyan-400/20 hover:bg-cyan-400/30 rounded-lg text-[13px] font-semibold transition-colors">
                                <MessageSquare size={14} /> Gửi góp ý trực tiếp
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default InfographicPage;

import React from 'react';
import { Clock, ArrowRight, ShieldCheck, Users, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
    {
        id: 101,
        title: 'Ban hành Nghị định mới về đơn giản hóa thủ tục cấp giấy phép kinh doanh trực tuyến',
        sapo: 'Nghị định mới giúp tinh giản 15 bước kê khai hành chính, hỗ trợ các doanh nghiệp số hoàn tất đăng ký nhanh chóng trong ngày làm việc.',
        date: '28/10/2025',
        image: '/thumb1.png'
    },
    {
        id: 102,
        title: 'Áp dụng giảm thuế giá trị gia tăng (VAT) 2% đối với nhiều nhóm hàng hóa đến giữa năm 2026',
        date: '27/10/2025',
        image: '/thumb2.png'
    },
    {
        id: 103,
        title: 'Quy định mới về quản lý hoạt động thương mại điện tử xuyên biên giới',
        date: '26/10/2025',
        image: '/thumb3.png'
    },
    {
        id: 104,
        title: 'Đẩy mạnh cải cách tư pháp toàn diện theo đề án chuyển đổi số dịch vụ công quốc gia',
        date: '25/10/2025',
        image: '/thumb1.png'
    },
    {
        id: 105,
        title: 'Triển khai cấp phiếu lý lịch tư pháp trên ứng dụng VNeID toàn quốc',
        date: '24/10/2025',
        image: '/thumb2.png'
    },
    {
        id: 106,
        title: 'Sửa đổi Luật Bảo hiểm y tế: Quyền lợi người khám chữa bệnh được đảm bảo tối đa',
        date: '23/10/2025',
        image: '/thumb3.png'
    }
];

const PoliciesAndLifeV2 = ({ isHalfWidth = false }) => {
    const featured = articles[0];
    const sideArticles = articles.slice(1, 6);

    const renderHalfWidth = () => (
        <div className="flex flex-col font-sans h-full">

            {/* ── Header ── */}
            <div className="flex flex-col mb-4 pb-3 border-b border-slate-200 shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0f4c81] tracking-tight leading-tight">
                        Chính sách &amp; Cuộc sống
                    </h2>
                    <Link to="/tin-tuc/chinh-sach-cuoc-song" className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100 hover:border-blue-200 text-[#0f4c81] text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm active:scale-95">
                        <span>Xem tất cả</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* 3 Pseudo-Tabs */}
                <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar whitespace-nowrap">
                    <span className="text-[13px] font-semibold px-1 py-0.5 transition-colors text-[#0f4c81]">Tiêu điểm chính sách</span>
                    <span className="text-slate-300 px-2 text-[13px] select-none">|</span>
                    <Link to="/hoi-dap" className="text-[13px] font-semibold px-1 py-0.5 transition-colors text-slate-400 hover:text-slate-600">Hỏi đáp chính sách</Link>
                    <span className="text-slate-300 px-2 text-[13px] select-none">|</span>
                    <Link to="/ho-tro-phap-ly" className="text-[13px] font-semibold px-1 py-0.5 transition-colors text-slate-400 hover:text-slate-600">Hỗ trợ pháp lý cho doanh nghiệp</Link>
                </div>

                {/* Active tab underline indicator */}
                <div className="mt-2 flex">
                    <div className="h-[2px] transition-all duration-300 rounded-full bg-[#0f4c81]" style={{ width: '33.33%' }} />
                    <div className="h-[2px] transition-all duration-300 rounded-full bg-transparent" style={{ width: '33.33%' }} />
                    <div className="h-[2px] transition-all duration-300 rounded-full bg-transparent" style={{ width: '33.33%' }} />
                </div>
            </div>

            {/* ── News Layout: 1 featured left + 3 side right — flex-grow to fill height ── */}
            <div className="flex flex-col md:flex-row gap-5 flex-1">

                {/* LEFT: Featured large article */}
                <Link
                    to={`/news/${featured.id}`}
                    className="group md:w-[52%] shrink-0 flex flex-col"
                >
                    <div className="relative w-full rounded-xl overflow-hidden bg-slate-200 mb-3 shrink-0" style={{ aspectRatio: '16/9' }}>
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0f4c81] text-white text-[10px] font-bold uppercase">
                            Tiêu điểm
                        </div>
                    </div>
                    <h3 className="font-bold text-[#0f4c81] text-[15px] md:text-[16px] leading-snug group-hover:text-blue-700 transition-colors line-clamp-3 mb-2">
                        {featured.title}
                    </h3>
                    {featured.sapo && (
                        <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-4 mb-2">
                            {featured.sapo}
                        </p>
                    )}
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock size={11} className="text-[#0f4c81] shrink-0" />
                        <span>{featured.date}</span>
                    </div>
                </Link>

                {/* Divider */}
                <div className="hidden md:block w-px bg-slate-200 shrink-0 self-stretch" />

                {/* RIGHT: 5 side articles stacked */}
                <div className="flex flex-col flex-1 min-w-0 gap-2">
                    {sideArticles.map((item, idx) => (
                        <Link
                            key={item.id}
                            to={`/news/${item.id}`}
                            className={`group flex gap-3 items-start py-2 ${idx < sideArticles.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                            <div className="relative w-[88px] aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                                />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-800 text-[13px] leading-snug group-hover:text-blue-700 transition-colors line-clamp-3 mb-1.5">
                                    {item.title}
                                </h4>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-auto">
                                    <Clock size={10} className="text-[#0f4c81] shrink-0" />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );


    // Full-width standalone layout (unchanged)
    const renderFullWidth = () => (
        <div className="container mx-auto px-4 max-w-[1504px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-5 border-b border-slate-200">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f4c81] leading-tight">
                        Chính sách &amp; Cuộc sống
                    </h2>
                    <p className="text-slate-500 mt-2 text-base max-w-2xl font-light">
                        Nơi truyền tải hơi thở cuộc sống vào xây dựng chính sách và phản ánh tiếng nói pháp lý đa chiều.
                    </p>
                </div>
            </div>

            {/* Tab bar */}
            <div className="flex items-center gap-0 mb-8 border-b border-slate-200 overflow-x-auto hide-scrollbar whitespace-nowrap">
                <span className="text-[15px] font-semibold px-2 py-2 border-b-2 -mb-px transition-colors text-[#0f4c81] border-[#0f4c81]">Tiêu điểm chính sách</span>
                <span className="text-slate-300 px-3 text-[15px] select-none">|</span>
                <Link to="/hoi-dap" className="text-[15px] font-semibold px-2 py-2 border-b-2 -mb-px transition-colors text-slate-400 border-transparent hover:text-slate-600">Hỏi đáp chính sách</Link>
                <span className="text-slate-300 px-3 text-[15px] select-none">|</span>
                <Link to="/ho-tro-phap-ly" className="text-[15px] font-semibold px-2 py-2 border-b-2 -mb-px transition-colors text-slate-400 border-transparent hover:text-slate-600">Hỗ trợ pháp lý cho doanh nghiệp</Link>
            </div>

            {/* News layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Featured */}
                <Link to={`/news/${featured.id}`} className="group lg:w-[45%] flex flex-col shrink-0">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-200 mb-4">
                        <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0f4c81] text-white text-[11px] font-bold uppercase">Tiêu điểm</div>
                    </div>
                    <h3 className="font-bold text-[#0f4c81] text-lg md:text-xl leading-snug group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">{featured.title}</h3>
                    {featured.sapo && <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-3">{featured.sapo}</p>}
                    <div className="flex items-center gap-1 text-[12px] text-slate-400 mt-auto">
                        <Clock size={12} className="text-slate-300 shrink-0" /><span>{featured.date}</span>
                    </div>
                </Link>

                <div className="w-px bg-slate-100 shrink-0 hidden lg:block" />

                {/* Side articles */}
                <div className="flex flex-col gap-4 flex-1 divide-y divide-slate-100">
                    {sideArticles.map((item) => (
                        <Link key={item.id} to={`/news/${item.id}`} className="group flex gap-4 items-start pt-4 first:pt-0">
                            <div className="relative w-[110px] aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-800 text-[14px] leading-snug group-hover:text-blue-700 transition-colors line-clamp-3 mb-2">{item.title}</h4>
                                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-auto">
                                    <Clock size={11} className="text-slate-300 shrink-0" /><span>{item.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

    if (isHalfWidth) {
        return renderHalfWidth();
    }

    return (
        <section className="py-16 bg-slate-50 font-sans border-t border-slate-200 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10" />
            {renderFullWidth()}
        </section>
    );
};

export default PoliciesAndLifeV2;

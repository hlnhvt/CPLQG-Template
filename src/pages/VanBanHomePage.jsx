import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, FileText, Calendar, Clock, Flame, Eye, TrendingUp, Grid, BookOpen, AlertCircle, Star, Sparkles, ArrowRight } from 'lucide-react';

/* ──────────────────────────── STATIC DATA ────────────────────────────── */

const CATEGORIES = [
    { title: 'Hiến pháp',            count: 1     },
    { title: 'Bộ luật',              count: 18    },
    { title: 'Luật',                  count: 245   },
    { title: 'Nghị định',            count: 3124  },
    { title: 'Thông tư',             count: 14520 },
    { title: 'Thông tư liên tịch',   count: 850   },
    { title: 'Tiêu chuẩn Việt Nam',  count: 420   },
    { title: 'Quyết định',           count: 21050 },
    { title: 'Chỉ thị',             count: 1205  },
    { title: 'Công văn',             count: 45012 },
];

const STATS = [
    { label: 'Văn bản hệ thống', target: 97000 },
    { label: 'Cập nhật trong tháng', target: 1243 },
    { label: 'Lượt tra cứu hôm nay', target: 58032 },
    { label: 'Dự thảo đang lấy ý kiến', target: 87 },
];

const MOCK_DOCS = [
    { id: '1', soHieu: '14/2026/NĐ-CP', title: 'Nghị định quy định chi tiết một số điều của Luật Giao dịch điện tử', cqbh: 'Chính phủ', date: '15/03/2026', view: 1245 },
    { id: '2', soHieu: '05/2026/TT-BTC', title: 'Thông tư quy định mức thu, chế độ thu, nộp, quản lý lệ phí đăng ký doanh nghiệp', cqbh: 'Bộ Tài chính', date: '10/03/2026', view: 856 },
    { id: '3', soHieu: '28/2026/QĐ-TTg', title: 'Quyết định về việc ban hành kế hoạch triển khai Luật Căn cước', cqbh: 'Thủ tướng Chính phủ', date: '05/03/2026', view: 2104 },
    { id: '4', soHieu: '12/2026/NĐ-CP', title: 'Nghị định về quản lý, kết nối và chia sẻ dữ liệu số của cơ quan nhà nước', cqbh: 'Chính phủ', date: '01/03/2026', view: 940 },
    { id: '5', soHieu: '02/2026/TT-BTP', title: 'Thông tư hướng dẫn nghiệp vụ công tác bồi thường nhà nước', cqbh: 'Bộ Tư pháp', date: '25/02/2026', view: 420 },
];

const MOCK_HOT_DOCS = [
    { id: '101', title: 'Luật Đất đai (sửa đổi) 2024: Toàn văn và Điểm mới', soHieu: '31/2024/QH15', date: '18/01/2024', label: 'HOT' },
    { id: '102', title: 'Nghị định 73/2024/NĐ-CP quy định mức lương cơ sở và chế độ tiền thưởng', soHieu: '73/2024/NĐ-CP', date: '30/06/2024', label: 'QUAN TRỌNG' },
    { id: '103', title: 'Luật Nhà ở (sửa đổi) 2023 có hiệu lực từ 2025', soHieu: '27/2023/QH15', date: '27/11/2023', label: 'SẮP HIỆU LỰC' },
];

const MOCK_DRAFTS = [
    { id: 'd1', title: 'Dự thảo Luật Thuế giá trị gia tăng (sửa đổi)', cqbh: 'Bộ Tài chính', endDate: '30/04/2026', status: 'Đang lấy ý kiến' },
    { id: 'd2', title: 'Dự thảo Nghị định quy định chi tiết Luật Viễn thông', cqbh: 'Bộ TT&TT', endDate: '15/04/2026', status: 'Đang lấy ý kiến' },
    { id: 'd3', title: 'Dự thảo Thông tư quy định tiêu chuẩn kỹ thuật quốc gia về An toàn thông tin mạng', cqbh: 'Bộ TT&TT', endDate: '05/05/2026', status: 'Mới đăng' },
];

/* ──────────────────────────── HELPERS / HOOKS ─────────────────────────── */

/** Returns true once the element enters the viewport */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/** Animated counter that runs from 0 to `target` once triggered */
function AnimatedCount({ target, active }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        const duration = 1500;
        const start = performance.now();
        const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            setCount(Math.floor(eased * target));
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [active, target]);
    return <>{count.toLocaleString()}</>;
}

/* ──────────────────────────── STYLES (injected once) ────────────────────── */
const ANIM_STYLES = `
@keyframes vb-fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
@keyframes vb-fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes vb-scaleIn  { from { opacity:0; transform:scale(.94); } to { opacity:1; transform:scale(1); } }
@keyframes vb-shimmer  { 0%,100% { opacity:.35; } 50% { opacity:.7; } }
@keyframes vb-float    { 0%,100% { transform:translateY(0px);  } 50% { transform:translateY(-8px); } }
@keyframes vb-spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes vb-pulse-ring { 0% { box-shadow:0 0 0 0 rgba(255,255,255,.4); } 100% { box-shadow:0 0 0 14px rgba(255,255,255,0); } }

.vb-fade-up    { opacity:0; }
.vb-fade-up.vb-in   { animation:vb-fadeUp .6s cubic-bezier(.16,1,.3,1) forwards; }
.vb-fade-in    { opacity:0; }
.vb-fade-in.vb-in   { animation:vb-fadeIn .7s ease forwards; }
.vb-scale-in   { opacity:0; }
.vb-scale-in.vb-in  { animation:vb-scaleIn .5s cubic-bezier(.34,1.56,.64,1) forwards; }

.vb-stagger-1 { animation-delay:.05s !important; }
.vb-stagger-2 { animation-delay:.12s !important; }
.vb-stagger-3 { animation-delay:.19s !important; }
.vb-stagger-4 { animation-delay:.26s !important; }
.vb-stagger-5 { animation-delay:.33s !important; }
.vb-stagger-6 { animation-delay:.40s !important; }
.vb-stagger-7 { animation-delay:.47s !important; }
.vb-stagger-8 { animation-delay:.54s !important; }
.vb-stagger-9 { animation-delay:.61s !important; }
.vb-stagger-10{ animation-delay:.68s !important; }

/* Typing cursor blink */
@keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
.vb-cursor { display:inline-block; width:2px; height:1.1em; background:currentColor; animation:blink 1s step-end infinite; vertical-align:middle; margin-left:2px; }

/* Shimmer background strip (removed per user request) */
.vb-float-icon { animation: vb-float 3.5s ease-in-out infinite; }

/* Search input glow */
.vb-search-glow:focus-within { box-shadow: 0 0 0 4px rgba(99,102,241,.2); }
`;

/* ──────────────────────────── MAIN COMPONENT ────────────────────────────── */
const VanBanHomePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('moi-cap-nhat');
    const [searchFocused, setSearchFocused] = useState(false);

    // Inject styles once
    useEffect(() => {
        const id = 'vb-home-anim';
        if (!document.getElementById(id)) {
            const tag = document.createElement('style');
            tag.id = id;
            tag.textContent = ANIM_STYLES;
            document.head.appendChild(tag);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/van-ban/tim-kiem?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Intersection observers for sections
    const [heroRef, heroVisible]       = useInView(0.1);
    const [statsRef, statsVisible]     = useInView(0.2);
    const [sidebarRef, sidebarVisible] = useInView(0.1);
    const [centerRef, centerVisible]   = useInView(0.1);
    const [rightRef, rightVisible]     = useInView(0.1);

    return (
        <div className="bg-[#f4f7fb] min-h-screen overflow-x-hidden">

            {/* ═══════════════════ 1. HERO SEARCH ═══════════════════ */}
            <div className="bg-gradient-to-br from-[#071429] via-[#0a1e3f] to-[#1a3b8b] relative overflow-hidden text-white pt-12 pb-16">

                {/* Animated dotted grid */}
                <div className="absolute inset-0 z-0 opacity-[0.08]"
                    style={{ backgroundImage:'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize:'30px 30px' }}/>

                {/* Decorative glowing orbs */}
                <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-500 blur-[120px] opacity-20 pointer-events-none"/>
                <div className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full bg-indigo-500 blur-[100px] opacity-20 pointer-events-none"/>

                <div ref={heroRef} className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                    {/* Badge */}
                    <div className={`flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 px-4 py-1.5 rounded-full text-[13px] font-semibold mb-5 backdrop-blur-sm vb-fade-up ${heroVisible ? 'vb-in' : ''}`}>
                        <Sparkles size={14} className="text-yellow-300" />
                        Cổng Pháp luật Quốc gia · Hệ thống tra cứu toàn diện
                    </div>

                    <h1 className={`text-3xl md:text-4xl font-black mb-3 text-center uppercase tracking-wide drop-shadow-md vb-fade-up vb-stagger-1 ${heroVisible ? 'vb-in' : ''}`}>
                        Thư viện Văn bản Pháp luật
                    </h1>
                    <p className={`text-blue-200 text-[15px] max-w-2xl text-center mb-8 vb-fade-up vb-stagger-2 ${heroVisible ? 'vb-in' : ''}`}>
                        Tra cứu toàn văn hệ thống Văn bản QPPL, Dự thảo, Công văn — dữ liệu tự động cập nhật từ các cơ quan Nhà nước.
                    </p>

                    {/* Search form */}
                    <form
                        onSubmit={handleSearch}
                        className={`w-full max-w-4xl bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2 transition-all duration-300 vb-scale-in vb-stagger-3 ${heroVisible ? 'vb-in' : ''} ${searchFocused ? 'shadow-[0_0_0_4px_rgba(99,102,241,.25),0_20px_60px_rgba(0,0,0,.2)]' : 'shadow-2xl'}`}
                    >
                        <div className={`flex-1 flex items-center bg-gray-50 rounded-lg px-4 border transition-all duration-300 ${searchFocused ? 'border-indigo-400 bg-white' : 'border-gray-200'}`}>
                            <Search size={22} className={`shrink-0 transition-colors duration-300 ${searchFocused ? 'text-indigo-500' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Nhập Số hiệu, Tên văn bản hoặc Từ khóa..."
                                className="w-full bg-transparent border-none py-3.5 px-3 text-gray-800 text-[15px] outline-none placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <select className="hidden md:block bg-gray-50 border border-gray-200 text-gray-700 text-[14px] font-medium rounded-lg px-4 py-3.5 outline-none focus:border-indigo-400 transition">
                                <option>Tất cả lĩnh vực</option>
                                <option>Thuế - Phí - Lệ Phí</option>
                                <option>Lao động - Tiền lương</option>
                                <option>Đất đai - Nhà ở</option>
                                <option>Hình sự - Tố tụng</option>
                            </select>
                            <button
                                type="submit"
                                className="relative overflow-hidden bg-[#e03131] hover:bg-[#c92a2a] text-white px-8 py-3.5 rounded-lg font-bold text-[15px] whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95 group"
                            >
                                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                                <Search size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                                Tìm Kiếm
                            </button>
                        </div>
                    </form>

                    {/* Popular tags */}
                    <div className={`flex flex-wrap items-center justify-center gap-3 mt-5 text-[13px] vb-fade-up vb-stagger-4 ${heroVisible ? 'vb-in' : ''}`}>
                        <span className="text-blue-300 font-medium">Tìm kiếm phổ biến:</span>
                        {['Luật Đất đai', 'Nghị định 73/2024', 'Thuế Thu nhập cá nhân', 'Luật Căn cước'].map((kw) => (
                            <Link
                                key={kw}
                                to={`/van-ban/tim-kiem?q=${encodeURIComponent(kw)}`}
                                className="bg-white/10 hover:bg-white/25 border border-white/15 px-3 py-1 rounded-full text-white transition-all duration-200 hover:scale-105"
                            >
                                {kw}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════════ 2. STATS TICKER ═══════════════════ */}
            <div ref={statsRef} className="bg-[#0f2868] text-white">
                <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`vb-fade-up vb-stagger-${i + 1} ${statsVisible ? 'vb-in' : ''}`}
                        >
                            <div className="text-2xl md:text-3xl font-black text-yellow-300 tabular-nums">
                                <AnimatedCount target={s.target} active={statsVisible} />+
                            </div>
                            <div className="text-[12px] text-blue-200 font-medium mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════════════════ 3. MAIN 3‑COLUMN AREA ═══════════════════ */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* ── LEFT SIDEBAR ── */}
                    <div ref={sidebarRef} className="w-full lg:w-1/4 shrink-0 space-y-6">

                        {/* Category list */}
                        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden vb-fade-up ${sidebarVisible ? 'vb-in' : ''}`}>
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                                <Grid size={18} className="text-[#1a3b8b]" />
                                <h3 className="font-bold text-[15px] text-[#1a3b8b] uppercase">Loại văn bản</h3>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {CATEGORIES.map((cat, idx) => (
                                    <li
                                        key={idx}
                                        className={`vb-fade-in vb-stagger-${Math.min(idx + 1, 10)} ${sidebarVisible ? 'vb-in' : ''}`}
                                    >
                                        <Link
                                            to={`/van-ban/tim-kiem?loai=${encodeURIComponent(cat.title)}`}
                                            className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50 transition-colors group"
                                        >
                                            <span className="text-[14px] text-gray-700 font-medium group-hover:text-blue-700 flex items-center gap-2">
                                                <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                                                {cat.title}
                                            </span>
                                            <span className="text-[12px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors tabular-nums">
                                                {cat.count.toLocaleString()}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/van-ban/tim-kiem" className="flex items-center justify-center gap-1 py-3 text-[13px] font-bold text-blue-600 bg-gray-50 hover:bg-gray-100 transition border-t border-gray-100 group">
                                Xem toàn bộ <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Quick Utilities */}
                        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden vb-fade-up vb-stagger-2 ${sidebarVisible ? 'vb-in' : ''}`}>
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                                <Star size={18} className="text-[#e03131]" />
                                <h3 className="font-bold text-[15px] text-[#e03131] uppercase">Công cụ pháp luật</h3>
                            </div>
                            <ul className="p-2 space-y-1">
                                {[
                                    { to: '/van-ban/hieu-luc',     icon: <Clock size={16} />,      label: 'Văn bản sắp có hiệu lực', bg: 'bg-green-50 text-green-600 group-hover:bg-green-100', hover: 'group-hover:text-green-700' },
                                    { to: '/van-ban/het-hieu-luc', icon: <AlertCircle size={16} />, label: 'Văn bản hết hiệu lực',     bg: 'bg-red-50 text-red-600 group-hover:bg-red-100',     hover: 'group-hover:text-red-700' },
                                    { to: '/du-thao',             icon: <FileText size={16} />,    label: 'Lấy ý kiến Dự thảo',      bg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',   hover: 'group-hover:text-blue-700' },
                                ].map((item) => (
                                    <li key={item.to}>
                                        <Link to={item.to} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50/80 transition-all duration-200 text-gray-700 group hover:translate-x-0.5">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${item.bg}`}>{item.icon}</div>
                                            <p className={`font-bold text-[13px] transition-colors ${item.hover}`}>{item.label}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ── CENTER COLUMN ── */}
                    <div ref={centerRef} className="flex-1 space-y-6 min-w-0">

                        {/* Tabbed document list */}
                        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden vb-fade-up ${centerVisible ? 'vb-in' : ''}`}>
                            <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
                                {[
                                    { key: 'moi-cap-nhat', label: 'Văn bản mới cập nhật' },
                                    { key: 'sap-hieu-luc', label: 'Bản tin hiệu lực' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`relative px-6 py-4 text-[14px] font-bold uppercase transition-colors whitespace-nowrap ${activeTab === tab.key ? 'bg-white text-[#1a3b8b] border-t-[3px] border-t-[#1a3b8b]' : 'text-gray-500 hover:text-gray-800 border-t-[3px] border-t-transparent'}`}
                                    >
                                        {tab.label}
                                        {/* Active underline slide-in */}
                                        {activeTab === tab.key && (
                                            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1a3b8b] rounded animate-[vb-fadeIn_.2s_ease_forwards]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <ul className="divide-y divide-gray-100">
                                {MOCK_DOCS.map((doc, i) => (
                                    <li
                                        key={doc.id}
                                        className={`group vb-fade-up vb-stagger-${i + 1} ${centerVisible ? 'vb-in' : ''}`}
                                    >
                                        <Link to={`/van-ban/${doc.id}`} className="block p-4 hover:bg-blue-50/30 transition-all duration-200">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-[12px] font-bold text-[#1a3b8b] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{doc.soHieu}</span>
                                                <span className="text-[12px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{doc.cqbh}</span>
                                            </div>
                                            <h3 className="text-[15px] font-bold text-gray-800 mb-2 leading-snug group-hover:text-blue-700 line-clamp-2 transition-colors">{doc.title}</h3>
                                            <div className="flex items-center gap-4 text-[12px] text-gray-500 font-medium">
                                                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gray-400" /> {doc.date}</span>
                                                <span className="flex items-center gap-1.5"><TrendingUp size={13} className="text-emerald-500" /> <span className="text-emerald-600">Còn hiệu lực</span></span>
                                                <span className="flex items-center gap-1.5 ml-auto"><Eye size={13} className="text-gray-400" /> {doc.view.toLocaleString()}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-100 bg-gray-50/50 text-center p-4">
                                <Link to="/van-ban/moi-ban-hanh" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1a3b8b] hover:text-blue-800 group transition">
                                    Xem thêm văn bản mới <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Draft highlight */}
                        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden vb-fade-up vb-stagger-2 ${centerVisible ? 'vb-in' : ''}`}>
                            <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
                                <h3 className="font-bold text-[15px] text-[#1a3b8b] uppercase flex items-center gap-2">
                                    <BookOpen size={18} /> Điểm nóng Dự thảo
                                </h3>
                                <Link to="/du-thao" className="text-[12px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide transition">Xem tất cả {'>>'}</Link>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {MOCK_DRAFTS.map((draft, i) => (
                                    <li
                                        key={draft.id}
                                        className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-all duration-200 group vb-fade-up vb-stagger-${i + 1} ${centerVisible ? 'vb-in' : ''}`}
                                    >
                                        <div className="w-12 h-12 bg-white rounded-lg border shadow-sm shrink-0 flex items-center justify-center text-gray-400 group-hover:border-blue-300 transition-colors group-hover:text-blue-500">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/du-thao/${draft.id}`} className="text-[15px] font-bold text-gray-800 hover:text-blue-600 leading-snug line-clamp-2 mb-1.5">{draft.title}</Link>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-500">
                                                <span className="font-bold text-gray-600">{draft.cqbh}</span>
                                                <span>Hạn: <strong className="text-red-500">{draft.endDate}</strong></span>
                                                <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">{draft.status}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ── RIGHT SIDEBAR ── */}
                    <div ref={rightRef} className="w-full lg:w-[320px] shrink-0 space-y-6">

                        {/* Hot documents block */}
                        <div className={`relative bg-gradient-to-b from-[#1a3b8b] to-[#0d2260] rounded-xl shadow-xl border border-blue-900 overflow-hidden text-white vb-scale-in ${rightVisible ? 'vb-in' : ''}`}>
                            {/* Ambient glow */}
                            <div className="absolute top-4 right-4 w-28 h-28 bg-blue-400 rounded-full blur-[80px] opacity-25 pointer-events-none"/>
                            <div className="absolute bottom-4 left-4 w-20 h-20 bg-indigo-400 rounded-full blur-[60px] opacity-20 pointer-events-none"/>

                            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2 relative z-10">
                                <Flame size={20} className="text-yellow-400 vb-float-icon" />
                                <h3 className="font-bold text-[15px] uppercase tracking-wide">Văn bản đáng chú ý</h3>
                            </div>
                            <ul className="divide-y divide-white/5 relative z-10">
                                {MOCK_HOT_DOCS.map((doc, i) => (
                                    <li
                                        key={doc.id}
                                        className={`p-4 hover:bg-white/8 transition-all duration-200 flex items-start gap-3 group vb-fade-up vb-stagger-${i + 1} ${rightVisible ? 'vb-in' : ''}`}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <span className={`inline-block text-[10px] font-black px-1.5 py-0.5 rounded border mb-1 flex-shrink-0
                                                ${doc.label === 'HOT' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                                                  doc.label === 'QUAN TRỌNG' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                                                  'bg-green-500/20 text-green-300 border-green-500/30'}`}
                                            >
                                                {doc.label}
                                            </span>
                                            <Link to={`/van-ban/${doc.id}`} className="block text-[14px] font-bold text-gray-100 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                                                {doc.title}
                                            </Link>
                                            <div className="text-[11px] text-blue-200 mt-1.5 flex justify-between items-center opacity-70">
                                                <span>{doc.soHieu}</span>
                                                <span className="text-yellow-300/80">{doc.date}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* News snapshot */}
                        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden vb-fade-up vb-stagger-2 ${rightVisible ? 'vb-in' : ''}`}>
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                                <h3 className="font-bold text-[15px] text-gray-800 uppercase">Tin pháp luật mới</h3>
                                <Link to="/tin-tuc/noi-bat" className="text-[12px] font-bold text-gray-500 hover:text-blue-600 transition">Xem thêm</Link>
                            </div>
                            <div className="p-4">
                                <Link to="/news/1" className="block group mb-4">
                                    <div className="w-full h-36 bg-gray-200 rounded-lg overflow-hidden mb-3 relative">
                                        <img
                                            src="/images/luat-dat-dai.jpg"
                                            alt="thumbnail"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.target.src = 'https://picsum.photos/400/200?random=42'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                    </div>
                                    <h4 className="font-bold text-[14.5px] text-gray-800 leading-snug group-hover:text-[#1a3b8b] transition-colors line-clamp-2">
                                        Công bố 03 điểm mới siêu quan trọng tại Luật Đất đai 2024 ảnh hưởng tới mọi người dân
                                    </h4>
                                    <p className="text-[12px] text-gray-500 mt-1 flex items-center gap-1.5"><Clock size={12} /> 2 giờ trước</p>
                                </Link>
                                <ul className="space-y-3 border-t border-gray-100 pt-3">
                                    {[
                                        'Chính phủ ban hành quy định mới về quản lý không gian mạng',
                                        'Bộ Tài chính đề xuất giảm thuế GTGT 2% đến hết 2026',
                                    ].map((title, i) => (
                                        <li key={i}>
                                            <Link to={`/news/${i + 2}`} className="flex items-start gap-2 text-[14px] font-semibold text-gray-700 hover:text-[#1a3b8b] leading-tight line-clamp-2 group transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0 group-hover:bg-blue-600 transition-colors"/>
                                                {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VanBanHomePage;

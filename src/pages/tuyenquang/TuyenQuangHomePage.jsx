import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Clock, PlayCircle, ChevronLeft, ChevronRight, ArrowRight, Search, Sparkles, Newspaper, FileText,
    HelpCircle, BookOpen, Download, Eye, ChevronDown, Users, Mic, Landmark
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TuyenQuangHeader from '../../components/tuyenquang/TuyenQuangHeader';
import { TuyenQuangTicker, TuyenQuangFooter, TQ_ICONS } from '../../components/tuyenquang/TuyenQuangShared';
import { Reveal, CountUp, ScrollProgressBar, LaoCaiV3Styles } from '../../components/laocaiV3/LaoCaiV3Motion';
import {
    TQ_HOME, TQ_CATEGORIES, TQ_HOME_CATEGORY_SLUGS, TQ_DOC_GROUPS, TQ_FAQ_GROUPS,
    tuyenquangSiteConfig, tuyenquangArticles, tuyenquangDocs, tuyenquangFAQs, tuyenquangVideos,
    tuyenquangInfographics, tuyenquangLinks, tqArticlesOf, tqArticleUrl, tqCategoryUrl, tqVideoUrl, TQ_DIRECTIVE_DOCS_URL, tqDirectiveDocUrl
} from '../../data/tuyenquangMockData';

const HERO_INTERVAL = 7000;
const BOTTOM_SLIDE_INTERVAL = 6500;

const byId = (id) => tuyenquangArticles.find((a) => a.id === id);
const HERO_SLIDES = ['1', '2', '6', '15'].map(byId);
const BOTTOM_SLIDES = [['3', '11', '21'], ['24', '29', '35'], ['38', '40', '42']].map((g) => g.map(byId));

const QUICK_LINKS = [
    { label: 'Văn bản chỉ đạo điều hành', desc: 'VB Trung ương, tỉnh, HĐPH', icon: FileText, to: TQ_DIRECTIVE_DOCS_URL },
    { label: 'Hỏi đáp, tư vấn pháp luật', desc: 'Gửi câu hỏi, tra cứu giải đáp', icon: HelpCircle, to: `${TQ_HOME}/hoi-dap` },
    { label: 'Tài liệu PBGDPL', desc: 'Tờ gấp, đề cương, sách hỏi đáp', icon: BookOpen, to: tqCategoryUrl('tai-lieu-pbgdpl') }
];
// Nhãn ngắn cho tab loại tài liệu ở khối Tài liệu PBGDPL (tab kiểu khối Hỏi đáp)
const DOC_TAB_LABELS = {
    'vbqppl-tw': 'VBQPPL Trung ương', 'vbqppl-tinh': 'VBQPPL tỉnh', 'de-cuong': 'Đề cương', 'to-gap': 'Tờ gấp',
    'sach-hoi-dap': 'Sách hỏi - đáp', 'tinh-huong': 'Tình huống', 'cau-chuyen': 'Câu chuyện', 'pano': 'Pano, âm thanh'
};
const CONTEST_ARTICLE = tuyenquangArticles.find((a) => a.category === 'cuoc-thi' && a.title.includes('Công dân số hiểu luật'));
const CONTEST_BANNER_LINK = CONTEST_ARTICLE ? tqArticleUrl(CONTEST_ARTICLE.id) : tqCategoryUrl('cuoc-thi');

// Mô tả ngắn cho 3 lựa chọn ở khối Báo cáo viên, tuyên truyền viên
const BCV_NOTES = {
    'cap-tinh': 'Danh sách, quyết định công nhận báo cáo viên cấp tỉnh',
    'cap-xa': 'Đội ngũ báo cáo viên pháp luật tại các xã, phường',
    'tuyen-truyen-vien': 'Tuyên truyền viên ở thôn, bản, tổ dân phố'
};

const HOT_KEYWORDS = ['Luật Đất đai 2024', 'Ngày Pháp luật', 'Hòa giải cơ sở', 'Chuẩn tiếp cận pháp luật'];

// Chuyên trang quảng bá ở cột phải khối Tin tức sự kiện (theo trang PBGDPL Tuyên Quang)
const PROMO_TILES = [
    { slug: 'chuan-tiep-can', label: 'Chuẩn tiếp cận pháp luật', note: 'Đánh giá, công nhận cấp xã', bg: 'from-[#4f56ca] via-[#2c1b92] to-[#4f56ca]' },
    { slug: 'hoa-giai-co-so', label: 'Hòa giải ở cơ sở', note: 'Mô hình, kinh nghiệm hòa giải', bg: 'from-[#0b3d91] via-[#1565c0] to-[#1e88e5]' },
    { slug: 'cuoc-thi', label: 'Cuộc thi, hội thi', note: 'Tìm hiểu pháp luật trực tuyến', bg: 'from-[#991b1b] via-[#b91c1c] to-[#d97706]' }
];


const Image16x9 = ({ src, alt, className = '' }) => (
    <div className={`aspect-video w-full relative overflow-hidden bg-gray-100 ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
    </div>
);

// Tiêu đề khối: bấm vào tiêu đề để sang chuyên mục (không dùng nút "Xem tất cả")
const SectionHeading = ({ title, to, children }) => (
    <div className="relative flex flex-wrap justify-between items-center gap-3 mb-5 pb-3 border-b border-gray-200">
        <Link to={to} className="group/heading inline-flex items-center gap-2" title={`Xem chuyên mục ${title}`}>
            <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81] group-hover/heading:text-[#991b1b] transition-colors">{title}</h2>
            <ChevronRight size={19} className="text-[#0f4c81] group-hover/heading:text-[#991b1b] group-hover/heading:translate-x-0.5 transition-all" />
        </Link>
        {children && <div className="flex flex-wrap items-center gap-3 ml-auto">{children}</div>}
        <span className="lc3-heading-bar absolute -bottom-px left-0 h-[3px] rounded-full bg-gradient-to-r from-amber-400 to-[#991b1b]" />
    </div>
);

const TabPills = ({ tabs, active, onChange }) => (
    <div className="flex flex-wrap items-center gap-1 bg-gray-100 p-1 rounded-xl" role="tablist">
        {tabs.map((t) => (
            <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active === t.id}
                onClick={() => onChange(t.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${active === t.id ? 'bg-white text-[#0f4c81] shadow-sm' : 'text-gray-500 hover:text-[#0f4c81]'}`}
            >
                {t.label}
            </button>
        ))}
    </div>
);

const ArticleRow = ({ article, showImage = true }) => (
    <Link to={tqArticleUrl(article.id)} className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
        {showImage && (
            <div className="w-[104px] shrink-0 rounded-lg overflow-hidden">
                <Image16x9 src={article.image} alt={article.title} />
            </div>
        )}
        <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[13.5px] text-gray-900 group-hover:text-[#991b1b] leading-snug line-clamp-2 transition-colors">{article.title}</h4>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                <Clock size={11} /> <span>{article.date}</span>
            </div>
        </div>
    </Link>
);

const TuyenQuangHomePage = () => {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHeroPaused, setIsHeroPaused] = useState(false);
    const [bottomSlideIndex, setBottomSlideIndex] = useState(0);
    const [isBottomSlidePaused, setIsBottomSlidePaused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [docTab, setDocTab] = useState('tinh');
    const [faqTab, setFaqTab] = useState('hoi-dap');
    const [openFaq, setOpenFaq] = useState(null);
    const [docLibTab, setDocLibTab] = useState('all');
    const [mediaTab, setMediaTab] = useState('video');
    const [activeVideoIdx, setActiveVideoIdx] = useState(0);

    useEffect(() => {
        document.title = 'Cổng Pháp luật tỉnh Tuyên Quang';
        window.scrollTo(0, 0);
    }, []);

    // Tự chuyển tin nổi bật sau HERO_INTERVAL; dừng khi rê chuột, bỏ qua nếu người dùng bật giảm chuyển động
    useEffect(() => {
        if (isHeroPaused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const timer = setTimeout(() => setActiveSlide((p) => (p + 1) % HERO_SLIDES.length), HERO_INTERVAL);
        return () => clearTimeout(timer);
    }, [activeSlide, isHeroPaused]);

    useEffect(() => {
        if (isBottomSlidePaused) return;
        const t = setInterval(() => setBottomSlideIndex((p) => (p + 1) % BOTTOM_SLIDES.length), BOTTOM_SLIDE_INTERVAL);
        return () => clearInterval(t);
    }, [isBottomSlidePaused]);

    const goToSlide = useCallback((idx) => setActiveSlide((idx + HERO_SLIDES.length) % HERO_SLIDES.length), []);
    const goToSearch = (keyword) => {
        const q = keyword.trim();
        if (q) navigate(`${TQ_HOME}/van-ban?q=${encodeURIComponent(q)}`);
    };

    const slide = HERO_SLIDES[activeSlide];
    const eventNews = tqArticlesOf('tin-tuc-su-kien');
    const docsInTab = useMemo(() => tuyenquangDocs.filter((d) => d.group === docTab).slice(0, 5), [docTab]);
    const faqsInTab = tuyenquangFAQs.filter((f) => f.group === faqTab);
    const libTabs = [{ id: 'all', label: 'Tất cả' }, ...TQ_CATEGORIES['tai-lieu-pbgdpl'].subs.map((s) => ({ id: s.slug, label: DOC_TAB_LABELS[s.slug] || s.label }))];
    const libItems = tqArticlesOf('tai-lieu-pbgdpl', docLibTab === 'all' ? null : docLibTab).slice(0, 6);
    const activeVideo = tuyenquangVideos[activeVideoIdx];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans flex flex-col selection:bg-blue-600 selection:text-white">
            <LaoCaiV3Styles />
            <ScrollProgressBar />
            <TuyenQuangHeader />
            <TuyenQuangTicker />

            {/* BANNER GIỚI THIỆU: GRADIENT INDIGO HOÀNG GIA (đồng bộ các Cổng địa phương) */}
            <div className="px-4 pt-4 sm:pt-5 lc3-fade-down">
                <div className="w-full max-w-[1472px] mx-auto rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white py-5 sm:py-6 border border-indigo-400/30 shadow-lg shadow-indigo-900/20">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent lc3-sweep pointer-events-none" />
                    <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
                    <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none lc3-rotate-cw" />
                    <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none lc3-rotate-ccw" />
                    <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b] lc3-float" />
                    <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b] lc3-float" style={{ animationDelay: '1.5s' }} />
                    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                        <img src="/logo.png" alt="Quốc huy" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-xl mb-1.5 sm:mb-2" />
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold tracking-tight uppercase leading-tight drop-shadow-md">Cổng Pháp luật tỉnh Tuyên Quang</h1>
                        <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5 sm:my-2 rounded-full" />
                    </div>
                </div>
            </div>

            <main className="flex-1 pb-16 space-y-5 sm:space-y-6 mt-1">
                {/* ============================================================== */}
                {/* 1. CHUYÊN MỤC TIN TỨC (30%) + TIN NỔI BẬT (SLIDE 70%) + 3 THẺ TIN */}
                {/* ============================================================== */}
                <section id="tin-noi-bat" className="w-full bg-white border-b border-gray-200 py-6 sm:py-8">
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
                            <Reveal variant="left" as="nav" aria-label="Chuyên mục tin tức" className="lg:col-span-1 order-2 lg:order-1 relative bg-white rounded-2xl border border-indigo-100 shadow-[0_10px_30px_-12px_rgba(44,27,146,0.25)] overflow-hidden flex flex-col lg:h-[520px]">
                                <div className="relative shrink-0 bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] px-4 py-3 flex items-center justify-between gap-2 overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                                    <div className="absolute -right-6 -top-8 w-24 h-24 rounded-full border border-amber-400/40 border-dashed lc3-rotate-cw pointer-events-none" />
                                    <div className="relative flex items-center gap-2 text-white min-w-0">
                                        <span className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                                            <Newspaper size={16} className="text-amber-300" />
                                        </span>
                                        <h2 className="font-bold text-[14px] uppercase whitespace-nowrap">Chuyên mục tin tức</h2>
                                    </div>
                                </div>
                                {/* Nền danh sách: gradient indigo - xanh nhạt + lưới chấm mờ */}
                                <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#eef0ff] via-white to-[#e8f4ff] pointer-events-none" />
                                <div className="absolute inset-0 bg-[radial-gradient(rgba(79,86,202,0.10)_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
                                <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-sky-200/40 blur-2xl pointer-events-none" />
                                <ul className="relative flex-1 min-h-0 overflow-y-auto lc3-thin-scroll px-2.5 py-2 space-y-1">
                                    {TQ_HOME_CATEGORY_SLUGS.map((slug, idx) => {
                                        const cat = TQ_CATEGORIES[slug];
                                        const Icon = TQ_ICONS[cat.icon] || Newspaper;
                                        return (
                                            <li key={slug} className="lc3-stagger" style={{ animationDelay: `${150 + idx * 40}ms` }}>
                                                <Link to={tqCategoryUrl(slug)} title={cat.title} className="group relative flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl hover:bg-white hover:shadow-[0_4px_14px_-6px_rgba(15,76,129,0.35)] hover:ring-1 hover:ring-indigo-100 transition-all duration-300">
                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-full bg-gradient-to-b from-amber-400 to-[#991b1b] group-hover:h-6 transition-all duration-300" />
                                                    <span className="w-8 h-8 shrink-0 rounded-lg bg-white text-[#2c1b92] ring-1 ring-indigo-100 shadow-sm flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#4f56ca] group-hover:to-[#2c1b92] group-hover:text-white group-hover:ring-0 transition-all duration-300">
                                                        <Icon size={16} />
                                                    </span>
                                                    <span className="flex-1 min-w-0 truncate pr-3 text-[16px] font-semibold text-[#1e2a4a] group-hover:text-[#2c1b92] group-hover:translate-x-0.5 transition-all">{cat.title}</span>
                                                    <ChevronRight size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#991b1b] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                </div>
                            </Reveal>

                            <Reveal
                                variant="right"
                                delay={120}
                                className="lg:col-span-3 order-1 lg:order-2 relative rounded-2xl overflow-hidden bg-slate-200 shadow-lg shadow-slate-900/15 h-[460px] sm:h-[500px] lg:h-[520px] group"
                                onMouseEnter={() => setIsHeroPaused(true)}
                                onMouseLeave={() => setIsHeroPaused(false)}
                            >
                                <img key={`hero-img-${slide.id}`} src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover brightness-[1.06] saturate-[1.08] lc3-kenburns" />
                                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#0b3d91]/85 via-[#1565c0]/40 to-transparent" />
                                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b3d91]/30 to-transparent" />

                                <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex items-start justify-between gap-3 z-10">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="bg-[#991b1b] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow">TIN NỔI BẬT</span>
                                        <span key={`hero-sub-${slide.id}`} className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md lc3-text-in">
                                            {TQ_CATEGORIES[slide.category].title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-white/85 text-xs font-semibold tabular-nums mr-1 hidden sm:inline">
                                            {String(activeSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                                        </span>
                                        {[{ d: -1, Icon: ChevronLeft, l: 'Tin trước' }, { d: 1, Icon: ChevronRight, l: 'Tin tiếp theo' }].map(({ d, Icon, l }) => (
                                            <button key={l} type="button" onClick={() => goToSlide(activeSlide + d)} aria-label={l}
                                                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-[#0f4c81] flex items-center justify-center transition-colors">
                                                <Icon size={17} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10">
                                    <div key={`hero-text-${slide.id}`} className="lc3-text-in max-w-3xl [text-shadow:0_1px_3px_rgba(11,61,145,0.55)]">
                                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-amber-200 font-semibold mb-2">
                                            <Clock size={14} className="shrink-0" />
                                            <span>{slide.date}</span>
                                        </div>
                                        <Link to={tqArticleUrl(slide.id)} className="block">
                                            <h3 className="text-lg sm:text-2xl lg:text-[26px] font-bold text-white hover:text-amber-200 transition-colors leading-[1.3] uppercase tracking-tight line-clamp-3 drop-shadow">{slide.title}</h3>
                                        </Link>
                                        <p className="hidden sm:block text-white/80 text-sm leading-relaxed line-clamp-2 mt-2.5">{slide.summary}</p>
                                    </div>
                                    {/* Chấm tròn đại diện cho từng tin */}
                                    <div className="flex items-center gap-2.5 mt-5" role="tablist" aria-label="Chọn tin nổi bật">
                                        {HERO_SLIDES.map((s, idx) => {
                                            const isActive = idx === activeSlide;
                                            return (
                                                <button
                                                    key={`hero-dot-${s.id}`}
                                                    type="button"
                                                    role="tab"
                                                    onClick={() => goToSlide(idx)}
                                                    aria-label={`Xem tin ${idx + 1}`}
                                                    aria-selected={isActive}
                                                    title={s.title}
                                                    className="p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-full"
                                                >
                                                    <span className={`block rounded-full transition-all duration-300 ${isActive ? 'w-3 h-3 bg-amber-400 ring-4 ring-white/25' : 'w-2.5 h-2.5 bg-white/55 hover:bg-white hover:scale-125'}`} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* 3 THẺ TIN NỔI BẬT DẠNG SLIDE */}
                        <Reveal delay={200} className="mt-6 relative select-none" onMouseEnter={() => setIsBottomSlidePaused(true)} onMouseLeave={() => setIsBottomSlidePaused(false)}>
                            <div className="overflow-hidden rounded-2xl p-1 -m-1">
                                <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateX(-${bottomSlideIndex * 100}%)` }}>
                                    {BOTTOM_SLIDES.map((group, sIdx) => (
                                        <div key={`bs-${sIdx}`} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 px-0.5" aria-hidden={bottomSlideIndex !== sIdx}>
                                            {group.map((card) => (
                                                <Link key={card.id} to={tqArticleUrl(card.id)} tabIndex={bottomSlideIndex !== sIdx ? -1 : undefined}
                                                    className="bg-white rounded-2xl p-3.5 border border-gray-200 hover:border-amber-400 shadow-sm flex items-start gap-3.5 group relative overflow-hidden lc3-card">
                                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 group-hover:h-1.5 transition-all" />
                                                    <div className="w-24 h-20 sm:w-28 sm:h-[5.5rem] flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative bg-gray-100">
                                                        <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        <span className="absolute bottom-1 left-1 bg-black/75 text-[9.5px] font-bold text-amber-300 px-1.5 py-0.5 rounded leading-none max-w-[90%] truncate uppercase">{TQ_CATEGORIES[card.category].title}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold mb-1">
                                                            <Clock size={12} className="text-[#a81c1c]" /><span>{card.date}</span>
                                                        </div>
                                                        <h4 className="font-bold text-[13.5px] sm:text-[14px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2 mb-1">{card.title}</h4>
                                                        <p className="text-[12px] text-gray-700 line-clamp-2 leading-relaxed">{card.summary}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                {BOTTOM_SLIDES.map((_, i) => (
                                    <button key={`bd-${i}`} type="button" onClick={() => setBottomSlideIndex(i)} className="group py-1.5 px-0.5 focus:outline-none" aria-label={`Xem trang ${i + 1}`}>
                                        <span className={`block rounded-full transition-all duration-300 ${bottomSlideIndex === i ? 'w-8 h-2.5 bg-red-600' : 'w-2.5 h-2.5 bg-gray-300 group-hover:bg-gray-400 group-hover:scale-125'}`} />
                                    </button>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 2. TRA CỨU NHANH - DẢI GRADIENT XANH TRÀN CHIỀU RỘNG */}
                {/* ============================================================== */}
                <section id="tra-cuu-nhanh" className="relative w-full overflow-hidden bg-gradient-to-br from-[#0b3d91] via-[#1565c0] to-[#1e88e5] text-white py-10 sm:py-14">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1.1px,transparent_1.1px)] [background-size:22px_22px] pointer-events-none" />
                    <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-sky-300/25 blur-3xl pointer-events-none lc3-drift" />
                    <div className="absolute -right-24 -bottom-32 w-[28rem] h-[28rem] rounded-full bg-cyan-300/20 blur-3xl pointer-events-none lc3-drift" style={{ animationDelay: '-6s' }} />
                    <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/15 border-dashed pointer-events-none lc3-rotate-cw hidden md:block" />
                    <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/15 border-dashed pointer-events-none lc3-rotate-ccw hidden md:block" />

                    <Reveal className="relative z-10 container mx-auto px-4 max-w-[860px] flex flex-col items-center text-center">
                        
                        <h2 className="text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-tight">Tra cứu nhanh văn bản pháp luật</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3 rounded-full" />
                        <p className="text-sm text-sky-100/90 mb-6 max-w-xl">Nhập số hiệu, trích yếu hoặc từ khóa để tìm văn bản quy phạm pháp luật</p>
                        <form onSubmit={(e) => { e.preventDefault(); goToSearch(searchQuery); }} className="w-full relative group/search" role="search">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-300/40 via-white/30 to-amber-300/40 blur-md opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="relative flex items-center bg-white rounded-full shadow-xl shadow-blue-950/25 p-1.5 pl-5">
                                <Search size={19} className="shrink-0 text-gray-400 group-focus-within/search:text-[#1565c0] transition-colors" />
                                <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Từ khóa tra cứu văn bản"
                                    placeholder="Ví dụ: Ngày Pháp luật, 18/HĐPB, chuẩn tiếp cận pháp luật..."
                                    className="flex-1 min-w-0 bg-transparent text-sm sm:text-[15px] text-gray-900 placeholder-gray-400 px-3 py-2.5 focus:outline-none" />
                                <button type="submit" className="relative shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0b3d91] to-[#1565c0] hover:from-[#991b1b] hover:to-[#b91c1c] text-white text-sm font-bold px-5 sm:px-7 py-2.5 rounded-full transition-colors lc3-shine">
                                    <Search size={15} className="sm:hidden" /><span className="hidden sm:inline">Tìm kiếm</span>
                                </button>
                            </div>
                        </form>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-7">
                            {QUICK_LINKS.map(({ label, desc, icon: Icon, to }) => (
                                <Link key={label} to={to} className="group flex items-center gap-3 text-left bg-white/10 hover:bg-white border border-white/20 hover:border-white rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20">
                                    <span className="w-10 h-10 shrink-0 rounded-xl bg-white/15 text-amber-300 group-hover:bg-[#1565c0] group-hover:text-white flex items-center justify-center transition-all duration-300"><Icon size={19} /></span>
                                    <span className="flex-1 min-w-0">
                                        <span className="block font-bold text-[13.5px] text-white group-hover:text-[#0b3d91] transition-colors">{label}</span>
                                        <span className="block text-[11.5px] text-sky-100/80 group-hover:text-gray-500 transition-colors">{desc}</span>
                                    </span>
                                    <ArrowRight size={15} className="shrink-0 text-white/60 group-hover:text-[#991b1b] group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 3. TIN TỨC SỰ KIỆN (70%) + CHUYÊN TRANG NỔI BẬT (30%) */}
                {/* ============================================================== */}
                <section id="tin-tuc-su-kien" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-7 items-stretch">
                        <Reveal variant="left" className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm flex flex-col">
                            <SectionHeading title="Tin tức sự kiện" to={tqCategoryUrl('tin-tuc-su-kien')} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Link to={tqArticleUrl(eventNews[0].id)} className="group flex flex-col">
                                    <div className="rounded-xl overflow-hidden relative">
                                        <Image16x9 src={eventNews[0].image} alt={eventNews[0].title} />
                                        <span className="absolute top-2 left-2 bg-[#991b1b] text-white text-[10.5px] font-bold px-2 py-0.5 rounded shadow">MỚI NHẤT</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-amber-950 font-semibold mt-3 mb-1"><Clock size={13} className="text-[#a81c1c]" /> {eventNews[0].date}</div>
                                    <h3 className="font-bold text-base sm:text-[17px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2">{eventNews[0].title}</h3>
                                    <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-3 mt-1.5">{eventNews[0].summary}</p>
                                </Link>
                                <div className="flex flex-col divide-y divide-gray-100">
                                    {eventNews.slice(1, 5).map((a) => <div key={a.id} className="py-2 first:pt-0"><ArticleRow article={a} /></div>)}
                                </div>
                            </div>
                        </Reveal>

                        <div className="lg:col-span-3 flex flex-col gap-4">
                            {PROMO_TILES.map((p, idx) => {
                                const Icon = TQ_ICONS[TQ_CATEGORIES[p.slug].icon];
                                return (
                                    <Reveal key={p.slug} variant="right" delay={idx * 100} className="flex-1 flex">
                                        <Link to={tqCategoryUrl(p.slug)} className={`w-full relative overflow-hidden rounded-2xl bg-gradient-to-r ${p.bg} text-white p-5 flex items-center gap-4 group lc3-card lc3-shine min-h-[110px]`}>
                                            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                                            <div className="absolute -right-8 -bottom-10 w-32 h-32 rounded-full border border-amber-300/40 border-dashed lc3-rotate-cw pointer-events-none" />
                                            <span className="relative w-12 h-12 shrink-0 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon size={22} className="text-amber-300" />
                                            </span>
                                            <span className="relative flex-1 min-w-0">
                                                <span className="block font-bold text-[15px] uppercase tracking-tight">{p.label}</span>
                                                <span className="block text-xs text-white/80 mt-0.5">{p.note}</span>
                                            </span>
                                            <ArrowRight size={18} className="relative shrink-0 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* BANNER CUỘC THI TRỰC TUYẾN "CÔNG DÂN SỐ HIỂU LUẬT" */}
                <section id="banner-cuoc-thi" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal variant="zoom">
                        <Link
                            to={CONTEST_BANNER_LINK}
                            className="group relative block rounded-2xl overflow-hidden shadow-lg shadow-blue-900/15 ring-1 ring-sky-200/60 lc3-shine"
                            title="Cuộc thi trực tuyến “Công dân số hiểu luật”"
                        >
                            <img
                                src="/bnct.jpg"
                                alt="Cuộc thi trực tuyến Công dân số hiểu luật - Sống an toàn, trách nhiệm trên không gian mạng"
                                loading="lazy"
                                className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                            />
                        </Link>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 4. THÔNG TIN VĂN BẢN CHỈ ĐẠO ĐIỀU HÀNH (4 NHÓM) + HĐPH PBGDPL TỈNH */}
                {/* ============================================================== */}
                <section id="van-ban-chi-dao" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm">
                        <SectionHeading title="Thông tin văn bản chỉ đạo điều hành" to={TQ_DIRECTIVE_DOCS_URL}>
                            <TabPills tabs={TQ_DOC_GROUPS} active={docTab} onChange={setDocTab} />
                        </SectionHeading>
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                            <div className="lg:col-span-7 rounded-xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                                <div className="relative overflow-hidden flex bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white text-[14px] font-bold py-3 px-5 border-b-2 border-amber-400">
                                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                    <div className="relative w-[120px] shrink-0">Ngày ban hành</div>
                                    <div className="relative flex-1">Nội dung văn bản</div>
                                </div>
                                <ul key={docTab} className="divide-y divide-gray-100 lc3-text-in">
                                    {docsInTab.map((d) => (
                                        <li key={d.id} className="flex items-center gap-4 lg:gap-0 px-5 py-3.5 hover:bg-blue-50/50 transition-colors group">
                                            <div className="w-[120px] shrink-0 font-semibold text-gray-800 text-[13.5px]">{d.ngay}</div>
                                            <Link to={tqDirectiveDocUrl(d.id)} className="flex-1 min-w-0 text-[13.5px] text-gray-600 group-hover:text-[#0f4c81] leading-relaxed font-medium line-clamp-2">
                                                <span className="font-bold text-[#0f4c81]">{d.soHieu}</span> ({d.coQuan}) - {d.trichYeu}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lg:col-span-3 rounded-xl border border-amber-200/90 bg-gradient-to-b from-amber-50/60 to-white p-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-100">
                                    <h3 className="font-bold text-[15px] text-[#0f4c81] flex items-center gap-2"><Users size={16} className="text-[#991b1b]" /> Hội đồng phối hợp PBGDPL tỉnh</h3>
                                </div>
                                <div className="flex flex-col divide-y divide-amber-100/70">
                                    {tqArticlesOf('hoi-dong-phoi-hop').slice(0, 3).map((a) => <div key={a.id} className="py-1.5"><ArticleRow article={a} showImage={false} /></div>)}
                                </div>
                                <Link to={tqCategoryUrl('hoi-dong-phoi-hop')} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#0f4c81] hover:text-[#991b1b]">
                                    Xem chuyên mục <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 5. SỐ LIỆU PBGDPL */}
                {/* ============================================================== */}
                <section id="so-lieu" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal variant="zoom" className="rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white px-5 sm:px-8 py-7 border border-indigo-400/30 shadow-lg shadow-indigo-900/20">
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                        <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none lc3-rotate-cw" />
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                                {/* Bấm tiêu đề để sang chuyên mục Thống kê, báo cáo về PBGDPL */}
                                <Link to={tqCategoryUrl('thong-ke-bao-cao')} className="group/heading inline-block" title="Xem Thống kê, báo cáo về PBGDPL">
                                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight inline-flex items-center gap-2 group-hover/heading:text-amber-200 transition-colors">
                                        Số liệu phổ biến, giáo dục pháp luật địa phương
                                        <ChevronRight size={20} className="group-hover/heading:translate-x-1 transition-transform" />
                                    </h2>
                                    <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-transparent mt-2 rounded-full" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                {tuyenquangSiteConfig.stats.filter((s) => s.key !== 'hoinghi').map((s) => (
                                    <div key={s.key} className="rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 hover:border-amber-300/50 p-4 transition-colors">
                                        <div className="text-2xl sm:text-[28px] font-bold leading-none"><CountUp end={s.value} /></div>
                                        <div className="text-[12px] text-blue-100/90 mt-1.5 leading-snug">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 6. HỎI ĐÁP, TƯ VẤN PHÁP LUẬT + ĐỘI NGŨ BÁO CÁO VIÊN */}
                {/* ============================================================== */}
                <section id="hoi-dap" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-7 items-start">
                        <Reveal variant="left" className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm">
                            <SectionHeading title="Hỏi đáp, tư vấn pháp luật" to={`${TQ_HOME}/hoi-dap`}>
                                <TabPills tabs={TQ_FAQ_GROUPS} active={faqTab} onChange={(t) => { setFaqTab(t); setOpenFaq(null); }} />
                            </SectionHeading>
                            <div key={faqTab} className="space-y-2.5 lc3-text-in">
                                {faqsInTab.map((f) => {
                                    const isOpen = openFaq === f.id;
                                    return (
                                        <div key={f.id} className={`rounded-xl border transition-colors ${isOpen ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 hover:border-blue-200'}`}>
                                            <button type="button" onClick={() => setOpenFaq(isOpen ? null : f.id)} aria-expanded={isOpen} className="w-full flex items-start gap-3 text-left p-4">
                                                <span className="w-7 h-7 shrink-0 rounded-lg bg-[#0f4c81] text-white text-xs font-bold flex items-center justify-center">H</span>
                                                <span className="flex-1 min-w-0">
                                                    <span className="block font-semibold text-[14px] text-gray-900 leading-snug">{f.q}</span>
                                                    <span className="block text-[11.5px] text-gray-500 mt-1">{f.asker} • {f.date}</span>
                                                </span>
                                                <ChevronDown size={18} className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0f4c81]' : ''}`} />
                                            </button>
                                            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                <div className="overflow-hidden">
                                                    <div className="flex items-start gap-3 px-4 pb-4">
                                                        <span className="w-7 h-7 shrink-0 rounded-lg bg-[#991b1b] text-white text-xs font-bold flex items-center justify-center">Đ</span>
                                                        <p className="text-[13.5px] text-gray-700 leading-relaxed">{f.a}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>

                        <Reveal variant="right" delay={120} className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                            <div className="relative bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] px-4 py-3 text-white overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                                <h3 className="relative font-bold text-[15px] uppercase tracking-wide flex items-center gap-2"><Mic size={16} className="text-amber-300" /> Báo cáo viên, tuyên truyền viên</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {TQ_CATEGORIES['bao-cao-vien'].subs.map((s) => (
                                    <Link key={s.slug} to={tqCategoryUrl('bao-cao-vien', s.slug)} className="group flex items-center gap-3.5 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm transition-all">
                                        <span className="w-11 h-11 shrink-0 rounded-xl bg-[#f0f5f9] text-[#0f4c81] group-hover:bg-[#0f4c81] group-hover:text-white flex items-center justify-center transition-colors"><Users size={19} /></span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block font-bold text-[14.5px] text-gray-800 group-hover:text-[#0f4c81] leading-snug">{s.label}</span>
                                            <span className="block text-[12px] text-gray-500 mt-0.5 leading-snug">{BCV_NOTES[s.slug]}</span>
                                        </span>
                                        <ChevronRight size={15} className="text-gray-300 group-hover:text-[#991b1b] group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 7. TÀI LIỆU PBGDPL (THƯ VIỆN THEO LOẠI TÀI LIỆU) */}
                {/* ============================================================== */}
                <section id="tai-lieu" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm">
                        <SectionHeading title="Tài liệu phổ biến, giáo dục pháp luật" to={tqCategoryUrl('tai-lieu-pbgdpl')}>
                            <TabPills tabs={libTabs} active={docLibTab} onChange={setDocLibTab} />
                        </SectionHeading>
                        <div key={docLibTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lc3-text-in">
                            {libItems.length ? libItems.map((a) => (
                                <Link key={a.id} to={tqArticleUrl(a.id)} className="group flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 bg-gradient-to-br from-white to-slate-50 lc3-card">
                                    <span className="w-12 h-14 shrink-0 rounded-lg bg-gradient-to-b from-[#0f4c81] to-[#1c2c5b] text-white flex flex-col items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                        <FileText size={18} />
                                        <span className="text-[8.5px] font-bold mt-1">PDF</span>
                                    </span>
                                    <span className="flex-1 min-w-0">
                                        <span className="block font-bold text-[13.5px] text-gray-900 group-hover:text-[#0f4c81] leading-snug line-clamp-2">{a.title}</span>
                                        <span className="flex items-center gap-3 text-[11.5px] text-gray-500 mt-2">
                                            <span className="flex items-center gap-1"><Clock size={11} /> {a.date}</span>
                                            <span className="flex items-center gap-1"><Download size={11} /> {a.views.toLocaleString('vi-VN')}</span>
                                        </span>
                                    </span>
                                </Link>
                            )) : (
                                <p className="text-sm text-gray-500 col-span-full py-6 text-center">Chưa có tài liệu trong mục này.</p>
                            )}
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 8. TRUYỀN THÔNG CHÍNH SÁCH: 3 CỘT */}
                {/* ============================================================== */}
                <section id="truyen-thong-chinh-sach" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {['chinh-sach-phap-luat-moi', 'truyen-thong-du-thao', 'thong-cao-bao-chi'].map((slug, idx) => {
                            const items = tqArticlesOf(slug);
                            const Icon = TQ_ICONS[TQ_CATEGORIES[slug].icon];
                            return (
                                <Reveal key={slug} delay={idx * 110} className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex flex-col">
                                    <SectionHeading title={TQ_CATEGORIES[slug].title} to={tqCategoryUrl(slug)} />
                                    <Link to={tqArticleUrl(items[0].id)} className="group block mb-3">
                                        <div className="rounded-xl overflow-hidden relative">
                                            <Image16x9 src={items[0].image} alt={items[0].title} />
                                            <span className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-white/90 text-[#0f4c81] flex items-center justify-center shadow"><Icon size={15} /></span>
                                        </div>
                                        <h3 className="font-bold text-[14.5px] text-gray-900 group-hover:text-[#991b1b] leading-snug line-clamp-2 mt-2.5 transition-colors">{items[0].title}</h3>
                                    </Link>
                                    <div className="divide-y divide-gray-100">
                                        {items.slice(1, 3).map((a) => <div key={a.id} className="py-1.5"><ArticleRow article={a} showImage={false} /></div>)}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 9. THƯ VIỆN VIDEO - CLIP & INFOGRAPHIC */}
                {/* ============================================================== */}
                <section id="da-phuong-tien" className="w-full bg-white border-y border-gray-200 py-8 sm:py-10">
                    <Reveal className="container mx-auto px-4 max-w-[1504px]">
                        <SectionHeading title="Multimedia" to={mediaTab === 'video' ? `${TQ_HOME}/video` : `${TQ_HOME}/infographic`}>
                            <TabPills tabs={[{ id: 'video', label: 'Video - clip' }, { id: 'infographic', label: 'Pano, áp phích, infographic' }]} active={mediaTab} onChange={setMediaTab} />
                        </SectionHeading>
                        {mediaTab === 'video' ? (
                            <div key="v" className="bg-white rounded-2xl overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-3 shadow-sm lc3-text-in">
                                <Link to={tqVideoUrl(activeVideo.id)} className="lg:col-span-2 relative group aspect-video bg-black overflow-hidden block" title={`Xem video: ${activeVideo.title}`}>
                                    <img key={activeVideo.id} src={activeVideo.thumb} alt={activeVideo.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity lc3-kenburns" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="relative flex items-center justify-center">
                                            <span className="absolute w-16 h-16 rounded-full bg-red-600/60 lc3-ping" />
                                            <span className="relative w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"><PlayCircle size={36} /></span>
                                        </span>
                                    </div>
                                    <div key={`vt-${activeVideo.id}`} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 sm:p-6 lc3-text-in">
                                        <span className="text-xs font-bold bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded uppercase mb-2 inline-block">Thời lượng: {activeVideo.duration}</span>
                                        <h3 className="text-white font-bold text-base sm:text-lg md:text-xl drop-shadow mb-1 line-clamp-2">{activeVideo.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">{activeVideo.desc}</p>
                                    </div>
                                </Link>
                                <div className="p-4 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-100">Video - clip mới nhất</div>
                                    <div className="space-y-1.5 pt-2">
                                        {tuyenquangVideos.map((v, idx) => {
                                            const isActive = idx === activeVideoIdx;
                                            return (
                                                <Link key={v.id} to={tqVideoUrl(v.id)} onMouseEnter={() => setActiveVideoIdx(idx)} onFocus={() => setActiveVideoIdx(idx)}
                                                    className={`w-full text-left flex items-start gap-3 p-2 rounded-xl transition-colors group border ${isActive ? 'bg-blue-50/70 border-blue-200' : 'border-transparent hover:bg-gray-50'}`}>
                                                    <div className="w-[110px] shrink-0 relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                                                        <img src={v.thumb} alt={v.title} loading="lazy" className="w-full h-full object-cover" />
                                                        <div className={`absolute inset-0 flex items-center justify-center ${isActive ? 'bg-[#0f4c81]/45' : 'bg-black/30'}`}><PlayCircle size={20} className="text-white" /></div>
                                                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{v.duration}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className={`font-semibold text-[13px] line-clamp-2 leading-snug ${isActive ? 'text-[#0f4c81]' : 'text-gray-800 group-hover:text-[#0f4c81]'}`}>{v.title}</h5>
                                                        <div className="text-[11px] text-gray-500 mt-1">
                                                            {isActive ? <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]"><span className="w-1.5 h-1.5 rounded-full bg-[#991b1b] animate-pulse" /> Đang hiển thị</span> : v.date}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key="i" className="grid grid-cols-1 md:grid-cols-3 gap-6 lc3-text-in">
                                {tuyenquangInfographics.map((info) => (
                                    <Link key={info.id} to={`${TQ_HOME}/infographic`} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col group lc3-card">
                                        <div className="relative overflow-hidden">
                                            <Image16x9 src={info.thumb} alt={info.title} />
                                            <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">Infographic</span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-3">{info.title}</h3>
                                            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                                                <span className="flex items-center gap-1"><Eye size={12} /> {info.views.toLocaleString('vi-VN')} lượt xem</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {info.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 10. THÔNG TIN LIÊN KẾT */}
                {/* ============================================================== */}
                <section id="thong-tin-lien-ket" className="bg-white pb-10 pt-4">
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <Reveal>
                            <h2 className="text-2xl font-bold text-[#0f4c81] mb-2">Thông tin liên kết</h2>
                            <div className="lc3-heading-bar h-[3px] rounded-full bg-gradient-to-r from-amber-400 to-[#991b1b] mb-8" />
                        </Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {tuyenquangLinks.map((l, idx) => {
                                const Icon = TQ_ICONS[l.icon] || Landmark;
                                return (
                                    <Reveal key={l.id} delay={(idx % 3) * 80}>
                                        <a href={`https://${l.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-2 -m-2 rounded-xl hover:bg-[#f0f5f9]/70 transition-colors">
                                            <span className="bg-[#f0f5f9] text-[#0f4c81] p-3.5 rounded-xl group-hover:bg-[#0f4c81] group-hover:text-white transition-all duration-300"><Icon size={20} /></span>
                                            <span>
                                                <span className="block font-bold text-[#0f4c81] text-[13.5px] leading-tight group-hover:text-blue-700">{l.name}</span>
                                                <span className="block text-[11.5px] text-gray-400 mt-0.5">{l.domain}</span>
                                            </span>
                                        </a>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <TuyenQuangFooter />
        </div>
    );
};

export default TuyenQuangHomePage;

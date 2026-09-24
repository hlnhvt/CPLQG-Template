import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ChevronRight, ChevronLeft, ChevronDown, Search, X, LayoutGrid, List, SlidersHorizontal, Inbox, CheckCircle2
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Tìm kiếm không dấu (giữ nguyên độ dài chuỗi để tô sáng đúng vị trí)  */
/* ------------------------------------------------------------------ */
const foldChar = (c) => {
    if (c === 'đ') return 'd';
    if (c === 'Đ') return 'd';
    const base = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return (base.length === 1 ? base : c).toLowerCase();
};
export const fold = (text) => Array.from(String(text ?? '')).map(foldChar).join('');
const tokensOf = (q) => fold(q).trim().split(/\s+/).filter(Boolean);

// Tô sáng các từ khóa trong văn bản (không phân biệt dấu, hoa thường)
export const Highlight = ({ text, query }) => {
    const str = String(text ?? '');
    const tokens = tokensOf(query || '');
    if (!tokens.length || !str) return <>{str}</>;
    const chars = Array.from(str);
    const folded = chars.map(foldChar).join('');
    const marks = new Array(chars.length).fill(false);
    tokens.forEach((t) => {
        let from = 0;
        let idx;
        while ((idx = folded.indexOf(t, from)) !== -1) {
            for (let k = idx; k < idx + t.length; k++) marks[k] = true;
            from = idx + t.length;
        }
    });
    const parts = [];
    let buf = '';
    let cur = marks[0];
    chars.forEach((ch, i) => {
        if (marks[i] !== cur) { parts.push([cur, buf]); buf = ''; cur = marks[i]; }
        buf += ch;
    });
    parts.push([cur, buf]);
    return <>{parts.map(([m, s], i) => (m ? <mark key={i} className="bg-amber-200/80 text-inherit rounded px-0.5">{s}</mark> : <React.Fragment key={i}>{s}</React.Fragment>))}</>;
};

const parseVNDate = (d) => {
    const [dd, mm, yyyy] = String(d || '').split('/').map(Number);
    return yyyy ? new Date(yyyy, mm - 1, dd).getTime() : 0;
};
export const sortNewest = { key: 'newest', label: 'Mới nhất', compare: (a, b) => parseVNDate(b.date) - parseVNDate(a.date) };
export const sortOldest = { key: 'oldest', label: 'Cũ nhất', compare: (a, b) => parseVNDate(a.date) - parseVNDate(b.date) };
export const sortBy = (key, label, field, desc = true) => ({ key, label, compare: (a, b) => (desc ? (b[field] || 0) - (a[field] || 0) : String(a[field]).localeCompare(String(b[field]), 'vi')) });

/* ------------------------------------------------------------------ */
/*  Tab đồng bộ với URL (?tab=...)                                      */
/* ------------------------------------------------------------------ */
export const useTabParam = (tabs) => {
    const [params, setParams] = useSearchParams();
    const raw = params.get('tab');
    const active = tabs.some((t) => t.key === raw) ? raw : tabs[0].key;
    const setActive = (key) => {
        const next = new URLSearchParams(params);
        if (key === tabs[0].key) next.delete('tab'); else next.set('tab', key);
        setParams(next, { replace: false });
    };
    return [active, setActive];
};

/* ------------------------------------------------------------------ */
/*  Khung trang chuyên trang                                            */
/* ------------------------------------------------------------------ */
export const SpecializedShell = ({ profile, Header, Footer, title, subtitle, tabs, activeTab, onTabChange, children }) => {
    const tabsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.title = `${title} - ${profile.siteName}`;
    }, [title, profile.siteName]);

    const changeTab = (key) => {
        onTabChange(key);
        const top = tabsRef.current ? tabsRef.current.getBoundingClientRect().top + window.scrollY - 8 : 0;
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#f5f6fb]">
            <Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                    <Link to={profile.homeUrl} className="hover:text-[#2c1b92] transition-colors">{profile.homeLabel}</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">{title}</span>
                    {activeTab !== tabs[0].key && (
                        <>
                            <ChevronRight size={14} />
                            <span className="text-[#2c1b92] font-medium">{tabs.find((t) => t.key === activeTab)?.label}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                <style>{`
                    @keyframes spxSweep{0%{transform:translateX(-160%) skewX(-25deg);opacity:0}25%{opacity:.32}70%{opacity:.32}100%{transform:translateX(260%) skewX(-25deg);opacity:0}}
                    @keyframes spxPulse{0%,100%{opacity:.15;transform:scale(.95)}50%{opacity:.38;transform:scale(1.12)}}
                    @keyframes spxRotCW{from{transform:rotate(0)}to{transform:rotate(360deg)}}
                    @keyframes spxRotCCW{from{transform:rotate(360deg)}to{transform:rotate(0)}}
                    @keyframes spxFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
                    .spx-fade-up{animation:spxFadeUp .35s ease-out both}
                `}</style>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" style={{ animation: 'spxSweep 5s cubic-bezier(0.4,0,0.2,1) infinite' }} />
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'spxPulse 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'spxPulse 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'spxRotCW 16s linear infinite' }} />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'spxRotCCW 18s linear infinite' }} />
                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">{title}</h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm">{subtitle}</p>
                </div>
            </div>

            {/* Tabs */}
            <div ref={tabsRef} className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div role="tablist" className="container mx-auto px-4 max-w-[1286px] flex items-center gap-1.5 overflow-x-auto py-2" style={{ scrollbarWidth: 'none' }}>
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        const isActive = t.key === activeTab;
                        return (
                            <button
                                key={t.key}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => changeTab(t.key)}
                                className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${isActive
                                    ? 'bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] text-white shadow-md shadow-indigo-500/25'
                                    : 'text-gray-600 hover:text-[#2c1b92] hover:bg-indigo-50'}`}
                            >
                                {Icon && <Icon size={16} className={isActive ? 'text-amber-300' : ''} />}
                                <span>{t.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <main key={activeTab} className="flex-grow container mx-auto px-4 py-8 max-w-[1286px] spx-fade-up">
                {children}
            </main>

            <Footer />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Thành phần trình bày dùng chung                                      */
/* ------------------------------------------------------------------ */
// Tiêu đề mục (không dùng icon; prop icon được bỏ qua)
export const SectionTitle = ({ title, desc, action }) => (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div className="border-l-4 border-[#2c1b92] pl-3">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
                {desc && <p className="text-xs sm:text-sm text-gray-500 mt-0.5 max-w-3xl">{desc}</p>}
            </div>
        </div>
        {action}
    </div>
);

export const Card = ({ className = '', children, ...rest }) => (
    <div className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm ${className}`} {...rest}>{children}</div>
);

// Badge dùng một kiểu màu thống nhất cho mọi bản ghi (prop tone được giữ để tương thích, không đổi màu)
export const Badge = ({ children, className = '' }) => (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border bg-indigo-50 text-[#2c1b92] border-indigo-100 ${className}`}>{children}</span>
);
// Gán màu ổn định cho một giá trị danh mục
const TONE_CYCLE = ['indigo', 'amber', 'emerald', 'sky', 'violet', 'rose'];
export const toneFor = (value, list) => TONE_CYCLE[Math.max(0, list.indexOf(value)) % TONE_CYCLE.length];

export const StatGrid = ({ items }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((s) => {
            const Icon = s.icon;
            return (
                <div key={s.label} className="relative overflow-hidden bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm group hover:shadow-md transition">
                    <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-indigo-50 group-hover:bg-amber-50 transition-colors" />
                    <div className="relative flex items-center gap-3">
                        {Icon && <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#2c1b92] flex items-center justify-center shrink-0"><Icon size={19} /></div>}
                        <div className="min-w-0">
                            <div className="text-xl sm:text-2xl font-bold text-[#2c1b92] leading-tight">{s.value}</div>
                            <div className="text-[11px] sm:text-xs text-gray-500 font-medium leading-snug">{s.label}</div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);

// Thẻ điều hướng nhanh sang các tab khác
export const QuickNav = ({ items, onGo }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((it) => {
            const Icon = it.icon;
            return (
                <button
                    key={it.key}
                    onClick={() => onGo(it.key)}
                    className="text-left bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-[#4f56ca]/50 hover:-translate-y-0.5 transition-all group flex items-start gap-3.5"
                >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-200 text-gray-900 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        {Icon && <Icon size={21} />}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-sm sm:text-[15px] text-gray-900 group-hover:text-[#2c1b92] transition-colors">{it.label}</h3>
                            {typeof it.count === 'number' && <span className="text-xs font-bold text-[#2c1b92] bg-indigo-50 px-2 py-0.5 rounded-full">{it.count}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{it.desc}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4f56ca] mt-2">Xem chi tiết <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" /></span>
                    </div>
                </button>
            );
        })}
    </div>
);

// Quy trình dạng bước, bấm từng bước để xem chi tiết
export const ProcessStepper = ({ steps }) => {
    const [active, setActive] = useState(0);
    const step = steps[active];
    return (
        <div>
            <div className="relative grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
                <div className="absolute top-5 left-[8%] right-[8%] h-0.5 bg-gray-200" />
                <div className="absolute top-5 left-[8%] h-0.5 bg-gradient-to-r from-[#4f56ca] to-amber-400 transition-all duration-500" style={{ width: `${(active / Math.max(1, steps.length - 1)) * 84}%` }} />
                {steps.map((s, i) => (
                    <button key={s.title} onClick={() => setActive(i)} className="relative flex flex-col items-center text-center group">
                        <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${i <= active ? 'bg-[#2c1b92] border-[#2c1b92] text-white shadow-md shadow-indigo-500/30' : 'bg-white border-gray-300 text-gray-500 group-hover:border-[#4f56ca]'} ${i === active ? 'ring-4 ring-amber-200 scale-110' : ''}`}>
                            {i + 1}
                        </span>
                        <span className={`mt-2 text-[11px] sm:text-xs font-semibold leading-tight ${i === active ? 'text-[#2c1b92]' : 'text-gray-600'}`}>{s.title}</span>
                    </button>
                ))}
            </div>
            <div key={active} className="mt-5 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-white p-4 sm:p-5 spx-fade-up">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Badge tone="indigo">Bước {active + 1}/{steps.length}</Badge>
                    {step.time && <Badge tone="amber">{step.time}</Badge>}
                </div>
                <h4 className="font-bold text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.desc}</p>
            </div>
        </div>
    );
};

// Mục hỏi - đáp dạng mở/đóng
// Mục hỏi - đáp dạng mở/đóng; detailTo: đường dẫn trang chi tiết (nếu có)
export const QAItem = ({ item, query, extra, detailTo }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`bg-white rounded-xl border transition-all ${open ? 'border-[#4f56ca]/50 shadow-md' : 'border-gray-200 hover:border-[#4f56ca]/40'}`}>
            <div className="flex items-start">
                <button onClick={() => setOpen((v) => !v)} className="flex-1 min-w-0 text-left p-4 flex items-start gap-3">
                    <span className="w-7 h-7 shrink-0 rounded-lg bg-indigo-50 text-[#2c1b92] font-bold text-sm flex items-center justify-center">H</span>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-[15px] text-gray-900 leading-snug"><Highlight text={item.title} query={query} /></h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-gray-500">{extra}</div>
                    </div>
                    <ChevronDown size={18} className={`shrink-0 text-gray-400 mt-1 transition-transform ${open ? 'rotate-180 text-[#2c1b92]' : ''}`} />
                </button>
                {detailTo && (
                    <Link
                        to={detailTo}
                        title="Xem toàn văn câu hỏi và trả lời"
                        className="shrink-0 m-4 ml-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-indigo-100 bg-indigo-50 hover:bg-[#2c1b92] hover:border-[#2c1b92] text-[#2c1b92] hover:text-white text-xs font-bold transition-colors"
                    >
                        Chi tiết <ChevronRight size={13} />
                    </Link>
                )}
            </div>
            {open && (
                <div className="px-4 pb-4 pl-14 spx-fade-up">
                    <div className="rounded-lg bg-emerald-50/60 border border-emerald-100 p-3.5">
                        <p className="text-sm text-gray-700 leading-relaxed"><Highlight text={item.a} query={query} /></p>
                        {item.basis && <p className="text-xs text-emerald-800 mt-2 font-medium">Căn cứ: {item.basis}</p>}
                    </div>
                    {detailTo && (
                        <Link to={detailTo} className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#2c1b92] hover:underline">Xem trang chi tiết <ChevronRight size={12} /></Link>
                    )}
                </div>
            )}
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Tra cứu bản ghi: tìm kiếm + lọc + sắp xếp + đổi dạng xem + phân trang */
/* ------------------------------------------------------------------ */
const Pagination = ({ page, totalPages, onChange }) => {
    if (totalPages <= 1) return null;
    const pages = totalPages <= 7
        ? Array.from({ length: totalPages }, (_, i) => i + 1)
        : page <= 4 ? [1, 2, 3, 4, 5, '…', totalPages]
            : page >= totalPages - 3 ? [1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
                : [1, '…', page - 1, page, page + 1, '…', totalPages];
    const btn = 'h-9 min-w-9 px-2.5 rounded-lg border text-sm font-semibold transition-colors';
    return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6">
            <button onClick={() => onChange(page - 1)} disabled={page === 1} className={`${btn} bg-white border-gray-200 text-gray-600 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40`} aria-label="Trang trước"><ChevronLeft size={16} /></button>
            {pages.map((p, i) => p === '…'
                ? <span key={`e${i}`} className="px-1 text-gray-400">…</span>
                : <button key={p} onClick={() => onChange(p)} className={`${btn} ${p === page ? 'bg-[#2c1b92] border-[#2c1b92] text-white shadow' : 'bg-white border-gray-200 text-gray-700 hover:border-[#2c1b92] hover:text-[#2c1b92]'}`}>{p}</button>)}
            <button onClick={() => onChange(page + 1)} disabled={page === totalPages} className={`${btn} bg-white border-gray-200 text-gray-600 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40`} aria-label="Trang sau"><ChevronRight size={16} /></button>
        </div>
    );
};

export const RecordExplorer = ({
    records,
    searchKeys = ['title'],
    chipFilter,
    selectFilters = [],
    sortOptions = [sortNewest, sortOldest],
    pageSize = 9,
    renderItem,
    layout: initialLayout = 'grid',
    allowLayoutToggle = true,
    gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    placeholder = 'Nhập từ khóa tìm kiếm...',
    unit = 'bản ghi'
}) => {
    const [query, setQuery] = useState('');
    const [chip, setChip] = useState('');
    const [selects, setSelects] = useState({});
    const [sortKey, setSortKey] = useState(sortOptions[0]?.key);
    const [layout, setLayout] = useState(initialLayout);
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const topRef = useRef(null);

    const valueOf = (r, f) => (f.getValue ? f.getValue(r) : r[f.key]);
    const optionsOf = (f) => {
        const vals = new Set();
        records.forEach((r) => { const v = valueOf(r, f); (Array.isArray(v) ? v : [v]).forEach((x) => x && vals.add(x)); });
        const arr = [...vals];
        return f.order ? arr.sort(f.order) : arr.sort((a, b) => String(a).localeCompare(String(b), 'vi'));
    };
    const matchValue = (r, f, want) => { const v = valueOf(r, f); return Array.isArray(v) ? v.includes(want) : v === want; };

    const chipOptions = useMemo(() => (chipFilter ? optionsOf(chipFilter) : []), [records, chipFilter]); // eslint-disable-line react-hooks/exhaustive-deps
    const selectOptions = useMemo(() => selectFilters.map(optionsOf), [records, selectFilters]); // eslint-disable-line react-hooks/exhaustive-deps
    const index = useMemo(() => records.map((r) => fold(searchKeys.map((k) => (typeof k === 'function' ? k(r) : [].concat(r[k] ?? []).join(' '))).join(' | '))), [records, searchKeys]);

    const filtered = useMemo(() => {
        const tokens = tokensOf(query);
        const out = records.filter((r, i) => {
            if (tokens.length && !tokens.every((t) => index[i].includes(t))) return false;
            if (chipFilter && chip && !matchValue(r, chipFilter, chip)) return false;
            return selectFilters.every((f) => !selects[f.key] || matchValue(r, f, selects[f.key]));
        });
        const sorter = sortOptions.find((s) => s.key === sortKey);
        return sorter ? [...out].sort(sorter.compare) : out;
    }, [records, index, query, chip, selects, sortKey]); // eslint-disable-line react-hooks/exhaustive-deps

    // Đếm số bản ghi theo từng chip (sau khi áp dụng từ khóa và bộ lọc khác)
    const chipCounts = useMemo(() => {
        if (!chipFilter) return {};
        const tokens = tokensOf(query);
        const base = records.filter((r, i) => (!tokens.length || tokens.every((t) => index[i].includes(t)))
            && selectFilters.every((f) => !selects[f.key] || matchValue(r, f, selects[f.key])));
        const counts = { __all: base.length };
        chipOptions.forEach((o) => { counts[o] = base.filter((r) => matchValue(r, chipFilter, o)).length; });
        return counts;
    }, [records, index, query, selects, chipOptions]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => { setPage(1); }, [query, chip, selects, sortKey]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
    const activeCount = (chip ? 1 : 0) + Object.values(selects).filter(Boolean).length + (query.trim() ? 1 : 0);
    const reset = () => { setQuery(''); setChip(''); setSelects({}); };
    const goPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        const top = topRef.current ? topRef.current.getBoundingClientRect().top + window.scrollY - 80 : 0;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <div ref={topRef}>
            {/* Thanh tìm kiếm */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-3 sm:p-4">
                <div className="flex flex-col md:flex-row gap-2.5">
                    <div className="relative flex-1">
                        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            className="w-full h-11 pl-10 pr-10 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#4f56ca] focus:ring-2 focus:ring-indigo-100"
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700" aria-label="Xóa từ khóa"><X size={16} /></button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {selectFilters.length > 0 && (
                            <button
                                onClick={() => setShowFilters((v) => !v)}
                                className={`h-11 px-3.5 inline-flex items-center gap-2 rounded-xl border text-sm font-semibold transition-colors ${showFilters ? 'bg-indigo-50 border-[#4f56ca] text-[#2c1b92]' : 'bg-white border-gray-300 text-gray-700 hover:border-[#4f56ca]'}`}
                            >
                                <SlidersHorizontal size={16} /> Bộ lọc
                                {Object.values(selects).filter(Boolean).length > 0 && <span className="w-5 h-5 rounded-full bg-[#2c1b92] text-white text-[11px] flex items-center justify-center">{Object.values(selects).filter(Boolean).length}</span>}
                            </button>
                        )}
                        {sortOptions.length > 1 && (
                            <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="h-11 px-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-[#4f56ca]" aria-label="Sắp xếp">
                                {sortOptions.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                        )}
                        {allowLayoutToggle && (
                            <div className="hidden sm:flex h-11 items-center rounded-xl border border-gray-300 p-1 bg-white">
                                {[['grid', LayoutGrid, 'Dạng lưới'], ['list', List, 'Dạng danh sách']].map(([k, Icon, label]) => (
                                    <button key={k} onClick={() => setLayout(k)} title={label} aria-label={label} className={`w-9 h-full rounded-lg flex items-center justify-center transition-colors ${layout === k ? 'bg-[#2c1b92] text-white' : 'text-gray-500 hover:text-[#2c1b92]'}`}><Icon size={16} /></button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {showFilters && selectFilters.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100 spx-fade-up">
                        {selectFilters.map((f, i) => (
                            <label key={f.key} className="block">
                                <span className="block text-[11px] font-semibold uppercase text-gray-500 mb-1">{f.label}</span>
                                <select
                                    value={selects[f.key] || ''}
                                    onChange={(e) => setSelects((s) => ({ ...s, [f.key]: e.target.value }))}
                                    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#4f56ca]"
                                >
                                    <option value="">Tất cả</option>
                                    {selectOptions[i].map((o) => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </label>
                        ))}
                    </div>
                )}

                {chipFilter && (
                    <div className="flex gap-2 overflow-x-auto mt-3 pb-0.5" style={{ scrollbarWidth: 'none' }}>
                        {[['', 'Tất cả', chipCounts.__all], ...chipOptions.map((o) => [o, o, chipCounts[o]])].map(([val, label, count]) => (
                            <button
                                key={label}
                                onClick={() => setChip(val)}
                                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${chip === val ? 'bg-[#2c1b92] border-[#2c1b92] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-[#4f56ca] hover:text-[#2c1b92]'}`}
                            >
                                {label}
                                <span className={`text-[10px] px-1.5 rounded-full ${chip === val ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>{count ?? 0}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Kết quả */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-4 mb-3 text-sm">
                <p className="text-gray-600">
                    Tìm thấy <strong className="text-[#2c1b92]">{filtered.length}</strong> / {records.length} {unit}
                    {query.trim() && <> cho “<span className="font-semibold text-gray-900">{query.trim()}</span>”</>}
                </p>
                {activeCount > 0 && (
                    <button onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"><X size={14} /> Xóa điều kiện tìm kiếm</button>
                )}
            </div>

            {pageItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 py-14 text-center">
                    <Inbox size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="font-semibold text-gray-700">Không tìm thấy {unit} phù hợp</p>
                    <p className="text-sm text-gray-500 mt-1">Thử từ khóa khác (có thể gõ không dấu) hoặc <button onClick={reset} className="text-[#2c1b92] font-semibold hover:underline">xóa điều kiện tìm kiếm</button>.</p>
                </div>
            ) : (
                <div className={layout === 'grid' ? `grid ${gridClass} gap-4` : 'flex flex-col gap-3'}>
                    {pageItems.map((r) => <React.Fragment key={r.id}>{renderItem(r, { query, layout })}</React.Fragment>)}
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} onChange={goPage} />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Biểu mẫu                                                            */
/* ------------------------------------------------------------------ */
export const Field = ({ label, required, children, hint }) => (
    <label className="block text-sm">
        <span className="block font-semibold text-gray-700 mb-1">{label} {required && <span className="text-rose-600">*</span>}</span>
        {children}
        {hint && <span className="block text-[11px] text-gray-400 mt-1">{hint}</span>}
    </label>
);
export const inputClass = 'w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-[#4f56ca] focus:ring-2 focus:ring-indigo-100 text-sm';

export const SuccessPanel = ({ title, code, desc, onReset }) => (
    <div className="text-center py-10 spx-fade-up">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4"><CheckCircle2 size={34} /></div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {code && <p className="mt-2 text-sm text-gray-600">Mã hồ sơ: <strong className="text-[#2c1b92] tracking-wider">{code}</strong></p>}
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{desc}</p>
        <button onClick={onReset} className="mt-5 px-5 py-2.5 rounded-lg bg-[#2c1b92] hover:bg-[#4f56ca] text-white text-sm font-semibold transition-colors">Gửi yêu cầu khác</button>
    </div>
);
export const makeCode = (prefix) => `${prefix}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`;

/* ------------------------------------------------------------------ */
/*  Tab "Giới thiệu chung": khối giới thiệu, 4 trụ cột, sơ đồ tổ chức   */
/* ------------------------------------------------------------------ */
export const IntroSection = ({ intro, heroIcon: HeroIcon }) => (
    <div className="space-y-8">
        {/* Khối giới thiệu */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2c1b92] via-[#1f1470] to-[#0f0a3d] text-white p-6 sm:p-8 shadow-xl">
            <style>{`@keyframes spxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`}</style>
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-9 space-y-3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{intro.title}</h2>
                    <p className="text-sm text-indigo-100/90 leading-relaxed">{intro.desc}</p>
                </div>
                {HeroIcon && (
                    <div className="hidden lg:flex lg:col-span-3 justify-center">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-amber-400/25" style={{ animation: 'spxFloat 6s ease-in-out infinite' }} />
                            <div className="absolute inset-5 rounded-full border border-dashed border-amber-300/35" style={{ animation: 'spxRotCW 20s linear infinite' }} />
                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-indigo-900/80 border border-amber-300/50 flex items-center justify-center shadow-lg" style={{ animation: 'spxFloat 4s ease-in-out infinite' }}>
                                <HeroIcon size={30} className="text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* 4 trụ cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {intro.pillars.map((pl) => (
                <Card key={pl.title} className="p-6 sm:p-7 hover:border-[#4f56ca]/50 hover:shadow-md transition relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-amber-400" />
                    <h3 className="text-lg font-bold text-[#2c1b92] mb-3">{pl.title}</h3>
                    {pl.text && <p className="text-sm text-gray-600 leading-relaxed text-justify">{pl.text}</p>}
                    {pl.numbered && (
                        <ol className="space-y-2.5 text-sm text-gray-600 leading-relaxed">
                            {pl.numbered.map((t, i) => (
                                <li key={t} className="flex items-start gap-2.5">
                                    <span className="w-6 h-6 shrink-0 rounded-md bg-indigo-50 text-[#2c1b92] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                    {pl.points && (
                        <ul className={`space-y-2 text-sm text-gray-700 ${pl.text ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
                            {pl.points.map((t) => (
                                <li key={t} className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#2c1b92] shrink-0 mt-0.5" /> <span>{t}</span></li>
                            ))}
                        </ul>
                    )}
                </Card>
            ))}
        </div>

        {/* Sơ đồ tổ chức */}
        <Card className="p-5 sm:p-7">
            <style>{`@keyframes spxDash{from{stroke-dashoffset:24}to{stroke-dashoffset:0}}`}</style>
            <SectionTitle title={intro.structure.title} desc={intro.structure.desc} />
            <div className="relative">
                <div className="hidden lg:block absolute top-5 left-[8%] right-[8%] h-2 pointer-events-none">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 8">
                        <path d="M 0 4 L 800 4" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                        <path d="M 0 4 L 800 4" stroke="#2c1b92" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" style={{ animation: 'spxDash 1.6s linear infinite' }} />
                    </svg>
                </div>
                <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))` }}>
                    {intro.structure.levels.map((lv, i) => (
                        <div key={lv.name} className="group">
                            <div className="flex justify-center mb-3">
                                <span className="w-10 h-10 rounded-full bg-white border-2 border-[#2c1b92] text-[#2c1b92] font-bold text-sm flex items-center justify-center shadow-sm group-hover:bg-[#2c1b92] group-hover:text-white transition-colors">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="h-[calc(100%-3.25rem)] rounded-xl border border-gray-200 bg-white p-4 group-hover:border-[#4f56ca]/60 group-hover:shadow-md transition-all">
                                <p className="text-[11px] font-semibold uppercase text-gray-400">{lv.role}</p>
                                <h4 className="font-bold text-gray-900 mt-0.5">{lv.name}</h4>
                                <p className="text-xs text-[#2c1b92] font-medium mt-1">{lv.agency}</p>
                                <p className="text-xs text-gray-600 leading-relaxed mt-2 pt-2 border-t border-gray-100">{lv.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>

        {intro.commitments && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {intro.commitments.map((c) => (
                    <div key={c.title} className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-base sm:text-lg font-bold text-[#2c1b92] uppercase">{c.title}</div>
                        <p className="text-xs text-gray-600 mt-1">{c.desc}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
);

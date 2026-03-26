import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
    Eye, MessageSquare, Share2, Bookmark, Download, FileText
} from 'lucide-react';

// ── Shared mock data ──────────────────────────────────────────────────────────
const LINH_VUC = [
    'An ninh quốc gia', 'An ninh trật tự', 'Báo chí – Truyền hình',
    'Bảo hiểm', 'Bảo hiểm y tế', 'Cán bộ – Công chức – Viên chức',
    'Chính sách', 'Chứng khoán', 'Cơ cấu tổ chức', 'Công nghiệp',
    'Doanh nghiệp', 'Đất đai', 'Giáo dục', 'Hành chính', 'Lao động',
    'Ngân hàng', 'Thuế', 'Tư pháp', 'Y tế',
];

const CO_QUAN = [
    'Bộ Công an', 'Bộ Giáo dục và Đào tạo', 'Bộ Kế hoạch và Đầu tư',
    'Bộ Lao động – TB&XH', 'Bộ Tài chính', 'Bộ Tư pháp',
    'Bộ Y tế', 'Chính phủ', 'Ngân hàng Nhà nước', 'Quốc hội',
    'Tòa án Nhân dân Tối cao', 'Thủ tướng Chính phủ', 'UBND TP.HCM', 'UBND Hà Nội',
];

function makeDocs(count, statusFn) {
    const types = ['Nghị định', 'Thông tư', 'Quyết định', 'Luật', 'Pháp lệnh', 'Công văn'];
    const fields = ['Hành chính', 'Thuế', 'Đất đai', 'Lao động', 'Y tế', 'Giáo dục', 'Ngân hàng'];
    const orgs = ['Chính phủ', 'Bộ Tư pháp', 'Bộ Tài chính', 'Quốc hội', 'Thủ tướng Chính phủ'];
    const titles = [
        'Nghị định quy định xử phạt vi phạm hành chính trong lĩnh vực đất đai và nhà ở',
        'Thông tư hướng dẫn thi hành một số điều của Luật Thuế thu nhập doanh nghiệp',
        'Quyết định về việc ban hành quy định tuyển dụng công chức viên chức năm 2026',
        'Luật sửa đổi bổ sung một số điều của Luật Tổ chức Quốc hội khóa XV',
        'Pháp lệnh về phòng chống tham nhũng trong khu vực công và tư nhân',
        'Nghị định quy định chi tiết và hướng dẫn thi hành Luật Bảo vệ môi trường',
        'Thông tư quy định chế độ báo cáo thống kê trong lĩnh vực tư pháp',
        'Quyết định phê duyệt đề án đổi mới cơ chế tài chính đơn vị sự nghiệp công',
    ];
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        soHieu: `${(i * 7 + 12)}/${2024 + (i % 2)}/NĐ-CP`,
        title: titles[i % titles.length],
        loai: types[i % types.length],
        linh_vuc: fields[i % fields.length],
        co_quan: orgs[i % orgs.length],
        ngay_ban_hanh: `${String((i % 28) + 1).padStart(2, '0')}/0${(i % 3) + 1}/2026`,
        ngay_ap_dung: `${String((i % 28) + 15).padStart(2, '0')}/0${(i % 3) + 1}/2026`,
        status: statusFn ? statusFn(i) : (i % 5 === 0 ? 'expired' : i % 7 === 0 ? 'pending' : 'active'),
        views: 10000 - i * 300,
        comments: 120 - i * 3,
        shares: 80 - i * 2,
        saves: 45 - i,
    }));
}

const STATUS_BADGE = {
    active: { label: 'Còn Hiệu lực', cls: 'bg-green-50 text-green-700 border-green-200' },
    expired: { label: 'Hết Hiệu lực', cls: 'bg-red-50 text-red-700 border-red-200' },
    pending: { label: 'Chưa có Hiệu lực', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
};

// ── Quick-action buttons ──────────────────────────────────────────────────────
const ActionBtns = ({ docId }) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
        {[['Tổng quan', ''], ['Nội dung', 'noi-dung'], ['Văn bản gốc', 'van-ban-goc'], ['Hiệu lực', 'thuoc-tinh']].map(([l, tab]) => (
            <Link key={l}
                to={`/van-ban/${docId}${tab ? `?tab=${tab}` : ''}`}
                className="text-[13px] px-2.5 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600">
                {l}
            </Link>
        ))}
        <Link to={`/van-ban/${docId}?tab=tai-ve`}
            className="text-[13px] px-2.5 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 flex items-center gap-1">
            <Download size={13} /> Tải về
        </Link>
    </div>
);

// ── Pagination bar ────────────────────────────────────────────────────────────
const Pagination = ({ current, total, onChange }) => {
    const pages = () => {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
        if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        return [1, '...', current - 1, current, current + 1, '...', total];
    };
    return (
        <div className="flex flex-wrap justify-center items-center gap-1.5 mt-8">
            <button onClick={() => onChange(current - 1)} disabled={current === 1}
                className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
                <ChevronLeft size={13} /> Trước
            </button>
            {pages().map((p, i) => p === '...'
                ? <span key={i} className="w-8 h-8 flex items-center justify-center text-gray-400 text-[12px]">...</span>
                : <button key={p} onClick={() => onChange(p)}
                    className={`w-8 h-8 rounded text-[12px] font-semibold border ${current === p ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'}`}>{p}</button>
            )}
            <button onClick={() => onChange(current + 1)} disabled={current === total}
                className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
                Sau <ChevronRight size={13} />
            </button>
        </div>
    );
};

// ── Advanced Search Form ──────────────────────────────────────────────────────
const AdvancedSearch = ({ show45SoHieu = false, onClear }) => (
    <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-3">
        {show45SoHieu && (
            <div>
                <label className="text-[12px] text-gray-600 font-medium block mb-1">Số hiệu văn bản</label>
                <input className="w-full px-3 py-1.5 text-[13px] border border-gray-200 rounded outline-none focus:border-blue-400"
                    placeholder="Ví dụ: 66/2024/QH15" />
            </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {['Loại văn bản', 'Cơ quan ban hành', 'Tình trạng hiệu lực', 'Lĩnh vực hoạt động'].map(label => (
                <div key={label}>
                    <label className="text-[12px] text-gray-600 font-medium block mb-1">{label}</label>
                    <select className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded bg-white outline-none focus:border-blue-400">
                        <option value="">-- Chọn --</option>
                    </select>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
                <label className="text-[12px] text-gray-600 font-medium block mb-1">Ngày ban hành (từ)</label>
                <input type="date" className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded outline-none focus:border-blue-400" />
            </div>
            <div>
                <label className="text-[12px] text-gray-600 font-medium block mb-1">Đến ngày</label>
                <input type="date" className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded outline-none focus:border-blue-400" />
            </div>
            <div>
                <label className="text-[12px] text-gray-600 font-medium block mb-1">Ngôn ngữ</label>
                <select className="w-full px-2 py-1.5 text-[12px] border border-gray-200 rounded bg-white outline-none focus:border-blue-400">
                    <option value="">-- Chọn --</option>
                    <option>Tiếng Việt</option>
                    <option>Tiếng Anh</option>
                </select>
            </div>
        </div>
        <div className="flex justify-end">
            <button onClick={onClear} className="text-[12px] text-blue-600 hover:underline">Xóa dữ liệu tìm kiếm</button>
        </div>
    </div>
);

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ nhomPQ, setNhomPQ, nhomHN, setNhomHN, selectedLV, toggleLV, selectedCQ, toggleCQ, onReset, hasFilter }) => (
    <aside className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-4">
            <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[14px] text-gray-800">Bộ lọc</span>
                {hasFilter && (
                    <button onClick={onReset} className="text-[12px] text-blue-600 hover:underline">Bỏ chọn</button>
                )}
            </div>
            <div className="mb-4">
                <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2 border-b border-gray-100 pb-1">Nhóm văn bản</p>
                <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-1.5">
                    <input type="checkbox" checked={nhomPQ} onChange={e => setNhomPQ(e.target.checked)} className="accent-blue-700" />
                    Văn bản pháp quy
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={nhomHN} onChange={e => setNhomHN(e.target.checked)} className="accent-blue-700" />
                    Văn bản hợp nhất
                </label>
            </div>
            <div className="mb-4">
                <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2 border-b border-gray-100 pb-1">Lĩnh vực tra cứu</p>
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {LINH_VUC.map(v => (
                        <label key={v} className="flex items-center gap-2 text-[12px] text-gray-600 cursor-pointer">
                            <input type="checkbox" checked={selectedLV.includes(v)} onChange={() => toggleLV(v)} className="accent-blue-700" />
                            {v}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2 border-b border-gray-100 pb-1">Cơ quan ban hành</p>
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {CO_QUAN.map(v => (
                        <label key={v} className="flex items-center gap-2 text-[12px] text-gray-600 cursor-pointer">
                            <input type="checkbox" checked={selectedCQ.includes(v)} onChange={() => toggleCQ(v)} className="accent-blue-700" />
                            {v}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    </aside>
);

// ── Main exported component ───────────────────────────────────────────────────
/**
 * Props:
 *  pageTitle        – main heading
 *  breadcrumb       – last breadcrumb label
 *  badgeColor       – Tailwind bg class for STT badge (e.g. 'bg-green-700')
 *  showMonthYear    – show month/year selectors (UC40, UC41)
 *  forcedStatus     – 'active' | 'expired' | null
 *  tabs             – array of tab strings (UC42, UC43+44) or null
 *  tabModes         – array matching tabs: 'views' | 'engagement' | null
 *  showSemanticBadge– bool (UC45)
 *  show45SoHieu     – bool (UC45)
 */
const LegalDocListPage = ({
    pageTitle = 'Danh sách văn bản QPPL',
    breadcrumb = 'Danh sách văn bản',
    badgeColor = 'bg-[#1a3b8b]',
    showMonthYear = false,
    forcedStatus = null,
    tabs = null,
    tabModes = null,
    showSemanticBadge = false,
    show45SoHieu = false,
}) => {
    const now = new Date();
    const [activeTab, setActiveTab] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [scope, setScope] = useState('all');
    const [exactPhrase, setExactPhrase] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [selectedLV, setSelectedLV] = useState([]);
    const [selectedCQ, setSelectedCQ] = useState([]);
    const [nhomPQ, setNhomPQ] = useState(false);
    const [nhomHN, setNhomHN] = useState(false);

    const statusFn = forcedStatus
        ? () => forcedStatus
        : (i) => (i % 5 === 0 ? 'expired' : i % 7 === 0 ? 'pending' : 'active');

    const ALL_DOCS = makeDocs(47, statusFn);

    const filtered = ALL_DOCS.filter(d => {
        const kw = keyword.toLowerCase();
        const matchKw = !kw || d.title.toLowerCase().includes(kw) || d.soHieu.toLowerCase().includes(kw);
        const matchNhom = (!nhomPQ && !nhomHN) || nhomPQ || nhomHN;
        const matchLV = selectedLV.length === 0 || selectedLV.includes(d.linh_vuc);
        const matchCQ = selectedCQ.length === 0 || selectedCQ.includes(d.co_quan);
        return matchKw && matchNhom && matchLV && matchCQ;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageDocs = filtered.slice((page - 1) * perPage, page * perPage);

    const toggleLV = (v) => setSelectedLV(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
    const toggleCQ = (v) => setSelectedCQ(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
    const resetFilters = () => { setSelectedLV([]); setSelectedCQ([]); setNhomPQ(false); setNhomHN(false); };
    const hasFilter = nhomPQ || nhomHN || selectedLV.length > 0 || selectedCQ.length > 0;

    // Determine current mode from tab
    const currentMode = tabModes ? (tabModes[activeTab] || null) : null;
    const showViewCount = currentMode === 'views';
    const showEngagement = currentMode === 'engagement';

    // Current title
    const currentTitle = tabs ? tabs[activeTab] : pageTitle;

    // Total label
    const totalLabel = showViewCount
        ? `${filtered.length} văn bản được xem nhiều nhất`
        : showEngagement
            ? `${filtered.length} văn bản được quan tâm nhất`
            : showMonthYear
                ? `Có tất cả ${filtered.length} văn bản (trong tháng ${month}/${year})`
                : `Có tất cả ${filtered.length} văn bản`;

    const goPage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-16">
            <div className="container mx-auto px-4 max-w-[1280px] pt-5 flex gap-6">

                {/* ── Sidebar ── */}
                <Sidebar
                    nhomPQ={nhomPQ} setNhomPQ={setNhomPQ}
                    nhomHN={nhomHN} setNhomHN={setNhomHN}
                    selectedLV={selectedLV} toggleLV={toggleLV}
                    selectedCQ={selectedCQ} toggleCQ={toggleCQ}
                    onReset={resetFilters} hasFilter={hasFilter}
                />

                {/* ── Main content ── */}
                <main className="flex-1 min-w-0">
                    {/* Breadcrumb */}
                    <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-4">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <ChevronRight size={12} />
                        <span className="cursor-pointer hover:text-blue-600">Văn bản pháp luật</span>
                        <ChevronRight size={12} />
                        <span className="cursor-pointer hover:text-blue-600">Hệ thống văn bản pháp luật</span>
                        <ChevronRight size={12} />
                        <span className="text-gray-800 font-medium">{breadcrumb}</span>
                    </nav>

                    {/* Search & filter card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
                        {/* Tabs */}
                        {tabs && (
                            <div className="flex gap-0 mb-4 border-b border-gray-200 -mx-5 px-5">
                                {tabs.map((t, i) => (
                                    <button key={t} onClick={() => { setActiveTab(i); setPage(1); }}
                                        className={`px-5 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap ${activeTab === i ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        )}

                        <h1 className="text-[22px] font-bold text-[#0f4c81] mb-1">{currentTitle}</h1>
                        <p className="text-[14px] text-gray-400 italic mb-4">
                            Nguồn dữ liệu được lấy từ cơ sở dữ liệu quốc gia về pháp luật.
                        </p>

                        {/* Month/Year */}
                        {showMonthYear && (
                            <div className="flex items-center gap-3 mb-4">
                                <label className="text-[12px] text-gray-600 font-medium">Chọn tháng/năm:</label>
                                <select value={month} onChange={e => { setMonth(+e.target.value); setPage(1); }}
                                    className="border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:border-blue-400 bg-white">
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                                    ))}
                                </select>
                                <select value={year} onChange={e => { setYear(+e.target.value); setPage(1); }}
                                    className="border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:border-blue-400 bg-white">
                                    {[2022, 2023, 2024, 2025, 2026].map(y => <option key={y}>{y}</option>)}
                                </select>
                            </div>
                        )}

                        {/* Search bar */}
                        <form onSubmit={e => { e.preventDefault(); setPage(1); }} className="flex gap-2 mb-3">
                            <div className="relative flex-1">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input value={keyword} onChange={e => setKeyword(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-400"
                                    placeholder={show45SoHieu ? 'Nhập từ khóa, số hiệu, tên cơ quan hoặc câu hỏi pháp lý...' : 'Nhập từ khóa tìm kiếm...'} />
                            </div>
                            <button type="submit"
                                className="px-5 py-2 bg-[#1a3b8b] hover:bg-blue-800 text-white font-semibold rounded-lg text-[13px] transition-colors shrink-0">
                                Tìm kiếm
                            </button>
                        </form>

                        {/* Scope + per-page */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-gray-600">
                            <div className="flex items-center gap-3 flex-wrap">
                                {[['all', 'Tất cả'], ['title', 'Tiêu đề'], ['code', 'Số hiệu văn bản']].map(([v, lbl]) => (
                                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                                        <input type="radio" value={v} checked={scope === v} onChange={() => setScope(v)} className="accent-blue-700" />
                                        {lbl}
                                    </label>
                                ))}
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" checked={exactPhrase} onChange={e => setExactPhrase(e.target.checked)} className="accent-blue-700" />
                                    Cụm từ chính xác
                                </label>
                            </div>
                            <div className="flex items-center gap-3 ml-auto">
                                <button onClick={() => setShowAdvanced(s => !s)}
                                    className="flex items-center gap-1 text-blue-600 hover:underline text-[12px]">
                                    Tìm kiếm nâng cao
                                    {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>
                                <select value={perPage} onChange={e => { setPerPage(+e.target.value); setPage(1); }}
                                    className="border border-gray-200 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 bg-white">
                                    {[10, 20, 50].map(n => <option key={n} value={n}>{n} văn bản/trang</option>)}
                                </select>
                            </div>
                        </div>

                        {showAdvanced && (
                            <AdvancedSearch show45SoHieu={show45SoHieu} onClear={() => { }} />
                        )}
                    </div>

                    {/* Results card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-[13px] text-gray-500 italic mb-5 pb-3 border-b border-gray-100">{totalLabel}</p>

                        {pageDocs.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <FileText size={40} className="mx-auto mb-3 opacity-30" />
                                <p className="text-[14px]">Không tìm thấy văn bản phù hợp.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {pageDocs.map((doc, idx) => {
                                    const sb = STATUS_BADGE[doc.status] || STATUS_BADGE.active;
                                    const globalIdx = (page - 1) * perPage + idx + 1;
                                    return (
                                        <div key={doc.id} className="flex gap-4 py-5 first:pt-0">
                                            {/* STT */}
                                            <div className={`w-10 h-10 rounded-lg ${badgeColor} text-white text-[14px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                                                {String(globalIdx).padStart(2, '0')}
                                            </div>

                                            {/* Body */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-start gap-2">
                                                    <Link to={`/van-ban/${doc.id}`} className="text-[16px] font-bold text-blue-700 hover:underline leading-snug flex-1">
                                                        {doc.title}
                                                    </Link>
                                                </div>

                                                {/* Engagement row */}
                                                {showEngagement && (
                                                    <div className="flex items-center gap-4 text-[13px] text-gray-500 mt-1.5">
                                                        <span className="flex items-center gap-1 text-blue-600"><Eye size={13} />{doc.views.toLocaleString('vi-VN')} lượt xem</span>
                                                        <span className="flex items-center gap-1"><Share2 size={13} />{doc.shares} chia sẻ</span>
                                                        <span className="flex items-center gap-1"><Bookmark size={13} />{doc.saves} lưu</span>
                                                    </div>
                                                )}

                                                {/* View count row */}
                                                {showViewCount && (
                                                    <div className="flex items-center gap-1 text-[13px] text-blue-600 mt-1.5">
                                                        <Eye size={13} />{doc.views.toLocaleString('vi-VN')} lượt xem
                                                    </div>
                                                )}

                                                <ActionBtns docId={doc.id} />
                                            </div>

                                            {/* Meta */}
                                            <div className="shrink-0 text-right text-[13px] text-gray-500 min-w-[140px] space-y-1.5 mt-0.5">
                                                <p><span className="text-gray-400">Áp dụng:</span> {doc.ngay_ap_dung}</p>
                                                <p><span className="text-gray-400">Ban hành:</span> {doc.ngay_ban_hanh}</p>
                                                <span className={`inline-block px-2.5 py-1 rounded border text-[12px] font-semibold ${sb.cls}`}>
                                                    {sb.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <Pagination current={page} total={totalPages} onChange={goPage} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LegalDocListPage;

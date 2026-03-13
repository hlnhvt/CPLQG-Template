import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
    Eye, Download, FileText, BarChart2, PieChart, Activity, FileSpreadsheet
} from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const ORGS = [
    'Chính phủ', 'Bộ Tài chính', 'Bộ Tư pháp', 'Bộ Y tế', 'Bộ Công an',
    'Bộ Nông nghiệp và PTNT', 'Ngân hàng Nhà nước', 'Bộ GD&ĐT',
];

const TYPES = [
    'Luật', 'Pháp lệnh', 'Nghị định', 'Quyết định', 'Thông tư', 'Nghị quyết', 'Thông tư liên tịch'
];

const MOCK_DUTHAO = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    title: `Dự thảo ${TYPES[i % TYPES.length]} quy định về kiểm soát rủi ro trong lĩnh vực ${ORGS[i % ORGS.length].replace('Bộ ', '')}`,
    org: ORGS[i % ORGS.length],
    type: TYPES[i % TYPES.length],
    ngayDang: `0${(i % 9) + 1}/03/2026`,
    hanGopY: `${(i % 15) + 10}/04/2026`,
    views: 5000 - i * 110,
    isExpired: i % 6 === 0,
}));

// ── Shared UI Components ──────────────────────────────────────────────────────
const Pagination = ({ current, total, onChange }) => (
    <div className="flex flex-wrap justify-center items-center gap-1.5 mt-8">
        <button onClick={() => onChange(current - 1)} disabled={current === 1}
            className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
            <ChevronLeft size={13} /> Trước
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => onChange(p)}
                className={`w-8 h-8 rounded text-[12px] font-semibold border ${current === p ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'}`}>
                {p}
            </button>
        ))}
        <button onClick={() => onChange(current + 1)} disabled={current === total}
            className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
            Sau <ChevronRight size={13} />
        </button>
    </div>
);

// ── Advanced Search (UC53) ────────────────────────────────────────────────────
const AdvancedSearchForm = ({ onClear }) => (
    <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[13px]">
            {/* Lọc theo ngày */}
            <div>
                <label className="text-gray-600 font-medium block mb-1">Loại ngày</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400">
                    <option>Ngày đăng</option>
                    <option>Hạn góp ý</option>
                </select>
            </div>
            <div>
                <label className="text-gray-600 font-medium block mb-1">Từ ngày</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400" />
            </div>
            <div>
                <label className="text-gray-600 font-medium block mb-1">Đến ngày</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400" />
            </div>

            {/* Các dropdown khác */}
            <div>
                <label className="text-gray-600 font-medium block mb-1">Tình trạng hiệu lực</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400">
                    <option value="">Tất cả</option>
                    <option>Đang lấy ý kiến</option>
                    <option>Hết hạn góp ý</option>
                </select>
            </div>
            <div>
                <label className="text-gray-600 font-medium block mb-1">Lĩnh vực hoạt động</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400">
                    <option value="">-- Chọn lĩnh vực --</option>
                    <option>Hành chính</option>
                    <option>Kinh tế</option>
                </select>
            </div>
            <div>
                <label className="text-gray-600 font-medium block mb-1">Người ký dự thảo</label>
                <input placeholder="Nhập tên người ký..." className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400" />
            </div>
            <div>
                <label className="text-gray-600 font-medium block mb-1">Ngôn ngữ</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded bg-white outline-none focus:border-blue-400">
                    <option value="">Tất cả</option>
                    <option>Tiếng Việt</option>
                    <option>Tiếng Anh</option>
                </select>
            </div>
        </div>

        <div className="flex justify-end mt-4">
            <button onClick={onClear} className="text-[12px] text-blue-600 hover:underline">Xóa dữ liệu tìm kiếm</button>
        </div>
    </div>
);

// ── Tab 1: Danh sách dự thảo đang lấy ý kiến (UC51, 52, 53) ─────────────────
const TabDanhSach = () => {
    const [keyword, setKeyword] = useState('');
    const [exactPhrase, setExactPhrase] = useState(false);
    const [searchScope, setSearchScope] = useState('all');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    
    // Sidebar filters
    const [selOrgs, setSelOrgs] = useState([]);
    const [selTypes, setSelTypes] = useState([]);

    const handleToggleOrg = (org) => setSelOrgs(p => p.includes(org) ? p.filter(x => x !== org) : [...p, org]);
    const handleToggleType = (type) => setSelTypes(p => p.includes(type) ? p.filter(x => x !== type) : [...p, type]);

    const filtered = MOCK_DUTHAO.filter(d => {
        const kw = keyword.toLowerCase();
        const matchKw = !kw || d.title.toLowerCase().includes(kw);
        const matchOrg = selOrgs.length === 0 || selOrgs.includes(d.org);
        const matchType = selTypes.length === 0 || selTypes.includes(d.type);
        return matchKw && matchOrg && matchType;
    });

    const totalPages = Math.ceil(filtered.length / perPage) || 1;
    const items = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="flex gap-6 items-start">
            {/* Sidebar Bộ lọc */}
            <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-4">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="font-bold text-[14px] text-gray-800">Bộ lọc dự thảo</span>
                    {(selOrgs.length > 0 || selTypes.length > 0) && (
                        <button onClick={() => { setSelOrgs([]); setSelTypes([]); }} className="text-[11px] text-blue-600 hover:underline">Bỏ lọc</button>
                    )}
                </div>
                
                <div className="mb-5">
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">Cơ quan soạn thảo</p>
                    <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-1">
                        <input type="checkbox" checked={selOrgs.length === 0} onChange={() => setSelOrgs([])} className="accent-blue-700" />
                        Tất cả
                    </label>
                    <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {ORGS.map(o => (
                            <label key={o} className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                                <input type="checkbox" checked={selOrgs.includes(o)} onChange={() => handleToggleOrg(o)} className="accent-blue-700" /> {o}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2 border-t border-gray-50 pt-2">Loại dự thảo</p>
                    <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-1">
                        <input type="checkbox" checked={selTypes.length === 0} onChange={() => setSelTypes([])} className="accent-blue-700" />
                        Tất cả
                    </label>
                    <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {TYPES.map(t => (
                            <label key={t} className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                                <input type="checkbox" checked={selTypes.includes(t)} onChange={() => handleToggleType(t)} className="accent-blue-700" /> {t}
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* List & Search */}
            <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
                    {/* Search Bar */}
                    <div className="flex gap-2 mb-3">
                        <div className="relative flex-1">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={keyword} onChange={e => setKeyword(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-400"
                                placeholder="Nhập tiêu đề hoặc số hiệu dự thảo cần tìm..." />
                        </div>
                        <button className="px-5 py-2 bg-[#1a3b8b] hover:bg-blue-800 text-white font-semibold rounded-lg text-[13px] transition-colors shrink-0">
                            Tìm kiếm
                        </button>
                    </div>
                    {/* Search Scope */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-gray-600 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            {[['all', 'Tất cả'], ['title', 'Tiêu đề'], ['code', 'Số hiệu']].map(([v, lbl]) => (
                                <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                                    <input type="radio" value={v} checked={searchScope === v} onChange={() => setSearchScope(v)} className="accent-blue-700" /> {lbl}
                                </label>
                            ))}
                            <span className="w-px h-3 bg-gray-300 mx-2 hidden sm:inline-block"></span>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input type="checkbox" checked={exactPhrase} onChange={(e) => setExactPhrase(e.target.checked)} className="accent-blue-700" /> Cụm từ chính xác
                            </label>
                        </div>
                        <div className="flex items-center gap-3 ml-auto">
                            <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1 text-blue-600 hover:underline">
                                Tìm kiếm nâng cao {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </button>
                        </div>
                    </div>

                    {showAdvanced && <AdvancedSearchForm onClear={() => {}} />}
                </div>

                {/* Danh sách */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                        <p className="text-[13px] text-gray-500 italic">Có tất cả {filtered.length} dự thảo</p>
                        <select value={perPage} onChange={e => { setPerPage(+e.target.value); setPage(1); }}
                                className="border border-gray-200 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 bg-white text-gray-600">
                            <option value="10">10 văn bản/trang</option>
                            <option value="20">20 văn bản/trang</option>
                            <option value="50">50 văn bản/trang</option>
                        </select>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText size={40} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500 text-[14px]">Không tìm thấy dự thảo phù hợp.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((doc, idx) => (
                                <div key={doc.id} className="flex gap-4 pb-4 border-b border-gray-50 last:border-b-0">
                                    <div className="w-8 h-8 rounded-lg bg-[#1a3b8b]/10 text-[#1a3b8b] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        {String((page - 1) * perPage + idx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                                {/* Nhanhl2: Replaced <a> with <Link> for Title Routing */}
                                                <Link to={`/du-thao/${doc.id}`} className="text-[14px] font-bold text-blue-700 hover:underline leading-snug block mb-1">
                                                    {doc.title}
                                                </Link>
                                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mb-2">
                                            <span className="font-semibold text-gray-600">{doc.org}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{doc.type}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="text-[11px] px-2 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 bg-white">Toàn văn</button>
                                            <button className="text-[11px] px-2 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 bg-white flex items-center gap-1"><Download size={11}/> Tải về dự thảo</button>
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-right text-[11px] text-gray-500 min-w-[120px] space-y-1">
                                        <p><span className="text-gray-400">Ngày đăng:</span> {doc.ngayDang}</p>
                                        <p><span className="text-gray-400">Hạn góp ý:</span> <span className={doc.isExpired ? "text-red-500 font-semibold" : ""}>{doc.hanGopY}</span></p>
                                        {doc.isExpired ? (
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded border bg-red-50 text-red-600 border-red-200 text-[10px] font-semibold">Đã hết hạn</span>
                                        ) : (
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded border bg-green-50 text-green-700 border-green-200 text-[10px] font-semibold">Đang lấy ý kiến</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {totalPages > 1 && <Pagination current={page} total={totalPages} onChange={setPage} />}
                </div>
            </div>
        </div>
    );
};

// ── Tab 2: Dự thảo xem nhiều (UC54) ───────────────────────────────────────────
const TabXemNhieu = () => {
    const [period, setPeriod] = useState('30 ngày');
    const [page, setPage] = useState(1);
    
    // Sort array by views descending
    const sorted = [...MOCK_DUTHAO].sort((a,b) => b.views - a.views);
    const items = sorted.slice((page-1)*10, page*10);

    return (
        <div className="flex gap-6 items-start">
            <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-4">
                 <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                    <span className="font-bold text-[14px] text-gray-800">Bộ lọc</span>
                </div>
                <div className="mb-5">
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">Cơ quan soạn thảo</p>
                    <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-1"><input type="checkbox" defaultChecked className="accent-blue-700" /> Tất cả</label>
                    {ORGS.slice(0, 5).map(o => (
                        <label key={o} className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mt-1"><input type="checkbox" className="accent-blue-700" /> {o}</label>
                    ))}
                </div>
                <div>
                     <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">Loại dự thảo</p>
                    <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-1"><input type="checkbox" defaultChecked className="accent-blue-700" /> Tất cả</label>
                </div>
            </aside>

            <div className="flex-1 min-w-0">
                 {/* Top Controls */}
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-2">
                            {['7 ngày', '30 ngày', '3 tháng', 'Tất cả'].map(t => (
                                <button key={t} onClick={() => setPeriod(t)}
                                    className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-colors ${period === t ? 'bg-[#1a3b8b] text-white border-[#1a3b8b]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 sm:max-w-xs w-full">
                             <div className="relative flex-1">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-400" placeholder="Tìm kiếm..." />
                            </div>
                            <button className="px-4 py-1.5 bg-[#1a3b8b] text-white rounded-lg text-[12px] font-semibold">Tìm</button>
                        </div>
                    </div>
                </div>

                {/* Danh sách rank */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <p className="text-[13px] text-gray-500 italic border-b border-gray-100 pb-3 mb-4">Có tất cả {sorted.length} dự thảo xem nhiều trong {period}</p>
                    <div className="space-y-4">
                        {items.map((doc, idx) => (
                             <div key={doc.id} className="flex gap-4 pb-4 border-b border-gray-50 last:border-b-0">
                                <div className={`w-10 h-10 rounded-xl text-white text-[14px] font-bold flex items-center justify-center shrink-0 shadow-sm
                                    ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                      idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                      idx === 2 ? 'bg-gradient-to-br from-[#CD7F32] to-[#A0522D]' : 'bg-[#1a3b8b]/10 text-[#1a3b8b] shadow-none'}`}>
                                    {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0 mt-0.5">
{/* Nhanhl2: Replaced <a> with <Link> for Title Routing */}
                                    <Link to={`/du-thao/${doc.id}`} className="text-[14px] font-bold text-blue-700 hover:underline leading-snug block mb-1">
                                        {doc.title}
                                    </Link>
                                    <div className="flex items-center gap-1 text-[12px] text-blue-600 font-semibold mb-1">
                                        <Eye size={12}/> {doc.views.toLocaleString('vi-VN')} lượt xem
                                    </div>
                                     <div className="flex gap-2 mt-2">
                                        <button className="text-[11px] px-2 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600">Toán văn</button>
                                    </div>
                                </div>
                                 <div className="shrink-0 text-right text-[11px] text-gray-500 min-w-[120px] space-y-1">
                                    <p><span className="text-gray-400">Đăng:</span> {doc.ngayDang}</p>
                                    <p><span className="text-gray-400">Hạn:</span> <span className={doc.isExpired ? "text-red-500" : ""}>{doc.hanGopY}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination current={page} total={Math.ceil(sorted.length/10)} onChange={setPage} />
                </div>
            </div>
        </div>
    );
};

// ── Tab 3: Thống kê (UC63, UC64) ──────────────────────────────────────────────
const TabThongKe = () => {
    return (
        <div className="space-y-6">
            {/* UC63: Thống kê dự thảo mới */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h2 className="text-[18px] font-bold text-[#0f4c81] flex items-center gap-2">
                        <BarChart2 className="text-blue-500"/> Thống kê dự thảo mới
                    </h2>
                    <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] font-medium outline-none text-gray-700 focus:border-blue-400 bg-gray-50">
                        <option>30 ngày qua</option>
                        <option>3 tháng qua</option>
                        <option>6 tháng qua</option>
                        <option>Từ đầu năm</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                     {[
                         { lbl: 'Tổng số dự thảo', val: '2,405', color: 'blue' },
                         { lbl: 'Dự thảo mới trong kỳ', val: '142', color: 'emerald' },
                         { lbl: 'Đang lấy ý kiến', val: '86', color: 'indigo' },
                         { lbl: 'Dự thảo hết hạn', val: '56', color: 'rose' },
                     ].map(card => (
                         <div key={card.lbl} className={`bg-${card.color}-50 border border-${card.color}-100 rounded-xl p-4 flex flex-col items-center justify-center text-center`}>
                            <p className={`text-[12px] font-semibold text-${card.color}-700 opacity-80 mb-1`}>{card.lbl}</p>
                            <p className={`text-[28px] font-bold text-${card.color}-800`}>{card.val}</p>
                         </div>
                     ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Mock Bar Chart */}
                    <div>
                        <p className="font-semibold text-[13px] text-gray-700 mb-4 text-center">Số lượng dự thảo mới theo tuần</p>
                        <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-gray-200 pb-2 pl-2">
                             {[40, 65, 30, 85].map((h, i) => (
                                 <div key={i} className="w-1/4 flex flex-col items-center group relative">
                                    <div className="w-12 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors relative" style={{ height: `${h}%` }}>
                                         <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {h} dự thảo
                                         </div>
                                    </div>
                                    <span className="text-[11px] text-gray-500 absolute -bottom-6">Tuần {i+1}</span>
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Mock Donut Chart */}
                    <div>
                        <p className="font-semibold text-[13px] text-gray-700 mb-4 text-center">Tỷ lệ theo loại văn bản</p>
                        <div className="flex items-center justify-center h-64 gap-8">
                            <div className="relative w-40 h-40 rounded-full border-[1.5rem] border-t-blue-500 border-r-emerald-500 border-b-yellow-400 border-l-rose-500 flex items-center justify-center">
                            </div>
                            <div className="space-y-2 text-[12px] text-gray-600">
                                <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-500"></span> Nghị định (45%)</p>
                                <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Thông tư (30%)</p>
                                <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-yellow-400"></span> Quyết định (15%)</p>
                                <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-rose-500"></span> Khác (10%)</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Data Table */}
                <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer">
                        <p className="font-semibold text-[13px] text-gray-700 flex items-center gap-2"><FileSpreadsheet size={15}/> Bảng dữ liệu</p>
                        <ChevronDown size={15} className="text-gray-500" />
                    </div>
                </div>
            </div>

            {/* UC64: Thống kê văn bản mới sắp có hiệu lực */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-[18px] font-bold text-teal-700 flex items-center gap-2">
                        <Activity className="text-teal-500"/> Văn bản mới sắp có hiệu lực
                    </h2>
                    <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] font-medium outline-none text-gray-700 focus:border-teal-400 bg-gray-50">
                        <option>Trong 30 ngày tới</option>
                        <option>Trong 7 ngày tới</option>
                        <option>Trong 3 tháng tới</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Metrics + Chart */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                             {[
                                 { lbl: 'Tổng VB sắp có hiệu lực', val: '430', color: 'teal' },
                                 { lbl: 'Trong tháng này', val: '125', color: 'cyan' },
                                 { lbl: 'Trong quý này', val: '210', color: 'blue' },
                             ].map(card => (
                                 <div key={card.lbl} className={`bg-${card.color}-50 border border-${card.color}-100 rounded-xl p-4 text-center`}>
                                    <p className={`text-[11px] font-semibold text-${card.color}-700 opacity-80 mb-1`}>{card.lbl}</p>
                                    <p className={`text-[24px] font-bold text-${card.color}-800`}>{card.val}</p>
                                 </div>
                             ))}
                        </div>

                        <div>
                            <p className="font-semibold text-[13px] text-gray-700 mb-4 text-center">Phân bổ theo lĩnh vực</p>
                             <div className="flex items-center justify-center h-48 gap-8">
                                <div className="relative w-32 h-32 rounded-full border-[1rem] border-t-teal-500 border-r-blue-500 border-b-indigo-500 border-l-purple-500"></div>
                                <div className="space-y-2 text-[12px] text-gray-600">
                                    <p className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-teal-500"></span> Kinh tế (40%)</p>
                                    <p className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Hành chính (35%)</p>
                                    <p className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-indigo-500"></span> Tư pháp (15%)</p>
                                    <p className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-purple-500"></span> Khác (10%)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách nhanh */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                        <p className="font-bold text-[13px] text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-200 pb-2">Văn bản sắp có hiệu lực gần nhất</p>
                        <div className="space-y-4">
                            {[1,2,3,4].map(idx => (
                                <div key={idx} className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                                    <a href="#" className="font-semibold text-[12px] text-blue-700 hover:underline leading-tight line-clamp-2 mb-1.5">
                                        Nghị định số {idx*11}/2026/NĐ-CP quy định chi tiết thi hành một số điều của Luật
                                    </a>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] text-gray-500">Có hiệu lực: 1{idx}/04/2026</span>
                                        <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase">Chưa hiệu lực</span>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full text-center text-[12px] text-blue-600 hover:underline font-semibold mt-2">Xem tất cả →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ── Main Page ─────────────────────────────────────────────────────────────────
const DuThaoPage = () => {
    const [activeTab, setActiveTab] = useState('danh-sach');

    const tabs = [
        { id: 'danh-sach', label: 'Danh sách dự thảo' },
        { id: 'xem-nhieu', label: 'Dự thảo xem nhiều' },
        { id: 'thong-ke', label: 'Thống kê' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-16">
            {/* Header Cấp 1 */}
            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px]">
                    <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                        Dự thảo VBQPPL
                        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                    </h1>
                    <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                        Nơi tập hợp các dự thảo văn bản quy phạm pháp luật đang lấy ý kiến, đóng góp ý kiến của nhân dân vào quá trình xây dựng pháp luật.
                    </p>
                </div>
            </div>

            {/* Navigation Tab Cấp 2 */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-2 overflow-x-auto no-scrollbar">
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)}
                            className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap ${
                                activeTab === t.id ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}>
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Range */}
            <div className="container mx-auto px-4 max-w-[1280px] pt-6">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-5">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium">Dự thảo VBQPPL</span>
                </nav>

                {activeTab === 'danh-sach' && <TabDanhSach />}
                {activeTab === 'xem-nhieu' && <TabXemNhieu />}
                {activeTab === 'thong-ke' && <TabThongKe />}
            </div>
        </div>
    );
};

export default DuThaoPage;

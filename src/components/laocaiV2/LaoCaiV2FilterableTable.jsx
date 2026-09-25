import React, { useMemo, useState } from 'react';
import { Search, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
const normalize = (s = '') => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

/*
 * Khối danh sách theo phong cách các mục của chuyên trang PBGDPL:
 * thanh Tìm kiếm + Sắp xếp + Áp dụng/Đặt lại, dòng "Tìm thấy N ...", bảng kết quả, phân trang.
 * rows: [{ id, cells: [ReactNode...], search: string }]
 * sortOptions: [{ value, label, compare?: (a, b) => number }]  (mục đầu là mặc định)
 */
const LaoCaiV2FilterableTable = ({ headers, rows, countLabel, sortOptions, colClassNames = [] }) => {
    const [draft, setDraft] = useState('');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState(sortOptions[0].value);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = normalize(query.trim());
        const list = q ? rows.filter((r) => normalize(r.search).includes(q)) : [...rows];
        const opt = sortOptions.find((o) => o.value === sort);
        return opt?.compare ? list.sort(opt.compare) : list;
    }, [rows, query, sort, sortOptions]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const current = Math.min(page, totalPages);
    const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);

    const apply = () => { setQuery(draft); setPage(1); };
    const reset = () => { setDraft(''); setQuery(''); setSort(sortOptions[0].value); setPage(1); };

    const pagerBtn = 'w-9 h-9 flex items-center justify-center rounded-lg border text-sm transition-colors';

    return (
        <div className="flex flex-col gap-5 font-sans">
            {/* Thanh tìm kiếm */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm</label>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nhập từ khóa..."
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && apply()}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-48">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                    <select
                        value={sort}
                        onChange={(e) => { setSort(e.target.value); setPage(1); }}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={apply} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                        Áp dụng
                    </button>
                    <button onClick={reset} className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5">
                        <X size={14} /> Đặt lại
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm font-medium">
                Tìm thấy <strong className="text-black text-base">{filtered.length}</strong> {countLabel}
            </p>

            {/* Kết quả + phân trang */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {pageRows.length === 0 ? (
                    <div className="py-16 text-center text-sm text-gray-400">Không tìm thấy kết quả phù hợp.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[760px]">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-[12px] uppercase tracking-wide border-b border-gray-100">
                                    {headers.map((h, i) => (
                                        <th key={h} className={`px-5 py-3.5 font-bold ${i === 0 ? 'w-16 text-center' : ''} ${colClassNames[i] || ''}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {pageRows.map((r, idx) => (
                                    <tr key={r.id} className="border-b border-gray-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                                        <td className="px-5 py-4 text-center font-medium text-gray-500">{(current - 1) * pageSize + idx + 1}</td>
                                        {r.cells.map((c, ci) => (
                                            <td key={ci} className={`px-5 py-4 text-gray-700 ${colClassNames[ci + 1] || ''}`}>{c}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-5 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <span>Số bản ghi:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                            className="border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:border-blue-500 bg-white"
                        >
                            {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-1.5">
                        <button disabled={current === 1} onClick={() => setPage(1)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}><ChevronsLeft size={15} /></button>
                        <button disabled={current === 1} onClick={() => setPage(current - 1)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}><ChevronLeft size={15} /></button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                onClick={() => setPage(n)}
                                className={`${pagerBtn} ${n === current ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white font-semibold' : 'border-gray-200 text-gray-600 hover:bg-slate-50 font-medium'}`}
                            >
                                {n}
                            </button>
                        ))}
                        <button disabled={current === totalPages} onClick={() => setPage(current + 1)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}><ChevronRight size={15} /></button>
                        <button disabled={current === totalPages} onClick={() => setPage(totalPages)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}><ChevronsRight size={15} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaoCaiV2FilterableTable;

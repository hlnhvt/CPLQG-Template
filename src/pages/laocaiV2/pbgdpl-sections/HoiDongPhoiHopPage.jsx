import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Building2, FileText, MapPin, CalendarDays, Users, ArrowRight } from 'lucide-react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import { LAOCAI_V2_COUNCILS } from '../../../data/laocaiV2Councils';

// Hội đồng phối hợp PBGDPL tỉnh: danh sách hội đồng (theo mục "Hội đồng phối hợp" của chuyên trang PBGDPL Cổng PLQG),
// bộ lọc + danh sách theo phong cách mới; bấm vào hội đồng để xem chi tiết thành viên, Tổ thư ký.

const normalize = (s = '') => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const dateKey = (d) => d.split('/').reverse().join('');

const SORTS = [
    { value: 'newest', label: 'Mới nhất', compare: (a, b) => dateKey(b.decisionDate).localeCompare(dateKey(a.decisionDate)) },
    { value: 'oldest', label: 'Cũ nhất', compare: (a, b) => dateKey(a.decisionDate).localeCompare(dateKey(b.decisionDate)) },
    { value: 'az', label: 'Tên A → Z', compare: (a, b) => a.name.localeCompare(b.name, 'vi') },
];

const EMPTY_FILTER = { q: '', unit: '', level: '', area: '' };
const UNITS = [...new Set(LAOCAI_V2_COUNCILS.map((c) => c.unit))];
const LEVELS = [...new Set(LAOCAI_V2_COUNCILS.map((c) => c.level))];
const AREAS = [...new Set(LAOCAI_V2_COUNCILS.map((c) => c.area))];

const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';
const fieldCls = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500';

const SelectField = ({ label, value, onChange, options }) => (
    <div>
        <label className={labelCls}>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldCls} cursor-pointer`}>
            <option value="">Tất cả</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
    </div>
);

const HoiDongPhoiHopPage = () => {
    const [draft, setDraft] = useState(EMPTY_FILTER);
    const [filter, setFilter] = useState(EMPTY_FILTER);
    const [sort, setSort] = useState('newest');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.title = 'Hội đồng phối hợp PBGDPL tỉnh - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    const results = useMemo(() => {
        const q = normalize(filter.q.trim());
        const list = LAOCAI_V2_COUNCILS.filter((c) =>
            (!q || normalize(`${c.name} ${c.code} ${c.decision}`).includes(q)) &&
            (!filter.unit || c.unit === filter.unit) &&
            (!filter.level || c.level === filter.level) &&
            (!filter.area || c.area === filter.area)
        );
        return list.sort(SORTS.find((s) => s.value === sort).compare);
    }, [filter, sort]);

    const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
    const current = Math.min(page, totalPages);
    const pageItems = results.slice((current - 1) * pageSize, current * pageSize);

    const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));
    const apply = () => { setFilter(draft); setPage(1); };
    const reset = () => { setDraft(EMPTY_FILTER); setFilter(EMPTY_FILTER); setSort('newest'); setPage(1); };

    const pagerBtn = 'w-9 h-9 flex items-center justify-center rounded-lg border text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Hội đồng phối hợp PBGDPL tỉnh' }]}
                title="Hội đồng phối hợp PBGDPL tỉnh Lào Cai"
                subtitle="Danh sách Hội đồng phối hợp phổ biến, giáo dục pháp luật cấp tỉnh, cấp xã trên địa bàn tỉnh Lào Cai; thành viên và Tổ thư ký của từng Hội đồng"
            />

            <div className="container mx-auto px-4 max-w-[1286px] pt-8 flex flex-col gap-5">
                {/* Bộ lọc */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-1">
                            <label className={labelCls}>Tìm kiếm</label>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={draft.q}
                                    onChange={(e) => set('q')(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && apply()}
                                    placeholder="Nhập tên hội đồng, mã, số quyết định..."
                                    className={`${fieldCls} pl-9 placeholder:text-gray-400`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelCls}>Sắp xếp</label>
                            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className={`${fieldCls} cursor-pointer`}>
                                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>
                        <SelectField label="Đơn vị" value={draft.unit} onChange={set('unit')} options={UNITS} />
                        <SelectField label="Cấp hội đồng" value={draft.level} onChange={set('level')} options={LEVELS} />
                        <SelectField label="Địa bàn" value={draft.area} onChange={set('area')} options={AREAS} />
                        <div className="md:col-span-1 lg:col-span-3 flex items-end justify-end gap-2">
                            <button onClick={apply} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                                Áp dụng
                            </button>
                            <button onClick={reset} className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5">
                                <X size={14} /> Đặt lại
                            </button>
                        </div>
                    </div>
                </div>

                {/* Số kết quả */}
                <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 text-sm text-gray-700">
                    Tìm thấy <strong className="text-black">{results.length}</strong> hội đồng
                </div>

                {/* Danh sách */}
                {pageItems.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
                        Không tìm thấy hội đồng phù hợp với bộ lọc hiện tại.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {pageItems.map((c) => (
                            <Link
                                key={c.id}
                                to={`/lao-cai-v2/hoi-dong-phoi-hop/${c.id}`}
                                className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">{c.level}</span>
                                            <span className="text-xs text-gray-400 font-medium">{c.code}</span>
                                        </div>
                                        <h3 className="text-[17px] font-bold text-[#1b2b49] leading-snug group-hover:text-blue-700 transition-colors">{c.name}</h3>
                                    </div>
                                    <span className="self-start px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase whitespace-nowrap">{c.status}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 mt-4 text-[13px] text-gray-600">
                                    <span className="flex items-center gap-1.5"><Building2 size={14} className="text-gray-400 shrink-0" /> {c.unit}</span>
                                    <span className="flex items-center gap-1.5"><FileText size={14} className="text-gray-400 shrink-0" /> QĐ số {c.decision} ngày {c.decisionDate}</span>
                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400 shrink-0" /> {c.area}</span>
                                    <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400 shrink-0" /> {c.members.length} thành viên · Tổ thư ký {c.secretariat.length} người</span>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                    <span className="flex items-center gap-1.5 text-[12px] text-gray-400"><CalendarDays size={13} /> Nhiệm kỳ {c.term}</span>
                                    <span className="flex items-center gap-1 text-[13px] font-semibold text-blue-600">Xem chi tiết <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Phân trang */}
                <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Hiển thị</span>
                        <select
                            value={pageSize}
                            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                            className="border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500"
                        >
                            {[5, 10, 20].map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                        <span>/ <strong className="text-black">{results.length}</strong> hội đồng</span>
                    </div>
                    <div className="flex gap-1.5">
                        <button disabled={current === 1} onClick={() => setPage(1)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50`}><ChevronsLeft size={15} /></button>
                        <button disabled={current === 1} onClick={() => setPage(current - 1)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50`}><ChevronLeft size={15} /></button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button key={n} onClick={() => setPage(n)} className={`${pagerBtn} ${n === current ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white font-semibold' : 'border-gray-200 text-gray-600 hover:bg-slate-50'}`}>{n}</button>
                        ))}
                        <button disabled={current === totalPages} onClick={() => setPage(current + 1)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50`}><ChevronRight size={15} /></button>
                        <button disabled={current === totalPages} onClick={() => setPage(totalPages)} className={`${pagerBtn} border-gray-200 text-gray-500 hover:bg-slate-50`}><ChevronsRight size={15} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoiDongPhoiHopPage;

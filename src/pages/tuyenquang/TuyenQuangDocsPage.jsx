import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, FileText, Clock, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TuyenQuangPageShell, TuyenQuangCategorySidebar } from '../../components/tuyenquang/TuyenQuangShared';
import { Reveal, LaoCaiV3Styles } from '../../components/laocaiV3/LaoCaiV3Motion';
import { TQ_DOC_GROUPS, tuyenquangDocs, tqDirectiveDocUrl } from '../../data/tuyenquangMockData';

const PAGE_SIZE = 8;
const SORT_OPTIONS = ['Mới nhất', 'Cũ nhất'];
const GROUP_LABEL = Object.fromEntries(TQ_DOC_GROUPS.map((g) => [g.id, g.label]));
const dateKey = (d) => d.split('/').reverse().join('');

// Trang Thông tin văn bản chỉ đạo điều hành: cùng bố cục trang chuyên mục
// (khung lọc Tìm kiếm / Nhóm văn bản / Sắp xếp + Áp dụng / Đặt lại, danh sách, phân trang, cột phải dùng chung)
const TuyenQuangDocsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const group = searchParams.get('nhom') || '';
    const keyword = searchParams.get('q') || '';
    const [keywordDraft, setKeywordDraft] = useState(keyword);
    const [groupDraft, setGroupDraft] = useState(group);
    const [sortDraft, setSortDraft] = useState(SORT_OPTIONS[0]);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.title = 'Thông tin văn bản chỉ đạo điều hành - Cổng Pháp luật tỉnh Tuyên Quang';
        window.scrollTo(0, 0);
    }, []);

    // Đồng bộ khung lọc khi URL đổi (ví dụ tìm kiếm từ trang chủ)
    useEffect(() => {
        setKeywordDraft(keyword);
        setGroupDraft(group);
        setPage(1);
    }, [keyword, group]);

    const applyFilter = (e) => {
        e?.preventDefault();
        const next = {};
        if (keywordDraft.trim()) next.q = keywordDraft.trim();
        if (groupDraft) next.nhom = groupDraft;
        setSearchParams(next);
        setSortBy(sortDraft);
        setPage(1);
    };
    const resetFilter = () => {
        setKeywordDraft(''); setGroupDraft(''); setSortDraft(SORT_OPTIONS[0]); setSortBy(SORT_OPTIONS[0]);
        setSearchParams({});
        setPage(1);
    };

    const rows = useMemo(() => {
        const k = keyword.trim().toLowerCase();
        const filtered = tuyenquangDocs.filter((d) =>
            (!group || d.group === group) &&
            (!k || `${d.soHieu} ${d.trichYeu} ${d.coQuan} ${d.loai}`.toLowerCase().includes(k)));
        return filtered.sort((a, b) => (sortBy === 'Cũ nhất' ? 1 : -1) * dateKey(a.ngay).localeCompare(dateKey(b.ngay)));
    }, [group, keyword, sortBy]);

    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <TuyenQuangPageShell
            crumbs={[{ label: 'Văn bản pháp luật', to: '/tuyen-quang/van-ban' }, { label: 'Thông tin văn bản chỉ đạo điều hành' }]}
            title="Thông tin văn bản chỉ đạo điều hành"
            subtitle="Văn bản của Trung ương, Tỉnh ủy, HĐND, UBND tỉnh, Hội đồng phối hợp PBGDPL tỉnh và các cơ quan, đơn vị về công tác phổ biến, giáo dục pháp luật."
        >
            <LaoCaiV3Styles />
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_28%] gap-7">
                <div className="min-w-0 space-y-5">
                    {/* Khung lọc: đồng bộ trang chuyên mục */}
                    <form onSubmit={applyFilter} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-end gap-4" role="search">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="tq-doc-search" className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm</label>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="tq-doc-search"
                                    type="text"
                                    placeholder="Số hiệu, trích yếu, cơ quan..."
                                    value={keywordDraft}
                                    onChange={(e) => setKeywordDraft(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-48 shrink-0">
                            <label htmlFor="tq-doc-group" className="block text-sm font-semibold text-gray-700 mb-1.5">Nhóm văn bản</label>
                            <select id="tq-doc-group" value={groupDraft} onChange={(e) => setGroupDraft(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700">
                                <option value="">Tất cả</option>
                                {TQ_DOC_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                            </select>
                        </div>
                        <div className="w-full lg:w-36 shrink-0">
                            <label htmlFor="tq-doc-sort" className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                            <select id="tq-doc-sort" value={sortDraft} onChange={(e) => setSortDraft(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700">
                                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button type="submit" className="whitespace-nowrap bg-[#2580f0] hover:bg-[#1a66c2] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm">
                                Áp dụng
                            </button>
                            <button type="button" onClick={resetFilter} className="whitespace-nowrap bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5">
                                <X size={14} /> Đặt lại
                            </button>
                        </div>
                    </form>

                    <p className="text-gray-600 text-sm font-medium">
                        Tìm thấy <strong className="text-black text-base">{rows.length}</strong> văn bản
                    </p>

                    {!pageRows.length && (
                        <div className="bg-white rounded-2xl border border-gray-200/80 p-10 text-center text-gray-500">Không tìm thấy văn bản phù hợp.</div>
                    )}

                    <div className="space-y-3">
                        {pageRows.map((d, idx) => (
                            <Reveal key={`${d.id}-${page}-${keyword}-${group}-${sortBy}`} delay={idx * 50}>
                                <Link to={tqDirectiveDocUrl(d.id)} className="group flex gap-4 bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 lc3-card">
                                    <span className="w-14 h-16 shrink-0 rounded-lg bg-gradient-to-b from-[#0f4c81] to-[#1c2c5b] text-white flex flex-col items-center justify-center shadow-sm">
                                        <FileText size={20} />
                                        <span className="text-[9px] font-bold mt-1 uppercase text-center leading-tight px-1">{d.loai}</span>
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="font-bold text-[14.5px] text-[#0f4c81]">{d.soHieu}</span>
                                            <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">{GROUP_LABEL[d.group]}</span>
                                        </div>
                                        <h3 className="text-[14px] font-semibold text-gray-800 group-hover:text-[#991b1b] leading-snug line-clamp-2 transition-colors">{d.trichYeu}</h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-gray-500 mt-2">
                                            <span className="flex items-center gap-1"><Clock size={11} /> Ban hành: {d.ngay}</span>
                                            <span className="flex items-center gap-1"><Building2 size={11} /> {d.coQuan}</span>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav className="flex items-center justify-center gap-1.5 pt-2" aria-label="Phân trang">
                            <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Trang trước" className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#0f4c81]"><ChevronLeft size={16} /></button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button key={n} type="button" onClick={() => setPage(n)} aria-current={page === n}
                                    className={`w-9 h-9 rounded-lg text-sm font-semibold border ${page === n ? 'bg-[#0f4c81] border-[#0f4c81] text-white' : 'bg-white border-gray-200 hover:border-[#0f4c81]'}`}>{n}</button>
                            ))}
                            <button type="button" disabled={page === totalPages} onClick={() => setPage(page + 1)} aria-label="Trang sau" className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#0f4c81]"><ChevronRight size={16} /></button>
                        </nav>
                    )}
                </div>

                <TuyenQuangCategorySidebar />
            </div>
        </TuyenQuangPageShell>
    );
};

export default TuyenQuangDocsPage;

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Clock, Eye, Search, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { TuyenQuangPageShell, TuyenQuangCategorySidebar } from '../../components/tuyenquang/TuyenQuangShared';
import { Reveal, LaoCaiV3Styles } from '../../components/laocaiV3/LaoCaiV3Motion';
import {
    TQ_CATEGORIES, tuyenquangArticles, tqArticlesOf, tqArticleUrl, tqCategoryUrl
} from '../../data/tuyenquangMockData';

const PAGE_SIZE = 6;
const SORT_OPTIONS = ['Mới nhất', 'Cũ nhất', 'Xem nhiều nhất'];
const dateKey = (d) => d.split('/').reverse().join('');

// Trang chuyên mục dùng chung. `slug` lấy từ prop (chuyên trang cố định) hoặc từ URL;
// không có slug = trang "Tin tức" tổng hợp các chuyên mục nhóm Tin tức.
const TuyenQuangCategoryPage = ({ slug: slugProp }) => {
    const params = useParams();
    const slug = slugProp || params.slug;
    const [searchParams, setSearchParams] = useSearchParams();
    const sub = searchParams.get('muc');
    // Giá trị đang nhập (draft) chỉ áp dụng khi bấm "Áp dụng" / Enter, giống trang Thông báo PBGDPL Cổng quốc gia
    const [keywordDraft, setKeywordDraft] = useState('');
    const [sortDraft, setSortDraft] = useState(SORT_OPTIONS[0]);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
    const [subDraft, setSubDraft] = useState(sub || '');
    const [page, setPage] = useState(1);

    const cat = slug ? TQ_CATEGORIES[slug] : null;
    const title = cat ? cat.title : 'Tin tức';

    useEffect(() => {
        document.title = `${title} - Cổng Pháp luật tỉnh Tuyên Quang`;
        window.scrollTo(0, 0);
        setPage(1);
        setKeyword(''); setKeywordDraft('');
        setSortBy(SORT_OPTIONS[0]); setSortDraft(SORT_OPTIONS[0]);
    }, [slug, title]);

    // Mục con lấy từ URL (?muc=), để liên kết từ trang chủ mở đúng mục
    useEffect(() => {
        setSubDraft(sub || '');
        setPage(1);
    }, [sub]);

    const applyFilter = (e) => {
        e?.preventDefault();
        setKeyword(keywordDraft);
        setSortBy(sortDraft);
        if ((sub || '') !== subDraft) setSearchParams(subDraft ? { muc: subDraft } : {});
        setPage(1);
    };
    const resetFilter = () => {
        setKeywordDraft(''); setSortDraft(SORT_OPTIONS[0]);
        setKeyword(''); setSortBy(SORT_OPTIONS[0]);
        setSubDraft('');
        if (sub) setSearchParams({});
        setPage(1);
    };

    const items = useMemo(() => {
        const base = cat
            ? tqArticlesOf(slug, sub)
            : tuyenquangArticles.filter((a) => TQ_CATEGORIES[a.category].group === 'Tin tức');
        const k = keyword.trim().toLowerCase();
        const filtered = k ? base.filter((a) => `${a.title} ${a.summary}`.toLowerCase().includes(k)) : base;
        const sorted = [...filtered];
        if (sortBy === 'Xem nhiều nhất') sorted.sort((a, b) => b.views - a.views);
        else sorted.sort((a, b) => (sortBy === 'Cũ nhất' ? 1 : -1) * dateKey(a.date).localeCompare(dateKey(b.date)));
        return sorted;
    }, [cat, slug, sub, keyword, sortBy]);

    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const [featured, ...rest] = pageItems;

    if (slug && !cat) {
        return (
            <TuyenQuangPageShell crumbs={[{ label: 'Không tìm thấy' }]} title="Không tìm thấy chuyên mục">
                <p className="text-gray-600">Chuyên mục không tồn tại. <Link to={tqCategoryUrl('tin-tuc-su-kien')} className="text-[#0f4c81] font-semibold">Xem Tin tức sự kiện</Link></p>
            </TuyenQuangPageShell>
        );
    }

    return (
        <TuyenQuangPageShell
            crumbs={cat ? [{ label: cat.group }, { label: cat.title }] : [{ label: 'Tin tức' }]}
            title={title}
            subtitle={cat ? cat.desc : 'Tin tức, sự kiện, chính sách pháp luật mới và thông cáo báo chí của tỉnh Tuyên Quang.'}
        >
            <LaoCaiV3Styles />
            {/* Cột phải thu gọn 15% so với trước (từ ~33% xuống ~28% chiều rộng) */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_28%] gap-7">
                <div className="min-w-0 space-y-5">
                    {/* Khung lọc: đồng bộ trang Thông báo chuyên trang PBGDPL Cổng Pháp luật quốc gia */}
                    <form onSubmit={applyFilter} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-end gap-4" role="search">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="tq-cat-search" className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm</label>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="tq-cat-search"
                                    type="text"
                                    placeholder="Nhập từ khóa..."
                                    value={keywordDraft}
                                    onChange={(e) => setKeywordDraft(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        {cat?.subs && (
                            <div className="w-full lg:w-48 shrink-0">
                                <label htmlFor="tq-cat-sub" className="block text-sm font-semibold text-gray-700 mb-1.5">Mục</label>
                                <select
                                    id="tq-cat-sub"
                                    value={subDraft}
                                    onChange={(e) => setSubDraft(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                                >
                                    <option value="">Tất cả</option>
                                    {cat.subs.map((s) => <option key={s.slug} value={s.slug}>{s.label}</option>)}
                                </select>
                            </div>
                        )}
                        <div className="w-full lg:w-36 shrink-0">
                            <label htmlFor="tq-cat-sort" className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                            <select
                                id="tq-cat-sort"
                                value={sortDraft}
                                onChange={(e) => setSortDraft(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                            >
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
                        Tìm thấy <strong className="text-black text-base">{items.length}</strong> bài viết
                    </p>

                    {!featured && <div className="bg-white rounded-2xl border border-gray-200/80 p-10 text-center text-gray-500">Chưa có bài viết phù hợp.</div>}

                    {featured && (
                        <Reveal key={`${slug}-${sub}-${page}-${keyword}-${sortBy}`}>
                            <Link to={tqArticleUrl(featured.id)} className="group grid grid-cols-1 md:grid-cols-2 gap-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 lc3-card">
                                <div className="rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                                    <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <span className="absolute top-2 left-2 bg-[#991b1b] text-white text-[10.5px] font-bold px-2 py-0.5 rounded shadow uppercase">{TQ_CATEGORIES[featured.category].title}</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-1.5 text-xs text-amber-950 font-semibold mb-1.5"><Clock size={13} className="text-[#a81c1c]" /> {featured.date}</div>
                                    <h2 className="font-bold text-lg text-gray-900 group-hover:text-[#991b1b] leading-snug line-clamp-3 transition-colors">{featured.title}</h2>
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mt-2">{featured.summary}</p>
                                </div>
                            </Link>
                        </Reveal>
                    )}

                    <div className="space-y-3">
                        {rest.map((a, idx) => (
                            <Reveal key={a.id} delay={idx * 60}>
                                <Link to={tqArticleUrl(a.id)} className="group flex gap-4 bg-white rounded-xl border border-gray-200/80 shadow-sm p-3 lc3-card">
                                    <div className="w-[150px] sm:w-[190px] shrink-0 rounded-lg overflow-hidden aspect-video relative bg-gray-100">
                                        <img src={a.image} alt={a.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0 py-0.5">
                                        <h3 className="font-bold text-[14.5px] text-[#0f4c81] group-hover:text-[#991b1b] leading-snug line-clamp-2 transition-colors">{a.title}</h3>
                                        <p className="text-[12.5px] text-gray-500 line-clamp-2 mt-1 hidden sm:block">{a.summary}</p>
                                        <div className="flex items-center gap-3 text-[11.5px] text-gray-400 mt-2">
                                            <span className="flex items-center gap-1"><Clock size={11} /> {a.date}</span>
                                            <span className="flex items-center gap-1"><Eye size={11} /> {a.views.toLocaleString('vi-VN')}</span>
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

                <TuyenQuangCategorySidebar activeSlug={slug} />
            </div>
        </TuyenQuangPageShell>
    );
};

export default TuyenQuangCategoryPage;

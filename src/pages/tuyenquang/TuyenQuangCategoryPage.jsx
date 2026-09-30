import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Clock, Eye, Search, ChevronRight, ChevronLeft, Newspaper, TrendingUp } from 'lucide-react';
import { TuyenQuangPageShell, TQ_ICONS } from '../../components/tuyenquang/TuyenQuangShared';
import { Reveal, LaoCaiV3Styles } from '../../components/laocaiV3/LaoCaiV3Motion';
import {
    TQ_CATEGORIES, tuyenquangArticles, tqArticlesOf, tqArticleUrl, tqCategoryUrl
} from '../../data/tuyenquangMockData';

const PAGE_SIZE = 6;

// Trang chuyên mục dùng chung. `slug` lấy từ prop (chuyên trang cố định) hoặc từ URL;
// không có slug = trang "Tin tức" tổng hợp các chuyên mục nhóm Tin tức.
const TuyenQuangCategoryPage = ({ slug: slugProp }) => {
    const params = useParams();
    const slug = slugProp || params.slug;
    const [searchParams, setSearchParams] = useSearchParams();
    const sub = searchParams.get('muc');
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);

    const cat = slug ? TQ_CATEGORIES[slug] : null;
    const title = cat ? cat.title : 'Tin tức';

    useEffect(() => {
        document.title = `${title} - Cổng Pháp luật tỉnh Tuyên Quang`;
        window.scrollTo(0, 0);
        setPage(1);
        setKeyword('');
    }, [slug, sub, title]);

    const items = useMemo(() => {
        const base = cat
            ? tqArticlesOf(slug, sub)
            : tuyenquangArticles.filter((a) => TQ_CATEGORIES[a.category].group === 'Tin tức');
        const k = keyword.trim().toLowerCase();
        return k ? base.filter((a) => `${a.title} ${a.summary}`.toLowerCase().includes(k)) : base;
    }, [cat, slug, sub, keyword]);

    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const [featured, ...rest] = pageItems;
    const mostViewed = [...tuyenquangArticles].sort((a, b) => b.views - a.views).slice(0, 5);
    const groups = Object.entries(TQ_CATEGORIES).reduce((acc, [s, c]) => {
        (acc[c.group] = acc[c.group] || []).push([s, c]);
        return acc;
    }, {});

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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                <div className="lg:col-span-8 space-y-5">
                    {/* Mục con + tìm kiếm */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 flex flex-col md:flex-row md:items-center gap-3">
                        {cat?.subs ? (
                            <div className="flex gap-2 overflow-x-auto lc3-thin-scroll flex-1" role="tablist">
                                {[{ slug: null, label: 'Tất cả' }, ...cat.subs].map((s) => {
                                    const active = (sub || null) === s.slug;
                                    return (
                                        <button key={s.label} type="button" role="tab" aria-selected={active}
                                            onClick={() => setSearchParams(s.slug ? { muc: s.slug } : {})}
                                            className={`shrink-0 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${active ? 'bg-[#0f4c81] border-[#0f4c81] text-white' : 'border-gray-200 text-gray-700 hover:border-[#0f4c81] hover:text-[#0f4c81]'}`}>
                                            {s.label}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : <div className="flex-1 text-sm text-gray-500">{items.length} bài viết</div>}
                        <div className="relative md:w-72 shrink-0">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="search" value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} placeholder="Tìm trong chuyên mục..." aria-label="Tìm trong chuyên mục"
                                className="w-full bg-gray-50 border border-gray-200 text-sm pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:bg-white focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100 transition" />
                        </div>
                    </div>

                    {!featured && <div className="bg-white rounded-2xl border border-gray-200/80 p-10 text-center text-gray-500">Chưa có bài viết phù hợp.</div>}

                    {featured && (
                        <Reveal key={`${slug}-${sub}-${page}-${keyword}`}>
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

                {/* Sidebar: danh mục chuyên mục + đọc nhiều */}
                <aside className="lg:col-span-4 space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white px-4 py-3 font-bold text-[14px] uppercase tracking-wide flex items-center gap-2">
                            <Newspaper size={16} className="text-amber-300" /> Chuyên mục
                        </div>
                        <div className="p-2">
                            {Object.entries(groups).map(([group, list]) => (
                                <div key={group} className="py-1">
                                    <div className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#991b1b]">{group}</div>
                                    {list.map(([s, c]) => {
                                        const Icon = TQ_ICONS[c.icon] || Newspaper;
                                        const active = s === slug;
                                        return (
                                            <Link key={s} to={tqCategoryUrl(s)} aria-current={active ? 'page' : undefined}
                                                className={`group flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors ${active ? 'bg-blue-50 text-[#0f4c81]' : 'hover:bg-gray-50 text-gray-800'}`}>
                                                <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${active ? 'bg-[#0f4c81] text-white' : 'bg-[#f0f5f9] text-[#0f4c81] group-hover:bg-[#0f4c81] group-hover:text-white'} transition-colors`}><Icon size={13} /></span>
                                                <span className="flex-1 text-[13px] font-semibold truncate">{c.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4">
                        <h3 className="font-bold text-[15px] text-[#0f4c81] flex items-center gap-2 pb-2 mb-2 border-b border-gray-100"><TrendingUp size={16} className="text-[#991b1b]" /> Đọc nhiều</h3>
                        <ol className="space-y-2.5">
                            {mostViewed.map((a, i) => (
                                <li key={a.id}>
                                    <Link to={tqArticleUrl(a.id)} className="group flex gap-3">
                                        <span className="w-6 h-6 shrink-0 rounded-md bg-amber-50 border border-amber-200 text-[#991b1b] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                                        <span className="text-[13px] font-medium text-gray-800 group-hover:text-[#991b1b] leading-snug line-clamp-2">{a.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </div>
                </aside>
            </div>
        </TuyenQuangPageShell>
    );
};

export default TuyenQuangCategoryPage;

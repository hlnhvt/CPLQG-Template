import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, Eye, User, Printer, Share2, ChevronRight } from 'lucide-react';
import { TuyenQuangPageShell } from '../../components/tuyenquang/TuyenQuangShared';
import { TQ_CATEGORIES, tuyenquangArticles, tqArticlesOf, tqArticleUrl, tqCategoryUrl } from '../../data/tuyenquangMockData';

const TuyenQuangArticlePage = () => {
    const { id } = useParams();
    const article = tuyenquangArticles.find((a) => a.id === id);

    useEffect(() => {
        document.title = `${article ? article.title : 'Không tìm thấy bài viết'} - Cổng Pháp luật tỉnh Tuyên Quang`;
        window.scrollTo(0, 0);
    }, [article]);

    if (!article) {
        return (
            <TuyenQuangPageShell crumbs={[{ label: 'Không tìm thấy' }]} title="Không tìm thấy bài viết">
                <p className="text-gray-600">Bài viết không tồn tại hoặc đã được gỡ. <Link to={tqCategoryUrl('tin-tuc-su-kien')} className="text-[#0f4c81] font-semibold">Xem Tin tức sự kiện</Link></p>
            </TuyenQuangPageShell>
        );
    }

    const cat = TQ_CATEGORIES[article.category];
    const related = tqArticlesOf(article.category).filter((a) => a.id !== article.id).slice(0, 4);

    return (
        <TuyenQuangPageShell crumbs={[{ label: cat.title, to: tqCategoryUrl(article.category) }, { label: 'Chi tiết' }]} title={cat.title}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                <article className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 sm:p-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{article.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-3 pb-4 border-b border-gray-100">
                        <span className="flex items-center gap-1"><Clock size={13} /> {article.date}</span>
                        <span className="flex items-center gap-1"><Eye size={13} /> {article.views.toLocaleString('vi-VN')} lượt xem</span>
                        <span className="flex items-center gap-1"><User size={13} /> {article.author}</span>
                        <span className="ml-auto flex items-center gap-2">
                            <button type="button" onClick={() => window.print()} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-[#0f4c81] hover:text-[#0f4c81] flex items-center justify-center" title="In bài viết" aria-label="In bài viết"><Printer size={14} /></button>
                            <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-[#0f4c81] hover:text-[#0f4c81] flex items-center justify-center" title="Sao chép liên kết" aria-label="Sao chép liên kết"><Share2 size={14} /></button>
                        </span>
                    </div>
                    <p className="font-semibold text-gray-800 leading-relaxed mt-5">{article.summary}</p>
                    <img src={article.image} alt={article.title} className="w-full rounded-xl my-5 aspect-video object-cover" />
                    <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed">
                        <p>Nội dung chi tiết của bài viết thuộc chuyên mục “{cat.title}”. {cat.desc}</p>
                        <p>Đây là dữ liệu minh họa phục vụ thiết kế giao diện Cổng Pháp luật tỉnh Tuyên Quang; nội dung chính thức sẽ được Ban Biên tập cập nhật khi vận hành.</p>
                    </div>
                </article>
                <aside className="lg:col-span-4">
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 lg:sticky lg:top-4">
                        <h3 className="font-bold text-[15px] text-[#0f4c81] pb-2 mb-2 border-b border-gray-100">Tin cùng chuyên mục</h3>
                        <div className="space-y-3">
                            {related.map((a) => (
                                <Link key={a.id} to={tqArticleUrl(a.id)} className="group flex gap-3">
                                    <img src={a.image} alt={a.title} loading="lazy" className="w-24 aspect-video object-cover rounded-lg shrink-0" />
                                    <span className="min-w-0">
                                        <span className="block text-[13px] font-semibold text-gray-800 group-hover:text-[#991b1b] leading-snug line-clamp-2">{a.title}</span>
                                        <span className="block text-[11px] text-gray-400 mt-1">{a.date}</span>
                                    </span>
                                </Link>
                            ))}
                            {!related.length && <p className="text-sm text-gray-500">Chưa có bài viết khác.</p>}
                        </div>
                        <Link to={tqCategoryUrl(article.category)} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0f4c81] hover:text-[#991b1b]">Xem chuyên mục <ChevronRight size={13} /></Link>
                    </div>
                </aside>
            </div>
        </TuyenQuangPageShell>
    );
};

export default TuyenQuangArticlePage;

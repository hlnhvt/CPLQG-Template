import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, ChevronLeft, ArrowRight, Phone, MessageSquare, PenLine } from 'lucide-react';
import { NA_NEWS, NA_LIST_URL } from '../../data/nationalAssemblyNews';

// Trang danh sách tin "Quốc hội khóa XVI - Kỳ họp thứ hai":
// cùng cấu trúc trang /tin-tuc/nghien-cuu-trao-doi (4 tin đầu dạng thẻ, danh sách bài, phân trang, cột phải),
// không có khối mô tả trên cùng, breadcrumb và bộ lọc.
const ITEMS_PER_PAGE = 5;
const newsUrl = (id) => `/news/${id}`;

const [FEATURED_MAIN, ...REST] = NA_NEWS;
const FEATURED_SUB = REST.slice(0, 3);
const LIST = REST.slice(3);
const LATEST_NEWS = NA_NEWS.slice(0, 5);

const DateTime = ({ date, time }) => (
    <div className="flex items-center gap-3 text-[12.5px] text-gray-500">
        <span className="flex items-center gap-1.5"><Calendar size={14} /> {date}</span>
        <span className="flex items-center gap-1.5"><Clock size={14} /> {time}</span>
    </div>
);

const QuocHoiKhoaXVIPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = 'Quốc hội khóa XVI - Kỳ họp thứ hai - Cổng Pháp luật quốc gia';
        window.scrollTo(0, 0);
    }, []);

    const totalPages = Math.ceil(LIST.length / ITEMS_PER_PAGE);
    const currentArticles = LIST.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) {
            setCurrentPage(p);
            document.getElementById('qh-danh-muc')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            <div className="container mx-auto px-4 max-w-[1432px] pt-6">

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* === NỘI DUNG CHÍNH === */}
                    <div className="flex-1 min-w-0">
                        {/* 4 tin đầu: 1 tin lớn (ảnh trái, chữ phải) + 3 tin dạng thẻ (ảnh trên, chữ dưới) */}
                        <div id="qh-danh-muc" className="mb-8 scroll-mt-4">
                            <Link to={newsUrl(FEATURED_MAIN.id)} className="group grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-[0_4px_18px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_26px_rgba(15,23,42,0.13)] transition-shadow mb-5">
                                <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[270px] overflow-hidden bg-gray-100">
                                    <img src={FEATURED_MAIN.image} alt={FEATURED_MAIN.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-5 md:p-6 flex flex-col">
                                    <h1 className="font-bold text-[18px] md:text-[20px] text-gray-900 leading-snug line-clamp-3 group-hover:text-[#0f4c81] transition-colors">{FEATURED_MAIN.title}</h1>
                                    <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mt-3">{FEATURED_MAIN.summary}</p>
                                    <div className="mt-auto pt-4"><DateTime date={FEATURED_MAIN.date} time={FEATURED_MAIN.time} /></div>
                                </div>
                            </Link>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {FEATURED_SUB.map((item) => (
                                    <Link key={item.id} to={newsUrl(item.id)} className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_18px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_26px_rgba(15,23,42,0.13)] transition-shadow flex flex-col">
                                        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                                            <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <h3 className="font-bold text-[15px] text-gray-900 leading-snug line-clamp-2 group-hover:text-[#0f4c81] transition-colors">{item.title}</h3>
                                            <p className="text-gray-500 text-[13.5px] leading-relaxed line-clamp-2 mt-2">{item.summary}</p>
                                            <div className="mt-auto pt-3"><DateTime date={item.date} time={item.time} /></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Danh sách bài */}
                        <div className="space-y-5 mb-10">
                            {currentArticles.map((article) => (
                                <Link key={article.id} to={newsUrl(article.id)} className="group flex flex-col md:flex-row gap-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5">
                                    <div className="w-full md:w-56 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                        <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-[16px] md:text-[18px] text-[#0f4c81] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">{article.title}</h3>
                                            <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">{article.summary}</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-400 text-[12px] font-medium mt-4">
                                            <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={13} /> {article.time}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Phân trang */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 text-[14px] transition-colors font-medium">
                                    <ChevronLeft size={16} /> Trước
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button key={p} onClick={() => handlePage(p)} aria-current={currentPage === p ? 'page' : undefined} className={`w-10 h-10 rounded-lg border text-[14px] font-bold transition-colors ${currentPage === p ? 'bg-[#0f4c81] border-[#0f4c81] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'}`}>{p}</button>
                                ))}
                                <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 text-[14px] transition-colors font-medium">
                                    Sau <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* === CỘT PHẢI === */}
                    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-[#0f4c81] px-5 py-3.5">
                                <h3 className="text-white font-bold text-[15px]">Tin mới nhất</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {LATEST_NEWS.map((item) => (
                                    <Link key={item.id} to={newsUrl(item.id)} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group">
                                        <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                            <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</p>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1.5"><Calendar size={11} /> {item.date}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-3.5 border-t border-gray-100 bg-gray-50/50">
                                <Link to={NA_LIST_URL} onClick={() => handlePage(1)} className="text-[13px] text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1.5 w-fit mx-auto">
                                    Xem tất cả bài viết <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative">
                            <img src="/poster1.png" alt="Ngày Pháp luật" className="w-full object-cover aspect-square opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent flex flex-col justify-end p-5">
                                <h4 className="text-yellow-400 font-bold text-sm uppercase drop-shadow-md pb-1 border-b border-yellow-400/50">Quốc hội khóa XVI</h4>
                                <h5 className="text-white font-bold text-lg leading-tight mt-2 drop-shadow-md">Kỳ họp thứ Hai</h5>
                            </div>
                        </div>

                        <div className="bg-gradient-to-b from-[#0f4c81] to-[#072d54] text-white p-6 rounded-2xl shadow-md text-center relative overflow-hidden flex flex-col items-center">
                            <h3 className="text-[20px] font-bold text-white mb-6 uppercase tracking-wider leading-tight">
                                Chúng tôi luôn<br />lắng nghe &<br />phản hồi
                            </h3>
                            <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 border-2 border-t-white border-b-white rounded-full animate-[spin_12s_linear_infinite] motion-reduce:animate-none opacity-60" />
                                <MessageSquare size={32} className="text-white/90" />
                            </div>
                            <p className="text-[13px] text-blue-100 leading-relaxed mb-6 max-w-xs opacity-90">
                                Người dân và doanh nghiệp có thể gửi kiến nghị, góp ý xây dựng, hoàn thiện chính sách, pháp luật thông qua các phương thức dưới đây.
                            </p>
                            <div className="w-full space-y-3">
                                <a href="tel:02462739715" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#0f4c81] font-bold rounded-lg hover:bg-blue-50 transition-colors text-[13px] shadow-sm">
                                    <Phone size={15} fill="currentColor" /> Gọi tổng đài 024.62739715
                                </a>
                                <Link to="/gop-y" className="flex items-center justify-center gap-2 w-full py-3 border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-[13px]">
                                    <PenLine size={15} /> Gửi góp ý trực tiếp
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default QuocHoiKhoaXVIPage;

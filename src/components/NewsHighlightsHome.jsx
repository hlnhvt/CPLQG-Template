import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-video w-full relative overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
);

const NewsHighlightsHome = () => {
    return (
        <section className="pt-8 pb-2">
            <div className="container mx-auto px-4 max-w-[1504px]">
                <div className="mb-6">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-6">
                        <h2 className="text-2xl font-bold text-[#0f4c81] leading-tight">Tin tức nổi bật</h2>
                        <Link to="/tin-tuc/noi-bat" className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100 hover:border-blue-200 text-[#0f4c81] text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm active:scale-95">
                            <span>Xem tất cả</span>
                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Cột Trái (3 tin nhỏ) */}
                        <div className="lg:col-span-1 flex flex-col space-y-4">
                            {[2, 3, 4, 7].map((id) => (
                                <Link key={id} to={`/news/${id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 
                                            src={id === 2 ? "/02bd53d8-37a5-4927-8d00-a00feb16a3b2.jpg" : id === 3 ? "/1748a7fd-78c7-4106-9c42-2852c0a58e1e.jpg" : "/fda33db9-762a-4d21-9317-96615cd1968b.jpg"} 
                                            alt={`News ${id}`} 
                                            className="rounded" 
                                        />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h3 className="font-bold text-[13px] md:text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-3 leading-snug">Bộ Tư pháp đề nghị mang tới các giải pháp tháo gỡ khó khăn cho doanh nghiệp...</h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                            <Clock size={12} /> <span>12/03/2026</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Cột Giữa (1 tin cực lớn) */}
                        <Link to="/news/1" className="lg:col-span-2 group flex flex-col">
                            <div className="w-full mb-4 shrink-0">
                                <Image16x9 src="/fda33db9-762a-4d21-9317-96615cd1968b.jpg" alt="Main News" className="rounded-lg shadow-sm border border-gray-100" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className="text-xl md:text-[22px] font-bold text-[#0f4c81] group-hover:text-blue-700 mb-2 leading-tight">
                                    Hướng tới bầu cử đại biểu Quốc hội khóa XVI và đại biểu HĐND các cấp nhiệm kỳ 2026-2031: Đặt công tác bảo đảm an ninh, trật tự lên hàng đầu
                                </h3>
                                <p className="text-gray-600 text-[14px] mb-3 line-clamp-2 leading-relaxed">
                                    Chiều 10/3, Đoàn công tác của Hội đồng bầu cử quốc gia do Phó Chủ tịch Quốc hội Nguyễn Khắc Định làm Trưởng đoàn đã có buổi làm việc với Ủy ban bầu cử tỉnh...
                                </p>
                                <div className="mt-auto flex items-center gap-1 text-[12px] text-gray-400">
                                    <Clock size={14} /> <span>11/03/2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* Cột Phải (2 tin) */}
                        <div className="lg:col-span-1 flex flex-col space-y-6">
                            {[5, 6].map((id) => (
                                <Link key={id} to={`/news/${id}`} className="group flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-full mb-3 shrink-0">
                                        <Image16x9 
                                            src={id === 5 ? "/02bd53d8-37a5-4927-8d00-a00feb16a3b2.jpg" : "/1748a7fd-78c7-4106-9c42-2852c0a58e1e.jpg"} 
                                            alt={`News Side ${id}`} 
                                            className="rounded" 
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#0f4c81] mb-2 leading-snug line-clamp-3">
                                            Xây dựng đội ngũ luật sư và bàn thảo chính sách nâng cao kỷ nguyên...
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                            <Clock size={12} /> <span>11/03/2026</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsHighlightsHome;

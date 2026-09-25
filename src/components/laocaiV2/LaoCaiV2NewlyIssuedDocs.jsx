import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { laocaiV2LegalDocs } from '../../data/laocaiV2MockData';

const LaoCaiV2NewlyIssuedDocs = () => {
    const docs = laocaiV2LegalDocs.map(doc => ({
        date: doc.ngayBanHanh,
        title: `${doc.soHieu} (${doc.coQuan}) - ${doc.trichYeu}`
    }));

    return (
        <section id="van-ban-moi" className="py-1 laocaiV2-animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <div className="container mx-auto px-4 max-w-[1504px]">
                {/* Header Khối Văn Bản Mới Ban Hành: tiêu đề chữ đơn giản, không nền màu */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-200">
                    <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                        Văn Bản Mới Ban Hành
                    </h2>

                    {/* Nút Xem tất cả */}
                    <Link
                        to="/lao-cai-v2/van-ban"
                        className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors"
                    >
                        <span>Xem tất cả văn bản</span>
                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column - Documents Table */}
                    <div className="flex-1 lg:max-w-none">
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col h-[413px]">
                            {/* Table Header với màu sắc và phong cách đồng bộ Banner Cổng Lào Cai */}
                            <div className="relative overflow-hidden flex bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white text-[15px] font-bold py-3.5 px-6 shrink-0 border-b-2 border-amber-400 shadow-xs">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="relative z-10 w-[140px] shrink-0">Ngày ban hành</div>
                                <div className="relative z-10 flex-1">Nội dung văn bản</div>
                            </div>
                            {/* Table Body */}
                            <ul className="flex flex-col flex-1 overflow-y-auto bg-white divide-y divide-gray-100">
                                {docs.map((item, index) => (
                                    <Link
                                        to="/lao-cai-v2/van-ban"
                                        key={index}
                                        className="flex text-[14px] py-4 px-6 hover:bg-blue-50/50 transition cursor-pointer group items-center flex-1 gap-4 lg:gap-0"
                                    >
                                        <div className="w-[140px] shrink-0 font-semibold text-gray-800">{item.date}</div>
                                        <div className="flex-1 text-gray-600 line-clamp-3 group-hover:text-[#0f4c81] leading-relaxed font-medium">
                                            {item.title}
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Highlight Banners */}
                    <div className="flex flex-col gap-4 w-full lg:w-[412.66px] shrink-0 h-[412.66px]">
                        <Link
                            to="/lao-cai-v2/van-ban"
                            className="rounded-xl overflow-hidden shadow-sm relative group block w-full flex-[2] bg-red-800 outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <img
                                src="/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg"
                                alt="Chính sách phát triển tỉnh Lào Cai"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                                <span className="inline-block w-fit text-[11px] font-bold bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded shadow mb-1.5 uppercase">
                                    Thể chế Lào Cai
                                </span>
                                <h4 className="font-bold text-[15px] sm:text-[16px] leading-snug line-clamp-2 text-white group-hover:text-amber-300 transition-colors drop-shadow">
                                    Triển khai đồng bộ các chính sách đặc thù phát triển tỉnh Lào Cai đến các xã, phường
                                </h4>
                            </div>
                        </Link>

                        <Link
                            to="/lao-cai-v2/van-ban"
                            className="rounded-xl overflow-hidden shadow-sm relative group block w-full flex-[1] bg-red-800 outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <img
                                src="/BO NHAN DIEN TONG RA SOAT/1200x400 Banner Trang chu.jpg"
                                alt="Tổng rà soát văn bản tỉnh Lào Cai"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                                <h4 className="font-bold text-[14px] leading-snug line-clamp-2 text-white group-hover:text-amber-300 transition-colors drop-shadow">
                                    Tổng rà soát hệ thống văn bản quy phạm pháp luật tỉnh Lào Cai
                                </h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LaoCaiV2NewlyIssuedDocs;

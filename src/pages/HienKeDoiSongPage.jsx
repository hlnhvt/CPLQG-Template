import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { Section } from './HienKeShared';

const HienKeDoiSongPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
            {/* Hero Banner with Background */}
            <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                {/* Subtle gold shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-20">
                    <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] mb-6">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90">Hiến kế của bạn</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">Hiến kế</span> của bạn
                    </h1>
                    <p className="text-blue-100/90 text-[15px] max-w-2xl leading-relaxed">
                        Chia sẻ ý kiến, sáng kiến của bạn góp phần nâng cao chất lượng, hiệu quả công tác xây dựng, tổ chức thi hành pháp luật trên toàn diện các lĩnh vực nhằm thúc đẩy phát triển kinh tế - xã hội của đất nước.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <Section
                    id="section-life"
                    icon={Heart}
                    color="#16a34a"
                    title="Hiến kế của bạn"
                    subtitle="Đóng góp ý kiến về các lĩnh vực thiết yếu từ y tế, giáo dục, nhà ở đến việc làm."
                    viewAllTo="/hien-ke/doi-song"
                >
                    {/* CTA Banner Daily Life */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mb-4">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-green-200 text-green-700 rounded-full flex items-center justify-center shrink-0">
                                <Heart size={28} />
                            </div>
                            <div>
                                <h3 className="text-[20px] font-bold text-gray-900 mb-2">Chia sẻ vấn đề đời sống của bạn</h3>
                                <p className="text-gray-700 max-w-2xl leading-relaxed text-[15px]">
                                    Mọi ý kiến đóng góp của bạn về các vấn đề dân sinh, sức khoẻ, giáo dục, hạ tầng giao thông... đều được tổng hợp và phân tích để chuyển tới các cơ quan chức năng, nhằm xây dựng môi trường sống thiết thực và tốt đẹp hơn.
                                </p>
                            </div>
                        </div>
                        <Link to="/hien-ke/gop-y-nhanh?topic=doi-song" className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shrink-0 text-[15px] flex items-center gap-2">
                            Bắt đầu góp ý <ArrowRight size={16} />
                        </Link>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default HienKeDoiSongPage;

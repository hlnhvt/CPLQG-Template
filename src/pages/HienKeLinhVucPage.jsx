import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Scale, Search, Heart, ArrowRight } from 'lucide-react';
import { Section, LIFE_CATEGORIES } from './HienKeShared';

const HienKeLinhVucPage = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(q);

    useEffect(() => {
        setSearchTerm(q);
    }, [q]);

    const filteredCategories = LIFE_CATEGORIES.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
                        <span className="text-white/90">Có thể bạn quan tâm</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Có thể bạn quan tâm                    </h1>
                    <p className="text-blue-100/90 text-[15px] max-w-2xl leading-relaxed">
                        Mỗi ý kiến, sáng kiến của bạn trong từng lĩnh vực pháp luật là góc nhìn đa chiều để công tác xây dựng, tổ chức thi hành pháp luật tiếp tục được hoàn thiện.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <Section
                    id="section-legal"
                    icon={Scale}
                    color="#7c3aed"
                    title="Lựa chọn lĩnh vực bạn quan tâm"
                    subtitle="Bao gồm các lĩnh vực gợi ý để bạn dễ dàng tham gia đóng góp."
                >
                    <div className="mb-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-end mb-4">
                            <div className="relative w-full sm:w-64">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm lĩnh vực..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:bg-white transition-all text-[13px]"
                                />
                            </div>
                        </div>

                        {filteredCategories.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {filteredCategories.map(c => (
                                    <Link
                                        key={c.id}
                                        to={`/hien-ke/gop-y-nhanh?domain=${encodeURIComponent(c.name)}`}
                                        className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-[#7c3aed] hover:bg-purple-50 hover:-translate-y-1 hover:shadow-md transition-all group duration-300"
                                    >
                                        <c.icon size={32} strokeWidth={1.25} className="mb-1 text-purple-400 group-hover:text-[#7c3aed] group-hover:scale-110 transition-all duration-300" />
                                        <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#7c3aed] leading-tight px-1">{c.name}</span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500 text-[14px]">
                                Không tìm thấy tiêu đề phù hợp với "{searchTerm}"
                            </div>
                        )}

                        {/* CTA Block: Share your hien ke */}
                        <div className="mt-8 bg-green-50/50 border border-green-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                    <Heart size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">Chia sẻ hiến kế của bạn</h3>
                                    <p className="text-gray-600 max-w-2xl leading-relaxed text-[15px]">
                                        Mọi ý kiến đóng góp của bạn về các vấn đề dân sinh, sức khoẻ, giáo dục, hạ tầng giao thông... đều được tổng hợp và phân tích để chuyển tới các cơ quan chức năng, nhằm xây dựng môi trường sống thiết thực và tốt đẹp hơn.
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/hien-ke/gop-y-nhanh"
                                className="px-8 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-600/20 shrink-0 text-[15px] flex items-center gap-2 group"
                            >
                                Bắt đầu góp ý
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default HienKeLinhVucPage;

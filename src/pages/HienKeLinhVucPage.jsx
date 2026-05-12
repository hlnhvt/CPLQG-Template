import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Scale, Search, Heart, ArrowRight, Flame, Info, ChevronUp, ChevronDown, Grid, Lightbulb, UserCheck } from 'lucide-react';
import { Section, LIFE_CATEGORIES } from './HienKeShared';

const HienKeLinhVucPage = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(q);
    const [isIntroOpen, setIsIntroOpen] = useState(false);

    useEffect(() => {
        setSearchTerm(q);
    }, [q]);

    // Filter then sort: hot categories first
    const filteredCategories = useMemo(() => {
        const filtered = LIFE_CATEGORIES.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return [...filtered].sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
    }, [searchTerm]);

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
                    <p className="text-blue-100/90 text-[15px] leading-relaxed">
                        Gợi ý các chủ đề, nội dung để người dân, doanh nghiệp hiến kế, góp ý theo từng lĩnh vực pháp luật cụ thể.
                    </p>

                    {/* Leadership Quote */}
                    <div className="mt-8 w-full">
                        <div className="relative group text-center">
                            <div className="relative z-10">
                                <p className="text-white/95 text-[15px] md:text-[18px] italic leading-relaxed font-medium mb-4">
                                    "Đột phá mạnh mẽ hơn về thể chế phát triển, tháo gỡ điểm nghẽn, rào cản; lấy thực tiễn làm thước đo, khơi thông mọi nguồn lực <br />đưa đất nước bước vào kỷ nguyên mới."
                                </p>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-[2px] bg-amber-400/50 rounded-full mb-1" />
                                    <span className="text-amber-200 text-[13px] font-bold uppercase tracking-widest">Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsIntroOpen(!isIntroOpen)}
                        className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[14px] font-medium transition-colors border border-white/20 backdrop-blur-sm"
                    >
                        <Info size={16} />
                        Giới thiệu
                        {isIntroOpen ? <ChevronUp size={16} className="ml-1 opacity-70" /> : <ChevronDown size={16} className="ml-1 opacity-70" />}
                    </button>
                </div>
            </div>

            <div className="mt-8 container mx-auto px-4 md:px-8 max-w-[1280px]">
                {isIntroOpen && (
                    <div className="mb-10 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 text-gray-700 leading-relaxed animate-fadeIn shadow-2xl shadow-blue-900/10 relative overflow-hidden">
                        {/* Dong Son Drum Background Decoration */}
                        <div
                            className="absolute inset-0 bg-no-repeat opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: "url('/images/dong_son_cover.png')", backgroundSize: '140%', backgroundPosition: 'center -220px' }}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="text-center mb-10 max-w-3xl mx-auto">
                                <h4 className="text-[26px] md:text-[32px] font-bold mb-4 leading-tight">
                                    Có thể bạn quan tâm
                                </h4>
                                <div className="w-20 h-1.5 bg-black/70 mx-auto rounded-full mb-6"></div>
                                <p className="text-gray-600 text-[17px] italic font-medium">
                                    Mỗi ý kiến đóng góp và sáng kiến thiết thực trong từng lĩnh vực pháp luật cụ thể đều mang lại những góc nhìn đa chiều từ thực tiễn, qua đó đóng vai trò là cơ sở quan trọng để công tác xây dựng, thi hành pháp luật không ngừng được đổi mới và ngày càng hoàn thiện hơn.
                                </p>
                            </div>



                            {/* Content Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                        Định hướng
                                    </h5>
                                    <p className="text-[14px] leading-relaxed text-gray-700">
                                        Đẩy mạnh việc tham gia của cộng đồng theo từng mảng chuyên biệt như: Kinh tế, Dân sự, Hình sự, Hành chính... nhằm nâng cao tính chuyên môn hóa trong lập pháp.
                                    </p>
                                </div>

                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                        Mục tiêu cốt lõi
                                    </h5>
                                    <ul className="text-[14px] space-y-2 text-gray-700">
                                        <li className="flex gap-2"><span>•</span> Cung cấp dữ liệu đầy đủ về hiện trạng sửa đổi từng lĩnh vực.</li>
                                        <li className="flex gap-2"><span>•</span> Tạo môi trường để các chuyên gia đầu ngành gửi gắm tâm huyết.</li>
                                        <li className="flex gap-2"><span>•</span> Đảm bảo không bỏ sót bất kỳ góc cạnh pháp lý nào.</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                        Kết nối chuyên sâu
                                    </h5>
                                    <p className="text-[14px] leading-relaxed text-gray-700">
                                        Hệ thống sử dụng các thuật toán phân loại thông minh để chuyển hiến kế của bạn đến đúng đơn vị chuyên môn phụ trách, đảm bảo tính thấu đáo trong xử lý.
                                    </p>
                                </div>
                            </div>

                            {/* Leadership Quote Section */}
                            <div className="max-w-4xl mx-auto relative">
                                <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl border border-purple-100/50 shadow-inner text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-purple-200/30 transition-all duration-700" />
                                    <p className="text-[17px] md:text-[19px] text-gray-800 italic leading-relaxed relative z-10 mb-4 font-medium">
                                        "Đột phá mạnh mẽ hơn về thể chế phát triển, tháo gỡ điểm nghẽn, rào cản; lấy thực tiễn làm thước đo, khơi thông mọi nguồn lực đưa đất nước bước vào kỷ nguyên mới."
                                    </p>
                                    <div className="w-12 h-0.5 bg-purple-300 mx-auto mb-4" />
                                    <footer className="text-purple-900 font-bold text-[14px] uppercase relative z-10">
                                        — Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng —
                                    </footer>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>

            <div className="mt-0">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {filteredCategories.map(c => (
                                    <Link
                                        key={c.id}
                                        to={`/hien-ke/linh-vuc/danh-sach?domain=${encodeURIComponent(c.name)}`}
                                        className={`relative flex flex-col items-center text-center gap-2 p-4 rounded-xl border transition-all group duration-300 hover:-translate-y-1 hover:shadow-md ${c.isHot
                                            ? 'border-orange-200 bg-gradient-to-b from-orange-50 to-amber-50/50 ring-2 ring-orange-400 ring-offset-2 hover:border-orange-400 hover:bg-orange-50'
                                            : 'border-gray-100 bg-gray-50 hover:border-[#7c3aed] hover:bg-purple-50'
                                            }`}
                                    >
                                        {/* "Đang được quan tâm" badge */}
                                        {c.isHot && (
                                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 border-2 border-white whitespace-nowrap">
                                                <Flame size={10} fill="currentColor" strokeWidth={2} /> Đang được quan tâm
                                            </div>
                                        )}
                                        <c.icon
                                            size={32}
                                            strokeWidth={1.25}
                                            className={`mb-1 transition-all duration-300 group-hover:scale-110 ${c.isHot
                                                ? 'text-orange-500 group-hover:text-orange-600'
                                                : 'text-purple-400 group-hover:text-[#7c3aed]'
                                                }`}
                                        />
                                        <span className={`text-[13px] font-semibold leading-tight px-1 ${c.isHot
                                            ? 'text-orange-700 group-hover:text-orange-800'
                                            : 'text-gray-700 group-hover:text-[#7c3aed]'
                                            }`}>{c.name}</span>
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
                                        Mọi ý kiến, sáng kiến của người dân, doanh nghiệp trên toàn diện các lĩnh vực được tiếp nhận, phân loại, nghiên cứu, xử lý góp phần xây dựng đất nước giàu đẹp, văn minh, hiện đại.
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

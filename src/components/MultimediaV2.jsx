import React, { useState } from 'react';
import { Video, FileText, Clock, Play, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MultimediaV2 = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const bannerSlides = [
        {
            title: 'Phát triển nhà ở cho thuê là nhiệm vụ cấp bách',
            image: '/assembly_hall_banner.png',
            to: '/video/1'
        },
        {
            title: 'Khung kiến trúc tổng thể quốc gia số và định hướng phát triển hạ tầng dữ liệu',
            image: '/thumb3.png',
            to: '/infographic/infographic-3'
        },
        {
            title: 'Toàn cảnh Phiên họp thứ 38 của Ủy ban Thường vụ Quốc hội về xây dựng pháp luật',
            image: '/thumb1.png',
            to: '/video/3'
        }
    ];

    const infographicsList = [
        {
            id: 1,
            title: 'Infographic: Tiêu chí tóm tắt các bộ trưởng trong Chính phủ nhiệm kỳ 2026 - 2031',
            image: '/thumb2.png',
            to: '/infographic/infographic-2',
            date: '22/05/2026'
        },
        {
            id: 2,
            title: 'Quy hoạch sử dụng đất quốc gia thời kỳ 2021 - 2030, tầm nhìn đến năm 2050',
            image: '/thumb1.png',
            to: '/infographic/infographic-1',
            date: '20/05/2026'
        },
        {
            id: 3,
            title: 'Chính sách hỗ trợ chi phí học tập và học bổng cho học sinh, sinh viên năm 2026',
            image: '/thumb2.png',
            to: '/infographic/infographic-2',
            date: '18/05/2026'
        },
        {
            id: 4,
            title: 'Quy trình đăng ký thành lập doanh nghiệp trực tuyến qua Cổng Dịch vụ công Quốc gia',
            image: '/thumb1.png',
            to: '/infographic/infographic-4',
            date: '16/05/2026'
        }
    ];

    const videosList = [
        {
            id: 1,
            title: 'Chính sách hỗ trợ học nghề đối với người lao động đang hưởng trợ cấp thất nghiệp',
            image: '/thumb1.png',
            to: '/video/1',
            date: '21/05/2026'
        },
        {
            id: 2,
            title: 'Lương giáo viên tăng thực tế từ 600.000 đồng đến 3 triệu đồng',
            image: '/thumb2.png',
            to: '/video/2',
            date: '19/05/2026'
        },
        {
            id: 3,
            title: 'Phát huy vai trò mô hình tự quản trong cộng đồng về an toàn thực phẩm',
            image: '/thumb3.png',
            to: '/video/3',
            date: '17/05/2026'
        },
        {
            id: 4,
            title: 'Phát triển nhà ở cho thuê là nhiệm vụ cấp bách',
            image: '/thumb1.png',
            to: '/video/4',
            date: '14/05/2026'
        }
    ];

    const handlePrevSlide = (e) => {
        e.preventDefault();
        setSlideIndex(prev => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const handleNextSlide = (e) => {
        e.preventDefault();
        setSlideIndex(prev => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="mt-8 py-6 md:py-8 text-white font-sans relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(15, 71, 158) 0%, rgb(69, 114, 187) 35%, rgb(42, 47, 127) 65%, rgb(71, 87, 129) 100%)' }}>
            {/* Glowing neon mesh backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none z-0"></div>

            {/* Hoa văn hình học trang trí (Geometric patterns) */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border-[1px] border-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border-[2px] border-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full border-[1px] border-white/5 translate-y-1/3 -translate-x-1/4 pointer-events-none z-0"></div>

            {/* Subtle digital dot-matrix background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-80 pointer-events-none z-0"></div>

            {/* Faint drum pattern overlay (Hình trống đồng mờ mờ) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.85] pointer-events-none z-0 overflow-hidden mix-blend-overlay">
                <img
                    src="/trong_dong_bg.png"
                    alt="Trống đồng mờ"
                    className="w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] max-w-none object-cover animate-[spin_240s_linear_infinite]"
                />
            </div>

            <div className="container mx-auto px-4 max-w-[1504px] relative z-10">

                {/* 1. Thanh Tiêu Đề Trên Cùng (Header Row) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-8">
                    <div className="flex items-center gap-2.5">

                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                            Multimedia
                        </h2>
                    </div>
                    {/* Danh mục con liên kết bên phải */}
                    <div className="flex items-center gap-3 md:gap-4 text-[13px] md:text-[14px] font-bold text-white">
                        <Link to="/video" className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                                <Play size={12} className="text-white fill-white ml-0.5" />
                            </div>
                            <span className="tracking-wide">Video</span>
                        </Link>
                        <Link to="/infographic" className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                                <FileText size={12} className="text-white" />
                            </div>
                            <span className="tracking-wide">Infographic</span>
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-4">

                    {/* Main Big Item (Left) - Col span 5 */}
                    <div className="lg:col-span-5 flex flex-col group cursor-pointer relative top-0 hover:-top-1 transition-all duration-300">
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] mb-5">
                            <img
                                src={bannerSlides[0].image}
                                alt={bannerSlides[0].title}
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                            />

                            {/* Cinematic Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>

                            {/* Center Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/40 border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-600/90 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.8)]">
                                    <Play size={28} className="text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl md:text-[22px] font-bold text-white leading-snug mb-3 group-hover:text-blue-300 transition-colors flex items-start gap-2 drop-shadow-md">
                            <Video size={24} className="shrink-0 mt-0.5 text-white fill-white/20" />
                            <span>{bannerSlides[0].title}</span>
                        </h3>
                        <p className="text-white/80 text-[14px] md:text-[15px] line-clamp-3 leading-relaxed font-medium">
                            Nội dung chi tiết của video hoặc bài viết tiêu điểm, phản ánh những thông tin nóng hổi và quan trọng nhất trong ngày, được cập nhật liên tục...
                        </p>
                    </div>

                    {/* Right Grid (6 items) - Col span 7 */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                        {videosList.concat(infographicsList).slice(0, 6).map((item, index) => (
                            <Link to={item.to} key={index} className="flex flex-col group relative top-0 hover:-top-1 transition-all duration-300">
                                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden shadow-lg mb-3">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Play Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center z-10">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                                            <Play size={16} className="fill-white ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-semibold text-white/95 text-[14px] leading-snug line-clamp-3 group-hover:text-blue-300 transition-colors flex gap-1.5 items-start drop-shadow-sm">
                                    {index < videosList.length ? (
                                        <Video size={16} className="shrink-0 mt-0.5 text-white fill-white/20" />
                                    ) : (
                                        <FileText size={16} className="shrink-0 mt-0.5 text-white fill-white/20" />
                                    )}
                                    <span>{item.title}</span>
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MultimediaV2;

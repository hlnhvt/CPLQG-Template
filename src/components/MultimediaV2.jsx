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
                            <span className="tracking-wide">Infographics</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Slider Banner Lớn Siêu To Khổng Lồ (Hero Banner) */}
                <div className="relative w-full aspect-[21/9] md:aspect-[32/9] max-h-[300px] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10 group mb-6">
                    <img
                        src={bannerSlides[slideIndex].image}
                        alt={bannerSlides[slideIndex].title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                    />

                    {/* Shadow overlays on left/right/bottom for cinematic depth */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none"></div>

                    {/* Left/Right Slider Arrow Controls */}
                    <button
                        onClick={handlePrevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-lg border border-white/15 hover:border-white/35 transition-all outline-none"
                    >
                        <span className="text-lg md:text-xl font-bold -mt-0.5">&lt;</span>
                    </button>
                    <button
                        onClick={handleNextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-lg border border-white/15 hover:border-white/35 transition-all outline-none"
                    >
                        <span className="text-lg md:text-xl font-bold -mt-0.5">&gt;</span>
                    </button>

                    {/* Clean Text Overlay at Bottom Center without box */}
                    <Link
                        to={bannerSlides[slideIndex].to}
                        className="absolute bottom-0 inset-x-0 px-6 pb-6 pt-10 md:px-12 md:pb-8 z-20 flex flex-row items-end gap-4 md:gap-6 group/title transition-all duration-300"
                    >
                        {/* Round Play Button */}
                        <div className="relative flex items-center justify-center shrink-0 mb-1">
                            <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-blue-500/20 rounded-full animate-ping duration-1000 pointer-events-none"></div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-400/20 group-hover/title:scale-110 transition-transform">
                                <Play size={16} className="fill-white ml-0.5 text-white" />
                            </div>
                        </div>
                        {/* Heading text */}
                        <div className="flex-grow text-left">
                            <h3 className="font-bold text-white text-lg md:text-2xl leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-2 group-hover/title:text-blue-200 transition-colors">
                                {bannerSlides[slideIndex].title}
                            </h3>
                            {/* Dots indicator */}
                            <div className="flex items-center gap-2 mt-2 md:mt-3">
                                {bannerSlides.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === slideIndex ? 'bg-blue-400 w-6' : 'bg-white/40 w-2 hover:bg-white/60'}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 3. Lưới 2 Cột Chuyên Mục Song Song Phía Dưới */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">

                    {/* VIDEO COLUMN */}
                    <div className="flex flex-col">
                        {/* Section Header */}
                        <Link
                            to="/video"
                            className="flex items-center gap-2 pb-2 mb-4 border-b-2 border-blue-500 w-fit hover:opacity-85 transition"
                        >
                            <Play size={14} className="text-blue-400 fill-blue-400 shrink-0" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                Video nổi bật
                            </h3>
                        </Link>

                        {/* Featured Video Card (Made smaller & side-by-side horizontally) */}
                        <Link
                            to={videosList[0].to}
                            className="group flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 rounded-xl md:rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        >
                            <div className="relative w-full sm:w-[160px] md:w-[180px] aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0 bg-slate-950">
                                <img
                                    src={videosList[0].image}
                                    alt={videosList[0].title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                                />
                                {/* Play overlay icon */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
                                    <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-all duration-300 border border-white/20">
                                        <Play size={14} className="fill-white ml-0.5 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between py-1 flex-grow">
                                <div>
                                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md mb-2 uppercase tracking-wider">
                                        Tiêu điểm
                                    </span>
                                    <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-xs md:text-sm lg:text-base leading-snug line-clamp-2">
                                        {videosList[0].title}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400">
                                    <Clock size={12} />
                                    <span>{videosList[0].date}</span>
                                </div>
                            </div>
                        </Link>

                        {/* Horizontal list of 3 sub-videos */}
                        <div className="flex flex-col gap-2.5">
                            {videosList.slice(1).map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.to}
                                    className="flex gap-4 p-3 group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl items-center transition duration-300"
                                >
                                    <div className="relative w-20 md:w-24 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 shrink-0 bg-slate-950">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                                            <div className="bg-blue-600 text-white rounded-full p-1.5 shadow-md">
                                                <Play size={10} className="fill-white ml-0.5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h5 className="font-semibold text-white text-xs md:text-sm leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h5>
                                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                                            <Clock size={10} />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* INFOGRAPHIC COLUMN */}
                    <div className="flex flex-col">
                        {/* Section Header */}
                        <Link
                            to="/infographic"
                            className="flex items-center gap-2 pb-2 mb-4 border-b-2 border-cyan-500 w-fit hover:opacity-85 transition"
                        >
                            <FileText size={14} className="text-cyan-400 shrink-0" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                Infographic nổi bật
                            </h3>
                        </Link>

                        {/* Featured Infographic Card */}
                        <Link
                            to={infographicsList[0].to}
                            className="group flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 rounded-xl md:rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        >
                            <div className="relative w-full sm:w-[160px] md:w-[180px] aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0 bg-slate-950">
                                <img
                                    src={infographicsList[0].image}
                                    alt={infographicsList[0].title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex flex-col justify-between py-1 flex-grow">
                                <div>
                                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2 uppercase tracking-wider">
                                        Tiêu điểm
                                    </span>
                                    <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-xs md:text-sm lg:text-base leading-snug line-clamp-2">
                                        {infographicsList[0].title}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400">
                                    <Clock size={12} />
                                    <span>{infographicsList[0].date}</span>
                                </div>
                            </div>
                        </Link>

                        {/* Horizontal list of 3 sub-infographics */}
                        <div className="flex flex-col gap-2.5">
                            {infographicsList.slice(1).map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.to}
                                    className="flex gap-4 p-3 group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl items-center transition duration-300"
                                >
                                    <div className="relative w-20 md:w-24 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 shrink-0 bg-slate-950">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h5 className="font-semibold text-white text-xs md:text-sm leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                            {item.title}
                                        </h5>
                                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                                            <Clock size={10} />
                                            <span>{item.date}</span>
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

export default MultimediaV2;

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
        <section className="py-16 bg-gradient-to-br from-[#0c2461] via-[#013aae] to-[#0a2a6f] text-white font-sans relative overflow-hidden">
            {/* Glowing neon mesh backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none -z-10"></div>
            {/* Subtle digital dot-matrix background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-60 pointer-events-none -z-10"></div>

            {/* Faint drum pattern overlay (Hình trống đồng mờ mờ) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none -z-10 overflow-hidden">
                <img 
                    src="/trong_dong_bg.png" 
                    alt="Trống đồng mờ" 
                    className="w-[800px] h-[800px] object-contain animate-[spin_180s_linear_infinite]" 
                />
            </div>

            <div className="container mx-auto px-4 max-w-[1504px]">

                {/* 1. Thanh Tiêu Đề Trên Cùng (Header Row) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-8">
                    <div className="flex items-center gap-2.5">
                        <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Sparkles size={18} className="animate-pulse" />
                        </span>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                            Multimedia
                        </h2>
                    </div>
                    {/* Danh mục con liên kết bên phải */}
                    <div className="flex items-center gap-5 text-[12.5px] md:text-sm font-bold text-slate-300">
                        <Link to="/video" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                            <Play size={12} className="text-blue-400 fill-blue-400 shrink-0" />
                            <span>Video</span>
                        </Link>
                        <Link to="/infographic" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                            <FileText size={13} className="text-cyan-400 shrink-0" />
                            <span>Infographics</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Khung Cinematic Hero Slider Khổng Lồ */}
                <div className="relative w-full aspect-[21/9] md:aspect-[24/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10 group mb-12">
                    <img
                        src={bannerSlides[slideIndex].image}
                        alt={bannerSlides[slideIndex].title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                    />

                    {/* Shadow overlays on left/right for cinematic depth */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none"></div>

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

                    {/* Big Glassmorphic Overlay Banner at Bottom Center */}
                    <Link
                        to={bannerSlides[slideIndex].to}
                        className="absolute bottom-6 inset-x-6 md:inset-x-12 z-20 backdrop-blur-md bg-slate-900/60 border border-white/15 rounded-2xl p-4 md:p-6 flex flex-row items-center gap-4 md:gap-6 shadow-2xl hover:bg-slate-900/70 transition-all duration-300"
                    >
                        {/* Round Play Button */}
                        <div className="relative flex items-center justify-center shrink-0">
                            <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-blue-500/20 rounded-full animate-ping duration-1000 pointer-events-none"></div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border border-blue-400/20">
                                <Play size={16} className="fill-white ml-0.5 text-white" />
                            </div>
                        </div>
                        {/* Heading text */}
                        <div className="flex-grow text-left">
                            <h3 className="font-extrabold text-white text-sm md:text-2xl leading-snug drop-shadow-md line-clamp-1">
                                {bannerSlides[slideIndex].title}
                            </h3>
                            {/* Dots indicator */}
                            <div className="flex items-center gap-1.5 mt-2 md:mt-3">
                                {bannerSlides.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? 'bg-blue-400 w-4' : 'bg-white/30'}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 3. Lưới 2 Cột Chuyên Mục Song Song Phía Dưới */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">

                    {/* VIDEO COLUMN */}
                    <div className="flex flex-col">
                        {/* Section Header */}
                        <Link
                            to="/video"
                            className="flex items-center gap-2 pb-2 mb-6 border-b-2 border-blue-500 w-fit hover:opacity-85 transition"
                        >
                            <Play size={14} className="text-blue-400 fill-blue-400 shrink-0" />
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                Video nổi bật
                            </h3>
                        </Link>

                        {/* Featured Video Card (Made smaller & side-by-side horizontally) */}
                        <Link
                            to={videosList[0].to}
                            className="group flex flex-col sm:flex-row gap-4 mb-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-4 shadow-lg"
                        >
                            <div className="relative w-full sm:w-[200px] aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0 bg-slate-950">
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
                                    <h4 className="font-extrabold text-white group-hover:text-blue-400 transition-colors text-xs md:text-sm lg:text-base leading-snug line-clamp-2">
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
                        <div className="flex flex-col gap-3">
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
                                        <h5 className="font-bold text-white text-xs md:text-sm leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
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
                            className="flex items-center gap-2 pb-2 mb-6 border-b-2 border-cyan-500 w-fit hover:opacity-85 transition"
                        >
                            <FileText size={14} className="text-cyan-400 shrink-0" />
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                Infographic nổi bật
                            </h3>
                        </Link>

                        {/* Featured Infographic Card (Made smaller & side-by-side horizontally) */}
                        <Link
                            to={infographicsList[0].to}
                            className="group flex flex-col sm:flex-row gap-4 mb-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-4 shadow-lg"
                        >
                            <div className="relative w-full sm:w-[200px] aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0 bg-slate-950">
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
                                    <h4 className="font-extrabold text-white group-hover:text-cyan-400 transition-colors text-xs md:text-sm lg:text-base leading-snug line-clamp-2">
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
                        <div className="flex flex-col gap-3">
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
                                        <h5 className="font-bold text-white text-xs md:text-sm leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
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

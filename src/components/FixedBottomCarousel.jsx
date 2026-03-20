import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_ITEMS = [
    {
        id: 2,
        type: 'image',
        src: '/BO NHAN DIEN TONG RA SOAT/800x150.Banner chay.jpg',
        alt: 'Đưa Nghị Quyết Đại Hội XIV Vào Cuộc Sống'
    },
    {
        id: 3,
        type: 'html',
        content: (
            <div className="w-full h-full overflow-hidden border border-white bg-gradient-to-r from-[#25D0FF] to-[#1E00C8] flex flex-row items-stretch p-1.5 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative select-none pointer-events-none">
                {/* Left Image Thumbnail */}
                <div className="w-[45%] h-full rounded-lg overflow-hidden shrink-0 bg-white shadow-sm border border-white/20">
                    <img src="https://picsum.photos/400/250" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                {/* Right Content */}
                <div className="w-[55%] flex flex-col justify-center pl-4 pr-2 relative text-white">
                    {/* Badge */}
                    <div className="absolute top-1 right-1 bg-red-600 text-[10px] sm:text-[11px] px-2.5 py-1 rounded shadow-sm font-bold uppercase tracking-wide whitespace-nowrap z-10">
                        NGHỊ QUYẾT SỐ 66-NQ/TW
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg font-bold leading-snug line-clamp-3 mt-5 drop-shadow-sm">
                        5 điểm nổi bật về công tác pháp luật trong kết luận của Tổng Bí thư Tô Lâm, Trưởng Ban C...
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 4,
        type: 'html',
        content: (
            <div className="w-full h-full overflow-hidden border border-white bg-gradient-to-r from-[#25D0FF] to-[#1E00C8] flex flex-row items-stretch p-1.5 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative group select-none pointer-events-none">
                <div className="w-[45%] h-full rounded-lg overflow-hidden shrink-0 bg-white shadow-sm border border-white/20">
                    <img src="https://picsum.photos/400/250?random=1" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="w-[55%] flex flex-col justify-center pl-4 pr-2 relative text-white">
                    <div className="absolute top-1 right-1 bg-red-600 text-[10px] sm:text-[11px] px-2.5 py-1 rounded shadow-sm font-bold uppercase tracking-wide whitespace-nowrap z-10">
                        CHÍNH SÁCH MỚI
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg font-bold leading-snug line-clamp-3 mt-5 drop-shadow-sm">
                        Chính phủ ban hành Nghị định mới về phát triển công nghệ thông tin và trí tuệ nhân tạo
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 5,
        type: 'html',
        content: (
            <div className="w-full h-full overflow-hidden border border-white bg-gradient-to-r from-[#25D0FF] to-[#1E00C8] flex flex-row items-stretch p-1.5 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative group select-none pointer-events-none">
                <div className="w-[45%] h-full rounded-lg overflow-hidden shrink-0 bg-white shadow-sm border border-white/20">
                    <img src="https://picsum.photos/400/250?random=2" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="w-[55%] flex flex-col justify-center pl-4 pr-2 relative text-white">
                    <div className="absolute top-1 right-1 bg-red-600 text-[10px] sm:text-[11px] px-2.5 py-1 rounded shadow-sm font-bold uppercase tracking-wide whitespace-nowrap z-10">
                        THÔNG BÁO
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg font-bold leading-snug line-clamp-3 mt-5 drop-shadow-sm">
                        Kết luận của Hội đồng đánh giá và thẩm định về hệ thống pháp luật hiện hành
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 6,
        type: 'html',
        content: (
            <div className="w-full h-full overflow-hidden border border-white bg-gradient-to-r from-[#25D0FF] to-[#1E00C8] flex flex-row items-stretch p-1.5 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative group select-none pointer-events-none">
                <div className="w-[45%] h-full rounded-lg overflow-hidden shrink-0 bg-white shadow-sm border border-white/20">
                    <img src="https://picsum.photos/400/250?random=3" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="w-[55%] flex flex-col justify-center pl-4 pr-2 relative text-white">
                    <div className="absolute top-1 right-1 bg-red-600 text-[10px] sm:text-[11px] px-2.5 py-1 rounded shadow-sm font-bold uppercase tracking-wide whitespace-nowrap z-10">
                        SỰ KIỆN NỔI BẬT
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg font-bold leading-snug line-clamp-3 mt-5 drop-shadow-sm">
                        Khai mạc hội nghị trực tuyến triển khai công tác cải cách thủ tục hành chính các cấp
                    </p>
                </div>
            </div>
        )
    }
];

const FixedBottomCarousel = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance every 5s if visible
    useEffect(() => {
        if (!isVisible) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isVisible]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    };

    if (!isVisible) {
        return (
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] animate-fadeIn">
                <button 
                    onClick={() => setIsVisible(true)}
                    className="bg-[#1a3673] hover:bg-[#0f2350] text-white w-[300px] h-8 rounded-t-xl shadow-[0_-5px_15px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 transition-colors border border-cyan-400 border-b-0 cursor-pointer"
                >
                    <span className="text-xs font-bold uppercase tracking-wide">Cổng Pháp Luật Quốc Gia</span>
                    <ChevronUp size={16} className="animate-bounce" />
                </button>
            </div>
        );
    }

    const renderItemContent = (item) => {
        if (item.type === 'image') {
            return <img src={item.src} alt={item.alt} className="w-full h-full object-fill rounded-xl shadow-md border border-cyan-400/50 select-none pointer-events-none" draggable={false} />;
        }
        return item.content;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#2585f9]/70 backdrop-blur-md border-t border-cyan-400/50 z-[100] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] py-2 transition-all duration-500 flex flex-col items-center animate-fadeIn">
            {/* Toggle Button Container */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <button 
                    onClick={() => setIsVisible(false)}
                    className="bg-[#1a3673] hover:bg-[#0f2350] text-white px-8 h-8 rounded-t-xl flex flex-col items-center justify-center border-2 border-cyan-400 border-b-0 shadow-[0_-4px_10px_rgba(0,0,0,0.15)] group transition-all cursor-pointer"
                    title="Ẩn thông tin"
                >
                    <ChevronDown size={18} className="text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                    <span className="sr-only">Ẩn</span>
                </button>
            </div>

            <div className="relative w-full flex items-center justify-center overflow-hidden h-[120px] md:h-[195px] [perspective:1000px]">
                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrev}
                    className="absolute left-2 md:left-8 z-[120] w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/40 border-2 border-white/50 text-white flex items-center justify-center backdrop-blur shadow-[0_3px_10px_rgba(0,0,0,0.3)] transition-all hover:scale-110"
                >
                    <ChevronLeft size={20} className="ml-[-2px]" />
                </button>

                {/* Carousel Tracks - 3D Effect Mapping */}
                <div className="relative w-full h-full flex justify-center items-center">
                    {CAROUSEL_ITEMS.map((item, index) => {
                        let offset = (index - currentIndex) % CAROUSEL_ITEMS.length;
                        if (offset < 0) offset += CAROUSEL_ITEMS.length;
                        if (offset > CAROUSEL_ITEMS.length / 2) offset -= CAROUSEL_ITEMS.length;

                        let style = { 
                            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                            height: '100%',
                            maxHeight: '146px'
                        };
                        let zIndex = 0;
                        let className = "absolute top-1/2 w-[85%] sm:w-[70%] lg:w-[756px] rounded-xl cursor-pointer ";
                        
                        if (offset === 0) {
                            // Center Current Item
                            style.transform = 'translate(-50%, -50%) scale(1)';
                            style.left = '50%';
                            style.filter = 'brightness(1)';
                            zIndex = 100; // cao nhất, đè lên các bản ghi khác
                            className += " opacity-100 shadow-[0_10px_35px_rgba(0,0,0,0.5)] cursor-default";
                        } else if (offset === -1) {
                            // Left Previous Item
                            style.transform = 'translate(-50%, -50%) scale(0.85)';
                            style.left = '20%'; // đẩy qua trái, đè một phần bên dưới center
                            style.filter = 'brightness(0.65)';
                            zIndex = 50; 
                            className += " opacity-90 hidden md:block hover:opacity-100";
                        } else if (offset === 1) {
                            // Right Next Item
                            style.transform = 'translate(-50%, -50%) scale(0.85)';
                            style.left = '80%'; // đẩy qua phải, đè một phần bên dưới center
                            style.filter = 'brightness(0.65)';
                            zIndex = 50;
                            className += " opacity-90 hidden md:block hover:opacity-100";
                        } else {
                            // Hidden seamlessly
                            style.transform = 'translate(-50%, -50%) scale(0.5)';
                            style.left = '50%';
                            style.filter = 'brightness(0) blur(5px)';
                            zIndex = 0;
                            className += " opacity-0 pointer-events-none";
                        }

                        return (
                            <div 
                                key={item.id} 
                                className={className} 
                                style={{...style, zIndex}}
                                onClick={() => {
                                    if (offset === -1) handlePrev();
                                    if (offset === 1) handleNext();
                                }}
                            >
                                {renderItemContent(item)}
                            </div>
                        )
                    })}
                </div>

                <button 
                    onClick={handleNext}
                    className="absolute right-2 md:right-8 z-[120] w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/40 border-2 border-white/50 text-white flex items-center justify-center backdrop-blur shadow-[0_3px_10px_rgba(0,0,0,0.3)] transition-all hover:scale-110"
                >
                    <ChevronRight size={20} className="mr-[-2px]" />
                </button>
            </div>
            
            <style jsx="true">{`
                .animate-fadeIn {
                    animation: fadeInBottom 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fadeInBottom {
                    from { opacity: 0; transform: translateY(100%); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default FixedBottomCarousel;

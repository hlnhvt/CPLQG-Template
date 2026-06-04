import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, X, Volume2, Sparkles } from 'lucide-react';

const tickerItems = [
    {
        id: 'news-1',
        type: 'news',
        typeName: 'Tin tức',
        title: 'Đẩy mạnh chuyển đổi số quốc gia, đặt công tác an ninh trật tự lên hàng đầu trong kỷ nguyên mới',
        link: '/news/1'
    },
    {
        id: 'du-thao-1',
        type: 'du-thao',
        typeName: 'Dự thảo',
        title: 'Dự thảo Luật Đất đai (Sửa đổi): Điểm mới về bồi thường, hỗ trợ, tái định cư cho người dân',
        link: '/du-thao/1'
    },
    {
        id: 'hien-ke-85',
        type: 'hien-ke',
        typeName: 'Hiến kế',
        title: 'Kiến nghị tích hợp thẻ BHYT vào ứng dụng VNeID trong quy trình khám chữa bệnh tuyến xã',
        link: '/hien-ke/HK-2026-085'
    },
    {
        id: 'news-2',
        type: 'news',
        typeName: 'Tin tức',
        title: 'Bộ Tư pháp đề xuất giải pháp tháo gỡ khó khăn về mặt pháp lý cho cộng đồng doanh nghiệp',
        link: '/news/2'
    },
    {
        id: 'du-thao-2',
        type: 'du-thao',
        typeName: 'Dự thảo',
        title: 'Dự thảo Nghị định sửa đổi quy định kiểm soát rủi ro trong lĩnh vực quản lý tài chính công',
        link: '/du-thao/2'
    },
    {
        id: 'hien-ke-30',
        type: 'hien-ke',
        typeName: 'Hiến kế',
        title: 'Đề xuất giải pháp liên thông dữ liệu y tế quốc gia bằng căn cước công dân gắn chip',
        link: '/hien-ke/30'
    }
];

const HighlightTicker = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Check if user has closed the ticker in this session
        const isClosed = sessionStorage.getItem('cplqg_ticker_closed');
        if (isClosed === 'true') {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % tickerItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('cplqg_ticker_closed', 'true');
    };

    if (!isVisible) return null;

    const getBadgeStyle = (type) => {
        switch (type) {
            case 'news':
                return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'du-thao':
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            case 'hien-ke':
                return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
        }
    };

    const activeItem = tickerItems[activeIndex];

    return (
        <div className="w-full bg-gradient-to-r from-[#0f0785] via-[#4c65b9] to-[#0f0785] border-b border-blue-700/50 text-white min-h-[40px] md:min-h-[44px] relative z-40 select-none shadow-[0_2px_15px_rgba(0,100,255,0.15)]">
            <style>{`
                .ticker-item-enter {
                    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slideUpFade {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <div className="w-full max-w-[1350px] mx-auto px-4 h-full relative flex items-center min-h-[40px] md:min-h-[44px]">
                {/* Centered Flipping Area */}
                <div className="w-full flex items-center justify-center relative px-10 py-1.5 h-full overflow-hidden">
                    <div className="flex items-center ticker-item-enter" key={activeItem.id + activeIndex}>
                        <Link
                            to={activeItem.link}
                            className="flex items-center gap-3.5 text-[11px] md:text-[13px] hover:text-amber-400 transition-colors duration-200 group"
                        >
                            <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wide shrink-0 ${getBadgeStyle(activeItem.type)}`}>
                                {activeItem.typeName}
                            </span>
                            <span className="text-gray-100 group-hover:text-amber-300 font-medium transition-colors">
                                {activeItem.title}
                            </span>
                            <span className="text-gray-300 text-[10px] md:text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                                ➔
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right: Dismiss Button */}
            <button
                onClick={handleClose}
                className="absolute right-0 top-0 bottom-0 px-3 md:px-4 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 shrink-0 border-l border-white/10 z-20 flex items-center justify-center"
                title="Đóng thanh thông tin"
            >
                <X size={15} />
            </button>
        </div>
    );
};

export default HighlightTicker;

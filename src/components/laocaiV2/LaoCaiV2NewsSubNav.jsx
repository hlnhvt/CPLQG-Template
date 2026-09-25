import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

export const LAOCAI_V2_NEWS_CATEGORIES = [
    { id: 'tin-hoat-dong', label: 'Tin hoạt động' },
    { id: 'chinh-sach', label: 'Chính sách Lào Cai' },
    { id: 'pbgdpl', label: 'Phổ biến, giáo dục pháp luật' },
    { id: 'doanh-nghiep', label: 'Hỗ trợ doanh nghiệp' },
    { id: 'tro-giup', label: 'Trợ giúp pháp lý' },
    { id: 'tu-phap', label: 'Hoạt động Tư pháp' },
    { id: 'van-ban', label: 'Văn bản & Chính sách mới' },
    { id: 'nghien-cuu', label: 'Nghiên cứu & Trao đổi' },
];

// Thanh chuyên mục tin tức: nổi khối nhẹ bằng đổ bóng, không dính (sticky) để không che nội dung khi đọc
const LaoCaiV2NewsSubNav = ({ activeId }) => {
    const scrollRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 4);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateArrows();
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, []);

    // Đưa mục đang chọn vào vùng nhìn thấy
    useEffect(() => {
        const el = scrollRef.current?.querySelector('[data-active="true"]');
        el?.scrollIntoView({ block: 'nearest', inline: 'center' });
        updateArrows();
    }, [activeId]);

    const scrollBy = (dx) => scrollRef.current?.scrollBy({ left: dx, behavior: 'smooth' });

    return (
        <div className="relative z-10 bg-white border-t-[3px] border-[#1e3a8a] shadow-[0_6px_16px_-8px_rgba(15,23,42,0.25)]">
            <div className="container mx-auto px-4 max-w-[1286px]">
                <div className="flex items-center h-14 gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shadow-sm">
                        <Newspaper size={18} />
                    </div>

                    <div className="relative flex-1 min-w-0">
                        {canLeft && (
                            <>
                                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-white to-transparent z-10" />
                                <button
                                    onClick={() => scrollBy(-240)}
                                    aria-label="Cuộn sang trái"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            </>
                        )}

                        <div
                            ref={scrollRef}
                            onScroll={updateArrows}
                            className="flex items-center gap-7 overflow-x-auto whitespace-nowrap px-1"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {LAOCAI_V2_NEWS_CATEGORIES.map((cat) => {
                                const isActive = cat.id === activeId;
                                return (
                                    <Link
                                        key={cat.id}
                                        to={`/lao-cai-v2/tin-tuc/${cat.id}`}
                                        data-active={isActive}
                                        className={`shrink-0 py-2 text-[14px] font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}
                                    >
                                        {cat.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {canRight && (
                            <>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
                                <button
                                    onClick={() => scrollBy(240)}
                                    aria-label="Cuộn sang phải"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaoCaiV2NewsSubNav;

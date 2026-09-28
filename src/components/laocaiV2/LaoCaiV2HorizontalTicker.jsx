import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LAOCAI_TICKER_NEWS = [
    {
        id: 1,
        tag: 'Quy định mới',
        title: 'UBND tỉnh Lào Cai ban hành Quyết định số 61/2024/QĐ-UBND quy định chi tiết về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất',
        link: '/lao-cai-v2/tin-tuc/tin-hoat-dong'
    },
    {
        id: 2,
        tag: 'Kinh tế cửa khẩu',
        title: 'HĐND tỉnh thông qua Nghị quyết ưu đãi đầu tư hạ tầng logistics và thúc đẩy xuất nhập khẩu tại Cửa khẩu quốc tế Lào Cai',
        link: '/lao-cai-v2/tin-tuc/chinh-sach'
    },
    {
        id: 3,
        tag: 'Chính quyền hai cấp',
        title: 'Lào Cai hoàn thành phân cấp, phân quyền cho 99 xã, phường; giải quyết TTHC tư pháp thông suốt ngay tại cơ sở',
        link: '/lao-cai-v2/tin-tuc/tu-phap'
    },
    {
        id: 4,
        tag: 'PBGDPL',
        title: 'Đẩy mạnh tuyên truyền pháp luật lưu động và trợ giúp pháp lý miễn phí cho đồng bào dân tộc thiểu số vùng cao',
        link: '/lao-cai-v2/tin-tuc/pbgdpl'
    },
    {
        id: 5,
        tag: 'Hỗ trợ DN',
        title: 'Hội nghị đối thoại tháo gỡ khó khăn về mặt pháp lý và chính sách thuế cho cộng đồng doanh nghiệp Lào Cai năm 2026',
        link: '/lao-cai-v2/tin-tuc/doanh-nghiep'
    }
];

const LaoCaiV2HorizontalTicker = () => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div className="w-full bg-white border-b border-gray-200/90 shadow-2xs relative z-30 select-none">
            <style>{`
                @keyframes laocaiV2Marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .laocaiV2-marquee-track {
                    display: inline-flex;
                    white-space: nowrap;
                    animation: laocaiV2Marquee 38s linear infinite;
                }
            `}</style>

            <div className="container mx-auto px-4 max-w-[1504px] h-10 sm:h-11 flex items-center">
                {/* Vùng tin tức trôi ngang tràn đều toàn bộ chiều ngang thanh */}
                <div 
                    className="relative w-full h-full overflow-hidden flex items-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Gradient mờ nhẹ 2 đầu giúp tin cuộn vào và ra mềm mại */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div 
                        className="laocaiV2-marquee-track"
                        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    >
                        {[...LAOCAI_TICKER_NEWS, ...LAOCAI_TICKER_NEWS].map((item, idx) => (
                            <Link
                                key={`${item.id}-${idx}`}
                                to={item.link}
                                className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-gray-800 hover:text-[#991b1b] font-medium transition-colors mr-8 group/item shrink-0"
                            >
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 uppercase shrink-0">
                                    {item.tag}
                                </span>
                                <span className="group-hover/item:underline font-normal text-gray-900 group-hover/item:text-[#991b1b] transition-colors">
                                    {item.title}
                                </span>
                                <span className="text-gray-300 ml-4 font-bold select-none">•</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaoCaiV2HorizontalTicker;

import React from 'react';
import { Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Multimedia = () => {
    const rightItems = [
        {
            id: 1,
            type: 'video',
            title: 'Điểm mới nổi bật của Luật Đất đai 2024 ảnh hưởng trực tiếp đến người dân và doanh nghiệp',
            image: '/thumb2.png',
            to: '/video/11'
        },
        {
            id: 2,
            type: 'infographic',
            title: 'Quy trình 5 bước gửi đề xuất hiến kế hoàn thiện quy định pháp luật qua Cổng Quốc gia',
            image: '/thumb3.png',
            to: '/infographic/infographic-2'
        },
        {
            id: 3,
            type: 'infographic',
            title: 'Diễn đàn đối thoại chính sách: Giải pháp tháo gỡ vướng mắc về thủ tục hành chính',
            image: '/thumb1.png',
            to: '/infographic/infographic-3'
        },
        {
            id: 4,
            type: 'infographic',
            title: 'Toàn bộ điểm mới quan trọng của Luật Căn cước có hiệu lực thi hành',
            image: '/thumb2.png',
            to: '/infographic/infographic-1'
        },
        {
            id: 5,
            type: 'video',
            title: 'Tuyên truyền phổ biến pháp luật phòng chống bạo lực học đường và tệ nạn xã hội',
            image: '/thumb1.png',
            to: '/video/4'
        },
        {
            id: 6,
            type: 'video',
            title: 'Lễ công bố và trao giải cuộc thi trực tuyến tìm hiểu Hiến pháp và pháp luật Việt Nam',
            image: '/thumb3.png',
            to: '/video/5'
        }
    ];

    const getTypeIcon = (type, size = 12) => {
        switch (type) {
            case 'video':
                return <Video size={size} className="text-white" />;
            case 'infographic':
                return <FileText size={size} className="text-white" />;
            default:
                return null;
        }
    };

    return (
        <section 
            className="py-12 relative overflow-hidden font-sans text-white" 
            style={{ 
                backgroundColor: "#316ad2"
            }}
        >
            {/* Elegant, faint Trống Đồng pattern background watermark */}
            <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none mix-blend-overlay" 
                style={{ 
                    backgroundImage: "url('/images/dong_son_cover.png')",
                    opacity: 0.04
                }}
            />
            {/* Ambient gold glow to accent the Trống Đồng details */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.05),transparent_40%)] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1504px] relative z-10">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-white/20">
                    <h2 className="text-2xl md:text-[26px] font-bold tracking-tight text-white drop-shadow-sm">
                        Multimedia
                    </h2>

                    {/* Navigation Menu */}
                    <div className="flex items-center gap-3 md:gap-4 mt-4 sm:mt-0 text-[13px] md:text-sm font-semibold text-white/90">
                        <Link to="/infographic" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1">
                            Infographic
                        </Link>
                        <span className="text-white/30 font-light">|</span>
                        <Link to="/video" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1">
                            Video
                        </Link>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Featured Item (Left 5-columns) */}
                    <Link to="/video/3" className="lg:col-span-5 flex flex-col group cursor-pointer text-white hover:text-white">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:shadow-xl transition-all duration-300 mb-4">
                            {/* Category Badge Framed in Top-Left Corner (Icon) */}
                            <div className="absolute top-3 left-3 z-20 w-8 h-8 flex items-center justify-center bg-black/60 backdrop-blur-xs border border-white/20 rounded-md text-white shadow-sm">
                                {getTypeIcon('video', 16)}
                            </div>
                            <img
                                src="/thumb1.png"
                                alt="Tiêu điểm quốc tế"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Play overlay for video */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                                <div className="bg-black/50 rounded-full p-4 backdrop-blur-xs shadow-lg ring-1 ring-white/20 transform group-hover:scale-110 transition-all duration-300">
                                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1.5"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col px-1">
                            <h3 className="font-bold text-white text-[16px] md:text-[18px] leading-snug mb-2 group-hover:text-amber-300 transition-colors">
                                Toàn cảnh Phiên họp thứ 38 của Ủy ban Thường vụ Quốc hội về xây dựng và thi hành pháp luật
                            </h3>
                            <p className="text-white/80 text-[13px] leading-relaxed">
                                Kính mời quý vị theo dõi bản tin truyền hình phản ánh đầy đủ các thảo luận trọng tâm và hoạt động lập pháp nổi bật tại Phiên họp thứ 38 của Ủy ban Thường vụ Quốc hội khóa XV.
                            </p>
                        </div>
                    </Link>

                    {/* Right Items Grid (Right 7-columns) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {rightItems.map((item) => {
                            return (
                                <Link key={item.id} to={item.to} className="flex flex-col group cursor-pointer text-white hover:text-white">
                                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-md border border-white/10 mb-3 group-hover:shadow-lg transition-all duration-300">
                                        {/* Category Badge Framed in Top-Left Corner (Icon) */}
                                        <div className="absolute top-2 left-2 z-20 w-6 h-6 flex items-center justify-center bg-black/60 backdrop-blur-xs border border-white/20 rounded text-white shadow-sm">
                                            {getTypeIcon(item.type, 12)}
                                        </div>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {item.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/25 transition-colors">
                                                <div className="bg-black/40 rounded-full p-2 backdrop-blur-xs">
                                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-0.5">
                                        <h4 className="font-semibold text-white text-[13px] md:text-[13.5px] line-clamp-3 leading-snug group-hover:text-amber-300 transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Multimedia;

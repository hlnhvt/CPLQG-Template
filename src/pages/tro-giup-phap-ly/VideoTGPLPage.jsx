import React, { useEffect, useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Video as VideoIcon, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const VideoTGPLPage = () => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const videos = [
        { id: 1, title: 'Phóng sự: Đưa pháp luật đến với đồng bào vùng sâu vùng xa', date: '12/05/2026', duration: '15:30', cover: 'https://picsum.photos/seed/v1/400/250' },
        { id: 2, title: 'Hướng dẫn thủ tục yêu cầu trợ giúp pháp lý cho người khuyết tật', date: '08/04/2026', duration: '08:45', cover: 'https://picsum.photos/seed/v2/400/250' },
        { id: 3, title: 'Tọa đàm: Nâng cao hiệu quả bảo vệ quyền trẻ em trong tố tụng', date: '25/03/2026', duration: '45:20', cover: 'https://picsum.photos/seed/v3/400/250' },
        { id: 4, title: 'Phim tài liệu: Ánh sáng công lý - Hành trình 25 năm trợ giúp pháp lý', date: '15/02/2026', duration: '28:15', cover: 'https://picsum.photos/seed/v4/400/250' },
        { id: 5, title: 'Kỹ năng tư vấn pháp luật lĩnh vực hôn nhân gia đình', date: '10/01/2026', duration: '52:10', cover: 'https://picsum.photos/seed/v5/400/250' },
        { id: 6, title: 'Bản tin Trợ giúp pháp lý tháng 12/2025', date: '05/01/2026', duration: '12:05', cover: 'https://picsum.photos/seed/v6/400/250' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* HERO SECTION */}
            <div className="bg-[#295fac] text-white pt-10 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                                Truyền thông
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight flex items-center gap-3 uppercase">
                            <VideoIcon size={32} className="text-white" />
                            VIDEO PHÓNG SỰ TGPL
                        </h1>
                        <p className="text-white text-[15px] leading-relaxed border-l-2 border-yellow-400 pl-3 py-0.5 bg-white/10 rounded-r inline-block">
                            Các video phóng sự, tài liệu hướng dẫn và bản tin về hoạt động trợ giúp pháp lý
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Search Bar Block */}
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-5">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm video..."
                                    className="w-full md:flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-blue-400 transition-colors bg-gray-50/50 text-black"
                                />
                                <div className="flex gap-2 w-full md:w-auto shrink-0">
                                    <button className="flex-1 md:flex-none bg-[#1e3a8a] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm">
                                        Tìm kiếm
                                    </button>
                                    <button className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
                                        Xóa
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                                    className="text-blue-600 hover:text-blue-800 text-[13px] font-medium flex items-center gap-1 transition-colors"
                                >
                                    Tìm kiếm nâng cao {isAdvancedSearchOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>

                            {/* Advanced Search Area */}
                            {isAdvancedSearchOpen && (
                                <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-[13px] font-medium text-gray-700">Thời gian</label>
                                            <div className="flex items-center gap-2 max-w-md">
                                                <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-blue-400 text-black bg-white" title="Từ ngày" />
                                                <span className="text-gray-400 px-2">-</span>
                                                <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-blue-400 text-black bg-white" title="Đến ngày" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Videos Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {videos.map(video => (
                                <Link to={`/tro-giup-phap-ly/video/${video.id}`} key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col h-full">
                                    <div className="h-[200px] overflow-hidden bg-gray-100 relative shrink-0">
                                        <img src={video.cover} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-black/60 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                                                <Play size={20} className="text-white ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[12px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-blue-600 line-clamp-3 mb-4 flex-1">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[13px] text-gray-500 mt-auto font-medium">
                                            <Calendar size={15} /> {video.date}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="pt-4 pb-2 flex justify-center items-center gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Trước</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-[#3b82f6] text-white rounded-lg text-[14px] font-bold shadow-sm border border-[#3b82f6]">1</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">2</button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Sau</button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <TGPLSidebar />
                </div>
            </div>
        </div>
    );
};

export default VideoTGPLPage;

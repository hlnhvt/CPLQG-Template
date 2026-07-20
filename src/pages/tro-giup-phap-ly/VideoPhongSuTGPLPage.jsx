import React, { useEffect, useState } from 'react';
import { Video as VideoIcon, PlayCircle, Calendar, Clock, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const VideoPhongSuTGPLPage = () => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev => {
            const newFavs = new Set(prev);
            if (newFavs.has(id)) {
                newFavs.delete(id);
            } else {
                newFavs.add(id);
            }
            return newFavs;
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredVideo = {
        title: 'Test video trợ giúp pháp lý 7/7',
        date: '07/07/2026',
        time: '08:58',
        views: 0,
        dur: '0:02',
        image: 'https://picsum.photos/seed/tgpl1/800/450'
    };

    const videos = [
        { id: 1, title: 'Thảo test video trợ giúp pháp lý 1/7 2', date: '01/07/2026', time: '16:46', views: 72, dur: '0:02' },
        { id: 2, title: 'Thảo test video trợ giúp pháp lý 1/7 1', date: '01/07/2026', time: '16:42', views: 194, dur: '0:02' },
        { id: 3, title: 'Trợ giúp pháp lý: Điểm tựa công lý', date: '15/09/2023', time: '10:15', views: 1205, dur: '12:45' },
        { id: 4, title: 'Hành trình mang pháp luật đến bản làng', date: '22/08/2023', time: '09:30', views: 856, dur: '25:10' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* HERO SECTION */}
            <div className="bg-[#295fac] text-white pt-10 pb-40 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight flex items-center gap-3 uppercase">
                            <VideoIcon size={32} className="text-white" />
                            VIDEO PHÓNG SỰ TGPL
                        </h1>
                        <p className="text-white text-[15px] leading-relaxed border-l-2 border-yellow-400 pl-3 py-0.5 bg-white/10 rounded-r inline-block">
                            Thư viện video phóng sự về trợ giúp pháp lý trên Cổng Pháp luật Quốc gia
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-32 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Featured Video */}
                        <div>
                            <div className="relative rounded-t-xl overflow-hidden shadow-lg bg-black group cursor-pointer aspect-video">
                                <img src={featuredVideo.image} alt={featuredVideo.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                        <PlayCircle size={40} className="text-gray-800 ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 text-white text-[13px] font-medium">
                                    <div className="flex items-center gap-1">
                                        <PlayCircle size={16} /> 0:00 / {featuredVideo.dur}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-b-xl shadow-sm p-5 border border-t-0 border-gray-100">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h2 className="text-xl font-bold text-[#1e3a8a] leading-tight">
                                        {featuredVideo.title}
                                    </h2>
                                    <span className="bg-[#1e3a8a] text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                                        Mới nhất
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-gray-500 w-full">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredVideo.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredVideo.time}</span>
                                    <span>•</span>
                                    <span>{featuredVideo.views} lượt xem</span>
                                    <span>•</span>
                                    <span>Thời lượng {featuredVideo.dur}</span>
                                    <button 
                                        onClick={(e) => toggleFavorite(e, 'featured')}
                                        className="ml-auto p-2 rounded-full hover:bg-red-50 transition-colors group"
                                        title="Đánh dấu yêu thích"
                                    >
                                        <Heart size={18} className={favorites.has('featured') ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-500"} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar Block */}
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-5">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm theo tiêu đề video..." 
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
                                            <div className="flex items-center gap-2">
                                                <input type="date" className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-[13px] outline-none focus:border-blue-400 text-black bg-white" title="Từ ngày" />
                                                <span className="text-gray-400">-</span>
                                                <input type="date" className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-[13px] outline-none focus:border-blue-400 text-black bg-white" title="Đến ngày" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2">
                                        <label className="text-[13px] font-medium text-gray-700">Số lượng kết quả trên trang:</label>
                                        <select className="border border-gray-200 rounded px-3 py-1.5 text-[13px] outline-none focus:border-blue-400 bg-white text-black">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {videos.map(video => (
                                <Link to="#" key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col h-full">
                                    <div className="h-[180px] overflow-hidden bg-gray-100 relative shrink-0">
                                        <img src={`https://picsum.photos/seed/vid${video.id}/400/250`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                                            <PlayCircle size={40} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="font-bold text-[14px] text-gray-900 leading-snug group-hover:text-blue-600 line-clamp-2 mb-2 flex-1">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center text-[11px] text-gray-500 mt-auto justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {video.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {video.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>{video.views} lượt xem</span>
                                                <button 
                                                    onClick={(e) => toggleFavorite(e, video.id)}
                                                    className="p-1.5 rounded-full hover:bg-red-50 transition-colors group/btn"
                                                    title="Đánh dấu yêu thích"
                                                >
                                                    <Heart size={16} className={favorites.has(video.id) ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/btn:text-red-500"} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination (Optional, didn't show in mockup but good to have) */}
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

export default VideoPhongSuTGPLPage;

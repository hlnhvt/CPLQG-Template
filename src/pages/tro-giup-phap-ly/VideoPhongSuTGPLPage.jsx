import React, { useEffect } from 'react';
import { PlayCircle, Video as VideoIcon } from 'lucide-react';

const VideoPhongSuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const videos = [
        { id: 1, title: 'Trợ giúp pháp lý: Điểm tựa công lý cho người yếu thế', date: '15/09/2023', views: 1205, dur: '12:45' },
        { id: 2, title: 'Hành trình mang pháp luật đến với Bản làng vùng cao', date: '22/08/2023', views: 856, dur: '25:10' },
        { id: 3, title: 'Hướng dẫn thủ tục yêu cầu Trợ giúp pháp lý miễn phí', date: '10/07/2023', views: 3450, dur: '05:30' },
        { id: 4, title: 'Gương sáng Trợ giúp viên pháp lý: Vì dân phục vụ', date: '05/06/2023', views: 520, dur: '18:20' },
        { id: 5, title: 'Luật Trợ giúp pháp lý 2017: Những điểm mới quan trọng', date: '12/05/2023', views: 2100, dur: '45:00' },
        { id: 6, title: 'Tọa đàm: Nâng cao chất lượng dịch vụ Trợ giúp pháp lý', date: '28/04/2023', views: 430, dur: '55:15' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide">
                        <VideoIcon size={32} className="text-blue-600" />
                        Video Phóng sự Trợ giúp pháp lý
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                {/* Feature Video */}
                <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-10 group relative cursor-pointer">
                    <img src="https://picsum.photos/seed/tgpl1/1200/500" alt="Video nổi bật" className="w-full h-[300px] md:h-[500px] object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={80} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">Mới nhất</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-4xl cursor-pointer hover:underline">Phóng sự VTV2: Bảo vệ quyền trẻ em qua công tác trợ giúp pháp lý</h2>
                        <div className="flex items-center text-gray-300 text-sm gap-4">
                            <span>20/10/2023</span>
                            <span>•</span>
                            <span>5.2K lượt xem</span>
                            <span>•</span>
                            <span>Thời lượng: 35:00</span>
                        </div>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map(video => (
                        <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                <img src={`https://picsum.photos/seed/vid${video.id}/400/250`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                </div>
                                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                    {video.dur}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-[16px] text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 cursor-pointer">
                                    {video.title}
                                </h3>
                                <div className="flex items-center text-xs text-gray-500 justify-between mt-4">
                                    <span>{video.date}</span>
                                    <span>{video.views} lượt xem</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load more */}
                <div className="mt-10 text-center">
                    <button className="px-8 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-full shadow-sm">
                        Xem thêm video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPhongSuTGPLPage;

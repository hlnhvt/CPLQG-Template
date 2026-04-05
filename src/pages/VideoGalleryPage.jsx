import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, PlayCircle, ChevronLeft, ChevronRight, Video } from 'lucide-react';

// ---- Mock Data ----
const ALL_VIDEOS = [
    { id: 1, title: "Thủ tướng: Khẩn trương thí điểm đánh giá, chấm điểm công tác xây dựng pháp luật", date: "12/03/2026", duration: "05:32", image: "/thumb1.png" },
    { id: 2, title: "Bộ trưởng Bộ Tư pháp phát biểu tại Hội nghị pháp lý quốc tế Hà Nội 2026", date: "10/03/2026", duration: "08:14", image: "/thumb2.png" },
    { id: 3, title: "Toàn cảnh Kỳ họp thứ 10 Quốc hội khóa XV – Phiên khai mạc", date: "21/10/2025", duration: "12:47", image: "/thumb3.png" },
    { id: 4, title: "Lễ phát động Ngày Pháp luật Nước CHXHCN Việt Nam năm 2026", date: "09/11/2025", duration: "06:05", image: "/thumb1.png" },
    { id: 5, title: "Hội thảo xây dựng Nhà nước pháp quyền Xã hội Chủ nghĩa Việt Nam", date: "15/02/2026", duration: "45:30", image: "/thumb2.png" },
    { id: 6, title: "Đoàn đại biểu Bộ Tư pháp thăm và làm việc tại Nhật Bản 2026", date: "18/03/2026", duration: "03:22", image: "/thumb3.png" },
    { id: 7, title: "Tọa đàm Cải cách thủ tục hành chính và chuyển đổi số trong tư pháp", date: "05/03/2026", duration: "32:15", image: "/thumb1.png" },
    { id: 8, title: "Hội nghị triển khai Nghị quyết số 27-NQ/TW tại các địa phương", date: "28/02/2026", duration: "27:40", image: "/thumb2.png" },
    { id: 9, title: "Khai mạc Triển lãm Pháp luật vì cuộc sống 2025", date: "10/11/2025", duration: "04:58", image: "/thumb3.png" },
    { id: 10, title: "Đại hội thi đua yêu nước ngành Tư pháp lần thứ V", date: "14/12/2025", duration: "18:22", image: "/thumb1.png" },
    { id: 11, title: "Họp báo triển khai Luật Đất đai 2024 – Những điểm mới cần biết", date: "20/03/2026", duration: "15:07", image: "/thumb2.png" },
    { id: 12, title: "Lễ ký kết hợp tác pháp lý Việt Nam – Liên minh Châu Âu", date: "22/03/2026", duration: "07:45", image: "/thumb3.png" },
    { id: 13, title: "Diễn đàn Pháp luật số 2026 – Kỷ nguyên AI và pháp lý", date: "25/03/2026", duration: "52:18", image: "/thumb1.png" },
    { id: 14, title: "Họp báo kết quả đánh giá cải cách pháp luật quốc gia", date: "26/03/2026", duration: "09:33", image: "/thumb2.png" },
    { id: 15, title: "Hội nghị sơ kết Chương trình hỗ trợ pháp lý cho doanh nghiệp nhỏ", date: "27/03/2026", duration: "28:11", image: "/thumb3.png" },
    { id: 16, title: "Phát biểu của Chủ tịch Quốc hội về định hướng lập pháp kỷ nguyên mới", date: "28/03/2026", duration: "14:00", image: "/thumb1.png" },
];

const ITEMS_PER_PAGE = 8;

const VideoCard = ({ video, large = false }) => (
    <Link to={`/video/${video.id}`} className={`group block ${large ? '' : ''}`}>
        <div className={`relative rounded-xl overflow-hidden bg-gray-200 mb-2 ${large ? 'aspect-[16/9]' : 'aspect-video'}`}>
            <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/60 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg">
                    <PlayCircle size={28} className="text-white" />
                </div>
            </div>
            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                {video.duration}
            </div>
        </div>
        <p className={`font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug ${large ? 'text-[16px]' : 'text-[13px]'}`}>
            {video.title}
        </p>
        <p className="text-[11px] text-gray-400 mt-1">{video.date}</p>
    </Link>
);

const VideoGalleryPage = () => {
    const [keyword, setKeyword] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (e) => {
        e.preventDefault();
        setDateError('');
        if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
            setDateError('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.');
            return;
        }
        setCurrentPage(1);
    };

    const filtered = ALL_VIDEOS.filter(v => {
        const kw = keyword.toLowerCase();
        const matchKw = !kw || v.title.toLowerCase().includes(kw);
        let matchDate = true;
        if (fromDate) matchDate = matchDate && new Date(v.date.split('/').reverse().join('-')) >= new Date(fromDate);
        if (toDate)   matchDate = matchDate && new Date(v.date.split('/').reverse().join('-')) <= new Date(toDate);
        return matchKw && matchDate;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const pageVideos = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const featuredVideo = ALL_VIDEOS[0];

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) {
            setCurrentPage(p);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const paginationPages = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-[#0f4c81] to-[#1a6cc4] text-white py-8">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center gap-2 text-[13px] text-blue-200 mb-3">

                        <Link to="/tin-tuc/noi-bat" className="hover:text-white">Tin tức</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Video</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Video size={28} className="text-blue-200" />
                        <h1 className="text-2xl md:text-3xl font-bold">Video</h1>
                    </div>
                    <p className="text-blue-200 text-[14px] mt-1">Thư viện video pháp luật và sự kiện trên Cổng Pháp luật Quốc gia</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                {/* Featured video */}
                <div className="mb-8">
                    <VideoCard video={featuredVideo} large />
                </div>

                {/* Search & filter */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
                    <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                                placeholder="Tìm kiếm tin bài..."
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-400 bg-gray-50" />
                        </div>
                        <div className="relative">
                            <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                                className="pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-[12px] outline-none focus:border-blue-400 bg-gray-50" />
                        </div>
                        <span className="text-gray-400 text-[12px]">–</span>
                        <div className="relative">
                            <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                                className="pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-[12px] outline-none focus:border-blue-400 bg-gray-50" />
                        </div>
                        <button type="submit" className="px-5 py-2 bg-[#1a3b8b] hover:bg-blue-800 text-white font-semibold rounded-lg text-[13px] transition-colors">
                            Tìm kiếm
                        </button>
                    </form>
                    {dateError && <p className="text-red-600 text-[12px] mt-2">{dateError}</p>}
                </div>

                {/* Results */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-400">
                        <PlayCircle size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="text-[15px]">Không tìm thấy video phù hợp với từ khóa đã nhập.</p>
                    </div>
                ) : (
                    <>
                        <div className="border-t-2 border-blue-600 mb-6 flex items-center gap-3">
                            <span className="bg-blue-600 text-white text-[13px] font-bold px-4 py-1.5 -mt-px">Danh sách video</span>
                            <span className="text-gray-400 text-[12px] mt-0.5">({filtered.length} video)</span>
                        </div>

                        {/* 4-column grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {pageVideos.map(video => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}
                                    className="flex items-center gap-1 h-9 px-3 border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 text-[13px]">
                                    <ChevronLeft size={15} /> Trước
                                </button>
                                {paginationPages().map((p, i) => p === '...'
                                    ? <span key={i} className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
                                    : <button key={p} onClick={() => handlePage(p)}
                                        className={`w-9 h-9 rounded border text-[13px] font-semibold ${currentPage === p ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'}`}>{p}</button>
                                )}
                                <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 h-9 px-3 border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 text-[13px]">
                                    Sau <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoGalleryPage;

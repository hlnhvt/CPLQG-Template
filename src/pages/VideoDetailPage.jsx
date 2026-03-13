import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw, Copy, Facebook, Check } from 'lucide-react';

// Mock video data
const ALL_VIDEOS = [
    { id: 1, title: "Thủ tướng: Khẩn trương thí điểm đánh giá, chấm điểm công tác xây dựng pháp luật", date: "12/03/2026", duration: "05:32", image: "/thumb1.png", src: "" },
    { id: 2, title: "Bộ trưởng Bộ Tư pháp phát biểu tại Hội nghị pháp lý quốc tế Hà Nội 2026", date: "10/03/2026", duration: "08:14", image: "/thumb2.png", src: "" },
    { id: 3, title: "Toàn cảnh Kỳ họp thứ 10 Quốc hội khóa XV – Phiên khai mạc", date: "21/10/2025", duration: "12:47", image: "/thumb3.png", src: "" },
    { id: 4, title: "Lễ phát động Ngày Pháp luật Nước CHXHCN Việt Nam năm 2026", date: "09/11/2025", duration: "06:05", image: "/thumb1.png", src: "" },
    { id: 5, title: "Hội thảo xây dựng Nhà nước pháp quyền Xã hội Chủ nghĩa Việt Nam", date: "15/02/2026", duration: "45:30", image: "/thumb2.png", src: "" },
    { id: 6, title: "Đoàn đại biểu Bộ Tư pháp thăm và làm việc tại Nhật Bản 2026", date: "18/03/2026", duration: "03:22", image: "/thumb3.png", src: "" },
    { id: 7, title: "Tọa đàm Cải cách thủ tục hành chính và chuyển đổi số trong tư pháp", date: "05/03/2026", duration: "32:15", image: "/thumb1.png", src: "" },
    { id: 8, title: "Hội nghị triển khai Nghị quyết số 27-NQ/TW tại các địa phương", date: "28/02/2026", duration: "27:40", image: "/thumb2.png", src: "" },
    { id: 9, title: "Khai mạc Triển lãm Pháp luật vì cuộc sống 2025", date: "10/11/2025", duration: "04:58", image: "/thumb3.png", src: "" },
    { id: 10, title: "Đại hội thi đua yêu nước ngành Tư pháp lần thứ V", date: "14/12/2025", duration: "18:22", image: "/thumb1.png", src: "" },
    { id: 11, title: "Họp báo triển khai Luật Đất đai 2024 – Những điểm mới cần biết", date: "20/03/2026", duration: "15:07", image: "/thumb2.png", src: "" },
    { id: 12, title: "Lễ ký kết hợp tác pháp lý Việt Nam – EU", date: "22/03/2026", duration: "07:45", image: "/thumb3.png", src: "" },
    { id: 13, title: "Diễn đàn Pháp luật số 2026 – Kỷ nguyên AI và pháp lý", date: "25/03/2026", duration: "52:18", image: "/thumb1.png", src: "" },
    { id: 14, title: "Họp báo kết quả đánh giá cải cách pháp luật quốc gia", date: "26/03/2026", duration: "09:33", image: "/thumb2.png", src: "" },
    { id: 15, title: "Hội nghị sơ kết Chương trình hỗ trợ pháp lý cho doanh nghiệp nhỏ", date: "27/03/2026", duration: "28:11", image: "/thumb3.png", src: "" },
    { id: 16, title: "Phát biểu của Chủ tịch Quốc hội về định hướng lập pháp kỷ nguyên mới", date: "28/03/2026", duration: "14:00", image: "/thumb1.png", src: "" },
];

const CAROUSEL_PER_PAGE = 5;

const VideoDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentIndex = ALL_VIDEOS.findIndex(v => v.id === parseInt(id));
    const video = ALL_VIDEOS[currentIndex] || ALL_VIDEOS[0];

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [carouselPage, setCarouselPage] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlsTimerRef = useRef(null);

    const related = ALL_VIDEOS.filter(v => v.id !== video.id);
    const totalCarouselPages = Math.ceil(related.length / CAROUSEL_PER_PAGE);
    const carouselVideos = related.slice(carouselPage * CAROUSEL_PER_PAGE, (carouselPage + 1) * CAROUSEL_PER_PAGE);

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < ALL_VIDEOS.length - 1;

    const goToPrev = () => hasPrev && navigate(`/video/${ALL_VIDEOS[currentIndex - 1].id}`);
    const goToNext = () => hasNext && navigate(`/video/${ALL_VIDEOS[currentIndex + 1].id}`);

    // Reset on video change
    useEffect(() => {
        setPlaying(false);
        setProgress(0);
    }, [id]);

    // Fake progress simulation when playing
    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { setPlaying(false); return 100; }
                return p + 0.2;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [playing]);

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimerRef.current);
        if (playing) {
            controlsTimerRef.current = setTimeout(() => setShowControls(false), 2500);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-16">
            <div className="container mx-auto px-4 max-w-[1200px] pt-6">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[13px] text-gray-500 mb-5">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={13} />
                    <Link to="/tin-tuc/noi-bat" className="hover:text-blue-600">Tin tức</Link>
                    <ChevronRight size={13} />
                    <Link to="/video" className="hover:text-blue-600">Multimedia</Link>
                    <ChevronRight size={13} />
                    <Link to="/video" className="hover:text-blue-600">Video</Link>
                    <ChevronRight size={13} />
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">Chi tiết</span>
                </nav>

                {/* ── Video Player ── */}
                <div
                    className="relative bg-black rounded-xl overflow-hidden aspect-[16/9] group select-none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => playing && setShowControls(false)}
                >
                    {/* Thumbnail/poster */}
                    <img src={video.image} alt={video.title}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-60' : 'opacity-90'}`} />

                    {/* Big play button (when paused) */}
                    {!playing && (
                        <button onClick={() => setPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-2xl">
                                <Play size={36} className="text-white ml-1" />
                            </div>
                        </button>
                    )}

                    {/* Prev/Next on sides */}
                    <button onClick={goToPrev} disabled={!hasPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all z-10">
                        <ChevronLeft size={22} />
                    </button>
                    <button onClick={goToNext} disabled={!hasNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all z-10">
                        <ChevronRight size={22} />
                    </button>

                    {/* Title overlay */}
                    <div className={`absolute bottom-12 left-0 right-0 px-4 pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        <h1 className="text-white font-bold text-[15px] md:text-[18px] leading-snug line-clamp-2 drop-shadow-lg">
                            {video.title}
                        </h1>
                    </div>

                    {/* Controls bar */}
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Progress bar */}
                        <div className="relative w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group/bar"
                            onClick={e => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setProgress(((e.clientX - rect.left) / rect.width) * 100);
                            }}>
                            <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-all" style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }} />
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center gap-3">
                            {/* Play/Pause */}
                            <button onClick={() => setPlaying(p => !p)} className="text-white hover:text-red-400 transition-colors">
                                {playing ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                            {/* Rewind */}
                            <button onClick={() => setProgress(p => Math.max(0, p - 5))} className="text-white/80 hover:text-white transition-colors">
                                <RotateCcw size={16} />
                                <span className="text-[10px] font-bold">10</span>
                            </button>
                            {/* Forward */}
                            <button onClick={() => setProgress(p => Math.min(100, p + 5))} className="text-white/80 hover:text-white transition-colors">
                                <RotateCw size={16} />
                                <span className="text-[10px] font-bold">10</span>
                            </button>

                            {/* Time */}
                            <span className="text-white/70 text-[12px] font-mono">{video.duration}</span>

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* Volume */}
                            <button onClick={() => setMuted(m => !m)} className="text-white/80 hover:text-white transition-colors">
                                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>

                            {/* Fullscreen */}
                            <button className="text-white/80 hover:text-white transition-colors">
                                <Maximize size={17} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Share & copy row */}
                <div className="flex items-center gap-3 mt-4 mb-8">
                    <span className="text-[12px] text-gray-500">{video.date}</span>
                    <div className="flex-1" />
                    <button onClick={handleCopy}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[12px] font-medium transition-colors ${copied ? 'border-green-300 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-300 hover:text-blue-600'}`}>
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Đã sao chép' : 'Sao chép link'}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-gray-50 text-blue-600 hover:bg-blue-50 rounded-lg text-[12px] font-medium transition-colors">
                        <Facebook size={14} /> Chia sẻ
                    </button>
                </div>

                {/* ── Related Videos Carousel ── */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[16px] font-bold text-[#0f4c81] uppercase tracking-wide">Video liên quan</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setCarouselPage(p => Math.max(0, p - 1))} disabled={carouselPage === 0}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 transition-colors bg-white">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={() => setCarouselPage(p => Math.min(totalCarouselPages - 1, p + 1))} disabled={carouselPage === totalCarouselPages - 1}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 transition-colors bg-white">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* 5-column carousel */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-5">
                        {carouselVideos.map(v => (
                            <Link key={v.id} to={`/video/${v.id}`} className="group block"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-200 mb-2">
                                    <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-black/60 group-hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                                            <Play size={14} className="text-white ml-0.5" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        {v.duration}
                                    </div>
                                </div>
                                <p className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{v.title}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{v.date}</p>
                            </Link>
                        ))}
                    </div>

                    {/* Dot pagination */}
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: totalCarouselPages }).map((_, i) => (
                            <button key={i} onClick={() => setCarouselPage(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === carouselPage ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetailPage;

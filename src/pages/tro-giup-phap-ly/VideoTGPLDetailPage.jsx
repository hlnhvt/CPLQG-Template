import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw, Copy, Facebook, Check } from 'lucide-react';

// Mock video data
const ALL_VIDEOS = [
    { id: 1, title: "Phóng sự: Đưa pháp luật đến với đồng bào vùng sâu vùng xa", date: "12/05/2026", duration: "15:30", image: "https://picsum.photos/seed/v1/800/450", src: "" },
    { id: 2, title: "Hướng dẫn thủ tục yêu cầu trợ giúp pháp lý cho người khuyết tật", date: "08/04/2026", duration: "08:45", image: "https://picsum.photos/seed/v2/800/450", src: "" },
    { id: 3, title: "Tọa đàm: Nâng cao hiệu quả bảo vệ quyền trẻ em trong tố tụng", date: "25/03/2026", duration: "45:20", image: "https://picsum.photos/seed/v3/800/450", src: "" },
    { id: 4, title: "Phim tài liệu: Ánh sáng công lý - Hành trình 25 năm trợ giúp pháp lý", date: "15/02/2026", duration: "28:15", image: "https://picsum.photos/seed/v4/800/450", src: "" },
    { id: 5, title: "Kỹ năng tư vấn pháp luật lĩnh vực hôn nhân gia đình", date: "10/01/2026", duration: "52:10", image: "https://picsum.photos/seed/v5/800/450", src: "" },
    { id: 6, title: "Bản tin Trợ giúp pháp lý tháng 12/2025", date: "05/01/2026", duration: "12:05", image: "https://picsum.photos/seed/v6/800/450", src: "" },
];

const CAROUSEL_PER_PAGE = 5;

const VideoTGPLDetailPage = () => {
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

    const goToPrev = () => hasPrev && navigate(`/tro-giup-phap-ly/video/${ALL_VIDEOS[currentIndex - 1].id}`);
    const goToNext = () => hasNext && navigate(`/tro-giup-phap-ly/video/${ALL_VIDEOS[currentIndex + 1].id}`);

    // Reset on video change
    useEffect(() => {
        setPlaying(false);
        setProgress(0);
        window.scrollTo(0, 0);
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
                    <Link to="/tro-giup-phap-ly" className="hover:text-blue-600">Trợ giúp pháp lý</Link>
                    <ChevronRight size={13} />
                    <Link to="/tro-giup-phap-ly/video" className="hover:text-blue-600">Video phóng sự TGPL</Link>
                    <ChevronRight size={13} />
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">Chi tiết</span>
                </nav>

                {/* ── Video Player ── */}
                <div
                    className="relative bg-black rounded-xl overflow-hidden aspect-[16/9] group select-none shadow-sm"
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
                    <span className="text-[12px] text-gray-500">{video.date} | Trung tâm truyền thông TGPL</span>
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
                            <Link key={v.id} to={`/tro-giup-phap-ly/video/${v.id}`} className="group block"
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

export default VideoTGPLDetailPage;

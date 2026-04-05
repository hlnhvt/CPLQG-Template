import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, Download, Copy, Facebook, Clock, Maximize2, X, Check } from 'lucide-react';

// ---- Mock album data ----
const MOCK_ALBUM = {
    id: 1,
    title: "Lễ kỷ niệm 80 năm Ngày Tổng tuyển cử đầu tiên của Quốc hội Việt Nam",
    category: "ẢNH THỜI SỰ TRONG NƯỚC » SỰ KIỆN - CHÍNH TRỊ",
    date: "06/01/2026 09:00",
    author: "Minh Tuấn – TTXVN",
    description: "Ngày 6/1/2026, tại Hà Nội, Ủy ban Thường vụ Quốc hội và Văn phòng Quốc hội tổ chức trọng thể Lễ kỷ niệm 80 năm Ngày Tổng tuyển cử đầu tiên bầu ra Quốc hội Việt Nam (6/1/1946 - 6/1/2026). Thay mặt lãnh đạo Đảng và Nhà nước, Tổng Bí thư Tô Lâm dự và phát biểu tại buổi lễ. Đây là sự kiện chính trị trọng đại, khẳng định ý nghĩa lịch sử to lớn của cuộc Tổng tuyển cử đầu tiên – nền tảng cho sự ra đời và phát triển của Nhà nước pháp quyền XHCN Việt Nam.",
    photos: [
        { id: 1, src: "/thumb1.png", caption: "Toàn cảnh Lễ kỷ niệm 80 năm Ngày Tổng tuyển cử đầu tiên tại Nhà hát Lớn Hà Nội." },
        { id: 2, src: "/thumb2.png", caption: "Tổng Bí thư Tô Lâm phát biểu tại buổi lễ." },
        { id: 3, src: "/thumb3.png", caption: "Đại biểu Quốc hội các thế hệ tham dự buổi lễ." },
        { id: 4, src: "/thumb1.png", caption: "Màn trình diễn nghệ thuật tôn vinh 80 năm Quốc hội Việt Nam." },
        { id: 5, src: "/thumb2.png", caption: "Chủ tịch Quốc hội Trần Thanh Mẫn và các đại biểu chụp ảnh lưu niệm." },
        { id: 6, src: "/thumb3.png", caption: "Triển lãm ảnh 80 năm hoạt động lập pháp của Quốc hội Việt Nam." },
        { id: 7, src: "/thumb1.png", caption: "Lãnh đạo Đảng và Nhà nước dâng hương tưởng niệm Chủ tịch Hồ Chí Minh." },
        { id: 8, src: "/thumb2.png", caption: "Học sinh tiêu biểu toàn quốc tham dự buổi lễ cùng các đại biểu Quốc hội." },
    ],
};

const RELATED_ALBUMS = [
    { id: 2, title: "Bộ trưởng Bộ Tư pháp dự Hội nghị pháp lý quốc tế tại Hà Nội", date: "10/03/2026", image: "/thumb2.png", count: 18, category: "ẢNH THỜI SỰ TRONG NƯỚC" },
    { id: 3, title: "Lễ phát động Ngày Pháp luật Nước CHXHCN Việt Nam năm 2026", date: "09/11/2025", image: "/thumb3.png", count: 32, category: "ẢNH THỜI SỰ TRONG NƯỚC" },
    { id: 4, title: "Hội thảo quốc tế về xây dựng Nhà nước pháp quyền XHCN", date: "15/02/2026", image: "/thumb1.png", count: 15, category: "ẢNH THỜI SỰ TRONG NƯỚC" },
];

const PhotoDetailPage = () => {
    const { id } = useParams();
    const album = MOCK_ALBUM; // In real app, fetch by id

    const [currentIdx, setCurrentIdx] = useState(0);
    const [lightbox, setLightbox] = useState(false);
    const [copied, setCopied] = useState(false);

    const photos = album.photos;
    const current = photos[currentIdx];
    const total = photos.length;

    const prev = useCallback(() => setCurrentIdx(i => Math.max(0, i - 1)), []);
    const next = useCallback(() => setCurrentIdx(i => Math.min(total - 1, i + 1)), [total]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape') setLightbox(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [prev, next]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = current.src;
        link.download = `photo-${id}-${currentIdx + 1}.jpg`;
        link.click();
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-16">
            <div className="container mx-auto px-4 max-w-[1200px] pt-6">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[13px] text-gray-500 mb-5">

                    <Link to="/tin-tuc/noi-bat" className="hover:text-blue-600">Tin tức</Link>
                    <ChevronRight size={13} />
                    <Link to="/anh" className="hover:text-blue-600">Photo</Link>
                    <ChevronRight size={13} />
                    <span className="text-gray-800 font-medium truncate max-w-[240px]">Chi tiết bộ ảnh</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* ── LEFT: Viewer ── */}
                    <div className="flex-1 min-w-0">
                        {/* Main image */}
                        <div className="relative bg-black rounded-xl overflow-hidden aspect-[16/9] group cursor-pointer" onDoubleClick={() => setLightbox(true)}>
                            <img src={current.src} alt={current.caption} className="w-full h-full object-contain" />

                            {/* Prev/Next arrows */}
                            <button onClick={prev} disabled={currentIdx === 0}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all">
                                <ChevronLeft size={22} />
                            </button>
                            <button onClick={next} disabled={currentIdx === total - 1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/75 text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all">
                                <ChevronRightIcon size={22} />
                            </button>

                            {/* Counter */}
                            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[12px] font-bold px-2.5 py-1 rounded-full">
                                {currentIdx + 1} / {total}
                            </div>

                            {/* Fullscreen button */}
                            <button onClick={() => setLightbox(true)}
                                className="absolute top-3 right-3 bg-black/50 hover:bg-black/75 text-white rounded-lg p-1.5 transition-colors">
                                <Maximize2 size={16} />
                            </button>
                        </div>

                        {/* Caption */}
                        <div className="bg-white border border-gray-100 rounded-b-xl px-4 py-3 text-[13px] text-gray-500 italic">
                            {current.caption}
                        </div>

                        {/* Thumbnail strip */}
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                            {photos.map((photo, idx) => (
                                <button key={photo.id} onClick={() => setCurrentIdx(idx)}
                                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIdx ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                    <img src={photo.src} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Info panel ── */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            {/* Category label */}
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-2">{album.category}</p>

                            {/* Title */}
                            <h1 className="text-[17px] font-bold text-[#0f4c81] leading-snug mb-4">{album.title}</h1>

                            {/* Date + Author */}
                            <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-4">
                                <Clock size={13} />
                                <span>{album.date}</span>
                                <span className="text-gray-300">|</span>
                                <span className="font-medium">{album.author}</span>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-gray-600 leading-relaxed mb-5">{album.description}</p>

                            {/* Action buttons */}
                            <div className="space-y-2">
                                <button onClick={handleDownload}
                                    className="flex items-center gap-2 w-full px-4 py-2.5 bg-[#1a3b8b] hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors text-[13px]">
                                    <Download size={15} /> Tải ảnh hiện tại
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={handleCopy}
                                        className={`flex items-center gap-1.5 flex-1 px-3 py-2 border rounded-lg text-[12px] font-medium transition-colors ${copied ? 'border-green-300 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300 hover:text-blue-600'}`}>
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? 'Đã sao chép' : 'Sao chép link'}
                                    </button>
                                    <button title="Chia sẻ Facebook"
                                        className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-gray-50 text-blue-600 hover:bg-blue-50 rounded-lg text-[12px] font-medium transition-colors">
                                        <Facebook size={14} />
                                    </button>
                                </div>
                                <Link to="/anh" className="flex items-center gap-2 w-full px-4 py-2 text-[12px] text-gray-500 hover:text-blue-600 transition-colors justify-center">
                                    ← Quay về danh sách ảnh
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Albums ── */}
                <div className="mt-10">
                    <div className="flex items-center gap-2 mb-5">
                        <h2 className="text-[15px] font-bold text-gray-700 uppercase tracking-wide">ẢNH &gt; ẢNH THỜI SỰ TRONG NƯỚC</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Featured related */}
                        <Link to={`/anh/${RELATED_ALBUMS[0].id}`} className="group md:col-span-1 block">
                            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-200 mb-2">
                                <img src={RELATED_ALBUMS[0].image} alt={RELATED_ALBUMS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{RELATED_ALBUMS[0].count} ảnh</div>
                            </div>
                            <p className="text-[11px] text-blue-600 mb-1">{RELATED_ALBUMS[0].category}</p>
                            <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">{RELATED_ALBUMS[0].title}</p>
                            <p className="text-[11px] text-gray-400 mt-1">{RELATED_ALBUMS[0].date} | TTXVN</p>
                        </Link>
                        {/* 2 smaller related */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {RELATED_ALBUMS.slice(1).map(album => (
                                <Link key={album.id} to={`/anh/${album.id}`} className="group block">
                                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-200 mb-2">
                                        <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{album.count} ảnh</div>
                                    </div>
                                    <p className="text-[11px] text-blue-600 mb-1">{album.category}</p>
                                    <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">{album.title}</p>
                                    <p className="text-[11px] text-gray-400 mt-1">{album.date} | TTXVN</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Fullscreen Lightbox ── */}
            {lightbox && (
                <div className="fixed inset-0 z-[500] bg-black/95 flex flex-col items-center justify-center" onClick={() => setLightbox(false)}>
                    {/* Close */}
                    <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10" onClick={() => setLightbox(false)}>
                        <X size={22} />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-[13px] font-semibold">
                        {currentIdx + 1} / {total}
                    </div>

                    {/* Image */}
                    <div className="w-full h-full flex items-center justify-center px-16" onClick={e => e.stopPropagation()}>
                        <img src={current.src} alt={current.caption} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[13px] italic text-center max-w-xl px-4">
                        {current.caption}
                    </div>

                    {/* Prev/Next in lightbox */}
                    <button onClick={e => { e.stopPropagation(); prev(); }} disabled={currentIdx === 0}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all">
                        <ChevronLeft size={26} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); next(); }} disabled={currentIdx === total - 1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center disabled:opacity-20 transition-all">
                        <ChevronRightIcon size={26} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoDetailPage;

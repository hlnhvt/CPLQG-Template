import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    Calendar, Download, Maximize2, X, ChevronRight, Image,
    ZoomIn, Share2, Copy, Facebook, ArrowLeft
} from 'lucide-react';
import { INFOGRAPHIC_LIST } from './InfographicPage';

// ── Lightbox (zoom) ───────────────────────────────────────────────────────────
const Lightbox = ({ item, initialIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const images = item.images || [];

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex(p => p - 1);
            if (e.key === 'ArrowRight' && currentIndex < images.length - 1) setCurrentIndex(p => p + 1);
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [currentIndex, images.length, onClose]);

    const handleFullscreen = () => {
        const el = document.getElementById('lightbox-image');
        if (!el) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (el.requestFullscreen) {
            el.requestFullscreen();
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}>
            {/* Nav Left */}
            <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => p - 1); }}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white disabled:opacity-0 transition-all p-2">
                <ChevronRight size={40} className="rotate-180" />
            </button>

            {/* Main Content */}
            <div className="relative max-w-5xl w-full h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Top bar */}
                <div className="flex justify-between items-center text-white/80 mb-4 shrink-0">
                    <div className="text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleFullscreen} className="hover:text-white transition-colors" title="Toàn màn hình">
                            <Maximize2 size={24} />
                        </button>
                        <a href={images[currentIndex]} download
                            className="hover:text-white transition-colors" title="Tải về">
                            <Download size={24} />
                        </a>
                        <button onClick={onClose} className="hover:text-white transition-colors">
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Image Wrapper */}
                <div className="flex-1 min-h-0 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <img id="lightbox-image"
                        src={images[currentIndex]}
                        alt={`${item.title} - ${currentIndex + 1}`}
                        className="max-w-full max-h-full object-contain" />
                </div>
                
                <p className="text-white/50 text-center text-xs mt-3 shrink-0">Nhấn ESC để đóng, Mũi tên để chuyển ảnh</p>
            </div>

            {/* Nav Right */}
            <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => p + 1); }}
                disabled={currentIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white disabled:opacity-0 transition-all p-2">
                <ChevronRight size={40} />
            </button>
        </div>
    );
};

// ── Detail Page (MH05) ────────────────────────────────────────────────────────
const InfographicDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [copied, setCopied] = useState(false);

    const item = INFOGRAPHIC_LIST.find(x => x.slug === slug);

    // If not found, redirect
    useEffect(() => {
        if (!item) navigate('/infographic', { replace: true });
    }, [item, navigate]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!item) return null;

    const relatedItems = INFOGRAPHIC_LIST.filter(x => x.id !== item.id).slice(0, 4);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            {lightboxIndex !== null && <Lightbox item={item} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}

            <div className="container mx-auto px-4 max-w-[1280px] pt-5">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-5">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <Link to="/tin-tuc/noi-bat" className="hover:text-blue-600">Tin tức và truyền thông</Link>
                    <ChevronRight size={12} />
                    <Link to="/infographic" className="hover:text-blue-600">Infographic</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium line-clamp-1 max-w-[240px]">{item.title}</span>
                </nav>

                {/* Back button */}
                <button onClick={() => navigate('/infographic')}
                    className="flex items-center gap-1.5 text-[13px] text-blue-600 hover:text-blue-800 mb-5 transition-colors">
                    <ArrowLeft size={15} /> Quay lại danh sách
                </button>

                <div className="flex gap-6">
                    {/* ── Main ── */}
                    <main className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        {/* Title */}
                        <h1 className="text-[22px] font-bold text-gray-900 leading-snug mb-3">{item.title}</h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-500 mb-5 pb-4 border-b border-gray-100">
                            <span className="flex items-center gap-1.5"><Calendar size={13} />{item.date}</span>
                            <span className="flex items-center gap-1.5">
                                <span className="text-gray-400">Nguồn:</span> {item.source}
                            </span>
                        </div>

                        {/* Action buttons (above image) */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button onClick={() => setLightboxIndex(0)}
                                className="flex items-center gap-1.5 px-3 py-2 bg-[#1a3b8b] hover:bg-blue-800 text-white rounded-lg text-[12px] font-medium transition-colors">
                                <ZoomIn size={14} /> Xem ảnh lớn
                            </button>
                            <a href={item.images?.[0]} download
                                className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 hover:border-blue-400 hover:text-blue-600 text-gray-600 rounded-lg text-[12px] font-medium transition-colors">
                                <Download size={14} /> Tải tất cả ảnh
                            </a>
                        </div>

                        {/* Description */}
                        <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{item.desc}</p>

                        {/* Infographic image area (Multi-image vertical list) */}
                        <div className="space-y-6 mb-8">
                            {item.images?.map((imgSrc, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => setLightboxIndex(idx)}>
                                        <img src={imgSrc} alt={`${item.title} - Ảnh ${idx + 1}`} className="w-full h-auto object-cover" />
                                    </div>
                                    {item.images.length > 1 && (
                                        <div className="text-gray-400 text-sm mt-3 font-medium bg-gray-100 px-3 py-1 rounded-full">
                                            {idx + 1} / {item.images.length}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Share row */}
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                            <span className="text-[12px] text-gray-500 font-medium mr-1">Chia sẻ:</span>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                target="_blank" rel="noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-medium transition-colors">
                                <Facebook size={13} /> Facebook
                            </a>
                            <button onClick={handleCopyLink}
                                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[12px] font-medium transition-colors ${copied ? 'border-green-400 text-green-600 bg-green-50' : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'}`}>
                                <Copy size={13} /> {copied ? 'Đã sao chép!' : 'Sao chép liên kết'}
                            </button>
                        </div>
                    </main>

                    {/* ── Sidebar ── */}
                    <aside className="hidden lg:block w-[280px] shrink-0">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                            <h3 className="font-bold text-[14px] text-gray-800 border-b border-gray-100 pb-2 mb-3">
                                Infographic liên quan
                            </h3>
                            <div className="space-y-3">
                                {relatedItems.map((rel) => (
                                    <div key={rel.id}
                                        className="flex gap-2 cursor-pointer group"
                                        onClick={() => navigate(`/infographic/${rel.slug}`)}>
                                        <div className="w-16 h-12 rounded-lg shrink-0 bg-gray-100 overflow-hidden flex items-center justify-center">
                                            {rel.thumbnail ? (
                                                <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <Image size={18} className="text-gray-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                                                {rel.title}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                                <Calendar size={9} />{rel.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/infographic"
                                className="block w-full mt-3 text-[12px] text-blue-600 hover:underline text-center">
                                Xem tất cả Infographic →
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default InfographicDetailPage;

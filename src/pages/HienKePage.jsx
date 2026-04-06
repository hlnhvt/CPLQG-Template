import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search, ArrowRight, Users, Calendar, ChevronRight,
    Scale, Landmark, Heart, TrendingUp, Send
} from 'lucide-react';

// ======================== PAGE ========================

export default function HienKePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/hien-ke/linh-vuc?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col">

            {/* =====================================================
                HERO — Full trống đồng background
            ===================================================== */}
            <div
                className="relative overflow-hidden flex-1 flex items-center"
                style={{ minHeight: '600px' }}
            >
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-cinematic"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Animated Gold Aura for impressive solemn feeling */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/0 via-amber-500/15 to-transparent animate-gold-aura mix-blend-overlay pointer-events-none" />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                {/* Subtle gold shimmer overlay matching trống đồng */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-[1280px] pt-4 md:pt-6 pb-16 md:pb-24">
                    {/* Breadcrumb - Adjusted to be higher */}
                    <div className="mb-8 xl:mb-12">
                        <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] animate-fade-in">
                            <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                            <ChevronRight size={14} />
                            <span className="text-white/90">Hiến kế xây dựng và thi hành pháp luật</span>
                        </nav>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 pt-2 lg:pt-4">
                        {/* Left side: Text, Search, Stats */}
                        <div className="flex-1 max-w-xl w-full -mt-8 lg:-mt-12">
                            {/* Title */}
                            <h1 className="text-[38px] md:text-[52px] lg:text-[60px] font-black text-white leading-[1.2] mb-5 animate-fade-up">
                                <span className="inline-block py-1 animate-text-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Hiến kế</span>
                                <span className="block text-[24px] md:text-[32px] lg:text-[38px] font-bold mt-1 leading-[1.4] text-amber-300 animate-text-gradient bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 bg-clip-text text-transparent max-w-[650px] py-1">
                                    Xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới
                                </span>
                            </h1>
                            <p className="text-[16px] md:text-[22px] font-semibold leading-relaxed mb-10 max-w-xl animate-fade-in delay-100 italic text-center mx-auto lg:mx-0">
                                <span className="relative inline-block animate-text-shimmer bg-[linear-gradient(110deg,#bfdbfe,45%,#ffffff,55%,#fde68a)] bg-[length:200%_100%] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    "Tiếng nói của bạn góp phần quan trọng định hình<br className="hidden md:block" /> chính sách, pháp luật quốc gia"
                                </span>
                            </p>

                            {/* Search bar */}
                            <form onSubmit={handleSearch} className="flex max-w-lg mb-10 animate-fade-up delay-200">
                                <div className="relative flex-1">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Tìm kiếm nội dung..."
                                        className="w-full pl-10 pr-4 py-3.5 rounded-l-xl text-[14px] text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-lg"
                                    />
                                </div>
                                <button type="submit" className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-r-xl text-[14px] transition-colors whitespace-nowrap shadow-lg">
                                    Tìm kiếm
                                </button>
                            </form>

                            {/* New CTA Button */}
                            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up delay-[250ms]">
                                <Link
                                    to="/hien-ke/lien-he"
                                    className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-900 font-bold rounded-xl text-[15px] transition-all shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)] flex items-center gap-2 group"
                                >
                                    <Users size={18} className="transition-transform group-hover:scale-110" />
                                    Về chúng tôi
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-12 animate-fade-up delay-300">
                                {[
                                    { label: 'Cuộc tham vấn\nđang mở', value: '24' },
                                    { label: 'Lượt người\ntham gia đóng góp', value: '85K+' },
                                    { label: 'Lĩnh vực\ntrọng điểm', value: '32' },
                                ].map(s => (
                                    <div key={s.label} className="text-white min-w-[120px]">
                                        <div className="text-[36px] md:text-[42px] font-black leading-none text-amber-300">{s.value}</div>
                                        <div className="text-blue-200 text-[13.5px] font-medium mt-2 leading-snug whitespace-pre-line">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side: 3 Feature Overview Cards */}
                        <div className="lg:w-[400px] xl:w-[440px] shrink-0 w-full -mt-6 lg:-mt-10 animate-fade-up delay-400">
                            <div className="flex flex-col gap-4 md:gap-5">
                                {[
                                    { id: '/hien-ke/gop-y-nhanh?topic=doi-song', label: 'Hiến kế của bạn', desc: 'Ý kiến, sáng kiến của bạn góp phần nâng cao chất lượng, hiệu quả công tác xây dựng, tổ chức thi hành pháp luật.', icon: Heart, color: 'text-green-600', hue: 'bg-green-500' },
                                    { id: '/hien-ke/noi-bat', label: 'Chúng tôi cần bạn', desc: 'Nội dung, chủ đề cần sáng kiến, ý kiến đóng góp của bạn.', icon: TrendingUp, color: 'text-blue-600', hue: 'bg-blue-500' },
                                    { id: '/hien-ke/linh-vuc', label: 'Có thể bạn quan tâm', desc: 'Sáng kiến, ý kiến của bạn trên từng lĩnh vực cụ thể.', icon: Scale, color: 'text-purple-600', hue: 'bg-purple-500' },
                                ].map(item => (
                                    <Link key={item.id} to={item.id} className="relative overflow-hidden flex items-center gap-5 p-5 xl:px-6 bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 group h-[130px] xl:h-[136px]">
                                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.hue} opacity-80`} />
                                        <div className={`w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0 ${item.color}`}>
                                            <item.icon size={26} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-[17px] xl:text-[20px] mb-1">{item.label}</h3>
                                            <p className="text-blue-100/70 text-[13.5px] leading-relaxed pr-1">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
                .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeIn { to { opacity: 1; } }

                @keyframes cinematicZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.12); }
                }
                .animate-bg-cinematic { animation: cinematicZoom 30s alternate ease-in-out infinite; transform-origin: center center; }

                @keyframes goldAura {
                    0% { opacity: 0.2; }
                    50% { opacity: 0.9; }
                    100% { opacity: 0.2; }
                }
                .animate-gold-aura { animation: goldAura 8s ease-in-out infinite; }

                @keyframes textShimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                .animate-text-shimmer {
                    animation: textShimmer 8s linear infinite;
                }
            `}</style>
        </div>
    );
}

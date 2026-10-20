import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { NA_NEWS, NA_LIST_URL } from '../data/nationalAssemblyNews';

// Khối chuyên đề "Quốc hội khóa XVI - Kỳ họp thứ hai"
// Nền đỏ gradient có trang trí (vòng trống đồng, ngôi sao, dải lụa, lưới chấm);
// quốc huy phía trên tiêu đề chữ vàng; tin đặt trực tiếp trên nền (ảnh bo góc, chữ trắng),
// bố cục như daibieunhandan.vn: tin chính + 1 tin bên phải, hàng dưới 3 tin nhỏ (không có ô Media).
// Trang chủ chỉ hiển thị 5 tin đầu: tin chính, tin bên phải, 3 tin nhỏ
const [FEATURED, SIDE, ...SMALL] = NA_NEWS.slice(0, 5);

// Bấm tin mở trang chi tiết bài viết /news/{id}
const newsUrl = (id) => `/news/${id}`;
const DateTime = ({ date, time }) => (
    <div className="flex items-center gap-3 text-[12px] text-white/70">
        <span className="flex items-center gap-1.5"><Calendar size={13} /> {date}</span>
        <span className="flex items-center gap-1.5"><Clock size={13} /> {time}</span>
    </div>
);

// Vòng tròn đồng tâm kiểu mặt trống đồng (trang trí chìm)
const DrumRings = ({ className }) => (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
        <g fill="none" stroke="currentColor">
            {[195, 170, 150, 125, 100, 80, 58, 38].map((r, i) => (
                <circle key={r} cx="200" cy="200" r={r} strokeWidth={i % 3 === 0 ? 2 : 1} strokeDasharray={i % 2 ? '3 6' : undefined} />
            ))}
            {Array.from({ length: 14 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 14;
                return <line key={i} x1={200 + Math.cos(a) * 12} y1={200 + Math.sin(a) * 12} x2={200 + Math.cos(a) * 36} y2={200 + Math.sin(a) * 36} strokeWidth="2" />;
            })}
        </g>
        <polygon fill="currentColor" points="200,182 205,195 219,195 208,203 212,217 200,209 188,217 192,203 181,195 195,195" />
    </svg>
);

const Star = ({ className, style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
        <polygon fill="currentColor" points="12,1 14.8,8.6 23,8.9 16.6,14 18.9,22 12,17.4 5.1,22 7.4,14 1,8.9 9.2,8.6" />
    </svg>
);

const NationalAssemblySection = () => (
    <section className="relative overflow-hidden mt-8 mb-5 text-white isolate" aria-labelledby="qh-khoa-xvi-title">
        {/* ---- Nền gradient ---- */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#e2342c_0%,#c8121a_22%,#b90c12_45%,#d61a1e_62%,#c50f15_78%,#e4362d_100%)]" />
        {/* quầng sáng */}
        <div className="absolute -z-10 -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,90,0.35),transparent)]" />
        <div className="absolute -z-10 -bottom-32 -left-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,110,80,0.30),transparent)]" />
        {/* hai góc sáng: trái trên, phải dưới */}
        <div className="absolute -z-10 -top-48 -left-40 w-[640px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(255,150,120,0.55),rgba(255,90,70,0.2)_55%,transparent)]" />
        <div className="absolute -z-10 -bottom-48 -right-40 w-[680px] h-[580px] rounded-full bg-[radial-gradient(closest-side,rgba(255,150,120,0.55),rgba(255,90,70,0.2)_55%,transparent)]" />
        {/* dải lụa chéo */}
        <div className="absolute -z-10 -left-1/4 top-0 h-full w-[150%] opacity-20 bg-[repeating-linear-gradient(160deg,transparent_0px,transparent_80px,rgba(255,255,255,0.22)_140px,transparent_200px)]" />
        {/* lưới chấm vàng mờ ở rìa */}
        <div className="absolute -z-10 inset-0 opacity-25 bg-[radial-gradient(rgba(255,215,120,0.55)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black_85%)]" />
        {/* vòng trống đồng hai góc, xoay chậm */}
        <DrumRings className="absolute -z-10 -left-28 -top-28 w-[380px] h-[380px] text-[#ffd84d] opacity-[0.12] animate-[spin_120s_linear_infinite] motion-reduce:animate-none" />
        <DrumRings className="absolute -z-10 -right-36 -bottom-36 w-[460px] h-[460px] text-[#ffd84d] opacity-[0.10] animate-[spin_160s_linear_infinite_reverse] motion-reduce:animate-none" />
        {/* ngôi sao vàng rải rác */}
        <Star className="absolute -z-10 top-10 left-[12%] w-4 h-4 text-[#ffd84d]/70 animate-pulse motion-reduce:animate-none" />
        <Star className="absolute -z-10 top-24 right-[16%] w-3 h-3 text-[#ffd84d]/60 animate-pulse motion-reduce:animate-none" style={{ animationDelay: '0.8s' }} />
        <Star className="absolute -z-10 bottom-16 left-[30%] w-2.5 h-2.5 text-[#ffd84d]/50 animate-pulse motion-reduce:animate-none" style={{ animationDelay: '1.6s' }} />
        <Star className="absolute -z-10 bottom-24 right-[8%] w-5 h-5 text-[#ffd84d]/40" />
        {/* viền vàng trên, dưới */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd84d] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd84d] to-transparent" />

        <div className="relative container mx-auto px-4 max-w-[1504px] py-10 md:py-12">
            {/* ---- Tiêu đề: quốc huy phía trên ---- */}
            <Link to={NA_LIST_URL} className="flex flex-col items-center gap-3.5 group w-fit mx-auto">
                <img src="/logo.png" alt="Quốc huy" className="w-14 h-14 md:w-[68px] md:h-[68px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" />
                <div className="text-center leading-tight" style={{ fontFamily: '"Merriweather", "Times New Roman", serif' }}>
                    <h2 id="qh-khoa-xvi-title" className="text-[20px] md:text-[25px] font-bold uppercase text-[#ffd84d] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] group-hover:text-[#ffe680] transition-colors">
                        Quốc hội khóa XVI
                    </h2>
                    <p className="text-[15px] md:text-[18px] font-bold uppercase text-[#ffd84d] mt-1 tracking-wide">Kỳ họp thứ hai</p>
                </div>
            </Link>

            {/* Thanh trang trí phân cách tiêu đề và tin tức */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-8 md:mb-10" aria-hidden="true">
                <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#ffd84d]" />
                <Star className="w-3 h-3 text-[#ffd84d]" />
                <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#ffd84d]" />
            </div>

            {/* Bố cục như daibieunhandan.vn (bỏ ô Media): hàng trên tin chính + 1 tin bên phải; hàng dưới 3 tin nhỏ */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-7">
                {/* ---- Tin chính: ảnh trái, chữ phải ---- */}
                <Link to={newsUrl(FEATURED.id)} className="lg:col-span-3 group grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-[0_14px_36px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                        <img src={FEATURED.image} alt={FEATURED.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-[19px] md:text-[23px] leading-snug text-white group-hover:text-[#ffd84d] transition-colors">
                            <span className="line-clamp-3">{FEATURED.title}</span>
                        </h3>
                        <p className="mt-3 text-[14px] leading-relaxed text-white/85 line-clamp-5">{FEATURED.summary}</p>
                        <div className="mt-3"><DateTime date={FEATURED.date} time={FEATURED.time} /></div>
                    </div>
                </Link>

                {/* ---- Tin bên phải: ảnh trên, tiêu đề dưới ---- */}
                <Link to={newsUrl(SIDE.id)} className="group block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-[0_10px_26px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                        <img src={SIDE.image} alt={SIDE.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="mt-3 font-bold text-[16px] leading-snug text-white group-hover:text-[#ffd84d] transition-colors">
                        <span className="line-clamp-3">{SIDE.title}</span>
                    </h3>
                    <div className="mt-1.5"><DateTime date={SIDE.date} time={SIDE.time} /></div>
                </Link>

                {/* ---- Hàng dưới: 3 tin nhỏ, ảnh trái, tiêu đề phải; nét gạch mờ phân cách với hàng trên ---- */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 pt-6 border-t border-white/20">
                    {SMALL.map((item) => (
                        <Link key={item.id} to={newsUrl(item.id)} className="group flex gap-4 items-start">
                            <div className="relative w-[150px] md:w-[168px] shrink-0 aspect-[16/10] rounded-lg overflow-hidden shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                                <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[16px] md:text-[17px] leading-snug text-white group-hover:text-[#ffd84d] transition-colors line-clamp-3">{item.title}</h4>
                                <div className="mt-1.5"><DateTime date={item.date} time={item.time} /></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default NationalAssemblySection;

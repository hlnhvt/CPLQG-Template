import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Newspaper, Sparkles, Megaphone, Activity, Users, Mic, BookOpen, FilePen, Bookmark, BarChart3,
    Handshake, BadgeCheck, Trophy, Scale, Briefcase, Building2, Landmark, MonitorSmartphone, FileText,
    ChevronRight, ArrowUp
} from 'lucide-react';
import TuyenQuangHeader from './TuyenQuangHeader';
import LaoCaiV2BannerDecor, { BANNER_BG_CLASS } from '../laocaiV2/LaoCaiV2BannerDecor';
import { tuyenquangSiteConfig, tuyenquangTicker, TQ_HOME } from '../../data/tuyenquangMockData';

// Icon theo khóa khai báo trong dữ liệu chuyên mục / liên kết
export const TQ_ICONS = {
    newspaper: Newspaper, sparkles: Sparkles, megaphone: Megaphone, activity: Activity, users: Users,
    mic: Mic, book: BookOpen, filePen: FilePen, bookmark: Bookmark, chart: BarChart3, handshake: Handshake,
    badge: BadgeCheck, trophy: Trophy, scale: Scale, briefcase: Briefcase, building: Building2,
    landmark: Landmark, monitor: MonitorSmartphone, file: FileText
};

// Thanh tin trôi ngang dưới nav header (cùng phong cách Cổng Lào Cai)
export const TuyenQuangTicker = () => {
    const [isPaused, setIsPaused] = useState(false);
    return (
        <div className="w-full bg-white border-b border-gray-200/90 relative z-30 select-none">
            <style>{`
                @keyframes tqMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .tq-marquee-track { display: inline-flex; white-space: nowrap; animation: tqMarquee 40s linear infinite; }
                @media (prefers-reduced-motion: reduce) { .tq-marquee-track { animation: none; } }
            `}</style>
            <div className="container mx-auto px-4 max-w-[1504px] h-10 sm:h-11 flex items-center">
                <div
                    className="relative w-full h-full overflow-hidden flex items-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    <div className="tq-marquee-track" style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
                        {[...tuyenquangTicker, ...tuyenquangTicker].map((item, idx) => (
                            <Link
                                key={`${item.id}-${idx}`}
                                to={item.link}
                                aria-hidden={idx >= tuyenquangTicker.length}
                                tabIndex={idx >= tuyenquangTicker.length ? -1 : undefined}
                                className="inline-flex items-center gap-2 text-xs sm:text-[13px] mr-8 group/item shrink-0"
                            >
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 uppercase shrink-0">{item.tag}</span>
                                <span className="text-gray-900 group-hover/item:text-[#991b1b] group-hover/item:underline transition-colors">{item.title}</span>
                                <span className="text-gray-300 ml-4 font-bold">•</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Breadcrumb + banner đầu trang con (đồng bộ LaoCaiV2PageIntro)
export const TuyenQuangPageIntro = ({ crumbs = [], title, subtitle }) => (
    <>
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                <Link to={TQ_HOME} className="hover:text-blue-700">Trang chủ Tuyên Quang</Link>
                {crumbs.map((c, i) => (
                    <React.Fragment key={c.label}>
                        <ChevronRight size={14} />
                        {c.to
                            ? <Link to={c.to} className="hover:text-blue-700">{c.label}</Link>
                            : <span className={i === crumbs.length - 1 ? 'text-gray-800 font-semibold' : ''}>{c.label}</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div className={`relative text-white py-8 sm:py-10 overflow-hidden ${BANNER_BG_CLASS} border-b border-indigo-400/30`}>
            <LaoCaiV2BannerDecor />
            <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight drop-shadow-md">{title}</h1>
                <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                {subtitle && <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm">{subtitle}</p>}
            </div>
        </div>
    </>
);

// Footer (đồng bộ LaoCaiV2Footer, thông tin theo trang PBGDPL Tuyên Quang)
export const TuyenQuangFooter = () => {
    const s = tuyenquangSiteConfig;
    const links = [
        { to: `${TQ_HOME}/gioi-thieu`, label: 'Giới thiệu' },
        { to: `${TQ_HOME}/gioi-thieu?tab=quy-che`, label: 'Quy chế hoạt động' },
        { to: `${TQ_HOME}/van-ban`, label: 'Văn bản chỉ đạo điều hành' },
        { to: `${TQ_HOME}/chuyen-muc/tai-lieu-pbgdpl`, label: 'Tài liệu PBGDPL' },
        { to: `${TQ_HOME}/hoi-dap`, label: 'Hỏi đáp, tư vấn' },
        { to: `${TQ_HOME}/lien-he`, label: 'Liên hệ Ban Biên tập' }
    ];
    return (
        <footer className="relative bg-gradient-to-r from-[#00bdf2] via-[#0072ff] to-[#05115e] text-white overflow-hidden text-[14px]">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-15 mix-blend-overlay">
                {[1200, 1000, 800, 600, 400, 200].map((d, i) => (
                    <div key={d} className="rounded-full border border-white/50 absolute left-1/2 -translate-x-1/2" style={{ width: d, height: d, top: `${30 + i * 10}%` }} />
                ))}
            </div>
            <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center text-center">
                <img src="/logo.png" alt="Quốc huy" className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] object-contain drop-shadow-md mb-3" />
                <h2 className="text-[18px] md:text-[22px] font-bold uppercase mb-2 drop-shadow-md">{s.name}</h2>
                <div className="space-y-1 mb-4 text-[13px] md:text-[14px] max-w-4xl">
                    <p>Cơ quan chủ quản: {s.governingBody} | Cơ quan thường trực: {s.operatingBody}</p>
                    <p>Địa chỉ: {s.address} | Điện thoại: {s.phone} | Fax: {s.fax} | Email: {s.email}</p>
                    <p>Chịu trách nhiệm chính: {s.chiefEditor}</p>
                    <p className="opacity-90">{s.license}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-4 text-[13px] md:text-[14px]">
                    {links.map((l, i) => (
                        <React.Fragment key={l.label}>
                            {i > 0 && <span className="hidden md:inline">|</span>}
                            <Link to={l.to} className="hover:text-yellow-300 transition-colors">{l.label}</Link>
                        </React.Fragment>
                    ))}
                </div>
                <div className="text-[12px] md:text-[13px] font-light opacity-90">
                    © Bản quyền thuộc Cổng Pháp luật tỉnh Tuyên Quang - Kết nối liên thông Cổng Pháp luật quốc gia
                </div>
            </div>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed right-4 bottom-8 md:right-8 z-[100] w-11 h-11 rounded-full bg-gradient-to-br from-[#00bdf2] to-[#05115e] border-2 border-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_4px_15px_rgba(0,114,255,0.4)]"
                title="Lên đầu trang"
                aria-label="Lên đầu trang"
            >
                <ArrowUp size={20} className="text-white stroke-[2.5px]" />
            </button>
        </footer>
    );
};

// Khung dùng chung cho trang con: header + banner đầu trang + nội dung + footer
export const TuyenQuangPageShell = ({ crumbs, title, subtitle, children }) => (
    <div className="bg-[#f8fafc] min-h-screen font-sans flex flex-col">
        <TuyenQuangHeader />
        <TuyenQuangPageIntro crumbs={crumbs} title={title} subtitle={subtitle} />
        <main className="flex-1 container mx-auto px-4 max-w-[1286px] py-8">{children}</main>
        <TuyenQuangFooter />
    </div>
);


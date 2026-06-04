import React from 'react';
import { Link } from 'react-router-dom';
import {
    MessageSquare, HelpCircle, Lightbulb, Megaphone,
    Search, FileText, FilePen, Scale,
    Video, BarChart3, ClipboardList, UserCheck,
    BookOpen, Newspaper, Image, Bell,
    ArrowRight, Layers, Sparkles
} from 'lucide-react';

const apps = [
    {
        id: 1,
        label: 'Diễn đàn',
        sublabel: 'Pháp luật',
        to: '/dien-dan',
        icon: MessageSquare,
        gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        shadow: 'rgba(99,102,241,0.5)',
    },
    {
        id: 2,
        label: 'Hỏi đáp',
        sublabel: 'Pháp luật',
        to: '/cau-hoi-phap-luat',
        icon: HelpCircle,
        gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        shadow: 'rgba(168,85,247,0.5)',
    },
    {
        id: 3,
        label: 'Hiến kế',
        sublabel: 'Sáng kiến',
        to: '/hien-ke',
        icon: Lightbulb,
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
        shadow: 'rgba(16,185,129,0.5)',
    },
    {
        id: 4,
        label: 'Phản ánh',
        sublabel: 'Kiến nghị',
        to: '/phan-anh-kien-nghi',
        icon: Megaphone,
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        shadow: 'rgba(245,158,11,0.5)',
    },
    {
        id: 5,
        label: 'Tổng rà soát',
        sublabel: 'Hệ thống',
        to: '/tong-ra-soat',
        icon: Search,
        gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
        shadow: 'rgba(239,68,68,0.5)',
    },
    {
        id: 6,
        label: 'Văn bản',
        sublabel: 'QPPL',
        to: '/van-ban',
        icon: FileText,
        gradient: 'linear-gradient(135deg, #0284c7, #0369a1)',
        shadow: 'rgba(2,132,199,0.5)',
    },
    {
        id: 7,
        label: 'Dự thảo',
        sublabel: 'Văn bản',
        to: '/du-thao',
        icon: FilePen,
        gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
        shadow: 'rgba(8,145,178,0.5)',
    },
    {
        id: 8,
        label: 'Trợ giúp',
        sublabel: 'Pháp lý',
        to: '/tro-giup-phap-ly',
        icon: Scale,
        gradient: 'linear-gradient(135deg, #16a34a, #15803d)',
        shadow: 'rgba(22,163,74,0.5)',
    },
    {
        id: 9,
        label: 'Video',
        sublabel: 'Pháp luật',
        to: '/video',
        icon: Video,
        gradient: 'linear-gradient(135deg, #db2777, #be185d)',
        shadow: 'rgba(219,39,119,0.5)',
    },
    {
        id: 10,
        label: 'Infographic',
        sublabel: 'Trực quan',
        to: '/infographic',
        icon: BarChart3,
        gradient: 'linear-gradient(135deg, #d97706, #b45309)',
        shadow: 'rgba(217,119,6,0.5)',
    },
    {
        id: 11,
        label: 'Khảo sát',
        sublabel: 'Ý kiến',
        to: '/khao-sat',
        icon: ClipboardList,
        gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        shadow: 'rgba(6,182,212,0.5)',
    },
    {
        id: 12,
        label: 'Chuyên gia',
        sublabel: 'Tư vấn',
        to: '/cau-hoi-phap-luat/chuyen-gia',
        icon: UserCheck,
        gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        shadow: 'rgba(124,58,237,0.5)',
    },
    {
        id: 13,
        label: 'Tin tức',
        sublabel: 'Nổi bật',
        to: '/tin-tuc/noi-bat',
        icon: Newspaper,
        gradient: 'linear-gradient(135deg, #475569, #334155)',
        shadow: 'rgba(71,85,105,0.5)',
    },
    {
        id: 14,
        label: 'Thư viện ảnh',
        sublabel: 'Hình ảnh',
        to: '/anh',
        icon: Image,
        gradient: 'linear-gradient(135deg, #ec4899, #a855f7)',
        shadow: 'rgba(236,72,153,0.5)',
    },
    {
        id: 15,
        label: 'Nghiên cứu',
        sublabel: 'Trao đổi',
        to: '/tin-tuc/nghien-cuu-trao-doi',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg, #0e7490, #155e75)',
        shadow: 'rgba(14,116,144,0.5)',
    },
    {
        id: 16,
        label: 'Đăng ký',
        sublabel: 'Bản tin',
        to: '/ban-tin/dang-ky',
        icon: Bell,
        gradient: 'linear-gradient(135deg, #ea580c, #c2410c)',
        shadow: 'rgba(234,88,12,0.5)',
    },
];

const AppLauncherSection = () => {
    return (
        <section
            className="relative overflow-hidden mt-4"
            style={{
                background: 'linear-gradient(135deg, rgb(15 71 158) 0%, rgb(69 114 187) 35%, rgb(42 47 127) 65%, rgb(71 87 129) 100%)',
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none -z-0">
                {/* Glowing orbs */}
                <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
                <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/20 blur-[80px]" />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                {/* Top highlight line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-[1504px] py-10">
                <div className="flex flex-col lg:flex-row gap-10 items-center">

                    {/* ===== LEFT: Introduction Panel ===== */}
                    <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col items-start">

                        {/* Logo */}
                        <div className="w-full flex justify-center mb-5">
                            <img
                                src="/logo.png"
                                alt="Quốc huy"
                                className="w-16 h-16 object-contain drop-shadow-lg"
                            />
                        </div>

                        {/* Title */}
                        <h2 className="text-[22px] xl:text-[26px] font-bold text-center text-white leading-tight mb-4 tracking-tight">
                            Khám phá toàn bộ chức năng
                        </h2>

                        {/* Description */}
                        <p className="text-slate-400 text-[13px] leading-relaxed mb-6">
                            Truy cập nhanh tất cả chuyên mục và dịch vụ pháp luật — từ tra cứu văn bản, tham vấn ý kiến đến hỏi đáp chuyên gia, diễn đàn cộng đồng và nhiều tiện ích khác.
                        </p>


                    </div>

                    {/* ===== RIGHT: App Grid ===== */}
                    <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {apps.map((app) => {
                                const Icon = app.icon;
                                return (
                                    <Link
                                        key={app.id}
                                        to={app.to}
                                        className="flex flex-col items-center gap-2 group outline-none py-2"
                                    >
                                        {/* Icon tile */}
                                        <div
                                            className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1 shrink-0"
                                            style={{
                                                background: app.gradient,
                                                boxShadow: `0 6px 18px ${app.shadow}`,
                                            }}
                                        >
                                            <Icon size={30} className="text-white" strokeWidth={1.7} />
                                        </div>

                                        {/* Label */}
                                        <div className="text-center leading-tight">
                                            <span className="block text-[12px] font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-1">
                                                {app.label}
                                            </span>
                                            <span className="block text-[10px] text-white/45 group-hover:text-white/65 transition-colors line-clamp-1">
                                                {app.sublabel}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AppLauncherSection;

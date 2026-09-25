import React from 'react';

// Nền + trang trí banner đồng bộ với banner trang /lao-cai-v2/van-ban
// Dùng: đặt BANNER_BG_CLASS lên khối banner (cần relative overflow-hidden), chèn <LaoCaiV2BannerDecor /> làm con đầu tiên,
// nội dung banner đặt trong khối có "relative z-10".
export const BANNER_BG_CLASS = 'bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca]';

const LaoCaiV2BannerDecor = () => (
    <>
        <style>{`
            @keyframes laocaiV2RotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes laocaiV2RotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            @keyframes laocaiV2PulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
            @keyframes laocaiV2FloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
            @keyframes laocaiV2SweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
        `}</style>

        {/* 1. Lưới điểm chấm */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

        {/* 2. Dải quét sáng */}
        <div
            className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
            style={{ animation: 'laocaiV2SweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        />

        {/* 3. Quầng sáng */}
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4s ease-in-out infinite' }} />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4.5s ease-in-out infinite 1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 5.5s ease-in-out infinite 0.5s' }} />

        {/* 4. Vòng tròn quỹ đạo */}
        <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
        <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiV2RotateCW 16s linear infinite' }} />
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiV2RotateCCW 18s linear infinite' }} />

        {/* 5. Điểm nhấn kim cương */}
        <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiV2FloatDiamond 3.2s ease-in-out infinite' }} />
        <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiV2FloatDiamond 3.6s ease-in-out infinite 0.8s' }} />
    </>
);

export default LaoCaiV2BannerDecor;

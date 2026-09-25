import React, { useState } from 'react';
import { 
    Award, 
    BookOpen, 
    FileDown, 
    ChevronRight, 
    Sparkles, 
    Landmark, 
    Building2, 
    Coins, 
    Layers, 
    ExternalLink,
    CheckCircle2
} from 'lucide-react';
import { luatThuDo2024Data } from '../../data/laocaiV2MockData';

const iconMap = {
    Landmark: Landmark,
    Sparkles: Sparkles,
    Coins: Coins,
    Building2: Building2
};

const LuatThuDoSection = () => {
    const [activePillar, setActivePillar] = useState(1);

    return (
        <section id="luat-thu-do" className="py-14 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border-b border-gray-200">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#8b1515] via-[#a82222] to-[#731010] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-10">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 text-xs font-bold uppercase px-3 py-1 rounded-md shadow-sm">
                            <Award size={14} />
                            <span>Trọng tâm thể chế Lào Cai</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                            {luatThuDo2024Data.title}
                        </h2>

                        <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
                            {luatThuDo2024Data.summary}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <span className="text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-lg border border-white/20">
                                📅 Có hiệu lực từ: <strong>{luatThuDo2024Data.effectiveDate}</strong>
                            </span>
                            <a
                                href="#van-ban-lao-cai"
                                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow transition"
                            >
                                <BookOpen size={14} />
                                <span>Tra cứu hệ thống VB hướng dẫn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 4 Pillars of Breakthrough Mechanisms */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-2.5 h-6 bg-red-700 rounded-sm inline-block"></span>
                                4 Trụ Cột Chính Sách Phát Triển Của Tỉnh
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                Các lĩnh vực ưu tiên được HĐND, UBND tỉnh Lào Cai cụ thể hóa bằng cơ chế, chính sách riêng
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {luatThuDo2024Data.pillars.map((pillar) => {
                            const IconComponent = iconMap[pillar.icon] || Landmark;
                            const isSelected = activePillar === pillar.id;

                            return (
                                <div
                                    key={pillar.id}
                                    onClick={() => setActivePillar(pillar.id)}
                                    className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 ${
                                        isSelected 
                                            ? 'bg-white border-red-600 shadow-xl ring-2 ring-red-500/20 -translate-y-1' 
                                            : 'bg-white/80 border-gray-200 hover:border-red-300 hover:shadow-md'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            isSelected ? 'bg-red-700 text-white' : 'bg-red-50 text-red-700'
                                        }`}>
                                            <IconComponent size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                            {pillar.badge}
                                        </span>
                                    </div>

                                    <h4 className="font-bold text-gray-900 text-sm mb-2 leading-snug">
                                        {pillar.title}
                                    </h4>

                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Key Implementing Resolutions Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 gap-2 mb-4">
                        <div>
                            <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                <Layers size={18} className="text-red-700" />
                                Nghị Quyết & Quyết Định Tiêu Biểu Của HĐND, UBND Tỉnh Lào Cai
                            </h4>
                            <p className="text-xs text-gray-500">
                                Cụ thể hóa chính sách đặc thù, bảo đảm thực thi đồng bộ, hiệu quả trên địa bàn tỉnh
                            </p>
                        </div>
                        <a 
                            href="#van-ban-lao-cai"
                            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 shrink-0"
                        >
                            <span>Xem tất cả</span>
                            <ChevronRight size={14} />
                        </a>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {luatThuDo2024Data.implementingResolutions.map((item, idx) => (
                            <div key={idx} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-gray-50/80 px-2 rounded-lg transition">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-red-100 text-red-800 font-bold text-xs px-2.5 py-0.5 rounded">
                                            {item.code}
                                        </span>
                                        <span className="text-[11px] text-gray-400">
                                            Ban hành: {item.date}
                                        </span>
                                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium inline-flex items-center gap-1">
                                            <CheckCircle2 size={11} /> {item.status}
                                        </span>
                                    </div>
                                    <div className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-red-700 cursor-pointer transition">
                                        {item.title}
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                        Cơ quan ban hành: <strong>{item.agency}</strong>
                                    </div>
                                </div>

                                <button 
                                    type="button"
                                    className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md font-semibold transition shrink-0"
                                >
                                    <FileDown size={14} />
                                    <span>Tải văn bản</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LuatThuDoSection;

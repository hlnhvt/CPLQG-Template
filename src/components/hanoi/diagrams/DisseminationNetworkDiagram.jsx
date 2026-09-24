import React from 'react';
import { 
    Building2, 
    ShieldCheck, 
    Users
} from 'lucide-react';

const TIERS_DATA = [
    {
        id: 'city',
        step: '01',
        name: 'Cấp Thành Phố',
        title: 'Hội đồng PBGDPL Thành phố',
        role: 'Chiến lược & Điều phối',
        agency: 'Hội đồng Phối hợp PBGDPL Thành phố & Thường trực Sở Tư pháp Hà Nội',
        icon: Building2,
        desc: 'Định hướng chiến lược, ban hành kế hoạch PBGDPL toàn diện hàng năm và giai đoạn cho toàn Thủ đô. Chủ trì tổ chức các chiến dịch truyền thông chính sách quy mô lớn, vận hành Cổng số và bồi dưỡng chuyên môn cho đội ngũ báo cáo viên pháp luật.'
    },
    {
        id: 'district',
        step: '02',
        name: 'Cấp Quận / Huyện / Thị xã',
        title: 'Hội đồng PBGDPL Cấp Huyện',
        role: 'Triển khai & Giám sát',
        agency: '30 Hội đồng PBGDPL cấp huyện & 30 Phòng Tư pháp quận, huyện, thị xã',
        icon: ShieldCheck,
        desc: 'Cụ thể hóa kế hoạch của Thành phố sát với đặc thù kinh tế - xã hội của từng địa phương; đôn đốc công tác PBGDPL tại các cơ quan, đơn vị, trường học và khu công nghiệp; quản lý mạng lưới tuyên truyền viên pháp luật tại cơ sở.'
    },
    {
        id: 'commune',
        step: '03',
        name: 'Cấp Xã, Phường & Cơ sở',
        title: 'Tổ dân phố & Tổ hòa giải cơ sở',
        role: 'Thực thi & Hòa giải',
        agency: '579 UBND xã, phường; Công chức Tư pháp - Hộ tịch & gần 5.000 Tổ hòa giải cơ sở',
        icon: Users,
        desc: 'Đưa pháp luật trực tiếp đến từng hộ dân, khu dân cư, tổ dân phố, cụm làng nghề và ngõ xóm; phát huy hiệu quả mạng lưới Tổ hòa giải cơ sở để hòa giải kịp thời các mâu thuẫn, tranh chấp nội bộ trong nhân dân.'
    }
];

export default function DisseminationNetworkDiagram() {
    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden font-sans">
            {/* Diagram Flow Animations */}
            <style>{`
                @keyframes cleanDashFlow {
                    0% { stroke-dashoffset: 24; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

            {/* Header (No colorful badge) */}
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Hệ Thống Phổ Biến Giáo Dục Pháp Luật Liên Thông 3 Cấp
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Sơ đồ điều phối đa tầng liên kết chỉ đạo xuyên suốt từ Cấp Thành phố đến cơ sở:
                </p>
            </div>

            {/* DIAGRAM WITH ELEGANT NAVY CONNECTING CONDUIT */}
            <div className="relative pt-4 pb-1">
                {/* Desktop Connecting Line */}
                <div className="hidden lg:block absolute top-[48px] left-[15%] right-[15%] h-6 pointer-events-none z-0">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 24">
                        {/* Base Line Track */}
                        <path
                            d="M 10 12 L 590 12"
                            stroke="#e2e8f0"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Subtle Animated Flowing Dash */}
                        <path
                            d="M 10 12 L 590 12"
                            stroke="#0f4c81"
                            strokeWidth="2.5"
                            strokeDasharray="6 6"
                            strokeLinecap="round"
                            opacity="0.8"
                            style={{ animation: 'cleanDashFlow 1.6s linear infinite' }}
                        />

                        {/* Connection Arrows between Nodes */}
                        <g transform="translate(195, 6)">
                            <polygon points="0,2 8,6 0,10" fill="#0f4c81" />
                        </g>
                        <g transform="translate(395, 6)">
                            <polygon points="0,2 8,6 0,10" fill="#0f4c81" />
                        </g>
                    </svg>
                </div>

                {/* 3 Diagram Node Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                    {TIERS_DATA.map((tier) => {
                        const IconComp = tier.icon;

                        return (
                            <div
                                key={tier.id}
                                className="group rounded-xl p-6 transition-all duration-200 border border-slate-200 bg-white hover:border-[#0f4c81] hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div className="space-y-3.5">
                                    {/* Top Node Header: Step & Icon */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-[#0f4c81] flex items-center justify-center font-bold text-sm group-hover:bg-[#0f4c81] group-hover:text-white group-hover:border-[#0f4c81] transition-colors">
                                            {tier.step}
                                        </div>

                                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center group-hover:text-[#0f4c81] transition-colors">
                                            <IconComp size={18} />
                                        </div>
                                    </div>

                                    {/* Tier Name & Role */}
                                    <div>
                                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide block mb-0.5">
                                            {tier.role}
                                        </span>
                                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                            {tier.name}
                                        </h4>
                                        <p className="text-[11.5px] text-slate-500 font-medium mt-1">
                                            {tier.agency}
                                        </p>
                                    </div>

                                    {/* Full Description without truncation */}
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify pt-1 border-t border-slate-100">
                                        {tier.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

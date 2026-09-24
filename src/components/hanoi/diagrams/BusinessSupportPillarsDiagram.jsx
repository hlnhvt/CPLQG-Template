import React from 'react';
import { 
    Building2, 
    Scale, 
    Sparkles, 
    Rocket
} from 'lucide-react';

const PILLARS_DATA = [
    {
        id: "pillar-1",
        step: "01",
        name: "Cơ quan Thể chế",
        role: "Kiến tạo & Cấp phép Sandbox",
        agency: "UBND Thành phố Hà Nội, Sở Tư pháp, Sở Kế hoạch & Đầu tư",
        icon: Building2,
        desc: "Ban hành cơ chế đặc thù, cấp phép thử nghiệm có kiểm soát (Sandbox theo Điều 25 Luật Thủ Đô) và ban hành các chính sách ưu đãi đầu tư, tiền thuê đất và thuế TNDN."
    },
    {
        id: "pillar-2",
        step: "02",
        name: "Chuyên gia & Luật sư",
        role: "Tư vấn chuyên sâu & Thẩm định",
        agency: "Đoàn Luật sư TP. Hà Nội & Hội Luật gia Thành phố Hà Nội",
        icon: Scale,
        desc: "Mạng lưới hơn 5.000 luật sư thành viên và chuyên gia đầu ngành tư vấn pháp lý chuyên sâu, thẩm định hợp đồng thương mại quốc tế và hỗ trợ giải quyết tranh chấp."
    },
    {
        id: "pillar-3",
        step: "03",
        name: "Cổng Số & Trợ Lý AI",
        role: "Hạ tầng số liên thông 24/7",
        agency: "Trung tâm CNTT Sở Tư pháp & Nền tảng Cổng Pháp luật Thủ đô",
        icon: Sparkles,
        desc: "Hạ tầng công nghệ Cổng Pháp luật Thủ đô tiếp nhận yêu cầu 24/7, cung cấp kho biểu mẫu số hóa chuẩn mực và trợ lý ảo AI hỗ trợ tra cứu chính sách tức thì."
    },
    {
        id: "pillar-4",
        step: "04",
        name: "Hiệp hội & Vườn ươm",
        role: "Tập hợp khó khăn & Thử nghiệm",
        agency: "Hiệp hội DN nhỏ & vừa (Hanoisme), Khu CNC Hòa Lạc, VCCI Hà Nội",
        icon: Rocket,
        desc: "Tập hợp khó khăn, vướng mắc thực tiễn từ hơn 380.000 doanh nghiệp trên địa bàn Thủ đô để kiến nghị hoàn thiện thể chế và hỗ trợ ươm mầm khởi nghiệp sáng tạo."
    }
];

export default function BusinessSupportPillarsDiagram() {
    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden font-sans">
            {/* SVG line animation */}
            <style>{`
                @keyframes cleanDashFlow {
                    0% { stroke-dashoffset: 24; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

            {/* Header (No colorful badge) */}
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Mô Hình Phối Hợp 4 Trụ Cột Hỗ Trợ Doanh Nghiệp
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Sơ đồ liên kết phối hợp giữa các cơ quan, đơn vị đồng hành cùng doanh nghiệp Thủ đô:
                </p>
            </div>

            {/* DIAGRAM WITH ELEGANT MONOCHROME / NAVY CONNECTING CONDUIT */}
            <div className="relative pt-4 pb-1">
                {/* Desktop Connecting Line */}
                <div className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-6 pointer-events-none z-0">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 24">
                        {/* Base Line Track */}
                        <path
                            d="M 10 12 L 790 12"
                            stroke="#e2e8f0"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Subtle Animated Flowing Dash */}
                        <path
                            d="M 10 12 L 790 12"
                            stroke="#0f4c81"
                            strokeWidth="2.5"
                            strokeDasharray="6 6"
                            strokeLinecap="round"
                            opacity="0.8"
                            style={{ animation: 'cleanDashFlow 1.6s linear infinite' }}
                        />

                        {/* Direction Arrow Junctions */}
                        <g transform="translate(195, 6)">
                            <polygon points="0,2 8,6 0,10" fill="#0f4c81" />
                        </g>
                        <g transform="translate(395, 6)">
                            <polygon points="0,2 8,6 0,10" fill="#0f4c81" />
                        </g>
                        <g transform="translate(595, 6)">
                            <polygon points="0,2 8,6 0,10" fill="#0f4c81" />
                        </g>
                    </svg>
                </div>

                {/* 4 Pillars Node Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                    {PILLARS_DATA.map((pillar) => {
                        const IconComp = pillar.icon;

                        return (
                            <div
                                key={pillar.id}
                                className="group rounded-xl p-5 transition-all duration-200 border border-slate-200 bg-white hover:border-[#0f4c81] hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div className="space-y-3.5">
                                    {/* Header: Step Number & Icon */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-[#0f4c81] flex items-center justify-center font-bold text-sm group-hover:bg-[#0f4c81] group-hover:text-white group-hover:border-[#0f4c81] transition-colors">
                                            {pillar.step}
                                        </div>

                                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center group-hover:text-[#0f4c81] transition-colors">
                                            <IconComp size={18} />
                                        </div>
                                    </div>

                                    {/* Role & Title */}
                                    <div>
                                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide block mb-0.5">
                                            {pillar.role}
                                        </span>
                                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                            {pillar.name}
                                        </h4>
                                        <p className="text-[11.5px] text-slate-500 font-medium mt-1">
                                            {pillar.agency}
                                        </p>
                                    </div>

                                    {/* Full Description without truncation */}
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify pt-1 border-t border-slate-100">
                                        {pillar.desc}
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

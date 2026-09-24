import React from 'react';
import { 
    FileText, 
    Shield, 
    Users, 
    CheckCircle2
} from 'lucide-react';

const WORKFLOW_STEPS = [
    {
        step: "01",
        title: "Nộp hồ sơ & Tiếp nhận",
        role: "Một cửa & Cổng trực tuyến",
        agency: "Bộ phận Một cửa Trụ sở chính & 8 Chi nhánh thường trực",
        icon: FileText,
        desc: "Công dân nộp hồ sơ yêu cầu trợ giúp pháp lý trực tiếp tại 8 chi nhánh hoặc gửi hồ sơ, đăng ký lịch hẹn trực tuyến qua Cổng Pháp luật Thủ đô."
    },
    {
        step: "02",
        title: "Thẩm tra & Ra quyết định",
        role: "Kiểm tra điều kiện thụ hưởng",
        agency: "Ban Giám đốc Trung tâm & Phòng Nghiệp vụ TGPL",
        icon: Shield,
        desc: "Trung tâm thẩm tra tính hợp lệ của hồ sơ, đối chiếu điều kiện thụ hưởng theo Luật TGPL và ban hành quyết định cử người thực hiện trợ giúp pháp lý."
    },
    {
        step: "03",
        title: "Triển khai nghiệp vụ TGPL",
        role: "Bào chữa, đại diện & tư vấn",
        agency: "Trợ giúp viên pháp lý Nhà nước & Luật sư cộng tác viên",
        icon: Users,
        desc: "Trực tiếp gặp gỡ đương sự, nghiên cứu hồ sơ, thu thập chứng cứ, tham gia các buổi hỏi cung, đối thoại và tham gia tranh tụng tại các phiên tòa xét xử."
    },
    {
        step: "04",
        title: "Nghiệm thu & Trả kết quả",
        role: "Đánh giá chất lượng 100% miễn phí",
        agency: "Hội đồng Đánh giá chất lượng Trung tâm & Sở Tư pháp Hà Nội",
        icon: CheckCircle2,
        desc: "Kiểm tra chất lượng vụ việc, bàn giao bản án hoặc kết quả giải quyết cho người dân, thực hiện khảo sát mức độ hài lòng và số hóa hồ sơ lưu trữ."
    }
];

export default function LegalAidWorkflowDiagram() {
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
                    Quy Trình Tiếp Nhận & Giải Quyết Vụ Việc TGPL 4 Giai Đoạn
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Quy trình khép kín, minh bạch, bảo đảm người dân được hỗ trợ pháp lý nhanh chóng và 100% miễn phí:
                </p>
            </div>

            {/* DIAGRAM WITH ELEGANT NAVY CONNECTING CONDUIT */}
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

                {/* 4 Workflow Node Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                    {WORKFLOW_STEPS.map((item) => {
                        const IconComp = item.icon;

                        return (
                            <div
                                key={item.step}
                                className="group rounded-xl p-5 transition-all duration-200 border border-slate-200 bg-white hover:border-[#0f4c81] hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div className="space-y-3.5">
                                    {/* Header: Step Number & Icon */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-[#0f4c81] flex items-center justify-center font-bold text-sm group-hover:bg-[#0f4c81] group-hover:text-white group-hover:border-[#0f4c81] transition-colors">
                                            {item.step}
                                        </div>

                                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center group-hover:text-[#0f4c81] transition-colors">
                                            <IconComp size={18} />
                                        </div>
                                    </div>

                                    {/* Role & Title */}
                                    <div>
                                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide block mb-0.5">
                                            {item.role}
                                        </span>
                                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-[11.5px] text-slate-500 font-medium mt-1">
                                            {item.agency}
                                        </p>
                                    </div>

                                    {/* Full Description without truncation */}
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify pt-1 border-t border-slate-100">
                                        {item.desc}
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

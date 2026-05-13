import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, Send, Inbox, Clock, CheckCircle,
    Search, Filter, FileText, ArrowRight, Heart,
    TrendingUp, Scale, Calendar
} from 'lucide-react';

// Mock process tracking records
const MOCK_PROCESS_RECORDS = [
    {
        id: "HK-2026-089",
        title: "Đề xuất đơn giản hóa thủ tục cấp giấy phép xây dựng trực tuyến mức độ 4",
        sender: "Nguyễn Văn A (Đại diện Doanh nghiệp)",
        field: "Xây dựng",
        receiveDate: "10/05/2026",
        status: "completed", // completed, processing, received
        statusText: "Đã xử lý & tiếp thu",
        agency: "Bộ Xây dựng",
        responseSummary: "Đã đưa vào dự thảo sửa đổi Nghị định 15/2021/NĐ-CP, rút ngắn thời gian xử lý hồ sơ từ 15 ngày xuống còn 7 ngày làm việc."
    },
    {
        id: "HK-2026-088",
        title: "Giải pháp ứng dụng AI trong phân loại rác thải tại nguồn và ưu đãi thuế sinh thái",
        sender: "Trần Thị B",
        field: "Tài nguyên & Môi trường",
        receiveDate: "08/05/2026",
        status: "processing",
        statusText: "Đang nghiên cứu xử lý",
        agency: "Bộ Tài nguyên và Môi trường",
        responseSummary: "Cục Kiểm soát ô nhiễm môi trường đang tổ chức lấy ý kiến chuyên gia để xây dựng cơ chế hỗ trợ tài chính."
    },
    {
        id: "HK-2026-085",
        title: "Kiến nghị tích hợp thẻ BHYT vào ứng dụng VNeID trong quy trình khám chữa bệnh tuyến xã",
        sender: "Lê Văn C",
        field: "Y tế",
        receiveDate: "05/05/2026",
        status: "completed",
        statusText: "Đã xử lý & tiếp thu",
        agency: "Bộ Y tế & BHXH Việt Nam",
        responseSummary: "Đã hoàn thành triển khai kỹ thuật kết nối liên thông, chính thức áp dụng từ quý III/2026."
    },
    {
        id: "HK-2026-082",
        title: "Cơ chế miễn giảm thuế TNDN cho các startup công nghệ mảng Nông nghiệp thông minh",
        sender: "Phạm Minh D",
        field: "Tài chính",
        receiveDate: "02/05/2026",
        status: "received",
        statusText: "Đã tiếp nhận phân loại",
        agency: "Bộ Tài chính",
        responseSummary: "Hồ sơ hợp lệ, đã chuyển về Vụ Chính sách Thuế để thẩm định bổ sung."
    },
    {
        id: "HK-2026-079",
        title: "Sửa đổi quy định về giờ làm việc ngoài giờ cho lao động ngành gia công xuất khẩu",
        sender: "Hiệp hội Dệt may",
        field: "Lao động - TB&XH",
        receiveDate: "28/04/2026",
        status: "processing",
        statusText: "Đang nghiên cứu xử lý",
        agency: "Bộ Lao động - TB&XH",
        responseSummary: "Đang tổng hợp đưa vào báo cáo đánh giá tác động chính sách (RIA) trình Chính phủ."
    }
];

export default function HienKeQuyTrinhPage() {
    return (
        <div className="bg-gray-50 font-sans pb-6">
            {/* Hero Banner with Background */}
            <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                {/* Subtle gold shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-20">
                    <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] mb-6">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90">Quá trình tiếp nhận, xử lý</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Quá trình tiếp nhận, xử lý
                    </h1>
                    <p className="text-blue-100/90 text-[15px] leading-relaxed">
                        Thông tin minh bạch, cập nhật kịp thời toàn bộ quy trình tiếp nhận, phân loại, nghiên cứu và kết quả xử lý các ý kiến đóng góp từ người dân và doanh nghiệp.
                    </p>

                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] mt-8 relative z-30">
                {/* Thống kê */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Tổng số hiến kế</p>
                            <p className="text-2xl font-bold text-gray-900">1,524</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                            <Inbox size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Đã tiếp nhận</p>
                            <p className="text-2xl font-bold text-gray-900">1,480</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Đang xử lý</p>
                            <p className="text-2xl font-bold text-gray-900">342</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Đã xử lý</p>
                            <p className="text-2xl font-bold text-gray-900">1,138</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Overview Feature Cards */}
                <div className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">Các tính năng</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                to: '/hien-ke/gop-y-nhanh?topic=doi-song',
                                title: 'Hiến kế của bạn',
                                desc: 'Ý kiến, sáng kiến của bạn góp phần nâng cao chất lượng, hiệu quả công tác xây dựng, tổ chức thi hành pháp luật.',
                                icon: Heart,
                                colorText: 'text-green-600',
                                bgLight: 'bg-green-50',
                                borderGlow: 'hover:border-green-300 hover:shadow-green-500/5'
                            },
                            {
                                to: '/hien-ke/noi-bat-v2',
                                title: 'Chúng tôi cần bạn',
                                desc: 'Nội dung, chủ đề nổi bật từ phía cơ quan quản lý nhà nước cần sự hiến kế, tham gia đóng góp của bạn.',
                                icon: TrendingUp,
                                colorText: 'text-blue-600',
                                bgLight: 'bg-blue-50',
                                borderGlow: 'hover:border-blue-300 hover:shadow-blue-500/5'
                            },
                            {
                                to: '/hien-ke/linh-vuc',
                                title: 'Có thể bạn quan tâm',
                                desc: 'Khám phá và tham gia góp ý theo từng lĩnh vực chuyên môn sâu từ Kinh tế, Tư pháp đến Đời sống xã hội.',
                                icon: Scale,
                                colorText: 'text-purple-600',
                                bgLight: 'bg-purple-50',
                                borderGlow: 'hover:border-purple-300 hover:shadow-purple-500/5'
                            }
                        ].map(item => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`p-6 bg-white rounded-2xl border border-gray-150 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between ${item.borderGlow}`}
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-xl ${item.bgLight} ${item.colorText} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                        <item.icon size={24} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-[13.5px] leading-relaxed line-clamp-3">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-1 text-sm font-bold text-gray-700 group-hover:text-amber-600 transition-colors">
                                    Tham gia ngay <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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

const KpiMetricCard = ({ title, value, subtitle, icon: Icon, colorTheme }) => {
    // colorThemes: amber, blue, purple, green
    const themes = {
        amber: {
            iconBg: "bg-amber-500 text-white",
            valueText: "text-amber-600",
            glow: "hover:shadow-[0_8px_24px_rgba(245,158,11,0.15)] hover:border-amber-300"
        },
        blue: {
            iconBg: "bg-blue-600 text-white",
            valueText: "text-blue-600",
            glow: "hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)] hover:border-blue-300"
        },
        purple: {
            iconBg: "bg-purple-600 text-white",
            valueText: "text-purple-600",
            glow: "hover:shadow-[0_8px_24px_rgba(147,51,234,0.15)] hover:border-purple-300"
        },
        green: {
            iconBg: "bg-emerald-600 text-white",
            valueText: "text-emerald-600",
            glow: "hover:shadow-[0_8px_24px_rgba(5,150,105,0.15)] hover:border-emerald-300"
        }
    };

    const currentTheme = themes[colorTheme] || themes.blue;

    return (
        <div className={`p-6 rounded-2xl border border-gray-150 transition-all duration-300 bg-white shadow-sm relative overflow-hidden group ${currentTheme.glow}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
                    <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${currentTheme.valueText}`}>
                        {value}
                    </h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${currentTheme.iconBg}`}>
                    <Icon size={24} strokeWidth={2} />
                </div>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium border-t border-gray-50 pt-3">
                <span className="text-gray-600 font-semibold">{subtitle}</span>
            </div>
            {/* Subtle bottom gradient indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity ${currentTheme.iconBg}`} />
        </div>
    );
};

export default function HienKeQuyTrinhPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredRecords = MOCK_PROCESS_RECORDS.filter(record => {
        const matchQuery = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'all' || record.status === statusFilter;
        return matchQuery && matchStatus;
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
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

                    {/* Leadership Quote */}
                    <div className="mt-8 w-full">
                        <div className="relative group text-center">
                            <div className="relative z-10">
                                <p className="text-white/95 text-[15px] md:text-[18px] italic leading-relaxed font-medium mb-4">
                                    "Đột phá mạnh mẽ hơn về thể chế phát triển, tháo gỡ điểm nghẽn, rào cản; lấy thực tiễn làm thước đo, khơi thông mọi nguồn lực <br />đưa đất nước bước vào kỷ nguyên mới."
                                </p>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-[2px] bg-amber-400/50 rounded-full mb-1" />
                                    <span className="text-amber-200 text-[13px] font-bold uppercase tracking-widest">Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] -mt-6 relative z-30">
                {/* KPI Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <KpiMetricCard
                        title="Tổng số hiến kế"
                        value="1,524"
                        subtitle="Ý kiến & sáng kiến gửi về"
                        icon={FileText}
                        colorTheme="blue"
                    />
                    <KpiMetricCard
                        title="Đã tiếp nhận"
                        value="1,480"
                        subtitle="Hoàn thành rà soát hợp lệ"
                        icon={Inbox}
                        colorTheme="purple"
                    />
                    <KpiMetricCard
                        title="Đang xử lý"
                        value="342"
                        subtitle="Đang nghiên cứu & thẩm định"
                        icon={Clock}
                        colorTheme="amber"
                    />
                    <KpiMetricCard
                        title="Đã xử lý"
                        value="1,138"
                        subtitle="Đã công bố kết quả tiếp thu"
                        icon={CheckCircle}
                        colorTheme="green"
                    />
                </div>

                {/* Main Dashboard Content */}
                <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Danh sách ý kiến hiến kế & Kết quả</h2>
                            <p className="text-sm text-gray-500 mt-1">Tra cứu chi tiết quá trình xử lý theo mã số hoặc nội dung</p>
                        </div>

                        {/* Search & Filter tools */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative w-full md:w-72">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Tìm kiếm nội dung, cơ quan..."
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm">
                                <Filter size={14} className="text-gray-500" />
                                <select
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                    className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 pr-2 cursor-pointer"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="received">Đã tiếp nhận</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="completed">Đã xử lý</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table / Listing of Tracking Process Records */}
                    <div className="mt-6 space-y-4">
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map(record => {
                                // determine styling pills
                                const statusColors = {
                                    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
                                    processing: "bg-amber-50 text-amber-700 border-amber-200",
                                    received: "bg-blue-50 text-blue-700 border-blue-200"
                                };

                                const statusIndicator = {
                                    completed: "bg-emerald-500",
                                    processing: "bg-amber-500 animate-pulse",
                                    received: "bg-blue-500"
                                };

                                return (
                                    <div key={record.id} className="p-5 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 bg-gray-50/30">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                                                    {record.id}
                                                </span>
                                                <span className="text-xs font-semibold text-gray-600 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                                                    {record.field}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Calendar size={12} /> {record.receiveDate}
                                                </span>
                                            </div>

                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusColors[record.status] || statusColors.received}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${statusIndicator[record.status] || 'bg-blue-500'}`} />
                                                {record.statusText}
                                            </div>
                                        </div>

                                        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 hover:text-amber-600 transition-colors">
                                            {record.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <span className="font-medium text-gray-700">{record.sender}</span>
                                            <span>•</span>
                                            <span>Cơ quan chủ trì: <strong className="text-gray-800">{record.agency}</strong></span>
                                        </div>

                                        <div className="bg-white p-3.5 rounded-lg border border-gray-150 text-sm text-gray-700">
                                            <strong className="text-xs text-gray-400 block uppercase tracking-wider mb-1">Tóm tắt kết quả / Tiến độ xử lý:</strong>
                                            <p className="text-[13.5px] leading-relaxed">{record.responseSummary}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-12 text-center text-gray-400">
                                Không tìm thấy hồ sơ hiến kế nào phù hợp với bộ lọc hiện tại.
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Section: 3 Overview Feature Cards matching requests */}
                <div className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">Các tính năng nổi bật khác</h2>
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

import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ChevronRight, Send, Inbox, Clock, CheckCircle,
    Search, Filter, FileText, ArrowRight, Heart,
    TrendingUp, Scale, Calendar, ChevronLeft, User
} from 'lucide-react';

// Mock process tracking records
const MOCK_PROCESS_RECORDS = [
    {
        id: "HK-2026-089",
        title: "Đề xuất đơn giản hóa thủ tục cấp giấy phép xây dựng trực tuyến mức độ 4",
        sender: "Nguyễn Văn A (Đại diện Doanh nghiệp)",
        field: "Xây dựng",
        receiveDate: "10/05/2026",
        status: "completed",
        statusText: "Đã xử lý & tiếp thu",
        agency: "Bộ Xây dựng",
        excerpt: "Cần xây dựng chuẩn dữ liệu chung đồng bộ và bảo mật giữa các bệnh viện tuyến tỉnh và tuyến trung ương trên toàn quốc.",
        tags: ["Xây dựng", "Thủ tục hành chính"],
        type: "hien-ke-cua-ban"
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
        excerpt: "Quy trình đấu thầu thuốc hiện nay kéo dài qua nhiều cấp xét duyệt gây ra tình trạng thiếu thuốc cục bộ tại các bệnh viện.",
        tags: ["Môi trường", "AI"],
        type: "co-the-ban-quan-tam"
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
        excerpt: "Học sinh tiểu học hiện đang phải tiếp thu một khối lượng kiến thức quá lớn và hàn lâm so với độ tuổi.",
        tags: ["Y tế", "Số hóa"],
        type: "co-the-ban-quan-tam"
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
        excerpt: "Với tốc độ đô thị hoá nhanh, lượng lớn dân cư tại các khu đô thị mới ven rìa các tỉnh thành đang bị thiếu hụt.",
        tags: ["Tài chính", "Startup"],
        type: "hien-ke-cua-ban"
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
        excerpt: "Để hạn chế tình trạng cò đất thao túng thị trường và gây nên các cơn sốt đất ảo, cần tiến hành quy định khắt khe.",
        tags: ["Lao động", "Chính sách"],
        type: "hien-ke-cua-ban"
    }
];

// Section config
const SECTIONS = {
    'hien-ke-cua-ban': {
        key: 'hien-ke-cua-ban',
        title: 'Hiến kế của bạn',
        desc: 'Thống kê chi tiết các ý kiến, sáng kiến của người dân và doanh nghiệp đã gửi đến hệ thống.',
        icon: Heart,
        colorText: 'text-green-600',
        bgLight: 'bg-green-100',
        stats: [
            { label: 'Tổng số hiến kế', value: '1,524', icon: FileText, color: 'bg-blue-100 text-blue-600' },
            { label: 'Đã tiếp nhận', value: '1,480', icon: Inbox, color: 'bg-purple-100 text-purple-600' },
            { label: 'Đang xử lý', value: '342', icon: Clock, color: 'bg-amber-100 text-amber-600' },
            { label: 'Đã xử lý', value: '1,138', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
        ],
    },
    'chung-toi-can-ban': {
        key: 'chung-toi-can-ban',
        title: 'Chúng tôi cần bạn',
        desc: 'Thống kê chi tiết các nội dung, chủ đề nổi bật từ cơ quan quản lý nhà nước đang cần sự tham gia đóng góp.',
        icon: TrendingUp,
        colorText: 'text-blue-600',
        bgLight: 'bg-blue-100',
        stats: [
            { label: 'Tổng chủ đề đăng', value: '87', icon: FileText, color: 'bg-blue-100 text-blue-600' },
            { label: 'Đang tiếp nhận', value: '34', icon: Inbox, color: 'bg-purple-100 text-purple-600' },
            { label: 'Đang xem xét', value: '21', icon: Clock, color: 'bg-amber-100 text-amber-600' },
            { label: 'Đã hoàn thành', value: '32', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
        ],
    },
    'co-the-ban-quan-tam': {
        key: 'co-the-ban-quan-tam',
        title: 'Có thể bạn quan tâm',
        desc: 'Thống kê chi tiết các sáng kiến, ý kiến đóng góp theo từng lĩnh vực chuyên môn.',
        icon: Scale,
        colorText: 'text-purple-600',
        bgLight: 'bg-purple-100',
        stats: [
            { label: 'Tổng lĩnh vực', value: '18', icon: FileText, color: 'bg-blue-100 text-blue-600' },
            { label: 'Đã tiếp nhận', value: '956', icon: Inbox, color: 'bg-purple-100 text-purple-600' },
            { label: 'Đang xử lý', value: '178', icon: Clock, color: 'bg-amber-100 text-amber-600' },
            { label: 'Đã xử lý', value: '778', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
        ],
    },
};

function DetailView({ sectionKey }) {
    const section = SECTIONS[sectionKey];
    if (!section) return null;
    const Icon = section.icon;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredRecords = MOCK_PROCESS_RECORDS.filter(r => r.type === sectionKey);
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px] mt-8">
            {/* Back button */}
            <Link
                to="/hien-ke/quy-trinh"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-[14px] mb-6 transition-colors"
            >
                <ChevronLeft size={16} /> Quay lại Quá trình tiếp nhận, xử lý
            </Link>

            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${section.bgLight} ${section.colorText} flex items-center justify-center`}>
                    <Icon size={22} strokeWidth={2} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    <p className="text-gray-500 text-[13px]">{section.desc}</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {section.stats.map((s, i) => {
                    const SIcon = s.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${s.color}`}>
                                <SIcon size={24} />
                            </div>
                            <div>
                                <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">{s.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Process list (Designed like HienKeLinhVucDanhSachPage) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 text-[15px] flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        Danh sách hiến kế
                    </h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input type="text" placeholder="Tìm kiếm..." className="pl-8 pr-3 h-8 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-blue-400 w-[200px]" />
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {paginatedRecords.length > 0 ? (
                        paginatedRecords.map(idea => (
                            <div key={idea.id} className="p-5 md:p-6 hover:bg-blue-50/30 transition-colors group">
                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                    <div className="flex-1">
                                        <Link to={`/hien-ke/${idea.id}`} className="block mb-3">
                                            <h3 className="text-[18px] md:text-[20px] font-bold text-[#0f3b7d] group-hover:text-blue-600 transition-colors leading-snug">
                                                {idea.title}
                                            </h3>
                                        </Link>

                                        <p className="text-gray-600 text-[15px] leading-relaxed mb-4 line-clamp-3">
                                            "{idea.excerpt}"
                                        </p>

                                        {idea.tags && idea.tags.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-2 mb-5">
                                                {idea.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[12px] font-medium rounded-md transition-colors cursor-pointer">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                {idea.status === 'completed' ? (
                                                    <>
                                                        <span className="px-2.5 py-1 rounded bg-green-50 text-green-700 font-semibold border border-green-100 flex items-center gap-1">
                                                            <CheckCircle size={12} /> Đã xử lý
                                                        </span>
                                                        <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100 flex items-center gap-1">
                                                            {idea.agency}
                                                        </span>
                                                    </>
                                                ) : idea.status === 'processing' ? (
                                                    <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-100 flex items-center gap-1">
                                                        <Clock size={12} /> Đang xử lý
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100 flex items-center gap-1">
                                                        <Inbox size={12} /> Đã tiếp nhận
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 ml-auto md:ml-0">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    <span>{idea.receiveDate}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <User size={14} className="text-gray-400" />
                                                    <span className="text-gray-700">{idea.sender}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-500">
                            Chưa có dữ liệu cho mục này
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-5 md:p-6 border-t border-gray-100 flex flex-col items-center justify-center gap-3 bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px] font-medium"
                            >
                                Trước
                            </button>
                            <div className="hidden sm:flex gap-1">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-9 h-9 rounded-lg text-[14px] font-bold transition-colors ${currentPage === i + 1
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px] font-medium"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function HienKeQuyTrinhPage() {
    const [searchParams] = useSearchParams();
    const view = searchParams.get('view');

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

            {view ? (
                <DetailView sectionKey={view} />
            ) : (
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
                                    to: '/hien-ke/quy-trinh?view=hien-ke-cua-ban',
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
                                    to: '/hien-ke/quy-trinh?view=co-the-ban-quan-tam',
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
            )}
        </div>
    );
}

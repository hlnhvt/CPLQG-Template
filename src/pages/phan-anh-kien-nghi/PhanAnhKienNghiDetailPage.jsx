import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Download, CheckCircle2, RotateCw, FileText, User as UserIcon, Calendar, ArrowLeft, Send, Hash, Building2, Check, Clock } from 'lucide-react';

const MOCK_DETAIL = {
    id: "1771794882779",
    status: "Đã xử lý",
    senderName: "Trần Văn Ước",
    title: "Về việc bất cập trong thủ tục đóng thuế môi trường qua Cổng Dịch vụ công quốc gia theo Thông tư số 04/2025/TT-BTC",
    content: `Kính gửi Bộ Tài chính,
    
Tôi xin phản ánh về một số bất cập khi thực hiện nộp thuế bảo vệ môi trường trực tuyến cho doanh nghiệp như sau:

1. Hệ thống thường xuyên báo lỗi kết nối với ngân hàng vào các ngày cuối tháng (khi sắp hết hạn nộp).
2. Quy định khoản 2 điều 5 của Thông tư yêu cầu kê khai thêm nhiều trường thông tin gây mất thời gian mà theo tôi là không cần thiết vì dữ liệu đã có sẵn trong cơ sở dữ liệu quốc gia về dân cư/doanh nghiệp.

Đề nghị quý Cơ quan xem xét điều chỉnh để tạo thuận lợi cho doanh nghiệp.
Trân trọng cảm ơn.`,
    files: [
        { name: "anh-chup-loi-he-thong.png", size: "1.2 MB" },
        { name: "de-xuat-sua-doi-bieu-mau.docx", size: "45 KB" }
    ],
    agency: "BỘ TÀI CHÍNH",
    docType: "Công văn trả lời (Số 1234/BTC-CST)",
    response: `Bộ Tài chính tiếp nhận kiến nghị của công dân/doanh nghiệp và xin trả lời như sau:

Về vấn đề hệ thống: Tổng cục Thuế đang tiến hành nâng cấp hạ tầng máy chủ, dự kiến hoàn thành trong Quý 2/2026 sẽ khắc phục dứt điểm tình trạng nghẽn mạng cuối tháng. Khuyến nghị doanh nghiệp nên kê khai và nộp thuế sớm để tránh quá tải.

Về Khoản 2 Điều 5 Thông tư 04/2025/TT-BTC: Việc yêu cầu kê khai thêm thông tin là quy định bắt buộc trong giai đoạn chuyển tiếp nhằm đồng bộ dữ liệu với các hệ thống chuyên ngành mới của liên bộ Tài nguyên Môi trường - Tài chính. Tuy nhiên, Bộ Tài chính ghi nhận ý kiến đóng góp này và sẽ làm việc với Cục Tin học Thống kê Tài chính để nghiên cứu cơ chế tự động điền dữ liệu (auto-fill) trong ứng dụng khai thuế điện tử.

Trân trọng.`,
    responseFiles: [
        { name: "CV-1234-BTC.pdf", size: "320 KB" }
    ]
};

const TIMELINE = [
    { status: "done", title: "Tiếp nhận phản ánh", time: "11:09 - 17/03/2026", by: "Cổng thông tin Pháp luật Quốc gia", detail: "Hệ thống đã ghi nhận phản ánh." },
    { status: "done", title: "Chuyển xử lý", time: "14:30 - 17/03/2026", by: "Ban Quản trị Cổng", detail: "Đã phân luồng chuyển Bộ Tài chính xử lý." },
    { status: "done", title: "Đang xử lý", time: "08:15 - 18/03/2026", by: "Bộ Tài chính", detail: "Phân công Vụ Chính sách Thuế thẩm định." },
    { status: "done", title: "Có kết quả", time: "10:00 - 20/03/2026", by: "Bộ Tài chính", detail: "Đã có văn bản trả lời công dân." }
];

const PhanAnhKienNghiDetailPage = () => {
    const { id } = useParams();
    const [timelineExpanded, setTimelineExpanded] = useState(false);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/phan-anh-kien-nghi" className="hover:text-[#0f4c81]">Phản ánh kiến nghị</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Chi tiết phản ánh</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#0f4c81] text-white py-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Thông tin kiến nghị</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-4xl text-gray-800 space-y-6">
                
                <Link to="/phan-anh-kien-nghi?tab=latest" className="inline-flex items-center gap-2 text-[#0f4c81] font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors -ml-3">
                    <ArrowLeft size={20} /> Quay lại danh sách
                </Link>

                {/* Main Card (Details) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4">
                        {MOCK_DETAIL.status === 'Đã xử lý' ? 
                            <span className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-sm">
                                <CheckCircle2 size={16} /> Đã xử lý
                            </span>
                        :
                            <span className="flex items-center gap-1.5 font-bold text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg shadow-sm">
                                <RotateCw size={16} /> Đang xử lý
                            </span>
                        }
                    </div>

                    <div className="p-8">
                        <h3 className="text-xl font-bold text-[#0f4c81] mb-8 pb-3 border-b-2 border-blue-50">Chi tiết phản ánh</h3>

                        <div className="space-y-6 text-[15px]">
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                <span className="font-bold w-36 text-gray-500 flex items-center gap-2 shrink-0"><UserIcon size={16}/> Họ tên:</span>
                                <span className="font-bold text-gray-900">{MOCK_DETAIL.senderName}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                <span className="font-bold w-36 text-gray-500 flex items-center gap-2 shrink-0"><Hash size={16}/> Mã phản ánh:</span>
                                <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded tracking-wide border border-blue-100">{MOCK_DETAIL.id}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <span className="font-bold w-36 text-gray-500 flex items-center gap-2 shrink-0 mt-0.5"><FileText size={16}/> Tiêu đề:</span>
                                <span className="font-bold text-gray-900 leading-snug">{MOCK_DETAIL.title}</span>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <span className="font-bold text-gray-500 flex items-center gap-2 mb-3"><Send size={16}/> Nội dung:</span>
                                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {MOCK_DETAIL.content}
                                </div>
                            </div>

                            {MOCK_DETAIL.files.length > 0 && (
                                <div>
                                    <span className="font-bold text-gray-500 flex items-center gap-2 mb-3">File đính kèm:</span>
                                    <div className="flex gap-4 flex-wrap">
                                        {MOCK_DETAIL.files.map((file, idx) => (
                                            <button key={idx} className="flex items-center justify-between gap-4 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors shadow-sm group">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={20} className="text-blue-500" />
                                                    <span className="font-medium text-sm text-gray-700 group-hover:text-[#0f4c81]">{file.name}</span>
                                                </div>
                                                <Download size={16} className="text-gray-400 group-hover:text-[#0f4c81]" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <button 
                        className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 transition focus:outline-none border-b border-gray-200"
                        onClick={() => setTimelineExpanded(!timelineExpanded)}
                    >
                        <h3 className="text-xl font-bold text-[#0f4c81] flex items-center gap-2">Tiến trình xử lý</h3>
                        {timelineExpanded ? <ChevronUp size={24} className="text-gray-500" /> : <ChevronDown size={24} className="text-gray-500" />}
                    </button>

                    <div className={`p-8 ${timelineExpanded ? 'block' : 'hidden md:block'}`}>
                        <div className="relative border-l-2 border-blue-200 ml-4 pb-4">
                            {TIMELINE.map((step, idx) => (
                                <div key={idx} className="mb-8 relative pl-8">
                                    <span className={`absolute -left-[17px] bg-white border-4 rounded-full w-8 h-8 flex items-center justify-center ${idx === TIMELINE.length - 1 ? 'border-emerald-500 text-emerald-500 z-10' : 'border-[#0f4c81] text-[#0f4c81]'}`}>
                                        {idx === TIMELINE.length - 1 ? <Check size={14} strokeWidth={4} /> : <div className="w-2 h-2 bg-[#0f4c81] rounded-full"></div>}
                                    </span>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">{step.title}</h4>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-2">
                                            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border shadow-sm"><Clock size={12}/> {step.time}</span>
                                            <span className="flex items-center gap-1 font-medium"><Building2 size={12}/> {step.by}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm border-l-2 border-gray-300 pl-3 italic mt-3">{step.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Result Card */}
                {MOCK_DETAIL.status === 'Đã xử lý' && (
                    <div className="bg-emerald-50 rounded-2xl shadow-sm border border-emerald-200 overflow-hidden relative">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                            <CheckCircle2 size={240} className="text-emerald-700" />
                        </div>

                        <div className="p-8 relative z-10">
                            <h3 className="text-xl font-bold text-emerald-800 mb-8 pb-3 border-b-2 border-emerald-200 flex items-center gap-2">
                                <CheckCircle2 size={24}/> Kết quả xử lý
                            </h3>

                            <div className="space-y-6 text-[15px]">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                    <span className="font-bold w-36 text-emerald-700/80 flex items-center gap-2 shrink-0"><Building2 size={16}/> Đơn vị xử lý:</span>
                                    <span className="font-bold text-emerald-900 uppercase tracking-wide bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-sm">{MOCK_DETAIL.agency}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                    <span className="font-bold w-36 text-emerald-700/80 flex items-center gap-2 shrink-0"><FileText size={16}/> Loại văn bản:</span>
                                    <span className="font-bold text-[#0f4c81] hover:underline cursor-pointer">{MOCK_DETAIL.docType}</span>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm">
                                    <span className="font-bold text-emerald-700 flex items-center gap-2 mb-3"><MessageSquare size={16}/> Trả lời:</span>
                                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-justify">
                                        {MOCK_DETAIL.response}
                                    </div>
                                </div>

                                {MOCK_DETAIL.responseFiles.length > 0 && (
                                    <div className="pt-2">
                                        <span className="font-bold text-emerald-700/80 flex items-center gap-2 mb-3">File đính kèm:</span>
                                        <div className="flex gap-4 flex-wrap">
                                            {MOCK_DETAIL.responseFiles.map((file, idx) => (
                                                <button key={idx} className="flex items-center justify-between gap-4 p-3 bg-white border border-emerald-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all shadow-sm group">
                                                    <div className="flex items-center gap-2">
                                                        <FileText size={20} className="text-emerald-600" />
                                                        <span className="font-bold text-sm text-gray-800 group-hover:text-emerald-700">{file.name}</span>
                                                    </div>
                                                    <Download size={16} className="text-gray-400 group-hover:text-emerald-700" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhanAnhKienNghiDetailPage;

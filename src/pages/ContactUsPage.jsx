import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, MapPin, Mail, Phone, Clock, FileUp, Send, Facebook, Instagram, Linkedin, MessageCircle, Youtube } from 'lucide-react';

const DEPARTMENTS = [
    'Tư vấn pháp lý chung',
    'Vấn đề về hệ thống/tài khoản',
    'Phản ánh lỗi Cổng thông tin',
    'Hợp tác, tài trợ',
    'Đóng góp ý kiến cải tiến',
    'Khác'
];

const FAQS = [
    {
        q: "Làm thế nào để tôi có thể chia sẻ ý kiến của mình?",
        a: "Bạn có thể chia sẻ ý kiến của mình thông qua mục 'Hiến kế hoàn thiện chính sách, pháp luật' hoặc sử dụng biểu mẫu liên hệ trên trang này. Ý kiến của bạn sẽ được tự động phân loại và gửi đến cơ quan có thẩm quyền xử lý."
    },
    {
        q: "Ý kiến đóng góp của tôi có được giữ ẩn danh không?",
        a: "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Bạn có quyền chọn chia sẻ công khai hoặc ẩn danh khi tham gia vào các không gian thảo luận mở. Đối với các góp ý trực tiếp qua biểu mẫu, thông tin của bạn chỉ được sử dụng cho mục đích xác minh và phản hồi."
    },
    {
        q: "Mất bao lâu để tôi nhận được phản hồi?",
        a: "Thời gian xử lý phụ thuộc vào tính chất và mức độ phức tạp của vấn đề. Thông thường, chúng tôi sẽ nỗ lực phản hồi bạn trong vòng 3-5 ngày làm việc đối với các thắc mắc chung."
    }
];

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', mobile: '', phone: '', subject: '', message: ''
    });
    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
        setFormData({ name: '', email: '', mobile: '', phone: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">

            {/* ── HERO SECTION ─────────────────────────────────────────── */}
            <div style={{ backgroundColor: '#e8f5e9' }} className="pt-8 pb-14 border-b border-green-100">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
                    <nav className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-6">
                        <Link to="/" className="hover:text-green-700 transition-colors">Trang chủ</Link>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span className="text-gray-900 font-medium">Liên hệ với chúng tôi</span>
                    </nav>

                    <h1 className="text-[36px] md:text-[46px] font-black text-gray-900 leading-tight mb-4">
                        Liên hệ với chúng tôi
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-gray-700 max-w-[600px] leading-relaxed">
                        Bạn có ý kiến đóng góp, thắc mắc hoặc cần hỗ trợ? Vui lòng chọn các kênh liên lạc dưới đây hoặc điền vào biểu mẫu, chúng tôi sẽ tiếp nhận và phản hồi bạn.
                    </p>
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
            <div className="py-12">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* LEFT COLUMN: Form + Address + FAQs (70%) */}
                        <div className="flex-1 min-w-0">

                            {/* Contact Form */}
                            <div id="feedback-form" className="scroll-mt-6">
                                <h2 className="text-[26px] font-bold text-gray-900 mb-3 tracking-tight">Gửi tin nhắn trực tuyến</h2>
                                <p className="text-[15px] text-gray-600 mb-8 max-w-[700px]">
                                    Nếu bạn có bất kỳ phản hồi hoặc góp ý nào về chính sách, vui lòng điền vào biểu mẫu bên dưới. Các thông tin có dấu (<span className="text-red-500">*</span>) là bắt buộc.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6 max-w-[800px]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[14px] font-bold text-gray-800 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                                            <input
                                                type="text" required
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                                                placeholder="VD: Nguyễn Văn A"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[14px] font-bold text-gray-800 mb-2">Địa chỉ Email <span className="text-red-500">*</span></label>
                                            <input
                                                type="email" required
                                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                                                placeholder="VD: email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[14px] font-bold text-gray-800 mb-2">Điện thoại di động</label>
                                            <input
                                                type="tel"
                                                value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[14px] font-bold text-gray-800 mb-2">Điện thoại bàn</label>
                                            <input
                                                type="tel"
                                                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">Chủ đề <span className="text-red-500">*</span></label>
                                        <select
                                            required
                                            value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>-- Chọn chủ đề thanh vấn/góp ý --</option>
                                            {DEPARTMENTS.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">Nội dung chi tiết <span className="text-red-500">*</span></label>
                                        <p className="text-[12px] text-gray-500 mb-2">Tối đa 5000 ký tự.</p>
                                        <textarea
                                            required rows={6} maxLength={5000}
                                            value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
                                            placeholder="Trình bày rõ vấn đề hoặc ý kiến đóng góp của bạn..."
                                        />
                                        <div className="text-right text-[12px] text-gray-400 mt-1">
                                            {formData.message.length} / 5000
                                        </div>
                                    </div>

                                    {/* Upload area */}
                                    <div>
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">Tệp đính kèm</label>
                                        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:shadow border border-gray-100">
                                                <FileUp size={20} className="text-green-600" />
                                            </div>
                                            <p className="text-[14px] font-semibold text-gray-700 mb-1">Nhấp hoặc kéo thả tệp vào đây</p>
                                            <p className="text-[12px] text-gray-500">Hỗ trợ PDF, DOCX, XLSX, JPG, PNG. (Tối đa 7MB)</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-lg font-bold text-[15px] transition-colors shadow-sm">
                                            <Send size={18} /> Gửi ý kiến ngay
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <hr className="my-14 border-gray-200" />

                            {/* Office Info */}
                            <div id="address" className="scroll-mt-6">
                                <h2 className="text-[26px] font-bold text-gray-900 mb-6 tracking-tight">Địa chỉ Văn phòng</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-100 rounded-xl">
                                        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[15px] mb-2">Cơ quan thường trực</h3>
                                            <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
                                                Tòa nhà CổNG PHÁP LUẬT QUỐC GIA<br />
                                                Số 1, Quảng trường Ba Đình<br />
                                                Quận Ba Đình, Thủ đô Hà Nội
                                            </p>
                                            <Link to="#" className="text-[13px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                                                Xem trên bản đồ <ArrowRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-100 rounded-xl">
                                        <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shrink-0">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[15px] mb-2">Giờ làm việc</h3>
                                            <p className="text-[14px] text-gray-600 leading-relaxed mb-1">
                                                Thứ Hai – Thứ Sáu
                                            </p>
                                            <p className="text-[14px] font-medium text-gray-900">08:00 AM – 17:00 PM</p>
                                            <p className="text-[12px] text-gray-500 mt-2 italic">(Đóng cửa vào cuối tuần và ngày lễ)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-14 border-gray-200" />

                            {/* FAQS */}
                            <div id="faqs" className="scroll-mt-6">
                                <h2 className="text-[26px] font-bold text-gray-900 mb-6 tracking-tight">Câu hỏi thường gặp (FAQs)</h2>
                                <div className="space-y-4">
                                    {FAQS.map((faq, i) => (
                                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                            <button
                                                className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            >
                                                <span className="font-bold text-[15px] text-gray-900 pr-8">{faq.q}</span>
                                                <ChevronRight
                                                    size={18}
                                                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-90' : ''}`}
                                                />
                                            </button>
                                            {openFaq === i && (
                                                <div className="p-5 border-t border-gray-100 text-[14px] text-gray-700 leading-relaxed animate-fadeIn">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Sidebar (30%) */}
                        <div className="lg:w-[320px] shrink-0">
                            <div className="sticky top-6 space-y-6">

                                {/* Table of contents */}
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                                    <h3 className="text-[14px] font-bold text-gray-900 uppercase tracking-wide mb-4">Nội dung trang</h3>
                                    <nav className="space-y-2">
                                        <a href="#feedback-form" className="block text-[14px] font-medium text-gray-600 hover:text-green-700 hover:underline py-1">Gửi tin nhắn trực tuyến</a>
                                        <a href="#address" className="block text-[14px] font-medium text-gray-600 hover:text-green-700 hover:underline py-1">Địa chỉ Văn phòng</a>
                                        <a href="#faqs" className="block text-[14px] font-medium text-gray-600 hover:text-green-700 hover:underline py-1">Câu hỏi thường gặp (FAQs)</a>
                                    </nav>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                                    <h3 className="text-[15px] font-bold text-gray-900 mb-4">Kết nối với chúng tôi</h3>
                                    <p className="text-[13px] text-gray-500 mb-5">
                                        Theo dõi để cập nhật các chính sách và cuộc tham vấn mới nhất.
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-colors text-gray-600">
                                            <Facebook size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#E4405F] hover:text-white transition-colors text-gray-600">
                                            <Instagram size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#0A66C2] hover:text-white transition-colors text-gray-600">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#FF0000] hover:text-white transition-colors text-gray-600">
                                            <Youtube size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#229ED9] hover:text-white transition-colors text-gray-600">
                                            <MessageCircle size={18} />
                                        </a>
                                    </div>
                                </div>

                                {/* Hotline banner */}
                                <div className="bg-[#1e3a8a] text-white rounded-xl p-6 text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Phone size={64} />
                                    </div>
                                    <h3 className="font-bold text-[15px] text-blue-200 mb-2 relative z-10">Hỗ trợ kỹ thuật (Hotline)</h3>
                                    <p className="text-[28px] font-black tracking-tight mb-2 relative z-10">1900 1234</p>
                                    <p className="text-[12px] text-blue-200 opacity-80 relative z-10">Cước phí: 1.000đ/phút</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

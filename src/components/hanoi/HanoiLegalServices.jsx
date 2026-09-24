import React, { useState } from 'react';
import { 
    Scale, 
    Smartphone, 
    Briefcase, 
    MapPin, 
    Phone, 
    ExternalLink, 
    ChevronRight, 
    Building2, 
    Send,
    CheckCircle,
    UserCheck,
    HelpCircle
} from 'lucide-react';
import { hanoiLegalAidBranches, hanoiConnectedPortals } from '../../data/hanoiMockData';

const HanoiLegalServices = () => {
    const [selectedBranch, setSelectedBranch] = useState(hanoiLegalAidBranches[0]);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [feedbackForm, setFeedbackForm] = useState({
        name: '',
        phone: '',
        district: 'Quận Ba Đình',
        content: ''
    });

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setFeedbackSent(true);
        setTimeout(() => {
            setFeedbackSent(false);
            setFeedbackForm({ name: '', phone: '', district: 'Quận Ba Đình', content: '' });
        }, 4000);
    };

    return (
        <section id="tro-giup-phap-ly-ha-noi" className="py-14 bg-gradient-to-b from-[#f1f5f9] to-[#e2e8f0] border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full uppercase">
                        <Scale size={13} />
                        <span>Dịch vụ công & Tiện ích pháp lý</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Trợ Giúp Pháp Lý & Hỗ Trợ Doanh Nghiệp Thủ Đô
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                        Đảm bảo mọi người dân và doanh nghiệp trên địa bàn 30 quận, huyện, thị xã đều được tiếp cận dịch vụ pháp lý miễn phí, bình đẳng và thuận tiện.
                    </p>
                </div>

                {/* 3 Main Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: iHanoi App Integration */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-red-400 transition flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shadow-md">
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-red-700 uppercase">
                                    Nền tảng công dân số
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1">
                                    Ứng dụng iHanoi
                                </h3>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                    Kênh giao tiếp trực tuyến giữa người dân và chính quyền Thủ đô. Gửi phản ánh hiện trường, thắc mắc thủ tục tư pháp, tra cứu tiến độ xử lý hồ sơ ngay trên điện thoại di động.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-6">
                            <a 
                                href="https://ihanoi.gov.vn" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow"
                            >
                                <span>Mở Cổng thông tin iHanoi</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Card 2: State Legal Aid Center */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-red-400 transition flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md">
                                <Scale size={24} />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-blue-700 uppercase">
                                    Sở Tư pháp Hà Nội
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1">
                                    Trợ Giúp Pháp Lý Nhà Nước
                                </h3>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                    Tư vấn pháp luật, tham gia tố tụng, đại diện ngoài tố tụng hoàn toàn miễn phí cho người có công với cách mạng, người nghèo, người khuyết tật, đồng bào dân tộc thiểu số và trẻ em.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-6 space-y-2">
                            <div className="text-xs text-gray-500 flex items-center justify-between">
                                <span>Hotline tư vấn miễn phí:</span>
                                <strong className="text-red-700">024.3354.6163</strong>
                            </div>
                            <a 
                                href="#mang-luoi"
                                className="w-full inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold py-2.5 px-4 rounded-xl text-xs transition"
                            >
                                <span>Tra cứu 8 chi nhánh tại 30 quận/huyện</span>
                                <ChevronRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Card 3: Business Legal Support & Bar Association */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-red-400 transition flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase">
                                    Đoàn Luật sư & Sở KH&ĐT
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1">
                                    Hỗ Trợ Pháp Lý Doanh Nghiệp
                                </h3>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                    Tháo gỡ rào cản pháp lý trong thành lập, đầu tư dự án, thuế và đất đai. Mạng lưới hơn 5.000 luật sư thuộc Đoàn Luật sư TP Hà Nội sẵn sàng đồng hành cùng doanh nghiệp Thủ đô.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-6">
                            <a 
                                href="#phan-anh"
                                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 px-4 rounded-xl text-xs transition"
                            >
                                <span>Gửi câu hỏi tư vấn doanh nghiệp</span>
                                <ChevronRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* District Network & Branch Finder */}
                <div id="mang-luoi" className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 mb-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Branch Directory */}
                        <div className="lg:w-1/2 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin size={20} className="text-red-700" />
                                    Mạng Lưới Chi Nhánh Trợ Giúp Pháp Lý TP. Hà Nội
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Chọn chi nhánh phụ trách theo địa bàn sinh sống của bạn để xem chi tiết liên hệ
                                </p>
                            </div>

                            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                                {hanoiLegalAidBranches.map((branch) => (
                                    <div
                                        key={branch.id}
                                        onClick={() => setSelectedBranch(branch)}
                                        className={`p-3.5 rounded-xl border cursor-pointer transition ${
                                            selectedBranch.id === branch.id
                                                ? 'bg-red-50 border-red-500 shadow-sm'
                                                : 'bg-gray-50 hover:bg-white border-gray-200'
                                        }`}
                                    >
                                        <div className="font-bold text-sm text-gray-900 leading-snug">
                                            {branch.name}
                                        </div>
                                        <div className="text-xs text-red-700 font-semibold mt-1">
                                            Phụ trách: {branch.phuTrach}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                            <MapPin size={12} /> {branch.address}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Selected Branch Details & Online Booking */}
                        <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
                            <div className="space-y-4">
                                <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded uppercase">
                                    Thông tin đơn vị tiếp nhận
                                </span>

                                <h4 className="text-lg font-bold text-gray-900">
                                    {selectedBranch.name}
                                </h4>

                                <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="text-red-700 shrink-0 mt-0.5" />
                                        <span><strong>Địa chỉ:</strong> {selectedBranch.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-emerald-700 shrink-0" />
                                        <span><strong>Số điện thoại:</strong> {selectedBranch.phone}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Building2 size={16} className="text-blue-700 shrink-0 mt-0.5" />
                                        <span><strong>Khu vực phụ trách:</strong> {selectedBranch.phuTrach}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-3.5 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-1">
                                    <div className="font-bold text-gray-800">Thời gian làm việc:</div>
                                    <div>• Thứ Hai đến Thứ Sáu: 08:00 - 17:00</div>
                                    <div>• Tiếp nhận hồ sơ trực tuyến: 24/7 qua Cổng Dịch vụ công</div>
                                </div>
                            </div>

                            <div className="pt-5 mt-5 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                                <a 
                                    href={`tel:${selectedBranch.phone}`}
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
                                >
                                    <Phone size={14} />
                                    <span>Gọi điện tư vấn</span>
                                </a>
                                <button 
                                    type="button"
                                    onClick={() => alert(`Đã mở phiếu đăng ký trợ giúp pháp lý tại ${selectedBranch.name}`)}
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
                                >
                                    <UserCheck size={14} />
                                    <span>Đặt lịch hẹn tư vấn</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Direct Feedback Form for Hanoi citizens */}
                <div id="phan-anh" className="bg-gradient-to-r from-[#0d3b66] to-[#10487f] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full uppercase">
                                Trực tuyến - Minh bạch - Kịp thời
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold uppercase">
                                Tiếp Nhận Phản Ánh - Kiến Nghị Vướng Mắc Pháp Luật Tại Hà Nội
                            </h3>
                            <p className="text-xs text-blue-100">
                                Ý kiến của bạn sẽ được chuyển trực tiếp đến Ban Tiếp nhận phản ánh - Sở Tư pháp TP. Hà Nội để rà soát, giải quyết.
                            </p>
                        </div>

                        {feedbackSent ? (
                            <div className="bg-emerald-600/90 text-white p-6 rounded-xl text-center space-y-2">
                                <CheckCircle size={36} className="mx-auto text-amber-300" />
                                <div className="text-base font-bold">Gửi phản ánh thành công!</div>
                                <div className="text-xs text-emerald-100">
                                    Cảm ơn bạn. Thông tin đã được ghi nhận trên hệ thống và chuyển đến cơ quan có thẩm quyền xử lý theo quy định.
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-200 mb-1">Họ và tên *</label>
                                        <input
                                            type="text"
                                            required
                                            value={feedbackForm.name}
                                            onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                                            placeholder="Nguyễn Văn A"
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-200 mb-1">Số điện thoại *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={feedbackForm.phone}
                                            onChange={(e) => setFeedbackForm({...feedbackForm, phone: e.target.value})}
                                            placeholder="0912.xxx.xxx"
                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-200 mb-1">Quận / Huyện / Thị xã</label>
                                        <select
                                            value={feedbackForm.district}
                                            onChange={(e) => setFeedbackForm({...feedbackForm, district: e.target.value})}
                                            className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                                        >
                                            <option>Quận Ba Đình</option>
                                            <option>Quận Hoàn Kiếm</option>
                                            <option>Quận Đống Đa</option>
                                            <option>Quận Hai Bà Trưng</option>
                                            <option>Quận Cầu Giấy</option>
                                            <option>Quận Nam Từ Liêm</option>
                                            <option>Quận Bắc Từ Liêm</option>
                                            <option>Quận Hà Đông</option>
                                            <option>Quận Hoàng Mai</option>
                                            <option>Quận Long Biên</option>
                                            <option>Quận Tây Hồ</option>
                                            <option>Thị xã Sơn Tây</option>
                                            <option>Huyện Đông Anh</option>
                                            <option>Huyện Gia Lâm</option>
                                            <option>Huyện Sóc Sơn</option>
                                            <option>Các huyện khác</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-blue-200 mb-1">Nội dung phản ánh hoặc vướng mắc pháp luật *</label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={feedbackForm.content}
                                        onChange={(e) => setFeedbackForm({...feedbackForm, content: e.target.value})}
                                        placeholder="Mô tả cụ thể văn bản QPPL, quy định hoặc quy trình hành chính đang gặp khó khăn, vướng mắc trên địa bàn Thành phố..."
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    ></textarea>
                                </div>

                                <div className="text-center pt-2">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-950 font-bold px-8 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 mx-auto"
                                    >
                                        <Send size={14} />
                                        <span>Gửi phản ánh tới UBND & Sở Tư pháp Hà Nội</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Connected Hanoi Portals footer grid */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                        Hệ thống Cổng thông tin điện tử liên kết Thành phố Hà Nội
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {hanoiConnectedPortals.map((cp, idx) => (
                            <a 
                                key={idx}
                                href={`https://${cp.domain}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-white hover:bg-red-50 text-gray-700 hover:text-red-700 border border-gray-200 hover:border-red-300 px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-sm flex items-center gap-1.5"
                            >
                                <Building2 size={13} className="text-red-600" />
                                <span>{cp.name}</span>
                                <ExternalLink size={11} className="text-gray-400" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HanoiLegalServices;

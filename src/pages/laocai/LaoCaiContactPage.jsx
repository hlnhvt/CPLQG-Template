import React, { useState, useEffect } from 'react';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Send, 
    MessageSquare, 
    CheckCircle2, 
    ChevronRight, 
    Building2,
    Smartphone,
    ExternalLink,
    HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LaoCaiHeader from '../../components/laocai/LaoCaiHeader';
import LaoCaiFooter from '../../components/laocai/LaoCaiFooter';

const LaoCaiContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        topic: 'Góp ý xây dựng chính sách, văn bản',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        document.title = "Liên hệ - Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            alert("Thông điệp của bạn đã được gửi thành công! Ban Quản trị Cổng Pháp luật tỉnh Lào Cai sẽ phản hồi qua email hoặc số điện thoại trong thời gian sớm nhất.");
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                topic: 'Góp ý xây dựng chính sách, văn bản',
                message: ''
            });
        }, 1000);
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <LaoCaiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai" className="hover:text-[#0f4c81] transition-colors">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Liên hệ</span>
                </div>
            </div>

            {/* Page Header Banner - Đồng bộ màu sắc & phong cách Banner trang chủ Cổng Lào Cai */}
            <div className="relative text-white py-10 sm:py-12 text-center overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes laocaiRotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiRotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes laocaiPulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes laocaiFloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes laocaiSweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'laocaiSweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiPulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiPulseGlow 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'laocaiPulseGlow 5.5s ease-in-out infinite 0.5s' }} />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiRotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiRotateCCW 18s linear infinite' }} />

                {/* 5. Điểm nhấn kim cương ánh kim */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiFloatDiamond 3.2s ease-in-out infinite' }} />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiFloatDiamond 3.6s ease-in-out infinite 0.8s' }} />

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 text-white drop-shadow-md">
                        Liên hệ Cổng Pháp luật tỉnh Lào Cai
                    </h1>
                    <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-normal">
                        Sẵn sàng lắng nghe, tiếp nhận và giải đáp ý kiến đóng góp của người dân và doanh nghiệp Lào Cai
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-12 max-w-[1286px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Contact info & Cổng Dịch vụ công */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Info Card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-5">
                            <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 uppercase">
                                Cơ quan Thường trực Cổng
                            </h2>
                            
                            <div className="space-y-4 text-xs sm:text-sm">
                                <div className="flex items-start gap-3 text-gray-700">
                                    <Building2 size={18} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-gray-900">Sở Tư pháp tỉnh Lào Cai</div>
                                        <div className="text-xs text-gray-500">Đơn vị chủ trì quản lý & vận hành kỹ thuật</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-gray-700">
                                    <MapPin size={18} className="text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Địa chỉ trụ sở chính:</div>
                                        <div className="text-gray-600">Số 1B Hoàng Liên, P. Nam Cường, tỉnh Lào Cai</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-gray-700">
                                    <Phone size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Điện thoại / Hotline:</div>
                                        <div className="text-gray-600">0214.3824.163 - 0214.3824.155</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-gray-700">
                                    <Mail size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Thư điện tử:</div>
                                        <div className="text-gray-600">sotp@laocai.gov.vn</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-gray-700">
                                    <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Thời gian tiếp công dân:</div>
                                        <div className="text-gray-600">Thứ Hai - Thứ Sáu (Sáng 08:00 - 11:30, Chiều 13:30 - 17:00)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cổng Dịch vụ công tỉnh Integration Card */}
                        <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-50/90 via-white to-sky-50/70 border border-blue-200/80 shadow-sm flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 bg-blue-100 text-[#0f4c81] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                                    <Smartphone size={12} />
                                    <span>Dịch vụ công trực tuyến</span>
                                </div>
                                <h3 className="font-bold text-base text-gray-900">Phản ánh qua Cổng Dịch vụ công tỉnh</h3>
                                <p className="text-xs text-gray-600">Gửi phản ánh, kiến nghị và tra cứu tiến độ giải quyết hồ sơ thủ tục hành chính trực tuyến.</p>
                            </div>
                            <a
                                href="https://dichvucong.laocai.gov.vn"
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 bg-[#0f4c81] hover:bg-[#0c3e6b] text-white font-bold text-xs rounded-lg shadow whitespace-nowrap transition"
                            >
                                Truy cập
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Contact & Petition Form */}
                    <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
                        <div className="space-y-1 pb-3 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 uppercase">
                                Gửi thông điệp / Phản ánh trực tuyến
                            </h2>
                            <p className="text-xs text-gray-500">
                                Thông tin của bạn sẽ được chuyển trực tiếp đến Ban Quản trị Cổng và bộ phận tiếp nhận xử lý
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Họ và tên của bạn <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    placeholder="Nhập họ và tên đầy đủ..."
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Địa chỉ Email <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="email@vidu.com"
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Số điện thoại liên hệ <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="0912 345 678"
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Chủ đề / Nội dung phản ánh
                                </label>
                                <select
                                    value={formData.topic}
                                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition"
                                >
                                    <option value="Góp ý xây dựng chính sách, văn bản">Góp ý xây dựng chính sách, văn bản</option>
                                    <option value="Phản ánh khó khăn vướng mắc thủ tục tư pháp">Phản ánh vướng mắc thủ tục hành chính tư pháp</option>
                                    <option value="Yêu cầu trợ giúp pháp lý cho người yếu thế">Yêu cầu trợ giúp pháp lý cho người yếu thế</option>
                                    <option value="Hỗ trợ pháp lý doanh nghiệp và khởi nghiệp">Hỗ trợ pháp lý doanh nghiệp & khởi nghiệp</option>
                                    <option value="Khác">Nội dung khác</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Nội dung chi tiết thông điệp <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    placeholder="Vui lòng trình bày rõ ràng, cụ thể vấn đề hoặc ý kiến đóng góp của bạn..."
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full py-3 bg-[#0f4c81] hover:bg-[#0c3e6b] text-white font-bold text-sm rounded-xl transition shadow flex items-center justify-center gap-2"
                            >
                                <Send size={16} />
                                <span>{isSubmitted ? 'Đang gửi thông điệp...' : 'Gửi thông điệp liên hệ'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <LaoCaiFooter />
        </div>
    );
};

export default LaoCaiContactPage;

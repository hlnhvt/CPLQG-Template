import React, { useState, useEffect } from 'react';
import {
    Shield,
    MapPin,
    Phone,
    Users,
    FileText,
    Calendar,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Building2,
    X,
    Sparkles,
    ArrowRight,
    Compass,
    Scale,
    ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import { hanoiLegalAidBranches } from '../../data/hanoiMockData';
import LegalAidWorkflowDiagram from '../../components/hanoi/diagrams/LegalAidWorkflowDiagram';

const BENEFICIARIES = [
    "Người có công với cách mạng",
    "Người thuộc hộ nghèo, hộ cận nghèo",
    "Trẻ em dưới 16 tuổi",
    "Người khuyết tật có khó khăn về tài chính",
    "Đồng bào dân tộc thiểu số cư trú ở vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn",
    "Nạn nhân trong các vụ việc bạo lực gia đình, mua bán người"
];

const HanoiLegalAidPage = () => {
    const [selectedTab, setSelectedTab] = useState('gioi-thieu');
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        fullName: '',
        phone: '',
        cccd: '',
        address: '',
        branchName: 'Trung tâm TGPL Nhà nước Hà Nội (Trụ sở chính)',
        caseType: 'Dân sự, Đất đai',
        description: '',
        date: ''
    });
    const [isBooked, setIsBooked] = useState(false);

    useEffect(() => {
        document.title = "Trợ giúp pháp lý - Cổng Pháp luật Thành phố Hà Nội";
        window.scrollTo(0, 0);
    }, []);

    const handleBooking = (e) => {
        e.preventDefault();
        if (!bookingForm.fullName || !bookingForm.phone) {
            alert('Vui lòng nhập đầy đủ thông tin bắt buộc.');
            return;
        }
        setIsBooked(true);
        setTimeout(() => {
            setIsBooked(false);
            alert('Yêu cầu đặt lịch trợ giúp pháp lý đã được ghi nhận! Cán bộ trợ giúp viên sẽ liên hệ với bạn trong vòng 24h làm việc.');
            setBookingForm({
                fullName: '',
                phone: '',
                cccd: '',
                address: '',
                branchName: 'Trung tâm TGPL Nhà nước Hà Nội (Trụ sở chính)',
                caseType: 'Dân sự, Đất đai',
                description: '',
                date: ''
            });
        }, 1000);
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-[#0f4c81] transition-colors">Trang chủ Hà Nội</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Trợ giúp pháp lý</span>
                </div>
            </div>

            {/* Page Header Banner - Đồng bộ màu sắc & phong cách Banner trang chủ Cổng Hà Nội */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes hanoiRotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes hanoiRotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes hanoiPulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes hanoiFloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes hanoiSweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'hanoiSweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'hanoiPulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'hanoiPulseGlow 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'hanoiPulseGlow 5.5s ease-in-out infinite 0.5s' }} />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'hanoiRotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'hanoiRotateCCW 18s linear infinite' }} />

                {/* 5. Điểm nhấn kim cương ánh kim */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'hanoiFloatDiamond 3.2s ease-in-out infinite' }} />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'hanoiFloatDiamond 3.6s ease-in-out infinite 0.8s' }} />

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        Trợ giúp pháp lý
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Cung cấp dịch vụ pháp lý miễn phí, bảo vệ quyền và lợi ích hợp pháp của người dân Thủ đô
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1286px] flex items-center gap-2 overflow-x-auto no-scrollbar py-2 text-xs sm:text-sm font-semibold">
                    <button
                        onClick={() => setSelectedTab('gioi-thieu')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'gioi-thieu'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <Compass size={16} />
                        <span>Giới thiệu chung</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('dich-vu')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'dich-vu'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <FileText size={16} />
                        <span>Nghiệp vụ & Quy trình TGPL</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('chi-nhanh')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'chi-nhanh'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <MapPin size={16} />
                        <span>Mạng lưới 8 Chi nhánh</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('dat-lich')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'dat-lich'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <Calendar size={16} />
                        <span>Đăng ký yêu cầu trực tuyến</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-8 max-w-[1286px] space-y-10">

                {/* 0. TAB GIỚI THIỆU CHỨC NĂNG, NHIỆM VỤ, SỨ MỆNH & ĐỐI TƯỢNG PHỤC VỤ */}
                {selectedTab === 'gioi-thieu' && (
                    <div className="space-y-10 animate-fadeIn">
                        {/* 1. Hero Card Giới thiệu tổng quan */}
                        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/30">
                            {/* Floating animations */}
                            <style>{`
                                @keyframes floatSlow {
                                    0%, 100% { transform: translateY(0px); }
                                    50% { transform: translateY(-7px); }
                                }
                                @keyframes floatReverse {
                                    0%, 100% { transform: translateY(0px); }
                                    50% { transform: translateY(5px); }
                                }
                            `}</style>

                            {/* Faint Trong Dong (Bronze Drum) watermark decor on the right */}
                            <div className="absolute -right-12 -top-12 sm:-right-6 sm:-top-6 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none flex items-center justify-center overflow-hidden">
                                <img
                                    src="/trong_dong_bg.png"
                                    alt="Họa tiết Trống đồng"
                                    className="w-full h-full object-contain opacity-20 mix-blend-screen animate-[spin_180s_linear_infinite]"
                                />
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                            <div className="absolute top-0 right-1/4 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                {/* Left Column: Text & Meta badges */}
                                <div className="lg:col-span-8 space-y-3">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                        Trung Tâm Trợ Giúp Pháp Lý Nhà Nước Thành Phố Hà Nội
                                    </h2>
                                    <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
                                        Điểm tựa pháp lý tin cậy, cung ứng dịch vụ pháp lý miễn phí 100% của Nhà nước cho các đối tượng chính sách, người nghèo và người yếu thế trong xã hội theo Luật Trợ giúp pháp lý; bảo đảm quyền bình đẳng tiếp cận công lý và bảo vệ quyền, lợi ích hợp pháp của công dân trên toàn địa bàn Thủ đô.
                                    </p>
                                    <div className="pt-2 flex items-center text-xs text-amber-200/90 font-medium">
                                        <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                                            <Building2 size={14} className="text-amber-300" />
                                            <span>Đơn vị chủ quản: Sở Tư pháp TP. Hà Nội</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Right Column: Biểu tượng chính duy nhất trên nền trống đồng */}
                                <div className="hidden lg:flex lg:col-span-4 justify-center items-center relative min-h-[160px]">
                                    {/* Center Main Icon */}
                                    <div 
                                        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-blue-600/40 backdrop-blur-md border border-indigo-400/40 flex items-center justify-center shadow-2xl shadow-indigo-950/80 relative z-10"
                                        style={{ animation: 'floatSlow 4s ease-in-out infinite' }}
                                    >
                                        <Scale size={46} className="text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4 Pillars: Sứ mệnh - Chức năng - Nhiệm vụ - Đối tượng phục vụ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: Sứ mệnh */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <Sparkles size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Sứ Mệnh Nhân Văn
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                    Hiện thực hóa chính sách an sinh xã hội sâu sắc của Đảng, Nhà nước và chính quyền Thủ đô với phương châm: <em>"Không để bất kỳ người dân Thủ đô nào bị bỏ lại phía sau về mặt pháp lý vì hoàn cảnh khó khăn"</em>. Bảo đảm công lý được thực thi khách quan, công bằng và đem lại sự an tâm tuyệt đối cho người dân khi đối mặt với rào cản pháp lý.
                                </p>
                                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>100% miễn phí toàn bộ án phí, chi phí bồi dưỡng và thù lao</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Bảo vệ quyền con người, quyền công dân trong tố tụng</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 2: Chức năng */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <Building2 size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Chức Năng Đơn Vị
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                    Đơn vị sự nghiệp công lập trực thuộc Sở Tư pháp Hà Nội, có tư cách pháp nhân, con dấu riêng và trụ sở chính cùng 8 Chi nhánh thường trực. Trung tâm trực tiếp tổ chức cung ứng dịch vụ pháp lý miễn phí theo 3 hình thức: tư vấn pháp luật, tham gia tố tụng và đại diện ngoài tố tụng; đồng thời quản lý, điều phối mạng lưới Trợ giúp viên pháp lý và Luật sư cộng tác viên trên toàn địa bàn.
                                </p>
                                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Tổ chức mạng lưới phủ kín 30 quận, huyện, thị xã</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Phối hợp liên ngành chặt chẽ với Công an, VKS, Tòa án</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 3: Nhiệm vụ */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Nhiệm Vụ Trọng Tâm
                                </h3>
                                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">1.</span>
                                        <span>Tiếp nhận, thẩm tra hồ sơ yêu cầu TGPL và phân công người thực hiện nhanh chóng, đúng quy trình.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">2.</span>
                                        <span>Cử Trợ giúp viên hoặc chỉ định Luật sư bào chữa, bảo vệ quyền lợi hợp pháp trong các vụ án hình sự, dân sự, hành chính.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">3.</span>
                                        <span>Tổ chức các đợt trợ giúp pháp lý lưu động tại các xã vùng sâu, vùng bãi, vùng dân tộc thiểu số Ba Vì, Mỹ Đức, Quốc Oai.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">4.</span>
                                        <span>Đánh giá hiệu quả, chất lượng vụ việc và giải quyết kiến nghị phản ánh về dịch vụ TGPL.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Đối tượng phục vụ */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Đối Tượng Thụ Hưởng
                                </h3>
                                <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Người có công với cách mạng:</strong> Liệt sĩ, thương binh, Bà mẹ VNAH.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Hộ nghèo, hộ cận nghèo:</strong> Theo chuẩn nghèo đa chiều của TP Hà Nội.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Trẻ em & người chưa thành niên:</strong> Người bị buộc tội từ 16 đến dưới 18 tuổi.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Đồng bào DTTS, người khuyết tật, nạn nhân bạo lực gia đình:</strong> Gặp khó khăn về tài chính.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Workflow Diagram */}
                        <LegalAidWorkflowDiagram />

                            {/* 3 Cam kết chất lượng cốt lõi */}
                            <div className="pt-4 border-t border-slate-100">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                        <div className="text-xl font-bold text-[#0f4c81] mb-0.5">100% MIỄN PHÍ</div>
                                        <p className="text-xs text-slate-600">Không thu bất kỳ lệ phí, chi phí hay bồi dưỡng</p>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                        <div className="text-xl font-bold text-[#0f4c81] mb-0.5">TẬN TÂM - BẢO MẬT</div>
                                        <p className="text-xs text-slate-600">Bảo mật thông tin đời tư công dân theo quy định</p>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                        <div className="text-xl font-bold text-[#0f4c81] mb-0.5">BAO PHỦ 30 QUẬN/HUYỆN</div>
                                        <p className="text-xs text-slate-600">8 Chi nhánh tiếp nhận và xử lý vụ việc tận địa bàn</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                )}

                {/* 1. TAB NGHIỆP VỤ & QUY TRÌNH */}
                {selectedTab === 'dich-vu' && (
                    <div className="space-y-12">
                        {/* 1. Đối tượng & Hình thức trợ giúp */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-[#0f4c81]">
                                    <Users size={22} />
                                    <h2 className="text-lg sm:text-xl font-bold uppercase">Đối tượng được trợ giúp miễn phí</h2>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Căn cứ theo Luật Trợ giúp pháp lý số 11/2017/QH14, các diện công dân sau được hỗ trợ 100% chi phí pháp lý:
                                </p>
                                <ul className="space-y-2.5 pt-2">
                                    {BENEFICIARIES.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-[#0f4c81]">
                                    <FileText size={22} />
                                    <h2 className="text-lg sm:text-xl font-bold uppercase">Các hình thức thực hiện</h2>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Đội ngũ Trợ giúp viên pháp lý và Luật sư cộng tác viên thực hiện theo 3 hình thức chính:
                                </p>
                                <div className="space-y-3 pt-2">
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                        <h4 className="font-bold text-sm text-slate-900 mb-1">1. Tư vấn pháp luật</h4>
                                        <p className="text-xs text-slate-600">Hướng dẫn, giải đáp thắc mắc, giúp soạn thảo văn bản, đơn từ liên quan đến tranh chấp dân sự, đất đai, hôn nhân gia đình.</p>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                        <h4 className="font-bold text-sm text-slate-900 mb-1">2. Tham gia tố tụng</h4>
                                        <p className="text-xs text-slate-600">Cử Trợ giúp viên hoặc Luật sư tham gia bào chữa, bảo vệ quyền lợi hợp pháp tại Tòa án nhân dân các cấp trên địa bàn Hà Nội.</p>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                        <h4 className="font-bold text-sm text-slate-900 mb-1">3. Đại diện ngoài tố tụng</h4>
                                        <p className="text-xs text-slate-600">Đại diện cho người được trợ giúp pháp lý thực hiện các thủ tục hành chính, hòa giải tranh chấp với cơ quan có thẩm quyền.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quy trình yêu cầu trợ giúp pháp lý 4 bước */}
                        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="text-center max-w-2xl mx-auto mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    4 Bước Tiếp Nhận & Giải Quyết Vụ Việc TGPL
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {PROCESS_STEPS.map((item, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition">
                                        <div className="text-2xl font-bold text-slate-300 mb-2 font-mono">{item.step}</div>
                                        <h4 className="font-bold text-sm text-slate-900 mb-1.5">{item.title}</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. TAB DANH BẠ 8 CHI NHÁNH */}
                {selectedTab === 'chi-nhanh' && (
                    <div>
                        <div className="border-b-2 border-red-700 pb-2 mb-6 inline-block pr-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#0f4c81] uppercase">
                                Danh bạ 8 Chi nhánh Trợ giúp pháp lý tại Hà Nội
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {hanoiLegalAidBranches.map((branch) => (
                                <div
                                    key={branch.id}
                                    className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0f4c81] hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-slate-500">
                                                Chi nhánh số {branch.id}
                                            </span>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đang mở cửa tiếp dân" />
                                        </div>
                                        <h3 className="font-bold text-sm text-slate-900 leading-snug">
                                            {branch.name}
                                        </h3>
                                        <div className="space-y-1.5 text-xs text-slate-600">
                                            <div className="flex items-start gap-1.5">
                                                <MapPin size={13} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                                <span>{branch.address}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                                                <Phone size={13} className="text-[#0f4c81] shrink-0" />
                                                <span>{branch.phone}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                                                Địa bàn: <strong>{branch.districts}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setBookingForm(prev => ({ ...prev, branchName: branch.name }));
                                            setSelectedTab('dat-lich');
                                            document.getElementById('form-dat-lich')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="mt-4 w-full py-2 bg-slate-50 hover:bg-[#0f4c81] text-[#0f4c81] hover:text-white font-bold text-xs rounded-lg transition border border-slate-200"
                                    >
                                        Đặt lịch hẹn tư vấn
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. TAB ĐẶT LỊCH TRỰC TUYẾN */}
                {selectedTab === 'dat-lich' && (
                    <div id="form-dat-lich" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Phiếu Đăng Ký Yêu Cầu Trợ Giúp Pháp Lý Trực Tuyến
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500">
                                    Cán bộ Trợ giúp viên thuộc Trung tâm TGPL Nhà nước Hà Nội sẽ liên hệ xác nhận và hướng dẫn chi tiết
                                </p>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Họ và tên người yêu cầu <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={bookingForm.fullName}
                                            onChange={(e) => setBookingForm(prev => ({ ...prev, fullName: e.target.value }))}
                                            placeholder="Ví dụ: Nguyễn Văn An"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Số điện thoại liên hệ <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={bookingForm.phone}
                                            onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="Ví dụ: 0912345678"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Số CCCD / Định danh VNeID
                                        </label>
                                        <input
                                            type="text"
                                            value={bookingForm.cccd}
                                            onChange={(e) => setBookingForm(prev => ({ ...prev, cccd: e.target.value }))}
                                            placeholder="12 chữ số"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">
                                            Chi nhánh tiếp nhận mong muốn
                                        </label>
                                        <select
                                            value={bookingForm.branchName}
                                            onChange={(e) => setBookingForm(prev => ({ ...prev, branchName: e.target.value }))}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                        >
                                            <option value="Trung tâm TGPL Nhà nước Hà Nội (Trụ sở chính)">Trụ sở chính (Hà Đông)</option>
                                            {hanoiLegalAidBranches.map(b => (
                                                <option key={b.id} value={b.name}>{b.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="text-xs sm:text-sm">
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Nội dung tóm tắt vụ việc cần trợ giúp
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={bookingForm.description}
                                        onChange={(e) => setBookingForm(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Mô tả ngắn gọn vụ việc, tranh chấp hoặc thắc mắc pháp lý..."
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isBooked}
                                    className="w-full py-3 bg-[#0f4c81] hover:bg-[#0c3e6b] text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
                                >
                                    <Send size={16} />
                                    <span>{isBooked ? 'Đang gửi thông tin...' : 'Gửi yêu cầu trợ giúp pháp lý'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiLegalAidPage;

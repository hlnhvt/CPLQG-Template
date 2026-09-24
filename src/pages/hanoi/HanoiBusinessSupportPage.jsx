import React, { useState, useEffect } from 'react';
import {
    Building2,
    FileText,
    Rocket,
    HelpCircle,
    Scale,
    CheckCircle2,
    Download,
    ChevronRight,
    Send,
    Briefcase,
    ExternalLink,
    Sparkles,
    ShieldCheck,
    BookOpen,
    Target,
    Users,
    Compass,
    Layers,
    Award,
    ArrowRight,
    FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import BusinessSupportPillarsDiagram from '../../components/hanoi/diagrams/BusinessSupportPillarsDiagram';

const POLICIES = [
    {
        title: "Cơ chế Thử nghiệm có kiểm soát (Sandbox)",
        law: "Điều 25 - Luật Thủ Đô số 39/2024/QH15",
        desc: "Cho phép doanh nghiệp, viện nghiên cứu thử nghiệm các sản phẩm, giải pháp công nghệ mới (AI, Fintech, dữ liệu lớn, xe tự hành) trong môi trường thể chế được miễn trừ trách nhiệm hành chính theo quy định.",
        tag: "Đột phá thể chế"
    },
    {
        title: "Ưu đãi đầu tư & Hỗ trợ tài chính khởi nghiệp",
        law: "Nghị quyết HĐND TP Hà Nội năm 2026",
        desc: "Hỗ trợ 100% chi phí ươm tạo tại Khu Công nghệ cao Hòa Lạc; miễn giảm thuế thu nhập doanh nghiệp trong 5 năm đầu cho doanh nghiệp khoa học công nghệ và đổi mới sáng tạo Thủ đô.",
        tag: "Thuế & Tài chính"
    },
    {
        title: "Hỗ trợ tiếp cận đất đai & Không gian làm việc số",
        law: "Quyết định của UBND Thành phố Hà Nội",
        desc: "Hỗ trợ tối đa 50% chi phí thuê mặt bằng sản xuất tại các cụm công nghiệp tập trung, vườn ươm công nghệ và trung tâm đổi mới sáng tạo của Thành phố giai đoạn 2026-2030.",
        tag: "Mặt bằng sản xuất"
    }
];

const FAQS = [
    {
        q: "Điều kiện để doanh nghiệp công nghệ được tham gia cơ chế Sandbox theo Luật Thủ Đô là gì?",
        a: "Doanh nghiệp phải có trụ sở chính hoặc cơ sở nghiên cứu trên địa bàn TP Hà Nội; có phương án thử nghiệm khả thi, kiểm soát rủi ro rõ ràng và được Hội đồng thẩm định độc lập do UBND Thành phố thành lập chấp thuận."
    },
    {
        q: "Doanh nghiệp nhỏ và vừa (SME) tại Hà Nội được thụ hưởng chương trình hỗ trợ pháp lý nào?",
        a: "Sở Tư pháp Hà Nội phối hợp với Đoàn Luật sư TP Hà Nội cung cấp dịch vụ tư vấn pháp luật miễn phí về hợp đồng thương mại, lao động, sở hữu trí tuệ và hỗ trợ giải quyết tranh chấp ngoài tố tụng."
    },
    {
        q: "Thủ tục đăng ký tư vấn và tháo gỡ khó khăn về mặt thể chế cho dự án đầu tư được thực hiện ra sao?",
        a: "Doanh nghiệp gửi phiếu đề nghị qua form trực tuyến trên Cổng hoặc liên hệ trực tiếp Tổ công tác tháo gỡ khó khăn cho doanh nghiệp của UBND Thành phố để được phân luồng thụ lý trong 48 giờ."
    }
];

const DOC_RESOURCES = [
    {
        title: "Sổ tay Pháp lý dành cho Doanh nghiệp khởi nghiệp đổi mới sáng tạo Thủ đô",
        category: "Cẩm nang pháp lý",
        size: "2.4 MB"
    },
    {
        title: "Hệ thống Mẫu hợp đồng thương mại chuẩn hóa tuân thủ Luật Thương mại 2026",
        category: "Biểu mẫu hợp đồng",
        size: "1.8 MB"
    },
    {
        title: "Hướng dẫn tuân thủ nghĩa vụ thuế, bảo hiểm và an toàn lao động cho doanh nghiệp SME",
        category: "Hướng dẫn nghiệp vụ",
        size: "3.1 MB"
    }
];

const HanoiBusinessSupportPage = () => {
    const [selectedTab, setSelectedTab] = useState('gioi-thieu');
    const [questionForm, setQuestionForm] = useState({
        companyName: '',
        taxCode: '',
        phone: '',
        field: 'Thuế & Ưu đãi đầu tư',
        question: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        document.title = "Hỗ trợ pháp lý doanh nghiệp - Cổng Pháp luật Thành phố Hà Nội";
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            alert("Câu hỏi tư vấn pháp lý của doanh nghiệp đã được gửi thành công! Chuyên gia pháp lý sẽ liên hệ trong 24 giờ.");
            setQuestionForm({
                companyName: '',
                taxCode: '',
                phone: '',
                field: 'Thuế & Ưu đãi đầu tư',
                question: ''
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
                    <span className="text-gray-800 font-medium">Hỗ trợ pháp lý doanh nghiệp</span>
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
                    <div className="max-w-3xl">
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                            Hỗ trợ pháp lý Doanh nghiệp
                        </h1>
                        <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                        <p className="text-xs sm:text-sm text-amber-50/95 mt-1 leading-relaxed drop-shadow-sm font-normal">
                            Tháo gỡ rào cản pháp lý, thúc đẩy đổi mới sáng tạo và triển khai cơ chế ưu đãi đặc thù theo Luật Thủ Đô 2024
                        </p>
                    </div>
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
                        onClick={() => setSelectedTab('co-che')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'co-che'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <Rocket size={16} />
                        <span>Cơ chế đặc thù & Sandbox</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('tai-lieu')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'tai-lieu'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <BookOpen size={16} />
                        <span>Sổ tay & Tài liệu pháp lý</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('tu-van')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'tu-van'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <HelpCircle size={16} />
                        <span>Hỏi đáp & Gửi yêu cầu tư vấn</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-8 max-w-[1286px]">
                {/* TAB 1: GIỚI THIỆU CHUNG - ĐẸP MẮT, ẤN TƯỢNG, KHOA HỌC */}
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
                            <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                            <div className="absolute top-0 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                {/* Left Column: Text & Meta badges */}
                                <div className="lg:col-span-8 space-y-3">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                        Hệ Thống Hỗ Trợ Pháp Lý Doanh Nghiệp & Khởi Nghiệp Đổi Mới Sáng Tạo
                                    </h2>
                                    <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
                                        Nền tảng chính thống trực thuộc hệ thống Cổng Pháp luật Thành phố Hà Nội, chuyên trách tháo gỡ rào cản pháp lý, hướng dẫn áp dụng các cơ chế chính sách đặc thù theo Luật Thủ Đô số 39/2024/QH15 và đồng hành bảo vệ quyền lợi hợp pháp của cộng đồng doanh nghiệp Thủ đô.
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
                                        <Building2 size={46} className="text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Sứ mệnh & Chức năng (2 cột song hành) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sứ mệnh */}
                            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Kim chỉ nam hoạt động</span>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Sứ mệnh phát triển</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                        Đồng hành tận tâm cùng cộng đồng <strong>hơn 380.000 doanh nghiệp, hợp tác xã và các dự án khởi nghiệp</strong> trên địa bàn Thủ đô. Thiết lập môi trường đầu tư kinh doanh an toàn, minh bạch, giảm thiểu tối đa rủi ro pháp lý và chi phí tuân thủ; đưa các quy định đặc thù của Luật Thủ Đô vào thực tiễn đời sống kinh tế, tạo bệ phóng vững chắc cho doanh nghiệp vươn tầm quốc tế.
                                    </p>
                                </div>
                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    <div className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                                        <Sparkles size={16} className="shrink-0 text-[#0f4c81]" />
                                        <span>Khẩu hiệu: "Pháp luật đồng hành - Doanh nghiệp Thủ đô tự tin bứt phá"</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chức năng */}
                            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                        <Layers size={24} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Vai trò thể chế</span>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Chức năng nòng cốt</h3>
                                    </div>
                                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0f4c81] mt-2 shrink-0" />
                                            <p className="leading-relaxed"><strong>Đầu mối tham mưu:</strong> Trợ giúp UBND Thành phố và Sở Tư pháp hoạch định và triển khai chương trình hỗ trợ pháp lý liên ngành cho doanh nghiệp.</p>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0f4c81] mt-2 shrink-0" />
                                            <p className="leading-relaxed"><strong>Điều phối giải quyết khó khăn:</strong> Làm cầu nối kết nối giữa doanh nghiệp với cơ quan công quyền, đoàn luật sư và các chuyên gia đầu ngành.</p>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0f4c81] mt-2 shrink-0" />
                                            <p className="leading-relaxed"><strong>Phản biện & Hoàn thiện chính sách:</strong> Tiếp nhận phản hồi từ thực tiễn sản xuất kinh doanh để đề xuất sửa đổi các văn bản quy phạm chưa phù hợp.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    <div className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                                        <ShieldCheck size={16} className="shrink-0 text-[#0f4c81]" />
                                        <span>Bảo đảm tính minh bạch, công bằng và thượng tôn pháp luật</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Bốn Nhiệm vụ trọng tâm */}
                        <div>
                            <div className="border-b-2 border-red-700 pb-2 mb-6 inline-block pr-8">
                                <h3 className="text-lg sm:text-xl font-bold text-[#0f4c81] uppercase">
                                    Nhiệm vụ trọng tâm triển khai
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                        <Rocket size={20} />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                                        Triển khai Cơ chế Sandbox & Chính sách ưu đãi đặc thù
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                        Hướng dẫn quy trình, thủ tục cấp phép thử nghiệm có kiểm soát (Sandbox theo Điều 25 Luật Thủ Đô), ưu đãi thuế TNDN, tiền thuê đất cho trung tâm đổi mới sáng tạo.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                        <HelpCircle size={20} />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                                        Tư vấn & Tháo gỡ khó khăn trực tiếp 24/7
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                        Tiếp nhận, xử lý và phân công luật sư, chuyên gia giải đáp trực tiếp các vướng mắc của doanh nghiệp về thuế, đầu tư, đất đai, lao động trong vòng 24 - 48 giờ.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                        <BookOpen size={20} />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                                        Chuẩn hóa Biểu mẫu & Thư viện số doanh nghiệp
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                        Xây dựng kho biểu mẫu hợp đồng mẫu, cẩm nang quản trị rủi ro pháp lý, sổ tay hướng dẫn tuân thủ pháp luật chuyên ngành được số hóa và tải về hoàn toàn miễn phí.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                        <Award size={20} />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                                        Bồi dưỡng Pháp lý & Đối thoại chính sách định kỳ
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                        Tổ chức các lớp tập huấn kỹ năng quản trị pháp lý, hội thảo chuyên đề hội nhập quốc tế (EVFTA, CPTPP) và đối thoại tháo gỡ điểm nghẽn giữa chính quyền với doanh nhân.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Đối tượng phục vụ (380.000+ Doanh nghiệp & Startups) */}
                        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                            <div className="max-w-2xl">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Phục vụ toàn diện cộng đồng kinh doanh Thủ đô
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                                    Chính sách hỗ trợ được thiết kế chuyên biệt, linh hoạt tương ứng với quy mô và đặc thù của từng nhóm đối tượng:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                            <Briefcase size={18} />
                                        </div>
                                        <h4 className="font-bold text-sm text-slate-900">Doanh nghiệp SME</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                            Hơn 380.000 doanh nghiệp vừa và nhỏ trên 30 quận/huyện cần hướng dẫn tuân thủ thuế, bảo hiểm, hợp đồng và an toàn pháp lý.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                            <Rocket size={18} />
                                        </div>
                                        <h4 className="font-bold text-sm text-slate-900">Khởi nghiệp ĐMST (Startups)</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                            Doanh nghiệp công nghệ cao, AI, Fintech, trung tâm R&D tại Khu CNC Hòa Lạc áp dụng cơ chế Sandbox và gọi vốn mạo hiểm.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                            <Users size={18} />
                                        </div>
                                        <h4 className="font-bold text-sm text-slate-900">HTX & Hộ kinh doanh cá thể</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                            Hàng trăm ngàn hộ kinh doanh, hợp tác xã làng nghề truyền thống được hướng dẫn thủ tục chuyển đổi thành mô hình doanh nghiệp.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center font-bold">
                                            <Building2 size={18} />
                                        </div>
                                        <h4 className="font-bold text-sm text-slate-900">Doanh nghiệp FDI & Đầu tư</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                            Các tập đoàn đa quốc gia và nhà đầu tư chiến lược tìm hiểu quy chế đầu tư đặc thù và ưu đãi đất đai theo Luật Thủ Đô.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Mô hình 4 trụ cột khoa học tương tác */}
                        <BusinessSupportPillarsDiagram />

                            {/* Điều hướng nhanh sang các chức năng */}
                            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={() => setSelectedTab('co-che')}
                                    className="px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-semibold text-xs transition flex items-center gap-2 shadow-sm"
                                >
                                    <Rocket size={15} />
                                    <span>Khám phá Cơ chế Sandbox & Ưu đãi</span>
                                    <ArrowRight size={13} />
                                </button>
                                <button
                                    onClick={() => setSelectedTab('tai-lieu')}
                                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold text-xs transition flex items-center gap-2"
                                >
                                    <BookOpen size={15} className="text-[#0f4c81]" />
                                    <span>Tải Sổ tay & Mẫu hợp đồng chuẩn</span>
                                </button>
                                <button
                                    onClick={() => setSelectedTab('tu-van')}
                                    className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs transition flex items-center gap-2 shadow-sm"
                                >
                                    <Send size={14} />
                                    <span>Gửi câu hỏi hỗ trợ pháp lý ngay</span>
                                </button>
                            </div>
                    </div>
                )}

                {/* TAB 2: CƠ CHẾ ĐẶC THÙ & SANDBOX */}
                {selectedTab === 'co-che' && (
                    <div className="space-y-8 animate-fadeIn">
                        <div>
                            <div className="border-b-2 border-red-700 pb-2 mb-6 inline-block pr-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#0f4c81] uppercase">
                                    Chính sách đặc thù hỗ trợ Doanh nghiệp theo Luật Thủ Đô 2024
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {POLICIES.map((p, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                                        <div className="space-y-3">
                                            <div className="text-xs font-medium text-slate-500">
                                                {p.tag}
                                            </div>
                                            <h3 className="font-bold text-base text-slate-900 leading-snug">
                                                {p.title}
                                            </h3>
                                            <div className="text-xs text-[#0f4c81] font-semibold">
                                                {p.law}
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                                {p.desc}
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                                            <span
                                                onClick={() => setSelectedTab('tu-van')}
                                                className="text-xs font-bold text-[#0f4c81] cursor-pointer hover:underline flex items-center gap-1"
                                            >
                                                Gửi câu hỏi về cơ chế này →
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: SỔ TAY & TÀI LIỆU PHÁP LÝ */}
                {selectedTab === 'tai-lieu' && (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                        Sổ Tay & Tài Liệu Bồi Dưỡng Pháp Luật Kinh Doanh
                                    </h3>
                                </div>
                                <span className="text-xs text-slate-500">Cập nhật theo thể chế mới nhất</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {DOC_RESOURCES.map((doc, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0f4c81] flex items-center justify-center">
                                                <BookOpen size={20} />
                                            </div>
                                            <div className="text-xs font-medium text-slate-500">{doc.category}</div>
                                            <h4 className="font-bold text-sm text-slate-900 leading-snug">{doc.title}</h4>
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                            <span className="text-slate-400">Dung lượng: {doc.size}</span>
                                            <button
                                                onClick={() => alert(`Đang tải tài liệu: ${doc.title}`)}
                                                className="text-[#0f4c81] font-bold hover:underline flex items-center gap-1"
                                            >
                                                <Download size={13} /> Tải PDF
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: HỎI ĐÁP & GỬI YÊU CẦU TƯ VẤN */}
                {selectedTab === 'tu-van' && (
                    <div className="animate-fadeIn">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left: FAQs */}
                            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-6">
                                <div className="flex items-center gap-2 text-[#0f4c81]">
                                    <HelpCircle size={22} />
                                    <h2 className="text-lg sm:text-xl font-bold uppercase">Câu hỏi thường gặp của Doanh nghiệp</h2>
                                </div>

                                <div className="space-y-4">
                                    {FAQS.map((faq, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                                            <h4 className="font-bold text-sm text-gray-900">
                                                Q: {faq.q}
                                            </h4>
                                            <p className="text-xs text-gray-600 leading-relaxed text-justify">
                                                <strong className="text-emerald-700">Trả lời:</strong> {faq.a}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Consultation Form */}
                            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-red-700">
                                    <Scale size={22} />
                                    <h2 className="text-lg sm:text-xl font-bold uppercase">Gửi câu hỏi hỗ trợ pháp lý</h2>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Sở Tư pháp Hà Nội cùng Đoàn Luật sư Hà Nội sẽ phân công chuyên gia giải đáp trực tiếp cho doanh nghiệp:
                                </p>

                                <form onSubmit={handleSubmitQuestion} className="space-y-3.5 text-xs sm:text-sm">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">Tên doanh nghiệp / HTX *</label>
                                        <input
                                            type="text"
                                            required
                                            value={questionForm.companyName}
                                            onChange={(e) => setQuestionForm({ ...questionForm, companyName: e.target.value })}
                                            placeholder="Công ty CP Đầu tư & Công nghệ..."
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-1">Mã số thuế</label>
                                            <input
                                                type="text"
                                                value={questionForm.taxCode}
                                                onChange={(e) => setQuestionForm({ ...questionForm, taxCode: e.target.value })}
                                                placeholder="0101234567"
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-1">Số điện thoại *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={questionForm.phone}
                                                onChange={(e) => setQuestionForm({ ...questionForm, phone: e.target.value })}
                                                placeholder="0987 654 321"
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">Lĩnh vực vướng mắc</label>
                                        <select
                                            value={questionForm.field}
                                            onChange={(e) => setQuestionForm({ ...questionForm, field: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600"
                                        >
                                            <option value="Thuế & Ưu đãi đầu tư">Thuế & Ưu đãi đầu tư Thủ đô</option>
                                            <option value="Đất đai & Mặt bằng sản xuất">Đất đai & Mặt bằng sản xuất</option>
                                            <option value="Sở hữu trí tuệ & Chuyển giao công nghệ">Sở hữu trí tuệ & Công nghệ</option>
                                            <option value="Hợp đồng thương mại & Tranh chấp">Hợp đồng thương mại & Tranh chấp</option>
                                            <option value="Lao động & Bảo hiểm xã hội">Lao động & Bảo hiểm xã hội</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">Nội dung câu hỏi cụ thể *</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={questionForm.question}
                                            onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                                            placeholder="Mô tả chi tiết khó khăn, vướng mắc pháp lý cần được tư vấn..."
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-blue-600 resize-none text-xs sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitted}
                                        className="w-full py-2.5 bg-[#0f4c81] hover:bg-[#0c3e6b] text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
                                    >
                                        <Send size={14} />
                                        <span>{submitted ? 'Đang gửi câu hỏi...' : 'Gửi câu hỏi tư vấn'}</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiBusinessSupportPage;

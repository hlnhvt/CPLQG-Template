import React, { useEffect, useState } from 'react';
import {
    BookOpen,
    Award,
    Video,
    FileText,
    Search,
    ChevronRight,
    Calendar,
    Clock,
    Share2,
    Download,
    HelpCircle,
    CheckCircle2,
    Users,
    Sparkles,
    Shield,
    HeartHandshake,
    Building2,
    ShieldCheck,
    ArrowRight,
    ArrowDown,
    Compass,
    Newspaper,
    Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import { hanoiNewsArticles } from '../../data/hanoiMockData';
import DisseminationNetworkDiagram from '../../components/hanoi/diagrams/DisseminationNetworkDiagram';

const SITUATIONS = [
    {
        title: "Xử lý vi phạm lấn chiếm vỉa hè, lòng đường để kinh doanh buôn bán tại các quận nội thành",
        category: "Trật tự đô thị",
        date: "20/03/2026",
        answer: "Căn cứ Nghị định số 100/2019/NĐ-CP và Quyết định của UBND TP Hà Nội, hành vi lấn chiếm vỉa hè làm nơi trông giữ xe, buôn bán trái phép bị xử phạt vi phạm hành chính từ 2.000.000đ đến 3.000.000đ đối với cá nhân, buộc khôi phục tình trạng ban đầu."
    },
    {
        title: "Quyền lợi và thủ tục bồi thường khi Nhà nước thu hồi đất nông nghiệp trên địa bàn Hà Nội",
        category: "Đất đai - Giải phóng mặt bằng",
        date: "18/03/2026",
        answer: "Theo Quyết định số 61/2024/QĐ-UBND của UBND Thành phố Hà Nội, hộ gia đình trực tiếp sản xuất nông nghiệp khi bị thu hồi đất được bồi thường bằng đất hoặc tiền mặt, đồng thời hỗ trợ ổn định đời sống, đào tạo chuyển đổi nghề nghiệp bằng 03 đến 05 lần giá đất nông nghiệp tương ứng."
    },
    {
        title: "Quy định về tiếng ồn và giờ giấc sinh hoạt tại các khu chung cư, khu dân cư đô thị",
        category: "An ninh trật tự cơ sở",
        date: "15/03/2026",
        answer: "Hành vi gây tiếng động lớn, làm ồn ào tại khu dân cư trong khoảng thời gian từ 22h đêm đến 06h sáng hôm sau bị xử phạt vi phạm hành chính theo Nghị định số 144/2021/NĐ-CP với mức phạt cảnh cáo hoặc phạt tiền từ 500.000đ đến 1.000.000đ."
    }
];

const GUIDANCE_DOCS = [
    {
        code: "Kế hoạch 78/KH-UBND",
        title: "Kế hoạch công tác phổ biến, giáo dục pháp luật; hòa giải ở cơ sở; xây dựng cấp xã đạt chuẩn tiếp cận pháp luật năm 2026",
        date: "15/01/2026",
        agency: "UBND Thành phố Hà Nội"
    },
    {
        code: "Hướng dẫn 45/HD-STP",
        title: "Hướng dẫn thực hiện các tiêu chí đánh giá xã, phường, thị trấn đạt chuẩn tiếp cận pháp luật trên địa bàn Thủ đô",
        date: "20/02/2026",
        agency: "Sở Tư pháp Hà Nội"
    },
    {
        code: "Công văn 312/HĐPH-PBGDPL",
        title: "Tổ chức đợt cao điểm tuyên truyền, phổ biến thi hành Luật Thủ Đô số 39/2024/QH15 và các Nghị quyết quy định chi tiết",
        date: "05/03/2026",
        agency: "Hội đồng phối hợp PBGDPL TP. Hà Nội"
    }
];

const MEDIATION_DATA = [
    {
        id: 1,
        title: "Hòa giải thành công tranh chấp ngõ đi chung giữa hai hộ gia đình tại Tổ dân phố 12, P. Dịch Vọng Hậu, Cầu Giấy",
        field: "Hòa giải Đất đai - Ngõ đi chung",
        date: "19/03/2026",
        unit: "Tổ hòa giải TDP 12, Cầu Giấy"
    },
    {
        id: 2,
        title: "Tổ hòa giải cơ sở tháo gỡ bất đồng phân chia di sản thừa kế nhà đất gắn kết tình làng nghĩa xóm tại Ba Vì",
        field: "Hôn nhân & Gia đình - Thừa kế",
        date: "14/03/2026",
        unit: "Tổ hòa giải Thôn Đông, Xã Tản Lĩnh"
    },
    {
        id: 3,
        title: "Giải quyết êm thấm mâu thuẫn sinh hoạt tiếng ồn chung cư không để phát sinh điểm nóng trật tự cơ sở",
        field: "Trật tự cộng đồng cư dân",
        date: "10/03/2026",
        unit: "Tổ hòa giải Chung cư HH, Hoàng Mai"
    }
];

const HanoiLawDisseminationPage = () => {
    const [selectedTab, setSelectedTab] = useState('gioi-thieu');
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    useEffect(() => {
        document.title = "Phổ biến giáo dục pháp luật - Cổng Pháp luật Thành phố Hà Nội";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-[#0f4c81] transition-colors">Trang chủ Hà Nội</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Phổ biến giáo dục pháp luật</span>
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
                        Phổ biến, giáo dục pháp luật Thủ đô
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Đổi mới công tác tuyên truyền, đưa pháp luật và Luật Thủ Đô vào thực tiễn từng ngõ xóm, tổ dân phố
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
                        onClick={() => setSelectedTab('tin-tuc')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'tin-tuc'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <Newspaper size={16} />
                        <span>Tin tức & Sự kiện PBGDPL</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('van-ban')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'van-ban'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <FileText size={16} />
                        <span>Văn bản chỉ đạo & Hướng dẫn</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('tinh-huong')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'tinh-huong'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <HelpCircle size={16} />
                        <span>Tình huống & Hỏi đáp</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('tu-sach')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'tu-sach'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <BookOpen size={16} />
                        <span>Tủ sách pháp luật điện tử</span>
                    </button>
                    <button
                        onClick={() => setSelectedTab('hoa-giai')}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${selectedTab === 'hoa-giai'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <HeartHandshake size={16} />
                        <span>Hòa giải ở cơ sở</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <main className="flex-grow container mx-auto px-4 py-8 max-w-[1286px]">
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
                                        Hội Đồng Phối Hợp Phổ Biến, Giáo Dục Pháp Luật Thành Phố Hà Nội
                                    </h2>
                                    <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
                                        Đổi mới căn bản, chuyển đổi số toàn diện công tác phổ biến, giáo dục pháp luật Thủ đô. Vận hành mạng lưới liên thông 3 cấp đồng bộ từ Cấp Thành phố đến 30 quận, huyện, thị xã và 579 xã, phường, thị trấn; đưa Luật Thủ đô 2024 và chính sách pháp luật lan tỏa sâu rộng vào đời sống nhân dân.
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
                                        <BookOpen size={46} className="text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4 Pillars: Sứ mệnh - Chức năng - Nhiệm vụ - Đối tượng phục vụ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: Sứ mệnh */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 relative group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <Sparkles size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Sứ Mệnh
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                    Kiến tạo và lan tỏa văn hóa "Thượng tôn Hiến pháp và Pháp luật" trong lòng Thủ đô văn hiến - văn minh - hiện đại. Đảm bảo mọi người dân Hà Nội đều bình đẳng, thuận lợi trong việc tiếp cận thông tin pháp luật chính thống, chính xác, kịp thời và minh bạch; thu hẹp tối đa khoảng cách tiếp cận pháp luật giữa các quận trung tâm và các huyện ngoại thành, vùng bãi sông, vùng đồng bào dân tộc thiểu số.
                                </p>
                                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Xây dựng chuẩn mực văn hóa pháp lý người Hà Nội</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Chuyển đổi số PBGDPL đa kênh, tương tác hai chiều</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 2: Chức năng */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 relative group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <Shield size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Chức Năng Tham Mưu & Điều Phối
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                    Là cơ quan tư vấn, tham mưu cho UBND Thành phố chỉ đạo, định hướng và điều phối toàn diện chương trình, kế hoạch PBGDPL dài hạn và thường niên; chủ trì kết nối sức mạnh tổng hợp của các Sở, Ban, Ngành, Ủy ban MTTQ Việt Nam TP Hà Nội, các tổ chức chính trị - xã hội, Hội Luật gia và Đoàn Luật sư TP Hà Nội trong sự nghiệp tuyên truyền pháp luật.
                                </p>
                                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Định hướng nội dung tuyên truyền theo trọng tâm phát triển</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0" />
                                        <span>Kiểm tra, đôn đốc, đánh giá chuẩn tiếp cận pháp luật</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 3: Nhiệm vụ */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 relative group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Nhiệm Vụ Trọng Tâm
                                </h3>
                                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">1.</span>
                                        <span>Tổ chức các đợt cao điểm tuyên truyền Luật Thủ đô 2024 và văn bản QPPL Thành phố.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">2.</span>
                                        <span>Quản lý, tập huấn chuyên môn cho hơn 6.500 Báo cáo viên và Tuyên truyền viên pháp luật.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">3.</span>
                                        <span>Vận hành "Tủ sách pháp luật điện tử" tích hợp trên nền tảng số Công dân Thủ đô (iHanoi).</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="font-bold text-[#0f4c81] shrink-0">4.</span>
                                        <span>Chỉ đạo hoạt động hòa giải cơ sở tại gần 5.000 Tổ hòa giải, giữ bình yên thôn xóm.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Đối tượng phục vụ */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-[#0f4c81] hover:shadow-md transition space-y-4 relative group">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f4c81] border border-slate-200 flex items-center justify-center font-bold">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors">
                                    Đối Tượng Phục Vụ
                                </h3>
                                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Toàn thể nhân dân Thủ đô:</strong> Cư dân tại 30 quận, huyện, thị xã có nhu cầu tra cứu, tìm hiểu pháp luật.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Cán bộ, công chức, viên chức:</strong> Bồi dưỡng kiến thức pháp lý thực thi công vụ liêm chính, hiệu quả.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Học sinh, sinh viên:</strong> Giáo dục pháp luật học đường, phòng chống bạo lực, an toàn giao thông.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                        <span><strong>Đối tượng yếu thế, đặc thù:</strong> Đồng bào dân tộc thiểu số tại Ba Vì, Mỹ Đức, người khuyết tật, lao động tự do.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Network Structure Diagram */}
                        <DisseminationNetworkDiagram />
                    </div>
                )}
                {selectedTab === 'tin-tuc' && (
                    <div className="space-y-8">
                        {/* Featured article */}
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 group cursor-pointer hover:shadow-md transition">
                            <div className="lg:col-span-6 relative aspect-video lg:aspect-auto overflow-hidden">
                                <img src="/thumb1.png" alt="Featured Dissemination" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center space-y-3">
                                <span className="text-xs font-semibold text-slate-500 w-fit">
                                    Hoạt động trọng điểm
                                </span>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0f4c81] transition-colors leading-snug">
                                    Hà Nội mở đợt cao điểm tuyên truyền, phổ biến và triển khai thi hành Luật Thủ Đô số 39/2024/QH15
                                </h2>
                                <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                    Hội đồng Phối hợp PBGDPL Thành phố Hà Nội tổ chức hội nghị trực tuyến tới 579 điểm cầu xã, phường, thị trấn nhằm quán triệt sâu rộng các nội dung mới, chính sách đặc thù của Luật Thủ Đô tới toàn thể cán bộ, đảng viên và nhân dân.
                                </p>
                                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                                    <span className="flex items-center gap-1.5"><Calendar size={13} /> 22/03/2026</span>
                                    <span>Nguồn: Sở Tư pháp Hà Nội</span>
                                </div>
                            </div>
                        </div>

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {hanoiNewsArticles.map((article) => (
                                <div key={article.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
                                    <div className="aspect-video w-full overflow-hidden bg-slate-100">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <span className="text-xs font-medium text-slate-500 w-fit mb-2">
                                            {article.category}
                                        </span>
                                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                            {article.summary}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                                            <span className="text-[#0f4c81] font-semibold group-hover:underline">Chi tiết →</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'van-ban' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl text-xs sm:text-sm text-blue-900 flex items-center gap-3">
                            <FileText size={20} className="text-[#0f4c81] shrink-0" />
                            <span>Văn bản chỉ đạo, hướng dẫn nghiệp vụ công tác phổ biến giáo dục pháp luật và chuẩn tiếp cận pháp luật TP Hà Nội.</span>
                        </div>
                        <div className="space-y-3">
                            {GUIDANCE_DOCS.map((doc, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm hover:border-blue-300 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-xs text-[#0f4c81] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">{doc.code}</span>
                                            <span className="text-xs text-slate-500">{doc.agency}</span>
                                        </div>
                                        <h4 className="font-bold text-sm text-gray-900 hover:text-[#0f4c81] cursor-pointer transition">{doc.title}</h4>
                                        <div className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} /> Ban hành: {doc.date}
                                        </div>
                                    </div>
                                    <button className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0f4c81] text-xs font-bold rounded-lg transition flex items-center gap-1.5 shrink-0">
                                        <Download size={13} /> Tải văn bản
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'tinh-huong' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl text-xs sm:text-sm text-blue-900">
                            <strong>Chuyên mục Hỏi đáp - Tình huống pháp luật cơ sở:</strong> Nơi giải đáp các tình huống pháp lý phổ biến trong đời sống hàng ngày của người dân Hà Nội (đất đai, trật tự văn minh đô thị, an sinh xã hội...).
                        </div>

                        <div className="space-y-4">
                            {SITUATIONS.map((sit, idx) => (
                                <div key={idx} className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-sm">
                                    <div
                                        onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                                        className="flex items-start justify-between gap-4 cursor-pointer"
                                    >
                                        <div className="space-y-1">
                                            <div className="text-xs font-medium text-slate-500">
                                                {sit.category}
                                            </div>
                                            <h3 className="font-bold text-base text-gray-900 hover:text-[#0f4c81] pt-1">
                                                {sit.title}
                                            </h3>
                                        </div>
                                        <span className="text-xs font-bold text-[#0f4c81] px-3 py-1 bg-gray-50 rounded-lg shrink-0">
                                            {expandedQuestion === idx ? 'Thu gọn' : 'Xem giải đáp'}
                                        </span>
                                    </div>

                                    {expandedQuestion === idx && (
                                        <div className="mt-4 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-700 bg-gray-50/70 p-4 rounded-lg leading-relaxed">
                                            <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                                                <CheckCircle2 size={16} /> Căn cứ pháp lý & Hướng giải quyết:
                                            </div>
                                            <p className="text-justify">{sit.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'tu-sach' && (
                    <div className="bg-white rounded-2xl p-8 border border-gray-200/90 text-center space-y-6 shadow-sm">
                        <BookOpen size={52} className="mx-auto text-[#0f4c81]" />
                        <div className="max-w-xl mx-auto space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900">Tủ Sách Pháp Luật Điện Tử Thủ Đô</h3>
                            <p className="text-sm text-gray-600">
                                Hệ thống kho sách, cẩm nang hỏi đáp, tờ gấp và tài liệu phổ biến pháp luật số hóa dành cho người dân 30 quận, huyện, thị xã.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                <h4 className="font-bold text-sm text-gray-800 mb-1">Cẩm nang Luật Thủ đô 2024</h4>
                                <p className="text-xs text-gray-500 mb-3">Tài liệu hỏi đáp tóm tắt 54 điều luật</p>
                                <button className="text-xs text-[#0f4c81] font-bold hover:underline flex items-center gap-1">
                                    <Download size={13} /> Tải tài liệu PDF
                                </button>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                <h4 className="font-bold text-sm text-gray-800 mb-1">Sổ tay Pháp luật Đất đai</h4>
                                <p className="text-xs text-gray-500 mb-3">Quy trình bồi thường GPMB tại Hà Nội</p>
                                <button className="text-xs text-[#0f4c81] font-bold hover:underline flex items-center gap-1">
                                    <Download size={13} /> Tải tài liệu PDF
                                </button>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                <h4 className="font-bold text-sm text-gray-800 mb-1">Pháp luật Trật tự Đô thị</h4>
                                <p className="text-xs text-gray-500 mb-3">Quy chế quản lý hè phố, môi trường</p>
                                <button className="text-xs text-[#0f4c81] font-bold hover:underline flex items-center gap-1">
                                    <Download size={13} /> Tải tài liệu PDF
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'hoa-giai' && (
                    <div className="space-y-6">
                        <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-xs sm:text-sm text-amber-950 flex items-center gap-3">
                            <HeartHandshake size={24} className="text-amber-700 shrink-0" />
                            <div>
                                <div className="font-bold">Công tác Hòa giải ở cơ sở Thủ đô Hà Nội:</div>
                                <div className="text-xs text-amber-900/80">Hơn 4.800 tổ hòa giải với tỷ lệ hòa giải thành công hàng năm đạt trên 85%, giữ vững an ninh trật tự và tình làng nghĩa xóm.</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {MEDIATION_DATA.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="text-xs font-medium text-slate-500">{item.field}</div>
                                        <h4 className="font-bold text-sm text-gray-900 leading-snug">{item.title}</h4>
                                    </div>
                                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <span>{item.unit}</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiLawDisseminationPage;

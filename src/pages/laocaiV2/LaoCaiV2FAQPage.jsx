import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Clock,
    Search,
    List,
    User,
    PlusCircle,
    CheckCircle2,
    Check,
    RotateCw,
    Eye,
    ThumbsUp,
    MessageCircle,
    ChevronDown,
    ChevronRight,
    Building2,
    Scale,
    FileText,
    MapPin,
    Calendar,
    Briefcase,
    ShieldCheck,
    Send,
    X,
    Filter,
    ArrowRight,
    Sparkles,
    Landmark,
    Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import { MOCK_QUESTIONS, DOMAINS } from './laocaiV2FAQData';

const LaoCaiV2FAQPage = () => {
    // Tab active: popular (Câu hỏi nổi bật), latest (Mới nhất), search (Tìm kiếm câu hỏi)
    const [activeTab, setActiveTab] = useState('popular');
    const [selectedDomain, setSelectedDomain] = useState('Tất cả lĩnh vực');
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tất cả');

    // Modal state for asking questions
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        domain: 'doanh-nghiep',
        title: '',
        content: '',
        name: '',
        phone: '',
        email: ''
    });
    const [isSuccessModal, setIsSuccessModal] = useState(false);

    useEffect(() => {
        document.title = "Hỏi đáp pháp luật - Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    // Filter questions logic
    const filterList = (mode) => {
        let list = [...MOCK_QUESTIONS];

        if (selectedDomain !== 'Tất cả lĩnh vực') {
            list = list.filter(item => item.domain.toLowerCase().includes(selectedDomain.toLowerCase()) || selectedDomain.toLowerCase().includes(item.domain.toLowerCase()));
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.content.toLowerCase().includes(q) ||
                item.lawRef.toLowerCase().includes(q) ||
                item.agency.toLowerCase().includes(q)
            );
        }

        if (statusFilter !== 'Tất cả') {
            list = list.filter(item => item.status === statusFilter);
        }

        if (mode === 'popular') {
            return list.sort((a, b) => b.views - a.views);
        } else if (mode === 'latest') {
            return list.sort((a, b) => b.id - a.id);
        }

        return list;
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        setIsSuccessModal(true);
        setTimeout(() => {
            setIsSuccessModal(false);
            setIsCreateModalOpen(false);
            setFormData({ domain: 'doanh-nghiep', title: '', content: '', name: '', phone: '', email: '' });
        }, 2200);
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <LaoCaiV2Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai-v2" className="hover:text-[#0f4c81] transition-colors">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Hỏi đáp & Giải đáp Pháp luật</span>
                </div>
            </div>

            {/* Page Header Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes laocaiV2RotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiV2RotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes laocaiV2PulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes laocaiV2FloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes laocaiV2SweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'laocaiV2SweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 5.5s ease-in-out infinite 0.5s' }} />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiV2RotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiV2RotateCCW 18s linear infinite' }} />

                {/* 5. Điểm nhấn kim cương ánh kim */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiV2FloatDiamond 3.2s ease-in-out infinite' }} />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiV2FloatDiamond 3.6s ease-in-out infinite 0.8s' }} />

                {/* 6. Họa tiết Trống đồng mờ thanh lịch bên phải */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-80 h-80 opacity-15 pointer-events-none hidden md:block">
                    <img
                        src="/trong_dong_bg.png"
                        alt="Trống đồng"
                        className="w-full h-full object-contain filter brightness-200"
                    />
                </div>

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-3xl">
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                            Hỏi đáp pháp luật tỉnh Lào Cai
                        </h1>
                        <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                        <p className="text-xs sm:text-sm text-amber-50/95 mt-1 leading-relaxed drop-shadow-sm font-normal">
                            Hệ thống tiếp nhận, tra cứu và giải đáp các thắc mắc pháp lý, chính sách đặc thù của tỉnh Lào Cai từ cơ quan quản lý nhà nước và đội ngũ luật sư, chuyên gia đầu ngành
                        </p>
                    </div>

                    {/* Action button */}
                    <div className="w-full md:w-auto shrink-0">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2.5 px-6 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md"
                        >
                            <PlusCircle size={16} />
                            <span>Tạo câu hỏi mới</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Chỉ còn 3 tab: Câu hỏi nổi bật (icon trend), Mới nhất, Tìm kiếm câu hỏi */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1286px] flex items-center gap-2 overflow-x-auto no-scrollbar py-2 text-xs sm:text-sm font-semibold">
                    <button
                        onClick={() => { setActiveTab('popular'); setExpandedQuestionId(null); }}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'popular'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <TrendingUp size={16} className={activeTab === 'popular' ? 'text-amber-400' : 'text-amber-500'} />
                        <span>Câu hỏi nổi bật</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('latest'); setExpandedQuestionId(null); }}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'latest'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <Clock size={16} className={activeTab === 'latest' ? 'text-amber-400' : 'text-indigo-600'} />
                        <span>Mới nhất</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('search'); setExpandedQuestionId(null); }}
                        className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'search'
                            ? 'bg-indigo-900 text-white shadow-sm'
                            : 'text-gray-600 hover:text-indigo-900 hover:bg-indigo-50'
                            }`}
                    >
                        <List size={16} className={activeTab === 'search' ? 'text-amber-400' : 'text-slate-600'} />
                        <span>Danh sách câu hỏi</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="container mx-auto px-4 max-w-[1286px] py-8 pb-16 flex-grow">
                {/* 1. TAB: CÂU HỎI NỔI BẬT & MỚI NHẤT (Layout 3/4 + 1/4) */}
                {(activeTab === 'popular' || activeTab === 'latest') && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cột trái (3/4): Danh sách câu hỏi */}
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 text-gray-800">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 mb-6 gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                        {/* Tiêu đề không in hoa, không icon */}
                                        <h2 className="text-base sm:text-lg font-bold text-indigo-950">
                                            {activeTab === 'popular' ? 'Câu hỏi nổi bật' : 'Câu hỏi mới nhất'}
                                        </h2>
                                    </div>

                                    {/* Domain Filter Dropdown */}
                                    <select
                                        value={selectedDomain}
                                        onChange={(e) => setSelectedDomain(e.target.value)}
                                        className="border border-slate-300 rounded-xl py-2 px-3.5 bg-white text-xs sm:text-sm font-medium outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition shadow-2xs"
                                    >
                                        {DOMAINS.map((dom, idx) => (
                                            <option key={idx} value={dom}>{dom}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Questions List */}
                                <ul className="space-y-4">
                                    {filterList(activeTab).map((item, index) => {
                                        const isExpanded = expandedQuestionId === item.id;
                                        return (
                                            <li
                                                key={item.id}
                                                className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all group relative overflow-hidden bg-white"
                                            >
                                                {/* Top badge for popular tab */}
                                                {activeTab === 'popular' && index < 3 && (
                                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-bl-xl shadow-xs">
                                                        Top {index + 1}
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-3">
                                                    <div className="flex items-start justify-between gap-4">
                                                        {/* Nhấn vào tiêu đề câu hỏi để xem nhanh câu trả lời */}
                                                        <h3
                                                            onClick={() => setExpandedQuestionId(isExpanded ? null : item.id)}
                                                            className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug cursor-pointer select-none"
                                                            title="Nhấn để xem nhanh câu trả lời"
                                                        >
                                                            {item.title}
                                                        </h3>
                                                        <span className="shrink-0 bg-indigo-50 text-indigo-800 border border-indigo-100 text-[11px] font-semibold px-3 py-1 rounded-full">
                                                            {item.domain}
                                                        </span>
                                                    </div>

                                                    <p
                                                        onClick={() => setExpandedQuestionId(isExpanded ? null : item.id)}
                                                        className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify cursor-pointer"
                                                        title="Nhấn để xem nhanh câu trả lời"
                                                    >
                                                        "{item.content}"
                                                    </p>

                                                    {/* Expanded Answer Section (Xem nhanh) */}
                                                    {isExpanded && (
                                                        <div className="mt-2 p-5 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-xl border border-indigo-100/90 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3.5 animate-fadeIn">
                                                            <div className="font-bold text-indigo-950 flex items-center justify-between text-xs uppercase tracking-wide">
                                                                <div className="flex items-center gap-2">
                                                                    <CheckCircle2 size={16} className="text-emerald-600" />
                                                                    <span>Đơn vị giải đáp: {item.agency}</span>
                                                                </div>
                                                                <Link
                                                                    to={`/lao-cai-v2/hoi-dap/${item.id}`}
                                                                    className="text-indigo-900 font-bold hover:underline normal-case flex items-center gap-1"
                                                                >
                                                                    <span>Xem trang chi tiết</span>
                                                                    <ArrowRight size={12} />
                                                                </Link>
                                                            </div>
                                                            <p className="text-justify leading-relaxed text-slate-800 bg-white/60 p-3.5 rounded-lg border border-slate-100">
                                                                {item.answer}
                                                            </p>
                                                            <div className="p-3 bg-white rounded-lg border-l-4 border-indigo-700 border-t border-r border-b border-slate-200/80 flex items-center gap-2.5 text-xs font-medium text-slate-800 shadow-2xs">
                                                                <FileText size={15} className="text-indigo-700 shrink-0" />
                                                                <span>Căn cứ pháp lý: <strong className="text-indigo-950">{item.lawRef}</strong></span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Card Footer Metadata: Chỉ hiển thị trạng thái trả lời, thời gian (ngày giờ), lượt tương tác và nút Chi tiết */}
                                                    <div className="flex flex-wrap items-center justify-between mt-1 pt-3.5 border-t border-slate-100 gap-3">
                                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                                                            {/* 1. Trạng thái trả lời */}
                                                            {item.status === 'Đã trả lời' ? (
                                                                <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                                                                    <CheckCircle2 size={12} /> Đã trả lời
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
                                                                    <RotateCw size={12} /> Chờ giải đáp
                                                                </span>
                                                            )}

                                                            {/* 2. Thời gian (ngày giờ) */}
                                                            <span className="flex items-center gap-1 text-slate-500 font-medium">
                                                                <Clock size={13} /> {item.date}
                                                            </span>

                                                            {/* 3. Lượt tương tác */}
                                                            <div className="flex items-center gap-3 text-slate-500 font-medium">
                                                                <span className="flex items-center gap-1" title="Lượt xem">
                                                                    <Eye size={13} /> {item.views.toLocaleString()}
                                                                </span>
                                                                <span className="flex items-center gap-1" title="Lượt thích">
                                                                    <ThumbsUp size={13} /> {item.likes.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Nút Chi tiết điều hướng sang trang chi tiết câu hỏi */}
                                                        <Link
                                                            to={`/lao-cai-v2/hoi-dap/${item.id}`}
                                                            className="inline-flex items-center gap-1.5 font-bold text-xs text-indigo-900 hover:text-white bg-indigo-50 hover:bg-indigo-900 px-3 py-1.5 rounded-lg border border-indigo-100 hover:border-indigo-900 transition shadow-2xs"
                                                            title="Xem toàn văn câu hỏi và hướng dẫn chi tiết"
                                                        >
                                                            <span>Chi tiết</span>
                                                            <ArrowRight size={13} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Pagination */}
                                <div className="p-4 mt-6 flex flex-col sm:flex-row justify-between items-center border-t border-slate-100 gap-3">
                                    <span className="text-slate-500 text-xs sm:text-sm font-medium">
                                        Hiển thị 1 - {filterList(activeTab).length} của {filterList(activeTab).length} kết quả
                                    </span>
                                    <div className="flex gap-1.5 text-xs">
                                        <button className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-400 bg-white cursor-not-allowed">Trang trước</button>
                                        <button className="px-3.5 py-1.5 border border-indigo-900 rounded-lg bg-indigo-900 text-white font-bold shadow-xs">1</button>
                                        <button className="px-3.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 font-medium">2</button>
                                        <button className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 bg-white font-medium">Trang sau</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cột phải (1/4): Sidebar Widgets đồng bộ phong cách Lào Cai */}
                        <div className="lg:w-1/4 flex flex-col gap-6 text-gray-800">
                            {/* Widget 1: Thống kê hỏi đáp Lào Cai */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
                                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                                    <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                    <h3 className="font-bold text-base text-indigo-950">
                                        Thống kê hỏi đáp Lào Cai
                                    </h3>
                                </div>
                                <div className="space-y-3.5 text-xs sm:text-sm">
                                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                                        <span className="text-slate-600">Tổng câu hỏi gửi về</span>
                                        <span className="font-bold text-indigo-900 text-base">4,850</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                                        <span className="text-slate-600">Đã giải đáp</span>
                                        <span className="font-bold text-emerald-600 text-base">4,620</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                                        <span className="text-slate-600">Đánh giá hữu ích</span>
                                        <span className="font-bold text-amber-500 text-base">6,789</span>
                                    </div>
                                </div>
                            </div>

                            {/* Widget 2: Quy trình tiếp nhận & giải đáp thắc mắc */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-3.5">
                                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                                    <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                    <h3 className="font-bold text-base text-indigo-950">
                                        Quy trình tiếp nhận & giải đáp
                                    </h3>
                                </div>
                                <div className="space-y-3 text-xs">
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                                            1
                                        </div>
                                        <div className="text-slate-600">
                                            <strong className="text-slate-800">Gửi câu hỏi:</strong> Người dân, tổ chức và doanh nghiệp gửi câu hỏi trực tuyến qua biểu mẫu trên Cổng.
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                                            2
                                        </div>
                                        <div className="text-slate-600">
                                            <strong className="text-slate-800">Thụ lý & phân loại:</strong> Ban biên tập phân luồng chuyển cơ quan, sở ngành có thẩm quyền xử lý.
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                                            3
                                        </div>
                                        <div className="text-slate-600">
                                            <strong className="text-slate-800">Phản hồi & công khai:</strong> Câu trả lời kèm căn cứ pháp lý được đăng tải công khai trên hệ thống.
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-slate-100">
                                    <button
                                        onClick={() => setIsCreateModalOpen(true)}
                                        className="w-full text-center bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2.5 rounded-xl transition text-xs shadow-xs flex items-center justify-center gap-1.5"
                                    >
                                        <PlusCircle size={14} /> Gửi câu hỏi lên hệ thống
                                    </button>
                                </div>
                            </div>

                            {/* Widget 3: Lĩnh vực được quan tâm nhất */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-3">
                                <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-100">
                                    <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                    <h3 className="font-bold text-base text-indigo-950">
                                        Lĩnh vực quan tâm hàng đầu
                                    </h3>
                                </div>
                                <div className="space-y-1.5 text-xs">
                                    {[
                                        { label: "Cửa khẩu & Xuất nhập khẩu", count: "640" },
                                        { label: "Đất đai & Bồi thường", count: "1,180" },
                                        { label: "Du lịch & Kinh doanh", count: "590" },
                                        { label: "Trợ giúp pháp lý", count: "780" },
                                        { label: "Hòa giải ở cơ sở", count: "520" }
                                    ].map((cat, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setSelectedDomain(cat.label); setActiveTab('popular'); }}
                                            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-950 transition group"
                                        >
                                            <span className="font-medium text-left group-hover:font-semibold">{cat.label}</span>
                                            <span className="text-[11px] text-slate-400 group-hover:text-indigo-700 font-bold bg-slate-100 group-hover:bg-white px-2 py-0.5 rounded-full">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. TAB: DANH SÁCH CÂU HỎI */}
                {activeTab === 'search' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                    <h2 className="text-lg sm:text-xl font-bold text-indigo-950">Danh sách câu hỏi & giải đáp pháp luật</h2>
                                </div>
                                <p className="text-xs text-slate-500">Tra cứu và xem nhanh lời giải đáp các câu hỏi, tình huống pháp lý từ cơ quan nhà nước và chuyên gia</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-grow">
                                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Nhập từ khóa cần tìm (cửa khẩu, bồi thường, homestay, thừa kế...)"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50 focus:bg-white"
                                    />
                                </div>
                                <select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    className="px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                >
                                    {DOMAINS.map((dom, idx) => (
                                        <option key={idx} value={dom}>{dom}</option>
                                    ))}
                                </select>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                >
                                    <option value="Tất cả">Tất cả trạng thái</option>
                                    <option value="Đã trả lời">Đã trả lời</option>
                                    <option value="Chờ trả lời">Chờ giải đáp</option>
                                </select>
                            </div>
                        </div>

                        {/* Question List Results */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                <h3 className="font-bold text-base text-slate-900">
                                    Danh sách câu hỏi ({filterList('popular').length})
                                </h3>
                                {(searchQuery || selectedDomain !== 'Tất cả lĩnh vực' || statusFilter !== 'Tất cả') && (
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedDomain('Tất cả lĩnh vực'); setStatusFilter('Tất cả'); }}
                                        className="text-xs text-rose-600 hover:underline font-semibold"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>

                            <ul className="space-y-4">
                                {filterList('popular').map(item => {
                                    const isExpanded = expandedQuestionId === item.id;
                                    return (
                                        <li key={item.id} className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all group relative overflow-hidden bg-white">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    {/* Nhấn vào tiêu đề câu hỏi để xem nhanh câu trả lời */}
                                                    <h3
                                                        onClick={() => setExpandedQuestionId(isExpanded ? null : item.id)}
                                                        className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug cursor-pointer select-none"
                                                        title="Nhấn để xem nhanh câu trả lời"
                                                    >
                                                        {item.title}
                                                    </h3>
                                                    <span className="shrink-0 bg-indigo-50 text-indigo-800 border border-indigo-100 text-[11px] font-semibold px-3 py-1 rounded-full">
                                                        {item.domain}
                                                    </span>
                                                </div>

                                                <p
                                                    onClick={() => setExpandedQuestionId(isExpanded ? null : item.id)}
                                                    className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify cursor-pointer"
                                                    title="Nhấn để xem nhanh câu trả lời"
                                                >
                                                    "{item.content}"
                                                </p>

                                                {/* Expanded Answer Section (Hiện câu trả lời nhanh) */}
                                                {isExpanded && (
                                                    <div className="mt-2 p-5 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-xl border border-indigo-100/90 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3.5 animate-fadeIn">
                                                        <div className="font-bold text-indigo-950 flex items-center justify-between text-xs uppercase tracking-wide">
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle2 size={16} className="text-emerald-600" />
                                                                <span>Đơn vị giải đáp: {item.agency}</span>
                                                            </div>
                                                            <Link
                                                                to={`/lao-cai-v2/hoi-dap/${item.id}`}
                                                                className="text-indigo-900 font-bold hover:underline normal-case flex items-center gap-1"
                                                            >
                                                                <span>Xem trang chi tiết</span>
                                                                <ArrowRight size={12} />
                                                            </Link>
                                                        </div>
                                                        <p className="text-justify leading-relaxed text-slate-800 bg-white/60 p-3.5 rounded-lg border border-slate-100">
                                                            {item.answer}
                                                        </p>
                                                        <div className="p-3 bg-white rounded-lg border-l-4 border-indigo-700 border-t border-r border-b border-slate-200/80 flex items-center gap-2.5 text-xs font-medium text-slate-800 shadow-2xs">
                                                            <FileText size={15} className="text-indigo-700 shrink-0" />
                                                            <span>Căn cứ pháp lý: <strong className="text-indigo-950">{item.lawRef}</strong></span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        {item.status === 'Đã trả lời' ? (
                                                            <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded text-[11px] border border-emerald-100">
                                                                <CheckCircle2 size={11} /> Đã trả lời
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded text-[11px] border border-amber-100">
                                                                <RotateCw size={11} /> Chờ giải đáp
                                                            </span>
                                                        )}
                                                        <span className="flex items-center gap-1 text-[11px]">
                                                            <Clock size={12} /> {item.date}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-[11px]" title="Lượt xem">
                                                            <Eye size={12} /> {item.views.toLocaleString()}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-[11px]" title="Lượt thích">
                                                            <ThumbsUp size={12} /> {item.likes.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        to={`/lao-cai-v2/hoi-dap/${item.id}`}
                                                        className="font-bold text-xs text-indigo-900 hover:text-white bg-indigo-50 hover:bg-indigo-900 px-3 py-1.5 rounded-lg border border-indigo-100 hover:border-indigo-900 transition flex items-center gap-1.5 shadow-2xs"
                                                    >
                                                        <span>Chi tiết</span>
                                                        <ArrowRight size={12} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            {filterList('popular').length === 0 && (
                                <div className="p-12 text-center text-slate-500">
                                    <Search size={36} className="mx-auto text-slate-300 mb-2" />
                                    <p className="font-medium text-sm">Không tìm thấy câu hỏi phù hợp</p>
                                    <p className="text-xs text-slate-400 mt-1">Vui lòng thử lại với từ khóa hoặc chuyên mục khác</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Modal: Tạo câu hỏi mới */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white p-5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <PlusCircle size={20} className="text-amber-400" />
                                <h3 className="font-bold text-base text-white">Gửi câu hỏi pháp luật trực tuyến</h3>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6">
                            {isSuccessModal ? (
                                <div className="p-8 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                                    <CheckCircle2 size={42} className="mx-auto text-emerald-600" />
                                    <h4 className="font-bold text-base">Gửi câu hỏi thành công!</h4>
                                    <p className="text-xs text-emerald-700 leading-relaxed">
                                        Hệ thống Cổng Pháp luật tỉnh Lào Cai đã tiếp nhận câu hỏi của bạn. Đội ngũ chuyên môn và cơ quan có thẩm quyền sẽ xem xét và phản hồi trong thời gian sớm nhất.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Lĩnh vực vướng mắc *</label>
                                        <select
                                            value={formData.domain}
                                            onChange={e => setFormData({ ...formData, domain: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                        >
                                            <option value="cua-khau">Cửa khẩu, Xuất nhập khẩu & Kinh tế biên mậu</option>
                                            <option value="dat-dai">Đất đai, Giải phóng mặt bằng & Bồi thường</option>
                                            <option value="doanh-nghiep">Doanh nghiệp, Đầu tư & Thuế</option>
                                            <option value="tro-giup">Trợ giúp pháp lý miễn phí</option>
                                            <option value="hoa-giai">Hòa giải cơ sở & Hôn nhân gia đình</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Tiêu đề câu hỏi tóm tắt *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ví dụ: Thủ tục đăng ký kinh doanh homestay tại Sa Pa..."
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Nội dung chi tiết tình huống vướng mắc *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Mô tả cụ thể sự việc, tình huống pháp lý hoặc quy định cần hướng dẫn thấu đáo..."
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 leading-relaxed"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block font-semibold text-slate-700 mb-1">Họ và tên *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Nguyễn Văn A"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold text-slate-700 mb-1">Số điện thoại liên hệ *</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="0912..."
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => setIsCreateModalOpen(false)}
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                                        >
                                            Hủy bỏ
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-800 hover:from-indigo-950 hover:to-indigo-900 text-white font-bold flex items-center gap-1.5 shadow-md"
                                        >
                                            <Send size={14} /> Gửi câu hỏi
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2FAQPage;

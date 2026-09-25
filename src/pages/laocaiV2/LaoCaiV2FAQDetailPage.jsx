import React, { useState, useEffect } from 'react';
import {
    useParams,
    Link,
    useNavigate
} from 'react-router-dom';
import {
    ChevronRight,
    ArrowLeft,
    Clock,
    User,
    Eye,
    ThumbsUp,
    Share2,
    Printer,
    CheckCircle2,
    Check,
    FileText,
    Building2,
    Send,
    PlusCircle,
    HelpCircle,
    Bookmark,
    ShieldCheck,
    Tag,
    ChevronDown,
    ArrowRight
} from 'lucide-react';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import { MOCK_QUESTIONS, DOMAINS } from './laocaiV2FAQData';

const LaoCaiV2FAQDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [copySuccess, setCopySuccess] = useState(false);

    // Find the question or fallback to question 1
    const questionId = parseInt(id, 10);
    const question = MOCK_QUESTIONS.find(q => q.id === questionId) || MOCK_QUESTIONS[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${question.title} - Cổng Pháp luật tỉnh Lào Cai`;
        setLikeCount(question.likes);
        setLiked(false);
    }, [questionId, question.title, question.likes]);

    const handleLike = () => {
        if (!liked) {
            setLikeCount(prev => prev + 1);
            setLiked(true);
        } else {
            setLikeCount(prev => prev - 1);
            setLiked(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    // Related questions in the same domain or other domains
    const relatedQuestions = MOCK_QUESTIONS.filter(q => q.id !== question.id).slice(0, 4);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <LaoCaiV2Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                    <Link to="/lao-cai-v2" className="hover:text-[#0f4c81] transition-colors">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <Link to="/lao-cai-v2/hoi-dap" className="hover:text-[#0f4c81] transition-colors">Hỏi đáp pháp luật</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium line-clamp-1 max-w-[320px] sm:max-w-md">
                        {question.title}
                    </span>
                </div>
            </div>

            {/* Page Header Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes laocaiV2RotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiV2PulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                `}</style>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-80 h-80 opacity-15 pointer-events-none hidden md:block">
                    <img src="/trong_dong_bg.png" alt="Trống đồng" className="w-full h-full object-contain filter brightness-200" />
                </div>

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-3xl">
                        <Link
                            to="/lao-cai-v2/hoi-dap"
                            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white transition font-medium mb-3"
                        >
                            <ArrowLeft size={14} /> Quay lại danh sách câu hỏi
                        </Link>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-md leading-snug">
                            {question.title}
                        </h1>
                        <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-2 rounded-full" />
                        <div className="flex flex-wrap items-center gap-4 text-xs text-amber-50/90 mt-2">
                            <span className="flex items-center gap-1.5">
                                <Clock size={13} /> {question.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User size={13} /> {question.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Eye size={13} /> {question.views.toLocaleString()} lượt xem
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto shrink-0 flex gap-2">
                        <button
                            onClick={() => navigate('/lao-cai-v2/hoi-dap')}
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm backdrop-blur-xs"
                        >
                            <ArrowLeft size={16} />
                            <span>Về chuyên trang hỏi đáp</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="container mx-auto px-4 max-w-[1286px] py-8 pb-16 flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cột trái (3/4): Chi tiết câu hỏi và trả lời */}
                    <div className="lg:w-3/4 space-y-6">
                        {/* Box 1: Thông tin và Nội dung câu hỏi */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
                            {/* Meta Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="bg-indigo-50 text-indigo-900 border border-indigo-100 text-xs font-bold px-3 py-1 rounded-full">
                                        {question.domain}
                                    </span>
                                    <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 text-xs">
                                        <CheckCircle2 size={13} /> {question.status}
                                    </span>
                                    {question.isOfficial && (
                                        <span className="flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 text-xs">
                                            <Check size={13} /> Cơ quan nhà nước giải đáp
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopy}
                                        title="Sao chép liên kết"
                                        className="p-2 text-slate-500 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition border border-slate-200 text-xs flex items-center gap-1"
                                    >
                                        <Share2 size={14} />
                                        <span className="hidden sm:inline">{copySuccess ? 'Đã sao chép!' : 'Chia sẻ'}</span>
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        title="In câu hỏi & giải đáp"
                                        className="p-2 text-slate-500 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition border border-slate-200 text-xs flex items-center gap-1"
                                    >
                                        <Printer size={14} />
                                        <span className="hidden sm:inline">In văn bản</span>
                                    </button>
                                </div>
                            </div>

                            {/* Question Title & Content */}
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    <HelpCircle size={14} className="text-amber-500" />
                                    <span>Nội dung thắc mắc / Đề nghị hướng dẫn</span>
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug">
                                    {question.title}
                                </h2>
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify space-y-3">
                                    <p>{question.content}</p>
                                    <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-500">
                                        <span>Người gửi: <strong className="text-slate-700">{question.author}</strong></span>
                                        <span>Thời gian gửi: <strong>{question.date}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* Official Answer Section */}
                            <div className="pt-2 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-indigo-950 uppercase tracking-wider">
                                    <Building2 size={15} className="text-indigo-900" />
                                    <span>Nội dung giải đáp chính thức từ cơ quan nhà nước</span>
                                </div>

                                <div className="bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 rounded-xl p-6 border border-indigo-100 text-slate-800 space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-indigo-100/80 gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold text-xs">
                                                HN
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-indigo-950">{question.agency}</div>
                                                <div className="text-[11px] text-slate-500">{question.agencySigner}</div>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                                            Ngày phản hồi: {question.date}
                                        </span>
                                    </div>

                                    {/* Full detailed answer */}
                                    <div className="text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line text-justify space-y-3 font-normal">
                                        {question.fullAnswer || question.answer}
                                    </div>

                                    {/* Legal Basis Box */}
                                    <div className="mt-4 p-4 bg-white rounded-xl border-l-4 border-indigo-700 border-t border-r border-b border-slate-200/80 flex items-start gap-3 shadow-2xs">
                                        <FileText size={18} className="text-indigo-800 shrink-0 mt-0.5" />
                                        <div className="text-xs leading-relaxed">
                                            <span className="font-bold text-indigo-950 block mb-0.5">Căn cứ pháp lý viện dẫn:</span>
                                            <span className="text-slate-700 font-medium">{question.lawRef}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Interaction Bar */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <button
                                        onClick={handleLike}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition border ${liked
                                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                            }`}
                                    >
                                        <ThumbsUp size={14} />
                                        <span>Thông tin hữu ích ({likeCount})</span>
                                    </button>
                                </div>

                                <Link
                                    to="/lao-cai-v2/hoi-dap"
                                    className="text-xs font-semibold text-indigo-900 hover:text-indigo-700 hover:underline flex items-center gap-1.5"
                                >
                                    <ArrowLeft size={14} /> Quay về danh sách tất cả câu hỏi
                                </Link>
                            </div>
                        </div>

                        {/* Box 2: Câu hỏi liên quan cùng chuyên mục */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                                <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                <h3 className="font-bold text-base text-indigo-950">
                                    Câu hỏi cùng lĩnh vực liên quan
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {relatedQuestions.map(rel => (
                                    <Link
                                        key={rel.id}
                                        to={`/lao-cai-v2/hoi-dap/${rel.id}`}
                                        className="block p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition group"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-950 line-clamp-2 leading-snug">
                                                {rel.title}
                                            </h4>
                                            <span className="shrink-0 text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                                                {rel.domain}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                                            <span>Đơn vị trả lời: {rel.agency}</span>
                                            <span className="text-indigo-900 font-semibold group-hover:underline flex items-center gap-1">
                                                Xem câu trả lời <ArrowRight size={11} />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải (1/4): Sidebar Widgets */}
                    <div className="lg:w-1/4 flex flex-col gap-6 text-gray-800">
                        {/* Widget 1: Thống kê hỏi đáp */}
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
                                        <strong className="text-slate-800">Gửi câu hỏi:</strong> Người dân gửi câu hỏi trực tuyến qua biểu mẫu trên Cổng.
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                                        2
                                    </div>
                                    <div className="text-slate-600">
                                        <strong className="text-slate-800">Thụ lý & phân loại:</strong> Ban biên tập phân luồng chuyển cơ quan có thẩm quyền xử lý.
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
                                    <Link
                                        key={idx}
                                        to={`/lao-cai-v2/hoi-dap?domain=${encodeURIComponent(cat.label)}`}
                                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-950 transition group"
                                    >
                                        <span className="font-medium text-left group-hover:font-semibold">{cat.label}</span>
                                        <span className="text-[11px] text-slate-400 group-hover:text-indigo-700 font-bold bg-slate-100 group-hover:bg-white px-2 py-0.5 rounded-full">{cat.count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2FAQDetailPage;

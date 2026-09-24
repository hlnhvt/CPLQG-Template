import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    ChevronRight, ArrowLeft, ArrowRight, Clock, User, Eye, ThumbsUp, Share2, Printer, CheckCircle2, Check,
    FileText, Building2, HelpCircle
} from 'lucide-react';
import { buildBusinessSupport } from '../../../data/portals/specializedData';

// Trang chi tiết câu hỏi của tab "Hỏi đáp doanh nghiệp" (bố cục đồng bộ với trang chi tiết chuyên mục Hỏi đáp)
const BusinessFAQDetailPortalPage = ({ profile, Header, Footer }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = useMemo(() => buildBusinessSupport(profile), [profile]);
    const question = data.faqs.find((q) => q.id === id) || data.faqs[0];
    const listUrl = `${profile.homeUrl}/ho-tro-phap-ly-doanh-nghiep?tab=hoi-dap`;
    const detailUrl = (qid) => `${profile.homeUrl}/ho-tro-phap-ly-doanh-nghiep/hoi-dap/${qid}`;

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(question.likes);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${question.title} - ${profile.siteName}`;
        setLikeCount(question.likes);
        setLiked(false);
    }, [question, profile.siteName]);

    const handleLike = () => {
        setLikeCount((c) => c + (liked ? -1 : 1));
        setLiked((v) => !v);
    };
    const handleCopy = () => {
        navigator.clipboard?.writeText(window.location.href).catch(() => {});
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    // Ưu tiên câu hỏi cùng lĩnh vực, sau đó đến các lĩnh vực khác
    const related = [
        ...data.faqs.filter((q) => q.id !== question.id && q.field === question.field),
        ...data.faqs.filter((q) => q.id !== question.id && q.field !== question.field)
    ].slice(0, 4);
    const fieldCounts = data.fields.map((f) => ({ label: f, count: data.faqs.filter((q) => q.field === f).length })).filter((f) => f.count > 0);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                    <Link to={profile.homeUrl} className="hover:text-[#2c1b92] transition-colors">{profile.homeLabel}</Link>
                    <ChevronRight size={14} />
                    <Link to={`${profile.homeUrl}/ho-tro-phap-ly-doanh-nghiep`} className="hover:text-[#2c1b92] transition-colors">Hỗ trợ pháp lý doanh nghiệp</Link>
                    <ChevronRight size={14} />
                    <Link to={listUrl} className="hover:text-[#2c1b92] transition-colors">Hỏi đáp doanh nghiệp</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium line-clamp-1 max-w-[320px] sm:max-w-md">{question.title}</span>
                </div>
            </div>

            {/* Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                <style>{`@keyframes bfaqPulse{0%,100%{opacity:.15;transform:scale(.95)}50%{opacity:.38;transform:scale(1.12)}}`}</style>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'bfaqPulse 4s ease-in-out infinite' }} />
                <div className="container mx-auto px-4 max-w-[1286px] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-3xl">
                        <Link to={listUrl} className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white transition font-medium mb-3">
                            <ArrowLeft size={14} /> Quay lại danh sách câu hỏi
                        </Link>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-md leading-snug">{question.title}</h1>
                        <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-2 rounded-full" />
                        <div className="flex flex-wrap items-center gap-4 text-xs text-amber-50/90 mt-2">
                            <span className="flex items-center gap-1.5"><Clock size={13} /> {question.date}</span>
                            <span className="flex items-center gap-1.5"><User size={13} /> {question.author}</span>
                            <span className="flex items-center gap-1.5"><Eye size={13} /> {question.views.toLocaleString('vi-VN')} lượt xem</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(listUrl)}
                        className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm backdrop-blur-xs"
                    >
                        <ArrowLeft size={16} /> Về hỏi đáp doanh nghiệp
                    </button>
                </div>
            </div>

            <main className="container mx-auto px-4 max-w-[1286px] py-8 pb-16 flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cột trái: câu hỏi và trả lời */}
                    <div className="lg:w-3/4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="bg-indigo-50 text-indigo-900 border border-indigo-100 text-xs font-bold px-3 py-1 rounded-full">{question.field}</span>
                                    <span className="flex items-center gap-1 font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 text-xs"><CheckCircle2 size={13} /> {question.status}</span>
                                    <span className="flex items-center gap-1 font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 text-xs"><Check size={13} /> Cơ quan nhà nước giải đáp</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={handleCopy} title="Sao chép liên kết" className="p-2 text-slate-500 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition border border-slate-200 text-xs flex items-center gap-1">
                                        <Share2 size={14} /><span className="hidden sm:inline">{copySuccess ? 'Đã sao chép!' : 'Chia sẻ'}</span>
                                    </button>
                                    <button onClick={() => window.print()} title="In câu hỏi & giải đáp" className="p-2 text-slate-500 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition border border-slate-200 text-xs flex items-center gap-1">
                                        <Printer size={14} /><span className="hidden sm:inline">In văn bản</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    <HelpCircle size={14} className="text-amber-500" /><span>Nội dung vướng mắc / Đề nghị hướng dẫn</span>
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug">{question.title}</h2>
                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify space-y-3">
                                    <p>{question.content}</p>
                                    <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                                        <span>Đơn vị gửi: <strong className="text-slate-700">{question.author}</strong></span>
                                        <span>Thời gian gửi: <strong>{question.date}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-indigo-950 uppercase tracking-wider">
                                    <Building2 size={15} className="text-indigo-900" /><span>Nội dung giải đáp chính thức từ cơ quan nhà nước</span>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 rounded-xl p-6 border border-indigo-100 text-slate-800 space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-indigo-100/80 gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold text-[10px]">STP</div>
                                            <div>
                                                <div className="text-xs font-bold text-indigo-950">{question.agency}</div>
                                                <div className="text-[11px] text-slate-500">Bộ phận hỗ trợ pháp lý doanh nghiệp</div>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">Ngày phản hồi: {question.date}</span>
                                    </div>
                                    <div className="text-xs sm:text-sm leading-relaxed text-slate-700 text-justify">{question.a}</div>
                                    <div className="mt-4 p-4 bg-white rounded-xl border-l-4 border-indigo-700 border-t border-r border-b border-slate-200/80 flex items-start gap-3">
                                        <FileText size={18} className="text-indigo-800 shrink-0 mt-0.5" />
                                        <div className="text-xs leading-relaxed">
                                            <span className="font-bold text-indigo-950 block mb-0.5">Căn cứ pháp lý viện dẫn:</span>
                                            <span className="text-slate-700 font-medium">{question.basis}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition border ${liked ? 'bg-[#2c1b92] text-white border-[#2c1b92]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                                >
                                    <ThumbsUp size={14} /> Thông tin hữu ích ({likeCount})
                                </button>
                                <Link to={listUrl} className="text-xs font-semibold text-indigo-900 hover:text-indigo-700 hover:underline flex items-center gap-1.5">
                                    <ArrowLeft size={14} /> Quay về danh sách tất cả câu hỏi
                                </Link>
                            </div>
                        </div>

                        {/* Câu hỏi liên quan */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                                <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                <h3 className="font-bold text-base text-indigo-950">Câu hỏi liên quan</h3>
                            </div>
                            <div className="space-y-3">
                                {related.map((rel) => (
                                    <Link key={rel.id} to={detailUrl(rel.id)} className="block p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition group">
                                        <div className="flex items-start justify-between gap-3">
                                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-950 line-clamp-2 leading-snug">{rel.title}</h4>
                                            <span className="shrink-0 text-[11px] bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded-full font-medium">{rel.field}</span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                                            <span>Đơn vị trả lời: {rel.agency}</span>
                                            <span className="text-indigo-900 font-semibold group-hover:underline flex items-center gap-1">Xem câu trả lời <ArrowRight size={11} /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div className="lg:w-1/4 flex flex-col gap-6 text-gray-800">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-3.5">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                                <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                <h3 className="font-bold text-base text-indigo-950">Quy trình tiếp nhận & giải đáp</h3>
                            </div>
                            <div className="space-y-3 text-xs">
                                {[
                                    ['Gửi câu hỏi', 'Doanh nghiệp gửi câu hỏi trực tuyến qua nút “Tạo câu hỏi mới”.'],
                                    ['Phân loại', `${profile.stp} phân loại, chuyển cơ quan chuyên môn hoặc tư vấn viên phù hợp.`],
                                    ['Phản hồi & công khai', 'Câu trả lời kèm căn cứ pháp lý được công khai để doanh nghiệp tham khảo.']
                                ].map(([t, d], i) => (
                                    <div key={t} className="flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">{i + 1}</div>
                                        <div className="text-slate-600"><strong className="text-slate-800">{t}:</strong> {d}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-3">
                            <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-100">
                                <div className="w-1.5 h-5 bg-indigo-900 rounded-full" />
                                <h3 className="font-bold text-base text-indigo-950">Lĩnh vực hỏi đáp</h3>
                            </div>
                            <div className="space-y-1.5 text-xs">
                                {fieldCounts.map((f) => (
                                    <Link key={f.label} to={listUrl} className={`w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 transition group ${f.label === question.field ? 'bg-indigo-50 text-indigo-950 font-semibold' : 'text-slate-700'}`}>
                                        <span className="text-left">{f.label}</span>
                                        <span className="text-[11px] text-slate-400 group-hover:text-indigo-700 font-bold bg-slate-100 group-hover:bg-white px-2 py-0.5 rounded-full">{f.count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BusinessFAQDetailPortalPage;

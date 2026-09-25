import React, { useState, useEffect } from 'react';
import { 
    Search, 
    Calendar, 
    Clock, 
    MessageSquare, 
    Eye, 
    FileText, 
    Download, 
    Send, 
    CheckCircle2, 
    AlertCircle, 
    ChevronRight,
    X,
    Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import { laocaiV2DraftDocs } from '../../data/laocaiV2MockData';

// Chuẩn hóa dự thảo từ mock data (coQuanSoanThao/hanGopY/...) về cùng cấu trúc với danh sách bên dưới
const normalizeDraft = (d, i) => ({
    id: d.id,
    title: d.title,
    agency: d.agency ?? d.coQuanSoanThao,
    deadline: d.deadline ?? d.hanGopY,
    remainingDays: d.remainingDays ?? 30 + i * 7,
    feedbackCount: d.feedbackCount ?? d.soLuotGopY ?? 0,
    views: d.views ?? (d.soLuotGopY ?? 0) * 14,
    status: d.status ?? d.trangThai,
    summary: d.summary ?? d.trichYeu ?? ''
});

const EXTENDED_DRAFTS = [
    ...laocaiV2DraftDocs.map(normalizeDraft),
    {
        id: 'lc-draft-03',
        title: 'Dự thảo Nghị quyết quy định chính sách hỗ trợ bảo vệ và phát triển rừng, chi trả dịch vụ môi trường rừng trên địa bàn tỉnh Lào Cai',
        agency: 'Sở Nông nghiệp và Môi trường tỉnh Lào Cai',
        deadline: '15/04/2026',
        remainingDays: 22,
        feedbackCount: 312,
        views: 4580,
        status: 'Đang lấy ý kiến',
        summary: 'Quy định mức hỗ trợ khoán bảo vệ rừng cho hộ gia đình, cộng đồng dân cư thôn, bản và cơ chế sử dụng tiền dịch vụ môi trường rừng tại các xã vùng cao như Y Tý, Bản Lầu, Si Ma Cai.'
    },
    {
        id: 'lc-draft-04',
        title: 'Dự thảo Quyết định ban hành Quy chế phối hợp liên ngành trong công tác trợ giúp pháp lý cho người yếu thế tại các xã, phường',
        agency: 'Sở Tư pháp tỉnh Lào Cai',
        deadline: '30/04/2026',
        remainingDays: 37,
        feedbackCount: 154,
        views: 2980,
        status: 'Đang lấy ý kiến',
        summary: 'Tăng cường trách nhiệm của các cơ quan tiến hành tố tụng và UBND cấp cơ sở trong việc thông báo, giới thiệu người thuộc diện trợ giúp pháp lý miễn phí.'
    }
];

const LaoCaiV2DraftDocsPage = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedAgency, setSelectedAgency] = useState('ALL');
    const [selectedDraftForFeedback, setSelectedDraftForFeedback] = useState(null);
    const [feedbackForm, setFeedbackForm] = useState({
        fullName: '',
        phone: '',
        email: '',
        organization: '',
        content: '',
        agree: true
    });
    const [submittedSuccess, setSubmittedSuccess] = useState(false);

    useEffect(() => {
        document.title = "Lấy ý kiến dự thảo - Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    const filteredDrafts = EXTENDED_DRAFTS.filter(draft => {
        const matchKeyword = !searchKeyword || draft.title.toLowerCase().includes(searchKeyword.toLowerCase());
        const matchAgency = selectedAgency === 'ALL' || draft.agency === selectedAgency;
        return matchKeyword && matchAgency;
    });

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        if (!feedbackForm.fullName || !feedbackForm.content) {
            alert('Vui lòng nhập đầy đủ họ tên và nội dung góp ý.');
            return;
        }
        setSubmittedSuccess(true);
        setTimeout(() => {
            setSubmittedSuccess(false);
            setSelectedDraftForFeedback(null);
            setFeedbackForm({ fullName: '', phone: '', email: '', organization: '', content: '', agree: true });
            alert('Góp ý của bạn đã được gửi thành công đến cơ quan soạn thảo!');
        }, 1200);
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#f8f9fa]">
            <LaoCaiV2Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai-v2" className="hover:text-blue-700">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-semibold">Lấy ý kiến dự thảo</span>
                </div>
            </div>

            {/* Page Header Banner - Đồng bộ màu sắc & phong cách Banner trang chủ Cổng Lào Cai */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes laocaiV2RotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiV2RotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes laocaiV2PulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes laocaiV2FloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes laocaiV2SweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'laocaiV2SweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa */}
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

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        Lấy ý kiến dự thảo văn bản QPPL tỉnh Lào Cai
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Phát huy quyền làm chủ của nhân dân, chuyên gia và doanh nghiệp trong xây dựng chính sách của tỉnh Lào Cai
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8 max-w-[1286px]">
                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-2/3">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Tìm kiếm dự thảo theo tên chính sách hoặc cơ quan chủ trì..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:border-blue-600 outline-none"
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <select
                            value={selectedAgency}
                            onChange={(e) => setSelectedAgency(e.target.value)}
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-600"
                        >
                            <option value="ALL">Tất cả cơ quan soạn thảo</option>
                            <option value="Sở Tư pháp tỉnh Lào Cai">Sở Tư pháp tỉnh Lào Cai</option>
                            <option value="Sở Xây dựng tỉnh Lào Cai">Sở Xây dựng</option>
                            <option value="Sở Nông nghiệp và Môi trường tỉnh Lào Cai">Sở Nông nghiệp và Môi trường</option>
                        </select>
                    </div>
                </div>

                {/* Drafts List */}
                <div className="space-y-6">
                    {filteredDrafts.map((draft) => (
                        <div 
                            key={draft.id} 
                            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start justify-between"
                        >
                            <div className="space-y-3 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-0.5 rounded-full flex items-center gap-1">
                                        <Clock size={12} /> Còn {draft.remainingDays} ngày
                                    </span>
                                    <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded">
                                        {draft.agency}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Hạn đóng góp: <strong>{draft.deadline}</strong>
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                    {draft.title}
                                </h3>

                                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                    {draft.summary}
                                </p>

                                <div className="flex items-center gap-6 text-xs text-gray-400 pt-2 border-t border-gray-100">
                                    <span className="flex items-center gap-1.5">
                                        <Eye size={14} className="text-gray-400" /> {draft.views.toLocaleString()} lượt xem
                                    </span>
                                    <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
                                        <MessageSquare size={14} /> {draft.feedbackCount} lượt góp ý
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                                <button
                                    onClick={() => setSelectedDraftForFeedback(draft)}
                                    className="px-5 py-2.5 bg-[#0f4c81] hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow transition flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    <Send size={14} /> Góp ý trực tuyến
                                </button>
                                <button
                                    onClick={() => alert(`Đang tải toàn văn dự thảo ${draft.title}...`)}
                                    className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-medium rounded-lg transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                                >
                                    <Download size={14} /> Tải hồ sơ dự thảo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Feedback Modal */}
            {selectedDraftForFeedback && (
                <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button 
                            onClick={() => setSelectedDraftForFeedback(null)} 
                            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-4">
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded">
                                Đóng góp ý kiến dự thảo VBQPPL
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-2 leading-snug">
                                {selectedDraftForFeedback.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">Cơ quan chủ trì: {selectedDraftForFeedback.agency}</p>
                        </div>

                        <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs sm:text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Họ và tên *</label>
                                    <input
                                        type="text"
                                        required
                                        value={feedbackForm.fullName}
                                        onChange={(e) => setFeedbackForm({...feedbackForm, fullName: e.target.value})}
                                        placeholder="Nguyễn Văn A"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        value={feedbackForm.phone}
                                        onChange={(e) => setFeedbackForm({...feedbackForm, phone: e.target.value})}
                                        placeholder="0912 345 678"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={feedbackForm.email}
                                        onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                                        placeholder="example@gmail.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Cơ quan / Đơn vị</label>
                                    <input
                                        type="text"
                                        value={feedbackForm.organization}
                                        onChange={(e) => setFeedbackForm({...feedbackForm, organization: e.target.value})}
                                        placeholder="Thôn, bản, tổ dân phố, doanh nghiệp..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Nội dung góp ý cụ thể *</label>
                                <textarea
                                    rows={5}
                                    required
                                    value={feedbackForm.content}
                                    onChange={(e) => setFeedbackForm({...feedbackForm, content: e.target.value})}
                                    placeholder="Nêu rõ điều, khoản, chương dự thảo cần sửa đổi, bổ sung và đề xuất phương án hoàn thiện..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600 resize-none text-xs sm:text-sm"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={feedbackForm.agree}
                                        onChange={(e) => setFeedbackForm({...feedbackForm, agree: e.target.checked})}
                                        className="rounded text-blue-600"
                                    />
                                    <span>Cam kết thông tin trung thực, mang tính xây dựng</span>
                                </label>
                                <button
                                    type="submit"
                                    disabled={submittedSuccess}
                                    className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg shadow transition flex items-center gap-2"
                                >
                                    <Send size={14} /> Gửi ý kiến đóng góp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2DraftDocsPage;

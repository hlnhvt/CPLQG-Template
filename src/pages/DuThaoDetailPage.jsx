import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
    ChevronRight, ArrowLeft, Eye, MessageSquare, Download, FileText, 
    Calendar, CheckCircle2, Circle, Clock, Building2, Layers, Search, 
    ZoomIn, ZoomOut, File, FileCode2, Paperclip, ChevronDown, ChevronUp, User 
} from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const DOC_DATA = {
    title: 'Dự thảo Luật Dữ liệu (sửa đổi)',
    org: 'Bộ Công an',
    ngayDang: '10/03/2026',
    views: 1254,
    comments: 15,
    hanGopY: '10/05/2026',
    isExpired: false,
    mucTieu: 'Tạo lập khung pháp lý hoàn chỉnh cho việc thu thập, lưu trữ, xử lý và chia sẻ dữ liệu số trên toàn quốc, đảm bảo an toàn, an ninh và quyền riêng tư.',
    phamVi: 'Áp dụng cho mọi cơ quan, tổ chức, cá nhân tại Việt Nam và các hoạt động xử lý dữ liệu liên quan đến công dân Việt Nam.',
    doiTuong: 'Cơ quan nhà nước, doanh nghiệp cung cấp dịch vụ công nghệ thông tin, viễn thông và công dân.',
    attachments: [
        { id: 1, name: 'Toan_van_Du_thao_Luat_Du_lieu.pdf', size: '2.4 MB', type: 'PDF' },
        { id: 2, name: 'To_trinh_Chinh_phu.docx', size: '850 KB', type: 'DOCX' },
        { id: 3, name: 'Bao_cao_danh_gia_tac_dong.pdf', size: '4.1 MB', type: 'PDF' }
    ],
    related: [
        { id: 1, type: 'Tin tức', title: 'Hội thảo lấy ý kiến chuyên gia về Dự thảo Luật Dữ liệu', date: '12/03/2026' },
        { id: 2, type: 'Sự kiện', title: 'Toạ đàm: An ninh dữ liệu trong kỷ nguyên AI', date: '08/03/2026' },
        { id: 3, type: 'Văn bản chỉ đạo', title: 'Nghị quyết số 175/NQ-CP về đẩy mạnh chuyển đổi số', date: '15/11/2025' }
    ],
    timeline: [
        { status: 'done', date: '01/01/2026', title: 'Lập hồ sơ đề nghị xây dựng Luật', desc: 'Bộ Công an trình Chính phủ hồ sơ đề nghị xây dựng dự án Luật.' },
        { status: 'done', date: '10/03/2026', title: 'Lấy ý kiến công khai', desc: 'Đăng tải dự thảo trên Cổng Thông tin điện tử để lấy ý kiến nhân dân (60 ngày).' },
        { status: 'current', date: '—', title: 'Thẩm định', desc: 'Bộ Tư pháp thẩm định dự án Luật.' },
        { status: 'pending', date: '—', title: 'Trình Chính phủ', desc: 'Trình Chính phủ xem xét, thống nhất thông qua.' },
        { status: 'pending', date: '—', title: 'Trình Quốc hội', desc: 'Dự kiến trình Quốc hội cho ý kiến tại Kỳ họp thứ 11.' }
    ],
    suggestions: [
        { id: 1, user: 'Nguyễn Văn A', org: 'Công ty TNHH Phần mềm XYZ', date: '12/03/2026 14:30', content: 'Cần quy định rõ hơn về tiêu chuẩn kỹ thuật khi chia sẻ dữ liệu giữa doanh nghiệp và cơ quan nhà nước để tránh chồng chéo.' },
        { id: 2, user: 'Người dùng ẩn danh', date: '11/03/2026 09:15', content: 'Quy định về thời gian lưu trữ tối thiểu đối với dữ liệu cá nhân nhạy cảm còn khá ngắn (Khoản 3 Điều 15), tôi đề nghị tăng lên 5 năm.' },
        { id: 3, user: 'Trần Thị B', org: 'Viện Nghiên cứu Kinh tế', date: '10/03/2026 16:45', content: 'Việc đánh giá tác động chi phí tuân thủ đối với doanh nghiệp SME (vừa và nhỏ) chưa thực sự đầy đủ. Nên có lộ trình áp dụng riêng cho nhóm này.' }
    ]
};

const DRAFTS_KHAC = [
    { id: 101, title: 'Dự thảo Nghị định quy định chi tiết Luật An ninh mạng', date: '05/03/2026' },
    { id: 102, title: 'Dự thảo Thông tư hướng dẫn quản lý tài khoản định danh điện tử', date: '28/02/2026' },
    { id: 103, title: 'Dự thảo Đề án phát triển trung tâm dữ liệu quốc gia', date: '15/02/2026' }
];

// ── Components ────────────────────────────────────────────────────────────────
const PdfViewerPanel = () => {
    const [zoom, setZoom] = useState(100);
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col mt-4">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex flex-wrap gap-3 items-center justify-between text-[13px] text-gray-600">
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={16}/></button>
                    <span className="font-medium">1 / 45</span>
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={16}/></button>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1.5 hover:bg-gray-200 rounded"><ZoomOut size={16}/></button>
                    <span className="w-12 text-center font-medium">{zoom}%</span>
                    <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-1.5 hover:bg-gray-200 rounded"><ZoomIn size={16}/></button>
                </div>
                <div className="hidden sm:flex relative items-center">
                    <Search size={14} className="absolute left-2 text-gray-400"/>
                    <input className="pl-7 pr-2 py-1 border border-gray-300 rounded text-[12px] w-48 outline-none focus:border-blue-400" placeholder="Tìm trong tài liệu..." />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded hover:text-blue-600 transition-colors">
                        <FileCode2 size={14} className="text-blue-500"/> Word
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-[#1a3b8b] text-white border border-[#1a3b8b] rounded hover:bg-blue-800 transition-colors shadow-sm">
                        <Download size={14}/> PDF
                    </button>
                </div>
            </div>
            {/* Fake Content Area */}
            <div className="bg-gray-200 h-[600px] overflow-auto p-4 md:p-8 flex justify-center custom-scrollbar">
                <div className="bg-white shadow-md p-8 sm:p-12 transition-all w-full max-w-[800px]" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                    <h2 className="text-center font-bold text-[18px] mb-8">DỰ THẢO LUẬT DỮ LIỆU (SỬA ĐỔI)</h2>
                    <p className="indent-8 text-justify leading-relaxed mb-4 text-[14px]">
                        <strong>Điều 1. Phạm vi điều chỉnh</strong><br/>
                        Luật này quy định về hoạt động thu thập, tổ chức, lưu trữ, xử lý, chia sẻ và bảo vệ dữ liệu trên lãnh thổ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam...
                    </p>
                    <p className="indent-8 text-justify leading-relaxed mb-4 text-[14px]">
                        <strong>Điều 2. Đối tượng áp dụng</strong><br/>
                        Cơ quan nhà nước, tổ chức chính trị - xã hội, doanh nghiệp và cá nhân có liên quan đến việc xử lý dữ liệu phục vụ mục đích chung và lợi ích quốc gia...
                    </p>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 mt-10 rounded">
                        Mockup Document Content Area
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChevronLeft = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>

// ── Main Layout ───────────────────────────────────────────────────────────────
const DuThaoDetailPage = () => {
    const { id } = useParams();
    const doc = DOC_DATA;
    
    const [commentText, setCommentText] = useState('');
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [showComments, setShowComments] = useState(false); // UC60 accordion

    const handleSubmitComment = () => {
        if (!commentText.trim()) return;
        setCommentSuccess(true);
        setCommentText('');
        setTimeout(() => setCommentSuccess(false), 5000);
    };

    return (
        <div className="bg-[#f4f7fb] font-sans pb-16 min-h-screen">
            {/* Top Breadcrumb & Back */}
            <div className="bg-white border-b border-gray-200 shadow-sm py-3 mb-6 sticky top-0 z-50">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-4 items-center flex-wrap">
                    <Link to="/du-thao" className="flex items-center gap-1 text-[13px] font-semibold text-gray-600 hover:text-blue-700 transition-colors">
                        <ArrowLeft size={16} /> Quay lại
                    </Link>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <ChevronRight size={12} />
                        <Link to="/du-thao" className="hover:text-blue-600">Dự thảo VBQPPL</Link>
                        <ChevronRight size={12} />
                        <span className="text-gray-800 font-medium line-clamp-1 max-w-[200px] sm:max-w-none">{doc.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px]">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* ── LEFT COLUMN (70%) ──────────────────────────────────── */}
                    <div className="lg:w-[70%] space-y-8">
                        
                        {/* Title & Metadata */}
                        <div>
                            <p className="text-[13px] text-gray-500 uppercase font-semibold tracking-wide mb-2 flex items-center gap-1.5">
                                <FileText size={14} className="text-blue-600"/> Xem chi tiết văn bản dự thảo
                            </p>
                            <h1 className="text-[26px] md:text-[32px] font-bold text-[#0f4c81] leading-tight mb-6">
                                {doc.title}
                            </h1>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Building2 size={15}/></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Cơ quan chủ trì</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.org}</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Calendar size={15}/></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Ngày đăng</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.ngayDang}</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Eye size={15}/></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Lượt xem</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.views.toLocaleString('vi-VN')}</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><MessageSquare size={15}/></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Lượt góp ý</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.comments + (commentSuccess ? 1 : 0)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nội dung toàn văn (UC55) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide">Nội dung dự thảo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">Mục tiêu xây dựng</p>
                                    <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded border border-gray-100">{doc.mucTieu}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">Phạm vi điều chỉnh</p>
                                    <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded border border-gray-100">{doc.phamVi}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">Đối tượng tác động</p>
                                    <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded border border-gray-100">{doc.doiTuong}</p>
                                </div>
                            </div>
                            <PdfViewerPanel />
                        </div>

                        {/* File đính kèm (UC56) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2 uppercase tracking-wide">
                                <Paperclip size={18} className="text-gray-500" /> 
                                File đính kèm ({doc.attachments.length} file)
                            </h3>
                            <div className="space-y-3">
                                {doc.attachments.map(att => (
                                    <div key={att.id} className="flex flex-wrap items-center justify-between gap-4 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors bg-gray-50/50">
                                        <div className="flex items-center gap-3 min-w-0">
                                            {att.type === 'PDF' ? <File size={28} className="text-red-500 shrink-0" /> : <FileCode2 size={28} className="text-blue-500 shrink-0" />}
                                            <div className="min-w-0">
                                                <a href="#" className="text-[13px] font-bold text-blue-700 hover:underline block truncate" title={att.name}>{att.name}</a>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${att.type === 'PDF' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{att.type}</span>
                                                    <span className="text-[11px] text-gray-400">{att.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded hover:text-blue-600 hover:bg-gray-50 transition-colors text-[12px] font-semibold text-gray-600 shadow-sm"><Eye size={14}/> Xem</button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a3b8b]/10 text-[#1a3b8b] border border-blue-200 rounded hover:bg-[#1a3b8b] hover:text-white transition-colors text-[12px] font-semibold shadow-sm"><Download size={14}/> Tải xuống</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Văn bản/Tin tức liên quan (UC57) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide">Văn bản / Tin tức liên quan</h3>
                            <div className="space-y-4">
                                {doc.related.map(rel => (
                                    <div key={rel.id} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-gray-100 mt-0.5">
                                            {rel.type === 'Tin tức' ? <FileText size={16} className="text-orange-500" /> :
                                             rel.type === 'Sự kiện' ? <Calendar size={16} className="text-purple-500" /> :
                                             <Layers size={16} className="text-blue-500" />}
                                        </div>
                                        <div>
                                            <a href="#" className="text-[13px] font-semibold text-blue-700 hover:underline leading-snug line-clamp-2 mb-1">{rel.title}</a>
                                            <div className="flex items-center gap-2 text-[11px]">
                                                <span className={`px-1.5 py-0.5 rounded font-medium ${
                                                    rel.type === 'Tin tức' ? 'bg-orange-50 text-orange-600' :
                                                    rel.type === 'Sự kiện' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                                }`}>{rel.type}</span>
                                                <span className="text-gray-400">{rel.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form góp ý (UC59) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm border-t-4 border-t-[#fdb714]">
                            <h3 className="text-[18px] font-bold text-gray-800 mb-2 uppercase tracking-wide">Đóng góp ý kiến</h3>
                            <p className="flex items-center gap-1.5 text-[13px] mb-5 font-semibold text-gray-600">
                                <Clock size={16} className="text-orange-500"/>
                                Hạn góp ý: <span className="text-orange-600">{doc.hanGopY}</span> 
                                <span className="text-[11px] font-normal text-gray-400 ml-1">(Còn 45 ngày)</span>
                            </p>
                            
                            {commentSuccess && (
                                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-3 text-[13px] font-medium animate-fade-in">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    Góp ý của bạn đã được ghi nhận. Cảm ơn bạn đã tham gia đóng góp ý kiến!
                                </div>
                            )}

                            <div>
                                <textarea value={commentText} onChange={e => setCommentText(e.target.value)} rows={5}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
                                    placeholder="Vui lòng để lại ý kiến đóng góp của bạn để hoàn thiện dự thảo..."></textarea>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-[11px] text-gray-500">Người dùng ẩn danh</p>
                                    <button onClick={handleSubmitComment} disabled={!commentText.trim()}
                                        className="px-6 py-2 bg-[#1a3b8b] hover:bg-blue-800 text-white rounded-lg text-[13px] font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                        Gửi góp ý
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách góp ý đã gửi (UC60) */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <button onClick={() => setShowComments(!showComments)} className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors">
                                <span className="text-[15px] font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                                    <MessageSquare size={18} className="text-blue-600"/> Ý kiến góp ý cộng đồng ({doc.comments + (commentSuccess ? 1 : 0)})
                                </span>
                                {showComments ? <ChevronUp size={18} className="text-gray-500"/> : <ChevronDown size={18} className="text-gray-500"/>}
                            </button>
                            {showComments && (
                                <div className="p-6 border-t border-gray-200 bg-white">
                                    <div className="space-y-5">
                                        {/* Hiển thị góp ý vừa gõ nếu có */}
                                        {commentSuccess && (
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                                    <User size={20} className="text-gray-500"/>
                                                </div>
                                                <div className="flex-1 bg-blue-50/50 border border-blue-100 p-4 rounded-xl rounded-tl-none">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <p className="font-bold text-[13px] text-gray-800">Người dùng ẩn danh</p>
                                                        <p className="text-[11px] text-gray-400">Vừa xong</p>
                                                    </div>
                                                    <p className="text-[13px] text-gray-600 leading-relaxed">Bạn vừa gửi một bình luận (Preview tính năng mock).</p>
                                                </div>
                                            </div>
                                        )}

                                        {doc.suggestions.map(cmt => (
                                            <div key={cmt.id} className="flex gap-4">
                                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500 font-bold border border-gray-200">
                                                    <User size={20}/>
                                                </div>
                                                <div className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-xl rounded-tl-none">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <p className="font-bold text-[13px] text-gray-800">{cmt.user}</p>
                                                        <p className="text-[11px] text-gray-400">{cmt.date}</p>
                                                    </div>
                                                    {cmt.org && <p className="text-[11px] text-blue-600 font-medium mb-1.5"><Building2 size={10} className="inline mr-1"/>{cmt.org}</p>}
                                                    <p className="text-[13px] text-gray-600 leading-relaxed mt-2">{cmt.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-center">
                                       <button className="text-[13px] text-blue-600 hover:underline font-semibold">Xem thêm bình luận →</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN (30%) - SIDEBAR ──────────────────────── */}
                    <div className="lg:w-[30%] space-y-6">
                        
                        {/* Timeline (UC58) */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-[80px]">
                            <h3 className="text-[14px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5 uppercase tracking-wide">Tiến độ xây dựng</h3>
                            <div className="relative pl-3">
                                <div className="absolute left-[15px] top-2 bottom-6 w-0.5 bg-gray-100"></div>
                                <div className="space-y-6">
                                    {doc.timeline.map((item, idx) => (
                                        <div key={idx} className="relative z-10 flex gap-4">
                                            {item.status === 'done' ? (
                                                <div className="w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-white shadow-sm mt-0.5 shrink-0 flex items-center justify-center"><CheckCircle2 size={10} className="text-white"/></div>
                                            ) : item.status === 'current' ? (
                                                <div className="w-4 h-4 rounded-full bg-blue-500 border-[3px] border-blue-100 mt-0.5 shrink-0 animate-pulse"></div>
                                            ) : (
                                                <div className="w-4 h-4 rounded-full bg-gray-200 border-[3px] border-white mt-0.5 shrink-0"></div>
                                            )}
                                            
                                            <div className="flex-1 mt-[-2px]">
                                                <p className={`font-bold text-[13px] mb-0.5 ${item.status === 'current' ? 'text-blue-700' : item.status === 'done' ? 'text-gray-800' : 'text-gray-400'}`}>{item.title}</p>
                                                <p className="text-[11px] font-semibold text-gray-400 mb-1">{item.date}</p>
                                                {item.desc && <p className="text-[12px] text-gray-600 leading-snug">{item.desc}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Dự thảo khác */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <h3 className="text-[14px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide">Dự thảo khác cùng Cơ quan</h3>
                            <div className="space-y-4">
                                {DRAFTS_KHAC.map((draft) => (
                                    <div key={draft.id} className="pb-3 border-b border-gray-50 last:border-b-0 last:pb-0">
                                        <Link to={`/du-thao/${draft.id}`} className="text-[13px] font-semibold text-blue-700 hover:underline leading-snug block mb-1">
                                            {draft.title}
                                        </Link>
                                        <span className="text-[11px] text-gray-500"><Calendar size={10} className="inline mr-1"/>{draft.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-gradient-to-br from-[#1a3b8b] to-blue-800 rounded-xl shadow-sm p-5 text-white">
                            <p className="font-bold text-[14px] mb-2">Hỗ trợ</p>
                            <p className="text-[12px] text-blue-100 mb-3 opacity-90 leading-relaxed">Nếu bạn gặp khó khăn trong việc đóng góp ý kiến hoặc cần cung cấp thêm tài liệu, vui lòng liên hệ:</p>
                            <div className="text-[13px] font-bold flex items-center gap-2 mb-1"><Building2 size={14}/> Bộ Công an</div>
                            <div className="text-[13px] flex items-center gap-2"><div className="w-3.5 h-3.5 rounded bg-white/20 flex items-center justify-center">@</div> duthap@bocongan.gov.vn</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DuThaoDetailPage;

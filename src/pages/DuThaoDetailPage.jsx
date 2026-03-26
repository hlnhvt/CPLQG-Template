import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ChevronRight, ArrowLeft, Eye, MessageSquare, Download, FileText,
    Calendar, CheckCircle2, Clock, Building2, Layers, Search,
    ZoomIn, ZoomOut, File, FileCode2, Paperclip, ChevronDown, ChevronUp, User, Send,
    ChevronLeft, Mail, Phone, Upload, History, X
} from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const DOC_DATA = {
    title: 'Dự thảo Luật Dữ liệu (sửa đổi)',
    org: 'Bộ Công an',
    ngayDang: '10/03/2026',
    views: 1254,
    comments: 15,
    hanGopY: '10/05/2026',
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
        { id: 3, type: 'Văn bản chỉ đạo', title: 'Nghị quyết số 175/NQ-CP về đẩy mạnh chuyển đổi số', date: '15/11/2025' },
        { id: 4, type: 'Tin tức', title: 'Lấy ý kiến nhân dân về Dự thảo Luật Dữ liệu trên toàn quốc', date: '10/03/2026' },
        { id: 5, type: 'Văn bản chỉ đạo', title: 'Chỉ thị số 05/CT-TTg về tăng cường bảo vệ dữ liệu', date: '01/01/2026' },
        // { id: 6, type: 'Sự kiện', title: 'Họp Tổ biên tập Dự án Luật Dữ liệu', date: '20/02/2026' },
        // { id: 7, type: 'Tin tức', title: 'Nhiều điểm mới trong cơ sở dữ liệu quốc gia', date: '05/03/2026' },
        // { id: 8, type: 'Văn bản chỉ đạo', title: 'Kế hoạch triển khai Đề án 06 năm 2026', date: '10/01/2026' },
        // { id: 9, type: 'Tin tức', title: 'Phân quyền, phân cấp trong quản lý dữ liệu số', date: '25/02/2026' },
        // { id: 10, type: 'Văn bản chỉ đạo', title: 'Bộ Công an ban hành hướng dẫn an toàn hệ thống', date: '15/02/2026' },
        // { id: 11, type: 'Tin tức', title: 'Sự cần thiết ban hành Luật Dữ liệu', date: '01/03/2026' },
        // { id: 12, type: 'Tin tức', title: 'Kết quả khảo sát về nhận thức an toàn dữ liệu của doanh nghiệp', date: '20/02/2026' },
    ],
    timeline: [
        { status: 'done', date: '01/01/2026', title: 'Soạn thảo', desc: 'Lập hồ sơ đề nghị xây dựng dự án Luật.', attachments: [{ name: 'To_trinh_De_nghi.pdf', type: 'PDF' }] },
        { status: 'done', date: '10/03/2026', title: 'Lấy ý kiến công khai', desc: 'Đăng tải dự thảo trên Cổng Thông tin điện tử để lấy ý kiến nhân dân (60 ngày).' },
        { status: 'current', date: '—', title: 'Thẩm định', desc: 'Bộ Tư pháp thẩm định dự án Luật.' },
        { status: 'pending', date: '—', title: 'Trình Chính phủ', desc: 'Trình Chính phủ xem xét, thống nhất thông qua.' },
        { status: 'pending', date: '—', title: 'Trình Quốc hội', desc: 'Dự kiến ban hành tại Kỳ họp thứ 11.' }
    ],
    suggestions: [
        { id: 1, user: 'Nguyễn Văn A', org: 'Công ty TNHH Phần mềm XYZ', date: '12/03/2026 14:30', content: 'Cần quy định rõ hơn về tiêu chuẩn kỹ thuật khi chia sẻ dữ liệu giữa doanh nghiệp và cơ quan nhà nước để tránh chồng chéo.' },
        { id: 2, user: '', date: '11/03/2026 09:15', content: 'Quy định về thời gian lưu trữ tối thiểu đối với dữ liệu cá nhân nhạy cảm còn khá ngắn (Khoản 3 Điều 15), tôi đề nghị tăng lên 5 năm. Việc tăng thời gian này sẽ giúp các cá nhân có đủ thời gian thực hiện các quyền khiếu nại nếu phát hiện dữ liệu bị sử dụng sai mục đích. Hơn nữa, với hạ tầng hiện nay, chi phí lưu trữ không còn là gánh nặng lớn quá mức đối với các doanh nghiệp, trong khi an toàn thông tin là trên hết.' },
        { id: 3, user: 'Trần Thị B', org: 'Viện Nghiên cứu Kinh tế', date: '10/03/2026 16:45', content: 'Việc đánh giá tác động chi phí tuân thủ đối với doanh nghiệp SME chưa thực sự đầy đủ. Nên có lộ trình áp dụng riêng cho nhóm này.' },
        { id: 4, user: 'Lê Hoàng C', date: '09/03/2026 11:20', content: 'Đồng tình với chủ trương ban hành Luật này.' },
        { id: 5, user: 'Phạm Văn D', org: 'Hội Luật gia', date: '08/03/2026 08:30', content: 'Cần làm rõ khái niệm "Dữ liệu mở" tại Điều 4, vì đang rất dễ nhầm lẫn với dữ liệu công cộng thông thường. Đề nghị bổ sung thêm các tiêu chí phân loại cụ thể để các bộ ngành có thể xây dựng danh mục chuẩn xác nhất, tránh tình trạng tự diễn giải.' },
        { id: 6, user: 'Vũ Thị E', date: '07/03/2026 10:10', content: 'Khoản 2 Điều 10 quy định về thu hồi dữ liệu chưa cụ thể quy trình thực hiện.' },
        { id: 7, user: 'Đỗ Quang F', date: '06/03/2026 15:40', content: 'Nên bổ sung biện pháp chế tài mạnh hơn đối với hành vi mua bán dữ liệu trái phép.' },
        { id: 8, user: 'Ngô Tấn G', org: 'Công ty An ninh mạng', date: '05/03/2026 14:00', content: 'Tiêu chuẩn mã hóa dữ liệu tại Điều 20 nên tham chiếu trực tiếp Tiêu chuẩn quốc gia TCVN.' },
        { id: 9, user: 'Hoàng H', date: '04/03/2026 09:50', content: 'Tôi thấy thủ tục cung cấp dữ liệu cho bên thứ ba đang bị rườm rà. Nên có cơ chế xin phép một lần (Consent Management) làm cơ sở pháp lý.' },
        { id: 10, user: 'Bùi I', date: '03/03/2026 16:15', content: 'Rất cần thiết trong giai đoạn chuyển đổi số hiện nay.' },
        { id: 11, user: 'Đinh K', date: '02/03/2026 11:05', content: 'Cần quy định trách nhiệm bồi thường cụ thể khi nền tảng quốc gia bị lộ lọt.' }
    ]
};

const MOCK_BAO_CAO_TIEP_THU = [
    { id: 1, title: 'Báo cáo tiếp thu, giải trình ý kiến góp ý Dự thảo Luật Dữ liệu (sửa đổi)', org: 'Bộ Công an', date: '15/03/2026', type: 'PDF' },
    { id: 2, title: 'Báo cáo giải trình bổ sung về các quy định bảo mật', org: 'Bộ Công an', date: '20/03/2026', type: 'DOCX' }
];

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
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={16} /></button>
                    <span className="font-medium">1 / 45</span>
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={16} /></button>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => setZoom(Math.max(50, zoom - 10))} disabled={zoom <= 50} className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50"><ZoomOut size={16} /></button>
                    <span className="w-12 text-center font-medium">{zoom}%</span>
                    <button onClick={() => setZoom(Math.min(200, zoom + 10))} disabled={zoom >= 200} className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50"><ZoomIn size={16} /></button>
                </div>
                <div className="hidden sm:flex relative items-center">
                    <Search size={14} className="absolute left-2 text-gray-400" />
                    <input className="pl-7 pr-2 py-1 border border-gray-300 rounded text-[12px] w-48 outline-none focus:border-blue-400" placeholder="Tìm kiếm trong tài liệu..." />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded hover:text-blue-600 transition-colors">
                        <FileCode2 size={14} className="text-blue-500" /> Tải Word
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-[#1a3b8b] text-white border border-[#1a3b8b] rounded hover:bg-blue-800 transition-colors shadow-sm">
                        <Download size={14} /> Tải PDF
                    </button>
                </div>
            </div>
            {/* Fake Content Area */}
            <div className="bg-gray-200 h-[600px] overflow-auto p-4 md:p-8 flex justify-center custom-scrollbar">
                <div className="bg-white shadow-md p-8 sm:p-12 transition-all w-full max-w-[800px]" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                    <h2 className="text-center font-bold text-[18px] mb-8">DỰ THẢO LUẬT DỮ LIỆU (SỬA ĐỔI)</h2>
                    <p className="indent-8 text-justify leading-relaxed mb-4 text-[14px]">
                        <strong>Điều 1. Phạm vi điều chỉnh</strong><br />
                        Luật này quy định về hoạt động thu thập, tổ chức, lưu trữ, xử lý, chia sẻ và bảo vệ dữ liệu trên lãnh thổ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam...
                    </p>
                    <p className="indent-8 text-justify leading-relaxed mb-4 text-[14px]">
                        <strong>Điều 2. Đối tượng áp dụng</strong><br />
                        Cơ quan nhà nước, tổ chức chính trị - xã hội, doanh nghiệp và cá nhân có liên quan đến việc xử lý dữ liệu phục vụ mục đích chung và lợi ích quốc gia...
                    </p>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 mt-10 rounded">
                        Khu vực hiển thị nội dung toàn văn dự thảo
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Main Layout ───────────────────────────────────────────────────────────────
const DuThaoDetailPage = () => {
    const { id } = useParams();
    const doc = DOC_DATA;

    // Tab State (UC55, UC56)
    const [activeTab, setActiveTab] = useState('toan-van');

    // Mocks for UC59
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    // Comment State (UC59, UC60)
    const [commentText, setCommentText] = useState('');
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isFormHidden, setIsFormHidden] = useState(false);
    const [submittedComments, setSubmittedComments] = useState([]);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // Logic for filtering to only current user's suggestions
    const mySuggestions = doc.suggestions.filter(cmt => cmt.user === 'Hoàng Lương Nhân');
    const allMySuggestions = [...submittedComments, ...mySuggestions];

    // Comments Pagination (UC60)
    const [commentPage, setCommentPage] = useState(1);
    const commentsPerPage = 10;
    const currentComments = allMySuggestions.slice((commentPage - 1) * commentsPerPage, commentPage * commentsPerPage);
    const totalCommentPages = Math.max(1, Math.ceil(allMySuggestions.length / commentsPerPage));

    // Expands for long comments
    const [expandedComments, setExpandedComments] = useState({});
    const toggleComment = (id) => setExpandedComments(prev => ({ ...prev, [id]: !prev[id] }));

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        let newValidFiles = [];
        let limitExceeded = false;
        let sizeExceeded = false;

        for (const file of files) {
            if (attachedFiles.length + newValidFiles.length >= 5) {
                limitExceeded = true;
                break;
            }
            if (file.size > 10 * 1024 * 1024) {
                sizeExceeded = true;
                continue;
            }
            newValidFiles.push(file);
        }

        if (limitExceeded) alert('Tối đa 5 file đính kèm.');
        if (sizeExceeded) alert('Vui lòng chọn file dung lượng không quá 10MB.');

        if (newValidFiles.length > 0) {
            setAttachedFiles(prev => [...prev, ...newValidFiles]);
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeFile = (indexToRemove) => {
        setAttachedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSubmitComment = () => {
        if (!commentText.trim() || isExpired) return;

        const newComment = {
            id: Date.now(),
            user: 'Hoàng Lương Nhân',
            content: commentText,
            date: 'Vừa xong',
            attachments: attachedFiles.map(f => f.name)
        };

        setSubmittedComments([newComment, ...submittedComments]);
        setCommentSuccess(true);
        setCommentText('');
        setAttachedFiles([]);
        setCommentPage(1); // Mặc định chuyển về trang đầu tiên
        // setTimeout(() => setCommentSuccess(false), 5000); 
    };

    // Related Content Lazy Load (UC57)
    const [relatedCount, setRelatedCount] = useState(10);
    const currentRelated = doc.related.slice(0, relatedCount);
    const hasMoreRelated = doc.related.length > relatedCount;

    return (
        <div className="bg-[#f4f7fb] font-sans pb-16 min-h-screen">
            {/* Header chung (UC55) */}
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
                    <div className="lg:w-[70%] space-y-6">

                        {/* Title & Metadata */}
                        <div>
                            <p className="text-[13px] text-gray-500 uppercase font-semibold tracking-wide mb-2 flex items-center gap-1.5">
                                <FileText size={14} className="text-blue-600" /> Xem chi tiết văn bản dự thảo VBQPPL
                            </p>
                            <h1 className="text-[26px] md:text-[32px] font-bold text-[#0f4c81] leading-tight mb-6">
                                {doc.title}
                            </h1>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Building2 size={15} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Cơ quan chủ trì</p>
                                        <p className="text-[12px] font-bold text-gray-800 line-clamp-1" title={doc.org}>{doc.org}</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Calendar size={15} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Ngày đăng</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.ngayDang}</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Eye size={15} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Lượt xem</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.views.toLocaleString('vi-VN')}</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><MessageSquare size={15} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Lượt góp ý</p>
                                        <p className="text-[12px] font-bold text-gray-800">{doc.comments + (commentSuccess ? 1 : 0)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thanh tab điều hướng */}
                        <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                            <button
                                onClick={() => setActiveTab('toan-van')}
                                className={`flex-1 py-3 text-[14px] font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'toan-van' ? 'bg-[#1a3b8b] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <FileText size={16} /> Toàn văn
                            </button>
                            <button
                                onClick={() => setActiveTab('tai-lieu')}
                                className={`flex-1 py-3 text-[14px] font-bold flex items-center justify-center gap-2 transition-colors border-l border-gray-200 ${activeTab === 'tai-lieu' ? 'bg-[#1a3b8b] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Paperclip size={16} /> Tài liệu đính kèm ({doc.attachments.length})
                            </button>
                        </div>

                        {/* Nội dung Tab */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
                            {activeTab === 'toan-van' && (
                                <div className="animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-800 uppercase mb-1">Mục tiêu xây dựng</p>
                                            <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 h-full">{doc.mucTieu || 'Đang cập nhật.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-800 uppercase mb-1">Phạm vi điều chỉnh</p>
                                            <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 h-full">{doc.phamVi || 'Đang cập nhật.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-800 uppercase mb-1">Đối tượng tác động</p>
                                            <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 h-full">{doc.doiTuong || 'Đang cập nhật.'}</p>
                                        </div>
                                    </div>
                                    <PdfViewerPanel />
                                </div>
                            )}

                            {activeTab === 'tai-lieu' && (
                                <div className="animate-fade-in space-y-3">
                                    <h3 className="text-[18px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Danh sách tài liệu đính kèm</h3>
                                    {doc.attachments.length === 0 ? (
                                        <p className="text-gray-500 text-[14px] text-center py-8">Chưa có tài liệu đính kèm.</p>
                                    ) : (
                                        doc.attachments.map(att => (
                                            <div key={att.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors bg-white">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    {att.type === 'PDF' ? <File size={32} className="text-red-500 shrink-0" /> : <FileCode2 size={32} className="text-blue-500 shrink-0" />}
                                                    <div className="min-w-0">
                                                        <a href="#" className="text-[14px] font-bold text-[#1a3b8b] hover:underline block truncate" title={att.name}>{att.name}</a>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${att.type === 'PDF' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>{att.type}</span>
                                                            <span className="text-[12px] text-gray-500 font-medium">{att.size}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                                                    <button className="flex-1 sm:flex-none justify-center items-center gap-1.5 px-4 py-2 border border-gray-300 rounded hover:text-blue-600 hover:border-blue-400 font-bold transition-colors text-[13px] text-gray-700 shadow-sm"><Eye size={15} /> Xem</button>
                                                    <button className="flex-1 sm:flex-none justify-center items-center gap-1.5 px-4 py-2 bg-[#1a3b8b] text-white border border-[#1a3b8b] rounded hover:bg-blue-800 font-bold transition-colors text-[13px] shadow-sm"><Download size={15} /> Tải xuống</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Danh sách báo cáo tiếp thu, giải trình (UC61) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                            <h3 className="text-[18px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">Báo cáo tiếp thu, giải trình</h3>
                            {MOCK_BAO_CAO_TIEP_THU.length === 0 ? (
                                <p className="text-gray-500 text-[14px] text-center py-8">Chưa có báo cáo tiếp thu, giải trình.</p>
                            ) : (
                                <div className="space-y-4">
                                    {MOCK_BAO_CAO_TIEP_THU.map(report => (
                                        <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                {report.type === 'PDF' ? <File size={32} className="text-red-500 shrink-0" /> : <FileCode2 size={32} className="text-blue-500 shrink-0" />}
                                                <div className="min-w-0">
                                                    <Link to={`/bao-cao-tiep-thu/${report.id}`} className="text-[14px] font-bold text-[#1a3b8b] hover:underline block mb-1">
                                                        {report.title}
                                                    </Link>
                                                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-gray-500 font-medium">
                                                        <span className="flex items-center gap-1.5"><Building2 size={12} className="text-gray-400" /> {report.org}</span>
                                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> {report.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <Link to={`/bao-cao-tiep-thu/${report.id}`} className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:text-blue-600 hover:border-blue-400 font-bold transition-colors text-[13px] text-gray-700 shadow-sm bg-white"><Eye size={15} /> Xem</Link>
                                                <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#e4f0fc] text-[#1a3b8b] hover:bg-[#cbe0f5] rounded-lg font-bold transition-colors text-[13px] shadow-sm"><Download size={15} /> Tải xuống</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Form góp ý (UC59 - Theo Mockup) */}
                        <div id="gop-y" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                                <h3 className="text-[18px] font-bold text-gray-800">Góp Ý</h3>
                                <div className="flex items-center gap-4">
                                    <label className="text-[12px] flex items-center gap-2 cursor-pointer text-gray-500 font-medium">
                                        <input type="checkbox" checked={isExpired} onChange={(e) => setIsExpired(e.target.checked)} className="accent-red-600" /> [MOCK] Hết hạn
                                    </label>
                                    <label className="text-[12px] flex items-center gap-2 cursor-pointer text-gray-500 font-medium">
                                        <input type="checkbox" checked={isLoggedIn} onChange={(e) => setIsLoggedIn(e.target.checked)} className="accent-blue-600" /> [MOCK] Đã đăng nhập
                                    </label>
                                </div>
                            </div>

                            {!isLoggedIn ? (
                                <div className="bg-[#eef3f9] p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center border border-blue-100">
                                    <div>
                                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-1 text-[14px]">
                                            <MessageSquare size={16} /> Vui lòng đóng góp ý kiến để hoàn thiện dự thảo
                                        </div>
                                        <div className="text-[12px] text-gray-500 ml-6 mb-1">Hạn góp ý: {doc.hanGopY}</div>
                                        <Link to="/dang-nhap" className="text-[12px] text-blue-600 font-bold ml-6 underline hover:text-blue-800">
                                            Vui lòng đăng nhập để gửi góp ý
                                        </Link>
                                    </div>
                                    <Link to="/dang-nhap" className="bg-[#1a56db] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold mt-3 sm:mt-0 flex items-center gap-2 transition-colors shadow-sm focus:outline-none">
                                        <Send size={14} className="rotate-0 shrink-0" /> Đăng nhập để góp ý
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    {/* Blue Banner */}
                                    <div className="bg-[#eef3f9] p-4 rounded-xl mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-blue-100">
                                        <div>
                                            <div className="flex items-center gap-2 text-blue-600 font-bold mb-1 text-[14px]">
                                                <MessageSquare size={16} /> Vui lòng đóng góp ý kiến để hoàn thiện dự thảo
                                            </div>
                                            <div className="text-[12px] text-gray-500 ml-6">Hạn góp ý: {doc.hanGopY}</div>
                                        </div>
                                        <button
                                            onClick={() => setIsFormHidden(!isFormHidden)}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-[13px] font-bold mt-3 sm:mt-0 flex items-center gap-1.5 transition-colors shadow-sm focus:outline-none"
                                        >
                                            {!isFormHidden && <span className="text-[16px] leading-none mb-0.5">&times;</span>} {isFormHidden ? 'Mở góp ý' : 'Ẩn góp ý'}
                                        </button>
                                    </div>

                                    {!isFormHidden && (
                                        <div className="animate-fade-in">
                                            {isExpired && <p className="text-red-500 font-bold mb-4 text-[14px]">Đã hết hạn góp ý</p>}
                                            {/* Form Input fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <User size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                                        <input type="text" value="Hoàng Lương Nhân" readOnly className="w-full bg-[#f4f7fb] border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-[13px] text-gray-600 outline-none shadow-inner" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <Mail size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                                        <input type="email" value="hoangluongnhan@gmail.com" readOnly className="w-full bg-[#f4f7fb] border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-[13px] text-gray-600 outline-none shadow-inner" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Số điện thoại <span className="text-gray-400 font-normal">(Tùy chọn)</span></label>
                                                    <div className="relative">
                                                        <Phone size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                                        <input type="text" value="+84367056096" readOnly className="w-full bg-[#f4f7fb] border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-[13px] text-gray-600 outline-none shadow-inner" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Textarea */}
                                            <div className="mb-4">
                                                <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Nội dung góp ý <span className="text-red-500">*</span></label>
                                                <textarea
                                                    value={commentText}
                                                    onChange={(e) => setCommentText(e.target.value)}
                                                    rows={4}
                                                    disabled={isExpired}
                                                    className="w-full border border-gray-300 rounded-lg p-3 text-[14px] outline-none focus:border-blue-500 resize-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    placeholder="Góp ý"
                                                ></textarea>
                                            </div>

                                            {/* Attachments */}
                                            <div className="mb-6">
                                                <label className="block text-[12px] font-semibold text-gray-700 mb-0.5">File đính kèm <span className="text-gray-400 font-normal">(Tùy chọn)</span></label>
                                                <p className="text-[11px] text-gray-500 mb-2">PDF, Word, Excel, Image - Tối đa 10MB/file, tối đa 5 file</p>

                                                <input
                                                    type="file"
                                                    multiple
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="file-upload-input"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
                                                />
                                                <label
                                                    htmlFor="file-upload-input"
                                                    className={`border border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center text-[13px] cursor-pointer transition-colors ${attachedFiles.length >= 5 ? 'cursor-not-allowed opacity-50 bg-gray-50 text-gray-400' : 'hover:bg-gray-50 text-gray-500 hover:text-blue-600 hover:border-blue-400'}`}
                                                    onClick={(e) => {
                                                        if (attachedFiles.length >= 5) e.preventDefault();
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2 font-medium">
                                                        <Upload size={16} className={attachedFiles.length >= 5 ? 'text-gray-400' : 'text-blue-500'} /> Nhấn để chọn file ({attachedFiles.length}/5)
                                                    </div>
                                                </label>

                                                {attachedFiles.length > 0 && (
                                                    <div className="mt-3 flex flex-col gap-2">
                                                        {attachedFiles.map((file, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm animate-fade-in group">
                                                                <div className="flex items-center gap-2.5 overflow-hidden flex-1">
                                                                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center shrink-0 border border-gray-100">
                                                                        <Paperclip size={14} className="text-gray-500" />
                                                                    </div>
                                                                    <div className="flex flex-col min-w-0 flex-1">
                                                                        <span className="text-[13px] font-bold text-gray-700 truncate">{file.name}</span>
                                                                        <span className="text-[11px] font-medium text-gray-400">{Number(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                                                    </div>
                                                                </div>
                                                                <button onClick={() => removeFile(idx)} className="w-8 h-8 rounded bg-white flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 border border-gray-200 focus:outline-none transition-colors ml-4 shrink-0 shadow-sm opacity-50 group-hover:opacity-100">
                                                                    <X size={14} strokeWidth={2.5} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <div className="flex justify-center border-b border-gray-100 pb-8 mb-6">
                                                <button
                                                    onClick={handleSubmitComment}
                                                    disabled={isExpired || !commentText.trim()}
                                                    className="bg-[#1a56db] hover:bg-blue-700 text-white rounded-lg px-8 py-2 text-[14px] font-bold flex items-center gap-2 shadow-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Send size={16} className="-rotate-12 shrink-0" /> Gửi góp ý
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Danh sách góp ý đã gửi (UC60 - Theo Mockup) */}
                                    <div>
                                        <div
                                            className="bg-[#f0f4f8] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#e2e8f0] transition-colors border border-gray-100"
                                            onClick={() => setShowComments(!showComments)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-[#1a56db] rounded-[14px] flex items-center justify-center text-white shrink-0 shadow-sm">
                                                    <History size={24} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[15px] text-gray-800">Góp ý đã gửi</h4>
                                                    <p className="text-[13px] text-gray-600 mt-0.5">
                                                        {allMySuggestions.length === 0 ? "Chưa có góp ý nào" : `${allMySuggestions.length} góp ý`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                {showComments ? <ChevronUp size={24} className="text-gray-500" /> : <ChevronDown size={24} className="text-gray-500" />}
                                            </div>
                                        </div>

                                        {showComments && (
                                            <>
                                                {allMySuggestions.length === 0 ? (
                                                    <div className="mt-4 border border-dashed border-gray-300 bg-[#f8fafc] rounded-xl h-48 flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-sm">
                                                            <History size={24} />
                                                        </div>
                                                        <p className="text-[14px] font-semibold text-gray-700 mb-1">Bạn chưa gửi góp ý nào cho dự thảo này</p>
                                                        <p className="text-[12px] text-gray-500">Gửi góp ý đầu tiên của bạn ở trên</p>
                                                    </div>
                                                ) : (
                                                    <div className="mt-4 border border-dashed border-gray-300 bg-[#f8fafc] rounded-xl p-6 transition-all duration-300">
                                                        <div className="space-y-4">
                                                            {currentComments.map(cmt => {
                                                                const isExpanded = expandedComments[cmt.id];
                                                                const isLong = cmt.content.length > 150;
                                                                return (
                                                                    <div key={cmt.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <div>
                                                                                <p className="font-bold text-[13px] text-gray-800">{cmt.user}</p>
                                                                                <p className="text-[11px] text-gray-400">{cmt.date}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className={`text-[13px] text-gray-700 leading-relaxed ${isLong && !isExpanded ? 'line-clamp-2' : ''}`}>
                                                                            {cmt.content}
                                                                        </div>
                                                                        {isLong && (
                                                                            <button onClick={() => toggleComment(cmt.id)} className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 mt-1">
                                                                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                                                            </button>
                                                                        )}
                                                                        {cmt.attachments && cmt.attachments.length > 0 && (
                                                                            <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                                                                                {cmt.attachments.map((fileName, idx) => (
                                                                                    <div key={idx} title={fileName} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-[12px] text-blue-600 font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                                                                                        <Paperclip size={13} strokeWidth={2.5} />
                                                                                        <span className="truncate max-w-[200px]">{fileName}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        {totalCommentPages > 1 && (
                                                            <div className="mt-6 flex justify-center items-center gap-2">
                                                                <button disabled={commentPage === 1} onClick={() => setCommentPage(p => p - 1)} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors">Trước</button>
                                                                <span className="text-[12px] font-bold text-gray-600 px-3">Trang {commentPage} / {totalCommentPages}</span>
                                                                <button disabled={commentPage === totalCommentPages} onClick={() => setCommentPage(p => p + 1)} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors">Sau</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                    </div>

                    {/* ── RIGHT COLUMN (30%) - SIDEBAR ──────────────────────── */}
                    <div className="lg:w-[30%] space-y-6">

                        {/* Timeline (UC58) */}
                        <div className="bg-white rounded-xl border border-t-[3px] border-t-emerald-500 border-gray-100 shadow-sm p-6 text-sm">
                            <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5 uppercase tracking-wide">Tiến độ xây dựng</h3>
                            {doc.timeline.length === 0 ? (
                                <p className="text-center text-gray-400 py-4">Chưa có thông tin tiến độ.</p>
                            ) : (
                                <div className="relative pl-3">
                                    <div className="absolute left-[15px] top-2 bottom-6 w-0.5 bg-gray-200"></div>
                                    <div className="space-y-6">
                                        {doc.timeline.map((item, idx) => (
                                            <div key={idx} className="relative z-10 flex gap-4">
                                                {item.status === 'done' ? (
                                                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-white shadow-sm mt-0.5 shrink-0 flex items-center justify-center"><CheckCircle2 size={10} className="text-white" /></div>
                                                ) : item.status === 'current' ? (
                                                    <div className="w-4 h-4 rounded-full bg-orange-500 border-[3px] border-orange-100 mt-0.5 shrink-0"></div>
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white mt-0.5 shrink-0"></div>
                                                )}

                                                <div className="flex-1 mt-[-2px]">
                                                    <p className={`font-bold text-[14px] mb-0.5 ${item.status === 'current' ? 'text-orange-600' : item.status === 'done' ? 'text-gray-800' : 'text-gray-400'}`}>{item.title}</p>
                                                    <p className="text-[12px] font-semibold text-gray-500 mb-1">{item.date}</p>
                                                    {item.desc && <p className="text-[13px] text-gray-600 leading-snug">{item.desc}</p>}
                                                    {item.attachments && item.attachments.map((att, i) => (
                                                        <div key={i} className="flex flex-wrap items-center gap-2 mt-2 bg-gray-50 p-2 rounded border border-gray-200 hover:border-blue-300 transition-colors">
                                                            {att.type === 'PDF' ? <File size={16} className="text-red-500 shrink-0" /> : <FileCode2 size={16} className="text-blue-500 shrink-0" />}
                                                            <a href="#" className="text-[12px] font-bold text-blue-700 hover:underline leading-tight truncate max-w-[200px]" title={att.name}>{att.name}</a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Thông tin liên quan (UC57) */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5 uppercase tracking-wide">Văn bản liên quan</h3>
                            {doc.related.length === 0 ? (
                                <p className="text-center text-gray-400 py-4">Chưa có văn bản liên quan.</p>
                            ) : (
                                <div>
                                    <div className="space-y-4">
                                        {currentRelated.map(rel => (
                                            <div key={rel.id} className="pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rel.type === 'Tin tức' ? 'bg-blue-50 text-blue-600' :
                                                        rel.type === 'Sự kiện' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'
                                                        }`}>{rel.type}</span>
                                                </div>
                                                <a href="#" className="text-[14px] font-semibold text-gray-800 hover:text-blue-600 hover:underline leading-snug line-clamp-2 mb-1.5">{rel.title}</a>
                                                <div className="text-[11px] text-gray-400 font-medium tracking-wide">{rel.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {hasMoreRelated && (
                                        <div className="pt-4 mt-2">
                                            <button
                                                onClick={() => setRelatedCount(prev => prev + 10)}
                                                className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-[13px] font-bold text-gray-600 transition-colors"
                                            >
                                                Xem thêm
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Dự thảo khác */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide">Dự thảo khác</h3>
                            <div className="space-y-4">
                                {DRAFTS_KHAC.map((draft) => (
                                    <div key={draft.id} className="pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                                        <Link to={`/du-thao/${draft.id}`} className="text-[14px] font-semibold text-[#1a3b8b] hover:text-orange-500 hover:underline leading-snug block mb-1.5">
                                            {draft.title}
                                        </Link>
                                        <span className="text-[11px] text-gray-500 font-medium tracking-wide">{draft.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-gradient-to-br from-[#1a3b8b] to-blue-800 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                            <p className="font-bold text-[16px] mb-2 uppercase tracking-wide relative z-10">Hỗ trợ</p>
                            <p className="text-[13px] text-blue-100 mb-4 opacity-90 leading-relaxed relative z-10">Nếu bạn gặp khó khăn trong việc đóng góp ý kiến hoặc cần cung cấp thêm tài liệu, vui lòng liên hệ trực tiếp:</p>
                            <div className="text-[14px] font-bold flex items-center gap-2 mb-2 relative z-10"><Building2 size={16} /> Bộ Công an</div>
                            <div className="text-[13px] flex items-center gap-2 relative z-10"><div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center font-bold">@</div> duthap@bocongan.gov.vn</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DuThaoDetailPage;

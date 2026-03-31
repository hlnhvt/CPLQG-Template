import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ChevronRight, ArrowLeft, ArrowUp, Calendar, Users, Building2,
    FileText, Download, Paperclip, Send, MessageSquare, Clock,
    CheckCircle2, ExternalLink, Eye, File, FileCode2, Upload, X,
    User, Mail, Phone, TrendingUp, Scale, Heart, Landmark, ChevronUp
} from 'lucide-react';

// ======================== MOCK DATA ========================
const MOCK_CONSULTATION = {
    id: 1,
    title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)',
    summary: 'Bộ Tài nguyên và Môi trường lấy ý kiến nhân dân, tổ chức về các quy định trong dự thảo Luật Đất đai sửa đổi nhằm hoàn thiện chính sách quản lý, sử dụng đất đai phù hợp với thực tiễn.',
    agency: 'Bộ Tài nguyên và Môi trường',
    agencyShort: 'BTNMT',
    agencyLogo: null,
    status: 'open', // open | upcoming | closed
    startDate: '01/03/2026',
    endDate: '30/04/2026',
    lastUpdated: '01/03/2026',
    views: 3821,
    participants: 3821,
    category: 'Vấn đề nổi bật',
    domain: 'Pháp luật dân sự',
    thumb: '/images/thumb1.png',
    sections: [
        {
            id: 'gioi-thieu',
            label: 'A. Giới thiệu',
            content: [
                'Bộ Tài nguyên và Môi trường trân trọng mời các cơ quan, tổ chức, cá nhân tham gia đóng góp ý kiến vào Dự thảo Luật Đất đai (sửa đổi).',
                'Luật Đất đai là đạo luật quan trọng, có tác động sâu rộng đến mọi mặt của đời sống kinh tế - xã hội, quốc phòng, an ninh và môi trường; là cơ sở pháp lý quan trọng để Nhà nước thực hiện quyền đại diện chủ sở hữu toàn dân về đất đai.',
            ]
        },
        {
            id: 'boi-canh',
            label: 'B. Bối cảnh',
            content: [
                'Luật Đất đai năm 2013 sau hơn 10 năm thi hành đã bộc lộ nhiều hạn chế, bất cập cần được sửa đổi, bổ sung để phù hợp với yêu cầu phát triển mới.',
                'Nghị quyết số 18-NQ/TW ngày 16/6/2022 của Hội nghị lần thứ năm Ban Chấp hành Trung ương Đảng khóa XIII "về tiếp tục đổi mới, hoàn thiện thể chế, chính sách, nâng cao hiệu lực, hiệu quả quản lý và sử dụng đất, tạo động lực đưa nước ta trở thành nước phát triển có thu nhập cao" đặt ra định hướng quan trọng cho việc sửa đổi Luật Đất đai.',
                'Dự thảo Luật Đất đai (sửa đổi) được xây dựng trên cơ sở tổng kết, đánh giá kết quả thi hành Luật Đất đai năm 2013 và quán triệt đầy đủ, toàn diện Nghị quyết số 18-NQ/TW.',
            ]
        },
        {
            id: 'cac-kien-nghi',
            label: 'C. Các kiến nghị chính',
            content: [
                'Dự thảo tập trung vào các nhóm vấn đề chính sau:',
            ],
            bullets: [
                'Hoàn thiện các quy định về quyền và nghĩa vụ của người sử dụng đất',
                'Đổi mới, hoàn thiện cơ chế định giá đất, đảm bảo nguyên tắc thị trường',
                'Hoàn thiện quy định về thu hồi đất, bồi thường, hỗ trợ, tái định cư',
                'Đẩy mạnh phân cấp, phân quyền trong quản lý đất đai',
                'Hoàn thiện quy định về tư vấn, phản biện, giám sát xã hội trong quản lý đất đai',
            ]
        },
        {
            id: 'phan-hoi',
            label: 'D. Những vấn đề cần phản hồi',
            content: [
                'Bộ Tài nguyên và Môi trường mong muốn nhận được ý kiến đóng góp của Quý vị về các nội dung sau:',
            ],
            bullets: [
                'Tính hợp lý và khả thi của các quy định về quyền tiếp cận đất đai',
                'Cơ chế giải quyết tranh chấp đất đai mới',
                'Quy định về đất ở, đất nông nghiệp trong và ngoài khu vực đô thị',
                'Chính sách tài chính đất đai và định giá đất',
                'Các nội dung khác trong dự thảo mà Quý vị quan tâm',
            ]
        },
    ],
    attachments: [
        { id: 1, name: 'Du_thao_Luat_Dat_dai_sua_doi_2026.pdf', size: '4.2 MB', type: 'PDF' },
        { id: 2, name: 'To_trinh_so_XX_TTg_ve_du_an.docx', size: '1.1 MB', type: 'DOCX' },
        { id: 3, name: 'Bao_cao_danh_gia_tac_dong.pdf', size: '2.8 MB', type: 'PDF' },
        { id: 4, name: 'Phieu_lay_y_kien_cong_dong.xlsx', size: '380 KB', type: 'XLSX' },
    ],
    relatedConsultations: [
        { id: 2, title: 'Góp ý chính sách nhà ở xã hội cho công nhân', status: 'open', agency: 'Bộ Xây dựng', deadline: '15/04/2026' },
        { id: 3, title: 'Quy hoạch tổng thể quốc gia 2021–2030', status: 'upcoming', agency: 'Bộ Kế hoạch và Đầu tư', deadline: '01/05/2026' },
        { id: 4, title: 'Lấy ý kiến về sửa đổi Luật Nhà ở', status: 'open', agency: 'Bộ Xây dựng', deadline: '20/04/2026' },
    ],
    comments: [
        { id: 1, user: 'Nguyễn Văn A', org: 'Công ty BĐS XYZ', date: '15/03/2026 09:30', content: 'Đề nghị làm rõ quy định về thời hạn sử dụng đất đối với đất ở đô thị, tránh gây ra bất ổn cho người dân đã mua nhà gắn liền với quyền sử dụng đất.' },
        { id: 2, user: 'Trần Thị Bình', org: 'Hiệp hội Bất động sản', date: '14/03/2026 14:15', content: 'Cơ chế định giá đất theo giá thị trường là đúng hướng nhưng cần có hướng dẫn chi tiết hơn về phương pháp xác định giá thị trường và đơn vị tư vấn định giá.' },
        { id: 3, user: 'Lê Minh Tuấn', date: '13/03/2026 11:00', content: 'Cần bổ sung quy định bảo vệ quyền lợi của người nông dân khi thu hồi đất nông nghiệp phục vụ phát triển kinh tế - xã hội.' },
    ]
};

const OTHER_PAGES = [
    { id: 10, title: 'Góp ý chính sách nhà ở xã hội cho công nhân' },
    { id: 11, title: 'Quy hoạch tổng thể quốc gia 2021–2030' },
    { id: 12, title: 'Chính sách phát triển kinh tế tuần hoàn' },
];

// ======================== STATUS BADGE ========================
const StatusBadge = ({ status, large = false }) => {
    const size = large ? 'text-[13px] px-3 py-1.5' : 'text-[12px] px-2.5 py-1';
    if (status === 'open') return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-green-50 text-green-700 border border-green-200 rounded-full`}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
            Đang mở
        </span>
    );
    if (status === 'upcoming') return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-amber-50 text-amber-700 border border-amber-200 rounded-full`}>
            <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
            Sắp mở
        </span>
    );
    return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-gray-100 text-gray-500 border border-gray-200 rounded-full`}>
            <span className="w-2 h-2 bg-gray-400 rounded-full shrink-0" />
            Đã kết thúc
        </span>
    );
};

// ======================== MAIN PAGE ========================
const HienKeDetailPage = () => {
    const { id } = useParams();
    const data = MOCK_CONSULTATION;

    const [commentText, setCommentText] = useState('');
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [isLoggedIn] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [submittedComments, setSubmittedComments] = useState([]);
    const fileInputRef = useRef(null);

    const allComments = [...submittedComments, ...data.comments];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        let valid = [];
        for (const f of files) {
            if (attachedFiles.length + valid.length >= 5) break;
            if (f.size > 10 * 1024 * 1024) continue;
            valid.push(f);
        }
        setAttachedFiles(prev => [...prev, ...valid]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = () => {
        if (!commentText.trim()) return;
        setSubmittedComments(prev => [{
            id: Date.now(),
            user: 'Người dùng',
            content: commentText,
            date: 'Vừa xong',
        }, ...prev]);
        setCommentText('');
        setAttachedFiles([]);
        setCommentSuccess(true);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* ── HERO SECTION ─────────────────────────────────────────── */}
            <div style={{ backgroundColor: '#e8f5e9' }} className="pt-5 pb-10">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-6 flex-wrap">
                        <Link to="/" className="hover:text-[#1e3a8a] transition-colors">Trang chủ</Link>
                        <ChevronRight size={12} className="text-gray-400" />
                        <Link to="/hien-ke" className="hover:text-[#1e3a8a] transition-colors">Hiến kế hoàn thiện thể chế</Link>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span className="text-gray-700 font-medium line-clamp-1 max-w-[300px]">{data.title}</span>
                    </nav>

                    {/* Hero content */}
                    <div className="max-w-[800px]">
                        <h1 className="text-[28px] md:text-[38px] font-black text-gray-900 leading-tight mb-5">
                            {data.title}
                        </h1>
                        <p className="text-[16px] text-gray-700 leading-relaxed mb-7 max-w-[680px]">
                            {data.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Link to={`/hien-ke/gop-y/${data.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-sm text-[15px]">
                                <Send size={16} /> Gửi ý kiến của bạn
                                <ExternalLink size={14} className="ml-1 opacity-70" />
                            </Link>
                            <Link to="/hien-ke" className="inline-flex items-center gap-2 px-5 py-3 bg-white/70 text-gray-700 font-semibold rounded-lg hover:bg-white border border-gray-300 transition-all text-[14px]">
                                <ArrowLeft size={15} /> Quay lại danh sách
                            </Link>
                        </div>
                        <p className="text-[12px] text-gray-500">
                            Cập nhật lần cuối: {data.lastUpdated}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── TWO-COLUMN BODY ──────────────────────────────────────── */}
            <div className="bg-[#f8f9fa] py-10">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ── LEFT: MAIN CONTENT (70%) ── */}
                        <div className="flex-1 min-w-0">

                            {/* Agency + Metadata card */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                                {/* Agency logo placeholder */}
                                <div className="w-20 h-20 shrink-0 rounded-xl bg-[#1e3a8a] flex items-center justify-center shadow-sm">
                                    <span className="text-white font-black text-[16px] leading-tight text-center px-1">
                                        {data.agencyShort}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h2 className="text-[17px] font-bold text-gray-900 mb-3">{data.agency}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                                        <div className="flex items-start gap-2">
                                            <Calendar size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-semibold text-gray-600">Thời gian tham vấn: </span>
                                                <span className="text-gray-800">{data.startDate} – {data.endDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-gray-400 shrink-0" />
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-600">Trạng thái: </span>
                                                <StatusBadge status={data.status} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-gray-400 shrink-0" />
                                            <span className="text-gray-700">
                                                <span className="font-semibold text-gray-600">Lượt tham gia: </span>
                                                {data.participants.toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye size={14} className="text-gray-400 shrink-0" />
                                            <span className="text-gray-700">
                                                <span className="font-semibold text-gray-600">Lượt xem: </span>
                                                {data.views.toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Structured content */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
                                <h2 className="text-[20px] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                    Mô tả chi tiết
                                </h2>

                                <div className="space-y-8">
                                    {data.sections.map((sec, idx) => (
                                        <div key={sec.id} id={sec.id}>
                                            <h3 className="text-[17px] font-bold text-gray-900 mb-3">{sec.label}</h3>
                                            <div className="space-y-3">
                                                {sec.content.map((para, i) => (
                                                    <p key={i} className="text-[14px] text-gray-700 leading-relaxed">
                                                        {idx > 0 && sec.content.length > 1 ? (
                                                            <><span className="font-medium text-gray-500">{idx + 1}.</span> {para}</>
                                                        ) : para}
                                                    </p>
                                                ))}
                                                {sec.bullets && (
                                                    <ul className="space-y-2 mt-2 ml-4">
                                                        {sec.bullets.map((b, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-[14px] text-gray-700">
                                                                <span className="mt-1.5 w-1.5 h-1.5 bg-[#1e3a8a] rounded-full shrink-0" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                                <h2 className="text-[18px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                    <Paperclip size={18} className="text-[#1e3a8a]" />
                                    Tài liệu đính kèm
                                    <span className="ml-1 text-[13px] font-normal text-gray-400">({data.attachments.length} tệp)</span>
                                </h2>
                                <div className="space-y-3">
                                    {data.attachments.map(att => (
                                        <div key={att.id} className="flex items-center justify-between gap-4 p-3.5 border border-gray-200 rounded-lg hover:border-[#1e3a8a] hover:bg-blue-50/30 transition-all group">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {att.type === 'PDF' ? (
                                                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0 border border-red-100">
                                                        <File size={16} className="text-red-600" />
                                                    </div>
                                                ) : att.type === 'DOCX' ? (
                                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                                                        <FileCode2 size={16} className="text-blue-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0 border border-green-100">
                                                        <FileText size={16} className="text-green-600" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-[13px] font-semibold text-gray-800 truncate group-hover:text-[#1e3a8a] transition-colors">{att.name}</p>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">{att.type} · {att.size}</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg hover:bg-[#1e3a8a] hover:text-white transition-all shrink-0">
                                                <Download size={13} /> Tải xuống
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Comment / Feedback section */}

                        </div>

                        {/* ── RIGHT: SIDEBAR (30%) ── */}
                        <div className="lg:w-[300px] shrink-0 space-y-5">

                            {/* Back to listing */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <Link to="/hien-ke" className="flex items-center gap-2 text-[#1e3a8a] font-bold text-[14px] hover:underline mb-1">
                                    <ArrowLeft size={14} /> Quay lại danh sách
                                </Link>
                                <p className="text-[12px] text-gray-500 ml-6">Hiến kế hoàn thiện thể chế</p>
                            </div>

                            {/* Table of contents */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-3">Nội dung trang</h3>
                                <nav className="space-y-1">
                                    {data.sections.map(sec => (
                                        <a
                                            key={sec.id}
                                            href={`#${sec.id}`}
                                            className="block text-[13px] text-[#1e3a8a] hover:underline py-1 border-l-2 border-transparent hover:border-[#1e3a8a] pl-3 transition-all"
                                        >
                                            {sec.label}
                                        </a>
                                    ))}
                                    <a href="#gop-y" className="block text-[13px] text-[#1e3a8a] hover:underline py-1 border-l-2 border-transparent hover:border-[#1e3a8a] pl-3 transition-all">
                                        Ý kiến đóng góp
                                    </a>
                                </nav>
                            </div>

                            {/* Quick metadata */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Thông tin tham vấn</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Trạng thái</p>
                                        <StatusBadge status={data.status} large />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Thời gian</p>
                                        <p className="text-[13px] font-semibold text-gray-800">{data.startDate} – {data.endDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Cơ quan chủ trì</p>
                                        <p className="text-[13px] font-semibold text-gray-800">{data.agency}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Lĩnh vực</p>
                                        <span className="inline-block text-[12px] font-semibold text-[#1e3a8a] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                                            {data.domain}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-5 pt-4 border-t border-gray-100">
                                    <Link to={`/hien-ke/gop-y/${data.id}`} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-green-700 transition-all text-[14px]">
                                        <Send size={15} /> Gửi ý kiến
                                    </Link>
                                </div>
                            </div>

                            {/* Related consultations */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Tham vấn liên quan</h3>
                                <div className="space-y-3">
                                    {data.relatedConsultations.map(r => (
                                        <Link
                                            key={r.id}
                                            to={`/hien-ke/${r.id}`}
                                            className="block group"
                                        >
                                            <div className="border border-gray-100 rounded-lg p-3 hover:border-[#1e3a8a] hover:bg-blue-50/30 transition-all">
                                                <p className="text-[13px] font-semibold text-[#1e3a8a] group-hover:underline leading-snug mb-2 line-clamp-2">
                                                    {r.title}
                                                </p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <StatusBadge status={r.status} />
                                                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                                        <Calendar size={10} /> {r.deadline}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/hien-ke" className="mt-4 block text-center text-[13px] font-semibold text-[#1e3a8a] hover:underline">
                                    Xem tất cả cuộc tham vấn →
                                </Link>
                            </div>

                            {/* Other pages in category */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-1">Các trang khác</h3>
                                <p className="text-[12px] text-gray-400 mb-3">trong {data.category}</p>
                                <div className="space-y-2">
                                    {OTHER_PAGES.map(p => (
                                        <Link
                                            key={p.id}
                                            to={`/hien-ke/${p.id}`}
                                            className="block text-[13px] text-[#1e3a8a] hover:underline py-1.5 border-b border-gray-50 last:border-0 line-clamp-2 leading-snug"
                                        >
                                            {p.title}
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/hien-ke" className="mt-3 block text-[13px] font-semibold text-[#1e3a8a] hover:underline">
                                    Xem tất cả trang →
                                </Link>
                            </div>

                            {/* Back to top */}
                            <button
                                onClick={scrollToTop}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:text-[#1e3a8a] hover:border-[#1e3a8a] transition-all shadow-sm"
                            >
                                <ArrowUp size={14} /> Về đầu trang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HienKeDetailPage;

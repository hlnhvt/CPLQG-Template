import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, FileText, FileImage, Film, FileSpreadsheet, File, X,
    ChevronLeft, ChevronRight as ChevronRightIcon, BookOpen, Eye, Download,
    ChevronDown, ChevronUp, SlidersHorizontal, ZoomIn, ZoomOut, Printer, ExternalLink, ArrowLeft
} from 'lucide-react';

const MOCK_DOCUMENTS = [
    { id: 1, name: 'Hướng dẫn đăng ký tài khoản và đăng nhập hệ thống', fileName: 'HDSD_01_DangKy_DangNhap_v1.0.pdf', desc: 'Mô tả đầy đủ các bước tạo tài khoản mới, xác thực email và đăng nhập lần đầu vào Cổng Thông tin Pháp luật Quốc gia. Bao gồm hướng dẫn khôi phục mật khẩu và quản lý thông tin cá nhân.', type: 'pdf', date: '05/01/2026', url: '#', chuDe: 'Tài khoản', nghiepVu: 'Quản lý người dùng' },
    { id: 2, name: 'Hướng dẫn tra cứu văn bản quy phạm pháp luật', fileName: 'HDSD_02_TraCuu_VBQPPL_v2.1.pdf', desc: 'Hướng dẫn chi tiết các phương thức tìm kiếm văn bản pháp luật: tìm kiếm cơ bản, nâng cao, theo ngành lĩnh vực và theo cấp ban hành. Kèm theo hướng dẫn sử dụng bộ lọc và xuất kết quả.', type: 'pdf', date: '08/01/2026', url: '#', chuDe: 'Tra cứu pháp luật', nghiepVu: 'Văn bản QPPL' },
    { id: 3, name: 'Hướng dẫn sử dụng chức năng Hỏi đáp pháp luật', fileName: 'HDSD_03_HoiDap_PhapLuat_v1.5.pdf', desc: 'Hướng dẫn người dùng đặt câu hỏi pháp luật, theo dõi trạng thái xử lý câu hỏi và tương tác với chuyên gia tư vấn trực tuyến. Bao gồm quy trình gửi tài liệu đính kèm.', type: 'pdf', date: '10/01/2026', url: '#', chuDe: 'Hỗ trợ pháp lý', nghiepVu: 'Hỏi - Đáp' },
    { id: 4, name: 'Hướng dẫn đặt lịch tư vấn pháp luật trực tuyến', fileName: 'HDSD_04_DatLich_TuVan_v1.0.docx', desc: 'Quy trình đặt lịch hẹn, xác nhận lịch hẹn, tham gia buổi tư vấn với luật sư qua video call và đánh giá chất lượng dịch vụ sau buổi tư vấn.', type: 'docx', date: '12/01/2026', url: '#', chuDe: 'Tư vấn', nghiepVu: 'Chuyên gia' },
    { id: 5, name: 'Hướng dẫn tham gia góp ý dự thảo văn bản', fileName: 'HDSD_05_GopY_DuThao_v2.0.pdf', desc: 'Các bước truy cập dự thảo văn bản, đọc nội dung chi tiết và gửi ý kiến đóng góp tới cơ quan soạn thảo. Hướng dẫn theo dõi phản hồi từ cơ quan tiếp nhận.', type: 'pdf', date: '15/01/2026', url: '#', chuDe: 'Góp ý', nghiepVu: 'Dự thảo VBPL' },
    { id: 6, name: 'Hướng dẫn sử dụng Trợ lý pháp luật AI', fileName: 'HDSD_06_TroLy_AI_v1.2.pdf', desc: 'Cách tương tác với trợ lý pháp luật ảo tích hợp AI: đặt câu hỏi bằng ngôn ngữ tự nhiên, tra cứu điều khoản, xem gợi ý tương liên và xuất kết quả sang PDF.', type: 'pdf', date: '18/01/2026', url: '#', chuDe: 'Trợ lý AI', nghiepVu: 'Công nghệ' },
    { id: 7, name: 'Hướng dẫn quản lý tủ sách pháp luật cá nhân', fileName: 'HDSD_07_TuSach_CaNhan_v1.0.docx', desc: 'Cách lưu văn bản vào bộ sưu tập cá nhân, tạo ghi chú, đặt nhãn phân loại và xuất danh sách văn bản đã lưu theo nhiều định dạng.', type: 'docx', date: '20/01/2026', url: '#', chuDe: 'Tài khoản', nghiepVu: 'Quản lý cá nhân' },
    { id: 8, name: 'Hướng dẫn đăng ký nhận thông báo pháp luật', fileName: 'HDSD_08_DangKy_ThongBao_v1.3.pdf', desc: 'Thiết lập các lĩnh vực quan tâm, tần suất nhận thông báo và quản lý đăng ký bản tin qua email. Bao gồm hướng dẫn hủy đăng ký và thay đổi cài đặt.', type: 'pdf', date: '22/01/2026', url: '#', chuDe: 'Thông báo', nghiepVu: 'Bản tin' },
    { id: 9, name: 'Hướng dẫn sử dụng diễn đàn Nghiên cứu & Trao đổi', fileName: 'HDSD_09_DienDan_NghienCuu_v1.1.pdf', desc: 'Quy định và hướng dẫn tham gia diễn đàn học thuật: đăng bài nghiên cứu, bình luận phản hồi và các quy tắc ứng xử trực tuyến theo chuẩn mực khoa học pháp lý.', type: 'pdf', date: '25/01/2026', url: '#', chuDe: 'Diễn đàn', nghiepVu: 'Nghiên cứu - Trao đổi' },
    { id: 10, name: 'Hướng dẫn tiếp cận Cổng trên thiết bị di động', fileName: 'HDSD_10_Mobile_PWA_v1.0.pdf', desc: 'Hướng dẫn truy cập và sử dụng đầy đủ tính năng Cổng Pháp luật trên thiết bị di động, tùy chỉnh giao diện và cài đặt Progressive Web App (PWA) để sử dụng offline.', type: 'pdf', date: '28/01/2026', url: '#', chuDe: 'Kỹ thuật', nghiepVu: 'Thiết bị di động' },
    { id: 11, name: 'Hướng dẫn gửi phản ánh, kiến nghị qua hệ thống', fileName: 'HDSD_11_PhanAnh_KienNghi_v1.4.docx', desc: 'Quy trình soạn thảo và gửi phản ánh, kiến nghị trực tuyến, theo dõi trạng thái xử lý và nhận phản hồi từ cơ quan chức năng có thẩm quyền.', type: 'docx', date: '01/02/2026', url: '#', chuDe: 'Phản ánh', nghiepVu: 'Kiến nghị' },
    { id: 12, name: 'Hướng dẫn sử dụng chức năng Khảo sát ý kiến', fileName: 'HDSD_12_KhaoSat_YKien_v1.0.pdf', desc: 'Cách tìm và lựa chọn các bảng khảo sát chính sách, hoàn thành bảng hỏi trực tuyến và xem kết quả thống kê tổng hợp từ cộng đồng sau khi hoàn thành.', type: 'pdf', date: '05/02/2026', url: '#', chuDe: 'Khảo sát', nghiepVu: 'Ý kiến chính sách' },
    { id: 13, name: 'Video hướng dẫn: Tìm kiếm văn bản pháp luật nâng cao', fileName: 'VIDEO_13_TraCuu_VBPL_NangCao.mp4', desc: 'Video hướng dẫn chi tiết từng bước sử dụng bộ lọc nâng cao để tra cứu văn bản theo nhiều tiêu chí: loại văn bản, cơ quan ban hành, hiệu lực, lĩnh vực chuyên ngành.', type: 'mp4', date: '08/02/2026', url: '#', chuDe: 'Tra cứu pháp luật', nghiepVu: 'Văn bản QPPL' },
    { id: 14, name: 'Infographic: Sơ đồ quy trình tra cứu pháp luật', fileName: 'INFOGRAPHIC_14_QuyTrinh_TraCuu.png', desc: 'Hình ảnh trực quan tóm tắt toàn bộ quy trình tra cứu và các tính năng hỗ trợ chính trên Cổng Thông tin Pháp luật Quốc gia, phù hợp in ấn và trình chiếu.', type: 'png', date: '10/02/2026', url: '#', chuDe: 'Tra cứu pháp luật', nghiepVu: 'Thống kê' },
];

const FILE_CONFIG = {
    pdf:  { color: 'bg-red-600',    label: 'PDF',   icon: FileText },
    docx: { color: 'bg-blue-600',   label: 'DOCX',  icon: FileText },
    xlsx: { color: 'bg-green-600',  label: 'XLSX',  icon: FileSpreadsheet },
    mp4:  { color: 'bg-purple-600', label: 'VIDEO', icon: Film },
    png:  { color: 'bg-orange-500', label: 'ẢNH',  icon: FileImage },
};

const ALL_CHU_DE    = [...new Set(MOCK_DOCUMENTS.map(d => d.chuDe))].sort();
const ALL_NGHIEP_VU = [...new Set(MOCK_DOCUMENTS.map(d => d.nghiepVu))].sort();

// Initial value, can be changed by user
const DEFAULT_ITEMS_PER_PAGE = 10;

/* ─────────────────────────── PREVIEW MODAL ─────────────────────────── */
const DocPreviewModal = ({ doc, onClose }) => {
    const cfg = FILE_CONFIG[doc.type] || { color: 'bg-gray-500', label: doc.type?.toUpperCase(), icon: File };
    const IconComp = cfg.icon;

    useEffect(() => {
        const handler = e => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal panel */}
            <div
                className="relative z-10 w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                style={{ height: 'min(88vh, 780px)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header toolbar */}
                <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
                    <button onClick={onClose} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-[13px] font-medium transition-colors">
                        <ArrowLeft size={16} /> Quay lại
                    </button>
                    <div className="h-4 w-px bg-gray-300" />
                    <div className="flex items-center gap-2 flex-1">
                        <div className={`w-7 h-7 ${cfg.color} rounded flex items-center justify-center`}>
                            <IconComp size={14} className="text-white" />
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700 truncate max-w-lg">{doc.fileName}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500" title="Thu nhỏ">
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-[12px] text-gray-600 font-medium px-2">100%</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500" title="Phóng to">
                            <ZoomIn size={16} />
                        </button>
                        <div className="h-4 w-px bg-gray-300" />
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500" title="In">
                            <Printer size={16} />
                        </button>
                        <a href={doc.url} download className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500" title="Tải xuống">
                            <Download size={16} />
                        </a>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500" title="Mở tab mới">
                            <ExternalLink size={16} />
                        </a>
                        <div className="h-4 w-px bg-gray-300" />
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-100 text-gray-500 hover:text-red-600">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Viewer area */}
                <div className="flex-1 overflow-y-auto bg-gray-200 flex justify-center pt-6 pb-10 px-4 gap-0">
                    {/* Mock document page */}
                    <div className="bg-white shadow-xl w-full max-w-[680px] min-h-[880px] p-12 text-[13px] text-gray-800 font-serif leading-relaxed relative">
                        {/* Page top */}
                        <div className="flex justify-between text-[11px] text-gray-500 mb-8">
                            <span>BỘ TƯ PHÁP</span>
                            <span>CỘNG HÒA XÃ HỘI CHỦ NGHIĨA VIỆT NAM</span>
                        </div>
                        <div className="text-center mb-6">
                            <p className="font-bold text-[14px] text-center leading-snug uppercase mb-1">{doc.name}</p>
                            <p className="text-[12px] text-gray-500">Tài liệu hướng dẫn sử dụng</p>
                        </div>
                        <div className="h-px bg-gray-300 my-4" />
                        <p className="mb-4"><strong>1. Giới thiệu</strong></p>
                        <p className="mb-3">{doc.desc}</p>
                        <p className="mb-4"><strong>2. Phạm vi áp dụng</strong></p>
                        <p className="mb-3">Tài liệu này áp dụng cho toàn bộ cán bộ, công chức và người dùng sử dụng hệ thống Cổng Thông tin Pháp luật Quốc gia, bao gồm mậu hệ thống nội bộ và cổng dịch vụ công.</p>
                        <p className="mb-4"><strong>3. Các bước thực hiện</strong></p>
                        <p className="mb-2">Bước 1: Đăng nhập vào hệ thống tại địa chỉ https://phapdien.moj.gov.vn</p>
                        <p className="mb-2">Bước 2: Truy cập mồc chức năng cần sử dụng từ menu chính.</p>
                        <p className="mb-2">Bước 3: Thực hiện theo hướng dẫn chi tiết dưới đây.</p>
                        <p className="mb-4"><strong>4. Lưu ý quan trọng</strong></p>
                        <p className="mb-3">Trong quá trình sử dụng, nếu gặp khó khăn, vui lòng liên hệ đường dây hỗ trợ hoặc gửi yêu cầu qua chức năng Hỏi đáp pháp luật trên Cổng.</p>
                        {/* Page number */}
                        <div className="absolute bottom-4 inset-x-0 text-center text-[11px] text-gray-400">1</div>
                    </div>
                </div>

                {/* Footer: page navigation */}
                <div className="flex items-center justify-center gap-3 py-2 bg-gray-50 border-t border-gray-200 text-[12px] text-gray-600 shrink-0">
                    <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40" disabled>‹ Trước</button>
                    <span>Trang <strong>1</strong> / 1</span>
                    <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40" disabled>Tiếp ›</button>
                </div>
            </div>
        </div>
    );
};
/* ─────────────────────────────────────────────────────────────────────── */

const DocRow = ({ doc, onPreview }) => {
    const [expanded, setExpanded] = useState(false);
    const cfg = FILE_CONFIG[doc.type] || { color: 'bg-gray-500', label: doc.type?.toUpperCase(), icon: File };
    const IconComp = cfg.icon;

    return (
        <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-blue-50/20 transition-colors group">
            {/* File icon */}
            <div className={`w-12 h-12 ${cfg.color} rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                <IconComp size={22} className="text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Document name */}
                <p className="font-semibold text-[14px] text-[#0f4c81] leading-snug group-hover:text-blue-700 mb-0.5">
                    {doc.name}
                </p>
                {/* File meta row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-gray-500">{cfg.label}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] text-gray-400 truncate max-w-[240px]">{doc.fileName}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] text-gray-400">{doc.date}</span>
                </div>
                {/* Badges ABOVE description */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">{doc.chuDe}</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-100">{doc.nghiepVu}</span>
                </div>
                {/* Description expand/collapse */}
                <div>
                    <p className={`text-[13px] text-gray-500 leading-relaxed ${expanded ? '' : 'line-clamp-1'}`}>
                        {doc.desc}
                    </p>
                    <button
                        onClick={() => setExpanded(v => !v)}
                        className="inline-flex items-center gap-1 text-[12px] text-blue-500 hover:text-blue-700 mt-0.5 font-medium"
                    >
                        {expanded ? (<><ChevronUp size={13} /> Thu gọn</>) : (<><ChevronDown size={13} /> Xem thêm</>)}
                    </button>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 mt-0.5">
                <button
                    onClick={() => onPreview(doc)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold border border-blue-200 transition-colors whitespace-nowrap"
                >
                    <Eye size={14} /> Xem
                </button>
                <a
                    href={doc.url}
                    download
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700 text-[12px] font-semibold border border-gray-200 hover:border-green-300 transition-colors whitespace-nowrap"
                >
                    <Download size={14} /> Tải xuống
                </a>
            </div>
        </div>
    );
};

const CheckboxGroup = ({ title, options, selected, onChange }) => (
    <div className="mb-6">
        <h4 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</h4>
        <ul className="space-y-2">
            {options.map(opt => (
                <li key={opt}>
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-[#0f4c81] rounded cursor-pointer"
                            checked={selected.includes(opt)}
                            onChange={() => onChange(opt)}
                        />
                        <span className={`text-[13px] transition-colors ${selected.includes(opt) ? 'text-[#0f4c81] font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                            {opt}
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    </div>
);

const UserManualDocListPage = () => {
    const [keyword, setKeyword]         = useState('');
    const [searchTerm, setSearchTerm]   = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selChuDe, setSelChuDe]       = useState([]);
    const [selNghiepVu, setSelNghiepVu] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const [previewDoc, setPreviewDoc]       = useState(null);

    const toggle = (arr, setArr, val) =>
        setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

    const filtered = useMemo(() => {
        return MOCK_DOCUMENTS.filter(doc => {
            const matchSearch  = !searchTerm.trim() || doc.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
            const matchChuDe   = selChuDe.length === 0 || selChuDe.includes(doc.chuDe);
            const matchNghiepVu = selNghiepVu.length === 0 || selNghiepVu.includes(doc.nghiepVu);
            return matchSearch && matchChuDe && matchNghiepVu;
        });
    }, [searchTerm, selChuDe, selNghiepVu]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated  = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearch = e => { e.preventDefault(); setSearchTerm(keyword); setCurrentPage(1); };
    const handleClear  = () => { setKeyword(''); setSearchTerm(''); setCurrentPage(1); };

    const activeFilterCount = selChuDe.length + selNghiepVu.length;
    const resetFilters = () => { setSelChuDe([]); setSelNghiepVu([]); };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-10 pb-16 px-4 shadow-sm">
                <div className="container mx-auto max-w-[1280px]">
                    <div className="flex items-center gap-2 text-[13px] text-blue-200 mb-4">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRightIcon size={14} />
                        <span className="text-white font-semibold">HƯỚNG DẪN SỬ DỤNG</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold uppercase mb-3 drop-shadow-md">Hướng dẫn sử dụng</h1>
                    <p className="text-blue-100 max-w-2xl text-[15px] leading-relaxed">
                        Tổng hợp đầy đủ các tài liệu, video hướng dẫn sử dụng tất cả tính năng trên Cổng Thông tin Pháp luật Quốc gia.
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-[1280px] px-4 -mt-8 relative z-10">
                {/* Search panel */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-6">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                placeholder="Nhập từ khóa tìm kiếm theo tên tài liệu..."
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                            {keyword && (
                                <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="px-6 py-2.5 bg-[#0f4c81] text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2 text-[14px]">
                            <Search size={16} /> Tìm kiếm
                        </button>
                        {/* Mobile filter toggle */}
                        <button
                            type="button"
                            onClick={() => setShowFilters(v => !v)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-[14px] relative"
                        >
                            <SlidersHorizontal size={16} />
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">{activeFilterCount}</span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="flex gap-6 items-start">
                    {/* ───── LEFT FILTER PANEL ───── */}
                    <aside className={`w-[240px] shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 text-[14px] flex items-center gap-2">
                                    <SlidersHorizontal size={15} className="text-[#0f4c81]" /> Bộ lọc
                                </h3>
                                {activeFilterCount > 0 && (
                                    <button onClick={resetFilters} className="text-[12px] text-red-500 hover:underline font-medium">
                                        Xóa ({activeFilterCount})
                                    </button>
                                )}
                            </div>
                            <div className="h-px bg-gray-100 mb-4" />

                            <CheckboxGroup
                                title="Chủ đề"
                                options={ALL_CHU_DE}
                                selected={selChuDe}
                                onChange={val => { toggle(selChuDe, setSelChuDe, val); setCurrentPage(1); }}
                            />
                            <div className="h-px bg-gray-100 mb-4" />
                            <CheckboxGroup
                                title="Nghiệp vụ"
                                options={ALL_NGHIEP_VU}
                                selected={selNghiepVu}
                                onChange={val => { toggle(selNghiepVu, setSelNghiepVu, val); setCurrentPage(1); }}
                            />
                        </div>
                    </aside>

                    {/* ───── MAIN CONTENT ───── */}
                    <div className="flex-1 min-w-0">
                        {/* Results header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#0f4c81]" />
                                {searchTerm ? (
                                    <span className="text-[14px] text-gray-600">
                                        Tìm thấy <strong>{filtered.length}</strong> kết quả cho "{searchTerm}"
                                        <button onClick={handleClear} className="ml-2 text-blue-600 hover:underline text-[13px]">Xóa</button>
                                    </span>
                                ) : (
                                    <span className="text-[14px] text-gray-600">
                                        Tổng số: <strong>{filtered.length}</strong> tài liệu
                                        {activeFilterCount > 0 && <span className="text-gray-400 ml-1">(đang lọc)</span>}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Document list */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {paginated.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                                    <Search size={48} className="text-gray-300" />
                                    <p className="text-gray-500 font-medium">Không tìm thấy tài liệu phù hợp.</p>
                                    <button onClick={() => { handleClear(); resetFilters(); }} className="text-blue-600 hover:underline text-sm">
                                        Xóa bộ lọc để xem toàn bộ
                                    </button>
                                </div>
                            ) : (
                                paginated.map((doc, idx) => <DocRow key={doc.id} doc={doc} onPreview={setPreviewDoc} />)
                            )}
                        </div>

                        {/* Pagination */}
                        {filtered.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-white p-4 rounded-xl border border-gray-100">
                                {/* Items per page selector */}
                                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                                    <span>Hiển thị</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={e => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className="bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400 outline-none text-[#0f4c81] font-bold"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span>bản ghi / trang</span>
                                </div>

                                {/* Page numbers */}
                                {totalPages > 1 && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setCurrentPage(p)}
                                                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold border transition-colors shadow-sm ${currentPage === p
                                                    ? 'bg-[#0f4c81] text-white border-blue-800 shadow-md'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                                        >
                                            <ChevronRightIcon size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Document Preview Modal ── */}
            {previewDoc && <DocPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />}
        </div>
    );
};

export default UserManualDocListPage;

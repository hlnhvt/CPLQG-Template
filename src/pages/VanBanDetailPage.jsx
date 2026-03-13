import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    ChevronRight, Copy, Check, Download, FileText, Eye, ArrowLeft,
    BookOpen, List, GitBranch, Clock, File, Link2, Upload,
    Maximize2, RotateCw, ZoomIn, ZoomOut, Printer, Search
} from 'lucide-react';

// ── Mock document data ────────────────────────────────────────────────────────
const MOCK_DOC = {
    id: 1,
    soHieu: '631/QĐ-BYT',
    title: 'Quyết định 631/QĐ-BYT của Bộ Y tế ban hành Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026',
    status: 'active',
    ngayHieuLuc: '15/03/2026',
    ngayCapNhat: '13/03/2026',
    ngayBanHanh: '10/03/2026',
    loai: 'Quyết định',
    cqBanHanh: 'Bộ Y tế',
    nguoiKy: 'Nguyễn Thị Bình',
    chucDanh: 'Bộ trưởng',
    linhVuc: ['Y tế', 'Bảo hiểm y tế'],
    nganh: 'Y tế - Dược',
    trichYeu: 'Ban hành Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026 theo Luật phòng, chống bệnh truyền nhiễm.',
    soCongBao: '1234',
    ngayCongBao: '20/03/2026',
    ngayHetHieuLuc: '',
    apDung: 'Đã biết',
    dinhKiem: true,
};

const STATUS_MAP = {
    active: { label: 'Còn Hiệu lực', cls: 'bg-green-50 text-green-700 border-green-200' },
    expired: { label: 'Hết Hiệu lực', cls: 'bg-red-50 text-red-700 border-red-200' },
    pending: { label: 'Chưa có Hiệu lực', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
};

const TABS = [
    { id: 'noi-dung',     label: 'Nội dung',         icon: BookOpen },
    { id: 'thuoc-tinh',   label: 'Thuộc tính',        icon: List },
    { id: 'luoc-do',      label: 'Lược đồ',           icon: GitBranch },
    { id: 'van-ban-goc',  label: 'Văn bản gốc',       icon: File },
    { id: 'van-ban-lq',   label: 'Văn bản liên quan', icon: Link2 },
    { id: 'tai-ve',       label: 'Tải về',             icon: Upload },
];

// ── Quick action buttons (shared in list rows) ────────────────────────────────
const QuickBtns = ({ onTab }) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
        {['Tổng quan', 'Nội dung', 'Văn bản gốc', 'Hiệu lực', 'Văn bản liên quan'].map(l => (
            <button key={l}
                className="text-[11px] px-2.5 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600">
                {l}
            </button>
        ))}
        <button className="text-[11px] px-2.5 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 flex items-center gap-1"
            onClick={() => onTab && onTab('tai-ve')}>
            ↑ Tải về
        </button>
    </div>
);

// ── Tab: Nội dung (UC46 MH02) ─────────────────────────────────────────────────
const TabNoiDung = ({ tocOpen, setTocOpen }) => {
    const [activeToc, setActiveToc] = useState('dieu1');
    const CONTENT = [
        { id: 'cancu', type: 'cancu', text: 'Căn cứ Luật Phòng, chống bệnh truyền nhiễm ngày 21 tháng 11 năm 2007;\nCăn cứ Nghị định số 95/2022/NĐ-CP ngày 15 tháng 11 năm 2022 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Y tế;' },
        { id: 'dieu1', type: 'dieu', label: 'Điều 1. Phạm vi điều chỉnh', text: 'Quyết định này ban hành Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026, áp dụng trên toàn lãnh thổ nước Cộng hòa xã hội chủ nghĩa Việt Nam.' },
        { id: 'khoan1', type: 'khoan', label: '1. Mục tiêu tổng quát', text: 'Kiểm soát và ngăn chặn các dịch bệnh truyền nhiễm nguy hiểm, bảo vệ sức khỏe nhân dân, duy trì ổn định kinh tế-xã hội.' },
        { id: 'khoan2', type: 'khoan', label: '2. Mục tiêu cụ thể', text: 'a) Giảm tỷ lệ mắc và tử vong do các bệnh truyền nhiễm có vắc-xin phòng ngừa xuống dưới mức 1/100.000 dân.\nb) Đảm bảo tỷ lệ tiêm chủng đầy đủ đạt trên 95% ở tất cả các tỉnh/thành phố.\nc) Kiểm soát và khống chế kịp thời các dịch bệnh mới phát sinh, không để lây lan rộng.' },
        { id: 'dieu2', type: 'dieu', label: 'Điều 2. Đối tượng áp dụng', text: 'Quyết định này áp dụng đối với các cơ quan, tổ chức, cá nhân có liên quan đến hoạt động phòng, chống bệnh truyền nhiễm trên lãnh thổ Việt Nam.' },
        { id: 'dieu3', type: 'dieu', label: 'Điều 3. Hiệu lực thi hành', text: 'Quyết định này có hiệu lực kể từ ngày ký.\nCác văn bản trước đây trái với Quyết định này đều bị bãi bỏ. Tham chiếu: <a href="#" class="text-blue-600 hover:underline">Luật số 89/2015/QH13</a>, <a href="#" class="text-blue-600 hover:underline">Nghị định 10/2021/NĐ-CP</a>.' },
        { id: 'dieu4', type: 'dieu', label: 'Điều 4. Trách nhiệm thi hành', text: 'Chánh Văn phòng Bộ, Cục trưởng Cục Y tế dự phòng và các đơn vị có liên quan chịu trách nhiệm thi hành Quyết định này.' },
    ];

    const tocItems = CONTENT.filter(c => c.type === 'dieu' || c.type === 'khoan');

    return (
        <div className="flex gap-4">
            {/* Content */}
            <div className="flex-1 min-w-0 prose prose-sm max-w-none">
                <div className="space-y-4">
                    {CONTENT.map(sec => (
                        <div key={sec.id} id={sec.id}>
                            {sec.type === 'cancu' && (
                                <p className="text-[13px] text-gray-600 italic whitespace-pre-line">{sec.text}</p>
                            )}
                            {sec.type === 'dieu' && (
                                <div>
                                    <h3 className="text-[14px] font-bold text-gray-800 mb-1.5">{sec.label}</h3>
                                    <p className="text-[13px] text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sec.text.replace(/\n/g, '<br/>') }} />
                                </div>
                            )}
                            {sec.type === 'khoan' && (
                                <div className="pl-5">
                                    <h4 className="text-[13px] font-semibold text-gray-700 mb-1">{sec.label}</h4>
                                    <p className="text-[13px] text-gray-600 whitespace-pre-line leading-relaxed">{sec.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating TOC */}
            <div className={`shrink-0 transition-all duration-300 ${tocOpen ? 'w-52' : 'w-10'}`}>
                <div className={`sticky top-4 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden`}>
                    <div className="bg-[#1a3b8b] text-white px-3 py-2 flex items-center justify-between">
                        {tocOpen && <span className="text-[12px] font-semibold">Mục lục</span>}
                        <button onClick={() => setTocOpen(s => !s)} className="text-white/80 hover:text-white ml-auto">
                            <List size={16} />
                        </button>
                    </div>
                    {tocOpen && (
                        <div className="p-2 space-y-0.5 max-h-96 overflow-y-auto">
                            {tocItems.map(item => (
                                <a key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setActiveToc(item.id)}
                                    className={`block text-[11px] px-2 py-1.5 rounded transition-colors leading-snug ${activeToc === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}
                                        ${item.type === 'khoan' ? 'pl-4 text-gray-500' : ''}`}>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Tab: Thuộc tính (UC47) ────────────────────────────────────────────────────
const TabThuocTinh = ({ doc }) => {
    const rows = [
        { label: 'Cơ quan ban hành', value: doc.cqBanHanh },
        { label: 'Số hiệu', value: doc.soHieu },
        { label: 'Loại văn bản', value: doc.loai },
        { label: 'Trích yếu', value: doc.trichYeu },
        { label: 'Ngày ban hành', value: doc.ngayBanHanh },
        { label: 'Số công báo', value: doc.soCongBao || null },
        { label: 'Ngày đăng công báo', value: doc.ngayCongBao || null },
        { label: 'Người ký', value: doc.nguoiKy },
        { label: 'Áp dụng', value: doc.apDung, isLink: doc.apDung === 'Đã biết' },
        { label: 'Ngày hết hiệu lực', value: doc.ngayHetHieuLuc || null },
        { label: 'Tình trạng hiệu lực', value: 'Còn Hiệu lực', isBadge: true, status: 'active' },
        { label: 'Lĩnh vực', value: doc.linhVuc, isList: true },
    ];

    return (
        <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-[13px]">
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="w-40 px-5 py-3 font-semibold text-gray-600 border-r border-gray-100 shrink-0">
                                {row.label}
                            </td>
                            <td className="px-5 py-3 text-gray-700">
                                {!row.value
                                    ? <span className="text-gray-400 italic text-[12px]">Đang cập nhật</span>
                                    : row.isBadge
                                        ? <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-semibold ${STATUS_MAP[row.status]?.cls}`}>{row.value}</span>
                                        : row.isLink
                                            ? <a href="#" className="text-blue-600 hover:underline">{row.value}</a>
                                            : row.isList
                                                ? (Array.isArray(row.value) ? row.value : [row.value]).map(v => (
                                                    <a key={v} href="#" className="inline-block mr-2 text-blue-600 hover:underline">{v}</a>
                                                ))
                                                : row.value
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ── Tab: Lược đồ (UC49) ───────────────────────────────────────────────────────
const LEFT_GROUPS = [
    { label: 'Văn bản được hướng dẫn', items: ['Thông tư 12/2025/TT-BYT'] },
    { label: 'Văn bản được hợp nhất', items: [] },
    { label: 'Văn bản bị sửa đổi bổ sung', items: ['Quyết định 123/QĐ-BYT', 'Quyết định 456/QĐ-BYT'] },
    { label: 'Văn bản bị đính chính', items: [] },
    { label: 'Văn bản bị thay thế', items: [] },
    { label: 'Văn bản được dẫn chiếu', items: ['Luật 89/2015/QH13'] },
    { label: 'Văn bản được căn cứ', items: ['Nghị định 95/2022/NĐ-CP'] },
];
const RIGHT_GROUPS = [
    { label: 'Văn bản hướng dẫn', items: [] },
    { label: 'Văn bản hợp nhất', items: [] },
    { label: 'Văn bản sửa đổi bổ sung', items: ['Quyết định 789/QĐ-BYT'] },
    { label: 'Văn bản đính chính', items: [] },
    { label: 'Văn bản thay thế', items: [] },
    { label: 'Văn bản liên quan cùng nội dung', items: ['Quyết định 100/QĐ-BYT', 'Thông tư 05/2026/TT-BYT'] },
];

const TabLuocDo = ({ doc }) => (
    <div className="grid grid-cols-3 gap-4 text-[12px]">
        {/* Left */}
        <div className="space-y-3">
            {LEFT_GROUPS.map(g => (
                <div key={g.label} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">{g.label} ({g.items.length})</p>
                    {g.items.length > 0
                        ? g.items.map(item => <a key={item} href="#" className="flex items-start gap-1 text-blue-600 hover:underline mb-1"><span className="text-gray-400 mt-0.5">○</span>{item}</a>)
                        : <span className="text-gray-400 flex items-center gap-1"><span>○</span> --</span>
                    }
                </div>
            ))}
        </div>

        {/* Center */}
        <div className="flex items-start justify-center">
            <div className="bg-white border-2 border-[#1a3b8b] rounded-xl p-4 w-full shadow-sm">
                <p className="text-[10px] font-bold text-[#1a3b8b] uppercase tracking-widest mb-3 text-center">Văn bản đang xem</p>
                <div className="space-y-2">
                    {[
                        ['Số hiệu', <a href="#" className="text-blue-600 hover:underline">{doc.soHieu}</a>],
                        ['Ngành', doc.nganh],
                        ['Lĩnh vực', doc.linhVuc.join(', ')],
                        ['Cơ quan ban hành', <a href="#" className="text-blue-600 hover:underline">{doc.cqBanHanh}</a>],
                        ['Chức danh', doc.chucDanh],
                        ['Người ký', doc.nguoiKy],
                        ['Loại văn bản', doc.loai],
                        ['Ngày ban hành', doc.ngayBanHanh],
                        ['Ngày có hiệu lực', doc.ngayHieuLuc],
                        ['Ngày hết hiệu lực', doc.ngayHetHieuLuc || <span className="text-gray-400 italic">Đang cập nhật</span>],
                        ['Tình trạng', <span className="text-green-600 font-semibold">Còn Hiệu lực</span>],
                    ].map(([k, v]) => (
                        <div key={String(k)} className="flex gap-1.5 text-[11px] border-b border-gray-50 pb-1">
                            <span className="text-gray-500 shrink-0 w-28">{k}</span>
                            <span className="text-gray-800">{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right */}
        <div className="space-y-3">
            {RIGHT_GROUPS.map(g => (
                <div key={g.label} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">{g.label} ({g.items.length})</p>
                    {g.items.length > 0
                        ? g.items.map(item => <a key={item} href="#" className="flex items-start gap-1 text-blue-600 hover:underline mb-1"><span className="text-gray-400 mt-0.5">○</span>{item}</a>)
                        : <span className="text-gray-400 flex items-center gap-1"><span>○</span> --</span>
                    }
                </div>
            ))}
        </div>
    </div>
);

// ── Tab: Văn bản gốc (UC46 MH03) ─────────────────────────────────────────────
const TabVanBanGoc = () => {
    const [page, setPage] = useState(1);
    const [zoom, setZoom] = useState(100);
    const TOTAL_PAGES = 12;
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="pl-6 pr-3 py-1 text-[12px] border border-gray-300 rounded outline-none focus:border-blue-400 w-36" placeholder="Tìm trong tài liệu" />
                </div>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                {/* Page nav */}
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-40 hover:border-blue-400">◀</button>
                <span className="text-[12px] text-gray-600"><input value={page} onChange={e => setPage(+e.target.value || 1)} className="w-8 text-center border border-gray-300 rounded py-0.5 text-[12px]" /> / {TOTAL_PAGES}</span>
                <button onClick={() => setPage(p => Math.min(TOTAL_PAGES, p+1))} disabled={page===TOTAL_PAGES} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-40 hover:border-blue-400">▶</button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                {/* Zoom */}
                <button onClick={() => setZoom(z => Math.max(50, z-10))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><ZoomOut size={12}/></button>
                <select value={zoom} onChange={e => setZoom(+e.target.value)} className="border border-gray-300 rounded px-1 py-0.5 text-[12px] outline-none bg-white">
                    {[50, 75, 100, 125, 150, 200].map(v => <option key={v} value={v}>{v}%</option>)}
                </select>
                <button onClick={() => setZoom(z => Math.min(200, z+10))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><ZoomIn size={12}/></button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><RotateCw size={12}/></button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><Maximize2 size={12}/></button>
                <div className="ml-auto flex gap-2">
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-[12px] bg-white hover:border-blue-400"><Printer size={12}/> In</button>
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-[12px] bg-white hover:border-blue-400"><Download size={12}/> Tải về</button>
                </div>
            </div>
            {/* Viewer area */}
            <div className="bg-gray-200 flex items-center justify-center min-h-[500px] p-8">
                <div className="bg-white shadow-xl rounded p-12 text-center" style={{ width: `${zoom * 5}px`, maxWidth: '100%' }}>
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-[14px] font-bold text-gray-600">Trang {page} / {TOTAL_PAGES}</p>
                    <p className="text-[12px] text-gray-400 mt-2">631/QĐ-BYT – Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026</p>
                    <p className="text-[11px] text-gray-300 mt-6">(Trình xem PDF – Bản demo)</p>
                </div>
            </div>
        </div>
    );
};

// ── Tab: Văn bản liên quan (UC48) ─────────────────────────────────────────────
const RELATED_GROUPS = [
    { key: 'all', label: 'Tất cả', count: 8 },
    { key: 'can-cu', label: 'Văn bản căn cứ', count: 8 },
    { key: 'sua-doi', label: 'Văn bản sửa đổi bổ sung', count: 0 },
    { key: 'thay-the', label: 'Văn bản thay thế', count: 0 },
];

const RELATED_LIST = [
    { id: 1, title: 'Luật Phòng, chống bệnh truyền nhiễm ngày 21 tháng 11 năm 2007', group: 'can-cu', ngayBanHanh: '21/11/2007', ngayApDung: '01/07/2008', status: 'active' },
    { id: 2, title: 'Nghị định số 95/2022/NĐ-CP ngày 15 tháng 11 năm 2022 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Y tế', group: 'can-cu', ngayBanHanh: '15/11/2022', ngayApDung: '01/01/2023', status: 'active' },
    { id: 3, title: 'Nghị quyết số 99/NQ-CP ngày 30 tháng 8 năm 2021 của Chính phủ', group: 'can-cu', ngayBanHanh: '30/08/2021', ngayApDung: '30/08/2021', status: 'active' },
    { id: 4, title: 'Quyết định số 376/QĐ-TTg ngày 17 tháng 3 năm 2021 của Thủ tướng Chính phủ', group: 'can-cu', ngayBanHanh: '17/03/2021', ngayApDung: '17/03/2021', status: 'active' },
    { id: 5, title: 'Thông tư số 54/2015/TT-BYT ngày 28 tháng 12 năm 2015 của Bộ Y tế', group: 'can-cu', ngayBanHanh: '28/12/2015', ngayApDung: '01/03/2016', status: 'expired' },
    { id: 6, title: 'Quyết định 1337/QĐ-BYT ngày 20 tháng 3 năm 2018 của Bộ Y tế', group: 'can-cu', ngayBanHanh: '20/03/2018', ngayApDung: '20/03/2018', status: 'active' },
    { id: 7, title: 'Kế hoạch phòng chống dịch bệnh mùa đông xuân 2025-2026', group: 'can-cu', ngayBanHanh: '10/10/2025', ngayApDung: '10/10/2025', status: 'active' },
    { id: 8, title: 'Hướng dẫn giám sát phòng chống bệnh truyền nhiễm 2024', group: 'can-cu', ngayBanHanh: '05/01/2024', ngayApDung: '05/01/2024', status: 'active' },
];

const TabVanBanLienQuan = ({ navigate }) => {
    const [activeGroup, setActiveGroup] = useState('all');
    const filtered = activeGroup === 'all' ? RELATED_LIST : RELATED_LIST.filter(d => d.group === activeGroup);
    return (
        <div>
            <p className="text-[13px] text-gray-500 italic mb-4">Danh sách các văn bản có liên quan đến văn bản hiện tại, bao gồm văn bản căn cứ, văn bản được sửa đổi, bổ sung...</p>
            <div className="flex gap-5">
                {/* Sidebar filter */}
                <div className="w-52 shrink-0">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        {RELATED_GROUPS.map(g => (
                            <button key={g.key} onClick={() => setActiveGroup(g.key)}
                                className={`w-full text-left flex items-center justify-between px-4 py-3 text-[13px] border-b border-gray-100 last:border-b-0 transition-colors ${activeGroup === g.key ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                                <span>{g.label}</span>
                                <span className={`text-[11px] ${g.count === 0 ? 'text-gray-400' : 'text-blue-600 font-bold'}`}>({g.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <p className="text-[13px] text-gray-400 italic py-8 text-center">Không có văn bản trong nhóm này.</p>
                    ) : (
                        <div className="space-y-4">
                            {filtered.map((doc, i) => {
                                const sb = STATUS_MAP[doc.status];
                                return (
                                    <div key={doc.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0">
                                        <div className="w-7 h-7 rounded bg-[#1a3b8b] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <a href="#" className="text-[14px] font-bold text-blue-700 hover:underline leading-snug block mb-1">{doc.title}</a>
                                            <span className="text-[11px] text-gray-500 italic">Văn bản căn cứ</span>
                                            <QuickBtns />
                                        </div>
                                        <div className="shrink-0 text-right text-[11px] text-gray-500 min-w-[120px] space-y-1 mt-0.5">
                                            <p><span className="text-gray-400">Ban hành:</span> {doc.ngayBanHanh}</p>
                                            <p><span className="text-gray-400">Áp dụng:</span> {doc.ngayApDung}</p>
                                            <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-semibold ${sb.cls}`}>{sb.label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Tab: Tải về (UC50) ────────────────────────────────────────────────────────
const FILES = [
    { id: 1, name: 'Quyết định 631/QĐ-BYT của Bộ Y tế ban hành Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026', type: 'Văn bản gốc', lang: 'Tiếng Việt', ext: 'PDF' },
    { id: 2, name: 'Phụ lục 01 – Kế hoạch phòng chống bệnh sốt xuất huyết Dengue 2026', type: 'Phụ lục', lang: 'Tiếng Việt', ext: 'DOCX' },
    { id: 3, name: 'Phụ lục 02 – Kế hoạch kiểm soát cúm mùa và cúm A 2026', type: 'Phụ lục', lang: 'Tiếng Việt', ext: 'PDF' },
];

const TabTaiVe = () => (
    <div className="space-y-3">
        {FILES.map(f => (
            <div key={f.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 transition-colors">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[11px] shrink-0 ${f.ext === 'PDF' ? 'bg-red-500' : 'bg-blue-600'}`}>
                    {f.ext}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-800 line-clamp-2">{f.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{f.type} · {f.lang}</p>
                </div>
                {/* Download */}
                <a href="#" download
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 border border-blue-400 text-blue-600 rounded-lg text-[12px] font-semibold hover:bg-blue-50 transition-colors">
                    ↑ Tải về
                </a>
            </div>
        ))}
    </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const VanBanDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('noi-dung');
    const [copied, setCopied] = useState(false);
    const [tocOpen, setTocOpen] = useState(true);

    const doc = MOCK_DOC; // In real app: fetch by id
    const sb = STATUS_MAP[doc.status];

    const handleCopySoHieu = () => {
        navigator.clipboard.writeText(doc.soHieu).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="container mx-auto px-4 max-w-[1280px] pt-5">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-4">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <span className="cursor-pointer hover:text-blue-600">Văn bản pháp luật</span>
                    <ChevronRight size={12} />
                    <Link to="/van-ban/tim-kiem" className="hover:text-blue-600">Hệ thống VBQPPL</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium line-clamp-1 max-w-[320px]">{doc.soHieu}</span>
                </nav>

                {/* Back */}
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-[13px] text-blue-600 hover:text-blue-800 mb-5 transition-colors">
                    <ArrowLeft size={15} /> Quay lại danh sách
                </button>

                {/* ── Header card ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-0">
                    <h1 className="text-[20px] font-bold text-[#0f4c81] leading-snug mb-3">{doc.title}</h1>

                    <div className="flex flex-wrap items-center gap-3 text-[12px] mb-3">
                        {/* Số hiệu – copy */}
                        <button onClick={handleCopySoHieu}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                            {doc.soHieu}
                            {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                            {copied && <span className="text-green-500 text-[11px] font-normal">Đã sao chép</span>}
                        </button>

                        {/* Badge */}
                        <span className={`inline-block px-2.5 py-0.5 rounded border text-[11px] font-semibold ${sb.cls}`}>{sb.label}</span>

                        {/* Badge "Đã kiểm tra" */}
                        <span className="inline-block px-2.5 py-0.5 rounded border border-blue-200 text-[11px] font-semibold bg-blue-50 text-blue-700">
                            ✓ Đã kiểm tra
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[12px] text-gray-500">
                        <span>Ngày có hiệu lực: <strong className="text-gray-700">{doc.ngayHieuLuc}</strong></span>
                        <span>Ngày cập nhật: <strong className="text-gray-700">{doc.ngayCapNhat}</strong></span>
                    </div>

                    {/* Tab bar */}
                    <div className="flex gap-0 mt-5 border-b border-gray-200 -mx-5 px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}>
                                    <Icon size={14} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Tab content ── */}
                <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 shadow-sm p-5">
                    {activeTab === 'noi-dung'    && <TabNoiDung tocOpen={tocOpen} setTocOpen={setTocOpen} />}
                    {activeTab === 'thuoc-tinh'  && <TabThuocTinh doc={doc} />}
                    {activeTab === 'luoc-do'     && <TabLuocDo doc={doc} />}
                    {activeTab === 'van-ban-goc' && <TabVanBanGoc />}
                    {activeTab === 'van-ban-lq'  && <TabVanBanLienQuan navigate={navigate} />}
                    {activeTab === 'tai-ve'      && <TabTaiVe />}
                </div>
            </div>
        </div>
    );
};

export default VanBanDetailPage;

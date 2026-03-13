import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, File, FileCode2, Eye, Download, FileText } from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const ORGS = ['Bộ Tư pháp', 'Bộ Công an', 'Bộ Tài chính', 'Chính phủ', 'Bộ Y tế'];

const MOCK_BAO_CAO = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Báo cáo tiếp thu, giải trình ý kiến góp ý Dự thảo Luật ${['Dữ liệu', 'Thuế', 'Đất đai', 'Giao thông', 'Bảo hiểm'][i % 5]} (sửa đổi)`,
    org: ORGS[i % ORGS.length],
    date: `0${(i % 9) + 1}/03/2026`,
    type: i % 3 === 0 ? 'DOCX' : 'PDF'
}));

// ── Components ────────────────────────────────────────────────────────────────
const Pagination = ({ current, total, onChange }) => (
    <div className="flex flex-wrap justify-center items-center gap-1.5 mt-8">
        <button onClick={() => onChange(current - 1)} disabled={current === 1}
            className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
            <ChevronLeft size={13} /> Trước
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => onChange(p)}
                className={`w-8 h-8 rounded text-[12px] font-semibold border ${current === p ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'}`}>
                {p}
            </button>
        ))}
        <button onClick={() => onChange(current + 1)} disabled={current === total}
            className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1">
            Sau <ChevronRight size={13} />
        </button>
    </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const BaoCaoTiepThuPage = () => {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const filtered = MOCK_BAO_CAO.filter(b => !keyword || b.title.toLowerCase().includes(keyword.toLowerCase()));
    const totalPages = Math.ceil(filtered.length / perPage) || 1;
    const items = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-16">
            {/* Header */}
            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px]">
                    <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                        Báo cáo tiếp thu, giải trình
                        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                    </h1>
                    <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                        Danh sách đầy đủ các báo cáo tiếp thu và giải trình ý kiến góp ý dự thảo văn bản QPPL do cơ quan soạn thảo công bố.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-[1280px] pt-6">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-6">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <Link to="/du-thao" className="hover:text-blue-600">Dự thảo VBQPPL</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium">Báo cáo tiếp thu giải trình</span>
                </nav>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 pb-6 border-b border-gray-100">
                        <div className="relative w-full sm:w-[400px]">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={keyword} onChange={e => setKeyword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition-colors"
                                placeholder="Tìm kiếm tên báo cáo..." />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-gray-500 italic">Có {filtered.length} báo cáo</span>
                        </div>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500 text-[15px]">Không tìm thấy báo cáo phù hợp.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(doc => (
                                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 p-3 -mx-3 rounded-lg transition-colors group">
                                    <div className="shrink-0 pt-1">
                                        {doc.type === 'PDF' ? <File size={32} className="text-red-500" /> : <FileCode2 size={32} className="text-blue-500" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/bao-cao-tiep-thu/${doc.id}`} className="text-[15px] font-bold text-[#0f4c81] hover:text-[#fdb714] leading-snug block mb-2 transition-colors">
                                            {doc.title}
                                        </Link>
                                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-500">
                                            <span className="flex items-center gap-1.5 font-medium"><span className="text-gray-400">Cơ quan:</span> {doc.org}</span>
                                            <span className="flex items-center gap-1.5"><span className="text-gray-400">Ngày ban hành:</span> {doc.date}</span>
                                            <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${doc.type==='PDF'?'bg-red-50 text-red-600':'bg-blue-50 text-blue-600'}`}>{doc.type}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3 shrink-0 items-center mt-2 sm:mt-0">
                                        <Link to={`/bao-cao-tiep-thu/${doc.id}`} className="flex items-center gap-2 px-4 py-1.5 bg-[#e4f0fc] text-[#1a3b8b] hover:bg-[#cbe0f5] rounded-full transition-colors text-[13px] font-semibold h-fit"><Eye size={15}/> Xem</Link>
                                        <button className="flex items-center gap-2 px-4 py-1.5 bg-[#e4f0fc] text-[#1a3b8b] hover:bg-[#cbe0f5] rounded-full transition-colors text-[13px] font-semibold h-fit"><Download size={15}/> Tải xuống</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {totalPages > 1 && <Pagination current={page} total={totalPages} onChange={setPage} />}
                </div>
            </div>
        </div>
    );
};

export default BaoCaoTiepThuPage;

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ZoomOut, ZoomIn, Search, FileCode2, Download, Building2, Calendar, FileText, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const DOC_DATA = {
    title: 'Báo cáo tiếp thu, giải trình ý kiến góp ý Dự thảo Luật Dữ liệu (sửa đổi)',
    org: 'Bộ Tư pháp',
    date: '15/03/2026',
    format: 'PDF',
    size: '1.2 MB'
};

const BAO_CAO_KHAC = [
    { id: 2, title: 'Báo cáo số 12/BC-BTP đánh giá tác động của Dự thảo', date: '10/02/2026' },
    { id: 3, title: 'Tờ trình Chính phủ về dự án Luật', date: '01/02/2026' }
];

// ── Components ────────────────────────────────────────────────────────────────
const PdfViewerPanel = () => {
    const [zoom, setZoom] = useState(100);
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col mt-6 shadow-sm">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex flex-wrap gap-3 items-center justify-between text-[13px] text-gray-600">
                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600"><ChevronLeftIcon size={16}/></button>
                    <input type="text" defaultValue="1" className="w-8 text-center font-bold outline-none border-none p-0 text-[13px] text-gray-800" />
                    <span className="text-gray-400">/ 12</span>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600"><ChevronRightIcon size={16}/></button>
                </div>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                    <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600"><ZoomOut size={16}/></button>
                    <span className="w-12 text-center font-bold text-[13px] text-gray-800">{zoom}%</span>
                    <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600"><ZoomIn size={16}/></button>
                </div>
                <div className="hidden sm:flex relative items-center flex-1 max-w-[250px]">
                    <Search size={14} className="absolute left-2.5 text-gray-400"/>
                    <input className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded text-[13px] outline-none focus:border-blue-400 shadow-inner bg-white" placeholder="Tìm kiếm trong tài liệu..." />
                </div>
            </div>
            {/* Fake Content Area */}
            <div className="bg-gray-200 h-[650px] overflow-auto p-4 md:p-8 flex justify-center custom-scrollbar">
                <div className="bg-white shadow-lg p-10 sm:p-14 transition-all w-full max-w-[800px]" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                    <h2 className="text-center font-bold text-[20px] mb-8 text-black">BÁO CÁO TIẾP THU, GIẢI TRÌNH</h2>
                    <h3 className="text-center font-semibold text-[15px] mb-10 text-black">Ý kiến góp ý đối với Dự thảo Luật Dữ liệu (sửa đổi)</h3>
                    
                    <p className="indent-8 text-justify leading-relaxed mb-4 text-[15px] text-black">
                        Thực hiện Nghị quyết số 123/NQ-CP ngày ..., Bộ Tư pháp đã phối hợp với các cơ quan liên quan tổ chức lấy ý kiến đối với Dự thảo Luật ...
                    </p>
                    <p className="indent-8 text-justify leading-relaxed mb-4 text-[15px] text-black">
                        <strong>1. Về phạm vi điều chỉnh:</strong><br/>
                        Có ý kiến đề nghị làm rõ khái niệm "dữ liệu công cộng". Bộ Tư pháp tiếp thu và chỉnh lý tại Khoản 2 Điều 3 của Dự thảo ...
                    </p>
                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 mt-12 rounded bg-gray-50/50">
                        <FileText size={48} className="mb-4 opacity-50"/>
                        <p>Trình xem tài liệu PDF Mockup</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Main Layout ───────────────────────────────────────────────────────────────
const BaoCaoTiepThuDetailPage = () => {
    const { id } = useParams();
    const doc = DOC_DATA;

    return (
        <div className="bg-[#f4f7fb] font-sans pb-16 min-h-screen">
            {/* Top Breadcrumb & Back */}
            <div className="bg-white border-b border-gray-200 shadow-sm py-3 mb-6 sticky top-0 z-50">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-4 items-center flex-wrap">
                    <Link to="/du-thao/1" className="flex items-center gap-1 text-[13px] font-semibold text-gray-600 hover:text-blue-700 transition-colors">
                        <ArrowLeft size={16} /> Quay lại
                    </Link>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <ChevronRight size={12} />
                        <Link to="/du-thao" className="hover:text-blue-600">Dự thảo VBQPPL</Link>
                        <ChevronRight size={12} />
                        <Link to="/du-thao/1" className="hover:text-blue-600">Dự thảo Luật Dữ liệu (sửa đổi)</Link>
                        <ChevronRight size={12} />
                        <span className="text-gray-800 font-medium line-clamp-1 max-w-[200px] sm:max-w-none">Báo cáo tiếp thu, giải trình</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px]">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* ── LEFT COLUMN (70%) ──────────────────────────────────── */}
                    <div className="lg:w-[70%] space-y-6">
                        
                        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                            <span className="inline-block px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wide rounded-md border border-red-100 mb-4">
                                Báo cáo tiếp thu, giải trình
                            </span>
                            
                            <h1 className="text-[24px] md:text-[28px] font-bold text-[#0f4c81] leading-tight mb-6">
                                {doc.title}
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-gray-50 border border-gray-100 rounded-lg">
                                <div className="flex flex-wrap gap-6 text-[13px]">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Building2 size={16} className="text-gray-400"/>
                                        <span className="font-semibold">Cơ quan ban hành:</span>
                                        <span className="text-gray-900 font-bold">{doc.org}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Calendar size={16} className="text-gray-400"/>
                                        <span className="font-semibold">Ngày ban hành:</span>
                                        <span className="text-gray-900">{doc.date}</span>
                                    </div>
                                </div>
                                
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#1a3b8b] text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md font-semibold text-[13px] shrink-0">
                                    <Download size={16} /> Tải về bản gốc
                                </button>
                            </div>

                            <PdfViewerPanel />
                        </div>

                    </div>

                    {/* ── RIGHT COLUMN (30%) - SIDEBAR ──────────────────────── */}
                    <div className="lg:w-[30%] space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-[80px]">
                            <h3 className="text-[15px] font-bold text-[#0f4c81] border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                                <FileText size={18} className="text-blue-500" />
                                Báo cáo khác của dự thảo này
                            </h3>
                            {BAO_CAO_KHAC.length > 0 ? (
                                <div className="space-y-4">
                                    {BAO_CAO_KHAC.map((draft) => (
                                        <div key={draft.id} className="pb-4 border-b border-gray-50 last:border-b-0 last:pb-0 hover:bg-gray-50/50 p-2 -mx-2 rounded transition-colors group">
                                            <Link to={`/bao-cao-tiep-thu/${draft.id}`} className="text-[13px] font-bold text-gray-700 group-hover:text-blue-600 block leading-snug mb-1.5 transition-colors">
                                                {draft.title}
                                            </Link>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                                <Calendar size={12}/> {draft.date}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[13px] text-gray-500 italic text-center py-4">Không có báo cáo nào khác.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BaoCaoTiepThuDetailPage;

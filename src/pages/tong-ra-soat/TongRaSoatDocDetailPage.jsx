import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowLeft, Download, FileText, User } from 'lucide-react';

const TongRaSoatDocDetailPage = () => {
    const { id } = useParams();

    // Mock document data
    const doc = {
        title: 'Quyết định về việc ban hành Kế hoạch triển khai rà soát hệ thống văn bản quy phạm pháp luật trên toàn quốc',
        date: '18/03/2026',
        issuingAgency: 'Ban Chỉ đạo Tổng rà soát',
        signer: 'Nguyễn Văn Lập',
        documentNumber: `QĐ-${id || '123'}/BCĐ`,
        content: `
KẾ HOẠCH
Triển khai rà soát hệ thống văn bản quy phạm pháp luật

I. MỤC ĐÍCH, YÊU CẦU
1. Mục đích
- Nắm bắt được thực trạng, tình hình hệ thống pháp luật hiện hành.
- Kịp thời phát hiện và xử lý các quy định mâu thuẫn, chồng chéo, bất cập hoặc không còn phù hợp với thực tiễn.

2. Yêu cầu
- Đảm bảo tính khách quan, toàn diện và khoa học trong quá trình rà soát.
- Có sự phối hợp đồng bộ, chặt chẽ giữa các Bộ, ngành, địa phương.

II. NỘI DUNG RÀ SOÁT
1. Rà soát, hệ thống hóa toàn bộ văn bản quy phạm pháp luật do Quốc hội, Ủy ban Thường vụ Quốc hội, Chính phủ, Thủ tướng Chính phủ, Bộ trưởng, Thủ trưởng cơ quan ngang bộ ban hành đang còn hiệu lực tính đến ngày 31/12/2025.
2. Lập danh mục các văn bản cần sửa đổi, bổ sung, thay thế hoặc bãi bỏ.

III. TỔ CHỨC THỰC HIỆN
- Các Bộ, cơ quan ngang bộ chủ động rà soát trong lĩnh vực thuộc phạm vi quản lý.
- Ủy ban nhân dân các tỉnh, thành phố trực thuộc Trung ương chỉ đạo thực hiện ở cấp địa phương.
- Giao Thường trực Ban Chỉ đạo đôn đốc, theo dõi và tổng hợp báo cáo.
        `,
        attachments: [
            { name: `Quyet_dinh_ban_hanh_ke_hoach_${id || '123'}.pdf`, size: '2.4 MB' },
            { name: 'Phu_luc_ds_van_ban_mau.docx', size: '1.1 MB' }
        ]
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] pb-12">
            {/* Header Banner */}
            <div className="bg-[#0a3a73] text-white pt-8 md:pt-12 pb-12 md:pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                    {/* Breadcrumb */}
                    <nav className="flex flex-wrap items-center gap-2 text-sm text-white/80 mb-6">
                        <Link to="/" className="hover:text-white">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <Link to="/tong-ra-soat" className="hover:text-white">Tổng rà soát</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Chi tiết văn bản</span>
                    </nav>

                    <Link to="/tong-ra-soat" className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-6 text-sm font-medium">
                        <ArrowLeft size={16} className="mr-2" /> Về trang Tổng rà soát
                    </Link>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-md">
                        {doc.title}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                    <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 pb-6 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={18} className="text-blue-600" />
                            <span className="font-medium">Ngày ban hành: {doc.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FileText size={18} className="text-blue-600" />
                            <span className="font-medium">Số hiệu: {doc.documentNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <User size={18} className="text-blue-600" />
                            <span className="font-medium">Người ký: {doc.signer}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line mb-10 text-[15px] md:text-base">
                        {doc.content}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <Download size={20} className="text-blue-600" />
                            Tài liệu đính kèm
                        </h3>
                        <div className="space-y-3">
                            {doc.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm hover:border-blue-300 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">{file.name}</p>
                                            <p className="text-xs text-gray-500">{file.size}</p>
                                        </div>
                                    </div>
                                    <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
                                        <Download size={16} /> <span className="hidden sm:inline">Tải về</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TongRaSoatDocDetailPage;

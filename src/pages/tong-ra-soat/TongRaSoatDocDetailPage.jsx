import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, Download, FileText, User } from 'lucide-react';

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
        <div className="min-h-screen bg-[#f4f7fb]">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 max-w-7xl pt-6 pb-4">
                <nav className="flex items-center flex-wrap gap-1.5 text-[13px] text-gray-500">

                    <Link to="/tong-ra-soat" className="hover:text-[#ea492a] transition-colors">Tổng rà soát VBQPPL</Link>
                    <ChevronRight size={13} className="text-gray-400" />
                    <Link to="/tong-ra-soat" state={{ activeTab: 'van-ban-tai-lieu' }} className="hover:text-[#ea492a] transition-colors">Văn bản, tài liệu</Link>
                    <ChevronRight size={13} className="text-gray-400" />
                    <span className="text-gray-800 font-medium line-clamp-1">{doc.title}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4 max-w-7xl pb-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                        {doc.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 pb-6 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={18} className="text-[#ea492a]" />
                            <span className="font-medium">Ngày ban hành: {doc.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FileText size={18} className="text-[#ea492a]" />
                            <span className="font-medium">Số hiệu: {doc.documentNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <User size={18} className="text-[#ea492a]" />
                            <span className="font-medium">Người ký: {doc.signer}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line mb-10 text-[15px] md:text-base">
                        {doc.content}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <Download size={20} className="text-[#ea492a]" />
                            Tài liệu đính kèm
                        </h3>
                        <div className="space-y-3">
                            {doc.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm hover:border-gray-300 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-50 text-[#ea492a] flex items-center justify-center shrink-0">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 group-hover:text-black transition-colors">{file.name}</p>
                                            <p className="text-xs text-gray-500">{file.size}</p>
                                        </div>
                                    </div>
                                    <button className="bg-gray-100 text-gray-700 hover:bg-[#ea492a] hover:text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
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

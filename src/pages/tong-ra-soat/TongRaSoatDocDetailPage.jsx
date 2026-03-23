import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowLeft, Download, FileText, User } from 'lucide-react';

const TongRaSoatDocDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
            {/* Header Banner */}
            <div className="bg-[#e21414] text-white pt-8 md:pt-12 pb-12 md:pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute inset-0 opacity-100 mix-blend-screen pointer-events-none z-0" style={{ backgroundImage: "url('/trong_dong_gold2.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    {/* Nút quay về chuyên mục thay cho breadcrumb */}
                    <div className="mb-6">
                        <Link to="/tong-ra-soat" state={{ activeTab: 'tin-tuc-hoat-dong' }} className="inline-flex items-center text-black bg-white hover:bg-gray-50 transition-colors font-bold px-4 py-2 rounded-lg shadow-sm">
                            <ArrowLeft size={16} className="mr-2" /> Quay về Trang chủ Chuyên mục
                        </Link>
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-md">
                        {doc.title}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                    <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 pb-6 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={18} className="text-black" />
                            <span className="font-medium">Ngày ban hành: {doc.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FileText size={18} className="text-black" />
                            <span className="font-medium">Số hiệu: {doc.documentNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <User size={18} className="text-black" />
                            <span className="font-medium">Người ký: {doc.signer}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line mb-10 text-[15px] md:text-base">
                        {doc.content}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <Download size={20} className="text-black" />
                            Tài liệu đính kèm
                        </h3>
                        <div className="space-y-3">
                            {doc.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm hover:border-gray-500 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 group-hover:text-black transition-colors">{file.name}</p>
                                            <p className="text-xs text-gray-500">{file.size}</p>
                                        </div>
                                    </div>
                                    <button className="bg-gray-100 text-black hover:bg-black hover:text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
                                        <Download size={16} /> <span className="hidden sm:inline">Tải về</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Footer cho trang Tổng Rà Soát */}
            <div className="relative w-full mt-0 mb-0 flex items-center justify-center overflow-hidden border-t-4 border-yellow-500 bg-[#e21414] shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)] h-[100px]">
                {/* Background giống Header */}
                <div className="absolute inset-0 opacity-100 pointer-events-none" style={{ backgroundImage: "url('/trong_dong_gold2.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>

                <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center justify-center h-full">
                    {/* Khối chứa Quốc huy và Tiêu đề (1 dòng) */}
                    <div className="flex items-center justify-center gap-3 md:gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Vietnam.svg/1200px-Emblem_of_Vietnam.svg.png"
                            alt="Quốc huy Việt Nam"
                            className="w-[35px] h-[35px] md:w-[45px] md:h-[45px] object-contain drop-shadow-md"
                        />
                        <h2 className="font-basic text-[15px] md:text-[16px] lg:text-[18px] text-white uppercase drop-shadow-md whitespace-nowrap leading-none mt-1">
                            TỔNG RÀ SOÁT HỆ THỐNG VĂN BẢN QUY PHẠM PHÁP LUẬT
                        </h2>
                    </div>
                </div>
            </div>

            {/* Nút Home Floating Góc Trái Dưới (Mở rộng chữ khi hover + Icon Quốc huy) */}
            <button
                onClick={() => navigate('/')}
                className="fixed bottom-6 left-6 z-50 h-12 min-w-[48px] px-[10px] flex items-center justify-center bg-[#da121a] hover:bg-yellow-500 text-white hover:text-[#0a3a73] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                title="Về Trang chủ Cổng Pháp luật Quốc gia"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Vietnam.svg/1200px-Emblem_of_Vietnam.svg.png"
                    alt="Quốc huy"
                    className="w-[28px] h-[28px] object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[400px] group-hover:opacity-100 group-hover:px-2 transition-all duration-500 ease-in-out font-bold text-[14px]">
                    Về trang chủ Cổng pháp luật quốc gia
                </span>
            </button>
        </div>
    );
};

export default TongRaSoatDocDetailPage;

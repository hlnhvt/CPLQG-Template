import React from 'react';
import { Link } from 'react-router-dom';

const NewlyIssuedDocs = () => {
    const docs = [
        { date: '19/03/2026', title: 'Quyết định 369/QĐ-BXD của Bộ Xây dựng ban hành Kế hoạch của Bộ Xây dựng triển khai Đề án chuyển đổi số trong hoạt động xây dựng, quản lý, khai thác kết cấu hạ tầng xây dựng' },
        { date: '18/03/2026', title: 'Quyết định 618/QĐ-BGDĐT của Bộ Giáo dục và Đào tạo về việc công bố thủ tục hành chính được thay thế lĩnh vực thi, tuyển sinh thuộc phạm vi chức năng quản lý của Bộ Giáo dục và Đào tạo' },
        { date: '18/03/2026', title: 'Quyết định 363/QĐ-BXD của Ban Chỉ đạo của Bộ Xây dựng về phát triển khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề án 06 ban hành Kế hoạch hoạt động năm 2026 của Ban Chỉ đạo của Bộ Xây dựng về phát triển khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề...' },
        { date: '18/03/2026', title: 'Thông tư 14/2026/TT-BGDĐT của Bộ Giáo dục và Đào tạo ban hành Chương trình giáo dục phổ thông môn Tiếng Raglai cấp Tiểu học' }
    ];

    return (
        <div className="container mx-auto px-4 pt-6 pb-4">
            <h2 className="text-[28px] font-bold text-[#1e3a8a] mb-4">Văn bản mới ban hành</h2>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Documents List */}
                <div className="flex-1 lg:max-w-none">
                    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col h-[413px]">
                        {/* Table Header */}
                        <div className="flex bg-[#1e3a8a] text-white text-[15px] font-bold py-3.5 px-6 shrink-0">
                            <div className="w-[180px] shrink-0">Ngày ban hành</div>
                            <div className="flex-1">Nội dung</div>
                        </div>
                        {/* Table Body */}
                        <ul className="flex flex-col flex-1 overflow-y-auto bg-white">
                            {docs.map((doc, index) => (
                                <Link to={`/van-ban/${index + 1}`} key={index} className="flex text-[14px] py-4 px-6 border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition cursor-pointer group items-center flex-1">
                                    <div className="w-[180px] shrink-0 font-semibold text-gray-800">{doc.date}</div>
                                    <div className="flex-1 text-gray-600 line-clamp-3 group-hover:text-blue-700 leading-relaxed font-medium">{doc.title}</div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column - Highlight Banners */}
                <div className="flex flex-col gap-4 w-full lg:w-[412.66px] shrink-0 h-[412.66px]">
                    <Link to="/tong-ra-soat" state={{ activeTab: 'tin-tuc-hoat-dong' }} className="rounded-xl overflow-hidden shadow-sm relative group block w-full flex-[2] bg-red-800 outline-none focus:ring-2 focus:ring-blue-400">
                        <img
                            src="/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg"
                            alt="Đại hội Đảng"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </Link>
                    <Link to="/tong-ra-soat" state={{ activeTab: 'tin-tuc-hoat-dong' }} className="rounded-xl overflow-hidden shadow-sm relative group block w-full flex-[1] bg-red-800 outline-none focus:ring-2 focus:ring-blue-400">
                        <img
                            src="/BO NHAN DIEN TONG RA SOAT/1200x400 Banner Trang chu.jpg"
                            alt="Tổng rà soát văn bản quy phạm pháp luật"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewlyIssuedDocs;

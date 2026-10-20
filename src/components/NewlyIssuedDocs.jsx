import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const docs = [
    { date: '19/03/2026', title: 'Quyết định 369/QĐ-BXD của Bộ Xây dựng ban hành Kế hoạch của Bộ Xây dựng triển khai Đề án chuyển đổi số trong hoạt động xây dựng, quản lý, khai thác kết cấu hạ tầng xây dựng' },
    { date: '18/03/2026', title: 'Quyết định 618/QĐ-BGDĐT của Bộ Giáo dục và Đào tạo về việc công bố thủ tục hành chính được thay thế lĩnh vực thi, tuyển sinh thuộc phạm vi chức năng quản lý của Bộ Giáo dục và Đào tạo' },
    { date: '18/03/2026', title: 'Quyết định 363/QĐ-BXD của Ban Chỉ đạo của Bộ Xây dựng về phát triển khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề án 06 ban hành Kế hoạch hoạt động năm 2026 của Ban Chỉ đạo của Bộ Xây dựng về phát triển khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề...' },
    { date: '18/03/2026', title: 'Thông tư 14/2026/TT-BGDĐT của Bộ Giáo dục và Đào tạo ban hành Chương trình giáo dục phổ thông môn Tiếng Raglai cấp Tiểu học' }
];

const drafts = [
    { date: '20/03/2026', deadline: '20/05/2026', title: 'Dự thảo Luật sửa đổi, bổ sung một số điều của Luật Đất đai nhằm tháo gỡ vướng mắc trong quản lý' },
    { date: '19/03/2026', deadline: '19/05/2026', title: 'Dự thảo Nghị định quy định chi tiết một số điều của Luật Nhà ở và quản lý phát triển nhà ở xã hội' },
    { date: '18/03/2026', deadline: '18/05/2026', title: 'Dự thảo Thông tư hướng dẫn về quản lý tài chính đối với các chương trình, dự án sử dụng nguồn vốn ODA' },
    { date: '17/03/2026', deadline: '17/05/2026', title: 'Dự thảo Quyết định của Thủ tướng Chính phủ về việc ban hành danh mục công nghệ cao được ưu tiên đầu tư phát triển' }
];

const SectionTitle = ({ title, to, moreLabel }) => (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-gray-200">
        <h2 className="text-[18px] md:text-[22px] font-bold pb-3 border-b-[3px] -mb-[2px] text-[#1e3a8a] border-[#1e3a8a]">{title}</h2>
        <Link to={to} className="group/more inline-flex items-center gap-1 text-[14px] font-semibold text-[#1e3a8a] hover:text-blue-700 pb-3">
            {moreLabel}
            <ArrowRight size={15} className="group-hover/more:translate-x-0.5 transition-transform" />
        </Link>
    </div>
);

// Văn bản mới ban hành và Dự thảo VBQPPL là 2 khối riêng, xếp dọc (không dùng tab)
const NewlyIssuedDocs = () => (
    <div className="container mx-auto px-4 pt-6 pb-4 space-y-8">
        {/* ---- Văn bản mới ban hành ---- */}
        <section>
            <SectionTitle title="Văn bản mới ban hành" to="/van-ban" moreLabel="Xem tất cả văn bản" />
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 lg:max-w-none">
                    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col h-[413px]">
                        <div className="flex bg-[#1e3a8a] text-white text-[15px] font-bold py-3.5 px-6 shrink-0">
                            <div className="w-[140px] shrink-0">Ngày ban hành</div>
                            <div className="flex-1">Nội dung</div>
                        </div>
                        <ul className="flex flex-col flex-1 overflow-y-auto bg-white">
                            {docs.map((item, index) => (
                                <Link to={`/van-ban/${index + 1}`} key={index} className="flex text-[14px] py-4 px-6 border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition cursor-pointer group items-center flex-1 gap-4 lg:gap-0">
                                    <div className="w-[140px] shrink-0 font-semibold text-gray-800">{item.date}</div>
                                    <div className="flex-1 text-gray-600 line-clamp-3 group-hover:text-blue-700 leading-relaxed font-medium">{item.title}</div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>

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
        </section>

        {/* ---- Dự thảo VBQPPL (ngay dưới khối Văn bản mới ban hành) ---- */}
        <section>
            <SectionTitle title="Dự thảo VBQPPL" to="/du-thao" moreLabel="Xem tất cả dự thảo" />
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                <div className="flex bg-[#1e3a8a] text-white text-[15px] font-bold py-3.5 px-6">
                    <div className="w-[140px] shrink-0">Ngày đăng</div>
                    <div className="w-[140px] shrink-0">Hạn góp ý</div>
                    <div className="flex-1">Nội dung</div>
                </div>
                <ul className="flex flex-col bg-white">
                    {drafts.map((item, index) => (
                        <Link to={`/du-thao/${index + 1}`} key={index} className="flex text-[14px] py-4 px-6 border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition cursor-pointer group items-center gap-4 lg:gap-0">
                            <div className="w-[140px] shrink-0 font-semibold text-gray-800">{item.date}</div>
                            <div className="w-[140px] shrink-0 font-semibold text-gray-800">{item.deadline}</div>
                            <div className="flex-1 text-gray-600 line-clamp-2 group-hover:text-blue-700 leading-relaxed font-medium">{item.title}</div>
                        </Link>
                    ))}
                </ul>
            </div>
        </section>
    </div>
);

export default NewlyIssuedDocs;

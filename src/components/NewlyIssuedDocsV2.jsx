import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Eye, MessageSquare, ChevronRight, FileText } from 'lucide-react';

const NewlyIssuedDocsV2 = () => {

    const docs = [
        { date: '19/03/2026', title: 'Quyết định 369/QĐ-BXD của Bộ Xây dựng ban hành Kế hoạch của Bộ Xây dựng triển khai Đề án chuyển đổi số trong hoạt động xây dựng, quản lý, khai thác kết cấu hạ tầng xây dựng' },
        { date: '18/03/2026', title: 'Quyết định 618/QĐ-BGDĐT của Bộ Giáo dục và Đào tạo về việc công bố thủ tục hành chính được thay thế lĩnh vực thi, tuyển sinh thuộc phạm vi chức năng quản lý của Bộ Giáo dục và Đào tạo' },
        { date: '18/03/2026', title: 'Quyết định 363/QĐ-BXD của Ban Chỉ đạo của Bộ Xây dựng về phát triển khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề án 06 ban hành Kế hoạch hoạt động năm 2026' },
        { date: '18/03/2026', title: 'Thông tư 14/2026/TT-BGDĐT của Bộ Giáo dục và Đào tạo ban hành Chương trình giáo dục phổ thông môn Tiếng Raglai cấp Tiểu học' },
    ];

    const drafts = [
        {
            id: 1,
            title: 'Dự thảo Nghị định sửa đổi, bổ sung một số điều của Nghị định số 126/2024/NĐ-CP ngày 08/10/2024 của Chính phủ về tổ chức, hoạt động và quản lý hội',
            date: '20/03/2026',
            deadline: '20/05/2026'
        },
        {
            id: 2,
            title: 'Dự thảo Nghị định về tiêu chuẩn, điều kiện lựa chọn, thủ tục xem xét chấp thuận đối với kiểm toán viên hành nghề, tổ chức kiểm toán được thực hiện kiểm toán cho đơn vị có lợi ích công chúng',
            date: '19/03/2026',
            deadline: '19/05/2026'
        },
        {
            id: 3,
            title: 'Dự thảo Nghị định quy định về quản lý mỹ phẩm',
            date: '18/03/2026',
            deadline: '18/05/2026'
        },
        {
            id: 4,
            title: 'Dự thảo Thông tư sửa đổi, bổ sung một số điều của Thông tư số 42/2020/TT-BTC quy định các chỉ tiêu thông tin, mẫu chứng từ để thực hiện thủ tục quá cảnh hàng hóa theo quy định tại Nghị định',
            date: '17/03/2026',
            deadline: '17/05/2026'
        },
        {
            id: 5,
            title: 'Dự thảo Nghị định quy định chi tiết một số điều của Luật Trật tự, an toàn giao thông đường bộ và Luật Đường bộ về đăng ký, thu hồi phương tiện giao thông cơ giới đường bộ',
            date: '16/03/2026',
            deadline: '16/05/2026'
        },
    ];

    return (
        <div className="container mx-auto px-4 max-w-[1504px] pt-8 pb-4 font-sans">

            {/* ===== BLOCK 1: Văn bản mới ban hành + Right Banners ===== */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">

                {/* Left: Newly Issued Docs Table */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col h-[413px]">
                        {/* Table header */}
                        <div className="flex bg-[#1e3a8a] text-white text-[15px] font-bold py-3.5 px-6 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <FileText size={16} className="opacity-80" />
                                <span>Văn bản mới ban hành</span>
                            </div>
                        </div>
                        <div className="flex bg-slate-50 border-b border-gray-100 text-[13px] font-semibold text-slate-500 py-2.5 px-6 shrink-0">
                            <div className="w-[140px] shrink-0">Ngày ban hành</div>
                            <div className="flex-1">Nội dung</div>
                        </div>

                        <ul className="flex flex-col flex-1 overflow-y-auto bg-white divide-y divide-gray-100">
                            {docs.map((item, index) => (
                                <Link
                                    to={`/van-ban/${index + 1}`}
                                    key={index}
                                    className="flex text-[14px] py-3.5 px-6 hover:bg-blue-50/40 transition cursor-pointer group items-center gap-4 lg:gap-0"
                                >
                                    <div className="w-[140px] shrink-0 font-semibold text-gray-700 text-[13px]">{item.date}</div>
                                    <div className="flex-1 text-gray-600 line-clamp-2 group-hover:text-blue-700 leading-relaxed font-medium">{item.title}</div>
                                </Link>
                            ))}
                        </ul>

                        {/* Footer link */}
                        <div className="border-t border-gray-100 px-6 py-3 shrink-0 bg-white flex justify-end">
                            <Link to="/van-ban/moi-ban-hanh" className="text-[13px] font-semibold text-[#1e3a8a] hover:text-blue-600 flex items-center gap-1 transition-colors">
                                Xem tất cả <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right: Highlight Banners */}
                <div className="flex flex-col gap-4 w-full lg:w-[412.66px] shrink-0 h-[413px]">
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

            {/* ===== BLOCK 2: Dự thảo VBQPPL — full-width, separate section ===== */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                {/* Section header */}
                <div className="flex items-center justify-between bg-[#155a8a] text-white py-3.5 px-6">
                    <div className="flex items-center gap-2.5">
                        <MessageSquare size={16} className="opacity-80" />
                        <span className="text-[15px] font-bold">Dự thảo VBQPPL</span>
                    </div>
                </div>

                {/* Column headers */}
                <div className="flex bg-slate-50 border-b border-gray-100 text-[13px] font-semibold text-slate-500 py-2.5 px-6">
                    <div className="w-[105px] shrink-0">Ngày đăng</div>
                    <div className="w-[105px] shrink-0">Hạn góp ý</div>
                    <div className="flex-1 px-2 min-w-0">Nội dung dự thảo</div>
                    <div className="w-[420px] shrink-0 text-left pl-2">Thao tác</div>
                </div>

                {/* Rows */}
                <ul className="divide-y divide-gray-100">
                    {drafts.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex text-[14px] py-3.5 px-6 hover:bg-blue-50/30 transition items-center"
                        >
                            {/* Date */}
                            <div className="w-[105px] shrink-0 font-medium text-gray-500 text-[13px]">{doc.date}</div>

                            {/* Deadline - highlighted */}
                            <div className="w-[105px] shrink-0">
                                <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 font-semibold text-[12px] px-2.5 py-0.5 rounded-full">
                                    {doc.deadline}
                                </span>
                            </div>

                            {/* Title */}
                            <div className="flex-1 px-2 min-w-0 overflow-hidden">
                                <Link
                                    to={`/du-thao/${doc.id}`}
                                    className="text-slate-700 hover:text-blue-700 font-medium leading-snug line-clamp-2 transition-colors"
                                >
                                    {doc.title}
                                </Link>
                            </div>

                            {/* Actions — plain text labels, no tooltips */}
                            <div className="w-[420px] shrink-0 flex items-center justify-start gap-1.5 pl-2">
                                <Link
                                    to={`/du-thao/${doc.id}`}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition text-[12px] font-semibold whitespace-nowrap"
                                >
                                    <Eye size={13} />
                                    Xem toàn văn
                                </Link>
                                <Link
                                    to={`/du-thao/${doc.id}#gop-y`}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700 transition text-[12px] font-semibold whitespace-nowrap"
                                >
                                    <MessageSquare size={13} />
                                    Xem góp ý
                                </Link>
                                <Link
                                    to={`/du-thao/${doc.id}#gop-y`}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition text-[12px] font-semibold whitespace-nowrap"
                                >
                                    <Mail size={13} />
                                    Gửi góp ý
                                </Link>
                                <button
                                    onClick={() => alert('Đang tải xuống tài liệu dự thảo...')}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition text-[12px] font-semibold whitespace-nowrap"
                                >
                                    <Download size={13} />
                                    Tải xuống
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
                <div className="flex justify-end px-6 py-3 border-t border-gray-100 bg-slate-50/80">
                    <Link to="/du-thao" className="text-[13px] font-semibold text-[#155a8a] hover:text-blue-700 flex items-center gap-1 transition-colors">
                        Xem tất cả <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewlyIssuedDocsV2;

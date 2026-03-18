import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ShieldCheck, FileText, Globe, Gavel, Users, Building, Download, Database, CheckCircle2 } from 'lucide-react';

const ChucNangNhiemVuPage = () => {
    return (
        <div className="bg-[#f0f2f5] min-h-screen font-sans">

            {/* HERO SECTION - FORMAL */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-16 pb-16 relative">
                {/* Subtle overlay pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[500px] h-full overflow-hidden opacity-5 pointer-events-none">
                    <img src="/logo.png" alt="Quốc huy mờ" className="w-[800px] h-[800px] object-cover absolute -right-40 -top-40 max-w-none" />
                </div>

                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">

                    <div className="max-w-4xl">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">Chức năng & Nhiệm vụ</h1>
                        <p className="text-blue-100 text-lg leading-relaxed max-w-3xl opacity-90 border-l-4 border-yellow-400 pl-4 py-1">
                            Quy định chi tiết về vị trí, vai trò, chức năng và các nhiệm vụ trọng tâm của Cổng Thông tin pháp luật quốc gia trong việc cung cấp thông tin, hỗ trợ pháp lý và thúc đẩy chuyển đổi số ngành Tư pháp.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-8 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT CONTENT */}
                    <div className="flex-1 space-y-8">

                        {/* 1. VỊ TRÍ, CHỨC NĂNG */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" id="vi-tri-chuc-nang">
                            <div className="bg-gray-50 uppercase text-[#0f4c81] font-bold text-lg px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                                <ShieldCheck size={22} className="text-blue-600" />
                                I. Vị trí và Chức năng
                            </div>
                            <div className="p-6 md:p-8">
                                <p className="text-gray-700 leading-relaxed mb-6 font-medium text-[15px] bg-blue-50/50 p-4 border-l-4 border-blue-600 rounded-r-lg text-justify">
                                    Cổng Thông tin pháp luật quốc gia là hệ thống thông tin chính thống của Chính phủ, do Bộ Tư pháp quản lý, có chức năng tích hợp, kết nối và chia sẻ thông tin pháp luật, hỗ trợ pháp lý và cung cấp dịch vụ công trực tuyến liên quan đến lĩnh vực Tư pháp trên phạm vi toàn quốc.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-gray-200 p-4 rounded-lg flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                            <Globe size={20} className="text-blue-700" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-[15px] mb-1">Cổng giao tiếp duy nhất</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">Đầu mối truy cập duy nhất trên môi trường mạng để người dân, tổ chức tìm kiếm mọi thông tin pháp luật.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 p-4 rounded-lg flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                            <Database size={20} className="text-blue-700" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-[15px] mb-1">Cơ sở dữ liệu tập trung</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">Nền tảng tích hợp toàn bộ VBQPPL, án lệ, và các tài liệu hướng dẫn áp dụng pháp luật.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. NHIỆM VỤ TRỌNG TÂM */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" id="nhiem-vu">
                            <div className="bg-gray-50 uppercase text-[#0f4c81] font-bold text-lg px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                                <Gavel size={22} className="text-blue-600" />
                                II. Nhiệm vụ và Quyền hạn
                            </div>

                            <div className="p-0">
                                {/* Task 1 */}
                                <div className="p-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors flex gap-5">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 text-blue-700 font-bold text-xl">
                                        01
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-[16px] mb-2">Cập nhật và Thông tin Văn bản Pháp luật</h3>
                                        <ul className="space-y-2 text-[15px] text-gray-600 leading-relaxed text-justify">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Cập nhật kịp thời, đầy đủ, chính xác các văn bản quy phạm pháp luật do các cơ quan nhà nước ở Trung ương và địa phương ban hành.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Công bố danh mục văn bản hết hiệu lực, văn bản bị bãi bỏ hoặc thay thế.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Task 2 */}
                                <div className="p-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors flex gap-5">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 text-blue-700 font-bold text-xl">
                                        02
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-[16px] mb-2">Hỗ trợ & Giao tiếp Người dân, Doanh nghiệp</h3>
                                        <ul className="space-y-2 text-[15px] text-gray-600 leading-relaxed text-justify">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Thiết lập kênh tiếp nhận, giải đáp vướng mắc pháp lý cho người dân, tổ chức và doanh nghiệp thông qua hệ thống Hỏi - Đáp.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Kết nối hệ thống chuyên gia tư vấn pháp luật, cung cấp các tiện ích đặt lịch hẹn trực tuyến.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Task 3 */}
                                <div className="p-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors flex gap-5">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 text-blue-700 font-bold text-xl">
                                        03
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-[16px] mb-2">Phổ biến, Giáo dục Pháp luật & Nghiên cứu</h3>
                                        <ul className="space-y-2 text-[15px] text-gray-600 leading-relaxed text-justify">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Đăng tải các tài liệu, ấn phẩm phổ biến pháp luật, video hướng dẫn và các khóa học pháp lý trực tuyến.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Tạo lập diễn đàn Nghiên cứu - Trao đổi, ghi nhận các bài nghiên cứu về khoa học pháp lý từ các chuyên gia.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Task 4 */}
                                <div className="p-6 hover:bg-gray-50/50 transition-colors flex gap-5">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 text-blue-700 font-bold text-xl">
                                        04
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-[16px] mb-2">Chuyển đổi số ngành Tư pháp</h3>
                                        <ul className="space-y-2 text-[15px] text-gray-600 leading-relaxed text-justify">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-blue-500 mt-1 shrink-0" />
                                                Ứng dụng các công nghệ tiên tiến (AI, Big Data) để hỗ trợ tìm kiếm ngữ nghĩa, gợi ý văn bản cá nhân hóa và quản lý hồ sơ pháp lý điện tử.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR - TABLE OF CONTENTS / LINKS */}
                    <aside className="w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col">

                        {/* TOC */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
                            <h3 className="font-bold text-[#0f4c81] text-[15px] mb-4 uppercase tracking-wider relative inline-block">
                                Danh mục nội dung
                                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-yellow-400"></span>
                            </h3>
                            <nav className="space-y-1">
                                <a href="#vi-tri-chuc-nang" className="block px-3 py-2 text-[14px] font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                    I. Vị trí và Chức năng
                                </a>
                                <a href="#nhiem-vu" className="block px-3 py-2 text-[14px] font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                    II. Nhiệm vụ trọng tâm
                                </a>
                            </nav>
                        </div>

                        {/* Co quan chu quan */}
                        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-xl shadow-sm text-white p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-10 -mr-16 -mt-16"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <img src="/logo.png" alt="Bộ Tư Pháp" className="w-20 h-20 mb-4 drop-shadow-lg" />
                                <h3 className="font-bold text-lg mb-1 uppercase text-yellow-400">Cơ quan chủ quản</h3>
                                <p className="font-bold text-xl mb-4">BỘ TƯ PHÁP</p>
                                <div className="w-12 h-0.5 bg-blue-400 mb-4 opacity-50"></div>
                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Cổng Pháp luật quốc gia thuộc hệ thống thông tin chính phủ phục vụ nhân dân và doanh nghiệp.
                                </p>
                            </div>
                        </div>

                        {/* Related Docs */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <h3 className="font-bold text-[#0f4c81] text-[15px] mb-4 uppercase tracking-wider">Tài liệu tham khảo</h3>
                            <div className="space-y-3">
                                <a href="#" className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-colors group">
                                    <FileText size={20} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-700 leading-tight">Quyết định phê duyệt Đề án Cổng Pháp luật quốc gia</p>
                                        <span className="text-[11px] text-gray-500">PDF, 1.2 MB</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>

        </div>
    );
};

export default ChucNangNhiemVuPage;

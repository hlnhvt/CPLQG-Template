import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Globe, Sparkles, Shield, Cpu, Zap, Printer, Share2, Facebook, FileText, ArrowUpRight } from 'lucide-react';

const AI_DATA = {
    'cls': {
        id: 'cls',
        title: 'C-AI Legal',
        shortDesc: 'Hệ thống Trợ lý ảo AI thông minh giúp rà soát mâu thuẫn, kiểm tra tính hợp pháp và tính đồng bộ của hệ thống văn bản pháp luật.',
        logo: '/BO NHAN DIEN TONG RA SOAT/COpenAIlogo.svg',
        url: 'https://cls.cmcai.vn/',
        color: 'red',
        gradient: 'from-red-500 to-orange-600',
        manuals: [
            {
                title: 'Hướng dẫn sử dụng phân hệ Rà soát mâu thuẫn văn bản quy phạm pháp luật trên hệ thống C-AI Legal (CLS)',
                file: '/BO NHAN DIEN TONG RA SOAT/HDSD_CAI_Legal_Phan_he_Ra_soat_Mau_thuan_1775822394861.pdf'
            },
            {
                title: 'Tài liệu giới thiệu giải pháp mô hình CMC-AI-Legal-32B và bộ chuẩn đánh giá AI pháp lý VLegal-Bench',
                file: '/BO NHAN DIEN TONG RA SOAT/Tai_lieu_Ky_thuat_VLegalBench_CMC_OpenAI_1775822415291.pdf'
            }
        ],
        content: `
            <h4 class="text-base font-bold text-gray-800 mt-0 mb-3">
                1. TỔNG QUAN SẢN PHẨM
            </h4>
            <p class="text-base text-justify leading-relaxed mb-6 text-gray-700">
                C-AI Legal là nền tảng trí tuệ nhân tạo pháp lý do CMC OpenAI nghiên cứu và phát triển. Giải pháp được xây dựng chuyên biệt cho hệ thống pháp luật Việt Nam, tự động hóa quy trình quản lý, rà soát và hệ thống hóa văn bản quy phạm pháp luật ở quy mô lớn. Giải pháp giúp các Bộ, ngành, địa phương hoàn thành nhiệm vụ pháp chế nhanh chóng, chính xác và tiết kiệm nguồn lực đáng kể so với phương thức truyền thống.
            </p>

            <h4 class="text-base font-bold text-gray-800 mt-8 mb-3">
                2. ĐƯỜNG DẪN TRUY CẬP VÀ QR HƯỚNG DẪN
            </h4>
            
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 mb-8">
                <!-- Left Column: Links and Registration info -->
                <div class="md:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div class="bg-[#0c3e7d] px-6 py-4 flex items-center gap-3">
                        <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <span class="text-white font-bold text-[16px] uppercase tracking-wide">Truy cập sản phẩm</span>
                    </div>
                    <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <h5 class="text-[12px] font-bold text-gray-400 uppercase mb-2">Link sản phẩm</h5>
                            <a href="https://cls.cmcai.vn/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between bg-[#f4f7fb] hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 group transition-all duration-300">
                                <span class="text-[#0c3e7d] font-bold text-[15px] break-all select-all">https://cls.cmcai.vn/</span>
                                <span class="w-8 h-8 rounded-full bg-[#ea492a] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300">
                                    <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </span>
                            </a>

                            <h5 class="text-[12px] font-bold text-gray-400 uppercase mt-6 mb-2">Đăng ký sử dụng cho đợt tổng rà soát VBQPPL</h5>
                            <p class="text-sm text-gray-500 mb-4 leading-relaxed">
                                Cơ quan, tổ chức có nhu cầu đăng ký tài khoản vui lòng liên hệ:
                            </p>
                            <div class="space-y-4">
                                <!-- Contact Row 1 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Người liên hệ</p>
                                        <p class="font-bold text-slate-800 text-sm">Bà Nguyễn Thị Nghĩa</p>
                                    </div>
                                </div>
                                <div class="border-t border-dashed border-slate-200"></div>
                                <!-- Contact Row 2 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Số điện thoại</p>
                                        <p class="font-bold text-slate-800 text-sm">097.964.2249</p>
                                    </div>
                                </div>
                                <div class="border-t border-dashed border-slate-200"></div>
                                <!-- Contact Row 3 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Email</p>
                                        <a href="mailto:nghiant@cmcai.vn" class="font-bold text-blue-600 hover:underline text-sm break-all">nghiant@cmcai.vn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Right Column: QR Code -->
                <div class="md:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div class="bg-[#b81432] px-6 py-4 flex items-center gap-3">
                        <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span class="text-white font-bold text-[16px] uppercase tracking-wide">QR Hướng dẫn sử dụng</span>
                    </div>
                    <div class="p-6 md:p-8 flex-1 bg-[#f4f7fb]/40 flex flex-col items-center justify-center text-center gap-6">
                        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-2">
                            <img src="/AIQR-CMC.png" alt="QR Hướng dẫn sử dụng CLS" class="w-36 h-36 object-contain" />
                        </div>
                        <p class="text-sm text-gray-500 leading-relaxed max-w-[240px]">
                            Quét mã QR để xem <span class="text-[#0c3e7d] font-bold">tài liệu hướng dẫn sử dụng chi tiết</span>
                        </p>
                    </div>
                </div>
            </div>

        `
    },
    'lex': {
        id: 'lex',
        title: 'Trợ lý pháp chế AI LEXcentra',
        shortDesc: 'Hệ thống phân tích rủi ro pháp lý, rà soát tính đồng bộ, mâu thuẫn của văn bản và đề xuất phương án tối ưu hóa điều khoản.',
        logo: '/BO NHAN DIEN TONG RA SOAT/logo-lex.svg',
        url: 'https://lexcentra.phapluat.gov.vn/home',
        color: 'blue',
        brightness: 'brightness-0',
        gradient: 'from-blue-600 to-indigo-700',
        manuals: [
            {
                title: 'Hướng dẫn sử dụng Trợ lý pháp lý số LEXcentra và Phân hệ tra cứu bản án thông minh',
                file: '/BO NHAN DIEN TONG RA SOAT/HDSD_LEXcentra_Tra_cuu_va_Tom_tat_Ban_an_1775822502182.pdf'
            },
            {
                title: 'Hướng dẫn nghiệp vụ rà soát rủi ro pháp lý hợp đồng với phân hệ LEXgpt',
                file: '/BO NHAN DIEN TONG RA SOAT/HDSD_LEXgpt_Ra_soat_Hop_dong_1775822521948.pdf'
            }
        ],
        content: `
            <h4 class="text-base font-bold text-gray-800 mt-0 mb-3">
                1. TỔNG QUAN SẢN PHẨM
            </h4>
            <p class="text-base text-gray-700 leading-relaxed mb-4">
                Tên sản phẩm: <strong>Trợ lý pháp chế AI LEXcentra</strong>
            </p>
            <p class="text-base text-gray-700 leading-relaxed mb-3">
                Các tính năng chính:
            </p>
            <ul class="space-y-2 mb-6 pl-4">
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span>Soạn thảo văn bản pháp luật & văn bản hành chính</span>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span>Rà soát tính hợp hiến, hợp pháp & tính thống nhất của dự thảo văn bản</span>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span>Hỗ trợ đánh giá tác động chính sách</span>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span>Theo dõi & rà soát văn bản pháp luật hiện hành</span>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span>Hỗ trợ xử lý sự vụ, khiếu nại, tố cáo & tranh chấp hành chính theo tình huống</span>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                    <span>Dịch thuật văn bản pháp lý phục vụ hợp tác quốc tế</span>
                </li>
            </ul>

            <h4 class="text-base font-bold text-gray-800 mt-8 mb-3">
                2. ĐƯỜNG DẪN TRUY CẬP VÀ QR HƯỚNG DẪN
            </h4>
            
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 mb-8">
                <!-- Left Column: Links and Registration info -->
                <div class="md:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div class="bg-[#0c3e7d] px-6 py-4 flex items-center gap-3">
                        <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <span class="text-white font-bold text-[16px] uppercase tracking-wide">Truy cập sản phẩm</span>
                    </div>
                    <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <h5 class="text-[12px] font-bold text-gray-400 uppercase mb-2">Link sản phẩm</h5>
                            <a href="https://lexcentra.ai/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between bg-[#f4f7fb] hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 group transition-all duration-300">
                                <span class="text-[#0c3e7d] font-bold text-[15px] break-all select-all">https://lexcentra.ai/</span>
                                <span class="w-8 h-8 rounded-full bg-[#ea492a] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300">
                                    <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </span>
                            </a>

                            <h5 class="text-[12px] font-bold text-gray-400 uppercase mt-6 mb-2">Đăng ký sử dụng cho đợt tổng rà soát VBQPPL</h5>
                            <p class="text-sm text-gray-500 mb-4 leading-relaxed">
                                Cơ quan, tổ chức có nhu cầu đăng ký tài khoản vui lòng liên hệ:
                            </p>
                            <div class="space-y-4">
                                <!-- Contact Row 1 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Người liên hệ</p>
                                        <p class="font-bold text-slate-800 text-sm">Ông/Bà: Phương Uyên</p>
                                    </div>
                                </div>
                                <div class="border-t border-dashed border-slate-200"></div>
                                <!-- Contact Row 2 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Số điện thoại</p>
                                        <p class="font-bold text-slate-800 text-sm">028 7105 4934</p>
                                    </div>
                                </div>
                                <div class="border-t border-dashed border-slate-200"></div>
                                <!-- Contact Row 3 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Email</p>
                                        <a href="mailto:support@lexengine.vn" class="font-bold text-blue-600 hover:underline text-sm break-all">support@lexengine.vn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Right Column: QR Code -->
                <div class="md:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div class="bg-[#b81432] px-6 py-4 flex items-center gap-3">
                        <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span class="text-white font-bold text-[16px] uppercase tracking-wide">QR Hướng dẫn sử dụng</span>
                    </div>
                    <div class="p-6 md:p-8 flex-1 bg-[#f4f7fb]/40 flex flex-col items-center justify-center text-center gap-6">
                        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-2">
                            <img src="/AIQR-Lexcentra.png" alt="QR Hướng dẫn sử dụng Lexcentra" class="w-36 h-36 object-contain" />
                        </div>
                        <p class="text-sm text-gray-500 leading-relaxed max-w-[240px]">
                            Quét mã QR để xem <span class="text-[#0c3e7d] font-bold">tài liệu hướng dẫn sử dụng chi tiết</span>
                        </p>
                    </div>
                </div>
            </div>
        `
    },
    'blegal': {
        id: 'blegal',
        title: 'Trợ lý số BKAV',
        shortDesc: 'Trợ lý ảo thông minh dựa trên mô hình ngôn ngữ lớn chuyên sâu phục vụ dịch vụ công, hỗ trợ tư vấn pháp luật tự động cho công dân.',
        logo: '/BO NHAN DIEN TONG RA SOAT/icon_BLegal.png',
        url: 'https://chatbotlandingpage.demozone.vn',
        color: 'green',
        gradient: 'from-emerald-500 to-teal-600',
        manuals: [
            {
                title: 'Cẩm nang tích hợp Trợ lý số BLegal với Hệ thống thông tin giải quyết thủ tục hành chính',
                file: '/BO NHAN DIEN TONG RA SOAT/Cam_nang_Tich_hop_BLegal_Dich_vu_cong_1775822604812.pdf'
            },
            {
                title: 'Hướng dẫn nghiệp vụ rà soát và đối chiếu tính đồng bộ thể chế của Trợ lý ảo BLegal',
                file: '/BO NHAN DIEN TONG RA SOAT/HDSD_BLegal_Ra_soat_Dong_bo_The_che_1775822623190.pdf'
            }
        ],
        content: `
            <h4 class="text-base font-bold text-gray-800 mt-0 mb-3">
                1. TỔNG QUAN SẢN PHẨM
            </h4>
            <p class="text-base text-gray-700 leading-relaxed mb-4">
                <strong>Trợ lý số Bkav</strong> là nền tảng trí tuệ nhân tạo chuyên sâu về pháp lý do Bkav nghiên cứu và phát triển với các tính năng cốt lõi:
            </p>
            <ul class="space-y-4 mb-6 pl-4">
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0"></div>
                    <div>
                        <strong>Tra cứu thông minh:</strong> Tìm kiếm chính xác nội dung dựa trên kho cơ sở dữ liệu pháp luật khổng lồ.
                    </div>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0"></div>
                    <div>
                        <strong>Soạn thảo & Góp ý:</strong> Hỗ trợ đắc lực trong việc xây dựng và đóng góp ý kiến cho các dự thảo văn bản quy phạm pháp luật.
                    </div>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0"></div>
                    <div>
                        <strong>Thẩm định chặt chẽ:</strong> Tự động hóa quy trình kiểm tra, đánh giá nội dung văn bản theo các tiêu chuẩn pháp lý quy định.
                    </div>
                </li>
                <li class="flex items-start gap-2.5 text-gray-700 text-[15px]">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0"></div>
                    <div>
                        <strong>Phân tích chuyên sâu:</strong> Rà soát các điểm chồng chéo, mâu thuẫn; đánh giá khó khăn, vướng mắc và tính khả thi của văn bản khi áp dụng vào thực tế.
                    </div>
                </li>
            </ul>

            <h4 class="text-base font-bold text-gray-800 mt-8 mb-3">
                2. ĐƯỜNG DẪN TRUY CẬP VÀ QR HƯỚNG DẪN
            </h4>
            
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 mb-8">
                <!-- Left Column: Links and Registration info -->
                <div class="md:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div class="bg-[#0c3e7d] px-6 py-4 flex items-center gap-3">
                        <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <span class="text-white font-bold text-[16px] uppercase tracking-wide">Truy cập sản phẩm</span>
                    </div>
                    <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <h5 class="text-[12px] font-bold text-gray-400 uppercase mb-2">Link sản phẩm</h5>
                            <a href="https://chatbotlandingpage.demozone.vn" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between bg-[#f4f7fb] hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 group transition-all duration-300">
                                <span class="text-[#0c3e7d] font-bold text-[15px] break-all select-all">https://chatbotlandingpage.demozone.vn</span>
                                <span class="w-8 h-8 rounded-full bg-[#ea492a] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300">
                                    <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </span>
                            </a>

                            <h5 class="text-[12px] font-bold text-gray-400 uppercase mt-6 mb-2">Đăng ký sử dụng cho đợt tổng rà soát VBQPPL</h5>
                            <p class="text-sm text-gray-500 mb-4 leading-relaxed">
                                Cơ quan, tổ chức có nhu cầu đăng ký tài khoản vui lòng liên hệ:
                            </p>
                            <div class="space-y-4">
                                <!-- Contact Row 1 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Người liên hệ</p>
                                        <p class="font-bold text-slate-800 text-sm">Ông: Trần Nhân Anh</p>
                                    </div>
                                </div>
                                <div class="border-t border-dashed border-slate-200"></div>
                                <!-- Contact Row 2 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Số điện thoại</p>
                                        <p class="font-bold text-slate-800 text-sm">0917509665</p>
                                    </div>
                                </div>
                                <div class="border-t border-dashed border-slate-200"></div>
                                <!-- Contact Row 3 -->
                                <div class="flex items-center gap-4">
                                    <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ea492a] shrink-0">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </div>
                                    <div>
                                        <p class="text-[11px] font-bold text-gray-400 uppercase mb-0.5">Email</p>
                                        <a href="mailto:anhtn@bkav.com" class="font-bold text-blue-600 hover:underline text-sm break-all">anhtn@bkav.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Right Column: QR Code -->
                <div class="md:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                    <div class="bg-[#b81432] px-6 py-4 flex items-center gap-3">
                        <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span class="text-white font-bold text-[16px] uppercase tracking-wide">QR Hướng dẫn sử dụng</span>
                    </div>
                    <div class="p-6 md:p-8 flex-1 bg-[#f4f7fb]/40 flex flex-col items-center justify-center text-center gap-6">
                        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-2">
                            <img src="/AIQR-BKAV.png" alt="QR Hướng dẫn sử dụng BLegal" class="w-36 h-36 object-contain" />
                        </div>
                        <p class="text-sm text-gray-500 leading-relaxed max-w-[240px]">
                            Quét mã QR để xem <span class="text-[#0c3e7d] font-bold">tài liệu hướng dẫn sử dụng chi tiết</span>
                        </p>
                    </div>
                </div>
            </div>
        `
    }
};

const TongRaSoatAIDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const ai = AI_DATA[id] || AI_DATA['cls'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleBack = () => {
        navigate('/tong-ra-soat', { state: { activeTab: 'ai-phap-luat' } });
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            {/* Breadcrumb Area */}
            <div className="bg-white border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 max-w-[1286px]">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-1.5 sm:gap-2">
                        <Link to="/" className="hover:text-blue-600 shrink-0">Trang chủ</Link>
                        <ChevronRight size={12} className="shrink-0" />
                        <button onClick={handleBack} className="hover:text-blue-600 shrink-0">
                            <span className="hidden sm:inline">Tổng rà soát hệ thống VBQPPL</span>
                            <span className="sm:hidden">Tổng rà soát</span>
                        </button>
                        <ChevronRight size={12} className="shrink-0" />
                        <span className="text-gray-800 font-medium truncate max-w-[120px] sm:max-w-xs">{ai.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1286px] mt-8">

                {/* Main Article Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header Banner Background */}
                    <div className={`h-4 bg-gradient-to-r ${ai.gradient}`}></div>

                    {/* Logo & Intro area */}
                    <div className="p-8 pb-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between text-center md:text-left">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center shrink-0 shadow-inner">
                                <img src={ai.logo} alt={ai.title} className={`max-h-full max-w-full object-contain ${ai.brightness || ''}`} />
                            </div>
                            <div className="space-y-3 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#0a3a73] leading-tight">
                                    {ai.title}
                                </h1>
                            </div>
                        </div>
                        <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0 flex justify-center">
                            <a
                                href={ai.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#ea492a] hover:bg-[#ea492a]/95 text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300 text-sm active:scale-[0.98] select-none uppercase group"
                            >
                                Truy cập hệ thống
                                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Meta bar */}
                    <div className="px-6 md:px-8 py-3 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center text-sm text-gray-500">
                        <span>27/05/2026 15:30</span>
                        <div className="flex items-center gap-2 md:gap-3">
                            <button className="p-1.5 rounded-full border hover:bg-gray-100 transition-colors text-gray-500"><Printer size={16} /></button>
                            <button className="p-1.5 rounded-full border hover:bg-gray-100 transition-colors text-gray-500"><Share2 size={16} /></button>
                            <button className="p-1.5 rounded-full border hover:bg-gray-100 transition-colors text-gray-500"><Facebook size={16} /></button>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="px-8 pt-5 pb-8">
                        <div
                            className="prose max-w-none text-gray-800 text-[16px] leading-relaxed mb-6"
                            dangerouslySetInnerHTML={{ __html: ai.content }}
                        />

                        {/* Attached Manuals Section (Similar to Ban chỉ đạo tab) */}
                        {ai.manuals && ai.manuals.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <h4 className="text-gray-900 font-bold text-lg mb-6 flex items-center gap-2">
                                    Hướng dẫn sử dụng
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {ai.manuals.map((doc, idx) => (
                                        <a
                                            key={idx}
                                            href={doc.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#ea492a] hover:shadow-md transition-all group"
                                        >
                                            <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:border-[#ea492a]/30 group-hover:bg-[#ea492a]/5 transition-colors shrink-0">
                                                <FileText className="text-[#ea492a]" size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-800 font-bold text-sm leading-snug group-hover:text-[#ea492a] transition-colors line-clamp-3">
                                                    {doc.title}
                                                </p>
                                                <span className="text-[11px] text-gray-500 mt-2 inline-block font-medium uppercase font-semibold">Xem chi tiết</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TongRaSoatAIDetailPage;

import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Globe, Sparkles, Shield, Cpu, Zap, Printer, Share2, Facebook, FileText } from 'lucide-react';

const AI_DATA = {
    'cls': {
        id: 'cls',
        title: 'C-AI Legal - Trợ lý ảo hỗ trợ xây dựng và rà soát văn bản quy phạm pháp luật',
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
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>C-AI Legal (CLS)</strong> là nền tảng trợ lý ảo pháp luật chuyên sâu do <strong>CMC OpenAI (C-OpenAI)</strong>, một thành viên của Tập đoàn Công nghệ CMC, nghiên cứu và phát triển. Hệ thống được định hướng trở thành giải pháp công nghệ quốc gia tiên phong nhằm hiện thực hóa mục tiêu chuyển đổi số toàn diện (AI-X) trong lĩnh vực pháp luật, hỗ trợ các cơ quan Nhà nước, cán bộ công chức và doanh nghiệp tiếp cận thông tin pháp lý minh bạch, chính xác.
            </p>

            <div class="my-8 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <img src="/BO NHAN DIEN TONG RA SOAT/cls-preview.webp" alt="Không gian làm việc CLS" class="w-full h-auto object-cover" />
                <p class="text-xs text-center italic text-gray-500 py-3 bg-gray-50 border-t border-gray-100">
                    Giao diện tổng quan và bảng điều khiển rà soát mâu thuẫn hệ thống văn bản của C-AI Legal (CLS)
                </p>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-red-500 pl-3">
                Các tính năng đột phá của C-AI Legal
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                C-AI Legal tích hợp sâu công nghệ trí tuệ nhân tạo (xử lý ngôn ngữ tự nhiên NLP, mô hình ngôn ngữ lớn LLM) với các phân hệ chức năng chuyên nghiệp để giải quyết các tác vụ lập pháp phức tạp:
            </p>
            <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Không gian làm việc thông minh (Workspace):</strong> Tạo lập môi trường làm việc thực tế cho từng dự án, cho phép người dùng chuẩn bị hồ sơ tài liệu, tải lên các văn bản cá nhân hoặc dự thảo luật để rà soát.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Rà soát mâu thuẫn, chồng chéo:</strong> Tính năng cốt lõi giúp tự động quét và đối chiếu chéo các quy định giữa hàng ngàn văn bản quy phạm pháp luật khác nhau, chỉ ra các điểm mâu thuẫn, chồng chéo hoặc trái thẩm quyền một cách tự động, giúp đánh giá tính thống nhất của hệ thống pháp luật.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                        </svg>
                    </span>
                    <div>
                        <strong>So sánh văn bản nâng cao:</strong> Nhận diện nhanh những thay đổi cốt lõi, sự khác biệt giữa các phiên bản soạn thảo (ví dụ: dự thảo so với văn bản chính thức, hoặc các phiên bản sửa đổi, bổ sung qua các năm).
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Chatbot AI giải đáp 24/7:</strong> Trợ lý hội thoại thông minh hỗ trợ trả lời, giải nghĩa các thuật ngữ pháp lý khó hiểu và trích xuất nguồn văn bản dẫn chiếu tin cậy dựa trên kho dữ liệu tri thức khổng lồ.
                    </div>
                </li>
            </ul>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div class="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <img src="/BO NHAN DIEN TONG RA SOAT/ws1.webp" alt="Giao diện làm việc 1" class="w-full h-auto object-cover" />
                    <p class="text-xs text-center italic text-gray-500 py-3 bg-gray-50 border-t border-gray-100">
                        Tính năng tạo Workspace và tải lên tài liệu cá nhân để phân tích
                    </p>
                </div>
                <div class="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <img src="/BO NHAN DIEN TONG RA SOAT/ws2.webp" alt="Giao diện làm việc 2" class="w-full h-auto object-cover" />
                    <p class="text-xs text-center italic text-gray-500 py-3 bg-gray-50 border-t border-gray-100">
                        Chi tiết rà soát mâu thuẫn và chỉ dẫn điều khoản pháp lý tương thích
                    </p>
                </div>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-red-500 pl-3">
                Công nghệ cốt lõi & Sứ mệnh
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                Nền tảng được vận hành bởi mô hình ngôn ngữ lớn chuyên sâu <strong>CMC-AI-Legal-32B</strong> kết hợp bộ chuẩn đánh giá AI pháp lý <strong>VLegal-Bench</strong> nhằm đo lường và đảm bảo tính chính xác cho các ứng dụng công nghệ pháp lý (LegalTech), đồng hành cùng đất nước khơi thông mọi điểm nghẽn thể chế, khơi dậy mọi nguồn lực phát triển trong kỷ nguyên mới.
            </p>
        `
    },
    'lex': {
        id: 'lex',
        title: 'AI LEXcentra - Nền tảng trợ lý pháp lý toàn diện ứng dụng Trí tuệ nhân tạo (AI)',
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
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>LEXcentra</strong> là nền tảng trợ lý pháp lý toàn diện ứng dụng Trí tuệ nhân tạo (AI) đột phá, do Công ty Cổ phần <strong>LEXengine</strong> (được sáng lập và điều hành chuyên môn bởi các Thạc sĩ, Luật sư giàu kinh nghiệm, đứng đầu là Thạc sĩ, Luật sư Dương Bảo Trung) nghiên cứu và phát triển. Nền tảng được xây dựng nhằm tối ưu hóa quy trình nghiên cứu, tra cứu và nâng cao hiệu suất xử lý công việc pháp lý hàng ngày thông qua công nghệ xử lý ngôn ngữ tự nhiên (NLP) và học máy (Machine Learning) tiên tiến.
            </p>

            <div class="my-8 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <img src="/BO NHAN DIEN TONG RA SOAT/home_page_top_1.png" alt="Giao diện LEXcentra" class="w-full h-auto object-cover" />
                <p class="text-xs text-center italic text-gray-500 py-3 bg-gray-50 border-t border-gray-100">
                    Giao diện Trang chủ và các phân hệ tính năng quản trị thông minh của trợ lý pháp lý toàn diện LEXcentra
                </p>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-blue-500 pl-3">
                Các phân hệ chức năng chính của LEXcentra
            </h3>
            <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Tra cứu & Phân tích thông minh:</strong> Tìm kiếm siêu tốc các văn bản quy phạm pháp luật, quyết định xét xử của tòa án, bản án và kho dữ liệu án lệ Việt Nam với độ chính xác cao nhờ các công cụ lọc và liên kết dữ liệu trực quan.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Tóm tắt bản án tự động:</strong> Tự động hóa quá trình phân tích và tóm tắt nội dung các bản án dài, bóc tách nhanh các yếu tố cốt lõi như bản chất tranh chấp, lập luận pháp lý của các bên và quyết định cuối cùng của Tòa án, hỗ trợ đắc lực cho luật sư chuẩn bị hồ sơ vụ việc.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                        </svg>
                    </span>
                    <div>
                        <strong>LEXgpt - Trợ lý tư vấn tình huống pháp lý:</strong> Phân hệ trợ lý hội thoại AI chuyên sâu (hoạt động trên nền tảng Web và Zalo OA) cho phép người dùng nhập các tình huống pháp lý thực tế bằng ngôn ngữ tự nhiên để nhận tư vấn, dẫn chiếu điều luật và gợi ý giải pháp tức thì.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Soạn thảo & Rà soát văn bản:</strong> Công cụ tự động hỗ trợ rà soát rủi ro pháp lý trong hợp đồng, phát hiện các điều khoản thiếu tính khả thi, chồng chéo và hỗ trợ kiểm soát tính tuân thủ pháp luật nội bộ của doanh nghiệp.
                    </div>
                </li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-blue-500 pl-3">
                Ưu điểm nổi bật và khả năng học liên tục
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                Nhờ công nghệ học máy tiên tiến, <strong>LEXcentra</strong> có khả năng học liên tục (Continuous Learning) từ dữ liệu án lệ mới, cập nhật xu hướng xét xử và những thay đổi quy định pháp luật quy phạm quốc gia. Nền tảng giúp tiết kiệm đến 80% thời gian nghiên cứu tài liệu, nâng cao độ chính xác, hỗ trợ đắc lực cho luật sư, doanh nghiệp quản lý rủi ro pháp lý và ra quyết định thể chế tối ưu.
            </p>
        `
    },
    'blegal': {
        id: 'blegal',
        title: 'BLegal - Trợ lý ảo hỗ trợ công tác rà soát, tra cứu và phân tích hệ thống văn bản pháp lý của Bkav',
        shortDesc: 'Trợ lý ảo thông minh dựa trên mô hình ngôn ngữ lớn chuyên sâu phục vụ dịch vụ công, hỗ trợ tư vấn pháp luật tự động cho công dân.',
        logo: '/BO NHAN DIEN TONG RA SOAT/icon_BLegal.png',
        url: 'https://chatbot.demozone.vn/',
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
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>BLegal</strong> là giải pháp Trợ lý ảo AI Pháp luật chuyên sâu do <strong>Tập đoàn Công nghệ Bkav</strong> nghiên cứu và phát triển. Trong bối cảnh Bộ Tư pháp đẩy mạnh ứng dụng trí tuệ nhân tạo (AI), Bkav đã tham gia đồng hành chiến lược, cung cấp hạ tầng công nghệ và giải pháp thuật toán AI tiên tiến phục vụ đắc lực cho công tác rà soát, tra cứu và phân tích hệ thống văn bản quy phạm pháp luật (VBQPPL) quốc gia.
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-emerald-500 pl-3">
                Vai trò và tính năng then chốt của trợ lý số BLegal
            </h3>
            <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Tích hợp chặt chẽ với Cơ sở dữ liệu quốc gia về VBQPPL:</strong> Kết nối và đồng bộ trực tiếp với kho dữ liệu pháp luật quốc gia để đảm bảo thông tin trả lời luôn có độ tin cậy tuyệt đối và cập nhật thời gian thực về tình trạng hiệu lực văn bản.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Tự động hóa các nhiệm vụ rà soát lặp đi lặp lại:</strong> Hỗ trợ cán bộ chuyên trách giảm tải khối lượng công việc rà soát thủ công khổng lồ, bóc tách nhanh các quy phạm, điều khoản chồng chéo theo từ khóa chính sách phức tạp.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Phân tích tính đồng bộ thể chế:</strong> Trợ giúp chỉ ra điểm xung đột, không đồng nhất tiềm ẩn giữa các thông tư hướng dẫn với nghị định quy định chi tiết và các luật ban hành mới.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                    <div>
                        <strong>Giao diện hội thoại thông minh hỗ trợ Dịch vụ công:</strong> Trợ lý số dễ dàng tư vấn và giải đáp các thủ tục hành chính công trực tuyến cấp bộ và cấp tỉnh, giảm tải áp lực cho cán bộ hành chính tại bộ phận một cửa và giúp công dân tiếp cận pháp luật nhanh chóng.
                    </div>
                </li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-emerald-500 pl-3">
                Cánh tay nối dài cho các chuyên gia Tư pháp
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                Hệ thống <strong>BLegal</strong> của Bkav đóng vai trò là một trợ thủ đắc lực giúp tăng tốc hiệu quả rà soát văn bản lên gấp nhiều lần. Trợ lý số này được thiết kế để đảm nhận các công tác kỹ thuật lặp lại, nhường lại các công đoạn đánh giá chính sách và suy luận pháp lý cao cấp cho chuyên gia lập pháp, đảm bảo sự phối hợp hoàn mỹ giữa trí tuệ nhân tạo và kinh nghiệm thực tiễn để khơi thông điểm nghẽn thể chế lập pháp quốc gia.
            </p>
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
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
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
                                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#ea492a] hover:bg-[#ea492a]/95 text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300 text-sm active:scale-[0.98] select-none uppercase"
                            >
                                Truy cập hệ thống
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
                    <div className="p-8">
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

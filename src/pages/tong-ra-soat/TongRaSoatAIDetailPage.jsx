import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Globe, Sparkles, Shield, Cpu, Zap, Printer, Share2, Facebook, FileText } from 'lucide-react';

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
            <p class="text-base text-justify leading-relaxed mb-6 text-gray-700 indent-8">
                C-AI Legal là nền tảng trí tuệ nhân tạo pháp lý do CMC OpenAI nghiên cứu và phát triển. Giải pháp được xây dựng chuyên biệt cho hệ thống pháp luật Việt Nam, tự động hóa quy trình quản lý, rà soát và hệ thống hóa văn bản quy phạm pháp luật ở quy mô lớn. Giải pháp giúp các Bộ, ngành, địa phương hoàn thành nhiệm vụ pháp chế nhanh chóng, chính xác và tiết kiệm nguồn lực đáng kể so với phương thức truyền thống.
            </p>

            <h4 class="text-base font-bold text-gray-800 mt-8 mb-3">
                2. ĐƯỜNG DẪN TRUY CẬP VÀ QR HƯỚNG DẪN
            </h4>
            
            <div class="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-hidden mt-4 mb-8 shadow-sm">
                <!-- Left Column: Links and Registration info -->
                <div class="md:col-span-8 p-6 md:p-8 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
                    <div>
                        <h5 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">TRUY CẬP SẢN PHẨM</h5>
                        <p class="text-sm text-gray-600 mb-6">
                            Link sản phẩm: <a href="https://cls.cmcai.vn/" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold hover:underline">https://cls.cmcai.vn/</a>
                        </p>

                        <h5 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">ĐĂNG KÝ SỬ DỤNG CHO ĐỢT TỔNG RÀ SOÁT VBQPPL</h5>
                        <p class="text-sm text-gray-500 mb-4">
                            Cơ quan, tổ chức có nhu cầu đăng ký tài khoản vui lòng liên hệ:
                        </p>
                        <div class="space-y-1 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p class="text-sm text-gray-800 font-bold">Bà Nguyễn Thị Nghĩa</p>
                            <p class="text-sm text-gray-600">SĐT: <span class="font-semibold text-gray-800">097.964.2249</span></p>
                            <p class="text-sm text-gray-600">Email: <a href="mailto:nghiant@cmcai.vn" class="text-blue-600 hover:underline">nghiant@cmcai.vn</a></p>
                        </div>
                    </div>
                </div>
                <!-- Right Column: QR Code -->
                <div class="md:col-span-4 p-6 md:p-8 bg-gray-50 flex flex-col items-center justify-center text-center">
                    <h5 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">QR HƯỚNG DẪN SỬ DỤNG</h5>
                    <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-3">
                        <img src="/AIQR-CMC.png" alt="QR Hướng dẫn sử dụng CLS" class="w-28 h-28 object-contain" />
                    </div>
                    <p class="text-[11px] italic text-gray-500 leading-snug">
                        Quét mã QR để xem tài liệu hướng dẫn sử dụng chi tiết
                    </p>
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
            
            <div class="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-hidden mt-4 mb-8 shadow-sm">
                <!-- Left Column: Links and Registration info -->
                <div class="md:col-span-8 p-6 md:p-8 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
                    <div>
                        <h5 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">TRUY CẬP SẢN PHẨM</h5>
                        <p class="text-sm text-gray-600 mb-6">
                            Link sản phẩm: <a href="https://lexcentra.ai/" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold hover:underline">https://lexcentra.ai/</a>
                        </p>

                        <h5 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">ĐĂNG KÝ SỬ DỤNG CHO ĐỢT TỔNG RÀ SOÁT VBQPPL</h5>
                        <p class="text-sm text-gray-500 mb-4">
                            Cơ quan, tổ chức có nhu cầu đăng ký tài khoản vui lòng liên hệ:
                        </p>
                        <div class="space-y-1 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p class="text-sm text-gray-800 font-bold">Ông/Bà: Phương Uyên</p>
                            <p class="text-sm text-gray-600">SĐT: <span class="font-semibold text-gray-800">028 7105 4934</span></p>
                            <p class="text-sm text-gray-600">Email: <a href="mailto:support@lexengine.vn" class="text-blue-600 hover:underline">support@lexengine.vn</a></p>
                        </div>
                    </div>
                </div>
                <!-- Right Column: QR Code -->
                <div class="md:col-span-4 p-6 md:p-8 bg-gray-50 flex flex-col items-center justify-center text-center">
                    <h5 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">QR HƯỚNG DẪN SỬ DỤNG</h5>
                    <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-3">
                        <img src="/AIQR-Lexcentra.png" alt="QR Hướng dẫn sử dụng Lexcentra" class="w-28 h-28 object-contain" />
                    </div>
                    <p class="text-[11px] italic text-gray-500 leading-snug">
                        Quét mã QR để xem tài liệu hướng dẫn sử dụng chi tiết
                    </p>
                </div>
            </div>
        `
    },
    'blegal': {
        id: 'blegal',
        title: 'Trợ lý số BKAV',
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
            
            <div class="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-hidden mt-4 mb-8 shadow-sm">
                <!-- Left Column: Links and Registration info -->
                <div class="md:col-span-8 p-6 md:p-8 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
                    <div>
                        <h5 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">TRUY CẬP SẢN PHẨM</h5>
                        <p class="text-sm text-gray-600 mb-6">
                            Link sản phẩm: <a href="https://chatbot.demozone.vn" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold hover:underline">https://chatbot.demozone.vn</a>
                        </p>

                        <h5 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">ĐĂNG KÝ SỬ DỤNG CHO ĐỢT TỔNG RÀ SOÁT VBQPPL</h5>
                        <p class="text-sm text-gray-500 mb-4">
                            Cơ quan, tổ chức có nhu cầu đăng ký tài khoản vui lòng liên hệ:
                        </p>
                        <div class="space-y-1 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p class="text-sm text-gray-800 font-bold">Ông: Trần Nhân Anh</p>
                            <p class="text-sm text-gray-600">SĐT: <span class="font-semibold text-gray-800">0917509665</span></p>
                            <p class="text-sm text-gray-600">Email: <a href="mailto:anhtn@bkav.com" class="text-blue-600 hover:underline">anhtn@bkav.com</a></p>
                        </div>
                    </div>
                </div>
                <!-- Right Column: QR Code -->
                <div class="md:col-span-4 p-6 md:p-8 bg-gray-50 flex flex-col items-center justify-center text-center">
                    <h5 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">QR HƯỚNG DẪN SỬ DỤNG</h5>
                    <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-3">
                        <img src="/AIQR-BKAV.png" alt="QR Hướng dẫn sử dụng BLegal" class="w-28 h-28 object-contain" />
                    </div>
                    <p class="text-[11px] italic text-gray-500 leading-snug">
                        Quét mã QR để xem tài liệu hướng dẫn sử dụng chi tiết
                    </p>
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

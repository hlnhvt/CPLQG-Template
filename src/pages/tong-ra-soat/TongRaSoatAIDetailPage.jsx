import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Globe, Sparkles, Shield, Cpu, Zap, Printer, Share2, Facebook } from 'lucide-react';

const AI_DATA = {
    'cls': {
        id: 'cls',
        title: 'C.Open AI - CLS - Trợ lý ảo rà soát và kiểm tra tính đồng bộ của hệ thống văn bản pháp luật',
        shortDesc: 'Hệ thống Trợ lý ảo AI thông minh giúp rà soát mâu thuẫn, kiểm tra tính hợp pháp và tính đồng bộ của hệ thống văn bản pháp luật.',
        logo: '/BO NHAN DIEN TONG RA SOAT/COpenAIlogo.svg',
        url: 'https://cls.cmcai.vn/',
        color: 'red',
        gradient: 'from-red-500 to-orange-600',
        content: `
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>CLS (C-AI Legal)</strong> là nền tảng trợ lý ảo pháp luật chuyên sâu do <strong>CMC OpenAI (C-OpenAI)</strong>, một thành viên của Tập đoàn Công nghệ CMC, nghiên cứu và phát triển. Đây là một trong những nhiệm vụ công nghệ quốc gia nhằm thúc đẩy chuyển đổi số trong lĩnh vực pháp luật, hỗ trợ các cơ quan Nhà nước, doanh nghiệp và người dân tiếp cận thông tin pháp lý minh bạch, chính xác.
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-red-500 pl-3">
                Các tính năng nổi bật của CLS
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                Nền tảng tích hợp công nghệ trí tuệ nhân tạo tiên tiến, bao gồm các mô hình ngôn ngữ lớn chuyên biệt cho ngành luật Việt Nam để giải quyết các bài toán nghiệp vụ phức tạp:
            </p>
            <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5"><Sparkles size={16} /></span>
                    <div>
                        <strong>Tra cứu siêu tốc:</strong> Tìm kiếm văn bản pháp luật, luật, nghị định, thông tư chỉ trong vài giây thông qua công nghệ hiểu ý định người dùng (Semantic Search).
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5"><Shield size={16} /></span>
                    <div>
                        <strong>Rà soát mâu thuẫn, chồng chéo:</strong> Tự động đối chiếu, so sánh các quy định giữa nhiều văn bản quy phạm pháp luật khác nhau nhằm phát hiện ra điểm mâu thuẫn, chồng chéo, giúp đánh giá tính thống nhất của toàn bộ hệ thống pháp luật Việt Nam.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5"><Cpu size={16} /></span>
                    <div>
                        <strong>Diễn giải và tóm tắt thông minh:</strong> Hỗ trợ giải thích các điều khoản bằng ngôn ngữ dễ hiểu, tóm tắt nội dung văn bản pháp lý hoặc bản án có dung lượng lớn, giúp chuyên viên pháp lý nắm bắt thông tin nhanh chóng.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5"><Zap size={16} /></span>
                    <div>
                        <strong>So sánh văn bản nâng cao:</strong> Hỗ trợ nhận diện sự khác biệt giữa các phiên bản (như dự thảo và văn bản chính thức, hoặc các phiên bản sửa đổi, bổ sung qua các thời kỳ).
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-red-100 text-red-600 rounded-full shrink-0 mt-0.5"><Sparkles size={16} /></span>
                    <div>
                        <strong>Chatbot AI giải đáp pháp luật:</strong> Trả lời các câu hỏi về pháp luật dựa trên kho tri thức pháp lý khổng lồ được cập nhật liên tục 24/7.
                    </div>
                </li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-red-500 pl-3">
                Công nghệ cốt lõi hàng đầu
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>CLS</strong> hoạt động dựa trên mô hình ngôn ngữ lớn chuyên sâu <strong>CMC-AI-Legal-32B</strong>. Đây là LLM chuyên biệt được tinh chỉnh sâu sắc cho hệ thống pháp luật Việt Nam, chứng minh ưu thế vượt trội trong các tác vụ suy luận pháp lý phức tạp. Đi cùng hệ thống là bộ chuẩn đánh giá AI pháp lý <strong>VLegal-Bench</strong> được công bố công khai nhằm đo lường và đảm bảo tính chính xác, khách quan của kết quả phản hồi.
            </p>
        `
    },
    'lex': {
        id: 'lex',
        title: 'AI LEXcentra - Nền tảng phân tích rủi ro pháp lý và tối ưu hóa hệ thống văn bản quy phạm',
        shortDesc: 'Hệ thống phân tích rủi ro pháp lý, rà soát tính đồng bộ, mâu thuẫn của văn bản và đề xuất phương án tối ưu hóa điều khoản.',
        logo: '/BO NHAN DIEN TONG RA SOAT/logo-lex.svg',
        url: 'https://lexcentra.phapluat.gov.vn/home',
        color: 'blue',
        brightness: 'brightness-0',
        gradient: 'from-blue-600 to-indigo-700',
        content: `
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>LEXcentra</strong> là trợ lý pháp lý toàn diện ứng dụng trí tuệ nhân tạo (AI) đột phá, do Công ty Cổ phần <strong>LEXengine</strong> nghiên cứu và phát triển. Nền tảng được tạo ra nhằm tối ưu hóa quy trình nghiên cứu, tra cứu và xử lý công việc pháp lý thông qua công nghệ xử lý ngôn ngữ tự nhiên (NLP) và học máy (Machine Learning) tiên tiến, đồng hành cùng các luật sư, thẩm phán, kiểm sát viên, cán bộ pháp chế doanh nghiệp và người dân.
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-blue-500 pl-3">
                Các phân hệ chức năng chính của LEXcentra
            </h3>
            <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5"><Sparkles size={16} /></span>
                    <div>
                        <strong>Tra cứu & Phân tích chuyên sâu:</strong> Hỗ trợ tìm kiếm thông minh các văn bản quy phạm pháp luật, bản án, quyết định của tòa án và kho dữ liệu án lệ Việt Nam phong phú với bộ lọc chính xác.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5"><Shield size={16} /></span>
                    <div>
                        <strong>Tóm tắt bản án tự động:</strong> Tự động hóa quá trình tóm tắt các bản án có dung lượng lớn, bóc tách nhanh các yếu tố cốt lõi như tính chất tranh chấp, lập luận pháp lý của các bên, và quyết định cuối cùng của tòa án.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5"><Cpu size={16} /></span>
                    <div>
                        <strong>LEXgpt - Trợ lý tư vấn tình huống:</strong> Phân hệ chatbot AI thông minh (tích hợp trên Zalo OA và nền tảng Web) cho phép người dùng nhập các tình huống pháp lý thực tế bằng ngôn ngữ tự nhiên để nhận tư vấn, dẫn chiếu điều luật và gợi ý phương án xử lý tức thì.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-blue-100 text-blue-600 rounded-full shrink-0 mt-0.5"><Zap size={16} /></span>
                    <div>
                        <strong>Soạn thảo & Rà soát văn bản:</strong> Hỗ trợ đắc lực trong việc soạn thảo và tự động rà soát hợp đồng, tài liệu pháp lý, kiểm soát tính tuân thủ pháp luật nội bộ của doanh nghiệp nhằm giảm thiểu rủi ro pháp lý.
                    </div>
                </li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-blue-500 pl-3">
                Ưu điểm vượt trội và khả năng tự học
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                Nền tảng được chỉ đạo và điều hành chuyên môn bởi các chuyên gia pháp luật đầu ngành. Điểm mạnh nhất của **LEXcentra** là khả năng tự học liên tục (Continuous Learning) từ dữ liệu thực tế và các xu hướng xét xử mới nhất, đảm bảo tính cập nhật thường xuyên trước các biến động của hệ thống pháp luật quy phạm quốc gia.
            </p>
        `
    },
    'blegal': {
        id: 'blegal',
        title: 'BLEGAL - Trợ lý số thông minh hỗ trợ tư vấn pháp luật và phục vụ dịch vụ công tự động',
        shortDesc: 'Trợ lý ảo thông minh dựa trên mô hình ngôn ngữ lớn chuyên sâu phục vụ dịch vụ công, hỗ trợ tư vấn pháp luật tự động cho công dân.',
        logo: '/BO NHAN DIEN TONG RA SOAT/icon_BLegal.png',
        url: 'https://chatbot.demozone.vn/',
        color: 'green',
        gradient: 'from-emerald-500 to-teal-600',
        content: `
            <p class="text-base text-justify leading-relaxed mb-6">
                <strong>BLegal</strong> là giải pháp Trợ lý ảo AI Pháp luật chuyên sâu do <strong>Tập đoàn Công nghệ Bkav</strong> nghiên cứu và phát triển. Trong bối cảnh Bộ Tư pháp đẩy mạnh ứng dụng công nghệ thông tin, Bkav đã được lựa chọn làm đơn vị đồng hành chiến lược nhằm cung cấp hạ tầng công nghệ, thuật toán xử lý và giải pháp AI tiên tiến hỗ trợ đắc lực cho công tác rà soát, tra cứu và phân tích hệ thống văn bản quy phạm pháp luật (VBQPPL) quốc gia.
            </p>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-emerald-500 pl-3">
                Tính năng và vai trò then chốt trong công tác rà soát
            </h3>
            <ul class="space-y-4 mb-8">
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5"><Sparkles size={16} /></span>
                    <div>
                        <strong>Tích hợp Cơ sở dữ liệu quốc gia về VBQPPL:</strong> Kết nối trực tiếp với cổng dữ liệu pháp luật quốc gia, đảm bảo thông tin luôn có độ chính xác tuyệt đối, cập nhật thời gian thực về tình trạng hiệu lực của văn bản.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5"><Shield size={16} /></span>
                    <div>
                        <strong>Giảm tải công việc lặp lại:</strong> Tự động hóa các nhiệm vụ rà soát thủ công tốn thời gian, lọc và bóc tách các điều khoản luật theo từ khóa và chủ đề phức tạp, giúp các chuyên viên pháp lý tập trung vào các tác vụ suy luận và đưa ra quyết định chính sách.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5"><Cpu size={16} /></span>
                    <div>
                        <strong>Hỗ trợ phân tích cấu trúc văn bản:</strong> Phân tích sự liên kết và tính logic của các điều khoản văn bản mới, chỉ ra các xung đột hành chính tiềm ẩn giữa các thông tư hướng dẫn và nghị định quy định chi tiết.
                    </div>
                </li>
                <li class="flex items-start gap-3 text-gray-700">
                    <span class="p-1 bg-emerald-100 text-emerald-600 rounded-full shrink-0 mt-0.5"><Zap size={16} /></span>
                    <div>
                        <strong>Giao diện Chatbot dịch vụ công thân thiện:</strong> Hỗ trợ đắc lực trong việc tư vấn và giải đáp các thủ tục hành chính tự động cho công dân và doanh nghiệp, giảm tải khối lượng công việc khổng lồ cho bộ phận một cửa.
                    </div>
                </li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-emerald-500 pl-3">
                Công cụ hỗ trợ đắc lực cho chuyên gia
            </h3>
            <p class="text-base text-justify leading-relaxed mb-6">
                Hệ thống trợ lý ảo **BLegal** của Bkav đóng vai trò là một trợ thủ đắc lực, tăng tốc hiệu quả rà soát văn bản lên gấp nhiều lần. Sự kết hợp chặt chẽ giữa sức mạnh tính toán của trí tuệ nhân tạo và kinh nghiệm chuyên môn sâu sắc của các cán bộ Tư pháp chính là chìa khóa để hoàn thành xuất sắc nhiệm vụ tổng rà soát hệ thống pháp luật, khơi thông các điểm nghẽn thể chế vì mục tiêu phát triển đất nước.
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
                    <div className="p-8 pb-4 border-b border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                        <div className="w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center shrink-0 shadow-inner">
                            <img src={ai.logo} alt={ai.title} className={`max-h-full max-w-full object-contain ${ai.brightness || ''}`} />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#0a3a73] leading-tight">
                                {ai.title}
                            </h1>
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
                            className="prose max-w-none text-gray-800 text-[16px] leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: ai.content }}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TongRaSoatAIDetailPage;

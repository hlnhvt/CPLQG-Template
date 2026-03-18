import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ChevronRight, Copy, Share2, Facebook, Phone, MessageSquare, ArrowRight, Minus, Plus, Volume2, Check, Download, FileText, FileSpreadsheet, Maximize2, X } from 'lucide-react';

// ---- MOCK DATA ----
const ARTICLE = {
    id: 1,
    title: "Ứng dụng Trí tuệ nhân tạo trong hoạt động xét xử: Kinh nghiệm quốc tế và kiến nghị cho Việt Nam",
    date: "15/03/2026 14:30",
    domain: "Hình sự",
    author: "PGS.TS Nguyễn Văn A – Đại học Luật Hà Nội",
    source: "Tạp chí Nghiên cứu Lập pháp",
    abstract: "Bài viết phân tích thực tiễn ứng dụng Trí tuệ nhân tạo (AI) tại các hệ thống tư pháp tiên tiến như Mỹ, Trung Quốc, Liên minh Châu Âu (EU), từ đó chỉ ra những ưu điểm đột phá trong xử lý án lệ, phác họa đối tượng phạm tội, cũng như các nguy cơ hiện hữu về thiên vị thuật toán và tính minh bạch. Từ đó, bài viết đề xuất lộ trình và khung pháp lý phù hợp nhằm từng bước áp dụng công nghệ này vào hoạt động tố tụng tại Việt Nam, đảm bảo nguyên tắc suy đoán vô tội và quyền con người.",
    image: "/thumb2.png",
    caption: "Mô phỏng ứng dụng AI hỗ trợ phân tích chứng cứ tại một phiên tòa số. Ảnh minh họa: AI Generated.",
    content: `
        <h3>1. Đặt vấn đề</h3>
        <p>Sự bùng nổ của Cách mạng Công nghiệp 4.0 đã đưa Trí tuệ nhân tạo (Artificial Intelligence - AI) thâm nhập sâu vào các lĩnh vực của đời sống kinh tế - xã hội. Hoạt động tư pháp, đặc biệt là xét xử, cũng không nằm ngoài xu thế này. Các quốc gia tiên tiến đang tích cực đưa AI vào hỗ trợ thẩm phán, kiểm sát viên trong việc tra cứu án lệ, phân tích tài liệu vụ án, thậm chí đưa ra đề xuất mức hình phạt.</p>
        <p>Tuy nhiên, bên cạnh những lợi ích to lớn về tốc độ và sự thống nhất, sự tham gia của một thực thể phi nhân loại vào quá trình định đoạt số phận con người cũng đặt ra những thách thức chưa từng có đối với tư duy pháp lý truyền thống.</p>
        
        <h3>2. Kinh nghiệm quốc tế về ứng dụng AI trong xét xử</h3>
        <p><strong>Tại Hoa Kỳ:</strong> Hệ thống COMPAS (Correctional Offender Management Profiling for Alternative Sanctions) được sử dụng rông rãi để đánh giá nguy cơ tái phạm của bị cáo, làm cơ sở cho quyết định bảo lãnh hoặc định khung hình phạt. Tuy nhiên, hệ thống này đã dấy lên làn sóng tranh cãi mạnh mẽ về sự thiên vị chủng tộc (racial bias) được mã hóa ngầm trong dữ liệu huấn luyện.</p>
        <p><strong>Tại Trung Quốc:</strong> Với định hướng "Tòa án thông minh", hệ thống AI được tích hợp sâu vào quá trình soạn thảo bản án, phân tích điểm tương đồng giữa vụ án hiện tại và hàng triệu án lệ trong quá khứ. Các tòa án tại Thượng Hải thậm chí đã áp dụng "Trợ lý ảo pháp lý" để tư vấn cho đương sự về xác suất thắng kiện trước khi nộp đơn.</p>
        <p><strong>Tại Châu Âu:</strong> EU tiếp cận một cách thận trọng thông qua <a href="#">Đạo luật AI (AI Act)</a> được thông qua năm 2024. Theo đó, việc áp dụng AI trong hoạt động tư pháp và thực thi pháp luật được xếp vào nhóm "Rủi ro cao" (High-risk), đòi hỏi cơ chế giám sát bằng yếu tố con người (Human-in-the-loop) nghiêm ngặt nhất.</p>

        <h3>3. Các nguy cơ pháp lý và đạo đức</h3>
        <p>Sự lo ngại lớn nhất không nằm ở sức mạnh xử lý của AI, mà ở hiệu ứng "Hộp đen" (Black box). Khi luật sư bào chữa yêu cầu giải thích cơ sở logic mà hệ thống AI đưa ra mức án đề xuất, bản thân các nhà sản xuất phần mềm cũng không thể cung cấp lời giải thích một cách tường minh, do các thuật toán học sâu (Deep learning) tạo ra quy luật của riêng chúng.</p>
        <ul>
            <li><strong>Vi phạm nguyên tắc tranh tụng:</strong> Khi cơ sở luận tội dựa vào "sự kỳ bí" của thuật toán mà bên bị buộc tội không thể kiểm chứng.</li>
            <li><strong>Nguy cơ tự chứng minh tội phạm:</strong> Việc AI phân tích tự động dữ liệu hành vi của bị can có vi phạm quyền giữ im lặng?</li>
            <li><strong>Sự bào mòn lòng trắc ẩn:</strong> AI không có thấu cảm. Sự lạnh lùng của số liệu có thể xóa nhòa hoàn cảnh phạm tội mang tính người.</li>
        </ul>

        <h3>4. Kiến nghị lộ trình cho Việt Nam</h3>
        <p>Để tận dụng sức mạnh công nghệ mà vẫn bảo vệ quyền con người, Việt Nam cần một lộ trình 3 giai đoạn:</p>
        <ol>
            <li><strong>Giai đoạn 1 (2025-2027): Áp dụng ở mức độ "Hỗ trợ hành chính".</strong> Chỉ dùng AI để phân loại hồ sơ, số hóa chứng cứ, tóm tắt nội dung đơn khởi kiện, tự động hóa quy trình tống đạt.</li>
            <li><strong>Giai đoạn 2 (2028-2030): Bước đầu "Hỗ trợ chuyên môn".</strong> Ứng dụng AI tra cứu án lệ, gợi ý các điều luật liên quan để Thẩm phán tham khảo. Nghiêm cấm AI can thiệp vào việc định tội danh.</li>
            <li><strong>Giai đoạn 3 (Sau 2030): "Thẩm phán điện tử có điều kiện".</strong> Chỉ áp dụng giải quyết tự động với các tranh chấp thương mại nhỏ, vi phạm hành chính rõ ràng (như phạt nguội giao thông), có sự đồng ý trước của các bên.</li>
        </ol>
        <p>Kết lại, <em>"Máy móc không thể có tòa án lương tâm"</em>. AI chỉ có thể là trợ lý vĩ đại của Thẩm phán, chứ không bao giờ được trở thành kẻ thay thế họ trên bệ xét xử.</p>
    `,
    attachments: [
        { name: "Phu_luc_so_lieu_AI_Quoc_te_2026.pdf", type: "pdf", size: "1.2 MB" },
        { name: "De_xuat_Khung_phap_ly_AI_Tong_hop.docx", type: "doc", size: "850 KB" }
    ]
};

const LATEST_NEWS = [
    { id: 2, title: "Hoàn thiện pháp luật về bảo vệ dữ liệu cá nhân trong bối cảnh chuyển đổi số", date: "10/03/2026", image: "/thumb1.png" },
    { id: 3, title: "Một số bất cập trong quy định về hợp đồng điện tử và hướng hoàn thiện", date: "05/03/2026", image: "/thumb3.png" },
    { id: 4, title: "Bảo hộ quyền sở hữu trí tuệ đối với các tác phẩm do AI tạo ra", date: "28/02/2026", image: "/thumb2.png" },
];

const MIN_FONT = 80;
const MAX_FONT = 140;

const NghienCuuTraoDoiDetailPage = () => {
    const { id } = useParams();
    const article = ARTICLE;

    const [fontSize, setFontSize] = useState(100);
    const [copied, setCopied] = useState(false);
    const [isChartZoomed, setIsChartZoomed] = useState(false);

    const increaseFontSize = () => setFontSize(f => Math.min(f + 10, MAX_FONT));
    const decreaseFontSize = () => setFontSize(f => Math.max(f - 10, MIN_FONT));

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20 relative">
            <div className="container mx-auto px-4 max-w-[1200px] pt-6">

                {/* Breadcrumb */}
                <div className="flex items-center flex-wrap gap-1 text-[13px] text-gray-500 mb-6">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={13} />
                    <Link to="/tin-tuc/noi-bat" className="hover:text-blue-600">Tin tức</Link>
                    <ChevronRight size={13} />
                    <Link to="/tin-tuc/nghien-cuu-trao-doi" className="hover:text-blue-600">Nghiên cứu & Trao đổi</Link>
                    <ChevronRight size={13} />
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">Chi tiết</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* === MAIN ARTICLE === */}
                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8">

                            {/* Category Badge */}
                            <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold px-3 py-1 rounded mb-4 uppercase tracking-wider">{article.domain}</span>

                            {/* Title */}
                            <h1 className="text-[24px] md:text-[32px] font-bold text-[#0f4c81] leading-tight mb-6">{article.title}</h1>

                            {/* Meta Data */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <p className="font-semibold text-gray-800 text-[15px] mb-1">Tác giả: {article.author}</p>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                                        <Calendar size={14} /> Xuất bản: {article.date} | Cập nhật gần nhất: {article.date}
                                    </div>
                                </div>

                                {/* Toolbar */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-1 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                                        <button onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT} className="px-3 py-1.5 hover:bg-gray-200 disabled:opacity-40 transition-colors text-gray-600" title="Giảm cỡ chữ">
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-2 text-[12px] font-bold text-gray-700 min-w-[44px] text-center">{fontSize}%</span>
                                        <button onClick={increaseFontSize} disabled={fontSize >= MAX_FONT} className="px-3 py-1.5 hover:bg-gray-200 disabled:opacity-40 transition-colors text-gray-600" title="Tăng cỡ chữ">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button onClick={handleCopyLink} title="Sao chép liên kết" className={`p-1.5 px-3 flex items-center gap-1.5 rounded-md border font-medium text-[12px] transition-colors ${copied ? 'border-green-300 bg-green-50 text-green-600' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                                        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Đã chép' : 'Copy'}
                                    </button>
                                    <button title="Đọc bài viết (TTS)" className="p-1.5 px-3 flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 text-blue-700 font-medium text-[12px] hover:bg-blue-100 transition-colors">
                                        <Volume2 size={14} /> Nghe
                                    </button>
                                    <button title="Chia sẻ Facebook" className="p-1.5 rounded-md border border-gray-200 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                        <Facebook size={16} className="fill-current" />
                                    </button>
                                </div>
                            </div>

                            {/* ABSTRACT */}
                            <div className="bg-[#f0f5fa] border-l-4 border-[#0f4c81] p-6 mb-8 rounded-r-lg">
                                <h4 className="text-[13px] font-bold text-[#0f4c81] uppercase tracking-wider mb-2">Tóm tắt</h4>
                                <p className="text-gray-700 font-medium italic leading-relaxed text-[15px]">{article.abstract}</p>
                            </div>

                            {/* Main Image */}
                            <div className="mb-8">
                                <div className="rounded-xl overflow-hidden aspect-[16/9] bg-gray-100">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[13px] text-gray-500 italic text-center mt-3">{article.caption}</p>
                            </div>

                            {/* Article Content */}
                            <div
                                className="prose prose-blue prose-headings:text-[#0f4c81] prose-a:text-blue-600 max-w-none text-gray-800 leading-[1.8]"
                                style={{ fontSize: `${fontSize}%` }}
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* Data Chart / Visual Analysis Block */}
                            <div className="my-12 border border-blue-100 bg-white rounded-xl shadow-sm p-6 relative group">
                                <h4 className="font-bold text-gray-800 text-center mb-4 text-[16px]">Biểu đồ: Tỷ lệ ứng dụng AI tại các tòa án thế giới (2020 - 2025)</h4>
                                <div className="relative aspect-video bg-gray-50 border border-gray-200 rounded flex items-center justify-center overflow-hidden cursor-zoom-in group-hover:border-blue-300 transition-colors" onClick={() => setIsChartZoomed(true)}>
                                    <img src="/poster2.png" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-blue-400 font-bold text-2xl">MOCK CHART IMAGE</span>' }} alt="Chart" className="opacity-60 mix-blend-multiply" />
                                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded shadow text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Maximize2 size={18} />
                                    </div>
                                </div>
                                <p className="text-[12px] text-gray-500 italic text-center mt-3">Nguồn dữ liệu: Báo cáo thường niên của Ủy ban Tư pháp Quốc tế (2026)</p>
                            </div>

                            {/* Source Info */}
                            <div className="mt-10 pt-6 border-t border-gray-100 text-right">
                                <p className="text-[14px] text-gray-600">Nguồn xuất bản: <span className="font-bold text-[#0f4c81] italic">{article.source}</span></p>
                            </div>

                        </div>

                        {/* ATTACHMENTS (Tài liệu đính kèm) */}
                        {article.attachments && article.attachments.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h3 className="text-[18px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <Download className="text-blue-600" size={20} /> Tài liệu đính kèm
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {article.attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className={`w-10 h-10 rounded shadow-sm flex items-center justify-center shrink-0 ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                    {file.type === 'pdf' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[14px] font-semibold text-gray-800 truncate group-hover:text-blue-700">{file.name}</p>
                                                    <p className="text-[12px] text-gray-500 mt-0.5">{file.size}</p>
                                                </div>
                                            </div>
                                            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* === SIDEBAR === */}
                    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
                        {/* Event Banner */}
                        <div className="rounded-xl overflow-hidden shadow-sm border border-orange-200 group cursor-pointer relative">
                            <img src="/poster1.png" alt="Sự kiện" className="w-full object-cover aspect-square opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent flex flex-col justify-end p-5">
                                <h4 className="text-yellow-400 font-bold text-sm uppercase drop-shadow-md pb-1 border-b border-yellow-400/50">Lễ tổng kết</h4>
                                <h5 className="text-white font-bold text-lg leading-tight mt-2 drop-shadow-md">Giải thưởng sinh viên nghiên cứu khoa học pháp lý 2026</h5>
                            </div>
                        </div>

                        {/* Latest News */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-[#0f4c81] px-4 py-3">
                                <h3 className="text-white font-bold text-[14px]">Tin bài cùng lĩnh vực</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {LATEST_NEWS.map(item => (
                                    <Link key={item.id} to={`/tin-tuc/nghien-cuu-trao-doi/${item.id}`} className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group">
                                        <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</p>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1">
                                                <Calendar size={10} /> {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-3 border-t border-gray-100">
                                <Link to="/tin-tuc/nghien-cuu-trao-doi" className="flex items-center gap-1 text-[13px] text-blue-600 font-semibold hover:text-blue-800">
                                    Xem tất cả <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Contact Widget */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 pb-6">
                            <h3 className="font-bold text-[15px] text-[#0f4c81] mb-2">Đóng góp nghiên cứu</h3>
                            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">Các chuyên gia, nhà nghiên cứu có thể chia sẻ công trình nghiên cứu để đăng tải trên hệ thống.</p>
                            <div className="space-y-2">
                                <a href="mailto:banbientap@cplqg.vn" className="flex items-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded transition-colors text-[13px] justify-center">
                                    <MessageSquare size={15} /> Liên hệ Ban biên tập
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Lightbox Modal Output */}
            {isChartZoomed && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12">
                    <button onClick={() => setIsChartZoomed(false)} className="absolute top-6 right-6 text-white hover:text-yellow-400 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <X size={28} />
                    </button>
                    <div className="bg-white rounded-md w-full max-w-5xl aspect-video overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <img src="/poster2.png" alt="Chart Zoomed" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center text-blue-500 font-bold text-3xl">MOCK CHART IMAGE [ZOOMED]</div>' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NghienCuuTraoDoiDetailPage;

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ChevronRight, Copy, Share2, Facebook, Phone, MessageSquare, ArrowRight, Minus, Plus, Volume2, Check } from 'lucide-react';

// ---- MOCK ARTICLE DATA ----
const ARTICLE = {
    id: 1,
    title: "Mô hình điểm \"Xã thông minh\" tại Bắc Giang: Đưa pháp luật đến từng hộ dân qua ứng dụng số",
    date: "12/03/2026 09:30",
    category: "Mô hình điển hình",
    author: "Theo Cổng Thông tin Điện tử Bộ Tư pháp",
    image: "/story1.png",
    caption: "Cán bộ xã hướng dẫn người dân sử dụng ứng dụng pháp luật số tại Bắc Giang. Ảnh: CPLQG.",
    tags: ["Câu chuyện thành công", "Mô hình điển hình", "Ứng dụng số"],
    content: `
        <p>Sau khi Nghị quyết số 27-NQ/TW về xây dựng Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam đến năm 2030, định hướng đến năm 2045 được ban hành, tỉnh Bắc Giang đã triển khai thí điểm mô hình "Xã thông minh" tại 12 xã trên địa bàn. Đây là mô hình tích hợp các ứng dụng số trong quản lý nhà nước tại cấp xã, trong đó nổi bật là chức năng phổ biến và tra cứu pháp luật.</p>
        
        <h3>Điểm nhấn của mô hình</h3>
        <p>Mỗi hộ dân được cấp một tài khoản định danh điện tử (thông qua ứng dụng VNeID), kết nối trực tiếp với hệ thống thông báo pháp luật của Cổng Pháp luật Quốc gia. Khi có văn bản pháp luật mới liên quan đến đất đai, hôn nhân gia đình hoặc kinh doanh, hệ thống sẽ tự động gửi thông báo (push notification) tới điện thoại của người dân, đồng thời hệ thống loa truyền thanh thông minh tại thôn, xã cũng phát nội dung tóm tắt bằng tiếng phổ thông và tiếng địa phương.</p>
        
        <h3>Kết quả đạt được sau 2 năm triển khai</h3>
        <ul>
            <li>Trên <strong>85%</strong> hộ dân tại 12 xã thí điểm đã tiếp cận được ít nhất một văn bản pháp luật mới thông qua ứng dụng số trong năm 2025.</li>
            <li>Số vụ tranh chấp đất đai phải đưa ra cơ quan Nhà nước giải quyết <strong>giảm 70%</strong> so với trước khi triển khai mô hình.</li>
            <li>Tỷ lệ người dân hài lòng với chất lượng dịch vụ hành chính công tại cấp xã <strong>tăng từ 72% lên 94%</strong>.</li>
            <li>Chi phí tổ chức các hội nghị phổ biến pháp luật trực tiếp <strong>giảm 60%</strong>, thay thế bằng các buổi phát sóng trực tuyến và hội thảo trực tuyến.</li>
        </ul>
        
        <h3>Bài học kinh nghiệm</h3>
        <p>Theo ông Trần Văn Hùng, Giám đốc Sở Tư pháp Bắc Giang, thành công của mô hình đến từ ba yếu tố then chốt:</p>
        <ol>
            <li><strong>Quyết tâm chính trị từ cấp lãnh đạo:</strong> Bí thư Đảng ủy và Chủ tịch UBND xã trực tiếp chỉ đạo và kiểm tra tiến độ triển khai mỗi tuần.</li>
            <li><strong>Đội ngũ cán bộ được đào tạo bài bản:</strong> 100% cán bộ tư pháp cấp xã được đào tạo sử dụng hệ thống, đồng thời là "đại sứ số" hướng dẫn người dân.</li>
            <li><strong>Phối hợp chặt chẽ với doanh nghiệp công nghệ:</strong> Sở Tư pháp ký biên bản ghi nhớ hợp tác với 3 công ty công nghệ để đảm bảo hệ thống hoạt động ổn định 24/7.</li>
        </ol>
        
        <p>Mô hình "Xã thông minh" tại Bắc Giang đang được Bộ Tư pháp xem xét để nhân rộng ra toàn quốc trong giai đoạn 2026–2030, với mục tiêu đưa <em>100% hộ dân</em> tiếp cận pháp luật thông qua các nền tảng số vào năm 2030.</p>
    `
};

const LATEST_NEWS = [
    { id: 2, title: "Hà Nội: 100% TTHC mức độ 4 trên Cổng DVC Quốc gia trong năm 2025", date: "10/03/2026", image: "/thumb1.png" },
    { id: 3, title: "Bộ Tư pháp vinh danh 50 tập thể xuất sắc tuyên truyền pháp luật", date: "08/03/2026", image: "/thumb2.png" },
    { id: 5, title: "Đà Nẵng xây dựng mạng lưới tuyên truyền viên pháp luật cơ sở 1.200 thành viên", date: "05/03/2026", image: "/thumb3.png" },
    { id: 6, title: "Cần Thơ giải quyết dứt điểm 312 vụ khiếu nại tố cáo phức tạp", date: "03/03/2026", image: "/thumb1.png" },
];

const MIN_FONT = 85;
const MAX_FONT = 130;

const SuccessStoryDetailPage = () => {
    const { id } = useParams();
    const article = ARTICLE; // In a real app, fetch by id

    const [fontSize, setFontSize] = useState(100);
    const [copied, setCopied] = useState(false);

    const increaseFontSize = () => setFontSize(f => Math.min(f + 10, MAX_FONT));
    const decreaseFontSize = () => setFontSize(f => Math.max(f - 10, MIN_FONT));

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            <div className="container mx-auto px-4 max-w-[1200px] pt-6">
                {/* Breadcrumb */}
                <div className="flex items-center flex-wrap gap-1 text-[13px] text-gray-500 mb-6">

                    <Link to="/cau-chuyen-thanh-cong" className="hover:text-blue-600">Tin tức</Link>
                    <ChevronRight size={13} />
                    <Link to="/cau-chuyen-thanh-cong" className="hover:text-blue-600">Câu chuyện thành công</Link>
                    <ChevronRight size={13} />
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">Chi tiết</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* === MAIN ARTICLE === */}
                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                            {/* Category Tag */}
                            <span className="inline-block bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full mb-4">{article.category}</span>

                            {/* Title */}
                            <h1 className="text-[22px] md:text-[26px] font-bold text-[#0f4c81] leading-snug mb-4">{article.title}</h1>

                            {/* Date + Toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-5 border-b border-gray-100">
                                <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                                    <Calendar size={14} /> {article.date}
                                </div>
                                {/* Toolbar */}
                                <div className="flex items-center gap-2">
                                    {/* Font size controls */}
                                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                        <button onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT} className="px-2.5 py-1.5 hover:bg-gray-200 disabled:opacity-40 transition-colors text-gray-600">
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-2 text-[12px] font-semibold text-gray-600 min-w-[36px] text-center">{fontSize}%</span>
                                        <button onClick={increaseFontSize} disabled={fontSize >= MAX_FONT} className="px-2.5 py-1.5 hover:bg-gray-200 disabled:opacity-40 transition-colors text-gray-600">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    {/* Copy Link */}
                                    <button onClick={handleCopyLink} title="Sao chép liên kết" className={`p-2 rounded-lg border transition-colors ${copied ? 'border-green-300 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                                        {copied ? <Check size={15} /> : <Copy size={15} />}
                                    </button>
                                    {/* Share Facebook */}
                                    <button title="Chia sẻ Facebook" className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-blue-600 hover:bg-blue-50 transition-colors">
                                        <Facebook size={15} />
                                    </button>
                                    {/* TTS */}
                                    <button title="Đọc bài viết" className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
                                        <Volume2 size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="mb-5">
                                <div className="rounded-xl overflow-hidden aspect-[16/9] bg-gray-100">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[12px] text-gray-400 italic text-center mt-2">{article.caption}</p>
                            </div>

                            {/* Article Content */}
                            <div
                                className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                                style={{ fontSize: `${fontSize}%` }}
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            {/* Source / Author */}
                            <div className="mt-8 pt-5 border-t border-gray-100">
                                <p className="text-[13px] text-gray-500 italic font-semibold">{article.author}</p>
                            </div>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {article.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-[12px] font-medium rounded-full border border-gray-200">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* === SIDEBAR === */}
                    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
                        {/* Latest News */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-[#0f4c81] px-4 py-3">
                                <h3 className="text-white font-bold text-[14px]">Tin mới nhất</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {LATEST_NEWS.map(item => (
                                    <Link key={item.id} to={`/cau-chuyen-thanh-cong/${item.id}`} className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group">
                                        <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-600 line-clamp-2 leading-snug">{item.title}</p>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1">
                                                <Calendar size={10} /> {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-3 border-t border-gray-100">
                                <Link to="/cau-chuyen-thanh-cong" className="flex items-center gap-1 text-[13px] text-blue-600 font-semibold hover:text-blue-800">
                                    Xem tất cả <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Contact Widget */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-[15px] text-gray-800 mb-2">Chúng tôi luôn lắng nghe & phản hồi</h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">Người dân và doanh nghiệp có thể gửi kiến nghị, góp ý trực tiếp tới Ban biên tập Cổng Pháp luật Quốc gia.</p>
                            <div className="space-y-2">
                                <a href="tel:18009090" className="flex items-center gap-2 w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-[13px]">
                                    <Phone size={15} /> Gọi tổng đài 1800 9090
                                </a>
                                <Link to="/lien-he" className="flex items-center gap-2 w-full px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-100 transition-colors text-[13px]">
                                    <MessageSquare size={15} /> Gửi góp ý trực tiếp
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SuccessStoryDetailPage;

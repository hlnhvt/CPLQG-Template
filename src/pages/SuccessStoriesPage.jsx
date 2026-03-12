import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, ChevronLeft, Phone, MessageSquare, ArrowRight } from 'lucide-react';

// ---- MOCK DATA ----
const FEATURED_MAIN = {
    id: 1,
    title: "Mô hình điểm \"Xã thông minh\" tại Bắc Giang: Đưa pháp luật đến từng hộ dân qua ứng dụng số",
    summary: "Sau 2 năm triển khai, mô hình xã thông minh tại 12 xã thuộc tỉnh Bắc Giang đã giúp trên 85% hộ dân tiếp cận được các văn bản pháp luật mới nhất, giảm 70% tình trạng tranh chấp đất đai tại cơ sở.",
    date: "12/03/2026",
    image: "/story1.png",
    category: "Mô hình điển hình"
};

const FEATURED_SUB = [
    { id: 2, title: "Hà Nội: 100% TTHC mức độ 4 trên Cổng DVC Quốc gia trong năm 2025", date: "10/03/2026", image: "/thumb1.png" },
    { id: 3, title: "Bộ Tư pháp vinh danh 50 tập thể, cá nhân xuất sắc trong tuyên truyền pháp luật", date: "08/03/2026", image: "/thumb2.png" },
    { id: 4, title: "Câu chuyện nữ hòa giải viên Lê Thị Hoa – 20 năm giữ vững hòa khí làng xã", date: "06/03/2026", image: "/thumb3.png" },
];

const ARTICLES = [
    { id: 5, title: "Đà Nẵng xây dựng thành công mạng lưới tuyên truyền viên pháp luật cơ sở với trên 1.200 thành viên", summary: "Mạng lưới tuyên truyền viên tình nguyện tại Đà Nẵng đã tiếp cận hơn 500.000 lượt người dân trong 3 năm qua thông qua các buổi đối thoại, hội nghị cộng đồng và phát sóng trực tiếp trên mạng xã hội.", date: "05/03/2026", image: "/thumb1.png" },
    { id: 6, title: "Thành công của Tổ công tác liên ngành trong xử lý các vụ việc khiếu nại tố cáo tại Cần Thơ", summary: "Chỉ trong 6 tháng hoạt động, Tổ công tác liên ngành tại Cần Thơ đã giải quyết dứt điểm 312 vụ việc khiếu nại phức tạp, tồn đọng, giảm 45% số đơn thư vượt cấp.", date: "03/03/2026", image: "/thumb2.png" },
    { id: 7, title: "Mô hình phòng họp pháp luật không giấy tờ tại Thừa Thiên – Huế tiết kiệm hàng trăm triệu đồng mỗi năm", summary: "Sau khi chuyển đổi toàn bộ quy trình họp sang hình thức số, Sở Tư pháp Thừa Thiên – Huế tiết kiệm trên 300 triệu đồng/năm chi phí in ấn và tổ chức họp, đồng thời tăng hiệu suất lưu trữ văn bản lên 3 lần.", date: "01/03/2026", image: "/thumb3.png" },
    { id: 8, title: "Quảng Ninh đạt 100% hộ gia đình ký cam kết chấp hành pháp luật", summary: "Chiến dịch vận động ký cam kết chấp hành pháp luật năm 2025 tại Quảng Ninh đã tạo đột phá khi đạt tỷ lệ 100% hộ gia đình ký cam kết, đặc biệt trong lĩnh vực đất đai và trật tự xây dựng.", date: "27/02/2026", image: "/thumb1.png" },
    { id: 9, title: "Điển hình tiên tiến: Chị Nguyễn Thị An – Hòa giải viên không lương, người bảo vệ hòa khí thôn bản", summary: "Với hơn 15 năm làm hòa giải viên tình nguyện tại thôn Bình An, xã Hòa Hiệp, chị Nguyễn Thị An đã thành công hòa giải 94% trong tổng số 187 vụ mâu thuẫn tại cơ sở, được Bộ Tư pháp tặng Bằng khen.", date: "24/02/2026", image: "/thumb2.png" },
    { id: 10, title: "Ứng dụng VNeID giúp rút ngắn thời gian xử lý hồ sơ đăng ký hộ khẩu xuống còn 30 phút", summary: "Kể từ khi tích hợp đầy đủ với ứng dụng VNeID, thời gian xử lý hồ sơ đăng ký thường trú tại 63 tỉnh thành đã rút ngắn từ trung bình 5 ngày xuống còn dưới 30 phút, nhờ hệ thống xác thực điện tử và phê duyệt tự động.", date: "20/02/2026", image: "/thumb3.png" },
    { id: 11, title: "Long An: Câu lạc bộ pháp luật thanh niên – nơi hình thành ý thức tuân thủ pháp luật từ gốc", summary: "Mô hình Câu lạc bộ pháp luật thanh niên tại Long An với hơn 8.000 thành viên và 120 chi hội đã trở thành hạt nhân nòng cốt trong công tác tuyên truyền, phổ biến giáo dục pháp luật cho thế hệ trẻ.", date: "16/02/2026", image: "/thumb1.png" },
    { id: 12, title: "Kết quả nổi bật của chương trình hỗ trợ pháp lý miễn phí cho hộ nghèo vùng cao năm 2025", summary: "Qua chương trình, 15.400 hộ nghèo tại 12 tỉnh miền núi phía Bắc được hỗ trợ pháp lý miễn phí trong các lĩnh vực đất đai, hôn nhân gia đình và bảo hiểm xã hội, với tỷ lệ giải quyết thành công đạt 88%.", date: "10/02/2026", image: "/thumb2.png" },
];

const LATEST_NEWS = ARTICLES.slice(0, 5);
const ITEMS_PER_PAGE = 6;

const SuccessStoriesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(ARTICLES.length / ITEMS_PER_PAGE);
    const currentArticles = ARTICLES.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) {
            setCurrentPage(p);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const paginationPages = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-[#0f4c81] to-[#1a6cc4] text-white py-8">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center gap-2 text-[13px] text-blue-200 mb-3">
                        <Link to="/" className="hover:text-white">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Câu chuyện thành công</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold">Câu chuyện thành công</h1>
                    <p className="text-blue-200 text-[14px] mt-1">Mô hình điển hình và kinh nghiệm thực tiễn trong xây dựng, triển khai pháp luật</p>
                </div>
            </div>

            {/* Banner slogan */}
            <div className="bg-[#c0392b] text-white text-center py-3 px-4 text-[14px] font-bold tracking-wide uppercase">
                ĐƯA NGHỊ QUYẾT ĐẠI HỘI XIV CỦA ĐẢNG VÀO CUỘC SỐNG
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* === MAIN CONTENT === */}
                    <div className="flex-1 min-w-0">
                        {/* --- Featured Section --- */}
                        <div className="mb-8">
                            {/* Main Feature */}
                            <Link to={`/cau-chuyen-thanh-cong/${FEATURED_MAIN.id}`} className="block group mb-4">
                                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-gray-200">
                                    <img src={FEATURED_MAIN.image} alt={FEATURED_MAIN.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <span className="inline-block bg-blue-600 text-white text-[11px] font-bold px-2 py-1 rounded mb-2">{FEATURED_MAIN.category}</span>
                                        <h2 className="text-white font-bold text-[18px] md:text-[22px] leading-snug line-clamp-2 group-hover:text-yellow-300 transition-colors">{FEATURED_MAIN.title}</h2>
                                        <p className="text-gray-200 text-[13px] mt-1 line-clamp-2">{FEATURED_MAIN.summary}</p>
                                        <div className="flex items-center gap-1 text-gray-300 text-[12px] mt-2">
                                            <Calendar size={13} /> {FEATURED_MAIN.date}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Sub Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {FEATURED_SUB.map(item => (
                                    <Link key={item.id} to={`/cau-chuyen-thanh-cong/${item.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-shadow">
                                        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-[13px] text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-2">
                                                <Calendar size={11} /> {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t-2 border-blue-600 mb-6 flex items-center gap-3">
                            <span className="bg-blue-600 text-white text-[13px] font-bold px-4 py-1.5 -mt-px">Danh sách bài viết</span>
                        </div>

                        {/* Article List */}
                        <div className="space-y-4 mb-8">
                            {currentArticles.map(article => (
                                <Link key={article.id} to={`/cau-chuyen-thanh-cong/${article.id}`} className="group flex gap-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md p-4 transition-shadow">
                                    <div className="w-36 md:w-44 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[15px] text-gray-800 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">{article.title}</h3>
                                        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2">{article.summary}</p>
                                        <div className="flex items-center gap-1 text-gray-400 text-[12px] mt-3">
                                            <Calendar size={12} /> {article.date}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2">
                                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 h-9 px-3 border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 text-[13px]">
                                    <ChevronLeft size={15} /> Trước
                                </button>
                                {paginationPages().map((p, i) => p === '...'
                                    ? <span key={i} className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
                                    : <button key={p} onClick={() => handlePage(p)} className={`w-9 h-9 rounded border text-[13px] font-semibold ${currentPage === p ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'}`}>{p}</button>
                                )}
                                <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 h-9 px-3 border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 text-[13px]">
                                    Sau <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </div>

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
                                            <p className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</p>
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

export default SuccessStoriesPage;

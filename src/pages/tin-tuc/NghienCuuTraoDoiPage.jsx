import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, ChevronLeft, ArrowRight, Filter, Search, Phone, MessageSquare } from 'lucide-react';

// ---- MOCK DATA ----
const DOMAINS = ["Tất cả lĩnh vực", "Dân sự", "Hình sự", "Hành chính", "Thương mại", "Lao động", "Sở hữu trí tuệ"];
const YEARS = ["Tất cả năm", "2026", "2025", "2024", "2023"];
const AUTHORS = ["Tất cả tác giả", "PGS.TS Nguyễn Văn A", "TS Lê Thị B", "ThS Trần C", "Viện Khoa học pháp lý", "Nhóm nghiên cứu ĐH Luật HN"];

const FEATURED_MAIN = {
    id: 1,
    title: "Ứng dụng Trí tuệ nhân tạo trong hoạt động xét xử: Kinh nghiệm quốc tế và kiến nghị cho Việt Nam",
    summary: "Bài viết phân tích thực tiễn ứng dụng AI tại các hệ thống tư pháp tiên tiến như Mỹ, Trung Quốc, EU, từ đó đề xuất lộ trình và khung pháp lý phù hợp nhằm từng bước áp dụng công nghệ này vào hoạt động tố tụng tại Việt Nam.",
    author: "PGS.TS Nguyễn Văn A",
    domain: "Hình sự",
    date: "15/03/2026",
    image: "/thumb2.png",
};

const FEATURED_SUB = [
    { id: 2, title: "Hoàn thiện pháp luật về bảo vệ dữ liệu cá nhân trong bối cảnh chuyển đổi số", author: "TS Lê Thị B", domain: "Dân sự", date: "10/03/2026", image: "/thumb1.png" },
    { id: 3, title: "Một số bất cập trong quy định về hợp đồng điện tử và hướng hoàn thiện", author: "ThS Trần C", domain: "Thương mại", date: "05/03/2026", image: "/thumb3.png" },
    { id: 4, title: "Bảo hộ quyền sở hữu trí tuệ đối với các tác phẩm do AI tạo ra", author: "Viện Khoa học pháp lý", domain: "Sở hữu trí tuệ", date: "28/02/2026", image: "/thumb2.png" },
];

const INIT_ARTICLES = [
    { id: 5, title: "Trách nhiệm bồi thường thiệt hại ngoài hợp đồng do AI gây ra", summary: "Phân tích các nguyên tắc quy trách nhiệm bồi thường khi phần mềm AI tự trị gây thiệt hại cho bên thứ ba, dựa trên nền tảng pháp luật dân sự hiện hành.", author: "PGS.TS Nguyễn Văn A", domain: "Dân sự", date: "20/02/2026", image: "/thumb3.png" },
    { id: 6, title: "Xung đột pháp luật trong các giao dịch thương mại điện tử xuyên biên giới", summary: "Nghiên cứu về thẩm quyền tài phán và luật áp dụng trong các tranh chấp thương mại điện tử quốc tế, với các bài học kinh nghiệm từ EU.", author: "Nhóm nghiên cứu ĐH Luật HN", domain: "Thương mại", date: "15/02/2026", image: "/thumb1.png" },
    { id: 7, title: "Bảo vệ quyền lợi người lao động làm việc trên các nền tảng công nghệ (Gig economy)", summary: "Đánh giá thực trạng pháp lý và đề xuất các giải pháp nhằm công nhận tư cách pháp lý và bảo vệ quyền lợi chính đáng cho tài xế xe công nghệ, shipper.", author: "TS Lê Thị B", domain: "Lao động", date: "10/02/2026", image: "/thumb2.png" },
    { id: 8, title: "Giải quyết tranh chấp hành chính bằng phương thức hòa giải, đối thoại", summary: "Thực tiễn áp dụng Luật Hòa giải, đối thoại tại Tòa án và những vướng mắc cần tháo gỡ để nâng cao tỷ lệ giải quyết tranh chấp hành chính ngoài phiên tòa.", author: "Viện Khoa học pháp lý", domain: "Hành chính", date: "05/02/2026", image: "/thumb1.png" },
    { id: 9, title: "Pháp luật về kiểm soát tập trung kinh tế trong lĩnh vực công nghệ số", summary: "Nghiên cứu các xu hướng M&A trong lĩnh vực công nghệ và định hướng hoàn thiện quy định về kiểm soát tập trung kinh tế tại Việt Nam.", author: "ThS Trần C", domain: "Thương mại", date: "25/01/2026", image: "/thumb3.png" },
    { id: 10, title: "Hoàn thiện quy định về chứng cứ điện tử trong tố tụng hình sự", summary: "Nghịch lý giữa sự phát triển nhanh chóng của tội phạm công nghệ cao và hệ thống luật định về thu thập, đánh giá chứng cứ điện tử.", author: "PGS.TS Nguyễn Văn A", domain: "Hình sự", date: "15/01/2026", image: "/thumb2.png" },
    { id: 11, title: "Thực trạng và giải pháp hoàn thiện pháp luật về nhượng quyền thương mại", summary: "Đánh giá các bất cập trong quy định về đăng ký hoạt động nhượng quyền và quyền, nghĩa vụ của các bên trong hợp đồng nhượng quyền.", author: "Nhóm nghiên cứu ĐH Luật HN", domain: "Thương mại", date: "10/01/2026", image: "/thumb1.png" },
];

const LATEST_NEWS = INIT_ARTICLES.slice(0, 5);
const ITEMS_PER_PAGE = 5;

const NghienCuuTraoDoiPage = () => {
    const [domainFilter, setDomainFilter] = useState("Tất cả lĩnh vực");
    const [authorFilter, setAuthorFilter] = useState("Tất cả tác giả");
    const [yearFilter, setYearFilter] = useState("Tất cả năm");
    
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredArticles, setFilteredArticles] = useState(INIT_ARTICLES);

    const isFiltered = domainFilter !== "Tất cả lĩnh vực" || authorFilter !== "Tất cả tác giả" || yearFilter !== "Tất cả năm";

    const handleFilter = () => {
        let result = [...INIT_ARTICLES];
        if (domainFilter !== "Tất cả lĩnh vực") {
            result = result.filter(a => a.domain === domainFilter);
        }
        if (authorFilter !== "Tất cả tác giả") {
            result = result.filter(a => a.author === authorFilter);
        }
        if (yearFilter !== "Tất cả năm") {
            result = result.filter(a => a.date.includes(yearFilter));
        }
        setFilteredArticles(result);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setDomainFilter("Tất cả lĩnh vực");
        setAuthorFilter("Tất cả tác giả");
        setYearFilter("Tất cả năm");
        setFilteredArticles(INIT_ARTICLES);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const currentArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) {
            setCurrentPage(p);
            window.scrollTo({ top: 600, behavior: 'smooth' });
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
                        <span className="hover:text-white cursor-pointer">Tin tức</span>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Nghiên cứu - Trao đổi</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold">Nghiên cứu & Trao đổi pháp luật</h1>
                    <p className="text-blue-200 text-[14px] mt-2 max-w-3xl">Diễn đàn học thuật, nơi công bố các công trình nghiên cứu, phân tích chuyên sâu về hệ thống pháp luật Việt Nam và quốc tế.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* === MAIN CONTENT === */}
                    <div className="flex-1 min-w-0">
                        
                        {/* --- Featured Section (Only show if not heavily filtered) --- */}
                        {!isFiltered && (
                            <div className="mb-10">
                                {/* Main Feature */}
                                <Link to={`/tin-tuc/nghien-cuu-trao-doi/${FEATURED_MAIN.id}`} className="block group mb-4">
                                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-gray-200">
                                        <img src={FEATURED_MAIN.image} alt={FEATURED_MAIN.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                            <span className="inline-block bg-blue-600/90 backdrop-blur-sm text-white text-[12px] font-bold px-3 py-1 rounded mb-3 shadow-sm">{FEATURED_MAIN.domain}</span>
                                            <h2 className="text-white font-bold text-[20px] md:text-[26px] leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors drop-shadow-md">{FEATURED_MAIN.title}</h2>
                                            <p className="text-gray-200 text-[14px] mt-3 line-clamp-2 leading-relaxed opacity-90">{FEATURED_MAIN.summary}</p>
                                            <div className="flex items-center gap-4 text-blue-100 text-[13px] mt-4 font-medium">
                                                <span>{FEATURED_MAIN.author}</span>
                                                <span className="w-1 h-1 rounded-full bg-blue-300"></span>
                                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {FEATURED_MAIN.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Sub Features */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    {FEATURED_SUB.map(item => (
                                        <Link key={item.id} to={`/tin-tuc/nghien-cuu-trao-doi/${item.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col">
                                            <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[10px] uppercase font-bold px-2 py-0.5 rounded">{item.domain}</span>
                                            </div>
                                            <div className="p-4 flex flex-col flex-1">
                                                <h3 className="font-bold text-[14px] text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-3 leading-snug mb-3 flex-1">{item.title}</h3>
                                                <div className="flex items-center justify-between text-gray-400 text-[12px]">
                                                    <span className="truncate pr-2 font-medium">{item.author}</span>
                                                    <span className="shrink-0">{item.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="border-t-2 border-blue-600 mb-6 mt-2 flex items-center justify-between">
                            <span className="bg-blue-600 text-white text-[14px] font-bold px-5 py-2 inline-block -mt-px rounded-b-md">
                                Danh mục bài nghiên cứu
                            </span>
                        </div>

                        {/* --- FILTER SECTION --- */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
                            <div className="flex items-center gap-2 mb-4 text-[#0f4c81] font-bold">
                                <Filter size={18} /> <h2>Bộ lọc tìm kiếm</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                {/* Lĩnh vực */}
                                <div>
                                    <label className="block text-[12px] font-semibold text-gray-600 uppercase mb-1.5 tracking-wider">Lĩnh vực pháp luật</label>
                                    <select 
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50/50"
                                        value={domainFilter}
                                        onChange={(e) => setDomainFilter(e.target.value)}
                                    >
                                        {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                {/* Tác giả */}
                                <div>
                                    <label className="block text-[12px] font-semibold text-gray-600 uppercase mb-1.5 tracking-wider">Tác giả</label>
                                    <select 
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50/50"
                                        value={authorFilter}
                                        onChange={(e) => setAuthorFilter(e.target.value)}
                                    >
                                        {AUTHORS.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                                {/* Năm xuất bản */}
                                <div>
                                    <label className="block text-[12px] font-semibold text-gray-600 uppercase mb-1.5 tracking-wider">Năm xuất bản</label>
                                    <select 
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50/50"
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                    >
                                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={handleFilter} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-[14px]">
                                    <Search size={16} /> Lọc kết quả
                                </button>
                                {isFiltered && (
                                    <button onClick={clearFilters} className="text-gray-500 hover:text-red-500 text-[14px] font-medium transition underline">
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* --- LIST SECTION --- */}
                        <div className="space-y-5 mb-10">
                            {currentArticles.length === 0 ? (
                                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
                                    <Search size={40} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-lg font-medium text-gray-600 mb-1">Không tìm thấy bài nghiên cứu nào</p>
                                    <p className="text-sm">Vui lòng điều chỉnh lại điều kiện lọc hoặc <button onClick={clearFilters} className="text-blue-600 hover:underline">xóa bộ lọc</button>.</p>
                                </div>
                            ) : (
                                currentArticles.map(article => (
                                    <Link key={article.id} to={`/tin-tuc/nghien-cuu-trao-doi/${article.id}`} className="group flex flex-col md:flex-row gap-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="w-full md:w-56 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">{article.domain}</span>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-[16px] md:text-[18px] text-[#0f4c81] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">{article.title}</h3>
                                                <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">{article.summary}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-500 text-[12px] font-medium mt-4">
                                                <span>Tác giả: <span className="text-gray-700">{article.author}</span></span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span className="flex items-center gap-1.5 text-gray-400"><Calendar size={13} /> {article.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 text-[14px] transition-colors font-medium">
                                    <ChevronLeft size={16} /> Trước
                                </button>
                                {paginationPages().map((p, i) => p === '...'
                                    ? <span key={i} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                                    : <button key={p} onClick={() => handlePage(p)} className={`w-10 h-10 rounded-lg border text-[14px] font-bold transition-colors ${currentPage === p ? 'bg-[#0f4c81] border-[#0f4c81] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'}`}>{p}</button>
                                )}
                                <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 text-[14px] transition-colors font-medium">
                                    Sau <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* === SIDEBAR === */}
                    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
                        {/* Event Banner */}
                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer relative">
                            <img src="/poster1.png" alt="Sự kiện" className="w-full object-cover aspect-square opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent flex flex-col justify-end p-5">
                                <h4 className="text-yellow-400 font-bold text-sm uppercase drop-shadow-md pb-1 border-b border-yellow-400/50">Hội thảo khoa học</h4>
                                <h5 className="text-white font-bold text-lg leading-tight mt-2 drop-shadow-md">Hoàn thiện pháp luật về tư pháp điện tử năm 2026</h5>
                            </div>
                        </div>

                        {/* Latest News Sidebar */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-[#0f4c81] px-5 py-3.5 flex items-center justify-between">
                                <h3 className="text-white font-bold text-[15px]">Nghiên cứu mới nhất</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {LATEST_NEWS.map(item => (
                                    <Link key={item.id} to={`/tin-tuc/nghien-cuu-trao-doi/${item.id}`} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group">
                                        <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</p>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1.5">
                                                <Calendar size={11} /> {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-3.5 border-t border-gray-100 bg-gray-50/50">
                                <button onClick={clearFilters} className="text-[13px] text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1.5 mx-auto">
                                    Xem tất cả bài viết <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Contact Widget */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
                            <h3 className="font-extrabold text-[#0f4c81] text-[16px] mb-2 uppercase tracking-wide">Nhận gửi đăng bài</h3>
                            <p className="text-[13px] text-gray-600 leading-relaxed mb-5">Ban biên tập luôn hoan nghênh và tiếp nhận các bài viết phân tích, nghiên cứu chuyên sâu từ các chuyên gia, luật sư và nhà nghiên cứu.</p>
                            <div className="space-y-3">
                                <a href="mailto:banbientap@cplqg.vn" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#0f4c81] hover:bg-blue-800 text-white font-bold rounded-lg transition-colors text-[13px] shadow-sm">
                                    <MessageSquare size={16} /> Gửi bài viết (Email)
                                </a>
                                <a href="tel:18009090" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-[#0f4c81] font-bold rounded-lg border border-gray-200 transition-colors text-[13px]">
                                    <Phone size={16} /> Hỗ trợ: 1800 9090
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default NghienCuuTraoDoiPage;

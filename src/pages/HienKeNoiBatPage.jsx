import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Search, ChevronLeft, FileText, ArrowRight, Download, Flame } from 'lucide-react';
import { Section, ConsultCard, HOT_ITEMS, NEW_HIGHLIGHTS, thumb } from './HienKeShared';

// Mock Drafts
const MOCK_DRAFTS = [
    { id: 1, title: "Dự thảo Luật quy định về kiểm soát rủi ro trong lĩnh vực Chính phủ", org: "Chính phủ", type: "Luật", ngayDang: "01/03/2026", hanGopY: "10/04/2026", isExpired: true, isHot: true },
    { id: 2, title: "Dự thảo Pháp lệnh quy định về kiểm soát rủi ro trong lĩnh vực Tài chính", org: "Bộ Tài chính", type: "Pháp lệnh", ngayDang: "02/03/2026", hanGopY: "11/04/2026", isExpired: false, isHot: true },
    { id: 3, title: "Dự thảo Nghị định quy định về kiểm soát rủi ro trong lĩnh vực Tư pháp", org: "Bộ Tư pháp", type: "Nghị định", ngayDang: "03/03/2026", hanGopY: "12/04/2026", isExpired: false },
    { id: 4, title: "Dự thảo Quyết định quy định về kiểm soát rủi ro trong lĩnh vực Y tế", org: "Bộ Y tế", type: "Quyết định", ngayDang: "04/03/2026", hanGopY: "13/04/2026", isExpired: false },
    { id: 5, title: "Dự thảo Thông tư quy định về kiểm soát rủi ro trong lĩnh vực Công an", org: "Bộ Công an", type: "Thông tư", ngayDang: "05/03/2026", hanGopY: "14/04/2026", isExpired: false },
    { id: 6, title: "Dự thảo Nghị quyết quy định về kiểm soát rủi ro trong lĩnh vực Nông nghiệp và PTNT", org: "Bộ Nông nghiệp và PTNT", type: "Nghị quyết", ngayDang: "06/03/2026", hanGopY: "15/04/2026", isExpired: false }
];

// Extended mock data for Nổi bật
const EXPANDED_ITEMS = [
    { ...NEW_HIGHLIGHTS[0], isHot: true }, // Luật Thủ đô (nb1)
    { ...HOT_ITEMS[0], isHot: true },      // Luật Đất đai (h1)
    ...NEW_HIGHLIGHTS.slice(1),
    ...HOT_ITEMS.slice(1),
    { id: 'h5', title: 'Hoàn thiện khung pháp lý về quản lý tài sản số', agency: 'Ngân hàng Nhà nước', status: 'open', deadline: '20/05/2026', participants: 1540, thumb: thumb(4), description: 'Bổ sung định nghĩa pháp lý liên quan đến tiền điện tử và dịch vụ giao dịch tài sản số hiện nay.' },
    { id: 'h6', title: 'Sửa đổi Luật BHXH: Điều kiện hưởng lương hưu', agency: 'Bộ Lao động – TB&XH', status: 'upcoming', deadline: '01/06/2026', participants: 0, thumb: thumb(5), description: 'Tháo gỡ những bất cập trong việc nhận BHXH một lần và điều chỉnh số năm đóng BHXH tối thiểu để nhận hưu trí.' },
    { id: 'h7', title: 'Dự thảo Nghị định bảo vệ dữ liệu cá nhân', agency: 'Bộ Công an', status: 'open', deadline: '10/05/2026', participants: 3200, thumb: thumb(0), description: 'Quy định khắt khe trách nhiệm của các cơ quan, tổ chức khi thu thập, xử lý và lưu trữ dữ liệu cá nhân.' },
    { id: 'h8', title: 'Cơ chế thí điểm phát triển điện gió ngoài khơi', agency: 'Bộ Công Thương', status: 'open', deadline: '15/05/2026', participants: 850, thumb: thumb(1), description: 'Cung cấp cơ chế tín dụng ưu đãi nhằm đẩy mạnh phát triển năng lượng tái tạo hướng biển.' },
    { id: 'h9', title: 'Quy định mới về đấu thầu thiết bị y tế', agency: 'Bộ Y tế', status: 'closed', deadline: '01/04/2026', participants: 1200, thumb: thumb(2), description: 'Đảm bảo quy trình đấu thầu, mua sắm vật tư y tế hiện đại công khai, hạn chế lãng phí.' },
    { id: 'h10', title: 'Góp ý quy chuẩn kỹ thuật nhà ở chung cư', agency: 'Bộ Xây dựng', status: 'open', deadline: '25/04/2026', participants: 410, thumb: thumb(3), description: 'Tiêu chuẩn kỹ thuật mới nhất về an toàn phòng cháy chữa cháy đối với nhà cao tầng.' },
    { id: 'h11', title: 'Nghị định quản lý thuế thương mại điện tử', agency: 'Bộ Tài chính', status: 'upcoming', deadline: '10/06/2026', participants: 0, thumb: thumb(4), description: 'Gia tăng quản lý thuế và truy thu các nguồn thu nhập từ các cá nhân, tổ chức kinh doanh trực tuyến.' },
    { id: 'h12', title: 'Luật Thủ đô (Sửa đổi): Ưu đãi đầu tư', agency: 'UBND TP Hà Nội', status: 'open', deadline: '15/05/2026', participants: 2750, thumb: thumb(5), description: 'Tạo cơ chế đặc thù vượt trội cho Hà Nội thu hút vốn đầu tư công nghệ cao trong và ngoài nước.' },
    { id: 'h13', title: 'Chính sách visa linh hoạt thu hút nhân tài', agency: 'Bộ Ngoại giao', status: 'open', deadline: '05/05/2026', participants: 5600, thumb: thumb(0), description: 'Rào cản visa được gỡ bỏ cho các nhà đầu tư chiến lược, chuyên gia chuyên sâu theo chính sách mới.' },
    { id: 'h14', title: 'Quy hoạch mạng lưới cơ sở giáo dục đại học', agency: 'Bộ Giáo dục và Đào tạo', status: 'open', deadline: '20/05/2026', participants: 1890, thumb: thumb(1), description: 'Kế hoạch sáp nhập, và cấu trúc lại hệ thống các trường công lập nhằm tối đa hóa hiệu suất đào tạo.' },
];

const ITEMS_PER_PAGE = 8;

const HienKeNoiBatPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = useMemo(() => {
        if (!searchTerm) return EXPANDED_ITEMS;
        return EXPANDED_ITEMS.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.agency.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset pagination when searching
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
            {/* Hero Banner with Background */}
            <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                {/* Subtle gold shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-20">
                    <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] mb-6">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90">Vấn đề nổi bật</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        Chúng tôi cần bạn
                    </h1>
                    <p className="text-blue-100/90 text-[15px] max-w-3xl leading-relaxed">
                        Nội dung, chủ đề cần sáng kiến, ý kiến đóng góp của bạn.                     </p>
                </div>
            </div>

            {/* ── Phần 1: Ý tưởng, sáng kiến nổi bật ────────────────────────────────── */}
            <div className="pt-8 container mx-auto px-4 md:px-8 max-w-[1280px] max-w-5xl border-b border-gray-200 mb-4 pb-6">
                {/* Header Đồng nhất */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1e3a8a] shrink-0">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-gray-900 leading-tight">Các chủ đề nổi bật</h2>
                            <p className="text-gray-500 text-[13px] mt-0.5">Hiển thị {filteredItems.length} kết quả</p>
                        </div>
                    </div>

                    <div className="relative w-full sm:w-80 shrink-0">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm dự thảo, cơ quan..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-all text-sm bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>

                {/* List Content */}
                {displayedItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 pt-2">
                        {displayedItems.map(item => (
                            <div key={item.id} className={`relative rounded-xl transition-all ${item.isHot ? 'ring-2 ring-orange-400 ring-offset-2' : ''}`}>
                                {item.isHot && (
                                    <div className="absolute -top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-white">
                                        <Flame size={13} fill="currentColor" strokeWidth={2} /> Đang được quan tâm
                                    </div>
                                )}
                                <ConsultCard
                                    item={item}
                                    to={`/hien-ke/${item.id}`}
                                    accentColor="#1e3a8a"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
                        <p className="text-gray-500">Không tìm thấy kết quả nào phù hợp.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-colors ${currentPage === i + 1
                                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                                    : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* ── Phần 2: Góp ý dự thảo VBQPPL ────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] max-w-5xl mb-16">
                {/* Header Đồng nhất */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-gray-900 leading-tight">Góp ý dự thảo văn bản quy phạm pháp luật</h2>
                            <p className="text-gray-500 text-[13px] mt-0.5">Các dự thảo văn bản pháp luật hiện đang được lấy ý kiến đóng góp rộng rãi.</p>
                        </div>
                    </div>
                    {/* Nút Xem tất cả bên phải */}
                    <Link to="/du-thao" className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm transition-colors shadow-sm whitespace-nowrap">
                        Xem tất cả dự thảo <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <div className="space-y-4">
                        {MOCK_DRAFTS.map((draft, idx) => (
                            <div key={draft.id} className={`flex gap-4 p-4 last:border-b-0 transition-all ${draft.isHot ? 'rounded-xl bg-orange-50/40 border border-orange-100 mb-2' : 'border-b border-gray-50'}`}>
                                <div className={`w-10 h-10 rounded-xl text-[14px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${draft.isHot ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-sm' : 'bg-[#1a3b8b]/10 text-[#1a3b8b]'}`}>
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Link to={`/du-thao/${draft.id}`} className="text-[14px] font-bold text-blue-700 hover:underline leading-snug block mb-1">
                                        {draft.isHot && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded border border-orange-200 mr-2 align-middle"><Flame size={12} strokeWidth={2.5} /> Đang được quan tâm</span>}
                                        {draft.title}
                                    </Link>
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mb-2">
                                        <span className="font-semibold text-gray-600">{draft.org}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{draft.type}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-[11px] px-2 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 bg-white">Toàn văn</button>
                                        <button className="text-[11px] px-2 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 bg-white flex items-center gap-1"><Download size={11} /> Tải về dự thảo</button>
                                    </div>
                                </div>
                                <div className="shrink-0 text-right text-[11px] text-gray-500 min-w-[120px] space-y-1 mt-0.5 hidden sm:block">
                                    <p><span className="text-gray-400">Ngày đăng:</span> {draft.ngayDang}</p>
                                    <p><span className="text-gray-400">Hạn góp ý:</span> <span className={draft.isExpired ? "text-red-500 font-semibold" : ""}>{draft.hanGopY}</span></p>
                                    {draft.isExpired ? (
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded border bg-red-50 text-red-600 border-red-200 text-[10px] font-semibold">Đã hết hạn</span>
                                    ) : (
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded border bg-green-50 text-green-700 border-green-200 text-[10px] font-semibold">Đang lấy ý kiến</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HienKeNoiBatPage;

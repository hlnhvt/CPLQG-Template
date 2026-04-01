import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Search, ChevronLeft } from 'lucide-react';
import { Section, ConsultCard, HOT_ITEMS, thumb } from './HienKeShared';

// Extended mock data for Nổi bật
const EXPANDED_ITEMS = [
    ...HOT_ITEMS,
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
                        Các nội dung, chủ đề cơ quan quản lý nhà nước cần sự hiến kế, tham gia ý kiến, phản biện của xã hội, doanh nghiệp và người dân trong quá trình xây dựng, hoàn thiện chính sách, pháp luật và thi hành hiệu quả pháp luật.
                    </p>
                </div>
            </div>

            <div className="mt-8 container mx-auto px-4 md:px-8 max-w-[1280px] max-w-5xl">

                {/* Top Actions Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1e3a8a] shrink-0">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-gray-900 leading-tight">Danh sách các nội dung nổi bật</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                        {displayedItems.map(item => (
                            <ConsultCard
                                key={item.id}
                                item={item}
                                to={`/hien-ke/${item.id}`}
                                accentColor="#1e3a8a"
                            />
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
        </div>
    );
};

export default HienKeNoiBatPage;

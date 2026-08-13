import React, { useState, useMemo } from 'react';
import { Calendar, ArrowRight, Search, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TinTucHoatDongList({ title, items, categories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [category, setCategory] = useState('Tất cả');

    const isVanBanMoi = title === 'Tin tức giới thiệu văn bản mới';

    const defaultCategories = useMemo(() => {
        if (categories && categories.length > 0) return categories;
        if (isVanBanMoi) {
            return ['Tất cả', 'Luật / Pháp lệnh', 'Nghị định / Quyết định', 'Thông tư / Hướng dẫn', 'Tin tổng hợp'];
        }
        return ['Tất cả', 'Hoạt động PBGDPL ở Trung ương', 'Hoạt động PBGDPL ở Địa phương'];
    }, [categories, isVanBanMoi]);

    const realMockData = useMemo(() => {
        if (items && items.length > 0) return items;
        if (isVanBanMoi) {
            return [
                {
                    id: 1,
                    title: 'Điểm mới của Luật Đất đai 2024 tác động trực tiếp đến quyền lợi người sử dụng đất',
                    description: 'Phân tích chi tiết các quy định mới về cấp giấy chứng nhận quyền sử dụng đất, công tác bồi thường giải phóng mặt bằng, hỗ trợ tái định cư và bảng giá đất mới áp dụng từ năm 2026...',
                    date: '12/07/2026',
                    category: 'Luật / Pháp lệnh',
                    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400&h=300'
                },
                {
                    id: 2,
                    title: 'Nghị định mới về đăng ký kinh doanh và hỗ trợ phát triển doanh nghiệp vừa và nhỏ',
                    description: 'Chính phủ vừa ban hành Nghị định mới đơn giản hóa 30% thủ tục hành chính liên quan đến đăng ký thành lập doanh nghiệp, thúc đẩy chuyển đổi số và đăng ký trực tuyến toàn trình...',
                    date: '08/07/2026',
                    category: 'Nghị định / Quyết định',
                    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=300'
                },
                {
                    id: 3,
                    title: 'Thông tư hướng dẫn chi tiết thi hành Luật Nhà ở và Luật Kinh doanh Bất động sản',
                    description: 'Bộ Xây dựng ban hành Thông tư quy định về tiêu chuẩn, điều kiện mua, thuê nhà ở xã hội và quy trình kiểm tra, thẩm định đối tượng đủ điều kiện hưởng chính sách...',
                    date: '04/07/2026',
                    category: 'Thông tư / Hướng dẫn',
                    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400&h=300'
                },
                {
                    id: 4,
                    title: 'Quyết định phê duyệt Đề án Nâng cao năng lực phổ biến giáo dục pháp luật 2026-2030',
                    description: 'Thủ tướng Chính phủ ban hành Quyết định triển khai chiến lược đổi mới công tác phổ biến giáo dục pháp luật, ứng dụng trí tuệ nhân tạo và các nền tảng truyền thông hiện đại...',
                    date: '29/06/2026',
                    category: 'Nghị định / Quyết định',
                    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=400&h=300'
                },
                {
                    id: 5,
                    title: 'Những chính sách pháp luật nổi bật bắt đầu có hiệu lực thi hành từ tháng 07/2026',
                    description: 'Tổng hợp các quy định pháp luật mới nổi bật về bảo hiểm xã hội, tiền lương, chính sách thuế và thủ tục hành chính người dân và doanh nghiệp cần lưu ý...',
                    date: '25/06/2026',
                    category: 'Tin tổng hợp',
                    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300'
                }
            ];
        }

        return [
            {
                id: 1,
                title: 'Hội nghị trực tuyến toàn quốc triển khai công tác tư pháp năm 2026',
                description: 'Sáng nay, Bộ Tư pháp tổ chức Hội nghị trực tuyến toàn quốc triển khai công tác tư pháp năm 2026. Hội nghị tập trung thảo luận về các giải pháp nâng cao hiệu quả công tác phổ biến giáo dục pháp luật...',
                date: '15/07/2026',
                category: 'Hoạt động PBGDPL ở Trung ương',
                image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300'
            },
            {
                id: 2,
                title: 'Hà Nội tổ chức tuyên truyền pháp luật về trật tự an toàn giao thông',
                description: 'Sở Tư pháp Hà Nội phối hợp với lực lượng Cảnh sát giao thông tổ chức các buổi tuyên truyền lưu động về pháp luật an toàn giao thông cho học sinh các trường THPT trên địa bàn thành phố.',
                date: '10/07/2026',
                category: 'Hoạt động PBGDPL ở Địa phương',
                image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400&h=300'
            },
            {
                id: 3,
                title: 'Ký kết chương trình phối hợp PBGDPL giai đoạn 2026-2030',
                description: 'Lễ ký kết chương trình phối hợp giữa Bộ Tư pháp và Trung ương Hội Liên hiệp Phụ nữ Việt Nam nhằm tăng cường công tác phổ biến, giáo dục pháp luật, tư vấn pháp luật cho phụ nữ.',
                date: '05/07/2026',
                category: 'Hoạt động PBGDPL ở Trung ương',
                image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=400&h=300'
            },
            {
                id: 4,
                title: 'Mô hình Cà phê pháp luật phát huy hiệu quả tại Cần Thơ',
                description: 'Nhiều quận, huyện tại TP Cần Thơ đang triển khai nhân rộng mô hình "Cà phê pháp luật", tạo không gian gần gũi để người dân dễ dàng tiếp cận các quy định pháp luật mới ban hành.',
                date: '02/07/2026',
                category: 'Hoạt động PBGDPL ở Địa phương',
                image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=300'
            },
            {
                id: 5,
                title: 'Tập huấn kỹ năng truyền thông chính sách có tác động lớn đến xã hội',
                description: 'Hơn 200 báo cáo viên pháp luật trung ương đã tham gia lớp tập huấn chuyên sâu về kỹ năng truyền thông các dự thảo chính sách pháp luật có tác động lớn đến đời sống xã hội.',
                date: '28/06/2026',
                category: 'Hoạt động PBGDPL ở Trung ương',
                image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300'
            }
        ];
    }, [items, isVanBanMoi]);

    // Filtering logic
    const filteredItems = useMemo(() => {
        return realMockData.filter(item => {
            const matchesSearch = !searchTerm || 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'Tất cả' || item.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [realMockData, searchTerm, category]);

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header / Breadcrumbs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                    <Link to="/pho-bien-giao-duc" className="text-blue-600 hover:underline">Trang chủ</Link>
                    <ChevronRight size={14} />
                    <span>PBGDPL - {title}</span>
                </div>
                <h1 className="text-3xl font-extrabold text-[#1b2b49] tracking-tight">{title}</h1>
            </div>

            {/* Filter Box */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm</label>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nhập từ khóa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-56">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chuyên mục</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        {defaultCategories.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full lg:w-48">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        <option value="Mới nhất">Mới nhất</option>
                        <option value="Cũ nhất">Cũ nhất</option>
                        <option value="Xem nhiều nhất">Xem nhiều nhất</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button className="bg-[#2580f0] hover:bg-[#1a66c2] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm">
                        Áp dụng
                    </button>
                    <button 
                        onClick={() => { setSearchTerm(''); setSortBy('Mới nhất'); setCategory('Tất cả'); }}
                        className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5"
                    >
                        <X size={14} /> Đặt lại
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm font-medium">
                Tìm thấy <strong className="text-black text-base">{filteredItems.length}</strong> {title.toLowerCase()}
            </p>

            {/* List items */}
            <div className="flex flex-col gap-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                        <div key={idx} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row min-h-[160px]">
                            {/* Image */}
                            <div className="md:w-1/4 shrink-0 bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 transition-colors relative overflow-hidden h-48 md:h-auto">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                                    {item.category}
                                </span>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1 relative">
                                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 font-medium absolute top-5 right-5">
                                    <Calendar size={13} />
                                    <span>{item.date}</span>
                                </div>
                                
                                <h3 className="font-bold text-[#1b2b49] text-lg mb-2 pr-24 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                                    {item.title}
                                </h3>
                                
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                    {item.description}
                                </p>
                                
                                <Link to={`/tin-tuc/${item.id || 1}`} className="text-blue-600 font-semibold text-sm flex items-center gap-1 group/btn mt-auto ml-auto w-fit">
                                    Xem chi tiết 
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-gray-100">
                        Không tìm thấy {title.toLowerCase()} phù hợp với từ khóa hoặc bộ lọc đã chọn.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredItems.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <span>Số bản ghi:</span>
                        <select 
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-slate-50 transition-colors cursor-not-allowed">
                            <span className="text-[10px]">«</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-slate-50 transition-colors cursor-not-allowed">
                            <span className="text-[10px]">‹</span>
                        </button>
                        
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-semibold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">3</button>
                        
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">
                            <span className="text-[10px]">›</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">
                            <span className="text-[10px]">»</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


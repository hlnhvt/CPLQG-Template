import React, { useState } from 'react';
import { Calendar, ArrowRight, Image as ImageIcon, Search, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TinTucHoatDongList({ title, items }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [currentPage, setCurrentPage] = useState(1);

    const [category, setCategory] = useState('Tất cả');

    const realMockData = [
        {
            title: 'Hội nghị trực tuyến toàn quốc triển khai công tác tư pháp năm 2026',
            description: 'Sáng nay, Bộ Tư pháp tổ chức Hội nghị trực tuyến toàn quốc triển khai công tác tư pháp năm 2026. Hội nghị tập trung thảo luận về các giải pháp nâng cao hiệu quả công tác phổ biến giáo dục pháp luật...',
            date: '15/07/2026',
            category: 'Hoạt động PBGDPL ở Trung ương',
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Hà Nội tổ chức tuyên truyền pháp luật về trật tự an toàn giao thông',
            description: 'Sở Tư pháp Hà Nội phối hợp với lực lượng Cảnh sát giao thông tổ chức các buổi tuyên truyền lưu động về pháp luật an toàn giao thông cho học sinh các trường THPT trên địa bàn thành phố.',
            date: '10/07/2026',
            category: 'Hoạt động PBGDPL ở Địa phương',
            image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Ký kết chương trình phối hợp PBGDPL giai đoạn 2026-2030',
            description: 'Lễ ký kết chương trình phối hợp giữa Bộ Tư pháp và Trung ương Hội Liên hiệp Phụ nữ Việt Nam nhằm tăng cường công tác phổ biến, giáo dục pháp luật, tư vấn pháp luật cho phụ nữ.',
            date: '05/07/2026',
            category: 'Hoạt động PBGDPL ở Trung ương',
            image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Mô hình Cà phê pháp luật phát huy hiệu quả tại Cần Thơ',
            description: 'Nhiều quận, huyện tại TP Cần Thơ đang triển khai nhân rộng mô hình "Cà phê pháp luật", tạo không gian gần gũi để người dân dễ dàng tiếp cận các quy định pháp luật mới ban hành.',
            date: '02/07/2026',
            category: 'Hoạt động PBGDPL ở Địa phương',
            image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Tập huấn kỹ năng truyền thông chính sách có tác động lớn đến xã hội',
            description: 'Hơn 200 báo cáo viên pháp luật trung ương đã tham gia lớp tập huấn chuyên sâu về kỹ năng truyền thông các dự thảo chính sách pháp luật có tác động lớn đến đời sống xã hội.',
            date: '28/06/2026',
            category: 'Hoạt động PBGDPL ở Trung ương',
            image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=300'
        }
    ];

    const mockItems = items || realMockData.map((item, i) => ({ ...item, id: i + 1 }));

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header / Breadcrumbs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                    <span className="text-blue-600 cursor-pointer">Trang chủ</span>
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

                <div className="w-full lg:w-48">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chuyên mục</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        <option>Tất cả</option>
                        <option>Hoạt động PBGDPL ở Trung ương</option>
                        <option>Hoạt động PBGDPL ở Địa phương</option>
                    </select>
                </div>

                <div className="w-full lg:w-48">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        <option>Mới nhất</option>
                        <option>Cũ nhất</option>
                        <option>Xem nhiều nhất</option>
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
                Tìm thấy <strong className="text-black text-base">{mockItems.length * 10}</strong> {title.toLowerCase()}
            </p>

            {/* List items */}
            <div className="flex flex-col gap-4">
                {mockItems.map((item, idx) => (
                    <div key={idx} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row min-h-[160px]">
                        {/* Image Placeholder */}
                        <div className="md:w-1/4 shrink-0 bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 transition-colors relative overflow-hidden h-48 md:h-auto">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <span>Số bản ghi:</span>
                    <select className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
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
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">4</button>
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">6</button>
                    
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">
                        <span className="text-[10px]">›</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors">
                        <span className="text-[10px]">»</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

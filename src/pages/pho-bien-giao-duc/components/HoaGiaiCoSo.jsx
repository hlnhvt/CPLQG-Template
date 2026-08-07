import React, { useState } from 'react';
import { ChevronRight, Newspaper, BarChart2, Calendar, ArrowRight, Search, X } from 'lucide-react';
import HoaGiaiCoSoList from './HoaGiaiCoSoList';

export default function HoaGiaiCoSo() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const title = "Hòa giải ở Cơ sở";

    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState('Tất cả');
    const [filterProvince, setFilterProvince] = useState('Tất cả');
    const [filterWard, setFilterWard] = useState('Tất cả');

    const img1 = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300';
    const img2 = 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400&h=300';
    const img3 = 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=400&h=300';
    const img4 = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=300';

    const generateNewsItem = (id, title, date, excerpt, image) => ({ id, title, date, excerpt, image });

    const vuViecDienHinhData = [
        generateNewsItem(1, 'Hòa giải thành công tranh chấp lối đi chung kéo dài hơn 10 năm', '20/10/2023 09:30', 'Sự kiên trì, khéo léo của tổ hòa giải đã giúp hai gia đình hàng xóm xóa bỏ hiềm khích, tự nguyện tháo dỡ rào chắn lối đi.', img1),
        generateNewsItem(2, 'Hàn gắn tình cảm gia đình trước nguy cơ đổ vỡ', '15/08/2023 14:15', 'Tổ hòa giải đã phân tích có lý có tình, giúp đôi vợ chồng trẻ nhận ra lỗi lầm, hàn gắn lại hạnh phúc gia đình.', img2),
        generateNewsItem(3, 'Giải quyết êm đẹp mâu thuẫn ranh giới đất nông nghiệp', '10/05/2023 08:00', 'Áp dụng hiệu quả các quy định của Luật Đất đai kết hợp với tình làng nghĩa xóm để thuyết phục các bên.', img3),
        generateNewsItem(4, 'Thuyết phục bồi thường thiệt hại do vật nuôi gây ra', '05/04/2023 10:45', 'Vụ việc được hòa giải kịp thời, tránh tình trạng khiếu kiện kéo dài gây mất đoàn kết ở khu dân cư.', img4),
    ];

    const statsData = [
        { id: 1, year: '2022', province: 'Thành phố Đà Nẵng', district: 'Quận Cẩm Lệ', ward: 'Phường Hòa Thọ Tây', total: 10, prev: 10, new: 1, completed: 10 },
        { id: 2, year: '2022', province: 'Thành phố Cần Thơ', district: 'Huyện Phong Điền', ward: 'Xã Nhơn Nghĩa', total: 2, prev: 2, new: 2, completed: 2 },
        { id: 3, year: '2021', province: 'Thành phố Cần Thơ', district: 'Huyện Phong Điền', ward: 'Xã Nhơn Ái', total: 0, prev: 0, new: 0, completed: 0 }
    ];

    const SectionHeader = ({ title, icon, colorClass, onViewAll }) => (
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                    {icon}
                </div>
                <h2 className="text-[17px] font-bold text-gray-800">{title}</h2>
            </div>
            {onViewAll && (
                <button onClick={() => onViewAll(title)} className="text-[13px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                    Xem tất cả <ArrowRight size={14} />
                </button>
            )}
        </div>
    );

    const NewsGrid = ({ data }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data.map(news => (
                <div key={news.id} className="flex flex-col group cursor-pointer border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all">
                    <div className="h-40 overflow-hidden relative">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-white">
                        <h3 className="font-bold text-[15px] text-gray-800 leading-snug mb-2 group-hover:text-blue-600 line-clamp-2">{news.title}</h3>
                        <p className="text-[13px] text-gray-500 line-clamp-3 mb-3">{news.excerpt}</p>
                        <div className="mt-auto flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                            <Calendar size={12} /> {news.date}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (selectedCategory) {
        return (
            <HoaGiaiCoSoList 
                category={selectedCategory} 
                onBack={() => setSelectedCategory(null)} 
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header / Breadcrumbs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                    <span className="text-blue-600 cursor-pointer hover:underline">Trang chủ</span>
                    <ChevronRight size={14} />
                    <span className="text-blue-600 cursor-pointer hover:underline">Phổ biến giáo dục pháp luật</span>
                    <ChevronRight size={14} />
                    <span>{title}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2b49] tracking-tight">{title}</h1>
            </div>

            {/* 1. Vụ việc hòa giải điển hình */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Vụ việc hòa giải điển hình" 
                    icon={<Newspaper size={16} />} 
                    colorClass="bg-blue-100 text-blue-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={vuViecDienHinhData} />
            </div>

            {/* 2. Thống kê hòa giải ở cơ sở */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Thống kê hòa giải ở cơ sở" 
                    icon={<BarChart2 size={16} />} 
                    colorClass="bg-teal-100 text-teal-600" 
                />
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-5 flex flex-col lg:flex-row gap-4 lg:items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm</label>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Nhập từ khóa..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-32">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Năm</label>
                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white"
                        >
                            <option>Tất cả</option>
                            <option>2022</option>
                            <option>2021</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tỉnh/Thành phố</label>
                        <select
                            value={filterProvince}
                            onChange={(e) => setFilterProvince(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white"
                        >
                            <option>Tất cả</option>
                            <option>Thành phố Đà Nẵng</option>
                            <option>Thành phố Cần Thơ</option>
                        </select>
                    </div>
                    <div className="w-full lg:w-48">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phường/Xã</label>
                        <select
                            value={filterWard}
                            onChange={(e) => setFilterWard(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white"
                        >
                            <option>Tất cả</option>
                            <option>Phường Hòa Thọ Tây</option>
                            <option>Xã Nhơn Nghĩa</option>
                            <option>Xã Nhơn Ái</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-[#2580f0] hover:bg-[#1a66c2] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors shadow-sm">
                            Áp dụng
                        </button>
                        <button 
                            onClick={() => { setSearchTerm(''); setFilterYear('Tất cả'); setFilterProvince('Tất cả'); setFilterWard('Tất cả'); }}
                            className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                            <X size={14} /> Đặt lại
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200 w-16 text-center">Năm</th>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200">Tỉnh/Thành phố</th>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200">Quận/Huyện</th>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200">Phường/Xã</th>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200 w-28 text-center">Tổng số vụ</th>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200 w-28 text-center">Kì trước</th>
                                <th scope="col" className="px-4 py-3.5 border-r border-gray-200 w-28 text-center">Vụ mới</th>
                                <th scope="col" className="px-4 py-3.5 w-32 text-center text-blue-700">Hoàn thành</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {statsData.map((row, idx) => (
                                <tr key={row.id} className={`bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx === statsData.length - 1 ? 'border-b-0' : ''}`}>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center font-medium">{row.year}</td>
                                    <td className="px-4 py-3 border-r border-gray-200">{row.province}</td>
                                    <td className="px-4 py-3 border-r border-gray-200">{row.district}</td>
                                    <td className="px-4 py-3 border-r border-gray-200">{row.ward}</td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center">{row.total}</td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center">{row.prev}</td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center">{row.new}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-blue-600">{row.completed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

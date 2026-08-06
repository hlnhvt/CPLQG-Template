import React, { useState } from 'react';
import { ChevronRight, Newspaper, BarChart2, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import HoaGiaiCoSoList from './HoaGiaiCoSoList';

export default function HoaGiaiCoSo() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const title = "Hòa giải ở Cơ sở";

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
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-gray-200">
                        <thead className="bg-white text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-4 border-r border-gray-200 w-16 text-center">Năm</th>
                                <th scope="col" className="px-4 py-4 border-r border-gray-200">Tỉnh thành phố / Quận huyện / Xã/phường/thị trấn</th>
                                <th scope="col" className="px-4 py-4 border-r border-gray-200 w-32">Tổng số vụ việc</th>
                                <th scope="col" className="px-4 py-4 border-r border-gray-200 w-32">Vụ việc kì trước</th>
                                <th scope="col" className="px-4 py-4 border-r border-gray-200 w-32">Vụ việc mới</th>
                                <th scope="col" className="px-4 py-4 w-40">Vụ việc hòa giải hoàn thành</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {/* Đà Nẵng */}
                            <tr className="border-b border-gray-200 bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium"></td>
                                <td className="px-4 py-3 border-r border-gray-200 font-bold">Thành phố Đà Nẵng</td>
                                <td colSpan="4" className="px-4 py-3"></td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium"></td>
                                <td className="px-8 py-3 border-r border-gray-200 font-bold">Quận Cẩm Lệ</td>
                                <td colSpan="4" className="px-4 py-3"></td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium">2022</td>
                                <td className="px-14 py-3 border-r border-gray-200 text-gray-600">Phường Hòa Thọ Tây</td>
                                <td className="px-4 py-3 border-r border-gray-200">10</td>
                                <td className="px-4 py-3 border-r border-gray-200">10</td>
                                <td className="px-4 py-3 border-r border-gray-200">1</td>
                                <td className="px-4 py-3">10</td>
                            </tr>
                            
                            {/* Cần Thơ */}
                            <tr className="border-b border-gray-200 bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium"></td>
                                <td className="px-4 py-3 border-r border-gray-200 font-bold">Thành phố Cần Thơ</td>
                                <td colSpan="4" className="px-4 py-3"></td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium"></td>
                                <td className="px-8 py-3 border-r border-gray-200 font-bold">Huyện Phong Điền</td>
                                <td colSpan="4" className="px-4 py-3"></td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium">2022</td>
                                <td className="px-14 py-3 border-r border-gray-200 text-gray-600">Xã Nhơn Nghĩa</td>
                                <td className="px-4 py-3 border-r border-gray-200">2</td>
                                <td className="px-4 py-3 border-r border-gray-200">2</td>
                                <td className="px-4 py-3 border-r border-gray-200">2</td>
                                <td className="px-4 py-3">2</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="px-4 py-3 border-r border-gray-200 text-center text-blue-600 font-medium">2021</td>
                                <td className="px-14 py-3 border-r border-gray-200 text-gray-600">Xã Nhơn Ái</td>
                                <td className="px-4 py-3 border-r border-gray-200">0</td>
                                <td className="px-4 py-3 border-r border-gray-200">0</td>
                                <td className="px-4 py-3 border-r border-gray-200">0</td>
                                <td className="px-4 py-3">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

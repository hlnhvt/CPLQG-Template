import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

export default function TuSachPhapLuatList({ category, onBack }) {
    const images = [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800&h=450'
    ];

    const generateNewsItem = (id) => ({
        id,
        title: `${category} - Tài liệu số ${id}`,
        date: `0${(id % 9) + 1}/07/2026`,
        excerpt: `Mô tả chi tiết về tài liệu thuộc danh mục ${category}. Nội dung cung cấp những kiến thức pháp luật bổ ích, cập nhật các quy định mới nhất để phục vụ công tác nghiên cứu, tìm hiểu và áp dụng pháp luật vào thực tiễn.`,
        image: images[id % images.length]
    });

    const mockItems = Array.from({ length: 6 }, (_, i) => generateNewsItem(i + 1));
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header / Breadcrumbs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium flex-wrap">
                    <span className="text-blue-600 cursor-pointer hover:underline">Trang chủ</span>
                    <ChevronRight size={14} />
                    <span className="text-blue-600 cursor-pointer hover:underline">Phổ biến giáo dục pháp luật</span>
                    <ChevronRight size={14} />
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={onBack}
                    >
                        Tủ sách pháp luật
                    </span>
                    <ChevronRight size={14} />
                    <span className="text-gray-800">{category}</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shrink-0"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2b49] tracking-tight">{category}</h1>
                </div>
            </div>

            {/* List Articles */}
            <div className="flex flex-col gap-5">
                {mockItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-[240px] group cursor-pointer hover:shadow-md transition-shadow">
                        <div className="md:w-[320px] shrink-0 overflow-hidden relative border-r border-gray-100">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="flex-1 p-6 flex flex-col">
                            <div className="flex justify-between items-start gap-4 mb-3">
                                <h2 className="text-[18px] font-bold text-[#1b2b49] leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                                    {item.title}
                                </h2>
                                <div className="flex items-center gap-1.5 text-gray-400 text-[12px] shrink-0 font-medium whitespace-nowrap mt-1">
                                    <Calendar size={14} /> {item.date}
                                </div>
                            </div>

                            <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-3 mb-4">
                                {item.excerpt}
                            </p>

                            <div className="mt-auto flex justify-end">
                                <button className="flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                    Xem chi tiết <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination block */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    Số bản ghi:
                    <select className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-500 text-sm">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>

                <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 text-sm font-medium">«</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 text-sm font-medium">‹</button>
                    {[1, 2, 3, 4, '...', 6].map((page, idx) => (
                        <button
                            key={idx}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors ${page === currentPage
                                ? 'bg-[#1c5dfd] text-white border-[#1c5dfd]'
                                : page === '...'
                                    ? 'border-transparent text-gray-500 cursor-default'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            disabled={page === '...'}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">›</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">»</button>
                </div>
            </div>
        </div>
    );
}

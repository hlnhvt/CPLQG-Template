import React, { useState } from 'react';
import { Calendar, Search, PlayCircle, Image as ImageIcon, X } from 'lucide-react';

export default function MediaList({ title, type = 'image' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Mới nhất');

    const validImages = [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800&h=450',
        'https://images.unsplash.com/photo-1542301987-19e489c68cc3?auto=format&fit=crop&q=80&w=800&h=450'
    ];

    // Mock data for media
    const mockData = Array.from({ length: 6 }).map((_, idx) => ({
        id: idx + 1,
        title: type === 'image' 
            ? `Album ảnh: Hoạt động tuyên truyền phổ biến giáo dục pháp luật tại trường học số ${idx + 1}`
            : `Video: Lễ ký kết chương trình phối hợp phổ biến giáo dục pháp luật giai đoạn mới - Phần ${idx + 1}`,
        date: `0${(idx % 9) + 1}/07/2026`,
        image: validImages[idx % validImages.length]
    }));

    return (
        <div className="flex flex-col gap-6 font-sans">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2b49] tracking-tight">{title}</h1>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm</label>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nhập từ khóa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="w-full md:w-48">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white"
                    >
                        <option>Mới nhất</option>
                        <option>Cũ nhất</option>
                        <option>Xem nhiều nhất</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button className="bg-[#2580f0] hover:bg-[#1a66c2] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors shadow-sm">
                        Áp dụng
                    </button>
                    <button 
                        onClick={() => { setSearchTerm(''); setSortBy('Mới nhất'); }}
                        className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                        <X size={14} /> Đặt lại
                    </button>
                </div>
            </div>

            {/* Media Grid (2 per row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockData.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                        <div className="relative aspect-video overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {type === 'video' ? (
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
                                </div>
                            ) : (
                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1.5 text-white text-xs font-medium">
                                    <ImageIcon size={14} /> 5 Ảnh
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-[16px] text-[#1b2b49] leading-snug mb-3 group-hover:text-blue-600 line-clamp-2 transition-colors">
                                {item.title}
                            </h3>
                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-400">
                                    <Calendar size={14} /> {item.date}
                                </div>
                                <span className="text-[13px] font-semibold text-blue-600">Xem {type === 'video' ? 'video' : 'album'} →</span>
                            </div>
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
                    
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-[#1c5dfd] text-white font-semibold">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">3</button>
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                    
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

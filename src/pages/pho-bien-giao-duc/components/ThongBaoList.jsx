import React, { useState } from 'react';
import { Calendar, ArrowRight, Search, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThongBaoList({ title, items }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('Mới nhất');

    const realMockData = [
        {
            title: 'Thông báo về việc chuyển địa điểm tiếp công dân của Cục Phổ biến, giáo dục pháp luật',
            description: 'Kể từ ngày 15/08/2026, phòng tiếp công dân của Cục PBGDPL sẽ được chuyển về địa chỉ mới tại Tầng 1, Tòa nhà N6, trụ sở Bộ Tư pháp.',
            date: '20/07/2026'
        },
        {
            title: 'Thông báo kết quả lựa chọn tổ chức đấu giá tài sản',
            description: 'Bộ Tư pháp thông báo kết quả lựa chọn tổ chức đấu giá tài sản thanh lý của Cục Phổ biến, giáo dục pháp luật năm 2026.',
            date: '10/07/2026'
        },
        {
            title: 'Thông báo tuyển dụng công chức Cục Phổ biến, giáo dục pháp luật đợt 2 năm 2026',
            description: 'Cục Phổ biến, giáo dục pháp luật (Bộ Tư pháp) thông báo tuyển dụng 05 công chức vào các vị trí chuyên viên quản lý nhà nước về PBGDPL.',
            date: '01/07/2026'
        },
        {
            title: 'Thông báo về việc tổ chức lớp bồi dưỡng nghiệp vụ báo cáo viên pháp luật trung ương',
            description: 'Thực hiện Kế hoạch công tác năm 2026, Cục PBGDPL thông báo chiêu sinh lớp bồi dưỡng nghiệp vụ dành cho báo cáo viên pháp luật cấp trung ương đợt 1.',
            date: '15/06/2026'
        },
        {
            title: 'Thông báo gia hạn thời gian nộp bài dự thi Cuộc thi trực tuyến Tìm hiểu pháp luật',
            description: 'Ban Tổ chức Cuộc thi trực tuyến Tìm hiểu pháp luật năm 2026 thông báo gia hạn thời gian nhận bài dự thi đến hết ngày 30/06/2026.',
            date: '05/06/2026'
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
                        onClick={() => { setSearchTerm(''); setSortBy('Mới nhất'); }}
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
                    <div key={idx} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col min-h-[120px]">
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

import React, { useState } from 'react';
import { Calendar, ArrowRight, ChevronRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function GiaoDucPhapLuatNhaTruong({ title }) {
    const navigate = useNavigate();
    
    // Default active tab is the first one
    const [activeTab, setActiveTab] = useState('mo-hinh');
    
    // Removed searchTerm
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [category, setCategory] = useState('Tất cả');

    const tabs = [
        { id: 'mo-hinh', label: 'Mô hình giáo dục pháp luật trong nhà trường', isExternal: false },
        { id: 'giao-duc', label: 'Giáo dục pháp luật trong nhà trường', isExternal: false },
        { id: 'giao-trinh', label: 'Giáo trình sách giáo khoa', isExternal: false },
        { id: 'hoat-dong', label: 'Hoạt động ngoại khóa', isExternal: false },
        { id: 'bai-giang', label: 'Bài giảng điện tử', isExternal: true, path: '/pho-bien-giao-duc?activeMenu=boi-duong-tap-huan' },
        { id: 'hoi-dap', label: 'Hỏi đáp pháp luật học đường', isExternal: true, path: '/cau-hoi-phap-luat' }
    ];

    const realMockData = [
        {
            title: 'Trường THPT Trần Phú tổ chức ngoại khóa Tìm hiểu pháp luật về giao thông đường bộ',
            description: 'Sáng thứ 2, ngày 15/09, Đoàn trường THPT Trần Phú đã phối hợp với Công an Quận tổ chức buổi ngoại khóa chuyên đề về an toàn giao thông cho hơn 2000 học sinh.',
            date: '15/09/2026',
            category: 'Hoạt động PBGDPL ở Địa phương',
            image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Sở GD&ĐT tập huấn triển khai bộ tài liệu giáo dục pháp luật mới',
            description: 'Sở GD&ĐT vừa tổ chức khóa tập huấn 3 ngày dành cho giáo viên dạy môn Giáo dục công dân các trường THPT về việc tích hợp nội dung pháp luật vào bài giảng.',
            date: '10/09/2026',
            category: 'Hoạt động PBGDPL ở Địa phương',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Phát động cuộc thi trực tuyến "Học sinh với an toàn không gian mạng"',
            description: 'Bộ GD&ĐT phối hợp với Bộ TT&TT chính thức phát động cuộc thi trực tuyến tìm hiểu pháp luật về an ninh mạng dành riêng cho học sinh trung học cơ sở và trung học phổ thông.',
            date: '05/09/2026',
            category: 'Hoạt động PBGDPL ở Trung ương',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Mô hình "Phiên tòa giả định" tại các trường đại học mang lại hiệu quả cao',
            description: 'Việc tổ chức các "Phiên tòa giả định" tại trường học không chỉ giúp sinh viên ngành luật thực hành mà còn giáo dục nhận thức pháp luật trực quan cho đông đảo sinh viên các khối ngành khác.',
            date: '28/08/2026',
            category: 'Hoạt động PBGDPL ở Địa phương',
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300'
        },
        {
            title: 'Bộ GD&ĐT ban hành hướng dẫn thực hiện nhiệm vụ năm học 2026-2027 về công tác pháp chế',
            description: 'Trong văn bản hướng dẫn nhiệm vụ năm học mới, Bộ GD&ĐT nhấn mạnh việc đổi mới phương pháp giảng dạy pháp luật, tăng cường các chuyên đề ngoại khóa về bạo lực học đường.',
            date: '20/08/2026',
            category: 'Hoạt động PBGDPL ở Trung ương',
            image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400&h=300'
        }
    ];

    const mockItems = realMockData.map((item, i) => ({ ...item, id: i + 1 }));

    const handleTabClick = (tab) => {
        if (tab.isExternal) {
            navigate(tab.path, { state: tab.state });
        } else {
            setActiveTab(tab.id);
            // Removed setSearchTerm
            setSortBy('Mới nhất');
            setCategory('Tất cả');
        }
    };

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

            {/* Horizontal Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                <div className="flex gap-2 w-full">
                    {tabs.map(tab => {
                        const baseClasses = `flex-1 px-2 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 leading-snug flex items-center justify-center text-center ${
                            activeTab === tab.id
                                ? 'bg-[#2580f0] text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                        }`;
                        
                        if (tab.isExternal) {
                            return (
                                <Link
                                    key={tab.id}
                                    to={tab.path}
                                    target="_blank"
                                    className={baseClasses}
                                >
                                    {tab.label}
                                </Link>
                            );
                        }
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab)}
                                className={baseClasses}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filter Box */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-end gap-4">
                {/* Removed search input */}

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
                        onClick={() => { setSortBy('Mới nhất'); setCategory('Tất cả'); }}
                        className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5"
                    >
                        <X size={14} /> Đặt lại
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm font-medium">
                Tìm thấy <strong className="text-black text-base">{mockItems.length * 10}</strong> kết quả cho mục 
                <span className="text-blue-600 ml-1">
                    {tabs.find(t => t.id === activeTab)?.label}
                </span>
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

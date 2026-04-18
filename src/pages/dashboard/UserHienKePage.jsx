import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, MessageSquare, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

const MOCK_USER_HIEN_KE = [
    {
        id: 1,
        title: "Đề xuất quy trình đăng ký doanh nghiệp trực tuyến 100%",
        domain: "Doanh nghiệp",
        status: 'Đã phản hồi',
        date: "20/03/2026",
        views: 142,
        replies: 1
    },
    {
        id: 2,
        title: "Kiến nghị sửa đổi điểm giao cắt giao thông tại ngã tư XYZ",
        domain: "Giao thông Vận tải",
        status: 'Chờ phản hồi',
        date: "25/03/2026",
        views: 45,
        replies: 0
    },
    {
        id: 3,
        title: "Giải pháp nâng cao giáo dục STEM ở nông thôn",
        domain: "Giáo dục và Đào tạo",
        status: 'Đang xem xét',
        date: "28/03/2026",
        views: 89,
        replies: 0
    }
];

const UserHienKePage = () => {
    const [activeTab, setActiveTab] = useState('all'); // all, pending, processing, responded
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = MOCK_USER_HIEN_KE.filter(item => {
        const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTab = 
            activeTab === 'all' ? true :
            activeTab === 'pending' ? item.status === 'Chờ phản hồi' :
            activeTab === 'processing' ? item.status === 'Đang xem xét' :
            item.status === 'Đã phản hồi';
        return matchSearch && matchTab;
    });

    return (
        <div className="animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f4c81]">Hiến kế của tôi</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý các ý tưởng, đóng góp và hiến kế bạn đã gửi lên Cổng thông tin</p>
                </div>
                <Link to="/hien-ke/gop-y-nhanh" className="flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus size={18} /> Gửi hiến kế mới
                </Link>
            </div>

            {/* Tabs & Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div className="flex overflow-x-auto bg-gray-50 p-1 rounded-xl w-full lg:w-auto border border-gray-100 hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-none px-4 sm:px-6 py-2 rounded-lg font-bold text-[13px] sm:text-sm transition-all duration-200 ${
                            activeTab === 'all'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-none px-4 sm:px-6 py-2 rounded-lg font-bold text-[13px] sm:text-sm transition-all duration-200 ${
                            activeTab === 'pending'
                                ? 'bg-white text-amber-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Chờ phản hồi
                    </button>
                    <button
                        onClick={() => setActiveTab('processing')}
                        className={`flex-none px-4 sm:px-6 py-2 rounded-lg font-bold text-[13px] sm:text-sm transition-all duration-200 ${
                            activeTab === 'processing'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Đang xem xét
                    </button>
                    <button
                        onClick={() => setActiveTab('responded')}
                        className={`flex-none px-4 sm:px-6 py-2 rounded-lg font-bold text-[13px] sm:text-sm transition-all duration-200 ${
                            activeTab === 'responded'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Đã phản hồi
                    </button>
                </div>

                <div className="relative flex-1 w-full lg:w-auto min-w-[250px] lg:max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm hiến kế..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <div key={item.id} className="group border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all bg-white relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 flex items-center gap-1">
                                            <Tag size={12} /> {item.domain}
                                        </span>
                                        {item.status === 'Đã phản hồi' ? (
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> {item.status}
                                            </span>
                                        ) : item.status === 'Chờ phản hồi' ? (
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
                                                <AlertCircle size={12} /> {item.status}
                                            </span>
                                        ) : (
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                                                {item.status}
                                            </span>
                                        )}
                                    </div>
                                    <Link to={`/hien-ke/${item.id}`} className="block text-[16px] md:text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                                        {item.title}
                                    </Link>
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1.5"><Clock size={14}/> {item.date}</span>
                                        <span className="flex items-center gap-1.5"><MessageSquare size={14}/> {item.replies} phản hồi</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                                    <Link to={`/hien-ke/${item.id}`} className="w-full text-center px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm rounded-lg transition-colors whitespace-nowrap">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Tag size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Không tìm thấy hiến kế</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Bạn chưa có hiến kế nào trong trạng thái này hoặc từ khóa tìm kiếm không khớp.
                        </p>
                        <button onClick={() => {setSearchTerm(''); setActiveTab('all');}} className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                            Xóa bộ lọc
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserHienKePage;

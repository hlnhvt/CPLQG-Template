import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, MessageSquare, CheckCircle2, AlertCircle, Filter, FileText, User } from 'lucide-react';

const MOCK_OFFICER_HIEN_KE = [
    {
        id: 'hk-101',
        title: "Đề xuất ứng dụng Blockchain trong quản lý hộ tịch",
        author: "Lê Văn Tám",
        domain: "Công nghệ thông tin",
        status: 'Chờ phản hồi',
        date: "12/04/2026",
        urgency: 'Cao',
        summary: "Sử dụng công nghệ sổ cái phi tập trung để đảm bảo tính minh bạch và bất định của dữ liệu hộ tịch..."
    },
    {
        id: 'hk-102',
        title: "Số hóa quy trình thẩm định văn bản pháp luật",
        author: "Trần Thị Hoa",
        domain: "Cải cách hành chính",
        status: 'Đang xử lý',
        date: "10/04/2026",
        urgency: 'Trung bình',
        summary: "Xây dựng hệ thống phần mềm hỗ trợ lấy ý kiến các đơn vị liên quan trong quá trình thẩm định..."
    },
    {
        id: 'hk-103',
        title: "Cải thiện giao diện cổng thông tin pháp luật quốc gia",
        author: "Phạm Minh Hoàng",
        domain: "Công nghệ thông tin",
        status: 'Đã phản hồi',
        date: "05/04/2026",
        urgency: 'Trung bình',
        summary: "Nâng cấp trải nghiệm người dùng trên thiết bị di động và tối ưu hóa tốc độ tải trang..."
    },
    {
        id: 'hk-104',
        title: "Giải pháp bảo mật dữ liệu công dân cấp độ 4",
        author: "Ngô Quốc Bảo",
        domain: "An toàn thông tin",
        status: 'Chờ phản hồi',
        date: "14/04/2026",
        urgency: 'Cao',
        summary: "Đề xuất kiến trúc bảo mật đa lớp cho các cơ sở dữ liệu quốc gia về dân cư..."
    }
];

const OfficerHienKePage = () => {
    const [activeTab, setActiveTab] = useState('all'); // all, pending, processing, responded
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = MOCK_OFFICER_HIEN_KE.filter(item => {
        const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTab =
            activeTab === 'all' ? true :
                activeTab === 'pending' ? item.status === 'Chờ phản hồi' :
                    activeTab === 'processing' ? item.status === 'Đang xử lý' :
                        item.status === 'Đã phản hồi';
        return matchSearch && matchTab;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Đã phản hồi': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Chờ phản hồi': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'Đang xử lý': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getUrgencyStyle = (urgency) => {
        if (urgency === 'Cao') return 'text-rose-600';
        return 'text-amber-600';
    };

    return (
        <div className="animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý phản hồi hiến kế</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Danh sách các sáng kiến, hiến kế từ người dân được điều phối về <span className="font-bold text-[#0f4c81]">Cục CNTT - Bộ Tư Pháp</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
                        <Filter size={16} /> Lọc nâng cao
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#0f4c81] text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-bold shadow-md">
                        <FileText size={16} /> Báo cáo tổng hợp
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Tổng hiến kế', value: '42', color: 'blue', icon: MessageSquare },
                    { label: 'Chờ phản hồi', value: '12', color: 'rose', icon: AlertCircle },
                    { label: 'Đang xử lý', value: '08', color: 'amber', icon: Clock },
                    { label: 'Đã hoàn thành', value: '22', color: 'emerald', icon: CheckCircle2 }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center shrink-0`}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs & Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div className="flex overflow-x-auto bg-gray-50 p-1 rounded-xl w-full lg:w-auto border border-gray-100 hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${activeTab === 'all'
                            ? 'bg-white text-[#0f4c81] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${activeTab === 'pending'
                            ? 'bg-white text-rose-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Chờ phản hồi
                    </button>
                    <button
                        onClick={() => setActiveTab('processing')}
                        className={`flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${activeTab === 'processing'
                            ? 'bg-white text-amber-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Đang xử lý
                    </button>
                    <button
                        onClick={() => setActiveTab('responded')}
                        className={`flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${activeTab === 'responded'
                            ? 'bg-white text-emerald-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Đã phản hồi
                    </button>
                </div>

                <div className="relative flex-1 w-full lg:w-auto min-w-[300px] lg:max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề hoặc tên tác giả..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <div key={item.id} className="group border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all bg-white relative overflow-hidden">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.urgency === 'Cao' ? 'bg-rose-500' : 'bg-blue-500'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${getStatusStyle(item.status)}`}>
                                            {item.status === 'Đã phản hồi' ? <CheckCircle2 size={12} /> :
                                                item.status === 'Chờ phản hồi' ? <AlertCircle size={12} /> : <Clock size={12} />}
                                            {item.status}
                                        </span>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 flex items-center gap-1">
                                            <Tag size={12} /> {item.domain}
                                        </span>
                                    </div>

                                    <Link to={`/can-bo/phan-hoi-hien-ke/${item.id}`} className="block text-lg font-bold text-gray-900 hover:text-blue-700 transition-colors line-clamp-1 leading-snug mb-2">
                                        {item.title}
                                    </Link>

                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                        {item.summary}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-gray-400">
                                        <span className="flex items-center gap-1.5 text-gray-600"><User size={14} /> {item.author}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> Gửi ngày {item.date}</span>
                                        <span className="flex items-center gap-1.5"><FileText size={14} /> ID: {item.id}</span>
                                    </div>
                                </div>

                                <div className="flex items-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                                    <Link
                                        to={`/can-bo/phan-hoi-hien-ke/${item.id}`}
                                        className={`w-full text-center px-6 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${item.status === 'Đã phản hồi'
                                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm'
                                            }`}
                                    >
                                        {item.status === 'Đã phản hồi' ? 'Xem lại phản hồi' : 'Xử lý phản hồi'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy hiến kế nào</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Hiện tại không có hiến kế nào thuộc bộ lọc này hoặc hồ sơ của bạn chưa có dữ liệu tương ứng.
                        </p>
                        <button onClick={() => { setSearchTerm(''); setActiveTab('all'); }} className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                            Xóa tất cả bộ lọc
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfficerHienKePage;

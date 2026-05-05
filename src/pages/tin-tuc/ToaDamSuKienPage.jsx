import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, RotateCcw, ChevronDown, ChevronRight, Filter } from 'lucide-react';

const MOCK_EVENTS = [
    {
        id: 1,
        title: 'CHÀO MỪNG NGÀY BẦU CỬ ĐẠI BIỂU QUỐC HỘI KHÓA XVI VÀ ĐẠI BIỂU HỘI ĐỒNG NHÂN DÂN CÁC CẤP NHIỆM KỲ 2026-2031',
        description: 'Ngày 15-3-2026, cử tri cả nước sẽ đi bỏ phiếu bầu cử đại biểu Quốc hội khóa XVI và đại biểu Hội đồng nhân dân (HĐND) các cấp nhiệm kỳ 2026 - 2031. Đây là đợt...',
        image: '/5e431efa-cd43-44df-8469-ba03dcb620c6.jpg',
        thumbColor: 'bg-red-600',
        tags: [
            { text: 'Sự kiện', color: 'blue' }
        ],
        startDate: '15/03/2026 07:00',
        endDate: '15/03/2026 21:00',
        status: 'Đã kết thúc',
        statusColor: 'text-red-500'
    },
    {
        id: 2,
        title: 'CHÀO MỪNG ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ XIV CỦA ĐẢNG',
        description: 'Đại hội đại biểu toàn quốc lần thứ XIV của Đảng là sự kiện chính trị trọng đại, có ý nghĩa định hướng đối với sự phát triển đất nước trong giai đoạn mới. Trong khôn...',
        image: '/bc536d54-ce2c-4961-be6f-a1fddb4e086d.jpg',
        thumbColor: 'bg-orange-500',
        tags: [
            { text: 'Sự kiện', color: 'blue' }
        ],
        startDate: '19/01/2026 08:00',
        endDate: '25/01/2026 12:59',
        status: 'Đã kết thúc',
        statusColor: 'text-red-500'
    },
    {
        id: 3,
        title: 'Lễ hưởng ứng Ngày Pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam năm 2025',
        description: 'Vào ngày 07/11/2025, tại Hội trường Bộ Tư pháp, Lễ hưởng ứng Ngày Pháp luật Việt Nam năm 2025 sẽ được tổ chức theo hình thức trực tiếp kết hợp trực tuyến...',
        image: '/5e431efa-cd43-44df-8469-ba03dcb620c6.jpg',
        thumbColor: 'bg-yellow-400',
        tags: [
            { text: 'Sự kiện', color: 'blue' },
            { text: 'Bộ Tư pháp', color: 'green' }
        ],
        startDate: '07/11/2025 15:00',
        endDate: '07/11/2025 18:00',
        status: 'Đã kết thúc',
        statusColor: 'text-red-500'
    },
    {
        id: 4,
        title: 'Nhận diện điểm nghẽn và đề xuất giải pháp khắc phục liên quan đến Luật Đất đai',
        description: 'Hội nghị tập trung trao đổi, thảo luận về các khó khăn, vướng mắc mà doanh nghiệp đang gặp phải trong lĩnh vực đất đai về mặt thể chế và trong công tác t...',
        image: '/bc536d54-ce2c-4961-be6f-a1fddb4e086d.jpg',
        thumbColor: 'bg-[#1a3673]',
        tags: [
            { text: 'Tọa đàm', color: 'blue' },
            { text: 'Đồng chí Nguyễn Thanh Ngọc', color: 'green' },
            { text: 'Lãnh đạo Bộ Nông nghiệp và PTNT', color: 'green' }
        ],
        startDate: '22/09/2025 14:00',
        endDate: '22/09/2025 17:15',
        status: 'Đã kết thúc',
        statusColor: 'text-red-500'
    }
];

const ToaDamSuKienPage = () => {
    const [searchType, setSearchType] = useState('contains'); // 'contains' or 'exact'
    const [searchField, setSearchField] = useState(true); // true = Tiêu đề
    const [selectedEventType, setSelectedEventType] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-blue-600 transition-colors text-blue-600">Trang chủ</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-700">Tọa đàm sự kiện</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar */}
                <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-8">
                    {/* Event Type Filter */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[16px] text-gray-900">Loại hình sự kiện</h3>
                            <button
                                onClick={() => setSelectedEventType(null)}
                                className="text-[13px] text-blue-600 hover:underline"
                            >
                                Bỏ chọn
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="flex flex-col gap-3">
                            {['Tọa đàm', 'Hội nghị', 'Hội thảo', 'Sự kiện'].map(type => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="eventType"
                                        checked={selectedEventType === type}
                                        onChange={() => setSelectedEventType(type)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-[14px] text-gray-700 group-hover:text-gray-900">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[16px] text-gray-900">Trạng thái</h3>
                            <button
                                onClick={() => setSelectedStatus(null)}
                                className="text-[13px] text-blue-600 hover:underline"
                            >
                                Bỏ chọn
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="flex flex-col gap-3">
                            {['Đã kết thúc', 'Sắp diễn ra', 'Đang diễn ra'].map(status => (
                                <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={selectedStatus === status}
                                        onChange={() => setSelectedStatus(status)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-[14px] text-gray-700 group-hover:text-gray-900">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Search Bar */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tọa đàm - sự kiện"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                                    Tìm kiếm
                                </button>
                                <button className="p-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                                    <RotateCcw size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Search Options */}
                        <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] text-gray-600">
                            <div className="flex flex-wrap items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="searchType"
                                        checked={searchType === 'contains'}
                                        onChange={() => setSearchType('contains')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    So sánh có chứa
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="searchType"
                                        checked={searchType === 'exact'}
                                        onChange={() => setSearchType('exact')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    Cụm từ chính xác
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={searchField}
                                        onChange={() => setSearchField(!searchField)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    Tiêu đề
                                </label>
                            </div>
                            <button
                                onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                                className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
                            >
                                Tìm kiếm nâng cao <ChevronDown size={14} className={`transition-transform ${isAdvancedSearchOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4">
                        <span className="text-[15px] text-gray-700">Có tất cả: <span className="font-bold text-gray-900">{MOCK_EVENTS.length} dữ liệu</span></span>
                    </div>

                    {/* Results List */}
                    <div className="flex flex-col gap-6">
                        {MOCK_EVENTS.map(event => (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row p-4 hover:shadow-md transition-shadow group">
                                {/* Thumb */}
                                <div className={`w-full md:w-[280px] h-[160px] shrink-0 rounded-lg overflow-hidden relative ${event.image ? '' : event.thumbColor} flex items-center justify-center mb-4 md:mb-0 md:mr-6`}>
                                    {event.image ? (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <h4 className="text-white font-bold text-center text-[14px] leading-tight drop-shadow-md p-4">{event.title.substring(0, 50)}...</h4>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col pr-0 md:pr-6 md:border-r border-gray-100 mb-4 md:mb-0">
                                    <h3 className="text-[16px] md:text-[18px] font-bold text-[#1e3a8a] leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                                        <Link to={`/tin-tuc/toa-dam-su-kien/${event.id}`}>{event.title}</Link>
                                    </h3>
                                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                        {event.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {event.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-3 py-1 text-[11px] font-medium rounded-full border ${tag.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'}`}
                                            >
                                                {tag.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Meta Box */}
                                <div className="w-full md:w-[200px] shrink-0 flex flex-col justify-center bg-gray-50/50 rounded-lg p-4">
                                    <div className="flex items-start gap-2 mb-2 text-[13px]">
                                        <span className="text-gray-500 whitespace-nowrap">Từ ngày:</span>
                                        <span className="font-semibold text-gray-800">{event.startDate}</span>
                                    </div>
                                    <div className="flex items-start gap-2 mb-3 text-[13px]">
                                        <span className="text-gray-500 whitespace-nowrap">Đến ngày:</span>
                                        <span className="font-semibold text-gray-800">{event.endDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[13px]">
                                        <span className="text-gray-500 whitespace-nowrap">Trạng thái:</span>
                                        <span className={`font-semibold ${event.statusColor}`}>{event.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToaDamSuKienPage;

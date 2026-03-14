import React, { useState } from 'react';
import { Search, MoreVertical, Link as LinkIcon, ArrowLeft, BookOpen, FileText, HelpCircle, Trash2, ArrowRightLeft, Share2, Copy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const MOCK_ITEMS = [
    { id: 101, type: 'vanban', title: 'Luật Đất đai số 31/2024/QH15', date: 'Thêm vào: 15/03/2026', snippet: 'Được Quốc hội nước Cộng hòa xã hội chủ nghĩa Việt Nam khóa XV, kỳ họp bất thường lần thứ 5 thông qua ngày 18 tháng 01 năm 2024.', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 102, type: 'vanban', title: 'Nghị định 102/2024/NĐ-CP', date: 'Thêm vào: 14/03/2026', snippet: 'Quy định chi tiết thi hành một số điều của Luật Đất đai.', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 103, type: 'tinbai', title: 'Điểm mới nổi bật của Luật Đất đai 2024 so với Luật trình 2013', date: 'Thêm vào: 10/03/2026', snippet: 'Bài viết phân tích các điểm thay đổi cốt lõi về bảng giá đất, thu hồi đất, và cấp sổ đỏ.', icon: BookOpen, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 104, type: 'tuvan', title: 'Thủ tục sang tên sổ đỏ theo Luật Đất đai mới nhất', date: 'Thêm vào: 05/03/2026', snippet: 'Hỏi đáp về quy trình, thuế và lệ phí phải nộp khi sang tên quyền sử dụng đất.', icon: HelpCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const CollectionDetailPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('tat-ca');
    const [searchTerm, setSearchTerm] = useState('');

    // In a real app, fetch collection details based on ID
    const collection = { id: 1, name: 'Tài liệu Luật Đất đai 2024', emoji: '🏡', image: '/images/collections/land_law.png', count: 12, updatedAt: '15/03/2026', isShared: true, desc: 'Tổng hợp các văn bản hướng dẫn thi hành Luật Đất đai mới' };

    const TABS = [
        { id: 'tat-ca', label: 'Tất cả' },
        { id: 'vanban', label: 'Văn bản pháp luật' },
        { id: 'tinbai', label: 'Tin bài' },
        { id: 'tuvan', label: 'Tư vấn, Hỏi đáp' }
    ];

    const filteredItems = MOCK_ITEMS.filter(item => {
        if (activeTab !== 'tat-ca' && item.type !== activeTab) return false;
        if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="animate-fadeIn pb-12">
            
            {/* Collection Header Banner */}
            <div className="rounded-2xl shadow-sm text-white p-8 relative overflow-hidden mb-6">
                <div className="absolute inset-0 z-0">
                    <img src={collection.image} alt={collection.name} className="w-full h-full object-cover brightness-[0.6]" />
                </div>
                {/* Decorative circles */}
                <div className="absolute z-0 -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute z-0 -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex gap-5 items-center">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white/20 shrink-0 overflow-hidden">
                            <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <Link to="/ca-nhan/bo-suu-tap" className="text-white/80 hover:text-white transition-colors bg-black/20 p-1.5 rounded-md">
                                    <ArrowLeft size={16} />
                                </Link>
                                <h1 className="text-2xl md:text-3xl font-bold">{collection.name}</h1>
                            </div>
                            <p className="text-white/80 text-[15px] mb-3 max-w-2xl">{collection.desc}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                                <span className="bg-black/20 px-2.5 py-1 rounded-md">{collection.count} mục</span>
                                <span className="text-white/70">Cập nhật: {collection.updatedAt}</span>
                                {collection.isShared && (
                                    <span className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-md">
                                        <LinkIcon size={14} /> Đã tạo link chia sẻ
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Header Actions */}
                    <div className="flex gap-2 shrink-0 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                            <Share2 size={16}/> Chia sẻ
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                            <MoreVertical size={16}/> Tùy chọn
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 sticky top-8 z-20">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Tabs */}
                    <div className="flex overflow-x-auto hide-scrollbar gap-1 p-1 bg-gray-50 rounded-lg">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md font-medium text-[14px] whitespace-nowrap transition-colors ${
                                    activeTab === tab.id 
                                    ? 'bg-white text-blue-600 shadow-sm border border-gray-200' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {tab.label} {tab.id !== 'tat-ca' && <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full ml-1 rounded-full">
                                    {tab.id === 'vanban' ? 8 : tab.id === 'tinbai' ? 2 : 2}
                                </span>}
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort */}
                    <div className="flex gap-3 px-2 lg:px-0">
                        <div className="relative flex-1 lg:w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Tìm trong bộ sưu tập..." 
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none hidden sm:block">
                            <option>Mới thêm nhất</option>
                            <option>Cũ nhất</option>
                            <option>Tên A-Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Item List */}
            <div className="space-y-4">
                {filteredItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group flex flex-col sm:flex-row gap-5">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                                <Icon size={24} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-1">
                                    <h3 className="font-bold text-[16px] text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                                        <Link to="#">{item.title}</Link>
                                    </h3>
                                    {/* Action buttons (unhide on hover on desktop) */}
                                    <div className="flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Sao chép link">
                                            <Copy size={16} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Di chuyển">
                                            <ArrowRightLeft size={16} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Xóa khỏi bộ sưu tập">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[14px] text-gray-500 line-clamp-1 mb-3">{item.snippet}</p>
                                <div className="flex items-center gap-3 text-[12px] font-medium">
                                    <span className={`px-2 py-0.5 rounded-md ${item.bg} ${item.color}`}>{
                                        item.type === 'vanban' ? 'Văn bản PL' : item.type === 'tinbai' ? 'Tin bài' : 'Hỏi đáp'
                                    }</span>
                                    <span className="text-gray-400">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {filteredItems.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 font-medium text-[15px]">Không có mục nào phù hợp tìm kiếm.</p>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default CollectionDetailPage;

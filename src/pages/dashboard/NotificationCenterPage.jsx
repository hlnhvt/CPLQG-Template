import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, FileText, Edit, HelpCircle, BookOpen, Settings, Star, MoreVertical, CheckSquare, Square, Trash2, CheckCircle2, ChevronDown, Filter } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
    { id: 99, type: 'tinbai', linh_vuc: 'dat-dai', source: 'Ban biên tập', title: 'Tin bài của bạn đã được duyệt', desc: 'Tin bài "Bình luận những điểm mới của Luật Đất đai 2024 đối với kiều bào" đã được Ban biên tập phê duyệt và xuất bản.', time: 'Vừa xong', isRead: false, isImportant: true },
    { id: 1, type: 'vanban', linh_vuc: 'dat-dai', source: 'Bộ Tư pháp', title: 'Ban hành Luật Đất đai mới (Số 31/2024/QH15)', desc: 'Quốc hội đã chính thức ban hành Luật Đất đai mới, có hiệu lực từ 01/01/2025. Vui lòng xem chi tiết.', time: '10 phút trước', isRead: false, isImportant: true },
    { id: 2, type: 'duthao', linh_vuc: 'doanh-nghiep', source: 'Cổng thông tin', title: 'Dự thảo Nghị định quy định chi tiết Luật Đất đai', desc: 'Mời bạn tham gia đóng góp ý kiến cho Dự thảo Nghị định hướng dẫn thi hành Luật Đất đai 2024.', time: '2 giờ trước', isRead: false, isImportant: false },
    { id: 3, type: 'hoidap', linh_vuc: 'dan-su', source: 'Chuyên gia pháp lý', title: 'Câu hỏi của bạn đã được trả lời', desc: 'Luật sư Nguyễn Văn B đã trả lời câu hỏi của bạn về thủ tục sang tên sổ đỏ.', time: 'Hôm qua', isRead: true, isImportant: true },
    { id: 4, type: 'tinbai', linh_vuc: 'hanh-chinh', source: 'Hệ thống CPLQG', title: 'Bản tin Pháp luật tuần 2 tháng 3', desc: 'Tổng hợp các chính sách mới có hiệu lực và các văn bản chỉ đạo điều hành nổi bật.', time: '12/03/2026', isRead: true, isImportant: false },
    { id: 5, type: 'hethong', linh_vuc: '', source: 'Hệ thống', title: 'Cập nhật bảo mật tài khoản', desc: 'Chúng tôi vừa cập nhật chính sách bảo mật. Vui lòng kiểm tra lại thông tin tài khoản của bạn.', time: '10/03/2026', isRead: true, isImportant: false },
    { id: 6, type: 'duthao', linh_vuc: 'doanh-nghiep', source: 'Bộ Kế hoạch và Đầu tư', title: 'Công bố dự thảo Luật Doanh nghiệp (sửa đổi)', desc: 'Dự thảo đang trong thời gian lấy ý kiến nhân dân (60 ngày).', time: '05/03/2026', isRead: true, isImportant: false },
];

const TYPE_CONFIG = {
    'vanban': { icon: FileText, color: 'text-green-600', bg: 'bg-green-100', label: 'Văn bản QPPL' },
    'duthao': { icon: Edit, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Dự thảo' },
    'hoidap': { icon: HelpCircle, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Hỏi đáp' },
    'tinbai': { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Tin bài' },
    'hethong': { icon: Settings, color: 'text-gray-600', bg: 'bg-gray-200', label: 'Hệ thống' },
};

const LINH_VUC_CONFIG = [
    { value: 'dat-dai',      label: 'Đất đai' },
    { value: 'dan-su',       label: 'Dân sự' },
    { value: 'doanh-nghiep', label: 'Doanh nghiệp' },
    { value: 'hanh-chinh',   label: 'Hành chính' },
    { value: 'lao-dong',     label: 'Lao động' },
    { value: 'hinh-su',      label: 'Hình sự' },
];

const NotificationCenterPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [activeTab, setActiveTab] = useState('tat-ca');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter state
    const [filterTypes, setFilterTypes] = useState([]);
    const [filterFields, setFilterFields] = useState([]);
    const [filterTime, setFilterTime] = useState('all');

    const handleToggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleSelectAll = () => {
        if (selectedIds.length === filteredNotifications.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredNotifications.map(n => n.id));
        }
    };

    const toggleImportant = (id, e) => {
        e.stopPropagation();
        setNotifications(notifications.map(n => n.id === id ? { ...n, isImportant: !n.isImportant } : n));
    };

    const markAsRead = (ids) => {
        setNotifications(notifications.map(n => ids.includes(n.id) ? { ...n, isRead: true } : n));
        setSelectedIds([]);
    };

    const markAsUnread = (ids) => {
        setNotifications(notifications.map(n => ids.includes(n.id) ? { ...n, isRead: false } : n));
        setSelectedIds([]);
    };

    const deleteNotifications = (ids) => {
        setNotifications(notifications.filter(n => !ids.includes(n.id)));
        setSelectedIds([]);
    };

    const toggleTypeFilter = (type) => {
        setFilterTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const toggleFieldFilter = (field) => {
        setFilterFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
    };

    let filteredNotifications = notifications.filter(n => {
        if (activeTab === 'chua-doc' && n.isRead) return false;
        if (activeTab === 'quan-trong' && !n.isImportant) return false;
        if (filterTypes.length > 0 && !filterTypes.includes(n.type)) return false;
        if (filterFields.length > 0 && !filterFields.includes(n.linh_vuc)) return false;
        // Basic time filter mock
        if (filterTime === 'today' && !['10 phút trước', '2 giờ trước'].includes(n.time)) return false;
        return true;
    });

    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.isRead).length,
        important: notifications.filter(n => n.isImportant).length,
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 animate-fadeIn pb-12 h-[calc(100vh-100px)]">
            
            {/* Mobile Filter Button */}
            <div className="md:hidden flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Thông báo</h1>
                <button 
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm text-gray-700 font-medium"
                >
                    <Filter size={16} /> Lọc
                </button>
            </div>

            {/* Left Sidebar (Filters) */}
            <div className={`w-full md:w-64 shrink-0 flex flex-col gap-4 ${isMobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
                {/* Stats Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Bell size={18} className="text-[#0f4c81]"/> Tổng quan</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-[14px]">
                            <span className="text-gray-600">Tổng thông báo</span>
                            <span className="font-semibold">{stats.total}</span>
                        </div>
                        <div className="flex justify-between items-center text-[14px]">
                            <span className="text-gray-600">Chưa đọc</span>
                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{stats.unread}</span>
                        </div>
                        <div className="flex justify-between items-center text-[14px]">
                            <span className="text-gray-600">Quan trọng</span>
                            <span className="font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">{stats.important}</span>
                        </div>
                    </div>
                </div>

                {/* Filter Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 overflow-y-auto hidden-scrollbar">
                    <h3 className="font-bold text-gray-900 mb-4">Lọc theo loại</h3>
                    <div className="space-y-3 mb-6">
                        {Object.entries(TYPE_CONFIG).map(([type, config]) => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filterTypes.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-500'}`}>
                                    {filterTypes.includes(type) && <CheckSquare size={14} className="text-white" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={filterTypes.includes(type)} onChange={() => toggleTypeFilter(type)} />
                                <span className="text-[14px] text-gray-700">{config.label}</span>
                            </label>
                        ))}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4">Lọc theo thời gian</h3>
                    <div className="space-y-3 mb-6">
                        {['all:Tất cả', 'today:Hôm nay', 'week:Tuần này', 'month:Tháng này'].map(opt => {
                            const [val, label] = opt.split(':');
                            return (
                                <label key={val} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterTime === val ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-500'}`}>
                                        {filterTime === val && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                                    </div>
                                    <input type="radio" name="timeFilter" className="hidden" checked={filterTime === val} onChange={() => setFilterTime(val)} />
                                    <span className="text-[14px] text-gray-700">{label}</span>
                                </label>
                            );
                        })}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4">Lọc theo lĩnh vực</h3>
                    <div className="space-y-3 mb-6">
                        {LINH_VUC_CONFIG.map(({ value, label }) => (
                            <label key={value} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filterFields.includes(value) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-500'}`}>
                                    {filterFields.includes(value) && <CheckSquare size={14} className="text-white" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={filterFields.includes(value)} onChange={() => toggleFieldFilter(value)} />
                                <span className="text-[14px] text-gray-700">{label}</span>
                            </label>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-auto">
                        <Link to="/ca-nhan/cai-dat-thong-bao" className="flex items-center gap-2 text-[14px] font-medium text-[#0f4c81] hover:text-blue-700 transition-colors">
                            <Settings size={16} /> Cài đặt thông báo
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Section (Inbox) */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
                
                {/* Header & Tabs */}
                <div className="px-5 pt-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-[#0f4c81] hidden md:block mb-4">Hòm thư thông báo</h1>
                    
                    <div className="flex justify-between items-center mb-0">
                        <div className="flex gap-6">
                            {[
                                { id: 'tat-ca', label: 'Tất cả', count: null },
                                { id: 'chua-doc', label: 'Chưa đọc', count: stats.unread },
                                { id: 'quan-trong', label: 'Quan trọng', count: null }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setSelectedIds([]); }}
                                    className={`pb-3 text-[15px] font-medium border-b-2 transition-colors flex items-center gap-2 ${
                                        activeTab === tab.id 
                                        ? 'border-blue-600 text-blue-600' 
                                        : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    {tab.label} {tab.count > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{tab.count}</span>}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-48 hidden sm:block mb-2">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm..." className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:bg-white focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Bulk Actions Toolbar (Absolute overlay) */}
                <div className={`absolute top-[73px] left-0 right-0 bg-blue-50 border-b border-blue-100 px-5 py-2.5 flex items-center justify-between z-10 transition-transform duration-300 ${selectedIds.length > 0 ? 'translate-y-0' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                    <div className="flex items-center gap-4 text-[14px]">
                        <span className="font-semibold text-blue-800">Đã chọn {selectedIds.length}</span>
                        <div className="h-5 w-px bg-blue-200"></div>
                        <button onClick={() => markAsRead(selectedIds)} className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-medium">
                            <CheckCircle2 size={16} /> Đã đọc
                        </button>
                        <button onClick={() => markAsUnread(selectedIds)} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium ml-2">
                            Đánh dấu chưa đọc
                        </button>
                    </div>
                    <button onClick={() => deleteNotifications(selectedIds)} className="flex items-center gap-1.5 text-red-600 hover:text-red-800 font-medium text-[14px]">
                        <Trash2 size={16} /> Xóa
                    </button>
                </div>

                {/* List Header (Select All) */}
                <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50 relative z-0">
                    <button onClick={handleSelectAll} className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer">
                        {selectedIds.length > 0 && selectedIds.length === filteredNotifications.length ? (
                            <CheckSquare size={18} className="text-blue-600" />
                        ) : selectedIds.length > 0 ? (
                            <div className="w-[18px] h-[18px] bg-blue-600 rounded flex items-center justify-center">
                                <div className="w-2.5 h-0.5 bg-white"></div>
                            </div>
                        ) : (
                            <Square size={18} />
                        )}
                    </button>
                    <div className="flex-1"></div>
                    <span className="text-[12px] text-gray-500 hidden sm:block">Hiển thị {filteredNotifications.length} thông báo</span>
                </div>

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredNotifications.map(notification => {
                        const config = TYPE_CONFIG[notification.type];
                        const Icon = config.icon;
                        const isSelected = selectedIds.includes(notification.id);

                        return (
                            <div 
                                key={notification.id} 
                                onClick={() => {
                                    if (!notification.isRead) markAsRead([notification.id]);
                                    navigate(`/ca-nhan/thong-bao/${notification.id}`);
                                }}
                                className={`group flex items-center gap-4 px-5 py-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                    isSelected ? 'bg-blue-50/50' : notification.isRead ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/30 hover:bg-blue-50/60'
                                }`}
                            >
                                {/* Checkbox */}
                                <button onClick={(e) => { e.stopPropagation(); handleToggleSelect(notification.id); }} className={`p-1 shrink-0 ${isSelected || !notification.isRead ? 'opacity-100' : 'opacity-0 xl:opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                    {isSelected ? <CheckSquare size={18} className="text-blue-600" /> : <Square size={18} className="text-gray-300 hover:text-gray-500" />}
                                </button>

                                {/* Icon Layer */}
                                <div className="relative shrink-0">
                                    {!notification.isRead && <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-blue-600 rounded-full border border-white z-10"></div>}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.color}`}>
                                        <Icon size={20} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[12px] font-medium text-gray-500">{notification.source}</span>
                                        <span className="text-gray-300 text-[10px]">•</span>
                                        <span className="text-[12px] text-gray-400">{notification.time}</span>
                                    </div>
                                    <h4 className={`text-[15px] truncate mb-1 ${notification.isRead ? 'text-gray-700 font-medium' : 'text-gray-900 font-bold'}`}>
                                        {notification.title}
                                    </h4>
                                    <p className={`text-[13px] truncate ${notification.isRead ? 'text-gray-500' : 'text-gray-600'}`}>
                                        {notification.desc}
                                    </p>
                                </div>

                                {/* Actions (Star & Menu) */}
                                <div className="flex items-center gap-3 shrink-0">
                                    <button 
                                        onClick={(e) => toggleImportant(notification.id, e)}
                                        className={`p-1.5 rounded-full transition-colors ${notification.isImportant ? 'text-orange-400 hover:bg-orange-50' : 'text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        <Star size={18} fill={notification.isImportant ? "currentColor" : "none"} />
                                    </button>
                                    <button 
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1.5 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 hover:text-gray-700"
                                    >
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {filteredNotifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Bell size={28} className="text-gray-300"/>
                            </div>
                            <h3 className="text-[16px] font-semibold text-gray-700 mb-1">Không có thông báo nào</h3>
                            <p className="text-[13px] text-gray-500">Bạn đã xem hết tất cả thông báo trong mục này.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationCenterPage;

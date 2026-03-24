import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageSquare, Trash2, Edit3, MoreVertical, FileText, CheckCircle, Clock, Activity, Globe, Laptop, Smartphone, Monitor, Info, ChevronDown, ChevronUp, XCircle, AlertCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_FAVORITES = [
    { id: 1, type: 'vanban', title: 'Luật Đất đai số 31/2024/QH15', date: 'Đã lưu: 15/03/2026', snippet: 'Được Quốc hội thông qua ngày 18 tháng 01 năm 2024.', url: '#' },
    { id: 2, type: 'tinbai', title: 'Quy định mới về bảo hiểm thất nghiệp từ 2026', date: 'Đã lưu: 12/03/2026', snippet: 'Mức hưởng trợ cấp thất nghiệp tăng đáng kể theo quy định mới.', url: '#' },
    { id: 3, type: 'tuvan', title: 'Thủ tục thành lập doanh nghiệp nhanh nhất 2026', date: 'Đã lưu: 10/03/2026', snippet: 'Hướng dẫn chi tiết bộ hồ sơ và quy trình trực tuyến trên Cổng DVC.', url: '#' },
    { id: 4, type: 'vanban', title: 'Nghị định 102/2024/NĐ-CP hướng dẫn Luật Đất đai', date: 'Đã lưu: 05/03/2026', snippet: 'Quy định chi tiết thi hành một số điều của Luật Đất đai mới.', url: '#' },
];

const MOCK_COMMENTS = [
    { id: 101, articleTitle: 'Dự thảo Nghị định thu phí đường bộ cao tốc', content: 'Tôi hoàn toàn đồng ý với dự thảo này. Tuy nhiên, mức phí cần được điều chỉnh phù hợp với từng vùng miền để đảm bảo công bằng.', status: 'published', date: '14/03/2026 10:30', url: '#' },
    { id: 102, articleTitle: 'Lấy ý kiến Luật BHXH (Sửa đổi)', content: 'Cần xem xét kỹ tuổi nghỉ hưu của người lao động làm việc trong môi trường độc hại, họ không thể đợi đến 62 tuổi.', status: 'pending', date: '12/03/2026 15:45', url: '#' },
    { id: 103, articleTitle: 'Báo cáo tiếp thu Luật Đất đai mới', content: 'Cảm ơn cơ quan soạn thảo đã lắng nghe và giải trình rất cặn kẽ các ý kiến của người dân ở kỳ trước.', status: 'published', date: '05/03/2026 09:12', url: '#' }
];

const MOCK_ACTIVITY_LOGS = [
    { id: 1001, time: '14:30:45', date: '19/03/2026', timezone: 'GMT+7', action: 'Đăng nhập hệ thống (Thành công)', status: 'success', link: '/dang-nhap', linkTitle: 'Trang Đăng nhập', deviceName: 'MacBook Pro 16"', ip: '113.160.225.124', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36...', deviceType: 'desktop', os: 'macOS Sonoma', browser: 'Chrome 122' },
    { id: 1002, time: '14:35:12', date: '19/03/2026', timezone: 'GMT+7', action: 'Xem bài viết: "Quy định mới về bảo hiểm thất nghiệp từ 2026"', status: 'success', link: '/tin-tuc/quy-dinh-moi-bao-hiem-that-nghiep', linkTitle: 'Bài viết Tin tức', deviceName: 'MacBook Pro 16"', ip: '113.160.225.124', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36...', deviceType: 'desktop', os: 'macOS Sonoma', browser: 'Chrome 122' },
    { id: 1003, time: '09:15:20', date: '18/03/2026', timezone: 'GMT+7', action: 'Bình luận tại bài viết: "Dự thảo Nghị định thu phí đường bộ cao tốc"', status: 'success', link: '#', linkTitle: 'Nhấn để xem bình luận', deviceName: 'iPhone 15 Pro Max', ip: '42.113.125.44', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15...', deviceType: 'mobile', os: 'iOS 17.4', browser: 'Safari Mobile' },
    { id: 1004, time: '21:40:05', date: '17/03/2026', timezone: 'GMT+7', action: 'Tạo chủ đề diễn đàn: "Hỏi đáp về thủ tục thừa kế đất đai"', status: 'warning', link: '/ca-nhan/chu-de-dien-dan', linkTitle: 'Quản lý chủ đề (Đang chờ duyệt)', deviceName: 'iPad Air 5', ip: '14.161.45.221', userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15...', deviceType: 'tablet', os: 'iPadOS 17.2', browser: 'Safari' },
    { id: 1005, time: '21:10:30', date: '17/03/2026', timezone: 'GMT+7', action: 'Đăng nhập hệ thống (Thất bại do sai mật khẩu)', status: 'danger', link: '/dang-nhap', linkTitle: 'Trang Đăng nhập', deviceName: 'iPad Air 5', ip: '14.161.45.221', userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15...', deviceType: 'tablet', os: 'iPadOS 17.2', browser: 'Safari' },
    { id: 1006, time: '10:05:11', date: '15/03/2026', timezone: 'GMT+7', action: 'Lưu văn bản "Luật Đất đai số 31/2024/QH15" vào danh sách yêu thích', status: 'success', link: '#', linkTitle: 'Văn bản Đất đai (Đã lưu)', deviceName: 'PC Windows 11', ip: '115.79.144.12', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...', deviceType: 'desktop', os: 'Windows 11', browser: 'Edge 121' },
];

const UserHistoryPage = () => {
    const [activeTab, setActiveTab] = useState('favorites');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(MOCK_FAVORITES);
    const [comments, setComments] = useState(MOCK_COMMENTS);
    const [activityLogs, setActivityLogs] = useState(MOCK_ACTIVITY_LOGS);
    const [expandedLogs, setExpandedLogs] = useState([]);
    
    // Edit comment states
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Reset page whenever tab changes
    const changeTab = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const toggleExpandLog = (id) => {
        setExpandedLogs(prev => 
            prev.includes(id) ? prev.filter(logId => logId !== id) : [...prev, id]
        );
    };

    const getDeviceIcon = (type) => {
        if (type === 'mobile') return <Smartphone size={16} className="text-gray-500" />;
        if (type === 'tablet') return <Laptop size={16} className="text-gray-500" />;
        return <Monitor size={16} className="text-gray-500" />;
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'success':
                return { bg: 'bg-green-50/80 border-green-200', text: 'text-green-700', icon: <CheckCircle size={14} className="text-green-600" />, label: 'Thành công' };
            case 'danger':
                return { bg: 'bg-red-50/80 border-red-200', text: 'text-red-700', icon: <XCircle size={14} className="text-red-600" />, label: 'Thất bại' };
            case 'warning':
                return { bg: 'bg-yellow-50/80 border-yellow-200', text: 'text-yellow-700', icon: <AlertCircle size={14} className="text-yellow-600" />, label: 'Chờ duyệt / Cảnh báo' };
            default:
                return { bg: 'bg-gray-50/80 border-gray-200', text: 'text-gray-700', icon: <Info size={14} className="text-gray-500" />, label: 'Hoàn tất' };
        }
    };

    const handleRemoveFavorite = (id) => {
        setFavorites(favorites.filter(f => f.id !== id));
    };

    const handleDeleteComment = (id) => {
        if(window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    const handleEditCommentHistory = (comment) => {
        setEditingCommentId(comment.id);
        setEditCommentContent(comment.content);
    };

    const handleSaveEditHistory = (id) => {
        if(editCommentContent.trim() === '') return;
        setComments(comments.map(c => c.id === id ? { ...c, content: editCommentContent } : c));
        setEditingCommentId(null);
        setEditCommentContent('');
    };

    // Derived States for Pagination
    const filteredFavorites = favorites.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const paginatedFavorites = filteredFavorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalFavoritePages = Math.ceil(filteredFavorites.length / itemsPerPage);

    const paginatedComments = comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalCommentPages = Math.ceil(comments.length / itemsPerPage);

    const paginatedActivities = activityLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalActivityPages = Math.ceil(activityLogs.length / itemsPerPage);

    const renderPagination = (totalPages, totalItems) => {
        if (totalItems === 0) return null;
        
        return (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                    <span>Hiển thị:</span>
                    <select 
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <option value={2}>2 bản ghi</option>
                        <option value={5}>5 bản ghi</option>
                        <option value={10}>10 bản ghi</option>
                        <option value={20}>20 bản ghi</option>
                    </select>
                    <span className="ml-2 hidden sm:inline-block">/ tổng số {totalItems}</span>
                </div>
                
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors ${
                                        currentPage === i + 1
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="animate-fadeIn pb-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Lịch sử hoạt động</h1>
                <p className="text-gray-500 text-sm mt-1">Quản lý bài viết đã ưu thích và bình luận của bạn trên Cổng.</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex bg-gray-50 p-1 rounded-lg min-w-max">
                    <button 
                        onClick={() => changeTab('favorites')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'favorites' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <Heart size={16} className={activeTab === 'favorites' ? 'fill-blue-100' : ''} /> 
                        Đã Yêu thích <span className="hidden sm:inline-block ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">{favorites.length}</span>
                    </button>
                    <button 
                        onClick={() => changeTab('comments')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'comments' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <MessageSquare size={16} className={activeTab === 'comments' ? 'fill-blue-100' : ''} /> 
                        Bình luận <span className="hidden sm:inline-block ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">{comments.length}</span>
                    </button>
                    <button 
                        onClick={() => changeTab('activities')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'activities' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <Activity size={16} /> 
                        Lịch sử hoạt động
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
                
                {/* FAVORITES TAB */}
                {activeTab === 'favorites' && (
                    <div className="animate-fadeIn p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                            <div className="relative w-full sm:w-96">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Tìm trong danh sách yêu thích..." 
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                                    <option>Tất cả loại hình</option>
                                    <option>Văn bản pháp luật</option>
                                    <option>Tin bài</option>
                                    <option>Hỏi đáp & Tư vấn</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {paginatedFavorites.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/10 transition-colors group">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                                        item.type === 'vanban' ? 'bg-blue-100 text-blue-600' : 
                                        item.type === 'tinbai' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link to={item.url} className="text-base font-bold text-gray-900 hover:text-blue-600 mb-1 line-clamp-2">
                                            {item.title}
                                        </Link>
                                        <p className="text-[13px] text-gray-500 line-clamp-2 mb-2">{item.snippet}</p>
                                        <div className="flex items-center gap-4 text-[12px] font-medium text-gray-400">
                                            <span>{item.date}</span>
                                            <span className="capitalize">{
                                                item.type === 'vanban' ? 'Văn bản PL' : 
                                                item.type === 'tinbai' ? 'Tin bài' : 'Hỏi đáp'
                                            }</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-start">
                                        <button 
                                            onClick={() => handleRemoveFavorite(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group-hover:bg-red-50"
                                            title="Bỏ yêu thích"
                                        >
                                            <Heart size={20} className="fill-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {favorites.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    <Heart size={48} className="mx-auto mb-4 text-gray-200" />
                                    <p>Bạn chưa lưu bài viết nào.</p>
                                </div>
                            )}
                            
                            {renderPagination(totalFavoritePages, filteredFavorites.length)}
                        </div>
                    </div>
                )}

                {/* COMMENTS TAB */}
                {activeTab === 'comments' && (
                    <div className="animate-fadeIn p-6">
                        <div className="space-y-6">
                            {paginatedComments.map(comment => (
                                <div key={comment.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all relative group">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                                        <div className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit flex items-center gap-1.5 ${
                                            comment.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }">
                                            {comment.status === 'published' ? (
                                                <><CheckCircle size={14}/> Đã công khai</>
                                            ) : (
                                                <><Clock size={14}/> Chờ kiểm duyệt</>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium">
                                            Đã gửi lúc: {comment.date}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-[15px] text-gray-800 relative group/edit">
                                        {editingCommentId === comment.id ? (
                                            <div className="flex flex-col gap-3">
                                                <textarea 
                                                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-[14px]"
                                                    rows={3}
                                                    value={editCommentContent}
                                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => setEditingCommentId(null)} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium transition-colors">Hủy</button>
                                                    <button onClick={() => handleSaveEditHistory(comment.id)} className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors">Lưu</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                " {comment.content} "
                                                
                                                {/* Actions overlayed on hover */}
                                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/edit:opacity-100 transition-opacity">
                                                    {comment.status === 'pending' && (
                                                        <>
                                                            <button 
                                                                onClick={() => handleEditCommentHistory(comment)}
                                                                className="p-1.5 bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors shadow-sm" title="Sửa (chờ kiểm duyệt)"
                                                            >
                                                                <Edit3 size={15} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                className="p-1.5 bg-gray-100 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shadow-sm" title="Xóa bình luận"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50">
                                        <span className="text-gray-500 italic">Bình luận tại bài viết:</span>
                                        <Link to={comment.url} className="font-semibold text-[#0f4c81] hover:underline line-clamp-1 flex-1">
                                            {comment.articleTitle}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            
                            {comments.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    <MessageSquare size={48} className="mx-auto mb-4 text-gray-200" />
                                    <p>Bạn chưa có bình luận nào.</p>
                                </div>
                            )}
                            
                            {renderPagination(totalCommentPages, comments.length)}
                        </div>
                    </div>
                )}
                
                {/* ACTIVITIES TAB */}
                {activeTab === 'activities' && (
                    <div className="animate-fadeIn p-6">
                        <div className="mb-6 bg-blue-50/50 p-4 border border-blue-100 rounded-lg flex items-start gap-3 text-blue-800 text-sm">
                            <Info size={18} className="shrink-0 mt-0.5" />
                            <p>Hệ thống ghi nhận chi tiết lịch sử hoạt động của bạn trên Cổng thông tin nhằm tăng cường bảo mật và hỗ trợ cá nhân hóa trải nghiệm. Dữ liệu này được đối chiếu chính xác theo múi giờ bạn đang sử dụng.</p>
                        </div>
                        
                        <div className="relative border-l-2 border-gray-100 ml-4 pl-6 space-y-6">
                            {paginatedActivities.map((log) => {
                                const isExpanded = expandedLogs.includes(log.id);
                                const statusTheme = getStatusStyle(log.status);
                                
                                return (
                                    <div key={log.id} className="relative">
                                        {/* Timeline dot */}
                                        <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center shadow-sm z-10">
                                            <div className={`w-2 h-2 rounded-full ${
                                                log.status === 'danger' ? 'bg-red-500' :
                                                log.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                            }`}></div>
                                        </div>
                                        
                                        <div className={`bg-white border text-gray-800 border-gray-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${isExpanded ? 'pb-5' : ''}`}>
                                            {/* Header (Always Visible, Clickable) */}
                                            <div 
                                                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-5 cursor-pointer select-none hover:bg-gray-50/50 transition-colors ${isExpanded ? 'border-b border-gray-100' : 'rounded-xl'}`}
                                                onClick={() => toggleExpandLog(log.id)}
                                            >
                                                <div className="flex-1 pr-4">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border ${statusTheme.bg} ${statusTheme.text} uppercase tracking-wide`}>
                                                            {statusTheme.icon} {statusTheme.label}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors">{log.action}</h3>
                                                </div>
                                                <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md shadow-sm border border-blue-100/50">
                                                        <Clock size={14} />
                                                        <span>{log.time} - {log.date} ({log.timezone})</span>
                                                    </div>
                                                    <div className="shrink-0 text-gray-400 hover:text-blue-600 transition-colors p-1 bg-gray-50 rounded-md border border-transparent group-hover:border-gray-200">
                                                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Expandable Details Grid */}
                                            {isExpanded && (
                                                <div className="px-5 pt-4 animate-fadeIn">
                                                    <div className="flex flex-col gap-4">
                                                        {/* Link Information */}
                                                        {log.link && (
                                                            <div className="bg-white border text-[13px] border-blue-100 rounded-lg p-3 flex items-center gap-2">
                                                                <span className="text-gray-500 font-semibold uppercase text-[11px] tracking-wider shrink-0 w-24">Link chức năng:</span>
                                                                <Link to={log.link} className="flex-1 font-semibold text-blue-600 hover:underline hover:text-blue-800 flex items-center gap-1.5 truncate" title={log.link}>
                                                                    <ExternalLink size={14} className="shrink-0" />
                                                                    {log.linkTitle || log.link}
                                                                </Link>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Device Info */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[13px] bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                                                            <div className="space-y-1.5">
                                                                <span className="text-gray-500 font-medium block uppercase text-[11px] tracking-wider">Thông tin thiết bị</span>
                                                                <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                                                                    {getDeviceIcon(log.deviceType)} {log.deviceName}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <span className="text-gray-500 font-medium block uppercase text-[11px] tracking-wider">Địa chỉ IP</span>
                                                                <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                                                                    <Globe size={14} className="text-[#0f4c81]"/> {log.ip}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <span className="text-gray-500 font-medium block uppercase text-[11px] tracking-wider">Hệ điều hành</span>
                                                                <div className="font-semibold text-gray-900">{log.os}</div>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <span className="text-gray-500 font-medium block uppercase text-[11px] tracking-wider">Trình duyệt & Ứng dụng</span>
                                                                <div className="font-semibold text-gray-900">{log.browser}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* User Agent */}
                                                        <div className="bg-gray-100/80 rounded-lg p-3 text-[11px] text-gray-600 font-mono break-all leading-relaxed shadow-inner" title="Chuỗi User-Agent đầy đủ">
                                                            <span className="font-bold text-gray-700 mr-2 uppercase tracking-wide">User-Agent:</span> 
                                                            {log.userAgent}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {renderPagination(totalActivityPages, activityLogs.length)}
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default UserHistoryPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, FileEdit, Trash2, Eye, Clock, CheckCircle, XCircle, FileText, Send } from 'lucide-react';

const MOCK_ARTICLES = [
    { id: 1, title: 'Bình luận những điểm mới của Luật Đất đai 2024 đối với kiều bào', category: 'Phân tích & Bình luận', date: 'Vừa xong', status: 'draft', views: 0 },
    { id: 2, title: 'Quy trình xử lý kỷ luật lao động mới nhất', category: 'Tư vấn pháp luật', date: '14/03/2026', status: 'pending', views: 0 },
    { id: 3, title: 'Doanh nghiệp FDI và những lưu ý khi áp dụng mức thuế tối thiểu toàn cầu', category: 'Nghiên cứu khoa học', date: '10/03/2026', status: 'published', views: 1245 },
    { id: 4, title: 'Thủ tục đăng ký kết hôn lại', category: 'Tư vấn pháp luật', date: '05/03/2026', status: 'rejected', views: 0, reason: 'Nội dung trùng lặp với bài viết trước đó.' }
];

const STATUS_CONFIG = {
    'all': { label: 'Tất cả', count: 4 },
    'draft': { label: 'Bản nháp', bg: 'bg-gray-100', text: 'text-gray-700', icon: FileEdit, count: 1 },
    'pending': { label: 'Chờ duyệt', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, count: 1 },
    'published': { label: 'Đang xuất bản', bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, count: 1 },
    'rejected': { label: 'Bị từ chối', bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, count: 1 },
};

const CollaboratorArticlesPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredArticles = MOCK_ARTICLES.filter(article => {
        if (activeTab !== 'all' && article.status !== activeTab) return false;
        if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="animate-fadeIn pb-12">
            
            {/* Header section with Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f4c81]">Trạm quản lý Tin bài</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý và theo dõi trạng thái các bài viết cộng tác của bạn.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => navigate('/ca-nhan/tin-bai/tao-moi')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Plus size={18} /> Soạn bài mới
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Tổng bài viết', count: 12, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Lượt xem (tổng)', count: '14.5K', icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Chờ duyệt', count: 1, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { label: 'Đã đăng', count: 8, icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar & Tabs */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 sticky top-4 z-10 transition-all">
                <div className="flex overflow-x-auto hide-scrollbar gap-1 flex-1">
                    {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <button 
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                                activeTab === key 
                                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {config.label} <span className="ml-1 bg-white/50 px-1.5 py-0.5 rounded text-xs opacity-70">{config.count}</span>
                        </button>
                    ))}
                </div>
                
                <div className="relative shrink-0 w-full md:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm bài viết..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Article List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[13px] text-gray-500 font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Tên bài viết</th>
                                <th className="px-6 py-4 hidden sm:table-cell">Chuyên mục</th>
                                <th className="px-6 py-4">Cập nhật</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredArticles.map(article => {
                                const statusConfig = STATUS_CONFIG[article.status];
                                const StatusIcon = statusConfig.icon;
                                
                                return (
                                    <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-gray-900 text-[15px] mb-1 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                                                {article.title}
                                            </div>
                                            <div className="sm:hidden text-xs text-gray-500 mt-1">{article.category}</div>
                                            {article.status === 'rejected' && (
                                                <div className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded border border-red-100 line-clamp-2">
                                                    <strong>Lý do từ chối:</strong> {article.reason}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 hidden sm:table-cell">
                                            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{article.category}</span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            {article.date}
                                        </td>
                                        <td className="px-6 py-5 text-center whitespace-nowrap">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-transparent ${statusConfig.bg} ${statusConfig.text}`}>
                                                <StatusIcon size={14} /> {statusConfig.label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                {article.status === 'draft' && (
                                                    <button className="p-1.5 hover:text-green-600 hover:bg-green-50 rounded" title="Gửi duyệt">
                                                        <Send size={18} />
                                                    </button>
                                                )}
                                                {(article.status === 'draft' || article.status === 'rejected') && (
                                                    <button 
                                                        onClick={() => navigate(`/ca-nhan/tin-bai/${article.id}/sua`)}
                                                        className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded" 
                                                        title="Chỉnh sửa"
                                                    >
                                                        <FileEdit size={18} />
                                                    </button>
                                                )}
                                                {article.status === 'published' && (
                                                    <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded" title="Xem bài viết">
                                                        <Eye size={18} />
                                                    </button>
                                                )}
                                                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                                                <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {filteredArticles.length === 0 && (
                    <div className="text-center py-20 text-gray-500 bg-gray-50/50">
                        <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Không tìm thấy bài viết nào.</p>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default CollaboratorArticlesPage;

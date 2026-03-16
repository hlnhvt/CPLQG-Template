import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Clock, CheckCircle, XCircle, FileText, Send, MessageSquare, Trash2, Eye, FileEdit } from 'lucide-react';

const MOCK_TOPICS = [
    { id: 1, title: 'Hỏi về quy trình xử lý vi phạm hành chính trong lĩnh vực giao thông', forum: 'Giao thông vận tải', date: 'Vừa xong', status: 'draft', replies: 0 },
    { id: 2, title: 'Thủ tục đăng ký doanh nghiệp qua mạng gặp lỗi hệ thống', forum: 'Doanh nghiệp & Đầu tư', date: '14/03/2026', status: 'pending', replies: 0 },
    { id: 3, title: 'Kinh nghiệm nộp thuế TNCN cho freelancer', forum: 'Thuế & Phí', date: '10/03/2026', status: 'published', replies: 15 },
    { id: 4, title: 'Quy định mới về bảo hiểm y tế năm 2026', forum: 'Lao động & Bảo hiểm xã hội', date: '05/03/2026', status: 'rejected', replies: 0, reason: 'Chủ đề đã tồn tại trong diễn đàn, vui lòng tham gia bình luận tại chủ đề gốc.' }
];

const STATUS_CONFIG = {
    'all': { label: 'Tất cả', count: 4 },
    'draft': { label: 'Bản nháp', bg: 'bg-gray-100', text: 'text-gray-700', icon: FileEdit, count: 1 },
    'pending': { label: 'Chờ duyệt', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, count: 1 },
    'published': { label: 'Đã xuất bản', bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, count: 1 },
    'rejected': { label: 'Bị từ chối', bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, count: 1 },
};

const ForumTopicManagementPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // In a real app, retrieve from state/context/API if we just saved a draft
    // For now, we will merge any drafted topic stored in localStorage
    const [topics, setTopics] = useState(() => {
        let initialTopics = [...MOCK_TOPICS];
        try {
            const savedDraft = localStorage.getItem('newForumDraft');
            if (savedDraft) {
                const parsed = JSON.parse(savedDraft);
                initialTopics.unshift(parsed);
                // Clean up
                localStorage.removeItem('newForumDraft');
            }
        } catch(e) {}
        return initialTopics;
    });

    const filteredTopics = topics.filter(topic => {
        if (activeTab !== 'all' && topic.status !== activeTab) return false;
        if (searchTerm && !topic.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="animate-fadeIn pb-12">
            
            {/* Header section with Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f4c81]">Trạm quản lý chủ đề diễn đàn</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý và theo dõi trạng thái các chủ đề bạn đã tạo trên diễn đàn.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => navigate('/dien-dan/tao-moi')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Plus size={18} /> Tạo chủ đề mới
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Tổng chủ đề', count: topics.length, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Tổng phản hồi', count: 15, icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Chờ duyệt', count: topics.filter(t => t.status === 'pending').length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { label: 'Đã xuất bản', count: topics.filter(t => t.status === 'published').length, icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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
                            {config.label} <span className="ml-1 bg-white/50 px-1.5 py-0.5 rounded text-xs opacity-70">
                                {key === 'all' ? topics.length : topics.filter(t => t.status === key).length}
                            </span>
                        </button>
                    ))}
                </div>
                
                <div className="relative shrink-0 w-full md:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm chủ đề..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Topic List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[13px] text-gray-500 font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Tên chủ đề</th>
                                <th className="px-6 py-4 hidden md:table-cell">Diễn đàn</th>
                                <th className="px-6 py-4">Cập nhật</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTopics.map(topic => {
                                const statusConfig = STATUS_CONFIG[topic.status];
                                const StatusIcon = statusConfig.icon;
                                
                                return (
                                    <tr key={topic.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-gray-900 text-[15px] mb-1 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                                                {topic.title}
                                            </div>
                                            <div className="md:hidden text-xs text-gray-500 mt-1">{topic.forum}</div>
                                            {topic.status === 'rejected' && (
                                                <div className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded border border-red-100 line-clamp-2">
                                                    <strong>Lý do từ chối:</strong> {topic.reason}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 hidden md:table-cell">
                                            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{topic.forum}</span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            {topic.date}
                                        </td>
                                        <td className="px-6 py-5 text-center whitespace-nowrap">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-transparent ${statusConfig.bg} ${statusConfig.text}`}>
                                                <StatusIcon size={14} /> {statusConfig.label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                {topic.status === 'draft' && (
                                                    <button className="p-1.5 hover:text-green-600 hover:bg-green-50 rounded" title="Đăng bài">
                                                        <Send size={18} />
                                                    </button>
                                                )}
                                                {(topic.status === 'draft' || topic.status === 'rejected') && (
                                                    <button 
                                                        className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded" 
                                                        title="Chỉnh sửa"
                                                    >
                                                        <FileEdit size={18} />
                                                    </button>
                                                )}
                                                {topic.status === 'published' && (
                                                    <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded" title="Xem chủ đề">
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
                
                {filteredTopics.length === 0 && (
                    <div className="text-center py-20 text-gray-500 bg-gray-50/50">
                        <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Không tìm thấy chủ đề nào.</p>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default ForumTopicManagementPage;

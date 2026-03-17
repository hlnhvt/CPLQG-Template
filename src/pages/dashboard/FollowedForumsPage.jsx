import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MessageSquare, Clock, Eye, Trash2, Tag, Search, Filter } from 'lucide-react';

const MOCK_FOLLOWED_TOPICS = [
    {
        id: 1,
        title: "Quy định mới về vốn điều lệ công ty TNHH năm 2024",
        forum: "Luật Doanh nghiệp",
        author: "Nguyễn Văn A",
        lastActivity: "10 phút trước",
        views: 1250,
        replies: 12,
        isHot: true,
        tags: ["Vốn điều lệ", "Công ty TNHH"]
    },
    {
        id: 2,
        title: "Thủ tục đăng ký độc quyền nhãn hiệu quốc tế qua hệ thống Madrid",
        forum: "Sở hữu trí tuệ",
        author: "Luật sư Lê Văn C",
        lastActivity: "2 giờ trước",
        views: 840,
        replies: 5,
        isHot: false,
        tags: ["Nhãn hiệu", "Luật quốc tế"]
    },
    {
        id: 3,
        title: "Tranh chấp hợp đồng lao động khi công ty đơn phương chấm dứt",
        forum: "Luật Lao động",
        author: "Trần Thị B",
        lastActivity: "1 ngày trước",
        views: 3200,
        replies: 45,
        isHot: true,
        tags: ["Hợp đồng lao động", "Sa thải"]
    }
];

const MOCK_FOLLOWED_FORUMS = [
    {
        id: 'doanh-nghiep',
        title: "Luật Doanh nghiệp",
        description: "Thảo luận về thành lập, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp.",
        topicsCount: 1250,
        followersCount: 3500,
        newPosts: 12
    },
    {
        id: 'so-huu-tri-tue',
        title: "Sở hữu trí tuệ",
        description: "Bản quyền tác giả, nhãn hiệu, sáng chế, kiểu dáng công nghiệp và các vấn đề liên quan.",
        topicsCount: 840,
        followersCount: 2100,
        newPosts: 5
    },
    {
        id: 'lao-dong',
        title: "Luật Lao động",
        description: "Hợp đồng lao động, tiền lương, BHXH, BHYT, kỷ luật lao động và giải quyết tranh chấp.",
        topicsCount: 3200,
        followersCount: 8900,
        newPosts: 45
    }
];

const FollowedForumsPage = () => {
    const [activeTab, setActiveTab] = useState('topics'); // 'topics' or 'forums'
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f4c81]">Diễn đàn quan tâm</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý danh sách các chủ đề và khu vực diễn đàn mà bạn đang theo dõi</p>
                </div>
                <Link to="/dien-dan" className="flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    Khám phá diễn đàn
                </Link>
            </div>

            {/* Tabs & Filters Area (Match Collections style) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                {/* Tabs */}
                <div className="flex bg-gray-50 p-1 rounded-xl w-full sm:w-auto border border-gray-100">
                    <button
                        onClick={() => setActiveTab('topics')}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                            activeTab === 'topics'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Chủ đề ({MOCK_FOLLOWED_TOPICS.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('forums')}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                            activeTab === 'forums'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Diễn đàn ({MOCK_FOLLOWED_FORUMS.length})
                    </button>
                </div>

                <div className="relative flex-1 w-full sm:w-auto min-w-[250px] sm:max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div>

                {activeTab === 'topics' && (
                    <div className="space-y-4">
                        {MOCK_FOLLOWED_TOPICS.map((topic) => (
                            <div key={topic.id} className="group border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all bg-white relative overflow-hidden">
                                {/* Decorator line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                                {topic.forum}
                                            </span>
                                            {topic.isHot && (
                                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">
                                                    Nổi bật
                                                </span>
                                            )}
                                        </div>
                                        <Link to={`/dien-dan/bai-viet/${topic.id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                                            {topic.title}
                                        </Link>
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                                            <span className="text-gray-700 font-bold">{topic.author}</span>
                                            <span className="flex items-center gap-1"><Clock size={14}/> {topic.lastActivity}</span>
                                            <span className="flex items-center gap-1"><MessageSquare size={14}/> {topic.replies} bình luận</span>
                                            <span className="flex items-center gap-1"><Eye size={14}/> {topic.views} xem</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                                        <button className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors tooltip-unfollow" title="Hủy theo dõi">
                                            <Bookmark size={20} className="fill-current" />
                                        </button>
                                        <Link to={`/dien-dan/bai-viet/${topic.id}`} className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm rounded-lg transition-colors whitespace-nowrap">
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'forums' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_FOLLOWED_FORUMS.map((forum) => (
                            <div key={forum.id} className="border border-gray-100 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all bg-white flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                            <MessageSquare size={20} />
                                        </div>
                                        <Link to={`/dien-dan/chu-de/${forum.id}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
                                            {forum.title}
                                        </Link>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Hủy theo dõi">
                                        <Bookmark size={18} className="fill-current" />
                                    </button>
                                </div>
                                
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                                    {forum.description}
                                </p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">Chủ đề</span>
                                            <span className="text-gray-800 font-bold">{forum.topicsCount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">Quan tâm</span>
                                            <span className="text-gray-800 font-bold">{forum.followersCount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    {forum.newPosts > 0 && (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200">
                                            +{forum.newPosts} bài mới
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State Mock */}
                 {(activeTab === 'topics' && MOCK_FOLLOWED_TOPICS.length === 0) || (activeTab === 'forums' && MOCK_FOLLOWED_FORUMS.length === 0) ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bookmark size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Chưa có dữ liệu theo dõi</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Bạn chưa {activeTab === 'topics' ? 'theo dõi chủ đề nào' : 'quan tâm diễn đàn nào'}. Hãy khám phá cộng đồng và lưu lại những nội dung hữu ích nhé.
                        </p>
                        <Link to="/dien-dan" className="inline-flex px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                            Khám phá Diễn đàn
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default FollowedForumsPage;

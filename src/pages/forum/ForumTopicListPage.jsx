import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
    Home, ChevronRight, Search, Filter, Plus, 
    MessageSquare, Eye, ChevronDown, CheckCircle, 
    Clock, Tag, ArrowUpCircle
} from 'lucide-react';
import { MOCK_FORUMS, MOCK_TOPICS } from '../../data/mockForumData';

const ForumTopicListPage = () => {
    const { id } = useParams();
    const forum = MOCK_FORUMS.find(f => f.id === Number(id)) || MOCK_FORUMS[0]; // fallback
    
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

    // Generating some more mock topics to fill the list
    const moreMockTopics = [...MOCK_TOPICS];
    for(let i=3; i<=8; i++) {
        moreMockTopics.push({
            id: i,
            forumId: forum.id,
            title: `Câu hỏi tư vấn về thủ tục pháp lý mẫu số ${i} năm 2024`,
            author: { name: `Người dùng ${i}`, role: "Cộng đồng" },
            createdAt: `${i} ngày trước`,
            views: 100 * i,
            comments: 5 * i,
            votes: 10 * i,
            tags: forum.tags.slice(0, 2),
            status: i % 3 === 0 ? "closed" : "open",
            isHot: i === 3
        });
    }

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Header / Hero for specific forum */}
            <div className="bg-[#1e3a8a] text-white pt-8 pb-16 relative">
                <div className="absolute inset-0 bg-blue-900/50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
                        <Link to="/" className="hover:text-white transition-colors"><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan" className="hover:text-white transition-colors">Diễn đàn</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">{forum.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl bg-white/10 p-2 rounded-xl backdrop-blur-sm">{forum.icon}</span>
                                <h1 className="text-3xl md:text-4xl font-bold">{forum.title}</h1>
                            </div>
                            <p className="text-blue-100 text-lg mt-4">{forum.description}</p>
                            <div className="flex items-center gap-6 mt-6 text-sm font-medium text-blue-200">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} /> {forum.topicCount.toLocaleString()} chủ đề
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={16} /> {forum.memberCount.toLocaleString()} thành viên
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0 flex gap-3">
                            <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-lg backdrop-blur-sm transition-colors border border-white/20">
                                Theo dõi
                            </button>
                            <Link to="/dien-dan/tao-moi" className="bg-yellow-500 hover:bg-yellow-400 text-[#1e3a8a] font-bold px-6 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-colors">
                                <Plus size={18} /> Tạo chủ đề
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm whitespace-nowrap">
                                Tất cả
                            </button>
                            <button className="px-4 py-2 bg-white text-gray-600 hover:text-blue-600 border border-gray-200 text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                                Chưa giải quyết
                            </button>
                            <button className="px-4 py-2 bg-white text-gray-600 hover:text-blue-600 border border-gray-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap">
                                <CheckCircle size={14} className="text-green-500"/> Đã giải quyết
                            </button>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative flex-grow md:w-64">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm trong diễn đàn..." 
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"
                                />
                            </div>
                            <div className="relative shrink-0">
                                <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg pl-4 pr-10 py-2 outline-none focus:border-blue-400 cursor-pointer">
                                    <option>Mới nhất</option>
                                    <option>Nhiều bình luận</option>
                                    <option>Nhiều lượt xem</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Topic List */}
                    <div className="flex flex-col">
                        {/* Header Row (Desktop) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-6 lg:col-span-7">Chủ đề</div>
                            <div className="col-span-2 lg:col-span-1 text-center">Bình chọn</div>
                            <div className="col-span-2 text-center">Thống kê</div>
                            <div className="col-span-2 text-right">Bài mới nhất</div>
                        </div>

                        {/* Rows */}
                        {moreMockTopics.map((topic) => (
                            <div key={topic.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                                {/* Title & Meta */}
                                <div className="md:col-span-6 lg:col-span-7">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 shrink-0">
                                            {topic.status === 'closed' ? (
                                                <CheckCircle size={20} className="text-green-500" title="Đã giải quyết" />
                                            ) : (
                                                <MessageSquare size={20} className="text-blue-500" title="Đang thảo luận" />
                                            )}
                                        </div>
                                        <div>
                                            <Link to={`/dien-dan/bai-viet/${topic.id}`} className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                                {topic.isHot && <span className="inline-block bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded mr-2 align-middle">HOT</span>}
                                                {topic.title}
                                            </Link>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-2">
                                                <span className="flex items-center gap-1"><Tag size={12}/> {topic.tags[0]}</span>
                                                <span>Bởi <span className="font-semibold text-gray-700">{topic.author.name}</span></span>
                                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium">{topic.author.role}</span>
                                                <span className="flex items-center gap-1"><Clock size={12}/> {topic.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Votes */}
                                <div className="hidden md:flex md:col-span-2 lg:col-span-1 flex-col justify-center items-center">
                                    <div className="flex flex-col items-center bg-gray-50 rounded-lg px-3 py-1.5 min-w-[50px]">
                                        <ArrowUpCircle size={16} className="text-gray-400 mb-0.5" />
                                        <span className="font-bold text-gray-700">{topic.votes}</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="hidden md:flex md:col-span-2 flex-col justify-center items-center text-sm">
                                    <div className="text-gray-700 font-bold">{topic.comments} <span className="text-gray-400 font-normal text-xs">trả lời</span></div>
                                    <div className="text-gray-500 text-xs mt-0.5">{topic.views.toLocaleString()} lượt xem</div>
                                </div>

                                {/* Last Post */}
                                <div className="hidden md:flex md:col-span-2 flex-col justify-center items-end text-sm text-right">
                                    <span className="text-gray-500 text-xs mb-1">10 phút trước</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                                            L
                                        </div>
                                        <span className="font-medium text-gray-700 truncate max-w-[100px]">Luật sư L</span>
                                    </div>
                                </div>

                                {/* Mobile Stats Footer */}
                                <div className="flex md:hidden items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1"><ArrowUpCircle size={14} className="text-green-500"/> {topic.votes}</span>
                                        <span className="flex items-center gap-1"><MessageSquare size={14}/> {topic.comments}</span>
                                        <span className="flex items-center gap-1"><Eye size={14}/> {topic.views}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="p-4 bg-white border-t border-gray-100 flex justify-center">
                        <div className="flex gap-1">
                            <button className="px-3 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors" disabled>Trước</button>
                            <button className="px-3 py-1 rounded bg-blue-600 text-white font-medium shadow-sm">1</button>
                            <button className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors">2</button>
                            <button className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors">3</button>
                            <span className="px-2 py-1 text-gray-400">...</span>
                            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">Sau</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumTopicListPage;

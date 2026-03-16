import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageSquare, Users, Clock, Star, TrendingUp, Hash, ArrowRight, UserPlus, Check } from 'lucide-react';
import { MOCK_FORUMS } from '../../data/mockForumData';

const ForumListPage = () => {
    const [activeTab, setActiveTab] = useState('all'); // all, latest, hot, following
    const [searchQuery, setSearchQuery] = useState('');
    const [forums, setForums] = useState(MOCK_FORUMS);

    const tabs = [
        { id: 'all', label: 'Tất cả diễn đàn', icon: <Hash size={18} /> },
        { id: 'latest', label: 'Mới cập nhật', icon: <Clock size={18} /> },
        { id: 'hot', label: 'Sôi nổi nhất', icon: <TrendingUp size={18} /> },
        { id: 'following', label: 'Đang theo dõi', icon: <Star size={18} /> },
    ];

    const toggleFollow = (id) => {
        setForums(forums.map(f => f.id === id ? { ...f, isFollowing: !f.isFollowing } : f));
    };

    const filteredForums = forums.filter(f => {
        if (searchQuery && !f.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (activeTab === 'following' && !f.isFollowing) return false;
        return true;
    });

    // Mock sort just for UI demonstration
    if (activeTab === 'hot') {
        filteredForums.sort((a, b) => b.memberCount - a.memberCount);
    } else if (activeTab === 'latest') {
        // Assume default order is somewhat latest
    }

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-12 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Diễn đàn pháp luật</h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-medium">Nơi chia sẻ, thảo luận và giải đáp các vấn đề pháp lý cùng đội ngũ chuyên gia, luật sư và cộng đồng.</p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative flex shadow-2xl rounded-full bg-white/10 backdrop-blur-md p-1 border border-white/20">
                        <div className="flex-grow flex items-center bg-white rounded-full overflow-hidden px-4">
                            <Search size={20} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên hoặc chủ đề diễn đàn..."
                                className="w-full py-3 px-3 outline-none text-gray-700 bg-transparent font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-[#1e3a8a] font-bold px-8 py-3 rounded-full ml-2 transition-colors shrink-0 whitespace-nowrap">
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar - Navigation/Filters (Optional, could be used for categories) */}
                    <div className="w-full lg:w-1/4 hidden lg:block">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6">
                            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                <Filter size={20} className="text-blue-600" />
                                Theo chủ đề
                            </h3>
                            <ul className="space-y-2">
                                {['Tất cả', 'Luật Doanh nghiệp', 'Luật Dân sự', 'Luật Hình sự', 'Đất đai & BĐS', 'Sở hữu trí tuệ', 'Khác'].map((cat, idx) => (
                                    <li key={idx}>
                                        <button className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${idx === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg">
                                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MessageSquare size={24} className="text-white" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-2">Bạn có câu hỏi?</h4>
                                    <p className="text-sm text-blue-100 mb-4">Hãy tạo một chủ đề mới để cộng đồng giải đáp giúp bạn.</p>
                                    <Link to="/dien-dan/tao-moi" className="block w-full py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                        Đăng bài ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content List */}
                    <div className="w-full lg:w-3/4">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2 mb-6 flex flex-wrap gap-2 overflow-x-auto">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Stats Summary Mobile */}
                        <div className="flex lg:hidden justify-between items-center mb-6 px-2">
                            <span className="text-gray-500 font-medium">Hiển thị {filteredForums.length} kết quả</span>
                            <button className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-lg">
                                <Filter size={16} /> Lọc
                            </button>
                        </div>

                        {/* Forum Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredForums.map(forum => (
                                <div key={forum.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col h-full overflow-hidden">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative group-hover:shadow-md transition-shadow">
                                                <img src={forum.thumbnail} alt={forum.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <button
                                                onClick={() => toggleFollow(forum.id)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1 ${forum.isFollowing
                                                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                                    }`}
                                            >
                                                {forum.isFollowing ? (
                                                    <><Check size={14} /> Đang theo dõi</>
                                                ) : (
                                                    <><UserPlus size={14} /> Theo dõi</>
                                                )}
                                            </button>
                                        </div>

                                        <Link to={`/dien-dan/chu-de/${forum.id}`} className="block group-hover:text-blue-600 transition-colors">
                                            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{forum.title}</h2>
                                        </Link>

                                        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{forum.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {forum.tags.map((tag, idx) => (
                                                <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md border border-gray-100">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100 mt-auto">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <MessageSquare size={16} className="text-blue-500" />
                                                <span>{forum.topicCount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users size={16} className="text-indigo-500" />
                                                <span>{forum.memberCount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <Link to={`/dien-dan/chu-de/${forum.id}`} className="text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors group-hover:translate-x-1 duration-300">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {filteredForums.length === 0 && (
                                <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-lg font-medium">Không tìm thấy diễn đàn nào phù hợp.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForumListPage;

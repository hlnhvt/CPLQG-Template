import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageSquare, Users, Clock, Star, TrendingUp, Hash, ArrowRight, UserPlus, Check, ChevronLeft, ChevronRight, ThumbsUp, Eye, Bell, Lock } from 'lucide-react';
import { MOCK_FORUMS, MOCK_TOPICS } from '../../data/mockForumData';

const ForumCountdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, isPast: false });

    useEffect(() => {
        const update = () => {
            const diff = new Date(targetDate) - new Date();
            if (diff <= 0) {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0, isPast: true });
                return;
            }
            setTimeLeft({
                d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                m: Math.floor((diff / 1000 / 60) % 60),
                s: Math.floor((diff / 1000) % 60),
                isPast: false
            });
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if (timeLeft.isPast) return <div className="text-emerald-600 font-bold text-sm flex items-center gap-1 mt-4 mb-2"><Check size={16}/> Đã chính thức mở cửa!</div>;

    return (
        <div className="mt-4 mb-4 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            <div className="text-sm font-bold text-indigo-800 flex items-center gap-1.5"><Clock size={16}/> Sắp khai mở sau:</div>
            <div className="flex items-center gap-1.5">
                <div className="flex flex-col items-center bg-white px-2 py-1 rounded shadow-sm border border-indigo-100 min-w-[36px]">
                    <span className="text-sm font-bold text-indigo-700 leading-none">{timeLeft.d}</span>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase mt-0.5">Ngày</span>
                </div>
                <span className="text-indigo-300 font-bold">:</span>
                <div className="flex flex-col items-center bg-white px-2 py-1 rounded shadow-sm border border-indigo-100 min-w-[36px]">
                    <span className="text-sm font-bold text-indigo-700 leading-none">{timeLeft.h.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase mt-0.5">Giờ</span>
                </div>
                <span className="text-indigo-300 font-bold">:</span>
                <div className="flex flex-col items-center bg-white px-2 py-1 rounded shadow-sm border border-indigo-100 min-w-[36px]">
                    <span className="text-sm font-bold text-indigo-700 leading-none">{timeLeft.m.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase mt-0.5">Phút</span>
                </div>
                <span className="text-indigo-300 font-bold">:</span>
                <div className="flex flex-col items-center bg-white px-2 py-1 rounded shadow-sm border border-indigo-100 min-w-[36px]">
                    <span className="text-sm font-bold text-red-500 leading-none">{timeLeft.s.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase mt-0.5">Giây</span>
                </div>
            </div>
        </div>
    );
};

const ForumListPage = () => {
    const [activeTab, setActiveTab] = useState('hot'); // hot, all, latest, following
    const [searchQuery, setSearchQuery] = useState('');
    const [forums, setForums] = useState(MOCK_FORUMS);
    const [categoryFilter, setCategoryFilter] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const tabs = [
        { id: 'hot', label: 'Xu hướng', icon: <TrendingUp size={18} /> },
        { id: 'all', label: 'Tất cả diễn đàn', icon: '' },
        { id: 'latest', label: 'Mới cập nhật', icon: <Clock size={18} /> },
        { id: 'following', label: 'Đang theo dõi', icon: <Star size={18} /> },
    ];

    const toggleFollow = (id) => {
        setForums(forums.map(f => f.id === id ? { ...f, isFollowing: !f.isFollowing } : f));
    };

    const filteredForums = forums.filter(f => {
        if (searchQuery && !f.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (activeTab === 'following' && !f.isFollowing) return false;
        if (activeTab === 'hot' && !f.isHot) return false;
        if (categoryFilter !== 'Tất cả' && f.category !== categoryFilter) return false;
        return true;
    });

    const categories = ['Tất cả', ...new Set(forums.map(f => f.category || 'Các diễn đàn khác'))];

    // Reset pagination to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery, categoryFilter, itemsPerPage]);

    // Mock sort just for UI demonstration
    if (activeTab === 'hot') {
        filteredForums.sort((a, b) => b.memberCount - a.memberCount);
    } else if (activeTab === 'latest') {
        // Assume default order is somewhat latest
    }

    // Always pin 'Upcoming' forums to the top for visibility
    filteredForums.sort((a, b) => (b.isUpcoming ? 1 : 0) - (a.isUpcoming ? 1 : 0));

    // Pagination Logic
    const totalPages = Math.ceil(filteredForums.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedForums = filteredForums.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-12 pb-20 relative overflow-hidden">
                {/* Decorative background pattern */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: "url('/trong_dong_bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 80%'
                    }}
                ></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <img src="/logo.png" alt="Quốc huy" className="w-20 h-20 md:w-24 md:h-24 object-contain mb-4 drop-shadow-lg mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Diễn đàn pháp luật</h1>
                    <p className="text-lg text-blue-100 max-w-6xl mx-auto mb-5 font-medium">Nơi chia sẻ, thảo luận và giải đáp các vấn đề pháp lý cùng đội ngũ chuyên gia, luật sư và cộng đồng.</p>

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

                    {/* Left Sidebar - Navigation/Filters */}
                    <div className="w-full lg:w-1/4 hidden lg:block shrink-0">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6">
                            {/* Livestream Event Portal Banner */}
                            <Link to="/dien-dan/su-kien" className="group block mb-6">
                                <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden hover:shadow-xl transition-all flex flex-col justify-center">
                                    {/* Decorative BG */}
                                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                    <div className="absolute right-4 bottom-4 w-12 h-12 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-colors duration-500 pointer-events-none"></div>

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                                            <div className="relative">
                                                <span className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                                                    <span className="w-2 h-2 bg-white rounded-sm ml-0.5"></span>
                                                </span>
                                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 border-2 border-red-600 rounded-full animate-pulse"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-yellow-200 transition-colors">Buổi phát trực tuyến</h4>
                                            <p className="text-sm text-red-100 font-medium">Khám phá các buổi hội thảo, tọa đàm pháp lý chuyên sâu.</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                <Filter size={20} className="text-blue-600" />
                                Nhóm diễn đàn
                            </h3>
                            <ul className="space-y-2">
                                {categories.map((cat, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => setCategoryFilter(cat)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${categoryFilter === cat ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex flex-col gap-4">
                                {/* Create Topic Box */}
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg w-full">
                                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MessageSquare size={24} className="text-white" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-2">Bạn có thắc mắc?</h4>
                                    <p className="text-sm text-blue-100 mb-4">Hãy tạo một chủ đề mới để cộng đồng cùng tham gia bình luận và góp ý nhé.</p>
                                    <Link to="/dien-dan/tao-moi" className="block w-full py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                        Tạo chủ đề
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content List */}
                    <div className="w-full flex-grow lg:w-3/4">
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

                        {/* Forum Cards by Category */}
                        <div className="space-y-12">
                            {Object.entries(
                                paginatedForums.reduce((acc, forum) => {
                                    const cat = forum.category || 'Các diễn đàn khác';
                                    if (!acc[cat]) acc[cat] = [];
                                    acc[cat].push(forum);
                                    return acc;
                                }, {})
                            ).map(([category, forumsInCategory]) => (
                                <div key={category}>
                                    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-3">
                                        <span className="w-2 h-7 bg-yellow-500 rounded-full inline-block shrink-0"></span>
                                        {category}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {forumsInCategory.map(forum => {
                                            const isForumHot = activeTab === 'hot' && forum.isHot;
                                            return (
                                                <div key={forum.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border ${isForumHot ? 'border-emerald-400 border-2 bg-gradient-to-br from-emerald-50/50 to-teal-50/20 shadow-emerald-500/10 hover:shadow-emerald-500/30' : 'border-gray-100'} transition-all duration-300 group flex flex-col h-full overflow-hidden relative`}>
                                                    <div className="p-6 flex-grow">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative group-hover:shadow-md transition-shadow">
                                                                <img src={forum.thumbnail} alt={forum.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                                            </div>
                                                            <button
                                                                onClick={() => toggleFollow(forum.id)}
                                                                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1 ${forum.isFollowing
                                                                    ? (forum.isUpcoming ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-blue-50 text-blue-600 border-blue-200')
                                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                                                    }`}
                                                            >
                                                                {forum.isFollowing ? (
                                                                    <><Check size={14} /> {forum.isUpcoming ? 'Đã bật nhắc nhở' : 'Đang theo dõi'}</>
                                                                ) : (
                                                                    forum.isUpcoming ? <><Bell size={14} /> Nhận lời nhắc</> : <><UserPlus size={14} /> Theo dõi</>
                                                                )}
                                                            </button>
                                                        </div>

                                                        {forum.isUpcoming ? (
                                                            <div className="block transition-colors mb-2 cursor-not-allowed">
                                                                <h3 className="text-xl font-bold text-gray-800 flex flex-wrap items-center gap-2">
                                                                    <Lock size={18} className="text-gray-400" />
                                                                    {forum.title}
                                                                </h3>
                                                            </div>
                                                        ) : (
                                                            <Link to={`/dien-dan/chu-de/${forum.id}`} className="block group-hover:text-blue-600 transition-colors mb-2">
                                                                <h3 className="text-xl font-bold text-gray-800 flex flex-wrap items-center gap-2">
                                                                    {forum.title}
                                                                    {isForumHot && (
                                                                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 shrink-0">
                                                                            <TrendingUp size={10} /> Nổi bật
                                                                        </span>
                                                                    )}
                                                                </h3>
                                                            </Link>
                                                        )}

                                                        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{forum.description}</p>

                                                        {forum.isUpcoming ? (
                                                            <ForumCountdown targetDate={forum.openingDate} />
                                                        ) : (
                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {forum.tags.map((tag, idx) => (
                                                                    <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md border border-gray-100">
                                                                        #{tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {isForumHot && (
                                                            <div className="mt-6 pt-5 border-t border-emerald-200/60">
                                                                <h4 className="text-xs font-bold text-emerald-700 uppercase mb-3 flex items-center gap-1.5">
                                                                    <TrendingUp size={14} className="text-emerald-500" /> Chủ đề đang được quan tâm
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    {(forum.id === 1 ? MOCK_TOPICS.filter(t => t.isHot).slice(0, 2) : [
                                                                        { id: forum.id + 100, title: `Bàn luận về điểm mới liên quan tới ${forum.title.replace('Thảo luận ', '').replace('Hỏi đáp ', '')}` },
                                                                        { id: forum.id + 200, title: `Tổng hợp kinh nghiệm và giải đáp thắc mắc thường gặp nhất nửa đầu tuần` }
                                                                    ]).map((topic, i) => (
                                                                        <Link key={i} to={`/dien-dan/chu-de/${forum.id}`} className="block group/topic">
                                                                            <div className="flex items-start gap-2">
                                                                                <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                                                                                <div>
                                                                                    <div className="text-sm font-medium text-gray-800 line-clamp-2 group-hover/topic:text-blue-600 transition-colors drop-shadow-sm mb-1.5">
                                                                                        {topic.title}
                                                                                    </div>
                                                                                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                                                                                        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors" title="Lượt thích"><ThumbsUp size={12} /> {topic.votes || Math.floor(Math.random() * 500) + 50}</span>
                                                                                        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors" title="Bình luận"><MessageSquare size={12} /> {topic.comments || Math.floor(Math.random() * 100) + 10}</span>
                                                                                        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors" title="Lượt xem"><Eye size={12} /> {topic.views || Math.floor(Math.random() * 3000) + 500}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
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
                                                        {forum.isUpcoming ? (
                                                            <div className="text-gray-400 p-2 rounded-full cursor-not-allowed">
                                                                <Lock size={18} />
                                                            </div>
                                                        ) : (
                                                            <Link to={`/dien-dan/chu-de/${forum.id}`} className="text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors group-hover:translate-x-1 duration-300">
                                                                <ArrowRight size={18} />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            {paginatedForums.length === 0 && (
                                <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-lg font-medium">Không tìm thấy diễn đàn nào phù hợp.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination with items per page selector */}
                        {filteredForums.length > 0 && (
                            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                    <span>Hiển thị</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                        className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors cursor-pointer"
                                    >
                                        <option value={4}>4 bản ghi / trang</option>
                                        <option value={6}>6 bản ghi / trang</option>
                                        <option value={10}>10 bản ghi / trang</option>
                                        <option value={20}>20 bản ghi / trang</option>
                                        <option value={50}>50 bản ghi / trang</option>
                                    </select>
                                    <span>tổng số {filteredForums.length} bản ghi</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <div className="flex items-center px-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Trang <span className="font-bold text-blue-600 mx-1">{currentPage}</span> / {totalPages}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForumListPage;

import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    Home, ChevronRight, Search, Filter, Plus,
    MessageSquare, Eye, ChevronDown, CheckCircle,
    Clock, Tag, ArrowUpCircle, Users, FileText, ClipboardList, Award, UserPlus
} from 'lucide-react';
import { MOCK_FORUMS, MOCK_TOPICS } from '../../data/mockForumData';
import { useAuth } from '../../contexts/AuthContext';
import LivestreamRegistrationModal from '../../components/LivestreamRegistrationModal';

const ForumTopicListPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const forum = MOCK_FORUMS.find(f => f.id === Number(id)) || MOCK_FORUMS[0]; // fallback

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [isFollowing, setIsFollowing] = useState(false);
    const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    // Registration State
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationModalState, setRegistrationModalState] = useState({
        isOpen: false,
        eventTitle: `Đăng ký tham gia diễn đàn: ${forum.title}`
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Generating some more mock topics to fill the list
    const moreMockTopics = useMemo(() => {
        const topics = [...MOCK_TOPICS];
        for (let i = 3; i <= 15; i++) {
            topics.push({
                id: i,
                forumId: forum.id,
                title: `Câu hỏi tư vấn về thủ tục pháp lý mẫu số ${i} năm 2024`,
                author: { name: `Người dùng ${i}`, role: "Cộng đồng" },
                createdAt: `${i} ngày trước`,
                views: 100 * i,
                comments: i % 2 === 0 ? 0 : 5 * i,
                votes: 10 * i,
                tags: forum.tags.slice(0, 2),
                status: i % 3 === 0 ? "closed" : "open",
                isHot: i === 3,
                timestamp: new Date().getTime() - i * 86400000 // mock real date for sorting
            });
        }
        return topics;
    }, [forum]);

    const filteredAndSortedTopics = useMemo(() => {
        let result = [...moreMockTopics];

        // Filter
        if (statusFilter !== 'all') {
            if (statusFilter === 'no-comment') result = result.filter(t => t.comments === 0);
            if (statusFilter === 'has-comment') result = result.filter(t => t.comments > 0);
        }

        // Sort
        if (sortOrder === 'newest') result.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        else if (sortOrder === 'votes') result.sort((a, b) => b.votes - a.votes);
        else if (sortOrder === 'comments') result.sort((a, b) => b.comments - a.comments);

        return result;
    }, [moreMockTopics, statusFilter, sortOrder]);

    // Reset pagination to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, sortOrder, itemsPerPage]);

    const totalPages = Math.ceil(filteredAndSortedTopics.length / itemsPerPage) || 1;
    const paginatedTopics = filteredAndSortedTopics.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFollowClick = () => {
        setIsFollowing(true);
    };

    const confirmUnfollow = () => {
        setIsFollowing(false);
        setShowUnfollowConfirm(false);
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Header / Hero for specific forum */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] pt-8 pb-12 relative border-b border-blue-700/30 z-30 shadow-lg">
                {/* Decorative background pattern */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay overflow-hidden"
                    style={{
                        backgroundImage: "url('/trong_dong_bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 80%'
                    }}
                ></div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Avatar LD */}
                        <div className="w-24 h-24 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg shrink-0 uppercase">
                            {forum.title.split(' ').slice(0, 2).map(w => w[0]).join('')}
                        </div>
                        <div className="flex-1">
                            <div className="text-gray-300 font-bold text-xs tracking-wider uppercase mb-1">Diễn đàn</div>
                            <h1 className="text-3xl font-bold text-white mb-1">{forum.title}</h1>
                            <p className="text-gray-300 font-medium text-sm mb-4">136,792 chủ đề</p>

                            <p className="text-gray-200 text-sm leading-relaxed mb-6 max-w-4xl">
                                {forum.description || "Các quy định về thành lập, tổ chức quản lý, hoạt động và giải thể doanh nghiệp. Nền tảng điện toán đám mây để xây dựng, triển khai và quản lý ứng dụng và dịch vụ thông qua mạng lưới các trung tâm dữ liệu do Nhà nước quản lý."}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 relative">
                                {/* {!user ? (
                                    <button
                                        onClick={() => navigate('/dang-nhap')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors text-sm"
                                    >
                                        Đăng nhập để theo dõi
                                    </button>
                                ) : !isFollowing ? (
                                    <button
                                        onClick={handleFollowClick}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm"
                                    >
                                        <CheckCircle size={18} /> Theo dõi diễn đàn
                                    </button>
                                ) : (
                                    <div className="relative z-50">
                                        <div className="flex items-center">
                                            <button
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-l-lg shadow-sm transition-colors flex items-center gap-2 text-sm border-r border-emerald-600"
                                            >
                                                <CheckCircle size={18} /> Đang theo dõi
                                            </button>
                                            <button
                                                onClick={() => setShowUnfollowConfirm(!showUnfollowConfirm)}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-r-lg shadow-sm transition-colors text-sm"
                                            >
                                                <ChevronDown size={18} />
                                            </button>
                                        </div>

                                        {showUnfollowConfirm && (
                                            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                                                <p className="text-sm text-gray-700 font-medium mb-4">Bạn có chắc chắn muốn hủy theo dõi diễn đàn này không?</p>
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => setShowUnfollowConfirm(false)} className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg">Không</button>
                                                    <button onClick={confirmUnfollow} className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg">Hủy theo dõi</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )} */}

                                {/* Registration Button */}
                                {user && (
                                    !isRegistered ? (
                                        <button
                                            onClick={() => setRegistrationModalState(prev => ({ ...prev, isOpen: true }))}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <UserPlus size={18} /> Đăng ký tham gia
                                        </button>
                                    ) : (
                                        <button className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm cursor-default">
                                            <CheckCircle size={18} /> Đã đăng ký tham gia
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 lg:px-8 mt-8 max-w-8xl relative z-20">
                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Left Sidebar (Filters) */}
                    <div className="w-full xl:w-1/4 shrink-0 space-y-6">
                        <Link to="/dien-dan/tao-moi" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
                            Tạo chủ đề
                        </Link>

                        <div className="bg-transparent lg:bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 lg:p-5">
                            <h3 className="font-bold text-gray-900 mb-6 text-lg hidden lg:block">Bộ lọc</h3>

                            <div className="mb-4">
                                <h4 className="font-bold text-gray-700 text-sm mb-3">Nội dung</h4>
                                <div className="space-y-4">
                                    {[
                                        { id: 'all', label: 'Tất cả chủ đề', count: moreMockTopics.length },
                                        { id: 'no-comment', label: 'Chưa có bình luận', count: moreMockTopics.filter(t => t.comments === 0).length },
                                        { id: 'has-comment', label: 'Có bình luận', count: moreMockTopics.filter(t => t.comments > 0).length },
                                        { id: 'no-contrib', label: 'Chưa có góp ý', count: '14' },
                                        { id: 'helpful-comment', label: 'Có bình luận hữu ích', count: '42' },
                                        { id: 'helpful-contrib', label: 'Có góp ý hữu ích', count: '72' },
                                    ].map(filter => (
                                        <label key={filter.id} onClick={() => { setStatusFilter(filter.id); setCurrentPage(1); }} className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${statusFilter === filter.id ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                                    {statusFilter === filter.id && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                                                </div>
                                                <span className={`text-sm ${statusFilter === filter.id ? 'font-medium text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{filter.label}</span>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusFilter === filter.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                {filter.count}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Thống kê cộng đồng Box */}
                        <div className="bg-[#0f62fe] rounded-xl shadow-md p-5 text-white">
                            <h3 className="font-bold text-[17px] mb-5">Thống kê cộng đồng</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[15px] font-medium border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-3">
                                        <Users size={18} className="opacity-90" />
                                        <span>Thành viên</span>
                                    </div>
                                    <span>24,567</span>
                                </div>
                                <div className="flex justify-between items-center text-[15px] font-medium border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-3">
                                        <FileText size={18} className="opacity-90" />
                                        <span>Chủ đề</span>
                                    </div>
                                    <span>12,345</span>
                                </div>
                                <div className="flex justify-between items-center text-[15px] font-medium border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare size={18} className="opacity-90" />
                                        <span>Bình luận</span>
                                    </div>
                                    <span>45,678</span>
                                </div>
                                <div className="flex justify-between items-center text-[15px] font-medium">
                                    <div className="flex items-center gap-3">
                                        <ClipboardList size={18} className="opacity-90" />
                                        <span>Góp ý, phản biện</span>
                                    </div>
                                    <span>9,676</span>
                                </div>
                            </div>
                        </div>

                        {/* Top người dùng đóng góp */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                    <Award className="text-amber-500" size={20} />
                                    Top người dùng đóng góp
                                </h3>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { name: 'Nguyễn Văn An', points: 1250, role: 'Cơ quan Đăng ký', avatarBg: 'bg-emerald-100 text-emerald-700' },
                                    { name: 'Trần Thị Bích', points: 980, role: 'Cơ quan Đăng ký', avatarBg: 'bg-rose-100 text-rose-700' },
                                    { name: 'Lê Hoàng Phong', points: 845, role: 'Thành viên', avatarBg: 'bg-indigo-100 text-indigo-700' },
                                    { name: 'Phạm Thanh Sơn', points: 720, role: 'Thành viên', avatarBg: 'bg-amber-100 text-amber-700' },
                                    { name: 'Vũ Minh Tuấn', points: 610, role: 'Thành viên', avatarBg: 'bg-cyan-100 text-cyan-700' }
                                ].map((u, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className="relative shrink-0">
                                            <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold border border-white shadow-sm ${u.avatarBg}`}>
                                                {u.name.split(' ').pop().charAt(0)}
                                            </div>
                                            {idx < 3 && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                                    {idx + 1}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-[14px] font-bold text-gray-900 truncate group-hover:text-blue-600 cursor-pointer transition-colors">{u.name}</p>
                                            <p className="text-[12px] text-gray-500 truncate mt-0.5">{u.role}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="text-[12px] font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2 py-1 rounded">
                                                {u.points}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Content */}
                    <div className="w-full xl:w-3/4 flex-grow">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
                            <h2 className="font-bold text-gray-800 text-sm sm:text-base">
                                {filteredAndSortedTopics.length} chủ đề với diễn đàn <span className="text-blue-600">{forum.title}</span>
                            </h2>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-sm text-gray-500">Sắp xếp theo:</span>
                                <div className="relative z-30">
                                    <button
                                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                                        className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
                                    >
                                        {sortOrder === 'newest' ? 'Mới nhất' : sortOrder === 'votes' ? 'Nhiều vote' : 'Nhiều trả lời'} <ChevronDown size={14} />
                                    </button>
                                    {isSortDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                                            <button onClick={() => { setSortOrder('newest'); setIsSortDropdownOpen(false); setCurrentPage(1); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">Mới nhất</button>
                                            <button onClick={() => { setSortOrder('votes'); setIsSortDropdownOpen(false); setCurrentPage(1); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">Nhiều vote</button>
                                            <button onClick={() => { setSortOrder('comments'); setIsSortDropdownOpen(false); setCurrentPage(1); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">Nhiều trả lời</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Topics List container */}
                        <div className="space-y-4">
                            {/* Rows */}
                            {paginatedTopics.length > 0 ? paginatedTopics.map((topic) => (
                                <div key={topic.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                                    {/* Left Stats */}
                                    <div className="flex md:flex-col gap-6 md:gap-3 shrink-0 md:w-20 items-center md:items-center justify-start md:justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-0 md:pr-2">
                                        <div className="text-center">
                                            <span className="block font-bold text-gray-900 text-lg leading-none">{topic.comments}</span>
                                            <span className="text-[11px] text-gray-500 font-medium mt-1 block">bình luận</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-gray-900 text-lg leading-none">{Math.floor(topic.comments / 2)}</span>
                                            <span className="text-[11px] text-gray-500 font-medium mt-1 block">Góp ý</span>
                                        </div>
                                    </div>

                                    {/* Middle Content */}
                                    <div className="flex-grow">
                                        <Link to={`/dien-dan/bai-viet/${topic.id}`} className="text-[17px] leading-snug font-bold text-blue-600 hover:underline mb-2 block line-clamp-2">
                                            {topic.title}
                                        </Link>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                            {topic.id % 2 === 0
                                                ? "Cho em hỏi hiện nay muốn thành lập công ty TNHH một thành viên thì tổng chi phí khoảng bao nhiêu ạ? Bao gồm cả lệ phí nhà nước và các chi phí dịch vụ khác nếu có. Em cảm ơn!"
                                                : "Tôi đang có ý định thành lập một công ty TNHH theo Luật Doanh nghiệp 2020. Tuy nhiên, tôi chưa rõ về quy trình và hồ sơ cần thiết để xin cấp Giấy chứng nhận đăng ký doanh nghiệp. Cụ thể tôi muốn biết: Hồ sơ cần chuẩn bị những gì?"}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {topic.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-gray-100 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                                                    {tag}
                                                </span>
                                            ))}
                                            {topic.id % 2 === 0 && (
                                                <span className="bg-gray-100 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                                                    Chi phí thành lập
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right User */}
                                    <div className="shrink-0 md:w-64 flex flex-col gap-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                        {/* Author */}
                                        <div className="flex gap-3 items-start">
                                            <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 ${topic.id % 3 === 0 ? 'bg-blue-600' : 'bg-indigo-600'}`}>
                                                {topic.author.name.split(' ').pop().charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[13px] text-gray-900 leading-none mb-1">{topic.author.name}</span>
                                                <div className="text-[11px] text-gray-500 mb-0.5">
                                                    {topic.id * 5} • Thành viên mới
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    đã tạo vào {topic.id % 2 === 0 ? "26/01/2026 4:30 PM" : "25/01/2026 3:26 PM"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Replier (Mocking for some) */}
                                        {topic.id % 2 !== 0 && (
                                            <div className="flex gap-3 items-start">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                                    SD
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[13px] text-gray-900 leading-none mb-1">Phạm Minh Khuê</span>
                                                    <div className="text-[11px] text-gray-500 mb-0.5 max-w-[160px] truncate" title="19,960 • Chuyên gia tư pháp • Moderator">
                                                        19,960 • Chuyên gia tư pháp • Moderator
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">
                                                        đã bình luận vào 27/01/2026 3:17 PM
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 bg-white rounded-xl border border-gray-200 text-gray-500">
                                    Không có chủ đề nào phù hợp.
                                </div>
                            )}
                        </div>

                        {/* Pagination Component */}
                        {filteredAndSortedTopics.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-200 gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                    <span>Hiển thị</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                        className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors cursor-pointer"
                                    >
                                        <option value={5}>5 bản ghi / trang</option>
                                        <option value={10}>10 bản ghi / trang</option>
                                        <option value={20}>20 bản ghi / trang</option>
                                        <option value={50}>50 bản ghi / trang</option>
                                    </select>
                                    <span>tổng số {filteredAndSortedTopics.length} bản ghi</span>
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >Trước</button>

                                        {Array.from({ length: totalPages }).map((_, idx) => {
                                            const page = idx + 1;
                                            // Simple pagination displaying up to 5 surrounding pages
                                            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center transition-colors ${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                return <span key={page} className="text-gray-400">...</span>;
                                            }
                                            return null;
                                        })}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >Sau</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            <LivestreamRegistrationModal
                isOpen={registrationModalState.isOpen}
                onClose={() => setRegistrationModalState(prev => ({ ...prev, isOpen: false }))}
                onRegister={() => setIsRegistered(true)}
                eventTitle={registrationModalState.eventTitle}
            />
        </div>
    );
};

export default ForumTopicListPage;

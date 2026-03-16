import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Home, ChevronRight, MessageSquare, Eye, Clock,
    UserPlus, Heart, Share2, AlertTriangle, Paperclip,
    ArrowUpCircle, ArrowDownCircle, CheckCircle, Plus,
    MoreHorizontal, Check, Tag
} from 'lucide-react';

const MOCK_ARTICLE = {
    title: "Quy định mới về vốn điều lệ công ty TNHH năm 2024",
    content: `
        <p>Chào mọi người,</p>
        <p>Tôi đang tìm hiểu về các quy định hiện hành liên quan đến việc góp vốn điều lệ cho công ty TNHH Hai thành viên trở lên. Theo những gì tôi đọc được trong Luật Doanh nghiệp 2020, có vẻ như quy định về thời hạn góp vốn và xử lý vốn chưa góp đủ có một số điểm cần lưu ý.</p>
        <p>Cụ thể, Điều 47 quy định thời hạn góp vốn là 90 ngày kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp. Tuy nhiên, nếu sau 90 ngày mà một thành viên chưa góp đủ phần vốn đã cam kết thì công ty phải đăng ký thay đổi vốn điều lệ trong thời hạn 30 ngày tiếp theo.</p>
        <p>Câu hỏi của tôi là:</p>
        <ol>
            <li>Nếu trong thời gian chờ thay đổi vốn điều lệ, công ty có phát sinh nghĩa vụ tài chính thì trách nhiệm của thành viên chưa góp đủ sẽ được tính theo số vốn đã góp hay số vốn đã cam kết?</li>
            <li>Có trường hợp nào được phép gia hạn thời gian góp vốn không?</li>
        </ol>
        <p>Mong nhận được sự giải đáp từ các Luật sư và chuyên gia trên diễn đàn.</p>
    `,
    author: {
        name: "Nguyễn Văn A",
        role: "Thành viên",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        joinDate: "07/02/2022",
        points: 43,
        messages: 141,
        reactions: 113,
        workplace: "Công ty TNHH ABC"
    },
    createdAt: "10/03/2024 14:30",
    tags: ["Luật Doanh nghiệp", "Vốn điều lệ", "Công ty TNHH"],
    votes: 45,
    views: 1250,
    replies: 12,
    contributions: 3,
    isFollowing: false,
    isHot: true
};

const MOCK_COMMENTER = {
    name: "Luật sư Lê Văn C",
    role: "Luật sư",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
    joinDate: "15/05/2021",
    points: 850,
    messages: 342,
    reactions: 1205,
    workplace: "Đoàn Luật sư Hà Nội"
};

const MOCK_CONTRIBUTIONS = [
    {
        id: 1,
        title: "Phân tích bất cập trong việc xử lý vốn cam kết nhưng chưa góp đủ",
        summary: "Bài phân tích đi sâu vào các khó khăn thực tế khi áp dụng Điều 47 Luật Doanh nghiệp 2020 trong việc xử lý tài sản và quyền lợi của các thành viên chưa góp đủ vốn...",
        author: {
            name: "Trần Thị B",
            role: "Chuyên gia",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
            workplace: "Viện Nghiên cứu Lập pháp"
        },
        createdAt: "11/03/2024 09:15",
        upvotes: 124,
        comments: 16,
        type: "Góp ý"
    },
    {
        id: 2,
        title: "Góc nhìn khác về trách nhiệm tài chính của cổ đông/thành viên sáng lập",
        summary: "Theo quan điểm của tôi, việc ràng buộc trách nhiệm dựa trên vốn cam kết là cần thiết để bảo vệ quyền lợi của chủ nợ và các đối tác của doanh nghiệp...",
        author: {
            name: "Lê Hữu D",
            role: "Tiến sĩ Luật",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
            workplace: "Đại học Luật TP.HCM"
        },
        createdAt: "12/03/2024 14:20",
        upvotes: 89,
        comments: 32,
        type: "Phản biện"
    }
];

const UserProfilePopover = ({ user, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block" onMouseLeave={() => setIsOpen(false)}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-block">
                {children}
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold shadow-md shrink-0 overflow-hidden border border-gray-200">
                            {user.avatar.includes('http') ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user.avatar}
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-blue-900">{user.name}</h4>
                            <p className="text-sm font-medium text-gray-700">{user.role}</p>
                            {user.workplace && <p className="text-xs text-gray-500 mt-0.5">{user.workplace}</p>}
                            <p className="text-xs text-gray-400 mt-1">Đã tham gia: {user.joinDate || "01/01/2024"}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-between text-center border-b border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Bài viết</p>
                            <p className="font-bold text-gray-800">{user.messages || 0}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Điểm uy tín</p>
                            <p className="font-bold text-gray-800">{user.points || 0}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Tương tác</p>
                            <p className="font-bold text-gray-800">{user.reactions || 0}</p>
                        </div>
                    </div>
                    <div className="p-3 flex justify-between gap-2 bg-white">
                        <button className="flex-1 py-1.5 px-3 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Theo dõi</button>
                        <button className="flex-1 py-1.5 px-3 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Bỏ qua</button>
                        <button className="flex-1 py-1.5 px-3 bg-blue-600 border border-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 transition-colors shrink-0">Nhắn tin</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const TopicDetailPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('comments');
    const [topic, setTopic] = useState(MOCK_ARTICLE);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-blue-600"><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan" className="hover:text-blue-600">Diễn đàn</Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan/chu-de/1" className="hover:text-blue-600">Luật Doanh nghiệp</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-medium truncate max-w-xs">{topic.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content (Left, 70%) */}
                    <div className="w-full lg:w-8/12 xl:w-9/12">
                        {/* Topic Post */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            {/* Author Header */}
                            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <UserProfilePopover user={topic.author}>
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-blue-700 text-lg shadow-sm hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer overflow-hidden border border-gray-200">
                                            {topic.author.avatar.includes('http') ? <img src={topic.author.avatar} alt={topic.author.name} className="w-full h-full object-cover" /> : topic.author.avatar}
                                        </div>
                                    </UserProfilePopover>
                                    <div>
                                        <div className="flex flex-col">
                                            <UserProfilePopover user={topic.author}>
                                                <span className="font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer text-[15px]">{topic.author.name}</span>
                                            </UserProfilePopover>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                    <Check size={10} strokeWidth={3} /> {topic.author.role}
                                                </span>
                                                {topic.author.workplace && <span className="text-xs text-gray-500 font-medium whitespace-nowrap hidden sm:inline-block"> - {topic.author.workplace}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {topic.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-gray-400 hover:text-gray-600 p-2"><MoreHorizontal size={20} /></button>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6">
                                {topic.isHot && (
                                    <div className="flex items-center gap-1.5 text-green-600 bg-green-50 w-max px-3 py-1 rounded-full mb-3 border border-green-200 shadow-sm">
                                        <CheckCircle size={16} className="fill-white" />
                                        <span className="font-bold text-xs uppercase tracking-wide">Chủ đề nổi bật</span>
                                    </div>
                                )}
                                <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">{topic.title}</h1>

                                <div
                                    className="prose max-w-none text-gray-700 leading-relaxed mb-6"
                                    dangerouslySetInnerHTML={{ __html: topic.content }}
                                ></div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {topic.tags.map((tag, idx) => (
                                        <Link to="#" key={idx} className="flex items-center gap-1 bg-gray-50 text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                                            <Tag size={14} /> {tag}
                                        </Link>
                                    ))}
                                </div>

                                {/* Attachments (mock) */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition-colors max-w-sm">
                                        <div className="bg-red-50 text-red-500 p-2 rounded">
                                            <Paperclip size={20} />
                                        </div>
                                        <div className="overflow-hidden text-sm">
                                            <p className="font-bold text-gray-700 truncate">Tai_lieu_tham_khao_2024.pdf</p>
                                            <p className="text-gray-500 text-xs">2.4 MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Bar */}
                                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center bg-gray-100 rounded-full font-bold text-gray-700">
                                            <button className="p-2.5 rounded-l-full hover:bg-gray-200 text-gray-500 hover:text-green-600 transition-colors tooltip-upvote">
                                                <ArrowUpCircle size={20} />
                                            </button>
                                            <span className="px-2">{topic.votes}</span>
                                            <button className="p-2.5 rounded-r-full hover:bg-gray-200 text-gray-500 hover:text-red-500 transition-colors tooltip-downvote">
                                                <ArrowDownCircle size={20} />
                                            </button>
                                        </div>
                                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-full transition-colors hidden sm:flex">
                                            <Heart size={18} /> Lưu
                                        </button>
                                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-full transition-colors hidden sm:flex">
                                            <Share2 size={18} /> Chia sẻ
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 text-sm font-medium transition-colors">
                                        <AlertTriangle size={16} /> Báo cáo
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Contributions Area */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" id="contributions">
                            <div className="flex justify-between items-center border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-indigo-600" />
                                    Góp ý, phản biện ({topic.contributions})
                                </h2>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1">
                                    <Plus size={16} /> Thêm góp ý
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    {MOCK_CONTRIBUTIONS.map(contrib => (
                                        <div key={contrib.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                                            {/* decorative edge */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500"></div>

                                            <div className="flex justify-between items-start mb-3">
                                                <Link to="#" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors leading-snug line-clamp-2 pr-4">{contrib.title}</Link>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap ${contrib.type === 'Góp ý' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {contrib.type}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{contrib.summary}</p>

                                            <div className="flex flex-wrap gap-4 items-center justify-between text-xs border-t border-gray-100 pt-3">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-800 text-sm mb-0.5">{contrib.author.name}</span>
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">{contrib.author.role}</span>
                                                        {contrib.author.workplace && <span>- <span className="italic">{contrib.author.workplace}</span></span>}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-gray-500 font-medium">
                                                    <span className="flex items-center gap-1"><Clock size={14} className="text-gray-400" /> {contrib.createdAt}</span>
                                                    <span className="flex items-center gap-1"><ArrowUpCircle size={14} className="text-gray-400" /> {contrib.upvotes}</span>
                                                    <span className="flex items-center gap-1"><MessageSquare size={14} className="text-gray-400" /> {contrib.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Component for Contributions */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                    <span className="text-sm text-gray-500 font-medium">Trang 1 / 1</span>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium" disabled>Trước</button>
                                        <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm flex items-center justify-center">1</button>
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 text-sm font-medium cursor-not-allowed" disabled>Sau</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Area */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" id="comments">
                            <div className="flex border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <MessageSquare size={20} className="text-blue-600" />
                                    Bình luận ({topic.replies})
                                </h2>
                            </div>

                            <div className="p-6">
                                {/* Editor Input */}
                                <div className="flex gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                                        U
                                    </div>
                                    <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm">
                                        <textarea
                                            placeholder={"Viết bình luận của bạn..."}
                                            className="w-full p-4 outline-none resize-none text-sm text-gray-700 min-h-[100px]"
                                        ></textarea>
                                        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-t border-gray-200">
                                            <div className="flex gap-2 text-gray-400">
                                                <button className="hover:text-blue-500 transition-colors p-1"><Paperclip size={18} /></button>
                                                <button className="hover:text-blue-500 transition-colors p-1"><b className="font-serif">B</b></button>
                                                <button className="hover:text-blue-500 transition-colors p-1"><i className="font-serif">I</i></button>
                                            </div>
                                            <button className="font-bold px-6 py-2 rounded-lg text-white shadow-sm transition-colors bg-blue-600 hover:bg-blue-700">
                                                Đăng bình luận
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* List */}
                                <div className="space-y-6">
                                    {/* Mock Comment */}
                                    <div className="flex gap-4">
                                        <UserProfilePopover user={MOCK_COMMENTER}>
                                            <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-full border border-gray-200 overflow-hidden shadow-sm hover:ring-2 hover:ring-green-300 transition-all cursor-pointer">
                                                {MOCK_COMMENTER.avatar.includes('http') ? <img src={MOCK_COMMENTER.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="bg-green-100 font-bold text-green-700 w-full h-full flex items-center justify-center">{MOCK_COMMENTER.avatar}</div>}
                                            </div>
                                        </UserProfilePopover>
                                        <div className="flex-grow">
                                            <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 border border-gray-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex flex-col">
                                                        <UserProfilePopover user={MOCK_COMMENTER}>
                                                            <span className="font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">{MOCK_COMMENTER.name}</span>
                                                        </UserProfilePopover>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                                <Check size={10} strokeWidth={3} /> {MOCK_COMMENTER.role}
                                                            </span>
                                                            {MOCK_COMMENTER.workplace && <span className="text-xs text-gray-500 font-medium whitespace-nowrap hidden sm:inline-block"> - {MOCK_COMMENTER.workplace}</span>}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-400">2 giờ trước</span>
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed">
                                                    Chào bạn, theo quy định hiện hành thì nghĩa vụ tài chính vẫn được tính dựa trên số vốn đã cam kết góp cho đến khi hoàn tất thủ tục điều chỉnh thay đổi giấy phép. Bạn có thể tham khảo thêm tại khoản 4 Điều 47 Luật Doanh nghiệp 2020.
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 px-2 text-xs font-medium text-gray-500">
                                                <button className="hover:text-blue-600 flex items-center gap-1 transition-colors"><ArrowUpCircle size={14} className="text-gray-400" /> 12</button>
                                                <button className="hover:text-gray-800 transition-colors">Trả lời</button>
                                                <button className="hover:text-red-500 transition-colors">Báo cáo</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pagination Component for Comments */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                    <span className="text-sm text-gray-500 font-medium">Trang 1 / 3</span>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium" disabled>Trước</button>
                                        <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm flex items-center justify-center">1</button>
                                        <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-100 font-bold text-sm flex items-center justify-center transition-colors">2</button>
                                        <span className="text-gray-400">...</span>
                                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">Sau</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar (30%) */}
                    <div className="w-full lg:w-4/12 xl:w-3/12 space-y-6 hidden lg:block">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-colors flex items-center justify-center gap-2">
                            <Plus size={20} />
                            Tạo chủ đề mới
                        </button>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Thông tin chủ đề</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Người đăng</span>
                                    <Link className="font-semibold text-gray-800 hover:text-blue-600">{topic.author.name}</Link>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Lượt xem</span>
                                    <span className="font-semibold text-gray-800">{topic.views.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Bình luận cuối</span>
                                    <span className="font-semibold text-gray-800">10 phút trước</span>
                                </div>
                                <button className="w-full mt-2 py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                    <UserPlus size={18} /> Theo dõi chủ đề
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Góp ý, phản biện liên quan</h3>
                            <div className="space-y-4">
                                <div>
                                    <Link to="#" className="font-semibold text-sm text-gray-800 hover:text-blue-600 line-clamp-2 mb-1">
                                        Phân tích bất cập trong việc xử lý vốn cam kết nhưng chưa góp đủ
                                    </Link>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">Góp ý</span>
                                        <span><ArrowUpCircle size={12} className="inline" /> 124</span>
                                        <span><MessageSquare size={12} className="inline" /> 16</span>
                                    </div>
                                </div>
                                <div>
                                    <Link to="#" className="font-semibold text-sm text-gray-800 hover:text-blue-600 line-clamp-2 mb-1">
                                        Góc nhìn khác về trách nhiệm tài chính của cổ đông/thành viên sáng lập
                                    </Link>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-bold">Phản biện</span>
                                        <span><ArrowUpCircle size={12} className="inline" /> 89</span>
                                        <span><MessageSquare size={12} className="inline" /> 32</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="#" className="block text-center text-blue-600 text-sm font-bold mt-4 hover:underline">Xem thêm góp ý</Link>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-2xl shadow-lg p-5 text-white">
                            <h3 className="font-bold mb-4 opacity-90">Cộng đồng Diễn đàn</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-3xl font-bold">24.5k</p>
                                    <p className="text-xs text-blue-200 mt-1">Thành viên</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">12.3k</p>
                                    <p className="text-xs text-blue-200 mt-1">Chủ đề</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicDetailPage;

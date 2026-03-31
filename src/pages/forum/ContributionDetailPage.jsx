import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Home, ChevronRight, MessageSquare, Eye, Clock,
    UserPlus, Heart, Share2, AlertTriangle, Paperclip,
    ArrowUpCircle, ArrowDownCircle, CheckCircle, Plus,
    MoreHorizontal, Check, Tag, ChevronDown, List
} from 'lucide-react';

const MOCK_CONTRIBUTION = {
    title: "Phân tích bất cập trong việc xử lý vốn cam kết nhưng chưa góp đủ",
    type: "Góp ý",
    content: `
        <p>Thưa các chuyên gia và cộng đồng,</p>
        <p>Liên quan đến chủ đề về vốn điều lệ và thời hạn góp vốn hiện nay, tôi xin đưa ra một vài phân tích về sự bất cập trong thực tiễn áp dụng khoản 4 Điều 47 Luật Doanh nghiệp 2020.</p>
        <p>Quy định yêu cầu thành viên chưa góp đủ vốn cam kết vẫn phải chịu trách nhiệm tương ứng với phần vốn cam kết đối với các nghĩa vụ phát sinh trong thời gian trước khi đăng ký thay đổi vốn điều lệ. Về lý thuyết, quy định này bảo vệ quyền lợi của đối tác và chủ nợ. Tuy nhiên, trên thực tế lại phát sinh các vướng mắc sau:</p>
        <ol>
            <li><strong>Khó khăn trong việc xác minh tài sản:</strong> Khi xảy ra tranh chấp, việc buộc thành viên quỹ này xuất toán tài sản cá nhân để chịu trách nhiệm là rất khó khăn do thiếu cơ chế phong tỏa tài sản kịp thời.</li>
            <li><strong>Tính thanh khoản của doanh nghiệp:</strong> Doanh nghiệp có thể rơi vào tình trạng mất khả năng thanh toán kỹ thuật do vốn thực góp thấp hơn nhiều so với vốn điều lệ ghi nhận, gây rủi ro dây chuyền cho đối tác.</li>
        </ol>
        <p><strong>Kiến nghị:</strong> Cần có cơ chế cảnh báo sớm trên Cổng thông tin quốc gia về Đăng ký doanh nghiệp đối với các công ty đã quá thời hạn 90 ngày mà chưa hoàn tất thủ tục điều chỉnh vốn.</p>
    `,
    author: {
        name: "Trần Thị B",
        role: "Chuyên gia",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
        joinDate: "20/08/2021",
        points: 1250,
        messages: 560,
        reactions: 3200,
        workplace: "Viện Nghiên cứu Lập pháp"
    },
    createdAt: "11/03/2024 09:15",
    votes: 124,
    views: 850,
    replies: 16,
    isFollowing: false,
};

const MOCK_PARENT_TOPIC = {
    id: 1,
    title: "Quy định mới về vốn điều lệ công ty TNHH năm 2024"
};

const MOCK_SUB_CONTRIBUTIONS = [
    {
        id: 101,
        title: "Bổ sung: Kiến nghị về cơ chế phong tỏa tài sản tự động",
        summary: "Ngoài cơ chế cảnh báo sớm, cần có quy định về phong tỏa tài sản tự động khi phát hiện thành viên vi phạm thời hạn góp vốn để bảo vệ quyền lợi chủ nợ kịp thời...",
        author: {
            name: "Nguyễn Thị Hoa",
            role: "Luật sư",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
            workplace: "Đoàn Luật sư Hà Nội"
        },
        createdAt: "13/03/2024 10:30",
        upvotes: 47,
        comments: 8,
        type: "Góp ý"
    },
    {
        id: 102,
        title: "Phản biện: Cơ chế cảnh báo thụ động chưa đủ mạnh",
        summary: "Tôi cho rằng chỉ cảnh báo trên Cổng thông tin là chưa đủ. Cần thêm chế tài hành chính trực tiếp đối với người đại diện pháp luật của doanh nghiệp vi phạm...",
        author: {
            name: "PGS.TS Lê Minh Tuấn",
            role: "Tiến sĩ Luật",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            workplace: "Đại học Luật Hà Nội"
        },
        createdAt: "14/03/2024 09:00",
        upvotes: 62,
        comments: 14,
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
                        <Link
                            to={`/thanh-vien/${user.id || '1'}`}
                            className="flex-1 py-1.5 px-3 bg-[#1a3b8b] border border-[#1a3b8b] rounded text-sm font-bold text-white hover:bg-blue-800 transition-colors text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Xem hồ sơ
                        </Link>
                        <button className="flex-1 py-1.5 px-3 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Theo dõi</button>
                        <button className="flex-1 py-1.5 px-3 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Nhắn tin</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ContributionDetailPage = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState(MOCK_CONTRIBUTION);
    
    // Follow State
    const [isFollowing, setIsFollowing] = useState(false);
    const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing(true);
    };

    const confirmUnfollow = () => {
        setIsFollowing(false);
        setShowUnfollowConfirm(false);
    };

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
                        <Link to={`/dien-dan/bai-viet/${MOCK_PARENT_TOPIC.id}`} className="hover:text-blue-600 truncate max-w-xs">{MOCK_PARENT_TOPIC.title}</Link>
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
                                <div className="flex items-center gap-1.5 mb-3">
                                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${topic.type === 'Góp ý' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {topic.type}
                                    </span>
                                </div>
                                
                                <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">{topic.title}</h1>

                                <div
                                    className="prose max-w-none text-gray-700 leading-relaxed mb-6"
                                    dangerouslySetInnerHTML={{ __html: topic.content }}
                                ></div>

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

                        {/* Sub-Contributions Area */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" id="sub-contributions">
                            <div className="flex justify-between items-center border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-indigo-600" />
                                    Góp ý, phản biện ({MOCK_SUB_CONTRIBUTIONS.length})
                                </h2>
                                <Link
                                    to={`/dien-dan/chu-de/${MOCK_PARENT_TOPIC.id}/tao-gop-y`}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1"
                                >
                                    <Plus size={16} /> Tạo góp ý
                                </Link>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    {MOCK_SUB_CONTRIBUTIONS.map(contrib => (
                                        <div key={contrib.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                                            {/* decorative edge */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500"></div>

                                            <div className="flex justify-between items-start mb-3">
                                                <Link to={`/dien-dan/gop-y/${contrib.id}`} className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors leading-snug line-clamp-2 pr-4">{contrib.title}</Link>
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

                                {/* Pagination */}
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

                        {/* Comments Area for the Contribution */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6" id="comments">
                            <div className="flex border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <MessageSquare size={20} className="text-blue-600" />
                                    Bình luận về góp ý ({topic.replies})
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
                                            placeholder={"Viết ý kiến phản hồi..."}
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

                                {/* Mock Comment List */}
                                <div className="space-y-6">
                                     <div className="flex gap-4">
                                         <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-full border border-gray-200 overflow-hidden shadow-sm hover:ring-2 hover:ring-green-300 transition-all cursor-pointer bg-gray-100">
                                            A
                                         </div>
                                         <div className="flex-grow">
                                             <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 border border-gray-100">
                                                 <div className="flex justify-between items-start mb-2">
                                                     <div className="flex flex-col">
                                                         <span className="font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">Luật sư Nguyễn M</span>
                                                         <div className="flex items-center gap-1.5 mt-0.5">
                                                             <span className="text-xs text-gray-500 font-medium">Đoàn Luật sư TP.HCM</span>
                                                         </div>
                                                     </div>
                                                     <span className="text-xs text-gray-400">1 ngày trước</span>
                                                 </div>
                                                 <p className="text-gray-700 text-sm leading-relaxed">
                                                     Rất đồng tình với quan điểm của chuyên gia. Thực tế tôi đã giải quyết nhiều vụ án mà doanh nghiệp bị thiệt hại do thành viên trốn tránh trách nhiệm góp vốn dù quá hạn.
                                                 </p>
                                             </div>
                                             <div className="flex items-center gap-4 mt-2 px-2 text-xs font-medium text-gray-500">
                                                 <button className="hover:text-blue-600 flex items-center gap-1 transition-colors"><ArrowUpCircle size={14} className="text-gray-400" /> 8</button>
                                                 <button className="hover:text-gray-800 transition-colors">Trả lời</button>
                                             </div>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar (30%) */}
                    <div className="w-full lg:w-4/12 xl:w-3/12 space-y-6 hidden lg:block">
                        <Link to={`/dien-dan/bai-viet/${MOCK_PARENT_TOPIC.id}`} className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
                            <List size={20} />
                            Quay lại chủ đề chính
                        </Link>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Nội dung liên quan tới Chủ đề</h3>
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                <Link to={`/dien-dan/bai-viet/${MOCK_PARENT_TOPIC.id}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors block mb-2 leading-snug">
                                    {MOCK_PARENT_TOPIC.title}
                                </Link>
                                <p className="text-xs text-gray-500 mb-3">Tác giả: Nguyễn Văn A</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                                    <span>Đăng: 10/03/2024</span>
                                    <span><Eye size={12} className="inline mr-1" /> 1250 xem</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Thông tin bài {topic.type.toLowerCase()}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Người đăng</span>
                                    <span className="font-semibold text-gray-800">{topic.author.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Lượt xem</span>
                                    <span className="font-semibold text-gray-800">{topic.views.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Đánh giá</span>
                                    <span className="font-semibold text-green-600">+{topic.votes}</span>
                                </div>
                                {!isFollowing ? (
                                    <button onClick={handleFollowClick} className="w-full mt-2 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                                        <UserPlus size={18} /> Theo dõi bài viết
                                    </button>
                                ) : (
                                    <div className="relative w-full mt-2">
                                        <div className="flex w-full">
                                            <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-l-lg transition-colors flex items-center justify-center gap-2 border-r border-emerald-600">
                                                <CheckCircle size={18} /> Đang theo dõi
                                            </button>
                                            <button onClick={() => setShowUnfollowConfirm(!showUnfollowConfirm)} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-r-lg transition-colors flex items-center justify-center">
                                                <ChevronDown size={18} />
                                            </button>
                                        </div>
                                        {showUnfollowConfirm && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-full mr-2 w-72 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] border border-gray-100 p-4 z-[60]">
                                                <p className="text-sm text-gray-700 font-medium mb-4 text-left">Bạn có chắc chắn muốn hủy theo dõi bài viết này không?</p>
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => setShowUnfollowConfirm(false)} className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg">Không</button>
                                                    <button onClick={confirmUnfollow} className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg">Hủy theo dõi</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributionDetailPage;

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
        role: "Cộng đồng",
        avatar: "A"
    },
    createdAt: "10/03/2024 14:30",
    tags: ["Luật Doanh nghiệp", "Vốn điều lệ", "Công ty TNHH"],
    votes: 45,
    views: 1250,
    replies: 12,
    contributions: 3,
    isFollowing: false
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
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg shadow-sm">
                                        {topic.author.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800">{topic.author.name}</span>
                                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-medium">{topic.author.role}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Clock size={12}/> {topic.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-gray-400 hover:text-gray-600 p-2"><MoreHorizontal size={20}/></button>
                                </div>
                            </div>
                            
                            {/* Content Body */}
                            <div className="p-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">{topic.title}</h1>
                                
                                <div 
                                    className="prose max-w-none text-gray-700 leading-relaxed mb-6"
                                    dangerouslySetInnerHTML={{ __html: topic.content }}
                                ></div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {topic.tags.map((tag, idx) => (
                                        <Link to="#" key={idx} className="flex items-center gap-1 bg-gray-50 text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                                            <Tag size={14}/> {tag}
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

                        {/* Interactive Area (Comments vs Contributions) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" id="comments">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-100 bg-gray-50 px-2 pt-2 gap-2">
                                <button 
                                    className={`px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 ${
                                        activeTab === 'comments' ? 'bg-white text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-800'
                                    }`}
                                    onClick={() => setActiveTab('comments')}
                                >
                                    Bình luận ({topic.replies})
                                </button>
                                <button 
                                    className={`px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 flex items-center gap-2 ${
                                        activeTab === 'contributions' ? 'bg-white text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-800'
                                    }`}
                                    onClick={() => setActiveTab('contributions')}
                                >
                                    <CheckCircle size={16} className={activeTab==='contributions'?'text-indigo-600':''}/>
                                    Góp ý, phản biện ({topic.contributions})
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Editor Input */}
                                <div className="flex gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                                        U
                                    </div>
                                    <div className="flex-grow border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm">
                                        <textarea 
                                            placeholder={activeTab === 'comments' ? "Viết bình luận của bạn..." : "Viết góp ý chi tiết của bạn..."}
                                            className="w-full p-4 outline-none resize-none text-sm text-gray-700 min-h-[100px]"
                                        ></textarea>
                                        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-t border-gray-200">
                                            <div className="flex gap-2 text-gray-400">
                                                <button className="hover:text-blue-500 transition-colors p-1"><Paperclip size={18}/></button>
                                                <button className="hover:text-blue-500 transition-colors p-1"><b className="font-serif">B</b></button>
                                                <button className="hover:text-blue-500 transition-colors p-1"><i className="font-serif">I</i></button>
                                            </div>
                                            <button className={`font-bold px-6 py-2 rounded-lg text-white shadow-sm transition-colors ${
                                                activeTab === 'comments' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'
                                            }`}>
                                                Đăng {activeTab === 'comments' ? 'bình luận' : 'góp ý'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* List */}
                                <div className="space-y-6">
                                    {activeTab === 'comments' ? (
                                        <>
                                            {/* Mock Comment */}
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 shrink-0 shadow-sm border border-green-200">
                                                    L
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 border border-gray-100">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-gray-800">Luật sư Lê Văn C</span>
                                                                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                                    <Check size={10} strokeWidth={3}/> Luật sư
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-gray-400">2 giờ trước</span>
                                                        </div>
                                                        <p className="text-gray-700 text-sm leading-relaxed">
                                                            Chào bạn, theo quy định hiện hành thì nghĩa vụ tài chính vẫn được tính dựa trên số vốn đã cam kết góp cho đến khi hoàn tất thủ tục điều chỉnh thay đổi giấy phép. Bạn có thể tham khảo thêm tại khoản 4 Điều 47 Luật Doanh nghiệp 2020.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 px-2 text-xs font-medium text-gray-500">
                                                        <button className="hover:text-blue-600 flex items-center gap-1 transition-colors"><ArrowUpCircle size={14} className="text-gray-400"/> 12</button>
                                                        <button className="hover:text-gray-800 transition-colors">Trả lời</button>
                                                        <button className="hover:text-red-500 transition-colors">Báo cáo</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-gray-500 italic text-center py-8">Đây là khu vực hiển thị các bài viết phản biện, phân tích sâu có cấu trúc đầy đủ.</p>
                                        </>
                                    )}
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
                                        <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">Ủng hộ</span>
                                        <span><ArrowUpCircle size={12} className="inline"/> 124</span>
                                        <span><MessageSquare size={12} className="inline"/> 16</span>
                                    </div>
                                </div>
                                <div>
                                    <Link to="#" className="font-semibold text-sm text-gray-800 hover:text-blue-600 line-clamp-2 mb-1">
                                        Góc nhìn khác về trách nhiệm tài chính của cổ đông/thành viên sáng lập
                                    </Link>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-bold">Phản biện</span>
                                        <span><ArrowUpCircle size={12} className="inline"/> 89</span>
                                        <span><MessageSquare size={12} className="inline"/> 32</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="#" className="block text-center text-blue-600 text-sm font-bold mt-4 hover:underline">Xem thêm góp ý</Link>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-2xl shadow-lg p-5 text-white">
                            <h3 className="font-bold mb-4 opacity-90">Cộng đồng Diễn đàn</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-3xl font-extrabold">24.5k</p>
                                    <p className="text-xs text-blue-200 mt-1">Thành viên</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold">12.3k</p>
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

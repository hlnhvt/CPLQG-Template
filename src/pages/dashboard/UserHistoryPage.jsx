import React, { useState } from 'react';
import { Search, Heart, MessageSquare, Trash2, Edit3, MoreVertical, FileText, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_FAVORITES = [
    { id: 1, type: 'vanban', title: 'Luật Đất đai số 31/2024/QH15', date: 'Đã lưu: 15/03/2026', snippet: 'Được Quốc hội thông qua ngày 18 tháng 01 năm 2024.', url: '#' },
    { id: 2, type: 'tinbai', title: 'Quy định mới về bảo hiểm thất nghiệp từ 2026', date: 'Đã lưu: 12/03/2026', snippet: 'Mức hưởng trợ cấp thất nghiệp tăng đáng kể theo quy định mới.', url: '#' },
    { id: 3, type: 'tuvan', title: 'Thủ tục thành lập doanh nghiệp nhanh nhất 2026', date: 'Đã lưu: 10/03/2026', snippet: 'Hướng dẫn chi tiết bộ hồ sơ và quy trình trực tuyến trên Cổng DVC.', url: '#' },
    { id: 4, type: 'vanban', title: 'Nghị định 102/2024/NĐ-CP hướng dẫn Luật Đất đai', date: 'Đã lưu: 05/03/2026', snippet: 'Quy định chi tiết thi hành một số điều của Luật Đất đai mới.', url: '#' },
];

const MOCK_COMMENTS = [
    { id: 101, articleTitle: 'Dự thảo Nghị định thu phí đường bộ cao tốc', content: 'Tôi hoàn toàn đồng ý với dự thảo này. Tuy nhiên, mức phí cần được điều chỉnh phù hợp với từng vùng miền để đảm bảo công bằng.', status: 'published', date: '14/03/2026 10:30', url: '#' },
    { id: 102, articleTitle: 'Lấy ý kiến Luật BHXH (Sửa đổi)', content: 'Cần xem xét kỹ tuổi nghỉ hưu của người lao động làm việc trong môi trường độc hại, họ không thể đợi đến 62 tuổi.', status: 'pending', date: '12/03/2026 15:45', url: '#' },
    { id: 103, articleTitle: 'Báo cáo tiếp thu Luật Đất đai mới', content: 'Cảm ơn cơ quan soạn thảo đã lắng nghe và giải trình rất cặn kẽ các ý kiến của người dân ở kỳ trước.', status: 'published', date: '05/03/2026 09:12', url: '#' }
];

const UserHistoryPage = () => {
    const [activeTab, setActiveTab] = useState('favorites');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(MOCK_FAVORITES);
    const [comments, setComments] = useState(MOCK_COMMENTS);

    const handleRemoveFavorite = (id) => {
        setFavorites(favorites.filter(f => f.id !== id));
    };

    const handleDeleteComment = (id) => {
        setComments(comments.filter(c => c.id !== id));
    };

    return (
        <div className="animate-fadeIn pb-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Lịch sử hoạt động</h1>
                <p className="text-gray-500 text-sm mt-1">Quản lý bài viết đã ưu thích và bình luận của bạn trên Cổng.</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6">
                <div className="flex bg-gray-50 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('favorites')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'favorites' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <Heart size={16} className={activeTab === 'favorites' ? 'fill-blue-100' : ''} /> 
                        Nội dung đã Yêu thích <span className="hidden sm:inline-block ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">{favorites.length}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('comments')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'comments' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <MessageSquare size={16} className={activeTab === 'comments' ? 'fill-blue-100' : ''} /> 
                        Bình luận của tôi <span className="hidden sm:inline-block ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">{comments.length}</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
                
                {/* FAVORITES TAB */}
                {activeTab === 'favorites' && (
                    <div className="animate-fadeIn p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                            <div className="relative w-full sm:w-96">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Tìm trong danh sách yêu thích..." 
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                                    <option>Tất cả loại hình</option>
                                    <option>Văn bản pháp luật</option>
                                    <option>Tin bài</option>
                                    <option>Hỏi đáp & Tư vấn</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {favorites.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/10 transition-colors group">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                                        item.type === 'vanban' ? 'bg-blue-100 text-blue-600' : 
                                        item.type === 'tinbai' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link to={item.url} className="text-base font-bold text-gray-900 hover:text-blue-600 mb-1 line-clamp-2">
                                            {item.title}
                                        </Link>
                                        <p className="text-[13px] text-gray-500 line-clamp-2 mb-2">{item.snippet}</p>
                                        <div className="flex items-center gap-4 text-[12px] font-medium text-gray-400">
                                            <span>{item.date}</span>
                                            <span className="capitalize">{
                                                item.type === 'vanban' ? 'Văn bản PL' : 
                                                item.type === 'tinbai' ? 'Tin bài' : 'Hỏi đáp'
                                            }</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-start">
                                        <button 
                                            onClick={() => handleRemoveFavorite(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group-hover:bg-red-50"
                                            title="Bỏ yêu thích"
                                        >
                                            <Heart size={20} className="fill-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {favorites.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    <Heart size={48} className="mx-auto mb-4 text-gray-200" />
                                    <p>Bạn chưa lưu bài viết nào.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* COMMENTS TAB */}
                {activeTab === 'comments' && (
                    <div className="animate-fadeIn p-6">
                        <div className="space-y-6">
                            {comments.map(comment => (
                                <div key={comment.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all relative group">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                                        <div className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit flex items-center gap-1.5 ${
                                            comment.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }">
                                            {comment.status === 'published' ? (
                                                <><CheckCircle size={14}/> Đã công khai</>
                                            ) : (
                                                <><Clock size={14}/> Chờ kiểm duyệt</>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium">
                                            Đã gửi lúc: {comment.date}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-[15px] text-gray-800 relative">
                                        " {comment.content} "
                                        
                                        {/* Actions overlayed on hover */}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {comment.status === 'published' && (
                                                <button className="p-1.5 bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Sửa (trong vòng 24h)">
                                                    <Edit3 size={15} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="p-1.5 bg-gray-100 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Xóa bình luận"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50">
                                        <span className="text-gray-500 italic">Bình luận tại bài viết:</span>
                                        <Link to={comment.url} className="font-semibold text-[#0f4c81] hover:underline line-clamp-1 flex-1">
                                            {comment.articleTitle}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            
                            {comments.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    <MessageSquare size={48} className="mx-auto mb-4 text-gray-200" />
                                    <p>Bạn chưa có bình luận nào.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default UserHistoryPage;

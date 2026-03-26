import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
    Home, ChevronRight, Bold, Italic, Underline, 
    List, Image as ImageIcon, Link as LinkIcon, Paperclip, Check,
    AlertCircle, CheckCircle2, Eye, EyeOff
} from 'lucide-react';
import { MOCK_FORUMS } from '../../data/mockForumData';

const CreateTopicPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedForum, setSelectedForum] = useState('');
    const [title, setTitle] = useState(() => searchParams.get('title') || '');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    
    const [isPreview, setIsPreview] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveDraft = () => {
        const forumObj = MOCK_FORUMS.find(f => f.id === selectedForum);
        const draftData = {
            id: Date.now(),
            title: title || 'Chủ đề không tên',
            forum: forumObj ? forumObj.title : 'Chưa xác định',
            date: 'Vừa xong',
            status: 'draft',
            replies: 0
        };
        localStorage.setItem('newForumDraft', JSON.stringify(draftData));
        navigate('/ca-nhan/chu-de-dien-dan');
    };

    const handleConfirmPost = () => {
        // Save new topic to localStorage so TopicDetailPage can pick it up
        const existingRaw = localStorage.getItem('forumNewTopics');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newId = Date.now();
        const newTopic = {
            id: newId,
            title: title || 'Chủ đề không tên',
            content: content || '',
            forum: MOCK_FORUMS.find(f => f.id === selectedForum)?.title || 'Chưa xác định',
            author: { name: 'Nguyễn Anh Quân', role: 'Cán bộ', avatar: '/images/default_avatar.png', joinDate: '01/01/2024', points: 0, messages: 1, reactions: 0, workplace: 'Bộ Tư Pháp' },
            createdAt: new Date().toLocaleString('vi-VN'),
            tags: [],
            votes: 0,
            views: 1,
            replies: 0,
            contributions: 0,
            isHot: false,
        };
        localStorage.setItem('forumNewTopics', JSON.stringify([newTopic, ...existing]));
        setShowConfirm(false);
        setShowSuccess(true);
        // Store the new topic id to redirect after success
        window._latestForumTopicId = newId;
    };

    const handleFinishSuccess = () => {
        navigate(`/dien-dan/chu-de/${window._latestForumTopicId || 'new'}`);
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="bg-[#1e3a8a] text-white pt-6 pb-24 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-blue-200 mb-6 font-medium">
                        <Link to="/" className="hover:text-white transition-colors"><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan" className="hover:text-white transition-colors">Diễn đàn</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Tạo chủ đề mới</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold">Thêm Thảo luận / Chủ đề mới</h1>
                    <p className="text-blue-200 mt-2 text-lg">Chia sẻ ý kiến, thắc mắc hoặc kinh nghiệm của bạn với cộng đồng pháp luật.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    
                    {/* Form Fields / Preview */}
                    <div className="space-y-6">
                        
                        {/* Select Forum */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Chọn diễn đàn tham gia <span className="text-red-500">*</span>
                            </label>
                            {isPreview ? (
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    {MOCK_FORUMS.find(f => f.id === selectedForum)?.title || 'Chưa chọn'}
                                </div>
                            ) : (
                                <select 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-colors"
                                    value={selectedForum}
                                    onChange={(e) => setSelectedForum(e.target.value)}
                                >
                                    <option value="" disabled>-- Hãy chọn một diễn đàn phù hợp --</option>
                                    {MOCK_FORUMS.map(forum => (
                                        <option key={forum.id} value={forum.id}>{forum.title}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Tiêu đề chủ đề <span className="text-red-500">*</span>
                            </label>
                            {isPreview ? (
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-lg">
                                    {title || 'Chưa nhập tiêu đề'}
                                </div>
                            ) : (
                                <>
                                    <input 
                                        type="text" 
                                        placeholder="Nhập tiêu đề ngắn gọn, rõ ràng, thể hiện nội dung chính..." 
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-colors font-medium"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1 flex justify-end">{title.length}/150 ký tự</p>
                                </>
                            )}
                        </div>

                        {/* Rich Text Editor Mock */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Nội dung chi tiết <span className="text-red-500">*</span>
                            </label>
                            {isPreview ? (
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[250px] whitespace-pre-wrap">
                                    {content || 'Chưa nhập nội dung...'}
                                </div>
                            ) : (
                                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                    {/* Toolbar */}
                                    <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex flex-wrap gap-1 items-center">
                                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"><Bold size={16}/></button>
                                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"><Italic size={16}/></button>
                                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"><Underline size={16}/></button>
                                        <div className="w-px h-5 bg-gray-300 mx-1"></div>
                                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"><List size={16}/></button>
                                        <div className="w-px h-5 bg-gray-300 mx-1"></div>
                                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"><LinkIcon size={16}/></button>
                                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"><ImageIcon size={16}/></button>
                                    </div>
                                    {/* Editor Area */}
                                    <textarea 
                                        placeholder="Nội dung thảo luận của bạn..." 
                                        className="w-full p-4 min-h-[250px] outline-none resize-y text-gray-700"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Thẻ phân loại (Tags)</label>
                            {isPreview ? (
                                <div className="flex flex-wrap gap-2">
                                    {tags ? (
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-semibold">
                                            {tags}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 italic text-sm">Chưa có thẻ</span>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <input 
                                        type="text" 
                                        placeholder="Ví dụ: thu-tuc, thua-ke, BHYT (nhấn Enter để thêm)" 
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-colors"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tags && (
                                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-semibold">
                                                {tags} <button className="hover:text-red-500" onClick={() => setTags('')}>&times;</button>
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Attachments */}
                        {!isPreview && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tài liệu đính kèm (không bắt buộc)</label>
                                <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-colors group">
                                    <Paperclip size={32} className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                                    <p className="text-gray-600 font-medium">Nhấn vào đây hoặc kéo thả file để tải lên</p>
                                    <p className="text-gray-400 text-xs mt-1">Định dạng hỗ trợ: PDF, DOCX, JPG, PNG (Tối đa 5MB)</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
                            <button 
                                onClick={handleSaveDraft}
                                className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                            >
                                Lưu nháp
                            </button>
                            <div className="flex gap-4 w-full sm:w-auto">
                                <button 
                                    onClick={() => setIsPreview(!isPreview)}
                                    className="w-full sm:w-auto px-6 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
                                >
                                    {isPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                                    {isPreview ? "Tiếp tục sửa" : "Xem trước"}
                                </button>
                                <button 
                                    onClick={() => setShowConfirm(true)}
                                    className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <Check size={18} /> Đăng bài
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-fadeIn">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận đăng bài</h3>
                            <p className="text-gray-600">Bạn chắc chắn với nội dung chủ đề mà bạn soạn thảo chưa? Sau khi đăng, bài viết sẽ được gửi đi để chờ phê duyệt.</p>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors w-full"
                            >
                                Hủy, sửa lại
                            </button>
                            <button 
                                onClick={handleConfirmPost}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors w-full"
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-fadeIn">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cảm ơn bạn đã đóng góp!</h3>
                            <p className="text-gray-600">Quản trị viên sẽ tiến hành phê duyệt bài đăng và sẽ thông báo trạng thái bài đăng trong thời gian sớm nhất.</p>
                        </div>
                        <button 
                            onClick={handleFinishSuccess}
                            className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                        >
                            Đến Trạm quản lý
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTopicPage;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, Save, Send, Eye, Image as ImageIcon, Video, Link2 as LinkIcon, 
    List, ListOrdered, Bold, Italic, Underline, ChevronDown, Upload, X, Tag, 
    AlertCircle, Clock, CheckCircle, Info, History 
} from 'lucide-react';

const CATEGORIES = [
    'Phân tích & Bình luận',
    'Tư vấn pháp luật',
    'Nghiên cứu khoa học',
    'Phổ biến giáo dục pháp luật'
];

// Mock data fetching based on ID
const MOCK_ARTICLE_DATA = {
    '2': { 
        id: 2, 
        title: 'Quy trình xử lý kỷ luật lao động mới nhất', 
        content: '<p>Nội dung bài viết chờ duyệt...</p>', 
        category: 'Tư vấn pháp luật', 
        summary: 'Tóm tắt ngắn gọn quy trình...',
        tags: ['Lao động', 'Kỷ luật'],
        status: 'pending' 
    },
    '4': { 
        id: 4, 
        title: 'Thủ tục đăng ký kết hôn lại', 
        content: '<p>Nội dung bị từ chối...</p>', 
        category: 'Tư vấn pháp luật', 
        summary: 'Hướng dẫn thủ tục...',
        tags: ['Hôn nhân gia đình'],
        status: 'rejected',
        rejectionReason: 'Nội dung trùng lặp với bài viết trước đó. Vui lòng bổ sung thêm điểm mới hoặc cập nhật biểu mẫu 2026.',
        rejectedAt: '15/03/2026 10:30'
    }
};

const CollaboratorArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    
    const [articleInfo, setArticleInfo] = useState({
        title: '',
        content: '',
        category: '',
        summary: '',
        tags: [],
        status: 'draft',
        rejectionReason: '',
        thumbnail: null
    });

    const [tagInput, setTagInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [submitNote, setSubmitNote] = useState('');
    const editorRef = useRef(null);

    // Initialize data
    useEffect(() => {
        if (isEditMode && MOCK_ARTICLE_DATA[id]) {
            setArticleInfo(MOCK_ARTICLE_DATA[id]);
        }
    }, [id, isEditMode]);
    
    // Auto-save simulation
    useEffect(() => {
        if (articleInfo.status === 'draft' || articleInfo.status === 'rejected') {
            const timer = setTimeout(() => {
                if (articleInfo.title || articleInfo.content) {
                    setLastSaved(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [articleInfo.title, articleInfo.content, articleInfo.status]);

    const isReadOnly = articleInfo.status === 'pending' || articleInfo.status === 'published';

    const handleSaveDraft = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
        }, 800);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim().replace(',', '');
            if (newTag && !articleInfo.tags.includes(newTag)) {
                setArticleInfo({ ...articleInfo, tags: [...articleInfo.tags, newTag] });
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setArticleInfo({
            ...articleInfo,
            tags: articleInfo.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleThumbnailUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setArticleInfo({...articleInfo, thumbnail: URL.createObjectURL(e.target.files[0])});
        }
    };

    const handleSubmitForReview = () => {
        setIsSaving(true);
        // Simulate API
        setTimeout(() => {
            setIsSaving(false);
            setShowSubmitDialog(false);
            navigate('/ca-nhan/tin-bai', { state: { message: 'Bài viết đã được gửi duyệt thành công!' } });
        }, 1500);
    };

    const handleFormat = (command, value = null) => {
        if (isReadOnly) return;
        document.execCommand(command, false, value);
        // Sync content back
        if (editorRef.current) {
            setArticleInfo({ ...articleInfo, content: editorRef.current.innerHTML });
        }
    };

    return (
        <div className="bg-white min-h-screen pb-20 animate-fadeIn">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-200 z-30 px-6 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4 hidden sm:flex">
                    <button onClick={() => navigate('/ca-nhan/tin-bai')} className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium text-sm">
                        <ArrowLeft size={16} /> Tin bài của tôi
                    </button>
                    <div className="w-px h-5 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                        <h1 className="font-semibold text-gray-800 text-sm">{isEditMode ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h1>
                        {isEditMode && (
                           <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                               articleInfo.status === 'draft' ? 'border-gray-200 text-gray-500 bg-gray-50' :
                               articleInfo.status === 'pending' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' :
                               articleInfo.status === 'rejected' ? 'border-red-200 text-red-600 bg-red-50' :
                               'border-green-200 text-green-600 bg-green-50'
                           }`}>
                               {articleInfo.status === 'draft' ? 'Nháp' :
                                articleInfo.status === 'pending' ? 'Chờ duyệt' :
                                articleInfo.status === 'rejected' ? 'Từ chối' : 'Đã duyệt'}
                           </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto hide-scrollbar">
                    <span className="text-xs text-gray-400 whitespace-nowrap hidden md:inline">
                        {isSaving ? 'Đang lưu...' : lastSaved ? `Đã lưu tự động lúc ${lastSaved}` : 'Chưa lưu'}
                    </span>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        <Eye size={16} /> Xem trước
                    </button>
                    
                    {!isReadOnly && (
                        <button 
                            onClick={handleSaveDraft}
                            disabled={isSaving}
                            className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50"
                        >
                            <Save size={16} /> Lưu nháp
                        </button>
                    )}

                    {(!isReadOnly || articleInfo.status === 'rejected') && (
                        <button 
                            onClick={() => setShowSubmitDialog(true)}
                            disabled={!articleInfo.title || !articleInfo.content}
                            className="px-4 py-1.5 text-sm font-medium text-white bg-[#0f4c81] rounded shadow-sm hover:bg-blue-800 transition-colors flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            title={(!articleInfo.title || !articleInfo.content) ? "Vui lòng nhập tiêu đề và nội dung để gửi duyệt" : ""}
                        >
                            <Send size={16} /> Gửi duyệt
                        </button>
                    )}

                    {articleInfo.status === 'pending' && (
                        <button className="px-4 py-1.5 text-sm font-medium text-yellow-700 bg-white border border-yellow-500 rounded hover:bg-yellow-50 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                            Rút lại yêu cầu
                        </button>
                    )}
                </div>
            </header>

            {/* Banners */}
            <div className="max-w-6xl mx-auto px-4 mt-4">
                {articleInfo.status === 'rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3 shadow-sm">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h3 className="text-red-800 font-bold mb-1">Bài viết bị từ chối</h3>
                            <div className="bg-white border text-sm border-red-100 p-3 rounded text-gray-700 leading-relaxed italic border-l-4 border-l-red-500">
                                {articleInfo.rejectionReason}
                            </div>
                            <p className="text-xs text-red-500 mt-2">Ngày từ chối: {articleInfo.rejectedAt}</p>
                        </div>
                    </div>
                )}

                {articleInfo.status === 'pending' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 flex gap-3 items-center shadow-sm">
                        <Clock className="text-yellow-600 shrink-0" size={20} />
                        <p className="text-yellow-800 text-sm">Bài viết đang chờ biên tập viên duyệt — Nội dung bị khóa, không thể chỉnh sửa.</p>
                    </div>
                )}
            </div>

            {/* Main Layout */}
            <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8 mt-2">
                
                {/* Editor Area */}
                <div className="flex-1 relative">
                    <input 
                        type="text"
                        placeholder="Nhập tiêu đề bài viết..."
                        className="w-full text-3xl font-bold text-gray-900 border-none outline-none placeholder-gray-300 py-4 bg-transparent mb-2 disabled:bg-transparent"
                        value={articleInfo.title}
                        onChange={(e) => setArticleInfo({...articleInfo, title: e.target.value})}
                        disabled={isReadOnly}
                    />

                    {/* Toolbar */}
                    <div className={`sticky top-14 z-20 flex flex-wrap items-center gap-1 p-1 bg-white border rounded-t-lg shadow-sm border-gray-200 transition-opacity ${isReadOnly ? 'opacity-40 pointer-events-none' : ''}`}>
                        <button onClick={() => handleFormat('bold')} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="In đậm (Strg+B)"><Bold size={16} /></button>
                        <button onClick={() => handleFormat('italic')} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="In nghiêng (Strg+I)"><Italic size={16} /></button>
                        <button onClick={() => handleFormat('underline')} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Gạch chân (Strg+U)"><Underline size={16} /></button>
                        <div className="w-px h-5 bg-gray-200 mx-1"></div>
                        <span className="text-sm font-medium text-gray-600 px-2 flex items-center">H2 <ChevronDown size={14} className="ml-1"/></span>
                        <div className="w-px h-5 bg-gray-200 mx-1"></div>
                        <button onClick={() => handleFormat('insertUnorderedList')} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Danh sách"><List size={16} /></button>
                        <button onClick={() => handleFormat('insertOrderedList')} className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Danh sách số"><ListOrdered size={16} /></button>
                        <div className="w-px h-5 bg-gray-200 mx-1"></div>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Chèn liên kết"><LinkIcon size={16} /></button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Chèn hình ảnh"><ImageIcon size={16} /></button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Nhúng Video"><Video size={16} /></button>
                    </div>

                    {/* Contenteditable Area */}
                    <div 
                        ref={editorRef}
                        contentEditable={!isReadOnly}
                        className={`min-h-[500px] border border-t-0 p-6 rounded-b-lg border-gray-200 bg-white prose prose-lg max-w-none focus:outline-none transition-colors ${isReadOnly ? 'cursor-default bg-gray-50' : 'bg-white'}`}
                        onInput={(e) => setArticleInfo({...articleInfo, content: e.currentTarget.innerHTML})}
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: articleInfo.content || '<p><br></p>' }}
                        title={isReadOnly ? "Nội dung bị khóa (Read-only)" : ""}
                    />
                    
                    <div className="text-right mt-2 text-xs text-gray-400">
                        {articleInfo.content.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(w=>w.length>0).length} từ
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 shrink-0 space-y-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">Thông tin bài viết</h3>

                        <div className="space-y-4">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Chuyên mục <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select 
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                                        value={articleInfo.category}
                                        onChange={(e) => setArticleInfo({...articleInfo, category: e.target.value})}
                                        disabled={isReadOnly}
                                    >
                                        <option value="" disabled>Chọn chuyên mục...</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ảnh đại diện</label>
                                {articleInfo.thumbnail ? (
                                    <div className="relative rounded overflow-hidden group">
                                        <img src={articleInfo.thumbnail} alt="Bìa" className="w-full h-32 object-cover" />
                                        {!isReadOnly && (
                                            <button 
                                                onClick={() => setArticleInfo({...articleInfo, thumbnail: null})}
                                                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <label className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${isReadOnly ? 'pointer-events-none opacity-50' : ''}`}>
                                        <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                        <span className="text-xs text-gray-500">Bấm hoặc kéo thả ảnh (tỉ lệ 16:9)</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailUpload} disabled={isReadOnly} />
                                    </label>
                                )}
                            </div>

                            {/* Summary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả ngắn</label>
                                <textarea 
                                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 h-20 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                                    placeholder="Nhập mô tả ngắn (tối đa 300 ký tự)..."
                                    value={articleInfo.summary}
                                    onChange={(e) => setArticleInfo({...articleInfo, summary: e.target.value})}
                                    disabled={isReadOnly}
                                ></textarea>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Tag size={14}/> Thẻ (Tags)</label>
                                <div className={`border border-gray-300 rounded bg-white p-2 flex flex-wrap gap-2 ${isReadOnly ? 'bg-gray-50' : ''}`}>
                                    {articleInfo.tags.map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-sm flex items-center gap-1 border border-gray-200">
                                            {tag}
                                            {!isReadOnly && (
                                                <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 ml-1">
                                                    <X size={12} />
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                    {!isReadOnly && (
                                        <input 
                                            type="text" 
                                            placeholder="Thêm thẻ (nhấn Enter)..." 
                                            className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleAddTag}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEND FOR REVIEW MODAL */}
            {showSubmitDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
                        <div className="p-6 border-b border-gray-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <Send size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Xác nhận gửi duyệt</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Sau khi gửi, bài viết sẽ chuyển sang trạng thái <strong>Chờ duyệt</strong> và không thể chỉnh sửa cho đến khi biên tập viên phản hồi.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50">
                            {/* Summary Card */}
                            <div className="bg-white p-4 rounded border border-gray-200 shadow-sm text-sm mb-4">
                                <h4 className="font-bold text-gray-900 line-clamp-2 mb-2">{articleInfo.title}</h4>
                                <div className="grid grid-cols-2 gap-2 text-gray-600">
                                    <div>Chuyên mục: <span className="font-medium text-gray-800">{articleInfo.category || <span className="text-red-500">Chưa chọn</span>}</span></div>
                                    <div>Ảnh đại diện: <span className="font-medium text-gray-800">{articleInfo.thumbnail ? 'Có' : 'Chưa có'}</span></div>
                                </div>
                            </div>

                            {/* Note textarea */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú gửi biên tập viên (tùy chọn)</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập ghi chú hoặc lời nhắn cho biên tập viên..."
                                rows="3"
                                value={submitNote}
                                onChange={(e) => setSubmitNote(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-white">
                            <button 
                                onClick={() => setShowSubmitDialog(false)}
                                className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={handleSubmitForReview}
                                disabled={isSaving || !articleInfo.category}
                                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSaving ? 'Đang gửi...' : 'Xác nhận gửi duyệt'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollaboratorArticleEditor;

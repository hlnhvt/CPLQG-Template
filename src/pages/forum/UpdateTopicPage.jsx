import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
    Home, ChevronRight, Bold, Italic, Underline, 
    List, Image as ImageIcon, Link as LinkIcon, Paperclip, Check,
    AlertCircle, CheckCircle2, Eye, EyeOff, ChevronDown
} from 'lucide-react';
import { MOCK_FORUMS } from '../../data/mockForumData';

const UpdateTopicPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [selectedForum, setSelectedForum] = useState('');
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
    const DOMAIN_OPTIONS = ['Doanh nghiệp', 'Đầu tư', 'Sở hữu trí tuệ', 'Lao động', 'Dân sự', 'Hình sự', 'Hành chính', 'Đất đai', 'Thuế - Phí - Lệ phí'];
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    
    const [isPreview, setIsPreview] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('managementTopics');
        if (stored) {
            const topics = JSON.parse(stored);
            const topic = topics.find(t => String(t.id) === String(id));
            if (topic) {
                // Ensure only draft or rejected topics can be edited
                if (topic.status !== 'draft' && topic.status !== 'rejected') {
                    setError('Chủ đề này đã được xuất bản hoặc đang chờ duyệt, không thể chỉnh sửa.');
                    setLoading(false);
                    return;
                }
                
                setTitle(topic.title || '');
                setContent(topic.content || '');
                setTags(topic.tags || '');
                setSelectedDomains(topic.domains || []);
                
                // Map forum name or ID
                if (topic.forumId) {
                    setSelectedForum(topic.forumId);
                } else if (topic.forum) {
                    const matchedForum = MOCK_FORUMS.find(f => f.title === topic.forum);
                    if (matchedForum) {
                        setSelectedForum(matchedForum.id);
                    } else {
                        setSelectedForum(MOCK_FORUMS[0]?.id || '');
                    }
                }
                setLoading(false);
                return;
            }
        }
        setError('Không tìm thấy chủ đề cần cập nhật.');
        setLoading(false);
    }, [id]);

    const handleSaveDraft = () => {
        const forumObj = MOCK_FORUMS.find(f => String(f.id) === String(selectedForum));
        const stored = localStorage.getItem('managementTopics');
        let topics = stored ? JSON.parse(stored) : [];
        
        topics = topics.map(t => {
            if (String(t.id) === String(id)) {
                return {
                    ...t,
                    title: title || 'Chủ đề không tên',
                    content: content || '',
                    forum: forumObj ? forumObj.title : 'Chưa xác định',
                    forumId: selectedForum ? Number(selectedForum) : null,
                    domains: selectedDomains,
                    tags: tags,
                    status: 'draft',
                    date: 'Vừa xong'
                };
            }
            return t;
        });
        
        localStorage.setItem('managementTopics', JSON.stringify(topics));
        navigate('/ca-nhan/chu-de-dien-dan');
    };

    const handleConfirmPost = () => {
        const forumObj = MOCK_FORUMS.find(f => String(f.id) === String(selectedForum));
        const stored = localStorage.getItem('managementTopics');
        let topics = stored ? JSON.parse(stored) : [];
        
        topics = topics.map(t => {
            if (String(t.id) === String(id)) {
                return {
                    ...t,
                    title: title || 'Chủ đề không tên',
                    content: content || '',
                    forum: forumObj ? forumObj.title : 'Chưa xác định',
                    forumId: selectedForum ? Number(selectedForum) : null,
                    domains: selectedDomains,
                    tags: tags,
                    status: 'pending', // change draft/rejected to pending
                    date: 'Vừa xong'
                };
            }
            return t;
        });
        
        localStorage.setItem('managementTopics', JSON.stringify(topics));
        setShowConfirm(false);
        setShowSuccess(true);
    };

    const handleFinishSuccess = () => {
        navigate('/ca-nhan/chu-de-dien-dan');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f4f7fb]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Đang tải thông tin chủ đề...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f4f7fb]">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => navigate('/ca-nhan/chu-de-dien-dan')}
                        className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                    >
                        Quay lại Trạm quản lý
                    </button>
                </div>
            </div>
        );
    }

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
                        <Link to="/ca-nhan/chu-de-dien-dan" className="hover:text-white transition-colors">Trạm quản lý</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Cập nhật chủ đề</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold">Cập nhật Thảo luận / Chủ đề</h1>
                    <p className="text-blue-200 mt-2 text-lg">Chỉnh sửa ý kiến, thắc mắc hoặc kinh nghiệm của bạn.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    
                    {/* Form Fields / Preview */}
                    <div className="space-y-6">
                        
                        {/* Select Forum & Domains */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Chọn diễn đàn tham gia <span className="text-red-500">*</span>
                                </label>
                                {isPreview ? (
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        {MOCK_FORUMS.find(f => String(f.id) === String(selectedForum))?.title || 'Chưa chọn'}
                                    </div>
                                ) : (
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-colors h-[46px]"
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

                            <div className="relative">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Lĩnh vực liên quan
                                </label>
                                {isPreview ? (
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        {selectedDomains.length > 0 ? selectedDomains.join(', ') : 'Chưa chọn lĩnh vực nào'}
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-colors text-left flex justify-between items-center h-[46px]"
                                        >
                                            <span className="truncate pr-4 font-medium text-gray-700">
                                                {selectedDomains.length > 0 
                                                    ? `${selectedDomains.length} lĩnh vực được chọn: ${selectedDomains.join(', ')}` 
                                                    : '-- Chọn một hoặc nhiều lĩnh vực --'}
                                            </span>
                                            <ChevronDown size={18} className={`text-gray-500 transition-transform flex-shrink-0 ${isDomainDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isDomainDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsDomainDropdownOpen(false)}></div>
                                                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                                                    {DOMAIN_OPTIONS.map(domain => (
                                                        <label key={domain} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors group">
                                                            <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${selectedDomains.includes(domain) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400 bg-white'}`}>
                                                                {selectedDomains.includes(domain) && <Check size={14} className="text-white" strokeWidth={3} />}
                                                            </div>
                                                            <span className={`text-sm ${selectedDomains.includes(domain) ? 'font-bold text-blue-700' : 'font-medium text-gray-700'}`}>{domain}</span>
                                                            <input 
                                                                type="checkbox" 
                                                                className="hidden"
                                                                checked={selectedDomains.includes(domain)}
                                                                onChange={() => {
                                                                    if (selectedDomains.includes(domain)) {
                                                                        setSelectedDomains(selectedDomains.filter(d => d !== domain));
                                                                    } else {
                                                                        setSelectedDomains([...selectedDomains, domain]);
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận cập nhật và đăng bài</h3>
                            <p className="text-gray-600">Bạn chắc chắn với nội dung chủ đề mà bạn chỉnh sửa chưa? Sau khi cập nhật, bài viết sẽ được gửi đi để chờ phê duyệt lại.</p>
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cập nhật chủ đề thành công!</h3>
                            <p className="text-gray-600">Bài viết của bạn đã được cập nhật và gửi cho ban quản trị phê duyệt.</p>
                        </div>
                        <button 
                            onClick={handleFinishSuccess}
                            className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                        >
                            Quay lại Trạm quản lý
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateTopicPage;

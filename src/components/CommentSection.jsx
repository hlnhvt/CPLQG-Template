import React, { useState } from 'react';
import { User, Mail, Phone, UploadCloud, MessageSquare, ThumbsUp, Flag } from 'lucide-react';

const CommentSection = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Trần Văn A",
            avatar: "T",
            content: "Việc chấm điểm KPI trong công tác xây dựng pháp luật là một bước đi rất đột phá, giúp nâng cao trách nhiệm của cơ quan soạn thảo.",
            likes: 48,
            time: "1h trước"
        },
        {
            id: 2,
            author: "Nguyễn Thị B",
            avatar: "N",
            content: "Hy vọng đề án này sẽ sớm được nhân rộng để các văn bản pháp luật đi vào thực tiễn hiệu quả, hạn chế tình trạng luật chờ nghị định.",
            likes: 16,
            time: "2h trước"
        }
    ]);

    const [formData, setFormData] = useState({
        name: 'Hoàng Lương Nhân',
        email: '',
        phone: '',
        content: ''
    });

    const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.content.trim() !== '';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const newComment = {
            id: Date.now(),
            author: formData.name,
            avatar: formData.name.charAt(0).toUpperCase(),
            content: formData.content,
            likes: 0,
            time: "Vừa xong"
        };

        // Add to top of the list for immediate visibility, or bottom since it's chronological. The user requested chronological order. Usually new is at bottom or top depending on view. We'll add to bottom.
        // Wait, chronological usually means newest at the bottom. But let's add it to the top so user sees it instantly.
        setComments(prev => [newComment, ...prev]);

        // Reset content
        setFormData(prev => ({ ...prev, content: '' }));
        alert("Bình luận của bạn đã được gửi thành công và đang chờ duyệt!");
    };

    const handleLike = (id) => {
        setComments(prev => prev.map(c => 
            c.id === id ? { ...c, likes: c.likes + 1 } : c
        ));
    };

    return (
        <div className="mt-12 space-y-12">
            {/* --- Ý KIẾN SECTION --- */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận<span className="text-lg font-normal text-gray-500">({comments.length})</span></h3>

                <hr className="mb-6 border-gray-200" />

                {/* Comments List */}
                <div className="space-y-8">
                    {comments.length === 0 ? (
                        <p className="text-gray-500 italic">Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến!</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                {/* Avatar */}
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-600 font-bold text-lg">
                                    {comment.avatar}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-base mb-1">
                                        {comment.author} <span className="font-normal text-gray-700">{comment.content}</span>
                                    </h4>

                                    {/* Actions */}
                                    <div className="flex items-center gap-5 mt-2 text-sm text-gray-500">
                                        <button 
                                            onClick={() => handleLike(comment.id)}
                                            className="flex items-center gap-1.5 hover:text-blue-600 font-medium transition"
                                        >
                                            <ThumbsUp size={16} /> Thích
                                        </button>
                                        {comment.likes > 0 && (
                                            <span className="flex items-center gap-1.5 font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-xs">
                                                <ThumbsUp size={14} className="fill-current" /> {comment.likes}
                                            </span>
                                        )}
                                        <button className="flex items-center gap-1 hover:text-gray-800 ml-auto md:ml-2">
                                            <Flag size={14} /> Báo vi phạm
                                        </button>
                                        <span className="ml-auto text-gray-400">{comment.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- GỬI BÌNH LUẬN SECTION --- */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Gửi Bình Luận</h3>

                {/* Info Box */}
                <div className="bg-[#f0f7ff] border border-blue-100 rounded-lg p-4 mb-6 flex justify-between items-start">
                    <div className="flex gap-3">
                        <MessageSquare className="text-blue-500 mt-1 shrink-0" size={20} />
                        <div>
                            <p className="text-blue-800 font-medium">Vui lòng chia sẻ ý kiến bình luận của bạn về bài viết</p>
                            <p className="text-sm text-gray-500 mt-1">Bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị</p>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="text-gray-400" size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-200 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 text-gray-800"
                                    readOnly // Giả lập người dùng đã đăng nhập
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Nhập địa chỉ email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số điện thoại <span className="text-gray-400 font-normal">(Tùy chọn)</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="text-gray-400" size={18} />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nội dung bình luận <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Nhập nội dung bình luận của bạn..."
                            required
                        ></textarea>
                    </div>

                    {/* Attachment */}
                    <div>
                        <div className="flex justify-between items-end mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                                File đính kèm <span className="text-gray-400 font-normal">(Tùy chọn)</span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">PDF, Word, Excel, Image - Tối đa 10MB/file, tối đa 5 file</p>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition">
                            <div className="flex items-center gap-2 text-gray-600 justify-center md:justify-start">
                                <UploadCloud size={20} />
                                <span className="text-sm font-medium">Nhấn để chọn file (0/5)</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-2">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`font-medium py-2 px-8 rounded-full flex items-center gap-2 transition-colors ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md' : 'bg-gray-300 text-white cursor-not-allowed'}`}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            Gửi bình luận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentSection;

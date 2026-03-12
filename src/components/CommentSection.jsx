import React, { useState } from 'react';
import { User, Mail, Phone, UploadCloud, MessageSquare, ThumbsUp, Flag, Smile } from 'lucide-react';

const CommentSection = () => {
    const [activeTab, setActiveTab] = useState('quan-tam');

    return (
        <div className="mt-12 space-y-12">
            {/* --- Ý KIẾN SECTION --- */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận<span className="text-lg font-normal text-gray-500">(3)</span></h3>

                {/* Input Area */}
                <div className="flex gap-4 mb-8">
                    <div className="relative flex-1">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-800 rounded-l-md"></div>
                        <input
                            type="text"
                            className="w-full bg-gray-50 border border-gray-200 rounded-md py-4 pl-6 pr-12 focus:outline-none focus:bg-white focus:border-red-800 focus:ring-1 focus:ring-red-800 transition"
                            placeholder="Chia sẻ ý kiến của bạn"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <Smile size={24} />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-6 border-b border-gray-200 mb-6">
                    <button
                        className={`pb-3 text-sm font-bold ${activeTab === 'quan-tam' ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('quan-tam')}
                    >
                        Quan tâm nhất
                    </button>
                    <button
                        className={`pb-3 text-sm font-medium ${activeTab === 'moi-nhat' ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('moi-nhat')}
                    >
                        Mới nhất
                    </button>
                </div>

                {/* Comments List */}
                <div className="space-y-8">
                    {/* Comment 1 */}
                    <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                            {/* Chỗ này giả lập avatar con rồng như trong ảnh */}
                            <span className="text-2xl">🐉</span>
                            {/* Icon kéo */}
                            <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-base mb-1">Anti fan phim kiếm hiệp <span className="font-normal text-gray-700">Tình báo và vũ khí của Israel thì không cần bàn cãi.</span></h4>

                            {/* Actions */}
                            <div className="flex items-center gap-5 mt-2 text-sm text-gray-500">
                                <button className="flex items-center gap-1.5 hover:text-blue-600 font-medium">
                                    <ThumbsUp size={16} /> Thích
                                </button>
                                <span className="flex items-center gap-1.5 font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-xs">
                                    <ThumbsUp size={14} className="fill-current" /> 48
                                </span>
                                <button className="hover:text-gray-800 font-medium">Trả lời</button>
                                <button className="flex items-center gap-1 hover:text-gray-800 ml-auto md:ml-2">
                                    <Flag size={14} /> Báo vi phạm
                                </button>
                                <span className="ml-auto text-gray-400">1h trước</span>
                            </div>

                            {/* Replies */}
                            <div className="mt-3">
                                <button className="text-gray-600 text-sm font-medium flex items-center gap-1 hover:text-blue-600">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                                    1 trả lời
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comment 2 */}
                    <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-600 font-bold text-lg">
                            L
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-base mb-1">Lee nguyen <span className="font-normal text-gray-700">Tình báo Isarael lại chứng tỏ năng lực</span></h4>

                            {/* Actions */}
                            <div className="flex items-center gap-5 mt-2 text-sm text-gray-500">
                                <button className="flex items-center gap-1.5 hover:text-blue-600 font-medium">
                                    <ThumbsUp size={16} /> Thích
                                </button>
                                <span className="flex items-center gap-1.5 font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-xs">
                                    <ThumbsUp size={14} className="fill-current" /> 16
                                </span>
                                <button className="hover:text-gray-800 font-medium">Trả lời</button>
                                <button className="flex items-center gap-1 hover:text-gray-800 ml-auto md:ml-2">
                                    <Flag size={14} />
                                </button>
                                <span className="ml-auto text-gray-400">1h trước</span>
                            </div>
                        </div>
                    </div>

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
                    <button className="bg-gray-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-600 flex items-center gap-1">
                        <span>×</span> Đóng
                    </button>
                </div>

                {/* Form Fields */}
                <form className="space-y-6">
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
                                    className="pl-10 w-full border border-gray-200 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 text-gray-800"
                                    defaultValue="Hoàng Lương Nhân"
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
                                    className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Nhập địa chỉ email"
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
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Nhập nội dung bình luận của bạn..."
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
                            type="button"
                            className="bg-gray-300 text-white font-medium py-2 px-8 rounded-full flex items-center gap-2 cursor-not-allowed"
                        // Khi có data, đổi màu thành xanh và enable button
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

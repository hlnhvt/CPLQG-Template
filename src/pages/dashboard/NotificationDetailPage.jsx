import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Trash2, MailOpen, FileText, CheckCircle2, ChevronRight, Share2, ExternalLink } from 'lucide-react';

const MOCK_NOTIFICATION_DETAIL = {
    1: {
        id: 1,
        type: 'vanban',
        source: 'Bộ Tư pháp',
        title: 'Ban hành Luật Đất đai mới (Số 31/2024/QH15)',
        content: `
            <p>Kính gửi Quý người dùng,</p>
            <p>Hệ thống Cổng Pháp luật Quốc gia xin thông báo: Quốc hội đã chính thức ban hành Luật Đất đai mới (Số 31/2024/QH15).</p>
            <p><strong>Nội dung nổi bật:</strong></p>
            <ul>
                <li>Bỏ khung giá đất, xác định giá đất theo nguyên tắc thị trường.</li>
                <li>Mở rộng quyền sử dụng đất đối với người Việt Nam định cư ở nước ngoài.</li>
                <li>Quy định chặt chẽ hơn về điều kiện, tiêu chí thu hồi đất.</li>
            </ul>
            <p>Luật sẽ chính thức có hiệu lực từ ngày 01/01/2025. Vui lòng xem toàn văn văn bản để biết thêm chi tiết.</p>
        `,
        time: '12/03/2026 09:30',
        isRead: true,
        isImportant: true,
        relatedLink: '/van-ban/1',
        relatedLinkText: 'Xem toàn văn Luật Đất đai'
    },
    2: {
        id: 2,
        type: 'duthao',
        source: 'Cổng thông tin',
        title: 'Dự thảo Nghị định quy định chi tiết Luật Đất đai',
        content: `
            <p>Cơ quan chủ trì soạn thảo: Bộ Tài nguyên và Môi trường.</p>
            <p>Kính mời Quý chuyên gia, nhà khoa học và toàn thể nhân dân tham gia đóng góp ý kiến cho Dự thảo Nghị định hướng dẫn thi hành Luật Đất đai 2024.</p>
            <p>Thời gian nhận ý kiến đóng góp: từ ngày 10/03/2026 đến hết ngày 10/05/2026.</p>
        `,
        time: '12/03/2026 14:15',
        isRead: false,
        isImportant: false,
        relatedLink: '/du-thao/1',
        relatedLinkText: 'Tham gia góp ý'
    }
};

const NotificationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Fetch or simulate API call
        if (MOCK_NOTIFICATION_DETAIL[id]) {
            setNotification({ ...MOCK_NOTIFICATION_DETAIL[id], isRead: true }); // Auto mark as read when opened
        } else {
            // Fallback content if not found
            setNotification({
                id: Number(id),
                source: 'Hệ thống',
                title: 'Nội dung thông báo (Bản xem trước)',
                content: '<p>Đây là bản xem trước của thông báo. Nội dung thực tế có thể khác.</p>',
                time: 'Vừa xong',
                isRead: true,
                isImportant: false
            });
        }
    }, [id]);

    if (!notification) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

    const toggleImportant = () => {
        setNotification(prev => ({ ...prev, isImportant: !prev.isImportant }));
    };

    const toggleReadStatus = () => {
        setNotification(prev => ({ ...prev, isRead: !prev.isRead }));
    };

    const handleDelete = () => {
        // Simulate delete and navigate back
        navigate('/ca-nhan/thong-bao', { state: { message: 'Đã xóa thông báo' } });
    };

    return (
        <div className="flex flex-col animate-fadeIn pb-12 max-w-4xl mx-auto">
            {/* Top Navigation */}
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <button
                    onClick={() => navigate('/ca-nhan/thong-bao')}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#0f4c81] font-medium transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Quay lại hòm thư</span>
                </button>

                {/* Right Quick Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleImportant}
                        className={`p-2 rounded-full transition-colors flex items-center justify-center ${notification.isImportant ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        title={notification.isImportant ? "Bỏ đánh dấu quan trọng" : "Đánh dấu quan trọng"}
                    >
                        <Star size={18} fill={notification.isImportant ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-full transition-colors bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center"
                        title="Xóa thông báo"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Notification Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">

                {/* Visual Header Banner */}
                <div className="h-2 bg-[#0f4c81] w-full"></div>

                <div className="p-6 md:p-8">
                    {/* Header Info */}
                    <div className="flex flex-wrap gap-3 items-center text-sm mb-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 font-medium rounded-md flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {notification.source}
                        </span>
                        <span className="text-gray-400">{notification.time}</span>
                        {!notification.isRead && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">MỚI</span>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">
                        {notification.title}
                    </h1>

                    {/* Rich Content Body */}
                    <div
                        className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-[15px]"
                        dangerouslySetInnerHTML={{ __html: notification.content }}
                    />
                </div>

                {/* Related Call to Action */}
                {notification.relatedLink && (
                    <div className="px-6 md:px-8 py-5 bg-blue-50/50 border-t border-blue-100/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-[14px] text-gray-600 font-medium">Bạn có tài liệu / công việc cần xử lý liên quan đến thông báo này.</p>
                        <Link
                            to={notification.relatedLink}
                            className="bg-[#0f4c81] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium text-[14px] transition-colors whitespace-nowrap shadow-sm"
                        >
                            {notification.relatedLinkText}
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                )}
            </div>

            {/* Sticky Action Bar */}
            <div className="mt-6 sticky bottom-6 bg-white border border-gray-200 shadow-xl rounded-2xl p-2 flex justify-center gap-2 max-w-sm mx-auto z-10">
                <button
                    onClick={toggleReadStatus}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                >
                    {notification.isRead ? (
                        <><MailOpen size={18} className="text-gray-400" /> Đánh dấu chưa đọc</>
                    ) : (
                        <><CheckCircle2 size={18} className="text-green-500" /> Đánh dấu đã đọc</>
                    )}
                </button>
                <div className="w-px bg-gray-200 my-2"></div>
                <button
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: notification.title,
                                url: window.location.href
                            });
                        }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                >
                    <Share2 size={18} className="text-blue-500" /> Chia sẻ
                </button>
            </div>
        </div>
    );
};

export default NotificationDetailPage;

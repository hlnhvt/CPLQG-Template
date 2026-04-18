import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Clock, User, Eye, ThumbsUp, ThumbsDown, Share2, Download, MessageSquare, BookOpen, AlertCircle, Bookmark, CheckCircle2, FileText, Send, Flame } from 'lucide-react';
// import { MOCK_DETAILS } from './HienKeShared';

const HienKeDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);

    // Mock data for Hiến kê
    const hienKeData = {
        title: 'Đề xuất giải pháp liên thông dữ liệu y tế quốc gia',
        domain: 'Sức khỏe và Y tế',
        status: 'Đã phản hồi',
        author: 'Nguyễn Văn An',
        date: '11:09 17/03/2026',
        views: 3821,
        content: `Kính gửi các Lãnh đạo và Cơ quan chức năng,
        
Qua quan sát thực tiễn quá trình khám chữa bệnh tại các bệnh viện tuyến cơ sở và tuyến trung ương, tôi nhận thấy có sự lãng phí rất lớn về thời gian và tiền bạc của người bệnh khi phải thực hiện lại nhiều xét nghiệm cơ bản mang tính lặp lại mỗi khi chuyển tuyến.

**Tôi xin đề xuất giải pháp như sau:**
1. Cần xây dựng và Ban hành Chuẩn dữ liệu y tế điện tử quốc gia chung, yêu cầu tất cả các nền tảng phần mềm HIS (Hospital Information System) tại các bệnh viện phải tuân thủ và có API chia sẻ.
2. Dữ liệu này sẽ được gắn với mã định danh cá nhân (CCCD gắn chip) để người dân có thể có một "Hồ sơ sức khoẻ trọn đời".
3. Khi chuyển viện, bác sĩ ở bệnh viện mới có thể lập tức tra cứu và công nhận kết quả của các nhóm xét nghiệm hạng 1 (như sinh hoá máu cơ bản, X-Quang...) trong vòng 7 ngày gần nhất.

Tôi tin rằng giải pháp này không chỉ tháo gỡ tắc nghẽn, giảm tải cho các bệnh viện tuyến trên mà còn là một bước tiến quan trọng trong công cuộc Chuyển đổi số quốc gia lĩnh vực Y tế.
        
Xin trân trọng cảm ơn!`,
        attachments: [
            { name: 'Du_thao_Mo_hinh_Lienthong.pdf', size: '2.5 MB' },
            { name: 'So_lieu_khao_sat_y_te.xlsx', size: '1.2 MB' }
        ],
        tags: ['Dữ liệu y tế', 'Liên thông', 'Chuyển đổi số']
    };

    const answerData = {
        expertName: 'Cục Quản lý Khám, chữa bệnh',
        expertRole: 'Cơ quan, tổ chức tiếp nhận xử lý',
        expertType: 'Cơ quan nhà nước',
        date: '09:30 19/03/2026',
        likes: 850,
        content: `Chào bạn Nguyễn Văn An,
        
Bộ Y tế cảm ơn ý kiến đóng góp hết sức thiết thực và tâm huyết của bạn đối với lĩnh vực Chuyển đổi số hệ thống y tế quốc gia. Về nội dung bạn nêu, Bộ xin có các phản hồi như sau:

**1. Về tiến độ triển khai liên thông dữ liệu**
Bộ Y tế hoàn toàn đồng tình với sự cần thiết của một chuẩn dữ liệu chung. Thực tế, Bộ Y tế hiện đang tích cực làm việc với Bộ Công an để đẩy mạnh Đề án 06. Dự kiến trong cuối năm 2026, Hồ sơ sức khoẻ điện tử sẽ được liên thông và hiển thị thống nhất trên ứng dụng VNeID của người dân. Các chuẩn dữ liệu API dùng chung giữa các nền tảng HIS đang trong giai đoạn thẩm định cuối cùng trước khi ban hành Quy chuẩn.

**2. Về công nhận kết quả xét nghiệm liên tuyến**
Đây là một vấn đề đã được Bộ Y tế lưu tâm. Căn cứ theo tinh thần của Luật Khám bệnh, chữa bệnh (sửa đổi), Bộ đã có Thông tư quy định về việc các cơ sở y tế đủ năng lực/tiêu chuẩn phải công nhận kết quả của nhau nhằm ngăn chặn tình trạng tư lợi, lạm dụng xét nghiệm.

Đóng góp của bạn đã được Cục Quản lý Khám, chữa bệnh tiếp thu và sẽ làm tài liệu tham khảo quan trọng trong quá trình soạn thảo Nghị định hướng dẫn sắp tới.

Trân trọng nể trọng!`,
        references: ['Luật Khám bệnh, chữa bệnh 2023', 'Đề án 06/CP'],
        attachments: []
    };

    const relatedIdeas = [
        { id: 2, title: 'Kiến nghị sửa đổi quy định về đấu thầu thuốc tập trung' },
        { id: 3, title: 'Giải pháp nâng cao chất lượng y tế học đường' },
        { id: 4, title: 'Đề xuất cơ chế chi trả BHYT cho dịch vụ tư vấn tâm lý' }
    ];

    const handleFeedback = (type) => {
        if (!user) {
            alert('Vui lòng đăng nhập để đánh giá.');
            return;
        }
        if (type === 'like') {
            setHasLiked(!hasLiked);
            if (hasDisliked) setHasDisliked(false);
        } else {
            setHasDisliked(!hasDisliked);
            if (hasLiked) setHasLiked(false);
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16 text-gray-800">
            {/* Breadcrumb */}
            <div className="bg-white border-b shadow-sm sticky top-0 z-10 font-sans">
                <div className="container mx-auto px-4 md:px-8 max-w-[1280px] py-4">
                    <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-2">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span>/</span>
                        <Link to="/hien-ke" className="hover:text-[#0f4c81]">Hiến kế</Link>
                        <span>/</span>
                        <Link to="/hien-ke/linh-vuc" className="hover:text-[#0f4c81] line-clamp-1">{hienKeData.domain}</Link>
                        <span>/</span>
                        <span className="text-[#0f4c81] font-bold line-clamp-1 max-w-[200px] lg:max-w-none">Chi tiết hiến kế</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] mt-8 flex flex-col lg:flex-row gap-8 align-start font-sans">
                {/* Main Content Area */}
                <div className="lg:w-3/4 space-y-6">
                    {/* Idea Box */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded text-[13px] font-bold tracking-wide flex items-center gap-1.5">
                                    {hienKeData.domain}
                                </span>
                                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-[13px] ${hienKeData.status === 'Đã phản hồi' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                                    {hienKeData.status === 'Đã phản hồi' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {hienKeData.status}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-[28px] font-bold text-[#0f3b7d] mb-6 leading-tight">
                                {hienKeData.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-5 text-[14px] text-gray-500 font-medium mb-6 pb-6 border-b border-gray-100">
                                <span className="flex items-center gap-1.5"><User size={16} className="text-gray-400" /> {hienKeData.author}</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" /> {hienKeData.date}</span>
                                <span className="flex items-center gap-1.5"><Eye size={16} className="text-gray-400" /> {hienKeData.views.toLocaleString()} lượt xem</span>
                            </div>

                            <div className="prose max-w-none text-[15px] text-gray-800 whitespace-pre-line mb-8 leading-relaxed font-medium">
                                {/* Xử lý in đậm qua markdown cơ bản bằng css */}
                                <div dangerouslySetInnerHTML={{ __html: hienKeData.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>') }} />
                            </div>

                            {hienKeData.tags && hienKeData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4 mb-8">
                                    {hienKeData.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[13px] font-medium rounded-md transition-colors cursor-pointer">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Attachments */}
                            {hienKeData.attachments.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-[15px]">
                                        <BookOpen size={18} className="text-blue-600" /> Tài liệu đính kèm ({hienKeData.attachments.length})
                                    </h4>
                                    <ul className="flex flex-col gap-2">
                                        {hienKeData.attachments.map((file, idx) => (
                                            <li key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition group">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-blue-100 text-blue-600 p-2 rounded-md">
                                                        <FileText size={18} />
                                                    </span>
                                                    <span className="font-semibold text-[14px] text-gray-700 group-hover:text-blue-700 transition">{file.name}</span>
                                                    <span className="text-[12px] text-gray-400">({file.size})</span>
                                                </div>
                                                <button className="text-gray-500 hover:text-blue-600 bg-gray-200 hover:bg-blue-50 p-1.5 rounded transition" title="Tải xuống">
                                                    <Download size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                                <button onClick={() => setIsBookmarked(!isBookmarked)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition text-[14px] ${isBookmarked ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                    <Bookmark size={16} className={isBookmarked ? 'fill-amber-600' : ''} />
                                    {isBookmarked ? 'Đã lưu' : 'Lưu hiến kế'}
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition text-[14px]">
                                    <Share2 size={16} /> Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Answer Box */}
                    {hienKeData.status === 'Đã phản hồi' ? (
                        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden relative">
                            {/* Expert header */}
                            <div className="bg-gradient-to-r from-emerald-50/50 to-white border-b border-emerald-50 p-6 flex items-start gap-4">
                                <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-full flex justify-center items-center overflow-hidden shrink-0">
                                    <User size={28} className="text-emerald-600/70" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-[18px] font-bold text-gray-900">{answerData.expertName}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${answerData.expertType === 'Cơ quan nhà nước' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                            {answerData.expertType === 'Cơ quan nhà nước' ? <CheckCircle2 size={12} className="inline mr-1" /> : ''}
                                            {answerData.expertType}
                                        </span>
                                    </div>
                                    <p className="text-emerald-700 font-semibold mb-1 text-[13px]">{answerData.expertRole}</p>
                                    <p className="text-[12px] text-gray-500 flex items-center gap-1 font-medium"><Clock size={13} /> Phản hồi lúc: {answerData.date}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="prose max-w-none text-gray-800 text-[15px] whitespace-pre-line leading-relaxed font-medium">
                                    <div dangerouslySetInnerHTML={{ __html: answerData.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>') }} />
                                </div>

                                {/* Law references */}
                                {answerData.references.length > 0 && (
                                    <div className="mt-8 bg-amber-50/50 border border-amber-100 rounded-xl p-5">
                                        <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3 text-[14px]">
                                            <BookOpen size={16} /> Căn cứ đóng góp tham khảo
                                        </h4>
                                        <ul className="list-disc list-inside space-y-1 text-[13px] text-gray-700 font-medium">
                                            {answerData.references.map((ref, idx) => (
                                                <li key={idx}><a href="#" className="hover:text-blue-700 hover:underline">{ref}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Feedback Section */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8">
                                    <div className="text-gray-700 font-bold text-[14px]">
                                        Ý kiến phản hồi này có làm bạn hài lòng?
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleFeedback('like')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition shadow-sm text-[13px] ${hasLiked ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}>
                                            <ThumbsUp size={16} /> Hài lòng ({answerData.likes + (hasLiked ? 1 : 0)})
                                        </button>
                                        <button
                                            onClick={() => handleFeedback('dislike')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition shadow-sm text-[13px] ${hasDisliked ? 'bg-gray-500 text-white border-gray-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                                            <ThumbsDown size={16} /> Chưa hài lòng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-8 text-center">
                            <Clock size={40} className="mx-auto text-amber-400 mb-4" />
                            <h3 className="text-[18px] font-bold text-amber-800 mb-2">Đang chờ cơ quan tiếp nhận</h3>
                            <p className="text-[14px] text-amber-700/80 mb-6 max-w-md mx-auto">
                                Hiến kế của bạn đang được điều hướng đến cơ quan chủ quản thích hợp. Quá trình xét duyệt và phản hồi thường mất từ 5-10 ngày làm việc.
                            </p>
                            {!isBookmarked && (
                                <button onClick={() => setIsBookmarked(true)} className="bg-white text-[14px] text-amber-600 font-bold py-2.5 px-6 rounded-xl border border-amber-200 hover:bg-amber-100 transition shadow-sm inline-flex items-center gap-2">
                                    <Bookmark size={16} /> Theo dõi hiến kế
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/4 space-y-6">
                    {/* Related */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-[16px] text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                            Hiến kế liên quan
                        </h3>
                        <ul className="space-y-4">
                            {relatedIdeas.map((q) => (
                                <li key={q.id}>
                                    <Link to={`/hien-ke/${q.id}`} className="group block">
                                        <h4 className="font-bold text-gray-700 text-[14px] leading-snug group-hover:text-blue-700 transition line-clamp-2">
                                            {q.title}
                                        </h4>
                                        <span className="text-[12px] text-emerald-600 mt-1.5 block font-semibold">Đã phản hồi</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ask action */}
                    <div className="bg-gradient-to-br from-[#0f3b7d] to-blue-800 rounded-xl shadow-md p-6 text-white text-center">
                        <h3 className="font-bold text-[16px] mb-2">Bạn có ý tưởng cải tiến?</h3>
                        <p className="text-blue-100 text-[13px] mb-5 leading-relaxed">
                            Mỗi đóng góp của bạn đều giúp hoàn thiện hệ thống pháp luật và quản lý nhà nước hiệu quả hơn.
                        </p>
                        <Link to="/hien-ke/gop-y-nhanh" className="inline-block w-full bg-green-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-600 transition shadow-sm text-[14px]">
                            <Send size={15} className="inline mr-1" /> Gửi hiến kế mới
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HienKeDetailPage;

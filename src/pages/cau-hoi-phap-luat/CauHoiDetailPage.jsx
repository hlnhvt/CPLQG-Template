import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, User, Eye, ThumbsUp, ThumbsDown, Share2, Download, MessageSquare, PlayCircle, BookOpen, AlertCircle, Bookmark, CheckCircle2, FileText } from 'lucide-react';

const CauHoiDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);

    // Mock data based on SRS 68
    const questionData = {
        title: 'Quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở nông thôn',
        domain: 'Đất đai - Nhà ở',
        status: 'Đã trả lời',
        author: 'Nguyễn Văn A',
        date: '11:09 17/03/2026',
        views: 1250,
        content: `Gia đình tôi có mảnh đất ở nông thôn diện tích 500m2 (trong đó có 200m2 đất ở, 300m2 đất vườn) đang bị thu hồi để làm đường công cộng. Do mức giá đền bù mà chính quyền địa phương đưa ra hiện tại thấp hơn nhiều so với giá thị trường, tôi muốn hỏi chuyên gia về:
        
1. Căn cứ pháp lý xác định giá đất cụ thể để tính bồi thường khi nhà nước thu hồi đất điểm này?
2. Gia đình tôi có được bố trí tái định cư không (nhà tôi hiện tại đang ở trên mảnh đất bị thu hồi và không có chỗ ở nào khác trong xã)?
3. Đối với phần đất vườn thì giá đền bù được tính như thế nào? Cây cối hoa màu trên đất có được bồi thường không?
        
Mong sớm nhận được tư vấn. Tôi xin cảm ơn!`,
        attachments: [
            { name: 'Giay_chung_nhan_QSD_dat.pdf', size: '2.5 MB' },
            { name: 'Thong_bao_thu_hoi_dat.jpg', size: '1.2 MB' }
        ]
    };

    const answerData = {
        expertName: 'Ls. Hoàng Ngọc Cường',
        expertRole: 'Luật sư - Đoàn Luật sư TP. Hà Nội',
        date: '09:30 19/03/2026',
        likes: 450,
        content: `Chào bạn Nguyễn Văn A,
        
Cảm ơn bạn đã gửi câu hỏi đến Cổng thông tin. Về vấn đề thu hồi đất và bồi thường giải phóng mặt bằng, tôi xin được tư vấn cụ thể như sau:

**1. Về căn cứ pháp lý xác định giá đất bồi thường**
Căn cứ khoản 2 Điều 74 Luật Đất đai 2013, việc bồi thường bằng đất việc bồi thường được thực hiện bằng việc giao đất có cùng mục đích sử dụng với loại đất thu hồi, nếu không có đất để bồi thường thì được bồi thường bằng tiền theo **giá đất cụ thể** của loại đất thu hồi do Ủy ban nhân dân cấp tỉnh quyết định tại thời điểm quyết định thu hồi đất.
Giá đất cụ thể không phải là bảng giá đất hàng năm mà là giá được Hội đồng thẩm định giá của tỉnh đưa ra dựa trên việc khảo sát thực tế để đảo bảo sát với giá thị trường tại điều kiện bình thường.

**2. Về vấn đề tái định cư**
Theo khoản 1 Điều 79 Luật Đất đai 2013 và Điều 6 Nghị định 47/2014/NĐ-CP, hộ gia đình bị thu hồi đất ở nếu phải di chuyển chỗ ở và **không có chỗ ở nào khác** trên địa bàn xã, phường, thị trấn thì sẽ được nhà nước bố trí tái định cư (bằng đất hoặc bằng nhà ở). Như vậy, gia đình bạn hoàn toàn đủ điều kiện được xét giao suất tái định cư.

**3. Về đền bù đất vườn và hoa màu**
- Phần đất vườn (300m2) sẽ được đền bù theo khung giá đất nông nghiệp (chồng cây lâu năm/hàng năm) tại vị trí đó.
- Cây cối hoa màu, tài sản tạo lập hợp pháp trên đất sẽ được bồi thường 100% giá trị hiện có theo quy định tại Điều 90 Luật Đất đai. Đơn giá bồi thường cây cối sẽ do UBND tỉnh ban hành áp dụng cho địa phương.

Nếu chính quyền địa phương áp giá đền bù chưa thỏa đáng hoặc bạn phát hiện sai sót trong quá trình kiểm đếm, bạn có quyền làm đơn khiếu nại (lần đầu) gửi Chủ tịch UBND cấp huyện nơi ra quyết định thu hồi đất để được giải quyết theo quy định.`,
        references: ['Luật Đất đai 2013 (Điều 74, 79, 90)', 'Nghị định 47/2014/NĐ-CP (Điều 6)'],
        attachments: []
    };

    const relatedQuestions = [
        { id: 2, title: 'Thu hồi đất đang tranh chấp có được bồi thường không?' },
        { id: 3, title: 'Điều kiện cấp sổ đỏ lần đầu cho đất lấn chiếm trước 1993' },
        { id: 4, title: 'Tranh chấp ranh giới đất đai với hàng xóm giải quyết thế nào?' }
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
            <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-2">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span>/</span>
                        <Link to="/cau-hoi-phap-luat" className="hover:text-[#0f4c81]">Hỏi đáp pháp luật</Link>
                        <span>/</span>
                        <span className="text-[#0f4c81] font-bold line-clamp-1 flex-1">Chi tiết câu hỏi</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 align-start">

                {/* Main Content Area */}
                <div className="lg:w-3/4 space-y-6">
                    {/* Question Box */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                                    {questionData.domain}
                                </span>
                                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-sm ${questionData.status === 'Đã trả lời' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                                    {questionData.status === 'Đã trả lời' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {questionData.status}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] mb-6 leading-tight">
                                {questionData.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium mb-6 pb-6 border-b border-gray-100">
                                <span className="flex items-center gap-1.5"><User size={16} /> {questionData.author}</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} /> {questionData.date}</span>
                                <span className="flex items-center gap-1.5"><Eye size={16} /> {questionData.views} lượt xem</span>
                            </div>

                            <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-8 leading-relaxed font-medium">
                                {questionData.content}
                            </div>

                            {/* Attachments */}
                            {questionData.attachments.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        <BookOpen size={18} className="text-[#0f4c81]" /> Tài liệu đính kèm ({questionData.attachments.length})
                                    </h4>
                                    <ul className="flex flex-col gap-2">
                                        {questionData.attachments.map((file, idx) => (
                                            <li key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition group">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-blue-100 text-blue-600 p-2 rounded-md">
                                                        <FileText size={18} />
                                                    </span>
                                                    <span className="font-medium text-gray-700 group-hover:text-[#0f4c81] transition">{file.name}</span>
                                                    <span className="text-xs text-gray-400">({file.size})</span>
                                                </div>
                                                <button className="text-gray-500 hover:text-[#0f4c81] bg-gray-200 hover:bg-blue-50 p-1.5 rounded transition" title="Tải xuống">
                                                    <Download size={18} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Question Actions */}
                            <div className="flex flex-wrap items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                <button onClick={() => setIsBookmarked(!isBookmarked)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition ${isBookmarked ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                    <Bookmark size={18} className={isBookmarked ? 'fill-amber-600' : ''} />
                                    {isBookmarked ? 'Đã lưu' : 'Lưu câu hỏi'}
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition">
                                    <Share2 size={18} /> Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Answer Box */}
                    {questionData.status === 'Đã trả lời' ? (
                        <div className="bg-white rounded-xl shadow-sm border-2 border-[#0f4c81]/10 overflow-hidden relative">
                            {/* Expert header */}
                            <div className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 p-6 flex items-start gap-4">
                                <div className="w-16 h-16 bg-white border-2 border-white shadow-md rounded-full flex justify-center items-center overflow-hidden shrink-0">
                                    <User size={32} className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0f4c81]">{answerData.expertName}</h3>
                                    <p className="text-gray-600 font-medium mb-1">{answerData.expertRole}</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1"><Clock size={14} /> Trả lời lúc: {answerData.date}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed font-medium">
                                    {/* Mock markdown rendering style */}
                                    <div dangerouslySetInnerHTML={{ __html: answerData.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#0f4c81] font-bold">$1</strong>') }} />
                                </div>

                                {/* Law references */}
                                {answerData.references.length > 0 && (
                                    <div className="mt-8 bg-amber-50/50 border border-amber-100 rounded-xl p-5">
                                        <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                                            <BookOpen size={18} /> Căn cứ pháp lý áp dụng
                                        </h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 font-medium">
                                            {answerData.references.map((ref, idx) => (
                                                <li key={idx}><a href="#" className="hover:text-[#0f4c81] hover:underline">{ref}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Feedback Section */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 -mx-6 -mb-6 p-6">
                                    <div className="text-gray-600 font-bold">
                                        Câu trả lời này có hữu ích với bạn không?
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleFeedback('like')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition shadow-sm ${hasLiked ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}>
                                            <ThumbsUp size={18} /> Hữu ích ({answerData.likes + (hasLiked ? 1 : 0)})
                                        </button>
                                        <button
                                            onClick={() => handleFeedback('dislike')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition shadow-sm ${hasDisliked ? 'bg-gray-500 text-white border-gray-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                                            <ThumbsDown size={18} /> Không
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-8 text-center">
                            <Clock size={48} className="mx-auto text-amber-400 mb-4" />
                            <h3 className="text-xl font-bold text-amber-800 mb-2">Đang chờ chuyên gia phản hồi</h3>
                            <p className="text-amber-700/80 mb-6 max-w-md mx-auto">
                                Câu hỏi của bạn đã được tiếp nhận và phân công. Dự kiến sẽ có câu trả lời trong vòng 3-5 ngày làm việc.
                            </p>
                            {!isBookmarked && (
                                <button onClick={() => setIsBookmarked(true)} className="bg-white text-amber-600 font-bold py-2.5 px-6 rounded-lg border border-amber-200 hover:bg-amber-100 transition shadow-sm inline-flex items-center gap-2">
                                    <Bookmark size={18} /> Theo dõi câu hỏi
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/4 space-y-6">
                    {/* Related Questions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-lg text-[#0f4c81] border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                            <BookOpen size={20} className="text-blue-500" /> Câu hỏi liên quan
                        </h3>
                        <ul className="space-y-4">
                            {relatedQuestions.map((q) => (
                                <li key={q.id}>
                                    <Link to={`/cau-hoi-phap-luat/${q.id}`} className="group block">
                                        <h4 className="font-bold text-gray-700 text-sm leading-snug group-hover:text-[#0f4c81] transition line-clamp-2">
                                            {q.title}
                                        </h4>
                                        <span className="text-xs text-emerald-600 mt-1 block">Đã trả lời</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ask action */}
                    <div className="bg-gradient-to-br from-[#0f4c81] to-blue-700 rounded-xl shadow-md p-6 text-white text-center">
                        <h3 className="font-bold text-lg mb-2">Chưa tìm được câu trả lời?</h3>
                        <p className="text-blue-100 text-sm mb-5">
                            Gửi câu hỏi của chính bạn để các chuyên gia pháp lý của hệ thống giải đáp.
                        </p>
                        <button className="bg-white text-[#0f4c81] font-bold py-2.5 px-6 rounded-lg hover:bg-blue-50 transition w-full shadow-sm">
                            Đặt câu hỏi ngay
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CauHoiDetailPage;

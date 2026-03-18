import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Clock, FileText, CheckCircle2, Download, Send, AlertCircle } from 'lucide-react';

const CauHoiCaNhanDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data with a thread (hỏi lại)
    const threadData = {
        code: 'CH-2026-00123',
        status: 'Đã trả lời',
        title: 'Quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở nông thôn',
        originalQuestion: {
            content: 'Gia đình tôi có mảnh đất ở nông thôn diện tích 500m2 đang bị thu hồi để làm đường công cộng. Do mức giá đền bù mà chính quyền địa phương đưa ra hiện tại thấp hơn nhiều so với giá thị trường, tôi muốn hỏi chuyên gia về căn cứ pháp lý xác định giá đất cụ thể để tính bồi thường nhà nước thu hồi đất điểm này?',
            date: '11:09 17/03/2026',
            attachments: [{ name: 'ThongBaoThuHoi.pdf', size: '1.2MB' }]
        },
        expert: {
            name: 'Ls. Hoàng Ngọc Cường',
            role: 'Luật sư tư vấn',
        },
        responses: [
            {
                type: 'expert',
                date: '09:30 19/03/2026',
                content: 'Chào bạn,\n\nCăn cứ khoản 2 Điều 74 Luật Đất đai 2013, việc bồi thường được thực hiện bằng việc giao đất có cùng mục đích sử dụng với loại đất thu hồi, nếu không có đất để bồi thường thì được bồi thường bằng tiền theo **giá đất cụ thể** của loại đất thu hồi do Ủy ban nhân dân cấp tỉnh quyết định tại thời điểm thu hồi.\n\nGiá đất cụ thể được Hội đồng thẩm định giá của tỉnh đưa ra dựa trên việc khảo sát thực tế. Nếu bạn không đồng ý với giá này, bạn có quyền khiếu nại quyết định bồi thường (lần đầu) tới Chủ tịch UBND cấp huyện.'
            },
            {
                type: 'user',
                date: '14:15 19/03/2026',
                content: 'Xin Cảm ơn Luật sư. Cho tôi hỏi thêm là thủ tục nộp đơn khiếu nại thì nộp ở bộ phận nào của huyện? Có cần biểu mẫu quy định sẵn không ạ?'
            },
            {
                type: 'expert',
                date: '10:00 20/03/2026',
                content: 'Chào bạn,\n\nĐơn khiếu nại bạn nộp tại **Bộ phận tiếp công dân** hoặc **Phòng Tài nguyên - Môi trường** của UBND cấp Huyện. Bạn có thể sử dụng biểu mẫu Đơn khiếu nại mẫu số 01 ban hành kèm Nghị định 124/2020/NĐ-CP để việt khiếu nại được xử lý nhanh nhất.'
            }
        ]
    };

    const [replyText, setReplyText] = useState('');
    const [responses, setResponses] = useState(threadData.responses);

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newResponse = {
            type: 'user',
            date: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
            content: replyText
        };

        setResponses([...responses, newResponse]);
        setReplyText('');
    };

    const handleCloseThread = () => {
        if (window.confirm('Bạn có chắc chắn muốn Đóng câu hỏi này? Sau khi đóng bạn sẽ không thể hỏi thêm.')) {
            // Mock closing
            alert('Câu hỏi đã được đánh dấu giải quyết và Đóng.');
            navigate('/ca-nhan/cau-hoi-ca-nhan');
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <button onClick={() => navigate('/ca-nhan/cau-hoi-ca-nhan')} className="flex items-center text-[#0f4c81] font-bold hover:underline transition">
                        <ChevronLeft size={20} /> Quay lại Danh sách Quản lý câu hỏi pháp luật
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-t-xl shadow-sm border border-gray-100 p-6 md:p-8 flex items-start justify-between gap-4 border-b-0">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-gray-100 border border-gray-200 text-gray-600 font-mono font-bold px-3 py-1 rounded-md text-sm">{threadData.code}</span>
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-3 py-1 rounded-md text-sm flex items-center gap-1">
                                <CheckCircle2 size={16} /> {threadData.status}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] leading-tight">
                            {threadData.title}
                        </h1>
                    </div>
                </div>

                {/* Original Question */}
                <div className="bg-white shadow-sm border border-gray-100 p-6 md:p-8 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><FileText size={100} /></div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 font-bold mb-4 uppercase tracking-wider">
                        <User size={16} /> NỘI DUNG BẠN ĐÃ GỬI
                        <span className="mx-2 font-normal text-gray-300">|</span>
                        <Clock size={16} /> {threadData.originalQuestion.date}
                    </div>

                    <div className="prose max-w-none text-gray-700 whitespace-pre-line relative z-10 font-medium leading-relaxed">
                        {threadData.originalQuestion.content}
                    </div>

                    {threadData.originalQuestion.attachments.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3 relative z-10">
                            {threadData.originalQuestion.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                                    <FileText size={16} className="text-[#0f4c81]" />
                                    <span className="font-medium text-gray-600">{file.name}</span>
                                    <button className="text-blue-600 hover:text-blue-800 ml-2" title="Tải xuống"><Download size={16} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Thread / Conversation */}
                <div className="mt-6 space-y-6">
                    {responses.map((res, idx) => {
                        const isExpert = res.type === 'expert';
                        return (
                            <div key={idx} className={`flex gap-4 ${isExpert ? '' : 'flex-row-reverse'}`}>
                                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${isExpert ? 'bg-[#0f4c81] text-white' : 'bg-green-100 text-green-700'}`}>
                                    {isExpert ? 'LS' : 'T'}
                                </div>
                                <div className={`flex flex-col ${isExpert ? 'items-start' : 'items-end'} max-w-[85%]`}>
                                    <div className="flex items-baseline gap-2 mb-1 px-1">
                                        <span className="font-bold text-gray-800">{isExpert ? threadData.expert.name : 'Bạn'}</span>
                                        <span className="text-xs text-gray-500">{res.date}</span>
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm border font-medium leading-relaxed whitespace-pre-line text-[15px] ${isExpert ? 'bg-white border-blue-100 text-gray-800 rounded-tl-sm' : 'bg-emerald-50 border-emerald-100 text-emerald-900 rounded-tr-sm'
                                        }`}>
                                        <div dangerouslySetInnerHTML={{ __html: res.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Reply Form */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-blue-50/50 p-4 border-b border-gray-100 flex items-center gap-2 text-blue-800 font-bold text-sm">
                        <AlertCircle size={18} /> Bạn có thể tiếp tục trao đổi để làm rõ vấn đề (tối đa 5 lượt hỏi thêm).
                    </div>
                    <form onSubmit={handleSendReply} className="p-6">
                        <textarea
                            required
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Nhập nội dung hỏi thêm / làm rõ tại đây..."
                            className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#0f4c81] resize-none mb-4 transition"
                            rows={3}
                            maxLength={1000}
                        ></textarea>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-medium">{replyText.length}/1000 ký tự</span>
                            <div className="flex gap-3">
                                <button type="button" onClick={handleCloseThread} className="px-6 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition">
                                    Đánh dấu Đã giải quyết (Đóng)
                                </button>
                                <button type="submit" disabled={!replyText.trim()} className="px-6 py-2.5 bg-[#0f4c81] text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Send size={18} /> Gửi cho chuyên gia
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CauHoiCaNhanDetailPage;

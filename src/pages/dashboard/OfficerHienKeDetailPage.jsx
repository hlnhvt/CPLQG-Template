import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, Send, Save, Trash2, Bold, Italic, Underline,
    List, ListOrdered, Link2, ExternalLink, FileText,
    User, Clock, Tag, AlertCircle, CheckCircle2, X, MessageSquare
} from 'lucide-react';

const MOCK_DETAIL_HIEN_KE = {
    'hk-101': {
        id: 'hk-101',
        title: "Đề xuất ứng dụng Blockchain trong quản lý hộ tịch",
        author: "Lê Văn Tám",
        email: "levantam@email.com",
        phone: "0901234567",
        domain: "Công nghệ thông tin",
        status: 'Chờ phản hồi',
        date: "12/04/2026",
        urgency: 'Cao',
        content: `
            <p>Hiện nay, việc quản lý dữ liệu hộ tịch (khai sinh, khai tử, kết hôn) vẫn còn phụ thuộc nhiều vào các cơ sở dữ liệu tập trung, dễ xảy ra tình trạng sai sót hoặc bị can thiệp trái phép. Tôi đề xuất ứng dụng công nghệ Blockchain (Chuỗi khối) vào hạ tầng Công nghệ thông tin của ngành Tư pháp.</p>
            <p><strong>Lợi ích mong đợi:</strong></p>
            <ul>
                <li>Đảm bảo tính bất biến của thông tin hộ tịch sau khi đã được xác nhận.</li>
                <li>Cho phép các cơ quan liên quan (Công an, Y tế, BHXH) truy xuất dữ liệu nhanh chóng mà không cần qua nhiều thủ tục trung gian.</li>
                <li>Người dân có thể tự kiểm tra tình trạng hồ sơ của mình một cách minh bạch.</li>
            </ul>
            <p>Rất mong quý Cục xem xét tính khả thi của đề án này.</p>
        `,
        attachments: [
            { name: "De_an_Blockchain_Tu_phap_v1.pdf", size: "2.4 MB" },
            { name: "Sơ_đồ_kiến_trúc_hệ_thống.png", size: "1.1 MB" }
        ]
    },
    'hk-102': {
        id: 'hk-102',
        title: "Số hóa quy trình thẩm định văn bản pháp luật",
        author: "Trần Thị Hoa",
        email: "tranhoatp@email.com",
        phone: "0912345678",
        domain: "Cải cách hành chính",
        status: 'Đang xử lý',
        date: "10/04/2026",
        urgency: 'Trung bình',
        content: "<p>Nội dung đề xuất số hóa quy trình thẩm định văn bản để rút ngắn thời gian xử lý thủ tục hành chính...</p>",
        attachments: []
    }
};

const OfficerHienKeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Safety check for data
    const hienKe = MOCK_DETAIL_HIEN_KE[id] || MOCK_DETAIL_HIEN_KE['hk-101'];

    const [isResponding, setIsResponding] = useState(false);
    const [responseContent, setResponseContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const editorRef = useRef(null);

    // Ensure we have data before rendering complex parts
    if (!hienKe) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

    const handleFormat = (command) => {
        document.execCommand(command, false, null);
        if (editorRef.current) {
            setResponseContent(editorRef.current.innerHTML);
        }
    };

    const handleSubmitResponse = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Đã gửi phản hồi thành công!');
            navigate('/can-bo/phan-hoi-hien-ke');
        }, 1500);
    };

    return (
        <div className="animate-fadeIn pb-20">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/can-bo/phan-hoi-hien-ke')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 leading-tight">Phản hồi hiến kế</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                            <div className="flex flex-col gap-3 mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 w-fit shadow-sm">
                                    <span className="text-[11px] font-bold uppercase tracking-tight opacity-70">Mã hiến kế:</span>
                                    <span className="text-sm font-black tracking-wider">#{hienKe.id}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                    {hienKe.title}
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm font-medium">
                                <div className="flex items-center gap-2 text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-100 italic">
                                    <Tag size={16} className="text-blue-500" /> {hienKe.domain}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Clock size={16} className="text-gray-400" /> {hienKe.date}
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div
                                className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: hienKe.content }}
                            />

                            {hienKe.attachments && hienKe.attachments.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                                        <FileText size={18} className="text-blue-600" /> Tài liệu đính kèm ({hienKe.attachments.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {hienKe.attachments.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group hover:border-blue-300 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded border border-gray-200 flex items-center justify-center text-blue-600 shadow-sm">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                                                        <p className="text-[11px] text-gray-500">{file.size}</p>
                                                    </div>
                                                </div>
                                                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <ExternalLink size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden border-t-4 border-t-blue-600">
                        {!isResponding ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Hiến kế này đang chờ bạn phản hồi</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">
                                    Vui lòng nghiên cứu kỹ nội dung đề xuất trước khi gửi phản hồi chính thức cho người dân.
                                </p>
                                <button
                                    onClick={() => setIsResponding(true)}
                                    className="px-8 py-3 bg-[#0f4c81] text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-md flex items-center gap-2 mx-auto"
                                >
                                    <Send size={18} /> Bắt đầu phản hồi ngay
                                </button>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <CheckCircle2 size={24} className="text-emerald-500" /> Soạn thảo phản hồi chính thức
                                    </h3>
                                    <button
                                        onClick={() => setIsResponding(false)}
                                        className="text-gray-400 hover:text-rose-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-t-lg">
                                    <button onClick={() => handleFormat('bold')} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded transition-all"><Bold size={18} /></button>
                                    <button onClick={() => handleFormat('italic')} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded transition-all"><Italic size={18} /></button>
                                    <button onClick={() => handleFormat('underline')} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded transition-all"><Underline size={18} /></button>
                                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                    <button onClick={() => handleFormat('insertUnorderedList')} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded transition-all"><List size={18} /></button>
                                    <button onClick={() => handleFormat('insertOrderedList')} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded transition-all"><ListOrdered size={18} /></button>
                                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                    <button onClick={() => handleFormat('createLink')} className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 rounded transition-all"><Link2 size={18} /></button>
                                </div>

                                <div
                                    ref={editorRef}
                                    contentEditable={true}
                                    onInput={(e) => setResponseContent(e.currentTarget.innerHTML)}
                                    className="min-h-[300px] p-6 border border-t-0 border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white prose prose-blue max-w-none"
                                    suppressContentEditableWarning={true}
                                    dangerouslySetInnerHTML={{ __html: responseContent || '<p><br></p>' }}
                                />

                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-xs text-gray-400 italic">
                                        Sau khi nhấn Gửi, phản hồi sẽ được công khai và thông báo tới người gửi hiến kế.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <button className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors whitespace-nowrap">
                                            <Save size={16} className="inline mr-2" /> Lưu nháp
                                        </button>
                                        <button
                                            onClick={handleSubmitResponse}
                                            disabled={isSaving || !responseContent || responseContent === '<p><br></p>'}
                                            className="px-8 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {isSaving ? 'Đang gửi...' : <><Send size={16} /> Gửi phản hồi chính thức</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-6 pb-2 border-b border-gray-100">
                            Thông tin người gửi
                        </h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{hienKe.author}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Công dân đã xác minh</p>
                                </div>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-gray-400 uppercase font-bold">Email</span>
                                    <span className="text-sm font-medium text-gray-700">{hienKe.email}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-gray-400 uppercase font-bold">Điện thoại</span>
                                    <span className="text-sm font-medium text-gray-700">{hienKe.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-6 pb-2 border-b border-gray-100">
                            Trạng thái xử lý
                        </h3>
                        <div className="space-y-6">
                            <div className="relative pl-8 border-l-2 border-dashed border-gray-200 pb-2">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                                <p className="text-[13px] font-bold text-gray-900 leading-tight">Gửi hiến kế thành công</p>
                                <p className="text-[11px] text-gray-500 mt-1">{hienKe.date}</p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-dashed border-gray-200 pb-2">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                                <p className="text-[13px] font-bold text-gray-900 leading-tight">Quản trị viên đã phê duyệt nội dung</p>
                                <p className="text-[11px] text-gray-500 mt-1">13/04/2026</p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-dashed border-gray-200 pb-2">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                                <p className="text-[13px] font-bold text-blue-800 leading-tight">Chờ đơn vị công tác phản hồi</p>
                                <p className="text-[11px] text-blue-500 mt-1">Hôm nay</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficerHienKeDetailPage;

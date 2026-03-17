import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Download, CheckCircle, FileText, Scale, MessageSquare, ListTodo, LogIn, FileEdit, Send, Activity, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PhanAnhKienNghiGuidePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const handleSendFeedbackClick = () => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/phan-anh-kien-nghi/tao-moi' } });
        } else {
            navigate('/phan-anh-kien-nghi/tao-moi');
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "Ai có quyền gửi phản ánh, kiến nghị?",
            a: "Tất cả công dân, doanh nghiệp, tổ chức đều có quyền gửi phản ánh, kiến nghị về các quy định hành chính, chính sách, pháp luật qua Cổng."
        },
        {
            q: "Thời gian xử lý phản ánh kiến nghị là bao lâu?",
            a: "Thời hạn xử lý và trả lời PAKN chung là không quá 20 ngày kể từ ngày nhận được PAKN hợp lệ. Trường hợp phức tạp có thể kéo dài nhưng không quá 60 ngày."
        },
        {
            q: "Tôi có thể theo dõi tiến trình xử lý ở đâu?",
            a: "Sau khi gửi thành công, bạn sẽ nhận được một Mã theo dõi. Bạn có thể dùng mã này để truy cập vào mục Tra cứu phản ánh để xem tiến trình và kết quả xử lý."
        }
    ];

    const forms = [
        { name: "BM01 - Mẫu phiếu phản ánh, kiến nghị (Dành cho cá nhân)", ext: "DOCX", size: "24 KB" },
        { name: "BM02 - Mẫu đề xuất sửa đổi văn bản (Dành cho tổ chức, doanh nghiệp)", ext: "DOCX", size: "30 KB" },
        { name: "BM03 - Phụ lục đính kèm tài liệu", ext: "PDF", size: "150 KB" }
    ];

    const legalDocs = [
        { id: "1", number: "Nghị định 20/2008/NĐ-CP", name: "Quy định về tiếp nhận, xử lý phản ánh, kiến nghị của cá nhân, tổ chức về quy định hành chính" },
        { id: "2", number: "Thông tư 02/2017/TT-VPCP", name: "Hướng dẫn về nghiệp vụ tiếp nhận, phân loại, xử lý phản ánh, kiến nghị" }
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/phan-anh-kien-nghi" className="hover:text-[#0f4c81]">Phản ánh kiến nghị</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Hướng dẫn</span>
                    </div>
                </div>
            </div>

            {/* Header Area */}
            <div className="bg-[#0f4c81] text-white py-12">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Hướng dẫn phản ánh, kiến nghị</h1>
                    <p className="text-blue-100 text-lg">
                        Hướng dẫn người dân, doanh nghiệp gửi phản ánh, kiến nghị về chính sách, 
                        văn bản pháp luật tới cơ quan nhà nước có thẩm quyền.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-5xl">
                {/* Process Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-100 p-2 rounded-lg text-[#0f4c81]">
                            <ListTodo size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Quy trình phản ánh kiến nghị</h2>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-blue-100 z-0"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center mb-4 shadow-sm text-[#0f4c81] relative">
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">1</div>
                                    <LogIn size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">Đăng nhập hệ thống</h3>
                                <p className="text-sm text-gray-600">Sử dụng tài khoản VNeID hoặc tài khoản Cổng DVCQG để xác thực.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center mb-4 shadow-sm text-[#0f4c81] relative">
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">2</div>
                                    <FileEdit size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">Điền thông tin</h3>
                                <p className="text-sm text-gray-600">Nhập nội dung phản ánh, chọn cơ quan tiếp nhận và đính kèm tài liệu.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center mb-4 shadow-sm text-[#0f4c81] relative">
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">3</div>
                                    <Send size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">Gửi & Nhận mã</h3>
                                <p className="text-sm text-gray-600">Gửi phản ánh và nhận Mã theo dõi. Xin lưu trữ lại mã này.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center mb-4 shadow-sm text-emerald-600 relative">
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                                    <Activity size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">Theo dõi kết quả</h3>
                                <p className="text-sm text-gray-600">Dùng mã để tra cứu hoặc theo dõi ở mục hồ sơ cá nhân.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Legal Basics */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-lg text-[#0f4c81]">
                                <Scale size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Căn cứ pháp lý</h2>
                        </div>
                        <ul className="space-y-4">
                            {legalDocs.map((doc, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <CheckCircle size={20} className="text-[#0f4c81] shrink-0 mt-0.5" />
                                    <div>
                                        <Link to={`/van-ban/${doc.id}`} className="font-bold text-[#0f4c81] hover:underline block mb-1">
                                            {doc.number}
                                        </Link>
                                        <p className="text-sm text-gray-600">{doc.name}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Forms to download */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-lg text-[#0f4c81]">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Biểu mẫu liên quan</h2>
                        </div>
                        <ul className="space-y-3">
                            {forms.map((form, idx) => (
                                <li key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`p-2 rounded text-xs font-bold ${form.ext === 'PDF' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {form.ext}
                                        </div>
                                        <div className="truncate">
                                            <p className="text-sm font-medium text-gray-800 truncate" title={form.name}>{form.name}</p>
                                            <p className="text-xs text-gray-500">{form.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-[#0f4c81] hover:bg-blue-50 p-2 rounded-full transition" title="Tải về">
                                        <Download size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg text-[#0f4c81]">
                            <MessageSquare size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Câu hỏi thường gặp (FAQ)</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button 
                                    className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-50 bg-white focus:outline-none"
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <span>{faq.q}</span>
                                    {openFaq === idx ? <ChevronUp size={20} className="text-gray-500 shrink-0" /> : <ChevronDown size={20} className="text-gray-500 shrink-0" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-gray-600 text-sm leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-[#0f4c81] to-[#1b64aa] rounded-2xl shadow-lg p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Sẵn sàng phản ánh, kiến nghị?</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Hãy đóng góp ý kiến để hoàn thiện chính sách, pháp luật, bảo đảm quyền và lợi ích hợp pháp của người dân, doanh nghiệp.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button 
                                onClick={handleSendFeedbackClick}
                                className="bg-white text-[#0f4c81] font-bold py-3 px-8 rounded-full hover:bg-blue-50 hover:shadow-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                Gửi phản ánh kiến nghị ngay <ArrowRight size={20} />
                            </button>
                            
                            <Link 
                                to="/phan-anh-kien-nghi" 
                                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all w-full sm:w-auto justify-center flex"
                            >
                                Xem danh sách phản ánh
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PhanAnhKienNghiGuidePage;

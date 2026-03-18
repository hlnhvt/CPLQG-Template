import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Clock, CheckCircle2, AlertCircle, PlusCircle, Search, Eye, Filter, Settings, FileText, ChevronRight, User, Calendar } from 'lucide-react';

const MOCK_PERSONAL_QUESTIONS = [
    { id: '1', code: 'CH-2026-00123', title: 'Quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở nông thôn', status: 'Đã trả lời', domain: 'Đất đai', submittedDate: '17/03/2026', answeredDate: '19/03/2026', hasUnreadReply: true, summary: 'Gia đình tôi có mảnh đất ở nông thôn diện tích 500m2 đang bị thu hồi để làm đường...', answerSummary: 'Căn cứ khoản 2 Điều 74 Luật Đất đai 2013, việc bồi thường được thực hiện bằng...' },
    { id: '5', code: 'CH-2026-00456', title: 'Xử lý kỷ luật lao động đối với nhân viên tự ý nghỉ việc', status: 'Chờ trả lời', domain: 'Lao động', submittedDate: '18/03/2026', answeredDate: null, hasUnreadReply: false, summary: 'Công ty tôi có trường hợp nhân viên tự ý nghỉ việc 5 ngày không phép...', answerSummary: null },
    { id: '7', code: 'CH-2026-00089', title: 'Thủ tục đăng ký kinh doanh hộ cá thể tại nhà', status: 'Đã đóng', domain: 'Doanh nghiệp', submittedDate: '10/02/2026', answeredDate: '12/02/2026', hasUnreadReply: false, summary: 'Tôi muốn mở một cửa hàng tạp hóa tại nhà thì thủ tục như thế nào...', answerSummary: 'Bạn cần chuẩn bị hồ sơ gồm: Giấy đề nghị đăng ký hộ kinh doanh, Bản sao CMND/CCCD...' }
];

const DanhSachCauHoiCaNhanPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

    // Stats
    const total = MOCK_PERSONAL_QUESTIONS.length;
    const pending = MOCK_PERSONAL_QUESTIONS.filter(q => q.status === 'Chờ trả lời').length;
    const answered = MOCK_PERSONAL_QUESTIONS.filter(q => q.status === 'Đã trả lời').length;
    const unread = MOCK_PERSONAL_QUESTIONS.filter(q => q.hasUnreadReply).length;

    const filteredQuestions = MOCK_PERSONAL_QUESTIONS.filter(q => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return q.status === 'Chờ trả lời';
        if (activeTab === 'answered') return q.status === 'Đã trả lời';
        if (activeTab === 'closed') return q.status === 'Đã đóng';
        return true;
    });

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-2">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span>/</span>
                        <Link to="/ca-nhan/trang-chu" className="hover:text-[#0f4c81]">Trang cá nhân</Link>
                        <span>/</span>
                        <span className="text-[#0f4c81] font-bold line-clamp-1 flex-1">Quản lý câu hỏi pháp luật</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar removed as it's now handled by UserDashboardLayout */}


                {/* Main Content */}
                <div className="w-full space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h1 className="text-3xl font-bold text-[#0f4c81]">Quản lý Câu hỏi pháp luật</h1>
                        <Link to="/cau-hoi-phap-luat" className="bg-[#0f4c81] text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition font-bold shadow-md flex items-center gap-2">
                            <PlusCircle size={20} /> Đặt câu hỏi mới
                        </Link>
                    </div>

                    {/* Stats */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold mb-1">Tổng số</p>
                                <p className="text-2xl font-black text-[#0f4c81]">{total}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-5 flex items-center gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-100 to-transparent opacity-50"></div>
                            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 relative z-10">
                                <Clock size={24} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm text-gray-500 font-bold mb-1">Chờ trả lời</p>
                                <p className="text-2xl font-black text-amber-600">{pending}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-5 flex items-center gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-100 to-transparent opacity-50"></div>
                            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 relative z-10">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm text-gray-500 font-bold mb-1">Đã trả lời</p>
                                <p className="text-2xl font-black text-emerald-600">{answered}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-5 flex items-center gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-100 to-transparent opacity-50"></div>
                            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 relative z-10">
                                <AlertCircle size={24} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm text-red-400 font-bold mb-1">Chưa đọc</p>
                                <p className="text-2xl font-black text-red-600">{unread}</p>
                            </div>
                        </div>
                    </div> */}

                    {/* Filter & List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-100 bg-gray-50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex gap-2 p-1 bg-gray-200/50 rounded-lg">
                                    <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'all' ? 'bg-white shadow text-[#0f4c81]' : 'text-gray-500 hover:text-gray-700'}`}>Tất cả ({total})</button>
                                    <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'pending' ? 'bg-white shadow text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}>Chờ trả lời ({pending})</button>
                                    <button onClick={() => setActiveTab('answered')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'answered' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}>Đã trả lời ({answered})</button>
                                </div>
                                <div className="flex gap-3">
                                    <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm font-medium outline-none focus:border-[#0f4c81]">
                                        <option>Tất cả lĩnh vực</option>
                                        <option>Đất đai</option>
                                        <option>Lao động</option>
                                    </select>
                                    <div className="relative">
                                        <input type="text" placeholder="Tìm kiếm..." className="border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm outline-none focus:border-[#0f4c81]" />
                                        <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {filteredQuestions.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {filteredQuestions.map(item => (
                                    <li key={item.id} className="p-6 hover:bg-blue-50/30 transition group relative">
                                        {item.hasUnreadReply && (
                                            <div className="absolute top-6 left-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        )}
                                        <Link to={`/cau-hoi-phap-luat/${item.id}`} className="block pl-4">
                                            <div className="flex flex-wrap gap-2 items-center mb-3">
                                                <span className="text-gray-500 font-mono text-xs font-bold bg-gray-100 px-2 py-1 rounded border border-gray-200">{item.code}</span>
                                                <span className="text-blue-700 font-bold text-xs bg-blue-50 px-2.5 py-1 flex items-center gap-1 rounded border border-blue-100">{item.domain}</span>
                                                {item.status === 'Đã trả lời' ?
                                                    <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1"><CheckCircle2 size={12} /> Đã trả lời</span>
                                                    : item.status === 'Chờ trả lời' ?
                                                        <span className="text-amber-700 font-bold text-xs bg-amber-50 px-2 py-1 rounded border border-amber-100 flex items-center gap-1"><Clock size={12} /> Chờ trả lời</span>
                                                        :
                                                        <span className="text-gray-600 font-bold text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200">Đã đóng</span>
                                                }
                                            </div>

                                            <h3 className="text-lg font-bold text-[#0f4c81] mb-2 group-hover:text-blue-600 transition truncate">{item.title}</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <p className="text-xs uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><PlusCircle size={12} /> Câu hỏi của bạn ({item.submittedDate})</p>
                                                    <p className="text-sm text-gray-600 truncate">"{item.summary}"</p>
                                                </div>
                                                {item.answerSummary && (
                                                    <div className={`p-3 rounded-lg border ${item.hasUnreadReply ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-green-50/50 border-green-100'}`}>
                                                        <p className="text-xs flex items-center justify-between mb-1">
                                                            <span className="uppercase font-bold text-gray-500 flex items-center gap-1"><CheckCircle2 size={12} className={item.hasUnreadReply ? 'text-blue-500' : 'text-green-500'} /> Phản hồi từ chuyên gia</span>
                                                            <span className="text-gray-400">{item.answeredDate}</span>
                                                        </p>
                                                        <p className={`text-sm ${item.hasUnreadReply ? 'text-blue-900 font-medium' : 'text-gray-600'} truncate`}>"{item.answerSummary}"</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-right">
                                                <span className="inline-flex items-center text-sm font-bold text-[#0f4c81] hover:underline group-hover:translate-x-1 transition-transform">
                                                    Xem chi tiết <ChevronRight size={16} />
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-12 px-4">
                                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare size={32} />
                                </div>
                                <h3 className="text-gray-600 font-bold text-lg mb-2">Chưa có câu hỏi nào</h3>
                                <p className="text-gray-500 text-sm mb-6">Bạn chưa có câu hỏi nào trong mục này.</p>
                                <Link to="/cau-hoi-phap-luat" className="inline-block bg-white text-[#0f4c81] border-2 border-[#0f4c81] font-bold px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                                    Về trang Hỏi đáp pháp luật
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-500">
                            Hiển thị {filteredQuestions.length} câu hỏi
                            <div className="flex gap-2 text-gray-400">
                                <button className="p-1 border bg-white rounded cursor-not-allowed">Trước</button>
                                <button className="p-1 border bg-[#0f4c81] text-white rounded">1</button>
                                <button className="p-1 border bg-white rounded cursor-not-allowed">Sau</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DanhSachCauHoiCaNhanPage;

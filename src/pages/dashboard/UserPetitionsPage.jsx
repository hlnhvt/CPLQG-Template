import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Clock, CheckCircle2, Search, PlusCircle, ChevronRight } from 'lucide-react';

const MOCK_PETITIONS = [
    { id: '1', code: 'PAKN-2026-001', title: 'Kiến nghị về ưu đãi thuế thu nhập doanh nghiệp cho đơn vị KHCN', status: 'Đang xử lý', domain: 'Thuế - Ngân sách', submittedDate: '15/03/2026', answeredDate: null, summary: 'Theo Nghị định mới, điều kiện để doanh nghiệp khoa học công nghệ được hưởng mức ưu đãi thuế 10% chưa được làm rõ về tiêu chí doanh thu...', answerSummary: null },
    { id: '2', code: 'PAKN-2026-002', title: 'Góp ý Dự thảo Luật Bảo vệ môi trường (sửa đổi) Chương IV', status: 'Đã trả lời', domain: 'Môi trường', submittedDate: '10/02/2026', answeredDate: '15/02/2026', summary: 'Đề nghị bổ sung quy định về trách nhiệm tái chế của nhà sản xuất (EPR) đối với các bao bì nhựa dùng một lần tại Điều 55...', answerSummary: 'Ban soạn thảo đã ghi nhận ý kiến đóng góp của công dân và sẽ đưa vào bản dự thảo trình Quốc hội kỳ họp tới.' },
    { id: '3', code: 'PAKN-2026-003', title: 'Phản ánh sự không thống nhất giữa Luật Đất đai và Luật Nhà ở', status: 'Đã tiếp nhận', domain: 'Đất đai - Nhà ở', submittedDate: '26/03/2026', answeredDate: null, summary: 'Có sự chồng chéo về thẩm quyền xác nhận tình trạng nhà ở giữa UBND cấp xã và Văn phòng đăng ký đất đai khi thực hiện thủ tục chuyển nhượng...', answerSummary: null }
];

const UserPetitionsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('all');

    // Stats
    const total = MOCK_PETITIONS.length;
    const received = MOCK_PETITIONS.filter(q => q.status === 'Đã tiếp nhận').length;
    const processing = MOCK_PETITIONS.filter(q => q.status === 'Đang xử lý').length;
    const answered = MOCK_PETITIONS.filter(q => q.status === 'Đã trả lời').length;

    const filteredPetitions = MOCK_PETITIONS.filter(q => {
        if (activeTab === 'all') return true;
        if (activeTab === 'received') return q.status === 'Đã tiếp nhận';
        if (activeTab === 'processing') return q.status === 'Đang xử lý';
        if (activeTab === 'answered') return q.status === 'Đã trả lời';
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
                        <span className="text-[#0f4c81] font-bold line-clamp-1 flex-1">Phản ánh kiến nghị của tôi</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="w-full space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h1 className="text-3xl font-bold text-[#0f4c81]">Phản ánh kiến nghị của tôi</h1>
                        <Link to="/phan-anh-kien-nghi/tao-moi" className="bg-[#0f4c81] text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition font-bold shadow-md flex items-center gap-2">
                            <PlusCircle size={20} /> Tạo phản ánh mới
                        </Link>
                    </div>

                    {/* Filter & List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-100 bg-gray-50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex gap-2 p-1 bg-gray-200/50 rounded-lg">
                                    <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'all' ? 'bg-white shadow text-[#0f4c81]' : 'text-gray-500 hover:text-gray-700'}`}>Tất cả ({total})</button>
                                    <button onClick={() => setActiveTab('received')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'received' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Đã tiếp nhận ({received})</button>
                                    <button onClick={() => setActiveTab('processing')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'processing' ? 'bg-white shadow text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}>Đang xử lý ({processing})</button>
                                    <button onClick={() => setActiveTab('answered')} className={`px-4 py-2 rounded-md font-bold text-sm transition ${activeTab === 'answered' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}>Đã trả lời ({answered})</button>
                                </div>
                                <div className="flex gap-3">
                                    <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm font-medium outline-none focus:border-[#0f4c81]">
                                        <option>Tất cả lĩnh vực</option>
                                        <option>Môi trường</option>
                                        <option>Giao thông</option>
                                        <option>Hành chính</option>
                                    </select>
                                    <div className="relative">
                                        <input type="text" placeholder="Tìm kiếm..." className="border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm outline-none focus:border-[#0f4c81]" />
                                        <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {filteredPetitions.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {filteredPetitions.map(item => (
                                    <li key={item.id} className="p-6 hover:bg-blue-50/30 transition group relative block">
                                        <Link to={`/phan-anh-kien-nghi/${item.id}`} className="block pl-4">
                                            <div className="flex flex-wrap gap-2 items-center mb-3">
                                                <span className="text-gray-500 font-mono text-xs font-bold bg-gray-100 px-2 py-1 rounded border border-gray-200">{item.code}</span>
                                                <span className="text-blue-700 font-bold text-xs bg-blue-50 px-2.5 py-1 flex items-center gap-1 rounded border border-blue-100">{item.domain}</span>
                                                {item.status === 'Đã tiếp nhận' && <span className="text-blue-700 font-bold text-xs bg-blue-50 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">Đã tiếp nhận</span>}
                                                {item.status === 'Đang xử lý' && <span className="text-amber-700 font-bold text-xs bg-amber-50 px-2 py-1 rounded border border-amber-100 flex items-center gap-1"><Clock size={12} /> Đang xử lý</span>}
                                                {item.status === 'Đã trả lời' && <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1"><CheckCircle2 size={12} /> Đã trả lời</span>}
                                            </div>

                                            <h3 className="text-lg font-bold text-[#0f4c81] mb-2 group-hover:text-blue-600 transition truncate">{item.title}</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <p className="text-xs uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><PlusCircle size={12} /> Phản ánh của bạn ({item.submittedDate})</p>
                                                    <p className="text-sm text-gray-600 line-clamp-2">"{item.summary}"</p>
                                                </div>
                                                {item.answerSummary && (
                                                    <div className="p-3 rounded-lg border bg-green-50/50 border-green-100">
                                                        <p className="text-xs flex items-center justify-between mb-1">
                                                            <span className="uppercase font-bold text-gray-500 flex items-center gap-1"><CheckCircle2 size={12} className="text-green-500" /> Kết quả xử lý</span>
                                                            <span className="text-gray-400">{item.answeredDate}</span>
                                                        </p>
                                                        <p className="text-sm text-gray-600 line-clamp-2">"{item.answerSummary}"</p>
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
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-gray-600 font-bold text-lg mb-2">Chưa có bản ghi nào</h3>
                                <p className="text-gray-500 text-sm mb-6">Bạn chưa có phản ánh kiến nghị nào trong mục này.</p>
                                <Link to="/phan-anh-kien-nghi/tao-moi" className="inline-block bg-white text-[#0f4c81] border-2 border-[#0f4c81] font-bold px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                                    Tạo phản ánh ngay
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-500">
                            Hiển thị {filteredPetitions.length} phản ánh kiến nghị
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

export default UserPetitionsPage;

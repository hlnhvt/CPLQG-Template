import React, { useEffect, useState } from 'react';
import { Megaphone, Calendar, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const ThongTinDieuHanhTGPLPage = () => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const documents = [
        { id: 1, title: 'Hướng dẫn lập dự toán ngân sách cho các hoạt động trợ giúp pháp lý lưu động', date: '9/7/2026', code: 'HD-20/CTGPL', type: 'Hướng dẫn' },
        { id: 2, title: 'Thông báo lịch làm việc với Đoàn khảo sát quốc tế về trợ giúp pháp lý', date: '9/7/2026', code: 'TB-19/CTGPL', type: 'Thông báo' },
        { id: 3, title: 'Công văn yêu cầu chấn chỉnh kỷ luật, kỷ cương tại phòng tiếp dân', date: '9/7/2026', code: 'CV-18/CTGPL', type: 'Công văn' },
        { id: 4, title: 'Kế hoạch chuyển đổi số trong công tác trợ giúp pháp lý giai đoạn 2026-2030', date: '9/7/2026', code: 'KH-17/CTGPL', type: 'Kế hoạch' },
        { id: 5, title: 'Quyết định thành lập Đoàn thanh tra hoạt động trợ giúp pháp lý tại địa phương', date: '9/7/2026', code: 'QĐ-16/CTGPL', type: 'Quyết định' },
        { id: 6, title: 'Hướng dẫn tiêu chí đánh giá chất lượng vụ việc đại diện ngoài tố tụng', date: '9/7/2026', code: 'HD-15/CTGPL', type: 'Hướng dẫn' },
        { id: 7, title: 'Thông báo về việc thay đổi địa điểm Trung tâm trợ giúp pháp lý nhà nước', date: '9/7/2026', code: 'TB-14/CTGPL', type: 'Thông báo' },
        { id: 8, title: 'Công văn đề nghị rà soát danh sách tổ chức tham gia trợ giúp pháp lý', date: '9/7/2026', code: 'CV-13/CTGPL', type: 'Công văn' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* HERO SECTION */}
            <div className="bg-[#295fac] text-white pt-10 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight flex items-center gap-3 uppercase">
                            <Megaphone size={32} className="text-white" />
                            THÔNG TIN CHỈ ĐẠO, ĐIỀU HÀNH
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Search Bar Block */}
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-5">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..." 
                                    className="w-full md:flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-blue-400 transition-colors bg-gray-50/50 text-black" 
                                />
                                <div className="flex gap-2 w-full md:w-auto shrink-0">
                                    <button className="flex-1 md:flex-none bg-[#1e3a8a] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm">
                                        Tìm kiếm
                                    </button>
                                    <button className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex justify-end mt-2">
                                <button 
                                    onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                                    className="text-blue-600 hover:text-blue-800 text-[13px] font-medium flex items-center gap-1 transition-colors"
                                >
                                    Tìm kiếm nâng cao {isAdvancedSearchOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>

                            {/* Advanced Search Area */}
                            {isAdvancedSearchOpen && (
                                <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-medium text-gray-700">Loại văn bản</label>
                                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-blue-400 bg-white text-black">
                                                <option>-- Tất cả --</option>
                                                <option>Kế hoạch</option>
                                                <option>Thông báo</option>
                                                <option>Công văn</option>
                                                <option>Quyết định</option>
                                                <option>Hướng dẫn</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Document List */}
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                            {documents.map((doc, idx) => (
                                <div key={doc.id} className={`p-5 flex gap-4 items-center hover:bg-blue-50/50 transition-colors cursor-pointer ${idx !== documents.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[14px] text-[#1e3a8a] mb-2 leading-snug hover:text-blue-600 transition-colors">{doc.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-[12px] font-medium text-gray-500">
                                            <span className="flex items-center gap-1.5"><Calendar size={13}/> Ban hành: {doc.date}</span>
                                            <span className="bg-gray-100/80 px-2 py-0.5 rounded text-gray-700 font-medium">Hiệu lực: {doc.code}</span>
                                            <span className="text-[#1e3a8a] font-bold">{doc.type}</span>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="flex items-center justify-center text-blue-500 bg-blue-50 w-8 h-8 rounded-full hover:bg-blue-100 transition-colors">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="pt-4 pb-2 flex justify-center items-center gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Trước</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-[#3b82f6] text-white rounded-lg text-[14px] font-bold shadow-sm border border-[#3b82f6]">1</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">2</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">3</button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Sau</button>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <TGPLSidebar />
                </div>
            </div>
        </div>
    );
};

export default ThongTinDieuHanhTGPLPage;

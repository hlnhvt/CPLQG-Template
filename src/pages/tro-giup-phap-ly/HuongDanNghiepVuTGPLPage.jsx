import React, { useEffect, useState } from 'react';
import { GraduationCap, ArrowRight, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const HuongDanNghiepVuTGPLPage = () => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const guides = [
        { id: 1, title: 'Bản ghi số 11', category: 'NGHIỆP VỤ TRỢ GIÚP PHÁP LÝ TRONG TỐ TỤNG DÂN SỰ', date: '09/07/2026' },
        { id: 2, title: 'Bùi Ly test 05', category: 'NGHIỆP VỤ TRỢ GIÚP PHÁP LÝ TRONG TỐ TỤNG HÌNH SỰ', date: '29/06/2026' },
        { id: 3, title: 'Bùi Ly test 04', category: 'KỸ NĂNG TƯ VẤN PHÁP LUẬT', date: '29/06/2026' },
        { id: 4, title: 'Bùi Ly test 03', category: 'KỸ NĂNG ĐẠI DIỆN NGOÀI TỐ TỤNG', date: '29/06/2026' },
        { id: 5, title: 'Bùi Ly test 02', category: 'NGHIỆP VỤ TRỢ GIÚP PHÁP LÝ TRONG TỐ TỤNG HÀNH CHÍNH', date: '29/06/2026' },
        { id: 6, title: 'Bùi Ly test 01', category: 'QUY TẮC ỨNG XỬ VÀ ĐẠO ĐỨC NGHỀ NGHIỆP', date: '29/06/2026' },
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
                            <GraduationCap size={32} className="text-white" />
                            HƯỚNG DẪN NGHIỆP VỤ
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
                                            <label className="text-[13px] font-medium text-gray-700">Danh mục nghiệp vụ</label>
                                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-blue-400 bg-white text-black">
                                                <option>-- Tất cả --</option>
                                                <option>Nghiệp vụ trợ giúp pháp lý trong tố tụng dân sự</option>
                                                <option>Nghiệp vụ trợ giúp pháp lý trong tố tụng hình sự</option>
                                                <option>Nghiệp vụ trợ giúp pháp lý trong tố tụng hành chính</option>
                                                <option>Kỹ năng tư vấn pháp luật</option>
                                                <option>Kỹ năng đại diện ngoài tố tụng</option>
                                                <option>Quy tắc ứng xử và đạo đức nghề nghiệp</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Document List */}
                        <div className="flex flex-col gap-4">
                            {guides.map((guide) => (
                                <div key={guide.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-2.5">
                                        <span className="inline-block px-2.5 py-1 bg-green-50 text-green-600 text-[11px] font-bold rounded uppercase tracking-wide">
                                            {guide.category}
                                        </span>
                                        <h3 className="font-bold text-[16px] text-gray-900 leading-snug">
                                            {guide.title}
                                        </h3>
                                        <p className="text-[12px] text-gray-500 font-medium flex items-center gap-1.5">
                                            <FileText size={13} />
                                            Cập nhật: {guide.date}
                                        </p>
                                    </div>
                                    <button className="shrink-0 flex items-center justify-center gap-1 px-4 py-2 mt-2 sm:mt-0 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-medium transition-colors">
                                        Chi tiết <ArrowRight size={14} />
                                    </button>
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

export default HuongDanNghiepVuTGPLPage;

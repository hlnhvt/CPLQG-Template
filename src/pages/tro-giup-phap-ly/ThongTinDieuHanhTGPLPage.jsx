import React, { useEffect } from 'react';
import { FileSignature, Search, Calendar, ChevronRight } from 'lucide-react';

const ThongTinDieuHanhTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const documents = [
        { id: 1, title: 'Kế hoạch triển khai công tác trợ giúp pháp lý năm 2024', date: '15/12/2023', code: 'KH/CTGPL-2024', type: 'Kế hoạch' },
        { id: 2, title: 'Công văn đôn đốc báo cáo số liệu vụ việc trợ giúp pháp lý quý IV/2023', date: '01/12/2023', code: 'CV-1250/CTGPL', type: 'Công văn' },
        { id: 3, title: 'Thông báo kết luận của Cục trưởng tại Hội nghị giao ban tháng 11', date: '25/11/2023', code: 'TB-89/CTGPL', type: 'Thông báo' },
        { id: 4, title: 'Hướng dẫn xây dựng Kế hoạch kinh phí thực hiện vụ việc TGPL', date: '10/11/2023', code: 'HD-15/CTGPL', type: 'Hướng dẫn' },
        { id: 5, title: 'Quyết định ban hành Quy chế làm việc của Cục Trợ giúp pháp lý', date: '20/10/2023', code: 'QĐ-45/CTGPL', type: 'Quyết định' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide">
                        <FileSignature size={32} className="text-blue-600" />
                        Thông tin chỉ đạo, điều hành
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input type="text" placeholder="Trích yếu, số ký hiệu văn bản..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    </div>
                    <div className="w-full md:w-48 shrink-0">
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">Tất cả loại văn bản</option>
                            <option value="kh">Kế hoạch</option>
                            <option value="cv">Công văn</option>
                            <option value="qd">Quyết định</option>
                            <option value="tb">Thông báo</option>
                        </select>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm whitespace-nowrap">
                        Tìm kiếm
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {documents.map((doc, idx) => (
                        <div key={doc.id} className={`p-6 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-blue-50/50 transition-colors cursor-pointer ${idx !== documents.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex-1">
                                <h3 className="font-bold text-[16px] text-[#1e3a8a] mb-2 leading-snug">{doc.title}</h3>
                                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                                    <span className="flex items-center gap-1.5"><Calendar size={14}/> Ban hành: {doc.date}</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200 text-gray-700">Hiệu lực: {doc.code}</span>
                                    <span className="text-blue-600">{doc.type}</span>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center justify-center text-blue-600 bg-blue-50 w-10 h-10 rounded-full">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThongTinDieuHanhTGPLPage;

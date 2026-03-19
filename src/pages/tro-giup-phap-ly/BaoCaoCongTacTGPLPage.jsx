import React, { useEffect } from 'react';
import { BarChart3, Search, Download, Calendar } from 'lucide-react';

const BaoCaoCongTacTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const reports = [
        { id: 1, title: 'Báo cáo tổng kết công tác trợ giúp pháp lý toàn quốc năm 2023', date: '31/12/2023', size: '2.5 MB', type: 'Báo cáo Năm' },
        { id: 2, title: 'Báo cáo sơ kết công tác trợ giúp pháp lý 6 tháng đầu năm 2023', date: '15/07/2023', size: '1.2 MB', type: 'Báo cáo 6 tháng' },
        { id: 3, title: 'Báo cáo kết quả thực hiện Đề án đổi mới công tác trợ giúp pháp lý (giai đoạn 2015-2025)', date: '30/06/2023', size: '3.8 MB', type: 'Báo cáo Chuyên đề' },
        { id: 4, title: 'Báo cáo công tác trợ giúp pháp lý quý I/2023', date: '10/04/2023', size: '0.8 MB', type: 'Báo cáo Quý' },
        { id: 5, title: 'Báo cáo tổng kết công tác trợ giúp pháp lý toàn quốc năm 2022', date: '31/12/2022', size: '2.1 MB', type: 'Báo cáo Năm' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide">
                        <BarChart3 size={32} className="text-blue-600" />
                        Báo cáo công tác
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input type="text" placeholder="Trích yếu báo cáo..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    </div>
                    <div className="w-full md:w-48 shrink-0">
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                            <option value="">Năm thống kê</option>
                            <option value="2024">Năm 2024</option>
                            <option value="2023">Năm 2023</option>
                            <option value="2022">Năm 2022</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {reports.map((report, idx) => (
                        <div key={report.id} className={`p-6 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-blue-50 transition-colors ${idx !== reports.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-gray-200">{report.type}</span>
                                </div>
                                <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-2 hover:text-blue-600 cursor-pointer">{report.title}</h3>
                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                    <span className="flex items-center gap-1.5"><Calendar size={14}/> Cập nhật: {report.date}</span>
                                    <span>Định dạng: PDF ({report.size})</span>
                                </div>
                            </div>
                            <button className="shrink-0 flex items-center gap-2 px-4 py-2 mt-2 md:mt-0 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100">
                                <Download size={16} />
                                Tải về
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BaoCaoCongTacTGPLPage;

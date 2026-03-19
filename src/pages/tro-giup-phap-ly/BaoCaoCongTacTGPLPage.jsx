import React, { useEffect, useState } from 'react';
import { BarChart3, Search, Download, Calendar, MapPin, ChevronRight, ChevronLeft, Map } from 'lucide-react';

const BaoCaoCongTacTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [selectedLocation, setSelectedLocation] = useState('Toàn quốc');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const locations = [
        'Toàn quốc',
        'Hà Nội',
        'TP. Hồ Chí Minh',
        'Đà Nẵng',
        'Cần Thơ',
        'Hải Phòng',
        'Bình Dương',
        'Đồng Nai',
        'Khác'
    ];

    const reports = [
        { id: 1, title: 'Báo cáo tổng kết công tác trợ giúp pháp lý toàn quốc năm 2023', date: '31/12/2023', size: '2.5 MB', type: 'Báo cáo Năm', location: 'Toàn quốc' },
        { id: 2, title: 'Báo cáo sơ kết công tác trợ giúp pháp lý 6 tháng đầu năm 2023 tại Hà Nội', date: '15/07/2023', size: '1.2 MB', type: 'Báo cáo 6 tháng', location: 'Hà Nội' },
        { id: 3, title: 'Báo cáo kết quả thực hiện Đề án đổi mới công tác trợ giúp pháp lý', date: '30/06/2023', size: '3.8 MB', type: 'Báo cáo Chuyên đề', location: 'Toàn quốc' },
        { id: 4, title: 'Báo cáo công tác trợ giúp pháp lý quý I/2023 tại TP Hồ Chí Minh', date: '10/04/2023', size: '0.8 MB', type: 'Báo cáo Quý', location: 'TP. Hồ Chí Minh' },
        { id: 5, title: 'Báo cáo tổng kết công tác trợ giúp pháp lý tỉnh Bình Dương năm 2022', date: '31/12/2022', size: '2.1 MB', type: 'Báo cáo Năm', location: 'Bình Dương' },
        { id: 6, title: 'Báo cáo chuyên đề: Tăng cường năng lực TGPL cho khu vực miền núi', date: '12/11/2023', size: '3.5 MB', type: 'Báo cáo Chuyên đề', location: 'Khác' }
    ];

    const filteredReports = reports.filter(report => {
        const matchLocation = selectedLocation === 'Toàn quốc' || report.location === selectedLocation;
        const matchYear = selectedYear === '' || report.date.includes(selectedYear);
        const matchSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchLocation && matchYear && matchSearch;
    });

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const paginatedReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedLocation, searchQuery, selectedYear]);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-2xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase">
                        <BarChart3 size={32} className="text-blue-600" />
                        Báo cáo công tác
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8 flex flex-col lg:flex-row gap-8">

                {/* Left Sidebar - Location Filter */}
                <div className="w-full lg:w-1/4 shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
                        <div className="bg-blue-50/50 border-b border-gray-100 p-4 shrink-0 flex items-center gap-2">
                            <MapPin className="text-blue-600" size={20} />
                            <h2 className="font-bold text-gray-900 text-base">Địa phương</h2>
                        </div>
                        <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar p-2">
                            {locations.map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => setSelectedLocation(loc)}
                                    className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedLocation === loc
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                        }`}
                                >
                                    <span className="truncate pr-2">{loc}</span>
                                    {selectedLocation === loc && <ChevronRight size={16} className="shrink-0" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6 flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 relative w-full">
                            <input
                                type="text"
                                placeholder="Trích yếu báo cáo..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        </div>
                        <div className="w-full md:w-56 shrink-0 relative">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Tất cả các năm</option>
                                <option value="2024">Năm 2024</option>
                                <option value="2023">Năm 2023</option>
                                <option value="2022">Năm 2022</option>
                            </select>
                            <Calendar className="absolute right-4 top-3 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {paginatedReports.length > 0 ? (
                            paginatedReports.map((report, idx) => (
                                <div key={report.id} className={`p-5 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-blue-50/50 transition-colors ${idx !== paginatedReports.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100">{report.type}</span>
                                            {report.location !== 'Toàn quốc' && (
                                                <span className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                                                    <Map size={12} /> {report.location}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-[15px] text-gray-900 leading-snug mb-2 hover:text-blue-600 cursor-pointer line-clamp-2" title={report.title}>{report.title}</h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
                                            <span className="flex items-center gap-1.5"><Calendar size={13} /> {report.date}</span>
                                            <span className="flex items-center gap-1.5 text-gray-400">• PDF ({report.size})</span>
                                        </div>
                                    </div>
                                    <button className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 mt-2 md:mt-0 bg-white text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors border border-gray-200 w-full md:w-auto shadow-sm">
                                        <Download size={16} />
                                        Tải về
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Search className="text-gray-300" size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Không tìm thấy báo cáo nào</h3>
                                <p className="text-sm text-gray-500 max-w-sm">Không có báo cáo công tác nào phù hợp với điều kiện tìm kiếm hiện tại của bạn.</p>
                                <button
                                    onClick={() => { setSelectedLocation('Toàn quốc'); setSearchQuery(''); setSelectedYear(''); }}
                                    className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center gap-1 bg-white px-2 py-2 rounded-xl shadow-sm border border-gray-200" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                >
                                    <span className="sr-only">Trang trước</span>
                                    <ChevronLeft size={20} />
                                </button>
                                
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            currentPage === i + 1
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                >
                                    <span className="sr-only">Trang sau</span>
                                    <ChevronRight size={20} />
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BaoCaoCongTacTGPLPage;

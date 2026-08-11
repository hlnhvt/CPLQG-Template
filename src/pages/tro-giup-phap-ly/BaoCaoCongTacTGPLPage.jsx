import React, { useEffect, useState } from 'react';
import { BarChart3, Search, Download, Calendar, MapPin, ChevronRight, ChevronLeft, Map, ChevronDown } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const BaoCaoCongTacTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Toàn quốc');
    const [selectedType, setSelectedType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const itemsPerPage = 10;

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
        { id: 1, title: 'Báo cáo tổng kết công tác trợ giúp pháp lý toàn quốc năm 2023', date: '2023-12-31', startDate: '2023-01-01', endDate: '2023-12-31', size: '2.5 MB', type: 'Báo cáo Năm', location: 'Toàn quốc' },
        { id: 2, title: 'Báo cáo sơ kết công tác trợ giúp pháp lý 6 tháng đầu năm 2023 tại Hà Nội', date: '2023-07-15', startDate: '2023-01-01', endDate: '2023-06-30', size: '1.2 MB', type: 'Báo cáo 6 tháng', location: 'Hà Nội' },
        { id: 3, title: 'Báo cáo kết quả thực hiện Đề án đổi mới công tác trợ giúp pháp lý', date: '2023-06-30', startDate: '2023-01-01', endDate: '2023-06-30', size: '3.8 MB', type: 'Báo cáo Chuyên đề', location: 'Toàn quốc' },
        { id: 4, title: 'Báo cáo công tác trợ giúp pháp lý quý I/2023 tại TP Hồ Chí Minh', date: '2023-04-10', startDate: '2023-01-01', endDate: '2023-03-31', size: '0.8 MB', type: 'Báo cáo Quý', location: 'TP. Hồ Chí Minh' },
        { id: 5, title: 'Báo cáo tổng kết công tác trợ giúp pháp lý tỉnh Bình Dương năm 2022', date: '2022-12-31', startDate: '2022-01-01', endDate: '2022-12-31', size: '2.1 MB', type: 'Báo cáo Năm', location: 'Bình Dương' },
        { id: 6, title: 'Báo cáo chuyên đề: Tăng cường năng lực TGPL cho khu vực miền núi', date: '2023-11-12', startDate: '2023-01-01', endDate: '2023-11-12', size: '3.5 MB', type: 'Báo cáo Chuyên đề', location: 'Khác' }
    ];

    const formatDateDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedLocation('Toàn quốc');
        setSelectedType('');
        setFromDate('');
        setToDate('');
        setCurrentPage(1);
    };

    const filteredReports = reports.filter(report => {
        const matchLocation = selectedLocation === 'Toàn quốc' || selectedLocation === '' || report.location === selectedLocation;
        const matchType = selectedType === '' || report.type === selectedType;
        const matchSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());

        let matchDate = true;
        if (fromDate) {
            matchDate = matchDate && new Date(report.date) >= new Date(fromDate);
        }
        if (toDate) {
            matchDate = matchDate && new Date(report.date) <= new Date(toDate);
        }

        return matchLocation && matchType && matchSearch && matchDate;
    });

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const paginatedReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedLocation, searchQuery, selectedType, fromDate, toDate]);

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-16 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-900/50 text-blue-100 text-[11px] font-bold px-4 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm uppercase tracking-wider">
                                VỀ CHÚNG TÔI
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight tracking-tight drop-shadow-md flex items-center gap-3 uppercase">
                            <BarChart3 size={36} className="text-white" />
                            BÁO CÁO CÔNG TÁC
                        </h1>
                        <p className="text-blue-50 text-[15px] leading-relaxed border-l-4 border-yellow-400 pl-4 py-1.5 font-medium bg-blue-900/20 rounded-r-lg max-w-2xl shadow-sm">
                            Báo cáo công tác trợ giúp pháp lý
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-12 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* LEFT CONTENT */}
                    <div className="flex-1 min-w-0">
                        {/* Search Area */}
                        <div className="bg-white p-5 border border-gray-200 shadow-sm relative mb-6 rounded-xl">
                            <div className="flex gap-3 items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên báo cáo..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-[14px] focus:outline-none focus:border-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                                </div>
                                <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded text-[14px] font-medium hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap">
                                    Tìm kiếm
                                </button>
                                <button onClick={resetFilters} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded text-[14px] font-medium hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
                                    Xóa
                                </button>
                            </div>

                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Tìm kiếm nâng cao</h3>
                                    <button
                                        onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                                        className="text-blue-600 text-[13px] hover:underline flex items-center gap-1 font-medium"
                                    >
                                        {showAdvancedSearch ? 'Thu gọn' : 'Mở rộng'} <ChevronDown size={14} className={`transform transition-transform ${showAdvancedSearch ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>

                                {showAdvancedSearch && (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="text-[12px] font-bold text-gray-500 mb-1.5 block">Loại báo cáo</label>
                                            <select
                                                value={selectedType}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Tất cả loại báo cáo</option>
                                                <option value="Báo cáo Năm">Báo cáo Năm</option>
                                                <option value="Báo cáo Quý">Báo cáo Quý</option>
                                                <option value="Báo cáo 6 tháng">Báo cáo 6 tháng</option>
                                                <option value="Báo cáo Chuyên đề">Báo cáo Chuyên đề</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-gray-500 mb-1.5 block">Địa phương</label>
                                            <select
                                                value={selectedLocation}
                                                onChange={(e) => setSelectedLocation(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="">Tất cả địa phương</option>
                                                {locations.map(loc => (
                                                    <option key={loc} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-gray-500 mb-1.5 block">Từ ngày</label>
                                            <input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-gray-500 mb-1.5 block">Đến ngày</label>
                                            <input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded text-[13px] focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50/50">
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-12 text-center">STT</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800">Tên báo cáo</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-32 text-center">Loại báo cáo</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-32 text-center">Địa phương</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-32 text-center">Ngày bắt đầu kỳ</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-32 text-center">Ngày kết thúc kỳ</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-32 text-center">Tải về</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedReports.length > 0 ? (
                                            paginatedReports.map((report, index) => (
                                                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-4 text-center text-[13px] font-semibold text-gray-700">
                                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <h3 className="text-[14px] font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2" title={report.title}>
                                                            {report.title}
                                                        </h3>
                                                        <span className="text-[12px] text-gray-500 flex items-center gap-1">
                                                            Kích thước: {report.size} • PDF
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className={`whitespace-nowrap inline-block px-2.5 py-1 text-[11px] font-bold rounded uppercase tracking-wide border ${report.type.includes('Năm') ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                                                            report.type.includes('Quý') ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                                                report.type.includes('Chuyên đề') ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                                                    'bg-blue-50 text-blue-600 border-blue-200'
                                                            }`}>
                                                            {report.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <div className="flex items-center justify-center gap-1.5 text-[13px] text-gray-700 font-medium">
                                                            <MapPin size={14} className="text-gray-400" />
                                                            {report.location}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center text-[13px] font-medium text-gray-600">
                                                        {formatDateDisplay(report.startDate)}
                                                    </td>
                                                    <td className="py-4 px-4 text-center text-[13px] font-medium text-gray-600">
                                                        {formatDateDisplay(report.endDate)}
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <button className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white border border-blue-200 text-blue-600 rounded text-[13px] font-bold hover:bg-blue-50 transition-colors shadow-sm w-full whitespace-nowrap">
                                                            <Download size={14} />
                                                            Tải về
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="py-10 text-center">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <Search className="text-gray-300 mb-3" size={32} />
                                                        <p className="text-gray-500 text-[14px] font-medium">Không tìm thấy báo cáo nào phù hợp.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {filteredReports.length > 0 && totalPages > 1 && (
                                <div className="py-5 border-t border-gray-200 flex justify-center items-center gap-1.5">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-[13px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        Trước
                                    </button>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 flex items-center justify-center border rounded text-[13px] font-medium transition-colors ${currentPage === i + 1
                                                ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-[13px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        Sau
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT CONTENT (SIDEBAR) */}
                    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
                        <TGPLSidebar />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BaoCaoCongTacTGPLPage;

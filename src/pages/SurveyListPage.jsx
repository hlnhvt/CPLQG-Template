import React, { useState } from 'react';
import { Search, List, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar, Users, Filter, X, ChevronRight as BreadcrumbRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// --- MOCK DATA ---
const baseSurveys = [
    { title: "Khảo sát ý kiến về thủ tục cấp Giấy chứng nhận quyền sử dụng đất", status: "opening", statusText: "Đang mở", date: "01/03/2026 - 31/03/2026", participants: 1250, desc: "Đánh giá mức độ hài lòng về thời gian, chi phí và thái độ cán bộ khi thực hiện thủ tục đất đai." },
    { title: "Đánh giá chất lượng dịch vụ công trực tuyến mức độ 4", status: "upcoming", statusText: "Sắp diễn ra", date: "15/04/2026 - 15/05/2026", participants: 0, desc: "Khảo sát trải nghiệm người dùng trên hệ thống dịch vụ công Quốc gia để cải thiện giao diện và tính năng." },
    { title: "Khảo sát hiệu quả hoạt động của Bộ phận Một cửa cấp xã", status: "closed", statusText: "Đã kết thúc", date: "01/01/2026 - 31/01/2026", participants: 3420, desc: "Lấy ý kiến người dân về sự thuận tiện, thái độ phục vụ và kết quả giải quyết hồ sơ tại cấp xã." },
    { title: "Đánh giá mức độ ứng dụng CNTT trong cơ quan nhà nước", status: "opening", statusText: "Đang mở", date: "10/03/2026 - 10/04/2026", participants: 850, desc: "Đo lường mức độ sẵn sàng và hiệu quả ứng dụng phần mềm trong công tác chỉ đạo điều hành." },
    { title: "Khảo sát nhu cầu sử dụng ứng dụng thanh toán điện tử", status: "closed", statusText: "Đã kết thúc", date: "15/11/2025 - 15/12/2025", participants: 5120, desc: "Nghiên cứu thói quen và những khó khăn của người dân khi thực hiện thanh toán phí, lệ phí trực tuyến." },
    { title: "Lấy ý kiến đánh giá rèn luyện cán bộ, công chức năm 2025", status: "closed", statusText: "Đã kết thúc", date: "01/12/2025 - 31/12/2025", participants: 2100, desc: "Bình xét và đánh giá năng lực, phẩm chất đạo đức của cán bộ công chức định kỳ hàng năm." }
];

const MOCK_SURVEYS = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    title: `${baseSurveys[i % baseSurveys.length].title} - Đợt ${Math.floor(i / baseSurveys.length) + 1}`,
    status: baseSurveys[i % baseSurveys.length].status,
    statusText: baseSurveys[i % baseSurveys.length].statusText,
    date: baseSurveys[i % baseSurveys.length].date,
    participants: baseSurveys[i % baseSurveys.length].participants + (i * 15),
    description: baseSurveys[i % baseSurveys.length].desc
})).sort((a, b) => b.id - a.id); // Sort by newest (id)

const TOPIC_NAME = "Khảo sát về chất lượng dịch vụ hành chính công";

const SurveyListPage = () => {
    const { id } = useParams(); // Topic ID if needed
    const [activeTab, setActiveTab] = useState('new'); // 'new' or 'search'
    
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // --- LOGIC: NEW SURVEYS TAB (UC80) ---
    // Take exactly 5 newest surveys
    const newSurveys = MOCK_SURVEYS.slice(0, 5);

    // --- LOGIC: SEARCH SURVEYS TAB (UC81) ---
    const filteredSurveys = MOCK_SURVEYS.filter(survey => {
        // Keyword filter
        const matchQuery = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           survey.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Status filter
        const matchStatus = statusFilter === 'all' || survey.status === statusFilter;
        
        // Date filter (Mock logic just checking if value exists for demonstration)
        const matchDateFrom = dateFrom ? true : true; 
        const matchDateTo = dateTo ? true : true;

        return matchQuery && matchStatus && matchDateFrom && matchDateTo;
    });

    const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);
    const currentSearchSurveys = filteredSurveys.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleResetFilter = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setDateFrom('');
        setDateTo('');
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    // --- RENDER HELPERS ---
    const renderStatusBadge = (status, text) => {
        const colors = {
            opening: 'bg-green-100 text-green-700 border-green-200',
            upcoming: 'bg-orange-100 text-orange-700 border-orange-200',
            closed: 'bg-gray-100 text-gray-700 border-gray-200'
        };
        const dotColors = {
            opening: 'bg-green-500',
            upcoming: 'bg-orange-500',
            closed: 'bg-gray-500'
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold border flex items-center gap-1.5 w-fit ${colors[status]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`}></span>
                {text}
            </span>
        );
    };

    const renderSurveyCard = (survey) => (
        <div key={survey.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 mb-4 group flex flex-col md:flex-row gap-5">
            <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    {renderStatusBadge(survey.status, survey.statusText)}
                    <span className="text-gray-500 text-[13px] flex items-center gap-1">
                        <Calendar size={14} />
                        {survey.date}
                    </span>
                    <span className="text-gray-500 text-[13px] flex items-center gap-1">
                        <Users size={14} />
                        {survey.participants.toLocaleString('vi-VN')} lượt tham gia
                    </span>
                </div>
                
                <Link to={`/khao-sat/${survey.id}`} className="text-[18px] md:text-[20px] font-bold text-[#0f4c81] hover:text-blue-600 leading-snug mb-2 transition-colors">
                    {survey.title}
                </Link>
                
                <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2 md:line-clamp-none">
                    {survey.description}
                </p>
            </div>
            
            <div className="md:w-auto flex items-center justify-end md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-5 shrink-0">
                <Link to={`/khao-sat/${survey.id}`} className="w-full md:w-auto text-center px-6 py-2.5 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100">
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        let pages = [];
        if (totalPages <= 7) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, '...', totalPages];
            } else if (currentPage >= totalPages - 3) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return (
            <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50 text-[14px]">
                    <ChevronLeft size={16} className="mr-1" /> Đầu
                </button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50 text-[14px]">
                    <ChevronLeft size={16} className="mr-1" /> Trước
                </button>
                {pages.map((page, index) => {
                    if (page === '...') return (<span key={`dots-${index}`} className="flex items-center justify-center w-10 h-10 text-gray-400">...</span>);
                    const isActive = currentPage === page;
                    return (
                        <button key={page} onClick={() => handlePageChange(page)} className={`flex items-center justify-center w-10 h-10 rounded border font-semibold text-[14px] ${isActive ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#1a3b8b]'}`}>
                            {page}
                        </button>
                    );
                })}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-800 hover:bg-gray-50 hover:text-[#1a3b8b] hover:border-[#1a3b8b] disabled:opacity-50 text-[14px]">
                    Sau <ChevronRight size={16} className="ml-1" />
                </button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-800 hover:bg-gray-50 hover:text-[#1a3b8b] hover:border-[#1a3b8b] disabled:opacity-50 text-[14px]">
                    Cuối <ChevronRight size={16} className="ml-1" />
                </button>
            </div>
        );
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Header Area with Breadcrumbs & Title */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-8">
                <div className="container mx-auto px-4 max-w-[1000px]">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-[13px] text-gray-500 mb-4 whitespace-nowrap overflow-x-auto">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <BreadcrumbRight size={14} className="mx-2 shrink-0" />
                        <Link to="/chu-de-khao-sat" className="hover:text-blue-600">Khảo sát</Link>
                        <BreadcrumbRight size={14} className="mx-2 shrink-0" />
                        <span className="text-gray-800 font-medium truncate">{TOPIC_NAME}</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] mb-6 leading-tight">
                        {TOPIC_NAME}
                    </h1>

                    {/* Tabs Bar */}
                    <div className="flex flex-nowrap overflow-x-auto border-b-2 border-gray-100 no-scrollbar">
                        <button 
                            className={`flex items-center gap-2 px-6 py-3 font-semibold text-[15px] whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                                activeTab === 'new' 
                                ? 'text-blue-600 border-blue-600' 
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('new')}
                        >
                            Cuộc khảo sát mới ({newSurveys.length})
                        </button>
                        <button 
                            className={`flex items-center gap-2 px-6 py-3 font-semibold text-[15px] whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                                activeTab === 'search' 
                                ? 'text-blue-600 border-blue-600' 
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('search')}
                        >
                            Tìm kiếm cuộc khảo sát
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1000px] mt-8">
                {/* TAB 1: NEW SURVEYS */}
                {activeTab === 'new' && (
                    <div className="animate-fadeIn">
                        {newSurveys.length > 0 ? (
                            <div className="space-y-4">
                                {newSurveys.map(renderSurveyCard)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                Hiện chưa có cuộc khảo sát nào trong chủ đề này.
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: SEARCH SURVEYS */}
                {activeTab === 'search' && (
                    <div className="animate-fadeIn">
                        {/* Filter Panel */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Keyword */}
                                <div className="col-span-1 md:col-span-12 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full py-2.5 pl-10 pr-4 text-[14px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                        placeholder="Nhập tên hoặc mô tả cuộc khảo sát để tìm kiếm..."
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-span-1 md:col-span-4">
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1">Trạng thái</label>
                                    <select 
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full py-2.5 px-3 text-[14px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="all">Tất cả</option>
                                        <option value="opening">Đang mở</option>
                                        <option value="upcoming">Sắp diễn ra</option>
                                        <option value="closed">Đã kết thúc</option>
                                    </select>
                                </div>

                                {/* Date From */}
                                <div className="col-span-1 md:col-span-4">
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1">Từ ngày</label>
                                    <input 
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="w-full py-2.5 px-3 text-[14px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-gray-600"
                                    />
                                </div>

                                {/* Date To */}
                                <div className="col-span-1 md:col-span-4">
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1">Đến ngày</label>
                                    <input 
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="w-full py-2.5 px-3 text-[14px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center justify-end gap-3 mt-5 pt-5 border-t border-gray-100">
                                {(searchQuery || statusFilter !== 'all' || dateFrom || dateTo) && (
                                    <button 
                                        onClick={handleResetFilter}
                                        className="px-4 py-2 text-[14px] font-medium text-gray-500 hover:text-red-500 transition-colors flex items-center"
                                    >
                                        <X size={16} className="mr-1" /> Đặt lại
                                    </button>
                                )}
                                <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                    <Filter size={16} /> Tìm kiếm
                                </button>
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="mb-4">
                            <span className="text-gray-600 font-medium">Tìm thấy <strong className="text-blue-600">{filteredSurveys.length}</strong> cuộc khảo sát</span>
                        </div>

                        {currentSearchSurveys.length > 0 ? (
                            <div className="space-y-4">
                                {currentSearchSurveys.map(renderSurveyCard)}
                                {renderPagination()}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
                                <Search size={40} className="text-gray-300 mb-4" />
                                <h3 className="text-[18px] font-bold text-gray-700 mb-2">Không tìm thấy kết quả</h3>
                                <p className="text-gray-500 text-[14px]">
                                    Vui lòng thử điều chỉnh lại từ khóa đổi bộ lọc tìm kiếm.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyListPage;

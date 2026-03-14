import React, { useState } from 'react';
import { Search, List, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar, Users, Filter, X, ChevronRight as BreadcrumbRight, BookOpen, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// --- MOCK DATA ---
const TOPIC_INFO = {
    id: 1,
    title: "Khảo sát về chất lượng dịch vụ hành chính công",
    description: "Khảo sát nhằm đánh giá mức độ hài lòng của người dân và doanh nghiệp đối với chất lượng thực hiện thủ tục hành chính tại các cơ quan nhà nước, góp phần cải thiện môi trường đầu tư và nâng cao chỉ số hài lòng của người dân về sự phục vụ của cơ quan hành chính nhà nước.",
    image: "/thumb1.png",
    procedure: `
        <p>Quy trình phản ánh ý kiến sẽ trải qua các bước sau:</p>
        <ol class="list-decimal pl-5 mt-2 space-y-2">
            <li><strong>Tiếp nhận:</strong> Hệ thống tự động ghi nhận ý kiến từ các phiếu khảo sát mà người dùng đã gửi.</li>
            <li><strong>Phân loại:</strong> Phân loại ý kiến theo lĩnh vực và mức độ khẩn cấp tự động hoặc qua quá trình duyệt nội bộ.</li>
            <li><strong>Xử lý:</strong> Các đơn vị nghiệp vụ liên quan sẽ tiếp nhận và xử lý dựa trên ý kiến tiếp thu.</li>
            <li><strong>Phản hồi:</strong> Kết quả phản ánh được cập nhật lên hệ thống thành các báo cáo thống kê.</li>
        </ol>
    `,
    legalDocs: [
        { id: 1, docNo: "76/NQ-CP", name: "Ban hành Chương trình tổng thể cải cách hành chính nhà nước giai đoạn 2021-2030" },
        { id: 2, docNo: "766/QĐ-TTg", name: "Phê duyệt Bộ chỉ số chỉ đạo, điều hành và đánh giá chất lượng phục vụ người dân, doanh nghiệp..." }
    ],
    forms: [
        { id: 1, name: "Mẫu phiếu khảo sát giấy.docx", type: "DOCX" },
        { id: 2, name: "Danh sách tiêu chí đánh giá.xlsx", type: "XLSX" }
    ]
};

const baseSurveys = [
    { title: "Khảo sát ý kiến về thủ tục cấp Giấy chứng nhận quyền sử dụng đất", status: "opening", statusText: "Đang mở", date: "01/03/2026 - 31/03/2026", participants: 1250, desc: "Đánh giá mức độ hài lòng về thời gian, chi phí và thái độ cán bộ khi thực hiện thủ tục đất đai." },
    { title: "Đánh giá chất lượng dịch vụ công trực tuyến mức độ 4", status: "upcoming", statusText: "Sắp diễn ra", date: "15/04/2026 - 15/05/2026", participants: 0, desc: "Khảo sát trải nghiệm người dùng trên hệ thống dịch vụ công Quốc gia để cải thiện giao diện và tính năng." },
    { title: "Khảo sát hiệu quả hoạt động của Bộ phận Một cửa cấp xã", status: "closed", statusText: "Đã kết thúc", date: "01/01/2026 - 31/01/2026", participants: 3420, desc: "Lấy ý kiến người dân về sự thuận tiện, thái độ phục vụ và kết quả giải quyết hồ sơ tại cấp xã." }
];

const MOCK_SURVEYS = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `${baseSurveys[i % baseSurveys.length].title} - Đợt ${Math.floor(i / baseSurveys.length) + 1}`,
    status: baseSurveys[i % baseSurveys.length].status,
    statusText: baseSurveys[i % baseSurveys.length].statusText,
    date: baseSurveys[i % baseSurveys.length].date,
    participants: baseSurveys[i % baseSurveys.length].participants + (i * 15),
    description: baseSurveys[i % baseSurveys.length].desc
})).sort((a, b) => b.id - a.id);

const SurveyTopicDetailPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'list'

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // --- LOGIC: SEARCH SURVEYS (UC79.MH03) ---
    const filteredSurveys = MOCK_SURVEYS.filter(survey => {
        const matchQuery = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            survey.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'all' || survey.status === statusFilter;
        return matchQuery && matchStatus;
    });

    const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);
    const currentSearchSurveys = filteredSurveys.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
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
                    {/* Optionally display participants or other icons */}
                </div>

                <Link to={`/khao-sat/${survey.id}`} className="text-[18px] md:text-[20px] font-bold text-[#0f4c81] hover:text-blue-600 leading-snug mb-2 transition-colors">
                    {survey.title}
                </Link>

                <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2">
                    {survey.description}
                </p>
                <div className="mt-3 text-[13px] text-gray-400">
                    5 câu hỏi
                </div>
            </div>

            <div className="md:w-32 flex items-center justify-end md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 shrink-0">
                <Link to={`/khao-sat/${survey.id}`} className="w-full md:w-auto text-center px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100 text-[14px]">
                    Chi tiết
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
            <div className="bg-white border-b border-gray-200 pt-6 pb-0">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    {/* Breadcrumbs */}
                    <div className="flex items-center flex-wrap text-[13px] text-gray-500 mb-4 gap-1">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <BreadcrumbRight size={14} className="mx-1 shrink-0" />
                        <Link to="/chu-de-khao-sat" className="hover:text-blue-600">Khảo sát</Link>
                        <BreadcrumbRight size={14} className="mx-1 shrink-0" />
                        <span className="text-gray-800 font-medium truncate max-w-[300px] md:max-w-none">{TOPIC_INFO.title}</span>
                    </div>

                    <Link to="/chu-de-khao-sat" className="inline-flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-800 font-medium mb-4">
                        <ChevronLeft size={16} /> Quay lại danh sách chủ đề
                    </Link>

                    {/* Topic Image overlay slightly using negative margin */}
                    {TOPIC_INFO.image && (
                        <div className="w-full h-[180px] md:h-[240px] rounded-xl overflow-hidden mb-6 relative">
                            <img src={TOPIC_INFO.image} alt={TOPIC_INFO.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                                    {TOPIC_INFO.title}
                                </h1>
                                {TOPIC_INFO.description && (
                                    <p className="text-gray-200 text-[14px] md:text-[15px] line-clamp-2 md:line-clamp-3">
                                        {TOPIC_INFO.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {!TOPIC_INFO.image && (
                        <>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] mb-2 leading-tight">
                                {TOPIC_INFO.title}
                            </h1>
                            {TOPIC_INFO.description && (
                                <p className="text-gray-600 text-[15px] mb-6 leading-relaxed">
                                    {TOPIC_INFO.description}
                                </p>
                            )}
                        </>
                    )}

                    {/* Tabs Bar */}
                    <div className="flex flex-nowrap overflow-x-auto border-b-2 border-gray-100 no-scrollbar mt-2">
                        <button
                            className={`flex items-center gap-2 px-6 py-3.5 font-semibold text-[15px] whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${activeTab === 'info'
                                    ? 'text-blue-600 border-blue-600'
                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('info')}
                        >
                            Thông tin chủ đề
                        </button>
                        <button
                            className={`flex items-center gap-2 px-6 py-3.5 font-semibold text-[15px] whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${activeTab === 'list'
                                    ? 'text-blue-600 border-blue-600'
                                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('list')}
                        >
                            Danh sách cuộc khảo sát
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                {/* TAB 1: THÔNG TIN CHỦ ĐỀ (UC79.MH02) */}
                {activeTab === 'info' && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Quy trình phản ánh */}
                        {TOPIC_INFO.procedure && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-[18px] font-bold text-[#0f4c81] mb-4 flex items-center gap-2">
                                    <List className="text-blue-500" size={20} /> Quy trình phản ánh
                                </h2>
                                <div
                                    className="text-gray-700 leading-relaxed text-[15px]"
                                    dangerouslySetInnerHTML={{ __html: TOPIC_INFO.procedure }}
                                ></div>
                            </div>
                        )}

                        {/* Căn cứ pháp lý */}
                        {TOPIC_INFO.legalDocs && TOPIC_INFO.legalDocs.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-[18px] font-bold text-[#0f4c81] mb-4 flex items-center gap-2">
                                    <BookOpen className="text-blue-500" size={20} /> Căn cứ pháp lý
                                </h2>
                                <ul className="space-y-3">
                                    {TOPIC_INFO.legalDocs.map(doc => (
                                        <li key={doc.id} className="flex gap-3">
                                            <span className="shrink-0 text-blue-500 mt-0.5">•</span>
                                            <Link to={`/van-ban/${doc.id}`} className="text-blue-600 hover:underline text-[15px]">
                                                {doc.docNo} - {doc.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Biểu mẫu */}
                        {TOPIC_INFO.forms && TOPIC_INFO.forms.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-[18px] font-bold text-[#0f4c81] mb-4 flex items-center gap-2">
                                    <Download className="text-blue-500" size={20} /> Biểu mẫu
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {TOPIC_INFO.forms.map(form => (
                                        <div key={form.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-[10px] text-white
                                                    ${form.type === 'DOCX' ? 'bg-blue-500' : 'bg-green-500'}
                                                `}>
                                                    {form.type}
                                                </div>
                                                <span className="text-[14px] font-medium text-gray-700 truncate" title={form.name}>
                                                    {form.name}
                                                </span>
                                            </div>
                                            <button className="flex items-center justify-center p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors shrink-0 ml-3" title="Tải về">
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!TOPIC_INFO.procedure && !TOPIC_INFO.legalDocs && !TOPIC_INFO.forms && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                Nội dung đang được cập nhật. Vui lòng quay lại sau.
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: DANH SÁCH CUỘC KHẢO SÁT (UC79.MH03) */}
                {activeTab === 'list' && (
                    <div className="animate-fadeIn">
                        {/* Search and Filter Panel (horizontal like mockups typically indicate for Tabs) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6 flex flex-col md:flex-row gap-4 items-center">

                            {/* Search Input */}
                            <form onSubmit={handleSearchSubmit} className="relative w-full md:flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-2.5 pl-10 pr-4 text-[14px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="Tìm kiếm cuộc khảo sát trong chủ đề này..."
                                />
                                {/* Hidden submit button to allow Enter key */}
                                <button type="submit" className="hidden">Submit</button>
                            </form>

                            {/* Status Filter Tabs */}
                            <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto shrink-0 overflow-x-auto no-scrollbar">
                                {[
                                    { value: 'all', label: 'Tất cả' },
                                    { value: 'opening', label: 'Đang mở' },
                                    { value: 'upcoming', label: 'Sắp diễn ra' },
                                    { value: 'closed', label: 'Đã kết thúc' }
                                ].map(st => (
                                    <button
                                        key={st.value}
                                        onClick={() => { setStatusFilter(st.value); setCurrentPage(1); }}
                                        className={`px-4 py-1.5 text-[13px] font-medium rounded-md whitespace-nowrap transition-colors ${statusFilter === st.value
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        {st.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Results */}
                        {currentSearchSurveys.length > 0 ? (
                            <div className="space-y-4">
                                {currentSearchSurveys.map(renderSurveyCard)}
                                {renderPagination()}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
                                <Search size={40} className="text-gray-300 mb-4" />
                                <h3 className="text-[18px] font-bold text-gray-700 mb-2">Không tìm thấy cuộc khảo sát phù hợp.</h3>
                                {MOCK_SURVEYS.length === 0 && (
                                    <p className="text-gray-500 text-[14px]">Hiện chưa có cuộc khảo sát nào trong chủ đề này.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyTopicDetailPage;

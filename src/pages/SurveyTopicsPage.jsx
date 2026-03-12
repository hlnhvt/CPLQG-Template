import React, { useState } from 'react';
import { Search, List, X, BookOpen, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Generate 42 mock items to demonstrate 5 pages of 9 items
const images = ["/thumb1.png", "/thumb2.png", "/thumb3.png"];
const baseTopics = [
    { title: "Khảo sát về chất lượng dịch vụ hành chính công", desc: "Đánh giá mức độ hài lòng của người dân đối với các dịch vụ công trực tuyến mức độ 3, 4 trên toàn quốc." },
    { title: "Lấy ý kiến Dự thảo Luật Đất đai (sửa đổi)", desc: "Thu thập ý kiến đóng góp của nhân dân, chuyên gia về các quy định mới trong Dự thảo Luật Đất đai đang được trình Quốc hội." },
    { title: "Đánh giá hiệu quả phổ biến giáo dục pháp luật", desc: "Khảo sát mức độ hiểu biết và tiếp cận thông tin pháp luật của người dân tại các vùng nông thôn, vùng sâu vùng xa." },
    { title: "Khảo sát nhu cầu hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa", desc: "Tìm hiểu những khó khăn, vướng mắc về mặt pháp lý mà các DNNVV đang gặp phải trong quá trình hoạt động sản xuất kinh doanh." },
    { title: "Ý kiến về các quy định xử phạt vi phạm hành chính giao thông", desc: "Ghi nhận ý kiến người dân về mức phạt, hình thức xử phạt và tính răn đe của Luật Giao thông đường bộ hiện hành." },
    { title: "Đánh giá ứng dụng VNeID trong thủ tục hành chính", desc: "Khảo sát trải nghiệm, sự thuận tiện và các lỗi phát sinh khi người dân sử dụng ứng dụng định danh điện tử VNeID." },
];

const MOCK_TOPICS = Array.from({ length: 423 }, (_, i) => ({
    id: i + 1,
    title: `${baseTopics[i % baseTopics.length].title} - Mẫu ${i + 1}`,
    description: baseTopics[i % baseTopics.length].desc,
    surveyCount: Math.floor(Math.random() * 20) + 1,
    image: images[i % images.length]
}));

const SurveyTopicsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Filter topics based on search query
    const filteredTopics = MOCK_TOPICS.filter(topic => {
        const query = searchQuery.toLowerCase();
        return topic.title.toLowerCase().includes(query) || 
               topic.description.toLowerCase().includes(query);
    });

    const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

    // Get current page topics
    const currentTopics = filteredTopics.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleClearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Optionally scroll to top of list
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    // Render precise pagination identical to the screenshot
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        // Visual logic based on user's screenshot
        // We will generate the 1, 2, 3, 4, 5 ... 47 logic dynamically
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
            <div className="mt-12 mb-8 flex flex-wrap justify-center items-center gap-2">
                {/* First Page */}
                <button 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-400 font-medium hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px]"
                >
                    <ChevronLeft size={16} strokeWidth={2.5} className="mr-1" /> Đầu
                </button>

                {/* Previous Page */}
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-400 font-medium hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px]"
                >
                    <ChevronLeft size={16} strokeWidth={2.5} className="mr-1" /> Trước
                </button>

                {/* Page Numbers */}
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="flex items-center justify-center w-10 h-10 text-gray-400 text-[14px]">
                                ...
                            </span>
                        );
                    }
                    
                    const isActive = currentPage === page;
                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`flex items-center justify-center w-10 h-10 rounded border font-semibold transition-colors text-[14px] ${
                                isActive 
                                    ? 'bg-[#1a3b8b] border-[#1a3b8b] text-white shadow-sm' 
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#1a3b8b] hover:border-[#1a3b8b]'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next Page */}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-800 font-medium hover:bg-gray-50 hover:text-[#1a3b8b] hover:border-[#1a3b8b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px]"
                >
                    Sau <ChevronRight size={16} strokeWidth={2.5} className="ml-1" />
                </button>

                {/* Last Page */}
                <button 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center h-10 px-3 bg-white border border-gray-200 rounded text-gray-800 font-medium hover:bg-gray-50 hover:text-[#1a3b8b] hover:border-[#1a3b8b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px]"
                >
                    Cuối <ChevronRight size={16} strokeWidth={2.5} className="ml-1" />
                </button>
            </div>
        );
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Hero Banner with Search */}
            <div className="bg-gradient-to-r from-[#003cf9] via-[#041c9b] to-[#011466] text-white pt-16 pb-20 relative shadow-sm border-b-4 border-yellow-400">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10 text-center">
                    <h1 className="text-3xl md:text-[40px] font-bold mb-3 drop-shadow-md">Khảo sát theo chủ đề</h1>
                    <p className="text-blue-100 text-[15px] md:text-[16px] mb-10 max-w-2xl mx-auto drop-shadow">
                        Tìm kiếm và lựa chọn các chủ đề khảo sát để đóng góp ý kiến xây dựng chính sách, pháp luật
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-[700px] mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={22} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full py-4 pl-12 pr-12 rounded-full text-gray-900 border-2 border-transparent focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 outline-none text-[15px] md:text-[16px] shadow-lg transition-all"
                            placeholder="Tìm kiếm chủ đề khảo sát..."
                        />
                        {searchQuery && (
                            <button 
                                onClick={handleClearSearch}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                                title="Xóa từ khóa"
                            >
                                <X size={20} />
                            </button>
                        )}
                        
                        {/* Search Result Count */}
                        {searchQuery && (
                            <div className="absolute -bottom-8 left-0 right-0 text-center text-[13px] text-blue-200 font-medium animate-fadeIn">
                                {filteredTopics.length > 0 ? (
                                    <span>Tìm thấy <strong className="text-white">{filteredTopics.length}</strong> chủ đề cho từ khóa "{searchQuery}"</span>
                                ) : (
                                    <span className="text-red-300">Không tìm thấy kết quả nào</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Decorative background */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" fill="#ffffff" />
                    </svg>
                </div>
            </div>

            {/* Topics List */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20">
                {currentTopics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {currentTopics.map((topic) => (
                            <Link key={topic.id} to={`/chu-de-khao-sat/${topic.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full transform hover:-translate-y-1 no-underline">
                                {/* Image 16:9 */}
                                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 shrink-0 border-b border-gray-100">
                                    <img 
                                        src={topic.image} 
                                        alt={topic.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    {/* Badge */}
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm backdrop-blur-md bg-opacity-90 flex items-center gap-1.5 border border-white/20">
                                        <List size={12} />
                                        <span>{topic.surveyCount} khảo sát</span>
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="p-5 md:p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-[16px] md:text-[18px] text-[#0f4c81] group-hover:text-blue-600 leading-snug mb-3 line-clamp-2 transition-colors">
                                        {topic.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2 mb-4">
                                        {topic.description}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-blue-600 text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Xem danh sách khảo sát</span>
                                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State (Không có kết quả) */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <BookOpen size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-[20px] font-bold text-gray-800 mb-2">Không tìm thấy chủ đề khảo sát</h3>
                        <p className="text-gray-500 text-[15px] max-w-md mx-auto">
                            Rất tiếc, chúng tôi không tìm thấy chủ đề nào phù hợp với từ khóa <strong className="text-gray-800">"{searchQuery}"</strong>. 
                            Vui lòng thử lại với từ khóa khác.
                        </p>
                        <button 
                            onClick={handleClearSearch}
                            className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            Xóa tìm kiếm
                        </button>
                    </div>
                )}
                
                {/* Visual Pagination exactly as the user's screenshot */}
                {renderPagination()}
            </div>
        </div>
    );
};

export default SurveyTopicsPage;

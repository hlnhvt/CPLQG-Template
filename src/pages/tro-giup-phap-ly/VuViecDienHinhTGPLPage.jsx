import React, { useEffect, useState } from 'react';
import { 
    ChevronRight, ChevronLeft, Calendar, Building2, Eye, 
    Search, ChevronDown, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const VuViecDienHinhTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [showPerPage, setShowPerPage] = useState(false);
    const itemsPerPage = 10;

    const cases = [
        {
            id: 1,
            title: 'Vụ án "Gây rối trật tự công cộng"',
            field: 'Bào chữa',
            organization: 'Trung tâm TGPL tỉnh Hà Giang',
            views: 1205,
            date: '26/05/2026',
            summary: 'Chưa có mô tả chi tiết cho vụ việc trợ giúp pháp lý này.'
        },
        {
            id: 2,
            title: 'Tham gia tố tụng vụ án Lừa đảo chiếm đoạt tài sản',
            field: 'Bảo vệ',
            organization: 'Trung tâm TGPL TP. Hà Nội',
            views: 3450,
            date: '25/05/2026',
            summary: 'Chưa có mô tả chi tiết cho vụ việc trợ giúp pháp lý này.'
        },
        {
            id: 3,
            title: 'vụ án "Ly hôn và tranh chấp nuôi con"',
            field: 'Bảo vệ',
            organization: 'VPLS Công Lý',
            views: 2100,
            date: '25/05/2026',
            summary: 'yêu cầu Trung tâm cử người thực hiện TGPL bảo vệ trong vụ án "Ly hôn và tranh chấp nuôi con"'
        },
        {
            id: 4,
            title: 'Là bị can trong vụ án hình sự "Tàng trữ trái phép chất ma túy"',
            field: 'Bào chữa',
            organization: 'Trung tâm TGPL tỉnh Đồng Nai',
            views: 890,
            date: '25/05/2026',
            summary: 'Chưa có mô tả chi tiết cho vụ việc trợ giúp pháp lý này.'
        },
        {
            id: 5,
            title: 'Bảo vệ thành công quyền thừa kế cho trẻ em mồ côi tại tỉnh Hà Giang',
            field: 'Đại diện ngoài tố tụng',
            organization: 'Trung tâm TGPL tỉnh Hà Giang',
            views: 1205,
            date: '15/10/2023',
            summary: 'Được Trợ giúp viên pháp lý tham gia tố tụng bảo vệ miễn phí, 3 anh em mồ côi cả cha lẫn mẹ tại huyện Xín Mần đã được Tòa án bảo vệ quyền thừa kế hợp pháp đối với mảnh đất của gia đình bị chú ruột chiếm đoạt từ nhiều năm trước.'
        },
        {
            id: 6,
            title: 'Trợ giúp pháp lý lưu động, giúp đồng bào dân tộc thiểu số làm Giấy khai sinh',
            field: 'Tư vấn pháp luật',
            organization: 'Trung tâm TGPL tỉnh Lai Châu',
            views: 742,
            date: '05/03/2023',
            summary: 'Tổ chức các chuyến TGPL lưu động đến các bản vùng sâu vùng xa, hỗ trợ trực tiếp hơn 40 hộ gia đình đồng bào dân tộc thiểu số hoàn thiện hồ sơ đăng ký khai sinh quá hạn cho trẻ em để các em được đến trường.'
        }
    ];

    const totalPages = Math.ceil(cases.length / itemsPerPage);
    const paginatedCases = cases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            {/* Blue Banner */}
            <div className="bg-[#295fac] text-white pt-10 pb-16">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="inline-block bg-white/20 text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4">
                        Về chúng tôi
                    </div>
                    <h1 className="text-[28px] md:text-3xl font-bold flex items-center gap-3 uppercase tracking-wide mb-6">
                        <Briefcase size={32} />
                        Vụ việc TGPL
                    </h1>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded backdrop-blur-sm border-l-4 border-yellow-400 max-w-2xl">
                        <p className="text-[13px] md:text-sm font-medium leading-relaxed">Thông tin chi tiết về các vụ việc trợ giúp pháp lý trên Cổng Pháp luật Quốc gia</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Main Content Area */}
                    <div className="flex-1 lg:w-[70%]">
                        {/* Search Area */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex-1 flex items-center w-full px-2">
                                <Search size={18} className="text-gray-400 mr-3" />
                                <input type="text" placeholder="Tìm kiếm vụ việc trợ giúp pháp lý..." className="w-full text-[14px] border-none focus:outline-none bg-transparent py-1.5" />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto shrink-0">
                                <button className="bg-[#1e3a8a] text-white px-6 py-2 text-[14px] font-semibold rounded hover:bg-blue-900 transition-colors flex-1 sm:flex-none whitespace-nowrap">Tìm kiếm</button>
                                <button className="bg-white text-gray-700 border border-gray-200 px-6 py-2 text-[14px] font-semibold rounded hover:bg-gray-50 transition-colors flex-1 sm:flex-none whitespace-nowrap">Xóa</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-[13px] mb-4 pl-1">
                            <div className="text-gray-600 font-medium">Tổng: <span className="font-bold text-gray-800">251.402</span> dữ liệu</div>
                            <button onClick={() => setShowPerPage(!showPerPage)} className="text-blue-600 flex items-center gap-1 font-medium hover:underline">Tìm kiếm nâng cao <ChevronDown size={14} className={`transition-transform ${showPerPage ? '' : 'rotate-180'}`} /></button>
                        </div>

                        {showPerPage && (
                            <div className="flex items-center gap-2 text-[13px] mb-6 pl-1 animate-fade-in">
                                <span className="text-gray-600">Số lượng kết quả trên trang:</span>
                                <select className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-700">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {paginatedCases.map((item) => (
                                <Link to={`/tro-giup-phap-ly/vu-viec-dien-hinh/${item.id}`} key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col cursor-pointer group block">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="bg-[#f0f7ff] text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">{item.field}</span>
                                        <span className="flex items-center gap-1.5 text-[12px] text-gray-400 font-medium"><Calendar size={13} /> {item.date}</span>
                                    </div>
                                    <h2 className="text-[16px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2" title={item.title}>
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-5 flex-1">
                                        {item.summary}
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <div className="w-8 h-8 rounded-full bg-[#f8f9fa] border border-gray-200 text-[#556987] flex items-center justify-center shrink-0">
                                            <Briefcase size={14} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-400 uppercase font-semibold">Hình thức</div>
                                            <div className="text-[13px] font-bold text-gray-800">{item.field}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 mb-6 flex justify-start pl-1">
                                <nav className="flex items-center gap-1" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 flex items-center justify-center text-[13px] font-bold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === i + 1
                                                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <TGPLSidebar />

                </div>
            </div>
        </div>
    );
};

export default VuViecDienHinhTGPLPage;

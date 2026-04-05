import React, { useEffect, useState } from 'react';
import { Scale, ChevronRight, ChevronLeft, Calendar, Building2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const VuViecDienHinhTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const cases = [
        {
            id: 1,
            title: 'Bảo vệ thành công quyền thừa kế cho trẻ em mồ côi tại tỉnh Hà Giang',
            field: 'Dân sự - Thừa kế',
            organization: 'Trung tâm TGPL tỉnh Hà Giang',
            views: 1205,
            date: '15/10/2023',
            summary: 'Được Trợ giúp viên pháp lý tham gia tố tụng bảo vệ miễn phí, 3 anh em mồ côi cả cha lẫn mẹ tại huyện Xín Mần đã được Tòa án bảo vệ quyền thừa kế hợp pháp đối với mảnh đất của gia đình bị chú ruột chiếm đoạt từ nhiều năm trước.',
            thumbnail: 'https://picsum.photos/400/300?random=11'
        },
        {
            id: 2,
            title: 'Trợ giúp viên pháp lý bảo vệ miễn trách nhiệm hình sự cho người chưa thành niên',
            field: 'Hình sự',
            organization: 'Trung tâm TGPL TP. Hà Nội',
            views: 3450,
            date: '02/09/2023',
            summary: 'Với lập luận sắc bén và bằng chứng thuyết phục về hoàn cảnh gia đình, Trợ giúp viên pháp lý đã giúp một vị thành niên trộm cắp tài sản giá trị nhỏ do hoàn cảnh túng quẫn được miễn truy cứu trách nhiệm hình sự, mở ra cơ hội làm lại cuộc đời.',
            thumbnail: 'https://picsum.photos/400/300?random=12'
        },
        {
            id: 3,
            title: 'Hỗ trợ pháp lý đòi lại sổ đỏ cho cụ giáo già neo đơn bị lừa đảo',
            field: 'Đất đai - Dân sự',
            organization: 'VPLS Công Lý',
            views: 2100,
            date: '28/08/2023',
            summary: 'Một cụ bà 82 tuổi (cựu giáo chức) bị hàng xóm lừa ký giấy chuyển nhượng quyền sử dụng đất. Nhờ sự vào cuộc kịp thời của các Luật sư thực hiện TGPL, bản hợp đồng vô hiệu đã bị Tòa án hủy bỏ, trả lại tài sản duy nhất cho cụ.',
            thumbnail: 'https://picsum.photos/400/300?random=13'
        },
        {
            id: 4,
            title: 'Bảo vệ quyền lợi hợp pháp cho nhóm công nhân bị sa thải trái pháp luật',
            field: 'Lao động - Việc làm',
            organization: 'Trung tâm TGPL tỉnh Đồng Nai',
            views: 890,
            date: '10/05/2023',
            summary: 'Đại diện bảo vệ cho 15 công nhân bị công ty giày da sa thải trái quy định mà không bồi thường. Kết quả, Tòa án buộc công ty phải nhận lại người lao động làm việc và bồi thường tổng cộng hơn 800 triệu đồng tiền lương những ngày không được làm việc.',
            thumbnail: 'https://picsum.photos/400/300?random=14'
        },
        {
            id: 5,
            title: 'Hòa giải thành công vụ việc tranh chấp nuôi con sau ly hôn',
            field: 'Hôn nhân & Gia đình',
            organization: 'Trung tâm TGPL tỉnh Thanh Hóa',
            views: 1560,
            date: '12/04/2023',
            summary: 'Thông qua công tác tham gia hòa giải cơ sở tận tình, Trợ giúp viên đã giúp một cặp vợ chồng đạt được thỏa thuận về quyền nuôi con và cấp dưỡng, tránh đưa vụ việc ra xét xử căng thẳng, đảm bảo lợi ích tốt nhất cho đứa trẻ.',
            thumbnail: 'https://picsum.photos/400/300?random=15'
        },
        {
            id: 6,
            title: 'Trợ giúp pháp lý lưu động, giúp đồng bào dân tộc thiểu số làm Giấy khai sinh',
            field: 'Hành chính',
            organization: 'Trung tâm TGPL tỉnh Lai Châu',
            views: 742,
            date: '05/03/2023',
            summary: 'Tổ chức các chuyến TGPL lưu động đến các bản vùng sâu vùng xa, hỗ trợ trực tiếp hơn 40 hộ gia đình đồng bào dân tộc thiểu số hoàn thiện hồ sơ đăng ký khai sinh quá hạn cho trẻ em để các em được đến trường.',
            thumbnail: 'https://picsum.photos/400/300?random=16'
        }
    ];

    const totalPages = Math.ceil(cases.length / itemsPerPage);
    const paginatedCases = cases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">

                        <span className="text-gray-800 font-medium">Trợ giúp pháp lý</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide mt-2">
                        <Scale size={32} className="text-blue-600" />
                        Vụ việc điển hình
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">

                <div className="w-full">
                    <div className="flex flex-col gap-6">
                        {paginatedCases.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all group flex flex-col md:flex-row gap-6 items-start cursor-pointer">
                                {/* Thumbnail */}
                                <div className="w-full md:w-[260px] shrink-0 overflow-hidden rounded-lg aspect-video md:aspect-[4/3] relative bg-gray-100 border border-gray-100">
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm border border-blue-400/30">
                                        {item.field}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
                                    <div>
                                        <h2 className="text-[18px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2" title={item.title}>
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-3 mb-4">
                                            {item.summary}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[13px] font-medium text-gray-500 mt-2">
                                        <span className="flex items-center gap-1.5" title="Tổ chức thực hiện"><Building2 size={14} className="text-gray-400" /> {item.organization}</span>
                                        <span className="flex items-center gap-1.5" title="Ngày đăng"><Calendar size={14} className="text-gray-400" /> {item.date}</span>
                                        <span className="flex items-center gap-1.5 text-gray-400 ml-auto hidden sm:flex"><Eye size={14} /> {item.views}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-10 mb-6 flex justify-center">
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
                                        className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === i + 1
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

export default VuViecDienHinhTGPLPage;

import React from 'react';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PBGDPLNewsDetailPage = () => {
    // Mock data for related news
    const relatedNews = [
        {
            id: 1,
            title: 'Hội nghị trực tuyến toàn quốc triển khai công tác tư pháp năm 2026',
            date: '27/07/2026',
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=150&h=100'
        },
        {
            id: 2,
            title: 'Bài viết này sẽ giúp bạn hiểu hơn về PLDC',
            date: '19/06/2026',
            image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=150&h=100'
        },
        {
            id: 3,
            title: 'Chính phủ ban hành quy định về phát triển kỹ năng nghề',
            date: '29/04/2026',
            image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=150&h=100'
        },
        {
            id: 4,
            title: 'Một số nội dung cần lưu ý trong xử phạt vi phạm trong lĩnh vực điện lực',
            date: '25/04/2026',
            image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=150&h=100'
        },
        {
            id: 5,
            title: 'Nâng cao tính thực chất của hoạt động đào tạo cơ bản cho người...',
            date: '22/04/2026',
            image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=150&h=100'
        }
    ];

    return (
        <div className="bg-[#f8f9fa] min-h-screen pt-28 pb-12">
            <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-[#2580f0] mb-8 font-medium bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-fit">
                    <Link to="/" className="hover:underline">Trang chủ</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <Link to="/pho-bien-giao-duc" state={{ activeMenu: 'tin-tuc-hoat-dong' }} className="hover:underline">PBGDPL - Tin tức hoạt động PBGDPL</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-gray-700">Chi tiết</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Column */}
                    <div className="lg:w-[70%] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Featured Image */}
                        <div className="w-full h-[400px] bg-gray-100">
                            <img 
                                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200" 
                                alt="Featured" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-8">
                            {/* Title */}
                            <h1 className="text-3xl font-bold text-[#1b2b49] leading-tight mb-4">
                                Test Đảm bảo tiến độ xây dựng và chất lượng các văn bản quy định chi tiết Luật Trợ giúp pháp lý
                            </h1>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                                    <Calendar size={14} />
                                    <span>02/07/2026</span>
                                </div>
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                    Giới thiệu văn bản mới
                                </span>
                            </div>

                            {/* Sapo */}
                            <p className="font-bold text-gray-800 text-lg mb-6 leading-relaxed">
                                Tóm tắt Đảm bảo tiến độ xây dựng và chất lượng các văn bản quy định chi tiết Luật Trợ giúp pháp lý
                            </p>

                            {/* Content */}
                            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                                <p>Cục trưởng Cục PBGDPL&TGPL Cù Thu Anh và đại diện các đơn vị chuyên môn có liên quan của Cục dự buổi làm việc.</p>
                                
                                <p>Báo cáo tại buổi làm việc, bà Phan Thị Thu Hà - Trưởng phòng Quản lý Trợ giúp pháp lý, Cục PBGDPL&TGPL cho biết, hiện Cục đang triển khai xây dựng hồ sơ dự thảo Nghị định quy định chi tiết Luật TGPL (Nghị định) để xin ý kiến Lãnh đạo Bộ và Ban Thường vụ Đảng ủy Bộ theo đúng quy định.</p>
                                
                                <p>Nghị định dự kiến quy định chi tiết Điều 11, điểm d khoản 2 và khoản 3 Điều 18, Điều 21, Điều 22, Điều 24, Điều 36, Điều 40 và Điều 45 của Luật TGPL và các biện pháp bảo đảm thi hành Luật TGPL như hướng dẫn vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn, việc giao chỉ tiêu vụ việc tham gia tố tụng, chế độ ưu đãi cho người thực hiện TGPL...</p>
                                
                                <p>Về Thông tư quy định chi tiết một số điều của Luật TGPL và hướng dẫn nghiệp vụ TGPL (Thông tư), Cục đã triển khai thực hiện một số công việc như trình Thứ trưởng ban hành quyết định thành lập Tổ soạn thảo và đang tiến hành rà soát các đường lối, chủ trương của Đảng và các văn bản có liên quan; nghiên cứu, rà soát, đánh giá các quy định của các Thông tư trong lĩnh vực TGPL và các nội dung được giao tại Luật, dự kiến những nội dung cần quy định; xây dựng hồ sơ dự thảo Thông tư để chuẩn bị xin ý kiến Lãnh đạo Bộ và Ban Thường vụ Đảng ủy Bộ theo đúng quy định.</p>

                                <p>Nội dung Thông tư quy định chi tiết các nội dung được Luật giao về trình tự thủ tục thực hiện yêu cầu, thụ lý vụ việc TGPL (khoản 9 Điều 1); tư vấn pháp luật (khoản 10 Điều 1); đại diện ngoài tố tụng (khoản 11 Điều 1); phối hợp xác minh vụ việc TGPL...</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:w-[30%]">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-28">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                                <h3 className="font-bold text-[#1b2b49] text-lg">Tin tức cùng chuyên mục</h3>
                                <Link to="/pho-bien-giao-duc" state={{ activeMenu: 'tin-tuc-hoat-dong' }} className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                                    Xem tất cả <ArrowRight size={12} />
                                </Link>
                            </div>

                            <div className="flex flex-col gap-4">
                                {relatedNews.map((news) => (
                                    <Link key={news.id} to={`/tin-tuc/${news.id}`} className="group flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className="w-[80px] h-[60px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <h4 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                                                {news.title}
                                            </h4>
                                            <span className="text-[11px] text-gray-400 font-medium">{news.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PBGDPLNewsDetailPage;

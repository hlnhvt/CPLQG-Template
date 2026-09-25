import React from 'react';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PBGDPLNewsDetailPage = () => {
    // Mock data for related news
    const relatedNews = [
        {
            id: 1,
            title: 'Lào Cai dự Hội nghị trực tuyến toàn quốc triển khai công tác tư pháp năm 2026',
            date: '27/07/2026',
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=150&h=100'
        },
        {
            id: 2,
            title: 'Sở Tư pháp tỉnh Lào Cai triển khai Kế hoạch PBGDPL năm 2026',
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
                    <Link to="/lao-cai-v2/pho-bien-giao-duc" state={{ activeMenu: 'tin-tuc-hoat-dong' }} className="hover:underline">PBGDPL - Tin tức hoạt động PBGDPL</Link>
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
                                Lào Cai triển khai các văn bản quy định chi tiết Luật Trợ giúp pháp lý
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
                                Sở Tư pháp tỉnh Lào Cai tổ chức buổi làm việc nhằm quán triệt, chuẩn bị triển khai các văn bản quy định chi tiết Luật Trợ giúp pháp lý trên địa bàn tỉnh.
                            </p>

                            {/* Content */}
                            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                                <p>Giám đốc Sở Tư pháp tỉnh Lào Cai, lãnh đạo Trung tâm Trợ giúp pháp lý Nhà nước tỉnh và đại diện các phòng chuyên môn có liên quan dự buổi làm việc.</p>
                                
                                <p>Báo cáo tại buổi làm việc, lãnh đạo Trung tâm Trợ giúp pháp lý Nhà nước tỉnh cho biết, Trung tâm đang theo dõi sát tiến độ xây dựng dự thảo Nghị định quy định chi tiết Luật TGPL (Nghị định) do Bộ Tư pháp chủ trì để kịp thời tham mưu Sở Tư pháp, UBND tỉnh các nội dung cần chuẩn bị triển khai tại địa phương.</p>
                                
                                <p>Nghị định dự kiến quy định chi tiết Điều 11, điểm d khoản 2 và khoản 3 Điều 18, Điều 21, Điều 22, Điều 24, Điều 36, Điều 40 và Điều 45 của Luật TGPL và các biện pháp bảo đảm thi hành Luật TGPL như hướng dẫn vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn, việc giao chỉ tiêu vụ việc tham gia tố tụng, chế độ ưu đãi cho người thực hiện TGPL...</p>
                                
                                <p>Về Thông tư quy định chi tiết một số điều của Luật TGPL và hướng dẫn nghiệp vụ TGPL (Thông tư), Sở Tư pháp đã giao Trung tâm rà soát quy trình tiếp nhận, thụ lý vụ việc, đánh giá thực trạng đội ngũ người thực hiện trợ giúp pháp lý và các Chi nhánh trên địa bàn tỉnh để sẵn sàng áp dụng khi văn bản được ban hành.</p>

                                <p>Nội dung Thông tư quy định chi tiết các nội dung được Luật giao về trình tự thủ tục thực hiện yêu cầu, thụ lý vụ việc TGPL (khoản 9 Điều 1); tư vấn pháp luật (khoản 10 Điều 1); đại diện ngoài tố tụng (khoản 11 Điều 1); phối hợp xác minh vụ việc TGPL...</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:w-[30%]">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-28">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                                <h3 className="font-bold text-[#1b2b49] text-lg">Tin tức cùng chuyên mục</h3>
                                <Link to="/lao-cai-v2/pho-bien-giao-duc" state={{ activeMenu: 'tin-tuc-hoat-dong' }} className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                                    Xem tất cả <ArrowRight size={12} />
                                </Link>
                            </div>

                            <div className="flex flex-col gap-4">
                                {relatedNews.map((news) => (
                                    <Link key={news.id} to={`/lao-cai-v2/pho-bien-giao-duc/tin-tuc/${news.id}`} className="group flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
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

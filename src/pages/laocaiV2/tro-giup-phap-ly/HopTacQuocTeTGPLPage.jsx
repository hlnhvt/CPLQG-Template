import LaoCaiV2BannerDecor from '../../../components/laocaiV2/LaoCaiV2BannerDecor';
import React, { useEffect } from 'react';
import { Newspaper, Calendar, Clock } from 'lucide-react';
import TGPLSidebar from '../../../components/laocaiV2/tro-giup-phap-ly/TGPLSidebar';

const HopTacQuocTeTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Mock data
    const articles = [
        { 
            id: 1, 
            title: 'Hội đàm trao đổi kinh nghiệm hỗ trợ pháp lý cho cư dân biên giới Lào Cai (Việt Nam) - Vân Nam (Trung Quốc)', 
            summary: 'Sở Tư pháp tỉnh Lào Cai và cơ quan tư pháp tỉnh Vân Nam trao đổi kinh nghiệm hỗ trợ pháp lý cho cư dân biên giới trong các vụ việc hôn nhân có yếu tố nước ngoài, lao động qua biên giới và phòng chống mua bán người.', 
            date: '15/07/2026', 
            time: '08:30',
            image: 'https://picsum.photos/seed/ht1/400/250' 
        },
        { 
            id: 2, 
            title: 'Trung tâm TGPL tỉnh Lào Cai tiếp nhận hỗ trợ kỹ thuật từ dự án hợp tác quốc tế về tiếp cận công lý', 
            summary: 'Dự án hỗ trợ tập huấn kỹ năng cho Trợ giúp viên pháp lý, biên soạn tài liệu song ngữ Việt - Mông, Việt - Dao phục vụ trợ giúp pháp lý cho đồng bào dân tộc thiểu số.', 
            date: '22/06/2026', 
            time: '10:00',
            image: 'https://picsum.photos/seed/ht2/400/250' 
        },
        { 
            id: 3, 
            title: 'Lào Cai tham gia hội thảo quốc tế về trợ giúp pháp lý cho người dân tộc thiểu số vùng biên giới', 
            summary: 'Đại diện Trung tâm TGPL Nhà nước tỉnh Lào Cai chia sẻ kinh nghiệm trợ giúp pháp lý lưu động tại các xã vùng cao, biên giới và tiếp thu mô hình hay của các nước trong khu vực.', 
            date: '10/05/2026', 
            time: '15:45',
            image: 'https://picsum.photos/seed/ht3/400/250' 
        },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white pt-10 pb-20 relative overflow-hidden">
                <LaoCaiV2BannerDecor />
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight flex items-center gap-3 uppercase">
                            <Newspaper size={32} className="text-white" />
                            HỢP TÁC QUỐC TẾ VỀ TGPL
                        </h1>
                        <p className="text-white text-[15px] leading-relaxed border-l-2 border-yellow-400 pl-3 py-0.5 bg-white/10 rounded-r inline-block">
                            Thông tin, sự kiện và hoạt động hợp tác quốc tế trong lĩnh vực trợ giúp pháp lý
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        {/* Simple List Articles */}
                        <div className="space-y-8">
                            {articles.map((article, index) => (
                                <div key={article.id} className={`flex flex-col sm:flex-row gap-6 cursor-pointer group ${index !== articles.length - 1 ? 'border-b border-gray-100 pb-8' : ''}`}>
                                    <div className="w-full sm:w-[280px] h-[180px] shrink-0 overflow-hidden rounded-lg">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <h3 className="font-bold text-[18px] text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h3>
                                        {article.summary && (
                                            <p className="text-[14px] text-gray-600 line-clamp-4 leading-relaxed mb-4">
                                                {article.summary}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-[13px] text-gray-500 mt-auto font-medium pt-1">
                                            <span className="flex items-center gap-1.5"><Calendar size={15} /> {article.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={15} /> {article.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        <div className="pt-10 pb-4 flex justify-center items-center gap-2 border-t border-gray-100 mt-8">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Trước</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-[#3b82f6] text-white rounded-lg text-[14px] font-bold shadow-sm border border-[#3b82f6]">1</button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-not-allowed opacity-50">Sau</button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
                        <TGPLSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HopTacQuocTeTGPLPage;

import React, { useEffect } from 'react';
import { Newspaper, Calendar, Clock } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const BanVaTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Mock data for the page based on the new simple image
    const articles = [
        { 
            id: 1, 
            title: 'Đánh giá mức độ tiệm cận giữa pháp luật trợ giúp pháp lý Việt Nam và pháp luật một số nước trên thế giới', 
            summary: '', 
            date: '11/06/2026', 
            time: '07:39',
            image: 'https://picsum.photos/seed/bg1/400/250' 
        },
        { 
            id: 2, 
            title: 'Lựa chọn tổ chức cung cấp dịch vụ trợ giúp pháp lý tại Mỹ', 
            summary: 'Tại Mỹ, quyền có luật sư bào chữa là quyền Hiến định. Trong tố tụng dân sự, không bắt buộc có sự tham gia của luật sư. Do đó, trong tố tụng hình sự, bất cứ người nào không có khả năng thuê luật sư thì Nhà nước có trách nhiệm cử luật sư bảo vệ. Do đó, Nhà nước thành lập hệ thống các Văn phòng luật sư công (Public Defender Office) cấp liên bang và tiểu bang để cung cấp dịch vụ bào chữa công cho người nghèo, người không đủ khả năng thuê luật sư trong các phiên tòa hình sự. Trong lĩnh vực dân sự, việc cung cấp dịch vụ trợ giúp pháp lý do các tổ chức được lựa chọn thực hiện...', 
            date: '11/06/2026', 
            time: '08:15',
            image: 'https://picsum.photos/seed/bg2/400/250' 
        },
        { 
            id: 3, 
            title: 'Bảo đảm quyền được luật sư bào chữa của người bị buộc tội trong các vụ án hình sự nghiêm trọng tại Hoa Kỳ', 
            summary: 'Quyền được luật sư bào chữa của người bị buộc tội trong các vụ án hình sự nghiêm trọng tại Hoa Kỳ được bảo đảm trên cơ sở hiến định và được cụ thể hóa bằng một hệ thống thể chế, tài chính và tổ chức thực thi tương đối hoàn chỉnh.', 
            date: '18/05/2026', 
            time: '14:20',
            image: 'https://picsum.photos/seed/bg3/400/250' 
        },
        { 
            id: 4, 
            title: 'Kinh nghiệm xây dựng và thực thi luật trợ giúp pháp lý Phần Lan - Gợi mở cho Việt Nam trong hoàn thiện thể chế về trợ giúp pháp lý', 
            summary: 'Phần Lan - một quốc gia Bắc Âu với truyền thống pháp quyền và mô hình nhà nước phúc lợi phát triển - đã xây dựng Luật Trợ giúp pháp lý (Luật số 257/2002, đã được sửa đổi bởi Đạo luật số 720/2011) theo hướng hiện đại, minh bạch và chú trọng bảo đảm quyền tiếp cận công lý trên cơ sở điều kiện kinh tế của cá nhân. Những thiết kế thể chế của Phần Lan cho thấy cách tiếp cận linh hoạt nhưng chặt chẽ, vừa bảo đảm quyền của người dân vừa kiểm soát hiệu quả chi ngân sách. Trong bối cảnh cải cách...', 
            date: '18/05/2026', 
            time: '09:05',
            image: 'https://picsum.photos/seed/bg4/400/250' 
        },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* HERO SECTION */}
            <div className="bg-[#295fac] text-white pt-10 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight flex items-center gap-3 uppercase">
                            <Newspaper size={32} className="text-white" />
                            BẠN VÀ TRỢ GIÚP PHÁP LÝ
                        </h1>
                        <p className="text-white text-[15px] leading-relaxed border-l-2 border-yellow-400 pl-3 py-0.5 bg-white/10 rounded-r inline-block">
                            Thông tin, câu chuyện, mô hình điển hình về bạn và trợ giúp pháp lý
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
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">2</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">3</button>
                            <span className="px-2 text-gray-400">...</span>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Sau</button>
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

export default BanVaTGPLPage;

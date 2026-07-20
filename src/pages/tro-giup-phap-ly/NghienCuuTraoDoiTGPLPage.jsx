import React, { useEffect } from 'react';
import { Lightbulb, MessageSquare, User } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const NghienCuuTraoDoiTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const articles = [
        { id: 1, title: 'Thông tin kinh doanh Bình luận Vinamilk chào đón kỷ niệm 50 năm thành lập với 5 giải thưởng quốc tế tại Hội nghị sữa toàn cầu 2026', author: 'PV', date: '24/6/2026', comments: 0 },
        { id: 2, title: 'MB đồng hành cùng doanh nghiệp quân đội thúc đẩy chuyển đổi số và phát triển bền vững', author: 'PV', date: '24/6/2026', comments: 0 },
        { id: 3, title: 'Kiềng ba chân bảo chứng lợi nhuận ròng của bất động sản dòng tiền', author: 'PV', date: '24/6/2026', comments: 0 },
        { id: 4, title: 'Hướng tới chiến lược phát triển báo chí kiến tạo', author: 'Thanh Niên', date: '24/6/2026', comments: 0 },
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
                            <Lightbulb size={32} className="text-white" />
                            NGHIÊN CỨU & TRAO ĐỔI
                        </h1>
                        <div className="bg-[#1e4a95]/40 rounded-lg p-4 mt-6 inline-block">
                            <p className="text-white text-[15px] leading-relaxed">
                                Diễn đàn khoa học pháp lý, chia sẻ kinh nghiệm nghiệp vụ từ đội ngũ chuyên gia, Luật sư và Trợ giúp viên pháp lý.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Search Bar Block */}
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-5">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..." 
                                    className="w-full md:flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-blue-400 transition-colors bg-gray-50/50 text-black" 
                                />
                                <div className="flex gap-2 w-full md:w-auto shrink-0">
                                    <button className="flex-1 md:flex-none bg-[#1e3a8a] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm">
                                        Tìm kiếm
                                    </button>
                                    <button className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Article Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {articles.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group flex flex-col h-full cursor-pointer">
                                    <div className="mb-4">
                                        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                                            BÀI VIẾT CHUYÊN SÂU
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-8 group-hover:text-blue-600 transition-colors flex-1 line-clamp-3">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                <User size={16} className="text-gray-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-gray-900 leading-none mb-1">{item.author}</span>
                                                <span className="text-[11px] text-gray-500 leading-none">{item.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-[13px]">
                                            <MessageSquare size={14} />
                                            <span>{item.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="pt-4 pb-2 flex justify-center items-center gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Trước</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-[#3b82f6] text-white rounded-lg text-[14px] font-bold shadow-sm border border-[#3b82f6]">1</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">2</button>
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">3</button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors">Sau</button>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <TGPLSidebar />
                </div>
            </div>
        </div>
    );
};

export default NghienCuuTraoDoiTGPLPage;

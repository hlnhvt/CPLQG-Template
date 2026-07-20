import React, { useEffect, useState } from 'react';
import { Newspaper, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const TinTucHoatDongTGPLPage = () => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const news = [
        { id: 1, title: 'Hành trình mang ánh sáng pháp luật đến với đồng bào dân tộc thiểu số', date: '08/07/2026', time: '17:23', summary: 'Ghi nhận nỗ lực không mệt mỏi của các trợ giúp viên pháp lý băng rừng lội suối mang kiế...', isHot: true },
        { id: 2, title: 'Nâng cao chất lượng đại diện ngoài tố tụng cho đối tượng yếu thế', date: '08/07/2026', time: '17:23', summary: 'Hỗ trợ đắc lực các đối tượng yếu thế làm việc với các cơ quan hành chính nhà nước về các...', isHot: true },
        { id: 3, title: 'Phát huy vai trò của tổ chức chính trị xã hội trong trợ giúp pháp lý', date: '08/07/2026', time: '17:23', summary: 'Tăng cường ký kết phối hợp liên tịch với Hội Phụ nữ, Hội Nông dân tổ chức các hoạt động...', isHot: true },
        { id: 4, title: 'Giải quyết nhanh chóng yêu cầu trợ giúp pháp lý qua cổng dịch vụ công', date: '08/07/2026', time: '17:23', summary: 'Rút ngắn tối đa quy trình thủ tục giấy tờ, số hóa toàn bộ khâu thẩm định đối tượng giúp...', isHot: false },
        { id: 5, title: 'Hỗ trợ pháp lý kịp thời bảo vệ quyền lợi cho người cao tuổi cô đơn', date: '08/07/2026', time: '17:23', summary: 'Trung tâm trợ giúp pháp lý đã cử luật sư bảo vệ quyền thừa kế hợp pháp và giải quyết tran...', isHot: false },
        { id: 6, title: 'Tập huấn kỹ năng tư vấn pháp luật đất đai cho người nghèo', date: '08/07/2026', time: '17:23', summary: 'Nâng cao năng lực chuyên môn cho trợ giúp viên giải quyết các vướng mắc sâu rộng về...', isHot: false },
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
                            TIN TỨC HOẠT ĐỘNG TGPL
                        </h1>
                        <p className="text-white text-[15px] leading-relaxed border-l-2 border-yellow-400 pl-3 py-0.5 bg-white/10 rounded-r inline-block">
                            Thông tin chi tiết về các hoạt động quan đến trợ giúp pháp lý trên Cổng Pháp luật Quốc gia
                        </p>
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
                                    placeholder="Tìm kiếm theo tiêu đề bài viết..."
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

                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                                    className="text-blue-600 hover:text-blue-800 text-[13px] font-medium flex items-center gap-1 transition-colors"
                                >
                                    Tìm kiếm nâng cao {isAdvancedSearchOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>

                            {/* Advanced Search Area */}
                            {isAdvancedSearchOpen && (
                                <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-[13px] font-medium text-gray-700">Thời gian</label>
                                            <div className="flex items-center gap-2">
                                                <input type="date" className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-[13px] outline-none focus:border-blue-400 text-black bg-white" title="Từ ngày" />
                                                <span className="text-gray-400">-</span>
                                                <input type="date" className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-[13px] outline-none focus:border-blue-400 text-black bg-white" title="Đến ngày" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-medium text-gray-700">Địa phương</label>
                                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-blue-400 text-black bg-white appearance-none">
                                                <option>-- Tất cả --</option>
                                                <option>Hà Nội</option>
                                                <option>TP. Hồ Chí Minh</option>
                                                <option>Đà Nẵng</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-medium text-gray-700">Loại hình hoạt động</label>
                                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-blue-400 text-black bg-white appearance-none">
                                                <option>-- Tất cả --</option>
                                                <option>Phổ biến giáo dục pháp luật</option>
                                                <option>Tư vấn pháp luật</option>
                                                <option>Đại diện ngoài tố tụng</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {news.map(item => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col h-full">
                                    <div className="h-[180px] overflow-hidden bg-gray-100 relative shrink-0">
                                        <img src={`https://picsum.photos/seed/news${item.id}/400/250`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        {item.isHot && (
                                            <span className="text-[#dc2626] text-[11px] font-bold uppercase tracking-wider mb-2 block">
                                                TIN NỔI BẬT
                                            </span>
                                        )}
                                        <h3 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-blue-600 line-clamp-3 mb-2 flex-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-[13px] text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                                            {item.summary}
                                        </p>
                                        <div className="flex items-center gap-4 text-[12px] text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={14} /> {item.time}</span>
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
                            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">4</button>
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

export default TinTucHoatDongTGPLPage;

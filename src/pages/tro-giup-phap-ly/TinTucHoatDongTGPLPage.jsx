import React, { useEffect } from 'react';
import { Newspaper, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TinTucHoatDongTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const news = [
        { id: 1, title: 'Tăng cường chất lượng công tác trợ giúp pháp lý tại các tỉnh miền núi phía Bắc', date: '25/11/2023', isHot: true },
        { id: 2, title: 'Hội nghị trực tuyến toàn quốc sơ kết 5 năm thi hành Luật Trợ giúp pháp lý 2017', date: '20/11/2023', isHot: true },
        { id: 3, title: 'Ký kết Chương trình phối hợp trực trợ giúp pháp lý trong điều tra hình sự', date: '15/11/2023', isHot: false },
        { id: 4, title: 'Lớp tập huấn kỹ năng trợ giúp pháp lý cho người yếu thế tại Đà Nẵng', date: '10/11/2023', isHot: false },
        { id: 5, title: 'Cục Trợ giúp pháp lý làm việc với Đoàn chuyên gia từ Bộ Tư pháp Nhật Bản', date: '05/11/2023', isHot: false },
        { id: 6, title: 'Kết quả triển khai đợt truyền thông về quyền được trợ giúp pháp lý', date: '01/11/2023', isHot: false },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-6 mb-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-medium">Trợ giúp pháp lý</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide mt-2">
                        <Newspaper size={32} className="text-blue-600" />
                        Tin tức hoạt động Trợ giúp pháp lý
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Featured */}
                        {news.filter(n => n.isHot).map((item, idx) => (
                            <div key={`hot-${idx}`} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow group cursor-pointer">
                                <div className="w-full md:w-[300px] lg:w-[400px] h-48 md:h-auto shrink-0 overflow-hidden bg-gray-100">
                                    <img src={`https://picsum.photos/seed/news${item.id}/600/400`} alt="News thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase">Tin nổi bật</span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1.5"><Calendar size={14}/> {item.date}</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-700 leading-tight mb-3">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 text-[15px] line-clamp-2 md:line-clamp-3 leading-relaxed">
                                        Nhằm nâng cao chất lượng và hiệu quả của công tác trợ giúp pháp lý, Bộ Tư pháp đã triển khai nhiều chương trình hành động thiết thực, đặc biệt tập trung tại các khu vực vùng sâu, vùng xa, nơi người dân còn gặp nhiều khó khăn trong việc tiếp cận pháp luật...
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {news.filter(n => !n.isHot).map(item => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors group cursor-pointer">
                                    <div className="h-48 overflow-hidden bg-gray-100">
                                        <img src={`https://picsum.photos/seed/news${item.id}/400/250`} alt="News thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5"><Calendar size={14}/> {item.date}</div>
                                        <h3 className="font-bold text-[17px] text-gray-900 leading-tight group-hover:text-blue-600 line-clamp-3">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="pt-8 text-center pb-4">
                            <button className="px-6 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-100 transition-colors">Xem thêm tin tức</button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <h3 className="font-bold text-[#1e3a8a] text-[16px] mb-4 uppercase tracking-wider border-b-2 border-blue-600 pb-2 inline-block">Chủ đề được quan tâm</h3>
                            <ul className="space-y-2 mt-2">
                                {['Hình sự', 'Dân sự', 'Đất đai', 'Chính sách người có công', 'Trẻ em', 'Bạo lực gia đình'].map((tag, i) => (
                                    <li key={i}>
                                        <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 group p-2 rounded hover:bg-gray-50">
                                            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 mr-2" />
                                            {tag}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <img src="/banner_hotline.png" alt="Đường dây nóng 1900.6179" className="w-full rounded-xl shadow-sm hidden md:block" />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TinTucHoatDongTGPLPage;

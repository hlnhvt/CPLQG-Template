import React, { useEffect } from 'react';
import { Scale, ChevronRight, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';

const VuViecDienHinhTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cases = [
        { id: 1, title: 'Bảo vệ thành công quyền thừa kế cho trẻ em mồ côi tại tỉnh Hà Giang', tag: 'Dân sự - Thừa kế', author: 'Trung tâm TGPL tỉnh Hà Giang', views: 1205 },
        { id: 2, title: 'Trợ giúp viên pháp lý bảo vệ miễn trách nhiệm hình sự cho người chưa thành niên', tag: 'Hình sự', author: 'Trung tâm TGPL TP. Hà Nội', views: 3450 },
        { id: 3, title: 'Hỗ trợ pháp lý đòi lại sổ đỏ cho cụ giáo già neo đơn bị lừa đảo', tag: 'Đất đai', author: 'VPLS Công Lý', views: 2100 },
        { id: 4, title: 'Bảo vệ quyền lợi hợp pháp cho nhóm công nhân bị sa thải trái pháp luật', tag: 'Lao động', author: 'Trung tâm TGPL tỉnh Đồng Nai', views: 890 },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-medium">Trợ giúp pháp lý</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide mt-2">
                        <Scale size={32} className="text-blue-600" />
                        Vụ việc điển hình
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8 flex flex-col lg:flex-row gap-8">
                
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cases.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:-translate-y-1 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1 border border-blue-100">
                                        <Tags size={12}/> {item.tag}
                                    </span>
                                </div>
                                <h2 className="text-[17px] font-bold text-gray-900 leading-snug mb-4 group-hover:text-blue-700 line-clamp-3">
                                    {item.title}
                                </h2>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500 font-medium">
                                    <span>Thực hiện: {item.author}</span>
                                    <span>{item.views} lượt đọc</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-lg shadow-sm">Xem tất cả</button>
                    </div>
                </div>

                <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl shadow-md text-white p-6 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-20">
                            <Scale size={150} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Chia sẻ vụ việc nổi bật</h3>
                            <p className="text-emerald-100 text-sm mb-4 leading-relaxed">Lan tỏa những câu chuyện pháp lý ý nghĩa, kinh nghiệm tranh tụng từ thực tiễn để tham khảo, học tập.</p>
                            <button className="bg-white text-emerald-700 font-bold px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-emerald-50 transition-colors">
                                Đóng góp bài viết
                            </button>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default VuViecDienHinhTGPLPage;

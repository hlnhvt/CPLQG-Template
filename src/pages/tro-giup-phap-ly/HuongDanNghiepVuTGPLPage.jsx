import React, { useEffect } from 'react';
import { BookMarked, Search, ArrowRight, FolderOpen } from 'lucide-react';

const HuongDanNghiepVuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const topics = [
        { id: 1, name: 'Nghiệp vụ Trợ giúp pháp lý trong Tố tụng hình sự', count: 45 },
        { id: 2, name: 'Nghiệp vụ Trợ giúp pháp lý trong Tố tụng dân sự', count: 38 },
        { id: 3, name: 'Nghiệp vụ Trợ giúp pháp lý trong Tố tụng hành chính', count: 24 },
        { id: 4, name: 'Kỹ năng đại diện ngoài tố tụng', count: 15 },
        { id: 5, name: 'Kỹ năng tư vấn pháp luật', count: 42 },
        { id: 6, name: 'Quy tắc ứng xử và đạo đức nghề nghiệp', count: 18 },
    ];

    const guides = [
        { id: 1, title: 'Hướng dẫn kỹ năng làm việc với trẻ em bị xâm hại trong tố tụng hình sự', category: 'Tố tụng hình sự', date: '10/10/2023' },
        { id: 2, title: 'Sổ tay hướng dẫn kỹ năng TGPL cho người khuyết tật có khó khăn về nhận thức', category: 'Tư vấn pháp luật', date: '05/09/2023' },
        { id: 3, title: 'Kỹ năng thu thập, đánh giá chứng cứ trong các vụ án tranh chấp đất đai', category: 'Tố tụng dân sự', date: '12/08/2023' },
        { id: 4, title: 'Hướng dẫn đánh giá chất lượng vụ việc TGPL tham gia tố tụng', category: 'Quy tắc nghề nghiệp', date: '20/07/2023' },
        { id: 5, title: 'Kỹ năng hòa giải tại cơ sở và vai trò của Trợ giúp viên', category: 'Đại diện ngoài tố tụng', date: '15/06/2023' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide">
                        <BookMarked size={32} className="text-blue-600" />
                        Hướng dẫn Nghiệp vụ
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8 flex flex-col lg:flex-row gap-8">
                
                {/* Sidebar Categories */}
                <aside className="w-full lg:w-[320px] shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
                        <h3 className="font-bold text-[#1e3a8a] text-[16px] mb-4 uppercase tracking-wider relative inline-block">
                            Danh mục Nghiệp vụ
                            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-yellow-400"></span>
                        </h3>
                        <ul className="space-y-1 mt-3">
                            {topics.map(topic => (
                                <li key={topic.id}>
                                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-left text-gray-700 hover:text-blue-700 transition-colors group">
                                        <div className="flex items-start gap-2 pr-2">
                                            <FolderOpen size={16} className="mt-0.5 text-gray-400 group-hover:text-blue-500 shrink-0" />
                                            <span className="text-[14px] font-medium leading-snug">{topic.name}</span>
                                        </div>
                                        <span className="bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                                            {topic.count}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-4">
                        <div className="flex-1 relative">
                            <input type="text" placeholder="Tìm kiếm tài liệu hướng dẫn..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {guides.map((guide) => (
                            <div key={guide.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded uppercase tracking-wider border border-emerald-100">
                                        {guide.category}
                                    </span>
                                    <h3 className="font-bold text-[17px] text-gray-900 leading-snug group-hover:text-blue-600">
                                        {guide.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium">Cập nhật: {guide.date}</p>
                                </div>
                                <button className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 mt-2 sm:mt-0 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white rounded-md text-sm font-medium transition-colors">
                                    Chi tiết <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HuongDanNghiepVuTGPLPage;

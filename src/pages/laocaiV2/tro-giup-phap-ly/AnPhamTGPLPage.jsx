import React, { useEffect } from 'react';
import { BookOpen, Download, Search, FileText } from 'lucide-react';

const AnPhamTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const publications = [
        { id: 1, title: 'Sổ tay: Quyền được trợ giúp pháp lý của nạn nhân bị bạo lực gia đình', type: 'Sổ tay', file: 'PDF', size: '2.4 MB' },
        { id: 2, title: 'Tờ gấp: Những điều cần biết về Trợ giúp pháp lý trong Tố tụng hình sự', type: 'Tờ gấp', file: 'PDF', size: '1.1 MB' },
        { id: 3, title: 'Cẩm nang nghiệp vụ dành cho Trợ giúp viên pháp lý', type: 'Cẩm nang', file: 'PDF', size: '5.6 MB' },
        { id: 4, title: 'Tờ rơi: Hướng dẫn trình tự, thủ tục yêu cầu trợ giúp pháp lý', type: 'Tờ rơi', file: 'PDF', size: '0.8 MB' },
        { id: 5, title: 'Sách Hỏi đáp pháp luật về Trợ giúp pháp lý', type: 'Sách', file: 'PDF', size: '8.2 MB' },
        { id: 6, title: 'Quy tắc nghề nghiệp của người thực hiện trợ giúp pháp lý', type: 'Tài liệu nghiệp vụ', file: 'PDF', size: '1.5 MB' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide">
                        <BookOpen size={32} className="text-blue-600" />
                        Ấn phẩm Truyền thông & Tài liệu
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                
                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex gap-4">
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm tài liệu, sách, tờ gấp..." 
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-[15px]"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    </div>
                </div>

                {/* List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publications.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-400 hover:shadow-md transition-all group flex flex-col h-full">
                            <div className="h-40 bg-gray-50 border-b border-gray-100 flex items-center justify-center p-6 relative">
                                <FileText size={48} className="text-blue-300 group-hover:scale-110 transition-transform" />
                                <span className="absolute bottom-3 left-4 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                    {item.type}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-4 group-hover:text-blue-700">
                                    {item.title}
                                </h3>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                                        {item.file} • {item.size}
                                    </div>
                                    <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
                                        <Download size={16} />
                                        Tải về
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnPhamTGPLPage;

import React, { useEffect } from 'react';
import { Lightbulb, PenTool, MessageSquare, ChevronRight, User } from 'lucide-react';

const NghienCuuTraoDoiTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const articles = [
        { id: 1, title: 'Bàn về quyền im lặng trong Tố tụng hình sự dưới góc độ người bào chữa', author: 'ThS. Nguyễn Văn A - TGV.HN', date: '01/11/2023', comments: 15 },
        { id: 2, title: 'Bảo vệ tài sản của người dân tộc thiểu số trong các giao dịch dân sự', author: 'LS. Lê Thị B - Đoàn LS Nghệ An', date: '25/10/2023', comments: 8 },
        { id: 3, title: 'Giải pháp nâng cao hiệu quả hoạt động trợ giúp pháp lý cho trẻ em', author: 'TS. Trần C - Học viện Tư pháp', date: '10/10/2023', comments: 24 },
        { id: 4, title: 'Khó khăn, vướng mắc trong việc phối hợp thực hiện Thông tư liên tịch số 10', author: 'Cục Trợ giúp pháp lý', date: '05/09/2023', comments: 42 },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3 uppercase tracking-wide">
                            <Lightbulb size={32} className="text-yellow-500" />
                            Nghiên cứu & Trao đổi
                        </h1>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm md:w-auto w-full justify-center">
                            <PenTool size={18} />
                            Gửi bài viết
                        </button>
                    </div>
                    <p className="text-gray-500 text-[15px] mt-2 max-w-3xl">Diễn đàn khoa học pháp lý, chia sẻ kinh nghiệm nghiệp vụ từ đội ngũ chuyên gia, Luật sư và Trợ giúp viên pháp lý.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bài viết chuyên sâu</span>
                            </div>
                            <h2 className="text-[18px] sm:text-[20px] font-bold text-gray-900 leading-snug mb-4 group-hover:text-blue-700 line-clamp-3">
                                {item.title}
                            </h2>
                            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                        <User size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{item.author}</p>
                                        <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 font-medium text-sm">
                                    <MessageSquare size={16} />
                                    <span>{item.comments}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NghienCuuTraoDoiTGPLPage;

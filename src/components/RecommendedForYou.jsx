import React from 'react';
import { ArrowRight, Sparkles, FileText, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_RECOMMENDATIONS = [
    { id: 1, type: 'vanban', title: 'Nghị định 102/2024/NĐ-CP chi tiết thi hành Luật Đất đai', reason: 'Luật Đất đai', date: '05/03/2026', thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300' },
    { id: 2, type: 'tinbai', title: 'Những điểm mới về bồi thường, hỗ trợ tái định cư', reason: 'Luật Đất đai', date: '12/03/2026', thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300' },
    { id: 3, type: 'vanban', title: 'Thông tư 15/2025/TT-BXD về cấp giấy phép xây dựng', reason: 'Doanh nghiệp & Đầu tư', date: '20/02/2026', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300' },
    { id: 4, type: 'tinbai', title: 'Người lao động được hưởng quyền lợi gì theo Luật BHXH mới?', reason: 'Lao động & Việc làm', date: '15/03/2026', thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300' },
];

const RecommendedForYou = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-b border-blue-100/50 py-10">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold text-[#0f4c81]">Dành riêng cho bạn</h2>
                        </div>
                        <p className="text-gray-600 text-[15px]">Đề xuất dựa trên các lĩnh vực bạn đang quan tâm.</p>
                    </div>
                    <Link to="/danh-cho-ban" className="hidden sm:flex items-center text-blue-600 hover:text-blue-800 font-medium group text-[14px]">
                        Xem tất cả <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_RECOMMENDATIONS.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-blue-100/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden">
                            <div className="h-36 overflow-hidden relative">
                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className={`absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-white/90 backdrop-blur-sm shadow-sm ${item.type === 'vanban' ? 'text-indigo-600' : 'text-emerald-600'}`}>
                                    {item.type === 'vanban' ? <FileText size={12} className="mr-1" /> : <LayoutGrid size={12} className="mr-1" />}
                                    {item.type === 'vanban' ? 'Văn bản' : 'Tin tức'}
                                </span>
                            </div>
                            
                            <div className="p-5 flex flex-col flex-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100 mb-3 w-fit">
                                    <Sparkles size={10} className="mr-1" /> {item.reason}
                                </span>

                                <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3 mb-3 leading-snug">
                                    <Link to="#">{item.title}</Link>
                                </h3>

                                <div className="mt-auto flex items-center justify-between text-[12px] font-medium text-gray-400">
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 sm:hidden text-center">
                    <Link to="/danh-cho-ban" className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-medium text-[14px]">
                        Xem tất cả nội dung đề xuất
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecommendedForYou;

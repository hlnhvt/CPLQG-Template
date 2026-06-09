import React from 'react';
import { Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function GenericArticleList({ title, items }) {
    // Generate some mock items if none provided
    const mockItems = items || Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        title: `Tiêu đề bài viết mẫu số ${i + 1} về phổ biến giáo dục pháp luật`,
        description: 'Đây là đoạn mô tả ngắn gọn cho bài viết. Nội dung mô tả cung cấp cái nhìn tổng quan về các chính sách mới, các hoạt động đã diễn ra...',
        date: `0${(i % 9) + 1}/06/2026`,
        category: 'Tin tức'
    }));

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[600px]">
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-[#1b2b49]">{title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockItems.map((item, idx) => (
                    <div key={idx} className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-1">
                        {/* Image Placeholder */}
                        <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 transition-colors relative overflow-hidden">
                            <ImageIcon size={48} className="opacity-50 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                {item.category}
                            </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
                                <Calendar size={14} className="text-blue-500" />
                                <span>{item.date}</span>
                            </div>
                            
                            <h3 className="font-bold text-gray-800 text-base mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                                {item.description}
                            </p>
                            
                            <button className="text-blue-600 font-medium text-sm flex items-center gap-1 group/btn mt-auto w-fit">
                                Xem chi tiết 
                                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-10">
                <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-slate-50 transition-colors">&lt;</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-slate-50 transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-slate-50 transition-colors">3</button>
                    <span className="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-slate-50 transition-colors">&gt;</button>
                </div>
            </div>
        </div>
    );
}

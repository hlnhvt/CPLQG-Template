import React from 'react';
import { FileText, Download, Eye, Calendar, Building } from 'lucide-react';

export default function GenericDocumentList({ title, items }) {
    // Generate some mock documents if none provided
    const mockItems = items || Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        number: `${100 + i}/QĐ-BTP`,
        title: `Quyết định về việc ban hành Kế hoạch phổ biến giáo dục pháp luật năm 2026 số ${i + 1}`,
        agency: 'Bộ Tư pháp',
        date: `0${(i % 9) + 1}/06/2026`,
        type: 'Quyết định'
    }));

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[600px]">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-[#1b2b49]">{title}</h2>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm văn bản..." 
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-[250px]"
                    />
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        Lọc
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[12px] uppercase tracking-wider">
                            <th className="px-4 py-3.5 font-semibold rounded-tl-lg w-16 text-center">STT</th>
                            <th className="px-4 py-3.5 font-semibold w-32">Số hiệu</th>
                            <th className="px-4 py-3.5 font-semibold">Trích yếu nội dung</th>
                            <th className="px-4 py-3.5 font-semibold w-40">Cơ quan ban hành</th>
                            <th className="px-4 py-3.5 font-semibold w-32">Ngày ban hành</th>
                            <th className="px-4 py-3.5 font-semibold rounded-tr-lg w-28 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {mockItems.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                                <td className="px-4 py-4 text-center font-medium text-gray-500">{idx + 1}</td>
                                <td className="px-4 py-4 font-bold text-gray-700 whitespace-nowrap">{item.number}</td>
                                <td className="px-4 py-4">
                                    <div className="font-medium text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </div>
                                    <div className="text-[11px] text-gray-500 uppercase font-semibold">
                                        {item.type}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Building size={14} className="text-gray-400" />
                                        <span>{item.agency}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span>{item.date}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Xem chi tiết">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Tải xuống">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                    Hiển thị 1 đến 10 của 45 văn bản
                </div>
                <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-slate-50 transition-colors">&lt;</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-slate-50 transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-slate-50 transition-colors">3</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-slate-50 transition-colors">&gt;</button>
                </div>
            </div>
        </div>
    );
}

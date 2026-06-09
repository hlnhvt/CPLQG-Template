import React from 'react';

export default function GenericDataTable({ title, headers, items }) {
    // Generate some mock headers if none provided
    const mockHeaders = headers || ['STT', 'Tên đơn vị / Cá nhân', 'Chức vụ', 'Địa phương', 'Trạng thái'];
    
    // Generate mock items if none provided
    const mockItems = items || Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        cells: [
            i + 1,
            `Hội đồng phối hợp cấp ${['Tỉnh', 'Huyện', 'Xã'][i % 3]} số ${i + 1}`,
            ['Chủ tịch', 'Phó Chủ tịch', 'Ủy viên'][i % 3],
            `Thành phố Hà Nội`,
            ['Đang hoạt động', 'Tạm ngưng'][i % 2 === 0 ? 0 : 1]
        ]
    }));

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[600px]">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-[#1b2b49]">{title}</h2>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:border-blue-500">
                        <option>Tất cả địa phương</option>
                        <option>Hà Nội</option>
                        <option>Hồ Chí Minh</option>
                        <option>Đà Nẵng</option>
                    </select>
                    <button className="px-4 py-2 bg-[#1b2b49] text-white rounded-lg text-sm font-medium hover:bg-[#2580f0] transition-colors">
                        Tìm kiếm
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-slate-100 text-slate-600 text-[12px] uppercase tracking-wider">
                            {mockHeaders.map((header, idx) => (
                                <th 
                                    key={idx} 
                                    className={`px-4 py-3.5 font-bold ${idx === 0 ? 'rounded-tl-lg text-center w-16' : ''} ${idx === mockHeaders.length - 1 ? 'rounded-tr-lg' : ''}`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {mockItems.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                                {item.cells.map((cell, cellIdx) => (
                                    <td 
                                        key={cellIdx} 
                                        className={`px-4 py-4 ${cellIdx === 0 ? 'text-center font-medium text-gray-500' : 'text-gray-700'}`}
                                    >
                                        {cellIdx === item.cells.length - 1 && typeof cell === 'string' && (cell.includes('hoạt động') || cell.includes('Đạt')) ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">{cell}</span>
                                        ) : cellIdx === item.cells.length - 1 ? (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold uppercase">{cell}</span>
                                        ) : (
                                            <span className={cellIdx === 1 ? 'font-semibold text-[#1b2b49]' : ''}>{cell}</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-center mt-8">
                <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors">
                    Tải thêm dữ liệu
                </button>
            </div>
        </div>
    );
}

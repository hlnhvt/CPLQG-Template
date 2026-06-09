import React from 'react';
import { Landmark, FileText, ArrowRight, Coins, MapPin, Handshake, Lightbulb, AlertTriangle, Calendar, Building2 } from 'lucide-react';
import { councilData, programsData, effectiveModelsData, difficultiesData } from '../data/mockData';

export default function DashboardContent() {
    const getBadgeColor = (type) => {
        switch (type) {
            case 'Trung ương': return 'bg-red-100 text-red-600';
            case 'Tỉnh': return 'bg-blue-100 text-blue-600';
            case 'Huyện': return 'bg-green-100 text-green-600';
            case 'Xã': return 'bg-yellow-100 text-yellow-600';
            case 'Hoạt động': return 'text-green-500 font-semibold';
            case 'Kiến nghị': return 'bg-blue-100 text-blue-600';
            case 'Khó khăn': return 'bg-yellow-100 text-yellow-700';
            case 'Vướng mắc': return 'bg-pink-100 text-pink-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Khối 1: Hội đồng PBGDPL */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Landmark size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 leading-tight">Hội đồng PBGDPL</h2>
                            <p className="text-xs text-gray-500">Cơ quan tư vấn về phổ biến, giáo dục pháp luật</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                        Xem tất cả <ArrowRight size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider">
                                <th className="px-4 py-3 font-semibold rounded-tl-lg">Cấp</th>
                                <th className="px-4 py-3 font-semibold">Đơn vị</th>
                                <th className="px-4 py-3 font-semibold">Tỉnh/TP</th>
                                <th className="px-4 py-3 font-semibold">Nhiệm kỳ</th>
                                <th className="px-4 py-3 font-semibold text-center">Thành viên</th>
                                <th className="px-4 py-3 font-semibold rounded-tr-lg">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {councilData.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getBadgeColor(item.level)}`}>
                                            {item.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{item.unit}</td>
                                    <td className="px-4 py-3 text-gray-600">{item.province}</td>
                                    <td className="px-4 py-3 text-gray-600">{item.term}</td>
                                    <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.members}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[12px] ${getBadgeColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Grid 2 Columns */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Khối 2: Chương trình, đề án */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 leading-tight">Chương trình, đề án PBGDPL</h2>
                                <p className="text-xs text-gray-500">Các chương trình, đề án đang triển khai</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                            Xem tất cả <ArrowRight size={14} />
                        </button>
                    </div>
                    <div className="flex-1 space-y-4">
                        {programsData.map((prog, idx) => (
                            <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <h3 className="font-bold text-gray-800 text-[15px] mb-1.5 line-clamp-2">{prog.title}</h3>
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2 font-medium">
                                    <span className="flex items-center gap-1"><FileText size={12} /> {prog.category}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="flex items-center gap-1">{prog.date}</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">{prog.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column for Stats */}
                <div className="flex flex-col gap-6">
                    {/* Khối 3: Kinh phí */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                    <Coins size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 leading-tight">Kinh phí PBGDPL</h2>
                                    <p className="text-xs text-gray-500">Phân bổ ngân sách cho hoạt động PBGDPL</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                Xem chi tiết <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-6 px-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">1.200 tỷ</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Tổng kinh phí</div>
                            </div>
                            <div className="text-center hidden sm:block">
                                <div className="text-xl font-bold text-indigo-600">120 tỷ</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Trung ương</div>
                            </div>
                            <div className="text-center hidden sm:block">
                                <div className="text-xl font-bold text-purple-600">80 tỷ</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Bộ ngành</div>
                            </div>
                            <div className="text-center hidden sm:block">
                                <div className="text-xl font-bold text-blue-800">1.000 tỷ</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Địa phương</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">Phân bổ theo cấp</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-[11px] text-gray-600 mb-1 font-medium">
                                        <span>Trung ương</span>
                                        <span>120 tỷ (10%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] text-gray-600 mb-1 font-medium">
                                        <span>Bộ ngành</span>
                                        <span>80 tỷ (6.7%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '6.7%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] text-gray-600 mb-1 font-medium">
                                        <span>Địa phương</span>
                                        <span>1.000 tỷ (83.3%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '83.3%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Split Stats: Chuẩn tiếp cận & Hòa giải */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Khối 4: Chuẩn tiếp cận */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-gray-900 leading-tight">Chuẩn tiếp cận pháp luật</h2>
                                        <p className="text-[10px] text-gray-500">Kết quả xây dựng xã đạt chuẩn</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 bg-blue-50 p-1.5 rounded hover:bg-blue-100 transition-colors shrink-0">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-blue-600">8.234</div>
                                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Xã đạt chuẩn</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-green-500">82,5%</div>
                                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Tỷ lệ đạt chuẩn</div>
                                </div>
                            </div>
                        </div>

                        {/* Khối 5: Hòa giải cơ sở */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                    <Handshake size={16} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900 leading-tight">Hòa giải ở cơ sở</h2>
                                    <p className="text-[10px] text-gray-500">Mạng lưới hòa giải viên, tổ hòa giải</p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-around">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-teal-600">8.921</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Tổ hòa giải</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-teal-600">12.456</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Hòa giải viên</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Khối 6: Mô hình hoạt động hiệu quả */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Lightbulb size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 leading-tight">Mô hình hoạt động hiệu quả</h2>
                            <p className="text-xs text-gray-500">Các mô hình PBGDPL tiêu biểu, sáng tạo</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                        Xem tất cả <ArrowRight size={14} />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {effectiveModelsData.map((model, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-amber-200 hover:shadow-md transition-all group bg-gray-50/30">
                            <h3 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[40px]">{model.title}</h3>
                            <div className="flex flex-col gap-1.5 text-[10px] text-gray-500 mb-3 font-medium">
                                <span className="flex items-center gap-1"><FileText size={12} className="text-gray-400" /> {model.category}</span>
                                <span className="flex items-center gap-1"><Calendar size={12} className="text-gray-400" /> {model.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-3">{model.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Khối 7: Khó khăn vướng mắc */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 leading-tight">Khó khăn, vướng mắc, kiến nghị</h2>
                            <p className="text-xs text-gray-500">Tổng hợp từ các đơn vị, địa phương</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                        Xem tất cả <ArrowRight size={14} />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {difficultiesData.map((diff, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-pink-200 hover:shadow-md transition-all bg-white flex flex-col">
                            <h3 className="font-bold text-gray-800 text-sm mb-3 line-clamp-3 flex-1">{diff.title}</h3>

                            <div className="flex flex-col gap-1.5 text-[11px] text-gray-500 mb-4 font-medium border-t border-gray-50 pt-3">
                                <span className="flex items-center gap-1.5"><Building2 size={12} className="text-gray-400" /> {diff.source}</span>
                                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> {diff.date}</span>
                            </div>

                            <div>
                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide inline-block ${getBadgeColor(diff.type)}`}>
                                    {diff.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Search, Sparkles, Filter, ChevronRight, FileText, LayoutGrid, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_RECOMMENDATIONS = [
    { id: 1, type: 'vanban', title: 'Nghị định 102/2024/NĐ-CP quy định chi tiết thi hành một số điều của Luật Đất đai', reason: 'Luật Đất đai', date: '05/03/2026', snippet: 'Hướng dẫn việc lập quy hoạch, kế hoạch sử dụng đất, thu hồi đất, bồi thường, hỗ trợ, tái định cư...' },
    { id: 2, type: 'tinbai', title: 'Những điểm mới nổi bật về bồi thường, hỗ trợ tái định cư', reason: 'Luật Đất đai', date: '12/03/2026', snippet: 'Bài viết phân tích các điểm thay đổi cốt lõi nhằm bảo đảm quyền lợi tốt hơn cho người có đất bị thu hồi.' },
    { id: 3, type: 'vanban', title: 'Thông tư 15/2025/TT-BXD về cấp giấy phép xây dựng', reason: 'Doanh nghiệp & Đầu tư', date: '20/02/2026', snippet: 'Rút gọn thủ tục hành chính trong việc xin giấy phép xây dựng đối với các công trình công nghiệp.' },
    { id: 4, type: 'tinbai', title: 'Người lao động được hưởng quyền lợi gì theo Luật BHXH (sửa đổi)?', reason: 'Lao động & Việc làm', date: '15/03/2026', snippet: 'Chi tiết mức đóng và mức hưởng mới áp dụng từ năm 2026.' },
    { id: 5, type: 'vanban', title: 'Luật Doanh nghiệp 2020 (Bản hợp nhất)', reason: 'Doanh nghiệp & Đầu tư', date: '01/01/2021', snippet: 'Văn bản hợp nhất các quy định điều chỉnh hoạt động của doanh nghiệp.' },
];

const RecommendedPage = () => {
    const [hiddenIds, setHiddenIds] = useState([]);

    const visibleItems = MOCK_RECOMMENDATIONS.filter(item => !hiddenIds.includes(item.id));

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-3 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1500px]">
                    <div className="flex items-center text-[13px] text-gray-500">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} className="mx-2 shrink-0" />
                        <span className="text-gray-800 font-medium">Dành cho bạn</span>
                    </div>
                </div>
            </div>

            {/* Banner */}
            <div className="bg-gradient-to-r from-[#0f4c81] to-indigo-800 text-white py-12 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-4 max-w-[1500px] relative z-10">
                    {/* <div className="flex items-center gap-3 mb-3 text-yellow-300">
                        <Sparkles size={28} />
                    </div> */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Đề xuất dành cho bạn</h1>
                    <p className="text-blue-100 text-[16px] max-w-2xl leading-relaxed">
                        Hệ thống thông minh của chúng tôi tự động tổng hợp và gợi ý các Văn bản pháp luật cùng Tin tức cập nhật nhất, được tinh chỉnh dựa trên các lĩnh vực bạn quan tâm.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {['Luật Đất đai', 'Doanh nghiệp & Đầu tư', 'Lao động & Việc làm'].map(topic => (
                            <span key={topic} className="px-3 py-1 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm rounded-full text-sm border border-white/20 cursor-pointer">
                                {topic}
                            </span>
                        ))}
                        <Link to="/ca-nhan/cai-dat" className="px-3 py-1 bg-white text-blue-800 hover:bg-gray-100 transition-colors rounded-full text-sm font-semibold shadow-sm">
                            + Tùy chỉnh
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1500px] mt-8 flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
                            <button className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold text-sm rounded-lg whitespace-nowrap">Tất cả đề xuất</button>
                            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-lg whitespace-nowrap transition-colors">Văn bản pháp luật mới</button>
                            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-lg whitespace-nowrap transition-colors">Tin tức nổi bật</button>
                        </div>
                        <select className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none shrink-0">
                            <option>Sắp xếp: Phù hợp nhất</option>
                            <option>Sắp xếp: Mới nhất</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {visibleItems.map(item => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all duration-300 group flex gap-5">
                                <div className={`hidden sm:flex w-14 h-14 rounded-xl items-center justify-center shrink-0 ${item.type === 'vanban' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {item.type === 'vanban' ? <FileText size={24} /> : <LayoutGrid size={24} />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100">
                                            <Sparkles size={10} className="mr-1" /> Vì bạn quan tâm {item.reason}
                                        </span>
                                        <span className="text-[12px] text-gray-400 font-medium">{item.date}</span>
                                    </div>

                                    <h3 className="font-bold text-[17px] text-gray-900 group-hover:text-[#0f4c81] transition-colors mb-2 leading-snug line-clamp-2">
                                        <Link to="#">{item.title}</Link>
                                    </h3>

                                    <p className="text-[14px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                                        {item.snippet}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            {item.type === 'vanban' ? <FileText size={12} /> : <LayoutGrid size={12} />}
                                            {item.type === 'vanban' ? 'Văn bản Pháp luật' : 'Tin tức & Bài viết'}
                                        </div>

                                        {/* Feedback mechanism */}
                                        <button
                                            onClick={() => setHiddenIds([...hiddenIds, item.id])}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <ThumbsDown size={14} /> Ít quan tâm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full md:w-80 shrink-0 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Filter size={18} className="text-[#0f4c81]" /> Lọc theo Lĩnh vực
                        </h3>
                        <div className="space-y-2 text-[14px]">
                            {['Luật Đất đai', 'Doanh nghiệp & Đầu tư', 'Lao động & Việc làm', 'Dân sự', 'Hành chính'].map((topic, i) => (
                                <label key={topic} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked={i < 3} />
                                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">{topic}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                            <Link to="/ca-nhan/cai-dat" className="text-sm font-medium text-blue-600 hover:underline">
                                Quản lý Lĩnh vực quan tâm
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default RecommendedPage;

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, ChevronRight, FileText, LayoutGrid, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_RECOMMENDATIONS = [
    { id: 1, type: 'vanban', title: 'Nghị định 102/2024/NĐ-CP quy định chi tiết thi hành một số điều của Luật Đất đai', reason: 'Luật Đất đai', date: '05/03/2026', snippet: 'Hướng dẫn việc lập quy hoạch, kế hoạch sử dụng đất, thu hồi đất, bồi thường, hỗ trợ, tái định cư...', thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300', groupName: 'Lĩnh vực pháp lý' },
    { id: 2, type: 'tinbai', title: 'Những điểm mới nổi bật về bồi thường, hỗ trợ tái định cư', reason: 'Luật Đất đai', date: '12/03/2026', snippet: 'Bài viết phân tích các điểm thay đổi cốt lõi nhằm bảo đảm quyền lợi tốt hơn cho người có đất bị thu hồi.', thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300', groupName: 'Chuyên mục tin tức' },
    { id: 3, type: 'vanban', title: 'Thông tư 15/2025/TT-BXD về cấp giấy phép xây dựng', reason: 'Doanh nghiệp & Đầu tư', date: '20/02/2026', snippet: 'Rút gọn thủ tục hành chính trong việc xin giấy phép xây dựng đối với các công trình công nghiệp.', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300', groupName: 'Lĩnh vực pháp lý' },
    { id: 4, type: 'tinbai', title: 'Người lao động được hưởng quyền lợi gì theo Luật BHXH (sửa đổi)?', reason: 'Lao động & Việc làm', date: '15/03/2026', snippet: 'Chi tiết mức đóng và mức hưởng mới áp dụng từ năm 2026.', thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300', groupName: 'Chuyên mục tin tức' },
    { id: 5, type: 'vanban', title: 'Luật Doanh nghiệp 2020 (Bản hợp nhất)', reason: 'Doanh nghiệp & Đầu tư', date: '01/01/2021', snippet: 'Văn bản hợp nhất các quy định điều chỉnh hoạt động của doanh nghiệp.', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973e6aa210f?auto=format&fit=crop&q=80&w=300', groupName: 'Lĩnh vực pháp lý' },
];

const CATEGORY_MAP = {
    'dat-dai': 'Đất đai & Nhà ở',
    'doanh-nghiep': 'Doanh nghiệp & Đầu tư',
    'lao-dong': 'Lao động & Việc làm',
    'thue': 'Thuế & Tài chính',
    'dan-su': 'Dân sự',
    'hinh-su': 'Hình sự',
    'news-tin-nong': 'Tin nóng pháp luật',
    'news-chinh-sach': 'Chính sách mới',
    'news-phan-tich': 'Phân tích & Bình luận',
    'forum-luat-su': 'Cộng đồng Luật sư',
    'forum-doanh-nghiep': 'Hỏi đáp Doanh nghiệp',
    'stat-comments-count': 'Chỉ tiêu thống kê',
    'stat-comments-bar': 'Chỉ tiêu thống kê',
    'stat-topics-pie': 'Chỉ tiêu thống kê'
};

const DEFAULT_TOPICS = ['Đất đai & Nhà ở', 'Doanh nghiệp & Đầu tư', 'Lao động & Việc làm', 'Dân sự', 'Hành chính'];

const RecommendedPage = () => {
    const [hiddenIds, setHiddenIds] = useState([]);
    const [userTopics, setUserTopics] = useState(DEFAULT_TOPICS);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const saved = localStorage.getItem('userSelectedTopics');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && Array.isArray(parsed) && parsed.length > 0) {
                    // Map IDs from settings to readable titles, excluding raw 'stat-' IDs using Set for uniqueness
                    const mappedTitles = [...new Set(parsed
                        .filter(id => !id.startsWith('stat-'))
                        .map(id => CATEGORY_MAP[id])
                        .filter(Boolean))];
                    
                    if (mappedTitles.length > 0) {
                        setUserTopics(mappedTitles);
                    }
                }
            } catch (e) {
                console.error("Failed to parse user topics:", e);
            }
        }
    }, []);

    const visibleItems = MOCK_RECOMMENDATIONS.filter(item => {
        if (hiddenIds.includes(item.id)) return false;
        if (activeTab !== 'all' && item.type !== activeTab) return false;
        return true;
    });

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
            <div className="bg-gradient-to-br from-[#0f4c81] via-indigo-700 to-purple-800 text-white py-14 relative overflow-hidden shadow-inner">
                {/* Decorative Elements */}
                <div className="absolute right-[5%] top-[-20%] w-96 h-96 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none mix-blend-screen"></div>
                <div className="absolute left-[10%] bottom-[-30%] w-80 h-80 bg-purple-400/20 blur-3xl rounded-full pointer-events-none mix-blend-screen"></div>

                <div className="container mx-auto px-4 max-w-[1500px] relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                            <Sparkles size={24} className="text-cyan-200" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">Đề xuất dành cho bạn</h1>
                    </div>
                    <p className="text-indigo-100 text-[16px] max-w-2xl leading-relaxed font-medium mb-8">
                        Hệ thống thông minh tự động tổng hợp và gợi ý các Văn bản pháp luật cùng Tin tức mới nhất, được cá nhân hóa hoàn toàn dựa trên các lĩnh vực bạn theo dõi.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {userTopics.slice(0, 3).map(topic => (
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
                            <button onClick={() => setActiveTab('all')} className={`px-4 py-2 font-semibold text-sm rounded-lg whitespace-nowrap transition-colors ${activeTab === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>Tất cả đề xuất</button>
                            <button onClick={() => setActiveTab('vanban')} className={`px-4 py-2 font-semibold text-sm rounded-lg whitespace-nowrap transition-colors ${activeTab === 'vanban' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>Văn bản pháp luật mới</button>
                            <button onClick={() => setActiveTab('tinbai')} className={`px-4 py-2 font-semibold text-sm rounded-lg whitespace-nowrap transition-colors ${activeTab === 'tinbai' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>Tin tức nổi bật</button>
                        </div>
                        <select className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none shrink-0">
                            <option>Sắp xếp: Phù hợp nhất</option>
                            <option>Sắp xếp: Mới nhất</option>
                        </select>
                    </div>

                    <div className="space-y-5">
                        {visibleItems.map(item => (
                            <div key={item.id} className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-4 sm:p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col sm:flex-row gap-5 overflow-hidden relative">
                                {/* Thumbnail */}
                                <div className="w-full sm:w-56 h-48 sm:h-auto shrink-0 rounded-lg overflow-hidden relative">
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur shadow-sm ${item.type === 'vanban' ? 'text-indigo-600' : 'text-emerald-600'}`}>
                                        {item.type === 'vanban' ? <FileText size={12} className="mr-1.5" /> : <LayoutGrid size={12} className="mr-1.5" />}
                                        {item.type === 'vanban' ? 'Văn bản' : 'Tin tức'}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex items-center flex-wrap gap-2 mb-2.5">
                                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded border ${item.groupName === 'Lĩnh vực pháp lý' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                            {item.groupName}
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100">
                                            <Sparkles size={10} className="mr-1" /> Vì bạn quan tâm {item.reason}
                                        </span>
                                        <span className="text-[12px] text-gray-400 font-medium ml-auto hidden md:block">{item.date}</span>
                                    </div>

                                    <h3 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#0f4c81] transition-colors mb-2.5 leading-snug line-clamp-2">
                                        <Link to="#">{item.title}</Link>
                                    </h3>

                                    <p className="text-[14.5px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                                        {item.snippet}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-[12px] text-gray-400 font-medium md:hidden">{item.date}</span>
                                        {/* Feedback mechanism */}
                                        <button
                                            onClick={() => setHiddenIds([...hiddenIds, item.id])}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 ml-auto"
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
                            {userTopics.map((topic, i) => (
                                <label key={topic} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked={true} />
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

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Flame, Clock, HelpCircle, FileText, CheckCircle2, RotateCw, RefreshCcw, ArrowRight, User, Eye, ThumbsUp, PlusCircle, MessageCircle, Link as LinkIcon } from 'lucide-react';
import CreateCauHoiModal from './CreateCauHoiModal';

const MOCK_DATA = [
    { id: '1', title: 'Quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở nông thôn', content: 'Gia đình tôi có mảnh đất ở nông thôn đang bị thu hồi để làm đường...', date: '11:09 17/03/2026', status: 'Đã trả lời', domain: 'Đất đai', views: 1250, likes: 450, author: 'Nguyễn Văn A', replies: 2 },
    { id: '2', title: 'Điều kiện hưởng lương hưu trước tuổi năm 2026', content: 'Tôi năm nay 55 tuổi, đóng BHXH được 25 năm, làm việc trong môi trường độc hại...', date: '09:15 16/03/2026', status: 'Đang chờ trả lời', domain: 'Lao động', views: 890, likes: 320, author: 'Trần Thị B', replies: 0 },
    { id: '3', title: 'Thủ tục thành lập công ty TNHH 1 thành viên', content: 'Tôi muốn tư vấn về hồ sơ và thủ tục thành lập công ty TNHH 1 thành viên...', date: '14:20 15/03/2026', status: 'Đã trả lời', domain: 'Doanh nghiệp', views: 2100, likes: 800, author: 'Lê Văn C', replies: 1 },
    { id: '4', title: 'Phân chia di sản thừa kế khi không có di chúc', content: 'Bố mẹ tôi mất không để lại di chúc, gia đình có 3 anh em...', date: '08:30 14/03/2026', status: 'Đã trả lời', domain: 'Dân sự', views: 1560, likes: 410, author: 'Người dùng ẩn danh', replies: 3 },
    { id: '5', title: 'Xử lý kỷ luật lao động đối với nhân viên tự ý nghỉ việc', content: 'Công ty tôi có trường hợp nhân viên tự ý nghỉ việc 5 ngày không phép...', date: '16:45 13/03/2026', status: 'Đang chờ trả lời', domain: 'Lao động', views: 500, likes: 120, author: 'Hoàng Thị D', replies: 0 },
];

const DanhSachCauHoiPage = () => {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Tab logic
    const initialTab = searchParams.get('tab') || 'popular';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['popular', 'latest', 'search'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    const handleCreateClick = () => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/cau-hoi-phap-luat' } });
        } else {
            setIsCreateModalOpen(true);
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Hỏi đáp pháp luật</span>
                    </div>
                </div>
            </div>

            {/* Header Cấp 1 */}
            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                            Hỏi đáp pháp luật
                            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                        </h1>
                        <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                            Khám phá các câu hỏi pháp luật được giải đáp bởi chuyên gia. Tìm kiếm, giải đáp thắc mắc pháp lý của bạn ngay hôm nay.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                        <Link to="/cau-hoi-phap-luat/chuyen-gia" className="border-2 border-white/60 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-white hover:text-[#1a3b8b] transition flex items-center justify-center gap-2 text-[14px]">
                            <User size={18} /> Tư vấn chuyên gia
                        </Link>
                        <button onClick={handleCreateClick} className="bg-white text-[#1a3b8b] font-bold py-2.5 px-6 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 text-[14px] shadow-sm">
                            <PlusCircle size={18} /> Tạo câu hỏi
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tab Cấp 2 */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 mb-8">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-2 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => handleTabChange('popular')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${
                            activeTab === 'popular' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                        }`}
                    >
                        <Flame size={16} /> NHIỀU NGƯỜI QUAN TÂM
                    </button>
                    <button
                        onClick={() => handleTabChange('latest')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${
                            activeTab === 'latest' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                        }`}
                    >
                        <Clock size={16} /> MỚI NHẤT
                    </button>
                    <button
                        onClick={() => handleTabChange('search')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${
                            activeTab === 'search' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                        }`}
                    >
                        <Search size={16} /> TÌM KIẾM CÂU HỎI
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px] pb-16">
                {/* Tab Contents */}
                <div className="min-h-[500px]">
                    {activeTab === 'popular' && <QuestionList mode="popular" />}
                    {activeTab === 'latest' && <QuestionList mode="latest" />}
                    {activeTab === 'search' && <SearchTab />}
                </div>
            </div>

            <CreateCauHoiModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
};

// ==============================
// QUESTION LIST (Popular & Latest)
// ==============================
const QuestionList = ({ mode }) => {
    const isPopular = mode === 'popular';

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full text-gray-800">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                        <h2 className="text-xl font-bold text-[#0f4c81] flex items-center gap-2">
                            {isPopular ? <Flame className="text-red-500" /> : <Clock className="text-blue-500" />}
                            CÂU HỎI {isPopular ? 'PHỔ BIẾN NHẤT' : 'MỚI NHẤT'}
                        </h2>
                        <select className="border border-gray-300 rounded-lg p-2 bg-white text-sm font-medium outline-none focus:ring-2 ring-blue-200 transition">
                            <option>Tất cả lĩnh vực</option>
                            <option>Dân sự</option>
                            <option>Hình sự</option>
                            <option>Doanh nghiệp</option>
                            <option>Lao động</option>
                            <option>Đất đai</option>
                        </select>
                    </div>

                    <ul className="space-y-4">
                        {MOCK_DATA.map((item, index) => (
                            <li key={item.id} className="p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                                {isPopular && index < 3 && (
                                    <div className="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        Top {index + 1}
                                    </div>
                                )}
                                <Link to={`/cau-hoi-phap-luat/${item.id}`} className="flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-bold text-lg text-[#0f4c81] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <span className="shrink-0 bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold px-2.5 py-1 rounded-full">
                                            {item.domain}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">"{item.content}"</p>

                                    <div className="flex flex-wrap items-center justify-between mt-2 pt-3 border-t border-gray-50">
                                        <div className="flex items-center gap-4 text-xs">
                                            {item.status === 'Đã trả lời' ?
                                                <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                                    <CheckCircle2 size={12} /> Đã trả lời
                                                </span>
                                                :
                                                <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                                    <RotateCw size={12} /> Chờ trả lời
                                                </span>
                                            }
                                            <span className="flex items-center gap-1 text-gray-500 font-medium">
                                                <Clock size={14} /> {item.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-gray-500 font-medium hidden sm:flex">
                                                <User size={14} /> {item.author}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                            <span className="flex items-center gap-1" title="Lượt xem"><Eye size={14} /> {item.views}</span>
                                            <span className="flex items-center gap-1" title="Hữu ích"><ThumbsUp size={14} /> {item.likes}</span>
                                            <span className="flex items-center gap-1" title="Trả lời"><MessageCircle size={14} /> {item.replies}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="p-4 mt-4 flex justify-between items-center">
                        <span className="text-gray-500 text-sm font-medium">Hiển thị 1 - 5 của 120 kết quả</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 border rounded-lg text-gray-500 hover:bg-gray-100 bg-white font-medium cursor-not-allowed text-sm">Trang trước</button>
                            <button className="px-3 py-1.5 border rounded-lg bg-[#0f4c81] text-white font-medium text-sm">1</button>
                            <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition text-sm">2</button>
                            <button className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-medium transition text-sm">Trang sau</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:w-1/4 flex flex-col gap-6 text-gray-800">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-4 text-[#0f4c81]">Thống kê hỏi đáp</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Tổng câu hỏi</span>
                            <span className="font-bold text-[#0f4c81] text-lg">5,620</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Đã trả lời</span>
                            <span className="font-bold text-emerald-500 text-lg">4,890</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Chuyên gia</span>
                            <span className="font-bold text-amber-500 text-lg">45</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0f4c81] rounded-xl shadow-md border border-gray-100 p-6 text-white relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                        <User size={120} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 relative z-10">Bạn cần tư vấn riêng?</h3>
                    <p className="text-blue-100 text-sm mb-4 relative z-10">Đặt lịch hẹn trực tiếp với các chuyên gia, luật sư uy tín để được giải đáp chuyên sâu.</p>
                    <Link to="/cau-hoi-phap-luat/chuyen-gia" className="block text-center bg-white text-[#0f4c81] font-bold py-2 rounded-lg hover:bg-blue-50 transition relative z-10">
                        Xem danh sách chuyên gia
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ==============================
// 3. SEARCH TAB
// ==============================
const SearchTab = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
    };

    const handleReset = () => {
        setSearchTerm('');
        setHasSearched(false);
    };

    return (
        <div className="text-gray-800">
            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2">
                    <Search className="text-blue-500" /> TÌM KIẾM CÂU HỎI THƯỜNG XUYÊN
                </h2>

                <form onSubmit={handleSearch} className="space-y-6 max-w-4xl">
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nhập từ khóa nội dung câu hỏi (Ví dụ: bồi thường đất đai)..."
                                className="w-full border-2 border-gray-200 rounded-xl py-4 pl-5 pr-12 focus:border-[#0f4c81] outline-none transition text-lg bg-gray-50 focus:bg-white"
                            />
                            <Search className="absolute right-5 top-4 text-gray-400" size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Lĩnh vực pháp luật</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Dân sự</option>
                                <option>Hình sự</option>
                                <option>Lao động</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Đã trả lời</option>
                                <option>Chờ trả lời</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Sắp xếp theo</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Mức độ liên quan</option>
                                <option>Phổ biến nhất</option>
                                <option>Mới nhất</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button type="submit" className="bg-[#0f4c81] text-white font-bold py-2.5 px-8 rounded-lg hover:bg-blue-800 transition shadow-md flex items-center justify-center gap-2">
                            <Search size={18} /> Tìm kiếm
                        </button>
                        <button type="button" onClick={handleReset} className="border-2 border-gray-200 text-gray-700 font-bold py-2.5 px-8 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                            <RefreshCcw size={18} /> Đặt lại
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Area */}
            {hasSearched && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-100 p-4 font-bold flex justify-between items-center text-gray-800">
                        <span>KẾT QUẢ TÌM KIẾM</span>
                        <span className="text-gray-500 font-medium text-sm">Hiển thị {MOCK_DATA.length} kết quả</span>
                    </div>
                    <ul className="divide-y divide-gray-100">
                        {MOCK_DATA.map(item => (
                            <li key={item.id} className="p-6 hover:bg-blue-50/50 transition-colors group">
                                <Link to={`/cau-hoi-phap-luat/${item.id}`} className="block">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="font-bold text-lg text-[#0f4c81] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <span className="shrink-0 bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold px-2.5 py-1 rounded-full">
                                            {item.domain}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">"{item.content}"</p>
                                    <div className="flex flex-wrap items-center gap-4 text-xs">
                                        {item.status === 'Đã trả lời' ?
                                            <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                                <CheckCircle2 size={12} /> Đã trả lời
                                            </span>
                                            :
                                            <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                                <RotateCw size={12} /> Chờ trả lời
                                            </span>
                                        }
                                        <span className="flex items-center gap-1 text-gray-500 font-medium">
                                            <Clock size={14} /> {item.date}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!hasSearched && (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Tra cứu câu hỏi pháp luật</h3>
                    <p className="text-gray-500 max-w-md mx-auto">Nhập từ khóa vào ô tìm kiếm để tìm các câu hỏi tương tự đã được chuyên gia giải đáp.</p>
                </div>
            )}
        </div>
    );
};

export default DanhSachCauHoiPage;

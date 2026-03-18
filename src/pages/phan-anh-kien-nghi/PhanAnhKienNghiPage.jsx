import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Clock, Search, Send, ExternalLink, HelpCircle, FileText, CheckCircle2, RotateCw, Filter, RefreshCcw, ArrowRight } from 'lucide-react';

const MOCK_DATA = [
    { id: '1771794882779', title: 'Thông tư số 04/2025/TT-BTC hướng dẫn quản lý thu ngân sách...', content: 'Tôi đề nghị bộ tài chính làm rõ khoản 2 điều 5 về việc thu phí bảo vệ môi trường...', date: '11:09 17/03/2026', status: 'Đã xử lý', agency: 'Bộ Tài chính', level: 'Trung ương' },
    { id: '1771794882780', title: 'Nghị định 102/2024/NĐ-CP chi tiết thi hành Luật Đất đai', content: 'Cần làm rõ thêm quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở nông thôn...', date: '09:15 16/03/2026', status: 'Đang xử lý', agency: 'Bộ Tài nguyên và Môi trường', level: 'Trung ương' },
    { id: '1771794882781', title: 'Quy định quản lý trật tự đô thị trên địa bàn TP Hà Nội', content: 'Tình trạng lấn chiếm vỉa hè tại khu vực quận xyz đang diễn ra phổ biến...', date: '14:20 15/03/2026', status: 'Đã xử lý', agency: 'UBND TP Hà Nội', level: 'Địa phương' },
    { id: '1771794882782', title: 'Luật BHXH (sửa đổi)', content: 'Đề nghị xem xét điều kiện hưởng lương hưu cho người lao động làm việc trong môi trường độc hại...', date: '08:30 14/03/2026', status: 'Đang xử lý', agency: 'Bộ Lao động - Thương binh và Xã hội', level: 'Trung ương' },
    { id: '1771794882783', title: 'Thủ tục cấp Giấy phép xây dựng', content: 'Hiện tại hệ thống nộp hồ sơ trực tuyến thường xuyên bị lỗi khi upload bản vẽ...', date: '16:45 13/03/2026', status: 'Đã xử lý', agency: 'Bộ Xây dựng', level: 'Trung ương' },
];

const PhanAnhKienNghiPage = () => {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Tab logic
    const initialTab = searchParams.get('tab') || 'statistics';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['statistics', 'latest', 'search'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    const handleSendFeedbackClick = () => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/phan-anh-kien-nghi/tao-moi' } });
        } else {
            navigate('/phan-anh-kien-nghi/tao-moi');
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Phản ánh kiến nghị</span>
                    </div>
                </div>
            </div>

            {/* Header Cấp 1 */}
            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                            Phản ánh, kiến nghị
                            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                        </h1>
                        <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                            Thông tin thống kê, danh sách và tra cứu phản ánh, kiến nghị chính sách, văn bản pháp luật từ người dân, doanh nghiệp.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                        <Link to="/phan-anh-kien-nghi/huong-dan" className="border-2 border-white/60 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-white hover:text-[#1a3b8b] transition flex items-center justify-center gap-2 text-[14px]">
                            <HelpCircle size={18} /> Hướng dẫn
                        </Link>
                        <button onClick={handleSendFeedbackClick} className="bg-white text-[#1a3b8b] font-bold py-2.5 px-6 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 text-[14px] shadow-sm">
                            <Send size={18} /> Gửi phản ánh
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tab Cấp 2 */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 mb-8">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-2 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => handleTabChange('statistics')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'statistics' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}
                    >
                        <BarChart3 size={16} /> THỐNG KÊ
                    </button>
                    <button
                        onClick={() => handleTabChange('latest')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'latest' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}
                    >
                        <Clock size={16} /> MỚI NHẤT
                    </button>
                    <button
                        onClick={() => handleTabChange('search')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'search' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}
                    >
                        <Search size={16} /> TRA CỨU
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px] pb-16">

                {/* Tab Contents */}
                <div className="min-h-[500px]">
                    {activeTab === 'statistics' && <StatisticsTab />}
                    {activeTab === 'latest' && <LatestTab />}
                    {activeTab === 'search' && <SearchTab codeParams={searchParams.get('code')} />}
                </div>
            </div>
        </div>
    );
};

// ==============================
// 1. STATISTICS TAB
// ==============================
const StatisticsTab = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full text-gray-800">
                    <h2 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                        <Clock className="text-blue-500" /> PHẢN ÁNH ĐÃ XỬ LÝ MỚI NHẤT
                    </h2>
                    <ul className="space-y-4">
                        {MOCK_DATA.slice(0, 4).map(item => (
                            <li key={item.id} className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
                                <Link to={`/phan-anh-kien-nghi/${item.id}`} className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg text-blue-600 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#0f4c81] group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                                            [{item.agency}] {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">"{item.content}"</p>
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                                            <span className="flex items-center gap-1 text-gray-500 font-medium">
                                                <Clock size={14} /> {item.date}
                                            </span>
                                            {item.status === 'Đã xử lý' ?
                                                <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                                    <CheckCircle2 size={12} /> Đã xử lý
                                                </span>
                                                :
                                                <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                                    <RotateCw size={12} /> Đang xử lý
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center mt-6">
                        <Link to="/phan-anh-kien-nghi?tab=search" className="text-[#0f4c81] font-bold hover:underline flex items-center justify-center gap-1">
                            Xem tất cả <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:w-1/3 flex flex-col gap-6 text-gray-800">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-4 text-[#0f4c81]">Thống kê lượt truy cập</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Hôm nay</span>
                            <span className="font-bold text-amber-500 text-lg">1,245</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Tuần này</span>
                            <span className="font-bold text-amber-500 text-lg">8,450</span>
                        </div>
                        <div className="flex justify-between items-center text-lg mt-2 pt-2">
                            <span className="font-bold text-gray-800">Tổng lượt truy cập</span>
                            <span className="font-bold text-[#0f4c81] text-xl">1,024,800</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-4 text-[#0f4c81]">Thống kê xử lý PAKN</h3>
                    <div className="relative pt-4">
                        <div className="flex justify-between items-end mb-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#0f4c81]">8,452</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Tổng PAKN</div>
                            </div>
                            <div className="w-px h-12 bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-500">7,100</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Đã xử lý</div>
                            </div>
                            <div className="w-px h-12 bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-amber-500">1,352</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Đang xử lý</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-6 text-[#0f4c81]">Đánh giá mức độ hài lòng</h3>
                    <div className="flex items-center gap-6">
                        {/* Mock Pie Chart (CSS) */}
                        <div className="w-24 h-24 rounded-full border-[10px] border-emerald-500 border-r-blue-400 border-b-amber-400 rotate-45 mx-auto shrink-0 shadow-inner"></div>
                        <div className="space-y-2 flex-1 text-sm font-medium">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Rất hài lòng</span>
                                <span className="font-bold">60%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-sm"></div> Hài lòng</span>
                                <span className="font-bold">25%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-400 rounded-sm"></div> Bình thường</span>
                                <span className="font-bold">10%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 rounded-sm"></div> Khác</span>
                                <span className="font-bold">5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <button className="text-sm font-bold text-[#0f4c81] border border-[#0f4c81] px-4 py-2 rounded-lg hover:bg-blue-50 transition shadow-sm">
                        Xuất báo cáo
                    </button>
                </div>
            </div>
        </div>
    );
};

// ==============================
// 2. LATEST TAB
// ==============================
const LatestTab = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                <h2 className="text-xl font-bold text-[#0f4c81] flex items-center gap-2">
                    <Clock className="text-blue-500" /> DANH SÁCH BỘ LỌC
                </h2>
                <div className="flex gap-4 w-full md:w-auto">
                    <select className="border border-gray-300 rounded-lg p-2 bg-white text-sm font-medium flex-1 md:w-48 outline-none focus:ring-2 ring-blue-200 transition">
                        <option>Tất cả cấp xử lý</option>
                        <option>Trung ương</option>
                        <option>Địa phương</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg p-2 bg-white text-sm font-medium flex-1 md:w-48 outline-none focus:ring-2 ring-blue-200 transition">
                        <option>Tất cả trạng thái</option>
                        <option>Đã xử lý</option>
                        <option>Đang xử lý</option>
                    </select>
                </div>
            </div>

            <ul className="divide-y divide-gray-100">
                {MOCK_DATA.map(item => (
                    <li key={item.id} className="p-6 hover:bg-blue-50/50 transition-colors group">
                        <Link to={`/phan-anh-kien-nghi/${item.id}`} className="flex flex-col sm:flex-row gap-6">
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-blue-600 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                <FileText size={32} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#0f4c81] text-lg hover:underline mb-2 leading-snug">
                                    [{item.agency}] {item.title}
                                </h3>
                                <p className="text-gray-600 text-[15px] mb-4">"{item.content}"</p>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
                                    <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                        <Clock size={16} /> {item.date}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[#0f4c81] font-medium bg-blue-50 px-2.5 py-1 rounded">
                                        <ExternalLink size={16} /> Gửi tới: {item.agency}
                                    </span>
                                    {item.status === 'Đã xử lý' ?
                                        <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                                            <CheckCircle2 size={14} /> Đã xử lý
                                        </span>
                                        :
                                        <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                                            <RotateCw size={14} /> Đang xử lý
                                        </span>
                                    }
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                <span className="text-gray-500 text-sm font-medium">Tổng số: 4,024 bản ghi</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 border rounded-lg text-gray-500 hover:bg-gray-100 bg-white font-medium cursor-not-allowed">Trang trước</button>
                    <button className="px-3 py-1.5 border rounded-lg bg-[#0f4c81] text-white font-medium">1</button>
                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">2</button>
                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">3</button>
                    <button className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-medium transition">Trang sau</button>
                </div>
            </div>
        </div>
    );
};

// ==============================
// 3. SEARCH TAB
// ==============================
const SearchTab = ({ codeParams }) => {
    const [searchCode, setSearchCode] = useState(codeParams || '');
    const [hasSearched, setHasSearched] = useState(true); // Default to true to show list initially

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
    };

    const handleReset = () => {
        setSearchCode('');
        setHasSearched(false);
    };

    return (
        <div className="text-gray-800">
            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2">
                    <Search className="text-blue-500" /> TRA CỨU PHẢN ÁNH, KIẾN NGHỊ
                </h2>

                <form onSubmit={handleSearch} className="space-y-6 max-w-4xl">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tra cứu theo mã phản ánh</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value)}
                                placeholder="Nhập mã phản ánh để tra cứu (Ví dụ: 1771794882779)..."
                                className="w-full border-2 border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:border-[#0f4c81] outline-none transition text-lg bg-gray-50 focus:bg-white"
                            />
                            <Search className="absolute right-4 top-3.5 text-gray-400" size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cấp xử lý</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Cấp trung ương</option>
                                <option>Cấp địa phương</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cơ quan tiếp nhận</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Bộ Tài chính</option>
                                <option>Bộ Xây dựng</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Đang xử lý</option>
                                <option>Đã xử lý</option>
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
            {hasSearched ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#0f4c81] text-white p-4 font-bold flex justify-between items-center">
                        <span>KẾT QUẢ TÌM KIẾM</span>
                        <span className="text-blue-200 font-medium text-sm">Tìm thấy {searchCode ? 1 : MOCK_DATA.length} kết quả</span>
                    </div>
                    {searchCode ? (
                        <ul className="divide-y divide-gray-100">
                            <li className="p-6 hover:bg-blue-50/50 transition-colors group">
                                <Link to={`/phan-anh-kien-nghi/1771794882779`} className="flex gap-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0f4c81] hover:underline mb-1">Mã PAKN: {searchCode}</h3>
                                        <p className="text-sm font-bold text-gray-800 mb-1">[Bộ Tài chính] Thông tư số 04/2025/TT-BTC hướng dẫn quản lý thu ngân sách...</p>
                                        <div className="flex flex-wrap items-center gap-x-4 text-xs mt-2">
                                            <span className="flex items-center gap-1 text-gray-500 font-medium"><Clock size={12} /> 11:09 17/03/2026</span>
                                            <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded"><CheckCircle2 size={12} /> Đã xử lý</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <div>
                            <ul className="divide-y divide-gray-100">
                                {MOCK_DATA.map(item => (
                                    <li key={item.id} className="p-6 hover:bg-blue-50/50 transition-colors group">
                                        <Link to={`/phan-anh-kien-nghi/${item.id}`} className="flex flex-col sm:flex-row gap-6">
                                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-blue-600 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                                <FileText size={32} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-[#0f4c81] text-lg hover:underline mb-2 leading-snug">
                                                    [{item.agency}] {item.title}
                                                </h3>
                                                <p className="text-gray-600 text-[15px] mb-4">"{item.content}"</p>
                                                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
                                                    <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                                        <Clock size={16} /> {item.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-[#0f4c81] font-medium bg-blue-50 px-2.5 py-1 rounded">
                                                        <ExternalLink size={16} /> Gửi tới: {item.agency}
                                                    </span>
                                                    {item.status === 'Đã xử lý' ?
                                                        <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                                                            <CheckCircle2 size={14} /> Đã xử lý
                                                        </span>
                                                        :
                                                        <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                                                            <RotateCw size={14} /> Đang xử lý
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-gray-500 text-sm font-medium">Tổng số: 4,024 bản ghi</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 border rounded-lg text-gray-500 hover:bg-gray-100 bg-white font-medium cursor-not-allowed">Trang trước</button>
                                    <button className="px-3 py-1.5 border rounded-lg bg-[#0f4c81] text-white font-medium">1</button>
                                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">2</button>
                                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">3</button>
                                    <button className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-medium transition">Trang sau</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default PhanAnhKienNghiPage;

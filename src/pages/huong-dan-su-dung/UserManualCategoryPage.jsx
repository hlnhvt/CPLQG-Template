import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronDown, FileText, Settings, User, MessageSquare, BookOpen } from 'lucide-react';

const CATEGORIES = [
    {
        id: 'tai-khoan',
        icon: <User className="w-6 h-6 text-blue-500" />,
        title: 'Tài khoản & Hồ sơ',
        count: 5,
        desc: 'Đăng ký, đăng nhập và quản lý thông tin cá nhân',
        articles: [
            { id: '1', title: 'Hướng dẫn đăng ký tài khoản (eID)' },
            { id: '2', title: 'Quên mật khẩu và cách lấy lại' },
            { id: '3', title: 'Cập nhật thông tin định danh' }
        ]
    },
    {
        id: 'tra-cuu',
        icon: <Search className="w-6 h-6 text-green-500" />,
        title: 'Tra cứu pháp luật',
        count: 8,
        desc: 'Sử dụng bộ công cụ tìm kiếm chuẩn và AI',
        articles: [
            { id: '4', title: 'Tính năng tìm kiếm cơ bản' },
            { id: '5', title: 'Tra cứu theo chủ đề và hiệu lực' },
            { id: '6', title: 'Hỏi đáp với AI pháp luật (Chatbot)' },
            { id: '7', title: 'Tìm lại lịch sử tìm kiếm' }
        ]
    },
    {
        id: 'hoi-dap',
        icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
        title: 'Hỏi đáp & Phản ánh',
        count: 4,
        desc: 'Gửi câu hỏi pháp luật, phản ánh kiến nghị',
        articles: [
            { id: '8', title: 'Tạo câu hỏi pháp lật mới' },
            { id: '9', title: 'Theo dõi tiến trình giải quyết câu hỏi' }
        ]
    },
    {
        id: 'khac',
        icon: <Settings className="w-6 h-6 text-gray-500" />,
        title: 'Chức năng khác',
        count: 3,
        desc: 'Các thiết lập hệ thống, thông báo',
        articles: [
            { id: '10', title: 'Thiết lập nhận thông báo Email' }
        ]
    }
];

const UserManualCategoryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarSearch, setSidebarSearch] = useState('');
    const [openCats, setOpenCats] = useState(['tai-khoan']); // default open first category
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleCat = (id) => {
        setOpenCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    };

    const handleMainSearch = (e) => {
        e.preventDefault();
        // In a real app, this would route to a search results page or filter all articles
        if (searchTerm.trim()) {
            // Mock navigation to article 4 as an example
            navigate('/huong-dan-su-dung/bai-viet/4');
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Header Area */}
            <div className="bg-[#0f4c81] text-white pt-10 pb-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                            Hướng dẫn sử dụng
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-8">
                            Tìm kiếm hướng dẫn cài đặt, sử dụng các tính năng của Cổng Thông tin pháp luật quốc gia.
                        </p>
                        <form onSubmit={handleMainSearch} className="w-full max-w-2xl relative">
                            <input
                                type="text"
                                placeholder="Bạn đang gặp khó khăn gì? Nhập từ khóa để tìm kiếm..."
                                className="w-full pl-6 pr-14 py-4 rounded-full text-gray-900 border-2 border-transparent focus:border-blue-400 focus:outline-none shadow-lg text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0f4c81] hover:bg-blue-800 text-white p-2.5 rounded-full transition-colors shrink-0">
                                <Search className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Layout: Sidebar + Main Grid */}
            <div className="container mx-auto px-4 max-w-6xl -mt-6">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left Sidebar (25%) */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                            <h2 className="font-bold text-gray-900 mb-4 uppercase text-sm flex items-center gap-2 border-b pb-2">
                                <BookOpen className="w-4 h-4 text-[#0f4c81]" />
                                Danh mục Hướng dẫn
                            </h2>
                            <div className="relative mb-4">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Lọc danh mục nhanh..."
                                    className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                                    value={sidebarSearch}
                                    onChange={(e) => setSidebarSearch(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                {CATEGORIES.filter(cat => cat.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                                    cat.articles.some(a => a.title.toLowerCase().includes(sidebarSearch.toLowerCase())))
                                    .map((cat) => (
                                        <div key={cat.id} className="mb-2">
                                            <button
                                                onClick={() => toggleCat(cat.id)}
                                                className="w-full flex items-center justify-between text-left py-2 px-2 hover:bg-gray-50 rounded-md transition text-[15px] font-medium text-gray-800"
                                            >
                                                <span className="flex items-center gap-2">
                                                    {React.cloneElement(cat.icon, { className: "w-4 h-4" })} {cat.title}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openCats.includes(cat.id) ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Sub-articles tree */}
                                            {openCats.includes(cat.id) && (
                                                <ul className="pl-6 mt-1 space-y-1">
                                                    {cat.articles.filter(a => a.title.toLowerCase().includes(sidebarSearch.toLowerCase())).map(article => (
                                                        <li key={article.id}>
                                                            <Link
                                                                to={`/huong-dan-su-dung/bai-viet/${article.id}`}
                                                                className="block py-1.5 px-2 text-[14px] text-gray-600 hover:text-[#0f4c81] hover:bg-blue-50 rounded transition"
                                                            >
                                                                {article.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    {cat.articles.filter(a => a.title.toLowerCase().includes(sidebarSearch.toLowerCase())).length === 0 && (
                                                        <li className="py-1 px-2 text-[13px] text-gray-400 italic">Không tìm thấy bài viết.</li>
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid (75%) */}
                    <div className="md:w-3/4">
                        <div className="flex items-center text-sm mb-6 text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                            <Link to="/" className="hover:text-[#0f4c81] transition-colors font-medium">Trang chủ</Link>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <span className="text-gray-900 font-bold">Hướng dẫn sử dụng</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {CATEGORIES.map(cat => (
                                <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group" onClick={() => navigate(`/huong-dan-su-dung/bai-viet/${cat.articles[0]?.id || '1'}`)}>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                                            {React.cloneElement(cat.icon, { className: 'w-7 h-7' })}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0f4c81] transition-colors">{cat.title}</h3>
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{cat.count} bài viết</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm flex-1 leading-relaxed">
                                        {cat.desc}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                                        {cat.articles.slice(0, 2).map((a, i) => (
                                            <p key={a.id} className="text-[13px] text-gray-500 flex items-center gap-2">
                                                <FileText className="w-3.5 h-3.5 text-gray-400" /> <span className="truncate hover:text-[#0f4c81]">{a.title}</span>
                                            </p>
                                        ))}
                                        {cat.articles.length > 2 && (
                                            <p className="text-[12px] text-blue-600 italic font-medium pt-1">Xem thêm {cat.articles.length - 2} bài viết...</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManualCategoryPage;

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronDown, BookOpen, ThumbsUp, ThumbsDown, ArrowLeft, ArrowRight } from 'lucide-react';

const CATEGORIES = [
    {
        id: 'tai-khoan',
        title: 'Tài khoản & Hồ sơ',
        articles: [
            { id: '1', title: 'Hướng dẫn đăng ký tài khoản (eID)' },
            { id: '2', title: 'Quên mật khẩu và cách lấy lại' },
            { id: '3', title: 'Cập nhật thông tin định danh' }
        ]
    },
    {
        id: 'tra-cuu',
        title: 'Tra cứu pháp luật',
        articles: [
            { id: '4', title: 'Tính năng tìm kiếm cơ bản' },
            { id: '5', title: 'Tra cứu theo chủ đề và hiệu lực' },
            { id: '6', title: 'Hỏi đáp với AI pháp luật (Chatbot)' },
            { id: '7', title: 'Tìm lại lịch sử tìm kiếm' }
        ]
    },
    {
        id: 'hoi-dap',
        title: 'Hỏi đáp & Phản ánh',
        articles: [
            { id: '8', title: 'Tạo câu hỏi pháp lật mới' },
            { id: '9', title: 'Theo dõi tiến trình giải quyết câu hỏi' }
        ]
    },
    {
        id: 'khac',
        title: 'Chức năng khác',
        articles: [
            { id: '10', title: 'Thiết lập nhận thông báo Email' }
        ]
    }
];

const UserManualArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find category and article logic
    let currentArticle = null;
    let currentCategory = null;

    for (const cat of CATEGORIES) {
        const article = cat.articles.find(a => a.id === id);
        if (article) {
            currentArticle = article;
            currentCategory = cat;
            break;
        }
    }

    // Default to first article if not found
    if (!currentArticle) {
        currentCategory = CATEGORIES[0];
        currentArticle = CATEGORIES[0].articles[0];
    }

    const [sidebarSearch, setSidebarSearch] = useState('');
    const [openCats, setOpenCats] = useState([currentCategory.id]);
    const [activeSection, setActiveSection] = useState('muc-1');
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Ensure the category of the current article is open
        if (!openCats.includes(currentCategory.id)) {
            setOpenCats(prev => [...prev, currentCategory.id]);
        }
    }, [id]);

    // Simple scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['muc-1', 'muc-2', 'muc-3'];
            let current = '';
            for (let secId of sections) {
                const element = document.getElementById(secId);
                if (element && window.scrollY >= element.offsetTop - 150) {
                    current = secId;
                }
            }
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    const toggleCat = (catId) => {
        setOpenCats(prev => prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]);
    };

    const handleFeedback = (type) => {
        setFeedback(type);
        setTimeout(() => {
            alert("Cảm ơn phản hồi của bạn!");
        }, 100);
    };

    // Find previous and next articles
    const articleIndex = currentCategory.articles.findIndex(a => a.id === currentArticle.id);
    const prevArticle = articleIndex > 0 ? currentCategory.articles[articleIndex - 1] : null;
    const nextArticle = articleIndex < currentCategory.articles.length - 1 ? currentCategory.articles[articleIndex + 1] : null;

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Header Area */}
            <div className="bg-[#0f4c81] text-white pt-8 pb-12 px-4 shadow-sm">
                <div className="container mx-auto max-w-[1400px]">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">HƯỚNG DẪN SỬ DỤNG</h1>
                </div>
            </div>

            {/* Layout: Sidebar + Main Content + Right TOC */}
            <div className="container mx-auto px-4 max-w-[1400px] -mt-6">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar (25% / 300px min) */}
                    <div className="lg:w-1/4 lg:min-w-[280px] shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2 uppercase text-sm">
                                <BookOpen className="w-4 h-4 text-[#0f4c81]" />
                                Danh mục Hướng dẫn
                            </h2>
                            <div className="relative mb-4">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Lọc danh mục..."
                                    className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                                    value={sidebarSearch}
                                    onChange={(e) => setSidebarSearch(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                {CATEGORIES.filter(cat => cat.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
                                    cat.articles.some(a => a.title.toLowerCase().includes(sidebarSearch.toLowerCase())))
                                    .map((cat) => (
                                        <div key={cat.id} className="mb-2">
                                            <button
                                                onClick={() => toggleCat(cat.id)}
                                                className="w-full flex items-center justify-between text-left py-2 px-2 hover:bg-gray-50 rounded-md transition text-[15px] font-bold text-[#0f4c81]"
                                            >
                                                {cat.title}
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openCats.includes(cat.id) ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Sub-articles tree */}
                                            {openCats.includes(cat.id) && (
                                                <ul className="pl-4 mt-1 border-l-2 border-gray-100 ml-2 space-y-1 py-1">
                                                    {cat.articles.filter(a => a.title.toLowerCase().includes(sidebarSearch.toLowerCase())).map(article => (
                                                        <li key={article.id} className="relative">
                                                            {currentArticle.id === article.id && (
                                                                <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                                                            )}
                                                            <Link
                                                                to={`/huong-dan-su-dung/bai-viet/${article.id}`}
                                                                className={`block py-2 px-3 text-[14px] rounded transition ${currentArticle.id === article.id ? 'text-[#0f4c81] bg-blue-50 font-semibold' : 'text-gray-600 hover:text-[#0f4c81] hover:bg-gray-50'}`}
                                                            >
                                                                {article.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    {cat.articles.filter(a => a.title.toLowerCase().includes(sidebarSearch.toLowerCase())).length === 0 && (
                                                        <li className="py-1 px-3 text-[13px] text-gray-400 italic">Không tìm thấy bài viết.</li>
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Article (55%) */}
                    <div className="lg:w-[50%] lg:flex-1 shrink-0">

                        {/* Article Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 font-medium text-xs rounded-full mb-4">
                                {currentCategory.title}
                            </span>
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {currentArticle.title}
                            </h1>
                            <p className="text-gray-500 italic mb-8 border-l-4 border-gray-300 pl-4 text-[15px]">
                                Bài viết này hướng dẫn chi tiết các bước để thực hiện thao tác liên quan đến {currentArticle.title.toLowerCase()} trên Cổng Pháp luật quốc gia.
                            </p>

                            <div className="prose max-w-none text-gray-800 leading-[1.8] space-y-6">
                                <section id="muc-1" className="scroll-mt-24">
                                    <h2 className="text-xl font-bold text-[#0f4c81] mb-3 border-b border-gray-100 pb-2">1. Giới thiệu chức năng</h2>
                                    <p>
                                        Chức năng này cho phép người dùng đăng ký hoặc quản lý thông tin một cách dễ dàng.
                                        Vui lòng đảm bảo bạn đang sử dụng trình duyệt mới nhất và đã chuẩn bị sẵn các giấy tờ/thông tin định danh cần thiết trước khi bắt đầu.
                                    </p>
                                </section>

                                <section id="muc-2" className="scroll-mt-24">
                                    <h2 className="text-xl font-bold text-[#0f4c81] mb-3 border-b border-gray-100 pb-2">2. Các bước thực hiện</h2>
                                    <p>Thực hiện các bước sau để hoàn tất quá trình:</p>
                                    <ol className="list-decimal pl-6 space-y-2 font-medium">
                                        <li>Truy cập vào trang đích từ thanh menu điều hướng Tên miền hoặc icon góc phải màn hình.</li>
                                        <li>Điền đầy đủ các trường thông tin được gắn dấu sao màu đỏ (<span className="text-red-500">*</span>).</li>
                                        <li>Bấm nút <strong>Xác nhận</strong> ở cuối trang để hoàn tất biểu mẫu.</li>
                                        <li>Kiểm tra email hoặc thông báo trả về qua số điện thoại đã đăng ký để lấy mã OTP xác thực.</li>
                                    </ol>

                                    <div className="my-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r text-[15px] text-gray-700">
                                        <strong>Lưu ý quan trọng:</strong> Nếu bạn không nhận được mã xác thực trong vòng 5 phút, vui lòng kiểm tra hộp thư rác (Spam) hoặc thực hiện yêu cầu gửi lại mã bằng nút "Gửi lại OTP".
                                    </div>
                                </section>

                                <section id="muc-3" className="scroll-mt-24">
                                    <h2 className="text-xl font-bold text-[#0f4c81] mb-3 border-b border-gray-100 pb-2">3. Câu hỏi thường gặp (FAQ)</h2>
                                    <ul className="list-none space-y-4">
                                        <li className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <strong className="block text-gray-900 mb-1 leading-snug">Hệ thống báo lỗi "Dữ liệu không hợp lệ" phải làm sao?</strong>
                                            <span className="text-gray-600 font-normal">Điều này thường do bạn nhập sai định dạng số điện thoại hoặc email. Hãy kiểm tra lại biểu mẫu và xóa bỏ các khoảng trắng thừa.</span>
                                        </li>
                                    </ul>
                                </section>
                            </div>

                        </div>

                        {/* Article Navigation */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                            {prevArticle ? (
                                <Link to={`/huong-dan-su-dung/bai-viet/${prevArticle.id}`} className="flex-1 flex flex-col items-start p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition group">
                                    <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Bài trước</span>
                                    <span className="font-bold text-[#0f4c81] line-clamp-1">{prevArticle.title}</span>
                                </Link>
                            ) : <div className="flex-1"></div>}

                            {nextArticle ? (
                                <Link to={`/huong-dan-su-dung/bai-viet/${nextArticle.id}`} className="flex-1 flex flex-col items-end p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition group text-right">
                                    <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">Bài tiếp theo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                                    <span className="font-bold text-[#0f4c81] line-clamp-1">{nextArticle.title}</span>
                                </Link>
                            ) : <div className="flex-1"></div>}
                        </div>

                    </div>

                    {/* Right TOC (20% / 240px min) */}
                    <div className="hidden xl:block lg:w-1/4 lg:max-w-[280px] shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide border-l-4 border-yellow-400 pl-3">
                                Nội dung bài viết
                            </h3>
                            <ul className="space-y-3 text-[14px]">
                                {[
                                    { id: 'muc-1', label: '1. Giới thiệu chức năng' },
                                    { id: 'muc-2', label: '2. Các bước thực hiện' },
                                    { id: 'muc-3', label: '3. Câu hỏi thường gặp' }
                                ].map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            onClick={(e) => scrollToSection(e, item.id)}
                                            className={`block transition-colors border-l-2 pl-3 py-1 ${activeSection === item.id ? 'border-[#0f4c81] text-[#0f4c81] font-bold bg-blue-50/50' : 'border-transparent text-gray-600 hover:text-[#0f4c81]'}`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManualArticlePage;

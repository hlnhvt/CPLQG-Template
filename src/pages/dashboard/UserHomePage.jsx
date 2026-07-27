import React from 'react';
import { LayoutGrid, List, CloudSun, Wind, Droplets, MessageSquare, BarChart2, PieChart, Clock, FileText, Share2, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// --- MOCK DATA FOR HOMEPAGE PREVIEW ---
// Matches the structure in UserSettingsPage
import { LEGAL_FIELDS, NEWS_CATEGORIES, FORUMS, STATISTICS, ALL_ITEMS } from '../../data/personalizationData';

// ---- Custom Custom Static Chart Components ----
const NumberWidget = () => (
    <div className="flex flex-col flex-1 justify-center p-2 mb-4">
        <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center shadow-inner shrink-0">
                <MessageSquare size={32} />
            </div>
            <div className="flex-1">
                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">1,492</h3>
                <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wide">Tổng lượt bình luận</p>
            </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
            <span className="text-green-700 text-xs font-bold bg-green-100/80 border border-green-200 px-2 py-1 rounded-md flex items-center">
                +12.5%
            </span>
            <span className="text-gray-500 text-sm font-medium">so với tháng trước</span>
        </div>
    </div>
);

const SimpleBarChart = () => {
    const data = [12, 19, 15, 25, 22, 30];
    const max = 30;
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    return (
        <div className="flex flex-col h-full flex-1 w-full relative">
            <div className="flex justify-between items-end flex-1 gap-2 sm:gap-4 w-full h-full min-h-[140px] pt-6 relative px-2">
                {/* Horizontal reference lines */}
                <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-200"></div>
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-200"></div>
                <div className="absolute bottom-6 left-0 right-0 border-t border-gray-300"></div>

                {data.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group z-10 relative">
                        <div
                            className="bg-blue-500 group-hover:bg-orange-500 rounded-t-md w-full max-w-[40px] transition-colors duration-300 relative"
                            style={{ height: `${(val / max) * 100}%` }}
                        >
                            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-medium">
                                {val}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-2 pt-2">
                {months.map((month, idx) => (
                    <div key={idx} className="flex-1 text-center text-xs text-gray-500 font-semibold">{month}</div>
                ))}
            </div>
        </div>
    );
};

const SimplePieChart = () => {
    return (
        <div className="flex flex-col items-center justify-center p-2 flex-1 w-full">
            <div
                className="w-36 h-36 rounded-full shadow-inner transform hover:scale-105 transition-transform duration-500 relative"
                style={{
                    background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 90%, #6366f1 90% 100%)'
                }}
            >
                <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-gray-400 font-bold"><PieChart size={24} /></span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-8 w-full">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-sm shrink-0"></span> Đất đai</div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shrink-0"></span> Tin nóng</div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shrink-0"></span> Doanh nghiệp</div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-sm shrink-0"></span> Khác</div>
            </div>
        </div>
    );
};

// Default fallback configuration
const DEFAULT_BLOCKS = [
    { id: 'dat-dai', viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' },
    { id: 'news-tin-nong', viewMode: 'list', width: '50', recordCount: 10, sortOrder: 'most_viewed' },
    { id: 'forum-luat-su', viewMode: 'card', width: '50', recordCount: 5, sortOrder: 'most_commented' },
];

const FIELD_KEYWORDS = {
    'Đất đai và Bất động sản': ['Đất đai', 'Nhà ở', 'Kinh doanh bất động sản', 'Giá đất', 'Thu hồi đất'],
    'Xây dựng và Đầu tư': ['Xây dựng', 'Đầu tư', 'Đấu thầu', 'Quy hoạch đô thị', 'Quản lý dự án'],
    'Thuế và Kế toán': ['Thuế thu nhập', 'Quản lý thuế', 'Kế toán', 'Hóa đơn chứng từ', 'Kiểm toán độc lập'],
    'Lao động và Tiền lương': ['Lao động', 'Tiền lương', 'Bảo hiểm xã hội', 'Việc làm', 'An toàn lao động'],
    'Dân sự và Hình sự': ['Dân sự', 'Hình sự', 'Tố tụng hình sự', 'Thi hành án', 'Xử lý vi phạm hành chính'],
    'Bảo hiểm và Y tế': ['Bảo hiểm y tế', 'Khám chữa bệnh', 'Dược', 'Phòng chống bệnh truyền nhiễm', 'Vệ sinh an toàn thực phẩm']
};

const generateMockDocsForField = (field, type) => {
    const keywords = FIELD_KEYWORDS[field] || FIELD_KEYWORDS['Đất đai và Bất động sản'];

    if (type === 'new') {
        return [
            { id: `new-${field}-1`, title: `Luật ${keywords[0]} năm 2024`, status: 'Chưa có hiệu lực', issueDate: '18/01/2024', effectiveDate: '01/01/2025', isNew: true },
            { id: `new-${field}-2`, title: `Luật ${keywords[1]} sửa đổi năm 2023`, status: 'Chưa có hiệu lực', issueDate: '27/11/2023', effectiveDate: '01/01/2025', isNew: true },
            { id: `new-${field}-3`, title: `Nghị định quy định chi tiết thi hành Luật ${keywords[2]}`, status: 'Chưa có hiệu lực', issueDate: '28/11/2023', effectiveDate: '01/01/2025', isNew: true }
        ];
    } else if (type === 'expired') {
        return [
            { id: `exp-${field}-1`, title: `Luật ${keywords[0]} năm 2013`, status: 'Hết hiệu lực', issueDate: '29/11/2013', effectiveDate: '01/07/2014', isNew: false },
            { id: `exp-${field}-2`, title: `Luật ${keywords[1]} năm 2014`, status: 'Hết hiệu lực', issueDate: '25/11/2014', effectiveDate: '01/07/2015', isNew: false },
            { id: `exp-${field}-3`, title: `Nghị định quy định chi tiết thi hành một số điều của Luật ${keywords[2]}`, status: 'Hết hiệu lực', issueDate: '15/05/2014', effectiveDate: '01/07/2014', isNew: false }
        ];
    } else {
        return [
            { id: `amd-${field}-1`, title: `Luật ${keywords[0]} năm 2014`, status: 'Còn hiệu lực', issueDate: '18/06/2014', effectiveDate: '01/01/2015', isNew: false },
            { id: `amd-${field}-2`, title: `Luật ${keywords[1]} năm 2014`, status: 'Còn hiệu lực', issueDate: '25/11/2014', effectiveDate: '01/07/2015', isNew: false },
            { id: `amd-${field}-3`, title: `Nghị định quy định chi tiết và hướng dẫn thi hành Luật ${keywords[2]}`, status: 'Còn hiệu lực', issueDate: '20/10/2015', effectiveDate: '10/12/2015', isNew: false }
        ];
    }
};

const MOCK_NEWS = [
    {
        id: 'news1',
        title: '4 hành vi vi phạm trong hoạt động công chứng bị phạt đến 25 triệu đồng',
        description: 'Ngày 01/4/2026, Chính phủ ban hành Nghị định số 109/2026/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực bổ trợ tư pháp, hành chính tư pháp, hôn nhân và gia đình, thi hành án dân sự, phá sản doanh nghiệp, hợp tác xã. Trong đó, quy định mức phạt tiền đối với 4 hành vi vi phạm trong hoạt động công chứng.',
        date: '22/07/2026',
        time: '09:10',
        imageUrl: '/thumb1.png'
    },
    {
        id: 'news2',
        title: '7 đối tượng được hỗ trợ tiền sử dụng sản phẩm, dịch vụ công ích thủy lợi',
        description: 'Chính phủ đã ban hành Nghị định 115/2026/NĐ-CP vào ngày 02/04/2026, quy định chi tiết một số điều và biện pháp thi hành Luật Thủy lợi. Nghị định này quy định cụ thể 7 đối tượng được Nhà nước hỗ trợ tiền sử dụng sản phẩm, dịch vụ công ích thủy lợi từ ngân sách trung ương.',
        date: '20/07/2026',
        time: '14:50',
        imageUrl: '/thumb2.png'
    },
    {
        id: 'news3',
        title: 'THỦ TƯỚNG CHÍNH PHỦ BAN HÀNH QUY CHẾ QUẢN LÝ, VẬN HÀNH, KHAI THÁC CỔNG PHÁP LUẬT QUỐC GIA',
        description: 'Ngày 13/7/2026, Thủ tướng Chính phủ đã ban hành Quyết định số 35/2026/QĐ-TTg ban hành Quy chế quản lý, duy trì, cập nhật, khai thác và sử dụng Cổng Thông tin điện tử Pháp điển. Đây là bước tiến quan trọng nhằm minh bạch hóa và phổ biến thông tin pháp luật rộng rãi đến người dân và doanh nghiệp.',
        date: '18/07/2026',
        time: '10:51',
        imageUrl: '/thumb3.png'
    }
];

const getSortOrderLabel = (key) => {
    switch (key) {
        case 'newest': return 'Mới nhất';
        case 'most_viewed': return 'Được xem nhiều nhất';
        case 'most_commented': return 'Bình luận cao nhất';
        case 'most_shared': return 'Chia sẻ cao nhất';
        case 'most_feedback': return 'Góp ý nhiều nhất';
        case 'most_favorite': return 'Yêu thích nhất';
        default: return key;
    }
};

const UserHomePage = () => {
    const { user } = useAuth();

    // Read user configuration from localStorage
    const [orderedBlocks, setOrderedBlocks] = React.useState(() => {
        const saved = localStorage.getItem('userOrderedBlocks');
        return saved ? JSON.parse(saved) : DEFAULT_BLOCKS;
    });

    const [activeRecTab, setActiveRecTab] = React.useState('moi-ban-hanh');
    const [randomField] = React.useState(() => {
        const fields = ['Đất đai và Bất động sản', 'Xây dựng và Đầu tư', 'Thuế và Kế toán', 'Lao động và Tiền lương', 'Dân sự và Hình sự', 'Bảo hiểm và Y tế'];
        return fields[Math.floor(Math.random() * fields.length)];
    });

    const docsByTab = React.useMemo(() => {
        return {
            'moi-ban-hanh': generateMockDocsForField(randomField, 'new'),
            'het-hieu-luc': generateMockDocsForField(randomField, 'expired'),
            'sua-doi': generateMockDocsForField(randomField, 'amended')
        };
    }, [randomField]);

    // Get current date string
    const today = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dateString = `${days[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    return (
        <div className="pb-12 animate-fadeIn space-y-6">

            {/* Top Weather & Greeting Section */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-cyan-50/80 rounded-xl shadow-sm border border-indigo-100/60 p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden animate-slideUpFade">
                {/* Decorative background blur */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-300/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex-1 pl-4 md:pl-6">
                    <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-2">
                        Xin chào, <Link to="/ca-nhan/ho-so" className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors">{user?.name || 'Nguyễn Anh Quân'}</Link>
                    </h1>
                    <p className="text-gray-600 italic flex items-center gap-2">
                        "Luật pháp là nghệ thuật của cái thiện và sự công bằng."
                    </p>
                </div>

                <div className="relative z-10 flex items-center justify-end w-full md:w-auto bg-white/50 backdrop-blur-md p-4 rounded-xl border border-white/80 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center">
                            <CloudSun size={52} className="text-amber-500 drop-shadow-sm" strokeWidth={1.5} />
                            <div className="ml-3 flex items-start">
                                <span className="text-4xl font-bold text-gray-800 tracking-tighter">27</span>
                                <div className="text-gray-500 font-medium text-lg mt-1 ml-1">&deg;C <span className="text-gray-300 font-light mx-1">|</span> &deg;F</div>
                            </div>
                        </div>

                        <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>

                        <div className="text-sm text-gray-600 space-y-0.5 hidden sm:block min-w-[140px]">
                            <p className="flex justify-between">Khả năng có mưa: <span className="font-semibold text-gray-800">25%</span></p>
                            <p className="flex justify-between">Độ ẩm: <span className="font-semibold text-gray-800">66%</span></p>
                            <p className="flex justify-between">Gió: <span className="font-semibold text-gray-800">19 km/h</span></p>
                        </div>

                        <div className="h-12 w-px bg-gray-200"></div>

                        <div className="text-right pl-2">
                            <h3 className="text-xl font-bold text-gray-800 leading-tight">Thời tiết</h3>
                            <p className="text-sm text-gray-500">{days[today.getDay()]}</p>
                            <p className="text-sm text-gray-500">Nhiều mây</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split Grid for Recommendations and News */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Văn bản đề xuất Section */}
                <section className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-slideUpFade" style={{ animationDelay: '100ms' }}>
                    <h4 className="font-bold text-xl text-gray-800 flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                        Văn bản đề xuất
                    </h4>
                    <p className="text-[14px] text-gray-600 mb-5 ml-4 italic">
                        Danh sách văn bản được đề xuất vì bạn quan tâm tới lĩnh vực <span className="font-semibold text-blue-600">{randomField}</span>
                    </p>
                    {/* Tabs */}
                    <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-4 gap-1">
                        <button
                            onClick={() => setActiveRecTab('moi-ban-hanh')}
                            className={`flex-1 py-3 px-2 text-center font-bold text-[15px] transition-colors rounded-t ${activeRecTab === 'moi-ban-hanh' ? 'bg-[#0056b3] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-b-0 border-gray-200'}`}
                        >
                            Văn bản mới ban hành
                        </button>
                        <button
                            onClick={() => setActiveRecTab('het-hieu-luc')}
                            className={`flex-1 py-3 px-2 text-center font-bold text-[15px] transition-colors rounded-t ${activeRecTab === 'het-hieu-luc' ? 'bg-[#0056b3] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-b-0 border-gray-200'}`}
                        >
                            Văn bản hết hiệu lực
                        </button>
                        <button
                            onClick={() => setActiveRecTab('sua-doi')}
                            className={`flex-1 py-3 px-2 text-center font-bold text-[15px] transition-colors rounded-t ${activeRecTab === 'sua-doi' ? 'bg-[#0056b3] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-b-0 border-gray-200'}`}
                        >
                            Văn bản sửa đổi
                        </button>
                    </div>
                    {/* List */}
                    <div className="space-y-3">
                        {docsByTab[activeRecTab].map((doc) => (
                            <div key={doc.id} className="bg-white border border-gray-200 rounded p-4 flex flex-col md:flex-row gap-4 hover:shadow-sm transition-shadow">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start gap-2">
                                        {doc.isNew && (
                                            <span className="bg-[#dc3545] text-white text-[11px] font-bold px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                                                Mới
                                            </span>
                                        )}
                                        <Link to={`/van-ban/${doc.id}`} className="text-[15px] font-medium text-gray-800 hover:text-[#0056b3] leading-relaxed line-clamp-3">
                                            {doc.title}
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                            <FileText size={13} /> PDF
                                        </button>
                                        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                            <Share2 size={13} /> Lược đồ
                                        </button>
                                        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                            <Download size={13} /> Tải về
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full md:w-[200px] shrink-0 text-[12px] border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Trạng thái:</span>
                                        <span className="text-[#d9a406] font-medium text-right">{doc.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Ngày ban hành:</span>
                                        <span className="text-gray-700 text-right">{doc.issueDate}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Ngày hiệu lực:</span>
                                        <span className="text-gray-700 text-right">{doc.effectiveDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tin tức đề xuất Section */}
                <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-slideUpFade flex flex-col" style={{ animationDelay: '200ms' }}>
                    <h4 className="font-bold text-xl text-gray-800 flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-6 bg-[#0056b3] rounded-full block"></span>
                        Tin tức đề xuất
                    </h4>
                    <p className="text-[14px] text-gray-600 mb-5 ml-4 italic">
                        Tin tức được đề xuất dành cho bạn
                    </p>
                    <div className="space-y-4 flex-1">
                        {MOCK_NEWS.map((news) => (
                            <div key={news.id} className="group border border-gray-100 rounded-lg p-3 flex gap-3 hover:shadow-md transition-shadow bg-white">
                                <div className="w-[100px] h-[75px] shrink-0 rounded overflow-hidden relative">
                                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <Link to="#" className="font-bold text-[14px] leading-tight text-[#0056b3] group-hover:text-blue-800 line-clamp-2 mb-1">
                                        {news.title}
                                    </Link>
                                    <p className="text-[12px] text-gray-600 line-clamp-3 mb-1">{news.description}</p>
                                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {news.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Configured Layout Preview */}
            <div className="flex flex-wrap -mx-3 md:-mx-4 lg:-mx-5">
                {orderedBlocks.map((block, idx) => {
                    const itemDef = ALL_ITEMS.find(i => i.id === block.id);
                    if (!itemDef) return null;

                    const isFifty = block.width === '50';
                    const isStatistic = block.id.startsWith('stat-');

                    let wClass = 'w-full';
                    if (block.width === '50') wClass = 'w-full lg:w-1/2';
                    if (block.width === '33') wClass = 'w-full lg:w-1/3 md:w-1/2';
                    if (block.width === '25') wClass = 'w-full xl:w-1/4 md:w-1/2';

                    return (
                        <div
                            key={`user-home-${block.id}`}
                            className={`${wClass} px-3 md:px-4 lg:px-5 mb-6 md:mb-8 lg:mb-10 animate-slideUpFade`}
                            style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                        >
                            <div className="bg-white p-5 sm:p-6 lg:p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden group">
                                <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-gray-50">
                                    <h4 className="font-bold text-xl text-gray-800 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                                        {itemDef.title}
                                    </h4>
                                    <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1">Xem tất cả <span className="text-lg leading-none">&rsaquo;</span></span>
                                </div>

                                <div className={`flex-1 mt-2 flex flex-col ${isStatistic ? 'h-full justify-center min-h-[160px]' : ''}`}>
                                    {isStatistic ? (
                                        <>
                                            {block.id === 'stat-comments-count' && <NumberWidget />}
                                            {block.id === 'stat-comments-bar' && <SimpleBarChart />}
                                            {block.id === 'stat-topics-pie' && <SimplePieChart />}
                                        </>
                                    ) : block.viewMode === 'card' ? (
                                        <div className={`grid gap-5 ${isFifty ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
                                            {[...Array(isFifty ? 2 : 4)].map((_, i) => (
                                                <div key={i} className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 shadow-sm transition-all group/card cursor-pointer">
                                                    <div className="h-40 bg-gray-100 relative overflow-hidden">
                                                        <img src={itemDef.thumbnail} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" alt="" />
                                                    </div>
                                                    <div className="p-4 flex flex-col flex-1">
                                                        <div className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
                                                            <Clock size={12} />
                                                            <span>20/07/2026</span>
                                                        </div>
                                                        <h5 className="font-bold text-[15px] leading-snug line-clamp-2 text-gray-800 group-hover/card:text-blue-700 transition-colors mb-2">Bản tin pháp luật mới nhất liên quan đến {itemDef.title.toLowerCase()}</h5>
                                                        <p className="text-sm text-gray-500 line-clamp-2 mt-auto">Mô tả ngắn gọn nội dung chi tiết của bản tin này, cung cấp thêm thông tin hữu ích cho người đọc.</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={`grid gap-5 ${isFifty ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 lg:gap-x-8'}`}>
                                            {[...Array(isFifty ? 3 : 6)].map((_, i) => (
                                                <div key={i} className="flex gap-4 p-3 bg-white rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all items-center cursor-pointer group/list">
                                                    <div className="w-28 h-20 sm:w-36 sm:h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                                                        <img src={itemDef.thumbnail} className="w-full h-full object-cover group-hover/list:scale-105 transition-transform duration-500" alt="" />
                                                    </div>
                                                    <div className="flex-1 py-1 flex flex-col justify-center min-w-0">
                                                        <h5 className="font-bold text-[15px] leading-snug line-clamp-2 text-gray-800 group-hover/list:text-blue-700 transition-colors mb-1.5">Tiêu đề chi tiết bài viết {i + 1} trong danh mục {itemDef.title}</h5>
                                                        <div className="text-xs text-gray-500 flex items-center gap-3">
                                                            <span className="flex items-center gap-1.5"><Clock size={12} /> 20/07/2026</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserHomePage;

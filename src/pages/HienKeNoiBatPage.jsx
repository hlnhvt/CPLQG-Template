import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Search, ChevronLeft, FileText, ArrowRight, Download, Flame, Info, ChevronUp, ChevronDown, BookOpen, Zap, Users, Maximize2, Minimize2, Calendar, Clock } from 'lucide-react';
import { Section, ConsultCard, HOT_ITEMS, NEW_HIGHLIGHTS, thumb } from './HienKeShared';

// Mock Drafts
const MOCK_DRAFTS = [
    { id: 1, title: "Dự thảo Luật quy định về kiểm soát rủi ro trong lĩnh vực Chính phủ", org: "Chính phủ", type: "Luật", ngayDang: "01/03/2026", hanGopY: "10/04/2026", isExpired: true, isHot: true, description: "Thiết lập cơ sở pháp lý vững chắc nhằm đánh giá, dự báo và phòng ngừa các rủi ro trong hoạt động điều hành của Chính phủ." },
    { id: 2, title: "Dự thảo Pháp lệnh quy định về kiểm soát rủi ro trong lĩnh vực Tài chính", org: "Bộ Tài chính", type: "Pháp lệnh", ngayDang: "02/03/2026", hanGopY: "11/04/2026", isExpired: false, isHot: true, description: "Quản lý chặt chẽ dòng vốn đầu tư công và nợ công, đảm bảo an toàn tài chính quốc gia trước các biến động kinh tế toàn cầu." },
    { id: 3, title: "Dự thảo Nghị định quy định về kiểm soát rủi ro trong lĩnh vực Tư pháp", org: "Bộ Tư pháp", type: "Nghị định", ngayDang: "03/03/2026", hanGopY: "12/04/2026", isExpired: false, description: "Tăng cường năng lực giải quyết tranh chấp pháp lý và kiểm soát chất lượng văn bản quy phạm pháp luật, giảm thiểu rủi ro pháp lý." },
    { id: 4, title: "Dự thảo Quyết định quy định về kiểm soát rủi ro trong lĩnh vực Y tế", org: "Bộ Y tế", type: "Quyết định", ngayDang: "04/03/2026", hanGopY: "13/04/2026", isExpired: false, description: "Xây dựng cơ chế phản ứng nhanh đối với dịch bệnh truyền nhiễm và quản lý rủi ro trong hệ thống khám chữa bệnh toàn dân." },
    { id: 5, title: "Dự thảo Thông tư quy định về kiểm soát rủi ro trong lĩnh vực Công an", org: "Bộ Công an", type: "Thông tư", ngayDang: "05/03/2026", hanGopY: "14/04/2026", isExpired: false, description: "Quy định chi tiết các biện pháp nghiệp vụ nhằm nhận diện và triệt tiêu các nguy cơ đe dọa an ninh trật tự an toàn xã hội." },
    { id: 6, title: "Dự thảo Nghị quyết quy định về kiểm soát rủi ro trong lĩnh vực Nông nghiệp và PTNT", org: "Bộ Nông nghiệp và PTNT", type: "Nghị quyết", ngayDang: "06/03/2026", hanGopY: "15/04/2026", isExpired: false, description: "Chính sách phòng chống thiên tai, thích ứng biến đổi khí hậu và kiểm soát rủi ro dịch bệnh trong sản xuất nông nghiệp." }
].map((draft, idx) => ({
    ...draft,
    agency: draft.org,
    startDate: draft.ngayDang,
    deadline: draft.hanGopY,
    status: draft.isExpired ? 'closed' : 'open',
    thumb: thumb(idx + 2),
    participants: draft.isHot ? 1520 + idx * 100 : 800 + idx * 50
}));

// Extended mock data for Nổi bật
const EXPANDED_ITEMS = [
    { ...NEW_HIGHLIGHTS[0], isHot: true }, // Luật Thủ đô (nb1)
    { ...HOT_ITEMS[0], isHot: true },      // Luật Đất đai (h1)
    ...NEW_HIGHLIGHTS.slice(1),
    ...HOT_ITEMS.slice(1),
    { id: 'h5', title: 'Hoàn thiện khung pháp lý về quản lý tài sản số', agency: 'Ngân hàng Nhà nước', status: 'open', deadline: '20/05/2026', participants: 1540, thumb: thumb(4), description: 'Bổ sung định nghĩa pháp lý liên quan đến tiền điện tử và dịch vụ giao dịch tài sản số hiện nay.' },
    { id: 'h6', title: 'Sửa đổi Luật BHXH: Điều kiện hưởng lương hưu', agency: 'Bộ Lao động – TB&XH', status: 'upcoming', deadline: '01/06/2026', participants: 0, thumb: thumb(5), description: 'Tháo gỡ những bất cập trong việc nhận BHXH một lần và điều chỉnh số năm đóng BHXH tối thiểu để nhận hưu trí.' },
    { id: 'h7', title: 'Dự thảo Nghị định bảo vệ dữ liệu cá nhân', agency: 'Bộ Công an', status: 'open', deadline: '10/05/2026', participants: 3200, thumb: thumb(0), description: 'Quy định khắt khe trách nhiệm của các cơ quan, tổ chức khi thu thập, xử lý và lưu trữ dữ liệu cá nhân.' },
    { id: 'h8', title: 'Cơ chế thí điểm phát triển điện gió ngoài khơi', agency: 'Bộ Công Thương', status: 'open', deadline: '15/05/2026', participants: 850, thumb: thumb(1), description: 'Cung cấp cơ chế tín dụng ưu đãi nhằm đẩy mạnh phát triển năng lượng tái tạo hướng biển.' },
    { id: 'h9', title: 'Quy định mới về đấu thầu thiết bị y tế', agency: 'Bộ Y tế', status: 'closed', deadline: '01/04/2026', participants: 1200, thumb: thumb(2), description: 'Đảm bảo quy trình đấu thầu, mua sắm vật tư y tế hiện đại công khai, hạn chế lãng phí.' },
    { id: 'h10', title: 'Góp ý quy chuẩn kỹ thuật nhà ở chung cư', agency: 'Bộ Xây dựng', status: 'open', deadline: '25/04/2026', participants: 410, thumb: thumb(3), description: 'Tiêu chuẩn kỹ thuật mới nhất về an toàn phòng cháy chữa cháy đối với nhà cao tầng.' },
    { id: 'h11', title: 'Nghị định quản lý thuế thương mại điện tử', agency: 'Bộ Tài chính', status: 'upcoming', deadline: '10/06/2026', participants: 0, thumb: thumb(4), description: 'Gia tăng quản lý thuế và truy thu các nguồn thu nhập từ các cá nhân, tổ chức kinh doanh trực tuyến.' },
    { id: 'h12', title: 'Luật Thủ đô (Sửa đổi): Ưu đãi đầu tư', agency: 'UBND TP Hà Nội', status: 'open', deadline: '15/05/2026', participants: 2750, thumb: thumb(5), description: 'Tạo cơ chế đặc thù vượt trội cho Hà Nội thu hút vốn đầu tư công nghệ cao trong và ngoài nước.' },
    { id: 'h13', title: 'Chính sách visa linh hoạt thu hút nhân tài', agency: 'Bộ Ngoại giao', status: 'open', deadline: '05/05/2026', participants: 5600, thumb: thumb(0), description: 'Rào cản visa được gỡ bỏ cho các nhà đầu tư chiến lược, chuyên gia chuyên sâu theo chính sách mới.' },
    { id: 'h14', title: 'Quy hoạch mạng lưới cơ sở giáo dục đại học', agency: 'Bộ Giáo dục và Đào tạo', status: 'open', deadline: '20/05/2026', participants: 1890, thumb: thumb(1), description: 'Kế hoạch sáp nhập, và cấu trúc lại hệ thống các trường công lập nhằm tối đa hóa hiệu suất đào tạo.' },
];

const ITEMS_PER_PAGE = 5;

const HienKeNoiBatPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isIntroOpen, setIsIntroOpen] = useState(false);
    const [viewMode, setViewMode] = useState('both'); // 'both', 'drafts', 'highlights'

    // Pagination States
    const [draftPage, setDraftPage] = useState(1);
    const [highlightPage, setHighlightPage] = useState(1);

    // Ticker State
    const [tickerIndex, setTickerIndex] = useState(0);
    const hotItems = useMemo(() => {
        const drafts = MOCK_DRAFTS.filter(d => d.isHot).map(d => ({ ...d, typeLabel: 'Dự thảo' }));
        const highlights = EXPANDED_ITEMS.filter(h => h.isHot).map(h => ({ ...h, typeLabel: 'Chủ đề' }));
        return [...drafts, ...highlights];
    }, []);

    useEffect(() => {
        if (hotItems.length === 0) return;
        const interval = setInterval(() => {
            setTickerIndex(prev => (prev + 1) % hotItems.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [hotItems.length]);

    // Filtered Highlights based on search
    const filteredHighlights = useMemo(() => {
        if (!searchTerm) return EXPANDED_ITEMS;
        return EXPANDED_ITEMS.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.agency.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    // Pagination Logic for Drafts
    const totalDraftPages = Math.ceil(MOCK_DRAFTS.length / ITEMS_PER_PAGE);
    const displayedDrafts = MOCK_DRAFTS.slice((draftPage - 1) * ITEMS_PER_PAGE, draftPage * ITEMS_PER_PAGE);

    // Pagination Logic for Highlights
    const totalHighlightPages = Math.ceil(filteredHighlights.length / ITEMS_PER_PAGE);
    const displayedHighlights = filteredHighlights.slice((highlightPage - 1) * ITEMS_PER_PAGE, highlightPage * ITEMS_PER_PAGE);

    // Reset pagination when searching
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setHighlightPage(1);
    };

    return (
        <div className="relative min-h-screen font-sans pb-20 bg-[#f8fafc] overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-orange-50/30 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] left-[15%] w-[30%] h-[30%] bg-indigo-50/20 rounded-full blur-[120px]" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: `radial-gradient(#1e3a8a 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}
                />

            </div>

            <div className="relative z-10">
                <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                    {/* Background: trống đồng image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                        style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                    />
                    {/* Overlay: dark navy so text is readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                    {/* Subtle gold shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                    <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-20">
                        <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] mb-6">
                            <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                            <ChevronRight size={14} />
                            <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                            <ChevronRight size={14} />
                            <span className="text-white/90">Vấn đề nổi bật</span>
                        </nav>

                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                            Chúng tôi cần bạn
                        </h1>
                        <p className="text-blue-100/90 text-[15px] leading-relaxed">
                            Tại mục này, người dân và doanh nghiệp có thể trực tiếp tham gia góp ý cho các dự thảo văn bản quy phạm pháp luật đang được lấy ý kiến theo quy định, đồng thời đề xuất các sáng kiến lập pháp nhằm chung tay hoàn thiện hệ thống pháp luật.                     </p>

                        {/* Leadership Quote */}
                        <div className="mt-8 w-full">
                            <div className="relative group text-center">
                                <div className="relative z-10">
                                    <p className="text-white/95 text-[15px] md:text-[18px] italic leading-relaxed font-medium mb-4">
                                        "Đổi mới mạnh mẽ công tác lập pháp, chuyển đổi tư duy xây dựng pháp luật theo hướng vừa bảo đảm yêu cầu quản lý nhà nước, vừa khuyến khích sáng tạo, khơi thông mọi nguồn lực để phát triển."
                                    </p>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-[2px] bg-amber-400/50 rounded-full mb-1" />
                                        <span className="text-amber-200 text-[13px] font-bold uppercase tracking-widest">Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV</span>
                                        {/* <p className="text-blue-200/70 text-[12px] italic">Trích bài viết về định hướng kỷ nguyên mới, kỷ nguyên vươn mình của dân tộc Việt Nam, tháng 10 năm 2024</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsIntroOpen(!isIntroOpen)}
                            className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[14px] font-medium transition-colors border border-white/20 backdrop-blur-sm"
                        >
                            <Info size={16} />
                            Giới thiệu
                            {isIntroOpen ? <ChevronUp size={16} className="ml-1 opacity-70" /> : <ChevronDown size={16} className="ml-1 opacity-70" />}
                        </button>
                    </div>
                </div>

                <div className="pt-8 container mx-auto px-4 md:px-8 max-w-[1280px] mb-4 pb-6">



                    {isIntroOpen && (
                        <div className="mb-10 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 text-gray-700 leading-relaxed animate-fadeIn shadow-2xl shadow-blue-900/10 relative overflow-hidden">
                            {/* Dong Son Drum Background Decoration */}
                            <div
                                className="absolute inset-0 bg-no-repeat opacity-[0.05] pointer-events-none"
                                style={{ backgroundImage: "url('/images/dong_son_cover.png')", backgroundSize: '140%', backgroundPosition: 'center -220px' }}
                            />

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="text-center mb-10 max-w-3xl mx-auto">
                                    <h4 className="text-[26px] md:text-[32px] font-bold mb-4 leading-tight">
                                        Chúng tôi cần bạn
                                    </h4>
                                    <div className="w-20 h-1.5 bg-black/70 mx-auto rounded-full mb-6"></div>
                                    <p className="text-gray-600 text-[17px] italic font-medium">
                                        Tại mục này, người dân và doanh nghiệp có thể trực tiếp tham gia góp ý cho các dự thảo văn bản quy phạm pháp luật đang được lấy ý kiến theo quy định, đồng thời đề xuất các sáng kiến lập pháp nhằm chung tay hoàn thiện hệ thống pháp luật.
                                    </p>
                                </div>

                                {/* Content Sections */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                                    <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                        <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                            Tầm nhìn
                                        </h5>
                                        <p className="text-[14px] leading-relaxed text-gray-700">
                                            Trở thành diễn đàn tương tác hàng đầu giữa cơ quan nhà nước và cộng đồng, giúp nhận diện và tháo gỡ những điểm nghẽn pháp lý cản trở sự phát triển kinh tế - xã hội.
                                        </p>
                                    </div>

                                    <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                        <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                            Mục tiêu ưu tiên
                                        </h5>
                                        <ul className="text-[14px] space-y-2 text-gray-700">
                                            <li className="flex gap-2"><span>•</span> Lấy ý kiến cho các dự thảo luật có tác động sâu rộng.</li>
                                            <li className="flex gap-2"><span>•</span> Nhận diện bất cập trong thi hành pháp luật từ thực tế.</li>
                                            <li className="flex gap-2"><span>•</span> Tạo kênh phản biện chính thống cho chuyên gia.</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                        <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                            Giá trị cốt lõi
                                        </h5>
                                        <p className="text-[14px] leading-relaxed text-gray-700">
                                            Mọi hiến kế tại mục Tiêu điểm sẽ được ưu tiên tổng hợp, báo cáo trực tiếp đến Ban soạn thảo và các cơ quan có thẩm quyền để kịp thời điều chỉnh chính sách.
                                        </p>
                                    </div>
                                </div>

                                {/* Leadership Quote Section */}
                                <div className="max-w-4xl mx-auto relative">
                                    <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl border border-purple-100/50 shadow-inner text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-purple-200/30 transition-all duration-700" />
                                        <p className="text-[17px] md:text-[19px] text-gray-800 italic leading-relaxed relative z-10 mb-4 font-medium">
                                            "Đổi mới mạnh mẽ công tác lập pháp, chuyển đổi tư duy xây dựng pháp luật theo hướng <br />vừa bảo đảm yêu cầu quản lý nhà nước, vừa khuyến khích sáng tạo, khơi thông mọi nguồn lực để phát triển."
                                        </p>
                                        <div className="w-12 h-0.5 bg-purple-300 mx-auto mb-4" />
                                        <footer className="text-purple-900 font-bold text-[14px] uppercase relative z-10">
                                            — Tổng Bí thư, Chủ tịch nước Tô Lâm —
                                        </footer>
                                        <p className="text-[12px] text-purple-600/70 mt-2 italic font-medium relative z-10">
                                            (Trích bài viết về định hướng kỷ nguyên mới, kỷ nguyên vươn mình của dân tộc Việt Nam, tháng 10 năm 2024)
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Highlight Ticker */}
                    {hotItems.length > 0 && (
                        <div className="mb-10 relative group">
                            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-orange-100 overflow-hidden flex items-center h-[160px] relative transition-all hover:shadow-2xl hover:shadow-blue-900/10 hover:border-orange-200">
                                {/* Dong Son Drum Background for Ticker */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.06] z-0 overflow-hidden"
                                    style={{
                                        backgroundImage: "url('/images/dong_son_cover.png')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        mixBlendMode: 'multiply'
                                    }}
                                />
                                {/* Label */}
                                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white h-full px-10 flex flex-col justify-center gap-1 shrink-0 relative z-10">
                                    <span className="font-bold text-[18px] text-center uppercase whitespace-nowrap opacity-80">Chủ đề</span>
                                    <span className="font-bold text-[19px] text-center uppercase whitespace-nowrap">Nổi bật</span>
                                    <div className="absolute top-0 -right-6 h-full w-12 bg-gradient-to-br from-orange-400 to-orange-600 skew-x-[-12deg] z-0"></div>
                                </div>
                                {/* Label */}
                                {/* Content */}
                                <div className="flex-1 pl-16 pr-10 overflow-hidden relative h-full">
                                    {hotItems.map((item, idx) => (
                                        <div
                                            key={`${item.id}-${idx}`}
                                            className={`absolute inset-0 z-10 flex items-center pl-16 pr-10 transition-all duration-700 ease-in-out ${idx === tickerIndex
                                                ? 'opacity-100 translate-y-0 scale-100'
                                                : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
                                                }`}
                                        >
                                            <div className="flex items-center gap-10 w-full">
                                                {/* Icon or Thumbnail */}
                                                {item.typeLabel !== 'Dự thảo' && (
                                                    <div className="shrink-0">
                                                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all">
                                                            <img
                                                                src={item.thumb}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-3 min-w-0">
                                                    <div className="flex items-center gap-4">
                                                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold uppercase shrink-0">
                                                            {item.typeLabel}
                                                        </span>
                                                        <span className="text-[13px] text-gray-400 font-medium truncate">{item.agency}</span>
                                                    </div>
                                                    <Link
                                                        to={item.typeLabel === 'Dự thảo' ? `/du-thao/${item.id}` : `/hien-ke/${item.id}`}
                                                        className="group/link"
                                                    >
                                                        <h3 className="text-[16px] md:text-[20px] font-bold text-gray-900 group-hover/link:text-orange-600 transition-colors leading-tight line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    <div className="flex items-center gap-5 text-[14px] text-gray-500 font-medium">
                                                        <div className="flex items-center gap-4 bg-gray-50 px-3.5 py-1.5 rounded-lg border border-gray-100">
                                                            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                                                                <Calendar size={14} className="text-orange-500" />
                                                                <span>Ngày đăng: <span className="text-gray-700">{item.startDate || '01/01/2026'}</span></span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock size={14} className="text-orange-500" />
                                                                <span>Hạn góp ý: <span className="text-orange-600">{item.deadline}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Ticker Controls */}
                                <div className="flex flex-col items-center gap-2 pr-8 shrink-0 relative z-20">
                                    {hotItems.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setTickerIndex(idx)}
                                            className={`transition-all duration-300 ${idx === tickerIndex
                                                ? 'w-3 h-3 bg-orange-500 ring-4 ring-orange-100 rounded-full'
                                                : 'w-2 h-2 bg-gray-200 hover:bg-orange-300 rounded-full'
                                                }`}
                                            title={`Xem mục ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}



                    <div className={`grid gap-8 items-start transition-all duration-500 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                        {/* Left Column: Drafts */}
                        {(viewMode === 'both' || viewMode === 'drafts') && (
                            <div className="flex flex-col space-y-6 animate-fadeIn">
                                <div className="relative overflow-hidden rounded-2xl shadow-lg group shrink-0 transition-all duration-300">
                                    {/* Artistic Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a3b8b] to-[#2a52be] z-0"></div>
                                    <div
                                        className="absolute inset-0 opacity-10 mix-blend-overlay z-10 bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage: "url('/images/dong_son_cover.png')",
                                            backgroundSize: '150%',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>
                                    <div className="relative z-20 px-8 py-8 md:py-10 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <h2 className="text-[18px] md:text-[22px] font-bold text-white leading-tight">Góp ý dự thảo</h2>
                                                <p className="text-blue-100/70 text-[12px] mt-1">Tham gia xây dựng chính sách pháp luật</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <Link to="/du-thao" className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl text-[11px] transition-all">
                                                Tất cả <ArrowRight size={14} />
                                            </Link>
                                            <button
                                                onClick={() => setViewMode(viewMode === 'both' ? 'drafts' : 'both')}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/20 backdrop-blur-md group"
                                            >
                                                {viewMode === 'both' ? (
                                                    <>
                                                        <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-[11px] font-bold">Toàn màn hình</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Minimize2 size={16} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-[11px] font-bold">Thu nhỏ</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={`grid gap-4 ${viewMode === 'drafts' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    {displayedDrafts.map((draft, idx) => {
                                        const isFirstExpanded = viewMode === 'drafts' && idx === 0;
                                        return (
                                            <div key={draft.id} className={`relative rounded-xl transition-all ${draft.isHot ? 'ring-2 ring-orange-400 ring-offset-2 shadow-md' : ''} ${isFirstExpanded ? 'md:col-span-2 bg-orange-50/30 ring-4 ring-orange-100 border-orange-200 shadow-xl' : ''}`} style={{ height: isFirstExpanded ? '240px' : '180px' }}>
                                                <ConsultCard
                                                    item={draft}
                                                    to={`/du-thao/${draft.id}`}
                                                    tag={draft.type}
                                                    accentColor="#ea580c"
                                                    hideThumb={true}
                                                    hideStatus={true}
                                                    showDateBox={true}
                                                    isHot={draft.isHot}
                                                    isFeatured={isFirstExpanded}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Numeric Pagination for Drafts */}
                                {totalDraftPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 pt-4">
                                        <button
                                            onClick={() => setDraftPage(p => Math.max(1, p - 1))}
                                            disabled={draftPage === 1}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1a3b8b] hover:border-[#1a3b8b] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        {[...Array(totalDraftPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setDraftPage(i + 1)}
                                                className={`w-8 h-8 rounded-lg font-bold text-[13px] transition-all ${draftPage === i + 1
                                                    ? 'bg-[#1a3b8b] text-white shadow-md'
                                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a3b8b] hover:text-[#1a3b8b]'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setDraftPage(p => Math.min(totalDraftPages, p + 1))}
                                            disabled={draftPage === totalDraftPages}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1a3b8b] hover:border-[#1a3b8b] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Right Column: Highlights */}
                        {(viewMode === 'both' || viewMode === 'highlights') && (
                            <div className="flex flex-col space-y-6 animate-fadeIn">
                                <div className="relative overflow-hidden rounded-2xl shadow-lg group shrink-0 transition-all duration-300">
                                    {/* Artistic Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a3b8b] to-[#2a52be] z-0"></div>
                                    <div
                                        className="absolute inset-0 opacity-10 mix-blend-overlay z-10 bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage: "url('/images/dong_son_cover.png')",
                                            backgroundSize: '150%',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>

                                    <div className="relative z-20 px-8 py-8 md:py-10 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <h2 className="text-[18px] md:text-[22px] font-bold text-white leading-tight">Chủ đề nổi bật</h2>
                                                <p className="text-blue-100/70 text-[12px] mt-1">Các hiến kế đang thu hút thảo luận</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="relative w-32 sm:w-40">
                                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 z-30" />
                                                <input
                                                    type="text"
                                                    placeholder="Tìm kiếm..."
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white focus:ring-0 transition-all text-[11px] text-white placeholder-white/50 backdrop-blur-md relative z-20"
                                                />
                                            </div>
                                            <button
                                                onClick={() => setViewMode(viewMode === 'both' ? 'highlights' : 'both')}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/20 backdrop-blur-md group"
                                            >
                                                {viewMode === 'both' ? (
                                                    <>
                                                        <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-[11px] font-bold text-nowrap">Toàn màn hình</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Minimize2 size={16} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-[11px] font-bold text-nowrap">Thu nhỏ</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {displayedHighlights.length > 0 ? (
                                    <div className={`grid gap-4 ${viewMode === 'highlights' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                        {displayedHighlights.map((item, idx) => {
                                            const isFirstExpanded = viewMode === 'highlights' && idx === 0;
                                            return (
                                                <div key={item.id} className={`relative rounded-xl transition-all ${item.isHot ? 'ring-2 ring-orange-400 ring-offset-2 shadow-md' : ''} ${isFirstExpanded ? 'md:col-span-2 bg-blue-50/30 ring-4 ring-blue-100 border-blue-200 shadow-xl' : ''}`} style={{ height: isFirstExpanded ? '240px' : '180px' }}>
                                                    <ConsultCard
                                                        item={{ ...item, startDate: item.startDate || item.date || '20/03/2026' }}
                                                        to={`/hien-ke/${item.id}`}
                                                        accentColor="#1e3a8a"
                                                        showDateBox={true}
                                                        isHot={item.isHot}
                                                        isFeatured={isFirstExpanded}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                                        <p className="text-gray-500 text-sm italic">Không tìm thấy kết quả.</p>
                                    </div>
                                )}

                                {/* Numeric Pagination for Highlights */}
                                {totalHighlightPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 pt-4">
                                        <button
                                            onClick={() => setHighlightPage(p => Math.max(1, p - 1))}
                                            disabled={highlightPage === 1}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1a3b8b] hover:border-[#1a3b8b] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        {[...Array(totalHighlightPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setHighlightPage(i + 1)}
                                                className={`w-8 h-8 rounded-lg font-bold text-[13px] transition-all ${highlightPage === i + 1
                                                    ? 'bg-[#1a3b8b] text-white shadow-md'
                                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a3b8b] hover:text-[#1a3b8b]'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setHighlightPage(p => Math.min(totalHighlightPages, p + 1))}
                                            disabled={highlightPage === totalHighlightPages}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1a3b8b] hover:border-[#1a3b8b] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HienKeNoiBatPage;

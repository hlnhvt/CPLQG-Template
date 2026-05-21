import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Search, ChevronLeft, FileText, ArrowRight, Download, Flame, Info, ChevronUp, ChevronDown, BookOpen, Zap, Users, Maximize2, Minimize2, Calendar, Clock, Sparkles, LayoutGrid, List } from 'lucide-react';
import { Section, ConsultCard, HOT_ITEMS, NEW_HIGHLIGHTS, thumb } from './HienKeShared';

// Mock Drafts
const MOCK_DRAFTS = [
    { id: 1, title: "Dự thảo Luật quy định về kiểm soát rủi ro trong lĩnh vực Chính phủ", org: "Chính phủ", type: "Luật", ngayDang: "01/03/2026", hanGopY: "10/04/2026", isExpired: true, isHot: true, description: "Thiết lập cơ sở pháp lý vững chắc nhằm đánh giá, dự báo và phòng ngừa các rủi ro trong hoạt động điều hành của Chính phủ." },
    { id: 2, title: "Dự thảo Pháp lệnh quy định về kiểm soát rủi ro trong lĩnh vực Tài chính", org: "Bộ Tài chính", type: "Pháp lệnh", ngayDang: "02/03/2026", hanGopY: "11/04/2026", isExpired: false, isHot: true, description: "Quản lý chặt chẽ dòng vốn đầu tư công và nợ công, đảm bảo an toàn tài chính quốc gia trước các biến động kinh tế toàn cầu." },
    { id: 3, title: "Dự thảo Nghị định quy định về kiểm soát rủi ro trong lĩnh vực Tư pháp", org: "Bộ Tư pháp", type: "Nghị định", ngayDang: "03/03/2026", hanGopY: "12/04/2026", isExpired: false, isHot: true, description: "Tăng cường năng lực giải quyết tranh chấp pháp lý và kiểm soát chất lượng văn bản quy phạm pháp luật, giảm thiểu rủi ro pháp lý." },
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
    { id: 'h5', title: 'Hoàn thiện khung pháp lý về quản lý tài sản số', agency: 'Ngân hàng Nhà nước', status: 'open', deadline: '20/05/2026', participants: 1540, thumb: thumb(4), isHot: true, description: 'Bổ sung định nghĩa pháp lý liên quan đến tiền điện tử và dịch vụ giao dịch tài sản số hiện nay.' },
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

const HienKeNoiBatV2Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isIntroOpen, setIsIntroOpen] = useState(false);
    const [viewMode, setViewMode] = useState('both'); // 'both', 'drafts', 'highlights'
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    const baseDisplayedDrafts = MOCK_DRAFTS.slice((draftPage - 1) * ITEMS_PER_PAGE, draftPage * ITEMS_PER_PAGE);

    // Pagination Logic for Highlights
    const totalHighlightPages = Math.ceil(filteredHighlights.length / ITEMS_PER_PAGE);
    const baseDisplayedHighlights = filteredHighlights.slice((highlightPage - 1) * ITEMS_PER_PAGE, highlightPage * ITEMS_PER_PAGE);

    // Dynamic List Rotation states for "Xem tất cả" tab
    const [draftRotationIndex, setDraftRotationIndex] = useState(0);
    const [highlightRotationIndex, setHighlightRotationIndex] = useState(0);

    useEffect(() => {
        setDraftRotationIndex(0);
    }, [draftPage, viewMode]);

    useEffect(() => {
        setHighlightRotationIndex(0);
    }, [highlightPage, viewMode]);

    // Candidates marked as isHot
    const draftHotCandidates = useMemo(() => {
        return baseDisplayedDrafts.filter(d => d.isHot);
    }, [baseDisplayedDrafts]);

    const highlightHotCandidates = useMemo(() => {
        return baseDisplayedHighlights.filter(h => h.isHot);
    }, [baseDisplayedHighlights]);

    useEffect(() => {
        if (viewMode !== 'both') return;
        const timerDraft = setInterval(() => {
            setDraftRotationIndex(prev => draftHotCandidates.length ? (prev + 1) % draftHotCandidates.length : 0);
        }, 10000);
        const timerHighlight = setInterval(() => {
            setHighlightRotationIndex(prev => highlightHotCandidates.length ? (prev + 1) % highlightHotCandidates.length : 0);
        }, 10000);
        return () => {
            clearInterval(timerDraft);
            clearInterval(timerHighlight);
        };
    }, [viewMode, draftHotCandidates.length, highlightHotCandidates.length]);

    // Helper to place active hot candidate at index 0, followed by all remaining items in original order
    const getDisplayedArrayWithSelectedHot = (baseArr, hotCandidates, activeHotIndex) => {
        if (!baseArr || baseArr.length === 0) return baseArr;
        if (viewMode !== 'both' || !hotCandidates || hotCandidates.length === 0) return baseArr;

        const selectedHot = hotCandidates[activeHotIndex] || hotCandidates[0] || baseArr[0];
        const remaining = baseArr.filter(item => item.id !== selectedHot.id);
        return [selectedHot, ...remaining];
    };

    const displayedDrafts = getDisplayedArrayWithSelectedHot(baseDisplayedDrafts, draftHotCandidates, draftRotationIndex);
    const displayedHighlights = getDisplayedArrayWithSelectedHot(baseDisplayedHighlights, highlightHotCandidates, highlightRotationIndex);

    // Reset pagination when searching
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setHighlightPage(1);
    };

    return (
        <div className="relative min-h-screen font-sans pb-20 bg-[#f8fafc]">
            {/* Dynamic Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-orange-100/30 rounded-full blur-[150px]" />
                <div className="absolute top-[40%] left-[25%] w-[30%] h-[30%] bg-purple-100/30 rounded-full blur-[150px]" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: `radial-gradient(#1e3a8a 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="relative z-10">
                {/* ----------------- INTRO BLOCK ----------------- */}
                <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                        style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
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
                            Các nội dung, chủ đề cơ quan quản lý nhà nước cần sự hiến kế, tham gia ý kiến của người dân, doanh nghiệp trong quá trình xây dựng, hoàn thiện chính sách, pháp luật và tổ chức thi hành pháp luật.
                        </p>

                        {/* Leadership Quote */}
                        <div className="mt-8 w-full">
                            <div className="relative group text-center">
                                <div className="relative z-10">
                                    <p className="text-white/95 text-[15px] md:text-[18px] italic font-medium mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                                        "Nhân dân là chủ thể, là trung tâm của công cuộc đổi mới, xây dựng, phát triển đất nước và bảo vệ Tổ quốc."
                                    </p>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-[2px] bg-amber-400/50 rounded-full mb-1" />
                                        <span className="text-amber-200 text-[13px] font-bold uppercase tracking-widest">Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng</span>
                                        {/* <p className="text-blue-200/70 text-[12px] italic">(Trích bài viết về định hướng kỷ nguyên mới, kỷ nguyên vươn mình của dân tộc Việt Nam, tháng 10 năm 2024)</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 
                        <button
                            type="button"
                            onClick={() => setIsIntroOpen(!isIntroOpen)}
                            className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[14px] font-medium transition-colors border border-white/20 backdrop-blur-sm"
                        >
                            <Info size={16} />
                            Giới thiệu
                            {isIntroOpen ? <ChevronUp size={16} className="ml-1 opacity-70" /> : <ChevronDown size={16} className="ml-1 opacity-70" />}
                        </button>
*/}
                    </div>
                </div>

                <div className="pt-8 container mx-auto px-4 md:px-8 max-w-[1280px] mb-4 pb-6 relative">
                    {/* Giới thiệu chi tiết */}
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
                                            "Nhân dân là chủ thể, là trung tâm của công cuộc đổi mới, xây dựng, phát triển đất nước và bảo vệ Tổ quốc."
                                        </p>
                                        <div className="w-12 h-0.5 bg-purple-300 mx-auto mb-4" />
                                        <footer className="text-purple-900 font-bold text-[14px] uppercase relative z-10">
                                            — Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV —
                                        </footer>
                                        {/* <p className="text-[12px] text-purple-600/70 mt-2 italic font-medium relative z-10">
                                            (Trích bài viết về định hướng kỷ nguyên mới, kỷ nguyên vươn mình của dân tộc Việt Nam, tháng 10 năm 2024)
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Inline Navigation for non-XL screens - Moved to Top */}
                    <div className="xl:hidden w-full mb-8 sticky top-4 z-50 px-2 sm:px-4">
                        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-1.5 border border-white shadow-2xl flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar">
                            {[
                                { id: 'both', label: 'Tất cả', icon: LayoutGrid, color: 'blue' },
                                { id: 'drafts', label: 'Dự thảo', icon: FileText, color: 'orange' },
                                { id: 'highlights', label: 'Nổi bật', icon: List, color: 'orange' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setViewMode(item.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[12px] transition-all whitespace-nowrap ${viewMode === item.id
                                        ? 'bg-[#1e3a8a] text-white shadow-lg'
                                        : 'text-gray-500 hover:bg-gray-100/50'}`}
                                >
                                    <item.icon size={15} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* V1 Highlight Ticker - Restored to V2 */}
                    {hotItems.length > 0 && (
                        <div className="mb-8 relative group">
                            <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-orange-100 overflow-hidden flex items-center h-[160px] relative transition-all hover:shadow-2xl hover:shadow-blue-900/10 hover:border-orange-200">
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
                                    <span className="font-bold text-[17px] text-center uppercase whitespace-nowrap opacity-80">Chủ đề</span>
                                    <span className="font-bold text-[18px] text-center uppercase whitespace-nowrap">Nổi bật</span>
                                    <div className="absolute top-0 -right-6 h-full w-12 bg-gradient-to-br from-orange-400 to-orange-600 skew-x-[-12deg] z-0"></div>
                                </div>
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
                                                    <div className="shrink-0 hidden md:block">
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


                    {/* MAIN CONTENT AREA */}
                    <div className="w-full">
                        <div className={`grid gap-8 items-start transition-all duration-500 ${viewMode === 'both' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>

                            {/* SECTION 1: DỰ THẢO CẤP THIẾT */}
                            {(viewMode === 'both' || viewMode === 'drafts') && (
                                <div className="flex flex-col space-y-6 animate-fadeIn">
                                    {/* V1 Style Header */}
                                    <div className="relative overflow-hidden rounded-[1.5rem] shadow-lg group shrink-0 transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3b8b] to-[#2a52be] z-0"></div>
                                        <div className="absolute inset-0 opacity-10 mix-blend-overlay z-10 bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/dong_son_cover.png')", backgroundSize: '150%', backgroundPosition: 'center' }}></div>
                                        <div className="relative z-20 px-8 py-10 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col">
                                                    <h2 className="text-[20px] md:text-[24px] font-bold text-white leading-tight">Góp ý dự thảo</h2>
                                                    <p className="text-blue-100/70 text-[13px] mt-1 font-medium">Tham gia xây dựng chính sách pháp luật</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <Link to="/du-thao" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl text-[12px] transition-all">
                                                    Tất cả <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bento Grid For Drafts */}
                                    <div className={`grid gap-5 ${viewMode === 'both' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
                                        {/* Hero Item Draft */}
                                        {displayedDrafts[0] && (
                                            <div
                                                key={displayedDrafts[0].id}
                                                className={`${viewMode === 'both' ? '' : 'md:col-span-8'} flex flex-col relative rounded-[1.5rem] transition-all duration-700 hover:-translate-y-1 overflow-hidden group h-[320px] md:h-[520px] bg-white border border-orange-100 hover:shadow-2xl animate-fadeIn`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-orange-100/30 z-0"></div>
                                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl z-0 transition-transform duration-700 group-hover:scale-150"></div>

                                                <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                                            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[11px] font-bold uppercase rounded-lg shadow-sm">Nổi bật</span>
                                                            {displayedDrafts[0].isHot && <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100"><span className="text-[11px] font-bold">Nghị định</span></div>}
                                                        </div>
                                                        <h3 className="text-[20px] md:text-[26px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors">
                                                            <Link to={`/du-thao/${displayedDrafts[0].id}`}>{displayedDrafts[0].title}</Link>
                                                        </h3>
                                                        <p className="text-[13px] md:text-[15px] text-gray-600 leading-relaxed line-clamp-3">
                                                            {displayedDrafts[0].description}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-orange-100 mt-auto">
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex flex-col">
                                                                <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Cơ quan chủ trì</span>
                                                                <span className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{displayedDrafts[0].agency}</span>
                                                            </div>
                                                            <div className="flex items-center gap-6">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Ngày đăng</span>
                                                                    <span className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5"><Calendar size={14} className="text-orange-500" /> {displayedDrafts[0].startDate}</span>
                                                                </div>
                                                                <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Hạn góp ý</span>
                                                                    <span className="text-[13px] font-bold text-red-600 flex items-center gap-1.5"><Clock size={14} /> {displayedDrafts[0].deadline}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link to={`/du-thao/${displayedDrafts[0].id}`} className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-800 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all text-center shrink-0">
                                                            Góp ý
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Sub Items Stack (Side by side with Hero in single view) */}
                                        <div className={`${viewMode === 'both' ? 'flex flex-col gap-5' : 'md:col-span-4 flex flex-col gap-5'}`}>
                                            {displayedDrafts.slice(1, 3).map((draft) => (
                                                <div
                                                    key={draft.id}
                                                    className="relative rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col h-[250px] bg-white border border-gray-100 hover:shadow-xl animate-fadeIn"
                                                >
                                                    <ConsultCard item={draft} to={`/du-thao/${draft.id}`} tag={draft.type} accentColor="#ea580c" hideThumb={true} hideStatus={true} showDateBox={true} isHot={draft.isHot} />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom Row (Full width grid in single view) */}
                                        {displayedDrafts.slice(3).map((draft) => (
                                            <div
                                                key={draft.id}
                                                className={`${viewMode === 'both' ? 'w-full' : 'md:col-span-6'} relative rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col h-[250px] bg-white border border-gray-100 hover:shadow-xl animate-fadeIn`}
                                            >
                                                <ConsultCard item={draft} to={`/du-thao/${draft.id}`} tag={draft.type} accentColor="#ea580c" hideThumb={true} hideStatus={true} showDateBox={true} isHot={draft.isHot} />
                                            </div>
                                        ))}
                                    </div>

                                    {totalDraftPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 pt-4">
                                            <button onClick={() => setDraftPage(p => Math.max(1, p - 1))} disabled={draftPage === 1} className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-all disabled:opacity-40 shadow-sm"><ChevronLeft size={16} /></button>
                                            {[...Array(totalDraftPages)].map((_, i) => (
                                                <button key={i + 1} onClick={() => setDraftPage(i + 1)} className={`w-9 h-9 rounded-xl font-bold text-[13px] transition-all ${draftPage === i + 1 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500 shadow-sm'}`}>{i + 1}</button>
                                            ))}
                                            <button onClick={() => setDraftPage(p => Math.min(totalDraftPages, p + 1))} disabled={draftPage === totalDraftPages} className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-all disabled:opacity-40 shadow-sm"><ChevronRight size={16} /></button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* SECTION 2: CHỦ ĐỀ NỔI BẬT */}
                            {(viewMode === 'both' || viewMode === 'highlights') && (
                                <div className="flex flex-col space-y-6 animate-fadeIn">
                                    {/* V1 Style Header */}
                                    <div className="relative overflow-hidden rounded-[1.5rem] shadow-lg group shrink-0 transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3b8b] to-[#2a52be] z-0"></div>
                                        <div className="absolute inset-0 opacity-10 mix-blend-overlay z-10 bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/dong_son_cover.png')", backgroundSize: '150%', backgroundPosition: 'center' }}></div>
                                        <div className="relative z-20 px-8 py-10 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col">
                                                    <h2 className="text-[20px] md:text-[24px] font-bold text-white leading-tight">Chủ đề nổi bật</h2>
                                                    <p className="text-blue-100/70 text-[13px] mt-1 font-medium">Các hiến kế đang thu hút quan tâm</p>
                                                </div>
                                            </div>

                                            <div className="relative w-40 sm:w-56 shrink-0">
                                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 z-20 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    placeholder="Tìm kiếm..."
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white focus:ring-0 transition-all text-[12px] text-white placeholder-white/50 backdrop-blur-md"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {displayedHighlights.length > 0 ? (
                                        <div className={`grid gap-5 ${viewMode === 'both' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
                                            {/* Hero Item Highlight */}
                                            {displayedHighlights[0] && (
                                                <div
                                                    key={displayedHighlights[0].id}
                                                    className={`${viewMode === 'both' ? '' : 'md:col-span-8'} flex flex-col relative rounded-[1.5rem] transition-all duration-700 hover:-translate-y-1 overflow-hidden group h-[320px] md:h-[520px] bg-white border border-orange-100 hover:shadow-2xl animate-fadeIn`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-orange-100/30 z-0"></div>
                                                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl z-0 transition-transform duration-700 group-hover:scale-150"></div>

                                                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[11px] font-bold uppercase rounded-lg shadow-sm">Nổi bật</span>
                                                            </div>
                                                            <div className="w-full h-32 md:h-48 rounded-xl overflow-hidden mb-4 border-[3px] border-white shadow-md">
                                                                <img src={displayedHighlights[0].thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                            </div>
                                                            <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                                                                <Link to={`/hien-ke/${displayedHighlights[0].id}`}>{displayedHighlights[0].title}</Link>
                                                            </h3>
                                                            <p className="text-[13px] md:text-[15px] text-gray-600 leading-relaxed line-clamp-2">
                                                                {displayedHighlights[0].description}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-orange-100 mt-auto">
                                                            <div className="flex flex-col gap-3">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Cơ quan chủ trì</span>
                                                                    <span className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>{displayedHighlights[0].agency}</span>
                                                                </div>
                                                                <div className="flex items-center gap-6">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Ngày đăng</span>
                                                                        <span className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5"><Calendar size={14} className="text-orange-500" /> {displayedHighlights[0].startDate || '20/03/2026'}</span>
                                                                    </div>
                                                                    <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Hạn góp ý</span>
                                                                        <span className="text-[13px] font-bold text-red-600 flex items-center gap-1.5"><Clock size={14} /> {displayedHighlights[0].deadline}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Link to={`/hien-ke/${displayedHighlights[0].id}`} className="px-5 py-2.5 bg-white border border-gray-200 hover:border-orange-300 hover:text-orange-600 text-gray-700 rounded-xl font-bold text-[13px] shadow-sm transition-all text-center shrink-0">
                                                                Chi tiết
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Sub Items Stack (Side by side with Hero in single view) */}
                                            <div className={`${viewMode === 'both' ? 'flex flex-col gap-5' : 'md:col-span-4 flex flex-col gap-5'}`}>
                                                {displayedHighlights.slice(1, 3).map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="relative rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col h-[250px] bg-white border border-gray-100 hover:shadow-xl animate-fadeIn"
                                                    >
                                                        <ConsultCard item={{ ...item, startDate: item.startDate || item.date || '20/03/2026' }} to={`/hien-ke/${item.id}`} accentColor="#ea580c" showDateBox={viewMode !== 'both'} isHot={item.isHot} />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bottom Row (Full width grid in single view) */}
                                            {displayedHighlights.slice(3).map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`${viewMode === 'both' ? 'w-full' : 'md:col-span-6'} relative rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col h-[250px] bg-white border border-gray-100 hover:shadow-xl animate-fadeIn`}
                                                >
                                                    <ConsultCard item={{ ...item, startDate: item.startDate || item.date || '20/03/2026' }} to={`/hien-ke/${item.id}`} accentColor="#ea580c" showDateBox={true} isHot={item.isHot} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-[1.5rem] border border-gray-100 shadow-sm p-16 h-[320px]">
                                            <Search size={48} className="text-gray-300 mb-4" />
                                            <p className="text-gray-500 text-lg font-medium">Không tìm thấy kết quả phù hợp.</p>
                                        </div>
                                    )}

                                    {totalHighlightPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 pt-4">
                                            <button onClick={() => setHighlightPage(p => Math.max(1, p - 1))} disabled={highlightPage === 1} className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-all disabled:opacity-40 shadow-sm"><ChevronLeft size={16} /></button>
                                            {[...Array(totalHighlightPages)].map((_, i) => (
                                                <button key={i + 1} onClick={() => setHighlightPage(i + 1)} className={`w-9 h-9 rounded-xl font-bold text-[13px] transition-all ${highlightPage === i + 1 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500 shadow-sm'}`}>{i + 1}</button>
                                            ))}
                                            <button onClick={() => setHighlightPage(p => Math.min(totalHighlightPages, p + 1))} disabled={highlightPage === totalHighlightPages} className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-all disabled:opacity-40 shadow-sm"><ChevronRight size={16} /></button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div> {/* End of grid gap-8 */}

                        {/* XL Sidebar Navigation */}
                        <div className="hidden xl:block absolute right-full top-0 bottom-0 mr-12 w-[80px]">
                            <aside className={`sticky transition-all duration-500 z-30 ${isScrolled ? 'top-[100px]' : 'top-[235px]'}`}>
                                <div className={`bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/60 p-3 flex flex-col items-center space-y-6 py-8 transition-all duration-500 ${isScrolled ? 'shadow-blue-900/10' : 'shadow-blue-900/5'}`}>
                                    {[
                                        { id: 'both', label: 'Xem tất cả', icon: LayoutGrid, color: 'blue' },
                                        { id: 'drafts', label: 'Góp ý dự thảo', icon: FileText, color: 'orange' },
                                        { id: 'highlights', label: 'Chủ đề nổi bật', icon: List, color: 'orange' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setViewMode(item.id)}
                                            className="group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300"
                                        >
                                            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${viewMode === item.id
                                                ? `bg-${item.color}-500 shadow-lg shadow-${item.color}-500/30 scale-100`
                                                : 'bg-transparent group-hover:bg-gray-100 scale-75 group-hover:scale-100'}`} />

                                            <item.icon
                                                size={22}
                                                className={`relative z-10 transition-colors duration-300 ${viewMode === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}
                                            />

                                            {/* Tooltip */}
                                            <div className="absolute left-[calc(100%+15px)] px-3 py-2 bg-gray-900 text-white text-[12px] font-bold rounded-xl opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl">
                                                {item.label}
                                                {/* Tooltip Arrow */}
                                                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div> {/* End of main content area */}

                </div>
            </div>
        </div>
    );
};

export default HienKeNoiBatV2Page;

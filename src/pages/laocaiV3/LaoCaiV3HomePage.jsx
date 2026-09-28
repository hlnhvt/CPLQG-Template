import React, { useState, useEffect } from 'react';
import {
    Clock,
    PlayCircle,
    ChevronRight,
    ArrowRight,
    Scale,
    FileText,
    BookOpen,
    Building2,
    ExternalLink,
    MapPin,
    Download,
    CheckCircle2,
    Sparkles,
    Shield,
    Users,
    Smartphone,
    Share2,
    Eye,
    Bell,
    Video,
    PhoneCall,
    Award,
    Landmark,
    ShieldCheck,
    Gavel,
    Briefcase,
    Flag,
    MonitorSmartphone,
    Search,
    ChevronDown,
    Calendar,
    Send,
    HelpCircle,
    Info,
    MessageSquare,
    AlertCircle,
    TrendingUp,
    FileCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LaoCaiV3Header from '../../components/laocaiV3/LaoCaiV3Header';
import LaoCaiV3Footer from '../../components/laocaiV3/LaoCaiV3Footer';
import LaoCaiV2NewlyIssuedDocs from '../../components/laocaiV2/LaoCaiV2NewlyIssuedDocs';
import FixedBottomCarousel, { LAOCAI_V2_CAROUSEL_ITEMS } from '../../components/FixedBottomCarousel';
import {
    laocaiV2SiteConfig,
    luatThuDo2024Data,
    laocaiV2NewsHighlightsData,
    laocaiV2PoliciesAndLifeData,
    laocaiV2MultimediaData,
    laocaiV2NewsArticles,
    laocaiV2ConnectedPortals
} from '../../data/laocaiV2MockData';

// Tin tiêu điểm chính
const HERO_FEATURED_STORY = {
    id: 1,
    badge: "TIN TIÊU ĐIỂM",
    subBadge: "QĐ 61/2024/QĐ-UBND",
    title: "UBND TỈNH LÀO CAI: QUY ĐỊNH CHI TIẾT VỀ BỒI THƯỜNG, HỖ TRỢ, TÁI ĐỊNH CƯ KHI NHÀ NƯỚC THU HỒI ĐẤT",
    summary: "Sáng ngày 07/10/2024, UBND tỉnh Lào Cai chính thức áp dụng Quyết định số 61/2024/QĐ-UBND quy định chi tiết về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất. Quy định kịp thời tháo gỡ khó khăn, vướng mắc cho các dự án trọng điểm, đồng thời bảo đảm quyền lợi hợp pháp, chính đáng và nơi ở mới tốt hơn nơi ở cũ cho người dân trên địa bàn tỉnh.",
    image: "/thumb1.png",
    date: "07/10/2024",
    agency: "ỦY BAN NHÂN DÂN TỈNH LÀO CAI",
    link: "/lao-cai-v2/van-ban"
};

// 3 tin thời sự nổi bật xếp ngang dưới tin tiêu điểm
const SUB_FEATURED_STORIES = [
    {
        id: 2,
        badge: "CHÍNH QUYỀN HAI CẤP",
        title: "Lào Cai hoàn thiện hệ thống văn bản bảo đảm chính quyền địa phương hai cấp vận hành thông suốt tại 99 xã, phường",
        summary: "Sở Tư pháp tham mưu HĐND, UBND tỉnh ban hành đầy đủ văn bản về phân cấp, ủy quyền sau sắp xếp đơn vị hành chính.",
        image: "/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg",
        date: "22/03/2026",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: 3,
        badge: "KINH TẾ CỬA KHẨU",
        title: "Chính sách khuyến khích đầu tư hạ tầng logistics và thương mại biên mậu tại Khu kinh tế cửa khẩu Lào Cai",
        summary: "HĐND tỉnh ban hành chính sách hỗ trợ tiền thuê đất, đầu tư kho bãi cho doanh nghiệp tại cửa khẩu giai đoạn 2026-2030.",
        image: "/thumb2.png",
        date: "15/02/2026",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: 4,
        badge: "DỊCH VỤ CÔNG",
        title: "UBND tỉnh ban hành Quy chế tiếp nhận, xử lý phản ánh, kiến nghị qua Cổng Dịch vụ công tỉnh Lào Cai",
        summary: "Quy định rõ trách nhiệm, thời hạn xử lý của các sở, ngành đối với phản ánh thủ tục hành chính tư pháp của người dân.",
        image: "/thumb3.png",
        date: "18/03/2026",
        link: "/lao-cai-v2/lien-he"
    }
];

// Danh sách Chỉ đạo điều hành chuẩn Cổng Chính phủ
const EXECUTIVE_DIRECTIVES = [
    {
        id: "CD-01",
        code: "QĐ 18/2026/QĐ-UBND",
        title: "Ban hành Kế hoạch hành động Chuyển đổi số toàn diện công tác Tư pháp tỉnh Lào Cai năm 2026",
        date: "22/03/2026",
        signer: "Chủ tịch UBND tỉnh",
        isHot: true,
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "CD-02",
        code: "CT 05/CT-UBND",
        title: "Tăng cường kỷ cương, kỷ luật hành chính và nâng cao chất lượng thẩm định văn bản QPPL",
        date: "20/03/2026",
        signer: "Chủ tịch UBND tỉnh",
        isHot: true,
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "CD-03",
        code: "CĐ 02/CĐ-UBND",
        title: "Đẩy nhanh tiến độ số hóa sổ hộ tịch và dữ liệu tư pháp tại các huyện vùng cao, biên giới",
        date: "18/03/2026",
        signer: "Phó Chủ tịch UBND tỉnh",
        isHot: false,
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "CD-04",
        code: "KL 42/KL-TU",
        title: "Kết luận của Thường trực Tỉnh ủy về tiếp tục đổi mới, nâng cao hiệu quả công tác PBGDPL",
        date: "15/03/2026",
        signer: "Thường trực Tỉnh ủy",
        isHot: false,
        link: "/lao-cai-v2/van-ban"
    }
];

// Danh sách Thông báo của tỉnh
const PROVINCIAL_ANNOUNCEMENTS = [
    {
        id: "TB-01",
        day: "22",
        month: "Th03",
        title: "Thông báo số 86/TB-UBND: Lịch tiếp công dân định kỳ tháng 04/2026 của Lãnh đạo UBND tỉnh Lào Cai",
        agency: "Văn phòng UBND tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban",
        isHot: true
    },
    {
        id: "TB-02",
        day: "20",
        month: "Th03",
        title: "Thông báo số 45/TB-STP: Kế hoạch tổ chức Hội nghị phổ biến các văn bản QPPL mới ban hành quý I/2026",
        agency: "Sở Tư pháp tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "TB-03",
        day: "18",
        month: "Th03",
        title: "Thông báo vận hành thử nghiệm phân hệ số hóa hồ sơ tư pháp điện tử trên Cổng Dịch vụ công tỉnh",
        agency: "Trung tâm Phục vụ hành chính công",
        link: "/lao-cai-v2/lien-he",
        isHot: true
    },
    {
        id: "TB-04",
        day: "15",
        month: "Th03",
        title: "Lấy ý kiến nhân dân đối với Dự thảo Nghị quyết hỗ trợ phát triển dược liệu dưới tán rừng",
        agency: "HĐND tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban"
    }
];

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-[16/9] w-full overflow-hidden bg-gray-100 ${className}`}>
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
        />
    </div>
);

const LaoCaiV3HomePage = () => {
    const navigate = useNavigate();
    const [rightBoxTab, setRightBoxTab] = useState('directives'); // 'directives' | 'announcements'
    const [mediaTab, setMediaTab] = useState('video'); // 'video' | 'photo' | 'infographic'
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbackForm, setFeedbackForm] = useState({
        fullname: '',
        email: '',
        topic: 'Góp ý chính sách văn bản QPPL',
        content: ''
    });
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    useEffect(() => {
        document.title = "Cổng Pháp luật tỉnh Lào Cai - Bản V3 (Bố cục Chinhphu.vn)";
        window.scrollTo(0, 0);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/lao-cai-v2/van-ban?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setFeedbackSubmitted(true);
        setTimeout(() => {
            setFeedbackSubmitted(false);
            setFeedbackForm({ fullname: '', email: '', topic: 'Góp ý chính sách văn bản QPPL', content: '' });
        }, 4000);
    };

    const mainVideo = laocaiV2MultimediaData?.videos?.[0] || {
        id: "LC-VID-01",
        title: "Hội nghị triển khai công tác tư pháp năm 2026 tỉnh Lào Cai",
        date: "21/03/2026",
        thumb: "/thumb1.png",
        duration: "18:42",
        desc: "Phóng sự ghi nhận chỉ đạo của Thường trực Tỉnh ủy, lãnh đạo UBND tỉnh Lào Cai."
    };
    const subVideos = laocaiV2MultimediaData?.videos?.slice(1) || [];
    const infographics = laocaiV2MultimediaData?.infographics || [];
    const currentMediaList = mediaTab === 'infographic' ? infographics : subVideos;
    const currentMainMedia = mediaTab === 'infographic' ? (infographics[0] || mainVideo) : mainVideo;

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans flex flex-col selection:bg-blue-600 selection:text-white">
            {/* Header đồng bộ màu sắc & phong cách chuẩn V2 */}
            <LaoCaiV3Header />

            {/* BANNER GIỚI THIỆU: MÀU GRADIENT INDIGO HOÀNG GIA (#4f56ca -> #2c1b92 -> #4f56ca) ĐỒNG BỘ V2 */}
            <div className="px-4 pt-4 sm:pt-5">
                <div className="w-full max-w-[1472px] mx-auto rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white py-5 sm:py-6 md:py-6.5 border border-indigo-400/30 shadow-lg shadow-indigo-900/20">
                    <style>{`
                        @keyframes laocaiV3RotateCW {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes laocaiV3PulseGlow {
                            0%, 100% { opacity: 0.15; transform: scale(0.95); }
                            50% { opacity: 0.38; transform: scale(1.12); }
                        }
                        .laocaiV3-card-interactive {
                            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        .laocaiV3-card-interactive:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
                        }
                    `}</style>

                    {/* Lưới điểm chấm công nghệ chìm */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                    {/* Quầng sáng dịu nhẹ */}
                    <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
                    {/* Vòng tròn quỹ đạo */}
                    <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                    <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />

                    <div className="container mx-auto px-4 max-w-[1504px] relative z-10 flex flex-col items-center text-center">
                        {/* Logo Quốc huy */}
                        <div className="mb-1.5 sm:mb-2">
                            <img
                                src="/logo.png"
                                alt="Quốc huy"
                                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-xl hover:scale-105 transition-transform"
                            />
                        </div>

                        {/* Tiêu đề chính */}
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold tracking-tight text-white uppercase leading-tight drop-shadow-md">
                            Cổng Pháp luật tỉnh Lào Cai
                        </h1>

                        {/* Vạch trang trí hoàng kim */}
                        <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5 sm:my-2 rounded-full" />
                        
                        <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-2xl text-center font-normal drop-shadow-sm">
                            Hệ thống thông tin chính thống về văn bản quy phạm pháp luật, chỉ đạo điều hành và phổ biến giáo dục pháp luật tỉnh Lào Cai
                        </p>
                    </div>
                </div>
            </div>

            <main className="flex-1 pb-16 space-y-6 sm:space-y-8 mt-5">
                {/* ============================================================== */}
                {/* 1. KHỐI BỐ CỤC THỜI SỰ & CHỈ ĐẠO ĐIỀU HÀNH CHUẨN CHINHPHU.VN  */}
                {/* (Bố cục 2 khu vực: 68% Cột Thời sự tiêu điểm + 32% Chỉ đạo điều hành & Thông báo) */}
                {/* ============================================================== */}
                <section id="thoi-su-chinh-phu" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
                        {/* -------------------------------------------------------- */}
                        {/* CỘT TRÁI (Lg: 8 cols - 67%): KHU VỰC TIN THỜI SỰ TIÊU ĐIỂM */}
                        {/* -------------------------------------------------------- */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            {/* TIN TIÊU ĐIỂM SỐ 1 (HERO LEAD STORY) - THIẾT KẾ V2 SANG TRỌNG */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm relative overflow-hidden group">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
                                    {/* Ảnh thumbnail lớn */}
                                    <div className="md:col-span-6 relative overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200">
                                        <div className="aspect-[16/10] w-full h-full relative overflow-hidden">
                                            <img
                                                src={HERO_FEATURED_STORY.image}
                                                alt={HERO_FEATURED_STORY.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                        <span className="absolute top-3 left-3 bg-[#991b1b] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                                            {HERO_FEATURED_STORY.badge}
                                        </span>
                                    </div>

                                    {/* Nội dung tin tiêu điểm */}
                                    <div className="md:col-span-6 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-amber-950 font-semibold mb-2">
                                                <Clock size={14} className="text-[#991b1b]" />
                                                <span>{HERO_FEATURED_STORY.date}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-gray-600 truncate font-normal">{HERO_FEATURED_STORY.agency}</span>
                                            </div>

                                            <Link to={HERO_FEATURED_STORY.link} className="block group/title">
                                                <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-gray-900 group-hover/title:text-[#991b1b] transition-colors leading-[1.35] uppercase tracking-tight mb-2.5">
                                                    {HERO_FEATURED_STORY.title}
                                                </h2>
                                            </Link>

                                            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed line-clamp-4 font-normal">
                                                {HERO_FEATURED_STORY.summary}
                                            </p>
                                        </div>

                                        <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                                                <FileText size={13} />
                                                {HERO_FEATURED_STORY.subBadge}
                                            </span>
                                            <Link
                                                to={HERO_FEATURED_STORY.link}
                                                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0f4c81] hover:text-blue-700 transition"
                                            >
                                                <span>Xem chi tiết</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DẢI 3 TIN THỜI SỰ QUAN TRỌNG XẾP NGANG DƯỚI TIN TIÊU ĐIỂM */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                                {SUB_FEATURED_STORIES.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group laocaiV3-card-interactive relative overflow-hidden"
                                    >
                                        {/* Viền đỉnh màu vàng gold hổ phách */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                        <div>
                                            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-200">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="flex items-center gap-1.5 text-[11px] text-amber-950 font-semibold mb-1.5">
                                                <Clock size={12} className="text-[#991b1b]" />
                                                <span>{item.date}</span>
                                            </div>

                                            <h3 className="font-bold text-[13.5px] sm:text-[14px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2 mb-1.5">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed font-normal">
                                                {item.summary}
                                            </p>
                                        </div>

                                        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#0f4c81] font-semibold">
                                            <span>Xem tin</span>
                                            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* -------------------------------------------------------- */}
                        {/* CỘT PHẢI (Lg: 4 cols - 33%): CHỈ ĐẠO ĐIỀU HÀNH & THÔNG BÁO CHÍNH QUYỀN */}
                        {/* -------------------------------------------------------- */}
                        <div className="lg:col-span-4 flex flex-col gap-5">
                            {/* HỘP CHỈ ĐẠO ĐIỀU HÀNH & THÔNG BÁO (TABBED CHINHPHU BOX) */}
                            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm relative overflow-hidden flex flex-col">
                                {/* Dải viền đỉnh vàng gold sang trọng */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                {/* Tab Header chuyển đổi Chỉ đạo điều hành / Thông báo */}
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2.5 mb-3 shrink-0">
                                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                                        <button
                                            onClick={() => setRightBoxTab('directives')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                rightBoxTab === 'directives'
                                                    ? 'bg-[#0f4c81] text-white shadow-xs'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            Chỉ đạo điều hành
                                        </button>
                                        <button
                                            onClick={() => setRightBoxTab('announcements')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                rightBoxTab === 'announcements'
                                                    ? 'bg-[#0f4c81] text-white shadow-xs'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            Thông báo ({PROVINCIAL_ANNOUNCEMENTS.length})
                                        </button>
                                    </div>

                                    <Link
                                        to={rightBoxTab === 'directives' ? '/lao-cai-v2/chi-dao-dieu-hanh' : '/lao-cai-v2/van-ban'}
                                        className="text-xs font-bold text-[#0f4c81] hover:text-[#4f56ca] transition flex items-center gap-0.5"
                                    >
                                        <span>Tất cả</span>
                                        <ChevronRight size={13} />
                                    </Link>
                                </div>

                                {/* Nội dung Tab 1: Danh sách Chỉ đạo điều hành */}
                                {rightBoxTab === 'directives' && (
                                    <div className="divide-y divide-gray-100 flex flex-col space-y-2">
                                        {EXECUTIVE_DIRECTIVES.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={item.link}
                                                className="pt-2 pb-2.5 hover:bg-blue-50/50 px-2 rounded-xl transition flex flex-col group"
                                            >
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className="font-bold text-[11px] text-[#0f4c81] bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded">
                                                        {item.code}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                                                        <Clock size={11} className="text-gray-400" />
                                                        <span>{item.date}</span>
                                                    </div>
                                                </div>

                                                <h4 className="font-bold text-[12.5px] sm:text-[13px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2">
                                                    {item.title}
                                                </h4>

                                                <div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
                                                    <span>{item.signer}</span>
                                                    {item.isHot && (
                                                        <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                                            Mới
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Nội dung Tab 2: Danh sách Thông báo */}
                                {rightBoxTab === 'announcements' && (
                                    <div className="divide-y divide-gray-100 flex flex-col space-y-2">
                                        {PROVINCIAL_ANNOUNCEMENTS.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={item.link}
                                                className="pt-2 pb-2.5 hover:bg-amber-50/60 px-2 rounded-xl transition flex items-start gap-2.5 group"
                                            >
                                                {/* Block Ngày Tháng */}
                                                <div className="w-9 h-10 rounded-lg bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-[13px] font-bold text-[#991b1b] leading-none">
                                                        {item.day}
                                                    </span>
                                                    <span className="text-[9px] font-semibold text-gray-500 uppercase mt-0.5">
                                                        {item.month}
                                                    </span>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-[12.5px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500">
                                                        <span className="truncate">{item.agency}</span>
                                                        {item.isHot && (
                                                            <span className="bg-red-500 text-white text-[8.5px] font-bold px-1 py-0.2 rounded uppercase">
                                                                Mới
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* HỘP TRỢ LÝ ẢO & TRA CỨU PHÁP LUẬT NHANH (AI LEGAL SEARCH WIDGET) */}
                            <div className="bg-gradient-to-br from-[#0f4c81] via-[#1c2c5b] to-[#0f4c81] text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden border border-blue-400/30">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                                            <Sparkles size={16} />
                                        </div>
                                        <h3 className="font-bold text-sm sm:text-base uppercase tracking-tight text-white">
                                            Tra cứu Văn bản & Hỏi đáp
                                        </h3>
                                    </div>

                                    <p className="text-xs text-blue-100/90 mb-3 leading-relaxed">
                                        Nhập số hiệu, trích yếu hoặc câu hỏi pháp lý để tìm kiếm văn bản và hướng dẫn nhanh:
                                    </p>

                                    <form onSubmit={handleSearchSubmit} className="relative mb-3">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Ví dụ: bồi thường đất đai, thủ tục hộ tịch..."
                                            className="w-full bg-white/95 text-gray-900 placeholder-gray-500 text-xs sm:text-sm pl-3 pr-9 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#0f4c81] text-white hover:bg-amber-500 transition rounded-lg"
                                        >
                                            <Search size={14} />
                                        </button>
                                    </form>

                                    {/* Từ khóa gợi ý */}
                                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                                        <span className="text-blue-200">Từ khóa hot:</span>
                                        {['Đất đai 2024', 'Trợ giúp pháp lý', 'Logistics cửa khẩu', 'Hòa giải cơ sở'].map((tag, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    setSearchQuery(tag);
                                                    navigate(`/lao-cai-v2/van-ban?q=${encodeURIComponent(tag)}`);
                                                }}
                                                className="bg-white/10 hover:bg-white/25 px-2 py-0.5 rounded-md text-white transition text-[11px]"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 2. KHỐI VĂN BẢN QUY PHẠM PHÁP LUẬT & DỰ THẢO (TABBED CHUẨN CỔNG CHÍNH PHỦ) */}
                {/* ============================================================== */}
                <LaoCaiV2NewlyIssuedDocs />

                {/* ============================================================== */}
                {/* 3. KHỐI CHÍNH SÁCH & CUỘC SỐNG LÀO CAI (LAYOUT 2 CỘT CỦA CHÍNH PHỦ) */}
                {/* ============================================================== */}
                <section id="chinh-sach-cuoc-song" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                        {/* Header khối */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 mb-5 pb-3 border-b border-gray-200">
                            <div>
                                <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                                    Chính sách & Cuộc sống Lào Cai
                                </h2>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    Đưa cơ chế, chính sách và pháp luật đi vào đời sống thực tiễn của nhân dân và doanh nghiệp
                                </p>
                            </div>
                            <Link
                                to="/lao-cai-v2/pho-bien-giao-duc"
                                className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                            >
                                <span>Xem tất cả</span>
                                <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                            {/* Cột trái (5 cols): Bài phân tích chính sách tiêu điểm chuyên sâu */}
                            <div className="lg:col-span-5 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition h-full flex flex-col group laocaiV3-card-interactive">
                                <div className="relative w-full aspect-video overflow-hidden shrink-0">
                                    <Image16x9
                                        src={laocaiV2PoliciesAndLifeData.featured.image}
                                        alt={laocaiV2PoliciesAndLifeData.featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-grow bg-white justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1.5 block">
                                            {laocaiV2PoliciesAndLifeData.featured.agency}
                                        </span>
                                        <Link to="/lao-cai-v2/pho-bien-giao-duc">
                                            <h3 className="font-bold text-[#0f4c81] text-base sm:text-lg line-clamp-2 leading-snug mb-2 hover:text-blue-700 transition">
                                                {laocaiV2PoliciesAndLifeData.featured.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-xs sm:text-[13px] line-clamp-3 leading-relaxed mb-4">
                                            {laocaiV2PoliciesAndLifeData.featured.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
                                            <Clock size={12} className="text-[#0f4c81]" />
                                            <span>{laocaiV2PoliciesAndLifeData.featured.date}</span>
                                        </div>
                                        <Link to="/lao-cai-v2/pho-bien-giao-duc" className="text-[#0f4c81] font-bold hover:underline flex items-center gap-1">
                                            Đọc toàn văn <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải (7 cols): 4 tin phản ánh thực tiễn thi hành chính sách */}
                            <div className="lg:col-span-7 flex flex-col gap-3.5 justify-between">
                                {laocaiV2PoliciesAndLifeData.list.map((item) => (
                                    <Link
                                        key={item.id}
                                        to="/lao-cai-v2/pho-bien-giao-duc"
                                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-row p-3 items-center gap-4 group laocaiV3-card-interactive"
                                    >
                                        <div className="w-[125px] sm:w-[150px] shrink-0 overflow-hidden rounded-lg">
                                            <Image16x9
                                                src={item.image}
                                                alt={item.title}
                                                className="rounded-lg shadow-sm"
                                            />
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-grow py-0.5">
                                            <h4 className="font-bold text-[#0f4c81] text-[13px] sm:text-[14px] line-clamp-2 leading-snug mb-1 group-hover:text-blue-700 transition">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-1.5 hidden sm:block">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                                <Clock size={11} /> <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 4. KHỐI ĐA PHƯƠNG TIỆN (MULTIMEDIA HUB) CHUẨN CỔNG THÔNG TIN CHÍNH PHỦ */}
                {/* ============================================================== */}
                <section id="da-phuong-tien" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                        {/* Header tab chuyển đổi Video / Ảnh / Infographic */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-3 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                                    Đa phương tiện
                                </h2>
                                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setMediaTab('video')}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                            mediaTab === 'video'
                                                ? 'bg-[#0f4c81] text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Video Phóng sự
                                    </button>
                                    <button
                                        onClick={() => setMediaTab('photo')}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                            mediaTab === 'photo'
                                                ? 'bg-[#0f4c81] text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Thư viện Ảnh
                                    </button>
                                    <button
                                        onClick={() => setMediaTab('infographic')}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                            mediaTab === 'infographic'
                                                ? 'bg-[#0f4c81] text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Infographic
                                    </button>
                                </div>
                            </div>

                            <Link
                                to="/lao-cai-v2/video"
                                className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                            >
                                <span>Xem toàn bộ Media</span>
                                <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Layout Đa phương tiện chuẩn Chinhphu.vn: 1 Video to player bên trái + 4 video/ảnh phụ bên phải */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Video to chính bên trái */}
                            <div className="lg:col-span-7 flex flex-col group">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-gray-200">
                                    <img
                                        src={currentMainMedia.thumb}
                                        alt={currentMainMedia.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                    />
                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                                        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <PlayCircle size={32} />
                                        </div>
                                    </div>
                                    {currentMainMedia.duration && (
                                        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2.5 py-1 rounded">
                                            {currentMainMedia.duration}
                                        </span>
                                    )}
                                </div>
                                <div className="pt-3">
                                    <Link to="/lao-cai-v2/video">
                                        <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#0f4c81] transition-colors line-clamp-2 leading-snug">
                                            {currentMainMedia.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5">
                                        <span>{currentMainMedia.date}</span>
                                        {currentMainMedia.desc && (
                                            <>
                                                <span>•</span>
                                                <span className="line-clamp-1 text-gray-400">{currentMainMedia.desc}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Danh sách 4 media phụ bên phải */}
                            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                                {currentMediaList.map((item) => (
                                    <Link
                                        key={item.id}
                                        to="/lao-cai-v2/video"
                                        className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition group"
                                    >
                                        <div className="relative w-28 h-18 sm:w-32 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                            <img
                                                src={item.thumb}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                            {item.duration && (
                                                <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] font-medium px-1 py-0.2 rounded">
                                                    {item.duration}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-xs sm:text-[13px] text-gray-900 group-hover:text-[#0f4c81] transition-colors line-clamp-2 leading-snug mb-1">
                                                {item.title}
                                            </h4>
                                            <div className="text-[11px] text-gray-400">
                                                {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 5. KHỐI 3 CHUYÊN TRANG TƯ PHÁP TRỌNG ĐIỂM CỦA TỈNH LÀO CAI */}
                {/* ============================================================== */}
                <section id="chuyen-trang-trong-diem" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Chuyên trang 1 */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group laocaiV3-card-interactive">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0f4c81] flex items-center justify-center mb-3">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#0f4c81] transition mb-1.5">
                                    Phổ biến, giáo dục pháp luật
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Cung cấp tài liệu, bài giảng điện tử, tủ sách pháp luật và tin tức tuyên truyền pháp luật đến mọi tầng lớp nhân dân.
                                </p>
                            </div>
                            <Link
                                to="/lao-cai-v2/pho-bien-giao-duc"
                                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0f4c81] group-hover:text-blue-700"
                            >
                                <span>Truy cập chuyên trang</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Chuyên trang 2 */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group laocaiV3-card-interactive">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                                    <Scale size={24} />
                                </div>
                                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#0f4c81] transition mb-1.5">
                                    Trợ giúp pháp lý Nhà nước
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Bảo vệ quyền và lợi ích hợp pháp miễn phí cho người nghèo, đồng bào dân tộc thiểu số và các đối tượng chính sách.
                                </p>
                            </div>
                            <Link
                                to="/lao-cai-v2/gioi-thieu"
                                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0f4c81] group-hover:text-blue-700"
                            >
                                <span>Gửi hồ sơ trợ giúp</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Chuyên trang 3 */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group laocaiV3-card-interactive">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#0f4c81] transition mb-1.5">
                                    Hỗ trợ pháp lý Doanh nghiệp
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Đồng hành cùng các doanh nghiệp, hợp tác xã tháo gỡ rào cản pháp lý, thủ tục đầu tư và thương mại biên giới.
                                </p>
                            </div>
                            <Link
                                to="/lao-cai-v2/lien-he"
                                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0f4c81] group-hover:text-blue-700"
                            >
                                <span>Đặt câu hỏi tư vấn</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 6. KHỐI TIẾP NHẬN PHẢN ÁNH KIẾN NGHỊ & KHẢO SÁT CHÍNH SÁCH */}
                {/* (ĐẶC TRƯNG CỦA CỔNG THÔNG TIN CHÍNH PHỦ) */}
                {/* ============================================================== */}
                <section id="phan-anh-kien-nghi" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="bg-gradient-to-r from-blue-900 via-[#0f4c81] to-[#1c2c5b] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-blue-400/30">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                            <div className="lg:col-span-7">
                                <span className="bg-amber-400 text-gray-950 font-bold text-xs uppercase px-2.5 py-1 rounded shadow-xs mb-2 inline-block">
                                    Lắng nghe nhân dân & doanh nghiệp
                                </span>
                                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                                    Tiếp nhận Phản ánh, Kiến nghị về Văn bản & Dịch vụ Tư pháp
                                </h2>
                                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-4">
                                    Mọi ý kiến đóng góp, vướng mắc trong thực thi pháp luật sẽ được Sở Tư pháp và các cơ quan có thẩm quyền tỉnh Lào Cai tiếp nhận, xử lý và công khai kết quả theo đúng quy định.
                                </p>

                                <div className="flex flex-wrap gap-4 text-xs">
                                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/15">
                                        <PhoneCall size={16} className="text-amber-400" />
                                        <span>Hotline: 0214.3824.163</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/15">
                                        <ShieldCheck size={16} className="text-emerald-400" />
                                        <span>Bảo mật thông tin người phản ánh</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form nhanh bên phải */}
                            <div className="lg:col-span-5 bg-white text-gray-800 rounded-xl p-5 shadow-lg">
                                {feedbackSubmitted ? (
                                    <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
                                        <CheckCircle2 size={42} className="text-emerald-600" />
                                        <h4 className="font-bold text-base text-gray-900">Gửi phản ánh thành công!</h4>
                                        <p className="text-xs text-gray-600">
                                            Cảm ơn ý kiến đóng góp của bạn. Chúng tôi sẽ xử lý và phản hồi trong thời gian sớm nhất.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                                        <h4 className="font-bold text-sm text-[#0f4c81] border-b pb-2">
                                            Gửi ý kiến / kiến nghị trực tuyến
                                        </h4>
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Họ và tên của bạn *"
                                                value={feedbackForm.fullname}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, fullname: e.target.value })}
                                                className="w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f4c81]"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                placeholder="Email hoặc số điện thoại *"
                                                value={feedbackForm.email}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                                                className="w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f4c81]"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                required
                                                rows="3"
                                                placeholder="Nội dung ý kiến, vướng mắc hoặc phản ánh..."
                                                value={feedbackForm.content}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                                                className="w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0f4c81]"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#0f4c81] hover:bg-[#1c2c5b] text-white font-bold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
                                        >
                                            <Send size={13} />
                                            <span>Gửi phản ánh kiến nghị</span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ĐẢO SLIDE LIÊN KẾT CÁC CƠ QUAN / ĐƠN VỊ PHÍA DƯỚI CÙNG (FixedBottomCarousel) */}
            <FixedBottomCarousel items={LAOCAI_V2_CAROUSEL_ITEMS} />

            {/* Footer đồng bộ hoàn toàn với V2 */}
            <LaoCaiV3Footer />
        </div>
    );
};

export default LaoCaiV3HomePage;

import React, { useState, useEffect, useCallback } from 'react';
import {
    Clock,
    PlayCircle,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Scale,
    FileText,
    Building2,
    Users,
    Eye,
    Newspaper,
    BookOpen,
    Lightbulb,
    ClipboardList,
    CalendarDays,
    BadgeCheck,
    BookMarked,
    Megaphone,
    Trophy,
    TrafficCone,
    PhoneCall,
    Landmark,
    ShieldCheck,
    Gavel,
    Briefcase,
    Flag,
    MonitorSmartphone,
    Search,
    HelpCircle,
    MessageSquare,
    FileCheck,
    MapPin,
    Smile,
    Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LaoCaiV3Header from '../../components/laocaiV3/LaoCaiV3Header';
import LaoCaiV3Footer from '../../components/laocaiV3/LaoCaiV3Footer';
import LaoCaiV2HorizontalTicker from '../../components/laocaiV2/LaoCaiV2HorizontalTicker';
import LaoCaiV2NewlyIssuedDocs from '../../components/laocaiV2/LaoCaiV2NewlyIssuedDocs';
import FixedBottomCarousel, { LAOCAI_V2_CAROUSEL_ITEMS } from '../../components/FixedBottomCarousel';
import { Reveal, CountUp, ScrollProgressBar, LaoCaiV3Styles } from '../../components/laocaiV3/LaoCaiV3Motion';
import { LAOCAI_BOTTOM_FEATURE_SLIDES } from '../laocaiV2/LaoCaiV2HomePage';
import { LAOCAI_V2_NEWS_CATEGORIES } from '../../components/laocaiV2/LaoCaiV2NewsSubNav';
import {
    laocaiV2SiteConfig,
    laocaiV2NewsHighlightsData,
    laocaiV2PoliciesAndLifeData,
    laocaiV2MultimediaData,
    laocaiV2NewsArticles,
    laocaiV2ConnectedPortals
} from '../../data/laocaiV2MockData';

const HERO_INTERVAL = 7000;
const BOTTOM_SLIDE_INTERVAL = 6500;

// Icon cho từng cổng liên kết (đồng bộ V2)
const PORTAL_LINK_ICONS = {
    'thanh-uy': Flag, hdnd: Landmark, ubnd: Building2, mttq: Users, 'so-tu-phap': Scale,
    'dich-vu-cong': MonitorSmartphone, congan: ShieldCheck, toaan: Gavel, 'doan-luat-su': Briefcase
};

// Slide tin tiêu điểm (tự chuyển, có thanh tiến trình)
const HERO_SLIDES = [
    {
        id: 1,
        subBadge: "QĐ 61/2024/QĐ-UBND",
        title: "UBND TỈNH LÀO CAI: QUY ĐỊNH CHI TIẾT VỀ BỒI THƯỜNG, HỖ TRỢ, TÁI ĐỊNH CƯ KHI NHÀ NƯỚC THU HỒI ĐẤT",
        summary: "Sáng ngày 07/10/2024, UBND tỉnh Lào Cai chính thức áp dụng Quyết định số 61/2024/QĐ-UBND quy định chi tiết về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất. Quy định kịp thời tháo gỡ khó khăn, vướng mắc cho các dự án trọng điểm, đồng thời bảo đảm quyền lợi hợp pháp, chính đáng và nơi ở mới tốt hơn nơi ở cũ cho người dân trên địa bàn tỉnh.",
        image: "/thumb1.png",
        date: "07/10/2024",
        agency: "ỦY BAN NHÂN DÂN TỈNH LÀO CAI",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: 2,
        subBadge: "CHÍNH QUYỀN HAI CẤP",
        title: "LÀO CAI HOÀN THIỆN HỆ THỐNG VĂN BẢN BẢO ĐẢM CHÍNH QUYỀN ĐỊA PHƯƠNG HAI CẤP VẬN HÀNH THÔNG SUỐT TẠI 99 XÃ, PHƯỜNG",
        summary: "Sở Tư pháp tỉnh Lào Cai đã tham mưu HĐND, UBND tỉnh ban hành đầy đủ các văn bản về phân cấp, ủy quyền và phân định thẩm quyền sau sắp xếp đơn vị hành chính. Các xã, phường đã chủ động tiếp nhận nhiệm vụ, giải quyết thủ tục hành chính cho người dân ngay tại cơ sở, kể cả các xã vùng cao, biên giới.",
        image: "/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg",
        date: "22/03/2026",
        agency: "HĐND & UBND TỈNH LÀO CAI",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: 3,
        subBadge: "KINH TẾ CỬA KHẨU",
        title: "HĐND TỈNH THÔNG QUA NGHỊ QUYẾT KHUYẾN KHÍCH ĐẦU TƯ HẠ TẦNG LOGISTICS TẠI KHU KINH TẾ CỬA KHẨU LÀO CAI",
        summary: "Chính sách hỗ trợ tiền thuê đất, đầu tư kho bãi, trung tâm logistics và rút gọn thủ tục đầu tư nhằm phát huy lợi thế Cửa khẩu quốc tế Lào Cai, thúc đẩy xuất khẩu nông sản và thương mại biên mậu giữa Việt Nam với vùng Tây Nam Trung Quốc.",
        image: "/thumb2.png",
        date: "15/02/2026",
        agency: "HỘI ĐỒNG NHÂN DÂN TỈNH LÀO CAI",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: 4,
        subBadge: "DỊCH VỤ CÔNG TRỰC TUYẾN",
        title: "CỔNG DỊCH VỤ CÔNG TỈNH LÀO CAI: TIẾP NHẬN VÀ XỬ LÝ ĐÚNG HẠN 100% PHẢN ÁNH, KIẾN NGHỊ VỀ THỦ TỤC TƯ PHÁP",
        summary: "Quy chế tiếp nhận phản ánh, kiến nghị qua Cổng Dịch vụ công tỉnh đã giúp rút ngắn đáng kể thời gian xử lý thủ tục hành chính tư pháp. Mọi kiến nghị của người dân đều được phân luồng đến cơ quan có thẩm quyền và công khai tiến độ trên môi trường số.",
        image: "/thumb3.png",
        date: "18/03/2026",
        agency: "VĂN PHÒNG UBND TỈNH LÀO CAI",
        link: "/lao-cai-v2/lien-he"
    }
];

const ANNOUNCEMENTS = [
    { id: "TB-01", badge: "Lịch tiếp dân", badgeColor: "bg-red-50 text-red-700 border-red-200", day: "22", month: "Th03", title: "Thông báo số 86/TB-UBND: Lịch tiếp công dân định kỳ tháng 04/2026 của Lãnh đạo UBND tỉnh Lào Cai", agency: "Văn phòng UBND tỉnh Lào Cai", link: "/lao-cai-v2/van-ban", isHot: true },
    { id: "TB-02", badge: "Hội nghị", badgeColor: "bg-blue-50 text-blue-700 border-blue-200", day: "20", month: "Th03", title: "Thông báo số 45/TB-STP: Kế hoạch tổ chức Hội nghị phổ biến các văn bản QPPL mới ban hành quý I/2026", agency: "Sở Tư pháp tỉnh Lào Cai", link: "/lao-cai-v2/van-ban" },
    { id: "TB-03", badge: "Dịch vụ công", badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200", day: "18", month: "Th03", title: "Thông báo vận hành thử nghiệm phân hệ số hóa hồ sơ tư pháp điện tử trên Cổng Dịch vụ công tỉnh Lào Cai", agency: "Trung tâm Phục vụ hành chính công tỉnh", link: "/lao-cai-v2/lien-he", isHot: true },
    { id: "TB-04", badge: "Lấy ý kiến", badgeColor: "bg-amber-50 text-amber-700 border-amber-200", day: "15", month: "Th03", title: "Thông báo số 120/TB-HĐND: Lấy ý kiến nhân dân đối với Dự thảo Nghị quyết hỗ trợ phát triển dược liệu dưới tán rừng", agency: "HĐND tỉnh Lào Cai", link: "/lao-cai-v2/van-ban" },
    { id: "TB-05", badge: "Trợ giúp pháp lý", badgeColor: "bg-purple-50 text-purple-700 border-purple-200", day: "12", month: "Th03", title: "Thông báo tiếp nhận hồ sơ trợ giúp pháp lý lưu động đợt 1/2026 tại các xã vùng cao, biên giới tỉnh Lào Cai", agency: "Trung tâm TGPL Nhà nước tỉnh", link: "/lao-cai-v2/pho-bien-giao-duc" },
    { id: "TB-06", badge: "Công chứng số", badgeColor: "bg-blue-50 text-blue-700 border-blue-200", day: "10", month: "Th03", title: "Thông báo số 38/TB-STP: Danh sách tổ chức hành nghề công chứng đủ điều kiện tham gia mạng lưới chứng thực số điện tử", agency: "Sở Tư pháp tỉnh Lào Cai", link: "/lao-cai-v2/van-ban" },
    { id: "TB-07", badge: "Kiểm tra", badgeColor: "bg-teal-50 text-teal-700 border-teal-200", day: "08", month: "Th03", title: "Thông báo số 25/TB-HĐPH: Kế hoạch kiểm tra công tác hòa giải ở cơ sở và đánh giá chuẩn tiếp cận pháp luật năm 2026", agency: "Hội đồng phối hợp PBGDPL tỉnh", link: "/lao-cai-v2/van-ban" },
    { id: "TB-08", badge: "Tuyển chọn", badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200", day: "05", month: "Th03", title: "Thông báo tuyển chọn báo cáo viên pháp luật cấp tỉnh và cộng tác viên trợ giúp pháp lý nhiệm kỳ 2026 - 2030", agency: "Sở Tư pháp tỉnh Lào Cai", link: "/lao-cai-v2/pho-bien-giao-duc", isHot: true }
];

// Chuyên mục tin tức (đồng bộ sub nav trang Tin tức): 8 chuyên mục chính + các chuyên đề PBGDPL
// Chuyên mục tin tức đồng bộ sub nav trang Tin tức (trang chủ không hiển thị Hỗ trợ doanh nghiệp, Trợ giúp pháp lý)
const HIDDEN_HOME_CATEGORIES = ['doanh-nghiep', 'tro-giup'];
const NEWS_CATEGORIES = LAOCAI_V2_NEWS_CATEGORIES.filter((c) => !HIDDEN_HOME_CATEGORIES.includes(c.id));
const NEWS_CATEGORY_ICONS = {
    'tin-hoat-dong': Newspaper, 'chinh-sach': Landmark, pbgdpl: BookOpen, 'tu-phap': Gavel,
    'van-ban': FileText, 'nghien-cuu': Lightbulb, 'de-an-pbgdpl': ClipboardList, 'ngay-phap-luat': CalendarDays,
    'chuan-tiep-can': BadgeCheck, 'huong-dan-nghiep-vu': BookMarked, 'bao-cao-vien': Megaphone,
    'cuoc-thi': Trophy, 'an-toan-giao-thong': TrafficCone
};

const ACTIVITY_NEWS = {
    featured: {
        id: "ACT-01",
        title: "UBND tỉnh Lào Cai tổ chức Hội nghị triển khai công tác tư pháp năm 2026 đến các xã, phường",
        summary: "Sáng nay, UBND tỉnh Lào Cai đã tổ chức Hội nghị trực tuyến đến 99 xã, phường triển khai nhiệm vụ công tác tư pháp năm 2026. Trọng tâm là nâng cao chất lượng xây dựng, rà soát văn bản QPPL, tăng cường phổ biến pháp luật và trợ giúp pháp lý cho đồng bào dân tộc thiểu số vùng cao, biên giới.",
        date: "22/03/2026",
        badge: "HỘI NGHỊ TOÀN TỈNH",
        image: "/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg",
        link: "/lao-cai-v2/pho-bien-giao-duc"
    },
    subList: [
        { id: "ACT-02", title: "Sở Tư pháp Lào Cai tập huấn nghiệp vụ theo dõi thi hành pháp luật năm 2026 cho hơn 500 cán bộ tư pháp cơ sở", date: "21/03/2026", badge: "Tập huấn nghiệp vụ", image: "/thumb2.png", link: "/lao-cai-v2/pho-bien-giao-duc" },
        { id: "ACT-03", title: "Hội đồng PBGDPL tỉnh phát động chiến dịch truyền thông pháp luật song ngữ tại các thôn, bản vùng cao", date: "20/03/2026", badge: "Phổ biến, giáo dục", image: "/thumb3.png", link: "/lao-cai-v2/pho-bien-giao-duc" },
        { id: "ACT-04", title: "Tọa đàm tháo gỡ khó khăn pháp lý cho hơn 300 doanh nghiệp, hợp tác xã nông nghiệp và du lịch trên địa bàn tỉnh", date: "18/03/2026", badge: "Hỗ trợ pháp lý DN", image: "/thumb1.png", link: "/lao-cai-v2/pho-bien-giao-duc" }
    ]
};

// Tiện ích truy cập nhanh (class Tailwind viết đầy đủ để không bị purge)
const QUICK_SERVICES = [
    { label: 'Văn bản QPPL', desc: 'Tra cứu toàn văn văn bản', icon: FileText, to: '/lao-cai-v2/van-ban' },
    { label: 'Hỏi đáp pháp luật', desc: 'Giải đáp vướng mắc pháp lý', icon: HelpCircle, to: '/lao-cai-v2/hoi-dap' },
    { label: 'Đường dây nóng', desc: 'Liên hệ cơ quan chức năng', icon: PhoneCall, to: '/lao-cai-v2/hotline' }
];

const HOT_KEYWORDS = ['Đất đai 2024', 'Hộ tịch', 'Logistics cửa khẩu', 'Hòa giải cơ sở'];

const toNumber = (v) => (typeof v === 'number' ? v : parseFloat(String(v).replace('%', '')) || 0);
const STATS = [
    { label: 'Văn bản QPPL còn hiệu lực', value: toNumber(laocaiV2SiteConfig.stats.activeDocs), icon: FileCheck },
    { label: 'Văn bản ban hành trong năm', value: toNumber(laocaiV2SiteConfig.stats.newDocsThisYear), icon: FileText },
    { label: 'Xã, phường được bao phủ', value: toNumber(laocaiV2SiteConfig.stats.districtsCovered), suffix: '%', icon: MapPin },
    { label: 'Mức hài lòng trực tuyến', value: toNumber(laocaiV2SiteConfig.stats.onlineSatisfaction), suffix: '%', decimals: 1, icon: Smile }
];

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-video w-full relative overflow-hidden bg-gray-100 ${className}`}>
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
    </div>
);

// Tiêu đề khối: giữ phong cách V2, thêm vạch nhấn vàng - đỏ mận chạy ra khi cuộn tới
const SectionHeading = ({ title, to, children, moreLabel = 'Xem tất cả' }) => (
    <div className="relative flex flex-wrap justify-between items-center gap-3 mb-5 pb-3 border-b border-gray-200">
        <Link to={to} className="group/heading inline-flex items-center gap-2" title={`Xem chuyên mục ${title}`}>
            <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81] group-hover/heading:text-[#991b1b] transition-colors">
                {title}
            </h2>
            <ChevronRight size={19} className="text-[#0f4c81] group-hover/heading:text-[#991b1b] group-hover/heading:translate-x-0.5 transition-all" />
        </Link>
        <div className="flex items-center gap-3 ml-auto">
            {children}
            <Link
                to={to}
                className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#991b1b] transition-colors shrink-0"
            >
                <span>{moreLabel}</span>
                <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
        <span className="lc3-heading-bar absolute -bottom-px left-0 h-[3px] rounded-full bg-gradient-to-r from-amber-400 to-[#991b1b]" />
    </div>
);

const LaoCaiV3HomePage = () => {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHeroPaused, setIsHeroPaused] = useState(false);
    const [bottomSlideIndex, setBottomSlideIndex] = useState(0);
    const [isBottomSlidePaused, setIsBottomSlidePaused] = useState(false);
    const [mediaTab, setMediaTab] = useState('video');
    const [activeVideoIdx, setActiveVideoIdx] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = "Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (isBottomSlidePaused) return;
        const interval = setInterval(() => {
            setBottomSlideIndex((prev) => (prev + 1) % LAOCAI_BOTTOM_FEATURE_SLIDES.length);
        }, BOTTOM_SLIDE_INTERVAL);
        return () => clearInterval(interval);
    }, [isBottomSlidePaused]);

    const goToSlide = useCallback((idx) => {
        setActiveSlide((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
    }, []);

    const goToSearch = (keyword) => {
        const q = keyword.trim();
        if (q) navigate(`/lao-cai-v2/van-ban?q=${encodeURIComponent(q)}`);
    };

    const slide = HERO_SLIDES[activeSlide];
    const videos = laocaiV2MultimediaData.videos;
    const activeVideo = videos[activeVideoIdx] || videos[0];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans flex flex-col selection:bg-blue-600 selection:text-white">
            <LaoCaiV3Styles />
            <ScrollProgressBar />

            {/* Header & nav giữ nguyên như V2 */}
            <LaoCaiV3Header />

            {/* Thanh tin tức trôi ngang dưới nav header (giữ nguyên V2) */}
            <LaoCaiV2HorizontalTicker />

            {/* BANNER GIỚI THIỆU: GRADIENT INDIGO HOÀNG GIA (#4f56ca -> #2c1b92 -> #4f56ca) */}
            <div className="px-4 pt-4 sm:pt-5 lc3-fade-down">
                <div className="w-full max-w-[1472px] mx-auto rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white py-5 sm:py-6 border border-indigo-400/30 shadow-lg shadow-indigo-900/20">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent lc3-sweep pointer-events-none" />
                    <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" />

                    <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                    <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none lc3-rotate-cw" />
                    <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                    <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none lc3-rotate-ccw" />

                    <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b] lc3-float" />
                    <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b] lc3-float" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/50 border border-amber-200/40 rounded-sm pointer-events-none lc3-float" style={{ animationDelay: '2.5s' }} />

                    <div className="container mx-auto px-4 max-w-[1504px] relative z-10 flex flex-col items-center text-center">
                        <div className="mb-1.5 sm:mb-2">
                            <img
                                src="/logo.png"
                                alt="Quốc huy"
                                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-xl hover:scale-105 transition-transform"
                            />
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold tracking-tight text-white uppercase leading-tight drop-shadow-md">
                            Cổng Pháp luật tỉnh Lào Cai
                        </h1>
                        <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5 sm:my-2 rounded-full" />
                    </div>
                </div>
            </div>

            <main className="flex-1 pb-16 space-y-5 sm:space-y-6 mt-1">
                {/* ============================================================== */}
                {/* 1. CHUYÊN MỤC TIN TỨC (30%) + TIN TIÊU ĐIỂM (SLIDE 70%) + 3 THẺ TIN NỔI BẬT */}
                {/* ============================================================== */}
                <section id="tin-tuc-noi-bat" className="w-full bg-white border-b border-gray-200 py-6 sm:py-8">
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-7 items-stretch">
                            {/* CỘT TRÁI: DANH SÁCH CHUYÊN MỤC TIN TỨC (lấy từ sub nav trang Tin tức) */}
                            <Reveal
                                variant="left"
                                as="nav"
                                aria-label="Chuyên mục tin tức"
                                className="lg:col-span-3 order-2 lg:order-1 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col lg:h-[520px]"
                            >
                                {/* Đầu khối: đồng bộ banner indigo hoàng gia */}
                                <div className="relative shrink-0 bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] px-4 py-3 flex items-center justify-between gap-2 overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                                    <div className="absolute -right-6 -top-8 w-24 h-24 rounded-full border border-amber-400/40 border-dashed lc3-rotate-cw pointer-events-none" />
                                    <div className="relative flex items-center gap-2.5 text-white">
                                        <span className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                                            <Newspaper size={16} className="text-amber-300" />
                                        </span>
                                        <h2 className="font-bold text-[15px] uppercase tracking-wide">Chuyên mục tin tức</h2>
                                    </div>
                                    <Link to="/lao-cai-v2/tin-tuc" className="relative text-xs font-semibold text-amber-200 hover:text-white inline-flex items-center gap-0.5 transition-colors">
                                        Tất cả <ChevronRight size={14} />
                                    </Link>
                                </div>

                                <ul className="flex-1 min-h-0 overflow-y-auto lc3-thin-scroll px-2 py-2 divide-y divide-gray-100/80">
                                    {NEWS_CATEGORIES.map((cat, idx) => {
                                        const Icon = NEWS_CATEGORY_ICONS[cat.id] || Newspaper;
                                        return (
                                            <li key={cat.id} className="lc3-stagger" style={{ animationDelay: `${150 + idx * 40}ms` }}>
                                                <Link
                                                    to={`/lao-cai-v2/tin-tuc/${cat.id}`}
                                                    className="group relative flex items-center gap-3 pl-3 pr-2 py-[5px] rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-colors"
                                                >
                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-full bg-gradient-to-b from-amber-400 to-[#991b1b] group-hover:h-5 transition-all duration-300" />
                                                    <span className="w-6 h-6 shrink-0 rounded-md bg-[#f0f5f9] text-[#0f4c81] flex items-center justify-center group-hover:bg-[#0f4c81] group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                                                        <Icon size={13} />
                                                    </span>
                                                    <span className="flex-1 min-w-0 truncate text-[13px] font-semibold text-gray-800 group-hover:text-[#0f4c81] group-hover:translate-x-0.5 transition-all">
                                                        {cat.label}
                                                    </span>
                                                    <ChevronRight size={14} className="shrink-0 text-gray-300 group-hover:text-[#991b1b] group-hover:translate-x-0.5 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Reveal>

                            {/* CỘT PHẢI: SLIDE TIN TIÊU ĐIỂM - ẢNH TRÀN KHUNG, CHỮ NỔI TRÊN ẢNH */}
                            <Reveal
                                variant="right"
                                delay={120}
                                className="lg:col-span-7 order-1 lg:order-2 relative rounded-2xl overflow-hidden bg-slate-200 shadow-lg shadow-slate-900/15 h-[460px] sm:h-[500px] lg:h-[520px] group"
                                onMouseEnter={() => setIsHeroPaused(true)}
                                onMouseLeave={() => setIsHeroPaused(false)}
                            >
                                <img
                                    key={`hero-img-${slide.id}`}
                                    src={slide.image}
                                    alt={slide.title}
                                    className="absolute inset-0 w-full h-full object-cover brightness-[1.06] saturate-[1.08] lc3-kenburns"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#0b1b3a]/90 via-[#0b1b3a]/45 to-transparent" />
                                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />

                                {/* Góc trên: nhãn + điều hướng dạng kính mờ */}
                                <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex items-start justify-between gap-3 z-10">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="bg-[#991b1b] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow">TIN TIÊU ĐIỂM</span>
                                        <span key={`hero-sub-${slide.id}`} className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md lc3-text-in">
                                            {slide.subBadge}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-white/85 text-xs font-semibold tabular-nums mr-1 hidden sm:inline">
                                            {String(activeSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => goToSlide(activeSlide - 1)}
                                            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-[#0f4c81] flex items-center justify-center transition-colors"
                                            aria-label="Tin trước"
                                        >
                                            <ChevronLeft size={17} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => goToSlide(activeSlide + 1)}
                                            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-[#0f4c81] flex items-center justify-center transition-colors"
                                            aria-label="Tin tiếp theo"
                                        >
                                            <ChevronRight size={17} />
                                        </button>
                                    </div>
                                </div>

                                {/* Nội dung đè trên ảnh */}
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10">
                                    <div key={`hero-text-${slide.id}`} className="lc3-text-in max-w-3xl">
                                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-amber-200 font-semibold mb-2">
                                            <Clock size={14} className="shrink-0" />
                                            <span>{slide.date}</span>
                                            <span className="text-white/40">•</span>
                                            <span className="text-white/75 truncate font-normal">{slide.agency}</span>
                                        </div>
                                        <Link to={slide.link} className="block">
                                            <h3 className="text-lg sm:text-2xl lg:text-[26px] font-bold text-white hover:text-amber-200 transition-colors leading-[1.3] uppercase tracking-tight line-clamp-3 drop-shadow">
                                                {slide.title}
                                            </h3>
                                        </Link>
                                        <p className="hidden sm:block text-white/80 text-sm leading-relaxed line-clamp-2 mt-2.5">
                                            {slide.summary}
                                        </p>
                                        <Link
                                            to={slide.link}
                                            className="group/more mt-4 inline-flex items-center gap-2 bg-white text-[#0f4c81] hover:bg-amber-400 hover:text-gray-950 text-xs sm:text-sm font-bold pl-4 pr-3 py-2 rounded-full shadow transition-colors"
                                        >
                                            <span>Xem chi tiết</span>
                                            <ArrowRight size={14} className="group-hover/more:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>

                                    {/* Thanh tiến trình từng tin */}
                                    <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-5">
                                        {HERO_SLIDES.map((s, idx) => (
                                            <button
                                                key={`hero-dot-${s.id}`}
                                                type="button"
                                                onClick={() => goToSlide(idx)}
                                                className="group/dot text-left focus:outline-none"
                                                aria-label={`Xem tin ${idx + 1}`}
                                                aria-current={idx === activeSlide}
                                            >
                                                <span className="relative block h-1 rounded-full bg-white/25 overflow-hidden">
                                                    {idx < activeSlide && <span className="absolute inset-0 bg-white/60" />}
                                                    {idx === activeSlide && (
                                                        <span
                                                            key={`hero-progress-${activeSlide}`}
                                                            className="lc3-progress absolute inset-0 origin-left bg-amber-400"
                                                            style={{
                                                                animation: `lc3Progress ${HERO_INTERVAL}ms linear both`,
                                                                animationPlayState: isHeroPaused ? 'paused' : 'running'
                                                            }}
                                                            onAnimationEnd={() => goToSlide(activeSlide + 1)}
                                                        />
                                                    )}
                                                </span>
                                                <span className={`hidden md:block mt-1.5 text-[11.5px] leading-snug line-clamp-1 transition-colors ${idx === activeSlide ? 'text-white font-semibold' : 'text-white/55 group-hover/dot:text-white/85'}`}>
                                                    {s.subBadge}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                        </div>

                        {/* 3 THẺ TIN NỔI BẬT DẠNG SLIDE (giữ trình bày V2) */}
                        <Reveal
                            delay={200}
                            className="mt-6 relative select-none"
                            onMouseEnter={() => setIsBottomSlidePaused(true)}
                            onMouseLeave={() => setIsBottomSlidePaused(false)}
                        >
                            <div className="overflow-hidden rounded-2xl p-1 -m-1">
                                <div
                                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={{ transform: `translateX(-${bottomSlideIndex * 100}%)` }}
                                >
                                    {LAOCAI_BOTTOM_FEATURE_SLIDES.map((slideGroup, sIdx) => (
                                        <div
                                            key={`bottom-slide-group-${sIdx}`}
                                            className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 px-0.5"
                                            aria-hidden={bottomSlideIndex !== sIdx}
                                        >
                                            {slideGroup.map((card) => (
                                                <Link
                                                    key={card.id}
                                                    to={card.link}
                                                    tabIndex={bottomSlideIndex !== sIdx ? -1 : undefined}
                                                    className="bg-white rounded-2xl p-3.5 border border-gray-200 hover:border-amber-400 shadow-sm flex items-start gap-3.5 group relative overflow-hidden lc3-card"
                                                >
                                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 group-hover:h-1.5 transition-all" />
                                                    <div className="w-24 h-20 sm:w-28 sm:h-[5.5rem] flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative bg-gray-100">
                                                        <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        {card.badge && (
                                                            <span className="absolute bottom-1 left-1 bg-black/75 text-[9.5px] font-bold text-amber-300 px-1.5 py-0.5 rounded leading-none max-w-[90%] truncate">
                                                                {card.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold mb-1">
                                                            <Clock size={12} className="text-[#a81c1c]" />
                                                            <span>{card.date}</span>
                                                        </div>
                                                        <h4 className="font-bold text-[13.5px] sm:text-[14px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2 mb-1">
                                                            {card.title}
                                                        </h4>
                                                        <p className="text-[12px] text-gray-700 line-clamp-2 leading-relaxed">{card.summary}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                {LAOCAI_BOTTOM_FEATURE_SLIDES.map((_, dotIdx) => {
                                    const isActive = bottomSlideIndex === dotIdx;
                                    return (
                                        <button
                                            key={`bottom-feature-dot-${dotIdx}`}
                                            type="button"
                                            onClick={() => setBottomSlideIndex(dotIdx)}
                                            className="group py-1.5 px-0.5 focus:outline-none"
                                            aria-label={`Xem trang ${dotIdx + 1}`}
                                        >
                                            <span className={`block rounded-full transition-all duration-300 ease-out ${isActive ? 'w-8 h-2.5 bg-red-600' : 'w-2.5 h-2.5 bg-gray-300 group-hover:bg-gray-400 group-hover:scale-125'}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 2. TRA CỨU NHANH VĂN BẢN PHÁP LUẬT - DẢI GRADIENT XANH TRÀN CHIỀU RỘNG */}
                {/* ============================================================== */}
                <section id="tra-cuu-nhanh" className="relative w-full overflow-hidden bg-gradient-to-br from-[#0b3d91] via-[#1565c0] to-[#1e88e5] text-white py-10 sm:py-14">
                    {/* Họa tiết nền */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1.1px,transparent_1.1px)] [background-size:22px_22px] pointer-events-none" />
                    <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-sky-300/25 blur-3xl pointer-events-none lc3-drift" />
                    <div className="absolute -right-24 -bottom-32 w-[28rem] h-[28rem] rounded-full bg-cyan-300/20 blur-3xl pointer-events-none lc3-drift" style={{ animationDelay: '-6s' }} />
                    <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/15 border-dashed pointer-events-none lc3-rotate-cw hidden md:block" />
                    <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/10 pointer-events-none hidden md:block" />
                    <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/15 border-dashed pointer-events-none lc3-rotate-ccw hidden md:block" style={{ marginRight: '2.5rem' }} />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <Reveal className="relative z-10 container mx-auto px-4 max-w-[860px] flex flex-col items-center text-center">
                        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-[11.5px] font-semibold text-sky-100 px-3 py-1 rounded-full mb-3">
                            <Sparkles size={13} className="text-amber-300" />
                            Cơ sở dữ liệu văn bản pháp luật tỉnh Lào Cai
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-tight drop-shadow-sm">
                            Tra cứu nhanh văn bản pháp luật
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3 rounded-full" />
                        <p className="text-sm text-sky-100/90 mb-6 max-w-xl">
                            Nhập số hiệu, trích yếu hoặc từ khóa để tìm văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành
                        </p>

                        <form
                            onSubmit={(e) => { e.preventDefault(); goToSearch(searchQuery); }}
                            className="w-full relative group/search"
                            role="search"
                        >
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-300/40 via-white/30 to-amber-300/40 blur-md opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="relative flex items-center bg-white rounded-full shadow-xl shadow-blue-950/25 p-1.5 pl-5">
                                <Search size={19} className="shrink-0 text-gray-400 group-focus-within/search:text-[#1565c0] transition-colors" />
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Ví dụ: bồi thường đất đai, hộ tịch, 61/2024/QĐ-UBND..."
                                    aria-label="Từ khóa tra cứu văn bản"
                                    className="flex-1 min-w-0 bg-transparent text-sm sm:text-[15px] text-gray-900 placeholder-gray-400 px-3 py-2.5 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="relative shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0b3d91] to-[#1565c0] hover:from-[#991b1b] hover:to-[#b91c1c] text-white text-sm font-bold px-5 sm:px-7 py-2.5 rounded-full transition-colors lc3-shine"
                                >
                                    <Search size={15} className="sm:hidden" />
                                    <span className="hidden sm:inline">Tìm kiếm</span>
                                </button>
                            </div>
                        </form>

                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[12px]">
                            <span className="text-sky-100/80">Từ khóa nổi bật:</span>
                            {HOT_KEYWORDS.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => goToSearch(tag)}
                                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-[#0b3d91] transition-colors font-medium"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-7">
                            {QUICK_SERVICES.map(({ label, desc, icon: Icon, to }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    className="group flex items-center gap-3 text-left bg-white/10 hover:bg-white border border-white/20 hover:border-white rounded-2xl px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20"
                                >
                                    <span className="w-10 h-10 shrink-0 rounded-xl bg-white/15 text-amber-300 group-hover:bg-[#1565c0] group-hover:text-white group-hover:-rotate-6 flex items-center justify-center transition-all duration-300">
                                        <Icon size={19} />
                                    </span>
                                    <span className="flex-1 min-w-0">
                                        <span className="block font-bold text-[13.5px] text-white group-hover:text-[#0b3d91] transition-colors">{label}</span>
                                        <span className="block text-[11.5px] text-sky-100/80 group-hover:text-gray-500 transition-colors">{desc}</span>
                                    </span>
                                    <ArrowRight size={15} className="shrink-0 text-white/60 group-hover:text-[#991b1b] group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 3. TIN HOẠT ĐỘNG (70%) + BANNER TUYÊN TRUYỀN (30%) */}
                {/* ============================================================== */}
                <section id="tin-hoat-dong" className="w-full max-w-[1504px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-7 items-stretch">
                        <Reveal variant="left" className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between lg:h-[485px]">
                            <SectionHeading title="Tin hoạt động" to="/lao-cai-v2/tin-tuc/tin-hoat-dong" />

                            <Link to={ACTIVITY_NEWS.featured.link} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3 pb-3 border-b border-gray-100 group">
                                <div className="md:col-span-4 rounded-xl overflow-hidden bg-gray-100 h-[150px] relative">
                                    <img src={ACTIVITY_NEWS.featured.image} alt={ACTIVITY_NEWS.featured.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <span className="absolute top-2 left-2 bg-[#991b1b] text-white text-[10.5px] font-bold px-2 py-0.5 rounded shadow">
                                        {ACTIVITY_NEWS.featured.badge}
                                    </span>
                                </div>
                                <div className="md:col-span-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-xs text-amber-950 font-semibold mb-1">
                                        <Clock size={13} className="text-[#a81c1c]" />
                                        <span>{ACTIVITY_NEWS.featured.date}</span>
                                    </div>
                                    <h3 className="font-bold text-base sm:text-[16.5px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug mb-1 line-clamp-2">
                                        {ACTIVITY_NEWS.featured.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-3">{ACTIVITY_NEWS.featured.summary}</p>
                                </div>
                            </Link>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {ACTIVITY_NEWS.subList.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className="group flex flex-col bg-gray-50/70 hover:bg-white p-2 rounded-xl border border-gray-100 hover:border-red-200 lc3-card"
                                    >
                                        <div className="h-[86px] w-full rounded-lg overflow-hidden bg-gray-200 mb-1.5 relative">
                                            <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <span className="absolute bottom-1 left-1 bg-black/65 text-white text-[10px] font-medium px-1.5 py-px rounded">{item.badge}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                                            <Clock size={11} className="text-gray-400" />
                                            <span>{item.date}</span>
                                        </div>
                                        <h4 className="font-bold text-[12.5px] sm:text-[13px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2">
                                            {item.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal variant="right" delay={120} className="lg:col-span-3 rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 bg-white lg:h-[485px] relative group lc3-card">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 z-10" />
                            <Link
                                to="/lao-cai-v2/pho-bien-giao-duc"
                                className="block w-full h-full relative overflow-hidden lc3-shine"
                                title="Đưa Nghị quyết Đại hội Đảng và chính sách đặc thù vào cuộc sống"
                            >
                                <img
                                    src="/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg"
                                    alt="Đưa Nghị quyết Đại hội Đảng và chính sách đặc thù vào cuộc sống"
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </Link>
                        </Reveal>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 4. VĂN BẢN MỚI BAN HÀNH (component dùng chung V2) */}
                {/* ============================================================== */}
                <Reveal>
                    <LaoCaiV2NewlyIssuedDocs />
                </Reveal>

                {/* ============================================================== */}
                {/* 4b. THÔNG BÁO (chuyển xuống dưới khối Văn bản, dạng lưới thẻ) */}
                {/* ============================================================== */}
                <section id="thong-bao" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                        <SectionHeading title="Thông báo" to="/lao-cai-v2/van-ban">
                            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                                <span className="relative flex w-2 h-2">
                                    <span className="absolute inset-0 rounded-full bg-amber-500 lc3-ping" />
                                    <span className="relative w-2 h-2 rounded-full bg-amber-500" />
                                </span>
                                {ANNOUNCEMENTS.filter((a) => a.isHot).length} thông báo mới
                            </span>
                        </SectionHeading>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {ANNOUNCEMENTS.map((item, idx) => (
                                <Reveal key={item.id} delay={(idx % 4) * 80} className="flex">
                                    <Link
                                        to={item.link}
                                        className="w-full group relative flex flex-col p-4 rounded-xl border border-gray-200 hover:border-amber-300 bg-white hover:bg-amber-50/40 overflow-hidden lc3-card"
                                    >
                                        <div className="flex items-start gap-3 mb-2.5">
                                            <div className="w-12 h-14 rounded-xl bg-gradient-to-b from-[#991b1b] to-[#7f1d1d] text-white flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                                <span className="text-lg font-bold leading-none">{item.day}</span>
                                                <span className="text-[9.5px] font-semibold uppercase mt-1 text-white/80">{item.month}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                                <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>{item.badge}</span>
                                                {item.isHot && (
                                                    <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Mới</span>
                                                )}
                                            </div>
                                        </div>
                                        <h4 className="text-[13.5px] font-semibold text-gray-900 group-hover:text-[#991b1b] leading-snug line-clamp-3 transition-colors mb-3">
                                            {item.title}
                                        </h4>
                                        <div className="mt-auto pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2 text-[11.5px] text-gray-500">
                                            <span className="flex items-center gap-1.5 min-w-0">
                                                <Building2 size={12} className="shrink-0 text-gray-400" />
                                                <span className="truncate">{item.agency}</span>
                                            </span>
                                            <ArrowRight size={14} className="shrink-0 text-[#991b1b] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 5. PHÁP LUẬT LÀO CAI TRONG SỐ LIỆU (ĐẾM TĂNG DẦN KHI CUỘN TỚI) */}
                {/* ============================================================== */}
                <section id="so-lieu" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal variant="zoom" className="rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white px-5 sm:px-8 py-7 border border-indigo-400/30 shadow-lg shadow-indigo-900/20">
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
                        <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none lc3-rotate-cw" />

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight">Pháp luật Lào Cai trong số liệu</h2>
                                    <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-transparent mt-2 rounded-full" />
                                </div>
                                <Link to="/lao-cai-v2/van-ban" className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-200 hover:text-white transition-colors">
                                    <span>Khai thác cơ sở dữ liệu văn bản</span>
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {STATS.map(({ label, value, suffix, decimals, icon: Icon }) => (
                                    <div key={label} className="group rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 hover:border-amber-300/50 p-4 transition-colors">
                                        <Icon size={20} className="text-amber-300 mb-2 group-hover:scale-110 transition-transform" />
                                        <div className="text-2xl sm:text-[28px] font-bold leading-none">
                                            <CountUp end={value} suffix={suffix} decimals={decimals} />
                                        </div>
                                        <div className="text-[12px] text-blue-100/90 mt-1.5 leading-snug">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 6. HOẠT ĐỘNG TƯ PHÁP (LAYOUT 4 CỘT) */}
                {/* ============================================================== */}
                <section id="thoi-su-tu-phap" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                        <SectionHeading title="Hoạt động Tư pháp" to="/lao-cai-v2/tin-tuc/tu-phap" />
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-1 flex flex-col space-y-3">
                                {laocaiV2NewsHighlightsData.leftArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        to="/lao-cai-v2/pho-bien-giao-duc"
                                        className="flex items-start gap-3 group border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
                                    >
                                        <div className="w-[100px] shrink-0 rounded-lg overflow-hidden">
                                            <Image16x9 src={article.thumb} alt={article.title} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-[13px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-3 leading-snug transition-colors">{article.title}</h3>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1.5">
                                                <Clock size={11} /> <span>{article.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Link
                                to="/lao-cai-v2/pho-bien-giao-duc"
                                className="lg:col-span-2 group flex flex-col bg-slate-50/60 p-4 rounded-xl border border-gray-100 hover:border-blue-200 lc3-card"
                            >
                                <div className="w-full mb-4 overflow-hidden rounded-xl">
                                    <Image16x9 src={laocaiV2NewsHighlightsData.mainArticle.thumb} alt={laocaiV2NewsHighlightsData.mainArticle.title} />
                                </div>
                                <span className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1.5">{laocaiV2NewsHighlightsData.mainArticle.category}</span>
                                <h3 className="text-lg sm:text-xl font-bold text-[#0f4c81] group-hover:text-[#991b1b] mb-2.5 leading-snug transition-colors">
                                    {laocaiV2NewsHighlightsData.mainArticle.title}
                                </h3>
                                <p className="text-gray-600 text-[14px] mb-4 line-clamp-3 leading-relaxed">{laocaiV2NewsHighlightsData.mainArticle.summary}</p>
                                <div className="mt-auto flex items-center justify-between text-xs pt-2 border-t border-gray-200/60">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={13} className="text-[#0f4c81]" />
                                        <span className="font-medium text-gray-600">{laocaiV2NewsHighlightsData.mainArticle.date}</span>
                                    </div>
                                    <span className="text-[#0f4c81] font-bold flex items-center gap-1">
                                        Đọc toàn văn <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>

                            <div className="lg:col-span-1 flex flex-col space-y-5">
                                {laocaiV2NewsHighlightsData.rightArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        to="/lao-cai-v2/pho-bien-giao-duc"
                                        className="group flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                    >
                                        <div className="w-full mb-3 overflow-hidden rounded-lg">
                                            <Image16x9 src={article.thumb} alt={article.title} />
                                        </div>
                                        <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#0f4c81] mb-1.5 leading-snug line-clamp-2 transition-colors">{article.title}</h3>
                                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2">{article.summary}</p>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                            <Clock size={11} /> <span>{article.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 7. CHÍNH SÁCH LÀO CAI (LAYOUT 2 CỘT) */}
                {/* ============================================================== */}
                <section id="chinh-sach-cuoc-song" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                        <SectionHeading title="Chính sách Lào Cai" to="/lao-cai-v2/tin-tuc/chinh-sach" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <Link to="/lao-cai-v2/pho-bien-giao-duc" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col group lc3-card">
                                <div className="relative overflow-hidden">
                                    <Image16x9 src={laocaiV2PoliciesAndLifeData.featured.image} alt={laocaiV2PoliciesAndLifeData.featured.title} />
                                    <span className="absolute top-3 left-3 bg-[#991b1b] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">TIÊU ĐIỂM</span>
                                </div>
                                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                    <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">{laocaiV2PoliciesAndLifeData.featured.agency}</div>
                                    <h3 className="font-bold text-[#0f4c81] group-hover:text-[#991b1b] text-lg sm:text-xl line-clamp-2 leading-snug mb-3 transition-colors">
                                        {laocaiV2PoliciesAndLifeData.featured.title}
                                    </h3>
                                    <p className="text-gray-600 text-[14px] line-clamp-3 leading-relaxed mb-4">{laocaiV2PoliciesAndLifeData.featured.description}</p>
                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md">
                                            <Clock size={13} className="text-[#0f4c81]" />
                                            <span className="font-medium">{laocaiV2PoliciesAndLifeData.featured.date}</span>
                                        </div>
                                        <span className="text-[#0f4c81] font-bold flex items-center gap-1">
                                            Đọc tiếp <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex flex-col gap-3.5">
                                {laocaiV2PoliciesAndLifeData.list.map((item, idx) => (
                                    <Reveal key={item.id} variant="right" delay={idx * 90} className="flex-1 flex">
                                        <Link
                                            to="/lao-cai-v2/pho-bien-giao-duc"
                                            className="w-full bg-white rounded-xl border border-gray-200 shadow-sm flex flex-row p-3 items-center gap-4 group lc3-card"
                                        >
                                            <div className="w-[130px] sm:w-[165px] shrink-0 overflow-hidden rounded-lg">
                                                <Image16x9 src={item.image} alt={item.title} />
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-grow">
                                                <h4 className="font-bold text-[#0f4c81] text-[13px] sm:text-[14px] line-clamp-2 leading-snug mb-1.5 group-hover:text-[#991b1b] transition-colors">{item.title}</h4>
                                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2 hidden sm:block">{item.description}</p>
                                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                                    <Clock size={12} /> <span>{item.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 8. PHỔ BIẾN, GIÁO DỤC PHÁP LUẬT */}
                {/* ============================================================== */}
                <section id="pho-bien-giao-duc" className="w-full max-w-[1504px] mx-auto px-4">
                    <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                        <SectionHeading title="Phổ biến, giáo dục pháp luật" to="/lao-cai-v2/tin-tuc/pbgdpl" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {laocaiV2NewsArticles.map((article, idx) => (
                                <Reveal key={article.id} delay={idx * 110} className="flex">
                                    <Link
                                        to="/lao-cai-v2/pho-bien-giao-duc"
                                        className="w-full bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 flex flex-col group lc3-card"
                                    >
                                        <div className="relative overflow-hidden">
                                            <Image16x9 src={article.thumb} alt={article.title} />
                                            <span className="absolute top-3 left-3 bg-[#0f4c81]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">{article.category}</span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2 transition-colors">{article.title}</h3>
                                                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">{article.summary}</p>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs text-gray-400">
                                                <span className="truncate">{article.author}</span>
                                                <span className="flex items-center gap-1 shrink-0"><Clock size={12} /> {article.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 9. ĐA PHƯƠNG TIỆN: PLAYLIST VIDEO TƯƠNG TÁC & INFOGRAPHIC */}
                {/* ============================================================== */}
                <section id="da-phuong-tien" className="w-full bg-white border-y border-gray-200 py-8 sm:py-10">
                    <Reveal className="container mx-auto px-4 max-w-[1504px]">
                        <SectionHeading
                            title="Đa phương tiện & Phóng sự Pháp luật Lào Cai"
                            to={mediaTab === 'video' ? '/lao-cai-v3/video' : '/lao-cai-v3/infographic'}
                        >
                            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl" role="tablist">
                                {[{ key: 'video', label: 'Video & Phóng sự' }, { key: 'infographic', label: 'Infographic' }].map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        role="tab"
                                        aria-selected={mediaTab === tab.key}
                                        onClick={() => setMediaTab(tab.key)}
                                        className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${mediaTab === tab.key ? 'bg-white text-[#0f4c81] shadow-sm' : 'text-gray-500 hover:text-[#0f4c81]'}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </SectionHeading>

                        {mediaTab === 'video' ? (
                            <div key="media-video" className="bg-white rounded-2xl overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-3 shadow-sm lc3-text-in">
                                <Link to="/lao-cai-v3/video" className="lg:col-span-2 relative group aspect-video bg-black overflow-hidden block">
                                    <img
                                        key={`video-main-${activeVideo.id}`}
                                        src={activeVideo.thumb}
                                        alt={activeVideo.title}
                                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity lc3-kenburns"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="relative flex items-center justify-center">
                                            <span className="absolute w-16 h-16 rounded-full bg-red-600/60 lc3-ping" />
                                            <span className="relative w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all">
                                                <PlayCircle size={36} />
                                            </span>
                                        </span>
                                    </div>
                                    <div key={`video-text-${activeVideo.id}`} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 sm:p-6 text-left lc3-text-in">
                                        <span className="text-xs font-bold bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded uppercase mb-2 inline-block">
                                            Thời lượng: {activeVideo.duration}
                                        </span>
                                        <h3 className="text-white font-bold text-base sm:text-lg md:text-xl drop-shadow mb-1 line-clamp-2">{activeVideo.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">{activeVideo.desc}</p>
                                    </div>
                                </Link>

                                <div className="lg:col-span-1 p-4 flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-100">
                                        Phóng sự chuyên đề mới nhất
                                    </div>
                                    <div className="flex-1 space-y-1.5 pt-2">
                                        {videos.map((vid, idx) => {
                                            const isActive = idx === activeVideoIdx;
                                            return (
                                                <button
                                                    key={vid.id}
                                                    type="button"
                                                    onClick={() => setActiveVideoIdx(idx)}
                                                    aria-pressed={isActive}
                                                    className={`w-full text-left flex items-start gap-3 p-2 rounded-xl transition-colors group border ${isActive ? 'bg-blue-50/70 border-blue-200' : 'border-transparent hover:bg-gray-50'}`}
                                                >
                                                    <div className="w-[110px] shrink-0 relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                                                        <img src={vid.thumb} alt={vid.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        <div className={`absolute inset-0 flex items-center justify-center transition-colors ${isActive ? 'bg-[#0f4c81]/45' : 'bg-black/30 group-hover:bg-black/10'}`}>
                                                            <PlayCircle size={20} className="text-white drop-shadow" />
                                                        </div>
                                                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{vid.duration}</span>
                                                    </div>
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <h5 className={`font-semibold text-[13px] line-clamp-2 leading-snug transition-colors ${isActive ? 'text-[#0f4c81]' : 'text-gray-800 group-hover:text-[#0f4c81]'}`}>
                                                            {vid.title}
                                                        </h5>
                                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                                                            {isActive ? (
                                                                <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b] animate-pulse" /> Đang chọn
                                                                </span>
                                                            ) : (
                                                                <><Clock size={11} /> <span>{vid.date}</span></>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key="media-info" className="grid grid-cols-1 md:grid-cols-3 gap-6 lc3-text-in">
                                {laocaiV2MultimediaData.infographics.map((info) => (
                                    <Link
                                        key={info.id}
                                        to="/lao-cai-v3/infographic"
                                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:border-[#0f4c81]/40 flex flex-col group lc3-card"
                                    >
                                        <div className="relative overflow-hidden">
                                            <Image16x9 src={info.thumb} alt={info.title} />
                                            <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">Infographic</span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-[14px] sm:text-[15px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2 transition-colors">{info.title}</h3>
                                                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">{info.summary}</p>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                                                <span className="flex items-center gap-1"><Eye size={12} /> {info.views.toLocaleString('vi-VN')} lượt xem</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {info.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Reveal>
                </section>

                {/* ============================================================== */}
                {/* 10. THÔNG TIN LIÊN KẾT (giữ phong cách V2) */}
                {/* ============================================================== */}
                <section id="thong-tin-lien-ket" className="bg-white pb-10 pt-4">
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <Reveal>
                            <h2 className="text-2xl font-bold text-[#0f4c81] mb-2">Thông tin liên kết</h2>
                            <div className="lc3-heading-bar h-[3px] rounded-full bg-gradient-to-r from-amber-400 to-[#991b1b] mb-8" />
                        </Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-[1450px] mx-auto">
                            {laocaiV2ConnectedPortals.map((portal, index) => {
                                const Icon = PORTAL_LINK_ICONS[portal.id] || Landmark;
                                return (
                                    <Reveal key={portal.id} delay={(index % 4) * 80} className={index === 8 ? 'lg:col-start-2' : ''}>
                                        <a
                                            href={`https://${portal.domain}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-4 group p-2 -m-2 rounded-xl hover:bg-[#f0f5f9]/70 transition-colors"
                                        >
                                            <div className="bg-[#f0f5f9] text-[#0f4c81] p-3.5 rounded-xl group-hover:bg-[#0f4c81] group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                                                <Icon size={20} strokeWidth={2} />
                                            </div>
                                            <span className="font-bold text-[#0f4c81] text-[13px] leading-tight group-hover:text-blue-700 transition-colors">
                                                {portal.name}
                                            </span>
                                        </a>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer giữ nguyên như V2 */}
            <LaoCaiV3Footer />

            <FixedBottomCarousel
                title="Cổng Pháp Luật Tỉnh Lào Cai"
                items={LAOCAI_V2_CAROUSEL_ITEMS}
                defaultVisible={true}
            />
        </div>
    );
};

export default LaoCaiV3HomePage;

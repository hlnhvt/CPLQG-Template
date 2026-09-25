import React, { useState, useRef, useEffect } from 'react';
import {
    Clock,
    PlayCircle,
    Radio,
    Newspaper,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Scale,
    FileText,
    BookOpen,
    Building2,
    ExternalLink,
    MapPin,
    Tag,
    Download,
    CheckCircle2,
    Sparkles,
    Shield,
    Users,
    Smartphone,
    Share2,
    Eye,
    Pause,
    Play,
    Bell,
    Activity,
    GraduationCap,
    Video,
    PhoneCall,
    QrCode,
    Star,
    Award,
    Landmark,
    ShieldCheck,
    Gavel,
    Briefcase,
    Flag,
    MonitorSmartphone,
    Search,
    Layers,
    Lock,
    Zap,
    HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import LaoCaiV2NewlyIssuedDocs from '../../components/laocaiV2/LaoCaiV2NewlyIssuedDocs';
import {
    laocaiV2SiteConfig,
    luatThuDo2024Data,
    laocaiV2NewsHighlightsData,
    laocaiV2PoliciesAndLifeData,
    laocaiV2MultimediaData,
    laocaiV2NewsArticles,
    laocaiV2ConnectedPortals
} from '../../data/laocaiV2MockData';

// Icon cho từng cổng liên kết ở khối "Thông tin liên kết" (đồng bộ với PORTAL_ICONS của LaoCaiV2Hotline)
const PORTAL_LINK_ICONS = {
    'thanh-uy': Flag, hdnd: Landmark, ubnd: Building2, mttq: Users, 'so-tu-phap': Scale,
    'dich-vu-cong': MonitorSmartphone, congan: ShieldCheck, toaan: Gavel, 'doan-luat-su': Briefcase
};

export const LAOCAI_NEWS_CATEGORIES = [
    { label: 'Tất cả tin tức', path: '#tin-tuc-noi-bat' },
    { label: 'Chỉ đạo điều hành', path: '#thoi-su-tu-phap' },
    { label: 'Văn bản & Dự thảo', path: '#van-ban-du-thao' },
    { label: 'Chính sách & Cuộc sống', path: '#chinh-sach-cuoc-song' },
    { label: 'PBGDPL & Thượng tôn pháp luật', path: '#pho-bien-giao-duc' },
    { label: 'Đa phương tiện & Infographic', path: '#da-phuong-tien' },
];

const LAOCAI_FEATURED_SLIDES = [
    {
        id: 1,
        badge: "TIN NỔI BẬT",
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
        badge: "TIN NỔI BẬT",
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
        badge: "TIN NỔI BẬT",
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
        badge: "TIN NỔI BẬT",
        subBadge: "DỊCH VỤ CÔNG TRỰC TUYẾN",
        title: "CỔNG DỊCH VỤ CÔNG TỈNH LÀO CAI: TIẾP NHẬN VÀ XỬ LÝ ĐÚNG HẠN 100% PHẢN ÁNH, KIẾN NGHỊ VỀ THỦ TỤC TƯ PHÁP",
        summary: "Quy chế tiếp nhận phản ánh, kiến nghị qua Cổng Dịch vụ công tỉnh đã giúp rút ngắn đáng kể thời gian xử lý thủ tục hành chính tư pháp. Mọi kiến nghị của người dân đều được phân luồng đến cơ quan có thẩm quyền và công khai tiến độ trên môi trường số.",
        image: "/thumb3.png",
        date: "18/03/2026",
        agency: "VĂN PHÒNG UBND TỈNH LÀO CAI",
        link: "/lao-cai-v2/lien-he"
    }
];

const LAOCAI_BOTTOM_FEATURE_CARDS = [
    {
        id: 1,
        badge: "NQ 05/2026/NQ-HĐND",
        title: "Chính sách khuyến khích đầu tư hạ tầng logistics và thương mại biên mậu tại Khu kinh tế cửa khẩu Lào Cai",
        summary: "HĐND tỉnh Lào Cai ban hành chính sách hỗ trợ tiền thuê đất, đầu tư kho bãi và dịch vụ logistics cho doanh nghiệp tại khu vực cửa khẩu giai đoạn 2026-2030.",
        image: "/thumb2.png",
        date: "15/02/2026",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: 2,
        badge: "DỊCH VỤ CÔNG",
        title: "UBND tỉnh ban hành Quy chế tiếp nhận, xử lý và phản hồi phản ánh, kiến nghị qua Cổng Dịch vụ công tỉnh",
        summary: "Quy định rõ trách nhiệm, thời hạn xử lý của các sở, ngành và UBND xã, phường đối với phản ánh của người dân về thủ tục hành chính, tư pháp trên địa bàn tỉnh.",
        image: "/thumb3.png",
        date: "22/11/2025",
        link: "/lao-cai-v2/lien-he"
    },
    {
        id: 3,
        badge: "DU LỊCH SA PA",
        title: "Quy định mức thu và quản lý phí tham quan danh lam thắng cảnh tại khu du lịch quốc gia Sa Pa",
        summary: "Công khai mức thu, đối tượng miễn, giảm và cơ chế sử dụng nguồn thu để tái đầu tư bảo tồn cảnh quan, hỗ trợ cộng đồng các bản du lịch Cát Cát, Tả Van, Lao Chải.",
        image: "/thumb1.png",
        date: "10/07/2025",
        link: "/lao-cai-v2/van-ban"
    }
];

const LAOCAI_ACTIVITY_NEWS = {
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
        {
            id: "ACT-02",
            title: "Sở Tư pháp Lào Cai tập huấn nghiệp vụ theo dõi thi hành pháp luật năm 2026 cho hơn 500 cán bộ tư pháp cơ sở",
            date: "21/03/2026",
            badge: "Tập huấn nghiệp vụ",
            image: "/thumb2.png",
            link: "/lao-cai-v2/pho-bien-giao-duc"
        },
        {
            id: "ACT-03",
            title: "Hội đồng PBGDPL tỉnh phát động chiến dịch truyền thông pháp luật song ngữ tại các thôn, bản vùng cao",
            date: "20/03/2026",
            badge: "Phổ biến, giáo dục",
            image: "/thumb3.png",
            link: "/lao-cai-v2/pho-bien-giao-duc"
        },
        {
            id: "ACT-04",
            title: "Tọa đàm tháo gỡ khó khăn pháp lý cho hơn 300 doanh nghiệp, hợp tác xã nông nghiệp và du lịch trên địa bàn tỉnh",
            date: "18/03/2026",
            badge: "Hỗ trợ pháp lý DN",
            image: "/thumb1.png",
            link: "/lao-cai-v2/pho-bien-giao-duc"
        }
    ]
};

const LAOCAI_ANNOUNCEMENTS = [
    {
        id: "TB-01",
        day: "22",
        month: "Th03",
        badge: "Lịch tiếp dân",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "Thông báo số 86/TB-UBND: Lịch tiếp công dân định kỳ tháng 04/2026 của Lãnh đạo UBND tỉnh Lào Cai",
        agency: "Văn phòng UBND tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban",
        isHot: true
    },
    {
        id: "TB-02",
        day: "20",
        month: "Th03",
        badge: "Hội nghị",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        title: "Thông báo số 45/TB-STP: Kế hoạch tổ chức Hội nghị phổ biến các văn bản QPPL mới ban hành quý I/2026",
        agency: "Sở Tư pháp tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "TB-03",
        day: "18",
        month: "Th03",
        badge: "Dịch vụ công",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Thông báo vận hành thử nghiệm phân hệ số hóa hồ sơ tư pháp điện tử trên Cổng Dịch vụ công tỉnh Lào Cai",
        agency: "Trung tâm Phục vụ hành chính công tỉnh",
        link: "/lao-cai-v2/lien-he",
        isHot: true
    },
    {
        id: "TB-04",
        day: "15",
        month: "Th03",
        badge: "Lấy ý kiến",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "Thông báo số 120/TB-HĐND: Lấy ý kiến nhân dân đối với Dự thảo Nghị quyết hỗ trợ phát triển dược liệu dưới tán rừng",
        agency: "HĐND tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "TB-05",
        day: "12",
        month: "Th03",
        badge: "Trợ giúp pháp lý",
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        title: "Thông báo tiếp nhận hồ sơ trợ giúp pháp lý lưu động đợt 1/2026 tại các xã vùng cao, biên giới tỉnh Lào Cai",
        agency: "Trung tâm TGPL Nhà nước tỉnh",
        link: "/lao-cai-v2/pho-bien-giao-duc"
    },
    {
        id: "TB-06",
        day: "10",
        month: "Th03",
        badge: "Công chứng số",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        title: "Thông báo số 38/TB-STP: Danh sách tổ chức hành nghề công chứng đủ điều kiện tham gia mạng lưới chứng thực số điện tử",
        agency: "Sở Tư pháp tỉnh Lào Cai",
        link: "/lao-cai-v2/van-ban"
    },
    {
        id: "TB-07",
        day: "08",
        month: "Th03",
        badge: "Kiểm tra",
        badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
        title: "Thông báo số 25/TB-HĐPH: Kế hoạch kiểm tra công tác hòa giải ở cơ sở và đánh giá chuẩn tiếp cận pháp luật năm 2026",
        agency: "Hội đồng phối hợp PBGDPL tỉnh",
        link: "/lao-cai-v2/van-ban",
        isHot: false
    },
    {
        id: "TB-08",
        day: "05",
        month: "Th03",
        badge: "Tuyển chọn",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Thông báo tuyển chọn báo cáo viên pháp luật cấp tỉnh và cộng tác viên trợ giúp pháp lý nhiệm kỳ 2026 - 2030",
        agency: "Sở Tư pháp tỉnh Lào Cai",
        link: "/lao-cai-v2/pho-bien-giao-duc",
        isHot: true
    },
    {
        id: "TB-09",
        day: "01",
        month: "Th03",
        badge: "Cuộc thi",
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
        title: "Thông báo số 18/TB-UBND: Triển khai cuộc thi trực tuyến 'Tìm hiểu pháp luật về bảo vệ và phát triển rừng tỉnh Lào Cai năm 2026'",
        agency: "UBND tỉnh Lào Cai",
        link: "/lao-cai-v2/pho-bien-giao-duc"
    }
];

const SubNavigator = ({ activeLabel = 'Tất cả tin tức' }) => {
    const scrollRef = useRef(null);
    const [showArrow, setShowArrow] = useState(true);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowArrow(scrollLeft + clientWidth < scrollWidth - 8);
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[40]">
            <div className="container mx-auto px-4 max-w-[1504px]">
                <div className="flex items-center h-12">
                    <div className="shrink-0 pr-3.5 border-r border-gray-200 flex items-center gap-2 text-[#0f4c81] font-bold text-xs uppercase tracking-wider">
                        <Newspaper size={17} />
                        <span className="hidden sm:inline">Chuyên mục tin</span>
                    </div>
                    <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-x-auto flex items-center gap-1.5 px-3" style={{ scrollbarWidth: 'none' }}>
                        {LAOCAI_NEWS_CATEGORIES.map((cat) => {
                            const isActive = cat.label === activeLabel;
                            return (
                                <a
                                    key={cat.label}
                                    href={cat.path}
                                    className={`whitespace-nowrap text-[13px] font-medium px-3.5 py-2.5 border-b-2 transition-all shrink-0 rounded-t ${isActive
                                        ? 'border-[#0f4c81] text-[#0f4c81] font-bold bg-blue-50/50'
                                        : 'border-transparent text-gray-600 hover:text-[#0f4c81] hover:bg-gray-50'
                                        }`}
                                >
                                    {cat.label}
                                </a>
                            );
                        })}
                    </div>
                    {showArrow && (
                        <button onClick={scrollRight} className="shrink-0 pl-2 border-l border-gray-200 text-gray-400 hover:text-[#0f4c81] transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-video w-full relative overflow-hidden bg-gray-100 ${className}`}>
        <img
            src={src}
            alt={alt}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
    </div>
);

const LaoCaiV2HomePage = () => {
    const [mediaTab, setMediaTab] = useState('video');

    useEffect(() => {
        document.title = "Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    const activeSlideData = LAOCAI_FEATURED_SLIDES[0];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans flex flex-col selection:bg-blue-600 selection:text-white">
            <LaoCaiV2Header />

            {/* BANNER GIỚI THIỆU: MÀU GRADIENT INDIGO HOÀNG GIA (#4f56ca -> #2c1b92 -> #4f56ca) */}
            {/* Banner rộng tối đa 1472px, bo góc, có khoảng cách với mép màn hình */}
            <div className="px-4 pt-4 sm:pt-5">
            <div className="w-full max-w-[1472px] mx-auto rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white py-5 sm:py-6 md:py-6.5 border border-indigo-400/30 shadow-lg shadow-indigo-900/20">
                {/* CSS Keyframes riêng biệt tạo hiệu ứng động mượt mà, dịu mắt và có chiều sâu */}
                <style>{`
                    @keyframes laocaiV2RotateCW {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes laocaiV2RotateCCW {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                    @keyframes laocaiV2PulseGlow {
                        0%, 100% { opacity: 0.15; transform: scale(0.95); }
                        50% { opacity: 0.38; transform: scale(1.12); }
                    }
                    @keyframes laocaiV2FloatDiamond {
                        0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); }
                        50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); }
                    }
                    @keyframes laocaiV2SweepLight {
                        0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; }
                        25% { opacity: 0.32; }
                        70% { opacity: 0.32; }
                        100% { transform: translateX(260%) skewX(-25deg); opacity: 0; }
                    }
                    @keyframes laocaiV2SlideInFromLeft {
                        0% {
                            transform: translateX(-100%);
                            opacity: 0;
                        }
                        20% {
                            opacity: 0.5;
                        }
                        100% {
                            transform: translateX(0%);
                            opacity: 1;
                        }
                    }
                    @keyframes laocaiV2SlideOutToRight {
                        0% {
                            transform: translateX(0%);
                            opacity: 1;
                        }
                        80% {
                            opacity: 0.3;
                        }
                        100% {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                    }
                    @keyframes laocaiV2SlideFadeIn {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes laocaiV2ImageFadeIn {
                        0% { opacity: 0.35; transform: scale(1.04); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes laocaiV2VerticalTicker {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-50%); }
                    }
                    @keyframes laocaiV2EntranceFadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(24px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes laocaiV2EntranceFadeDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes laocaiV2EntranceZoomIn {
                        from {
                            opacity: 0;
                            transform: scale(0.96);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    @keyframes laocaiV2BadgeShine {
                        0%, 100% { opacity: 0.95; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.06); filter: drop-shadow(0 0 5px rgba(220, 38, 38, 0.65)); }
                    }
                    .laocaiV2-animate-fade-up {
                        animation: laocaiV2EntranceFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }
                    .laocaiV2-animate-fade-down {
                        animation: laocaiV2EntranceFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }
                    .laocaiV2-animate-zoom-in {
                        animation: laocaiV2EntranceZoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }
                    .laocaiV2-card-interactive {
                        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .laocaiV2-card-interactive:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
                    }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ, êm dịu (Soft Ambient Dot-Matrix) */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 3. Quầng sáng công nghệ lan tỏa dịu nhẹ (Soft Ambient Glow) */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn (Slim Rotating Orbits) */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" />

                {/* 5. Điểm nhấn kim cương ánh kim thanh thoát (Delicate Floating Diamonds) */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" />
                <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/50 border border-amber-200/40 rounded-sm pointer-events-none" />

                <div className="container mx-auto px-4 max-w-[1504px] relative z-10 flex flex-col items-center text-center">
                    {/* Logo Quốc huy ngay phía trên tiêu đề Cổng */}
                    <div className="mb-1.5 sm:mb-2">
                        <img
                            src="/logo.png"
                            alt="Quốc huy"
                            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain drop-shadow-xl hover:scale-105 transition-transform"
                        />
                    </div>

                    {/* Tiêu đề chính vừa vặn, thanh lịch */}
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold tracking-tight text-white uppercase leading-tight drop-shadow-md">
                        Cổng Pháp luật tỉnh Lào Cai
                    </h1>

                    {/* Vạch trang trí hoàng kim tinh tế */}
                    <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5 sm:my-2 rounded-full" />

                    {/* Slogan tóm tắt cân đối chính xác trong 2 dòng */}
                    {/* <p className="text-xs sm:text-sm md:text-[14.5px] text-blue-100/90 leading-relaxed max-w-2xl text-center font-normal drop-shadow-sm">
                        Nền tảng số thống nhất phục vụ tra cứu văn bản quy phạm pháp luật, phổ biến, giáo dục pháp luật,
                        <br className="hidden md:inline" />
                        {' '}trợ giúp pháp lý và đồng hành cùng người dân, doanh nghiệp Lào Cai.
                    </p> */}
                </div>
            </div>
            </div>

            <main className="flex-1 pb-16 space-y-4 sm:space-y-5">
                {/* 1. KHỐI TIN TIÊU ĐIỂM CHÍNH SÁCH - TRÀN TOÀN BỘ CHIỀU NGANG + SLIDE 10S */}
                <section id="tin-tuc-noi-bat" className="w-full relative bg-white border-b border-gray-200 py-8 sm:py-10">
                    <div className="container mx-auto px-4 max-w-[1504px] relative z-10">
                        {/* Phần trên: Slide tin tiêu điểm với mũi tên điều hướng ở hai bên ngoài ảnh */}
                        <div className="relative group px-3 sm:px-6 lg:px-8">
                            {/* Khung chứa các slide trượt chậm dãi mượt mà từ trái qua phải */}
                            <div className="relative overflow-hidden w-full rounded-2xl">
                                <div className="grid grid-cols-1 grid-rows-1 w-full items-stretch">
                                    {[LAOCAI_FEATURED_SLIDES[0]].map((slide) => {
                                        return (
                                            <div key={slide.id} className="col-start-1 row-start-1 w-full">
                                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                                                    {/* Cột trái: Ảnh minh họa (Không có nút điều hướng bên trong ảnh) */}
                                                    <div className="lg:col-span-5 relative overflow-hidden rounded-xl shadow-md border border-amber-300/50 bg-white flex flex-col justify-center">
                                                        <div className="aspect-[16/10] w-full h-full relative overflow-hidden bg-gray-100">
                                                            <img
                                                                src={slide.image}
                                                                alt={slide.title}
                                                                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Cột phải: Dàn đều nội dung theo chiều cao của ảnh thumbnail */}
                                                    <div className="lg:col-span-7 flex flex-col justify-between py-0.5 lg:py-1">
                                                        <div className="flex flex-col space-y-3 lg:space-y-3.5 pt-0">
                                                            {/* Thời gian */}
                                                            <div className="flex items-center gap-2 text-sm sm:text-[14.5px] text-amber-950 font-semibold">
                                                                <Clock size={16} className="text-amber-700" />
                                                                <span>{slide.date}</span>
                                                            </div>

                                                            {/* Tiêu đề đỏ mận đậm */}
                                                            <Link to={slide.link} className="block group/title">
                                                                <h3 className="text-xl sm:text-2xl lg:text-[27px] font-bold text-black transition-colors leading-[1.35] uppercase tracking-tight">
                                                                    {slide.title}
                                                                </h3>
                                                            </Link>

                                                            {/* Tóm tắt */}
                                                            <p className="text-gray-700 text-sm sm:text-base lg:text-[16px] font-normal leading-relaxed line-clamp-4 pt-2 sm:pt-2.5">
                                                                {slide.summary}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Phần dưới: 3 Thẻ tin tức nổi khối 3D màu vàng nhạt nhẹ nhàng hơn background */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-6 pt-6 border-t border-amber-400/60">
                            {LAOCAI_BOTTOM_FEATURE_CARDS.map((card) => (
                                <Link
                                    key={card.id}
                                    to={card.link}
                                    className="bg-white rounded-2xl p-3.5 border border-gray-200 hover:border-amber-400 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start gap-3.5 group cursor-pointer relative overflow-hidden"
                                >
                                    {/* Viền đỉnh nhấn ánh vàng hổ phách nổi khối */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                    {/* Thumbnail bên trái nổi bật */}
                                    <div className="w-24 h-20 sm:w-28 sm:h-22 flex-shrink-0 rounded-xl overflow-hidden bg-white/80 border border-gray-200 shadow-sm relative">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Nội dung bên phải */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold mb-1">
                                                <Clock size={12} className="text-[#a81c1c]" />
                                                <span>{card.date}</span>
                                            </div>
                                            <h4 className="font-bold text-[13.5px] sm:text-[14px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2 mb-1">
                                                {card.title}
                                            </h4>
                                            <p className="text-[12px] text-gray-700 line-clamp-2 leading-relaxed font-normal">
                                                {card.summary}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* KHỐI TIN HOẠT ĐỘNG (70%) & BẢNG DANH SÁCH THÔNG BÁO (30%) */}
                <section
                    id="tin-hoat-dong-thong-bao"
                    className="w-full max-w-[1504px] mx-auto px-4 laocaiV2-animate-fade-up"
                    style={{ animationDelay: '0.15s' }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-7 items-stretch">
                        {/* CỘT TRÁI (70%): KHỐI TIN HOẠT ĐỘNG */}
                        <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between lg:h-[485px]">
                            {/* Header Khối Tin Hoạt Động: tiêu đề chữ đơn giản, không nền màu */}
                            <div className="flex justify-between items-center gap-2 mb-3 pb-2.5 border-b border-gray-200 shrink-0">
                                <h2 className="text-base sm:text-lg md:text-[20px] font-bold text-[#0f4c81]">
                                    Tin Hoạt Động
                                </h2>
                                <Link
                                    to="/lao-cai-v2/pho-bien-giao-duc"
                                    className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                                >
                                    <span>Xem tất cả</span>
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>

                            {/* Tin hoạt động tiêu điểm lớn (Featured Activity - kích thước gọn gàng vừa vặn) */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3 pb-3 border-b border-gray-100 group">
                                <div className="md:col-span-4 rounded-xl overflow-hidden bg-gray-100 h-[140px] sm:h-[148px] relative shadow-xs">
                                    <img
                                        src={LAOCAI_ACTIVITY_NEWS.featured.image}
                                        alt={LAOCAI_ACTIVITY_NEWS.featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-2 left-2 bg-[#991b1b] text-white text-[10.5px] font-bold px-2 py-0.5 rounded shadow">
                                        {LAOCAI_ACTIVITY_NEWS.featured.badge}
                                    </span>
                                </div>
                                <div className="md:col-span-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-xs text-amber-950 font-semibold mb-1">
                                        <Clock size={13} className="text-[#a81c1c]" />
                                        <span>{LAOCAI_ACTIVITY_NEWS.featured.date}</span>
                                    </div>
                                    <Link to={LAOCAI_ACTIVITY_NEWS.featured.link}>
                                        <h3 className="font-bold text-base sm:text-[16.5px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug mb-1 line-clamp-2">
                                            {LAOCAI_ACTIVITY_NEWS.featured.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-normal">
                                        {LAOCAI_ACTIVITY_NEWS.featured.summary}
                                    </p>
                                </div>
                            </div>

                            {/* 3 Tin hoạt động tiếp theo (3 Sub Activity Cards - chiều cao chuẩn, thumbnail gọn) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {LAOCAI_ACTIVITY_NEWS.subList.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className="group/sub flex flex-col bg-gray-50/70 hover:bg-red-50/40 p-2 rounded-xl border border-gray-100 hover:border-red-200 transition-all shadow-none hover:shadow-xs laocaiV2-card-interactive"
                                    >
                                        <div className="h-[86px] w-full rounded-lg overflow-hidden bg-gray-200 mb-1.5 relative">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute bottom-1 left-1 bg-black/65 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.2 rounded">
                                                {item.badge}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                                            <Clock size={11} className="text-gray-400" />
                                            <span>{item.date}</span>
                                        </div>
                                        <h4 className="font-bold text-[12.5px] sm:text-[13px] text-gray-900 group-hover/sub:text-[#991b1b] transition-colors leading-snug line-clamp-2">
                                            {item.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CỘT PHẢI (30%): BẢNG DANH SÁCH THÔNG BÁO (HIỆU ỨNG TRÔI TIN TỪ TỪ - KHÔNG TRỐNG ĐOẠN DƯỚI) */}
                        <div className="lg:col-span-3 bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm relative overflow-hidden flex flex-col lg:h-[485px]">
                            {/* Viền đỉnh màu vàng gold sang trọng */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                            {/* Header Bảng Thông Báo: tiêu đề chữ đơn giản, không nền màu */}
                            <div className="flex justify-between items-center gap-2 mb-2.5 pb-2.5 border-b border-gray-200 shrink-0">
                                <h2 className="text-base sm:text-lg md:text-[19px] font-bold text-[#0f4c81]">
                                    Thông Báo
                                </h2>
                                <Link
                                    to="/lao-cai-v2/van-ban"
                                    className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                                >
                                    <span>Xem tất cả</span>
                                    <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>

                            {/* Danh sách thông báo tĩnh, cuộn dọc bằng thanh scroll thay vì hiệu ứng trôi tự động */}
                            <div className="relative flex-1 min-h-0 overflow-y-auto custom-scrollbar-light pr-1">
                                <div className="divide-y divide-gray-100">
                                    {LAOCAI_ANNOUNCEMENTS.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.link}
                                            className="group flex items-start gap-2.5 py-2.5 hover:bg-amber-50/60 px-1.5 rounded-lg transition-colors"
                                        >
                                            {/* Block Ngày Tháng */}
                                            <div className="w-9 h-10 rounded-lg bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200/90 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                                                <span className="text-[13.5px] font-bold text-[#991b1b] leading-none">
                                                    {item.day}
                                                </span>
                                                <span className="text-[9px] font-semibold text-gray-500 uppercase leading-tight mt-0.5">
                                                    {item.month}
                                                </span>
                                            </div>

                                            {/* Chi tiết thông báo - Bỏ badge phân loại, chữ to rõ ràng */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[12.5px] sm:text-[13px] font-semibold text-gray-900 group-hover:text-[#991b1b] leading-snug line-clamp-2 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500">
                                                    <span className="truncate">{item.agency}</span>
                                                    {item.isHot && (
                                                        <span className="bg-red-500 text-white text-[8.5px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0 laocaiV2-badge-pulse">
                                                            Mới
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. KHỐI VĂN BẢN MỚI BAN HÀNH & DỰ THẢO VBQPPL (GIỐNG HỆT CỔNG QUỐC GIA) */}
                <LaoCaiV2NewlyIssuedDocs />

                {/* 3. CHUYÊN MỤC TIN TỨC: THỜI SỰ TƯ PHÁP & CHỈ ĐẠO ĐIỀU HÀNH LÀO CAI (LAYOUT 4 CỘT CHUẨN CỔNG QUỐC GIA) */}
                <section id="thoi-su-tu-phap" className="py-1 laocaiV2-animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                            {/* Header Khối Thời sự Tư pháp: tiêu đề chữ đơn giản, không nền màu */}
                            <div className="flex justify-between items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                                    Thời sự Tư pháp & Chỉ đạo điều hành
                                </h2>
                                <Link
                                    to="/lao-cai-v2/pho-bien-giao-duc"
                                    className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                                >
                                    <span>Xem tất cả</span>
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Cột Trái: 4 tin ngắn */}
                                <div className="lg:col-span-1 flex flex-col space-y-4">
                                    {laocaiV2NewsHighlightsData.leftArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            to="/lao-cai-v2/pho-bien-giao-duc"
                                            className="flex items-start gap-3.5 group border-b border-gray-100 pb-4 last:border-0 last:pb-0 hover:bg-gray-50/50 p-1 rounded-lg transition"
                                        >
                                            <div className="w-[100px] shrink-0">
                                                <Image16x9
                                                    src={article.thumb}
                                                    alt={article.title}
                                                    className="rounded-lg shadow-sm"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <h3 className="font-bold text-[13px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-3 leading-snug">
                                                    {article.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                                    <Clock size={11} /> <span>{article.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Cột Giữa: 1 tin lớn tiêu điểm thời sự */}
                                <Link
                                    to="/lao-cai-v2/pho-bien-giao-duc"
                                    className="lg:col-span-2 group flex flex-col bg-slate-50/60 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition"
                                >
                                    <div className="w-full mb-4 shrink-0 overflow-hidden rounded-xl">
                                        <Image16x9
                                            src={laocaiV2NewsHighlightsData.mainArticle.thumb}
                                            alt={laocaiV2NewsHighlightsData.mainArticle.title}
                                            className="rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1.5">
                                            {laocaiV2NewsHighlightsData.mainArticle.category}
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-bold text-[#0f4c81] group-hover:text-blue-700 mb-2.5 leading-snug">
                                            {laocaiV2NewsHighlightsData.mainArticle.title}
                                        </h3>
                                        <p className="text-gray-600 text-[14px] mb-4 line-clamp-3 leading-relaxed">
                                            {laocaiV2NewsHighlightsData.mainArticle.summary}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-200/60">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={13} className="text-[#0f4c81]" />
                                                <span className="font-medium text-gray-600">{laocaiV2NewsHighlightsData.mainArticle.date}</span>
                                            </div>
                                            <span className="text-[#0f4c81] font-bold text-xs flex items-center gap-1">
                                                Đọc toàn văn <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Cột Phải: 2 tin phân tích chuyên đề */}
                                <div className="lg:col-span-1 flex flex-col space-y-6">
                                    {laocaiV2NewsHighlightsData.rightArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            to="/lao-cai-v2/pho-bien-giao-duc"
                                            className="group flex flex-col border-b border-gray-100 pb-5 last:border-0 last:pb-0 hover:bg-gray-50/50 p-2 rounded-lg transition"
                                        >
                                            <div className="w-full mb-3 shrink-0 overflow-hidden rounded-lg">
                                                <Image16x9
                                                    src={article.thumb}
                                                    alt={article.title}
                                                    className="rounded-lg shadow-sm"
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#0f4c81] mb-2 leading-snug line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2">
                                                    {article.summary}
                                                </p>
                                                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                                    <Clock size={11} /> <span>{article.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. CHUYÊN MỤC: CHÍNH SÁCH & CUỘC SỐNG LÀO CAI (LAYOUT 2 CỘT CHUẨN CỔNG QUỐC GIA) */}
                <section id="chinh-sach-cuoc-song" className="py-1 laocaiV2-animate-fade-up" style={{ animationDelay: '0.22s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                            {/* Header Khối Chính sách & Cuộc sống: tiêu đề chữ đơn giản, không nền màu */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 mb-4 pb-3 border-b border-gray-200">
                                <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                                    Chính sách & Cuộc sống Lào Cai
                                </h2>
                                <span className="text-xs text-gray-500 font-medium">
                                    Đưa pháp luật vào đời sống sinh hoạt của nhân dân Lào Cai
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Tin tiêu điểm (Cột trái) */}
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition h-full flex flex-col group laocaiV2-card-interactive">
                                    <div className="relative w-full aspect-video overflow-hidden shrink-0">
                                        <Image16x9
                                            src={laocaiV2PoliciesAndLifeData.featured.image}
                                            alt={laocaiV2PoliciesAndLifeData.featured.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
                                        <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
                                            {laocaiV2PoliciesAndLifeData.featured.agency}
                                        </div>
                                        <Link to="/lao-cai-v2/pho-bien-giao-duc">
                                            <h3 className="font-bold text-[#0f4c81] text-lg sm:text-xl line-clamp-2 leading-snug mb-3 hover:text-blue-700 transition">
                                                {laocaiV2PoliciesAndLifeData.featured.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-[14px] line-clamp-3 leading-relaxed mb-4">
                                            {laocaiV2PoliciesAndLifeData.featured.description}
                                        </p>
                                        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md">
                                                <Clock size={13} className="text-[#0f4c81]" />
                                                <span className="font-medium">{laocaiV2PoliciesAndLifeData.featured.date}</span>
                                            </div>
                                            <Link to="/lao-cai-v2/pho-bien-giao-duc" className="text-[#0f4c81] font-bold hover:underline flex items-center gap-1">
                                                Đọc tiếp <ArrowRight size={13} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Danh sách 4 tin ngang (Cột phải) */}
                                <div className="flex flex-col gap-3.5 h-full">
                                    {laocaiV2PoliciesAndLifeData.list.map((item) => (
                                        <Link
                                            key={item.id}
                                            to="/lao-cai-v2/pho-bien-giao-duc"
                                            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-row p-3 items-center gap-4 group flex-1 laocaiV2-card-interactive"
                                        >
                                            <div className="w-[140px] sm:w-[165px] shrink-0 overflow-hidden rounded-lg">
                                                <Image16x9
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="rounded-lg shadow-sm"
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-grow py-0.5">
                                                <h4 className="font-bold text-[#0f4c81] text-[13px] sm:text-[14px] line-clamp-2 leading-snug mb-1.5 group-hover:text-blue-700 transition">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2 hidden sm:block">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                                    <Clock size={12} /> <span>{item.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. CHUYÊN MỤC: PHỔ BIẾN, GIÁO DỤC PHÁP LUẬT & ĐỜI SỐNG THƯỢNG TÔN PHÁP LUẬT */}
                <section id="pho-bien-giao-duc" className="py-1 laocaiV2-animate-fade-up" style={{ animationDelay: '0.28s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                            {/* Header Khối Phổ biến, giáo dục pháp luật: tiêu đề chữ đơn giản, không nền màu */}
                            <div className="flex justify-between items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                                <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                                    Phổ biến, giáo dục pháp luật Lào Cai
                                </h2>
                                <Link
                                    to="/lao-cai-v2/pho-bien-giao-duc"
                                    className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                                >
                                    <span>Khám phá chuyên trang</span>
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {laocaiV2NewsArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        to="/lao-cai-v2/pho-bien-giao-duc"
                                        className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col group laocaiV2-card-interactive"
                                    >
                                        <div className="relative overflow-hidden">
                                            <Image16x9 src={article.thumb} alt={article.title} className="group-hover:scale-105 transition-transform duration-500" />
                                            <span className="absolute top-3 left-3 bg-[#0f4c81]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                                                {article.category}
                                            </span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                                                    {article.summary}
                                                </p>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                                                <span>{article.author}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CHUYÊN MỤC: ĐA PHƯƠNG TIỆN - TRUYỀN HÌNH, PHÓNG SỰ & INFOGRAPHIC PHÁP LUẬT LÀO CAI */}
                <section id="da-phuong-tien" className="w-full bg-white border-y border-gray-200 py-8 sm:py-10">
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        {/* Header Khối Đa phương tiện: tiêu đề chữ đơn giản, không nền màu */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-200">
                                <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                                    Đa phương tiện & Phóng sự Pháp luật Lào Cai
                                </h2>
                                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setMediaTab('video')}
                                        className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${mediaTab === 'video'
                                            ? 'bg-white text-[#0f4c81] shadow-sm'
                                            : 'text-gray-500 hover:text-[#0f4c81]'
                                            }`}
                                    >
                                        Video & Phóng sự
                                    </button>
                                    <button
                                        onClick={() => setMediaTab('infographic')}
                                        className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${mediaTab === 'infographic'
                                            ? 'bg-white text-[#0f4c81] shadow-sm'
                                            : 'text-gray-500 hover:text-[#0f4c81]'
                                            }`}
                                    >
                                        Infographic Chính sách
                                    </button>
                                </div>
                            </div>

                            {mediaTab === 'video' ? (
                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-3 shadow-sm">
                                    {/* Video Player chính */}
                                    <div className="lg:col-span-2 relative group aspect-video bg-black overflow-hidden shadow-sm block cursor-pointer">
                                        <img
                                            src={laocaiV2MultimediaData.videos[0].thumb}
                                            alt="Video Cover HN"
                                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all">
                                                <PlayCircle size={36} className="ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-left">
                                            <span className="text-xs font-bold bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded uppercase mb-2 inline-block">
                                                Thời lượng: {laocaiV2MultimediaData.videos[0].duration}
                                            </span>
                                            <h3 className="text-white font-bold text-lg md:text-xl drop-shadow mb-1">
                                                {laocaiV2MultimediaData.videos[0].title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                                                {laocaiV2MultimediaData.videos[0].desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Playlist bên phải */}
                                    <div className="lg:col-span-1 p-4 h-full flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-gray-200 divide-y divide-gray-100">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2">
                                            Phóng sự chuyên đề mới nhất
                                        </div>
                                        <div className="flex-1 overflow-y-auto space-y-3 pt-2">
                                            {laocaiV2MultimediaData.videos.map((vid) => (
                                                <div key={vid.id} className="flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-gray-50 group cursor-pointer">
                                                    <div className="w-[110px] shrink-0 relative aspect-video overflow-hidden rounded-lg bg-gray-200 border border-gray-200">
                                                        <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                                            <PlayCircle size={20} className="text-white drop-shadow" />
                                                        </div>
                                                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                                                            {vid.duration}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <h5 className="font-semibold text-[13px] line-clamp-2 leading-snug text-gray-800 group-hover:text-[#0f4c81]">
                                                            {vid.title}
                                                        </h5>
                                                        <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                                                            <Clock size={11} /> <span>{vid.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {laocaiV2MultimediaData.infographics.map((info) => (
                                        <div key={info.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0f4c81]/50 transition flex flex-col group cursor-pointer laocaiV2-card-interactive">
                                            <div className="relative aspect-video overflow-hidden">
                                                <img src={info.thumb} alt={info.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                                                    Infographic
                                                </span>
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-[14px] sm:text-[15px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">
                                                        {info.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                                                        {info.summary}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                                                    <span className="flex items-center gap-1"><Eye size={12} /> {info.views} lượt xem</span>
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {info.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </section>

                {/* 8. THÔNG TIN LIÊN KẾT: cùng phong cách với Cổng Pháp luật quốc gia (LinkedPortals) */}
                <section id="thong-tin-lien-ket" className="bg-white pb-10 pt-10">
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <h2 className="text-2xl font-bold text-[#0f4c81] mb-10">
                            Thông tin liên kết
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 max-w-[1450px] mx-auto px-4 md:px-0">
                            {laocaiV2ConnectedPortals.map((portal) => {
                                const Icon = PORTAL_LINK_ICONS[portal.id] || Landmark;
                                return (
                                    <a
                                        key={portal.id}
                                        href={`https://${portal.domain}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-4 group transition"
                                    >
                                        <div className="bg-[#f0f5f9] text-[#0f4c81] p-3.5 rounded-xl group-hover:bg-[#0f4c81] group-hover:text-white transition-colors duration-300">
                                            <Icon size={20} strokeWidth={2} />
                                        </div>
                                        <span className="font-bold text-[#0f4c81] text-[13px] leading-tight group-hover:text-blue-700 transition-colors">
                                            {portal.name}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2HomePage;


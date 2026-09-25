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
    Search,
    Layers,
    Lock,
    Zap,
    HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import HanoiNewlyIssuedDocs from '../../components/hanoi/HanoiNewlyIssuedDocs';
import HanoiHotline from '../../components/hanoi/HanoiHotline';
import {
    hanoiSiteConfig,
    luatThuDo2024Data,
    hanoiNewsHighlightsData,
    hanoiPoliciesAndLifeData,
    hanoiMultimediaData,
    hanoiNewsArticles,
    hanoiConnectedPortals
} from '../../data/hanoiMockData';

export const HANOI_NEWS_CATEGORIES = [
    { label: 'Tất cả tin tức', path: '#tin-tuc-noi-bat' },
    { label: 'Chỉ đạo điều hành', path: '#thoi-su-tu-phap' },
    { label: 'Văn bản & Dự thảo', path: '#van-ban-du-thao' },
    { label: 'Chính sách & Cuộc sống', path: '#chinh-sach-cuoc-song' },
    { label: 'PBGDPL & Thượng tôn pháp luật', path: '#pho-bien-giao-duc' },
    { label: 'Đa phương tiện & Infographic', path: '#da-phuong-tien' },
    { label: 'Tiện ích tư pháp Thủ đô', path: '#tien-ich-so' },
    { label: 'Hotline', path: '#hotline' },
];

const HANOI_FEATURED_SLIDES = [
    {
        id: 1,
        badge: "TIN NỔI BẬT",
        subBadge: "QĐ 61/2024/QĐ-UBND",
        title: "UBND TP HÀ NỘI: QUY ĐỊNH CHI TIẾT VỀ BỒI THƯỜNG, HỖ TRỢ, TÁI ĐỊNH CƯ KHI NHÀ NƯỚC THU HỒI ĐẤT",
        summary: "Sáng ngày 07/10/2024, UBND Thành phố Hà Nội chính thức áp dụng Quyết định số 61/2024/QĐ-UBND quy định chi tiết về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất. Quy định kịp thời tháo gỡ khó khăn, vướng mắc cho các dự án trọng điểm, đồng thời bảo đảm quyền lợi hợp pháp, chính đáng và nơi ở mới tốt hơn nơi ở cũ cho người dân Thủ đô.",
        image: "/thumb1.png",
        date: "07/10/2024",
        agency: "ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI",
        link: "/ha-noi/van-ban"
    },
    {
        id: 2,
        badge: "TIN NỔI BẬT",
        subBadge: "LUẬT THỦ ĐÔ 2024",
        title: "HÀ NỘI QUÁN TRIỆT ĐỒNG LOẠT TRIỂN KHAI THI HÀNH LUẬT THỦ ĐÔ VÀ CÁC NGHỊ QUYẾT ĐẶC THÙ TRÊN 30 QUẬN, HUYỆN",
        summary: "Sở Tư pháp Hà Nội đã hoàn thành toàn bộ hệ thống văn bản quy định chi tiết thi hành Luật Thủ Đô số 39/2024/QH15. Các cơ chế phân cấp ủy quyền, tự chủ ngân sách và hỗ trợ đổi mới sáng tạo đang được 30 quận, huyện, thị xã đưa vào thực tiễn, tạo động lực phát triển mới cho Thủ đô.",
        image: "/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg",
        date: "22/03/2026",
        agency: "HĐND & UBND THÀNH PHỐ HÀ NỘI",
        link: "/ha-noi/van-ban"
    },
    {
        id: 3,
        badge: "TIN NỔI BẬT",
        subBadge: "CƠ CHẾ SANDBOX",
        title: "HĐND THÀNH PHỐ THÔNG QUA NGHỊ QUYẾT VỀ CƠ CHẾ THỬ NGHIỆM CÓ KIỂM SOÁT TẠI KHU CÔNG NGHỆ CAO HÒA LẠC",
        summary: "Chính sách đột phá cho phép các viện, trường và doanh nghiệp công nghệ tại Hà Nội thử nghiệm các giải pháp AI, dữ liệu lớn và xe tự hành trong môi trường pháp lý mở, được bảo đảm an toàn pháp lý và miễn trừ trách nhiệm hành chính theo Luật Thủ đô.",
        image: "/thumb2.png",
        date: "15/02/2026",
        agency: "HỘI ĐỒNG NHÂN DÂN TP HÀ NỘI",
        link: "/ha-noi/van-ban"
    },
    {
        id: 4,
        badge: "TIN NỔI BẬT",
        subBadge: "CÔNG DÂN SỐ iHANOI",
        title: "ỨNG DỤNG iHANOI: TIẾP NHẬN VÀ XỬ LÝ 100% PHẢN ÁNH KIẾN NGHỊ PHÁP LÝ CỦA CÔNG DÂN THỦ ĐÔ TRONG 24 GIỜ",
        summary: "Quy chế tiếp nhận phản ánh kiến nghị pháp lý qua ứng dụng iHanoi đã giúp giảm 50% thời gian xử lý thủ tục hành chính tư pháp. Mọi kiến nghị của người dân đều được phân luồng tự động và giám sát tiến độ công khai trên môi trường số.",
        image: "/thumb3.png",
        date: "18/03/2026",
        agency: "TRUNG TÂM THÔNG TIN ĐIỆN TỬ TP HÀ NỘI",
        link: "/ha-noi/lien-he"
    }
];

const HANOI_BOTTOM_FEATURE_CARDS = [
    {
        id: 1,
        badge: "NQ 05/2026/NQ-HĐND",
        title: "Cơ chế hỗ trợ tài chính và ưu đãi đầu tư đối với doanh nghiệp đổi mới sáng tạo Thủ đô",
        summary: "HĐND TP Hà Nội ban hành chính sách hỗ trợ lãi suất vay vốn, mặt bằng và cơ chế thử nghiệm công nghệ cao cho doanh nghiệp khởi nghiệp giai đoạn 2026-2030.",
        image: "/thumb2.png",
        date: "15/02/2026",
        link: "/ha-noi/van-ban"
    },
    {
        id: 2,
        badge: "ỨNG DỤNG iHANOI",
        title: "UBND Thành phố ban hành Quy chế tiếp nhận, xử lý và phản hồi phản ánh kiến nghị qua iHanoi",
        summary: "Quy định rõ trách nhiệm xử lý không quá 48 giờ đối với mọi phản ánh của người dân về thủ tục hành chính, tư pháp và trật tự đô thị Thủ đô.",
        image: "/thumb3.png",
        date: "22/11/2025",
        link: "/ha-noi/lien-he"
    },
    {
        id: 3,
        badge: "MÔI TRƯỜNG & ĐÔ THỊ",
        title: "Ban hành Tiêu chí phân vùng bảo vệ môi trường và lộ trình hạn chế phương tiện giao thông phát thải",
        summary: "Thiết lập vùng phát thải thấp (LEZ) tại các quận vùng lõi lịch sử Hoàn Kiếm, Ba Đình, Đống Đa nhằm cải thiện chất lượng không khí và trật tự giao thông.",
        image: "/thumb1.png",
        date: "10/07/2025",
        link: "/ha-noi/van-ban"
    }
];

const HANOI_ACTIVITY_NEWS = {
    featured: {
        id: "ACT-01",
        title: "UBND Thành phố Hà Nội tổ chức Hội nghị quán triệt và triển khai thi hành Luật Thủ đô trên địa bàn 30 quận, huyện",
        summary: "Sáng nay, UBND TP Hà Nội đã tổ chức Hội nghị trực tuyến toàn thành phố triển khai kế hoạch thực thi Luật Thủ đô số 39/2024/QH15. Các cơ chế phân cấp ủy quyền, tự chủ ngân sách và chính sách thu hút nhân tài đang được đưa vào thực tiễn, tạo động lực phát triển mới cho Thủ đô.",
        date: "22/03/2026",
        badge: "HỘI NGHỊ THÀNH PHỐ",
        image: "/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg",
        link: "/ha-noi/pho-bien-giao-duc"
    },
    subList: [
        {
            id: "ACT-02",
            title: "Sở Tư pháp Hà Nội tập huấn nghiệp vụ theo dõi thi hành pháp luật năm 2026 cho hơn 500 cán bộ tư pháp cơ sở",
            date: "21/03/2026",
            badge: "Tập huấn nghiệp vụ",
            image: "/thumb2.png",
            link: "/ha-noi/pho-bien-giao-duc"
        },
        {
            id: "ACT-03",
            title: "Hội đồng PBGDPL Thành phố phát động chiến dịch truyền thông số về chính sách pháp luật Thủ đô",
            date: "20/03/2026",
            badge: "Phổ biến, giáo dục",
            image: "/thumb3.png",
            link: "/ha-noi/pho-bien-giao-duc"
        },
        {
            id: "ACT-04",
            title: "Tọa đàm tháo gỡ khó khăn pháp lý và đồng hành cùng hơn 300 doanh nghiệp, hợp tác xã đổi mới sáng tạo",
            date: "18/03/2026",
            badge: "Hỗ trợ pháp lý DN",
            image: "/thumb1.png",
            link: "/ha-noi/pho-bien-giao-duc"
        }
    ]
};

const HANOI_ANNOUNCEMENTS = [
    {
        id: "TB-01",
        day: "22",
        month: "Th03",
        badge: "Lịch tiếp dân",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "Thông báo số 86/TB-UBND: Lịch tiếp công dân định kỳ tháng 04/2026 của Lãnh đạo UBND Thành phố Hà Nội",
        agency: "Văn phòng UBND TP. Hà Nội",
        link: "/ha-noi/van-ban",
        isHot: true
    },
    {
        id: "TB-02",
        day: "20",
        month: "Th03",
        badge: "Hội nghị",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        title: "Thông báo số 45/TB-STP: Kế hoạch tổ chức Hội nghị phổ biến các văn bản QPPL mới ban hành quý I/2026",
        agency: "Sở Tư pháp TP. Hà Nội",
        link: "/ha-noi/van-ban"
    },
    {
        id: "TB-03",
        day: "18",
        month: "Th03",
        badge: "Ứng dụng iHanoi",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Thông báo vận hành thử nghiệm phân hệ số hóa hồ sơ tư pháp điện tử và giải quyết kiến nghị qua iHanoi",
        agency: "Trung tâm Tin học - TTĐT Hà Nội",
        link: "/ha-noi/lien-he",
        isHot: true
    },
    {
        id: "TB-04",
        day: "15",
        month: "Th03",
        badge: "Lấy ý kiến",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "Thông báo số 120/TB-HĐND: Lấy ý kiến nhân dân đối với Dự thảo Nghị quyết về cơ chế hỗ trợ đổi mới sáng tạo",
        agency: "HĐND Thành phố Hà Nội",
        link: "/ha-noi/van-ban"
    },
    {
        id: "TB-05",
        day: "12",
        month: "Th03",
        badge: "Trợ giúp pháp lý",
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        title: "Thông báo tiếp nhận hồ sơ trợ giúp pháp lý lưu động đợt 1/2026 tại các huyện ngoại thành Hà Nội",
        agency: "Trung tâm TGPL Nhà nước TP",
        link: "/ha-noi/pho-bien-giao-duc"
    },
    {
        id: "TB-06",
        day: "10",
        month: "Th03",
        badge: "Công chứng số",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        title: "Thông báo số 38/TB-STP: Danh sách tổ chức hành nghề công chứng đủ điều kiện tham gia mạng lưới chứng thực số điện tử",
        agency: "Sở Tư pháp TP. Hà Nội",
        link: "/ha-noi/van-ban"
    },
    {
        id: "TB-07",
        day: "08",
        month: "Th03",
        badge: "Kiểm tra",
        badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
        title: "Thông báo số 25/TB-HĐPH: Kế hoạch kiểm tra công tác hòa giải ở cơ sở và đánh giá chuẩn tiếp cận pháp luật năm 2026",
        agency: "Hội đồng phối hợp PBGDPL TP",
        link: "/ha-noi/van-ban",
        isHot: false
    },
    {
        id: "TB-08",
        day: "05",
        month: "Th03",
        badge: "Tuyển chọn",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Thông báo tuyển chọn báo cáo viên pháp luật thành phố và cộng tác viên trợ giúp pháp lý nhiệm kỳ 2026 - 2030",
        agency: "Sở Tư pháp TP. Hà Nội",
        link: "/ha-noi/pho-bien-giao-duc",
        isHot: true
    },
    {
        id: "TB-09",
        day: "01",
        month: "Th03",
        badge: "Cuộc thi",
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
        title: "Thông báo số 18/TB-UBND: Triển khai cuộc thi trực tuyến 'Tìm hiểu pháp luật về bảo vệ môi trường Thủ đô năm 2026'",
        agency: "UBND Thành phố Hà Nội",
        link: "/ha-noi/pho-bien-giao-duc"
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
                        {HANOI_NEWS_CATEGORIES.map((cat) => {
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

const HanoiHomePage = () => {
    const [mediaTab, setMediaTab] = useState('video');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isSlidePaused, setIsSlidePaused] = useState(false);
    const [isAnnouncePaused, setIsAnnouncePaused] = useState(false);

    // Chuyển slide mượt mà từ trái qua phải
    const changeSlide = (newIndex) => {
        if (newIndex === currentSlide || isTransitioning) return;
        setPrevSlide(currentSlide);
        setCurrentSlide(newIndex);
        setIsTransitioning(true);
    };

    useEffect(() => {
        if (!isTransitioning) return;
        const timer = setTimeout(() => {
            setIsTransitioning(false);
            setPrevSlide(null);
        }, 850);
        return () => clearTimeout(timer);
    }, [isTransitioning, currentSlide]);

    // Tự động chuyển slide sau mỗi 6 giây
    useEffect(() => {
        if (isSlidePaused) return;
        const timer = setInterval(() => {
            const nextIdx = (currentSlide + 1) % HANOI_FEATURED_SLIDES.length;
            changeSlide(nextIdx);
        }, 6000);
        return () => clearInterval(timer);
    }, [isSlidePaused, currentSlide, isTransitioning]);

    const handlePrevSlide = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        const nextIdx = (currentSlide - 1 + HANOI_FEATURED_SLIDES.length) % HANOI_FEATURED_SLIDES.length;
        changeSlide(nextIdx);
    };

    const handleNextSlide = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        const nextIdx = (currentSlide + 1) % HANOI_FEATURED_SLIDES.length;
        changeSlide(nextIdx);
    };

    useEffect(() => {
        document.title = "Cổng Pháp luật Thành phố Hà Nội";
        window.scrollTo(0, 0);
    }, []);

    const activeSlideData = HANOI_FEATURED_SLIDES[currentSlide];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans flex flex-col selection:bg-blue-600 selection:text-white">
            <HanoiHeader />

            {/* BANNER GIỚI THIỆU: MÀU GRADIENT INDIGO HOÀNG GIA (#4f56ca -> #2c1b92 -> #4f56ca) */}
            <div className="w-full relative overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white py-5 sm:py-6 md:py-6.5 border-b border-indigo-400/30">
                {/* CSS Keyframes riêng biệt tạo hiệu ứng động mượt mà, dịu mắt và có chiều sâu */}
                <style>{`
                    @keyframes hanoiRotateCW {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes hanoiRotateCCW {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                    @keyframes hanoiPulseGlow {
                        0%, 100% { opacity: 0.15; transform: scale(0.95); }
                        50% { opacity: 0.38; transform: scale(1.12); }
                    }
                    @keyframes hanoiFloatDiamond {
                        0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); }
                        50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); }
                    }
                    @keyframes hanoiSweepLight {
                        0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; }
                        25% { opacity: 0.32; }
                        70% { opacity: 0.32; }
                        100% { transform: translateX(260%) skewX(-25deg); opacity: 0; }
                    }
                    @keyframes hanoiSlideInFromLeft {
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
                    @keyframes hanoiSlideOutToRight {
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
                    @keyframes hanoiSlideFadeIn {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes hanoiImageFadeIn {
                        0% { opacity: 0.35; transform: scale(1.04); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes hanoiVerticalTicker {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-50%); }
                    }
                    @keyframes hanoiEntranceFadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(24px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes hanoiEntranceFadeDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes hanoiEntranceZoomIn {
                        from {
                            opacity: 0;
                            transform: scale(0.96);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    @keyframes hanoiBadgeShine {
                        0%, 100% { opacity: 0.95; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.06); filter: drop-shadow(0 0 5px rgba(220, 38, 38, 0.65)); }
                    }
                    .hanoi-animate-fade-up {
                        animation: hanoiEntranceFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }
                    .hanoi-animate-fade-down {
                        animation: hanoiEntranceFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }
                    .hanoi-animate-zoom-in {
                        animation: hanoiEntranceZoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }
                    .hanoi-card-interactive {
                        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .hanoi-card-interactive:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
                    }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ, êm dịu (Soft Ambient Dot-Matrix) */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái (Soft Gentle Sweep Beam) */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'hanoiSweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa dịu nhẹ (Soft Ambient Glow) */}
                <div
                    className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none"
                    style={{ animation: 'hanoiPulseGlow 4s ease-in-out infinite' }}
                />
                <div
                    className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none"
                    style={{ animation: 'hanoiPulseGlow 4.5s ease-in-out infinite 1s' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none"
                    style={{ animation: 'hanoiPulseGlow 5.5s ease-in-out infinite 0.5s' }}
                />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn (Slim Rotating Orbits) */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div
                    className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    style={{ animation: 'hanoiRotateCW 16s linear infinite' }}
                />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div
                    className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    style={{ animation: 'hanoiRotateCCW 18s linear infinite' }}
                />

                {/* 5. Điểm nhấn kim cương ánh kim thanh thoát (Delicate Floating Diamonds) */}
                <div
                    className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]"
                    style={{ animation: 'hanoiFloatDiamond 3.2s ease-in-out infinite' }}
                />
                <div
                    className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]"
                    style={{ animation: 'hanoiFloatDiamond 3.6s ease-in-out infinite 0.8s' }}
                />
                <div
                    className="absolute top-1/2 left-8 w-2 h-2 bg-white/50 border border-amber-200/40 rounded-sm pointer-events-none"
                    style={{ animation: 'hanoiFloatDiamond 4s ease-in-out infinite 1.5s' }}
                />

                <div className="container mx-auto px-4 max-w-[1504px] relative z-10 flex flex-col items-center text-center hanoi-animate-fade-down">
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
                        Cổng Pháp luật Thành phố Hà Nội
                    </h1>

                    {/* Vạch trang trí hoàng kim tinh tế */}
                    <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5 sm:my-2 rounded-full" />

                    {/* Slogan tóm tắt cân đối chính xác trong 2 dòng */}
                    {/* <p className="text-xs sm:text-sm md:text-[14.5px] text-blue-100/90 leading-relaxed max-w-2xl text-center font-normal drop-shadow-sm">
                        Nền tảng số thống nhất phục vụ tra cứu văn bản quy phạm pháp luật, phổ biến, giáo dục pháp luật,
                        <br className="hidden md:inline" />
                        {' '}trợ giúp pháp lý và đồng hành cùng người dân, doanh nghiệp Thủ đô.
                    </p> */}
                </div>
            </div>

            <main className="flex-1 pb-16 space-y-4 sm:space-y-5">
                {/* 1. KHỐI TIN TIÊU ĐIỂM CHÍNH SÁCH - TRÀN TOÀN BỘ CHIỀU NGANG + SLIDE 10S */}
                <section
                    id="tin-tuc-noi-bat"
                    onMouseEnter={() => setIsSlidePaused(true)}
                    onMouseLeave={() => setIsSlidePaused(false)}
                    className="w-full relative overflow-hidden bg-gradient-to-br from-[#f8e4b2] via-[#fdf7ea] via-[#faeed0] to-[#f4d896] border-b border-[#e5c782] py-8 sm:py-10 hanoi-animate-zoom-in"
                    style={{ animationDelay: '0.1s' }}
                >
                    {/* Các họa tiết trang trí nền sang trọng & hiện đại (thay thế trống đồng) */}
                    {/* 1. Lưới điểm chấm tinh tế (Dot-Matrix Pattern) */}
                    <div className="absolute inset-0 bg-[radial-gradient(#b4530915_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

                    {/* 2. Quầng sáng hoàng gia mềm mại (Ambient Glow) */}
                    <div className="absolute -top-28 -right-28 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-400/25 via-yellow-300/10 to-transparent blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-300/10 to-transparent blur-3xl pointer-events-none" />

                    {/* 3. Các đường vòng cung hình học tinh tế (Geometric Luxury Arcs) */}
                    <div className="absolute -right-24 -top-24 w-[480px] h-[480px] rounded-full border border-amber-600/15 pointer-events-none" />
                    <div className="absolute -right-14 -top-14 w-[360px] h-[360px] rounded-full border border-amber-700/15 border-dashed pointer-events-none" />
                    <div className="absolute -right-4 -top-4 w-[240px] h-[240px] rounded-full border border-amber-600/10 pointer-events-none" />

                    <div className="absolute -left-24 -bottom-24 w-[440px] h-[440px] rounded-full border border-amber-600/15 pointer-events-none" />
                    <div className="absolute -left-14 -bottom-14 w-[320px] h-[320px] rounded-full border border-amber-700/15 border-dashed pointer-events-none" />

                    {/* 4. Điểm nhấn hình thoi ánh kim (Diamond Accents) */}
                    <div className="absolute top-10 left-[18%] w-3 h-3 rotate-45 border border-amber-600/30 pointer-events-none" />
                    <div className="absolute bottom-12 right-[22%] w-2.5 h-2.5 rotate-45 bg-amber-600/25 pointer-events-none" />
                    <div className="absolute top-1/2 right-10 w-2 h-2 rotate-45 border border-amber-700/25 pointer-events-none" />

                    <div className="container mx-auto px-4 max-w-[1504px] relative z-10">
                        {/* Phần trên: Slide tin tiêu điểm với mũi tên điều hướng ở hai bên ngoài ảnh */}
                        <div className="relative group px-3 sm:px-6 lg:px-8">
                            {/* Nút Previous (Mũi tên bên trái khối slide - đặt ở mép ngoài) */}
                            <button
                                onClick={handlePrevSlide}
                                aria-label="Tin trước"
                                className="absolute left-0 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 hover:text-[#991b1b] shadow-xl border border-amber-300 hover:border-[#fa3333] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-30 group/nav"
                            >
                                <ChevronLeft size={22} className="text-gray-700 group-hover/nav:text-[#991b1b] transition-transform group-hover/nav:-translate-x-0.5" />
                            </button>

                            {/* Nút Next (Mũi tên bên phải khối slide - đặt ở mép ngoài) */}
                            <button
                                onClick={handleNextSlide}
                                aria-label="Tin kế tiếp"
                                className="absolute right-0 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 hover:text-[#991b1b] shadow-xl border border-amber-300 hover:border-[#fa3333] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-30 group/nav"
                            >
                                <ChevronRight size={22} className="text-gray-700 group-hover/nav:text-[#991b1b] transition-transform group-hover/nav:translate-x-0.5" />
                            </button>

                            {/* Khung chứa các slide trượt chậm dãi mượt mà từ trái qua phải */}
                            <div className="relative overflow-hidden w-full rounded-2xl">
                                <div className="grid grid-cols-1 grid-rows-1 w-full items-stretch">
                                    {HANOI_FEATURED_SLIDES.map((slide, idx) => {
                                        const isCurrent = idx === currentSlide;
                                        const isPrev = idx === prevSlide;

                                        if (!isCurrent && !isPrev) {
                                            return null;
                                        }

                                        let animStyle = {};
                                        let zIndex = 'z-10';

                                        if (isCurrent && isTransitioning) {
                                            animStyle = {
                                                animation: 'hanoiSlideInFromLeft 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                                            };
                                            zIndex = 'z-20';
                                        } else if (isPrev && isTransitioning) {
                                            animStyle = {
                                                animation: 'hanoiSlideOutToRight 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                                            };
                                            zIndex = 'z-10';
                                        }

                                        return (
                                            <div
                                                key={slide.id}
                                                style={animStyle}
                                                className={`col-start-1 row-start-1 w-full ${zIndex}`}
                                            >
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
                                                                <h3 className="text-xl sm:text-2xl lg:text-[27px] font-bold text-[#991b1b] group-hover/title:text-[#7f1d1d] transition-colors leading-[1.35] uppercase tracking-tight">
                                                                    {slide.title}
                                                                </h3>
                                                            </Link>

                                                            {/* Tóm tắt */}
                                                            <p className="text-gray-700 text-sm sm:text-base lg:text-[16px] font-normal leading-relaxed line-clamp-4 pt-2 sm:pt-2.5">
                                                                {slide.summary}
                                                            </p>
                                                        </div>

                                                        {/* Dots điều hướng & Nút xem chi tiết */}
                                                        <div className="pt-3.5 mt-auto flex items-center justify-between border-t border-amber-300/50">
                                                            {/* Dots chuyển slide */}
                                                            <div className="flex items-center gap-2">
                                                                {HANOI_FEATURED_SLIDES.map((s, dotIdx) => (
                                                                    <button
                                                                        key={s.id}
                                                                        onClick={() => changeSlide(dotIdx)}
                                                                        aria-label={`Slide ${dotIdx + 1}`}
                                                                        className={`h-2 transition-all rounded-full ${currentSlide === dotIdx
                                                                            ? 'w-7 bg-[#a81c1c]'
                                                                            : 'w-2 bg-amber-300 hover:bg-amber-400'
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>

                                                            <Link
                                                                to={slide.link}
                                                                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#a81c1c] hover:bg-[#8e1717] text-white px-4 py-2 rounded-lg transition-all shadow-sm active:scale-95"
                                                            >
                                                                <span>Xem chi tiết chính sách</span>
                                                                <ArrowRight size={13} />
                                                            </Link>
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
                            {HANOI_BOTTOM_FEATURE_CARDS.map((card) => (
                                <Link
                                    key={card.id}
                                    to={card.link}
                                    className="bg-gradient-to-b from-[#fffdf6] via-[#fefaf0] to-[#fef6e4] rounded-2xl p-3.5 border-2 border-amber-300/75 hover:border-[#f59e0b] shadow-[0_8px_22px_-3px_rgba(180,83,9,0.2),0_4px_10px_-2px_rgba(120,53,15,0.08)] hover:shadow-[0_16px_32px_-4px_rgba(245,158,11,0.35),0_6px_14px_-2px_rgba(217,119,6,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-3.5 group cursor-pointer relative overflow-hidden"
                                >
                                    {/* Viền đỉnh nhấn ánh vàng hổ phách nổi khối */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                    {/* Thumbnail bên trái nổi bật */}
                                    <div className="w-24 h-20 sm:w-28 sm:h-22 flex-shrink-0 rounded-xl overflow-hidden bg-white/80 border border-amber-200/90 shadow-sm relative">
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
                    className="w-full max-w-[1504px] mx-auto px-4 hanoi-animate-fade-up"
                    style={{ animationDelay: '0.15s' }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-7 items-stretch">
                        {/* CỘT TRÁI (70%): KHỐI TIN HOẠT ĐỘNG */}
                        <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between lg:h-[485px]">
                            {/* Header Khối Tin Hoạt Động phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-3 sm:p-3.5 mb-3 text-white shadow-md border-b-2 border-amber-400 shrink-0">
                                {/* Họa tiết trang trí phong cách banner */}
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                                <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-base sm:text-lg md:text-[20px] font-bold text-white uppercase drop-shadow-sm">
                                            Tin Hoạt Động
                                        </h2>
                                        <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                    </div>
                                    <Link
                                        to="/ha-noi/pho-bien-giao-duc"
                                        className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-amber-300 text-white hover:text-amber-200 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 backdrop-blur-xs"
                                    >
                                        <span>Xem tất cả</span>
                                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Tin hoạt động tiêu điểm lớn (Featured Activity - kích thước gọn gàng vừa vặn) */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3 pb-3 border-b border-gray-100 group">
                                <div className="md:col-span-4 rounded-xl overflow-hidden bg-gray-100 h-[140px] sm:h-[148px] relative shadow-xs">
                                    <img
                                        src={HANOI_ACTIVITY_NEWS.featured.image}
                                        alt={HANOI_ACTIVITY_NEWS.featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-2 left-2 bg-[#991b1b] text-white text-[10.5px] font-bold px-2 py-0.5 rounded shadow">
                                        {HANOI_ACTIVITY_NEWS.featured.badge}
                                    </span>
                                </div>
                                <div className="md:col-span-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-xs text-amber-950 font-semibold mb-1">
                                        <Clock size={13} className="text-[#a81c1c]" />
                                        <span>{HANOI_ACTIVITY_NEWS.featured.date}</span>
                                    </div>
                                    <Link to={HANOI_ACTIVITY_NEWS.featured.link}>
                                        <h3 className="font-bold text-base sm:text-[16.5px] text-gray-900 group-hover:text-[#991b1b] transition-colors leading-snug mb-1 line-clamp-2">
                                            {HANOI_ACTIVITY_NEWS.featured.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-normal">
                                        {HANOI_ACTIVITY_NEWS.featured.summary}
                                    </p>
                                </div>
                            </div>

                            {/* 3 Tin hoạt động tiếp theo (3 Sub Activity Cards - chiều cao chuẩn, thumbnail gọn) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {HANOI_ACTIVITY_NEWS.subList.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className="group/sub flex flex-col bg-gray-50/70 hover:bg-red-50/40 p-2 rounded-xl border border-gray-100 hover:border-red-200 transition-all shadow-none hover:shadow-xs hanoi-card-interactive"
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
                        <div
                            className="lg:col-span-3 bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm relative overflow-hidden flex flex-col lg:h-[485px]"
                            onMouseEnter={() => setIsAnnouncePaused(true)}
                            onMouseLeave={() => setIsAnnouncePaused(false)}
                        >
                            {/* Viền đỉnh màu vàng gold sang trọng */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                            {/* Header Bảng Thông Báo phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-3 sm:p-3.5 mb-2.5 text-white shadow-md border-b-2 border-amber-400 shrink-0">
                                {/* Họa tiết trang trí phong cách banner */}
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                                <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-base sm:text-lg md:text-[19px] font-bold text-white uppercase drop-shadow-sm">
                                            Thông Báo
                                        </h2>
                                        <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsAnnouncePaused(!isAnnouncePaused);
                                            }}
                                            title={isAnnouncePaused ? "Tiếp tục chạy" : "Tạm dừng"}
                                            className="p-1 rounded bg-white/15 hover:bg-white/25 text-white/90 hover:text-amber-200 transition-colors"
                                        >
                                            {isAnnouncePaused ? <Play size={11} fill="currentColor" /> : <Pause size={11} fill="currentColor" />}
                                        </button>
                                        <Link
                                            to="/ha-noi/van-ban"
                                            className="group/btn inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-amber-300 text-white hover:text-amber-200 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 backdrop-blur-xs"
                                        >
                                            <span>Xem tất cả</span>
                                            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Container trôi tin thông báo lấp đầy toàn bộ chiều cao còn lại của khối với min-h-0 */}
                            <div className="relative flex-1 min-h-0 overflow-hidden">
                                {/* Lớp mờ mờ nhẹ ở đỉnh để tin trôi mượt mà */}
                                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none" />

                                {/* Danh sách trôi tự động liên tục - các item phân rõ bằng gạch ngang, chiều cao chuẩn khít */}
                                <div
                                    className="divide-y divide-gray-100"
                                    style={{
                                        animation: 'hanoiVerticalTicker 26s linear infinite',
                                        animationPlayState: isAnnouncePaused ? 'paused' : 'running',
                                    }}
                                >
                                    {[...HANOI_ANNOUNCEMENTS, ...HANOI_ANNOUNCEMENTS].map((item, idx) => (
                                        <Link
                                            key={`${item.id}-${idx}`}
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
                                                        <span className="bg-red-500 text-white text-[8.5px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0 hanoi-badge-pulse">
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
                <HanoiNewlyIssuedDocs />

                {/* 3. CHUYÊN MỤC TIN TỨC: THỜI SỰ TƯ PHÁP & CHỈ ĐẠO ĐIỀU HÀNH THỦ ĐÔ (LAYOUT 4 CỘT CHUẨN CỔNG QUỐC GIA) */}
                <section id="thoi-su-tu-phap" className="py-1 hanoi-animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                            {/* Header Khối Thời sự Tư pháp phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-3.5 sm:p-4 mb-4 text-white shadow-md border-b-2 border-amber-400">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                                <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-white uppercase drop-shadow-sm">
                                            Thời sự Tư pháp & Chỉ đạo điều hành
                                        </h2>
                                        <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                    </div>
                                    <Link
                                        to="/ha-noi/pho-bien-giao-duc"
                                        className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-amber-300 text-white hover:text-amber-200 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 backdrop-blur-xs"
                                    >
                                        <span>Xem tất cả</span>
                                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Cột Trái: 4 tin ngắn */}
                                <div className="lg:col-span-1 flex flex-col space-y-4">
                                    {hanoiNewsHighlightsData.leftArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            to="/ha-noi/pho-bien-giao-duc"
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
                                    to="/ha-noi/pho-bien-giao-duc"
                                    className="lg:col-span-2 group flex flex-col bg-slate-50/60 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition"
                                >
                                    <div className="w-full mb-4 shrink-0 overflow-hidden rounded-xl">
                                        <Image16x9
                                            src={hanoiNewsHighlightsData.mainArticle.thumb}
                                            alt={hanoiNewsHighlightsData.mainArticle.title}
                                            className="rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1.5">
                                            {hanoiNewsHighlightsData.mainArticle.category}
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-bold text-[#0f4c81] group-hover:text-blue-700 mb-2.5 leading-snug">
                                            {hanoiNewsHighlightsData.mainArticle.title}
                                        </h3>
                                        <p className="text-gray-600 text-[14px] mb-4 line-clamp-3 leading-relaxed">
                                            {hanoiNewsHighlightsData.mainArticle.summary}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-200/60">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={13} className="text-[#0f4c81]" />
                                                <span className="font-medium text-gray-600">{hanoiNewsHighlightsData.mainArticle.date}</span>
                                            </div>
                                            <span className="text-[#0f4c81] font-bold text-xs flex items-center gap-1">
                                                Đọc toàn văn <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Cột Phải: 2 tin phân tích chuyên đề */}
                                <div className="lg:col-span-1 flex flex-col space-y-6">
                                    {hanoiNewsHighlightsData.rightArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            to="/ha-noi/pho-bien-giao-duc"
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

                {/* 4. CHUYÊN MỤC: CHÍNH SÁCH & CUỘC SỐNG THỦ ĐÔ (LAYOUT 2 CỘT CHUẨN CỔNG QUỐC GIA) */}
                <section id="chinh-sach-cuoc-song" className="py-1 hanoi-animate-fade-up" style={{ animationDelay: '0.22s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                            {/* Header Khối Chính sách & Cuộc sống phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-3.5 sm:p-4 mb-4 text-white shadow-md border-b-2 border-amber-400">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                                <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                    <div>
                                        <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-white uppercase drop-shadow-sm">
                                            Chính sách & Cuộc sống Thủ đô
                                        </h2>
                                        <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                    </div>
                                    <span className="text-xs text-amber-200/90 font-medium px-3 py-1 bg-white/10 rounded-full border border-white/15 backdrop-blur-xs">
                                        Đưa pháp luật vào đời sống sinh hoạt của nhân dân Thủ đô
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Tin tiêu điểm (Cột trái) */}
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition h-full flex flex-col group hanoi-card-interactive">
                                    <div className="relative w-full aspect-video overflow-hidden shrink-0">
                                        <Image16x9
                                            src={hanoiPoliciesAndLifeData.featured.image}
                                            alt={hanoiPoliciesAndLifeData.featured.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
                                        <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
                                            {hanoiPoliciesAndLifeData.featured.agency}
                                        </div>
                                        <Link to="/ha-noi/pho-bien-giao-duc">
                                            <h3 className="font-bold text-[#0f4c81] text-lg sm:text-xl line-clamp-2 leading-snug mb-3 hover:text-blue-700 transition">
                                                {hanoiPoliciesAndLifeData.featured.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-[14px] line-clamp-3 leading-relaxed mb-4">
                                            {hanoiPoliciesAndLifeData.featured.description}
                                        </p>
                                        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md">
                                                <Clock size={13} className="text-[#0f4c81]" />
                                                <span className="font-medium">{hanoiPoliciesAndLifeData.featured.date}</span>
                                            </div>
                                            <Link to="/ha-noi/pho-bien-giao-duc" className="text-[#0f4c81] font-bold hover:underline flex items-center gap-1">
                                                Đọc tiếp <ArrowRight size={13} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Danh sách 4 tin ngang (Cột phải) */}
                                <div className="flex flex-col gap-3.5 h-full">
                                    {hanoiPoliciesAndLifeData.list.map((item) => (
                                        <Link
                                            key={item.id}
                                            to="/ha-noi/pho-bien-giao-duc"
                                            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-row p-3 items-center gap-4 group flex-1 hanoi-card-interactive"
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
                <section id="pho-bien-giao-duc" className="py-1 hanoi-animate-fade-up" style={{ animationDelay: '0.28s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                            {/* Header Khối Phổ biến, giáo dục pháp luật phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-3.5 sm:p-4 mb-4 text-white shadow-md border-b-2 border-amber-400">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                                <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-white uppercase drop-shadow-sm">
                                            Phổ biến, giáo dục pháp luật Thủ đô
                                        </h2>
                                        <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                    </div>
                                    <Link
                                        to="/ha-noi/pho-bien-giao-duc"
                                        className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-amber-300 text-white hover:text-amber-200 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 backdrop-blur-xs"
                                    >
                                        <span>Khám phá chuyên trang</span>
                                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {hanoiNewsArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        to="/ha-noi/pho-bien-giao-duc"
                                        className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col group hanoi-card-interactive"
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

                {/* 6. CHUYÊN MỤC: ĐA PHƯƠNG TIỆN - TRUYỀN HÌNH, PHÓNG SỰ & INFOGRAPHIC PHÁP LUẬT THỦ ĐÔ */}
                <section
                    id="da-phuong-tien"
                    className="w-full relative overflow-hidden bg-gradient-to-br from-[#f8e4b2] via-[#fdf7ea] via-[#faeed0] to-[#f4d896] border-y border-[#e5c782] py-8 sm:py-10 hanoi-animate-fade-up"
                    style={{ animationDelay: '0.34s' }}
                >
                    {/* Các họa tiết trang trí nền sang trọng & hiện đại tương tự Khối tin tức nổi bật trên cùng */}
                    {/* 1. Lưới điểm chấm tinh tế (Dot-Matrix Pattern) */}
                    <div className="absolute inset-0 bg-[radial-gradient(#b4530915_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

                    {/* 2. Quầng sáng hoàng gia mềm mại (Ambient Glow) */}
                    <div className="absolute -top-28 -right-28 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-400/25 via-yellow-300/10 to-transparent blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-300/10 to-transparent blur-3xl pointer-events-none" />

                    {/* 3. Các đường vòng cung hình học tinh tế (Geometric Luxury Arcs) */}
                    <div className="absolute -right-24 -top-24 w-[480px] h-[480px] rounded-full border border-amber-600/15 pointer-events-none" />
                    <div className="absolute -right-14 -top-14 w-[360px] h-[360px] rounded-full border border-amber-700/15 border-dashed pointer-events-none" />
                    <div className="absolute -right-4 -top-4 w-[240px] h-[240px] rounded-full border border-amber-600/10 pointer-events-none" />

                    <div className="absolute -left-24 -bottom-24 w-[440px] h-[440px] rounded-full border border-amber-600/15 pointer-events-none" />
                    <div className="absolute -left-14 -bottom-14 w-[320px] h-[320px] rounded-full border border-amber-700/15 border-dashed pointer-events-none" />

                    {/* 4. Điểm nhấn hình thoi ánh kim (Diamond Accents) */}
                    <div className="absolute top-10 left-[18%] w-3 h-3 rotate-45 border border-amber-600/30 pointer-events-none" />
                    <div className="absolute bottom-12 right-[22%] w-2.5 h-2.5 rotate-45 bg-amber-600/25 pointer-events-none" />
                    <div className="absolute top-1/2 right-10 w-2 h-2 rotate-45 border border-amber-700/25 pointer-events-none" />

                    <div className="container mx-auto px-4 max-w-[1504px] relative z-10">
                        <div className="bg-gradient-to-b from-[#fffdf6]/90 via-[#fefaf0]/85 to-[#fef6e4]/90 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border-2 border-amber-300/75 shadow-[0_8px_22px_-3px_rgba(180,83,9,0.18)]">
                            {/* Header Khối Đa phương tiện phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-3.5 sm:p-4 mb-5 text-white shadow-md border-b-2 border-amber-400">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                                <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-white uppercase drop-shadow-sm">
                                            Đa phương tiện & Phóng sự Pháp luật Thủ đô
                                        </h2>
                                        <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs p-1 rounded-xl border border-white/20">
                                        <button
                                            onClick={() => setMediaTab('video')}
                                            className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${mediaTab === 'video'
                                                ? 'bg-amber-400 text-gray-950 shadow-sm'
                                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            Video & Phóng sự
                                        </button>
                                        <button
                                            onClick={() => setMediaTab('infographic')}
                                            className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${mediaTab === 'infographic'
                                                ? 'bg-amber-400 text-gray-950 shadow-sm'
                                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            Infographic Chính sách
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {mediaTab === 'video' ? (
                                <div className="bg-gradient-to-b from-[#fdf7ea] to-[#faeed0] rounded-2xl overflow-hidden border border-amber-300/80 grid grid-cols-1 lg:grid-cols-3 shadow-sm">
                                    {/* Video Player chính */}
                                    <div className="lg:col-span-2 relative group aspect-video bg-black overflow-hidden shadow-sm block cursor-pointer">
                                        <img
                                            src={hanoiMultimediaData.videos[0].thumb}
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
                                                Thời lượng: {hanoiMultimediaData.videos[0].duration}
                                            </span>
                                            <h3 className="text-white font-bold text-lg md:text-xl drop-shadow mb-1">
                                                {hanoiMultimediaData.videos[0].title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                                                {hanoiMultimediaData.videos[0].desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Playlist bên phải */}
                                    <div className="lg:col-span-1 p-4 h-full flex flex-col bg-gradient-to-b from-[#fffcf5] to-[#fcf3e1] border-t lg:border-t-0 lg:border-l border-amber-200/80 divide-y divide-amber-200/60">
                                        <div className="text-xs font-bold text-amber-900/70 uppercase tracking-wider pb-2">
                                            Phóng sự chuyên đề mới nhất
                                        </div>
                                        <div className="flex-1 overflow-y-auto space-y-3 pt-2">
                                            {hanoiMultimediaData.videos.map((vid) => (
                                                <div key={vid.id} className="flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-amber-100/60 group cursor-pointer">
                                                    <div className="w-[110px] shrink-0 relative aspect-video overflow-hidden rounded-lg bg-gray-200 border border-amber-200/70">
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
                                    {hanoiMultimediaData.infographics.map((info) => (
                                        <div key={info.id} className="bg-gradient-to-b from-[#fffdf7] via-[#fefaf1] to-[#fef5e2] rounded-xl overflow-hidden border border-amber-300/80 shadow-sm hover:shadow-md hover:border-amber-500 transition flex flex-col group cursor-pointer hanoi-card-interactive">
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
                                                <div className="flex items-center justify-between text-xs text-amber-900/60 pt-2 border-t border-amber-200/60">
                                                    <span className="flex items-center gap-1"><Eye size={12} /> {info.views} lượt xem</span>
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {info.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 7. KHỐI TIỆN ÍCH SỐ & DỊCH VỤ CÔNG TƯ PHÁP THỦ ĐÔ */}
                <section id="tien-ich-so" className="py-6 hanoi-animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        {/* Header Khối Tiện ích số phong cách đồng bộ Banner Cổng Hà Nội (#4f56ca -> #2c1b92 -> #4f56ca) */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] p-4 mb-6 text-white shadow-md border-b-2 border-amber-400">
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-400/25 blur-xl pointer-events-none" />
                            <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-400/25 blur-xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-white uppercase drop-shadow-sm">
                                        Tiện ích tư pháp số & Dịch vụ công Thủ đô
                                    </h2>
                                    <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-0.5" />
                                </div>
                                <span className="text-xs text-amber-200/90 font-medium px-3.5 py-1 bg-white/10 rounded-full border border-white/15 backdrop-blur-xs">
                                    Nền tảng số hóa kết nối trực tuyến Chính quyền - Công dân - Doanh nghiệp
                                </span>
                            </div>
                        </div>

                        {/* 3 Khối Tiện ích Thiết Kế Tinh Gọn, Cân Đối & Đẹp Mắt */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1: Ứng dụng iHanoi */}
                            <div className="bg-gradient-to-br from-[#ffffff] via-[#fdf7ea] to-[#f9f7f3] text-gray-900 rounded-2xl p-6 sm:p-7 border-2 border-amber-300/70 shadow-xl shadow-amber-900/10 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-1.5 hover:border-amber-400 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                                {/* Watermark icon chìm xoay nhẹ khi hover */}
                                <Smartphone className="text-amber-900/5 absolute -bottom-8 -right-8 w-52 h-52 pointer-events-none group-hover:scale-105 group-hover:rotate-6 transition-all duration-500" />
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-colors duration-300" />

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 text-gray-950 flex items-center justify-center shadow-lg shadow-amber-400/30 group-hover:scale-105 transition-transform duration-300">
                                            <Smartphone size={26} />
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7a4a00] bg-white/70 backdrop-blur-md border border-amber-300 px-3 py-1 rounded-full">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)] animate-pulse" />
                                            Trực tuyến 24/7
                                        </span>
                                    </div>

                                    <div>
                                        <div className="text-xs text-[#b45309] font-bold uppercase tracking-normal mb-1">
                                            Nền tảng công dân số
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#2c1b92] group-hover:text-[#4f56ca] transition-colors">
                                            Ứng dụng iHanoi
                                        </h3>
                                    </div>

                                    <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                                        Kênh tiếp nhận, xử lý và phản hồi nhanh các phản ánh, kiến nghị về tư pháp, hành chính và đời sống dân sinh của nhân dân Thủ đô.
                                    </p>

                                    {/* 3 Điểm nổi bật tinh gọn */}
                                    <div className="space-y-2 pt-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Tiếp nhận phản ánh hiện trường tư pháp 24/7</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Tra cứu hơn 1.800 thủ tục hành chính số</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Xử lý và phân luồng giải quyết trong 24 giờ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 relative z-10">
                                    <a
                                        href="https://ihanoi.gov.vn"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] hover:from-[#5b62d6] hover:to-[#3a28a8] text-white font-bold text-xs uppercase py-3.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 group/btn"
                                    >
                                        <span>Truy cập Cổng iHanoi</span>
                                        <ExternalLink size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            {/* Card 2: Trợ giúp pháp lý 30 quận/huyện */}
                            <div className="bg-gradient-to-br from-[#ffffff] via-[#fdf7ea] to-[#f9f7f3] text-gray-900 rounded-2xl p-6 sm:p-7 border-2 border-amber-300/70 shadow-xl shadow-amber-900/10 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-1.5 hover:border-amber-400 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                                {/* Watermark icon chìm xoay nhẹ khi hover */}
                                <Scale className="text-amber-900/5 absolute -bottom-8 -right-8 w-52 h-52 pointer-events-none group-hover:scale-105 group-hover:rotate-6 transition-all duration-500" />
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-colors duration-300" />

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-rose-400 via-amber-300 to-amber-200 text-gray-950 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform duration-300">
                                            <Scale size={26} />
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7a4a00] bg-white/70 backdrop-blur-md border border-amber-300 px-3 py-1 rounded-full">
                                            <CheckCircle2 size={13} className="text-[#b45309]" />
                                            100% Miễn phí
                                        </span>
                                    </div>

                                    <div>
                                        <div className="text-xs text-[#b45309] font-bold uppercase tracking-normal mb-1">
                                            Bảo đảm an sinh xã hội
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#2c1b92] group-hover:text-[#4f56ca] transition-colors">
                                            Trợ giúp pháp lý 30 Quận/Huyện
                                        </h3>
                                    </div>

                                    <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                                        Bảo vệ quyền và lợi ích hợp pháp miễn phí cho người có công, hộ nghèo và các đối tượng chính sách trên toàn địa bàn Thủ đô.
                                    </p>

                                    {/* 3 Điểm nổi bật tinh gọn */}
                                    <div className="space-y-2 pt-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Miễn phí 100% án phí và thù lao cử luật sư</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>8 Chi nhánh phụ trách toàn bộ 30 quận, huyện</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Tổng đài tư vấn thường trực: 1800 6868</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 relative z-10">
                                    <Link
                                        to="/ha-noi/tro-giup-phap-ly"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] hover:from-[#5b62d6] hover:to-[#3a28a8] text-white font-bold text-xs uppercase py-3.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 group/btn"
                                    >
                                        <span>Tra cứu danh bạ chi nhánh</span>
                                        <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Card 3: Hỗ trợ pháp lý Doanh nghiệp */}
                            <div className="bg-gradient-to-br from-[#ffffff] via-[#fdf7ea] to-[#f9f7f3] text-gray-900 rounded-2xl p-6 sm:p-7 border-2 border-amber-300/70 shadow-xl shadow-amber-900/10 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-1.5 hover:border-amber-400 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                                {/* Watermark icon chìm xoay nhẹ khi hover */}
                                <Building2 className="text-amber-900/5 absolute -bottom-8 -right-8 w-52 h-52 pointer-events-none group-hover:scale-105 group-hover:rotate-6 transition-all duration-500" />
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-colors duration-300" />

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-200 text-gray-950 flex items-center justify-center shadow-lg shadow-cyan-400/30 group-hover:scale-105 transition-transform duration-300">
                                            <Building2 size={26} />
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7a4a00] bg-white/70 backdrop-blur-md border border-amber-300 px-3 py-1 rounded-full">
                                            <Sparkles size={13} className="text-[#b45309]" />
                                            Luật Thủ Đô 2024
                                        </span>
                                    </div>

                                    <div>
                                        <div className="text-xs text-[#b45309] font-bold uppercase tracking-normal mb-1">
                                            Đồng hành cùng doanh nghiệp
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#2c1b92] group-hover:text-[#4f56ca] transition-colors">
                                            Hỗ trợ Pháp lý Doanh nghiệp
                                        </h3>
                                    </div>

                                    <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                                        Tư vấn, tháo gỡ rào cản thể chế, đầu tư, đất đai và cơ chế thử nghiệm công nghệ cao cho cộng đồng doanh nghiệp Thủ đô.
                                    </p>

                                    {/* 3 Điểm nổi bật tinh gọn */}
                                    <div className="space-y-2 pt-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Cơ chế Sandbox thử nghiệm công nghệ & AI</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Tư vấn chính sách ưu đãi thuế và đầu tư</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-800">
                                            <CheckCircle2 size={15} className="text-[#b45309] shrink-0" />
                                            <span>Mạng lưới hơn 5.000 Luật sư uy tín đồng hành</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 relative z-10">
                                    <Link
                                        to="/ha-noi/ho-tro-phap-ly-doanh-nghiep"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] hover:from-[#5b62d6] hover:to-[#3a28a8] text-white font-bold text-xs uppercase py-3.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 group/btn"
                                    >
                                        <span>Gửi yêu cầu tư vấn DN</span>
                                        <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. KHỐI HOTLINE - ĐƯỜNG DÂY NÓNG (TAB: SỞ TƯ PHÁP / TRUNG TÂM TGPL / TỔ CHỨC HÀNH NGHỀ LUẬT SƯ) */}
                <HanoiHotline />
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiHomePage;


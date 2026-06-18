import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Shield, Share2, Crown, Trophy, LogIn, LogOut, X, MessageSquare, Clock, Eye, User, ChevronRight, HelpCircle, Lightbulb, History, ArrowRight, BookOpen, Sparkles, ExternalLink, TrendingUp, Newspaper, Megaphone, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CreateCauHoiModal from '../pages/cau-hoi-phap-luat/CreateCauHoiModal';
import ActivityStatistics from './ActivityStatistics';

const DOCK_ITEMS = [
    { id: 'home', label: 'Trang chủ', icon: Home, path: '/trang-chu-v3' },
    { id: 'news-highlights', label: 'Tin tức nổi bật', icon: Newspaper, path: '/trang-chu-v3', action: 'scroll', targetId: 'tin-tuc-noi-bat' },
    { id: 'pakn', label: 'Phản ánh kiến nghị', icon: Megaphone, path: '/trang-chu-v3', action: 'scroll', targetId: 'phan-anh-kien-nghi' },
    { id: 'search', label: 'Tra cứu văn bản', icon: FileText, path: '/van-ban' },
    { id: 'qa', label: 'Hỏi đáp pháp luật', icon: Shield, path: '/cau-hoi-phap-luat' },
    { id: 'tieudiem', label: 'Tiêu điểm', icon: Sparkles, path: '/tin-tuc/noi-bat' },
    { id: 'forum', label: 'Diễn đàn thảo luận', icon: MessageSquare, path: '/dien-dan' },
    { id: 'hienke', label: 'Hiến kế', icon: Lightbulb, path: '/hien-ke' },
    { id: 'notebook', label: 'Sổ tay pháp luật', icon: BookOpen, path: '/ca-nhan/bo-suu-tap' },
    { id: 'user-history', label: 'Lịch sử cá nhân', icon: History, path: '/ca-nhan/lich-su' },
    { id: 'stats', label: 'Thống kê', icon: TrendingUp, path: null }
];

const POPUP_CONTENTS = {
    stats: {
        title: "Thống kê Hệ thống",
        mainPath: "/trang-chu-v3"
    },
    search: {
        title: "Tra cứu Văn bản pháp luật",
        listTitle: "Văn bản mới ban hành nổi bật",
        items: [
            {
                title: "Nghị định 24/2026/NĐ-CP về quản lý và phát triển thương mại điện tử",
                icon: FileText,
                meta: [
                    <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">Đang có hiệu lực</span>,
                    <span>Ban hành: 12/06/2026</span>
                ],
                path: "/van-ban/1"
            },
            {
                title: "Luật Đất đai (sửa đổi) 2024 - Quy định bồi thường giải phóng mặt bằng",
                icon: FileText,
                meta: [
                    <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">Đang có hiệu lực</span>,
                    <span>Ban hành: 28/05/2026</span>
                ],
                path: "/van-ban/2"
            },
            {
                title: "Quyết định 631/QĐ-BYT về Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026",
                icon: FileText,
                meta: [
                    <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">Đang có hiệu lực</span>,
                    <span>Ban hành: 10/05/2026</span>
                ],
                path: "/van-ban/5"
            }
        ],
        links: [
            { label: "Mới ban hành", path: "/van-ban/moi-ban-hanh" },
            { label: "Đang có hiệu lực", path: "/van-ban/hieu-luc" },
            { label: "Tìm nâng cao", path: "/van-ban" }
        ],
        mainLabel: "Truy cập Cổng Tra cứu Văn bản",
        mainPath: "/van-ban"
    },
    qa: {
        title: "Tư vấn & Hỏi đáp Pháp luật",
        listTitle: "Câu hỏi thường gặp & Tình huống nổi bật",
        items: [
            {
                title: "Thủ tục xin cấp Giấy chứng nhận quyền sử dụng đất lần đầu thực hiện thế nào?",
                icon: HelpCircle,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Đất đai</span>,
                    <span className="flex items-center gap-0.5"><Eye size={11} /> 142</span>
                ],
                path: "/cau-hoi-phap-luat/1"
            },
            {
                title: "Mức xử phạt hành vi chậm nộp thuế thu nhập cá nhân năm 2026 là bao nhiêu?",
                icon: HelpCircle,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Thuế - Doanh nghiệp</span>,
                    <span className="flex items-center gap-0.5"><Eye size={11} /> 98</span>
                ],
                path: "/cau-hoi-phap-luat/2"
            },
            {
                title: "Người lao động đơn phương chấm dứt hợp đồng lao động cần báo trước bao lâu?",
                icon: HelpCircle,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Lao động</span>,
                    <span className="flex items-center gap-0.5"><Eye size={11} /> 115</span>
                ],
                path: "/cau-hoi-phap-luat/3"
            }
        ],
        links: [
            { label: "Xem tất cả Q&A", path: "/cau-hoi-phap-luat" },
            { label: "Danh sách Chuyên gia", path: "/cau-hoi-phap-luat/chuyen-gia" },
            { label: "Đặt lịch tư vấn", path: "/cau-hoi-phap-luat/chuyen-gia/1/dat-lich" }
        ],
        mainLabel: "Đến trang Hỏi đáp pháp lý",
        mainPath: "/cau-hoi-phap-luat"
    },
    tieudiem: {
        title: "Tin tức Tiêu điểm nổi bật",
        listTitle: "Danh sách tiêu điểm nổi bật",
        items: {
            news: [
                {
                    title: "Thủ tướng Chính phủ chỉ đạo các giải pháp cấp bách tháo gỡ khó khăn cho sản xuất, kinh doanh",
                    icon: Newspaper,
                    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
                    meta: [
                        <span className="font-semibold text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded text-[10px] border border-rose-500/20">Quan trọng</span>,
                        "18/06/2026 09:30"
                    ],
                    path: "/news/1"
                },
                {
                    title: "Chính thức ban hành quy định mới về quản lý thuế đối với thương mại điện tử xuyên biên giới",
                    icon: Newspaper,
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Chính sách</span>,
                        "14/06/2026 08:00"
                    ],
                    path: "/news/8"
                }
            ],
            draft: [
                {
                    title: "Công bố lấy ý kiến Nhân dân đối với dự thảo Nghị định sửa đổi Luật Đất đai năm 2024",
                    icon: FileText,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20">Dự thảo</span>,
                        "17/06/2026 15:45"
                    ],
                    path: "/du-thao/1"
                },
                {
                    title: "Dự thảo Luật Thuế giá trị gia tăng (sửa đổi) trình Quốc hội",
                    icon: FileText,
                    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d04?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20">Dự thảo</span>,
                        "16/06/2026 14:20"
                    ],
                    path: "/du-thao/2"
                }
            ],
            qa: [
                {
                    title: "Quy định mới nhất về điều kiện tách thửa đất ở tại TP.HCM",
                    icon: HelpCircle,
                    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">Hỏi đáp</span>,
                        "18/06/2026 11:00"
                    ],
                    path: "/cau-hoi-phap-luat/1"
                },
                {
                    title: "Thủ tục và hồ sơ xin cấp Giấy phép lao động cho người nước ngoài",
                    icon: HelpCircle,
                    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">Hỏi đáp</span>,
                        "15/06/2026 09:15"
                    ],
                    path: "/cau-hoi-phap-luat/2"
                }
            ],
            forum: [
                {
                    title: "Thảo luận về những bất cập trong việc áp dụng bảng giá đất mới",
                    icon: MessageSquare,
                    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded text-[10px] border border-purple-500/20">Diễn đàn</span>,
                        "18/06/2026 13:45"
                    ],
                    path: "/dien-dan/1"
                },
                {
                    title: "Chia sẻ kinh nghiệm: Đăng ký bảo hộ nhãn hiệu trực tuyến",
                    icon: MessageSquare,
                    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200",
                    meta: [
                        <span className="font-semibold text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded text-[10px] border border-purple-500/20">Diễn đàn</span>,
                        "17/06/2026 10:30"
                    ],
                    path: "/dien-dan/2"
                }
            ]
        },
        links: [
            { label: "Tin tức nổi bật", path: "/tin-tuc/noi-bat" },
            { label: "Tổng rà soát VBQPPL", path: "/tong-ra-soat" },
            { label: "Dự thảo mới", path: "/du-thao" }
        ],
        mainLabel: "Truy cập chuyên mục Tiêu điểm",
        mainPath: "/tin-tuc/noi-bat"
    },
    forum: {
        title: "Diễn đàn thảo luận pháp luật",
        listTitle: "Chủ đề diễn đàn nổi bật",
        items: [
            {
                title: "Thảo luận về các điểm mới của Luật Đất đai mới ảnh hưởng tới thị trường BĐS",
                icon: MessageSquare,
                meta: [
                    <span className="flex items-center gap-0.5"><User size={11} /> Hùng Nguyễn</span>,
                    <span className="flex items-center gap-0.5"><Clock size={11} /> 10/05/2026</span>,
                    <span className="text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20 font-semibold">32 phản hồi</span>
                ],
                path: "/dien-dan/bai-viet/1"
            },
            {
                title: "Vướng mắc khi áp dụng quy định mới về hóa đơn điện tử khởi tạo từ máy tính tiền",
                icon: MessageSquare,
                meta: [
                    <span className="flex items-center gap-0.5"><User size={11} /> Tuấn Phạm</span>,
                    <span className="flex items-center gap-0.5"><Clock size={11} /> 05/05/2026</span>,
                    <span className="text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20 font-semibold">18 phản hồi</span>
                ],
                path: "/dien-dan/bai-viet/2"
            },
            {
                title: "Kinh nghiệm giải quyết tranh chấp hợp đồng thương mại quốc tế bằng trọng tài",
                icon: MessageSquare,
                meta: [
                    <span className="flex items-center gap-0.5"><User size={11} /> LS. Lê Nam</span>,
                    <span className="flex items-center gap-0.5"><Clock size={11} /> 01/05/2026</span>,
                    <span className="text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20 font-semibold">45 phản hồi</span>
                ],
                path: "/dien-dan/bai-viet/3"
            }
        ],
        links: [
            { label: "Các chuyên mục", path: "/dien-dan" },
            { label: "Sự kiện Livestream", path: "/dien-dan/su-kien" },
            { label: "Tạo chủ đề mới", path: "/dien-dan/tao-moi" }
        ],
        mainLabel: "Truy cập Diễn đàn Thảo luận",
        mainPath: "/dien-dan"
    },
    hienke: {
        title: "Hiến kế",
        listTitle: "Hiến kế & Sáng kiến tiêu biểu",
        items: [
            {
                title: "Giải pháp tối giản hóa thủ tục hành chính trong đăng ký hộ tịch trực tuyến",
                icon: Lightbulb,
                meta: [
                    <span className="font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20">Đang thẩm định</span>,
                    <span>Tác giả: Trần Minh Đức</span>
                ],
                path: "/hien-ke/doi-song"
            },
            {
                title: "Đề xuất ứng dụng trí tuệ nhân tạo hỗ trợ công dân tra cứu hồ sơ lý lịch tư pháp",
                icon: Lightbulb,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Đã tiếp nhận</span>,
                    <span>Tác giả: Nguyễn Thị Lan</span>
                ],
                path: "/hien-ke/doi-song"
            },
            {
                title: "Sáng kiến xanh hóa giao thông công cộng tại các đô thị loại I ở Việt Nam",
                icon: Lightbulb,
                meta: [
                    <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-100">Đang khảo sát</span>,
                    <span>Tác giả: Lê Anh Tuấn</span>
                ],
                path: "/hien-ke/doi-song"
            }
        ],
        links: [
            { label: "Gửi hiến kế mới", path: "/hien-ke/gop-y-nhanh" },
            { label: "Hiến kế nổi bật", path: "/hien-ke/doi-song" },
            { label: "Quy trình xử lý", path: "/hien-ke/quy-trinh" }
        ],
        mainLabel: "Vào trang Hiến kế",
        mainPath: "/hien-ke"
    },
    notebook: {
        title: "Sổ tay Pháp luật cá nhân",
        listTitle: "Ghi chú văn bản gần đây của bạn",
        items: [
            {
                title: "Ghi chú Luật Đất đai: Quy định đền bù tái định cư tại Điều 89",
                icon: BookOpen,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Đất đai</span>,
                    <span>Cập nhật: Hôm nay</span>
                ],
                path: "/ca-nhan/bo-suu-tap"
            },
            {
                title: "Ghi chú Nghị định 123/NĐ-CP: Thời điểm lập hóa đơn điện tử hợp lệ",
                icon: BookOpen,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Doanh nghiệp</span>,
                    <span>Cập nhật: 3 ngày trước</span>
                ],
                path: "/ca-nhan/bo-suu-tap"
            },
            {
                title: "Ghi chú Luật Lao động: Điều kiện hưởng bảo hiểm xã hội 1 lần",
                icon: BookOpen,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/20">Lao động</span>,
                    <span>Cập nhật: 12/06/2026</span>
                ],
                path: "/ca-nhan/bo-suu-tap"
            }
        ],
        links: [
            { label: "Văn bản đã lưu", path: "/ca-nhan/bo-suu-tap" },
            { label: "Ghi chú gần đây", path: "/ca-nhan/bo-suu-tap" },
            { label: "Bộ sưu tập của tôi", path: "/ca-nhan/bo-suu-tap" }
        ],
        mainLabel: "Vào Sổ tay & Ghi chú của tôi",
        mainPath: "/ca-nhan/bo-suu-tap"
    },
    'user-history': {
        title: "Cổng thông tin Cá nhân",
        listTitle: "Yêu cầu & Hoạt động gần đây của bạn",
        items: [
            {
                title: "Hỏi đáp: Thủ tục chuyển nhượng quyền sử dụng đất hộ gia đình",
                icon: History,
                meta: [
                    <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-100">Đã trả lời</span>,
                    <span>Cập nhật: 13:45 hôm nay</span>
                ],
                path: "/ca-nhan/cau-hoi-ca-nhan"
            },
            {
                title: "Hiến kế: Đề xuất cải tiến hệ thống cấp mã định danh cá nhân trực tuyến",
                icon: History,
                meta: [
                    <span className="font-semibold text-blue-300 bg-blue-500/15 px-1.5 py-0.5 rounded text-[10px] border border-blue-100">Đã tiếp nhận</span>,
                    <span>Cập nhật: Hôm qua</span>
                ],
                path: "/ca-nhan/hien-ke"
            },
            {
                title: "Phản ánh: Chậm trễ giải quyết hồ sơ đăng ký kinh doanh tại địa phương",
                icon: History,
                meta: [
                    <span className="font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-100">Đang xử lý</span>,
                    <span>Cập nhật: 15/06/2026</span>
                ],
                path: "/ca-nhan/phan-anh-kien-nghi"
            }
        ],
        links: [
            { label: "Lịch sử câu hỏi", path: "/ca-nhan/cau-hoi-ca-nhan" },
            { label: "Phản ánh của tôi", path: "/ca-nhan/phan-anh-kien-nghi" },
            { label: "Hiến kế cá nhân", path: "/ca-nhan/hien-ke" }
        ],
        mainLabel: "Vào Trang cá nhân của tôi",
        mainPath: "/ca-nhan/lich-su"
    }
};

const NationalEmblem = () => (
    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shrink-0 border border-yellow-400 shadow-[0_0_4px_rgba(251,191,36,0.6)]">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-yellow-400 fill-current">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
        </svg>
    </div>
);

const InteractiveDock = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const [activeTab, setActiveTab] = useState(null); // active tab ID
    const [activeTieudiemTab, setActiveTieudiemTab] = useState('all');
    const [showWelcome, setShowWelcome] = useState(false);
    const [isCreateCauHoiModalOpen, setIsCreateCauHoiModalOpen] = useState(false);

    useEffect(() => {
        // Slide open after a brief delay
        const openTimer = setTimeout(() => {
            setShowWelcome(true);
        }, 300);

        // Slide closed after 5 seconds of display (5300ms total)
        const closeTimer = setTimeout(() => {
            setShowWelcome(false);
        }, 5300);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        };
    }, []);

    const handleItemClick = (item) => {
        if (item.id === 'home') {
            setActiveTab(null);
            navigate(item.path);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (item.action === 'scroll') {
            setActiveTab(null);
            if (location.pathname !== item.path) {
                navigate(item.path);
                setTimeout(() => {
                    const el = document.getElementById(item.targetId);
                    if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }, 300);
            } else {
                const el = document.getElementById(item.targetId);
                if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        } else {
            // Toggle or change tab
            if (activeTab === item.id) {
                setActiveTab(null);
            } else {
                setActiveTab(item.id);
            }
        }
    };

    const handleAuthClick = () => {
        setActiveTab(null);
        if (user) {
            logout();
            navigate('/trang-chu-v3');
        } else {
            navigate('/dang-nhap');
        }
    };

    const currentChat = POPUP_CONTENTS[activeTab];

    return (
        <>
            {/* Click Outside Backdrop */}
            {activeTab && (
                <div
                    className="fixed inset-0 z-[90] bg-transparent"
                    onClick={() => setActiveTab(null)}
                />
            )}

            <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[100] animate-slideUp flex flex-col items-center">

                {/* Popover Window (Modern Dark Glassmorphism) */}
                {activeTab && currentChat && (
                    <div className={`w-[92vw] sm:w-[640px] md:w-[768px] ${activeTab === 'stats' ? 'lg:w-[1024px] xl:w-[1200px]' : 'lg:w-[900px] xl:w-[960px]'} bg-gradient-to-br from-[#162e55]/95 via-[#102444]/95 to-[#0b172e]/98 backdrop-blur-xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden mb-4 animate-popIn text-white relative rounded-2xl`}>
                        {/* Glowing decorative blur lines */}
                        <div className="absolute -inset-px bg-gradient-to-r from-sky-500/20 via-indigo-500/10 to-amber-500/15 pointer-events-none -z-10"></div>
                        <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-transparent shrink-0">
                            <div className="flex items-center gap-2.5">
                                <NationalEmblem />
                                <span className="font-bold text-white text-[15px] md:text-[16px] tracking-tight">{currentChat.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => {
                                        window.open(currentChat.mainPath, '_blank');
                                        setActiveTab(null);
                                    }}
                                    title="Mở trong tab mới"
                                    className="text-white/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                                >
                                    <ExternalLink size={16} />
                                </button>
                                <button
                                    onClick={() => setActiveTab(null)}
                                    title="Đóng"
                                    className="text-white/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Content Panel */}
                        {activeTab === 'stats' ? (
                            <div className="w-full bg-[#314568f2] sm:rounded-b-2xl min-h-[580px]">
                                <ActivityStatistics />
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-black/10 min-h-[440px]">
                                {activeTab === 'qa' ? (
                                    <>
                                        {/* Left Column for QA: Outstanding List (70%) */}
                                        <div className="w-full sm:w-[70%] p-6 flex flex-col gap-4 min-w-0 bg-[#314568f2] sm:rounded-bl-2xl">
                                            <div className="text-[11px] font-semibold text-white/50 uppercase flex items-center justify-between">
                                                <span>{currentChat.listTitle}</span>
                                                <span className="text-[10px] text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30 font-bold">Quan tâm nhiều</span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 mb-1">
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-inner">
                                                    <h4 className="text-lg font-black text-amber-300 drop-shadow-sm">12.5K</h4>
                                                    <p className="text-[9.5px] text-white/60 font-semibold uppercase mt-0.5">Câu hỏi</p>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-inner">
                                                    <h4 className="text-lg font-black text-blue-400 drop-shadow-sm">842</h4>
                                                    <p className="text-[9.5px] text-white/60 font-semibold uppercase mt-0.5">Chuyên gia</p>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-inner">
                                                    <h4 className="text-lg font-black text-emerald-400 drop-shadow-sm">98%</h4>
                                                    <p className="text-[9.5px] text-white/60 font-semibold uppercase mt-0.5">Đã giải đáp</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3.5 overflow-y-auto custom-scrollbar pr-2">
                                                {currentChat.items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => {
                                                            setActiveTab(null);
                                                            navigate(item.path);
                                                        }}
                                                        className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer group min-w-0"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-blue-600 group-hover:text-white text-blue-300 flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5">
                                                            <item.icon size={18} />
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <h4 className="text-[13px] font-bold text-white/95 group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
                                                                {item.title}
                                                            </h4>
                                                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10.5px] text-white/40">
                                                                {item.meta.map((m, mIdx) => (
                                                                    <span key={mIdx} className="flex items-center gap-1.5">
                                                                        {mIdx > 0 && <span className="text-white/20">•</span>}
                                                                        {m}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={13} className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all mt-2.5 shrink-0" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column for QA: Vivid Banner (30%) */}
                                        <div className="w-full sm:w-[30%] p-6 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-600/80 to-indigo-800/80 sm:rounded-br-2xl border-l border-white/5 relative overflow-hidden group shrink-0">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

                                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 shadow-lg backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                                <HelpCircle size={32} className="text-amber-300" />
                                            </div>
                                            <h3 className="text-[16px] font-bold text-white text-center leading-tight relative z-10">
                                                Bạn có vướng mắc pháp lý?
                                            </h3>
                                            <p className="text-[12px] text-blue-100 text-center mb-4 relative z-10">
                                                Chuyên gia và luật sư của chúng tôi luôn sẵn sàng hỗ trợ giải đáp.
                                            </p>
                                            <button
                                                onClick={() => setIsCreateCauHoiModalOpen(true)}
                                                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 text-[13px] font-bold rounded-xl shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] mt-auto relative z-10"
                                            >
                                                <MessageSquare size={16} />
                                                <span>Đặt câu hỏi</span>
                                            </button>
                                        </div>
                                    </>
                                ) : activeTab === 'tieudiem' ? (
                                    (() => {
                                        let displayItems = [];
                                        if (activeTieudiemTab === 'all') {
                                            displayItems = [
                                                ...currentChat.items.news,
                                                ...currentChat.items.draft,
                                                ...currentChat.items.qa,
                                                ...currentChat.items.forum
                                            ];
                                        } else {
                                            displayItems = currentChat.items[activeTieudiemTab] || [];
                                        }
                                        
                                        if (displayItems.length === 0) return null;
                                        
                                        const heroItem = displayItems[0];
                                        const listItems = displayItems.slice(1);

                                        return (
                                            <div className="w-full bg-[#314568f2] sm:rounded-b-2xl shadow-inner min-h-[580px] overflow-hidden flex flex-col">
                                                {/* Tab Bar */}
                                                <div className="p-4 border-b border-white/10 flex flex-wrap justify-center gap-2 bg-black/10">
                                                    {[
                                                        { id: 'all', label: 'Tất cả' },
                                                        { id: 'news', label: 'Tin tức' },
                                                        { id: 'draft', label: 'Dự thảo' },
                                                        { id: 'qa', label: 'Hỏi đáp' },
                                                        { id: 'forum', label: 'Diễn đàn' }
                                                    ].map(tab => (
                                                        <button
                                                            key={tab.id}
                                                            onClick={() => setActiveTieudiemTab(tab.id)}
                                                            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                                                                activeTieudiemTab === tab.id 
                                                                ? 'bg-blue-500 text-white shadow-md' 
                                                                : 'text-white/60 hover:text-white hover:bg-white/10'
                                                            }`}
                                                        >
                                                            {tab.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Magazine Layout */}
                                                <div className="flex flex-col sm:flex-row flex-grow min-h-0">
                                                    {/* Left Column: Hero Article (55%) */}
                                                    <div className="w-full sm:w-[55%] p-6 flex flex-col justify-end relative overflow-hidden group cursor-pointer border-r border-white/5" onClick={() => { setActiveTab(null); navigate(heroItem.path); }}>
                                                        <div 
                                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-50" 
                                                            style={{ backgroundImage: `url(${heroItem.image})` }}
                                                        ></div>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b172e] via-[#0b172e]/80 to-[#0b172e]/20"></div>

                                                        <div className="relative z-10 flex flex-col gap-3">
                                                            <div className="flex gap-2 items-center">
                                                                <span className="bg-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-sm tracking-wider shadow-lg">Tiêu điểm nóng</span>
                                                                <span className="bg-white/20 backdrop-blur-md text-white/90 text-[10px] font-bold px-2 py-1 rounded-sm border border-white/10">{heroItem.meta[1]}</span>
                                                            </div>
                                                            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-rose-300 transition-colors drop-shadow-md">
                                                                {heroItem.title}
                                                            </h3>
                                                            <p className="text-sm text-slate-300 line-clamp-2 mt-1">
                                                                Toàn cảnh về các điểm mới và chính sách nổi bật sắp được ban hành, tác động sâu rộng đến đời sống kinh tế xã hội và quyền lợi của người dân.
                                                            </p>
                                                            <div className="flex items-center text-rose-400 text-xs font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform mt-2">
                                                                Đọc bài viết <ArrowRight size={14} className="ml-1.5" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right Column: Other News (45%) */}
                                                    <div className="w-full sm:w-[45%] p-6 flex flex-col gap-4 bg-[#314568f2] relative z-10 min-h-0 overflow-y-auto custom-scrollbar">
                                                        <div className="text-[11px] font-semibold text-white/50 uppercase flex items-center justify-between mb-2 shrink-0">
                                                            <span>Các tin tức khác</span>
                                                            <button onClick={() => { setActiveTab(null); navigate('/tin-tuc/noi-bat'); }} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">Xem tất cả <ChevronRight size={14} /></button>
                                                        </div>
                                                        <div className="flex flex-col gap-3 flex-grow">
                                                            {listItems.map((item, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    onClick={() => { setActiveTab(null); navigate(item.path); }}
                                                                    className="group flex gap-4 items-start p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/10 shrink-0"
                                                                >
                                                                    <div className="w-16 h-16 rounded-lg bg-slate-800 shrink-0 overflow-hidden relative shadow-inner">
                                                                        {item.image ? (
                                                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                        ) : (
                                                                            <>
                                                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500"></div>
                                                                                <Sparkles size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 group-hover:text-amber-300 transition-colors" />
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-grow min-w-0 flex flex-col justify-center gap-1.5">
                                                                        <h4 className="text-[13px] font-bold text-white/90 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                                                            {item.title}
                                                                        </h4>
                                                                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-white/40">
                                                                            {item.meta[0]}
                                                                            <span className="opacity-50">•</span>
                                                                            {item.meta[1]}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            
                                                            {/* Hot links / Keywords */}
                                                            <div className="mt-auto pt-5 border-t border-white/10">
                                                                <div className="text-[10.5px] font-bold text-white/40 uppercase mb-3 flex items-center gap-1.5"><TrendingUp size={12} /> Chủ đề xu hướng</div>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {['#LuậtĐấtĐai2024', '#ChínhSáchMới', '#KhởiNghiệp'].map(kw => (
                                                                        <span key={kw} onClick={() => { setActiveTab(null); navigate('/tim-kiem'); }} className="text-[11px] px-2.5 py-1 bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 rounded-full text-white/70 cursor-pointer transition-colors border border-white/5 hover:border-blue-500/30 font-medium">
                                                                            {kw}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()

                                ) : activeTab === 'user-history' ? (
                                    <div className="w-full p-6 flex flex-col gap-4 bg-[#314568f2] sm:rounded-b-2xl shadow-inner min-h-[580px] overflow-hidden">
                                        <div className="text-[12px] font-semibold text-white/50 uppercase flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Activity size={16} className="text-blue-400" />
                                                <span>Lịch sử hoạt động gần đây</span>
                                            </div>
                                            <button onClick={() => { setActiveTab(null); navigate('/ca-nhan/lich-su'); }} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-[11px] bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                                                Quản lý toàn bộ <ChevronRight size={14} className="ml-1" />
                                            </button>
                                        </div>

                                        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 pb-4">
                                            <div className="relative border-l border-white/10 ml-4 pl-6 space-y-5">
                                                {[
                                                    { id: 1001, time: '14:30', date: '19/03/2026', action: 'Đăng nhập hệ thống (Thành công)', status: 'success', icon: <CheckCircle size={14} className="text-emerald-400" />, theme: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                                                    { id: 1002, time: '14:35', date: '19/03/2026', action: 'Xem bài viết: "Quy định mới về bảo hiểm thất nghiệp từ 2026"', status: 'success', icon: <CheckCircle size={14} className="text-emerald-400" />, theme: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                                                    { id: 1003, time: '09:15', date: '18/03/2026', action: 'Bình luận tại bài viết: "Dự thảo Nghị định thu phí đường bộ cao tốc"', status: 'success', icon: <CheckCircle size={14} className="text-emerald-400" />, theme: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                                                    { id: 1004, time: '21:40', date: '17/03/2026', action: 'Tạo chủ đề diễn đàn: "Hỏi đáp về thủ tục thừa kế đất đai"', status: 'warning', icon: <AlertCircle size={14} className="text-amber-400" />, theme: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                                                    { id: 1005, time: '10:05', date: '15/03/2026', action: 'Lưu văn bản "Luật Đất đai số 31/2024/QH15" vào danh sách yêu thích', status: 'success', icon: <CheckCircle size={14} className="text-emerald-400" />, theme: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                                                ].map((log, index) => (
                                                    <div key={log.id} className="relative group">
                                                        {/* Timeline dot */}
                                                        <div className="absolute -left-[30px] top-4 w-3 h-3 rounded-full bg-[#1a2f4c] border-2 border-white/30 flex items-center justify-center shadow-sm z-10">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                                                        </div>

                                                        {/* Line connecting to next item (except last one) */}
                                                        {index < 4 && (
                                                            <div className="absolute -left-[25px] top-7 bottom-[-20px] w-px bg-white/10 z-0"></div>
                                                        )}

                                                        <div className="bg-white/5 border border-white/10 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:bg-white/10 cursor-pointer p-4 group-hover:-translate-y-0.5">
                                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                                <div className="flex-1 pr-4">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${log.theme} uppercase tracking-wide`}>
                                                                            {log.icon} {log.status === 'success' ? 'Hoàn tất' : 'Đang xử lý'}
                                                                        </span>
                                                                    </div>
                                                                    <h3 className="font-bold text-[13.5px] text-white/95 group-hover:text-blue-300 transition-colors leading-snug">{log.action}</h3>
                                                                </div>
                                                                <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                                                                    <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-blue-300 bg-blue-500/10 px-2.5 py-1.5 rounded-md border border-blue-500/20 shrink-0">
                                                                        <Clock size={13} />
                                                                        <span>{log.time} - {log.date}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Normal Left Column: Quick Links & Actions */}
                                        <div className="w-full sm:w-[220px] p-6 flex flex-col gap-4 shrink-0 bg-white/[0.02]">
                                            <div className="text-[11px] font-semibold text-white/50 uppercase">Lựa chọn nhanh</div>
                                            <div className="flex flex-col gap-2.5">
                                                {currentChat.links.map((link, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setActiveTab(null);
                                                            navigate(link.path);
                                                        }}
                                                        className="w-full text-left px-3.5 py-2 hover:bg-white/10 text-white/80 hover:text-white text-[12.5px] font-medium rounded-lg transition-all duration-200 flex items-center gap-2 group/link"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-60 group-hover/link:opacity-100 group-hover/link:bg-amber-300 transition-colors shrink-0" />
                                                        <span>{link.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Normal Right Column: Outstanding List */}
                                        <div className="flex-grow p-6 flex flex-col gap-4 min-w-0 bg-[#314568f2] sm:rounded-r-2xl border-l border-white/5 shadow-inner">
                                            <div className="text-[11px] font-semibold text-white/50 uppercase flex items-center justify-between">
                                                <span>{currentChat.listTitle}</span>
                                                <span className="text-[10px] text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30 font-bold">Nổi bật</span>
                                            </div>

                                            {activeTab === 'forum' && (
                                                <div className="grid grid-cols-3 gap-3 mb-1">
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-inner">
                                                        <h4 className="text-lg font-black text-amber-300 drop-shadow-sm">54.2K</h4>
                                                        <p className="text-[9.5px] text-white/60 font-semibold uppercase mt-0.5">Thành viên</p>
                                                    </div>
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-inner">
                                                        <h4 className="text-lg font-black text-blue-400 drop-shadow-sm">1,204</h4>
                                                        <p className="text-[9.5px] text-white/60 font-semibold uppercase mt-0.5">Chủ đề</p>
                                                    </div>
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-inner">
                                                        <h4 className="text-lg font-black text-emerald-400 drop-shadow-sm">8.9K</h4>
                                                        <p className="text-[9.5px] text-white/60 font-semibold uppercase mt-0.5">Tương tác</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-3.5 overflow-y-auto custom-scrollbar pr-2">
                                                {currentChat.items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => {
                                                            setActiveTab(null);
                                                            navigate(item.path);
                                                        }}
                                                        className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer group min-w-0"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-blue-600 group-hover:text-white text-blue-300 flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5">
                                                            <item.icon size={18} />
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <h4 className="text-[13px] font-bold text-white/95 group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
                                                                {item.title}
                                                            </h4>
                                                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10.5px] text-white/40">
                                                                {item.meta.map((m, mIdx) => (
                                                                    <span key={mIdx} className="flex items-center gap-1.5">
                                                                        {mIdx > 0 && <span className="text-white/20">•</span>}
                                                                        {m}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={13} className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all mt-2.5 shrink-0" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Main Dock Container */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-[#879bc6]/90 via-[#7973e2]/90 to-[#879bc6]/90 backdrop-blur-xl border border-white/25 px-6 py-3 rounded-[24px] shadow-[0_15px_45px_rgba(121,115,226,0.3)] transition-all duration-300 hover:shadow-[0_20px_55px_rgba(121,115,226,0.45)]">
                    {/* Welcome Message (slides open, then collapses after 5s) */}
                    <div
                        className="flex items-center gap-2 border-r border-white/20 transition-all duration-700 ease-in-out overflow-hidden whitespace-nowrap shrink-0"
                        style={{
                            maxWidth: showWelcome ? '280px' : '0px',
                            opacity: showWelcome ? 1 : 0,
                            paddingRight: showWelcome ? '14px' : '0px',
                            marginRight: showWelcome ? '6px' : '0px',
                            borderRightWidth: showWelcome ? '1px' : '0px'
                        }}
                    >
                        <span className="text-white/95 text-[16px] md:text-[17px] font-semibold">Xin chào,</span>
                        <span className="text-amber-300 text-[16px] md:text-[17px] font-semibold drop-shadow-[0_1px_2px_rgba(251,191,36,0.3)]">{user ? user.name : 'Khách'}</span>
                    </div>
                    {DOCK_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isSelected = activeTab === item.id;
                        const isActive = activeTab ? isSelected : (location.pathname === item.path && item.action !== 'scroll');

                        return (
                            <div key={item.id} className="relative group/item flex flex-col items-center">
                                {/* Button - expands on hover to show label */}
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group/btn px-3.5 group-hover/item:px-4 ${
                                        item.id === 'tieudiem' 
                                            ? `animate-pulse-slow bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-white/20 hover:scale-110 ${isActive ? 'scale-110 ring-2 ring-white/50' : ''}`
                                            : isActive
                                                ? 'text-amber-300 bg-white/10 scale-105 shadow-inner'
                                                : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
                                        }`}
                                >
                                    <Icon
                                        size={item.id === 'tieudiem' ? 24 : 21}
                                        strokeWidth={isActive || item.id === 'tieudiem' ? 2.5 : 2}
                                        className={`transition-transform duration-300 shrink-0 ${item.id === 'hienke' && isActive ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}
                                    />
                                    <span className="max-w-0 opacity-0 group-hover/item:max-w-[180px] group-hover/item:opacity-100 group-hover/item:ml-2 overflow-hidden transition-all duration-300 ease-in-out delay-0 group-hover/item:delay-150 whitespace-nowrap text-[12.5px] font-semibold leading-none shrink-0">
                                        {item.label}
                                    </span>
                                </button>

                                {/* Active Capsule Indicator */}
                                <div className={`h-[3px] rounded-full bg-white transition-all duration-300 ${isActive ? 'w-5 mt-0.5 opacity-100' : 'w-0 mt-0.5 opacity-0'
                                    }`} />
                            </div>
                        );
                    })}

                    {/* Divider */}
                    <div className="w-px h-8 bg-white/20 self-center mx-1"></div>

                    {/* Login/Logout Button */}
                    <div className="relative group/item flex flex-col items-center">
                        <button
                            onClick={handleAuthClick}
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10 hover:scale-110"
                        >
                            {user ? <LogOut size={22} /> : <LogIn size={22} />}
                        </button>
                        <div className="h-[3px] w-0 mt-0.5 opacity-0" />
                    </div>
                </div>
            </div>

            <CreateCauHoiModal
                isOpen={isCreateCauHoiModalOpen}
                onClose={() => setIsCreateCauHoiModalOpen(false)}
            />

            <style>{`
                .animate-slideUp {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-popIn {
                    animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                @keyframes slideUp {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, 40px);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                @keyframes popIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.9) translateY(15px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </>
    );
};

export default InteractiveDock;

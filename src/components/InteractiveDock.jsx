import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Shield, Share2, Crown, Trophy, LogIn, LogOut, X, MessageSquare, Clock, Eye, User, ChevronRight, HelpCircle, Lightbulb, History, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DOCK_ITEMS = [
    { id: 'home', label: 'Trang chủ', icon: Home, path: '/trang-chu-v3' },
    { id: 'search', label: 'Tra cứu văn bản', icon: FileText, path: '/van-ban' },
    { id: 'qa', label: 'Hỏi đáp pháp luật', icon: Shield, path: '/cau-hoi-phap-luat' },
    { id: 'tieudiem', label: 'Tiêu điểm', icon: Sparkles, path: '/tin-tuc/noi-bat' },
    { id: 'forum', label: 'Diễn đàn thảo luận', icon: MessageSquare, path: '/dien-dan' },
    { id: 'hienke', label: 'Hiến kế quốc gia', icon: Lightbulb, path: '/hien-ke' },
    { id: 'notebook', label: 'Sổ tay pháp luật', icon: BookOpen, path: '/ca-nhan/bo-suu-tap' },
    { id: 'user-history', label: 'Lịch sử cá nhân', icon: History, path: '/ca-nhan/lich-su' }
];

const POPUP_CONTENTS = {
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
        items: [
            {
                title: "Thủ tướng Chính phủ chỉ đạo các giải pháp cấp bách tháo gỡ khó khăn cho sản xuất, kinh doanh",
                icon: Sparkles,
                meta: [
                    <span className="font-semibold text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded text-[10px] border border-rose-500/20">Quan trọng</span>,
                    <span>Cập nhật: Hôm nay</span>
                ],
                path: "/news/1"
            },
            {
                title: "Công bố lấy ý kiến Nhân dân đối với dự thảo Nghị định sửa đổi Luật Đất đai năm 2024",
                icon: Sparkles,
                meta: [
                    <span className="font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded text-[10px] border border-amber-500/20">Dự thảo</span>,
                    <span>Cập nhật: 1 ngày trước</span>
                ],
                path: "/du-thao/1"
            },
            {
                title: "Tăng cường công tác tuyên truyền phổ biến giáo dục pháp luật tại khu vực biên giới hải đảo",
                icon: Sparkles,
                meta: [
                    <span className="font-semibold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">Phổ biến PL</span>,
                    <span>Cập nhật: 3 ngày trước</span>
                ],
                path: "/news/6"
            }
        ],
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
        title: "Cổng Hiến kế quốc gia",
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
        mainLabel: "Vào Cổng Hiến kế quốc gia",
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
    const [showWelcome, setShowWelcome] = useState(false);

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
                    <div className="w-[92vw] sm:w-[540px] md:w-[680px] bg-gradient-to-br from-[#162e55]/95 via-[#102444]/95 to-[#0b172e]/98 backdrop-blur-xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden mb-4 animate-popIn text-white relative rounded-2xl">
                        {/* Glowing decorative blur lines */}
                        <div className="absolute -inset-px bg-gradient-to-r from-sky-500/20 via-indigo-500/10 to-amber-500/15 pointer-events-none -z-10"></div>
                        <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-transparent shrink-0">
                            <div className="flex items-center gap-2.5">
                                <NationalEmblem />
                                <span className="font-bold text-white text-[15px] md:text-[16px] tracking-tight">{currentChat.title}</span>
                            </div>
                            <button 
                                onClick={() => setActiveTab(null)}
                                className="text-white/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content Panel - Two Column Layout */}
                        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-black/10">
                            
                            {/* Left Column: Quick Links & Actions */}
                            <div className="w-full sm:w-[220px] p-5 flex flex-col gap-3 shrink-0 bg-white/[0.02]">
                                <div className="text-[11px] font-semibold text-white/50 uppercase">Lựa chọn nhanh</div>
                                <div className="flex flex-col gap-2">
                                    {currentChat.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setActiveTab(null);
                                                navigate(link.path);
                                            }}
                                            className="w-full text-left px-3.5 py-2 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white/90 hover:text-white text-[12.5px] font-semibold rounded-xl transition-all duration-200 shadow-sm hover:translate-x-0.5"
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                                
                                <div className="mt-auto pt-3">
                                    <button
                                        onClick={() => {
                                            setActiveTab(null);
                                            navigate(currentChat.mainPath);
                                        }}
                                        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[12.5px] font-bold rounded-xl shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02]"
                                    >
                                        <span>{currentChat.mainLabel}</span>
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Outstanding List */}
                            <div className="flex-grow p-5 flex flex-col gap-3 min-w-0 bg-[#071329]/95 sm:rounded-r-2xl">
                                <div className="text-[11px] font-semibold text-white/50 uppercase flex items-center justify-between">
                                    <span>{currentChat.listTitle}</span>
                                    <span className="text-[10px] text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30 font-bold">Nổi bật</span>
                                </div>
                                
                                <div className="flex flex-col gap-2.5">
                                    {currentChat.items.map((item, idx) => (
                                        <div 
                                            key={idx}
                                            onClick={() => {
                                                setActiveTab(null);
                                                navigate(item.path);
                                            }}
                                            className="flex items-start gap-3.5 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer group min-w-0"
                                        >
                                            <div className="w-8.5 h-8.5 rounded-lg bg-white/5 group-hover:bg-blue-600 group-hover:text-white text-blue-300 flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5">
                                                <item.icon size={15} />
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
                        </div>
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
                        <span className="text-white/95 text-[14px] md:text-[15px] font-semibold">Xin chào,</span>
                        <span className="text-amber-300 text-[14px] md:text-[15px] font-semibold drop-shadow-[0_1px_2px_rgba(251,191,36,0.3)]">{user ? user.name : 'Khách'}</span>
                    </div>
                    {DOCK_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isSelected = activeTab === item.id;
                        const isActive = location.pathname === item.path || isSelected;

                        return (
                            <div key={item.id} className="relative group/item flex flex-col items-center">
                                {/* Button - expands on hover to show label */}
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group/btn w-12 group-hover/item:w-auto group-hover/item:px-4 ${
                                        isActive 
                                        ? 'text-amber-300 bg-white/10 scale-105 shadow-inner' 
                                        : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
                                    }`}
                                >
                                    <Icon 
                                        size={21} 
                                        strokeWidth={isActive ? 2.5 : 2} 
                                        className={`transition-transform duration-300 shrink-0 ${item.id === 'hienke' && isActive ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`} 
                                    />
                                    <span className="max-w-0 opacity-0 group-hover/item:max-w-[180px] group-hover/item:opacity-100 group-hover/item:ml-2 overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap text-[12.5px] font-semibold leading-none shrink-0">
                                        {item.label}
                                    </span>
                                </button>

                                {/* Active Capsule Indicator */}
                                <div className={`h-[3px] rounded-full bg-white transition-all duration-300 ${
                                    isActive ? 'w-5 mt-0.5 opacity-100' : 'w-0 mt-0.5 opacity-0'
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Shield, Share2, Crown, Trophy, LogIn, LogOut, X, MessageSquare, Clock, Eye, User, ChevronRight, HelpCircle, Lightbulb, History, ArrowRight, BookOpen, Sparkles, ExternalLink, TrendingUp, Newspaper, Megaphone, Activity, CheckCircle, AlertCircle, Send, ThumbsUp, Rocket, ArrowUpRight, Search, MoveVertical, MoveHorizontal, EyeOff, SlidersHorizontal, Filter } from 'lucide-react';
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
        docTypes: [
            { id: 'all', label: 'Tất cả' },
            { id: 'Luật', label: 'Luật' },
            { id: 'Nghị định', label: 'Nghị định' },
            { id: 'Thông tư', label: 'Thông tư' },
            { id: 'Quyết định', label: 'Quyết định' }
        ],
        dataset: [
            { type: 'Nghị định', soHieu: '24/2026/NĐ-CP', title: 'Về quản lý và phát triển thương mại điện tử', agency: 'Chính phủ', date: '12/06/2026', status: 'Hiệu lực', path: '/van-ban/1' },
            { type: 'Luật', soHieu: '31/2024/QH15', title: 'Luật Đất đai (sửa đổi) - Quy định bồi thường, giải phóng mặt bằng', agency: 'Quốc hội', date: '28/05/2026', status: 'Hiệu lực', path: '/van-ban/2' },
            { type: 'Quyết định', soHieu: '631/QĐ-BYT', title: 'Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026', agency: 'Bộ Y tế', date: '10/05/2026', status: 'Hiệu lực', path: '/van-ban/5' },
            { type: 'Thông tư', soHieu: '08/2026/TT-BTC', title: 'Hướng dẫn về hóa đơn điện tử khởi tạo từ máy tính tiền', agency: 'Bộ Tài chính', date: '02/05/2026', status: 'Hiệu lực', path: '/van-ban/6' },
            { type: 'Luật', soHieu: '48/2024/QH15', title: 'Luật Thuế giá trị gia tăng (sửa đổi)', agency: 'Quốc hội', date: '20/04/2026', status: 'Sắp hiệu lực', path: '/van-ban/7' },
            { type: 'Nghị định', soHieu: '123/2025/NĐ-CP', title: 'Quy định về hóa đơn, chứng từ điện tử', agency: 'Chính phủ', date: '15/04/2026', status: 'Hiệu lực', path: '/van-ban/8' },
            { type: 'Thông tư', soHieu: '12/2026/TT-BLĐTBXH', title: 'Hướng dẫn chế độ bảo hiểm thất nghiệp năm 2026', agency: 'Bộ LĐ-TB&XH', date: '08/04/2026', status: 'Hiệu lực', path: '/van-ban/9' },
            { type: 'Quyết định', soHieu: '15/2026/QĐ-TTg', title: 'Về cơ chế khuyến khích phát triển điện mặt trời mái nhà', agency: 'Thủ tướng Chính phủ', date: '30/03/2026', status: 'Hiệu lực', path: '/van-ban/10' }
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
        categories: ['Tất cả', 'Đất đai', 'Lao động', 'Thuế', 'Hôn nhân & Gia đình', 'Doanh nghiệp'],
        stats: [
            { value: '12.5K', label: 'Câu hỏi', color: 'amber' },
            { value: '842', label: 'Chuyên gia', color: 'blue' },
            { value: '98%', label: 'Đã giải đáp', color: 'emerald' }
        ],
        experts: [
            { id: 1, name: 'LS. Lê Nam', avatar: 'LN', field: 'Đất đai - Bất động sản', online: true },
            { id: 2, name: 'ThS. Trần Thu Hà', avatar: 'TH', field: 'Lao động - BHXH', online: true },
            { id: 3, name: 'LS. Nguyễn An', avatar: 'NA', field: 'Doanh nghiệp - Thuế', online: false }
        ],
        questions: [
            { title: "Thủ tục xin cấp Giấy chứng nhận quyền sử dụng đất lần đầu thực hiện thế nào?", category: "Đất đai", views: 142, answers: 5, answered: true, expert: "LS. Lê Nam", path: "/cau-hoi-phap-luat/1" },
            { title: "Mức xử phạt hành vi chậm nộp thuế thu nhập cá nhân năm 2026 là bao nhiêu?", category: "Thuế", views: 98, answers: 3, answered: true, expert: "LS. Nguyễn An", path: "/cau-hoi-phap-luat/2" },
            { title: "Người lao động đơn phương chấm dứt hợp đồng lao động cần báo trước bao lâu?", category: "Lao động", views: 115, answers: 4, answered: true, expert: "ThS. Trần Thu Hà", path: "/cau-hoi-phap-luat/3" },
            { title: "Thủ tục ly hôn đơn phương khi một bên không đồng ý được thực hiện ra sao?", category: "Hôn nhân & Gia đình", views: 87, answers: 2, answered: true, expert: "LS. Lê Nam", path: "/cau-hoi-phap-luat/4" },
            { title: "Điều kiện và hồ sơ thành lập công ty TNHH một thành viên mới nhất?", category: "Doanh nghiệp", views: 76, answers: 3, answered: false, expert: null, path: "/cau-hoi-phap-luat/5" }
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
        title: "Tiêu điểm nổi bật",
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
        stats: [
            { value: "1,287", label: "Tổng hiến kế", color: "amber" },
            { value: "356", label: "Đã tiếp nhận", color: "blue" },
            { value: "84", label: "Đã triển khai", color: "emerald" }
        ],
        items: [
            {
                title: "Giải pháp tối giản hóa thủ tục hành chính trong đăng ký hộ tịch trực tuyến",
                author: "Trần Minh Đức",
                category: "Hành chính công",
                votes: 342,
                status: { label: "Đang thẩm định", color: "amber" },
                path: "/hien-ke/doi-song"
            },
            {
                title: "Đề xuất ứng dụng trí tuệ nhân tạo hỗ trợ công dân tra cứu hồ sơ lý lịch tư pháp",
                author: "Nguyễn Thị Lan",
                category: "Chuyển đổi số",
                votes: 287,
                status: { label: "Đã tiếp nhận", color: "blue" },
                path: "/hien-ke/doi-song"
            },
            {
                title: "Sáng kiến xanh hóa giao thông công cộng tại các đô thị loại I ở Việt Nam",
                author: "Lê Anh Tuấn",
                category: "Môi trường",
                votes: 215,
                status: { label: "Đang khảo sát", color: "emerald" },
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
        notes: [
            {
                title: "Đền bù, tái định cư khi Nhà nước thu hồi đất",
                docSoHieu: "31/2024/QH15",
                docTitle: "Luật Đất đai (sửa đổi)",
                docPath: "/van-ban/2",
                category: "Đất đai",
                color: "emerald",
                updated: "Hôm nay",
                content: "Điều 89 quy định nguyên tắc bồi thường về đất khi Nhà nước thu hồi: việc bồi thường được thực hiện bằng việc giao đất có cùng mục đích sử dụng; nếu không có đất thì bồi thường bằng tiền theo giá đất cụ thể của loại đất thu hồi do UBND cấp tỉnh quyết định.\n\nLƯU Ý: Hộ gia đình, cá nhân đang sử dụng đất ở khi bị thu hồi mà phải di chuyển chỗ ở thì được bố trí tái định cư. Cần đối chiếu thêm Điều 91 về điều kiện được bồi thường về đất."
            },
            {
                title: "Thời điểm lập hóa đơn điện tử hợp lệ",
                docSoHieu: "123/2025/NĐ-CP",
                docTitle: "Nghị định về hóa đơn, chứng từ điện tử",
                docPath: "/van-ban/8",
                category: "Doanh nghiệp",
                color: "blue",
                updated: "3 ngày trước",
                content: "Thời điểm lập hóa đơn đối với bán hàng hóa là thời điểm chuyển giao quyền sở hữu/quyền sử dụng hàng hóa cho người mua, không phân biệt đã thu được tiền hay chưa.\n\nĐối với cung cấp dịch vụ: là thời điểm hoàn thành việc cung cấp dịch vụ, hoặc thời điểm lập hóa đơn nếu thu tiền trước/trong khi cung cấp dịch vụ."
            },
            {
                title: "Điều kiện hưởng bảo hiểm xã hội một lần",
                docSoHieu: "12/2026/TT-BLĐTBXH",
                docTitle: "Thông tư hướng dẫn chế độ BHTN 2026",
                docPath: "/van-ban/9",
                category: "Lao động",
                color: "amber",
                updated: "12/06/2026",
                content: "Người lao động được hưởng BHXH một lần nếu thuộc một trong các trường hợp: đủ tuổi hưởng lương hưu mà chưa đủ 20 năm đóng; ra nước ngoài để định cư; mắc bệnh nguy hiểm đến tính mạng.\n\nMức hưởng tính theo số năm đã đóng, mỗi năm được 1,5 tháng mức bình quân tiền lương cho giai đoạn trước 2014 và 2 tháng cho giai đoạn từ 2014 trở đi."
            },
            {
                title: "Khấu trừ thuế GTGT đầu vào",
                docSoHieu: "48/2024/QH15",
                docTitle: "Luật Thuế giá trị gia tăng (sửa đổi)",
                docPath: "/van-ban/7",
                category: "Thuế",
                color: "violet",
                updated: "15/05/2026",
                content: "Điều kiện khấu trừ thuế GTGT đầu vào: có hóa đơn GTGT hợp pháp; có chứng từ thanh toán không dùng tiền mặt đối với hàng hóa, dịch vụ mua vào từ 5 triệu đồng trở lên (đã bao gồm thuế GTGT).\n\nLưu ý mốc 5 triệu đồng theo dự thảo mới có thể thay đổi — cần theo dõi văn bản hướng dẫn khi Luật có hiệu lực."
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
    const [showTieudiemTooltip, setShowTieudiemTooltip] = useState(true);

    // Dock layout preferences (persisted)
    const [orientation, setOrientation] = useState(() => {
        try { return localStorage.getItem('dockOrientation') || 'horizontal'; } catch { return 'horizontal'; }
    });
    const [isHidden, setIsHidden] = useState(false);
    const isVertical = orientation === 'vertical';

    // Search box state (Tra cứu văn bản)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('all');

    // Notebook state (Sổ tay pháp luật)
    const [notebookQuery, setNotebookQuery] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);

    // Q&A state (Tư vấn & Hỏi đáp)
    const [qaQuery, setQaQuery] = useState('');
    const [qaCategory, setQaCategory] = useState('Tất cả');

    useEffect(() => {
        try { localStorage.setItem('dockOrientation', orientation); } catch { /* ignore */ }
    }, [orientation]);

    // Reset transient panel state when switching tabs
    useEffect(() => {
        setSelectedNote(null);
        setNotebookQuery('');
        setQaQuery('');
        setQaCategory('Tất cả');
    }, [activeTab]);

    const toggleOrientation = () => {
        setActiveTab(null);
        setOrientation((o) => (o === 'horizontal' ? 'vertical' : 'horizontal'));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        setActiveTab(null);
        navigate(q ? `/van-ban/tim-kiem?q=${encodeURIComponent(q)}` : '/van-ban');
    };

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
        setShowTieudiemTooltip(false);
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
            {activeTab && !isHidden && (
                <div
                    className="fixed inset-0 z-[90] bg-transparent"
                    onClick={() => setActiveTab(null)}
                />
            )}

            {/* Restore button (shown when dock is hidden) */}
            {isHidden && (
                <button
                    onClick={() => setIsHidden(false)}
                    title="Hiện thanh công cụ"
                    className={`fixed z-[100] flex items-center gap-2 bg-gradient-to-r from-[#879bc6] to-[#7973e2] text-white px-3 py-2 rounded-full shadow-[0_8px_25px_rgba(121,115,226,0.45)] border border-white/25 hover:scale-105 transition-transform ${isVertical ? 'right-3 top-1/2 -translate-y-1/2 animate-slideLeft' : 'bottom-5 left-1/2 -translate-x-1/2 animate-slideUp'}`}
                >
                    <span className="text-[12.5px] font-semibold pr-1">Thanh công cụ</span>
                </button>
            )}

            <div className={`fixed z-[100] flex ${isHidden ? 'hidden' : ''} ${isVertical ? 'right-4 top-1/2 -translate-y-1/2 flex-row items-center animate-slideLeft' : 'bottom-[32px] left-1/2 -translate-x-1/2 flex-col items-center animate-slideUp'}`}>

                {/* Popover Window (Modern Dark Glassmorphism) */}
                {activeTab && currentChat && (
                    <div className={`w-[92vw] sm:w-[640px] md:w-[768px] ${activeTab === 'stats' ? 'lg:w-[1024px] xl:w-[1200px]' : 'lg:w-[900px] xl:w-[960px]'} bg-gradient-to-br from-[#162e55]/95 via-[#102444]/95 to-[#0b172e]/98 backdrop-blur-xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden ${isVertical ? 'mr-4' : 'mb-4'} animate-popIn text-white relative rounded-2xl`}>
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
                                {activeTab === 'search' ? (
                                    (() => {
                                        const q = searchQuery.trim().toLowerCase();
                                        const results = currentChat.dataset.filter((d) => {
                                            const matchType = searchType === 'all' || d.type === searchType;
                                            const matchQuery = !q ||
                                                d.title.toLowerCase().includes(q) ||
                                                d.soHieu.toLowerCase().includes(q) ||
                                                d.agency.toLowerCase().includes(q);
                                            return matchType && matchQuery;
                                        });
                                        const typeColor = {
                                            'Luật': 'text-rose-200 bg-rose-500/15 border-rose-400/30',
                                            'Nghị định': 'text-sky-200 bg-sky-500/15 border-sky-400/30',
                                            'Thông tư': 'text-violet-200 bg-violet-500/15 border-violet-400/30',
                                            'Quyết định': 'text-amber-200 bg-amber-500/15 border-amber-400/30'
                                        };
                                        return (
                                            <div className="w-full bg-[#314568f2] sm:rounded-b-2xl flex flex-col h-[500px]">
                                                {/* Search bar */}
                                                <div className="p-5 border-b border-white/10 shrink-0">
                                                    <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
                                                        <div className="relative flex-grow">
                                                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                                                            <input
                                                                type="text"
                                                                autoFocus
                                                                value={searchQuery}
                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                placeholder="Nhập từ khóa, số hiệu hoặc cơ quan ban hành..."
                                                                className="w-full pl-11 pr-9 py-3 bg-white/[0.06] border border-white/15 focus:border-sky-400/60 focus:bg-white/[0.09] rounded-xl text-white text-[13.5px] placeholder:text-white/35 outline-none transition-all focus:ring-2 focus:ring-sky-500/20"
                                                            />
                                                            {searchQuery && (
                                                                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                                                                    <X size={15} />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <button type="submit" className="px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-[13px] font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-[0.98] shrink-0">
                                                            <Search size={16} />
                                                            <span className="hidden sm:inline">Tra cứu</span>
                                                        </button>
                                                    </form>

                                                    {/* Type filter chips */}
                                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                                        <Filter size={13} className="text-white/40 shrink-0" />
                                                        {currentChat.docTypes.map((t) => (
                                                            <button
                                                                key={t.id}
                                                                onClick={() => setSearchType(t.id)}
                                                                className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-all border ${searchType === t.id
                                                                    ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                                                                    : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border-white/10'
                                                                    }`}
                                                            >
                                                                {t.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Results */}
                                                <div className="flex-grow overflow-y-auto custom-scrollbar px-5 py-4 min-h-0">
                                                    <div className="flex items-center justify-between text-[11px] font-semibold text-white/50 uppercase mb-3">
                                                        <span>{q || searchType !== 'all' ? `Kết quả tra cứu (${results.length})` : currentChat.listTitle}</span>
                                                    </div>

                                                    {results.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center text-center py-12 text-white/40">
                                                            <Search size={32} className="mb-3 opacity-50" />
                                                            <p className="text-[13px] font-medium">Không tìm thấy văn bản phù hợp.</p>
                                                            <p className="text-[11.5px] mt-1">Thử từ khóa khác hoặc nhấn "Tra cứu" để tìm nâng cao.</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-2.5">
                                                            {results.map((d, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    onClick={() => { setActiveTab(null); navigate(d.path); }}
                                                                    className="flex items-start gap-3.5 p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/30 rounded-xl cursor-pointer group transition-all duration-200"
                                                                >
                                                                    <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-sky-600 text-sky-300 group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-all">
                                                                        <FileText size={18} />
                                                                    </div>
                                                                    <div className="flex-grow min-w-0">
                                                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeColor[d.type] || 'text-white/70 bg-white/5 border-white/10'}`}>{d.type}</span>
                                                                            <span className="text-[11px] font-mono text-white/55">{d.soHieu}</span>
                                                                        </div>
                                                                        <h4 className="text-[13px] font-bold text-white/95 group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">{d.title}</h4>
                                                                        <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[10.5px] text-white/45">
                                                                            <span>{d.agency}</span>
                                                                            <span className="text-white/20">•</span>
                                                                            <span className="flex items-center gap-1"><Clock size={11} /> {d.date}</span>
                                                                            <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-semibold border ${d.status === 'Hiệu lực' ? 'text-emerald-300 bg-emerald-500/15 border-emerald-400/25' : 'text-amber-300 bg-amber-500/15 border-amber-400/25'}`}>{d.status}</span>
                                                                        </div>
                                                                    </div>
                                                                    <ChevronRight size={15} className="text-white/25 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all mt-2 shrink-0" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer quick links */}
                                                <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between gap-3 shrink-0 bg-black/10">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {currentChat.links.map((link, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => { setActiveTab(null); navigate(link.path); }}
                                                                className="text-[11.5px] font-medium text-white/60 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-all"
                                                            >
                                                                {link.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => { setActiveTab(null); navigate('/van-ban/tim-kiem'); }}
                                                        className="text-[11.5px] font-bold text-sky-300 hover:text-sky-200 flex items-center gap-1 shrink-0"
                                                    >
                                                        <SlidersHorizontal size={13} /> Tra cứu nâng cao
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })()
                                ) : activeTab === 'qa' ? (
                                    (() => {
                                        const catColor = {
                                            'Đất đai': 'text-emerald-200 bg-emerald-500/15 border-emerald-400/30',
                                            'Lao động': 'text-amber-200 bg-amber-500/15 border-amber-400/30',
                                            'Thuế': 'text-violet-200 bg-violet-500/15 border-violet-400/30',
                                            'Hôn nhân & Gia đình': 'text-rose-200 bg-rose-500/15 border-rose-400/30',
                                            'Doanh nghiệp': 'text-sky-200 bg-sky-500/15 border-sky-400/30'
                                        };
                                        const statColor = { amber: 'text-amber-300', blue: 'text-sky-300', emerald: 'text-emerald-300' };
                                        const qq = qaQuery.trim().toLowerCase();
                                        const questions = currentChat.questions.filter((q) => {
                                            const matchCat = qaCategory === 'Tất cả' || q.category === qaCategory;
                                            const matchQuery = !qq || q.title.toLowerCase().includes(qq) || q.category.toLowerCase().includes(qq);
                                            return matchCat && matchQuery;
                                        });
                                        return (
                                            <>
                                                {/* Left Column: search + filters + questions (64%) */}
                                                <div className="w-full sm:w-[64%] flex flex-col min-w-0 bg-[#314568f2] sm:rounded-bl-2xl h-[500px]">
                                                    {/* Search + stats */}
                                                    <div className="p-5 border-b border-white/10 shrink-0 flex flex-col gap-3">
                                                        <form
                                                            onSubmit={(e) => { e.preventDefault(); setActiveTab(null); navigate('/cau-hoi-phap-luat'); }}
                                                            className="relative"
                                                        >
                                                            <HelpCircle size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                                                            <input
                                                                type="text"
                                                                autoFocus
                                                                value={qaQuery}
                                                                onChange={(e) => setQaQuery(e.target.value)}
                                                                placeholder="Bạn muốn hỏi điều gì? Tìm câu hỏi tương tự..."
                                                                className="w-full pl-11 pr-9 py-3 bg-white/[0.06] border border-white/15 focus:border-blue-400/60 focus:bg-white/[0.09] rounded-xl text-white text-[13.5px] placeholder:text-white/35 outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
                                                            />
                                                            {qaQuery && (
                                                                <button type="button" onClick={() => setQaQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                                                                    <X size={15} />
                                                                </button>
                                                            )}
                                                        </form>

                                                        <div className="grid grid-cols-3 gap-2.5">
                                                            {currentChat.stats.map((s, i) => (
                                                                <div key={i} className="bg-white/5 border border-white/10 rounded-xl py-2 flex flex-col items-center justify-center text-center shadow-inner">
                                                                    <h4 className={`text-base font-black drop-shadow-sm ${statColor[s.color]}`}>{s.value}</h4>
                                                                    <p className="text-[9px] text-white/55 font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Category chips */}
                                                        <div className="flex flex-wrap items-center gap-1.5">
                                                            {currentChat.categories.map((c) => (
                                                                <button
                                                                    key={c}
                                                                    onClick={() => setQaCategory(c)}
                                                                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${qaCategory === c
                                                                        ? 'bg-blue-500 text-white border-blue-400 shadow-sm shadow-blue-500/20'
                                                                        : 'text-white/55 hover:text-white bg-white/5 hover:bg-white/10 border-white/10'
                                                                        }`}
                                                                >
                                                                    {c}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Questions list */}
                                                    <div className="flex-grow overflow-y-auto custom-scrollbar px-5 py-4 min-h-0">
                                                        {questions.length === 0 ? (
                                                            <div className="flex flex-col items-center justify-center text-center py-10 text-white/40">
                                                                <HelpCircle size={30} className="mb-3 opacity-50" />
                                                                <p className="text-[13px] font-medium">Chưa có câu hỏi phù hợp.</p>
                                                                <button onClick={() => setIsCreateCauHoiModalOpen(true)} className="mt-3 text-[12px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5">
                                                                    <MessageSquare size={14} /> Đặt câu hỏi mới về chủ đề này
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col gap-2.5">
                                                                {questions.map((q, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        onClick={() => { setActiveTab(null); navigate(q.path); }}
                                                                        className="flex items-start gap-3.5 p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/30 rounded-xl cursor-pointer group transition-all duration-200"
                                                                    >
                                                                        <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-blue-600 text-blue-300 group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-all">
                                                                            <HelpCircle size={18} />
                                                                        </div>
                                                                        <div className="flex-grow min-w-0">
                                                                            <h4 className="text-[13px] font-bold text-white/95 group-hover:text-blue-200 transition-colors line-clamp-2 leading-snug">{q.title}</h4>
                                                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${catColor[q.category] || 'text-white/70 bg-white/5 border-white/10'}`}>{q.category}</span>
                                                                                {q.answered ? (
                                                                                    <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/25 px-2 py-0.5 rounded-md flex items-center gap-1"><CheckCircle size={10} /> Đã trả lời</span>
                                                                                ) : (
                                                                                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-400/25 px-2 py-0.5 rounded-md flex items-center gap-1"><Clock size={10} /> Chờ trả lời</span>
                                                                                )}
                                                                                <span className="text-[10px] text-white/40 flex items-center gap-1"><MessageSquare size={10} /> {q.answers}</span>
                                                                                <span className="text-[10px] text-white/40 flex items-center gap-1"><Eye size={10} /> {q.views}</span>
                                                                            </div>
                                                                            {q.expert && (
                                                                                <div className="text-[10.5px] text-white/45 mt-1.5 flex items-center gap-1.5">
                                                                                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/50 to-indigo-500/50 flex items-center justify-center text-[8px] font-bold text-white/90">{q.expert.replace(/^(LS\.|ThS\.)\s*/, '').trim().charAt(0)}</span>
                                                                                    Trả lời bởi <span className="text-white/65 font-medium">{q.expert}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <ChevronRight size={14} className="text-white/25 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all mt-2 shrink-0" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right Column: friendly experts + CTA (36%) */}
                                                <div className="w-full sm:w-[36%] p-6 flex flex-col gap-4 bg-gradient-to-b from-blue-600/85 to-indigo-800/85 sm:rounded-br-2xl border-l border-white/5 relative overflow-hidden shrink-0">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

                                                    <div className="relative z-10">
                                                        <h3 className="text-[17px] font-extrabold text-white leading-tight">Cần tư vấn pháp lý?</h3>
                                                        <p className="text-[12px] text-blue-100/90 mt-1 leading-relaxed">Đội ngũ luật sư & chuyên gia luôn sẵn sàng hỗ trợ bạn.</p>
                                                    </div>

                                                    {/* Experts list */}
                                                    <div className="flex flex-col gap-2 relative z-10">
                                                        <div className="text-[10px] font-bold text-blue-100/70 uppercase tracking-wide flex items-center gap-1.5">
                                                            <User size={12} /> Danh sách chuyên gia
                                                        </div>
                                                        {currentChat.experts.map((ex, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => { setActiveTab(null); navigate(`/cau-hoi-phap-luat/chuyen-gia/${ex.id}`); }}
                                                                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer transition-all group"
                                                            >
                                                                <div className="relative shrink-0">
                                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-slate-900 flex items-center justify-center text-[12px] font-black shadow">{ex.avatar}</div>
                                                                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-indigo-800 ${ex.online ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                                                                </div>
                                                                <div className="min-w-0 flex-grow">
                                                                    <div className="text-[12px] font-bold text-white truncate">{ex.name}</div>
                                                                    <div className="text-[10px] text-blue-100/70 truncate">{ex.field}</div>
                                                                </div>
                                                                <ChevronRight size={14} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-auto flex flex-col gap-2 relative z-10">
                                                        <button
                                                            onClick={() => setIsCreateCauHoiModalOpen(true)}
                                                            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 text-[13px] font-bold rounded-xl shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
                                                        >
                                                            <MessageSquare size={16} />
                                                            <span>Đặt câu hỏi ngay</span>
                                                        </button>
                                                        <button
                                                            onClick={() => { setActiveTab(null); navigate('/cau-hoi-phap-luat/chuyen-gia'); }}
                                                            className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-[12.5px] font-semibold rounded-xl border border-white/15 flex items-center justify-center gap-2 transition-all"
                                                        >
                                                            <Clock size={15} /> Đặt lịch tư vấn với chuyên gia
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()
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
                                            <div className="w-full bg-[#314568f2] sm:rounded-b-2xl shadow-inner h-[535px] overflow-hidden flex flex-col">
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
                                                            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${activeTieudiemTab === tab.id
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
                                    <div className="w-full p-6 flex flex-col gap-4 bg-[#314568f2] sm:rounded-b-2xl shadow-inner h-[460px] overflow-hidden">
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
                                ) : activeTab === 'hienke' ? (
                                    (() => {
                                        const statColor = {
                                            amber: 'text-amber-300',
                                            blue: 'text-sky-300',
                                            emerald: 'text-emerald-300'
                                        };
                                        const badgeColor = {
                                            amber: 'text-amber-200 bg-amber-500/15 border-amber-400/30',
                                            blue: 'text-sky-200 bg-sky-500/15 border-sky-400/30',
                                            emerald: 'text-emerald-200 bg-emerald-500/15 border-emerald-400/30'
                                        };
                                        const dotColor = {
                                            amber: 'bg-amber-400',
                                            blue: 'bg-sky-400',
                                            emerald: 'bg-emerald-400'
                                        };
                                        return (
                                            <>
                                                {/* Left Column: Featured ideas (66%) */}
                                                <div className="w-full sm:w-[66%] p-6 flex flex-col gap-4 min-w-0 bg-[#314568f2] sm:rounded-bl-2xl">
                                                    {/* Stat cards */}
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {currentChat.stats.map((s, i) => (
                                                            <div key={i} className="relative bg-white/[0.04] border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center overflow-hidden shadow-inner">
                                                                <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl opacity-30 ${dotColor[s.color]}`}></div>
                                                                <h4 className={`text-xl font-black drop-shadow-sm relative z-10 ${statColor[s.color]}`}>{s.value}</h4>
                                                                <p className="text-[9.5px] text-white/55 font-semibold uppercase tracking-wide mt-0.5 relative z-10">{s.label}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="text-[11px] font-semibold text-white/50 uppercase flex items-center justify-between">
                                                        <span>{currentChat.listTitle}</span>
                                                        <span className="text-[10px] text-amber-200 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-400/30 font-bold flex items-center gap-1">
                                                            <Sparkles size={11} /> Tiêu biểu
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
                                                        {currentChat.items.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                onClick={() => {
                                                                    setActiveTab(null);
                                                                    navigate(item.path);
                                                                }}
                                                                className="relative flex items-start gap-4 p-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/30 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-200 cursor-pointer group min-w-0"
                                                            >
                                                                {/* Rank + bulb */}
                                                                <div className="relative shrink-0 mt-0.5">
                                                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 border border-amber-400/20 text-amber-300 flex items-center justify-center group-hover:from-amber-400 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 group-hover:scale-105">
                                                                        <Lightbulb size={19} />
                                                                    </div>
                                                                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#0b172e] border border-amber-400/40 text-amber-300 text-[10px] font-black flex items-center justify-center shadow">
                                                                        {idx + 1}
                                                                    </span>
                                                                </div>

                                                                <div className="flex-grow min-w-0">
                                                                    <h4 className="text-[13px] font-bold text-white/95 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                                                                        {item.title}
                                                                    </h4>
                                                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badgeColor[item.status.color]}`}>
                                                                            {item.status.label}
                                                                        </span>
                                                                        <span className="text-[10px] text-white/45 px-2 py-0.5 rounded-md border border-white/10 bg-white/5">
                                                                            {item.category}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 mt-2.5 text-[10.5px] text-white/45">
                                                                        <span className="flex items-center gap-1.5">
                                                                            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-sky-400/40 to-indigo-500/40 flex items-center justify-center text-[8px] font-bold text-white/80">
                                                                                {item.author.trim().split(' ').pop().charAt(0)}
                                                                            </span>
                                                                            {item.author}
                                                                        </span>
                                                                        <span className="flex items-center gap-1 text-amber-300/80 font-semibold">
                                                                            <ThumbsUp size={11} /> {item.votes}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <ArrowUpRight size={15} className="text-white/25 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1 shrink-0" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right Column: Vivid CTA banner (34%) */}
                                                <div className="w-full sm:w-[34%] p-6 flex flex-col items-center gap-3 bg-gradient-to-b from-amber-500/85 via-orange-600/85 to-rose-700/85 sm:rounded-br-2xl border-l border-white/5 relative overflow-hidden group shrink-0">
                                                    <div className="absolute top-0 right-0 w-36 h-36 bg-white/15 rounded-full blur-3xl group-hover:bg-white/25 transition-all duration-500 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                                                    <div className="absolute bottom-0 left-0 w-28 h-28 bg-amber-300/20 rounded-full blur-2xl pointer-events-none"></div>

                                                    <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mt-2 mb-1 shadow-lg backdrop-blur-sm border border-white/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10">
                                                        <Lightbulb size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                                    </div>
                                                    <h3 className="text-[17px] font-extrabold text-white text-center leading-tight relative z-10">
                                                        Bạn có sáng kiến hay?
                                                    </h3>
                                                    <p className="text-[12px] text-amber-50/90 text-center leading-relaxed relative z-10">
                                                        Mọi ý tưởng của bạn đều được tiếp nhận, thẩm định và phản hồi minh bạch.
                                                    </p>

                                                    <button
                                                        onClick={() => {
                                                            setActiveTab(null);
                                                            navigate('/hien-ke/gop-y-nhanh');
                                                        }}
                                                        className="w-full py-3 mt-1 bg-white text-orange-700 text-[13px] font-bold rounded-xl shadow-lg hover:shadow-white/30 hover:bg-amber-50 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] relative z-10"
                                                    >
                                                        <Send size={16} />
                                                        <span>Gửi hiến kế mới</span>
                                                    </button>

                                                    <div className="w-full mt-auto pt-4 border-t border-white/20 flex flex-col gap-1.5 relative z-10">
                                                        {currentChat.links.slice(1).map((link, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => {
                                                                    setActiveTab(null);
                                                                    navigate(link.path);
                                                                }}
                                                                className="w-full text-left px-3 py-2 rounded-lg text-[12px] font-semibold text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200 flex items-center justify-between group/link"
                                                            >
                                                                <span className="flex items-center gap-2">
                                                                    {i === 0 ? <Trophy size={14} /> : <Rocket size={14} />}
                                                                    {link.label}
                                                                </span>
                                                                <ChevronRight size={14} className="opacity-60 group-hover/link:translate-x-0.5 transition-transform" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()
                                ) : activeTab === 'notebook' ? (
                                    (() => {
                                        const nq = notebookQuery.trim().toLowerCase();
                                        const notes = currentChat.notes.filter((n) => !nq ||
                                            n.title.toLowerCase().includes(nq) ||
                                            n.content.toLowerCase().includes(nq) ||
                                            n.docSoHieu.toLowerCase().includes(nq) ||
                                            n.docTitle.toLowerCase().includes(nq) ||
                                            n.category.toLowerCase().includes(nq));
                                        const cColor = {
                                            emerald: 'text-emerald-200 bg-emerald-500/15 border-emerald-400/30',
                                            blue: 'text-sky-200 bg-sky-500/15 border-sky-400/30',
                                            amber: 'text-amber-200 bg-amber-500/15 border-amber-400/30',
                                            violet: 'text-violet-200 bg-violet-500/15 border-violet-400/30'
                                        };
                                        const iconBg = {
                                            emerald: 'from-emerald-400/20 to-teal-500/10 text-emerald-300 group-hover:from-emerald-400 group-hover:to-teal-500',
                                            blue: 'from-sky-400/20 to-blue-500/10 text-sky-300 group-hover:from-sky-400 group-hover:to-blue-500',
                                            amber: 'from-amber-400/20 to-orange-500/10 text-amber-300 group-hover:from-amber-400 group-hover:to-orange-500',
                                            violet: 'from-violet-400/20 to-purple-500/10 text-violet-300 group-hover:from-violet-400 group-hover:to-purple-500'
                                        };
                                        return (
                                            <div className="w-full bg-[#314568f2] sm:rounded-b-2xl flex flex-col h-[500px] relative">
                                                {/* Search */}
                                                <div className="p-5 border-b border-white/10 shrink-0">
                                                    <div className="relative">
                                                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                                                        <input
                                                            type="text"
                                                            autoFocus
                                                            value={notebookQuery}
                                                            onChange={(e) => setNotebookQuery(e.target.value)}
                                                            placeholder="Tìm ghi chú theo nội dung, văn bản, lĩnh vực..."
                                                            className="w-full pl-11 pr-9 py-3 bg-white/[0.06] border border-white/15 focus:border-indigo-400/60 focus:bg-white/[0.09] rounded-xl text-white text-[13.5px] placeholder:text-white/35 outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                                                        />
                                                        {notebookQuery && (
                                                            <button type="button" onClick={() => setNotebookQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                                                                <X size={15} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Notes list */}
                                                <div className="flex-grow overflow-y-auto custom-scrollbar px-5 py-4 min-h-0">
                                                    <div className="flex items-center justify-between text-[11px] font-semibold text-white/50 uppercase mb-3">
                                                        <span className="flex items-center gap-1.5"><BookOpen size={13} /> {nq ? `Kết quả (${notes.length})` : 'Ghi chú của bạn'}</span>
                                                        <span className="text-[10px] text-indigo-200 bg-indigo-500/15 px-2 py-0.5 rounded-full border border-indigo-400/30 font-bold">{currentChat.notes.length} ghi chú</span>
                                                    </div>

                                                    {notes.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center text-center py-12 text-white/40">
                                                            <BookOpen size={32} className="mb-3 opacity-50" />
                                                            <p className="text-[13px] font-medium">Không có ghi chú phù hợp.</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-2.5">
                                                            {notes.map((n, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    onClick={() => setSelectedNote(n)}
                                                                    className="flex items-start gap-3.5 p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-400/30 rounded-xl cursor-pointer group transition-all duration-200"
                                                                >
                                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconBg[n.color] || iconBg.blue} group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-all`}>
                                                                        <BookOpen size={18} />
                                                                    </div>
                                                                    <div className="flex-grow min-w-0">
                                                                        <h4 className="text-[13px] font-bold text-white/95 group-hover:text-indigo-200 transition-colors line-clamp-1 leading-snug">{n.title}</h4>
                                                                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-white/50 min-w-0">
                                                                            <FileText size={12} className="shrink-0 text-white/40" />
                                                                            <span className="font-mono text-white/55 shrink-0">{n.docSoHieu}</span>
                                                                            <span className="text-white/20">·</span>
                                                                            <span className="truncate">{n.docTitle}</span>
                                                                        </div>
                                                                        <p className="text-[11.5px] text-white/45 line-clamp-1 mt-1">{n.content}</p>
                                                                        <div className="flex items-center gap-2 mt-2">
                                                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${cColor[n.color] || cColor.blue}`}>{n.category}</span>
                                                                            <span className="text-[10px] text-white/40 flex items-center gap-1"><Clock size={10} /> {n.updated}</span>
                                                                        </div>
                                                                    </div>
                                                                    <Eye size={15} className="text-white/25 group-hover:text-indigo-300 transition-all mt-1 shrink-0" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer quick links */}
                                                <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between gap-3 shrink-0 bg-black/10">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {currentChat.links.map((link, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => { setActiveTab(null); navigate(link.path); }}
                                                                className="text-[11.5px] font-medium text-white/60 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-all"
                                                            >
                                                                {link.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => { setActiveTab(null); navigate(currentChat.mainPath); }}
                                                        className="text-[11.5px] font-bold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 shrink-0"
                                                    >
                                                        <BookOpen size={13} /> Mở sổ tay
                                                    </button>
                                                </div>

                                                {/* Note detail overlay */}
                                                {selectedNote && (
                                                    <div className="absolute inset-0 z-30 flex flex-col bg-gradient-to-br from-[#13294f]/98 to-[#0b172e]/98 backdrop-blur-md animate-popIn sm:rounded-b-2xl">
                                                        {/* Overlay header */}
                                                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                                                            <button onClick={() => setSelectedNote(null)} className="flex items-center gap-1.5 text-white/60 hover:text-white text-[12.5px] font-semibold transition-colors">
                                                                <ChevronRight size={16} className="rotate-180" /> Quay lại
                                                            </button>
                                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${cColor[selectedNote.color] || cColor.blue}`}>{selectedNote.category}</span>
                                                        </div>

                                                        {/* Overlay body */}
                                                        <div className="flex-grow overflow-y-auto custom-scrollbar px-6 py-5 min-h-0">
                                                            <h3 className="text-[18px] font-extrabold text-white leading-snug mb-3">{selectedNote.title}</h3>

                                                            {/* Document reference */}
                                                            <button
                                                                onClick={() => { setActiveTab(null); navigate(selectedNote.docPath); }}
                                                                className="w-full flex items-center gap-3 p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 rounded-xl text-left transition-all group mb-5"
                                                            >
                                                                <div className="w-9 h-9 rounded-lg bg-sky-500/15 text-sky-300 flex items-center justify-center shrink-0">
                                                                    <FileText size={17} />
                                                                </div>
                                                                <div className="flex-grow min-w-0">
                                                                    <div className="text-[10px] text-white/45 uppercase font-semibold tracking-wide">Ghi chú thuộc văn bản</div>
                                                                    <div className="text-[12.5px] font-bold text-white/90 truncate">{selectedNote.docSoHieu} — {selectedNote.docTitle}</div>
                                                                </div>
                                                                <span className="flex items-center gap-1 text-[11.5px] font-bold text-sky-300 group-hover:text-sky-200 shrink-0">
                                                                    Xem <ArrowUpRight size={14} />
                                                                </span>
                                                            </button>

                                                            {/* Note content */}
                                                            <div className="text-[13.5px] text-white/80 leading-relaxed whitespace-pre-line">
                                                                {selectedNote.content}
                                                            </div>
                                                        </div>

                                                        {/* Overlay footer */}
                                                        <div className="px-6 py-3 border-t border-white/10 shrink-0 flex items-center justify-between text-[11px] text-white/45">
                                                            <span className="flex items-center gap-1.5"><Clock size={12} /> Cập nhật: {selectedNote.updated}</span>
                                                            <button onClick={() => { setActiveTab(null); navigate(currentChat.mainPath); }} className="text-indigo-300 hover:text-indigo-200 font-semibold flex items-center gap-1">
                                                                Chỉnh sửa trong sổ tay <ChevronRight size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })()
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
                <div className={`flex items-center gap-3 ${isVertical ? 'flex-col bg-gradient-to-b px-3 py-4 max-h-[92vh]' : 'bg-gradient-to-r px-6 py-3'} from-[#879bc6]/90 via-[#7973e2]/90 to-[#879bc6]/90 backdrop-blur-xl border border-white/25 rounded-[24px] shadow-[0_15px_45px_rgba(121,115,226,0.3)] transition-all duration-300 hover:shadow-[0_20px_55px_rgba(121,115,226,0.45)]`}>
                    {/* Welcome Message (horizontal only, slides open then collapses after 5s) */}
                    {!isVertical && (
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
                    )}
                    {DOCK_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isSelected = activeTab === item.id;
                        const isActive = activeTab ? isSelected : (location.pathname === item.path && item.action !== 'scroll');

                        return (
                            <div key={item.id} className="relative group/item flex flex-col items-center">
                                {/* Tooltip for Tieudiem */}
                                {item.id === 'tieudiem' && showTieudiemTooltip && (
                                    isVertical ? (
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 flex items-center animate-bounce z-50 pointer-events-none">
                                            <div className="bg-rose-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">Tiêu điểm</div>
                                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-rose-500"></div>
                                        </div>
                                    ) : (
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 -ml-10 flex flex-col items-center animate-bounce z-50 pointer-events-none">
                                            <div className="bg-rose-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">Tiêu điểm</div>
                                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-rose-500"></div>
                                        </div>
                                    )
                                )}

                                {/* Button */}
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group/btn ${isVertical ? 'w-12' : (isActive ? 'px-4' : 'px-3.5 group-hover/item:px-4')} ${item.id === 'tieudiem'
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
                                    {isVertical ? (
                                        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0b172e] text-white text-[12px] font-semibold whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg border border-white/10 z-50">
                                            {item.label}
                                        </span>
                                    ) : (
                                        <span className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap text-[12.5px] font-semibold leading-none shrink-0 ${
                                            isActive
                                                ? 'max-w-[180px] opacity-100 ml-2'
                                                : 'max-w-0 opacity-0 group-hover/item:max-w-[180px] group-hover/item:opacity-100 group-hover/item:ml-2 delay-0 group-hover/item:delay-150'
                                        }`}>
                                            {item.label}
                                        </span>
                                    )}
                                </button>

                                {/* Active Capsule Indicator */}
                                <div className={`h-[3px] rounded-full bg-white transition-all duration-300 ${isActive ? 'w-5 mt-0.5 opacity-100' : 'w-0 mt-0.5 opacity-0'
                                    }`} />
                            </div>
                        );
                    })}

                    {/* Divider */}
                    <div className={`bg-white/20 self-center ${isVertical ? 'h-px w-8 my-1' : 'w-px h-8 mx-1'}`}></div>

                    {/* Login/Logout Button */}
                    <div className="relative group/item flex flex-col items-center">
                        <button
                            onClick={handleAuthClick}
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10 hover:scale-110"
                        >
                            {user ? <LogOut size={22} /> : <LogIn size={22} />}
                            {isVertical && (
                                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0b172e] text-white text-[12px] font-semibold whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg border border-white/10 z-50">
                                    {user ? 'Đăng xuất' : 'Đăng nhập'}
                                </span>
                            )}
                        </button>
                        <div className="h-[3px] w-0 mt-0.5 opacity-0" />
                    </div>

                    {/* Divider */}
                    <div className={`bg-white/20 self-center ${isVertical ? 'h-px w-8 my-1' : 'w-px h-8 mx-1'}`}></div>

                    {/* Layout Controls: orientation + hide */}
                    <div className={`flex items-center gap-1.5 ${isVertical ? 'flex-col' : ''}`}>
                        <div className="relative group/item flex flex-col items-center">
                            <button
                                onClick={() => { setActiveTab(null); setIsHidden(true); }}
                                title="Ẩn thanh công cụ"
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 text-white/70 hover:text-white hover:bg-rose-500/30 hover:scale-110"
                            >
                                <EyeOff size={19} />
                            </button>
                        </div>
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
                .animate-slideLeft {
                    animation: slideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slideLeft {
                    0% {
                        opacity: 0;
                        transform: translate(40px, -50%);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(0, -50%);
                    }
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

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Users, BookOpen, Newspaper, FileText, Database, ChevronRight,
    ArrowRight, Globe, MonitorPlay, CheckCircle2, Clock, ChevronLeft, ChevronUp, ChevronDown, Home, ArrowLeft
} from 'lucide-react';

const MOCK_NEWS_HOAT_DONG = [
    { id: 1, title: 'Tiếp tục ưu tiên nguồn lực trọng tâm vào xây dựng pháp luật tại các vùng kinh tế', date: '10/03/2026', image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 2, title: 'Hướng dẫn giải quyết vướng mắc trong phân bổ nguồn thu ngân sách nhà nước', date: '09/03/2026', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 3, title: 'Ban Chỉ đạo Trung ương kiểm tra tiến độ rà soát tại các tỉnh phía Nam', date: '08/03/2026', image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 4, title: 'Tăng cường ứng dụng CNTT trong công tác báo cáo hệ thống pháp luật', date: '07/03/2026', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 5, title: 'Bộ Tư pháp phối hợp cùng các Bộ, ngành đánh giá quy định về thủ tục hành chính', date: '06/03/2026', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 6, title: 'Hội nghị trực tuyến toàn quốc: Đẩy nhanh tiến độ rà soát các Luật chuyên ngành', date: '05/03/2026', image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 7, title: 'Tăng cường ứng dụng CNTT trong công tác báo cáo hệ thống pháp luật', date: '07/03/2026', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 8, title: 'Bộ Tư pháp phối hợp cùng các Bộ, ngành đánh giá quy định về thủ tục hành chính', date: '06/03/2026', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 9, title: 'Hội nghị trực tuyến toàn quốc: Đẩy nhanh tiến độ rà soát các Luật chuyên ngành', date: '05/03/2026', image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=200&h=150' },
];

const MOCK_NEWS_THOI_SU = [
    { id: 7, title: 'Hướng tới bầu cử đại biểu Quốc hội khoá XVI và đại biểu HĐND các cấp', date: '08/03/2026', image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 8, title: 'Bộ Tư pháp đề nghị tăng cường hỗ trợ tháo gỡ khó khăn doanh nghiệp', date: '07/03/2026', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 9, title: 'Triển khai công tác kiểm tra văn bản quy phạm pháp luật năm 2026', date: '06/03/2026', image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 10, title: 'Bình luận về dự thảo Luật Thuế mới: Những điểm nổi bật có lợi cho người lao động', date: '05/03/2026', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 11, title: 'Xử phạt nghiêm các hành vi vi phạm trật tự an toàn giao thông đường bộ', date: '04/03/2026', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 12, title: 'Lấy ý kiến đóng góp cho Phương án bảo vệ môi trường khu công nghiệp', date: '03/03/2026', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 13, title: 'Tăng cường ứng dụng CNTT trong công tác báo cáo hệ thống pháp luật', date: '07/03/2026', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 14, title: 'Bộ Tư pháp phối hợp cùng các Bộ, ngành đánh giá quy định về thủ tục hành chính', date: '06/03/2026', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=150' },
    { id: 15, title: 'Hội nghị trực tuyến toàn quốc: Đẩy nhanh tiến độ rà soát các Luật chuyên ngành', date: '05/03/2026', image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=200&h=150' },
];

const MOCK_MEMBERS = [
    {
        id: 1, name: 'Nguyễn Văn Lập',
        role: 'Trưởng Ban Chỉ đạo, Bộ trưởng',
        image: '/images/officials/vietnamese_official_4_1773807527731.png'
    },
    {
        id: 2, name: 'Trần Đình Tùng',
        role: 'Phó Trưởng Ban Chỉ đạo thường trực',
        image: '/images/officials/vietnamese_official_1_1773807475011.png'
    },
    {
        id: 3, name: 'Lê Minh Quang',
        role: 'Phó Trưởng Ban Chỉ đạo',
        image: '/images/officials/vietnamese_official_2_1773807493162.png'
    },
    {
        id: 4, name: 'Phạm Tuấn Anh',
        role: 'Ủy viên Ban Chỉ đạo, Cục trưởng',
        image: '/images/officials/vietnamese_official_3_1773807510279.png'
    },
    {
        id: 5, name: 'Hoàng Thanh Bình',
        role: 'Ủy viên Ban Chỉ đạo, Vụ trưởng',
        image: '/images/officials/vietnamese_official_1_1773807475011.png'
    },
    {
        id: 6, name: 'Vũ Ngọc Thắng',
        role: 'Ủy viên Ban Chỉ đạo, Giám đốc Sở',
        image: '/images/officials/vietnamese_official_2_1773807493162.png'
    },
    {
        id: 7, name: 'Lê Hoài Thanh',
        role: 'Ủy viên Ban Chỉ đạo, Chánh Văn phòng',
        image: '/images/officials/vietnamese_official_3_1773807510279.png'
    },
];

const MOCK_DOCS = [
    { title: 'Quyết định số 123/QĐ-TTg về việc thành lập Ban Chỉ đạo Trung ương', type: 'Văn bản chỉ đạo', summary: 'Cơ cấu tổ chức và trách nhiệm của các thành viên trong Ban Chỉ đạo Trung ương về tổng rà soát hệ thống pháp luật quy mô toàn quốc.', date: '12/02/2026' },
    { title: 'Kế hoạch số 45/KH-BTP triển khai tổng rà soát hệ thống VBQPPL', type: 'Văn bản chỉ đạo', summary: 'Các bước triển khai cụ thể đối với các Bộ, Cơ quan ngang Bộ, và UBND các cấp trong quá trình rà soát, đánh giá chuyên sâu.', date: '15/02/2026' },
    { title: 'Công văn số 789/BTP-KTrVB đôn đốc báo cáo kết quả rà soát', type: 'Văn bản chỉ đạo', summary: 'Yêu cầu các địa phương khẩn trương gửi báo cáo kết quả rà soát các văn bản pháp luật trước ngày 30/03/2026 để tổng hợp.', date: '01/03/2026' },
    { title: 'Thông báo Kết luận số 25/TB-VPCP phiên họp thường kỳ tháng 2', type: 'Văn bản chỉ đạo', summary: 'Thông báo kết luận chỉ đạo của Phó Thủ tướng về ưu tiên rà soát mâu thuẫn trong lĩnh vực đầu tư, đất đai.', date: '05/03/2026' },
    { title: 'Chỉ thị số 02/CT-TTg về tăng cường kỷ cương hành chính', type: 'Văn bản chỉ đạo', summary: 'Nâng cao trách nhiệm người đứng đầu trong quá trình giải quyết dứt điểm các quy định chồng chéo.', date: '10/03/2026' },
    { title: 'Công văn số 890/BTP-KTrVB hướng dẫn xử lý vướng mắc', type: 'Văn bản chỉ đạo', summary: 'Phân công nhiệm vụ cụ thể cho các đơn vị xử lý các kết quả phản ánh của doanh nghiệp.', date: '12/03/2026' },
    { title: 'Sổ tay nghiệp vụ rà soát, hệ thống hóa VBQPPL (Phát hành năm 2026)', type: 'Hướng dẫn nghiệp vụ', summary: 'Tài liệu hướng dẫn chuyên sâu chi tiết cho cán bộ, công chức làm công tác rà soát, hệ thống pháp luật tại địa phương.', date: '20/02/2026' },
    { title: 'Hướng dẫn chi tiết số 12/HD-BTP về tiêu chí đánh giá mâu thuẫn văn bản', type: 'Hướng dẫn nghiệp vụ', summary: 'Làm rõ các tiêu chí nhận diện điểm chồng chéo, mâu thuẫn giữa luật, nghị định và thông tư hiện hành.', date: '25/02/2026' },
    { title: 'Tài liệu tập huấn sử dụng Cơ sở dữ liệu Quốc gia về VBPL', type: 'Hướng dẫn nghiệp vụ', summary: 'Slide bài giảng và video hướng dẫn tra cứu, kết xuất dữ liệu pháp luật phục vụ thống kê, báo cáo.', date: '02/03/2026' },
    { title: 'Quy trình chuẩn (SOP) 5 bước báo cáo tổng rà soát', type: 'Hướng dẫn nghiệp vụ', summary: 'Sơ đồ hóa các bước tiếp nhận, xử lý, lập biểu báo cáo dành riêng cho bộ phận chuyên trách.', date: '10/03/2026' },
    { title: 'Bộ câu hỏi đáp (FAQ) thường gặp về rà soát VBQPPL 2026', type: 'Hướng dẫn nghiệp vụ', summary: 'Tổng hợp 50 câu hỏi vướng mắc phổ biến và hướng giải quyết từ Ban Chỉ đạo.', date: '15/03/2026' },
    { title: 'Hướng dẫn tích hợp số liệu lên nền tảng trực tuyến', type: 'Hướng dẫn nghiệp vụ', summary: 'Tài liệu API và hướng dẫn cho IT quản trị của các cơ quan cập nhật trạng thái tự động.', date: '18/03/2026' },
];

const MOCK_LINKS = [
    { name: 'CSDL quốc gia về VBPL', url: 'https://vbpl.vn', icon: Database },
    { name: 'Cổng thông tin Đảng Cộng sản', url: '#', icon: Globe },
    { name: 'Trang thông tin Chính phủ', url: '#', icon: Globe },
    { name: 'CSDL Điều ước quốc tế', url: '#', icon: Database },
];

const MOCK_SYSTEMS = [
    {
        id: 1,
        title: 'Phần mềm hỗ trợ kiểm tra, rà soát VBQPPL',
        description: 'Phần mềm hỗ trợ kiểm tra, rà soát VBQPPL là phần mềm quản lý hoạt động kiểm tra, rà soát và hệ thống hóa VBQPPL. Giúp việc kiểm tra, rà soát, hệ thống hóa VBQPPL thực hiện dễ dàng và giảm bớt thời gian, công sức của cán bộ pháp chế',
        details: 'Phần mềm hỗ trợ kiểm tra, rà soát VBQPPL là phần mềm quản lý hoạt động kiểm tra, rà soát và hệ thống hóa VBQPPL. Giúp việc kiểm tra, rà soát, hệ thống hóa VBQPPL thực hiện dễ dàng và giảm bớt thời gian, công sức của cán bộ pháp chế',
        image: 'https://thietkelogo.vn/wp-content/uploads/2015/11/BoTuPhap1.jpg',
        link: '#'
    }
];

const MOCK_PORTALS = [
    { name: 'Cổng TTĐT Đảng Cộng sản Việt Nam', url: '#', icon: 'M13.5 22H11v-5h2.5c2.5 0 4.5-2 4.5-4.5S16 8 13.5 8H8.5V3H11v3h2.5c3.5 0 6.5 3 6.5 6.5S17 19 13.5 19H13v3zm-5-3V8h-2v11h2z' },
    { name: 'Cổng Thông tin điện tử Chính phủ', url: '#', icon: 'M3 21v-2h2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10h2v2H3zm4-2h10V9H7v10zm3-2v-4h4v4h-4z' },
    { name: 'Cổng Thông tin điện tử Quốc hội', url: '#', icon: 'M12 3L2 8v2h20V8L12 3zm-7 7v8h2v-8H5zm6 0v8h2v-8h-2zm6 0v8h2v-8h-2zM3 22h18v-2H3v2z' },
    { name: 'Cổng Thông tin điện tử Nghị quyết 57', url: '#', icon: 'M4 6h16v10H4zM2 4v14h20V4H2zm3 16h14v2H5z' },
    { name: 'Cổng Thông tin điện tử Bộ Tư pháp', url: '#', icon: 'M12 2L2 7l10 5l10-5-10-5zm0 11.5l-6-3v4.5l6 3l6-3V10.5l-6 3z' },
    { name: 'Công báo', url: '#', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
    { name: 'Cổng VCCI', url: '#', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
    { name: 'Liên đoàn luật sư Việt Nam', url: '#', icon: 'M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM6.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
    { name: 'Hội luật gia Việt Nam', url: '#', icon: 'M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z' },
    { name: 'Cổng PBGDPLQG', url: '#', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
    { name: 'Cổng thông tin đăng ký DN', url: '#', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
    { name: 'Cổng Dịch vụ công quốc gia', url: '#', icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' }
];

const TongRaSoatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'tin-tuc-hoat-dong');
    const [activeBanChiDaoTab, setActiveBanChiDaoTab] = useState('chuc-nang');
    const scrollContainerRef = useRef(null);
    const [expandedSystemIds, setExpandedSystemIds] = useState([]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle tab change from navigation state
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const toggleSystemExpansion = (id) => {
        setExpandedSystemIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const scrollTabs = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Vertical news ticker
    const tickerItems = [
        { id: 1, text: 'Báo cáo kết quả rà soát quý I/2026 phải được gửi trước ngày 15/04/2026.' },
        { id: 2, text: 'Phát biểu Khai mạc Hội nghị Trung ương 14 của Tổng Bí thư Tô Lâm.' },
        { id: 3, text: 'Trọng tâm công tác rà soát năm nay tập trung vào các văn bản liên quan đến đất đai và đầu tư công.' },
        { id: 4, text: 'Hội nghị trực tuyến toàn quốc: Đẩy nhanh tiến độ rà soát các Luật chuyên ngành.' },
        { id: 5, text: 'Bộ Tư pháp phối hợp cùng các Bộ, ngành đánh giá quy định về thủ tục hành chính.' },
    ];
    const [tickerIndex, setTickerIndex] = useState(0);
    const [tickerVisible, setTickerVisible] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setTickerVisible(false);
            setTimeout(() => {
                setTickerIndex(prev => (prev + 1) % tickerItems.length);
                setTickerVisible(true);
            }, 350);
        }, 5000);
        return () => clearInterval(interval);
    }, [tickerItems.length]);

    // Full Vietnamese weekday names
    const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const now = new Date();
    const fullDateStr = `${weekdays[now.getDay()]}, Ngày ${now.toLocaleDateString('vi-VN', { day: '2-digit', month: 'numeric', year: 'numeric' })}`;;

    const tabs = [
        { id: 'ban-chi-dao', label: 'Ban Chỉ đạo' },
        { id: 'tin-tuc-hoat-dong', label: 'Tin tức hoạt động' },
        { id: 'chi-dao-huong-dan', label: 'Chỉ đạo, hướng dẫn nghiệp vụ ' },
        { id: 'van-ban-tai-lieu', label: 'Văn bản, tài liệu' },
        { id: 'he-thong-thong-tin', label: 'Hệ thống thông tin, báo cáo' }
    ];

    const [activeNewsTab, setActiveNewsTab] = useState('trung-uong');
    const [pageTrungUong, setPageTrungUong] = useState(1);
    const [pageDiaPhuong, setPageDiaPhuong] = useState(1);
    const itemsPerPage = 7;

    const [pageVanBan, setPageVanBan] = useState(1);
    const [pageHuongDan, setPageHuongDan] = useState(1);
    const itemsPerPageDoc = 5;

    const docsVanBan = MOCK_DOCS.filter(d => d.type === 'Văn bản chỉ đạo');
    const docsHuongDan = MOCK_DOCS.filter(d => d.type === 'Hướng dẫn nghiệp vụ');

    const currentVanBan = docsVanBan.slice((pageVanBan - 1) * itemsPerPageDoc, pageVanBan * itemsPerPageDoc);
    const totalVanBanPages = Math.ceil(docsVanBan.length / itemsPerPageDoc);

    const currentHuongDan = docsHuongDan.slice((pageHuongDan - 1) * itemsPerPageDoc, pageHuongDan * itemsPerPageDoc);
    const totalHuongDanPages = Math.ceil(docsHuongDan.length / itemsPerPageDoc);

    const currentTrungUong = MOCK_NEWS_HOAT_DONG.slice((pageTrungUong - 1) * itemsPerPage, pageTrungUong * itemsPerPage);
    const totalTrungUongPages = Math.ceil(MOCK_NEWS_HOAT_DONG.length / itemsPerPage);

    const currentDiaPhuong = MOCK_NEWS_THOI_SU.slice((pageDiaPhuong - 1) * itemsPerPage, pageDiaPhuong * itemsPerPage);
    const totalDiaPhuongPages = Math.ceil(MOCK_NEWS_THOI_SU.length / itemsPerPage);

    const renderPagination = (currentPage, totalPages, onPageChange) => (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${currentPage === i + 1
                        ? 'bg-[#0a3a73] text-white shadow-md'
                        : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-[#0a3a73]'
                        }`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );

    return (
        <div className="bg-[#f4f7fb] min-h-screen flex flex-col font-sans">

            <div className="container mx-auto pt-8 max-w-[1368px]">
                <div className="mb-8 rounded-lg overflow-hidden relative shadow-md group cursor-pointer border border-gray-100 mx-auto" style={{ maxWidth: '1368px', height: '153px' }}>
                    <img
                        src="/BO NHAN DIEN TONG RA SOAT/2.png"
                        alt="Đưa Nghị quyết đại hội XIV của Đảng vào cuộc sống"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Horizontal Navigation Tabs */}
            <div className="container mx-auto max-w-[1368px]">
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                    <div className="flex justify-evenly items-center w-full px-2 py-4">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-5 rounded-full font-bold transition-all text-[18px] whitespace-nowrap text-center
                                        ${isActive
                                            ? 'bg-[#ea492a] text-white shadow-md'
                                            : 'text-gray-700 hover:text-[#ea492a] hover:bg-gray-50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Vertical News Ticker */}
            <div className="container mx-auto max-w-[1368px] mt-3">
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden px-4 py-3">
                    <div className="bg-white border border-gray-200 text-gray-800 font-medium text-sm overflow-hidden flex items-stretch relative rounded-lg h-12 w-full">
                        {/* Date - skewed to match label */}
                        <span className="relative z-0 -ml-2 shrink-0 font-bold text-gray-700 border-r border-gray-200 pl-6 pr-4 flex items-center text-[11px] md:text-[12px] bg-gray-50 whitespace-nowrap skew-x-[-10deg]">
                            <span className="skew-x-[10deg]">{fullDateStr}</span>
                        </span>
                        {/* Label Tag */}
                        <span className="shrink-0 font-bold bg-[#ea492a] text-white px-3 flex items-center uppercase text-[10px] md:text-[11px] shadow-sm z-20 skew-x-[-10deg] mx-1.5">
                            <span className="skew-x-[10deg]">Tin tức nổi bật</span>
                        </span>
                        {/* Vertical ticker */}
                        <div className="flex-1 overflow-hidden relative flex items-center pl-4 md:pl-5">
                            <button
                                onClick={() => navigate(`/tong-ra-soat/tin-tuc/${tickerItems[tickerIndex].id}`)}
                                className="w-full text-left"
                            >
                                <span
                                    className={`block text-[13px] md:text-sm text-gray-900 font-bold truncate transition-all duration-350 ${tickerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
                                        }`}
                                    style={{ transition: 'opacity 0.35s ease, transform 0.35s ease' }}
                                >
                                    {tickerItems[tickerIndex].text}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-[1368px] flex-1 mt-6">
                {/* Breadcrumb */}
                {/* <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-6">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium">Tổng rà soát hệ thống VBQPPL</span>
                    <ChevronRight size={12} />
                    <span className="text-[#1a3b8b] font-bold">{tabs.find(t => t.id === activeTab)?.label}</span>
                </nav> */}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Area */}
                    <div className="flex-1 order-2 lg:order-1 min-w-0">
                        {/* Tab 1: Ban Chỉ đạo */}
                        {activeTab === 'ban-chi-dao' && (
                            <div className="bg-white rounded-2xl px-8 pt-3 pb-8 shadow-sm border border-gray-100 mt-2 animate-fadeIn">
                                {/* Sub-tabs cho Ban Chỉ đạo */}
                                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                                    <button
                                        onClick={() => setActiveBanChiDaoTab('chuc-nang')}
                                        className={`px-6 py-4 font-bold text-[16px] md:text-lg whitespace-nowrap transition-colors relative ${activeBanChiDaoTab === 'chuc-nang' ? 'text-[#ea492a]' : 'text-gray-500 hover:text-[#ea492a]'}`}
                                    >
                                        Chức năng, nhiệm vụ
                                        {activeBanChiDaoTab === 'chuc-nang' && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ea492a]" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveBanChiDaoTab('so-do')}
                                        className={`px-6 py-4 font-bold text-[16px] md:text-lg whitespace-nowrap transition-colors relative ${activeBanChiDaoTab === 'so-do' ? 'text-[#ea492a]' : 'text-gray-500 hover:text-[#ea492a]'}`}
                                    >
                                        Sơ đồ Ban Chỉ đạo
                                        {activeBanChiDaoTab === 'so-do' && (
                                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ea492a]" />
                                        )}
                                    </button>
                                </div>

                                {activeBanChiDaoTab === 'chuc-nang' && (
                                    <div className="animate-fadeIn bg-white">
                                        <div className="md:px-2 pt-2 pb-6 text-gray-800 leading-relaxed text-[15px] space-y-4">
                                            <p className="indent-8 text-base">
                                                Căn cứ Quyết định của Thủ tướng Chính phủ về việc thành lập Ban Chỉ đạo rà soát, xử lý vướng mắc trong hệ thống văn bản quy phạm pháp luật, chức năng, nhiệm vụ và quyền hạn của Ban Chỉ đạo được quy định như sau:
                                            </p>

                                            <p className="font-bold text-base">
                                                Điều 1. Vị trí và chức năng
                                            </p>
                                            <p className="text-base">
                                                Ban Chỉ đạo là tổ chức phối hợp liên ngành, có chức năng giúp cấp có thẩm quyền chỉ đạo, đôn đốc, điều phối giữa các bộ, ngành, địa phương trong việc rà soát, phát hiện và đề xuất phương án xử lý các quy định pháp luật mâu thuẫn, chồng chéo, bất cập hoặc không còn phù hợp với thực tiễn, nhằm tháo gỡ điểm nghẽn cho phát triển kinh tế - xã hội.
                                            </p>

                                            <p className="font-bold text-base">
                                                Điều 2. Nhiệm vụ và quyền hạn
                                            </p>
                                            <p className="text-base">
                                                Ban Chỉ đạo thực hiện các nhiệm vụ, quyền hạn cụ thể sau đây:
                                            </p>

                                            <div className="space-y-3 pt-1 text-base">
                                                <p>1. Tham mưu, giúp cấp có thẩm quyền xây dựng kế hoạch chi tiết, chỉ đạo, đôn đốc các cơ quan, đơn vị tổ chức triển khai thực hiện việc tổng rà soát hệ thống văn bản quy phạm pháp luật trên phạm vi toàn quốc theo đúng tiến độ đề ra.</p>
                                                <p>2. Tiếp nhận, xem xét và cho ý kiến đối với các báo cáo kết quả rà soát từ các bộ, ngành, địa phương; đánh giá toàn diện các quy định đang gây vướng mắc, từ đó định hướng các giải pháp xử lý dứt điểm để báo cáo Chính phủ và Quốc hội tháo gỡ.</p>
                                                <p>3. Chỉ đạo việc xây dựng, vận hành và khai thác hiệu quả Hệ thống cơ sở dữ liệu trực tuyến về kết quả rà soát văn bản quy phạm pháp luật, đảm bảo công khai, minh bạch quy trình tiếp thu, giải trình phản ánh của người dân và doanh nghiệp.</p>
                                                <p>4. Yêu cầu các bộ, cơ quan ngang bộ, cơ quan thuộc Chính phủ và Ủy ban nhân dân cấp tỉnh, cơ quan tổ chức, cá nhân có liên quan cung cấp thông tin, hồ sơ, tài liệu và báo cáo tình hình thực hiện công tác rà soát khi cần thiết.</p>
                                                <p>5. Chủ trì tổ chức các hội nghị, hội thảo nghiên cứu chuyên sâu; mời các chuyên gia, nhà khoa học, đại diện hiệp hội doanh nghiệp tham gia tư vấn, phản biện độc lập đối với các vấn đề mang tính vĩ mô, trọng tâm và gây vướng mắc lớn trong thực tiễn.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeBanChiDaoTab === 'so-do' && (
                                    <div className="space-y-10 animate-fadeIn">
                                        <div className="py-6 overflow-x-auto">
                                            <div className="min-w-[800px] flex flex-col items-center">
                                                {/* TIER 1: Trưởng ban */}
                                                <div className="relative flex flex-col items-center">
                                                    <div className="bg-white border-2 border-[#e21414] rounded-2xl px-12 py-6 shadow-xl text-center relative z-10 w-[450px]">
                                                        <div className="bg-[#fff0f0] border border-red-200 rounded-xl px-6 py-2 shadow-sm mb-4">
                                                            <h4 className="text-[#e21414] font-bold text-xl uppercase">TRƯỞNG BAN CHỈ ĐẠO</h4>
                                                        </div>
                                                        <div className="bg-gray-50 p-4 rounded-lg text-xl font-bold text-gray-700">
                                                            CHỦ TỊCH QUỐC HỘI
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Connector Tier 1 to Tier 2 (Drop) */}
                                                <div className="w-[2px] h-6 bg-[#e21414]/60 relative z-0"></div>

                                                {/* TIER 2: Phó Trưởng ban (4 khối song song) cùng hệ thống đường nối */}
                                                <div className="w-full max-w-[1240px] grid grid-cols-4 gap-4 px-4">

                                                    {/* Block 1 */}
                                                    <div className="relative pt-6 h-full">
                                                        <div className="absolute top-0 left-1/2 w-[calc(50%+8px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                            <div className="w-[2px] h-[18px] bg-[#e21414]/60"></div>
                                                            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#e21414]/60"></div>
                                                        </div>
                                                        <div className="bg-white border-2 border-[#e21414] rounded-2xl p-4 shadow-lg flex flex-col h-full relative z-10">
                                                            <div className="bg-[#fff0f0] border border-red-200 rounded-xl px-2 py-3 shadow-sm mb-4 text-center items-center justify-center flex">
                                                                <h4 className="text-[#e21414] font-bold text-[17px] uppercase leading-snug">PHÓ TRƯỞNG BAN<br />THƯỜNG TRỰC</h4>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg text-[17px] font-bold text-gray-700 text-center leading-snug flex-1 flex items-center justify-center">
                                                                Phó Thủ tướng Chính phủ
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Block 2 */}
                                                    <div className="relative pt-6 h-full">
                                                        <div className="absolute top-0 -left-[8px] w-[calc(100%+16px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                            <div className="w-[2px] h-[18px] bg-[#e21414]/60"></div>
                                                            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#e21414]/60"></div>
                                                        </div>
                                                        <div className="bg-white border-2 border-[#e21414] rounded-2xl p-4 shadow-lg flex flex-col h-full relative z-10">
                                                            <div className="bg-[#fff0f0] border border-red-200 rounded-xl px-2 py-3 shadow-sm mb-4 text-center items-center justify-center flex">
                                                                <h4 className="text-[#e21414] font-bold text-[17px] uppercase leading-snug">PHÓ TRƯỞNG BAN</h4>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg text-[17px] font-bold text-gray-700 text-center leading-snug flex-1 flex items-center justify-center">
                                                                Phó Chủ tịch Quốc hội
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Block 3 */}
                                                    <div className="relative pt-6 h-full">
                                                        <div className="absolute top-0 -left-[8px] w-[calc(100%+16px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                            <div className="w-[2px] h-[18px] bg-[#e21414]/60"></div>
                                                            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#e21414]/60"></div>
                                                        </div>
                                                        <div className="bg-white border-2 border-[#e21414] rounded-2xl p-4 shadow-lg flex flex-col h-full relative z-10">
                                                            <div className="bg-[#fff0f0] border border-red-200 rounded-xl px-2 py-3 shadow-sm mb-4 text-center items-center justify-center flex">
                                                                <h4 className="text-[#e21414] font-bold text-[17px] uppercase leading-snug">PHÓ TRƯỞNG BAN</h4>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg text-[17px] font-bold text-gray-700 text-center leading-snug flex-1 flex items-center justify-center">
                                                                Phó Trưởng ban<br />Nội chính Trung ương
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Block 4 */}
                                                    <div className="relative pt-6 h-full">
                                                        <div className="absolute top-0 -left-[8px] w-[calc(50%+8px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                            <div className="w-[2px] h-[18px] bg-[#e21414]/60"></div>
                                                            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#e21414]/60"></div>
                                                        </div>
                                                        <div className="bg-white border-2 border-[#e21414] rounded-2xl p-4 shadow-lg flex flex-col h-full relative z-10">
                                                            <div className="bg-[#fff0f0] border border-red-200 rounded-xl px-2 py-3 shadow-sm mb-4 text-center items-center justify-center flex">
                                                                <h4 className="text-[#e21414] font-bold text-[17px] uppercase leading-snug">PHÓ TRƯỞNG BAN</h4>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg text-[17px] font-bold text-gray-700 text-center leading-snug flex-1 flex items-center justify-center">
                                                                Phó Chủ tịch - Tổng Thư ký<br />Ủy ban Trung ương<br />Mặt trận Tổ quốc Việt Nam
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Connector Tier 2 to Tier 3 */}
                                                <div className="w-full max-w-[1240px] grid grid-cols-4 gap-4 px-4 h-6 relative z-0">
                                                    {/* Block 1 */}
                                                    <div className="relative">
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-6 left-1/2 w-[calc(50%+8px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                    </div>
                                                    {/* Block 2 */}
                                                    <div className="relative">
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-6 -left-[8px] w-[calc(100%+16px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                    </div>
                                                    {/* Block 3 */}
                                                    <div className="relative">
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-6 -left-[8px] w-[calc(100%+16px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                    </div>
                                                    {/* Block 4 */}
                                                    <div className="relative">
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#e21414]/60 z-0"></div>
                                                        <div className="absolute top-6 -left-[8px] w-[calc(50%+8px)] h-[2px] bg-[#e21414]/60 z-0"></div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <div className="w-[2px] h-[24px] bg-[#e21414]/60 relative z-0"></div>
                                                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#e21414]/60 relative z-10 -mt-[1px]"></div>
                                                </div>

                                                {/* TIER 3: Ủy viên (1 khối gộp) */}
                                                <div className="bg-white border-2 border-[#e21414] rounded-2xl p-8 shadow-lg w-full max-w-[800px] flex flex-col items-center mt-2">
                                                    <div className="bg-[#fff0f0] border border-red-200 rounded-xl px-10 py-3 shadow-sm mb-8 text-center w-full">
                                                        <h4 className="text-[#e21414] font-bold text-xl uppercase">ỦY VIÊN BAN CHỈ ĐẠO</h4>
                                                    </div>
                                                    <div className="w-full">
                                                        {/* Nhóm Ủy viên thường trực */}
                                                        <div className="mb-6">
                                                            <div className="text-[#e21414] font-bold text-lg mb-3 border-b border-red-100 pb-2 flex items-center gap-2">
                                                                <div className="w-2 h-6 bg-[#e21414] rounded-sm"></div>
                                                                Các Ủy viên Thường trực
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-y-3 relative z-10">
                                                                {[
                                                                    'Chủ nhiệm Ủy ban Pháp luật và Tư pháp',
                                                                    'Bộ trưởng Bộ Tư pháp'
                                                                ].map((item, idx) => (
                                                                    <div key={`tt-${idx}`} className="p-3 rounded-lg text-[17px] font-bold leading-snug flex items-center gap-3 text-left bg-red-50/50 border border-red-100/50 text-gray-800">
                                                                        <div className="w-2 h-2 rounded-full bg-[#e21414] shadow-sm shrink-0"></div>
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Nhóm Ủy viên */}
                                                        <div>
                                                            <div className="text-[#e21414] font-bold text-lg mb-3 border-b border-red-100 pb-2 pt-2 flex items-center gap-2">
                                                                <div className="w-2 h-6 bg-[#e21414] rounded-sm opacity-60"></div>
                                                                Các Ủy viên
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-y-3 relative z-10">
                                                                {[
                                                                    'Văn phòng Trung ương Đảng', 'Mặt trận Tổ quốc Việt Nam', 'Tòa án nhân dân tối cao',
                                                                    'Viện kiểm sát nhân dân tối cao', 'Kiểm toán nhà nước', 'Văn phòng Chủ tịch nước',
                                                                    'Văn phòng Quốc hội', 'Các cơ quan của Quốc hội', 'Bộ Tư pháp',
                                                                    'Văn phòng Chính phủ', 'Các Bộ, cơ quan ngang Bộ', 'Ủy ban nhân dân Thành phố Hà Nội',
                                                                    'Ủy ban nhân dân Thành phố Hồ Chí Minh', 'Ủy ban nhân dân Thành phố Đà Nẵng', 'Ủy ban nhân dân Tỉnh Bắc Ninh', 'Ủy ban nhân dân Tỉnh Quảng Ninh',
                                                                    'VCCI', 'Hiệp hội Doanh nghiệp Việt Nam', 'Liên đoàn Luật sư', 'Hội Luật gia'
                                                                ].map((item, idx) => (
                                                                    <div key={`uv-${idx}`} className="p-2.5 rounded-lg text-[17px] font-bold leading-snug flex items-center gap-3 text-left bg-gray-50 border border-gray-100/80 text-gray-700">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="mt-5 text-[17px] text-center text-gray-500 italic font-medium">Đại diện lãnh đạo các cơ quan, tổ chức theo quy định</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Legal Document Link */}
                                        <div className="mt-12 text-center pb-4 border-t border-gray-100 pt-8">
                                            <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed max-w-4xl mx-auto italic">
                                                Văn bản đính kèm:
                                                <a
                                                    href="#"
                                                    className="text-grey-500 hover:text-grey-800 hover:underline font-bold ml-1 transition-colors"
                                                >
                                                    Quyết định số 603/QĐ-TTg của Thủ tướng Chính phủ: Về việc thành lập Ban Chỉ đạo rà soát, xử lý vướng mắc trong hệ thống văn bản quy phạm pháp luật
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab 2: Chỉ đạo - Hướng dẫn nghiệp vụ */}
                        {activeTab === 'chi-dao-huong-dan' && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fadeIn mt-2">
                                {/* <h2 className="text-xl font-bold text-[#1a3b8b] mb-6 border-l-4 border-[#fdb714] pl-3 uppercase">
                                    Chỉ đạo & Hướng dẫn nghiệp vụ
                                </h2> */}

                                <div className="space-y-10">
                                    {/* Nhóm 1 */}
                                    <div>
                                        <h3 className="font-bold text-xl text-[#ea492a] mb-6 pb-2 border-b border-gray-200 flex items-center gap-2">
                                            <CheckCircle2 className="text-[#ea492a]" />
                                            1. Văn bản chỉ đạo
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 mb-4">
                                            {currentVanBan.map((doc, idx) => (
                                                <div
                                                    onClick={() => navigate(`/tong-ra-soat/van-ban/${doc.id || idx + 1}`)}
                                                    key={idx}
                                                    className="border border-gray-200 bg-white rounded-xl p-4 md:p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col md:flex-row gap-4 justify-between md:items-center group cursor-pointer"
                                                >
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 text-base mb-2 leading-snug group-hover:text-black transition-colors">
                                                            {doc.title}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                                            {doc.summary}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-end lg:items-center justify-between shrink-0 gap-3 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                                                        <div className="flex items-center gap-1.5 text-gray-500 text-xs bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-100">
                                                            <Clock size={14} />
                                                            {doc.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {renderPagination(pageVanBan, totalVanBanPages, setPageVanBan)}
                                    </div>

                                    {/* Nhóm 2 */}
                                    <div>
                                        <h3 className="font-bold text-xl text-[#ea492a] mb-6 pb-2 border-b border-gray-200 flex items-center gap-2 mt-4">
                                            <BookOpen className="text-[#ea492a]" />
                                            2. Hướng dẫn nghiệp vụ
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 mb-4">
                                            {currentHuongDan.map((doc, idx) => (
                                                <div
                                                    onClick={() => navigate(`/tong-ra-soat/van-ban/${doc.id || idx + 101}`)}
                                                    key={idx}
                                                    className="border border-gray-200 bg-white rounded-xl p-4 md:p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col md:flex-row gap-4 justify-between md:items-center group cursor-pointer"
                                                >
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-grey-900 text-base mb-2 leading-snug group-hover:text-black transition-colors">
                                                            {doc.title}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                                            {doc.summary}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-end lg:items-center justify-between shrink-0 gap-3 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                                                        <div className="flex items-center gap-1.5 text-gray-500 text-xs bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-100">
                                                            <Clock size={14} />
                                                            {doc.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {renderPagination(pageHuongDan, totalHuongDanPages, setPageHuongDan)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Tin tức */}
                        {activeTab === 'tin-tuc-hoat-dong' && (() => {
                            const renderNewsLayout = (newsItems) => {
                                if (!newsItems || newsItems.length === 0) return null;
                                const topNews = newsItems[0];
                                const gridNews = newsItems.slice(1, 4);
                                const listNews = newsItems.slice(4);

                                return (
                                    <div className="space-y-5 animate-fadeIn">
                                        {/* Top News */}
                                        {topNews && (
                                            <div
                                                onClick={() => navigate(`/tong-ra-soat/tin-tuc/${topNews.id || 0}`)}
                                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all flex flex-col md:flex-row group cursor-pointer"
                                            >
                                                <div className="md:w-[55%] aspect-[16/9] md:aspect-auto overflow-hidden">
                                                    <img src={topNews.image} alt={topNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                </div>
                                                <div className="md:w-[45%] p-6 md:p-8 flex flex-col justify-center">
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-black transition-colors leading-tight line-clamp-3">
                                                        {topNews.title}
                                                    </h3>
                                                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm md:text-base">
                                                        {topNews.summary || 'Thông tin chi tiết về sự kiện đang được cập nhật. Ban Chỉ đạo theo sát để đôn đốc các thành viên hoàn thành tiến độ đúng hạn.'}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-auto">
                                                        <Clock size={16} />
                                                        <span>{topNews.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Grid News (Next 3) */}
                                        {gridNews.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {gridNews.map(news => (
                                                    <div
                                                        onClick={() => navigate(`/tong-ra-soat/tin-tuc/${news.id || 1}`)}
                                                        key={news.id || Math.random()}
                                                        className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all group cursor-pointer flex flex-col"
                                                    >
                                                        <div className="aspect-[16/10] overflow-hidden">
                                                            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        </div>
                                                        <div className="p-5 flex flex-col flex-1">
                                                            <h4 className="font-bold text-gray-800 text-base md:text-lg mb-4 group-hover:text-black transition-colors leading-snug line-clamp-3 flex-1">
                                                                {news.title}
                                                            </h4>
                                                            <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mt-auto">
                                                                <Clock size={14} />
                                                                <span>{news.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Banner separator */}
                                        {/* <div className="w-full flex justify-center pt-2 pb-3 mb-1 animate-fadeIn">
                                            <div
                                                className="rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all shrink-0"
                                                style={{ width: '849.31px', height: '159.19px' }}
                                            >
                                                <img
                                                    src="/800-150-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg"
                                                    alt="Nghị Quyết Đại Hội XIV"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </div> */}

                                        {/* List News (Remaining) */}
                                        {listNews.length > 0 && (
                                            <div className="space-y-4">
                                                {listNews.map(news => (
                                                    <div
                                                        onClick={() => navigate(`/tong-ra-soat/tin-tuc/${news.id || 2}`)}
                                                        key={news.id || Math.random()}
                                                        className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all group cursor-pointer p-4 md:p-5 flex flex-col sm:flex-row gap-5 md:gap-6 items-start sm:items-center"
                                                    >
                                                        <div className="w-full sm:w-[240px] md:w-[280px] aspect-[16/10] shrink-0 overflow-hidden rounded-lg">
                                                            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        </div>
                                                        <div className="flex flex-col flex-1 py-1">
                                                            <h4 className="font-bold text-gray-900 text-base md:text-lg mb-3 group-hover:text-black transition-colors leading-snug line-clamp-2">
                                                                {news.title}
                                                            </h4>
                                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                                {news.summary || 'Nội dung chi tiết đang được rà soát và cập nhật trên hệ thống trong thời gian sớm nhất.'}
                                                            </p>
                                                            <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mt-auto">
                                                                <Clock size={14} />
                                                                <span>{news.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            };

                            return (
                                <div className="bg-white rounded-xl px-8 pt-3 pb-8 shadow-sm border border-gray-100 animate-fadeIn mt-2">
                                    <div className="mb-0">
                                        {/* Sub-tabs cho Cơ quan Trung ương và Địa phương */}
                                        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                                            <button
                                                onClick={() => setActiveNewsTab('trung-uong')}
                                                className={`px-6 py-4 font-bold text-[16px] md:text-lg whitespace-nowrap transition-colors relative ${activeNewsTab === 'trung-uong' ? 'text-[#ea492a]' : 'text-gray-500 hover:text-[#ea492a]'}`}
                                            >
                                                Cơ quan Trung ương
                                                {activeNewsTab === 'trung-uong' && (
                                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ea492a]" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => setActiveNewsTab('dia-phuong')}
                                                className={`px-6 py-4 font-bold text-[16px] md:text-lg whitespace-nowrap transition-colors relative ${activeNewsTab === 'dia-phuong' ? 'text-[#ea492a]' : 'text-gray-500 hover:text-[#ea492a]'}`}
                                            >
                                                Cơ quan địa phương
                                                {activeNewsTab === 'dia-phuong' && (
                                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ea492a]" />
                                                )}
                                            </button>
                                        </div>

                                        {/* News Content */}
                                        {activeNewsTab === 'trung-uong' && (
                                            <div>
                                                {renderNewsLayout(currentTrungUong)}
                                                {totalTrungUongPages > 1 && renderPagination(pageTrungUong, totalTrungUongPages, setPageTrungUong)}
                                            </div>
                                        )}
                                        {activeNewsTab === 'dia-phuong' && (
                                            <div>
                                                {renderNewsLayout(currentDiaPhuong)}
                                                {totalDiaPhuongPages > 1 && renderPagination(pageDiaPhuong, totalDiaPhuongPages, setPageDiaPhuong)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Tab 4: Văn kiện, VBQPPL */}
                        {activeTab === 'van-ban-tai-lieu' && (
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 animate-fadeIn mt-2">
                                <div className="text-center mb-5 pb-4 border-b border-gray-200">
                                    <h2 className="text-[20px] md:text-xl lg:text-xl font-bold text-[#ea492a] uppercase mb-4 leading-snug">
                                        VĂN BẢN, TÀI LIỆU PHỤC VỤ TỔNG RÀ SOÁT HỆ THỐNG VBQPPL
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="border border-blue-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50/50 text-center flex flex-col items-center group">
                                        <div className="mb-4 flex items-center justify-center h-16 w-full overflow-hidden">
                                            <img src="/BO NHAN DIEN TONG RA SOAT/intro_logo.webp" alt="Icon VBQPPL" className="h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm px-2">Hệ thống VBQPPL</h3>
                                        <p className="text-xs text-gray-500 mb-4 px-2">Liên kết đến Cơ sở dữ liệu quốc gia về pháp luật</p>
                                        <a href="https://vbpl.vn" target="_blank" rel="noreferrer" className="mt-auto bg-white border border-gray-500 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-[#ea492a] hover:border-[#ea492a] hover:text-white transition w-full">
                                            Truy cập
                                        </a>
                                    </div>

                                    <div className="border border-red-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-red-50/50 text-center flex flex-col items-center group">
                                        <div className="mb-4 flex items-center justify-center h-16 w-full overflow-hidden">
                                            <img src="/BO NHAN DIEN TONG RA SOAT/bg-li.png" alt="Icon Đảng" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm px-2">Văn bản, tài liệu của Đảng</h3>
                                        <p className="text-xs text-gray-500 mb-4 px-2">Liên kết chuyên mục, Trang của các Ban Đảng Trung ương</p>
                                        <a href="https://tulieuvankien.dangcongsan.vn/" target="_blank" rel="noreferrer" className="mt-auto bg-white border border-gray-500 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-[#ea492a] hover:border-[#ea492a] hover:text-white transition w-full">
                                            Truy cập
                                        </a>
                                    </div>

                                    <div className="border border-teal-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-teal-50/50 text-center flex flex-col items-center group">
                                        <div className="mb-4 flex items-center justify-center h-16 w-full overflow-hidden">
                                            <img src="/BO NHAN DIEN TONG RA SOAT/international_treaty_icon.png" alt="Icon Điều ước quốc tế" className="h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm px-2">Điều ước quốc tế</h3>
                                        <p className="text-xs text-gray-500 mb-4 px-2">Liên kết danh sách Điều ước quốc tế cập nhật từ Bộ Ngoại giao</p>
                                        <a href="https://treaty.mofa.gov.vn/vi-vn/dieu-uoc/dieu-uoc-quoc-te-moi-co-hieu-luc/" target="_blank" rel="noreferrer" className="mt-auto bg-white border border-gray-500 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-[#ea492a] hover:border-[#ea492a] hover:text-white transition w-full">
                                            Truy cập
                                        </a>
                                    </div>
                                </div>

                                {/* Bảng Văn bản mới ban hành */}
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="text-center mb-5 pb-4 border-b border-gray-200">
                                        <h2 className="text-[20px] md:text-xl lg:text-xl font-bold text-[#ea492a] uppercase leading-snug">
                                            VĂN BẢN MỚI BAN HÀNH
                                        </h2>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-200 overflow-hidden flex flex-col mt-2">
                                        {/* Table Header */}
                                        <div className="flex bg-[#ea492a] text-white text-[16px] font-bold py-4 px-6 shrink-0">
                                            <div className="w-[160px] md:w-[200px] shrink-0">Ngày ban hành</div>
                                            <div className="flex-1">Nội dung</div>
                                        </div>
                                        {/* Table Body */}
                                        <div className="flex flex-col bg-white">
                                            {[
                                                { date: '22/03/2026', title: 'Quyết định 26/QĐ-BCĐQG của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ ban hành Kế hoạch Tổ chức lấy mẫu hài cốt liệt sĩ đối với các mộ chưa xác định được thông tin trong nghĩa trang liệt sĩ để giám định ADN' },
                                                { date: '22/03/2026', title: 'Quyết định 24/QĐ-BCĐQG của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ ban hành Chương trình Hoạt động của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ giai đoạn 2026 - 2030' },
                                                { date: '22/03/2026', title: 'Quyết định 23/QĐ-BCĐQG của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ ban hành Quy chế hoạt động của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ' },
                                                { date: '22/03/2026', title: 'Quyết định 25/QĐ-BCĐQG của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ ban hành Kế hoạch hoạt động của Ban Chỉ đạo quốc gia về tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ năm 2026' }
                                            ].map((doc, index) => (
                                                <div key={index} className="flex flex-col md:flex-row text-[15px] py-4 px-6 border-b border-gray-100 last:border-0 hover:bg-red-50/50 transition cursor-pointer group items-start md:items-center">
                                                    <div className="w-full md:w-[200px] shrink-0 font-semibold text-gray-800 mb-1 md:mb-0">{doc.date}</div>
                                                    <div className="flex-1 text-gray-700 group-hover:text-[#ea492a] leading-relaxed font-medium transition-colors">{doc.title}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Tab 5: Hệ thống thông tin */}
                        {activeTab === 'he-thong-thong-tin' && (
                            <div className="space-y-8 animate-fadeIn mt-2">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                                    {/* <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                        <h2 className="text-xl font-bold text-[#1a3b8b] mb-4 border-l-4 border-[#fdb714] pl-3 uppercase">
                                            Danh sách hệ thống thông tin, báo cáo
                                        </h2>
                                    </div> */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {MOCK_SYSTEMS.map((system) => {
                                            return (
                                                <div key={system.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors bg-white shadow-sm">
                                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                        <div className="w-[120px] shrink-0">
                                                            <div className="aspect-[4/3] rounded-md overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center p-1">
                                                                <img src={system.image} alt={system.title} className="w-full h-full object-cover rounded" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <a href={system.link} className="text-lg font-bold text-gray-900 hover:text-black transition-colors flex items-center gap-2 group">
                                                                {system.title}
                                                            </a>
                                                            <p className="text-gray-600 mt-2 text-sm">{system.description}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Hệ thống thông tin liên kết */}
                                {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-bold text-[#1a3b8b] mb-6 border-l-4 border-[#fdb714] pl-3 uppercase">
                                        Hệ thống thông tin liên kết
                                    </h2>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {MOCK_PORTALS.map((portal, index) => (
                                            <a
                                                key={index}
                                                href={portal.url}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                                            >
                                                <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[#1a3b8b] bg-blue-50/50 rounded-md group-hover:bg-blue-100 group-hover:shadow-sm transition-all">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d={portal.icon} />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#1a3b8b] transition-colors">
                                                    {portal.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        )}
                    </div>
                    {/* Right Banners Sidebar (visible on all tabs) */}
                    {/* <div className="hidden lg:flex flex-col gap-6 order-1 lg:order-2 mt-2 shrink-0" style={{ width: '413px' }}>
                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white group relative">
                            <img src="/banner-nghi-quyet.png" alt="Đưa nghị quyết Đại hội XIV" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white group relative">
                            <img src="/banner-dai-hoi.png" alt="Đưa nghị quyết Đại hội XIV vào cuộc sống" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div> */}
                </div>
            </div>

            <style jsx="true">{`
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
                .marquee-container:hover .animate-marquee {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0%   { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default TongRaSoatPage;

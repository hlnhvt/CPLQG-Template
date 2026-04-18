import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ChevronRight, ArrowLeft, Search, PlusCircle,
    FileText, CheckCircle, Clock, Eye, MessageCircle, BarChart, User
} from 'lucide-react';

// MOCK DATA for ideas
const DOMAIN_IDEAS = {
    'Sức khỏe và Y tế': [
        { t: 'Đề xuất giải pháp liên thông dữ liệu y tế quốc gia', e: 'Cần xây dựng chuẩn dữ liệu chung đồng bộ và bảo mật giữa các bệnh viện tuyến tỉnh và tuyến trung ương trên toàn quốc. Điều này giúp hệ thống y tế quản lý hồ sơ sức khoẻ trọn đời, hỗ trợ chẩn đoán chính xác và giúp người dân không phải lãng phí tiền bạc, thời gian làm lại các xét nghiệm cơ bản mang tính lặp lại khi chuyển tuyến.' },
        { t: 'Kiến nghị sửa đổi quy định về đấu thầu thuốc tập trung', e: 'Quy trình đấu thầu thuốc hiện nay kéo dài qua nhiều cấp xét duyệt gây ra tình trạng thiếu thuốc cục bộ tại các bệnh viện và trạm y tế phường/xã. Cần trao quyền tự chủ một phần cho các đơn vị tự phân bổ ngân sách, với cơ chế mua sắm khẩn cấp linh hoạt để đảm bảo liên tục nguồn cung ứng thuốc bảo hiểm y tế phục vụ nhân dân.' },
        { t: 'Giải pháp nâng cao chất lượng y tế học đường', e: 'Y tế học đường hiện nay thường chỉ dừng ở mức khám sức khỏe qua loa. Đẩy mạnh việc tập huấn sơ cấp cứu cơ bản và kỹ năng xử lý chấn thương cho giáo viên, đồng thời trang bị hệ thống tủ thuốc y tế dự phòng tiêu chuẩn và tổ chức các khoá đào tạo sơ cứu đuối nước bắt buộc tại tất cả các cấp mầm non và tiểu học.' }
    ],
    'Giáo dục và Đào tạo': [
        { t: 'Kiến nghị giảm tải nội dung sách giáo khoa cấp tiểu học', e: 'Học sinh tiểu học hiện đang phải tiếp thu một khối lượng kiến thức quá lớn và hàn lâm so với độ tuổi. Đề nghị cải tổ toàn diện, cắt bỏ các môn học lý thuyết chuyên sâu để tập trung thời lượng giảng dạy vào các hoạt động giáo dục kỹ năng sống, rèn luyện đạo đức ứng xử và thể chất.' },
        { t: 'Đề xuất cơ chế hỗ trợ tài chính cho giáo viên vùng sâu', e: 'Phụ cấp bám bản và phụ cấp điểm trường hiện tại chưa phản ánh đúng sự cống hiến và không đủ sức giữ chân giáo viên giỏi tại miền núi. Rất cần có thêm những gói hỗ trợ cụ thể về nhà ở công vụ chất lượng cao, phụ cấp chi phí xăng xe đi lại hàng tháng và chính sách luân chuyển sau khoảng 3-5 năm công tác.' },
        { t: 'Sáng kiến phát triển mạng lưới hướng nghiệp cho học sinh THPT', e: 'Học sinh cấp 3 thường thiếu thông tin thực tiễn và chọn sai nghề. Cần phải đưa các buổi tham quan nhà máy, công sở vào chương trình bắt buộc, đồng thời để học sinh được lắng nghe định hướng từ chính các chuyên gia từ doanh nghiệp thay vì giới hạn trong các bài tư vấn sáo rỗng của giáo viên chủ nhiệm.' }
    ],
    'Giao thông vận tải': [
        { t: 'Đề xuất mở rộng mạng lưới xe buýt trợ giá ra khu vực ven đô', e: 'Với tốc độ đô thị hoá nhanh, lượng lớn dân cư tại các khu đô thị mới ven rìa các tỉnh thành đang bị thiếu hụt nghiêm trọng cơ sở hạ tầng phương tiện công cộng, dẫn tới việc lạm dụng xe máy đi vào trung tâm gây ùn tắc giao thông và ô nhiễm. Cần trợ giá để khuyến khích các tuyến buýt vòng ngoài.' },
        { t: 'Kiến nghị áp dụng công nghệ AI vào phạt nguội vi phạm', e: 'Triển khai mạnh mẽ mạng lưới hệ thống camera tích hợp AI (Trí tuệ nhân tạo) để tự động phát hiện, trích xuất biển số và gửi thông báo phạt nguội đối với tài xế có hành vi lấn làn, vượt đèn đỏ hay chạy quá tốc độ trên dọc các tuyến cao tốc, quốc lộ trọng điểm.' }
    ],
    'Bất động sản': [
        { t: 'Kiến nghị siết chặt quản lý môi giới bất động sản', e: 'Để hạn chế tình trạng cò đất thao túng thị trường và gây nên các cơn sốt đất ảo, cần tiến hành quy định khắt khe yêu cầu tất cả các mạng lưới môi giới cá nhân phải trải qua đào tạo thi sát hạch để được cấp mã số và chứng chỉ hành nghề chính quy của nhà nước.' },
        { t: 'Giải pháp thúc đẩy phát triển nhà ở xã hội cho công nhân', e: 'Nhằm giải quyết vấn đề an sinh cho lực lượng lao động tại các khu công nghiệp trọng điểm, cần ban hành ngay lập tức gói tín dụng ưu đãi với mức lãi suất vay cố định dưới 4% mỗi năm, cho phép các hộ gia đình công nhân được mua nhà ở xã hội và thế chấp trả góp kéo dài trong 15-20 năm.' }
    ],
    'Môi trường và Khí hậu': [
        { t: 'Đề xuất phân loại rác thải tại nguồn có thưởng - phạt rõ ràng', e: 'Không thể tiếp tục khuyến khích bằng khẩu hiệu mà cần áp dụng cơ chế đánh thuế tiền thu gom rác theo chính khối lượng rác vô cơ không tái chế được. Đồng thời có chế độ phát bao bì miễn phí, tặng điểm tích lũy quy đổi sản phẩm để khuyến khích các hộ gia đình tự phân loại rác nhà bếp đem ủ làm phân bón hữu cơ.' }
    ],
    'Kinh tế và Đời sống': [
        { t: 'Đề xuất miễn thuế khoán cho tiểu thương có hoàn cảnh khó khăn', e: 'Trong bối cảnh nền kinh tế có nhiều biến động, đối với những hộ kinh doanh cá thể nhỏ lẻ buôn bán tại chợ truyền thống có mức lợi nhuận hàng tháng ở mức thấp, chính quyền các địa phương cần xem xét linh hoạt thực hiện chính sách miễn giảm một phần hoặc toàn bộ thuế khoán nhằm nuôi dưỡng nguồn thu và khuyến khích họ phát triển làm ăn kinh tế.' }
    ],
    'default': [
        { t: 'Đề xuất số hóa hoàn toàn các thủ tục hành chính cấp xã', e: 'Hiện nay nhiều nơi người dân vẫn phải sao y công chứng và nộp hàng tá giấy tờ bản cứng mặc dù dữ liệu dân cư quốc gia đã có thể trích xuất qua hệ thống thẻ CCCD gắn chip. Đề nghị chuẩn hoá và liên thông toàn diện để mọi thủ tục như đăng ký thường trú hay cấp bản sao khai sinh đều được xử lý 100% tự động qua Cổng dịch vụ công.' },
        { t: 'Sáng kiến thành lập tổ tư vấn pháp lý trực tuyến miễn phí', e: 'Việc tiếp cận sự trợ giúp pháp lý của người nghèo và đối tượng yếu thế còn rất nhiều rào cản. Chỉnh phủ cần có nền tảng công nghệ số nơi các tổ chức, nhóm luật sư tình nguyện có thể đăng ký tham gia tư vấn trực tiếp từ xa để giải quyết tranh chấp ngay từ cơ sở, nâng cao dân trí pháp luật cho nhân dân.' },
        { t: 'Kiến nghị tăng cường kiểm tra, rà soát an toàn cháy nổ', e: 'Trước tình trạng liên tiếp xảy ra hoả hoạn nguy hiểm cướp đi nhiều sinh mạng, đặc biệt đối với các khu vực chung cư mini, nhà trọ đông đúc sinh viên trong các hẻm sâu xe cứu hoả không vào được, cần yêu cầu các chủ hộ lắp đặt hệ thống cảnh báo cháy lan thông minh và mở lối thoát hiểm thứ hai.' },
        { t: 'Đề xuất xây dựng quỹ an sinh hỗ trợ người lao động tự do', e: 'Về lâu dài, các tổ chức đoàn thể địa phương cần vận động xây dựng được các mô hình quỹ an sinh xã hội cấp phường hay cụm dân cư, mục tiêu chủ chốt là để tương trợ, mua bảo hiểm cho những người chạy xe ôm công nghệ, người làm thuê, bán hàng rong khi họ không may gặp bệnh hiểm nghèo hoặc tử nạn lao động.' },
        { t: 'Kiến nghị đơn giản hóa quy trình cấp phép cơ sở kinh doanh', e: 'Quy trình khởi sự kinh doanh đối với các ngành nghề có điều kiện hiện tại vẫn còn phải qua nhiều khâu không cần thiết dễ dẫn đến hiện tượng xin cho hoặc nhũng nhiễu làm nản lòng doanh nghiệp. Đề xuất chuẩn hoá tối đa bộ hồ sơ lên không gian số và quy định rõ ràng thời hạn phản hồi hợp lệ tối đa là 5 ngày làm việc thực tế.' }
    ]
};

const AUTHOR_NAMES = [
    'Nguyễn Văn An', 'Trần Thị Nhàn', 'Lê Hoàng Bách', 'Phạm Quỳnh Như',
    'Hoàng Anh Tuấn', 'Đặng Tuấn Phong', 'Vũ Thị Thanh', 'Đỗ Minh Trí',
    'Phan Ngọc Hải', 'Ngô Thu Thảo', 'Bùi Văn Hùng', 'Lý Quang Cường'
];

const generateMockIdeas = (domain) => {
    const defaultIdeas = DOMAIN_IDEAS['default'];
    // Try to match domain name if it contains keywords
    let matchedDomain = Object.keys(DOMAIN_IDEAS).find(key => domain && domain.includes(key)) || domain;
    const specificIdeas = DOMAIN_IDEAS[matchedDomain] || [];

    // Pool allows mixing if specific ones are too few
    const pool = [...specificIdeas, ...defaultIdeas];

    return Array.from({ length: 45 }).map((_, i) => {
        const id = i + 1;
        const baseDate = new Date();
        baseDate.setDate(baseDate.getDate() - (Math.floor(Math.random() * 60)));

        const template = pool[i % pool.length];
        const titleSuffix = (i >= pool.length) ? ` (Lần ${Math.floor(i / pool.length) + 1})` : '';

        return {
            id,
            title: template.t + titleSuffix,
            excerpt: template.e,
            author: AUTHOR_NAMES[i % AUTHOR_NAMES.length],
            date: baseDate.toLocaleDateString('vi-VN'),
            status: 'Đã công khai',
            isResponded: Math.random() > 0.4
        };
    }).sort((a, b) => {
        const [dA, mA, yA] = a.date.split('/');
        const [dB, mB, yB] = b.date.split('/');
        return new Date(`${yB}-${mB}-${dB}`) - new Date(`${yA}-${mA}-${dA}`);
    });
};

export default function HienKeLinhVucDanhSachPage() {
    const [searchParams] = useSearchParams();
    const domain = searchParams.get('domain') || 'Tất cả lĩnh vực';

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Generate mock data based on domain
    const allIdeas = useMemo(() => generateMockIdeas(domain), [domain]);

    // Lọc theo tìm kiếm
    const filteredIdeas = useMemo(() => {
        return allIdeas.filter(idea =>
            idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            idea.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allIdeas, searchTerm]);

    // Phân trang
    const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
    const paginatedIdeas = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredIdeas.slice(start, start + itemsPerPage);
    }, [filteredIdeas, currentPage]);

    // Thống kê mock (độc lập với danh sách hiển thị)
    const stats = {
        total: 125,
        processing: 42,
        published: 83
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đã công khai': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Đã tiếp thu': return 'bg-green-100 text-green-700 border-green-200';
            case 'Đang xử lý': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Chờ duyệt': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
            {/* HERO BANNER */}
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
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke/linh-vuc" className="hover:text-white transition-colors">Lĩnh vực</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90 truncate max-w-[200px]">{domain}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            {/* <Link to="/hien-ke/linh-vuc" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4 font-medium text-[13px] transition-colors">
                                <ArrowLeft size={16} /> Quay lại danh sách lĩnh vực
                            </Link> */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                                Hiến kế lĩnh vực <span className="text-amber-400">{domain}</span>
                            </h1>
                            <p className="text-blue-100/90 text-[15px] max-w-2xl leading-relaxed">
                                Tổng hợp các ý kiến đóng góp, sáng kiến của người dân và doanh nghiệp nhằm hoàn thiện chính sách, pháp luật trong lĩnh vực {domain}.
                            </p>
                        </div>
                        <Link
                            to={`/hien-ke/gop-y-nhanh?domain=${encodeURIComponent(domain)}`}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1 shrink-0"
                        >
                            <PlusCircle size={20} />
                            Gửi hiến kế mới
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] mt-6 relative z-30">
                {/* Thống kê */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Tổng số hiến kế</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Chờ phản hồi</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-[13px] text-gray-500 font-bold uppercase mb-1">Đã phản hồi</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                        <h2 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
                            <BarChart size={20} className="text-blue-600" />
                            Danh sách đóng góp
                        </h2>

                        <div className="relative w-full sm:w-[350px]">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo tiêu đề, từ khóa..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset page on search
                                }}
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-[14px]"
                            />
                        </div>
                    </div>

                    {/* Danh sách List */}
                    <div className="divide-y divide-gray-100">
                        {paginatedIdeas.length > 0 ? (
                            paginatedIdeas.map(idea => (
                                <div key={idea.id} className="p-5 md:p-6 hover:bg-blue-50/30 transition-colors group">
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                {idea.isResponded ? (
                                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border bg-green-50 text-green-600 border-green-200 flex items-center gap-1">
                                                        <CheckCircle size={12} /> Đã phản hồi
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold border bg-gray-50 text-gray-500 border-gray-200">
                                                        Chờ phản hồi
                                                    </span>
                                                )}
                                            </div>

                                            <Link to={`/hien-ke/${idea.id}`} className="block mb-2">
                                                <h3 className="text-[16px] md:text-[18px] font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
                                                    {idea.title}
                                                </h3>
                                            </Link>

                                            <p className="text-gray-600 text-[14px] leading-relaxed mb-4 line-clamp-3">
                                                {idea.excerpt}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500 font-medium">
                                                <div className="flex items-center gap-1.5 border-r border-gray-200 pr-4">
                                                    <User size={14} className="text-gray-400" />
                                                    <span className="text-gray-700">{idea.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={13} className="text-gray-400" />
                                                    <span>{idea.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <Search size={28} />
                                </div>
                                <h3 className="text-[16px] font-bold text-gray-800 mb-2">Không tìm thấy hiến kế nào</h3>
                                <p className="text-gray-500 text-[14px]">Vui lòng thử lại với từ khóa khác hoặc gửi hiến kế mới cho lĩnh vực này.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="p-5 md:p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <p className="text-[13px] text-gray-500 font-medium">
                                Trang <span className="font-bold text-gray-900">{currentPage}</span> / {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px] font-medium"
                                >
                                    Trước
                                </button>
                                <div className="hidden sm:flex gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                        // Simple windowing logic
                                        let pageNum = i + 1;
                                        if (totalPages > 5 && currentPage > 3) {
                                            pageNum = currentPage - 3 + i + 1;
                                            if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-9 h-9 rounded-lg text-[14px] font-bold transition-colors ${currentPage === pageNum
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px] font-medium"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
    Search, ArrowRight, Users, Calendar, ChevronRight,
    Scale, Landmark, Heart, TrendingUp,
    Store, Globe, Car, HeartHandshake, Building2, GraduationCap, Activity, Leaf, 
    Briefcase, Rocket, ShieldAlert, ShoppingBag, Sprout, CloudSun, Smartphone, Map, 
    Baby, Grid, MoreHorizontal
} from 'lucide-react';

// ======================== MOCK DATA ========================

// Thumbnail pool from /public directory
export const THUMBS = [
    '/thumb1.png',
    '/thumb2.png',
    '/thumb3.png',
    '/poster1.png',
    '/banner-nghi-quyet.png',
    '/1870-210-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg',
];

export const thumb = (i) => THUMBS[i % THUMBS.length];

export const HOT_ITEMS = [
    { id: 'h2', title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)', agency: 'Bộ Tài nguyên và Môi trường', status: 'open', deadline: '30/04/2026', participants: 3821, thumb: thumb(0), description: 'Dự thảo quan trọng nhằm điều chỉnh khung pháp lý về quyền sử dụng đất, bồi thường, tái định cư và quy định về bảng giá đất định kỳ.' },
    { id: 'h1', title: 'Góp ý chính sách nhà ở xã hội cho công nhân', agency: 'Bộ Xây dựng', status: 'open', deadline: '15/04/2026', participants: 2140, thumb: thumb(1), description: 'Khuyến khích và hỗ trợ xây dựng nhà ở, cho thuê mua đối với nhóm người lao động thu nhập thấp ở các khu công nghiệp.' },
    { id: 'h3', title: 'Quy hoạch tổng thể quốc gia 2021–2030', agency: 'Bộ Kế hoạch và Đầu tư', status: 'upcoming', deadline: '01/05/2026', participants: 0, thumb: thumb(2), description: 'Chiến lược phát triển kinh tế xã hội và định hướng phân bổ không gian quốc gia tầm nhìn 2050.' },
    { id: 'h4', title: 'Chính sách phát triển kinh tế tuần hoàn', agency: 'Bộ Tài nguyên và Môi trường', status: 'closed', deadline: '15/03/2026', participants: 4230, thumb: thumb(3), description: 'Kiểm soát rác thải nhựa, yêu cầu doanh nghiệp tái chế tái sử dụng sản phẩm để phát triển bền vững.' },
];

export const NEW_HIGHLIGHTS = [
    { id: 'nb1', title: 'Dự thảo Hồ sơ Dự án Luật Thủ đô (sửa đổi)', agency: 'UBND TP Hà Nội', status: 'open', deadline: 'Đến khi Quốc hội thông qua', date: '30/03/2026', participants: 3821, thumb: thumb(0), description: 'Hoàn thiện khung pháp lý đặc thù cho Thủ đô Hà Nội nhằm phát huy tiềm năng, thế mạnh, tạo đột phá trong phát triển kinh tế - xã hội.' },
    { id: 'nb2', title: 'Dự thảo Nghị quyết của Chính phủ quy định chính sách hỗ trợ cho người sử dụng đất đảm bảo sinh kế, ổn định đời sống và tái định cư khi Nhà nước thu hồi đất áp dụng riêng thực hiện Dự án điện hạt nhân Ninh Thuận', agency: 'Bộ Tài nguyên và Môi trường', status: 'open', deadline: '18/04/2026', date: '29/03/2026', participants: 2140, thumb: thumb(1), description: 'Quy định các chính sách đặc thù hỗ trợ sinh kế, ổn định đời sống cho người dân bị ảnh hưởng bởi việc thu hồi đất dự án.' },
    { id: 'nb3', title: 'Thông tư liên tịch quy định phối hợp giữa các cơ quan trong thực hiện thống kê giám định tư pháp trong tố tụng hình sự', agency: 'Bộ Tư pháp', status: 'open', deadline: '19/04/2026', date: '30/03/2026', participants: 0, thumb: thumb(2), description: 'Nâng cao hiệu quả phối hợp giữa các cơ quan tố tụng trong công tác thống kê và giám định tư pháp.' },
    { id: 'nb4', title: 'Dự thảo Quyết định sửa đổi, bổ sung Quyết định số 08/2025/QĐ-TTg ngày 04/4/2025 của Thủ tướng Chính phủ về chế độ bồi dưỡng giám định tư pháp', agency: 'Bộ Tài chính', status: 'open', deadline: '18/04/2026', date: '29/03/2026', participants: 4230, thumb: thumb(3), description: 'Điều chỉnh chế độ bồi dưỡng nhằm thu hút chuyên gia và nâng cao trách nhiệm trong hoạt động giám định.' },
    { id: 'nb5', title: 'BẢN TỔNG HỢP Ý KIẾN, TIẾP THU, GIẢI TRÌNH Ý KIẾN GÓP Ý, PHẢN BIỆN XÃ HỘI ĐỐI VỚI DỰ THẢO QUYẾT ĐỊNH CỦA THỦ TƯỚNG CHÍNH PHỦ BAN HÀNH QUY CHẾ QUẢN LÝ, VẬN HÀNH, KHAI THÁC CỔNG PHÁP LUẬT QUỐC GIA', agency: 'Văn phòng Chính phủ', status: 'open', deadline: '16/04/2026', date: '27/03/2026', participants: 1540, thumb: thumb(4), description: 'Tổng hợp ý kiến đóng góp cho dự thảo quy chế vận hành nền tảng số thống nhất về pháp luật trên toàn quốc.' },
    { id: 'nb6', title: 'Dự thảo Nghị định về hợp đồng công việc trong đơn vị sự nghiệp công lập', agency: 'Bộ Nội vụ', status: 'open', deadline: '13/04/2026', date: '24/03/2026', participants: 850, thumb: thumb(5), description: 'Đổi mới cơ chế quản lý nhân sự, tạo tính linh hoạt trong tuyển dụng và sử dụng lao động tại các đơn vị sự nghiệp công lập.' },
];

export const LIFE_CATEGORIES = [
    { id: 1, icon: Store, name: 'Kinh tế và Đời sống' },
    { id: 2, icon: Globe, name: 'Lưu trú và Nhập tịch' },
    { id: 3, icon: Car, name: 'Giao thông vận tải' },
    { id: 4, icon: HeartHandshake, name: 'Hôn nhân và Gia đình' },
    { id: 5, icon: Building2, name: 'Bất động sản' },
    { id: 6, icon: GraduationCap, name: 'Giáo dục và Đào tạo' },
    { id: 7, icon: Activity, name: 'Sức khỏe và Y tế' },
    { id: 8, icon: Leaf, name: 'An sinh xã hội' },
    { id: 9, icon: Briefcase, name: 'Việc làm và Lao động' },
    { id: 10, icon: Rocket, name: 'Khởi nghiệp' },
    { id: 11, icon: Grid, name: 'An toàn lao động' },
    { id: 12, icon: ShoppingBag, name: 'Tiêu dùng và Dịch vụ' },
    { id: 13, icon: Sprout, name: 'Nông nghiệp và Nông thôn' },
    { id: 14, icon: CloudSun, name: 'Môi trường và Khí hậu' },
    { id: 15, icon: Smartphone, name: 'Công nghệ và Viễn thông' },
    { id: 16, icon: Map, name: 'Văn hóa và Du lịch' },
    { id: 17, icon: Baby, name: 'Trẻ em và Gia đình' },
    { id: 18, icon: MoreHorizontal, name: 'Lĩnh vực khác' },
];

export const DAILY_CONSULTATIONS = [
    { id: 1, title: 'Khảo sát sự hài lòng với dịch vụ y tế công lập', category: 'Sức khỏe và Y tế', status: 'open', deadline: '30/04/2026', participants: 2100, agency: 'Bộ Y tế', thumb: thumb(0) },
    { id: 2, title: 'Lấy ý kiến về điều chỉnh lương tối thiểu vùng 2026', category: 'Việc làm và Lao động', status: 'open', deadline: '15/04/2026', participants: 5340, agency: 'Bộ Lao động – TB&XH', thumb: thumb(1) },
    { id: 3, title: 'Ý kiến về chất lượng giáo dục mầm non công lập', category: 'Giáo dục và Đào tạo', status: 'upcoming', deadline: '01/05/2026', participants: 0, agency: 'Bộ Giáo dục và Đào tạo', thumb: thumb(2) },
    { id: 4, title: 'Hiến kế chính sách vay mua nhà lần đầu', category: 'Bất động sản', status: 'open', deadline: '25/04/2026', participants: 3240, agency: 'Ngân hàng Nhà nước', thumb: thumb(3) },
    { id: 5, title: 'Ý kiến về chính sách bảo hiểm xã hội tự nguyện', category: 'An sinh xã hội', status: 'open', deadline: '10/04/2026', participants: 2670, agency: 'Bộ Lao động – TB&XH', thumb: thumb(4) },
    { id: 6, title: 'Đánh giá chính sách hỗ trợ khởi nghiệp đổi mới sáng tạo', category: 'Khởi nghiệp', status: 'closed', deadline: '20/03/2026', participants: 1890, agency: 'Bộ Khoa học và Công nghệ', thumb: thumb(5) },
];

export const LEGAL_CONSULTATIONS = [
    { id: 1, title: 'Góp ý Bộ luật Dân sự sửa đổi – Phần hợp đồng điện tử', domain: 'Pháp luật dân sự', status: 'open', deadline: '30/04/2026', participants: 1240, agency: 'Bộ Tư pháp', thumb: thumb(0) },
    { id: 2, title: 'Dự thảo Luật Doanh nghiệp sửa đổi – Quản trị công ty', domain: 'Pháp luật kinh doanh', status: 'open', deadline: '20/04/2026', participants: 2870, agency: 'Bộ Kế hoạch và Đầu tư', thumb: thumb(1) },
    { id: 3, title: 'Nghị định xử phạt vi phạm hành chính về môi trường', domain: 'Pháp luật môi trường', status: 'upcoming', deadline: '05/05/2026', participants: 0, agency: 'Bộ Tài nguyên và Môi trường', thumb: thumb(2) },
    { id: 4, title: 'Sửa đổi Bộ luật Lao động – Hợp đồng lao động linh hoạt', domain: 'Pháp luật lao động', status: 'open', deadline: '01/05/2026', participants: 4120, agency: 'Bộ Lao động – TB&XH', thumb: thumb(3) },
    { id: 5, title: 'Góp ý Luật Tố tụng hành chính sửa đổi', domain: 'Pháp luật hành chính', status: 'closed', deadline: '01/03/2026', participants: 1890, agency: 'Bộ Tư pháp', thumb: thumb(4) },
    { id: 6, title: 'Dự thảo Luật Hình sự sửa đổi – Tội phạm mạng', domain: 'Pháp luật hình sự', status: 'open', deadline: '10/05/2026', participants: 930, agency: 'Bộ Công an', thumb: thumb(5) },
];

// ======================== HELPERS ========================

export const StatusBadge = ({ status, small = false }) => {
    const base = `inline-flex items-center gap-1.5 font-semibold ${small ? 'text-[11px]' : 'text-[12px]'}`;
    if (status === 'open') return (
        <span className={`${base} text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
            Đang mở
        </span>
    );
    if (status === 'upcoming') return (
        <span className={`${base} text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Sắp mở
        </span>
    );
    return (
        <span className={`${base} text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
            Đã kết thúc
        </span>
    );
};

// ======================== CARD COMPONENT ========================

export const ConsultCard = ({ item, to, tag, accentColor = '#1e3a8a' }) => (
    <Link
        to={to}
        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 flex flex-row h-[160px]"
    >
        {/* Left: Thumbnail */}
        <div className="relative w-[150px] md:w-[180px] shrink-0 overflow-hidden">
            <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.target.src = '/images/dong_son_cover.png'; }}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            {/* Tag overlay */}
            {tag && (
                <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full leading-tight">
                        {tag}
                    </span>
                </div>
            )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0 px-4 py-3.5 flex flex-col">
            {/* Top: status + agency */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
                <StatusBadge status={item.status} small />
                <span className="text-[11px] text-gray-400 font-medium truncate">{item.agency}</span>
            </div>

            {/* Title */}
            <h3
                className="text-[14px] md:text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors"
                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
                {item.title}
            </h3>
            
            {/* Description */}
            {item.description ? (
                <p 
                    className="text-[12.5px] text-gray-500 mt-1.5 leading-snug flex-1"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                    {item.description}
                </p>
            ) : (
                <div className="flex-1" />
            )}

            {/* Footer meta */}
            <div className="flex items-center gap-3 mt-3">
                {item.deadline && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 shrink-0">
                        <Calendar size={12} /> {item.deadline}
                    </span>
                )}
                {item.participants > 0 && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 shrink-0">
                        <Users size={12} /> {item.participants.toLocaleString('vi-VN')}
                    </span>
                )}
                {item.budget && (
                    <span className="text-[11px] font-semibold text-amber-600">💰 {item.budget}</span>
                )}
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
        </div>
    </Link>
);

// ======================== SECTION WRAPPER ========================

export const MOCK_DETAILS = {
    'h2': {
        id: 'h2',
        title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)',
        summary: 'Bộ Tài nguyên và Môi trường lấy ý kiến nhân dân, tổ chức về các quy định trong dự thảo Luật Đất đai sửa đổi nhằm hoàn thiện chính sách quản lý, sử dụng đất đai phù hợp với thực tiễn.',
        agency: 'Bộ Tài nguyên và Môi trường',
        agencyShort: 'BTNMT',
        status: 'open', // open | upcoming | closed
        startDate: '01/03/2026',
        endDate: '30/04/2026',
        lastUpdated: '01/03/2026',
        views: 3821,
        participants: 3821,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật dân sự',
        thumb: '/images/thumb1.png',
        sections: [
            {
                id: 'gioi-thieu',
                label: 'A. Giới thiệu',
                content: [
                    'Bộ Tài nguyên và Môi trường trân trọng mời các cơ quan, tổ chức, cá nhân tham gia đóng góp ý kiến vào Dự thảo Luật Đất đai (sửa đổi).',
                    'Luật Đất đai là đạo luật quan trọng, có tác động sâu rộng đến mọi mặt của đời sống kinh tế - xã hội, quốc phòng, an ninh và môi trường; là cơ sở pháp lý quan trọng để Nhà nước thực hiện quyền đại diện chủ sở hữu toàn dân về đất đai.',
                ]
            },
            {
                id: 'boi-canh',
                label: 'B. Bối cảnh',
                content: [
                    'Luật Đất đai năm 2013 sau hơn 10 năm thi hành đã bộc lộ nhiều hạn chế, bất cập cần được sửa đổi, bổ sung để phù hợp với yêu cầu phát triển mới.',
                    'Nghị quyết số 18-NQ/TW ngày 16/6/2022 của Hội nghị lần thứ năm Ban Chấp hành Trung ương Đảng khóa XIII "về tiếp tục đổi mới, hoàn thiện thể chế, chính sách, nâng cao hiệu lực, hiệu quả quản lý và sử dụng đất, tạo động lực đưa nước ta trở thành nước phát triển có thu nhập cao" đặt ra định hướng quan trọng cho việc sửa đổi Luật Đất đai.',
                    'Dự thảo Luật Đất đai (sửa đổi) được xây dựng trên cơ sở tổng kết, đánh giá kết quả thi hành Luật Đất đai năm 2013 và quán triệt đầy đủ, toàn diện Nghị quyết số 18-NQ/TW.',
                ]
            },
            {
                id: 'cac-kien-nghi',
                label: 'C. Các kiến nghị chính',
                content: [
                    'Dự thảo tập trung vào các nhóm vấn đề chính sau:',
                ],
                bullets: [
                    'Hoàn thiện các quy định về quyền và nghĩa vụ của người sử dụng đất',
                    'Đổi mới, hoàn thiện cơ chế định giá đất, đảm bảo nguyên tắc thị trường',
                    'Hoàn thiện quy định về thu hồi đất, bồi thường, hỗ trợ, tái định cư',
                    'Đẩy mạnh phân cấp, phân quyền trong quản lý đất đai',
                    'Hoàn thiện quy định về tư vấn, phản biện, giám sát xã hội trong quản lý đất đai',
                ]
            },
            {
                id: 'phan-hoi',
                label: 'D. Những vấn đề cần phản hồi',
                content: [
                    'Bộ Tài nguyên và Môi trường mong muốn nhận được ý kiến đóng góp của Quý vị về các nội dung sau:',
                ],
                bullets: [
                    'Tính hợp lý và khả thi của các quy định về quyền tiếp cận đất đai',
                    'Cơ chế giải quyết tranh chấp đất đai mới',
                    'Quy định về đất ở, đất nông nghiệp trong và ngoài khu vực đô thị',
                    'Chính sách tài chính đất đai và định giá đất',
                    'Các nội dung khác trong dự thảo mà Quý vị quan tâm',
                ]
            },
        ],
        attachments: [
            { id: 1, name: 'Du_thao_Luat_Dat_dai_sua_doi_2026.pdf', size: '4.2 MB', type: 'PDF' },
            { id: 2, name: 'To_trinh_so_XX_TTg_ve_du_an.docx', size: '1.1 MB', type: 'DOCX' },
            { id: 3, name: 'Bao_cao_danh_gia_tac_dong.pdf', size: '2.8 MB', type: 'PDF' },
            { id: 4, name: 'Phieu_lay_y_kien_cong_dong.xlsx', size: '380 KB', type: 'XLSX' },
        ],
        relatedConsultations: [
            { id: 2, title: 'Góp ý chính sách nhà ở xã hội cho công nhân', status: 'open', agency: 'Bộ Xây dựng', deadline: '15/04/2026' },
            { id: 3, title: 'Quy hoạch tổng thể quốc gia 2021–2030', status: 'upcoming', agency: 'Bộ Kế hoạch và Đầu tư', deadline: '01/05/2026' },
            { id: 4, title: 'Lấy ý kiến về sửa đổi Luật Nhà ở', status: 'open', agency: 'Bộ Xây dựng', deadline: '20/04/2026' },
        ],
        comments: [
            { id: 1, user: 'Nguyễn Văn A', org: 'Công ty BĐS XYZ', date: '15/03/2026 09:30', content: 'Đề nghị làm rõ quy định về thời hạn sử dụng đất đối với đất ở đô thị, tránh gây ra bất ổn cho người dân đã mua nhà gắn liền với quyền sử dụng đất.' },
            { id: 2, user: 'Trần Thị Bình', org: 'Hiệp hội Bất động sản', date: '14/03/2026 14:15', content: 'Cơ chế định giá đất theo giá thị trường là đúng hướng nhưng cần có hướng dẫn chi tiết hơn về phương pháp xác định giá thị trường và đơn vị tư vấn định giá.' },
            { id: 3, user: 'Lê Minh Tuấn', date: '13/03/2026 11:00', content: 'Cần bổ sung quy định bảo vệ quyền lợi của người nông dân khi thu hồi đất nông nghiệp phục vụ phát triển kinh tế - xã hội.' },
        ],
        relatedEvents: [
            { id: 'e1', title: 'Diễn đàn trực tuyến: Tác động của Luật Đất đai lên thị trường BĐS', type: 'forum', date: '10/04/2026', color: 'text-blue-600', bg: 'bg-blue-50', to: '/dien-dan/chu-de/1', thumbnail: '/thumbnails/forum_dat_dai.png' },
            { id: 'e2', title: 'Tọa đàm: Gỡ vướng pháp lý trong bồi thường tái định cư', type: 'event', date: '15/04/2026', color: 'text-purple-600', bg: 'bg-purple-50', to: '/dien-dan/su-kien/toa-dam-1', thumbnail: '/thumbnails/toadan_phapluat.png' },
            { id: 'e3', title: 'Livestream: Giải đáp thắc mắc về bảng giá đất mới', type: 'stream', date: '20/04/2026', color: 'text-red-600', bg: 'bg-red-50', to: '/dien-dan/su-kien/livestream-1', thumbnail: '/thumbnails/livestream_giabangdat.png' },
        ]
    },
    'h1': {
        id: 'h1',
        title: 'Góp ý chính sách nhà ở xã hội cho công nhân',
        summary: 'Bộ Xây dựng tổ chức lấy ý kiến về các giải pháp thúc đẩy phát triển nhà ở xã hội, đảm bảo an cư lạc nghiệp cho người lao động.',
        agency: 'Bộ Xây dựng',
        agencyShort: 'BXD',
        status: 'open',
        startDate: '15/03/2026',
        endDate: '15/04/2026',
        lastUpdated: '15/03/2026',
        participants: 2140,
        views: 6700,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật xây dựng',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Chính sách tập trung vào việc vay vốn ưu đãi và quỹ đất cho nhà ở xã hội tại các khu kinh tế trọng điểm.'] }
        ],
        attachments: [{ id: 1, name: 'Chinh_sach_nha_o_xa_hoi.pdf', size: '1.2 MB', type: 'PDF' }],
        relatedEvents: [],
        relatedConsultations: []
    },
    'nb1': {
        id: 'nb1',
        title: 'Dự thảo Hồ sơ Dự án Luật Thủ đô (sửa đổi)',
        summary: 'UBND thành phố Hà Nội tổ chức lấy ý kiến về dự án Luật Thủ đô sửa đổi nhằm tạo cơ chế đặc thù vượt trội để phát triển Thủ đô.',
        agency: 'UBND TP Hà Nội',
        agencyShort: 'HANOI',
        status: 'open',
        startDate: '30/03/2026',
        endDate: 'Đến khi Quốc hội thông qua',
        lastUpdated: '30/03/2026',
        participants: 1250,
        views: 8500,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật hành chính',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Luật Thủ đô (sửa đổi) tập trung vào 9 nhóm chính sách nhằm đẩy mạnh phân cấp, phân quyền cho TP Hà Nội.'] },
            { id: 'boi-canh', label: 'B. Bối cảnh', content: ['Luật Thủ đô 2012 qua 10 năm thi hành cần được thay thế bằng những cơ chế linh hoạt, mạnh mẽ hơn.'] },
            { id: 'cac-kien-nghi', label: 'C. Các kiến nghị chính', content: ['Dự thảo tập trung vào các nhóm vấn đề sau:'], bullets: [
                'Tăng cường phân quyền cho Hà Nội trong quản lý biên chế, tuyển dụng công chức.',
                'Cơ chế đặc thù trong quy hoạch, quản lý không gian kiến trúc và bảo tồn di sản.',
                'Chính sách thu hút đầu tư chiến lược trong các lĩnh vực công nghệ cao và bảo vệ môi trường.',
                'Phát huy thế mạnh của Hà Nội là trung tâm giáo dục, đào tạo và y tế chất lượng cao.'
            ]},
            { id: 'phan-hoi', label: 'D. Những vấn đề cần phản hồi', content: ['Mong nhận được ý kiến đóng góp về:'], bullets: [
                'Tính khả thi của việc cho phép Hà Nội tự quyết định một số mức phí, lệ phí đặc thù.',
                'Quy định về việc bảo tồn các công trình di tích quốc gia đặc biệt trên địa bàn.',
                'Các tiêu chí lựa chọn nhà đầu tư chiến lược cho dự án hạ tầng giao thông lớn.'
            ]}
        ],
        attachments: [
            { id: 1, name: 'Du_thao_Luat_Thu_do_2026.pdf', size: '3.8 MB', type: 'PDF' },
            { id: 2, name: 'To_trinh_so_123_UBND_Hanoi.docx', size: '1.5 MB', type: 'DOCX' },
            { id: 3, name: 'Ban_danh_gia_tac_dong_social.pdf', size: '2.1 MB', type: 'PDF' }
        ],
        relatedEvents: [
            { id: 'e10', title: 'Tọa đàm: Luật Thủ đô - Động lực phát triển mới', type: 'event', date: '05/04/2026', color: 'text-purple-600', bg: 'bg-purple-50', to: '#' }
        ],
        relatedConsultations: [
            { id: 'h2', title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)', status: 'open', agency: 'BTNMT', deadline: '30/04/2026' }
        ],
        comments: [
            { id: 1, user: 'Phạm Minh H', org: 'Viện Quy hoạch HN', date: '31/03/2026', content: 'Cần làm rõ hơn về mối quan hệ giữa Luật Thủ đô và các luật chuyên ngành khác để tránh chồng chéo khi thực thi.' }
        ]
    },
    'nb2': {
        id: 'nb2',
        title: 'Dự thảo Nghị quyết của Chính phủ quy định chính sách hỗ trợ người dân (Dự án điện hạt nhân Ninh Thuận)',
        summary: 'Chính sách hỗ trợ đặc thù cho người dân bị thu hồi đất tại dự án điện hạt nhân Ninh Thuận nhằm ổn định đời sống xã hội.',
        agency: 'Bộ Tài nguyên và Môi trường',
        agencyShort: 'BTNMT',
        status: 'open',
        startDate: '29/03/2026',
        endDate: '18/04/2026',
        lastUpdated: '29/03/2026',
        participants: 2140,
        views: 5200,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật dân sự',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Hỗ trợ tái định cư và chuyển đổi nghề nghiệp cho các hộ gia đình bị ảnh hưởng bởi dự án dừng triển khai.'] },
            { id: 'boi-canh', label: 'B. Bối cảnh', content: ['Dự án điện hạt nhân Ninh Thuận tạm dừng khiến hàng nghìn hộ dân gặp khó khăn về sinh kế do đất đai bị treo quyền sử dụng.'] },
            { id: 'cac-kien-nghi', label: 'C. Các kiến nghị chính', content: ['Chính sách bao gồm các nhóm nội dung:'], bullets: [
                'Bồi thường bổ sung cho người dân theo khung giá đất mới nhất.',
                'Hỗ trợ đào tạo nghề và giới thiệu việc làm tại các khu công nghiệp tại địa phương.',
                'Đầu tư hạ tầng thiết yếu tại các khu tái định cư tập trung.',
                'Ưu tiên vay vốn lãi suất thấp cho các hộ dân chuyển đổi sang mô hình kinh tế nông nghiệp bền vững.'
            ]},
            { id: 'phan-hoi', label: 'D. Những vấn đề cần phản hồi', content: ['Đề nghị ý kiến về:'], bullets: [
                'Mức bồi dưỡng hỗ trợ chuyển đổi nghề có phù hợp thực tế chưa?',
                'Thời gian thực hiện gói hỗ trợ nên kéo dài trong bao lâu?',
                'Các loại giấy tờ cần thiết để nhận hỗ trợ nhanh chóng nhất.'
            ]}
        ],
        attachments: [
            { id: 1, name: 'Du_thao_Nghi_quyet_Ninh_Thuan.docx', size: '1.2 MB', type: 'DOCX' },
            { id: 2, name: 'Hanh_trinh_on_dinh_doi_song_NT.pdf', size: '0.8 MB', type: 'PDF' }
        ],
        relatedEvents: [],
        relatedConsultations: []
    },
    'nb3': {
        id: 'nb3',
        title: 'Thống tư phối hợp thống kê giám định tư pháp hình sự',
        summary: 'Thông tư quy định quy trình phối hợp, chia sẻ dữ liệu thống kê giám định tư pháp giữa các cơ quan tố tụng.',
        agency: 'Bộ Tư pháp',
        agencyShort: 'BTP',
        status: 'open',
        startDate: '30/03/2026',
        endDate: '19/04/2026',
        lastUpdated: '30/03/2026',
        participants: 450,
        views: 2100,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật hình sự',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Thống nhất biểu mẫu và công cụ báo cáo điện tử cho hệ thống giám định tư pháp quốc gia.'] },
            { id: 'boi-canh', label: 'B. Bối cảnh', content: ['Sự thiếu hụt thông tin kịp thời giữa các cơ quan giám định và tòa án gây chậm trễ trong công tác tố tụng.'] },
            { id: 'cac-kien-nghi', label: 'C. Các kiến nghị chính', content: ['Thông tư đề xuất cơ chế phối hợp:'], bullets: [
                'Sử dụng chung nền tảng báo cáo điện tử liên ngành.',
                'Phân cấp trách nhiệm cung cấp số liệu của từng đơn vị giám định.',
                'Quy định thời gian báo cáo bắt buộc hàng quý và năm.'
            ]},
            { id: 'phan-hoi', label: 'D. Những vấn đề cần phản hồi', content: ['Nội dung cần đóng góp:'], bullets: [
                'Tính tương thích của phần mềm báo cáo với hạ tầng công nghệ hiện tại.',
                'Quy trình xác minh tính xác thực của dữ liệu giám định.'
            ]}
        ],
        attachments: [{ id: 1, name: 'Thong_tu_lien_tich_thong_ke.pdf', size: '0.9 MB', type: 'PDF' }],
        relatedEvents: [],
        relatedConsultations: []
    },
    'nb4': {
        id: 'nb4',
        title: 'Quyết định 08/2025/QĐ-TTg về bồi dưỡng giám định tư pháp',
        summary: 'Điều chỉnh mức bồi dưỡng cho giám định viên tư pháp nhằm nâng mức thù lao phù hợp với điều kiện kinh tế hiện nay.',
        agency: 'Bộ Tài chính',
        agencyShort: 'BTC',
        status: 'open',
        startDate: '29/03/2026',
        endDate: '18/04/2026',
        lastUpdated: '29/03/2026',
        participants: 1200,
        views: 3400,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật tài chính',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Bổ sung danh mục các hoạt động giám định độc hại được hưởng trợ cấp bồi dưỡng đặc thù.'] },
            { id: 'boi-canh', label: 'B. Bối cảnh', content: ['Mức bồi dưỡng hiện tại từ năm 2013 không còn đáp ứng được yêu cầu về trang trải chi phí và bù đắp hao phí sức lao động.'] },
            { id: 'cac-kien-nghi', label: 'C. Các kiến nghị chính', content: ['Các điểm mới trong dự thảo:'], bullets: [
                'Tăng mức bồi dưỡng theo ngày công cho các trường hợp giám định phức tạp.',
                'Bổ sung chế độ bồi dưỡng theo hồ sơ vụ việc.',
                'Quy định rõ nguồn kinh phí chi trả từ ngân sách nhà nước.'
            ]},
            { id: 'phan-hoi', label: 'D. Những vấn đề cần phản hồi', content: ['Ý kiến đóng góp về:'], bullets: [
                'Mức bồi dưỡng đề xuất đã tương xứng với tính chất nguy hiểm của công việc chưa?',
                'Quy trình thanh quyết toán kinh phí bồi dưỡng nên được giản lược như thế nào?'
            ]}
        ],
        attachments: [{ id: 1, name: 'Quyet_dinh_08_BD_Giam_dinh.pdf', size: '1.5 MB', type: 'PDF' }],
        relatedEvents: [],
        relatedConsultations: []
    },
    'nb5': {
        id: 'nb5',
        title: 'Quy chế quản lý vận hành Cổng Pháp luật quốc gia',
        summary: 'Đề xuất quy trình vận hành, khai thác nội dung trên Cổng Pháp luật quốc gia đảm bảo dữ liệu cập nhật, an toàn.',
        agency: 'Văn phòng Chính phủ',
        agencyShort: 'VPCP',
        status: 'open',
        startDate: '27/03/2026',
        endDate: '16/04/2026',
        lastUpdated: '27/03/2026',
        participants: 3200,
        views: 9800,
        category: 'Vấn đề nổi bật',
        domain: 'Chính phủ điện tử',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Phân rõ trách nhiệm các bộ, ngành trong việc cung cấp thông tin văn bản QPPL lên hệ thống.'] },
            { id: 'boi-canh', label: 'B. Bối cảnh', content: ['Xây dựng kho dữ liệu số thống nhất về pháp luật để phục vụ người dân và doanh nghiệp tra cứu nhanh chóng, chính xác.'] },
            { id: 'cac-kien-nghi', label: 'C. Các kiến nghị chính', content: ['Nội dung quy chế tập trung vào:'], bullets: [
                'Quy trình đăng tải và cập nhật văn bản QPPL mới ban hành.',
                'Tiêu chuẩn về tính bảo mật và toàn vẹn của dữ liệu pháp luật điện tử.',
                'Cơ chế khai thác dữ liệu mở cho bên thứ ba.'
            ]},
            { id: 'phan-hoi', label: 'D. Những vấn đề cần phản hồi', content: ['Nhận ý kiến về:'], bullets: [
                'Giao diện người dùng đã thân thiện với mọi đối tượng chưa?',
                'Tốc độ cập nhật văn bản nên tính theo giờ hay theo ngày?'
            ]}
        ],
        attachments: [{ id: 1, name: 'Quy_che_Cong_PLQG.pdf', size: '2.1 MB', type: 'PDF' }],
        relatedEvents: [],
        relatedConsultations: []
    },
    'nb6': {
        id: 'nb6',
        title: 'Nghị định về hợp đồng công việc trong ĐVSNCL',
        summary: 'Hướng dẫn về việc ký kết hợp đồng chuyên môn, nghiệp vụ thay thế cho biên chế tại một số vị trí nghiệp vụ.',
        agency: 'Bộ Nội vụ',
        agencyShort: 'BNV',
        status: 'open',
        startDate: '24/03/2026',
        endDate: '13/04/2026',
        lastUpdated: '24/03/2026',
        participants: 5600,
        views: 11200,
        category: 'Vấn đề nổi bật',
        domain: 'Pháp luật công chức',
        sections: [
            { id: 'gioi-thieu', label: 'A. Giới thiệu', content: ['Xác định rõ các danh mục công việc được phép ký hợp đồng dài hạn trong cơ quan nhà nước.'] },
            { id: 'boi-canh', label: 'B. Bối cảnh', content: ['Nhằm tinh giản biên chế và tăng cường tính linh hoạt trong sử dụng lao động tại các đơn vị sự nghiệp.'] },
            { id: 'cac-kien-nghi', label: 'C. Các kiến nghị chính', content: ['Các chính sách đột phá:'], bullets: [
                'Phân cấp quyền tuyển dụng hợp đồng cho người đứng đầu đơn vị nghiệp.',
                'Quy định mức lương hợp đồng thỏa thuận dựa trên hiệu suất công việc.',
                'Chế độ bảo hiểm và phúc lợi tương đương viên chức tại cùng vị trí.'
            ]},
            { id: 'phan-hoi', label: 'D. Những vấn đề cần phản hồi', content: ['Góp ý cho:'], bullets: [
                'Mô hình đánh giá hiệu suất để làm căn cứ gia hạn hợp đồng.',
                'Các vị trí đặc thù nào không nên áp dụng hình thức hợp đồng này?'
            ]}
        ],
        attachments: [{ id: 1, name: 'Nghi_dinh_hop_dong_cong_viec.pdf', size: '1.8 MB', type: 'PDF' }],
        relatedEvents: [],
        relatedConsultations: []
    }
};

export const Section = ({ id, icon: Icon, color, label, title, subtitle, children, viewAllTo }) => (
    <section id={id} className="py-5 border-b border-gray-100 animate-fade-up">
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: color + '15' }}>
                        {Icon && <Icon size={17} style={{ color }} />}
                    </div>
                    <div>
                        {label && <p className="text-[10px] font-bold uppercase mb-0.5" style={{ color }}>{label}</p>}
                        <h2 className="text-[18px] md:text-[22px] font-bold text-gray-900 leading-tight">{title}</h2>
                        {subtitle && <p className="text-gray-500 text-[12px] mt-0.5 max-w-2xl">{subtitle}</p>}
                    </div>
                </div>
                {viewAllTo && (
                    <Link to={viewAllTo} className="shrink-0 flex items-center gap-1.5 text-[12px] font-semibold hover:underline mt-1 transition-colors" style={{ color }}>
                        Xem tất cả <ArrowRight size={13} />
                    </Link>
                )}
            </div>
            {children}
        </div>
    </section>
);


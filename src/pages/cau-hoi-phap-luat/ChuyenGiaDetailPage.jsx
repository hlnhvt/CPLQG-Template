import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Star, Clock, Calendar as CalendarIcon, MapPin, User, ChevronLeft, ChevronRight, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, FileText, BadgeCheck, Building2, Hash, ExternalLink, Award, Scale } from 'lucide-react';

const MOCK_EXPERTS = {
    '1': {
        id: 1,
        name: 'Ls. Hoàng Ngọc Cường',
        role: 'Luật sư tư vấn - Đoàn Luật sư TP. Hà Nội',
        company: 'Công ty Luật TNHH V&H',
        avatar: '/images/experts/expert_avatar_1.png',
        domains: ['Đất đai', 'Dân sự', 'Hành chính'],
        rating: 4.9,
        reviews: 120,
        sessions: 350,
        bio: 'Với hơn 15 năm kinh nghiệm hành nghề luật sư, thế mạnh của tôi là tư vấn pháp luật, tham gia tranh tụng các vụ án Dân sự, Đất đai, Hành chính. Tôi đã tư vấn thành công hàng trăm vụ việc thu hồi đất và đền bù giải phóng mặt bằng, giúp người dân và doanh nghiệp bảo vệ quyền lợi hợp pháp lớn nhất.',
        education: ['Cử nhân Đại học Luật Hà Nội (2008)', 'Thạc sĩ Luật Kinh tế - ĐHQG Hà Nội (2012)'],
        methods: ['Gặp trực tiếp', 'Video call'],
        // Credentials
        licenseNumber: '3241/LS',
        licenseIssueDate: '10/07/2010',
        barAssociation: 'Đoàn Luật sư Thành phố Hà Nội',
        practiceOrg: 'Công ty Luật TNHH V&H',
        practiceOrgAddress: 'Tầng 7, Số 12 Trần Thái Tông, Cầu Giấy, Hà Nội',
        certNumber: 'CCHN-LS-000823',
        certIssueDate: '15/09/2010',
        verifiedBy: 'Bộ Tư pháp Việt Nam',
        verifiedDate: '01/03/2026',
        nationalId: '001082013124',
        disciplinaryRecord: 'Không có kỷ luật',
    },
    '2': {
        id: 2,
        name: 'Ts. Trần Thị Thu Thủy',
        role: 'Tiến sĩ Luật - Giảng viên Đại học Luật HN',
        company: 'Khoa Luật Quốc tế - Đại học Luật Hà Nội',
        avatar: '/images/experts/expert_avatar_2.png',
        domains: ['Doanh nghiệp', 'Sở hữu trí tuệ', 'Thương mại'],
        rating: 4.8,
        reviews: 85,
        sessions: 210,
        bio: 'Tiến sĩ Thu Thủy là chuyên gia hàng đầu trong lĩnh vực Luật Doanh nghiệp và Sở hữu trí tuệ với kinh nghiệm giảng dạy và tư vấn hơn 12 năm. Bà thường xuyên tham gia đóng góp ý kiến xây dựng cho các dự thảo văn bản quy phạm pháp luật liên quan đến quyền sở hữu công nghiệp và cạnh tranh.',
        education: ['Tiến sĩ Luật học - Đại học Nagoya, Nhật Bản (2015)', 'Thạc sĩ Luật - Đại học Luật Hà Nội (2010)'],
        methods: ['Video call', 'Điện thoại'],
        licenseNumber: 'TS-7729/HL',
        licenseIssueDate: '20/12/2015',
        barAssociation: 'Hội Luật gia Thành phố Hà Nội',
        practiceOrg: 'Trường Đại học Luật Hà Nội',
        practiceOrgAddress: 'Số 87 đường Nguyễn Chí Thanh, Thành phố Hà Nội',
        certNumber: 'CGPL-001242',
        certIssueDate: '05/01/2016',
        verifiedBy: 'Bộ Giáo dục & Đào tạo / Bộ Tư pháp',
        verifiedDate: '10/03/2026',
        disciplinaryRecord: 'Không có kỷ luật',
    },
    '3': {
        id: 3,
        name: 'Ls. Nguyễn Hải Đăng',
        role: 'Luật sư cao cấp',
        company: 'Văn phòng Luật sư Đăng & Đồng sự',
        avatar: '/images/experts/expert_avatar_3.png',
        domains: ['Hình sự', 'Dân sự', 'Tranh tụng'],
        rating: 4.7,
        reviews: 156,
        sessions: 420,
        bio: 'Luật sư Nguyễn Hải Đăng nổi tiếng với khả năng tranh tụng sắc bén trong các vụ án hình sự đặc biệt nghiêm trọng. Với bản lĩnh và sự tận tâm, ông luôn nỗ lực tìm kiếm sự công bằng và bảo vệ tối đa quyền lợi của thân chủ tại tòa án.',
        education: ['Cử nhân Luật - Đại học Luật TP.HCM (2005)', 'Chứng chỉ đào tạo Luật sư cấp cao (2015)'],
        methods: ['Gặp trực tiếp'],
        licenseNumber: '1092/LS',
        licenseIssueDate: '12/05/2007',
        barAssociation: 'Đoàn Luật sư Thành phố Hồ Chí Minh',
        practiceOrg: 'Văn phòng Luật sư Đăng & Đồng sự',
        practiceOrgAddress: 'Số 154 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh',
        certNumber: 'CCHN-LS-110293',
        certIssueDate: '25/06/2007',
        verifiedBy: 'Liên đoàn Luật sư Việt Nam',
        verifiedDate: '15/03/2026',
        disciplinaryRecord: 'Không có kỷ luật',
    },
    '4': {
        id: 4,
        name: 'Ths. Lê Cẩm Phương',
        role: 'Chuyên viên pháp lý cấp cao',
        company: 'Trung tâm Tư vấn Pháp luật Lao động',
        avatar: '/images/experts/expert_avatar_4.png',
        domains: ['Lao động', 'Bảo hiểm', 'Tiền lương'],
        rating: 4.9,
        reviews: 65,
        sessions: 180,
        bio: 'Thạc sĩ Cẩm Phương có kiến thức chuyên sâu về xử lý tranh chấp lao động, xây dựng nội quy lao động và hệ thống thang bảng lương cho doanh nghiệp. Bà đã hỗ trợ tư pháp miễn phí cho hàng nghìn công nhân và người lao động nghèo.',
        education: ['Thạc sĩ Luật - Đại học Oxford (2018)', 'Cử nhân Luật - Đại học Quốc gia Hà Nội (2013)'],
        methods: ['Video call', 'Điện thoại'],
        licenseNumber: 'TP-4402/LD',
        licenseIssueDate: '14/09/2018',
        barAssociation: 'Trung tâm Tư vấn Pháp luật Việt Nam',
        practiceOrg: 'Trung tâm Tư vấn Pháp luật Lao động',
        practiceOrgAddress: 'Tầng 4, Tòa nhà công đoàn, Phường Láng Thượng, Hà Nội',
        certNumber: 'CG-LD-000551',
        certIssueDate: '10/10/2018',
        verifiedBy: 'Tổng Liên đoàn Lao động Việt Nam',
        verifiedDate: '22/03/2026',
        disciplinaryRecord: 'Không có kỷ luật',
    },
    '5': {
        id: 5,
        name: 'Ls. Phạm Việt Hoàng',
        role: 'Luật sư điều hành - V&H Law',
        company: 'Công ty Luật TNHH V&H Law Firm',
        avatar: '/images/experts/expert_avatar_5.png',
        domains: ['Đầu tư', 'Thương mại quốc tế', 'M&A'],
        rating: 5.0,
        reviews: 42,
        sessions: 110,
        bio: 'Luật sư Phạm Việt Hoàng chuyên về lĩnh vực Mua bán & Sáp nhập (M&A) và đầu tư nước ngoài vào Việt Nam. Ông từng là cố vấn pháp lý cho nhiều tập đoàn đa quốc gia khi gia nhập thị trường Đông Nam Á.',
        education: ['Thạc sĩ Luật (LLM) - Đại học Harvard (2014)', 'Cử nhân Luật - ĐH Luật Hà Nội (2009)'],
        methods: ['Gặp trực tiếp', 'Video call'],
        licenseNumber: '5561/LS',
        licenseIssueDate: '11/02/2012',
        barAssociation: 'Đoàn Luật sư Thành phố Hà Nội',
        practiceOrg: 'Công ty Luật TNHH V&H Law Firm',
        practiceOrgAddress: 'Tòa nhà Landmark, 72 Nam Từ Liêm, Hà Nội',
        certNumber: 'CCHN-LS-998811',
        certIssueDate: '15/03/2012',
        verifiedBy: 'Bộ Tư pháp Việt Nam',
        verifiedDate: '25/03/2026',
        disciplinaryRecord: 'Không có kỷ luật',
    }
};

// Generates availability for the week
const MOCK_SCHEDULE = {
    '2026-03-24': [
        { time: '09:00 - 09:30', available: true },
        { time: '10:00 - 10:30', available: false },
        { time: '14:00 - 14:30', available: true },
    ],
    '2026-03-25': [
        { time: '09:00 - 09:30', available: true },
        { time: '15:30 - 16:00', available: true },
    ],
    '2026-03-26': [],
    '2026-03-27': [
        { time: '10:30 - 11:00', available: true },
    ],
    '2026-03-28': [
        { time: '08:30 - 09:30', available: true },
        { time: '09:30 - 10:30', available: true },
    ],
    '2026-03-29': [],
    '2026-03-30': [
        { time: '14:00 - 14:30', available: true },
    ]
};

const MOCK_REVIEWS = [
    { name: 'Trần Phương Anh', date: '12/03/2026', content: '"Luật sư Cường tư vấn rất nhiệt tình, cặn kẽ và đi thẳng vào vấn đề cốt lõi. Tôi đã hiểu rõ các bước cần làm để bảo vệ quyền lợi đền bù đất đai cho gia đình."', rating: 5 },
    { name: 'Nguyễn Đình Hùng', date: '10/03/2026', content: '"Tôi có thắc mắc về phân chia di sản thừa kế, chuyên gia giải thích rất dễ hiểu. Phong cách làm việc chuyên nghiệp."', rating: 5 },
    { name: 'Lê Hoài Thu', date: '05/03/2026', content: '"Luật sư tư vấn đúng trọng tâm, không lan man. Dịch vụ tuyệt vời."', rating: 5 },
    { name: 'Hoàng Quốc Việt', date: '01/03/2026', content: '"Giúp tôi giải quyết được vướng mắc với hợp đồng lao động nhanh chóng. Rất cảm ơn chuyên gia."', rating: 4 },
];

const ChuyenGiaDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const expert = MOCK_EXPERTS[id];

    // Simple calendar state
    const [selectedDate, setSelectedDate] = useState('2026-03-24');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const dates = [
        { date: '2026-03-24', dayName: 'Thứ 3', dayNum: '24' },
        { date: '2026-03-25', dayName: 'Thứ 4', dayNum: '25' },
        { date: '2026-03-26', dayName: 'Thứ 5', dayNum: '26' },
        { date: '2026-03-27', dayName: 'Thứ 6', dayNum: '27' },
        { date: '2026-03-28', dayName: 'Thứ 7', dayNum: '28' },
        { date: '2026-03-29', dayName: 'CN', dayNum: '29' },
        { date: '2026-03-30', dayName: 'Thứ 2', dayNum: '30' },
    ];

    const currentSlots = MOCK_SCHEDULE[selectedDate] || [];
    
    // Slider ref
    const scrollRef = React.useRef(null);

    const handleDateSelect = (dateStr) => {
        setSelectedDate(dateStr);
        setSelectedTimeSlot(null);
    };

    const handleBookClick = () => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: `/cau-hoi-phap-luat/chuyen-gia/${id}/dat-lich` } });
            return;
        }

        if (selectedDate && selectedTimeSlot) {
            navigate(`/cau-hoi-phap-luat/chuyen-gia/${id}/dat-lich`, {
                state: {
                    expert: expert,
                    date: selectedDate,
                    time: selectedTimeSlot
                }
            });
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth > 500 ? 300 : 200;
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }
    };

    const visibleReviews = showAllReviews ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 1);

    if (!expert) {
        return (
            <div className="bg-[#f4f7fb] min-h-screen flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Không tìm thấy chuyên gia</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">Thông tin chuyên gia mà bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.</p>
                    <Link to="/cau-hoi-phap-luat/chuyen-gia" className="inline-flex items-center gap-2 bg-[#0f4c81] text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-800 transition shadow-lg">
                        Quay lại danh sách <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
                {/* Main Profile Area */}
                <div className="lg:w-2/3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row gap-8">
                        {/* Avatar */}
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50 border-4 border-blue-100 rounded-full flex justify-center items-center shadow-md mb-4 overflow-hidden">
                                {expert.avatar ? (
                                    <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={80} className="text-blue-200" />
                                )}
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-bold text-sm">
                                <Star size={16} className="fill-amber-500" /> {expert.rating} / 5.0
                            </div>
                            <p className="text-sm text-gray-500 mt-2 font-medium">{expert.reviews} lượt đánh giá</p>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-[#0f4c81] mb-2">{expert.name}</h1>
                            <p className="text-lg font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Briefcase size={20} className="text-gray-400" /> {expert.role}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2 mb-6">
                                <MapPin size={18} className="text-gray-400" /> {expert.company}
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                {expert.bio}
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                                <div>
                                    <span className="text-gray-400 font-bold block mb-1 uppercase text-xs">Phạm vi chuyên môn</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {expert.domains.map((d, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded font-bold">{d}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold block mb-1 uppercase text-xs">Đã tư vấn</span>
                                    <span className="text-[#0f4c81] font-bold text-xl">{expert.sessions} <span className="text-gray-500 text-sm font-medium">buổi</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ══ Credentials & Verification ══ */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header bg gradient for authority */}
                        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-50 to-white border-b border-gray-100 flex-wrap">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <ShieldCheck size={20} className="text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Thông tin hành nghề & Xác thực</h3>
                                <p className="text-[12px] text-emerald-600 font-semibold">Đã được kiểm tra và xác thực bởi {expert.verifiedBy}</p>
                            </div>
                            <span className="flex items-center gap-1.5 bg-emerald-600 text-white text-[12px] font-bold px-3 py-1.5 rounded-full shrink-0 shadow-sm">
                                <BadgeCheck size={14} /> Đã xác minh
                            </span>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* License Info Grid */}
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 block">Đăng ký hành nghề</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5"><Hash size={15} className="text-blue-600" /></div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Thẻ luật sư số</p>
                                            <p className="font-black text-[16px] text-gray-900 font-mono tracking-wider">{expert.licenseNumber}</p>
                                            <p className="text-[11px] text-gray-500 mt-1">Cấp ngày: {expert.licenseIssueDate}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5"><FileText size={15} className="text-indigo-600" /></div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Chứng chỉ hành nghề số</p>
                                            <p className="font-black text-[16px] text-gray-900 font-mono tracking-wider">{expert.certNumber}</p>
                                            <p className="text-[11px] text-gray-500 mt-1">Cấp ngày: {expert.certIssueDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Organization Details */}
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 block">Tổ chức & Đoàn hội</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5"><Scale size={15} className="text-amber-600" /></div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Đoàn luật sư</p>
                                            <p className="font-bold text-[14px] text-gray-800">{expert.barAssociation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5"><Building2 size={15} className="text-purple-600" /></div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Tổ chức hành nghề</p>
                                            <p className="font-bold text-[14px] text-gray-800">{expert.practiceOrg}</p>
                                            <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{expert.practiceOrgAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integrity & Verification Footer */}
                            <div className="border-t border-gray-100 pt-5">
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 block">Xác thực uy tín</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 flex items-center gap-3">
                                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase">Cơ quan xác thực</p>
                                            <p className="text-[12px] font-bold text-emerald-900 truncate">{expert.verifiedBy}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center gap-3">
                                        <Award size={18} className="text-blue-500 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Kỷ luật hành nghề</p>
                                            <p className="text-[12px] font-bold text-gray-800 truncate">{expert.disciplinaryRecord}</p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://dichvucong.moj.gov.vn"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3 hover:bg-blue-100 transition-colors group"
                                    >
                                        <ExternalLink size={18} className="text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-blue-400 uppercase">Tra cứu trực tuyến</p>
                                            <p className="text-[12px] font-bold text-blue-700 underline underline-offset-2">Hệ thống Bộ Tư pháp</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <GraduationCap className="text-blue-500" /> Trình độ và Kinh nghiệm
                        </h3>
                        <ul className="space-y-4">
                            {expert.education.map((edu, idx) => (
                                <li key={idx} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex justify-center items-center shrink-0">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div className="pt-2 text-gray-700 font-medium">{edu}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Star className="text-amber-500 fill-amber-500" /> Nhận xét nổi bật
                        </h3>
                        <div className="space-y-6">
                            {visibleReviews.map((review, rIndex) => (
                                <div key={rIndex} className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="font-bold text-gray-800">{review.name}</div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                                            <Clock size={14} /> {review.date}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={14} className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">{review.content}</p>
                                </div>
                            ))}
                        </div>
                        {!showAllReviews && MOCK_REVIEWS.length > 1 && (
                            <button onClick={() => setShowAllReviews(true)} className="w-full mt-4 py-3 text-[#0f4c81] font-bold border rounded-lg hover:bg-blue-50 transition">
                                Xem tất cả {expert.reviews} nhận xét
                            </button>
                        )}
                        {showAllReviews && (
                            <button onClick={() => setShowAllReviews(false)} className="w-full mt-4 py-3 text-gray-600 font-bold border rounded-lg hover:bg-gray-50 transition">
                                Thu gọn
                            </button>
                        )}
                    </div>
                </div>

                {/* Booking Sidebar */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-lg border-t-4 border-[#0f4c81] p-6 lg:sticky lg:top-24">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <CalendarIcon className="text-[#0f4c81]" /> Đặt lịch tư vấn
                        </h3>

                        {/* Calendar Selector */}
                        <div className="mb-6 focus-within:ring-2 ring-blue-100 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-gray-700">Chọn lịch: Tháng 3, 2026</span>
                                <div className="flex gap-1">
                                    <button onClick={() => scroll('left')} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#0f4c81]"><ChevronLeft size={20} /></button>
                                    <button onClick={() => scroll('right')} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#0f4c81]"><ChevronRight size={20} /></button>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Gradient fades */}
                                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                                <div ref={scrollRef} className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2 w-full">
                                    {dates.map((d) => {
                                        const isSelected = selectedDate === d.date;
                                        const hasSlots = (MOCK_SCHEDULE[d.date] || []).length > 0;
                                        return (
                                            <button
                                                key={d.date}
                                                onClick={() => handleDateSelect(d.date)}
                                                className={`snap-start shrink-0 min-w-[64px] flex flex-col items-center p-2 rounded-xl border transition-all ${isSelected
                                                    ? 'bg-[#0f4c81] text-white border-[#0f4c81] shadow-md transform -translate-y-1'
                                                    : hasSlots
                                                        ? 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                        : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed'
                                                    }`}
                                                disabled={!hasSlots}
                                            >
                                                <span className={`text-xs ${isSelected ? 'text-blue-200' : hasSlots ? 'text-gray-500' : 'text-gray-400'}`}>{d.dayName}</span>
                                                <span className="text-lg font-bold mt-1">{d.dayNum}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="mb-8 min-h-[120px]">
                            <span className="font-bold text-gray-700 block mb-3">Giờ trống khả dụng</span>
                            {currentSlots.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {currentSlots.map((slot, idx) => {
                                        const isSelected = selectedTimeSlot === slot.time;
                                        return (
                                            <button
                                                key={idx}
                                                disabled={!slot.available}
                                                onClick={() => setSelectedTimeSlot(slot.time)}
                                                className={`py-2 px-3 border rounded-lg text-sm transition font-bold ${isSelected
                                                    ? 'bg-[#0f4c81] text-white border-[#0f4c81] shadow-md'
                                                    : slot.available
                                                        ? 'bg-white text-gray-700 border-gray-200 hover:border-[#0f4c81] hover:text-[#0f4c81]'
                                                        : 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed line-through'
                                                    }`}
                                            >
                                                {slot.time}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                    Không có giờ trống trong ngày này.
                                </div>
                            )}
                        </div>

                        {/* Booking Action */}
                        <div className="pt-4 border-t border-gray-100">
                            <button
                                onClick={handleBookClick}
                                disabled={!selectedTimeSlot}
                                className="w-full bg-[#0f4c81] text-white font-bold py-3.5 rounded-lg hover:bg-blue-800 transition shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0f4c81] disabled:shadow-none"
                            >
                                Đăng ký khung giờ này <ChevronRight size={18} />
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 font-medium">Bảo mật thông tin & Hỗ trợ miễn phí</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChuyenGiaDetailPage;

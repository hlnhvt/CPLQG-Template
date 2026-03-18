import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Star, Clock, Calendar as CalendarIcon, MapPin, User, ChevronLeft, ChevronRight, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

const MOCK_EXPERT = {
    id: 1,
    name: 'Ls. Hoàng Ngọc Cường',
    role: 'Luật sư tư vấn - Đoàn Luật sư TP. Hà Nội',
    company: 'Công ty Luật TNHH V&H',
    avatar: '',
    domains: ['Đất đai', 'Dân sự', 'Hành chính'],
    rating: 4.9,
    reviews: 120,
    sessions: 350,
    bio: 'Với hơn 15 năm kinh nghiệm hành nghề luật sư, thế mạnh của tôi là tư vấn pháp luật, tham gia tranh tụng các vụ án Dân sự, Đất đai, Hành chính. Tôi đã tư vấn thành công hàng trăm vụ việc thu hồi đất và đền bù giải phóng mặt bằng, giúp người dân và doanh nghiệp bảo vệ quyền lợi hợp pháp lớn nhất.',
    education: ['Cử nhân Đại học Luật Hà Nội (2008)', 'Thạc sĩ Luật Kinh tế - ĐHQG Hà Nội (2012)'],
    methods: ['Gặp trực tiếp', 'Video call']
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
                    expert: MOCK_EXPERT,
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

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-2">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span>/</span>
                        <Link to="/cau-hoi-phap-luat" className="hover:text-[#0f4c81]">Hỏi đáp pháp luật</Link>
                        <span>/</span>
                        <Link to="/cau-hoi-phap-luat/chuyen-gia" className="hover:text-[#0f4c81]">Chuyên gia</Link>
                        <span>/</span>
                        <span className="text-[#0f4c81] font-bold line-clamp-1 flex-1">{MOCK_EXPERT.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
                {/* Main Profile Area */}
                <div className="lg:w-2/3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row gap-8">
                        {/* Avatar */}
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50 border-4 border-blue-100 rounded-full flex justify-center items-center shadow-md mb-4">
                                <User size={80} className="text-blue-200" />
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-bold text-sm">
                                <Star size={16} className="fill-amber-500" /> {MOCK_EXPERT.rating} / 5.0
                            </div>
                            <p className="text-sm text-gray-500 mt-2 font-medium">{MOCK_EXPERT.reviews} lượt đánh giá</p>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-[#0f4c81] mb-2">{MOCK_EXPERT.name}</h1>
                            <p className="text-lg font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Briefcase size={20} className="text-gray-400" /> {MOCK_EXPERT.role}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2 mb-6">
                                <MapPin size={18} className="text-gray-400" /> {MOCK_EXPERT.company}
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                {MOCK_EXPERT.bio}
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                                <div>
                                    <span className="text-gray-400 font-bold block mb-1 uppercase text-xs">Phạm vi chuyên môn</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {MOCK_EXPERT.domains.map((d, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded font-bold">{d}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold block mb-1 uppercase text-xs">Đã tư vấn</span>
                                    <span className="text-[#0f4c81] font-bold text-xl">{MOCK_EXPERT.sessions} <span className="text-gray-500 text-sm font-medium">buổi</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <GraduationCap className="text-blue-500" /> Trình độ và Kinh nghiệm
                        </h3>
                        <ul className="space-y-4">
                            {MOCK_EXPERT.education.map((edu, idx) => (
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
                                Xem tất cả {MOCK_EXPERT.reviews} nhận xét
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, PlayCircle, Users, Clock, Calendar, Video, Flag, Search, Filter } from 'lucide-react';
import LivestreamRegistrationModal from '../../components/LivestreamRegistrationModal';

const LivestreamListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock registration states: 'unregistered', 'pending', 'approved', 'rejected'
    const [registrations, setRegistrations] = useState({
        'hoithao-luatdoanhnghiep': 'unregistered',
        'toadam-luatdatdai': 'approved',
        'hoidap-thuedoanhnghiep': 'unregistered',
        'chuyende-luatvieclam': 'approved',
        'toadam-luatkinhdoanh': 'approved',
        'chuyende-luatsothuutritue': 'pending',
        'hoidap-luathinhsu': 'unregistered'
    });

    const [registrationModalState, setRegistrationModalState] = useState({ isOpen: false, eventId: null, eventTitle: '' });

    const handleRegisterClick = (eventId, eventTitle, e) => {
        if (e) e.preventDefault();
        setRegistrationModalState({ isOpen: true, eventId, eventTitle });
    };

    const handleConfirmRegistration = () => {
        const eventId = registrationModalState.eventId;
        
        // Mock API call to register -> set to pending
        setRegistrations(prev => ({ ...prev, [eventId]: 'pending' }));
        
        // Mock auto-approval after a delay for testing purposes
        setTimeout(() => {
            setRegistrations(prev => ({ ...prev, [eventId]: 'approved' }));
        }, 5000);
    };

    const featuredEvent = {
        id: 'hoithao-luatdoanhnghiep',
        title: 'Hội thảo trực tuyến: Góp ý Dự thảo Luật Doanh nghiệp (sửa đổi)',
        description: 'Sự kiện thảo luận chuyên sâu lấy ý kiến đối với các nội dung trọng tâm trong Dự thảo Luật Doanh nghiệp (sửa đổi), với sự tham gia của đại diện Bộ Kế hoạch Đầu tư và VCCI.',
        thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        date: '18/03/2026',
        time: '09:00 - 11:30',
        status: 'live',
        participants: 1245,
        host: 'Cổng Pháp luật Quốc gia'
    };

    const pastEvents = [
        {
            id: 'toadam-luatdatdai',
            title: 'Tọa đàm: Những điểm mới trong Luật Đất đai 2024',
            thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80',
            date: '10/03/2026',
            views: '15.2K',
            duration: '2h 15m'
        },
        {
            id: 'hoidap-thuedoanhnghiep',
            title: 'Hỏi đáp trực tiếp: Quyết toán thuế doanh nghiệp 2025',
            thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80',
            date: '05/03/2026',
            views: '8.4K',
            duration: '1h 45m'
        },
        {
            id: 'chuyende-luatvieclam',
            title: 'Chuyên đề: Quy định mới về BHXH bắt buộc',
            thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80',
            date: '28/02/2026',
            views: '22.1K',
            duration: '1h 30m'
        },
        {
            id: 'toadam-luatkinhdoanh',
            title: 'Giải đáp vướng mắc: Cấp giấy phép kinh doanh có điều kiện',
            thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80',
            date: '15/02/2026',
            views: '12.5K',
            duration: '2h 00m'
        },
        {
            id: 'chuyende-luatsothuutritue',
            title: 'Bảo vệ thương hiệu trên nền tảng thương mại điện tử',
            thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&q=80',
            date: '10/02/2026',
            views: '18.9K',
            duration: '1h 50m'
        },
        {
            id: 'hoidap-luathinhsu',
            title: 'Phân tích các tội phạm công nghệ cao theo Bộ luật Hình sự',
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
            date: '02/02/2026',
            views: '30.1K',
            duration: '2h 30m'
        }
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12 font-sans">
            {/* Breadcrumb Info */}
            <div className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-0 z-30">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-[13px] text-gray-500">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link to="/dien-dan" className="hover:text-blue-600 transition-colors">Diễn đàn</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="text-gray-800 font-medium">Buổi phát trực tuyến</span>
                    </div>
                </div>
            </div>

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0f4c81] via-blue-800 to-blue-600 text-white py-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/trong_dong_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center 80%' }}></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight drop-shadow-md">Buổi phát trực tuyến</h1>
                        <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed drop-shadow">Nơi kết nối cộng đồng pháp lý qua các buổi hội thảo, tọa đàm và chuyên đề trực tuyến với sự góp mặt của các chuyên gia đầu ngành.</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Featured Event Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-red-500 rounded-full"></span> Đang diễn ra & Nổi bật
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row group transition-all hover:shadow-xl">
                        {/* Image Side */}
                        <div className="w-full md:w-5/12 lg:w-1/2 relative overflow-hidden">
                            <img src={featuredEvent.thumbnail} alt={featuredEvent.title} className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700" />
                            {featuredEvent.status === 'live' && (
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <span className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-md shadow-lg text-sm font-bold uppercase tracking-wider animate-pulse">
                                        <div className="w-2 h-2 bg-white rounded-full"></div> Trực tiếp
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 py-6 px-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                    <Users size={16} /> {featuredEvent.participants.toLocaleString()} người đang tham gia
                                </span>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-7/12 lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase rounded border border-blue-100">{featuredEvent.host}</span>
                                <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                                    <Calendar size={15} className="text-gray-400" /> {featuredEvent.date}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                                    <Clock size={15} className="text-gray-400" /> {featuredEvent.time}
                                </span>
                            </div>

                            <Link to={`/dien-dan/su-kien/${featuredEvent.id}`} className="group-hover:text-blue-600 transition-colors">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">{featuredEvent.title}</h3>
                            </Link>

                            <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">{featuredEvent.description}</p>

                            <div className="mt-auto">
                                {registrations[featuredEvent.id] === 'approved' && (
                                    <Link
                                        to={`/dien-dan/su-kien/${featuredEvent.id}`}
                                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
                                    >
                                        Tham gia phiên trực tiếp <PlayCircle size={20} />
                                    </Link>
                                )}
                                {registrations[featuredEvent.id] === 'pending' && (
                                    <button
                                        disabled
                                        className="inline-flex items-center justify-center gap-2 bg-orange-100 text-orange-600 font-bold py-3.5 px-8 rounded-xl border border-orange-200 cursor-not-allowed w-full sm:w-auto"
                                    >
                                        <div className="w-4 h-4 rounded-full border-2 border-orange-600 border-t-transparent animate-spin"></div>
                                        Đang chờ phê duyệt
                                    </button>
                                )}
                                {(!registrations[featuredEvent.id] || registrations[featuredEvent.id] === 'unregistered') && (
                                    <button
                                        onClick={(e) => handleRegisterClick(featuredEvent.id, featuredEvent.title, e)}
                                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
                                    >
                                        Đăng ký tham gia
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Statistics & Filters */}
                    <div className="w-full lg:w-1/4 shrink-0 space-y-6">
                        {/* Search Bar Filter */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                                <Search size={18} className="text-blue-600" /> Tìm kiếm sự kiện
                            </h3>
                            <div className="relative flex">
                                <div className="flex-grow flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden px-3 focus-within:border-blue-500 transition-colors">
                                    <Search size={16} className="text-gray-400 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Tên sự kiện, diễn giả..."
                                        className="w-full py-2.5 px-2 outline-none text-gray-700 bg-transparent text-[14px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Filter Panel */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Filter size={18} className="text-blue-600" /> Bộ lọc
                                </h3>
                                <button className="text-xs text-blue-600 hover:underline">Xóa lọc</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none">
                                        <option>Tất cả sự kiện</option>
                                        <option>Đang phát trực tiếp</option>
                                        <option>Sắp diễn ra</option>
                                        <option>Đã kết thúc</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chủ đề pháp lý</label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                        {['Luật Doanh nghiệp', 'Luật Đất đai', 'Thuế & Kế toán', 'Luật Dân sự', 'Hình sự', 'Lao động & Việc làm'].map((topic, i) => (
                                            <div key={i} className="flex items-center">
                                                <input id={`topic-${i}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                                <label htmlFor={`topic-${i}`} className="ml-2 text-sm text-gray-600 cursor-pointer">{topic}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Card */}
                        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f4c81] rounded-2xl shadow-lg p-6 text-white text-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Video size={24} className="text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-1">1,248</h3>
                            <p className="text-blue-200 text-sm mb-6 uppercase font-medium tracking-wider">Phiên phát sóng</p>

                            <div className="space-y-3">
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center border border-white/5">
                                    <span className="text-blue-100 text-sm">Tổng lượt xem</span>
                                    <span className="font-bold">4.5M+</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between items-center border border-white/5">
                                    <span className="text-blue-100 text-sm">Chuyên gia</span>
                                    <span className="font-bold">350+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Past Events Grid (3 columns) */}
                    <div className="w-full lg:w-3/4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                Kho lưu trữ sự kiện
                            </h2>
                            <span className="text-sm font-medium text-gray-500">Hiển thị {pastEvents.length} video</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastEvents.map((event, index) => {
                                const status = registrations[event.id] || 'unregistered';
                                const isApproved = status === 'approved';

                                const content = (
                                    <>
                                        <div className="relative aspect-video overflow-hidden bg-gray-200">
                                            <img src={event.thumbnail} alt={event.title} className={`w-full h-full object-cover transition-transform duration-500 ${isApproved ? 'group-hover:scale-105' : ''}`} />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                                            {isApproved && (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50">
                                                        <PlayCircle size={28} className="text-white drop-shadow-md" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className={`font-bold text-[15px] leading-snug mb-3 line-clamp-2 transition-colors ${isApproved ? 'text-gray-800 group-hover:text-blue-600' : 'text-gray-600'}`}>
                                                {event.title}
                                            </h3>

                                            {/* Action Area based on status */}
                                            <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
                                                <div className="flex items-center justify-between text-[12px] font-medium text-gray-400 flex-grow mr-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={13} /> {event.date}
                                                    </div>
                                                </div>

                                                {isApproved ? (
                                                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                                                        Tham gia <PlayCircle size={14} />
                                                    </span>
                                                ) : status === 'pending' ? (
                                                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100 flex items-center gap-1">
                                                        Chờ duyệt
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={(e) => handleRegisterClick(event.id, event.title, e)}
                                                        className="text-[11px] font-bold text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded transition-colors"
                                                    >
                                                        Đăng ký
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                );

                                return isApproved ? (
                                    <Link
                                        to={`/dien-dan/su-kien/${event.id}`}
                                        key={index}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full relative hover:shadow-md transition-shadow group cursor-pointer"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full relative opacity-90"
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Mock */}
                        <div className="flex items-center justify-center mt-10 gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                <ChevronRight className="rotate-180" size={16} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">2</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">3</button>
                            <span className="text-gray-400">...</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LivestreamRegistrationModal
                isOpen={registrationModalState.isOpen}
                onClose={() => setRegistrationModalState({ isOpen: false, eventId: null, eventTitle: '' })}
                onRegister={handleConfirmRegistration}
                eventTitle={registrationModalState.eventTitle}
            />
        </div>
    );
};

export default LivestreamListPage;

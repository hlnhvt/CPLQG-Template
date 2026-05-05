import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Calendar, Clock, FileText, Download, User, Users } from 'lucide-react';

const ToaDamSuKienDetailPage = () => {
    const { id } = useParams();

    // Mock data for the specific event (id: 4 in previous list)
    const event = {
        title: 'Nhận diện điểm nghẽn và đề xuất giải pháp khắc phục liên quan đến Luật Đất đai',
        image: '/bc536d54-ce2c-4961-be6f-a1fddb4e086d.jpg',
        description: `Hội nghị tập trung trao đổi, thảo luận về các khó khăn, vướng mắc mà doanh nghiệp đang gặp phải trong lĩnh vực đất đai về mặt thể chế và trong công tác tổ chức thi hành pháp luật đất đai trong bối cảnh thực hiện các chủ trương lớn của Đảng và Nhà nước tại Nghị quyết số 66-NQ/TW ngày 30/4/2025 của Bộ Chính trị về đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới; Nghị quyết số 68-NQ/TW ngày 04/5/2025 của Bộ Chính trị về phát triển kinh tế tư nhân, từ đó tạo ra cơ sở pháp lý, thực tiễn để đề xuất, nghiên cứu, góp phần hoàn thiện thể chế, chính sách pháp luật về đất đai phù hợp với yêu cầu phát triển kinh tế - xã hội của đất nước trong thời gian tới.`,
        startDate: '22/09/2025',
        startTime: '14:00',
        endDate: '22/09/2025',
        endTime: '17:15',
        type: 'Tọa đàm',
        status: 'Đã kết thúc',
        attachments: [
            'Tổ chức Hội thảo trao đổi về các vấn đề liên quan đến lĩnh vực đất đai (1).docx',
            'Ban hành Kế hoạch tổ chức Hội thảo trao đổi về các vấn đề liên quan đến lĩnh vực đất đai (1).docx',
            'Chương trình Hội thảo Đất đai (1).docx'
        ],
        speakers: [
            { name: 'Đồng chí Nguyễn Thanh Ngọc', title: 'Thứ trưởng Bộ Tư pháp', avatar: '/bc536d54-ce2c-4961-be6f-a1fddb4e086d.jpg' },
            { name: 'Đồng chí Nguyễn Thanh Tú', title: 'Thứ trưởng Bộ Tư pháp', avatar: '/5e431efa-cd43-44df-8469-ba03dcb620c6.jpg' },
            { name: 'Lãnh đạo Bộ Nông nghiệp và Môi trường', title: '', isOrg: true }
        ],
        guests: [
            'Một số doanh nhân, luật gia, luật sư có uy tín trong lĩnh vực đất đai',
            'Đại diện tổ chức pháp chế các bộ, cơ quan ngang bộ, cơ quan thuộc Chính phủ',
            'Đại diện Lãnh đạo một số đơn vị chuyên môn sâu của các Ủy ban thuộc Quốc hội (Ủy ban Pháp luật - Tư pháp; Ủy ban Kinh tế - Tài chính; Ủy ban Khoa học, Công nghệ và Môi trường)',
            'Đại diện các tổ chức đại diện cho doanh nghiệp: Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI); Hiệp hội Doanh nghiệp nhỏ và vừa Việt Nam; Hiệp hội Bất động sản Việt Nam; Hiệp hội các nhà thầu xây dựng Việt Nam; Hiệp hội Pháp chế doanh nghiệp Việt Nam; Hiệp hội Tư vấn xây dựng Việt Nam; Hiệp hội Doanh nghiệp đầu tư nước ngoài; Hiệp hội Nông lâm sản Việt Nam; Hiệp hội Công nghiệp hỗ trợ; Hội Doanh nghiệp địa chất và khoáng sản Việt Nam; Liên Chi hội bất động sản khu công nghiệp Việt Nam...',
            'Đại diện Lãnh đạo các doanh nghiệp trong lĩnh vực bất động sản, xây dựng',
            'Một số chuyên gia pháp lý có uy tín trong lĩnh vực đất đai, xây dựng',
            'Các cơ quan thông tấn, báo chí'
        ],
        schedule: [
            { time: '13:30 - 14:00', task: 'Đăng ký, tiếp đón đại biểu' },
            { time: '14:00 - 14:10', task: 'Tuyên bố lý do, giới thiệu đại biểu' },
            { time: '14:10 - 14:20', task: 'Phát biểu khai mạc' },
            { time: '14:20 - 14:45', task: 'Báo cáo dẫn đề' },
            { time: '14:45 - 15:45', task: 'Trao đổi, thảo luận' },
            { time: '16:15 - 17:00', task: 'Tiếp tục trao đổi, thảo luận' },
            { time: '17:00 - 17:15', task: 'Kết luận Hội thảo, bế mạc' }
        ],
        relatedNews: [
            {
                title: '"Gương sáng Pháp luật" 2025: Dấu ấn đổi mới, lan tỏa tinh thần thượng tôn pháp luật',
                summary: '"Gương sáng Pháp luật" 2025: Dấu ấn đổi mới, lan tỏa tinh thần thượng tôn pháp luật',
                date: '05/11/2025',
                time: '10:42',
                image: '/5e431efa-cd43-44df-8469-ba03dcb620c6.jpg'
            },
            {
                title: 'Hoàn thiện công tác chuẩn bị Lễ hưởng ứng Ngày Pháp luật Việt Nam năm 2025',
                summary: 'Hoàn thiện công tác chuẩn bị Lễ hưởng ứng Ngày Pháp luật Việt Nam năm 2025',
                date: '05/11/2025',
                time: '10:51',
                image: '/bc536d54-ce2c-4961-be6f-a1fddb4e086d.jpg'
            },
            {
                title: 'Pháp luật với xây dựng và hoàn thiện nhà nước pháp quyền xã hội chủ nghĩa Việt Nam: Nền tảng bảo đảm...',
                summary: 'Pháp luật với xây dựng và hoàn thiện nhà nước pháp quyền xã hội chủ nghĩa Việt Nam: Nền tảng bảo đảm khát vọng phát triển...',
                date: '05/11/2025',
                time: '11:02',
                image: '/5e431efa-cd43-44df-8469-ba03dcb620c6.jpg'
            }
        ]
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-blue-600 transition-colors text-blue-600">Trang chủ</Link>
                    <ChevronRight size={14} />
                    <Link to="/tin-tuc/toa-dam-su-kien" className="hover:text-blue-600 transition-colors text-blue-600">Tọa đàm sự kiện</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-700">Chi tiết</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-6">
                {/* Back Link */}
                <Link to="/tin-tuc/toa-dam-su-kien" className="flex items-center gap-2 text-[14px] text-blue-600 hover:underline mb-4 font-medium">
                    <ArrowLeft size={16} /> Quay lại danh sách tin tức
                </Link>

                <h1 className="text-[28px] font-bold text-[#1e3a8a] mb-6">Tọa đàm - Sự kiện</h1>

                {/* Main Header Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Left Info Column */}
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-[13px] font-medium border border-gray-200">Tọa đàm</span>
                            <span className="px-4 py-1 bg-white text-red-500 border border-red-500 rounded-full text-[13px] font-medium">Đã kết thúc</span>
                        </div>

                        <h2 className="text-[24px] font-bold text-gray-900 leading-tight mb-6">
                            {event.title}
                        </h2>

                        {/* Summary Grid */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                            <div>
                                <p className="text-gray-400 text-[12px] uppercase font-bold mb-1">Thời gian bắt đầu</p>
                                <div className="flex items-center gap-2 text-gray-800 font-semibold text-[14px]">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.startDate}</span>
                                    <span className="flex items-center gap-1 ml-2"><Clock size={14} /> {event.startTime}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[12px] uppercase font-bold mb-1">Thời gian kết thúc</p>
                                <div className="flex items-center gap-2 text-gray-800 font-semibold text-[14px]">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.endDate}</span>
                                    <span className="flex items-center gap-1 ml-2"><Clock size={14} /> {event.endTime}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[12px] uppercase font-bold mb-1">Loại hình</p>
                                <p className="text-gray-800 font-semibold text-[14px]">{event.type}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[12px] uppercase font-bold mb-1">Trạng thái</p>
                                <p className="text-red-500 font-semibold text-[14px]">{event.status}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-[16px] font-bold text-gray-900 mb-3">Mô tả chi tiết</h3>
                            <div className="text-[15px] text-gray-600 leading-relaxed space-y-4">
                                {event.description}
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="mb-8">
                            <h3 className="text-[16px] font-bold text-gray-900 mb-3">Tài liệu đính kèm</h3>
                            <ul className="space-y-3">
                                {event.attachments.map((file, idx) => (
                                    <li key={idx} className="flex items-center gap-3 group cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Download size={14} />
                                        </div>
                                        <span className="text-[14px] text-blue-600 hover:underline">{file}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Media Column */}
                    <div className="w-full lg:w-[450px] shrink-0">
                        <div className="bg-white rounded-2xl aspect-video lg:aspect-square flex items-center justify-center border border-gray-100 relative overflow-hidden group shadow-lg">
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white/90 px-4 py-2 rounded-lg text-sm font-bold shadow">Xem ảnh sự kiện</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Speakers Section */}
                <div className="mb-12">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <User size={18} className="text-blue-600" /> Chủ trì / diễn giả
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {event.speakers.map((s, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-4 border-2 border-blue-100 p-0.5">
                                    {s.isOrg ? (
                                        <img src="/logo.png" className="w-full h-full object-contain p-1" alt="Org" />
                                    ) : (
                                        <img src={s.avatar || "/logo.png"} className="w-full h-full object-cover rounded-full" alt={s.name} />
                                    )}
                                </div>
                                <h4 className="font-bold text-[15px] text-gray-900 mb-1">{s.name}</h4>
                                <p className="text-[13px] text-gray-500">{s.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule and Guests Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Schedule */}
                    <div>
                        <h3 className="text-[16px] font-bold text-gray-900 mb-6">Lịch trình</h3>
                        <div className="relative pl-8 space-y-6">
                            {/* Timeline Line */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-blue-100"></div>
                            
                            {event.schedule.map((item, idx) => (
                                <div key={idx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-600 z-10"></div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[13px] font-bold text-blue-600">{item.time}</span>
                                        <span className="text-[14px] text-gray-700">{item.task}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Guests */}
                    <div>
                        <h3 className="text-[16px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                             <Users size={18} className="text-blue-600" /> Khách mời
                        </h3>
                        <div className="space-y-4">
                            {event.guests.map((guest, idx) => (
                                <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 text-[14px] text-gray-700 leading-relaxed shadow-sm hover:border-blue-200 transition-colors">
                                    {guest}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related News */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[22px] font-bold text-[#1e3a8a]">Tin tức liên quan</h3>
                        <Link to="#" className="text-blue-600 text-sm hover:underline font-medium">Xem tất cả</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {event.relatedNews.map((news, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                                <div className="h-[200px] overflow-hidden">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h4 className="font-bold text-[15px] text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        <Link to="#">{news.title}</Link>
                                    </h4>
                                    <p className="text-[13px] text-gray-500 line-clamp-2 mb-4">
                                        {news.summary}
                                    </p>
                                    <div className="mt-auto flex items-center gap-4 text-[11px] text-gray-400 font-medium">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {news.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToaDamSuKienDetailPage;

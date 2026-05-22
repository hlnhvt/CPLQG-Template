import React from 'react';
import { Video, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Multimedia = () => {
    const infographicsList = [
        {
            id: 1,
            title: 'Quy hoạch sử dụng đất quốc gia thời kỳ 2021 - 2030, tầm nhìn đến năm 2050',
            image: '/thumb1.png',
            to: '/infographic/infographic-1',
            date: '22/05/2026',
            summary: 'Bản đồ số trực quan hóa toàn bộ phương án quy hoạch, phân bổ chỉ tiêu sử dụng đất lâm nghiệp, nông nghiệp và đất phi nông nghiệp trên phạm vi toàn quốc.'
        },
        {
            id: 2,
            title: 'Chính sách hỗ trợ chi phí học tập và học bổng cho học sinh, sinh viên năm 2026',
            image: '/thumb2.png',
            to: '/infographic/infographic-2',
            date: '20/05/2026',
            summary: 'Chi tiết các mức hỗ trợ học phí, học bổng khuyến khích học tập và sinh hoạt phí cho học sinh nghèo vượt khó và sinh viên sư phạm.'
        },
        {
            id: 3,
            title: 'Khung kiến trúc tổng thể quốc gia số và định hướng phát triển hạ tầng dữ liệu',
            image: '/thumb3.png',
            to: '/infographic/infographic-3',
            date: '18/05/2026',
            summary: 'Mô hình tổng thể liên thông dữ liệu quốc gia từ Trung ương đến địa phương, định hướng số hóa toàn diện thủ tục hành chính công.'
        },
        {
            id: 4,
            title: 'Quy trình đăng ký thành lập doanh nghiệp trực tuyến qua Cổng Dịch vụ công Quốc gia',
            image: '/thumb1.png',
            to: '/infographic/infographic-4',
            date: '16/05/2026',
            summary: 'Quy trình tinh gọn giúp doanh nghiệp hoàn tất thủ tục đăng ký kinh doanh, cấp mã số thuế trực tuyến trong vòng 24 giờ.'
        },
        {
            id: 5,
            title: 'Hướng dẫn thực hiện kê khai và quyết toán thuế thu nhập cá nhân điện tử',
            image: '/thumb2.png',
            to: '/infographic/infographic-5',
            date: '15/05/2026',
            summary: 'Hướng dẫn người nộp thuế thực hiện tự quyết toán thuế thu nhập cá nhân qua ứng dụng điện tử nhanh chóng, chính xác.'
        }
    ];

    const videosList = [
        {
            id: 1,
            title: 'Toàn cảnh Phiên họp thứ 38 của Ủy ban Thường vụ Quốc hội về xây dựng pháp luật',
            image: '/thumb3.png',
            to: '/video/3',
            date: '21/05/2026',
            summary: 'Kính mời quý vị theo dõi bản tin truyền hình phản ánh đầy đủ các thảo luận trọng tâm và hoạt động lập pháp nổi bật tại Phiên họp thứ 38 của Ủy ban Thường vụ Quốc hội khóa XV.'
        },
        {
            id: 2,
            title: 'Phát biểu của Tổng Bí thư Tô Lâm về đổi mới công tác lập pháp trong kỷ nguyên mới',
            image: '/thumb1.png',
            to: '/video/1',
            date: '19/05/2026',
            summary: 'Bài phát biểu mang tính lịch sử về tinh thần đổi mới thể chế xây dựng pháp luật, lấy người dân và doanh nghiệp làm trung tâm phục vụ.'
        },
        {
            id: 3,
            title: 'Diễn đàn đối thoại chính sách: Giải pháp tháo gỡ vướng mắc về thủ tục hành chính',
            image: '/thumb2.png',
            to: '/video/2',
            date: '17/05/2026',
            summary: 'Các chuyên gia và đại diện doanh nghiệp đối thoại trực tiếp để tìm giải pháp cải cách thủ tục hành chính, tháo gỡ điểm nghẽn thể chế.'
        },
        {
            id: 4,
            title: 'Tuyên truyền phổ biến pháp luật phòng chống bạo lực học đường và tệ nạn xã hội',
            image: '/thumb1.png',
            to: '/video/4',
            date: '14/05/2026',
            summary: 'Chương trình truyền hình phổ biến giáo dục pháp luật học đường, tăng cường nhận thức pháp lý và kỹ năng phòng ngừa tệ nạn xã hội.'
        },
        {
            id: 5,
            title: 'Lễ công bố và trao giải cuộc thi trực tuyến tìm hiểu Hiến pháp và pháp luật Việt Nam',
            image: '/thumb3.png',
            to: '/video/5',
            date: '12/05/2026',
            summary: 'Lễ tổng kết trang trọng vinh danh các cá nhân và tập thể xuất sắc đạt giải cao trong cuộc thi tìm hiểu Hiến pháp trực tuyến toàn quốc.'
        }
    ];

    return (
        <section className="pt-8 pb-16 bg-white font-sans border-t border-gray-100 relative">
            <div className="container mx-auto px-4 max-w-[1504px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Column: INFOGRAPHIC */}
                    <div className="flex flex-col">
                        {/* Column Header */}
                        <div className="pb-3 border-b-2 border-[#e11d48] mb-6">
                            <Link to="/infographic" className="flex items-center gap-2 group/header w-fit hover:opacity-80 transition-opacity">
                                <FileText className="text-[#e11d48] w-6 h-6" />
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#0f4c81] group-hover/header:text-blue-600 transition-colors">
                                    Infographic
                                </h2>
                            </Link>
                        </div>

                        {/* Featured Infographic Card (Item 1) */}
                        <Link to={infographicsList[0].to} className="group block mb-6">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300 mb-4">
                                {/* Dotted/Framed overlay icon in top-left */}
                                <div className="absolute top-3 left-3 z-20 w-8 h-8 flex items-center justify-center bg-black/60 text-white rounded-md shadow-md border border-white/20">
                                    <FileText size={16} />
                                </div>
                                <img
                                    src={infographicsList[0].image}
                                    alt={infographicsList[0].title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="font-bold text-gray-900 text-[18px] md:text-[20px] leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {infographicsList[0].title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-2 font-medium">
                                <Clock size={13} className="shrink-0" />
                                <span>{infographicsList[0].date}</span>
                            </div>
                            <p className="text-gray-600 text-[14.5px] leading-relaxed line-clamp-2">
                                {infographicsList[0].summary}
                            </p>
                        </Link>

                        {/* List of 4 Sub-Infographics (Items 2-5) */}
                        <div className="flex flex-col">
                            {infographicsList.slice(1).map((item) => (
                                <Link 
                                    key={item.id} 
                                    to={item.to} 
                                    className="flex gap-4 py-4 group cursor-pointer border-t border-gray-100 items-start"
                                >
                                    <div className="relative w-32 md:w-40 aspect-[4/3] rounded-lg overflow-hidden shadow-xs border border-gray-100 shrink-0 mt-0.5">
                                        <div className="absolute top-2 left-2 z-20 w-6 h-6 flex items-center justify-center bg-black/60 text-white rounded shadow-sm border border-white/20">
                                            <FileText size={12} />
                                        </div>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-gray-800 text-[15px] md:text-[16.5px] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors mb-1.5">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-[12px] text-gray-400 font-medium">
                                            <Clock size={12} className="shrink-0" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: VIDEO */}
                    <div className="flex flex-col">
                        {/* Column Header */}
                        <div className="pb-3 border-b-2 border-[#e11d48] mb-6">
                            <Link to="/video" className="flex items-center gap-2 group/header w-fit hover:opacity-80 transition-opacity">
                                <Video className="text-[#e11d48] w-6 h-6" />
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#0f4c81] group-hover/header:text-blue-600 transition-colors">
                                    Video
                                </h2>
                            </Link>
                        </div>

                        {/* Featured Video Card (Item 1) */}
                        <Link to={videosList[0].to} className="group block mb-6">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300 mb-4">
                                <div className="absolute top-3 left-3 z-20 w-8 h-8 flex items-center justify-center bg-black/60 text-white rounded-md shadow-md border border-white/20">
                                    <Video size={16} />
                                </div>
                                <img
                                    src={videosList[0].image}
                                    alt={videosList[0].title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                />
                                {/* Play overlay icon */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                                    <div className="bg-red-600 text-white rounded-full p-3.5 shadow-lg transform group-hover:scale-110 transition-all duration-300 ring-2 ring-white/20">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 text-[18px] md:text-[20px] leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {videosList[0].title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-2 font-medium">
                                <Clock size={13} className="shrink-0" />
                                <span>{videosList[0].date}</span>
                            </div>
                            <p className="text-gray-600 text-[14.5px] leading-relaxed line-clamp-2">
                                {videosList[0].summary}
                            </p>
                        </Link>

                        {/* List of 4 Sub-Videos (Items 2-5) */}
                        <div className="flex flex-col">
                            {videosList.slice(1).map((item) => (
                                <Link 
                                    key={item.id} 
                                    to={item.to} 
                                    className="flex gap-4 py-4 group cursor-pointer border-t border-gray-100 items-start"
                                >
                                    <div className="relative w-32 md:w-40 aspect-[4/3] rounded-lg overflow-hidden shadow-xs border border-gray-100 shrink-0 mt-0.5">
                                        <div className="absolute top-2 left-2 z-20 w-6 h-6 flex items-center justify-center bg-black/60 text-white rounded shadow-sm border border-white/20">
                                            <Video size={12} />
                                        </div>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                        />
                                        {/* Play icon overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                                            <div className="bg-red-600 text-white rounded-full p-1.5 shadow-md">
                                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-gray-800 text-[15px] md:text-[16.5px] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors mb-1.5">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-[12px] text-gray-400 font-medium">
                                            <Clock size={12} className="shrink-0" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Multimedia;

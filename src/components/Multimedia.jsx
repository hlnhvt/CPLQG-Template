import React, { useState } from 'react';
import { Camera, Video, Image as ImageIcon, Clock, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Multimedia = () => {
    const [activeTab, setActiveTab] = useState('Ảnh');

    const tabs = [
        { id: 'Ảnh', icon: Camera },
        { id: 'Video', icon: Video },
        { id: 'Infographic', icon: ImageIcon },
    ];

    const data = {
        'Ảnh': {
            featured: {
                id: 1,
                tag: 'CHUYỂN ĐỔI SỐ',
                title: 'Giao ban Ban Chỉ đạo 57 về phát triển khoa học và công nghệ năm 2026',
                description: 'Thứ trưởng Bộ Tư pháp chủ trì cuộc họp lớn về công tác đổi mới sáng tạo và chuyển đổi số toàn diện ngành Tư pháp năm 2026, tháo gỡ những điểm nghẽn về hạ tầng số.',
                date: '20/03/2026',
                views: '1.250',
                image: '/thumb1.png'
            },
            list: [
                {
                    id: 2,
                    tag: 'AN NINH MẠNG',
                    title: 'Tập huấn hệ thống bảo mật nền tảng số cho các đơn vị trong Bộ',
                    description: 'Cục Công nghệ thông tin tổ chức buổi tập huấn về an toàn thông tin.',
                    date: '15/03/2026',
                    views: '980',
                    image: '/thumb2.png'
                },
                {
                    id: 3,
                    tag: 'PHÁP LUẬT',
                    title: 'Phổ biến các quy định mới về ứng dụng CNTT trong ngành Tư pháp',
                    description: 'Hội nghị đã tổng kết công tác triển khai quyết định 06 về dữ liệu dân cư.',
                    date: '10/03/2026',
                    views: '764',
                    image: '/thumb3.png'
                },
                {
                    id: 4,
                    tag: 'CHUYỂN ĐỔI SỐ',
                    title: 'Hội thảo chuyên đề về ứng dụng AI trong quản lý tư pháp điện tử',
                    description: 'Các chuyên gia trình bày giải pháp tích hợp trí tuệ nhân tạo vào hệ thống tư pháp số.',
                    date: '05/03/2026',
                    views: '622',
                    image: '/thumb1.png'
                },
                {
                    id: 13,
                    tag: 'CỘNG ĐỒNG',
                    title: 'Đẩy mạnh tuyên truyền pháp luật trực tuyến tại vùng sâu vùng xa',
                    description: 'Hoàn thành lắp đặt hệ thống màn hình tương tác phục vụ tuyên truyền.',
                    date: '01/03/2026',
                    views: '840',
                    image: '/thumb2.png'
                }
            ]
        },
        'Video': {
            featured: {
                id: 5,
                tag: 'PHÓNG SỰ',
                title: 'Dấu ấn ngành Tư pháp trong nhiệm kỳ vừa qua',
                description: 'Phóng sự toàn diện về các thành tựu của ngành Tư pháp, đặc biệt trong công tác cải cách thể chế và xây dựng pháp luật.',
                date: '22/03/2026',
                views: '3.420',
                image: '/thumb2.png'
            },
            list: [
                {
                    id: 6,
                    tag: 'THỜI SỰ',
                    title: 'Bộ trưởng trả lời phỏng vấn về định hướng phát triển',
                    description: 'VTV1 Phỏng vấn trực tiếp Bộ trưởng về công tác tư pháp.',
                    date: '18/03/2026',
                    views: '2.140',
                    image: '/thumb3.png'
                },
                {
                    id: 7,
                    tag: 'VIDEO CỦA BẠN',
                    title: 'Hướng dẫn sử dụng Cổng đăng ký giao dịch bảo đảm',
                    description: 'Video hướng dẫn thao tác cơ bản trên cổng dịch vụ công.',
                    date: '12/03/2026',
                    views: '1.560',
                    image: '/thumb1.png'
                },
                {
                    id: 8,
                    tag: 'TỌA ĐÀM',
                    title: 'Tọa đàm: Nâng cao chất lượng nguồn nhân lực',
                    description: 'Thảo luận về đào tạo và bồi dưỡng cán bộ ngành Tư pháp.',
                    date: '08/03/2026',
                    views: '985',
                    image: '/thumb2.png'
                },
                {
                    id: 14,
                    tag: 'PHÓNG SỰ',
                    title: 'Nhìn lại 5 năm số hóa hệ thống lưu trữ hồ sơ',
                    description: 'Công tác lưu trữ đã mang diện mạo mới sau quyết định đột phá.',
                    date: '01/03/2026',
                    views: '1.450',
                    image: '/thumb3.png'
                }
            ]
        },
        'Infographic': {
            featured: {
                id: 9,
                tag: 'INFOGRAPHIC',
                title: 'Kết quả công tác năm 2025 và phương hướng 2026',
                description: 'Toàn cảnh kết quả đạt được qua các con số thống kê nổi bật trên các mặt công tác của Bộ, Ngành Tư pháp.',
                date: '25/03/2026',
                views: '4.500',
                image: '/thumb3.png'
            },
            list: [
                {
                    id: 10,
                    tag: 'THỐNG KÊ',
                    title: 'Quy trình giải quyết khiếu nại, tố cáo hành chính',
                    description: 'Cẩm nang rút gọn các bước giải quyết theo luật định.',
                    date: '16/03/2026',
                    views: '2.840',
                    image: '/thumb1.png'
                },
                {
                    id: 11,
                    tag: 'HƯỚNG DẪN',
                    title: 'Các mốc thời gian quan trọng trong năm',
                    description: 'Sự kiện và các quy định có hiệu lực trong năm.',
                    date: '14/03/2026',
                    views: '1.200',
                    image: '/thumb2.png'
                },
                {
                    id: 12,
                    tag: 'BÁO CÁO',
                    title: 'Tóm tắt Đề án 06 về phát triển dữ liệu dân cư',
                    description: 'Các mục tiêu cơ bản và lộ trình thực hiện đến 2030.',
                    date: '02/03/2026',
                    views: '3.150',
                    image: '/thumb3.png'
                },
                {
                    id: 15,
                    tag: 'THỐNG KÊ',
                    title: 'Báo cáo tình hình tiếp nhận và xử lý phản ánh kiến nghị',
                    description: 'Biểu đồ phản ánh chi tiết thời gian và hiệu suất xử lý trong Quý I/2026.',
                    date: '28/02/2026',
                    views: '1.800',
                    image: '/thumb1.png'
                }
            ]
        }
    };

    const currentData = data[activeTab];

    return (
        <section className="py-8 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-[1504px]">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
                    <div className="flex items-center">
                        <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81]">
                            Multimedia
                        </h2>
                    </div>

                    <div className="flex gap-1 mt-4 md:mt-0 bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200/60">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-[13px] md:text-sm transition-all duration-300 ${isActive
                                        ? 'bg-white text-[#0f4c81] shadow-sm ring-1 ring-black/5 scale-100 font-bold'
                                        : 'text-gray-500 hover:text-[#0f4c81] hover:bg-white/60 hover:shadow-xs scale-95'
                                        }`}
                                >
                                    <Icon size={16} className={isActive ? "text-[#0f4c81]" : ""} /> {tab.id}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {/* Featured Item (Left) */}
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition hover:shadow-md h-full flex flex-col">
                        <div className="relative w-full aspect-video overflow-hidden shrink-0 group">
                            <img
                                src={currentData.featured.image}
                                alt={currentData.featured.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {activeTab === 'Video' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1.5"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 md:p-8 flex flex-col flex-grow bg-white z-10 border-t border-gray-100 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
                            <Link to={`${activeTab === 'Ảnh' ? '/anh' : activeTab === 'Video' ? '/video' : '/infographic'}/${currentData.featured.id}`}>
                                <h3 className="font-bold text-[#0f4c81] text-xl md:text-2xl line-clamp-2 md:line-clamp-3 leading-tight mb-4 hover:text-blue-700 transition">
                                    {currentData.featured.title}
                                </h3>
                            </Link>
                            <p className="text-gray-600 text-[14px] md:text-[15px] line-clamp-3 md:line-clamp-4 leading-relaxed mb-6">
                                {currentData.featured.description}
                            </p>
                            <div className="flex items-center gap-4 text-[12px] text-gray-500 mt-auto pt-4">
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-md px-3 py-1.5">
                                    <Clock size={14} className="text-[#0f4c81]" /> <span className="font-medium">{currentData.featured.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List Items (Right) */}
                    <div className="flex flex-col gap-[13.5px] h-full">
                        {currentData.list.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition hover:shadow-md flex flex-row p-3 items-center gap-4 group flex-1">
                                <div className="w-[180px] shrink-0 relative aspect-video overflow-hidden rounded shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {activeTab === 'Video' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
                                                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0 flex-grow py-1">
                                    <Link to={`${activeTab === 'Ảnh' ? '/anh' : activeTab === 'Video' ? '/video' : '/infographic'}/${item.id}`}>
                                        <h4 className="font-bold text-[#0f4c81] text-[14px] md:text-[15px] line-clamp-2 leading-snug mb-2 hover:text-blue-700 transition">
                                            {item.title}
                                        </h4>
                                    </Link>
                                    <p className="text-gray-600 text-[12px] md:text-[13px] line-clamp-2 leading-relaxed mb-3">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-[11px] text-gray-500 mt-auto pt-1 rounded">
                                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded px-2 py-0.5">
                                            <Clock size={11} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-5">
                    <Link
                        to={activeTab === 'Ảnh' ? '/anh' : activeTab === 'Video' ? '/video' : '/infographic'}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#17c5ed] to-[#1a0b94] text-white px-8 py-2.5 rounded-full font-semibold text-[15px] shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90"
                    >
                        Xem tất cả {activeTab}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Multimedia;

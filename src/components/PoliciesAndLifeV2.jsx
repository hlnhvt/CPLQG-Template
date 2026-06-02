import React from 'react';
import { Clock, ArrowRight, ShieldCheck, HelpCircle, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliciesAndLifeV2 = ({ isHalfWidth = false }) => {

    // 3 Columns: 'new-policies', 'legal-life', 'experts'
    const categoriesData = [
        {
            id: 'new-policies',
            name: 'Chính sách mới',
            description: 'Các văn bản quy phạm pháp luật và cải cách hành chính nổi bật vừa ban hành.',
            badgeStyle: 'from-blue-600 to-indigo-600 text-white',
            borderColor: 'border-blue-100',
            bgIcon: <BookOpen className="text-blue-600" size={18} />,
            articles: [
                {
                    id: 101,
                    title: 'Ban hành Nghị định mới về đơn giản hóa thủ tục cấp giấy phép kinh doanh trực tuyến',
                    description: 'Nghị định mới giúp tinh giản 15 bước kê khai hành chính, hỗ trợ các doanh nghiệp số hoàn tất đăng ký nhanh chóng trong ngày.',
                    date: '28/10/2025 | 10:30',
                    image: '/thumb1.png'
                },
                {
                    id: 102,
                    title: 'Áp dụng giảm thuế giá trị gia tăng (VAT) 2% đối với nhiều nhóm hàng hóa đến giữa năm 2026',
                    description: 'Tiếp tục triển khai chính sách hỗ trợ phục hồi kinh tế vĩ mô cho người dân và doanh nghiệp.',
                    date: '27/10/2025 | 08:00',
                    image: '/thumb2.png'
                },
                {
                    id: 103,
                    title: 'Quy định mới về quản lý hoạt động thương mại điện tử xuyên biên giới',
                    description: 'Tăng cường trách nhiệm của các sàn thương mại quốc tế hoạt động tại Việt Nam để bảo vệ quyền lợi người tiêu dùng.',
                    date: '26/10/2025 | 14:15',
                    image: '/thumb3.png'
                },
                {
                    id: 104,
                    title: 'Đẩy mạnh cải cách tư pháp toàn diện theo đề án chuyển đổi số dịch vụ công quốc gia',
                    description: 'Tập trung số hóa các dịch vụ tư pháp cơ bản giúp người dân tra cứu thông tin nhanh chóng.',
                    date: '25/10/2025 | 09:30',
                    image: '/thumb1.png'
                },
                {
                    id: 105,
                    title: 'Thí điểm cơ chế một cửa liên thông quốc gia đối với hàng hóa xuất nhập khẩu năm 2026',
                    description: 'Tối ưu hóa quy trình kiểm tra chuyên ngành giúp giảm thiểu thời gian thông quan cho các doanh nghiệp logistics.',
                    date: '24/10/2025 | 15:30',
                    image: '/thumb2.png'
                }
            ]
        },
        {
            id: 'legal-life',
            name: 'Đời sống pháp luật',
            description: 'Pháp luật gần gũi trong đời sống, bảo vệ quyền lợi và câu chuyện thực tế.',
            badgeStyle: 'from-emerald-600 to-teal-600 text-white',
            borderColor: 'border-emerald-100',
            bgIcon: <Users className="text-emerald-600" size={18} />,
            articles: [
                {
                    id: 201,
                    title: 'Chiến dịch trợ giúp pháp lý miễn phí lưu động cho đồng bào vùng sâu vùng xa',
                    description: 'Hàng ngàn người dân đã được các trợ giúp viên pháp lý tư vấn, giải đáp khúc mắc về thủ tục đất đai, hộ tịch trực tiếp tại địa bàn thôn bản.',
                    date: '24/10/2025 | 16:20',
                    image: '/thumb2.png'
                },
                {
                    id: 202,
                    title: 'Những điểm cần lưu ý khi ký kết hợp đồng lao động thời vụ cuối năm',
                    description: 'Tránh các bẫy pháp lý về bảo hiểm xã hội, tiền lương ngoài giờ và tranh chấp lao động phổ biến.',
                    date: '23/10/2025 | 11:15',
                    image: '/thumb3.png'
                },
                {
                    id: 203,
                    title: 'Người dân hào hứng sử dụng căn cước điện tử thay thế giấy tờ vật lý',
                    description: 'Đánh giá thực tế về mức độ tiện lợi và bảo mật khi thực hiện các thủ tục hành chính tại địa phương.',
                    date: '22/10/2025 | 14:40',
                    image: '/thumb1.png'
                },
                {
                    id: 204,
                    title: 'Tăng cường phổ biến Luật Phòng chống bạo lực gia đình ở cấp cơ sở',
                    description: 'Xây dựng mạng lưới hòa giải viên năng động giúp giảm thiểu mâu thuẫn xã hội hiệu quả.',
                    date: '21/10/2025 | 08:30',
                    image: '/thumb2.png'
                },
                {
                    id: 205,
                    title: 'Giải đáp vướng mắc pháp lý về tranh chấp quyền sử dụng đất thừa kế hộ gia đình',
                    description: 'Ý kiến tư vấn chi tiết của tổ luật sư cộng đồng giải quyết các xung đột thường gặp tại địa phương.',
                    date: '20/10/2025 | 10:00',
                    image: '/thumb3.png'
                }
            ]
        },
        {
            id: 'experts',
            name: 'Góc nhìn chuyên gia',
            description: 'Phân tích đa chiều, phản biện sâu sắc về xây dựng và hoàn thiện thể chế.',
            badgeStyle: 'from-rose-600 to-orange-500 text-white',
            borderColor: 'border-rose-100',
            bgIcon: <ShieldCheck className="text-rose-600" size={18} />,
            articles: [
                {
                    id: 301,
                    title: 'Sửa đổi luật Đất đai: Giải pháp đột phá gỡ nút thắt lớn cho thị trường bất động sản',
                    description: 'Chuyên gia kinh tế và luật sư đầu ngành phân tích các tác động sâu rộng của việc bỏ khung giá đất, xác định giá đất theo thị trường thực tế.',
                    date: '20/10/2025 | 09:10',
                    image: '/thumb3.png'
                },
                {
                    id: 302,
                    title: 'Xử lý tài sản thế chấp trong các vụ án kinh tế: Cần cơ chế bảo vệ quyền lợi bên thứ ba',
                    description: 'Ý kiến đóng góp về việc hoàn thiện khung pháp lý xử lý tài sản kê biên tránh gây tắc nghẽn giao dịch thương mại hợp pháp.',
                    date: '19/10/2025 | 15:45',
                    image: '/thumb1.png'
                },
                {
                    id: 303,
                    title: 'Hoàn thiện pháp luật bảo vệ quyền sở hữu trí tuệ trong kỷ nguyên công nghệ AI',
                    description: 'Đề xuất giải pháp pháp lý trước làn sóng sáng tạo bằng trí tuệ nhân tạo và bảo vệ bản quyền số.',
                    date: '18/10/2025 | 10:20',
                    image: '/thumb2.png'
                },
                {
                    id: 304,
                    title: 'Đổi mới công tác lập pháp: Chuyển dịch tư duy quản lý sang đồng hành, thúc đẩy phát triển',
                    description: 'Nhận định sâu sắc về việc tinh gọn thể chế, loại bỏ các thủ tục rườm rà gây cản trở lực lượng sản xuất.',
                    date: '17/10/2025 | 16:00',
                    image: '/thumb3.png'
                },
                {
                    id: 305,
                    title: 'Kiểm soát quyền lực và phòng chống tham nhũng trong công tác xây dựng ban hành VBQPPL',
                    description: 'Phân tích khoa học về tầm quan trọng của việc giám sát độc lập, lấy người dân làm trọng tâm lập hiến.',
                    date: '16/10/2025 | 14:00',
                    image: '/thumb1.png'
                }
            ]
        }
    ];

    const renderContent = () => {
        if (isHalfWidth) {
            return (
                <div className="flex flex-col h-full font-sans">
                    {/* Header with single-colored title */}
                    <div className="flex flex-col mb-6 pb-4 border-b border-slate-200">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0f4c81] tracking-tight leading-tight">
                            Chính sách & Cuộc sống
                        </h2>
                        <p className="text-slate-500 mt-1.5 text-xs font-light">
                            Nơi truyền tải hơi thở cuộc sống vào xây dựng chính sách và phản ánh tiếng nói pháp lý đa chiều.
                        </p>
                    </div>

                    {/* 3-Column Grid inside the 60% width container - Spacious & Majestic */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch min-h-[580px]">
                        {categoriesData.map((col) => {
                            const featuredArticle = col.articles[0];
                            const subArticles = col.articles.slice(1);

                            return (
                                <div key={col.id} className="flex flex-col justify-between bg-white rounded-2xl border border-slate-150 shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                                    <div>
                                        {/* Column Header */}
                                        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
                                            <div className="w-7 h-7 rounded bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                                                {React.cloneElement(col.bgIcon, { size: 14 })}
                                            </div>
                                            <h3 className="text-xs md:text-sm font-bold text-slate-800 tracking-tight line-clamp-1">
                                                {col.name}
                                            </h3>
                                        </div>

                                        {/* Article 1: Featured Card (Compact but Spacious) */}
                                        <div className="group flex flex-col mb-4">
                                            <Link to={`/news/${featuredArticle.id}`} className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-100 bg-slate-900 shrink-0">
                                                <img
                                                    src={featuredArticle.image}
                                                    alt={featuredArticle.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </Link>
                                            <Link to={`/news/${featuredArticle.id}`} className="mt-2.5">
                                                <h4 className="font-extrabold text-[#0f4c81] text-xs md:text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                                                    {featuredArticle.title}
                                                </h4>
                                            </Link>
                                            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-400 font-semibold">
                                                <Clock size={11} className="text-slate-300" />
                                                <span>{featuredArticle.date.split(' | ')[0]}</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-slate-100 mb-3"></div>

                                        {/* Articles 2, 3, 4, 5: Fine-grained list with slightly more vertical spacing */}
                                        <div className="flex flex-col gap-2.5">
                                            {subArticles.map((item) => (
                                                <Link 
                                                    key={item.id} 
                                                    to={`/news/${item.id}`}
                                                    className="flex gap-2 p-1.5 rounded-lg group hover:bg-slate-50/70 border border-transparent transition items-start"
                                                >
                                                    <div className="relative w-10 md:w-12 aspect-video rounded-sm overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h5 className="font-bold text-slate-800 text-[10px] md:text-xs leading-snug line-clamp-2 group-hover:text-blue-700 transition">
                                                            {item.title}
                                                        </h5>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 max-w-[1504px]">
                
                {/* Premium Section Title with single-colored title */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-slate-200">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f4c81] leading-tight">
                            Chính sách & Cuộc sống
                        </h2>
                        <p className="text-slate-500 mt-2 text-base md:text-lg max-w-2xl font-light">
                            Nơi truyền tải hơi thở cuộc sống vào xây dựng chính sách và phản ánh tiếng nói pháp lý đa chiều của xã hội.
                        </p>
                    </div>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
                    
                    {categoriesData.map((col) => {
                        const featuredArticle = col.articles[0];
                        const subArticles = col.articles.slice(1);

                        return (
                            <div key={col.id} className="flex flex-col h-full bg-white rounded-2xl border border-slate-150 shadow-sm hover:shadow-lg transition-all duration-300 p-5 md:p-6">
                                
                                {/* Column Header (Category Meta) */}
                                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                                    <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 shadow-2xs">
                                        {col.bgIcon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                                            {col.name}
                                        </h3>
                                        <p className="text-[11.5px] text-slate-400 font-medium line-clamp-1">
                                            {col.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Article 1: High-Contrast Featured Card */}
                                <div className="group flex flex-col mb-6">
                                    <Link to={`/news/${featuredArticle.id}`} className="block relative w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-slate-100 mb-4 bg-slate-900">
                                        <img
                                            src={featuredArticle.image}
                                            alt={featuredArticle.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                        <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r ${col.badgeStyle} shadow-sm`}>
                                            Tiêu điểm
                                        </div>
                                    </Link>

                                    {/* Featured Content Details */}
                                    <Link to={`/news/${featuredArticle.id}`}>
                                        <h4 className="font-extrabold text-[#0f4c81] text-base md:text-lg leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                                            {featuredArticle.title}
                                        </h4>
                                    </Link>
                                    
                                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-3 line-clamp-3">
                                        {featuredArticle.description}
                                    </p>

                                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mt-auto">
                                        <Clock size={12} className="text-slate-300" />
                                        <span>{featuredArticle.date}</span>
                                    </div>
                                </div>

                                {/* Divider between featured and list */}
                                <div className="w-full h-px bg-slate-100 mb-4"></div>

                                {/* Articles 2, 3, 4, 5: Fine-grained List */}
                                <div className="flex flex-col gap-3">
                                    {subArticles.map((item) => (
                                        <Link 
                                            key={item.id} 
                                            to={`/news/${item.id}`}
                                            className="flex gap-3 p-2 rounded-xl group hover:bg-slate-50/70 border border-transparent hover:border-slate-100 transition-all duration-300 items-start"
                                        >
                                            <div className="relative w-16 md:w-20 aspect-video rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-3xs">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Sub-item Texts */}
                                            <div className="flex-grow min-w-0 py-0.5">
                                                <h5 className="font-bold text-slate-800 text-[12.5px] md:text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors mb-1">
                                                    {item.title}
                                                </h5>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                                                    <Clock size={10} className="text-slate-300 shrink-0" />
                                                    <span>{item.date.split(' | ')[0]}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>
        );
    };

    if (isHalfWidth) {
        return renderContent();
    }

    return (
        <section className="py-16 bg-slate-50 font-sans border-t border-slate-200 relative overflow-hidden">
            {/* Background vector detail */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
            {renderContent()}
        </section>
    );
};

export default PoliciesAndLifeV2;

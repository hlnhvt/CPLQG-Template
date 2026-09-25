import React, { useRef, useState } from 'react';
import { Clock, Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';

/* ------------------------------------------------------------------ */
/*  Sub-Navigator                                                        */
/* ------------------------------------------------------------------ */
const HANOI_NEWS_CATEGORIES = [
    { label: 'Tin hoạt động', id: 'tin-hoat-dong' },
    { label: 'Chính sách Thủ đô', id: 'chinh-sach' },
    { label: 'Phổ biến, giáo dục pháp luật', id: 'pbgdpl' },
    { label: 'Hỗ trợ doanh nghiệp', id: 'doanh-nghiep' },
    { label: 'Trợ giúp pháp lý', id: 'tro-giup' },
    { label: 'Hoạt động Tư pháp', id: 'tu-phap' },
    { label: 'Văn bản & Chính sách mới', id: 'van-ban' },
    { label: 'Nghiên cứu & Trao đổi', id: 'nghien-cuu' },
];

const HanoiNewsSubNav = ({ activeId }) => {
    const scrollRef = useRef(null);
    const [showArrow, setShowArrow] = useState(true);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowArrow(scrollLeft + clientWidth < scrollWidth - 8);
    };
    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[40]">
            <div className="container mx-auto px-4 max-w-[1286px]">
                <div className="flex items-center h-11">
                    <div className="shrink-0 pr-3 border-r border-gray-200 flex items-center text-indigo-700">
                        <Newspaper size={18} />
                    </div>
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-x-auto flex items-center gap-1 px-3"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {HANOI_NEWS_CATEGORIES.map((cat) => {
                            const isActive = cat.id === activeId;
                            return (
                                <Link
                                    key={cat.id}
                                    to={`/ha-noi/tin-tuc/${cat.id}`}
                                    className={`whitespace-nowrap text-[13px] font-medium px-3 py-2 border-b-2 transition-colors shrink-0 ${
                                        isActive
                                            ? 'border-[#2c1b92] text-[#2c1b92] font-semibold'
                                            : 'border-transparent text-gray-600 hover:text-[#2c1b92] hover:border-indigo-300'
                                    }`}
                                >
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                    {showArrow && (
                        <button
                            onClick={scrollRight}
                            className="shrink-0 pl-2 border-l border-gray-200 text-gray-400 hover:text-indigo-700 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Reusable Image block (16:9)                                          */
/* ------------------------------------------------------------------ */
const Image16x9 = ({ src, alt, className = '' }) => (
    <div className={`aspect-video w-full relative overflow-hidden ${className}`}>
        <img
            src={src}
            alt={alt}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Section Header                                                       */
/* ------------------------------------------------------------------ */
const SectionHeading = ({ label }) => (
    <h2 className="text-2xl font-bold text-[#2c1b92] border-b-2 border-[#4f56ca] pb-2 pr-8 uppercase tracking-wide inline-block mb-6">
        {label}
    </h2>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                  */
/* ------------------------------------------------------------------ */
const NEWS_DATA = {
    'tin-hoat-dong': {
        featured: {
            id: 101, thumb: '/thumb1.png',
            title: 'Thành phố Hà Nội tổ chức Hội nghị tổng kết công tác tư pháp năm 2025, triển khai nhiệm vụ 2026',
            summary: 'UBND Thành phố Hà Nội vừa tổ chức hội nghị tổng kết công tác tư pháp toàn thành phố, đánh giá kết quả đạt được và đề ra phương hướng, nhiệm vụ trọng tâm cho năm 2026 nhằm tiếp tục nâng cao chất lượng dịch vụ công và cải cách hành chính.',
            date: '23/03/2026',
        },
        left: [
            { id: 102, thumb: '/thumb2.png', title: 'Sở Tư pháp Hà Nội ký kết hợp tác toàn diện với Đoàn Luật sư Thành phố về cung cấp dịch vụ pháp lý công', date: '22/03/2026' },
            { id: 103, thumb: '/thumb3.png', title: 'Hội đồng PBGDPL Hà Nội họp triển khai Kế hoạch số 78/KH-UBND năm 2026 đến các quận, huyện, thị xã', date: '21/03/2026' },
            { id: 104, thumb: '/thumb1.png', title: 'Hà Nội phát động tháng hành động cao điểm về phổ biến pháp luật cho người dân vùng ven đô và ngoại thành', date: '20/03/2026' },
        ],
        right: [
            { id: 105, thumb: '/thumb2.png', title: 'Giám đốc Sở Tư pháp tiếp xúc cử tri trả lời kiến nghị liên quan công tác hộ tịch và cấp phiếu lý lịch tư pháp', date: '19/03/2026' },
            { id: 106, thumb: '/thumb3.png', title: 'Hà Nội tổ chức tập huấn cho 3.000 cán bộ tư pháp xã, phường về áp dụng các quy định của Luật Thủ Đô 2024', date: '18/03/2026' },
        ],
    },
    'chinh-sach': {
        featured: {
            id: 201, thumb: '/thumb3.png',
            title: 'Hà Nội ban hành kế hoạch triển khai thi hành Luật Thủ Đô số 39/2024/QH15 sâu rộng đến từng cơ sở',
            summary: 'UBND Thành phố Hà Nội đã ký ban hành Kế hoạch tổng thể nhằm cụ thể hóa và đưa các cơ chế, chính sách đặc thù của Luật Thủ Đô vào cuộc sống, phục vụ nhân dân và cộng đồng doanh nghiệp hiệu quả nhất trên toàn địa bàn 30 quận, huyện, thị xã.',
            date: '23/03/2026',
        },
        left: [
            { id: 202, thumb: '/thumb1.png', title: 'Chính sách hỗ trợ nhà ở xã hội và nhà lưu trú cho công nhân tại các khu công nghiệp trên địa bàn Hà Nội 2026', date: '22/03/2026' },
            { id: 203, thumb: '/thumb2.png', title: 'Hà Nội triển khai cơ chế Sandbox thí điểm cho doanh nghiệp công nghệ và đổi mới sáng tạo theo Luật Thủ Đô', date: '21/03/2026' },
            { id: 204, thumb: '/thumb3.png', title: 'Chính sách ưu đãi đặc biệt thu hút nhân tài trình độ cao về làm việc tại cơ quan nhà nước Thành phố Hà Nội', date: '20/03/2026' },
        ],
        right: [
            { id: 205, thumb: '/thumb1.png', title: 'Hội đồng nhân dân Thành phố thông qua Nghị quyết về phát triển kinh tế xã hội và ngân sách 5 năm 2026-2030', date: '19/03/2026' },
            { id: 206, thumb: '/thumb2.png', title: 'Chính sách thu hút đầu tư vào khu công nghệ cao Hòa Lạc và vùng đổi mới sáng tạo phía Tây Thủ đô', date: '18/03/2026' },
        ],
    },
    'pbgdpl': {
        featured: {
            id: 301, thumb: '/thumb2.png',
            title: 'Hà Nội đẩy mạnh tuyên truyền pháp luật lưu động tại 100% xã, phường, thị trấn trong năm 2026',
            summary: 'Hội đồng phối hợp PBGDPL thành phố phối hợp các sở, ngành, đoàn thể tổ chức chuỗi chương trình tuyên truyền lưu động và tư vấn pháp luật miễn phí, phủ sóng đến 579 xã, phường, thị trấn trên địa bàn Thủ đô.',
            date: '22/03/2026',
        },
        left: [
            { id: 302, thumb: '/thumb3.png', title: 'Hội thi "Cán bộ tư pháp giỏi" cấp Thành phố 2026 thu hút hơn 1.200 thí sinh từ 30 quận, huyện, thị xã', date: '21/03/2026' },
            { id: 303, thumb: '/thumb1.png', title: 'Mạng lưới tuyên truyền viên pháp luật cơ sở Hà Nội vượt mốc 25.000 người hoạt động tích cực', date: '20/03/2026' },
            { id: 304, thumb: '/thumb2.png', title: 'Đổi mới hình thức PBGDPL thông qua ứng dụng iHanoi và mạng xã hội đạt hiệu quả cao trong năm 2025', date: '19/03/2026' },
        ],
        right: [
            { id: 305, thumb: '/thumb3.png', title: 'Tập huấn kỹ năng hòa giải cơ sở về tranh chấp đất đai cho 500 hòa giải viên toàn thành phố', date: '18/03/2026' },
            { id: 306, thumb: '/thumb1.png', title: 'Hà Nội tổ chức "Ngày Pháp luật Việt Nam" với chuỗi 50 sự kiện quy mô lớn trên toàn địa bàn', date: '17/03/2026' },
        ],
    },
    'doanh-nghiep': {
        featured: {
            id: 401, thumb: '/thumb1.png',
            title: 'Tuần lễ đối thoại tháo gỡ điểm nghẽn pháp lý cho 500 doanh nghiệp vừa và nhỏ Thủ đô',
            summary: 'Sở Tư pháp Hà Nội chủ trì phối hợp Hiệp hội Doanh nghiệp TP tổ chức hội nghị giải đáp trực tiếp hơn 120 vướng mắc pháp lý về thuế, thủ tục đầu tư, quy định cấp phép thử nghiệm Sandbox và các chính sách ưu đãi đặc thù theo Luật Thủ Đô.',
            date: '21/03/2026',
        },
        left: [
            { id: 402, thumb: '/thumb2.png', title: 'Hà Nội ra mắt "Cổng thông tin hỗ trợ pháp lý doanh nghiệp" tích hợp tra cứu thủ tục và tư vấn trực tuyến', date: '20/03/2026' },
            { id: 403, thumb: '/thumb3.png', title: 'Sở Tư pháp cùng Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) tổ chức hội thảo về quyền sở hữu trí tuệ', date: '19/03/2026' },
            { id: 404, thumb: '/thumb1.png', title: 'Hỗ trợ 100% chi phí ươm tạo khởi nghiệp tại Khu Công nghệ cao Hòa Lạc theo Nghị quyết HĐND 2026', date: '18/03/2026' },
        ],
        right: [
            { id: 405, thumb: '/thumb2.png', title: 'Thủ tục cấp phép thử nghiệm Sandbox đơn giản hóa: Hà Nội tiên phong giảm thời gian xét duyệt xuống 30 ngày', date: '17/03/2026' },
            { id: 406, thumb: '/thumb3.png', title: 'Doanh nghiệp FDI tại Hà Nội được hưởng miễn thuế 5 năm theo chính sách ưu đãi đặc thù Luật Thủ Đô 2024', date: '16/03/2026' },
        ],
    },
    'tro-giup': {
        featured: {
            id: 501, thumb: '/thumb3.png',
            title: 'Trung tâm TGPL Nhà nước mở rộng tư vấn miễn phí qua tổng đài và ứng dụng iHanoi 24/7',
            summary: 'Người dân thuộc diện chính sách, hộ nghèo và người yếu thế tại 30 quận, huyện có thể kết nối với trợ giúp viên pháp lý để được thụ lý hồ sơ, cử luật sư bào chữa và tư vấn pháp lý miễn phí hoàn toàn.',
            date: '20/03/2026',
        },
        left: [
            { id: 502, thumb: '/thumb1.png', title: 'Hà Nội thành lập thêm 5 Chi nhánh TGPL tại các huyện ngoại thành nhằm đưa dịch vụ pháp lý đến gần dân hơn', date: '19/03/2026' },
            { id: 503, thumb: '/thumb2.png', title: 'Trợ giúp pháp lý thành công cho 12.000 người yếu thế trong năm 2025, vượt 120% kế hoạch đề ra', date: '18/03/2026' },
            { id: 504, thumb: '/thumb3.png', title: 'Kết nối hơn 200 luật sư tình nguyện tham gia mạng lưới TGPL cộng đồng dưới sự điều phối của Sở Tư pháp', date: '17/03/2026' },
        ],
        right: [
            { id: 505, thumb: '/thumb1.png', title: 'Hội thảo nâng cao năng lực trợ giúp viên pháp lý: Kỹ năng tranh tụng và bào chữa trong vụ án hình sự phức tạp', date: '16/03/2026' },
            { id: 506, thumb: '/thumb2.png', title: 'Đẩy mạnh TGPL lưu động tại vùng dân tộc thiểu số huyện Ba Vì, Mỹ Đức và các xã miền núi Hà Nội', date: '15/03/2026' },
        ],
    },
    'tu-phap': {
        featured: {
            id: 601, thumb: '/thumb2.png',
            title: 'Hà Nội hoàn thành số hóa 100% văn bản quy phạm pháp luật tích hợp tra cứu thông minh AI',
            summary: 'Hệ thống Cổng Pháp luật Thành phố chính thức vận hành công cụ tra cứu thông minh, hỗ trợ người dân và doanh nghiệp tiếp cận thông tin pháp điển hóa nhanh chóng, chuẩn xác và miễn phí hoàn toàn.',
            date: '19/03/2026',
        },
        left: [
            { id: 602, thumb: '/thumb3.png', title: 'Triển khai hệ thống đăng ký hộ tịch trực tuyến 100% tại 579 xã, phường, thị trấn trong năm 2026', date: '18/03/2026' },
            { id: 603, thumb: '/thumb1.png', title: 'Hà Nội cải cách mạnh thủ tục hành chính tư pháp: Giảm 40% thời gian giải quyết và 60% hồ sơ giấy tờ', date: '17/03/2026' },
            { id: 604, thumb: '/thumb2.png', title: 'Sở Tư pháp tổng kết 3 năm thực hiện Đề án "Thành phố thông minh - Tư pháp số" giai đoạn 2022-2025', date: '16/03/2026' },
        ],
        right: [
            { id: 605, thumb: '/thumb3.png', title: 'Kết quả kiểm tra, rà soát văn bản quy phạm pháp luật do HĐND và UBND Thành phố ban hành năm 2025', date: '15/03/2026' },
            { id: 606, thumb: '/thumb1.png', title: 'Tổng kết công tác thi hành án dân sự toàn thành phố: Vượt chỉ tiêu về số việc và giá trị thi hành xong', date: '14/03/2026' },
        ],
    },
    'van-ban': {
        featured: {
            id: 701, thumb: '/thumb1.png',
            title: 'Luật Thủ Đô 2024 - Những điểm đặc thù đột phá trong cơ chế thể chế cho Hà Nội phát triển',
            summary: 'Luật Thủ đô số 39/2024/QH15 đã trao cho Hà Nội nhiều cơ chế, chính sách đặc thù nổi bật như Sandbox công nghệ, ưu đãi đặc biệt thu hút nhân tài và linh hoạt trong quản lý đô thị. Đây là nền tảng pháp lý quan trọng để Thủ đô bứt phá.',
            date: '18/03/2026',
        },
        left: [
            { id: 702, thumb: '/thumb2.png', title: 'Quyết định số 61/2024/QĐ-UBND: Bảng giá đất mới trên địa bàn Thành phố Hà Nội áp dụng từ 01/01/2026', date: '17/03/2026' },
            { id: 703, thumb: '/thumb3.png', title: 'Hướng dẫn thi hành các quy định về đăng ký kinh doanh hộ cá thể và doanh nghiệp nhỏ mới theo Luật Doanh nghiệp', date: '16/03/2026' },
            { id: 704, thumb: '/thumb1.png', title: 'Nghị định 100/2019/NĐ-CP: Quy định xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ và đường sắt', date: '15/03/2026' },
        ],
        right: [
            { id: 705, thumb: '/thumb2.png', title: 'Thông tư hướng dẫn cấp phép xây dựng nhà ở riêng lẻ trong khu vực quy hoạch đô thị tại Hà Nội', date: '14/03/2026' },
            { id: 706, thumb: '/thumb3.png', title: 'Kế hoạch 78/KH-UBND: Triển khai công tác PBGDPL, hòa giải ở cơ sở và xây dựng xã đạt chuẩn tiếp cận pháp luật 2026', date: '13/03/2026' },
        ],
    },
    'nghien-cuu': {
        featured: {
            id: 801, thumb: '/thumb3.png',
            title: 'Nghiên cứu hoàn thiện khung pháp lý về kinh tế đô thị đặc biệt áp dụng riêng cho Thủ đô Hà Nội',
            summary: 'Các chuyên gia pháp lý hàng đầu tiếp tục nghiên cứu, đề xuất hoàn thiện hệ thống pháp luật về quản lý đô thị đặc biệt, tham khảo kinh nghiệm quốc tế và vận dụng vào điều kiện thực tiễn đặc thù của Thủ đô Hà Nội trong giai đoạn phát triển mới.',
            date: '17/03/2026',
        },
        left: [
            { id: 802, thumb: '/thumb1.png', title: 'So sánh cơ chế hành chính đô thị đặc biệt: Kinh nghiệm từ Tokyo, Seoul, Singapore và bài học cho Hà Nội', date: '16/03/2026' },
            { id: 803, thumb: '/thumb2.png', title: 'Đánh giá hiệu quả 2 năm thực thi Luật Đất đai 2024: Tháo gỡ điểm nghẽn, vướng mắc trong thực tiễn', date: '15/03/2026' },
            { id: 804, thumb: '/thumb3.png', title: 'Hoàn thiện cơ chế kiểm soát quyền lực nhà nước và phòng, chống tham nhũng trong lĩnh vực đất đai', date: '14/03/2026' },
        ],
        right: [
            { id: 805, thumb: '/thumb1.png', title: 'Trao đổi về kỹ năng lập luận pháp lý trong giải quyết tranh chấp hành chính tại tòa án', date: '13/03/2026' },
            { id: 806, thumb: '/thumb2.png', title: 'Đề xuất mô hình quản trị liên vùng Thủ đô: Hà Nội - Hải Phòng - Quảng Ninh trong kỷ nguyên phát triển mới', date: '12/03/2026' },
        ],
    },
};

/* ------------------------------------------------------------------ */
/*  News Section Block                                                   */
/* ------------------------------------------------------------------ */
const NewsSection = ({ label, data }) => {
    const { featured, left, right } = data;
    return (
        <section className="mb-2">
            <SectionHeading label={label} />

            {/* Layout: Left 3 small | Center featured | Right 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Left col: 3 small items */}
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    {left.map((item) => (
                        <Link
                            key={item.id}
                            to={`/news/${item.id}`}
                            className="flex items-start gap-3 group border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                        >
                            <div className="w-1/3 shrink-0">
                                <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                            </div>
                            <div className="w-2/3 flex flex-col min-w-0">
                                <h3 className="font-bold text-[13px] text-gray-900 group-hover:text-[#2c1b92] line-clamp-3 leading-snug">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                    <Clock size={12} /> <span>{item.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Center: featured big */}
                <Link to={`/news/${featured.id}`} className="lg:col-span-2 group flex flex-col">
                    <div className="w-full mb-4 shrink-0">
                        <Image16x9
                            src={featured.thumb}
                            alt={featured.title}
                            className="rounded-lg shadow-sm border border-gray-100"
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h3 className="text-xl md:text-[22px] font-bold text-[#2c1b92] group-hover:text-[#4f56ca] mb-2 leading-tight line-clamp-3">
                            {featured.title}
                        </h3>
                        <p className="text-gray-600 text-[13px] mb-3 line-clamp-2 leading-relaxed">
                            {featured.summary}
                        </p>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                            <Clock size={14} /> <span>{featured.date}</span>
                        </div>
                    </div>
                </Link>

                {/* Right col: 2 medium items */}
                <div className="lg:col-span-1 flex flex-col space-y-6">
                    {right.map((item) => (
                        <Link
                            key={item.id}
                            to={`/news/${item.id}`}
                            className="group flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                        >
                            <div className="w-full mb-3 shrink-0">
                                <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                            </div>
                            <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#2c1b92] mb-2 leading-snug line-clamp-3">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                <Clock size={12} /> <span>{item.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ------------------------------------------------------------------ */
/*  Page                                                                  */
/* ------------------------------------------------------------------ */
const HanoiNewsPage = () => {
    const activeCategory = 'tin-hoat-dong';

    useEffect(() => {
        document.title = 'Tin tức & Sự kiện - Cổng Pháp luật Thành phố Hà Nội';
        window.scrollTo(0, 0);
    }, []);

    const activeCat = HANOI_NEWS_CATEGORIES.find((c) => c.id === activeCategory);
    const sectionData = NEWS_DATA[activeCategory];

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-[#2c1b92] transition-colors">
                        Trang chủ Hà Nội
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Tin tức &amp; Sự kiện</span>
                    {activeCat && activeCategory !== 'tin-hoat-dong' && (
                        <>
                            <ChevronRight size={14} />
                            <span className="text-gray-800 font-medium">{activeCat.label}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Page Header Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                <style>{`
                    @keyframes hanoiNewsRotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes hanoiNewsRotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes hanoiNewsPulse { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes hanoiNewsSweep { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                {/* Sweep light */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'hanoiNewsSweep 5s cubic-bezier(0.4,0,0.2,1) infinite' }}
                />
                {/* Glow orbs */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'hanoiNewsPulse 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'hanoiNewsPulse 4.5s ease-in-out infinite 1s' }} />

                {/* Rotating rings */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'hanoiNewsRotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'hanoiNewsRotateCCW 18s linear infinite' }} />

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        Tin tức &amp; Sự kiện Pháp luật Thủ đô
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Cập nhật liên tục chủ trương, chính sách, hoạt động tư pháp và các sự kiện pháp luật nổi bật của Thành phố Hà Nội
                    </p>
                </div>
            </div>

            {/* Sub Navigator */}
            <HanoiNewsSubNav />

            {/* Main Content */}
            <main className="flex-grow bg-white">
                <div className="container mx-auto px-4 py-8 max-w-[1286px]">
                    {sectionData && activeCat && (
                        <NewsSection label={activeCat.label} data={sectionData} />
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-4 mb-8" />

                    {/* All other sections below (except current active) */}
                    {HANOI_NEWS_CATEGORIES.filter((c) => c.id !== activeCategory).map((cat) => {
                        const data = NEWS_DATA[cat.id];
                        if (!data) return null;
                        return (
                            <div key={cat.id}>
                                <NewsSection label={cat.label} data={data} />
                                <div className="border-t border-gray-200 mt-4 mb-8" />
                            </div>
                        );
                    })}
                </div>
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiNewsPage;

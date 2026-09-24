import React, { useRef, useState } from 'react';
import { Clock, Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LaoCaiHeader from '../../components/laocai/LaoCaiHeader';
import LaoCaiFooter from '../../components/laocai/LaoCaiFooter';

/* ------------------------------------------------------------------ */
/*  Sub-Navigator                                                        */
/* ------------------------------------------------------------------ */
const LAOCAI_NEWS_CATEGORIES = [
    { label: 'Tin hoạt động', id: 'tin-hoat-dong' },
    { label: 'Chính sách Lào Cai', id: 'chinh-sach' },
    { label: 'Phổ biến giáo dục pháp luật', id: 'pbgdpl' },
    { label: 'Hỗ trợ doanh nghiệp', id: 'doanh-nghiep' },
    { label: 'Trợ giúp pháp lý', id: 'tro-giup' },
    { label: 'Hoạt động Tư pháp', id: 'tu-phap' },
    { label: 'Văn bản & Chính sách mới', id: 'van-ban' },
    { label: 'Nghiên cứu & Trao đổi', id: 'nghien-cuu' },
];

const LaoCaiNewsSubNav = ({ activeId }) => {
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
                        {LAOCAI_NEWS_CATEGORIES.map((cat) => {
                            const isActive = cat.id === activeId;
                            return (
                                <Link
                                    key={cat.id}
                                    to={`/lao-cai/tin-tuc/${cat.id}`}
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
            title: 'UBND tỉnh Lào Cai tổ chức Hội nghị tổng kết công tác tư pháp năm 2025, triển khai nhiệm vụ 2026',
            summary: 'UBND tỉnh Lào Cai vừa tổ chức hội nghị tổng kết công tác tư pháp toàn tỉnh, đánh giá kết quả đạt được và đề ra phương hướng, nhiệm vụ trọng tâm cho năm 2026 nhằm tiếp tục nâng cao chất lượng dịch vụ công và cải cách hành chính.',
            date: '23/03/2026',
        },
        left: [
            { id: 102, thumb: '/thumb2.png', title: 'Sở Tư pháp tỉnh Lào Cai ký kết quy chế phối hợp với Đoàn Luật sư tỉnh về cung cấp dịch vụ pháp lý công', date: '22/03/2026' },
            { id: 103, thumb: '/thumb3.png', title: 'Hội đồng PBGDPL Lào Cai họp triển khai Kế hoạch số 78/KH-UBND năm 2026 đến các xã, phường', date: '21/03/2026' },
            { id: 104, thumb: '/thumb1.png', title: 'Lào Cai phát động tháng cao điểm phổ biến pháp luật cho đồng bào các xã vùng cao, biên giới', date: '20/03/2026' },
        ],
        right: [
            { id: 105, thumb: '/thumb2.png', title: 'Giám đốc Sở Tư pháp tiếp xúc cử tri trả lời kiến nghị liên quan công tác hộ tịch và cấp phiếu lý lịch tư pháp', date: '19/03/2026' },
            { id: 106, thumb: '/thumb3.png', title: 'Lào Cai tập huấn cho 1.000 công chức tư pháp - hộ tịch cấp xã về nhiệm vụ mới sau sắp xếp chính quyền hai cấp', date: '18/03/2026' },
        ],
    },
    'chinh-sach': {
        featured: {
            id: 201, thumb: '/thumb3.png',
            title: 'Lào Cai ban hành kế hoạch triển khai các chính sách đặc thù phát triển tỉnh giai đoạn 2026 - 2030 đến từng cơ sở',
            summary: 'UBND tỉnh Lào Cai đã ký ban hành Kế hoạch tổng thể nhằm cụ thể hóa các nghị quyết của HĐND tỉnh về kinh tế cửa khẩu, du lịch, nông nghiệp hàng hóa vùng cao và hỗ trợ đồng bào dân tộc thiểu số, đưa chính sách vào cuộc sống trên toàn địa bàn các xã, phường.',
            date: '23/03/2026',
        },
        left: [
            { id: 202, thumb: '/thumb1.png', title: 'Chính sách hỗ trợ nhà ở xã hội và nhà lưu trú cho công nhân tại các khu công nghiệp Tằng Loỏng, Bắc Duyên Hải năm 2026', date: '22/03/2026' },
            { id: 203, thumb: '/thumb2.png', title: 'Lào Cai triển khai chính sách hỗ trợ phát triển du lịch cộng đồng tại Sa Pa, Bắc Hà, Y Tý', date: '21/03/2026' },
            { id: 204, thumb: '/thumb3.png', title: 'Chính sách thu hút, đãi ngộ người có trình độ cao về công tác tại các xã vùng cao tỉnh Lào Cai', date: '20/03/2026' },
        ],
        right: [
            { id: 205, thumb: '/thumb1.png', title: 'HĐND tỉnh Lào Cai thông qua Nghị quyết về kế hoạch phát triển kinh tế - xã hội 5 năm 2026 - 2030', date: '19/03/2026' },
            { id: 206, thumb: '/thumb2.png', title: 'Chính sách thu hút đầu tư vào Khu kinh tế cửa khẩu Lào Cai và các khu công nghiệp trên địa bàn tỉnh', date: '18/03/2026' },
        ],
    },
    'pbgdpl': {
        featured: {
            id: 301, thumb: '/thumb2.png',
            title: 'Lào Cai đẩy mạnh tuyên truyền pháp luật lưu động tại 100% xã, phường trong năm 2026',
            summary: 'Hội đồng phối hợp PBGDPL tỉnh phối hợp các sở, ngành, đoàn thể tổ chức chuỗi chương trình tuyên truyền lưu động và tư vấn pháp luật miễn phí, phủ kín 99 xã, phường, ưu tiên các thôn, bản vùng đồng bào dân tộc thiểu số.',
            date: '22/03/2026',
        },
        left: [
            { id: 302, thumb: '/thumb3.png', title: 'Hội thi "Hòa giải viên giỏi" cấp tỉnh năm 2026 thu hút hơn 300 hòa giải viên từ các thôn, bản, tổ dân phố', date: '21/03/2026' },
            { id: 303, thumb: '/thumb1.png', title: 'Mạng lưới tuyên truyền viên pháp luật cơ sở Lào Cai vượt mốc 5.000 người, hơn 40% là người dân tộc thiểu số', date: '20/03/2026' },
            { id: 304, thumb: '/thumb2.png', title: 'Đổi mới hình thức PBGDPL qua loa truyền thanh thôn, bản và mạng xã hội bằng tiếng Mông, tiếng Dao', date: '19/03/2026' },
        ],
        right: [
            { id: 305, thumb: '/thumb3.png', title: 'Tập huấn kỹ năng hòa giải cơ sở về tranh chấp đất đai, đất rừng cho 500 hòa giải viên vùng cao', date: '18/03/2026' },
            { id: 306, thumb: '/thumb1.png', title: 'Lào Cai tổ chức "Ngày Pháp luật Việt Nam" với chuỗi sự kiện hướng về cơ sở trên toàn tỉnh', date: '17/03/2026' },
        ],
    },
    'doanh-nghiep': {
        featured: {
            id: 401, thumb: '/thumb1.png',
            title: 'Tuần lễ đối thoại tháo gỡ vướng mắc pháp lý cho doanh nghiệp, hợp tác xã tỉnh Lào Cai',
            summary: 'Sở Tư pháp tỉnh Lào Cai chủ trì phối hợp Hiệp hội Doanh nghiệp tỉnh tổ chức hội nghị giải đáp trực tiếp hơn 120 vướng mắc pháp lý về thuế, thủ tục đầu tư, xuất nhập khẩu qua cửa khẩu và các chính sách ưu đãi theo nghị quyết của HĐND tỉnh.',
            date: '21/03/2026',
        },
        left: [
            { id: 402, thumb: '/thumb2.png', title: 'Lào Cai ra mắt chuyên trang hỗ trợ pháp lý doanh nghiệp tích hợp tra cứu thủ tục và tư vấn trực tuyến', date: '20/03/2026' },
            { id: 403, thumb: '/thumb3.png', title: 'Sở Tư pháp cùng Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) tổ chức hội thảo về quyền sở hữu trí tuệ', date: '19/03/2026' },
            { id: 404, thumb: '/thumb1.png', title: 'Hỗ trợ doanh nghiệp, hợp tác xã bảo hộ nhãn hiệu cho sản phẩm OCOP: chè Shan tuyết, quế Văn Bàn, mận Bắc Hà', date: '18/03/2026' },
        ],
        right: [
            { id: 405, thumb: '/thumb2.png', title: 'Rút ngắn thời gian thông quan tại Cửa khẩu quốc tế Lào Cai: Doanh nghiệp xuất khẩu nông sản hưởng lợi', date: '17/03/2026' },
            { id: 406, thumb: '/thumb3.png', title: 'Doanh nghiệp đầu tư vào Khu kinh tế cửa khẩu Lào Cai được hưởng ưu đãi tiền thuê đất theo Nghị quyết 05/2026/NQ-HĐND', date: '16/03/2026' },
        ],
    },
    'tro-giup': {
        featured: {
            id: 501, thumb: '/thumb3.png',
            title: 'Trung tâm TGPL Nhà nước tỉnh Lào Cai mở rộng tư vấn miễn phí qua tổng đài và Cổng Dịch vụ công tỉnh',
            summary: 'Người dân thuộc diện chính sách, hộ nghèo và người yếu thế tại các xã, phường có thể kết nối với trợ giúp viên pháp lý để được thụ lý hồ sơ, cử luật sư bào chữa và tư vấn pháp lý miễn phí hoàn toàn.',
            date: '20/03/2026',
        },
        left: [
            { id: 502, thumb: '/thumb1.png', title: 'Lào Cai tăng cường điểm trợ giúp pháp lý lưu động tại các xã vùng cao, biên giới nhằm đưa dịch vụ pháp lý đến gần dân hơn', date: '19/03/2026' },
            { id: 503, thumb: '/thumb2.png', title: 'Trợ giúp pháp lý thành công cho hơn 2.000 lượt người yếu thế trong năm 2025, vượt kế hoạch đề ra', date: '18/03/2026' },
            { id: 504, thumb: '/thumb3.png', title: 'Kết nối luật sư, cộng tác viên tham gia mạng lưới TGPL cộng đồng dưới sự điều phối của Sở Tư pháp tỉnh Lào Cai', date: '17/03/2026' },
        ],
        right: [
            { id: 505, thumb: '/thumb1.png', title: 'Hội thảo nâng cao năng lực trợ giúp viên pháp lý: Kỹ năng tranh tụng và bào chữa trong vụ án hình sự phức tạp', date: '16/03/2026' },
            { id: 506, thumb: '/thumb2.png', title: 'Đẩy mạnh TGPL lưu động tại vùng dân tộc thiểu số xã Tả Van, Trịnh Tường và các xã miền núi Lào Cai', date: '15/03/2026' },
        ],
    },
    'tu-phap': {
        featured: {
            id: 601, thumb: '/thumb2.png',
            title: 'Lào Cai hoàn thành số hóa 100% văn bản quy phạm pháp luật của tỉnh, tích hợp tra cứu thông minh AI',
            summary: 'Cổng Pháp luật tỉnh Lào Cai chính thức vận hành công cụ tra cứu thông minh, hỗ trợ người dân và doanh nghiệp tiếp cận thông tin pháp điển hóa nhanh chóng, chuẩn xác và miễn phí hoàn toàn.',
            date: '19/03/2026',
        },
        left: [
            { id: 602, thumb: '/thumb3.png', title: 'Triển khai đăng ký hộ tịch trực tuyến tại 100% xã, phường trên địa bàn tỉnh Lào Cai trong năm 2026', date: '18/03/2026' },
            { id: 603, thumb: '/thumb1.png', title: 'Lào Cai cải cách mạnh thủ tục hành chính tư pháp: Giảm 40% thời gian giải quyết và 60% hồ sơ giấy tờ', date: '17/03/2026' },
            { id: 604, thumb: '/thumb2.png', title: 'Sở Tư pháp sơ kết thực hiện Đề án chuyển đổi số ngành Tư pháp tỉnh Lào Cai giai đoạn 2022-2025', date: '16/03/2026' },
        ],
        right: [
            { id: 605, thumb: '/thumb3.png', title: 'Kết quả kiểm tra, rà soát văn bản quy phạm pháp luật do HĐND và UBND tỉnh ban hành năm 2025', date: '15/03/2026' },
            { id: 606, thumb: '/thumb1.png', title: 'Tổng kết công tác thi hành án dân sự toàn tỉnh: Vượt chỉ tiêu về số việc và giá trị thi hành xong', date: '14/03/2026' },
        ],
    },
    'van-ban': {
        featured: {
            id: 701, thumb: '/thumb1.png',
            title: 'Chính sách đặc thù phát triển tỉnh Lào Cai: Những điểm mới trong các nghị quyết của HĐND tỉnh giai đoạn 2026 - 2030',
            summary: 'Các nghị quyết mới của HĐND tỉnh tập trung vào ưu đãi đầu tư tại Khu kinh tế cửa khẩu, hỗ trợ du lịch cộng đồng, phát triển nông nghiệp hàng hóa vùng cao và chính sách cho đồng bào dân tộc thiểu số. Đây là nền tảng pháp lý quan trọng để Lào Cai phát triển nhanh, bền vững.',
            date: '18/03/2026',
        },
        left: [
            { id: 702, thumb: '/thumb2.png', title: 'Bảng giá đất trên địa bàn tỉnh Lào Cai áp dụng từ 01/01/2026: Những điều người dân cần biết', date: '17/03/2026' },
            { id: 703, thumb: '/thumb3.png', title: 'Hướng dẫn thi hành các quy định về đăng ký kinh doanh hộ cá thể và doanh nghiệp nhỏ mới theo Luật Doanh nghiệp', date: '16/03/2026' },
            { id: 704, thumb: '/thumb1.png', title: 'Nghị định 100/2019/NĐ-CP: Quy định xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ và đường sắt', date: '15/03/2026' },
        ],
        right: [
            { id: 705, thumb: '/thumb2.png', title: 'Hướng dẫn cấp phép xây dựng nhà ở riêng lẻ tại khu du lịch quốc gia Sa Pa và các đô thị trong tỉnh', date: '14/03/2026' },
            { id: 706, thumb: '/thumb3.png', title: 'Kế hoạch 78/KH-UBND: Triển khai công tác PBGDPL, hòa giải ở cơ sở và xây dựng xã đạt chuẩn tiếp cận pháp luật 2026', date: '13/03/2026' },
        ],
    },
    'nghien-cuu': {
        featured: {
            id: 801, thumb: '/thumb3.png',
            title: 'Nghiên cứu hoàn thiện khung pháp lý phát triển kinh tế cửa khẩu và thương mại biên mậu tỉnh Lào Cai',
            summary: 'Các chuyên gia pháp lý tiếp tục nghiên cứu, đề xuất hoàn thiện chính sách về quản lý khu kinh tế cửa khẩu, logistics và thương mại biên giới, tham khảo kinh nghiệm các địa phương có cửa khẩu và vận dụng vào điều kiện thực tiễn của tỉnh Lào Cai.',
            date: '17/03/2026',
        },
        left: [
            { id: 802, thumb: '/thumb1.png', title: 'Phát triển du lịch bền vững vùng cao: Kinh nghiệm quốc tế và bài học cho Sa Pa', date: '16/03/2026' },
            { id: 803, thumb: '/thumb2.png', title: 'Đánh giá hiệu quả 2 năm thực thi Luật Đất đai 2024: Tháo gỡ điểm nghẽn, vướng mắc trong thực tiễn', date: '15/03/2026' },
            { id: 804, thumb: '/thumb3.png', title: 'Hoàn thiện cơ chế kiểm soát quyền lực nhà nước và phòng, chống tham nhũng trong lĩnh vực đất đai', date: '14/03/2026' },
        ],
        right: [
            { id: 805, thumb: '/thumb1.png', title: 'Trao đổi về kỹ năng lập luận pháp lý trong giải quyết tranh chấp hành chính tại tòa án', date: '13/03/2026' },
            { id: 806, thumb: '/thumb2.png', title: 'Hành lang kinh tế Lào Cai - Hải Phòng: Đề xuất cơ chế liên kết vùng cho tỉnh cửa ngõ biên giới phía Bắc', date: '12/03/2026' },
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
const LaoCaiNewsPage = () => {
    const activeCategory = 'tin-hoat-dong';

    useEffect(() => {
        document.title = 'Tin tức & Sự kiện - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    const activeCat = LAOCAI_NEWS_CATEGORIES.find((c) => c.id === activeCategory);
    const sectionData = NEWS_DATA[activeCategory];

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <LaoCaiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai" className="hover:text-[#2c1b92] transition-colors">
                        Trang chủ Lào Cai
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
                    @keyframes laocaiNewsRotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiNewsRotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes laocaiNewsPulse { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes laocaiNewsSweep { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                {/* Sweep light */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'laocaiNewsSweep 5s cubic-bezier(0.4,0,0.2,1) infinite' }}
                />
                {/* Glow orbs */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiNewsPulse 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiNewsPulse 4.5s ease-in-out infinite 1s' }} />

                {/* Rotating rings */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'laocaiNewsRotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'laocaiNewsRotateCCW 18s linear infinite' }} />

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        Tin tức &amp; Sự kiện Pháp luật Lào Cai
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Cập nhật liên tục chủ trương, chính sách, hoạt động tư pháp và các sự kiện pháp luật nổi bật của tỉnh Lào Cai
                    </p>
                </div>
            </div>

            {/* Sub Navigator */}
            <LaoCaiNewsSubNav />

            {/* Main Content */}
            <main className="flex-grow bg-white">
                <div className="container mx-auto px-4 py-8 max-w-[1286px]">
                    {sectionData && activeCat && (
                        <NewsSection label={activeCat.label} data={sectionData} />
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-4 mb-8" />

                    {/* All other sections below (except current active) */}
                    {LAOCAI_NEWS_CATEGORIES.filter((c) => c.id !== activeCategory).map((cat) => {
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

            <LaoCaiFooter />
        </div>
    );
};

export default LaoCaiNewsPage;

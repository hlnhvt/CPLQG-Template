import React, { useRef, useState } from 'react';
import { Clock, Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import LaoCaiV2NewsSubNav, { LAOCAI_V2_NEWS_CATEGORIES as LAOCAI_NEWS_CATEGORIES } from '../../components/laocaiV2/LaoCaiV2NewsSubNav';

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
/*  Các khối tin theo cấu trúc trang Tin nổi bật của Cổng quốc gia       */
/* ------------------------------------------------------------------ */
const BlockHeading = ({ label }) => (
    <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">
        {label}
    </h2>
);

// Kiểu A (toàn chiều ngang): 1 tin lớn nằm ngang + 3 tin nhỏ phía dưới
const FeaturedGridBlock = ({ label, data }) => {
    const { featured, left, right } = data;
    const subs = [...left, ...right].slice(0, 3);
    return (
        <section className="mb-12">
            <BlockHeading label={label} />
            <Link to={`/news/${featured.id}`} className="flex flex-col md:flex-row items-start gap-6 group border-b border-gray-100 pb-8 mb-8">
                <div className="w-full md:w-[50%] shrink-0">
                    <Image16x9 src={featured.thumb} alt={featured.title} className="rounded-lg shadow-sm border border-gray-100" />
                </div>
                <div className="w-full md:w-[50%] flex flex-col min-w-0">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 group-hover:text-[#0f4c81] mb-3 leading-tight line-clamp-4">
                        {featured.title}
                    </h3>
                    <p className="text-gray-600 text-[14px] leading-relaxed mb-4 line-clamp-2">
                        {featured.summary}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                        <Clock size={14} /> <span>{featured.date}</span>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subs.map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="group flex flex-col">
                        <div className="w-full shrink-0 mb-3">
                            <Image16x9 src={item.thumb} alt={item.title} className="rounded-lg" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h4 className="font-bold text-[14px] text-gray-800 group-hover:text-[#0f4c81] line-clamp-3 leading-snug mb-2">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                <Clock size={12} /> <span>{item.date}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

// Kiểu B (một nửa chiều ngang): 1 tin nổi bật + 2 tin dạng danh sách
const CompactListColumn = ({ label, data }) => {
    const { featured, left } = data;
    return (
        <div>
            <BlockHeading label={label} />
            <Link to={`/news/${featured.id}`} className="flex items-start gap-4 group mb-6 border-b border-gray-100 pb-6">
                <div className="w-[50%] shrink-0">
                    <Image16x9 src={featured.thumb} alt={featured.title} className="rounded" />
                </div>
                <div className="w-[50%] flex flex-col min-w-0">
                    <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">
                        {featured.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                        <Clock size={12} /> <span>{featured.date}</span>
                    </div>
                </div>
            </Link>
            <div className="space-y-4">
                {left.slice(0, 2).map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="w-1/3 shrink-0">
                            <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                        </div>
                        <div className="w-2/3 flex flex-col min-w-0">
                            <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                <Clock size={12} /> <span>{item.date}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Xếp các chuyên mục luân phiên: A (1 chuyên mục) -> B (2 chuyên mục cạnh nhau) -> A -> B ...
const buildAlternatingRows = (categories) => {
    const rows = [];
    let i = 0;
    let useFull = true;
    while (i < categories.length) {
        if (useFull || i === categories.length - 1) {
            rows.push({ type: 'full', items: [categories[i]] });
            i += 1;
        } else {
            rows.push({ type: 'pair', items: [categories[i], categories[i + 1]] });
            i += 2;
        }
        useFull = !useFull;
    }
    return rows;
};

/* ------------------------------------------------------------------ */
/*  Page                                                                  */
/* ------------------------------------------------------------------ */
const LaoCaiV2NewsPage = () => {
    const activeCategory = 'tin-hoat-dong';

    useEffect(() => {
        document.title = 'Tin tức & Sự kiện - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    const activeCat = LAOCAI_NEWS_CATEGORIES.find((c) => c.id === activeCategory);
    const sectionData = NEWS_DATA[activeCategory];

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <LaoCaiV2Header />

            {/* Sub Navigator */}
            <LaoCaiV2NewsSubNav />

            {/* Banner tĩnh, rộng tối đa 1254px (không chạy hiệu ứng) */}
            <div className="px-4 pt-6">
                <div className="relative overflow-hidden w-full max-w-[1254px] mx-auto rounded-2xl text-white py-8 sm:py-10 px-6 sm:px-10 bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border border-indigo-400/30 shadow-md">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                    <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/25 blur-3xl pointer-events-none" />
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/25 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                            Tin tức &amp; Sự kiện Pháp luật Lào Cai
                        </h1>
                        <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                        <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                            Cập nhật liên tục chủ trương, chính sách, hoạt động tư pháp và các sự kiện pháp luật nổi bật của tỉnh Lào Cai
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow bg-white">
                <div className="container mx-auto px-4 py-8 max-w-[1286px]">
                    {sectionData && activeCat && (
                        <NewsSection label={activeCat.label} data={sectionData} />
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-4 mb-8" />

                    {/* Các chuyên mục còn lại: lặp luân phiên theo cấu trúc trang Tin nổi bật của Cổng quốc gia */}
                    {buildAlternatingRows(
                        LAOCAI_NEWS_CATEGORIES.filter((c) => c.id !== activeCategory && NEWS_DATA[c.id])
                    ).map((row) => (
                        row.type === 'full' ? (
                            <FeaturedGridBlock key={row.items[0].id} label={row.items[0].label} data={NEWS_DATA[row.items[0].id]} />
                        ) : (
                            <div key={row.items.map((c) => c.id).join('-')} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                                {row.items.map((cat) => (
                                    <CompactListColumn key={cat.id} label={cat.label} data={NEWS_DATA[cat.id]} />
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </main>

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2NewsPage;

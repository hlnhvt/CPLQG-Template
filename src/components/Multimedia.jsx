import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Khối Infographic và Video xếp dọc, mỗi khối: 1 thẻ lớn bên trái + 4 thẻ nhỏ bên phải
// (bố cục theo trang chủ uat.phapluat.gov.vn)
const INFOGRAPHICS = [
    {
        id: 1,
        title: '4 mức thu tiền sử dụng biển để nuôi trồng thủy sản, xây dựng cảng cá',
        summary: 'Ngày 27/03/2026, Bộ trưởng Bộ Nông nghiệp và Môi trường ban hành Thông tư số 18/2026/TT-BNNMT quy định mức thu tiền sử dụng khu vực biển cụ thể thuộc thẩm quyền giao khu vực biển của Bộ trưởng Bộ Nông nghiệp và Môi trường, góp phần hoàn thiện cơ sở pháp lý về xác định mức thu.',
        image: '/images/infographic/thumb_1.png',
        to: '/infographic/infographic-1',
        date: '08/10/2026',
        time: '10:46'
    },
    {
        id: 2,
        title: 'Cá nhân, hộ kinh doanh được hỗ trợ 100% chi phí đào tạo quản trị doanh nghiệp',
        summary: 'Ngày 15/01/2026, Chính phủ ban hành Nghị định số 20/2026/NĐ-CP quy định chi tiết về hỗ trợ đào tạo quản trị doanh nghiệp.',
        image: '/thumbnails/land_housing_illustration.png',
        to: '/infographic/infographic-2',
        date: '08/10/2026',
        time: '09:42'
    },
    {
        id: 3,
        title: '4 trường hợp chấm dứt hiệu lực mã định danh hóa chất cần kiểm soát đặc biệt',
        summary: 'Ngày 04/09/2026, Bộ trưởng Bộ Công an ban hành Thông tư số 154/2026/TT-BCA quy định về mã định danh hóa chất.',
        image: '/images/infographic/thumb_2.png',
        to: '/infographic/infographic-3',
        date: '08/10/2026',
        time: '09:38'
    },
    {
        id: 4,
        title: 'Các địa bàn tại vùng khó khăn được hỗ trợ tối đa 100% chi phí khuyến nông',
        summary: 'Nghị định 268/2026/NĐ-CP của Chính phủ về khuyến nông chính thức có hiệu lực thi hành.',
        image: '/images/infographic/thumb_3.png',
        to: '/infographic/infographic-4',
        date: '08/10/2026',
        time: '09:36'
    },
    {
        id: 5,
        title: 'Hướng dẫn khen thưởng tập thể, cá nhân có thành tích xuất sắc trong công tác xây dựng và thi hành pháp luật',
        summary: 'Để kịp thời biểu dương các tập thể, cá nhân có thành tích xuất sắc trong công tác xây dựng và thi hành pháp luật.',
        image: '/thumbnails/labor_insurance_illustration.png',
        to: '/infographic/infographic-5',
        date: '06/10/2026',
        time: '21:35'
    }
];

const VIDEOS = [
    {
        id: 1,
        title: 'Hà Nội: Khơi thông điểm nghẽn để chính sách thực sự đến với doanh nghiệp',
        summary: 'Trong năm 2026, Hà Nội đã hình thành tương đối đồng bộ khung chính sách về khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số. Sau Nghị quyết số 57-NQ/TW của Bộ Chính trị, Trung ương đã ban hành nhiều luật, nhiều cơ chế mới; Hà Nội cũng đã có Luật Thủ đô và những cơ chế đặc thù.',
        image: '/thumbnails/forum_dat_dai.png',
        to: '/video/1',
        date: '06/10/2026',
        time: '19:02'
    },
    {
        id: 2,
        title: 'Hà Nội: Tăng cường tuyên truyền pháp luật về phòng, chống mua bán người cho học sinh',
        summary: 'Mặc dù những nỗ lực phòng chống lại tội phạm mua bán người đã được đẩy mạnh, tình hình vẫn diễn biến phức tạp.',
        image: '/thumb3.png',
        to: '/video/2',
        date: '30/09/2026',
        time: '15:08'
    },
    {
        id: 3,
        title: 'Dự án Luật Cấp, thoát nước (sửa đổi): Hướng tới phát triển hệ thống đồng bộ, liên vùng',
        summary: '(Cổng PLQG) - Ngày 29/9, tại Hà Nội, Thứ trưởng Bộ Tư pháp chủ trì cuộc họp thẩm định dự án luật.',
        image: '/thumb1.png',
        to: '/video/3',
        date: '30/09/2026',
        time: '11:10'
    },
    {
        id: 4,
        title: 'Đưa pháp luật đến gần hơn với cuộc sống của người dân',
        summary: '(Cổng PLQG) - Thời gian qua Sở Tư pháp thành phố Bắc Ninh đã tổ chức các buổi tuyên truyền pháp luật tại cơ sở.',
        image: '/thumbnails/toadan_phapluat.png',
        to: '/video/4',
        date: '30/09/2026',
        time: '10:27'
    },
    {
        id: 5,
        title: 'Tháo gỡ điểm nghẽn, khơi thông nguồn lực từ hoàn thiện thể chế',
        summary: '(Cổng PLQG) - Sáng 28/9, Tổng Bí thư, Chủ tịch nước Tô Lâm, Trưởng Ban Chỉ đạo chủ trì phiên họp.',
        image: '/thumb2.png',
        to: '/video/5',
        date: '28/09/2026',
        time: '21:27'
    }
];

const DateTime = ({ date, time }) => (
    <div className="flex items-center gap-3 text-[12.5px] text-gray-500">
        <span className="flex items-center gap-1.5"><Calendar size={14} /> {date}</span>
        <span className="flex items-center gap-1.5"><Clock size={14} /> {time}</span>
    </div>
);

const PlayBadge = ({ small }) => (
    <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
        <span className={`bg-red-600 text-white rounded-full shadow-lg ring-2 ring-white/30 flex items-center justify-center ${small ? 'w-7 h-7' : 'w-14 h-14'} group-hover:scale-110 transition-transform`}>
            <span className={`w-0 h-0 border-y-transparent border-l-white ml-0.5 ${small ? 'border-y-[5px] border-l-[8px]' : 'border-y-[9px] border-l-[15px]'}`} />
        </span>
    </span>
);

const MediaBlock = ({ title, to, items, isVideo }) => {
    const [featured, ...rest] = items;
    return (
        <div>
            <Link to={to} className="inline-block mb-4">
                <h2 className="text-[22px] md:text-[26px] font-bold text-[#1e3a8a] hover:text-blue-700 transition-colors">{title}</h2>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Thẻ lớn */}
                <Link to={featured.to} className="group bg-white rounded-xl border border-gray-200 shadow-[0_4px_16px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-shadow">
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                        <img src={featured.image} alt={featured.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                        {isVideo && <PlayBadge />}
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-[#1e3a8a] text-[17px] md:text-[19px] leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">{featured.title}</h3>
                        <p className="text-gray-500 text-[13.5px] leading-relaxed line-clamp-3 mt-2">{featured.summary}</p>
                        <div className="mt-2.5"><DateTime date={featured.date} time={featured.time} /></div>
                    </div>
                </Link>

                {/* 4 thẻ nhỏ */}
                <div className="flex flex-col gap-4">
                    {rest.map((item) => (
                        <Link key={item.id} to={item.to} className="group bg-white rounded-xl border border-gray-200 shadow-[0_4px_16px_rgba(15,23,42,0.08)] overflow-hidden flex hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-shadow">
                            <div className="relative w-[38%] max-w-[170px] shrink-0 aspect-[16/10] overflow-hidden bg-gray-100">
                                <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {isVideo && <PlayBadge small />}
                            </div>
                            <div className="flex-1 min-w-0 px-3.5 py-2.5 flex flex-col justify-center">
                                <h4 className="font-bold text-[#1e3a8a] text-[14px] md:text-[15px] leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                                <p className="text-gray-500 text-[12.5px] leading-relaxed line-clamp-1 mt-1">{item.summary}</p>
                                <div className="mt-1.5"><DateTime date={item.date} time={item.time} /></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Multimedia = () => (
    <section className="pt-4 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-[1504px] space-y-10">
            <MediaBlock title="Infographic" to="/infographic" items={INFOGRAPHICS} />
            <MediaBlock title="Video" to="/video" items={VIDEOS} isVideo />
        </div>
    </section>
);

export default Multimedia;

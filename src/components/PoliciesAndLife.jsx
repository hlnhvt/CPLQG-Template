import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hai khối cạnh nhau như trang chủ uat.phapluat.gov.vn:
// "Chính sách & Cuộc sống" và "Xây dựng văn hoá thượng tôn pháp luật"
const COLUMNS = [
    {
        title: 'Chính sách & Cuộc sống',
        to: '/tin-tuc',
        items: [
            {
                id: 1,
                title: 'Hướng dẫn thi đua, khen thưởng trong Quân đội nhân dân',
                summary: 'Bộ trưởng Bộ Quốc phòng ban hành Thông tư số 155/2026/TT-BQP ngày 01/10/2026 quy định và hướng dẫn công tác thi đua, khen thưởng trong Quân đội nhân dân.',
                date: '09/10/2026',
                time: '06:41',
                image: '/thumb2.png'
            },
            {
                id: 2,
                title: 'Sửa đổi một số quy định về Cơ chế thử nghiệm có kiểm soát trong lĩnh vực ngân hàng',
                summary: 'Thay mặt Chính phủ, Phó Thủ tướng Nguyễn Văn Thắng ký ban hành Nghị định số 382/2026/NĐ-CP ngày 6/10/2026 sửa đổi một số quy định về cơ chế thử nghiệm có kiểm soát.',
                date: '09/10/2026',
                time: '06:39',
                image: '/thumbnails/currency_bank_illustration.png'
            }
        ]
    },
    {
        title: 'Xây dựng văn hoá thượng tôn pháp luật',
        to: '/tin-tuc',
        items: [
            {
                id: 3,
                title: 'Đưa pháp luật đến gần hơn người dân từ những Tổ công nghệ số cộng đồng',
                summary: '(Cổng PLQG) - Không chỉ hỗ trợ người dân tiếp cận công nghệ, phát triển sinh kế, các Tổ công nghệ số cộng đồng tại cơ sở còn là cầu nối đưa pháp luật đến với người dân.',
                date: '08/10/2026',
                time: '08:11',
                image: '/thumb3.png'
            },
            {
                id: 4,
                title: 'Thượng tôn pháp luật để sáng tạo điện ảnh trên không gian mạng phát triển lành mạnh',
                summary: '(Cổng PLQG) - Sự phát triển của các nền tảng số mở ra nhiều cơ hội sáng tạo và phổ biến phim, song cũng đặt ra yêu cầu tuân thủ pháp luật.',
                date: '08/10/2026',
                time: '08:07',
                image: '/thumb1.png'
            }
        ]
    }
];

const NewsRow = ({ item }) => (
    <Link to={`/news/${item.id}`} className="group flex gap-4 items-start">
        <div className="w-[38%] max-w-[262px] shrink-0 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
            <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#111827] text-[16px] md:text-[18px] leading-snug line-clamp-2 group-hover:text-[#1e3a8a] transition-colors">
                {item.title}
            </h3>
            <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed line-clamp-2 mt-1">
                {item.summary}
            </p>
            <div className="flex items-center gap-3 text-[12.5px] text-gray-500 mt-1.5">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {item.time}</span>
            </div>
        </div>
    </Link>
);

const PoliciesAndLife = () => (
    <section className="pt-7 pb-8 bg-white">
        <div className="container mx-auto px-4 max-w-[1504px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                {COLUMNS.map((col) => (
                    <div key={col.title}>
                        <Link to={col.to} className="inline-block mb-6">
                            <h2 className="text-[22px] md:text-[28px] font-bold text-[#1e3a8a] hover:text-blue-700 transition-colors">
                                {col.title}
                            </h2>
                        </Link>
                        <div className="flex flex-col gap-8">
                            {col.items.map((item) => <NewsRow key={item.id} item={item} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default PoliciesAndLife;

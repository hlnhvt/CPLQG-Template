import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliciesAndLife = () => {
    const featured = {
        id: 1,
        title: 'Tổ chức Diễn đàn Thưởng đỉnh về Pháp luật và Phát triển nhân dịp Kỷ niệm Ngày Pháp luật Việt Nam',
        description: 'Diễn đàn nhằm thảo luận các giải pháp hoàn thiện hệ thống pháp luật, tạo điều kiện thuận lợi cho sự phát triển kinh tế - xã hội, phát huy tinh thần thượng tôn pháp luật.',
        date: 'Ngày 28/10/2025 | 10:30',
        image: '/thumb1.png'
    };

    const list = [
        {
            id: 2,
            title: 'Hội nghị phổ biến, quán triệt các đạo luật do Bộ Công an tham mưu xây dựng',
            description: 'Quán triệt sâu rộng các nội dung mới, quan trọng của các đạo luật đến toàn thể cán bộ, chiến sĩ theo định hướng mới.',
            date: 'Ngày 27/10/2025 | 08:00',
            image: '/thumb2.png'
        },
        {
            id: 3,
            title: 'Sửa luật Đất đai: Đẩy nhanh quá trình phục hồi của thị trường bất động sản',
            description: 'Những điểm mới trong Luật Đất đai sửa đổi được kỳ vọng sẽ gỡ khó và thúc đẩy thị trường bất động sản phát triển an toàn, lành mạnh.',
            date: 'Ngày 26/10/2025 | 14:15',
            image: '/thumb3.png'
        },
        {
            id: 4,
            title: 'Hoàn thiện thể chế xử lý tài sản kê biên, tài sản bảo đảm trong các vụ án',
            description: 'Tập trung giải quyết những vướng mắc, bất cập trong thực tiễn xử lý tài sản trong các vụ án kinh tế, tham nhũng trọng điểm.',
            date: 'Ngày 25/10/2025 | 09:30',
            image: '/thumb1.png'
        },
        {
            id: 5,
            title: 'Tăng cường ứng dụng công nghệ thông tin trong phổ biến giáo dục pháp luật',
            description: 'Đẩy mạnh chuyển đổi số đem lại hiệu quả cao trong công tác tuyên truyền, đưa pháp luật vào đời sống sinh hoạt của người dân.',
            date: 'Ngày 24/10/2025 | 16:20',
            image: '/thumb2.png'
        }
    ];

    return (
        <section className="py-8 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-[1504px]">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
                    <div className="flex items-center">
                        <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81]">
                            Chính sách & Cuộc sống
                        </h2>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Featured Item (Left) */}
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition hover:shadow-md h-full flex flex-col">
                        <div className="relative w-full aspect-video overflow-hidden shrink-0 group">
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                        <div className="p-4 md:p-5 flex flex-col flex-grow bg-white z-10 border-t border-gray-100 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
                            <Link to={`/news/${featured.id}`}>
                                <h3 className="font-bold text-[#0f4c81] text-lg md:text-xl line-clamp-2 leading-tight mb-3 hover:text-blue-700 transition">
                                    {featured.title}
                                </h3>
                            </Link>
                            <p className="text-gray-600 text-[13px] md:text-[14px] line-clamp-2 md:line-clamp-3 leading-relaxed mb-4">
                                {featured.description}
                            </p>
                            <div className="flex items-center gap-4 text-[11px] md:text-[12px] text-gray-500 mt-auto pt-2">
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-md px-3 py-1.5">
                                    <Clock size={14} className="text-[#0f4c81]" /> <span className="font-medium">{featured.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List Items (Right) */}
                    <div className="flex flex-col gap-3 h-full">
                        {list.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition hover:shadow-md flex flex-row p-2.5 items-center gap-3.5 group flex-1">
                                <div className="w-[160px] md:w-[175px] shrink-0 relative aspect-video overflow-hidden rounded shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0 flex-grow py-0.5">
                                    <Link to={`/news/${item.id}`}>
                                        <h4 className="font-bold text-[#0f4c81] text-[13px] md:text-[14px] line-clamp-2 leading-snug mb-1.5 hover:text-blue-700 transition">
                                            {item.title}
                                        </h4>
                                    </Link>
                                    <p className="text-gray-600 text-[11px] md:text-[12px] line-clamp-1 md:line-clamp-2 leading-relaxed mb-2">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-[10px] md:text-[11px] text-gray-500 mt-auto rounded">
                                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded px-2 py-0.5">
                                            <Clock size={11} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PoliciesAndLife;

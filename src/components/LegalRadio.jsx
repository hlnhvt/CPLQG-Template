import React from 'react';
import { PlayCircle } from 'lucide-react';

const LegalRadio = () => {
    const radioItems = [
        {
            img: '/thumb1.png',
            title: 'Hỗ trợ pháp lý cho Doanh nghiệp: Kỷ niệm Ngày truyền thống ngành Tư pháp',
            desc: 'Ngày 25/8, Bộ Tư pháp tổ chức Tọa đàm Hỗ trợ pháp lý cho doanh nghiệp - Kỷ niệm 78 năm Ngày truyền thống ngành Tư pháp...',
            date: 'Thứ Năm, 28/08/2025'
        },
        {
            img: '/thumb2.png',
            title: 'Đẩy mạnh cải cách thủ tục hành chính, tạo thuận lợi tối đa cho người dân',
            desc: 'Chính phủ đang quyết liệt chỉ đạo các bộ, ngành, địa phương rà soát, cắt giảm, đơn giản hóa các thủ tục hành chính...',
            date: 'Thứ Tư, 27/08/2025'
        },
        {
            img: '/thumb1.png',
            title: 'Sáng kiến Hội đồng phối hợp phổ biến giáo dục pháp luật năm 2025',
            desc: 'Hội đồng phối hợp phổ biến, giáo dục pháp luật trung ương vừa ban hành kế hoạch triển khai các mô hình mới...',
            date: 'Thứ Ba, 26/08/2025'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 inline-block mb-8 uppercase tracking-wide">
                Radio pháp luật
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {radioItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">
                        <div className="relative aspect-video bg-gray-200 cursor-pointer group overflow-hidden">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                                <PlayCircle className="text-white w-14 h-14 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition drop-shadow-lg" />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-between h-[180px]">
                            <div>
                                <h4 className="font-bold text-primary hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-2">{item.desc}</p>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-2 border-t pt-2">
                                <span>{item.date}</span>
                                <button className="flex items-center gap-1 text-blue-600 font-medium hover:underline bg-blue-50 px-2 py-1 rounded">
                                    <PlayCircle size={14} /> Nghe ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <button className="border border-primary text-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition font-medium">
                    Xem tất cả video / radio
                </button>
            </div>
        </div>
    );
};

export default LegalRadio;

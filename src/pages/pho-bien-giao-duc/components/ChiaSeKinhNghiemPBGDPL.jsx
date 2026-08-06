import React, { useState } from 'react';
import { ChevronRight, FileText, BarChart2, Newspaper, BookOpen, Library, Lightbulb, Calendar, ArrowRight, Users, MapPin, ArrowLeft } from 'lucide-react';
import ChiaSeKinhNghiemList from './ChiaSeKinhNghiemList';

export default function ChiaSeKinhNghiemPBGDPL() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const title = "Chia sẻ kinh nghiệm PBGDPL";

    const img1 = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300';
    const img2 = 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400&h=300';
    const img3 = 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=400&h=300';
    const img4 = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=300';

    const generateNewsItem = (id, title, date, excerpt, image) => ({ id, title, date, excerpt, image });

    const doiTuongDacThuData = [
        generateNewsItem(1, 'Kinh nghiệm tuyên truyền pháp luật cho thanh thiếu niên vi phạm pháp luật', '20/10/2023 09:30', 'Bài học từ các mô hình cảm hóa, giáo dục và giúp đỡ thanh thiếu niên tái hòa nhập cộng đồng.', img1),
        generateNewsItem(2, 'Giải pháp PBGDPL cho phạm nhân tại các trại giam', '15/08/2023 14:15', 'Những cách làm sáng tạo trong việc tổ chức các lớp học pháp luật, tư vấn tâm lý cho phạm nhân.', img2),
        generateNewsItem(3, 'Tuyên truyền pháp luật phòng chống ma túy cho người nghiện ma túy', '10/05/2023 08:00', 'Mô hình tư vấn, hỗ trợ pháp lý và các chính sách cai nghiện tự nguyện tại cộng đồng.', img3),
        generateNewsItem(4, 'Phổ biến pháp luật về quyền của người khuyết tật', '05/04/2023 10:45', 'Kinh nghiệm phối hợp với các tổ chức xã hội để đưa chính sách hỗ trợ đến tận tay người khuyết tật.', img4),
    ];

    const diaBanDacThuData = [
        generateNewsItem(1, 'Đẩy mạnh tuyên truyền pháp luật tại các khu công nghiệp, khu chế xuất', '25/11/2023 15:30', 'Kinh nghiệm phối hợp với liên đoàn lao động và doanh nghiệp để PBGDPL cho công nhân.', img4),
        generateNewsItem(2, 'Phổ biến pháp luật về biển đảo cho ngư dân ven biển', '18/11/2023 09:00', 'Cách thức tổ chức các buổi sinh hoạt chuyên đề trực tiếp trên tàu cá và tại cảng cá.', img3),
        generateNewsItem(3, 'Tuyên truyền pháp luật tại vùng sâu, vùng xa, vùng đặc biệt khó khăn', '10/11/2023 14:00', 'Phát huy vai trò của tổ hòa giải cơ sở và các già làng, trưởng bản trong công tác PBGDPL.', img2),
        generateNewsItem(4, 'Mô hình tổ tư vấn pháp luật tại các khu dân cư đô thị đông đúc', '01/11/2023 08:30', 'Giải pháp xử lý các vấn đề pháp lý phát sinh phổ biến như tranh chấp đất đai, trật tự xây dựng.', img1),
    ];

    const bienGioiData = [
        generateNewsItem(1, 'Tuyên truyền quy chế biên giới cho cư dân hai bên biên giới Việt - Lào', '01/11/2023 10:00', 'Phối hợp với lực lượng bộ đội biên phòng tổ chức các buổi tuyên truyền bằng cả hai ngôn ngữ.', img2),
        generateNewsItem(2, 'Ngăn chặn tình trạng xuất nhập cảnh trái phép tuyến biên giới Tây Nam', '22/10/2023 15:45', 'Kinh nghiệm từ các tỉnh có chung đường biên giới với Campuchia trong công tác đấu tranh phòng chống tội phạm.', img1),
        generateNewsItem(3, 'Mô hình kết nghĩa cụm dân cư hai bên biên giới', '15/09/2023 08:15', 'Gắn kết tình quân dân, thắt chặt tình đoàn kết hữu nghị thông qua các hoạt động giao lưu văn hóa và pháp luật.', img4),
        generateNewsItem(4, 'Phổ biến pháp luật về phòng chống buôn lậu, gian lận thương mại', '10/08/2023 14:30', 'Nâng cao ý thức cảnh giác cho người dân, không tiếp tay cho các đường dây buôn lậu qua biên giới.', img3),
    ];

    const SectionHeader = ({ title, icon, colorClass, onViewAll }) => (
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                    {icon}
                </div>
                <h2 className="text-[17px] font-bold text-gray-800">{title}</h2>
            </div>
            {onViewAll && (
                <button onClick={() => onViewAll(title)} className="text-[13px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                    Xem tất cả <ArrowRight size={14} />
                </button>
            )}
        </div>
    );

    const NewsGrid = ({ data }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data.map(news => (
                <div key={news.id} className="flex flex-col group cursor-pointer border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all">
                    <div className="h-40 overflow-hidden relative">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-white">
                        <h3 className="font-bold text-[15px] text-gray-800 leading-snug mb-2 group-hover:text-blue-600 line-clamp-2">{news.title}</h3>
                        <p className="text-[13px] text-gray-500 line-clamp-3 mb-3">{news.excerpt}</p>
                        <div className="mt-auto flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                            <Calendar size={12} /> {news.date}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (selectedCategory) {
        return (
            <ChiaSeKinhNghiemList 
                category={selectedCategory} 
                onBack={() => setSelectedCategory(null)} 
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header / Breadcrumbs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                    <span className="text-blue-600 cursor-pointer hover:underline">Trang chủ</span>
                    <ChevronRight size={14} />
                    <span className="text-blue-600 cursor-pointer hover:underline">Phổ biến giáo dục pháp luật</span>
                    <ChevronRight size={14} />
                    <span>{title}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2b49] tracking-tight">{title}</h1>
            </div>

            {/* 1. Chia sẻ kinh nghiệm PBGDPL cho đối tượng đặc thù */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Chia sẻ kinh nghiệm PBGDPL cho đối tượng đặc thù" 
                    icon={<Users size={16} />} 
                    colorClass="bg-purple-100 text-purple-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={doiTuongDacThuData} />
            </div>

            {/* 2. Chia sẻ kinh nghiệm PBGDPL ở một số địa bàn đặc thù */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Chia sẻ kinh nghiệm PBGDPL ở một số địa bàn đặc thù" 
                    icon={<MapPin size={16} />} 
                    colorClass="bg-blue-100 text-blue-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={diaBanDacThuData} />
            </div>

            {/* 3. Chia sẻ kinh nghiệm PBGDPL trên địa bàn biên giới Việt – Lào, Campuchia */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Chia sẻ kinh nghiệm PBGDPL trên địa bàn biên giới Việt – Lào, Campuchia" 
                    icon={<Lightbulb size={16} />} 
                    colorClass="bg-emerald-100 text-emerald-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={bienGioiData} />
            </div>
        </div>
    );
}

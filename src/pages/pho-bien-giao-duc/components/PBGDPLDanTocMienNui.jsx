import React, { useState } from 'react';
import { ChevronRight, FileText, BarChart2, Newspaper, BookOpen, Library, Lightbulb, Calendar, ArrowRight, Users, MapPin, ArrowLeft } from 'lucide-react';
import PBGDPLDanTocMienNuiList from './PBGDPLDanTocMienNuiList';

export default function PBGDPLDanTocMienNui() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const title = "PBGDPL vùng đồng bào dân tộc thiểu số và miền núi";

    // Reusable dummy image URLs
    const img1 = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300';
    const img2 = 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400&h=300';
    const img3 = 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=400&h=300';
    const img4 = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=300';

    const generateNewsItem = (id, title, date, excerpt, image) => ({ id, title, date, excerpt, image });

    const statsData = [
        generateNewsItem(1, 'Thống kê kết quả phổ biến giáo dục pháp luật quý III năm 2023', '20/10/2023 14:00', 'Báo cáo chi tiết về số lượng các đợt tuyên truyền, người tham gia tại các địa bàn vùng sâu vùng xa.', img1),
        generateNewsItem(2, 'Tỷ lệ xã, phường đạt chuẩn tiếp cận pháp luật tại khu vực miền núi', '15/09/2023 09:30', 'Phân tích số liệu và xu hướng biến động số lượng cấp xã đạt chuẩn tiếp cận pháp luật qua các năm.', img2),
        generateNewsItem(3, 'Báo cáo hiệu quả các mô hình hòa giải ở cơ sở vùng đồng bào DTTS', '10/08/2023 15:15', 'Tổng kết số liệu các vụ việc được hòa giải thành công thông qua vai trò của già làng, trưởng bản.', img3),
        generateNewsItem(4, 'Tình hình cấp phát tài liệu pháp luật miễn phí cho người dân nông thôn', '05/07/2023 10:45', 'Số liệu thống kê lượng tài liệu, tờ rơi, sách pháp luật được đưa đến tay đồng bào các dân tộc.', img4),
    ];

    const vanBanData = [
        generateNewsItem(1, 'Thông tư hướng dẫn công tác PBGDPL vùng đồng bào dân tộc thiểu số', '20/10/2023 09:30', 'Quy định chi tiết các biện pháp, hình thức PBGDPL phù hợp với phong tục tập quán.', img1),
        generateNewsItem(2, 'Kế hoạch triển khai Đề án PBGDPL cho người dân nông thôn và đồng bào DTTS', '15/08/2023 14:15', 'Tập trung nguồn lực đẩy mạnh công tác phổ biến giáo dục pháp luật tại các xã đặc biệt khó khăn.', img2),
        generateNewsItem(3, 'Quyết định phê duyệt Chương trình mục tiêu quốc gia phát triển KTXH vùng DTTS', '10/05/2023 08:00', 'Tạo đà phát triển kinh tế, đi đôi với nâng cao ý thức chấp hành pháp luật cho bà con.', img3),
        generateNewsItem(4, 'Nghị quyết về đẩy mạnh phát triển nguồn nhân lực các dân tộc thiểu số', '05/04/2023 10:45', 'Đẩy mạnh tuyên truyền pháp luật và đào tạo kỹ năng cho cán bộ làm công tác phổ biến pháp luật cơ sở.', img4),
    ];

    const newsData = [
        generateNewsItem(1, 'Đẩy mạnh tuyên truyền pháp luật về hôn nhân gia đình cho đồng bào H\'Mông', '25/11/2023 15:30', 'Nhiều hoạt động thiết thực đã được triển khai nhằm nâng cao nhận thức, giảm thiểu tình trạng tảo hôn.', img1),
        generateNewsItem(2, 'Bồi dưỡng kỹ năng PBGDPL cho già làng, trưởng bản tại Tây Nguyên', '18/11/2023 09:00', 'Phát huy vai trò của người có uy tín trong cộng đồng để đưa pháp luật đến gần hơn với người dân.', img2),
        generateNewsItem(3, 'Phiên tòa giả định - Cách làm sáng tạo trong PBGDPL học đường miền núi', '10/11/2023 14:00', 'Thu hút sự quan tâm và tham gia tích cực của học sinh dân tộc nội trú.', img3),
        generateNewsItem(4, 'Đưa luật Đất đai đến gần hơn với người dân vùng sâu vùng xa', '01/11/2023 08:30', 'Tổ chức các buổi sinh hoạt chuyên đề, giải đáp thắc mắc về tranh chấp đất đai tại cơ sở.', img4),
    ];

    const researchData = [
        generateNewsItem(1, 'Giải pháp nâng cao hiệu quả tuyên truyền pháp luật cho đồng bào dân tộc thiểu số', '01/11/2023 10:00', 'Phân tích thực trạng và đề xuất các giải pháp căn cơ nhằm đổi mới phương pháp truyền thông.', img4),
        generateNewsItem(2, 'Vai trò của luật tục trong việc duy trì trật tự cộng đồng tại các làng bản Tây Nguyên', '22/10/2023 15:45', 'Đánh giá sự tác động qua lại giữa luật tục và pháp luật hiện hành.', img1),
        generateNewsItem(3, 'Đẩy mạnh ứng dụng công nghệ thông tin trong PBGDPL vùng sâu vùng xa', '15/09/2023 08:15', 'Kinh nghiệm từ các địa phương triển khai hiệu quả mô hình PBGDPL qua nền tảng trực tuyến.', img2),
        generateNewsItem(4, 'Đào tạo báo cáo viên pháp luật người dân tộc thiểu số: Thực trạng và kiến nghị', '10/08/2023 14:30', 'Phát huy hiệu quả của lực lượng nòng cốt là người địa phương am hiểu phong tục tập quán.', img3),
    ];

    const docData = [
        generateNewsItem(1, 'Sổ tay nghiệp vụ hòa giải ở cơ sở vùng đồng bào dân tộc thiểu số', '05/11/2023 09:00', 'Tài liệu hướng dẫn chi tiết kỹ năng xử lý các tình huống hòa giải thường gặp.', img3),
        generateNewsItem(2, 'Tài liệu hỏi đáp pháp luật về bảo vệ rừng và phòng cháy chữa cháy rừng', '20/10/2023 16:20', 'Biên soạn dưới dạng hỏi - đáp dễ hiểu, có minh họa bằng hình ảnh.', img4),
        generateNewsItem(3, 'Tờ gấp tuyên truyền phòng, chống ma túy bằng tiếng dân tộc', '12/09/2023 10:30', 'Thiết kế trực quan, in song ngữ Việt và các tiếng dân tộc phổ biến.', img1),
        generateNewsItem(4, 'Infographic: Những điều cần biết về Luật Trẻ em 2016', '01/09/2023 08:00', 'Tóm tắt trực quan các quyền và bổn phận của trẻ em, phù hợp cho học sinh nội trú.', img2),
    ];

    const modelsData = [
        generateNewsItem(1, 'Câu lạc bộ pháp luật "Không tảo hôn"', '01/10/2023 14:00', 'Mô hình sinh hoạt định kỳ thu hút đông đảo thanh thiếu niên tham gia tại Hà Giang.', img2),
        generateNewsItem(2, 'Tủ sách pháp luật tại nhà Rông', '15/09/2023 09:45', 'Không gian văn hóa kết hợp tuyên truyền pháp luật hiệu quả ở Kon Tum.', img3),
        generateNewsItem(3, 'Tuyên truyền pháp luật bằng tiếng bản địa trên loa phát thanh', '22/08/2023 16:00', 'Cách làm tiết kiệm nhưng mang lại sức lan tỏa lớn tại các bản vùng cao Lào Cai.', img4),
        generateNewsItem(4, 'Tổ hòa giải "Già làng 5 tốt"', '05/08/2023 10:15', 'Phát huy tiếng nói của già làng, trưởng bản trong hòa giải tranh chấp ở Đắk Lắk.', img1),
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

    const NewsList = ({ data }) => (
        <div className="flex flex-col gap-4">
            {data.map(news => (
                <div key={news.id} className="flex gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="w-32 h-24 shrink-0 overflow-hidden rounded-lg">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-1 bg-white">
                        <h3 className="font-bold text-[14px] text-gray-800 leading-snug mb-1.5 group-hover:text-blue-600 line-clamp-2">{news.title}</h3>
                        <p className="text-[12px] text-gray-500 line-clamp-2 mb-1.5">{news.excerpt}</p>
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
            <PBGDPLDanTocMienNuiList 
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
                    <span className="text-blue-600 cursor-pointer">Trang chủ</span>
                    <ChevronRight size={14} />
                    <span className="text-blue-600 cursor-pointer">Phổ biến giáo dục pháp luật</span>
                    <ChevronRight size={14} />
                    <span>{title}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2b49] tracking-tight">{title}</h1>
            </div>

            {/* 1. Văn bản hướng dẫn, chỉ đạo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Văn bản hướng dẫn, chỉ đạo" 
                    icon={<FileText size={16} />} 
                    colorClass="bg-purple-100 text-purple-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={vanBanData} />
            </div>

            {/* 2. Số liệu, thống kê */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Số liệu, thống kê" 
                    icon={<BarChart2 size={16} />} 
                    colorClass="bg-blue-100 text-blue-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={statsData} />
            </div>

            {/* 3. Tin tức hoạt động của trung ương và địa phương */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Tin tức hoạt động trung ương và địa phương" 
                    icon={<Newspaper size={16} />} 
                    colorClass="bg-amber-100 text-amber-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={newsData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 4. Nghiên cứu, trao đổi */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <SectionHeader 
                        title="Nghiên cứu, trao đổi" 
                        icon={<BookOpen size={16} />} 
                        colorClass="bg-cyan-100 text-cyan-600" 
                        onViewAll={setSelectedCategory}
                    />
                    <NewsList data={researchData} />
                </div>

                {/* 5. Tài liệu pháp luật */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <SectionHeader 
                        title="Tài liệu pháp luật" 
                        icon={<Library size={16} />} 
                        colorClass="bg-emerald-100 text-emerald-600" 
                        onViewAll={setSelectedCategory}
                    />
                    <NewsList data={docData} />
                </div>
            </div>

            {/* 6. Mô hình PBGDPL hiệu quả tại vùng dân tộc thiểu số và miền núi */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader 
                    title="Mô hình PBGDPL hiệu quả" 
                    icon={<Lightbulb size={16} />} 
                    colorClass="bg-pink-100 text-pink-600" 
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={modelsData} />
            </div>

        </div>
    );
}

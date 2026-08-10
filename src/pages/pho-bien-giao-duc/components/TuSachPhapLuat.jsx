import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowRight, Book, BookOpen, Bookmark, Library, FileText } from 'lucide-react';
import TuSachPhapLuatList from './TuSachPhapLuatList';

export default function TuSachPhapLuat() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const title = "Tủ sách pháp luật";

    const validImages = [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400&h=300'
    ];

    const generateNewsItem = (id, title, date, excerpt, image) => ({ id, title, date, excerpt, image });

    const data1 = [
        generateNewsItem(1, 'Đề cương giới thiệu Luật Đất đai (sửa đổi)', '20/10/2023 09:30', 'Tài liệu giới thiệu những điểm mới cơ bản của Luật Đất đai (sửa đổi) vừa được Quốc hội thông qua.', validImages[0]),
        generateNewsItem(2, 'Đề cương giới thiệu Luật Bảo vệ quyền lợi người tiêu dùng', '15/08/2023 14:15', 'Những điểm đáng chú ý trong quy định bảo vệ quyền lợi người tiêu dùng trên không gian mạng.', validImages[1]),
        generateNewsItem(3, 'Tài liệu giới thiệu Luật Phòng, chống bạo lực gia đình', '10/05/2023 08:00', 'Chi tiết các biện pháp phòng ngừa và hỗ trợ nạn nhân bạo lực gia đình theo luật mới.', validImages[2]),
        generateNewsItem(4, 'Đề cương giới thiệu Luật Khám bệnh, chữa bệnh', '05/04/2023 10:45', 'Quy định mới về cấp chứng chỉ hành nghề và tự chủ bệnh viện công lập.', validImages[3]),
    ];

    const data2 = [
        generateNewsItem(1, 'Sổ tay nghiệp vụ hòa giải ở cơ sở năm 2024', '25/11/2023 15:30', 'Hướng dẫn chi tiết các bước tiến hành hòa giải và biểu mẫu nghiệp vụ dành cho hòa giải viên.', validImages[4]),
        generateNewsItem(2, 'Tài liệu hướng dẫn nghiệp vụ chuẩn tiếp cận pháp luật', '18/11/2023 09:00', 'Bộ tiêu chí và quy trình đánh giá, công nhận cấp xã đạt chuẩn tiếp cận pháp luật.', validImages[5]),
        generateNewsItem(3, 'Cẩm nang nghiệp vụ phổ biến giáo dục pháp luật', '10/11/2023 14:00', 'Tổng hợp kỹ năng, phương pháp truyền đạt kiến thức pháp luật hiệu quả.', validImages[0]),
        generateNewsItem(4, 'Sổ tay hướng dẫn công tác báo cáo viên pháp luật', '01/11/2023 08:30', 'Tài liệu dành cho báo cáo viên, tuyên truyền viên pháp luật cấp huyện và cấp xã.', validImages[1]),
    ];

    const data3 = [
        generateNewsItem(1, '100 câu hỏi đáp về Luật Căn cước mới', '01/11/2023 10:00', 'Giải đáp các thắc mắc thường gặp về thẻ căn cước mới và giấy chứng nhận căn cước.', validImages[2]),
        generateNewsItem(2, 'Tuyển tập tiểu phẩm pháp luật "Chuyện xóm tôi"', '22/10/2023 15:45', 'Các kịch bản tiểu phẩm hài hước, gần gũi lồng ghép kiến thức pháp luật dân sự, hôn nhân.', validImages[3]),
        generateNewsItem(3, 'Hỏi đáp pháp luật về bảo hiểm xã hội tự nguyện', '15/09/2023 08:15', 'Tài liệu dạng hỏi đáp dễ hiểu về đối tượng, mức đóng và quyền lợi khi tham gia BHXH tự nguyện.', validImages[4]),
        generateNewsItem(4, 'Những câu chuyện pháp luật từ thực tiễn xét xử', '10/08/2023 14:30', 'Bài học pháp luật rút ra từ các vụ án thực tế đã được tòa án xét xử công khai.', validImages[5]),
    ];

    const data4 = [
        generateNewsItem(1, 'Sách tham khảo: Bình luận khoa học Bộ luật Hình sự', '12/12/2023 09:00', 'Phân tích chuyên sâu về các tội danh và cấu thành tội phạm trong Bộ luật Hình sự hiện hành.', validImages[0]),
        generateNewsItem(2, 'Sách tham khảo: Hệ thống văn bản pháp luật về Doanh nghiệp', '05/12/2023 10:30', 'Tập hợp đầy đủ Luật Doanh nghiệp, Luật Đầu tư và các Nghị định, Thông tư hướng dẫn.', validImages[1]),
        generateNewsItem(3, 'Từ điển thuật ngữ pháp lý Việt Nam', '20/11/2023 14:00', 'Giải thích chi tiết các thuật ngữ pháp lý thường dùng trong các văn bản quy phạm pháp luật.', validImages[2]),
        generateNewsItem(4, 'Sách tham khảo: Phân tích Luật Đất đai qua các thời kỳ', '15/10/2023 08:45', 'Sự phát triển và thay đổi của chính sách đất đai Việt Nam từ năm 1993 đến nay.', validImages[3]),
    ];

    const data5 = [
        generateNewsItem(1, 'Tờ gấp: Những điều cần biết khi tham gia giao thông đường bộ', '10/01/2024 08:00', 'Tờ gấp thiết kế trực quan, in màu, tóm tắt các biển báo và mức phạt vi phạm giao thông.', validImages[4]),
        generateNewsItem(2, 'Tờ gấp: Hướng dẫn phòng chống lừa đảo trên không gian mạng', '05/01/2024 14:30', 'Dấu hiệu nhận biết và cách phòng tránh các thủ đoạn lừa đảo trực tuyến phổ biến.', validImages[5]),
        generateNewsItem(3, 'Tờ gấp: Quyền lợi của người lao động khi bị mất việc làm', '25/12/2023 09:15', 'Hướng dẫn làm thủ tục hưởng trợ cấp thất nghiệp và hỗ trợ học nghề.', validImages[0]),
        generateNewsItem(4, 'Tờ gấp: Phòng cháy chữa cháy trong hộ gia đình', '10/12/2023 10:00', 'Các biện pháp an toàn PCCC và kỹ năng thoát hiểm khi xảy ra hỏa hoạn.', validImages[1]),
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
                        <div className="mt-auto flex items-center justify-between gap-1.5">
                            <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                                <Calendar size={12} /> {news.date}
                            </span>
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
            <TuSachPhapLuatList
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

            {/* 1. Tài liệu, đề cương */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader
                    title="Tài liệu, đề cương giới thiệu luật, pháp lệnh"
                    icon={<FileText size={16} />}
                    colorClass="bg-blue-100 text-blue-600"
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={data1} />
            </div>

            {/* 2. Tài liệu hướng dẫn chuyên môn */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader
                    title="Tài liệu hướng dẫn chuyên môn, nghiệp vụ"
                    icon={<Book size={16} />}
                    colorClass="bg-teal-100 text-teal-600"
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={data2} />
            </div>

            {/* 3. Sách hỏi đáp */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <SectionHeader
                    title="Sách, tài liệu hỏi đáp, tiểu phẩm, câu chuyện pháp luật"
                    icon={<BookOpen size={16} />}
                    colorClass="bg-purple-100 text-purple-600"
                    onViewAll={setSelectedCategory}
                />
                <NewsGrid data={data3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 4. Sách tham khảo */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <SectionHeader
                        title="Sách tham khảo"
                        icon={<Library size={16} />}
                        colorClass="bg-amber-100 text-amber-600"
                        onViewAll={setSelectedCategory}
                    />
                    <NewsList data={data4} />
                </div>

                {/* 5. Tờ gấp */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <SectionHeader
                        title="Tờ gấp"
                        icon={<Bookmark size={16} />}
                        colorClass="bg-rose-100 text-rose-600"
                        onViewAll={setSelectedCategory}
                    />
                    <NewsList data={data5} />
                </div>
            </div>
        </div>
    );
}

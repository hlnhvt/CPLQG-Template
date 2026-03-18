import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowLeft, Share2, Facebook, Twitter, Printer } from 'lucide-react';

const TongRaSoatNewsDetailPage = () => {
    const { id } = useParams();

    // Mock news data
    const news = {
        title: 'Ban Chỉ đạo Trung ương kiểm tra tiến độ rà soát tại các tỉnh phía Nam để đôn đốc việc hoàn thiện hệ thống VBQPPL',
        date: '18/03/2026',
        author: 'Phóng viên Thường trú',
        source: 'Cổng Thông tin điện tử Bộ Tư pháp',
        image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=1200&h=600',
        content: `
Ngày 18/3, Đoàn công tác của Ban Chỉ đạo Trung ương về Tổng rà soát hệ thống văn bản quy phạm pháp luật do đồng chí Nguyễn Văn Lập làm Trưởng đoàn đã có buổi làm việc, kiểm tra tiến độ thực hiện nhiệm vụ tại các tỉnh phía Nam.

### Tinh thần quyết liệt, đồng bộ trong công tác rà soát

Phát biểu tại buổi làm việc, Trưởng đoàn kiểm tra nhấn mạnh tầm quan trọng của việc rà soát văn bản trong bối cảnh chuẩn bị cho các đợt sửa đổi Luật lớn sắp tới. Việc rà soát phải được thực hiện một cách thực chất, không hình thức, nhằm chỉ ra đúng những điểm nghẽn về thể chế đang cản trở sự phát triển kinh tế - xã hội tại các địa phương.

Theo báo cáo từ các tỉnh, đến thời điểm hiện tại, hầu hết các Sở, ngành đã hoàn thành giai đoạn 1 của Kế hoạch: rà soát các Nghị quyết của HĐND và Quyết định của UBND cấp tỉnh. Đã có hàng trăm văn bản được đề xuất sửa đổi, bổ sung hoặc bãi bỏ do không còn phù hợp.

### Những khó khăn, vướng mắc cần tháo gỡ

Tuy nhiên, đại diện các địa phương cũng nêu lên một số khó khăn trong quá trình rà soát, đặc biệt là nguồn lực con người và sự thiếu đồng bộ của một số quy định từ Trung ương, dẫn đến khó khăn trong việc áp dụng pháp luật.

Đoàn kiểm tra ghi nhận các phản ánh và khẳng định Ban Chỉ đạo sẽ tổng hợp, báo cáo Chính phủ để có hướng xử lý triệt để, tạo hành lang pháp lý thông thoáng, thuận lợi nhất cho người dân và doanh nghiệp.

Kết thúc buổi làm việc, Đoàn công tác đánh giá cao nỗ lực của các tỉnh phía Nam và đề nghị các địa phương tiếp tục bám sát tiến độ, khẩn trương hoàn thiện các Báo cáo kết quả rà soát để gửi về Thường trực Ban Chỉ đạo đúng hạn theo Kế hoạch đã đề ra.
        `
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] pb-12 pt-6 md:pt-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <ChevronRight size={14} />
                    <Link to="/tong-ra-soat" className="hover:text-blue-600">Tổng rà soát</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium line-clamp-1">Tin tức hoạt động</span>
                </nav>

                <div className="mb-6">
                    <Link to="/tong-ra-soat" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                        <ArrowLeft size={18} className="mr-2" /> Quay lại Tổng rà soát
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 md:p-10 border-b border-gray-100">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a3a73] leading-tight mb-6">
                            {news.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600 text-sm">
                            <div className="flex items-center gap-6">
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} /> {news.date}
                                </span>
                                <span className="font-medium text-gray-700 border-l border-gray-300 pl-6">
                                    Nguồn: {news.source}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" title="Chia sẻ Facebook">
                                    <Facebook size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors" title="Chia sẻ Twitter">
                                    <Twitter size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-600 hover:text-white transition-colors" title="In bài viết">
                                    <Printer size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full aspect-[21/9] md:aspect-[24/9] bg-gray-100">
                        <img src={news.image} alt="News feature" className="w-full h-full object-cover" />
                    </div>

                    <div className="p-6 md:p-10">
                        <div className="prose max-w-none text-gray-800 text-[15px] md:text-[17px] leading-relaxed">
                            {/* Simple Markdown Renderer Mock */}
                            {news.content.split('\n\n').map((paragraph, index) => {
                                if (paragraph.trim().startsWith('###')) {
                                    return <h3 key={index} className="text-xl md:text-2xl font-bold text-[#0a3a73] mt-8 mb-4">{paragraph.replace('###', '').trim()}</h3>;
                                }
                                return paragraph.trim() ? <p key={index} className="mb-5">{paragraph.trim()}</p> : null;
                            })}
                        </div>
                        
                        <div className="mt-10 flex justify-end">
                            <span className="font-bold text-gray-800 italic">Thực hiện: {news.author}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TongRaSoatNewsDetailPage;

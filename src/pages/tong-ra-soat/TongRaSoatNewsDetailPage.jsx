import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, ArrowLeft, Share2, Facebook, Twitter, Printer, MessageCircle } from 'lucide-react';
import CommentSection from './../../components/CommentSection';

const TongRaSoatNewsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f4f7fb]">
            {/* Header Banner */}
            <div className="bg-[#e21414] text-white pt-8 md:pt-12 pb-12 md:pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute inset-0 opacity-100 mix-blend-screen pointer-events-none z-0" style={{ backgroundImage: "url('/trong_dong_gold2.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    <div className="mb-0">
                        <Link to="/tong-ra-soat" state={{ activeTab: 'tin-tuc-hoat-dong' }} className="inline-flex items-center text-black bg-white hover:bg-gray-50 transition-colors font-bold px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                            <ArrowLeft size={18} className="mr-2" /> Quay về Trang chủ Chuyên mục
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-4">
                                Thủ tướng: Khẩn trương thí điểm đánh giá, chấm điểm về công tác xây dựng pháp luật
                            </h1>

                            {/* Meta & Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-y border-gray-100 mb-6 text-sm text-gray-500 gap-4">
                                <span>10/05/2025 21:03</span>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border">
                                        <button className="hover:text-black font-bold text-lg leading-none">-</button>
                                        <span>100%</span>
                                        <button className="hover:text-black font-bold text-lg leading-none">+</button>
                                    </div>
                                    <button className="p-1.5 rounded-full border hover:bg-gray-50 text-black"><Printer size={16} /></button>
                                    <button className="p-1.5 rounded-full border hover:bg-gray-50 text-black"><Facebook size={16} /></button>
                                    <button className="p-1.5 rounded-full border hover:bg-gray-50 text-black"><Share2 size={16} /></button>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="prose max-w-none text-gray-800 text-base leading-relaxed">
                                <p className="font-bold mb-4">
                                    Sáng 10/5, tại trụ sở Chính phủ, Thủ tướng Phạm Minh Chính chủ trì cuộc họp của Thường trực Chính phủ cho ý kiến vào dự thảo Đề án thí điểm thực hiện đánh giá, chấm điểm (KPI) về công tác xây dựng pháp luật và một số nội dung quan trọng khác.
                                </p>

                                <div className="my-6">
                                    <img src="/thumb1.png" alt="Meeting Overview" className="w-full rounded-lg mb-2" />
                                    <p className="text-sm text-center italic text-gray-500">
                                        Thủ tướng Phạm Minh Chính chủ trì cuộc họp của Thường trực Chính phủ - Ảnh: VGP
                                    </p>
                                </div>

                                <h3 className="text-xl font-bold text-black mt-8 mb-4">Sơ bộ chấm điểm thử nghiệm trong 2 năm</h3>
                                <p className="mb-4">
                                    Theo chỉ đạo của Thủ tướng Chính phủ, Bộ Tư pháp đã xây dựng dự thảo Đề án thí điểm thực hiện đánh giá, chấm điểm (KPI) về công tác xây dựng pháp luật, bao gồm cả việc đánh giá, chấm điểm tổ chức làm đầu mối thực hiện quy định chi tiết luật, pháp lệnh, nghị quyết.
                                </p>
                                <p className="mb-4">
                                    Một số nội dung chính của Đề án gồm: tiêu chí, bộ công cụ đánh giá, chấm điểm, nguyên tắc đánh giá, chấm điểm; phạm vi áp dụng; tổ chức thực hiện. Dự kiến, kết quả chấm điểm theo Đề án cũng sẽ được tích hợp vào việc chấm điểm Chỉ số cải cách hành chính (PAR Index).
                                </p>
                                <p className="mb-4">
                                    Sau khi nghe các báo cáo, ý kiến, phát biểu kết luận, Thủ tướng Phạm Minh Chính hoan nghênh Bộ Tư pháp, Văn phòng Chính phủ đã tích cực triển khai chức năng, nhiệm vụ được giao, chỉ đạo điều hành thí điểm thực hiện đánh giá, chấm điểm trong 2 năm; rút kinh nghiệm, cần nghiên cứu mở rộng việc triển khai như một hệ thống đồng bộ.
                                </p>

                                <div className="my-6">
                                    <img src="/thumb2.png" alt="PM Speaking" className="w-full rounded-lg mb-2" />
                                    <p className="text-sm text-center italic text-gray-500">
                                        Thủ tướng chỉ đạo các cơ quan quan tâm, chú trọng hơn nữa công tác nghiên cứu, xây dựng văn bản, hoàn thiện thể chế... - Ảnh: VGP
                                    </p>
                                </div>

                                <p className="mb-4">
                                    Thủ tướng nêu rõ các yêu cầu về: xây dựng pháp luật là công tác then chốt trong định hướng phát triển; tạo thể chế thống nhất, rõ ràng, minh bạch, có giá trị, linh hoạt, chủ động, đáp ứng đòi hỏi của thực tiễn, yêu cầu phát triển kinh tế-xã hội, phục vụ lãnh đạo, chỉ đạo của Đảng, Nhà nước.
                                </p>

                                <h3 className="text-xl font-bold text-black mt-8 mb-4">Đẩy mạnh việc ban hành các văn bản quy định chi tiết</h3>
                                <p className="mb-4">
                                    Kết luận về nội dung này, Thủ tướng Phạm Minh Chính ghi nhận, biểu dương nỗ lực của các bộ, ngành, cơ quan trong công tác xây dựng pháp luật và chương trình công tác, kết quả đạt được về ban hành các luật, nghị quyết thời gian qua.
                                </p>
                            </div>

                            {/* Tags / Related block (Optional) */}
                            <div className="mt-8 pt-6 border-t font-semibold text-right text-sm">
                                Theo <span className="text-black">Báo Pháp luật Việt Nam</span>
                            </div>

                            {/* Comment Section (Góp ý & Ý kiến) */}
                            <CommentSection />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
                            {/* Latest News */}
                            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                                <div className="bg-gray-50 border-b py-3 px-4">
                                    <h3 className="font-bold text-black uppercase">Tin mới nhất</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    {[
                                        "Xây dựng dự thảo luật theo tinh thần kiến tạo, bám sát thực tiễn",
                                        "Kịp thời bổ sung các chính sách pháp luật theo nghị quyết mới",
                                        "Bộ Tư pháp tổ chức hội nghị triển khai công tác cải cách",
                                        "Công tác phổ biến giáo dục pháp luật cần được chú trọng"
                                    ].map((title, i) => (
                                        <div key={i} className="flex gap-3 items-start cursor-pointer group pb-4 border-b last:border-0 last:pb-0">
                                            <div className="w-16 h-12 bg-gray-200 rounded shrink-0 overflow-hidden">
                                                <img src="/thumb3.png" alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-black leading-snug line-clamp-2">{title}</h4>
                                                <span className="text-[10px] text-gray-500 mt-1 block">10:00 12/05/2025</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <button className="text-black text-sm font-medium hover:underline">Xem tất cả tin</button>
                                    </div>
                                </div>
                            </div>

                            {/* Propaganda Banner */}
                            <div className="rounded-lg overflow-hidden relative cursor-pointer group shadow-sm border border-red-200">
                                <img src="/poster1.png" alt="Poster" className="w-full h-auto aspect-square object-cover opacity-80 group-hover:opacity-100 transition" />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-transparent to-transparent flex flex-col justify-end p-4">
                                    <h4 className="text-yellow-400 font-bold text-lg uppercase drop-shadow-md pb-1 border-b border-yellow-400/50">Lễ hưởng ứng</h4>
                                    <h5 className="text-white font-bold text-xl leading-tight uppercase mt-1 drop-shadow-md">Ngày Pháp luật nước CHXHCN Việt Nam</h5>
                                </div>
                            </div>

                            {/* Feedback Box */}
                            <div className="bg-[#e21414] text-white rounded-lg p-6 text-center space-y-4 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                                <h3 className="font-bold text-xl uppercase tracking-wider relative z-10">Lắng nghe &<br />Phản hồi</h3>
                                <div className="flex justify-center my-4 relative z-10">
                                    <div className="bg-white/10 p-4 rounded-full border border-white/20">
                                        <MessageCircle size={32} className="text-yellow-200" />
                                    </div>
                                </div>
                                <p className="text-xs text-red-100 mb-6 relative z-10">
                                    Người dân và doanh nghiệp có thể dễ dàng góp ý xây dựng, hoàn thiện chính sách, pháp luật thông qua các phương thức dưới đây:
                                </p>
                                <button className="w-full bg-white text-[#e21414] font-bold py-2 rounded uppercase text-sm hover:bg-yellow-400 hover:text-white transition mb-2">
                                    Gửi phản hồi online
                                </button>
                                <button className="w-full bg-transparent border border-white/50 text-white font-medium py-2 rounded uppercase text-sm hover:bg-white/10 transition">
                                    Đường dây nóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Footer cho trang Tổng Rà Soát */}
            <div className="relative w-full mt-0 mb-0 flex items-center justify-center overflow-hidden border-t-4 border-yellow-500 bg-[#e21414] shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)] h-[100px]">
                {/* Background giống Header */}
                <div className="absolute inset-0 opacity-100 pointer-events-none" style={{ backgroundImage: "url('/trong_dong_gold2.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>

                <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center justify-center h-full">
                    {/* Khối chứa Quốc huy và Tiêu đề  */}
                    <div className="flex items-center justify-center gap-3 md:gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Vietnam.svg/1200px-Emblem_of_Vietnam.svg.png"
                            alt="Quốc huy Việt Nam"
                            className="w-[35px] h-[35px] md:w-[45px] md:h-[45px] object-contain drop-shadow-md"
                        />
                        <h2 className="font-basic text-[15px] md:text-[16px] lg:text-[18px] text-white uppercase drop-shadow-md whitespace-nowrap leading-none mt-1">
                            TỔNG RÀ SOÁT HỆ THỐNG VĂN BẢN QUY PHẠM PHÁP LUẬT
                        </h2>
                    </div>
                </div>
            </div>

            {/* Nút Home Floating Góc Trái Dưới */}
            <button
                onClick={() => navigate('/')}
                className="fixed bottom-6 left-6 z-50 h-12 min-w-[48px] px-[10px] flex items-center justify-center bg-[#da121a] hover:bg-yellow-500 text-white hover:text-[#0a3a73] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                title="Về Trang chủ Cổng Pháp luật Quốc gia"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Vietnam.svg/1200px-Emblem_of_Vietnam.svg.png"
                    alt="Quốc huy"
                    className="w-[28px] h-[28px] object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[400px] group-hover:opacity-100 group-hover:px-2 transition-all duration-500 ease-in-out font-bold text-[14px]">
                    Về trang chủ Cổng pháp luật quốc gia
                </span>
            </button>
        </div>
    );
};

export default TongRaSoatNewsDetailPage;

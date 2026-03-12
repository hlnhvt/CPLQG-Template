import React from 'react';
import { Clock, PlayCircle, Star, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-video w-full relative overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
);

const NewsHighlightsPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            <div className="container mx-auto px-4 py-8 max-w-[1400px]">
                
                {/* 1. Top Banner */}
                <div className="mb-8 rounded-lg overflow-hidden relative shadow-md bg-red-700 h-28 md:h-36 flex items-center justify-center border-b-4 border-yellow-400">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                    <div className="relative text-center z-10">
                        <div className="flex justify-center mb-1">
                            <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        </div>
                        <h2 className="text-white text-xl md:text-3xl font-bold tracking-wider uppercase drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Đưa nghị quyết đại hội XIV của Đảng vào cuộc sống
                        </h2>
                    </div>
                </div>

                {/* 2. Tin tức nổi bật */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase">Tin tức nổi bật</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Cột Trái (3 tin nhỏ, nằm ngang, tỉ lệ 1:2) */}
                        <div className="lg:col-span-1 flex flex-col space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={`/thumb${i}.png`} alt={`News ${i}`} className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h3 className="font-bold text-[13px] md:text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-3 leading-snug">Bộ Tư pháp đề nghị mang tới các giải pháp tháo gỡ khó khăn cho doanh nghiệp...</h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                            <Clock size={12} /> <span>12/03/2026</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cột Giữa (1 tin cực lớn, Ảnh trên Chữ dưới) */}
                        <div className="lg:col-span-2 group cursor-pointer flex flex-col">
                            <div className="w-full mb-4 shrink-0">
                                <Image16x9 src="/thumb1.png" alt="Main News" className="rounded-lg shadow-sm border border-gray-100" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className="text-xl md:text-[22px] font-bold text-[#0f4c81] group-hover:text-blue-700 mb-2 leading-tight">
                                    Hướng tới bầu cử đại biểu Quốc hội khóa XVI và đại biểu HĐND các cấp nhiệm kỳ 2026-2031: Đặt công tác bảo đảm an ninh, trật tự lên hàng đầu
                                </h3>
                                <p className="text-gray-600 text-[14px] mb-3 line-clamp-2 leading-relaxed">
                                    Chiều 10/3, Đoàn công tác của Hội đồng bầu cử quốc gia do Phó Chủ tịch Quốc hội Nguyễn Khắc Định, Ủy viên Hội đồng bầu cử quốc gia làm Trưởng đoàn đã có buổi làm việc với Ủy ban bầu cử tỉnh...
                                </p>
                                <div className="mt-auto flex items-center gap-1 text-[12px] text-gray-400">
                                    <Clock size={14} /> <span>11/03/2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Cột Phải (2 tin, Ảnh trên Chữ dưới) */}
                        <div className="lg:col-span-1 flex flex-col space-y-6">
                            {[2, 3].map((i) => (
                                <div key={i} className="group cursor-pointer flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-full mb-3 shrink-0">
                                        <Image16x9 src={`/thumb${i}.png`} alt={`News Side ${i}`} className="rounded" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#0f4c81] mb-2 leading-snug line-clamp-3">
                                            Xây dựng đội ngũ luật sư và bàn thảo chính sách nâng cao kỷ nguyên...
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                            <Clock size={12} /> <span>11/03/2026</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Chính sách mới */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">Chính sách mới</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Chiếm 3 cột trái */}
                        <div className="lg:col-span-3 flex flex-col">
                            {/* Tin lớn (tỉ lệ 1:1, ngang) */}
                            <div className="flex items-start gap-6 group cursor-pointer border-b border-gray-100 pb-8 mb-8">
                                <div className="w-[50%] shrink-0">
                                    <Image16x9 src="/thumb1.png" alt="Policy" className="rounded-lg shadow-sm border border-gray-100" />
                                </div>
                                <div className="w-[50%] flex flex-col min-w-0">
                                    <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 group-hover:text-[#0f4c81] mb-3 leading-tight line-clamp-4">Cử tri có thể đổi nơi bỏ phiếu, xem danh sách ứng cử viên trên VNeID trong thời gian sớm nhất</h3>
                                    <p className="text-gray-600 text-[14px] leading-relaxed mb-4 line-clamp-2">
                                        Cục Cảnh sát quản lý hành chính về trật tự xã hội (Bộ Công an) cho biết cử tri có thể báo cáo khai danh tính điện tử mức 2 có thể tra cứu khu vực bỏ phiếu, thông tin bầu cử...
                                    </p>
                                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                        <Clock size={14} /> <span>10/03/2026</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 3 tin nhỏ nằm ngang phía dưới */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1,2,3].map((item) => (
                                    <div key={item} className="group cursor-pointer flex flex-col">
                                        <div className="w-full shrink-0 mb-3">
                                            <Image16x9 src={`/thumb${item}.png`} alt="Sub Policy" className="rounded-lg" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h4 className="font-bold text-[14px] text-gray-800 group-hover:text-[#0f4c81] line-clamp-3 leading-snug mb-2">Thủ tục tham gia bảo hiểm xã hội bắt buộc qua giao dịch điện tử được đơn giản hóa</h4>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                                <Clock size={12} /> <span>09/03/2026</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Banner bên phải (chiếm 1 cột) */}
                        <div className="lg:col-span-1 h-full">
                            <div className="rounded-xl overflow-hidden bg-[#fff2e6] text-[#c92a2a] p-6 h-full flex flex-col items-center justify-center text-center shadow border border-red-200 cursor-pointer min-h-[350px]">
                                <Star className="text-yellow-500 fill-yellow-500 mb-2" size={32} />
                                <Star className="text-yellow-500 fill-yellow-500 mb-6" size={56} />
                                <h3 className="font-bold text-[22px] uppercase tracking-wide leading-snug">Hoàn thiện <br/>Chính sách, thể chế <br/>Góp phần đưa đất nước <br/>Bước vào kỷ nguyên mới</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Hai Cột: Tin hoạt động & Thời sự pháp luật */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    {/* Tin hoạt động */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">Tin hoạt động</h2>
                        {/* 1 Tin chính tỉ lệ 1:1 */}
                        <div className="flex items-start gap-4 group cursor-pointer mb-6 border-b border-gray-100 pb-6">
                            <div className="w-[50%] shrink-0">
                                <Image16x9 src="/thumb2.png" alt="Activity" className="rounded" />
                            </div>
                            <div className="w-[50%] flex flex-col min-w-0">
                                <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">Tiếp tục ưu tiên nguồn lực trọng tâm vào xây dựng pháp luật tại các vùng kinh tế</h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                    <Clock size={12} /> <span>10/03/2026</span>
                                </div>
                            </div>
                        </div>
                        {/* 2 Tin phụ tỉ lệ 1:2 */}
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-start gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={`/thumb${i}.png`} alt="Sub Activity" className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">Hướng dẫn giải quyết vướng mắc trong phân bổ nguồn thu ngân sách nhà nước</h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>09/03/2026</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Thời sự pháp luật */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 mb-6 uppercase tracking-wide">Thời sự pháp luật</h2>
                        {/* 1 Tin chính tỉ lệ 1:1 */}
                        <div className="flex items-start gap-4 group cursor-pointer mb-6 border-b border-gray-100 pb-6">
                            <div className="w-[50%] shrink-0">
                                <Image16x9 src="/thumb3.png" alt="Current Affairs" className="rounded" />
                            </div>
                            <div className="w-[50%] flex flex-col min-w-0">
                                <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">Hướng tới bầu cử đại biểu Quốc hội khoá XVI và đại biểu HĐND các cấp</h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                    <Clock size={12} /> <span>08/03/2026</span>
                                </div>
                            </div>
                        </div>
                        {/* 2 Tin phụ tỉ lệ 1:2 */}
                        <div className="space-y-4">
                            {[2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={`/thumb${i}.png`} alt="Sub Affair" className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">Bộ Tư pháp đề nghị tăng cường hỗ trợ tháo gỡ khó khăn doanh nghiệp</h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>07/03/2026</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. Radio Pháp Luật */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6 border-b-2 border-red-700 pb-2 inline-flex pr-8">
                        <h2 className="text-2xl font-bold text-[#0f4c81] uppercase tracking-wide">Radio Pháp luật</h2>
                    </div>
                    
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-3">
                        {/* Video Player */}
                        <div className="lg:col-span-2 relative group cursor-pointer aspect-video bg-black overflow-hidden shadow-sm">
                            <img src="/thumb1.png" alt="Video Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all drop-shadow-md" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-left">
                                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow">Nhiều góp ý hoàn thiện dự thảo văn kiện trình Đại hội Đảng XIV</h3>
                            </div>
                        </div>
                        
                        {/* Playlist */}
                        <div className="lg:col-span-1 p-4 h-full flex flex-col bg-white">
                            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                                {[1,2,3,2].map((item, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 cursor-pointer p-2 rounded-lg transition-colors hover:bg-gray-50`}>
                                        <div className="w-[100px] shrink-0">
                                            <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-200 rounded">
                                                <img src={`/thumb${item}.png`} alt="Thumb" className="absolute inset-0 w-full h-full object-cover" />
                                                {idx === 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><PlayCircle size={20} className="text-white" /></div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h5 className={`font-semibold text-[13px] line-clamp-2 leading-snug text-gray-800`}>
                                                {idx === 0 ? "Thủ tướng phân tích tầm nhìn cao, tầm nhìn dài hạn..." : "Đồng bộ về pháp lý để tháo gỡ khó khăn cho các dự án..."}
                                            </h5>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                                <Clock size={12} /> <span>12/11/2025</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Filter Menu (Dưới Radio) */}
                <div className="py-4 border-y border-gray-100 mb-10 overflow-x-auto no-scrollbar hidden md:block">
                    <ul className="flex justify-center items-center gap-8 min-w-max text-[14px] font-bold text-gray-700">
                        <li><span className="text-white bg-blue-50 px-4 py-1.5 rounded-full cursor-pointer whitespace-nowrap shadow-sm"><Radio className="inline text-blue-500 mr-2" size={16}/>Mới nhất</span></li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Tin hoạt động</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Đưa Nghị quyết vào cuộc sống</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Chính sách mới</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Thời sự pháp luật</li>
                        <li className="hover:text-[#0f4c81] cursor-pointer whitespace-nowrap transition-colors">Radio pháp luật</li>
                    </ul>
                </div>

                {/* 7. Hai cột cuối cùng (Tỉ lệ 1:2) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Cột trái */}
                    <div className="space-y-6 md:pr-4">
                        {[1, 2, 3].map((i) => (
                            <div key={`left-${i}`} className="flex items-start gap-5 group cursor-pointer border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <div className="w-[40%] shrink-0">
                                    <Image16x9 src={`/thumb${i}.png`} alt="List" className="rounded shadow-sm" />
                                </div>
                                <div className="w-[60%] flex flex-col min-w-0">
                                    <h3 className="font-bold text-[15px] xl:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight line-clamp-3 mb-2">
                                        Khẩn trương xây dựng hạ tầng công nghệ thông tin lớn mạnh, chuyển đổi số quốc gia
                                    </h3>
                                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                        <Clock size={12} /> <span>06/03/2026</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cột phải */}
                    <div className="space-y-6 md:pl-4">
                        {[3, 1, 2].map((i) => (
                            <div key={`right-${i}`} className="flex items-start gap-5 group cursor-pointer border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <div className="w-[40%] shrink-0">
                                    <Image16x9 src={`/thumb${i}.png`} alt="List" className="rounded shadow-sm" />
                                </div>
                                <div className="w-[60%] flex flex-col min-w-0">
                                    <h3 className="font-bold text-[15px] xl:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight line-clamp-3 mb-2">
                                        Cần rà soát lại phạm vi cải cách thủ tục hành chính dựa trên dữ liệu chuẩn
                                    </h3>
                                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                        <Clock size={12} /> <span>04/03/2026</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewsHighlightsPage;

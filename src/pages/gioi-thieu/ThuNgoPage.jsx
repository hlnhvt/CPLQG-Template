import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Quote } from 'lucide-react';

const ThuNgoPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>

            {/* Header Banner - Elegant Minimalist */}
            <div className="pt-20 pb-20 px-4 relative flex flex-col items-center text-center">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f4c81] uppercase drop-shadow-sm mb-4 relative z-10">
                    THƯ NGỎ
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#0f4c81] to-yellow-500 mx-auto rounded-full"></div>
            </div>

            {/* Main Letter Content Area - Elegant Paper Box */}
            <div className="container mx-auto px-4 max-w-[950px] relative z-20">

                {/* The Letter Paper Div */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl relative overflow-hidden border border-white/40 text-gray-800">

                    {/* Watermark Background inside Letter */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <img src="/logo.png" alt="Watermark" className="w-2/3 object-contain" />
                    </div>

                    {/* Paper Texture Noise Header (Subtle CSS styling) */}
                    <div className="h-4 bg-gradient-to-r from-red-800 via-red-600 to-yellow-500 w-full top-0 absolute"></div>

                    <div className="p-10 md:p-16 lg:p-24 relative z-10">
                        {/* Header of Letter */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-gray-200 pb-10">
                            <div className="flex items-center gap-6 mb-8 md:mb-0">
                                <img src="/logo.png" alt="Quốc huy" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                                <div>
                                    <h2 className="font-bold text-xl md:text-2xl text-[#0f4c81] uppercase tracking-wide">Bộ Tư Pháp</h2>
                                    <h3 className="text-gray-500 italic text-lg mt-1">Cổng Pháp Luật Quốc Gia</h3>
                                </div>
                            </div>
                            <div className="text-right text-gray-600 italic text-[17px]">
                                Hà Nội, ngày 10 tháng 11 năm 2025
                            </div>
                        </div>

                        {/* Letter Body */}
                        <div className="relative">
                            <Quote className="absolute -top-6 -left-8 w-16 h-16 text-gray-200 opacity-50 rotate-180" />

                            <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-8 leading-relaxed">
                                &nbsp;&emsp;Kính gửi: <span className="text-[#0f4c81]">Toàn thể người dân, doanh nghiệp và các tổ chức</span>.
                            </h3>

                            <div className="text-gray-800 text-[17px] md:text-[19px] leading-[1.9] space-y-7 text-justify tracking-wide">
                                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#0f4c81] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                                    Thay mặt Lãnh đạo Bộ Tư pháp và Ban quản trị Cổng Thông tin pháp luật quốc gia, tôi xin gửi lời chào trân trọng và lời cảm ơn sâu sắc nhất tới quý vị vì đã luôn đồng hành, quan tâm và sử dụng các dịch vụ của Cổng trong suốt thời gian qua.
                                </p>
                                <p>
                                    Thưa quý vị, sống và làm việc theo Hiến pháp và pháp luật là nguyên tắc cơ bản của nhà nước pháp quyền xã hội chủ nghĩa Việt Nam. Để pháp luật thực sự đi vào đời sống, trở thành công cụ bảo vệ quyền và lợi ích hợp pháp của người dân, doanh nghiệp, việc tiếp cận thông tin pháp luật phải được đảm bảo nhanh chóng, minh bạch và chính xác. Đó chính là lý do Cổng Pháp luật quốc gia ra đời và không ngừng hoàn thiện.
                                </p>
                                <p>
                                    Với việc ứng dụng trí tuệ nhân tạo (AI) và các công nghệ số tiên tiến, Cổng không chỉ đơn thuần là nơi lưu trữ, số hóa văn bản quy phạm pháp luật, mà còn là một "trợ lý pháp lý ảo" đắc lực, sẵn sàng hỗ trợ, giải đáp và kết nối quý vị với mạng lưới chuyên gia pháp luật hàng đầu.
                                </p>
                                <p className="font-medium text-[#0f4c81] italic border-l-4 border-yellow-400 pl-6 my-10 py-2 bg-blue-50/50">
                                    Chúng tôi cam kết sẽ tiếp tục nỗ lực, đổi mới sáng tạo để mang đến trải nghiệm trực tuyến thân thiện, mượt mà và hữu ích nhất.
                                </p>
                                <p>
                                    Chặng đường sắp tới rất cần sự đóng góp ý kiến, phản hồi quý báu từ người dùng để chúng tôi kịp thời điều chỉnh, nâng cao chất lượng phục vụ và đáp ứng kỳ vọng của toàn xã hội.
                                </p>
                                <p>
                                    Một lần nữa, xin kính chúc toàn thể người dân, cộng đồng doanh nghiệp sức khỏe, hạnh phúc và thành công. Hãy tiếp tục đồng hành cùng Cổng Thông tin pháp luật quốc gia trong kỷ nguyên số!
                                </p>
                            </div>

                            <Quote className="absolute -bottom-6 -right-6 w-16 h-16 text-gray-200 opacity-50" />
                        </div>

                        {/* Signature */}
                        <div className="mt-20 flex flex-col items-end text-right">
                            <div className="mb-8 mr-12 text-[19px] font-serif italic text-gray-800">
                                Trân trọng,
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-8 justify-end">
                                <div className="text-right order-2 md:order-1">
                                    <p className="font-bold text-[#0f4c81] text-xl">Lãnh đạo Bộ Tư pháp</p>
                                    <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2 border-b-2 border-yellow-400 inline-block pb-1">BỘ TRƯỞNG</p>
                                </div>
                                <div className="order-1 md:order-2 w-32 h-32 rounded-full border-4 border-white shadow-xl shadow-blue-900/10 flex items-center justify-center overflow-hidden shrink-0 relative bg-gray-100">
                                    <img src="/vietnamese_official_1.png" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-sm font-medium text-gray-400">Hình ảnh<br/>Lãnh đạo</span>' }} alt="Lãnh đạo" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Bottom paper decoration lines */}
                    <div className="h-2 w-full absolute bottom-0 bg-blue-900/10 rounded-b-sm"></div>
                </div>

            </div>
        </div>
    );
};

export default ThuNgoPage;

import React, { useEffect } from 'react';
import { Brain, Scale, Users, Shield, Play } from 'lucide-react';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans min-h-screen flex flex-col pt-0 pb-0 bg-white">
            {/* About Hero Banner */}
            <div
                className="relative bg-[#0f4c81] text-white pt-20 pb-20 overflow-hidden shadow-inner bg-cover bg-center flex flex-col items-center justify-center text-center"
                style={{ backgroundImage: "url('/hero-bg-3.png')" }}
            >
                <div className="relative z-10 flex flex-col items-center max-w-4xl px-4">
                    <img src="/logo.png" alt="Quốc huy" className="w-20 h-20 md:w-24 md:h-24 object-contain mb-4 drop-shadow-lg" />
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-md mb-4">
                        CỔNG PHÁP LUẬT QUỐC GIA
                    </h1>
                    <p className="text-lg md:text-2xl font-medium drop-shadow-sm text-blue-100 italic">
                        Đồng hành cùng người dân, doanh nghiệp bước vào kỷ nguyên mới
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-16 max-w-6xl space-y-24">

                {/* Mission & AI Section */}
                <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Left Text */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-2xl md:text-4xl gap-2 text-[#0f4c81] font-bold leading-tight">
                            Đồng hành cùng người dân<br />
                            doanh nghiệp bước vào kỷ nguyên mới
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                            Cổng thông tin pháp luật chính thống do Bộ Tư pháp xây dựng, ứng dụng công nghệ số và trí tuệ nhân tạo (AI) để cung cấp, tra cứu, giải đáp và phản hồi thông tin pháp luật.
                        </p>
                        <p className="text-blue-600 font-semibold text-lg">
                            Nhanh chóng - Chính xác - Minh bạch.
                        </p>
                    </div>

                    {/* Right AI Circular Diagram */}
                    <div className="flex-1 flex justify-center items-center py-10 relative">
                        {/* Circle Track */}
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-blue-300 relative animate-[spin_60s_linear_infinite]">
                            {/* Nodes */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500 text-blue-600">
                                <Brain size={24} />
                            </div>
                            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500 text-blue-600">
                                <Users size={24} />
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500 text-blue-600">
                                <Scale size={24} />
                            </div>
                            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500 text-blue-600">
                                <Shield size={24} />
                            </div>
                        </div>
                        {/* Center Text (Counter-spin to stay upright, or just placed absolutely outside the spinning div) */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10 pointer-events-none">
                            <h3 className="text-[#0f4c81] font-bold text-lg md:text-xl mb-2">Trí tuệ nhân tạo</h3>
                            <p className="text-gray-500 text-xs md:text-sm">Ứng dụng trí tuệ nhân tạo (AI) để tối ưu hóa trải nghiệm tìm kiếm và tra cứu pháp luật</p>
                        </div>
                    </div>
                </section>

                {/* General Introduction Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl text-[#0f4c81] font-bold border-l-4 border-yellow-400 pl-4">
                        Giới thiệu chung
                    </h2>
                    <div className="text-gray-700 leading-relaxed text-left text-base md:text-lg space-y-4">
                        <p>
                            Cổng Pháp luật quốc gia là nền tảng số dùng chung do Bộ Tư pháp xây dựng và vận hành. Đây là kênh thông tin chính thống, tập trung, tin cậy, thông suốt để người dân, doanh nghiệp có thể chủ động tìm hiểu thông tin pháp luật một cách thuận tiện, chính xác và đầy đủ.
                        </p>
                        <p>
                            Cổng Pháp luật quốc gia cung cấp toàn diện các thông tin liên quan đến xây dựng và thực thi pháp luật; bảo đảm thông tin, dữ liệu về pháp luật đáp ứng yêu cầu "đúng, đủ, sạch, sống" và công khai minh bạch. Đồng thời, thiết lập các diễn đàn trực tuyến để người dân, doanh nghiệp, các chuyên gia, nhà khoa học và chính quyền tham gia trao đổi các vấn đề pháp lý giúp quản lý rủi ro nhà nước, tăng cường tính minh bạch, dân chủ và tính chịu trách nhiệm xã hội trong quá trình xây dựng pháp luật.
                        </p>
                        <p>
                            Cổng tích hợp nhiều tính năng trực tuyến thông minh, ứng dụng trí tuệ nhân tạo (AI Pháp luật) để hỗ trợ giải đáp các câu hỏi, tình huống pháp lý. Đồng thời kết nối dữ liệu với các Cổng thông tin quan trọng như: Cổng Thông tin điện tử Chính phủ, Cổng dữ liệu quốc gia về pháp luật, ...
                        </p>
                        <p>
                            Cổng Pháp luật quốc gia cam kết đồng hành cùng người dân và doanh nghiệp trong kỷ nguyên số, góp phần xây dựng và phát triển Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.
                        </p>
                    </div>
                </section>

                {/* Video Placeholder Section */}
                <section className="flex justify-center pt-8">
                    <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                        <img
                            src="/flag-video-placeholder.png"
                            alt="Video thiệu Cổng Pháp Luật"
                            className="w-full h-auto object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-400/90 text-red-600 rounded-full flex items-center justify-center pl-1 shadow-[0_0_20px_rgba(250,204,21,0.5)] group-hover:scale-110 group-hover:bg-yellow-400 transition-all">
                                <Play size={32} className="md:w-10 md:h-10 fill-current" />
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Vision Banner Section */}
            <section className="w-full bg-[#0a2540] relative overflow-hidden text-white py-16">
                <div className="absolute inset-0 bg-right bg-cover bg-no-repeat opacity-40 mix-blend-screen mix-blend-lighten" style={{ backgroundImage: "url('/vision-bg.png')" }}></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-xl bg-blue-900/40 backdrop-blur-md border border-blue-400/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4 text-white drop-shadow-sm flex items-center gap-3">
                            TẦM NHÌN
                        </h2>
                        <p className="text-blue-50 text-base md:text-lg leading-relaxed">
                            Trở thành nền tảng pháp luật số hàng đầu tại Việt Nam, ứng dụng công nghệ tiên tiến và trí tuệ nhân tạo để cung cấp dịch vụ pháp lý chất lượng cao, góp phần xây dựng xã hội pháp quyền vững mạnh và hiện đại.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

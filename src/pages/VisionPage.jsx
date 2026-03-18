import React from 'react';
import { Target, Lightbulb, TrendingUp, ShieldCheck, Gem } from 'lucide-react';

const VisionPage = () => {
    // Dữ liệu mẫu (theo yêu cầu thì sẽ được tải qua CMS nhưng chúng ta làm giao diện trước)
    const visionContent = "Trở thành nền tảng pháp luật số hàng đầu tại Việt Nam, ứng dụng công nghệ tiên tiến và trí tuệ nhân tạo để cung cấp dịch vụ pháp lý chất lượng cao, minh bạch, dễ tiếp cận cho mọi người dân và doanh nghiệp.";

    const missionContent = "Xây dựng hệ sinh thái pháp lý toàn diện, kết nối người dân, doanh nghiệp với cơ quan nhà nước, thúc đẩy sự hiểu biết và tuân thủ pháp luật thông qua các giải pháp thông minh, tiện ích và đáng tin cậy.";

    const directions = [
        {
            title: "Số hóa toàn diện dữ liệu",
            desc: "Hoàn thiện cơ sở dữ liệu pháp luật quốc gia, đảm bảo thông tin được cập nhật liên tục, chính xác và đồng bộ trên mọi nền tảng.",
            icon: <ShieldCheck size={32} className="text-blue-500" />
        },
        {
            title: "Ứng dụng Trí tuệ Nhân tạo (AI)",
            desc: "Tích hợp trợ lý ảo thông minh giúp tư vấn pháp lý tự động, tra cứu thông tin nhanh chóng và cá nhân hóa trải nghiệm người dùng.",
            icon: <Lightbulb size={32} className="text-amber-500" />
        },
        {
            title: "Mở rộng kết nối và chia sẻ",
            desc: "Xây dựng nền tảng mở cho phép kết nối liên thông với các hệ thống thông tin quốc gia khác, tạo hệ sinh thái dịch vụ công hiệu quả.",
            icon: <TrendingUp size={32} className="text-emerald-500" />
        },
        {
            title: "Nâng cao trải nghiệm người dùng",
            desc: "Tối ưu hóa giao diện, đơn giản hóa các tiện ích tra cứu để thân thiện với mọi đối tượng, từ chuyên gia đến người dân phổ thông.",
            icon: <Gem size={32} className="text-purple-500" />
        }
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            {/* Minimal Background/Header */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-16 pb-24 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-0 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto relative z-10 text-center">
                    <img src="/logo.png" alt="Quốc huy" class="w-20 h-20 md:w-24 md:h-24 object-contain mb-4 drop-shadow-lg mx-auto"></img>
                    <h1 className="text-3xl md:text-4xl font-bold uppercase mb-4 drop-shadow-md">Tầm nhìn & Định hướng</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg">Khẳng định vị thế và con đường phát triển chiến lược của Cổng Pháp luật Quốc gia trong kỷ nguyên số.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                {/* Tầm nhìn và Sứ mệnh - Styling cao cấp hơn với background trong suốt/hiệu ứng kinh */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Tầm nhìn */}
                        <div className="p-8 md:p-12 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-100 text-blue-800 rounded-xl shadow-sm">
                                        <Target size={28} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-[#0f4c81] uppercase tracking-wide">Tầm nhìn</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-[#0f4c81] pl-6 py-2">
                                    "{visionContent}"
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                                <Target size={220} />
                            </div>
                        </div>

                        {/* Sứ mệnh */}
                        <div className="p-8 md:p-12 bg-gradient-to-br from-gray-50/50 to-gray-100/50 backdrop-blur-sm relative overflow-hidden group border-t md:border-t-0 md:border-l border-gray-200/50">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-red-100 text-red-800 rounded-xl shadow-sm">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-red-800 uppercase tracking-wide">Sứ mệnh</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {missionContent}
                                </p>
                            </div>
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-red-800 transform group-hover:rotate-12">
                                <ShieldCheck size={220} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Định hướng phát triển */}
                <div>
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold tracking-widest text-red-600 uppercase mb-2 block">Chiến lược</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0f4c81] uppercase">Định hướng phát triển</h2>
                        <div className="w-20 h-1.5 bg-yellow-400 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {directions.map((dir, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 group translate-y-0 hover:-translate-y-2 relative overflow-hidden">
                                <div className="text-[80px] font-black text-gray-50 absolute -top-4 -right-2 group-hover:text-blue-50/50 transition-colors pointer-events-none select-none z-0">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner relative z-10">
                                    {dir.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#0f4c81] mb-4 relative z-10 group-hover:text-blue-600 transition-colors leading-tight">{dir.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm relative z-10">
                                    {dir.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VisionPage;

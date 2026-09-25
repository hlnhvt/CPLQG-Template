import React, { useEffect } from 'react';
import { Brain, Scale, Users, Shield, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';

const LaoCaiV2AboutPage = () => {
    useEffect(() => {
        document.title = "Giới thiệu - Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-white">
            <LaoCaiV2Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai-v2" className="hover:text-[#0f4c81] transition-colors">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Giới thiệu Cổng</span>
                </div>
            </div>

            {/* About Hero Banner - Đồng bộ màu sắc & phong cách Banner trang chủ Cổng Lào Cai */}
            <div className="relative text-white min-h-[360px] md:min-h-[400px] overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes laocaiV2RotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiV2RotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes laocaiV2PulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes laocaiV2FloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes laocaiV2SweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'laocaiV2SweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'laocaiV2PulseGlow 5.5s ease-in-out infinite 0.5s' }} />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiV2RotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiV2RotateCCW 18s linear infinite' }} />

                {/* 5. Điểm nhấn kim cương ánh kim */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiV2FloatDiamond 3.2s ease-in-out infinite' }} />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiV2FloatDiamond 3.6s ease-in-out infinite 0.8s' }} />

                <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 py-10">
                    <img src="/logo.png" alt="Quốc huy" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3 drop-shadow-xl" />
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 drop-shadow-md text-white">
                        CỔNG PHÁP LUẬT TỈNH LÀO CAI
                    </h1>

                    <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-2 rounded-full" />
                    
                    <p className="text-sm sm:text-base text-amber-50/95 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
                        Đồng hành cùng chính quyền, người dân và cộng đồng doanh nghiệp Lào Cai bước vào kỷ nguyên số, phát triển xanh, hài hòa và bản sắc
                    </p>
                </div>
            </div>

            {/* Main Content: cùng cấu trúc, phong cách với trang Giới thiệu của Cổng Pháp luật quốc gia */}
            <main className="flex-grow container mx-auto px-4 py-16 max-w-6xl space-y-24">

                {/* Sứ mệnh & Trí tuệ nhân tạo */}
                <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Nội dung bên trái */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-2xl md:text-4xl gap-2 text-[#0f4c81] font-bold leading-tight">
                            Đồng hành cùng người dân<br />
                            doanh nghiệp tỉnh Lào Cai bước vào kỷ nguyên mới
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
                            Cổng thông tin pháp luật chính thống của tỉnh Lào Cai do Sở Tư pháp tỉnh Lào Cai xây dựng, vận hành, ứng dụng công nghệ số và trí tuệ nhân tạo (AI) để cung cấp, tra cứu, giải đáp và phản hồi thông tin pháp luật.
                        </p>
                        <p className="text-blue-600 font-semibold text-lg">
                            Nhanh chóng - Chính xác - Minh bạch.
                        </p>
                    </div>

                    {/* Sơ đồ AI dạng vòng tròn bên phải */}
                    <div className="flex-1 flex justify-center items-center py-10 relative">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-blue-300 relative animate-[spin_60s_linear_infinite]">
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
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10 pointer-events-none">
                            <h3 className="text-[#0f4c81] font-bold text-lg md:text-xl mb-2">Trí tuệ nhân tạo</h3>
                            <p className="text-gray-500 text-xs md:text-sm">Ứng dụng trí tuệ nhân tạo (AI) để tối ưu hóa trải nghiệm tìm kiếm và tra cứu pháp luật</p>
                        </div>
                    </div>
                </section>

                {/* Giới thiệu chung */}
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl text-[#0f4c81] font-bold border-l-4 border-yellow-400 pl-4">
                        Giới thiệu chung
                    </h2>
                    <div className="text-gray-700 leading-relaxed text-left text-base md:text-lg space-y-4">
                        <p>
                            Cổng Pháp luật tỉnh Lào Cai là nền tảng số do Sở Tư pháp tỉnh Lào Cai xây dựng và vận hành dưới sự chỉ đạo của UBND tỉnh, kết nối liên thông với Cổng Pháp luật quốc gia. Đây là kênh thông tin chính thống, tập trung, tin cậy, thông suốt để người dân, doanh nghiệp có thể chủ động tìm hiểu thông tin pháp luật một cách thuận tiện, chính xác và đầy đủ.
                        </p>
                        <p>
                            Cổng cung cấp toàn diện các thông tin liên quan đến xây dựng và thực thi pháp luật trên địa bàn tỉnh: văn bản quy phạm pháp luật của HĐND, UBND tỉnh; dự thảo văn bản lấy ý kiến; phổ biến, giáo dục pháp luật; trợ giúp pháp lý và hỗ trợ pháp lý doanh nghiệp; bảo đảm thông tin, dữ liệu về pháp luật đáp ứng yêu cầu "đúng, đủ, sạch, sống" và công khai minh bạch. Đồng thời, thiết lập kênh hỏi đáp, góp ý trực tuyến để người dân, doanh nghiệp và chính quyền cùng trao đổi các vấn đề pháp lý.
                        </p>
                        <p>
                            Cổng tích hợp nhiều tính năng trực tuyến thông minh, ứng dụng trí tuệ nhân tạo để hỗ trợ giải đáp các câu hỏi, tình huống pháp lý. Đồng thời kết nối dữ liệu với các hệ thống quan trọng như: Cổng Pháp luật quốc gia, Cổng Dịch vụ công tỉnh Lào Cai, Cổng Thông tin điện tử tỉnh, ...
                        </p>
                        <p>
                            Cổng Pháp luật tỉnh Lào Cai cam kết đồng hành cùng nhân dân các dân tộc và cộng đồng doanh nghiệp trong kỷ nguyên số, góp phần xây dựng và phát triển Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.
                        </p>
                    </div>
                </section>

                {/* Video giới thiệu */}
                <section className="flex justify-center pt-8">
                    <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                        <img
                            src="/flag-video-placeholder.png"
                            alt="Video giới thiệu Cổng Pháp luật tỉnh Lào Cai"
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

            {/* Tầm nhìn */}
            <section className="w-full bg-[#0a2540] relative overflow-hidden text-white py-16">
                <div className="absolute inset-0 bg-right bg-cover bg-no-repeat opacity-40 mix-blend-screen mix-blend-lighten" style={{ backgroundImage: "url('/vision-bg.png')" }}></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-xl bg-blue-900/40 backdrop-blur-md border border-blue-400/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4 text-white drop-shadow-sm flex items-center gap-3">
                            TẦM NHÌN
                        </h2>
                        <p className="text-blue-50 text-base md:text-lg leading-relaxed">
                            Trở thành nền tảng pháp luật số tin cậy của tỉnh Lào Cai, ứng dụng công nghệ tiên tiến và trí tuệ nhân tạo để đưa pháp luật đến gần hơn với người dân, doanh nghiệp, góp phần xây dựng chính quyền kiến tạo, phục vụ và tỉnh Lào Cai phát triển nhanh, bền vững.
                        </p>
                    </div>
                </div>
            </section>

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2AboutPage;

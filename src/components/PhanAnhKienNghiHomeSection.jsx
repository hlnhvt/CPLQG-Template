import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle, ChevronRight, Sparkles, Shield, Clock, Award, LogIn, FileEdit, Activity } from 'lucide-react';

const PhanAnhKienNghiHomeSection = () => {
    return (
        <section className="py-16 text-white font-sans relative overflow-hidden border-t border-slate-800" style={{ background: 'linear-gradient(to bottom right, #0f172a, #1b1b4b, #1c39b2)' }}>
            {/* Glowing color mesh overlays inside */}
            <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none -z-10"></div>

            {/* Subtle digital dot-matrix background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none -z-10"></div>

            <div className="container mx-auto px-4 max-w-[1504px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* LEFT COLUMN: Texts & Glowing Button (5 columns) */}
                    <div className="lg:col-span-5 flex flex-col items-start text-left">


                        <h3 className="text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight leading-tight text-white mb-6">
                            Phản Ánh & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">Kiến Nghị Pháp Luật</span>
                        </h3>

                        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 font-light">
                            Cổng Pháp luật quốc gia tiếp nhận mọi ý kiến đóng góp, phản ánh vướng mắc về thực thi pháp lý, và đề xuất sáng kiến cải cách thể chế nhằm chung tay hoàn thiện hệ thống luật pháp Việt Nam vững mạnh.
                        </p>

                        <Link
                            to="/phan-anh-kien-nghi"
                            className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 font-extrabold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-orange-500/20 active:scale-98 relative overflow-hidden"
                        >
                            <MessageSquare size={18} className="text-white" />
                            <span>Gửi phản ánh, kiến nghị ngay</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-white/95" />
                        </Link>

                    </div>

                    {/* RIGHT COLUMN: 4-Step Process (7 columns) */}
                    <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                        <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
                            Quy trình 4 bước xử lý công khai minh bạch
                        </h4>

                        {/* 4 Step Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Step 1 */}
                            <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-2xl p-5 flex flex-col items-start shadow-sm group">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 text-amber-300 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <LogIn size={18} />
                                </div>
                                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                                    Bước 1
                                </span>
                                <h5 className="font-bold text-white text-base mb-2">
                                    Đăng nhập hệ thống
                                </h5>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Sử dụng tài khoản VNeID hoặc tài khoản Cổng DVCQG để xác thực.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-2xl p-5 flex flex-col items-start shadow-sm group">
                                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30 text-sky-300 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <FileEdit size={18} />
                                </div>
                                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                                    Bước 2
                                </span>
                                <h5 className="font-bold text-white text-base mb-2">
                                    Điền thông tin
                                </h5>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Nhập nội dung phản ánh, chọn cơ quan tiếp nhận và đính kèm tài liệu.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-2xl p-5 flex flex-col items-start shadow-sm group">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-300 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <Send size={18} />
                                </div>
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1.5">
                                    Bước 3
                                </span>
                                <h5 className="font-bold text-white text-base mb-2">
                                    Gửi & Nhận mã
                                </h5>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Gửi phản ánh và nhận Mã theo dõi. Xin lưu trữ lại mã này.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-2xl p-5 flex flex-col items-start shadow-sm group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-300 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <Activity size={18} />
                                </div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                                    Bước 4
                                </span>
                                <h5 className="font-bold text-white text-base mb-2">
                                    Theo dõi kết quả
                                </h5>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Dùng mã để tra cứu hoặc theo dõi ở mục hồ sơ cá nhân.
                                </p>
                            </div>

                        </div>

                        {/* Trust/Statistics Row at the bottom of Right Column */}
                        <div className="mt-4 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                            <div>
                                <span className="block text-xl md:text-2xl font-black text-amber-300">
                                    52,431+
                                </span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-medium">
                                    Ý kiến đã gửi
                                </span>
                            </div>
                            <div>
                                <span className="block text-xl md:text-2xl font-black text-emerald-400">
                                    98.8%
                                </span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-medium">
                                    Đã giải quyết thành công
                                </span>
                            </div>
                            <div>
                                <span className="block text-xl md:text-2xl font-black text-sky-400">
                                    &lt; 24 giờ
                                </span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-medium">
                                    Thời gian phân loại
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default PhanAnhKienNghiHomeSection;

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, LogIn, FileEdit, Activity, ArrowRight, ListChecks, Search, Star } from 'lucide-react';

const PhanAnhKienNghiHomeSection = () => {
    return (
        <section className="py-10 text-white font-sans relative overflow-hidden border-t border-slate-800" style={{ background: 'linear-gradient(135deg, rgb(15, 71, 158) 0%, rgb(69, 114, 187) 35%, rgb(42, 47, 127) 65%, rgb(71, 87, 129) 100%)' }}>
            {/* Background effects */}
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none z-0"></div>

            <div className="container mx-auto px-4 max-w-[1300px] relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">

                    {/* LEFT: Intro, Logo, CTA */}
                    <div className="w-full lg:w-[40%] flex flex-col items-center text-center">
                        <img src="/logo.png" alt="Logo Cổng PLQG" className="h-16 object-contain mb-5" />

                        <h3 className="text-3xl md:text-[28px] font-bold tracking-tight leading-tight text-white mb-4">
                            PHẢN ÁNH & KIẾN NGHỊ <br /> PHÁP LUẬT
                        </h3>

                        <p className="text-blue-100 text-[14.5px] leading-relaxed font-light mb-8">
                            Cổng Pháp luật quốc gia tiếp nhận mọi ý kiến đóng góp, phản ánh vướng mắc về thực thi pháp lý, và đề xuất sáng kiến cải cách thể chế nhằm chung tay hoàn thiện hệ thống luật pháp Việt Nam.
                        </p>

                        <a
                            href="https://paknvbqppl.moj.gov.vn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#0f4c81] hover:bg-slate-50 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-slate-100"
                        >
                            <MessageSquare size={18} className="text-[#0f4c81]" />
                            <span className="text-[14px]">Gửi phản ánh kiến nghị ngay</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#0f4c81]" />
                        </a>

                        {/* Stats mini */}
                        {/* <div className="mt-8 flex items-center gap-6 border-t border-white/20 pt-4 w-full">
                            <div>
                                <span className="block text-xl font-black text-amber-300">52,431+</span>
                                <span className="text-[11px] text-blue-200 uppercase tracking-wider font-medium">Ý kiến đã gửi</span>
                            </div>
                            <div className="w-px h-8 bg-white/20"></div>
                            <div>
                                <span className="block text-xl font-black text-emerald-400">98.8%</span>
                                <span className="text-[11px] text-blue-200 uppercase tracking-wider font-medium">Đã giải quyết</span>
                            </div>
                        </div> */}
                    </div>

                    {/* RIGHT: 4-Step Process (Blue Background, Horizontal Diagram) */}
                    <div className="w-full lg:w-[60%] flex items-stretch">
                        <div className="w-full bg-[#3c77d433] backdrop-blur-md border border-[#5083b9] rounded-[24px] p-8 md:p-10 shadow-2xl relative flex flex-col justify-center min-h-[300px]">

                            <h4 className="text-[18px] font-bold text-white mb-10 flex items-center gap-2 justify-center md:justify-start">
                                <ListChecks size={20} className="text-amber-400" />
                                Quy trình phản ánh kiến nghị
                            </h4>

                            <div className="relative mt-2">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-2 relative z-10">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <LogIn size={20} />
                                            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold border-2 border-[#11406e]">1</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13px] mb-1 px-1">Đăng nhập / Kết nối</h5>
                                        <p className="text-blue-200 text-[11px] leading-snug px-2 hidden md:block">Đăng ký tài khoản hoặc kết nối VNeID để truy cập.</p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <FileEdit size={20} />
                                            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold border-2 border-[#11406e]">2</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13px] mb-1 px-1">Gửi phản ánh</h5>
                                        <p className="text-blue-200 text-[11px] leading-snug px-2 hidden md:block">Gửi trực tiếp tới điều, khoản, điểm trong văn bản.</p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <Send size={20} className="ml-[-2px]" />
                                            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold border-2 border-[#11406e]">3</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13px] mb-1 px-1">Chuyển ý kiến</h5>
                                        <p className="text-blue-200 text-[11px] leading-snug px-2 hidden md:block">Hệ thống tự động chuyển ý kiến đến cơ quan có thẩm quyền.</p>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <Search size={20} />
                                            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold border-2 border-[#11406e]">4</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13px] mb-1 px-1">Tra cứu & Nhận KQ</h5>
                                        <p className="text-blue-200 text-[11px] leading-snug px-2 hidden md:block">Tra cứu tình hình xử lý và nhận kết quả đối với kiến nghị.</p>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <MessageSquare size={20} />
                                            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold border-2 border-[#11406e]">5</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13px] mb-1 px-1">Xem kiến nghị</h5>
                                        <p className="text-blue-200 text-[11px] leading-snug px-2 hidden md:block">Xem được các kiến nghị, phản ánh về VBQPPL trên Hệ thống.</p>
                                    </div>

                                    {/* Step 6 */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#059669] border-[3px] border-emerald-400 flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <Star size={20} />
                                            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-white text-[#059669] flex items-center justify-center text-[11px] font-bold border-2 border-[#059669]">6</div>
                                        </div>
                                        <h5 className="font-bold text-emerald-400 text-[13px] mb-1 px-1">Đánh giá hài lòng</h5>
                                        <p className="text-blue-200 text-[11px] leading-snug px-2 hidden md:block">Đánh giá sự hài lòng trong việc tiếp nhận và xử lý.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PhanAnhKienNghiHomeSection;

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, LogIn, FileEdit, Activity, ArrowRight, ListChecks } from 'lucide-react';

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

                        <Link
                            to="/phan-anh-kien-nghi"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#0f4c81] hover:bg-slate-50 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-slate-100"
                        >
                            <MessageSquare size={18} className="text-[#0f4c81]" />
                            <span className="text-[14px]">Gửi phản ánh kiến nghị ngay</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#0f4c81]" />
                        </Link>

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
                        <div className="w-full bg-[#0b2b5e]/90 backdrop-blur-md border border-[#2a598a] rounded-[24px] p-8 md:p-10 shadow-2xl relative flex flex-col justify-center min-h-[300px]">

                            <h4 className="text-[18px] font-bold text-white mb-10 flex items-center gap-2 justify-center md:justify-start">
                                <ListChecks size={20} className="text-amber-400" />
                                Quy trình phản ánh kiến nghị
                            </h4>

                            <div className="relative">
                                {/* Horizontal connecting line */}
                                <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-[#2a598a] z-0"></div>

                                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-4 md:gap-2">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-center text-center flex-1">
                                        <div className="w-[56px] h-[56px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <LogIn size={24} />
                                            <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[12px] font-bold border-2 border-[#11406e]">1</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13.5px] mb-1">Đăng nhập</h5>
                                        <p className="text-blue-200 text-[11.5px] leading-tight px-1 hidden md:block">Tài khoản VNeID hoặc Cổng DVCQG</p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col items-center text-center flex-1">
                                        <div className="w-[56px] h-[56px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <FileEdit size={24} />
                                            <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[12px] font-bold border-2 border-[#11406e]">2</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13.5px] mb-1">Điền thông tin</h5>
                                        <p className="text-blue-200 text-[11.5px] leading-tight px-1 hidden md:block">Nhập nội dung, đính kèm tài liệu</p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col items-center text-center flex-1">
                                        <div className="w-[56px] h-[56px] rounded-full bg-[#11406e] border-[3px] border-[#3672af] flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <Send size={24} className="ml-[-3px]" />
                                            <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[12px] font-bold border-2 border-[#11406e]">3</div>
                                        </div>
                                        <h5 className="font-bold text-white text-[13.5px] mb-1">Gửi & Nhận mã</h5>
                                        <p className="text-blue-200 text-[11.5px] leading-tight px-1 hidden md:block">Gửi phản ánh và lưu lại mã tra cứu</p>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex flex-col items-center text-center flex-1">
                                        <div className="w-[56px] h-[56px] rounded-full bg-[#059669] border-[3px] border-emerald-400 flex items-center justify-center text-white mb-3 relative shadow-lg">
                                            <Activity size={24} />
                                            <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-white text-[#059669] flex items-center justify-center text-[12px] font-bold border-2 border-[#059669]">4</div>
                                        </div>
                                        <h5 className="font-bold text-emerald-400 text-[13.5px] mb-1">Theo dõi</h5>
                                        <p className="text-blue-200 text-[11.5px] leading-tight px-1 hidden md:block">Tra cứu tình trạng hồ sơ cá nhân</p>
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

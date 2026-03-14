import React from 'react';
import { MessageCircle, ArrowUp, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative bg-gradient-to-r from-[#00b2e3] via-[#026bd5] to-[#011466] text-white overflow-hidden text-[14px]">
            {/* Background Pattern Overlay (Mimics Trống đồng drum pattern) */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-10">
                 <div className="w-[1200px] h-[1200px] rounded-full border-[1px] border-white/30 absolute top-[30%] left-1/2 -translate-x-1/2"></div>
                 <div className="w-[1000px] h-[1000px] rounded-full border-[1px] border-white/40 absolute top-[40%] left-1/2 -translate-x-1/2"></div>
                 <div className="w-[800px] h-[800px] rounded-full border-[2px] border-white/50 absolute top-[50%] left-1/2 -translate-x-1/2"></div>
                 <div className="w-[600px] h-[600px] rounded-full border-[1px] border-white/60 absolute top-[60%] left-1/2 -translate-x-1/2"></div>
                 <div className="w-[400px] h-[400px] rounded-full border-[2px] border-white/70 absolute top-[70%] left-1/2 -translate-x-1/2"></div>
                 <div className="w-[200px] h-[200px] rounded-full border-[1px] border-white/80 absolute top-[80%] left-1/2 -translate-x-1/2"></div>
                 {/* Rays radiating extending outwards */}
                 <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[20px] h-[600px] bg-white/20 origin-top rotate-45"></div>
                 <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[20px] h-[600px] bg-white/20 origin-top -rotate-45"></div>
                 <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[20px] h-[600px] bg-white/20 origin-top rotate-90"></div>
                 <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[20px] h-[600px] bg-white/20 origin-top -rotate-90"></div>
            </div>

            <div className="container mx-auto px-4 py-10 relative z-10 flex flex-col items-center justify-center text-center">
                {/* 1. Logo */}
                <div className="mb-4">
                    <img src="/logo.png" alt="Quốc huy" className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-contain drop-shadow-xl mx-auto" />
                </div>

                {/* 2. Title */}
                <h2 className="text-[24px] md:text-[28px] font-bold uppercase tracking-wider mb-2 drop-shadow-md">
                    CỔNG PHÁP LUẬT QUỐC GIA
                </h2>

                {/* 3. Info lines */}
                <div className="space-y-1.5 mb-5 md:mb-4">
                    <p className="font-semibold drop-shadow text-[15px]">Đơn vị chủ quản: Bộ Tư pháp</p>
                    <p className="drop-shadow">
                        Địa chỉ: Số 60 Trần Phú, phường Ba Đình, TP Hà Nội <span className="hidden md:inline mx-1">|</span><br className="md:hidden" /> Điện thoại: 024.62739715
                    </p>
                </div>

                {/* 4. Links */}
                <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-3 mb-5 drop-shadow">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                        <Link to="#" className="hover:text-yellow-300 transition-colors">Quy chế quản lý, vận hành, khai thác</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/chu-de-khao-sat" className="hover:text-yellow-300 transition-colors">Khảo sát đánh giá</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lien-he" className="hover:text-yellow-300 transition-colors">Liên hệ</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/ban-tin/dang-ky" className="hover:text-yellow-300 transition-colors">Đăng ký nhận bản tin</Link>
                        <span className="hidden md:inline">|</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span>Theo dõi Cổng Pháp luật quốc gia trên</span>
                        <a href="#" className="hover:opacity-80 transition-opacity drop-shadow-sm" title="Facebook">
                            {/* Facebook SVG Logo - White circle with blue 'f' */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="white"/>
                                <path d="M14.9 12H13V19H10V12H8V9H10V7.5C10 5.2 11.2 4 14 4H16V7H14.5C13.5 7 13 7.5 13 8.5V9H16L14.9 12Z" fill="#026bd5"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* 6. Visitors & Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl border-t border-white/20 pt-6 mt-2 pb-2">
                    <div className="text-[13px] opacity-90 drop-shadow mb-3 md:mb-0">
                        © Bản quyền thuộc Cổng Pháp luật quốc gia
                    </div>
                    <div className="drop-shadow bg-black/20 px-4 py-1.5 rounded-full border border-white/10">
                        Tổng lượt truy cập: <span className="text-yellow-400 font-bold ml-1 text-[15px]">1.436.718</span>
                    </div>
                </div>
            </div>

            {/* Bottom Absolute Center Button (Toggle up) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[24px] bg-[#1d4ed8] hover:bg-[#2563eb] cursor-pointer rounded-t-xl flex items-center justify-center transition-colors shadow-lg z-20" title="Collapse Footer">
                <ChevronUp size={20} className="text-white" />
            </div>

            {/* Right fixed/absolute action buttons */}
            <div className="absolute right-4 bottom-10 md:right-8 flex flex-col items-end gap-3 z-30">
                {/* Back to top button */}
                <button 
                    onClick={scrollToTop}
                    className="w-[44px] h-[44px] rounded-full border border-white/80 bg-white/10 flex items-center justify-center hover:bg-white/30 backdrop-blur-sm transition-all group shadow-sm mr-2"
                    title="Lên đầu trang"
                >
                    <ArrowUp size={20} className="text-white group-hover:-translate-y-1 transition-transform" />
                </button>
                
                {/* Live support button */}
                <button className="bg-[#00b2e3] hover:bg-[#009acb] shadow-xl text-white font-semibold flex items-center gap-2 px-4 py-2.5 rounded-full transition-transform hover:scale-105 border border-white/20">
                    <MessageCircle size={18} />
                    <span className="text-[14px]">Hỗ trợ trực tuyến</span>
                </button>
            </div>
        </footer>
    );
};

export default Footer;

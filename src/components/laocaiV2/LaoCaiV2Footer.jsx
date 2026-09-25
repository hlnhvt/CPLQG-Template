import React, { useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveSupportChatbox from './LiveSupportChatbox';

const LaoCaiV2Footer = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative bg-gradient-to-r from-[#00bdf2] via-[#0072ff] to-[#05115e] text-white overflow-hidden text-[14px]">
            {/* Background Pattern Overlay (Mimics Trống đồng drum pattern) */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-15 mix-blend-overlay">
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

            <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center text-center">
                {/* 1. Logo */}
                <div className="mb-3">
                    <img src="/logo.png" alt="Quốc huy" className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] object-contain drop-shadow-md mx-auto" />
                </div>

                {/* 2. Title */}
                <h2 className="text-[18px] md:text-[22px] font-bold uppercase mb-2 drop-shadow-md tracking-normal">
                    CỔNG PHÁP LUẬT TỈNH LÀO CAI
                </h2>

                {/* 3. Info lines */}
                <div className="space-y-1 mb-4 text-[13px] md:text-[14px]">
                    <p className="drop-shadow-sm">
                        Đơn vị chủ quản: Ủy ban nhân dân tỉnh Lào Cai | Đơn vị vận hành: Sở Tư pháp tỉnh Lào Cai
                    </p>
                    <p className="drop-shadow-sm">
                        Địa chỉ: Số 1B Hoàng Liên, Phường Nam Cường, tỉnh Lào Cai | Điện thoại: 0214.3824.163 | Email: sotp@laocai.gov.vn
                    </p>
                </div>

                {/* 4. Links */}
                <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-4 drop-shadow-sm text-[13px] md:text-[14px]">
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                        <Link to="#" className="hover:text-yellow-300 transition-colors">Quy chế quản lý, vận hành, khai thác</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lao-cai-v2/gioi-thieu" className="hover:text-yellow-300 transition-colors">Giới thiệu</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lao-cai-v2/van-ban" className="hover:text-yellow-300 transition-colors">Văn bản pháp luật</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lao-cai-v2/pho-bien-giao-duc" className="hover:text-yellow-300 transition-colors">Phổ biến, giáo dục pháp luật</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lao-cai-v2/tro-giup-phap-ly" className="hover:text-yellow-300 transition-colors">Trợ giúp pháp lý</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lao-cai-v2/ho-tro-phap-ly-doanh-nghiep" className="hover:text-yellow-300 transition-colors">Hỗ trợ pháp lý DN</Link>
                        <span className="hidden md:inline">|</span>
                        <Link to="/lao-cai-v2/lien-he" className="hover:text-yellow-300 transition-colors">Liên hệ</Link>
                        <span className="hidden md:inline">|</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Theo dõi Cổng trên</span>
                        <a href="#" className="hover:opacity-80 transition-opacity drop-shadow-sm" title="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="white" />
                                <path d="M14.9 12H13V19H10V12H8V9H10V7.5C10 5.2 11.2 4 14 4H16V7H14.5C13.5 7 13 7.5 13 8.5V9H16L14.9 12Z" fill="#0072ff" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* 5. Visitors count */}
                <div className="mb-5 drop-shadow flex items-center justify-center gap-4 text-[13px] md:text-[14px]">
                    <div>
                        Tổng lượt truy cập: <span className="text-yellow-400 font-bold ml-1">685.240</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></span>
                        Đang truy cập: <span className="text-yellow-400 font-bold ml-1">28</span>
                    </div>
                </div>

                {/* 6. Copyright */}
                <div className="text-[12px] md:text-[13px] font-light drop-shadow-sm opacity-90">
                    © Bản quyền thuộc Cổng Pháp luật tỉnh Lào Cai - Kết nối liên thông Cổng Pháp luật quốc gia
                </div>
            </div>

            {/* Right fixed action buttons */}
            <div className="fixed right-4 bottom-8 md:right-8 flex flex-col items-end gap-3 z-[100]">
                {/* Back to top button */}
                <button
                    onClick={scrollToTop}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00bdf2] to-[#05115e] border-[2px] border-white flex items-center justify-center hover:scale-110 transition-all shadow-[0_4px_15px_rgba(0,114,255,0.4)] mr-2 relative overflow-hidden group"
                    title="Lên đầu trang"
                >
                    <div className="absolute inset-0 rounded-full border border-white/30 scale-[1.15] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <ArrowUp size={20} className="text-white stroke-[2.5px]" />
                </button>

                {/* Live support button */}
                <button 
                    onClick={() => setIsChatOpen(prev => !prev)}
                    className="bg-[#00bdf2] hover:bg-[#00a6d6] shadow-lg text-white font-medium flex items-center gap-2 px-4 py-2 rounded-full transition-transform hover:scale-105 border border-white/20 active:scale-95"
                    title="Mở hộp thoại hỗ trợ trực tuyến"
                >
                    <MessageCircle size={18} />
                    <span className="text-[14px]">Hỗ trợ trực tuyến</span>
                </button>
            </div>

            {/* Live Support Chatbox Modal */}
            <LiveSupportChatbox 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
            />
        </footer>
    );
};

export default LaoCaiV2Footer;

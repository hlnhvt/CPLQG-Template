import React from 'react';
import { Search, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex flex-col font-sans">
            {/* Top Bar - Light Blue */}
            <div className="bg-[#3b82f6] text-white py-2 relative overflow-hidden">
                {/* Decorative background swirls (simplified) */}
                <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 Q150,100 300,0 T600,0 T900,0 T1200,0 T1500,0 T1800,0 T2100,0 V100 H0 Z" fill="rgba(255,255,255,0.1)" />
                        <path d="M0,50 Q150,-50 300,50 T600,50 T900,50 T1200,50 T1500,50 T1800,50 T2100,50 V100 H0 Z" fill="rgba(255,255,255,0.1)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative flex items-center justify-between h-[50px]">
                    {/* Left Logo */}
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Quốc huy Việt Nam" className="w-11 h-11 object-contain shrink-0 drop-shadow-md" />
                        <h1 className="text-base md:text-lg font-bold uppercase tracking-wider drop-shadow-sm whitespace-nowrap">
                            CỔNG PHÁP LUẬT QUỐC GIA
                        </h1>
                    </div>

                    {/* Right Utilities */}
                    <div className="flex justify-end items-center gap-4 text-xs xl:text-sm font-medium">
                        <button className="hover:text-yellow-300 transition-colors">
                            <Search size={16} />
                        </button>

                        <span className="whitespace-nowrap hidden lg:inline-block">Thứ Ba 24/02/2026, 10:28:24</span>

                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="font-semibold hidden lg:inline-block">Mới nhất</span>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-300 transition-colors whitespace-nowrap">
                            <span>International</span>
                            <ChevronDown size={14} />
                        </div>

                        <div className="pl-4 border-l border-white/30 hidden sm:block">
                            <button className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors bg-white/10 px-3 py-1.5 rounded-full">
                                <User size={14} />
                                <span>Đăng nhập</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Dark Blue Navigation */}
            <div className="bg-[#1e3a8a] text-white">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-center xl:justify-between items-center h-[46px] text-xs xl:text-sm font-medium relative z-50">
                        <ul className="flex items-center min-w-max h-full">
                            <li className="h-full">
                                <Link to="/" className="h-full flex items-center px-4 hover:bg-white/10 transition-colors border-b-2 border-transparent">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="h-full relative group cursor-pointer">
                                <a href="#" className="h-full flex items-center px-6 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Giới thiệu <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                {/* Dropdown */}
                                <div className="absolute top-full left-0 mt-0 w-64 bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-3 text-sm text-gray-200 font-normal space-y-1">
                                        <li>
                                            <Link to="/gioi-thieu" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                                Giới thiệu chung
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/tam-nhin" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                                Tầm nhìn - Định hướng
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/lien-he" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                                Thông tin liên hệ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Tin tức <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                {/* Dropdown Tin tức */}
                                <div className="absolute top-full left-0 mt-0 w-64 bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-3 text-sm text-gray-200 font-normal space-y-1">
                                        <li>
                                            <Link to="/tin-tuc/noi-bat" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                                Tin tức nổi bật
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                                Tọa đàm - Sự kiện
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full cursor-pointer">
                                <a href="#" className="h-full flex items-center px-4 hover:bg-white/10 transition-colors border-b-2 border-transparent">
                                    Nghiệp vụ phổ biến, giáo dục
                                </a>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Tìm hiểu pháp luật <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Văn bản pháp luật <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Cơ sở pháp lý <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Phản ánh, kiến nghị <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                            </li>
                            <li className="h-full cursor-pointer">
                                <a href="#" className="h-full flex items-center px-4 hover:bg-white/10 transition-colors border-b-2 border-transparent">
                                    Dự thảo VBQPPL
                                </a>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Kỷ luật <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

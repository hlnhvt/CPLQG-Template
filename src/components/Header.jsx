import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// --- Live Clock ---
const LiveClock = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const pad = n => String(n).padStart(2, '0');
    return (
        <span className="whitespace-nowrap hidden lg:inline-block">
            {days[now.getDay()]}, {pad(now.getDate())}/{pad(now.getMonth()+1)}/{now.getFullYear()}, {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
        </span>
    );
};

// --- User Initials Avatar ---
const getInitials = (name) => {
    if (!name) return 'N';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
};

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <header className="flex flex-col font-sans">
            {/* Top Bar - Light Blue */}
            <div className="bg-[#3b82f6] text-white py-2 relative z-[100]">
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

                        <LiveClock />

                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="font-semibold hidden lg:inline-block">Mới nhất</span>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-300 transition-colors whitespace-nowrap">
                            <span>International</span>
                            <ChevronDown size={14} />
                        </div>

                        {/* Auth Button / Avatar */}
                        <div className="pl-4 border-l border-white/30 hidden sm:block relative z-[200]" ref={dropdownRef}>
                            {user ? (
                                // Logged in: Avatar button
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(o => !o)}
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-800 hover:bg-blue-900 text-white font-bold text-[16px] border-2 border-white/50 transition-colors shadow"
                                        title={user.name}
                                    >
                                        {getInitials(user.name)}
                                    </button>

                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden animate-fadeIn">
                                            {/* User info */}
                                            <div className="px-4 py-4 border-b border-gray-100">
                                                <p className="font-bold text-gray-800 text-[15px] truncate">{user.name}</p>
                                                <p className="text-gray-500 text-[12px] mt-0.5">Xin chào {user.name.split(' ').pop()}</p>
                                            </div>
                                            {/* Logout */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3.5 text-red-600 hover:bg-red-50 transition-colors text-[14px] font-medium"
                                            >
                                                <LogOut size={16} />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Not logged in: Login button
                                <Link
                                    to="/dang-nhap"
                                    className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                                >
                                    <User size={14} />
                                    <span>Đăng nhập</span>
                                </Link>
                            )}
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
                                {/* Dropdown – Văn bản pháp luật */}
                                <div className="absolute top-full left-0 mt-0 w-[280px] bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-2 text-sm text-gray-200 font-normal">
                                        <li>
                                            <Link to="/van-ban/tim-kiem" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                                                Danh sách Văn bản QPPL
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/van-ban/hieu-luc" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>
                                                Văn bản có hiệu lực trong tháng
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/van-ban/het-hieu-luc" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
                                                Văn bản hết hiệu lực trong tháng
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/van-ban/moi-ban-hanh" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                                                Văn bản mới ban hành / Hợp nhất
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/van-ban/chu-y" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span>
                                                Văn bản được chú ý
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
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
                                <Link to="/du-thao" className="h-full flex items-center px-4 hover:bg-white/10 transition-colors border-b-2 border-transparent">
                                    Dự thảo VBQPPL
                                </Link>
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

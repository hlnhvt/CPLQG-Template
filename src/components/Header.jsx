import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, User, LogOut, Bookmark, Bell, LayoutDashboard, Settings, FileText, HelpCircle, Edit, Menu, X, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import AccessibilitySettings from './AccessibilitySettings';

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
            {days[now.getDay()]}, {pad(now.getDate())}/{pad(now.getMonth() + 1)}/{now.getFullYear()}, {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
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
    const displayUser = user;

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mobileNavExpanded, setMobileNavExpanded] = useState({}); // Track expanded groups in mobile menu

    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(e.target)) {
                setNotifOpen(false);
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

    const toggleMobileNavGroup = (key) => {
        setMobileNavExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <header className="flex flex-col font-sans relative">
            {/* Top Bar - Light Blue */}
            <div className="bg-[var(--bg-header-top)] text-[var(--text-on-blue)] py-2 relative z-[200] transition-colors duration-200">
                {/* Decorative background swirls (simplified) */}
                <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 Q150,100 300,0 T600,0 T900,0 T1200,0 T1500,0 T1800,0 T2100,0 V100 H0 Z" fill="rgba(255,255,255,0.1)" />
                        <path d="M0,50 Q150,-50 300,50 T600,50 T900,50 T1200,50 T1500,50 T1800,50 T2100,50 V100 H0 Z" fill="rgba(255,255,255,0.1)" />
                    </svg>
                </div>

                <div className="w-full max-w-[1350px] mx-auto px-4 relative flex items-center justify-between h-[50px]">
                    {/* Left Logo */}
                    <Link to={displayUser ? "/ca-nhan/trang-chu" : "/"} className="flex items-center gap-2">
                        <img src="/logo.png" alt="Quốc huy Việt Nam" className="w-11 h-11 object-contain shrink-0 drop-shadow-md" />
                        <h1 className="text-base md:text-lg font-bold uppercase drop-shadow-sm whitespace-nowrap">
                            CỔNG PHÁP LUẬT QUỐC GIA
                        </h1>
                    </Link>

                    {/* Right Utilities */}
                    <div className="flex justify-end items-center gap-4 text-xs xl:text-sm font-medium">
                        <button className="hover:text-yellow-300 transition-colors hidden sm:block">
                            <Search size={16} />
                        </button>

                        <AccessibilitySettings />

                        <LiveClock />

                        <div className="hidden xl:flex items-center gap-1.5 whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="font-semibold hidden lg:inline-block">Mới nhất</span>
                        </div>

                        <div className="hidden xl:flex items-center gap-1 cursor-pointer hover:text-yellow-300 transition-colors whitespace-nowrap">
                            <span>International</span>
                            <ChevronDown size={14} />
                        </div>

                        {/* Notification Bell (Logged In Only) */}
                        {displayUser && (
                            <div className="relative z-[200]" ref={notificationRef}>
                                <button
                                    onClick={() => setNotifOpen(o => !o)}
                                    className={`relative p-2 rounded-full transition-colors flex items-center justify-center ${notifOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
                                >
                                    <Bell size={18} />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-primary"></span>
                                </button>

                                {/* Notification Dropdown */}
                                {notifOpen && (
                                    <NotificationDropdown setNotifOpen={setNotifOpen} />
                                )}
                            </div>
                        )}

                        {/* Auth Button / Avatar */}
                        <div className="pl-4 border-l border-white/30 hidden sm:block relative z-[200]" ref={dropdownRef}>
                            {displayUser ? (
                                // Logged in: Avatar button
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(o => !o)}
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[16px] border-2 border-white/50 transition-colors shadow"
                                        title={displayUser.name}
                                    >
                                        {getInitials(displayUser.name)}
                                    </button>

                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden animate-fadeIn">
                                            {/* User info */}
                                            <div className="px-4 py-4 border-b border-gray-100">
                                                <p className="font-bold text-gray-800 text-[15px] truncate">{displayUser.name}</p>
                                                <p className="text-gray-500 text-[12px] mt-0.5">Xin chào {displayUser.name}</p>
                                            </div>
                                            {/* Dashboard Links */}
                                            <div className="py-2">
                                                <Link
                                                    to="/ca-nhan/ho-so"
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-[14px] font-medium"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <LayoutDashboard size={16} /> Khu vực cá nhân
                                                </Link>
                                                <Link
                                                    to="/can-bo/trang-chu"
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-[14px] font-medium"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <Building2 size={16} /> Khu vực cán bộ
                                                </Link>
                                                <Link
                                                    to="/ca-nhan/bo-suu-tap"
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-[14px] font-medium"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <Bookmark size={16} /> Bộ sưu tập
                                                </Link>
                                                <Link
                                                    to="/ca-nhan/thong-bao"
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-[14px] font-medium"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <Bell size={16} /> Thông báo
                                                </Link>
                                            </div>

                                            {/* Logout */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-100 text-red-600 hover:bg-red-100 transition-colors text-[14px] font-medium"
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

                        {/* Hamburger menu for mobile */}
                        <button
                            className="xl:hidden p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors ml-2"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Dark Blue Navigation (Desktop) */}
            <div className="hidden xl:block bg-[var(--bg-header-bottom)] text-[var(--text-on-blue)] transition-colors duration-200 relative z-[100]">
                <div className="w-full max-w-[1350px] mx-auto px-4">
                    <nav className="flex items-center justify-start h-[46px] text-xs xl:text-[11px] font-medium relative z-50 tracking-tight">
                        <ul className="flex items-center min-w-max h-full -ml-[5px]">
                            <li className="h-full border-r border-white/10">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="h-full flex items-center px-4 hover:bg-white/10 transition-colors gap-2 text-cyan-400 font-bold"
                                >
                                    <Menu size={18} />
                                </button>
                            </li>
                            <li className="h-full">
                                <Link to="/" className="h-full flex items-center px-4 hover:bg-white/10 transition-colors border-b-2 border-transparent">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Tin tức <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                <div className="absolute top-full left-0 mt-0 w-64 bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-3 text-[13px] text-gray-200 font-normal space-y-1">
                                        <li>
                                            <Link to="/tin-tuc/noi-bat" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>Tin tức nổi bật
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>Tọa đàm - Sự kiện
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full">
                                <Link to="/" className="h-full flex items-center px-4 hover:bg-white/10 transition-colors border-b-2 border-transparent">
                                    Nghị quyết số 66-NQ/TW
                                </Link>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Dự thảo, văn bản pháp luật <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                <div className="absolute top-full left-0 mt-0 w-64 bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-2 text-[13px] text-gray-200 font-normal">
                                        <li>
                                            <Link to="/van-ban" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>Văn bản pháp luật
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/du-thao" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>Dự thảo VBQPPL
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors">
                                    Tiêu điểm chính sách <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                <div className="absolute top-full left-0 mt-0 w-[420px] bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-2 text-[13px] text-gray-200 font-normal">
                                        <li><a href="#" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors"><span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>Phân quyền phân cấp</a></li>
                                        <li><a href="#" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors"><span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>Các số tiêu điểm chính sách trên VTV1</a></li>
                                        <li><a href="#" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors"><span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>Trung tâm tài chính quốc tế tại Việt Nam</a></li>
                                        <li><a href="#" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span>Cắt giảm, đơn giản hóa thủ tục hành chính dựa trên dữ liệu</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <Link to="/tro-giup-phap-ly" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                                    Trợ giúp pháp lý
                                </Link>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="#" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                                    Diễn đàn, hỗ trợ pháp lý <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                <div className="absolute top-full left-0 mt-0 w-[260px] bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-2 text-[13px] text-gray-200 font-normal">
                                        <li>
                                            <Link to="/dien-dan" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>Diễn đàn
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/dien-dan/thong-ke" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>Thống kê
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/dien-dan/su-kien" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>Buổi phát trực tuyến
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span>Hỗ trợ pháp lý doanh nghiệp
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <a href="/phan-anh-kien-nghi" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                                    Phản ánh kiến nghị <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </a>
                                <div className="absolute top-full left-0 mt-0 w-[260px] bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-2 text-[13px] text-gray-200 font-normal">
                                        <li>
                                            <Link to="/phan-anh-kien-nghi" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>Phản ánh kiến nghị
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/phan-anh-kien-nghi/huong-dan" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>Hướng dẫn gửi phản ánh
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/phan-anh-kien-nghi/tao-moi" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>Gửi phản ánh mới
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/phan-anh-kien-nghi?tab=search" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span>Tra cứu phản ánh
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <Link to="/hien-ke" className="h-full flex items-center px-4 gap-1.5 hover:bg-white/10 transition-colors whitespace-nowrap">
                                    Hiến kế
                                </Link>
                            </li>
                            <li className="h-full relative group cursor-pointer border-b-2 border-transparent">
                                <Link to="/cau-hoi-phap-luat" className="h-full flex items-center px-4 gap-1.5 group-hover:bg-[#0a1e3f] group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                                    Hỏi đáp <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                                </Link>
                                <div className="absolute top-full left-0 mt-0 w-[260px] bg-[#0a1e3f] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-t-2 border-cyan-400">
                                    <ul className="py-2 text-[13px] text-gray-200 font-normal">
                                        <li>
                                            <Link to="/cau-hoi-phap-luat" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>Danh sách câu hỏi
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/cau-hoi-phap-luat/chuyen-gia" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 hover:text-cyan-400 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>Chuyên gia tư vấn
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile/Desktop Sidebar Navigation */}
            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[250] transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-[300px] sm:w-[350px] bg-[#1a3673] z-[300] transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Header in sidebar */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#3b82f6]">
                    <Link to={displayUser ? "/ca-nhan/trang-chu" : "/"} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-2">
                        <img src="/logo.png" alt="Quốc huy" className="w-8 h-8 object-contain" />
                        <span className="text-white font-bold uppercase text-sm">CổNG PHÁP LUẬT QUỐC GIA</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-white/80 hover:text-white p-1">
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto flex-grow pb-8 custom-scrollbar">
                    {/* Navigation Links */}
                    <div className="flex flex-col text-white">
                        <Link to="/" onClick={() => setIsSidebarOpen(false)} className="px-5 py-4 border-b border-white/5 font-bold hover:bg-white/5 transition-colors">Trang chủ</Link>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('tienIch')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Tin tức
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.tienIch ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.tienIch ? 'max-h-96' : 'max-h-0'}`}>
                                <Link to="/tin-tuc/noi-bat" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Tin tức nổi bật</Link>
                                <a href="#" className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Tọa đàm - Sự kiện</a>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('multimedia')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Multimedia
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.multimedia ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.multimedia ? 'max-h-96' : 'max-h-0'}`}>
                                <Link to="/infographic" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Infographic</Link>
                                <Link to="/radio" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Radio pháp luật</Link>
                                <a href="#" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Ảnh</a>
                                <Link to="/video" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Video</Link>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('vanBan')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Văn bản pháp luật
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.vanBan ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.vanBan ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <Link to="/van-ban/tim-kiem" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Danh sách Văn bản QPPL</Link>
                                <Link to="/van-ban/hieu-luc" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Văn bản có hiệu lực trong tháng</Link>
                                <Link to="/van-ban/het-hieu-luc" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Văn bản hết hiệu lực trong tháng</Link>
                                <Link to="/van-ban/moi-ban-hanh" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Văn bản mới ban hành / Hợp nhất</Link>
                                <Link to="/van-ban/chu-y" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Văn bản được chú ý</Link>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <Link to="/tro-giup-phap-ly" onClick={() => setIsSidebarOpen(false)} className="block px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Trợ giúp pháp lý
                            </Link>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('hoiDap')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Hỏi đáp pháp luật
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.hoiDap ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.hoiDap ? 'max-h-96' : 'max-h-0'}`}>
                                <Link to="/cau-hoi-phap-luat" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Danh sách câu hỏi</Link>
                                <Link to="/cau-hoi-phap-luat/chuyen-gia" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Chuyên gia tư vấn</Link>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('hoTro')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Diễn đàn
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.hoTro ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.hoTro ? 'max-h-96' : 'max-h-0'}`}>
                                <Link to="/dien-dan" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Diễn đàn</Link>
                                <Link to="/dien-dan/thong-ke" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Thống kê</Link>
                                <Link to="/dien-dan/su-kien" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Buổi phát trực tuyến</Link>
                                <a href="#" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Hỗ trợ pháp lý doanh nghiệp</a>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('phanAnh')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Phản ánh, kiến nghị
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.phanAnh ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.phanAnh ? 'max-h-96' : 'max-h-0'}`}>
                                <Link to="/phan-anh-kien-nghi" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Phản ánh kiến nghị</Link>
                                <Link to="/phan-anh-kien-nghi/huong-dan" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Hướng dẫn gửi phản ánh</Link>
                                <Link to="/phan-anh-kien-nghi/tao-moi" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Gửi phản ánh mới</Link>
                                <Link to="/phan-anh-kien-nghi?tab=search" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Tra cứu phản ánh</Link>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('khaoSat')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                Khảo sát
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.khaoSat ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 bg-[#0f2350] ${mobileNavExpanded.khaoSat ? 'max-h-96' : 'max-h-0'}`}>
                                <Link to="/chu-de-khao-sat" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Chủ đề khảo sát</Link>
                                <Link to="/khao-sat" onClick={() => setIsSidebarOpen(false)} className="block px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Danh sách cuộc khảo sát</Link>
                            </div>
                        </div>

                        <div className="border-b border-white/5">
                            <Link to="/hien-ke" onClick={() => setIsSidebarOpen(false)} className="block px-5 py-4 font-bold hover:bg-white/5 transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                        </div>

                        <div className="border-b border-white/5">
                            <Link to="/du-thao" onClick={() => setIsSidebarOpen(false)} className="block px-5 py-4 font-bold hover:bg-white/5 transition-colors">Dự thảo VBQPPL</Link>
                        </div>

                        <div className="border-b border-white/5">
                            <button onClick={() => toggleMobileNavGroup('ai')} className="w-full flex items-center justify-between px-5 py-4 font-bold hover:bg-white/5 transition-colors">
                                AI pháp luật
                                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNavExpanded.ai ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Additional utilities */}
                        <div className="mt-4 pt-4 border-t border-white/10 px-5 space-y-4 font-bold">
                            <a href="#" className="flex items-center gap-2 text-white hover:text-cyan-400">
                                International
                            </a>

                            {!displayUser ? (
                                <Link to="/dang-nhap" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-2 text-white hover:text-cyan-400">
                                    <User size={18} /> Đăng nhập
                                </Link>
                            ) : (
                                <div className="space-y-4">
                                    <Link to="/ca-nhan/ho-so" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-2 text-white hover:text-cyan-400">
                                        <LayoutDashboard size={18} /> Khu vực cá nhân
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300">
                                        <LogOut size={18} /> Đăng xuất
                                    </button>
                                </div>
                            )}

                            {/* Search */}
                            <div className="relative mt-6 pt-4">
                                <Search size={18} className="absolute left-3 top-[30px] text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-full py-2.5 pl-10 pr-4 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

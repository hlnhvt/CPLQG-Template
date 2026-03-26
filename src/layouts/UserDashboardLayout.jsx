import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { User, Settings, Bookmark, Bell, PenTool, LayoutDashboard, ChevronRight, History, ChevronLeft, Menu, Camera, ShieldCheck, Edit3, Share2, Building2, MapPin, MoreHorizontal, Home, MessageSquare, Hash, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboardLayout = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebarCollapsed');
        return saved === 'true';
    });

    // States for custom avatar and cover photo preview
    const [coverImage, setCoverImage] = useState(null);
    const [avatarImage, setAvatarImage] = useState(null);

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (type === 'cover') setCoverImage(url);
            if (type === 'avatar') setAvatarImage(url);
        }
    };

    // Scroll state for sticky header
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }, [isCollapsed]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const locationToUse = useLocation();
    const isHomePage = locationToUse.pathname === '/ca-nhan/trang-chu';

    const menuItems = [
        { path: '/ca-nhan/trang-chu', icon: Home, label: 'Trang chủ của tôi' },
        { path: '/ca-nhan/ho-so', icon: User, label: 'Hồ sơ cá nhân' },
        { path: '/ca-nhan/cai-dat', icon: Settings, label: 'Cấu hình cá nhân hóa' },
        { path: '/ca-nhan/lich-su', icon: History, label: 'Lịch sử hoạt động' },
        { path: '/ca-nhan/bo-suu-tap', icon: Bookmark, label: 'Bộ sưu tập của tôi' },
        { path: '/ca-nhan/thong-bao', icon: Bell, label: 'Trung tâm thông báo' },
        { path: '/ca-nhan/dien-dan-quan-tam', icon: Hash, label: 'Diễn đàn quan tâm' },
        { path: '/ca-nhan/chu-de-dien-dan', icon: MessageSquare, label: 'Trạm quản lý chủ đề diễn đàn' },
        { path: '/ca-nhan/tin-bai', icon: LayoutDashboard, label: 'Tin bài cộng tác viên' },
        { path: '/ca-nhan/dang-ky-cong-tac-vien', icon: PenTool, label: 'Đăng ký cộng tác viên' },
        { path: '/ca-nhan/cau-hoi-ca-nhan', icon: HelpCircle, label: 'Quản lý câu hỏi của tôi' },
        { path: '/ca-nhan/phan-anh-kien-nghi', icon: FileText, label: 'Phản ánh kiến nghị của tôi' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20 relative">
            {/* Sticky Scroll Header */}
            <div className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 transform ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="container mx-auto px-4 max-w-[1500px] h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center font-bold text-gray-400 text-sm">
                            {(avatarImage || user?.avatar) ? (
                                <img src={avatarImage || user?.avatar || "/images/default_avatar.png"} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user?.name ? user.name.split(' ').pop().charAt(0) : 'Q'
                            )}
                        </div>
                        <span className="font-bold text-gray-900">{user?.name || 'Nguyễn Anh Quân'}</span>
                    </div>
                    <button className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Breadcrumb Header */}
            {!isHomePage && (
                <div className="bg-white border-b border-gray-200 pt-4 pb-4 shadow-sm z-10 relative">
                    <div className="container mx-auto px-4 max-w-[1500px]">
                        <div className="flex items-center text-[13px] text-gray-500 whitespace-nowrap overflow-x-auto">
                            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
                            <ChevronRight size={14} className="mx-2 shrink-0" />
                            <span className="text-gray-800 font-medium">Khu vực cá nhân</span>
                        </div>
                    </div>
                </div>
            )}

            {/* LinkedIn-style Profile Header Banner (Compact) */}
            {!isHomePage && (
                <div className="container mx-auto px-4 max-w-[1500px] mt-4 relative z-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                        {/* Cover Photo */}
                        <label className="block h-[100px] md:h-[120px] bg-gray-100 relative group cursor-pointer transition-colors hover:brightness-105 overflow-hidden">
                            <img src={coverImage || "/images/dong_son_cover.png"} alt="Cover" className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-gray-700 shadow flex items-center justify-center hover:bg-gray-100 transition-all text-sm font-medium z-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                                <Camera size={15} className="text-blue-600" />
                            </div>
                            <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} />
                        </label>

                        {/* Profile Info Area */}
                        <div className="px-6 pb-5 relative flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                            {/* Avatar that overlaps the cover */}
                            <div className="relative -mt-[40px] md:-mt-[50px] shrink-0">
                                <label className="block relative group cursor-pointer">
                                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-gray-50 border-[3px] border-white shadow-md flex items-center justify-center text-3xl md:text-4xl font-bold text-white overflow-hidden">
                                        <img src={avatarImage || user?.avatar || "/images/default_avatar.png"} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                    <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatar')} />
                                </label>
                            </div>

                            {/* User Details */}
                            <div className="flex-1 w-full pt-1 md:pt-3">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div>
                                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-1 flex items-center gap-2">
                                            {user?.name || 'Nguyễn Anh Quân'}
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wide flex items-center gap-1">
                                                <ShieldCheck size={12} /> Đã xác minh
                                            </span>
                                        </h1>
                                        <p className="text-[14px] font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                                            {user?.role === 'collaborator' ? 'Cộng tác viên pháp lý' : 'Chuyên viên pháp chế'}
                                        </p>
                                        <p className="text-[13px] text-gray-500 flex items-center gap-1.5">
                                            <MapPin size={14} className="text-gray-400" /> Cầu Giấy, Hà Nội &middot; <Link to="/ca-nhan/ho-so" className="text-blue-600 font-medium hover:underline">Chi tiết liên hệ</Link>
                                        </p>
                                    </div>

                                    {/* Right Side: Workplace & Actions */}
                                    <div className="flex md:flex-col justify-between md:justify-start items-center md:items-end gap-3 shrink-0">
                                        {/* Action Icons */}
                                        <div className="flex gap-2">
                                            <Link to="/ca-nhan/ho-so" className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Chỉnh sửa hồ sơ">
                                                <Edit3 size={16} />
                                            </Link>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Chia sẻ trang cá nhân">
                                                <Share2 size={16} />
                                            </button>
                                        </div>

                                        {/* Workplace Info */}
                                        <div className="flex items-center gap-2.5 bg-gray-50/80 px-3 py-1.5 rounded-lg border border-gray-100 cursor-default hover:bg-gray-100 transition-colors">
                                            <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 p-0.5 overflow-hidden">
                                                <img src="/images/moj_logo.svg" alt="Bộ tư pháp" className="max-w-full max-h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-full h-full bg-red-600 rounded flex items-center justify-center text-white text-[10px] font-bold">BTP</div>' }} />
                                            </div>
                                            <div className="flex flex-col pr-1">
                                                <span className="text-[13px] font-bold text-gray-800 leading-tight">Cục CNTT - Bộ Tư Pháp</span>
                                                <span className="text-[11px] text-gray-500 leading-tight mt-0.5">Đơn vị công tác</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 max-w-[1500px] mt-8 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className={`w-full shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'md:w-[88px]' : 'md:w-[280px]'}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                        {/* Header Area */}
                        <div className={`bg-[#0f4c81] p-4 flex items-center transition-all duration-300 ${isCollapsed ? 'flex-col justify-center py-5' : 'justify-between'}`}>
                            <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0 h-0 hidden' : 'w-auto opacity-100'}`}>
                                <h2 className="text-white font-bold text-lg mb-0.5 leading-tight">Khu vực cá nhân</h2>
                                <p className="text-white/80 text-[12px]">Quản lý tài khoản & Dịch vụ</p>
                            </div>

                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className={`text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors ${isCollapsed ? '' : ''}`}
                                title={isCollapsed ? "Mở rộng" : "Thu gọn"}
                            >
                                {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="p-3 space-y-1.5 min-h-[400px]">
                            {menuItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path);
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        title={isCollapsed ? item.label : undefined}
                                        className={`flex items-center rounded-lg font-medium text-[14px] transition-all duration-200 group relative ${isCollapsed
                                            ? 'justify-center p-3'
                                            : 'px-4 py-3 gap-3'
                                            } ${isActive
                                                ? 'bg-blue-50 text-blue-700 bg-opacity-70'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon size={isCollapsed ? 22 : 18} className={`shrink-0 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />

                                        <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed
                                            ? 'w-0 opacity-0 hidden'
                                            : 'w-auto opacity-100'
                                            }`}>
                                            {item.label}
                                        </span>

                                        {/* CSS Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-800 text-white text-[13px] rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-gray-800">
                                                {item.label}
                                            </div>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserDashboardLayout;

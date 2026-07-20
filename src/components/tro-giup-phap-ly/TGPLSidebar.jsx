import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, ChevronRight, Scale, Home, History, ClipboardList, Video, Newspaper, BookOpen, Megaphone, GraduationCap, Lightbulb, Users, Briefcase } from 'lucide-react';

const TGPLSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/tro-giup-phap-ly', label: 'Giới thiệu chung', icon: Home },
        { path: '/tro-giup-phap-ly/lich-su-phat-trien', label: 'Lịch sử hình thành và phát triển', icon: History },
        { path: '/tro-giup-phap-ly/chuc-nang-nhiem-vu', label: 'Chức năng, nhiệm vụ', icon: ClipboardList },
        { path: '/tro-giup-phap-ly/co-cau-to-chuc', label: 'Cơ cấu tổ chức', icon: Building2 },
        { path: '/tro-giup-phap-ly/to-chuc', label: 'Tổ chức thực hiện TGPL', icon: Scale },
        { path: '/tro-giup-phap-ly/danh-ba', label: 'Danh bạ điện tử TGPL', icon: Phone },
        { path: '/tro-giup-phap-ly/video', label: 'Video phóng sự TGPL', icon: Video },
        { path: '/tro-giup-phap-ly/tin-tuc', label: 'Tin tức hoạt động TGPL', icon: Newspaper },
        { path: '/tro-giup-phap-ly/an-pham', label: 'Ấn phẩm truyền thông & tài liệu', icon: BookOpen },
        { path: '/tro-giup-phap-ly/chi-dao-dieu-hanh', label: 'Thông tin chỉ đạo, điều hành', icon: Megaphone },
        { path: '/tro-giup-phap-ly/huong-dan-nghiep-vu', label: 'Hướng dẫn nghiệp vụ', icon: GraduationCap },
        { path: '/tro-giup-phap-ly/nghien-cuu-trao-doi', label: 'Nghiên cứu & trao đổi', icon: Lightbulb },
        { path: '/tro-giup-phap-ly/nguoi-thuc-hien', label: 'Người thực hiện TGPL', icon: Users },
        { path: '/tro-giup-phap-ly/vu-viec-dien-hinh', label: 'Vụ việc', icon: Briefcase },
    ];

    return (
        <aside className="w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col">

            {/* Navigation Menu */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                <div className="bg-[#1e3a8a] text-white px-5 py-4 flex items-center gap-3">
                    <Scale size={20} className="text-yellow-400" />
                    <h3 className="font-bold text-[16px] uppercase tracking-wide">Chuyên mục Giới thiệu</h3>
                </div>
                <nav className="flex flex-col p-2">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f4c81] rounded-xl shadow-lg border border-blue-900 overflow-hidden text-white p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-blue-800">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                            <Building2 size={24} className="text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-0.5">Cơ quan quản lý</p>
                            <h3 className="font-bold text-lg leading-tight drop-shadow-sm">CỤC PHỔ BIẾN, GIÁO DỤC PHÁP LUẬT VÀ TRỢ GIÚP PHÁP LÝ</h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-blue-300 mt-1 shrink-0" />
                            <p className="text-sm text-blue-50 leading-relaxed font-medium">
                                60 Trần Phú, Ba Đình, Hà Nội
                            </p>
                        </div>
                    </div>

                    {/* Hotline Box */}
                    <div className="mt-6 bg-[#dc2626] rounded-lg p-4 text-center border border-red-500 shadow-inner">
                        <p className="text-xs uppercase font-bold text-red-100 mb-1">Đường dây nóng hỗ trợ miễn phí</p>
                        <p className="text-2xl font-bold tracking-wider text-white drop-shadow-md">1800.1233</p>
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default TGPLSidebar;

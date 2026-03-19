import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, ChevronRight, Scale } from 'lucide-react';

const TGPLSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/tro-giup-phap-ly/gioi-thieu', label: 'Giới thiệu chung' },
        { path: '/tro-giup-phap-ly/lich-su-phat-trien', label: 'Lịch sử hình thành và phát triển' },
        { path: '/tro-giup-phap-ly/chuc-nang-nhiem-vu', label: 'Chức năng, nhiệm vụ' },
        { path: '/tro-giup-phap-ly/co-cau-to-chuc', label: 'Cơ cấu tổ chức' },
        { path: '/tro-giup-phap-ly/to-chuc', label: 'Tổ chức thực hiện TGPL' },
        { path: '/tro-giup-phap-ly/nguoi-thuc-hien', label: 'Người thực hiện TGPL' },
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
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-blue-50 text-blue-700 bg-opacity-70' 
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                            >
                                <ChevronRight 
                                    size={16} 
                                    className={`shrink-0 transition-transform ${isActive ? 'text-blue-600 translate-x-1' : 'text-gray-400'}`} 
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
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-blue-800">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                            <Building2 size={24} className="text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-0.5">Cơ quan quản lý</p>
                            <h3 className="font-bold text-lg leading-tight drop-shadow-sm">CỤC TRỢ GIÚP PHÁP LÝ</h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-blue-300 mt-1 shrink-0" />
                            <p className="text-sm text-blue-50 leading-relaxed font-medium">
                                60 Trần Phú, Ba Đình, Hà Nội
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-blue-300 shrink-0" />
                            <p className="text-sm font-bold tracking-wide">
                                024.627.39631
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-blue-300 shrink-0" />
                            <p className="text-sm text-blue-50">
                                ctgpl@moj.gov.vn
                            </p>
                        </div>
                    </div>

                    {/* Hotline Box */}
                    <div className="mt-6 bg-[#dc2626] rounded-lg p-4 text-center border border-red-500 shadow-inner">
                        <p className="text-xs uppercase font-bold text-red-100 mb-1">Đường dây nóng hỗ trợ miễn phí</p>
                        <p className="text-2xl font-bold tracking-wider text-white drop-shadow-md">1900.6179</p>
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default TGPLSidebar;

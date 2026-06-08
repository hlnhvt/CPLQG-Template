import React, { useEffect, useState } from 'react';
import { Search, Landmark, FileText, ArrowRight, Coins, MapPin, Handshake, Lightbulb, AlertTriangle, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { councilData, programsData, effectiveModelsData, difficultiesData } from './data/mockData';

const MENU_ITEMS = [
    { key: 'trang-chu', label: 'Tổng quan', color: 'bg-blue-500' },
    { key: 'gioi-thieu', label: 'Giới thiệu', color: 'bg-green-500' },
    { key: 'tin-tuc', label: 'Tin tức giới thiệu văn bản mới', color: 'bg-amber-500' },
    { key: 'thong-cao', label: 'Thông cáo báo chí', color: 'bg-red-500' },
    { key: 'van-ban-chi-dao', label: 'Văn bản chỉ đạo, hướng dẫn', color: 'bg-purple-500' },
    { key: 'tai-lieu-huong-dan', label: 'Tài liệu hướng dẫn nghiệp vụ', color: 'bg-pink-500' },
    { key: 'nghien-cuu-trao-doi', label: 'Nghiên cứu, trao đổi', color: 'bg-cyan-500' },
    { key: 'tu-sach-phap-luat', label: 'Tủ sách pháp luật', color: 'bg-lime-500' },
    { key: 'boi-duong-tap-huan', label: 'Bồi dưỡng, tập huấn trực tuyến', color: 'bg-orange-500' },
    { key: 'thi-tim-hieu', label: 'Thi tìm hiểu pháp luật', color: 'bg-teal-500' },
    { key: 'hoi-dong-phoi-hop', label: 'Hội đồng phối hợp', color: 'bg-blue-400' },
    { key: 'de-an-chuong-trinh', label: 'Đề án/Chương trình', color: 'bg-yellow-500' },
    { key: 'bao-cao-vien', label: 'Báo cáo viên', color: 'bg-rose-500' },
    { key: 'tuyen-truyen-vien', label: 'Tuyên truyền viên', color: 'bg-indigo-500' },
    { key: 'to-hoa-giai', label: 'Tổ hòa giải', color: 'bg-pink-600' },
    { key: 'hoa-giai-vien', label: 'Hòa giải viên', color: 'bg-cyan-400' },
    { key: 'xa-dat-chuan', label: 'Xã đạt chuẩn TCPL', color: 'bg-lime-600' },
    { key: 'kinh-phi', label: 'Kinh phí hoạt động PBGDPL', color: 'bg-orange-600' },
    { key: 'kho-khan-vuong-mac', label: 'Khó khăn, vướng mắc, kiến nghị', color: 'bg-teal-600' },
    { key: 'mo-hinh-hoat-dong', label: 'Mô hình hoạt động hiệu quả', color: 'bg-blue-600' }
];

function VerticalMenuNav({ isSidebarOpen, setIsSidebarOpen, activeMenu, setActiveMenu }) {
    const getNavIcon = (key, isActive) => {
        const strokeClass = isActive ? "stroke-[#2580f0]" : "stroke-slate-500 group-hover:stroke-[#2580f0]";
        const props = {
            width: 20, height: 20, viewBox: "0 0 24 24", fill: "none",
            stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
            className: `shrink-0 transition-colors ${strokeClass}`
        };
        switch (key) {
            case 'trang-chu': return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
            case 'gioi-thieu': return <svg {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
            case 'tin-tuc': return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
            case 'thong-cao': return <svg {...props}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>;
            case 'van-ban-chi-dao': return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
            case 'tai-lieu-huong-dan': return <svg {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
            case 'nghien-cuu-trao-doi': return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
            case 'tu-sach-phap-luat': return <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
            case 'boi-duong-tap-huan': return <svg {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>;
            case 'thi-tim-hieu': return <svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
            case 'hoi-dong-phoi-hop': return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
            case 'de-an-chuong-trinh': return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
            case 'bao-cao-vien': return <svg {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>;
            case 'tuyen-truyen-vien': return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
            case 'to-hoa-giai': return <svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
            case 'hoa-giai-vien': return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
            case 'xa-dat-chuan': return <svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
            case 'kinh-phi': return <svg {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
            case 'kho-khan-vuong-mac': return <svg {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
            case 'mo-hinh-hoat-dong': return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
            default: return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-[#d8e1f2] h-fit lg:sticky lg:top-4 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-full lg:w-[280px]' : 'w-full lg:w-[88px]'}`}>
            <div className={`p-4 flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} border-b border-[#e8effc]`}>
                {isSidebarOpen && <h3 className="text-[15px] font-bold text-[#1b2b49] uppercase tracking-wide truncate">Danh mục</h3>}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#2580f0] transition-colors"
                    title={isSidebarOpen ? "Thu gọn menu" : "Mở rộng menu"}
                >
                    {isSidebarOpen ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>
            </div>

            <div className="p-3">
                <ul className="flex flex-col gap-1 list-none m-0 p-0">
                    {MENU_ITEMS.map((item) => {
                        const isActive = activeMenu === item.key;

                        return (
                            <li key={item.key} className="flex flex-col group relative">
                                <div
                                    className={`flex items-center p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${isActive
                                            ? 'bg-blue-50/70 text-[#2580f0]'
                                            : 'hover:bg-slate-50 text-slate-600 hover:text-[#2580f0]'
                                        } ${!isSidebarOpen ? 'justify-center' : 'justify-start'}`}
                                    onClick={() => {
                                        if (!isSidebarOpen) setIsSidebarOpen(true);
                                        setActiveMenu(item.key);
                                    }}
                                    title={!isSidebarOpen ? item.label : undefined}
                                >
                                    <div className="flex items-center gap-3">
                                        {getNavIcon(item.key, isActive)}
                                        {isSidebarOpen && (
                                            <span className={`font-semibold text-[13px] leading-[1.3] ${isActive ? 'text-[#2580f0]' : ''}`}>
                                                {item.label}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

const PhoBienGiaoDucPhapLuatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('trang-chu');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getBadgeColor = (type) => {
        switch (type) {
            case 'Trung ương': return 'bg-red-100 text-red-600';
            case 'Tỉnh': return 'bg-blue-100 text-blue-600';
            case 'Huyện': return 'bg-green-100 text-green-600';
            case 'Xã': return 'bg-yellow-100 text-yellow-600';
            case 'Hoạt động': return 'text-green-500 font-semibold';
            case 'Kiến nghị': return 'bg-blue-100 text-blue-600';
            case 'Khó khăn': return 'bg-yellow-100 text-yellow-700';
            case 'Vướng mắc': return 'bg-pink-100 text-pink-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="bg-[#f0f4f8] min-h-screen pb-16 font-sans">
            {/* 1. Hero Banner */}
            <div className="bg-gradient-to-r from-[#0a1e3f] to-[#1a4b9c] text-white pt-20 pb-28 relative overflow-hidden">
                {/* Decorative particles */}
                <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full opacity-50"></div>
                <div className="absolute top-40 right-40 w-1 h-1 bg-white rounded-full opacity-50"></div>
                <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-40"></div>
                <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-30"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 flex items-center gap-2 uppercase tracking-wide">
                        <Landmark size={14} /> Hệ thống PBGDPL Quốc gia
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Phổ biến Giáo dục<br />Pháp luật
                    </h1>
                    <p className="text-blue-100 text-sm md:text-base max-w-xl mb-10">
                        Nền tảng thông tin pháp luật hàng đầu dành cho người dân và doanh nghiệp. Tiếp cận tri thức pháp luật mọi lúc, mọi nơi.
                    </p>
                    <div className="w-full max-w-2xl relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm văn bản, tài liệu, khóa học..."
                            className="w-full h-14 pl-6 pr-12 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xl"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Layout Wrapper */}
            <div className="mx-auto max-w-[1520px] px-4 -mt-14 relative z-20 lg:px-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

                    {/* Sidebar Menu */}
                    <aside className={`shrink-0 transition-all duration-300 z-30 ${isSidebarOpen ? 'w-full lg:w-[280px]' : 'w-full lg:w-[88px]'}`}>
                        <VerticalMenuNav
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                            activeMenu={activeMenu}
                            setActiveMenu={setActiveMenu}
                        />
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0 space-y-6 z-20">
                        {/* Khối 1: Hội đồng PBGDPL */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <Landmark size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Hội đồng PBGDPL</h2>
                                        <p className="text-xs text-gray-500">Cơ quan tư vấn về phổ biến, giáo dục pháp luật</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                    Xem tất cả <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider">
                                            <th className="px-4 py-3 font-semibold rounded-tl-lg">Cấp</th>
                                            <th className="px-4 py-3 font-semibold">Đơn vị</th>
                                            <th className="px-4 py-3 font-semibold">Tỉnh/TP</th>
                                            <th className="px-4 py-3 font-semibold">Nhiệm kỳ</th>
                                            <th className="px-4 py-3 font-semibold text-center">Thành viên</th>
                                            <th className="px-4 py-3 font-semibold rounded-tr-lg">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {councilData.map((item, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getBadgeColor(item.level)}`}>
                                                        {item.level}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 font-medium text-gray-800">{item.unit}</td>
                                                <td className="px-4 py-3 text-gray-600">{item.province}</td>
                                                <td className="px-4 py-3 text-gray-600">{item.term}</td>
                                                <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.members}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-[12px] ${getBadgeColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Grid 2 Columns */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Khối 2: Chương trình, đề án */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 leading-tight">Chương trình, đề án PBGDPL</h2>
                                            <p className="text-xs text-gray-500">Các chương trình, đề án đang triển khai</p>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        Xem tất cả <ArrowRight size={14} />
                                    </button>
                                </div>
                                <div className="flex-1 space-y-4">
                                    {programsData.map((prog, idx) => (
                                        <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <h3 className="font-bold text-gray-800 text-[15px] mb-1.5 line-clamp-2">{prog.title}</h3>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2 font-medium">
                                                <span className="flex items-center gap-1"><FileText size={12} /> {prog.category}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="flex items-center gap-1">{prog.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2">{prog.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column for Stats */}
                            <div className="flex flex-col gap-6">
                                {/* Khối 3: Kinh phí */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                                <Coins size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900 leading-tight">Kinh phí PBGDPL</h2>
                                                <p className="text-xs text-gray-500">Phân bổ ngân sách cho hoạt động PBGDPL</p>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                            Xem chi tiết <ArrowRight size={14} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mb-6 px-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">1.200 tỷ</div>
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Tổng kinh phí</div>
                                        </div>
                                        <div className="text-center hidden sm:block">
                                            <div className="text-xl font-bold text-indigo-600">120 tỷ</div>
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Trung ương</div>
                                        </div>
                                        <div className="text-center hidden sm:block">
                                            <div className="text-xl font-bold text-purple-600">80 tỷ</div>
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Bộ ngành</div>
                                        </div>
                                        <div className="text-center hidden sm:block">
                                            <div className="text-xl font-bold text-blue-800">1.000 tỷ</div>
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Địa phương</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">Phân bổ theo cấp</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-[11px] text-gray-600 mb-1 font-medium">
                                                    <span>Trung ương</span>
                                                    <span>120 tỷ (10%)</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[11px] text-gray-600 mb-1 font-medium">
                                                    <span>Bộ ngành</span>
                                                    <span>80 tỷ (6.7%)</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '6.7%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[11px] text-gray-600 mb-1 font-medium">
                                                    <span>Địa phương</span>
                                                    <span>1.000 tỷ (83.3%)</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '83.3%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Split Stats: Chuẩn tiếp cận & Hòa giải */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Khối 4: Chuẩn tiếp cận */}
                                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <MapPin size={16} />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold text-gray-900 leading-tight">Chuẩn tiếp cận pháp luật</h2>
                                                    <p className="text-[10px] text-gray-500">Kết quả xây dựng xã đạt chuẩn</p>
                                                </div>
                                            </div>
                                            <button className="text-blue-600 bg-blue-50 p-1.5 rounded hover:bg-blue-100 transition-colors shrink-0">
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-blue-600">8.234</div>
                                                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Xã đạt chuẩn</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-green-500">82,5%</div>
                                                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">Tỷ lệ đạt chuẩn</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Khối 5: Hòa giải cơ sở */}
                                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                                <Handshake size={16} />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-bold text-gray-900 leading-tight">Hòa giải ở cơ sở</h2>
                                                <p className="text-[10px] text-gray-500">Mạng lưới hòa giải viên, tổ hòa giải</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-around">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-teal-600">8.921</div>
                                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Tổ hòa giải</div>
                                            </div>
                                            <div className="w-px h-10 bg-gray-200"></div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-teal-600">12.456</div>
                                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Hòa giải viên</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Khối 6: Mô hình hoạt động hiệu quả */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                                        <Lightbulb size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Mô hình hoạt động hiệu quả</h2>
                                        <p className="text-xs text-gray-500">Các mô hình PBGDPL tiêu biểu, sáng tạo</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                    Xem tất cả <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {effectiveModelsData.map((model, idx) => (
                                    <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-amber-200 hover:shadow-md transition-all group bg-gray-50/30">
                                        <h3 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[40px]">{model.title}</h3>
                                        <div className="flex flex-col gap-1.5 text-[10px] text-gray-500 mb-3 font-medium">
                                            <span className="flex items-center gap-1"><FileText size={12} className="text-gray-400" /> {model.category}</span>
                                            <span className="flex items-center gap-1"><Calendar size={12} className="text-gray-400" /> {model.date}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-3">{model.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Khối 7: Khó khăn vướng mắc */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Khó khăn, vướng mắc, kiến nghị</h2>
                                        <p className="text-xs text-gray-500">Tổng hợp từ các đơn vị, địa phương</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                    Xem tất cả <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {difficultiesData.map((diff, idx) => (
                                    <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-pink-200 hover:shadow-md transition-all bg-white flex flex-col">
                                        <h3 className="font-bold text-gray-800 text-sm mb-3 line-clamp-3 flex-1">{diff.title}</h3>

                                        <div className="flex flex-col gap-1.5 text-[11px] text-gray-500 mb-4 font-medium border-t border-gray-50 pt-3">
                                            <span className="flex items-center gap-1.5"><Building2 size={12} className="text-gray-400" /> {diff.source}</span>
                                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> {diff.date}</span>
                                        </div>

                                        <div>
                                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide inline-block ${getBadgeColor(diff.type)}`}>
                                                {diff.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default PhoBienGiaoDucPhapLuatPage;

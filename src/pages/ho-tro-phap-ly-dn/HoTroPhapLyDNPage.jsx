import React, { useState, useEffect, useRef, useMemo } from 'react';
import './HoTroPhapLyDNPage.css';
import {
    NAV_ITEMS,
    bieuMauData,
    taiLieuHTPLData,
    thongBaoData,
    newsData,
    suKienData,
    hoatDongPhoiHopData,
    boNganhData,
    diaPhuongData,
    chuongTrinhData,
    vanBanChinhSachMoiData,
    vanBanPhapLuatData,
    mediaData,
    videoData,
    advisorsData,
    orgData,
    consultationHistoryData,
    vuViecDienHinhData,
    resources,
    contactData,
    orgChartData,
    lienNganhData,
    functionDutyData,
    policyDocs,
    faqs,
    keHoachDaoTaoData,
    khoaHocData,
    hoiDapData,
    tuVanChuyenSauData,
    nghienCuuData,
    tongQuanData,
    contentBySubPage,
    getFileIcon,
    getDocStatusBadge,
    getDocStatusText
} from './data/mockData';

// ==========================================
// 1. SHARED & SUB-COMPONENTS
// ==========================================
        const AttachmentList = ({ files, navigateToPreview }) => {
            if (!files || files.length === 0) return null;
            return (
                <div className="mt-8 border-t border-[#E0E0E0] pt-6">
                    <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                    <div className="shrink-0 scale-90 origin-center">
                                        {getFileIcon(file.name || file.fileName)}
                                    </div>
                                    <div className="flex flex-col overflow-hidden w-full">
                                        <p 
                                            onClick={() => {
                                                const navFn = navigateToPreview || window.navigateToPreviewContext;
                                                if(navFn) navFn(file);
                                            }} 
                                            className="text-[#1E88E5] font-medium text-[14px] truncate cursor-pointer hover:underline"
                                            title={file.name || file.fileName}
                                        >
                                            {file.name || file.fileName}
                                        </p>
                                        <p className="text-gray-400 text-[12px] mt-0.5">
                                            {file.size || `${(Math.random() * 4 + 0.5).toFixed(1)} MB`}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); alert(`Đang tải file ${file.name || file.fileName} xuống...`); }}
                                    className="shrink-0 ml-3 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#1E88E5] transition"
                                    title="Tải xuống"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        // --- COMPONENTS ---

        function PortalHeader({ showAccountMenu, setShowAccountMenu, setShowHistory, setRoute }) {
            return (
                <div className="bg-[linear-gradient(90deg,#2b7de9_0%,#4f92f1_40%,#2d6fe1_100%)] text-white">
                    <div className="mx-auto flex max-w-[1520px] items-center justify-between px-4 py-3 lg:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d62828] text-[12px] font-bold text-[#ffd84d] shadow-md ring-2 ring-white/40">QH</div>
                            <div>
                                <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-white/80">Cổng Pháp luật Quốc gia</p>
                                <h1 className="text-[18px] font-bold uppercase tracking-[0.01em] text-white sm:text-[20px]">Chuyên trang Hỗ trợ pháp lý doanh nghiệp</h1>
                            </div>
                        </div>
                        <div className="hidden items-center gap-5 text-[14px] lg:flex">
                            <span className="text-white/90">Thứ Hai, 13/04/2026, 14:54:28</span>
                            <a href="#" className="hover:text-white/80">Mới nhất</a>
                            <a href="#" className="hover:text-white/80">International</a>
                            <div className="relative">
                                <button onClick={() => setShowAccountMenu(!showAccountMenu)} className="flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 hover:bg-white/20 transition">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className="text-sm font-semibold">Tài khoản</span>
                                </button>
                                {showAccountMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-800">Nguyễn Văn A</p>
                                            <p className="text-xs text-gray-500">nguyenvana@example.com</p>
                                        </div>
                                        <button onClick={() => { setShowAccountMenu(false); setRoute({ page: "list", menuKey: "tu-van-phap-luat", subKey: "lich-su-hoi-dap-tu-van" }); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            Lịch sử hỏi đáp/tư vấn
                                        </button>
                                        <button onClick={() => { setShowAccountMenu(false); setRoute({ page: "list", menuKey: "tu-van-phap-luat", subKey: "tra-cuu-lich-su-hoi-dap-tu-van" }); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            Tra cứu lịch sử hỏi đáp/tư vấn
                                        </button>
                                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            Thông tin tài khoản
                                        </button>
                                        <div className="border-t border-gray-100 mt-1"></div>
                                        <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        function MegaMenuNav({ navItems, activeMenu, setActiveMenu, navigateHome, navigateToList, activeSubMenu }) {
            const scrollRef = useRef(null);
            const [showLeftArrow, setShowLeftArrow] = useState(false);
            const [showRightArrow, setShowRightArrow] = useState(false);
            const [isMobileOrZoomed, setIsMobileOrZoomed] = useState(false);
            const [activeMobileMenuKey, setActiveMobileMenuKey] = useState(null);
            const dropdownRef = useRef(null);

            useEffect(() => {
                const handleClickOutside = (event) => {
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setActiveMobileMenuKey(null);
                    }
                };
                document.addEventListener("mousedown", handleClickOutside);
                return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            }, []);

            const checkScroll = () => {
                const el = scrollRef.current;
                if (el) {
                    setShowLeftArrow(el.scrollLeft > 5);
                    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
                    setIsMobileOrZoomed(el.scrollWidth > el.clientWidth || window.innerWidth < 1024);
                }
            };

            useEffect(() => {
                const el = scrollRef.current;
                if (el) {
                    checkScroll();
                    el.addEventListener('scroll', checkScroll);
                    window.addEventListener('resize', checkScroll);
                    const timer = setTimeout(checkScroll, 150);
                    return () => {
                        el.removeEventListener('scroll', checkScroll);
                        window.removeEventListener('resize', checkScroll);
                        clearTimeout(timer);
                    };
                }
            }, [navItems]);

            const scrollBy = (amount) => {
                const el = scrollRef.current;
                if (el) {
                    el.scrollBy({ left: amount, behavior: 'smooth' });
                }
            };

            const isOverflowing = showLeftArrow || showRightArrow;

            return (
                <div className="bg-gradient-to-b from-[#e8f1ff] via-[#f7faff] to-white border-t border-[#cbdffb] shadow-[0_10px_25px_-5px_rgba(30,79,161,0.12),0_4px_12px_-4px_rgba(30,79,161,0.06)] relative z-30 overflow-visible">
                    <div className="mx-auto max-w-[1520px] px-4 lg:px-6 relative flex items-center overflow-visible py-3.5">
                        
                        {/* Left Scroll Button */}
                        {showLeftArrow && (
                            <button 
                                onClick={() => scrollBy(-200)}
                                className="absolute left-2 md:left-4 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-md hover:bg-slate-50 hover:text-blue-600 transition shrink-0"
                                title="Cuộn sang trái"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                        )}

                        {/* Middle Scrollable Menu Container */}
                        <div 
                            ref={scrollRef}
                            className={`flex-grow scroll-smooth ${
                                isOverflowing ? 'overflow-x-auto hide-scrollbar pl-1 pr-8' : 'overflow-visible'
                            }`}
                        >
                            <ul className={`flex items-center gap-x-1.5 list-none m-0 p-0 w-max ${
                                isOverflowing ? 'justify-start' : 'justify-center mx-auto overflow-visible'
                            }`}>
                                {navItems.map((item) => {
                                    const isActive = activeMenu === item.key;
                                    return (
                                        <li 
                                            key={item.key} 
                                            className="inline-block whitespace-nowrap relative group overflow-visible"
                                        >
                                            <button 
                                                onClick={() => {
                                                    if (isMobileOrZoomed && item.children?.length) {
                                                        // Toggle dropdown for mobile
                                                        if (activeMobileMenuKey === item.key) {
                                                            setActiveMobileMenuKey(null);
                                                        } else {
                                                            setActiveMobileMenuKey(item.key);
                                                        }
                                                    } else {
                                                        setActiveMenu(item.key);
                                                        if (item.key === "trang-chu") navigateHome();
                                                        else navigateToList(item.key, item.children?.[0]?.key || null);
                                                        setActiveMobileMenuKey(null);
                                                    }
                                                }}
                                                className={`inline-flex items-center gap-1.5 text-[14px] font-bold transition-all duration-200 border-0 cursor-pointer py-2 px-4 rounded-full ${
                                                    isActive 
                                                        ? "bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-white scale-105" 
                                                        : "bg-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-100/80"
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                {item.children?.length ? <span className="text-[7px] text-slate-400 group-hover:text-blue-500 transition-colors">▼</span> : null}
                                            </button>
                                            
                                            {item.children?.length && !isMobileOrZoomed ? (
                                                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 top-full mt-2.5 z-50 min-w-[280px] w-max max-w-[340px] whitespace-normal break-words rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                                                    <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
                                                        {item.children.map((child) => {
                                                            const isSubActive = activeSubMenu === child.key;
                                                            return (
                                                                <li key={child.key}>
                                                                    <button 
                                                                        onClick={() => navigateToList(item.key, child.key)} 
                                                                        className={`w-full text-left px-3 py-2 text-[13px] font-bold transition hover:text-blue-600 hover:bg-blue-50/50 rounded-lg flex items-center gap-2 ${
                                                                            isSubActive 
                                                                                ? "text-blue-600 bg-blue-50/50" 
                                                                                : "text-slate-700"
                                                                        }`}
                                                                    >
                                                                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                                                            isSubActive ? "bg-blue-600" : "bg-slate-300"
                                                                        }`} />
                                                                        <span>{child.label}</span>
                                                                    </button>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            ) : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Right Scroll Button */}
                        {showRightArrow && (
                            <button 
                                onClick={() => scrollBy(200)}
                                className="absolute right-2 md:right-4 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-md hover:bg-slate-50 hover:text-blue-600 transition shrink-0"
                                title="Cuộn sang phải"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        )}

                    </div>

                    {/* Dropdown Popup Menu on Mobile/Zoomed Views when tapping parent category */}
                    {isMobileOrZoomed && activeMobileMenuKey && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 min-w-[280px] w-max max-w-[340px] bg-white rounded-xl border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.12)] py-1.5 overflow-hidden animate-fadeIn" ref={dropdownRef}>
                            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                                    {navItems.find(item => item.key === activeMobileMenuKey)?.label}
                                </span>
                                <button 
                                    onClick={() => setActiveMobileMenuKey(null)} 
                                    className="text-slate-400 hover:text-slate-600 text-sm border-0 bg-transparent cursor-pointer font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                            <ul className="flex flex-col gap-0.5 list-none m-0 p-1.5 max-h-[260px] overflow-y-auto custom-viewer-scroll">
                                {navItems.find(item => item.key === activeMobileMenuKey)?.children.map((child) => {
                                    const isSubActive = activeSubMenu === child.key;
                                    return (
                                        <li key={child.key}>
                                            <button 
                                                onClick={() => {
                                                    navigateToList(activeMobileMenuKey, child.key);
                                                    setActiveMobileMenuKey(null);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-[13px] font-bold transition hover:text-blue-600 hover:bg-blue-50/50 rounded-lg flex items-center gap-2 border-0 cursor-pointer ${
                                                    isSubActive 
                                                        ? "text-blue-600 bg-blue-50/50" 
                                                        : "text-slate-700 bg-transparent"
                                                }`}
                                            >
                                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                                    isSubActive ? "bg-blue-600" : "bg-slate-300"
                                                }`} />
                                                <span className="truncate">{child.label}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            );
        }

        function HeroBanner() {
            return (
                <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f3f9f_0%,#1e63dc_55%,#2580f0_100%)] text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_55%)]"></div>
                    <div className="relative mx-auto max-w-[1520px] px-4 py-16 lg:px-6 lg:py-20">
                        <div className="max-w-[760px]">
                            <p className="text-[18px] font-semibold leading-snug text-white/90 lg:text-[22px]">Đồng hành cùng doanh nghiệp nhỏ và vừa</p>
                            <h2 className="mt-3 text-[36px] font-bold uppercase italic leading-[1.1] tracking-[0.01em] text-white lg:text-[48px] whitespace-nowrap">HỖ TRỢ PHÁP LÝ HIỆU QUẢ</h2>
                            <p className="mt-4 max-w-[720px] text-[17px] leading-8 text-white/85">Cung cấp thông tin, tài liệu, văn bản, hỏi đáp và chương trình hỗ trợ pháp lý dành cho doanh nghiệp nhỏ và vừa theo định hướng đồng bộ với Cổng Pháp luật Quốc gia.</p>
                        </div>
                        <div className="mt-8 flex max-w-[760px] items-center overflow-hidden rounded-full border-[4px] border-white/25 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                            <input type="text" placeholder="Tra cứu nhanh văn bản, tài liệu, bài viết, thủ tục pháp lý" className="h-[60px] w-full border-0 bg-transparent px-6 text-[17px] text-[#2b3760] outline-none placeholder:text-[#8d98b3]" />
                            <button className="mr-2 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#224aa8] text-[17px] font-bold text-white transition hover:bg-[#1a3b8b]">⌕</button>
                        </div>
                    </div>
                </section>
            );
        }

        function NewsSection({ newsList, notices, taiLieuHTPL, navigateToList, navigateToDetail }) {
            return (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
                    <div className="lg:col-span-2 rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm h-full flex flex-col">
                        <div className="mb-4 flex items-center justify-between border-b pb-3">
                            <h2 className="text-[20px] font-bold text-[#1b2b49]">Tin tức nổi bật</h2>
                            <button onClick={() => navigateToList("hoat-dong-trung-tam", "tin-tuc-noi-bat")} className="text-[14px] text-[#2580f0] hover:underline">Xem thêm</button>
                        </div>
                        <div className="space-y-5 flex-1">
                            {newsList.slice(0, 3).map(news => (
                                <div key={news.id} className="group cursor-pointer border-b border-gray-100 pb-5 last:border-0 flex gap-4" onClick={() => navigateToDetail(news)}>
                                    <div className="w-32 h-24 sm:w-40 sm:h-28 shrink-0 bg-gray-200 rounded overflow-hidden relative shadow-sm">
                                        <img src={news.thumb} alt="thumb" className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-semibold text-[#1b2b49] transition group-hover:text-[#2580f0] line-clamp-2 leading-[1.4] mb-1">{news.title}</h3>
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            {news.field && <span className="bg-[#e2e8f0] text-[#475569] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">{news.field}</span>}
                                            <p className="text-[12px] font-medium text-[#8e98b0]">{news.date}</p>
                                        </div>
                                        <p className="text-[14px] text-[#4c566a] line-clamp-2 leading-[1.5] hidden sm:block">{news.summary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-6 h-full">
                        {/* Thông báo Box */}
                        <div className="rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm flex flex-col h-[320px]">
                            <div className="mb-4 flex items-center justify-between border-b pb-3 shrink-0">
                                <h2 className="text-[18px] font-bold text-[#1b2b49]">Thông báo mới</h2>
                                <button onClick={() => navigateToList("hoat-dong-trung-tam", "thong-bao")} className="text-[13px] text-[#2580f0] hover:underline">Xem thêm</button>
                            </div>
                            <div className="flex-1 overflow-hidden relative">
                                {/* Marquee container */}
                                <div className="marquee-vertical-content absolute top-0 left-0 right-0 space-y-3">
                                    {/* Duplicate items to create seamless loop */}
                                    {[...notices, ...notices].map((notice, idx) => (
                                        <div key={idx} onClick={() => window.navigateToDetailContext && window.navigateToDetailContext(notice)} className="flex items-start gap-2.5 text-[15px] text-[#2c364c] p-2 hover:bg-[#f8f9fc] rounded transition cursor-pointer group border border-transparent hover:border-gray-200">
                                            <span className="text-[#E3242B] mt-[3px] shrink-0 group-hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                            </span>
                                            <div className="flex-1">
                                                <span className="line-clamp-2 leading-snug group-hover:text-[#2580f0] transition-colors">{notice.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm flex-1">
                            <div className="mb-4 flex items-center justify-between border-b pb-3">
                                <h2 className="text-[18px] font-bold text-[#1b2b49]">Tài liệu HTPL doanh nghiệp</h2>
                                <button onClick={() => navigateToList("tu-van-phap-luat", "tai-lieu-htpl")} className="text-[13px] text-[#2580f0] hover:underline">Xem thêm</button>
                            </div>
                            <ul className="space-y-4">
                                {taiLieuHTPL.slice(0, 3).map(item => (
                                    <li key={item.id} className="group flex items-start gap-3 p-2 hover:bg-[#f8f9fc] rounded transition border border-transparent hover:border-gray-200 shadow-sm bg-white">
                                        <div className="w-14 h-16 shrink-0 bg-gray-100 rounded border border-gray-200 overflow-hidden relative cursor-pointer" onClick={() => window.navigateToPreviewContext && window.navigateToPreviewContext(item.attachments[0])}>
                                            <img src={item.thumb || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=150&q=80"} alt="thumb" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
                                            <div className="absolute top-0.5 left-0.5 scale-75 origin-top-left shadow-sm">
                                                {getFileIcon(item.attachments[0]?.name)}
                                            </div>
                                        </div>
                                        <div className="flex-1 cursor-pointer overflow-hidden" onClick={() => window.navigateToDetailContext && window.navigateToDetailContext(item)}>
                                            <h3 className="text-[14px] font-bold text-[#1b2b49] group-hover:text-[#2580f0] line-clamp-2">{item.title}</h3>
                                            <span className="text-[#8e98b0] text-[11px] font-medium block mt-1">{item.date}</span>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); alert(`Đang tải file ${item.attachments[0]?.name} xuống...`); }} 
                                            className="shrink-0 flex items-center justify-center w-7 h-7 mt-4 rounded-full hover:bg-[#e2e8f0] text-[#66738f] hover:text-[#2580f0] transition tooltip relative"
                                            title="Tải xuống"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        function HomeDocumentsSection({ policyDocs, faqs, resources, navigateToList }) {
            return (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between border-b pb-3">
                            <h2 className="text-[20px] font-bold text-[#1b2b49]">Văn bản chính sách mới</h2>
                            <button onClick={() => navigateToList("van-ban-phap-luat", "van-ban-moi-ban-hanh")} className="text-[14px] text-[#2580f0] hover:underline">Xem thêm</button>
                        </div>
                        <ul className="space-y-4">
                            {policyDocs.map(doc => (
                                <li key={doc.id} className="cursor-pointer group">
                                    <h3 className="text-[15px] font-semibold text-[#1b2b49] group-hover:text-[#2580f0]">{doc.title}</h3>
                                    <div className="mt-1 flex gap-4 text-[13px] text-[#8e98b0]">
                                        <span>Cơ quan: {doc.agency}</span>
                                        <span>Ngày: {doc.date}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between border-b pb-3">
                            <h2 className="text-[20px] font-bold text-[#1b2b49]">Hỏi đáp pháp lý</h2>
                            <button onClick={() => navigateToList("tu-van-phap-luat", "hoi-dap-phap-luat")} className="text-[14px] text-[#2580f0] hover:underline">Xem thêm</button>
                        </div>
                        <ul className="space-y-4">
                            {faqs.map(faq => (
                                <li key={faq.id}>
                                    <div className="text-[15px] font-semibold text-[#1b2b49]">Hỏi: {faq.question}</div>
                                    <div className="mt-1 text-[14px] text-[#4c566a] bg-[#f8f9fc] p-3 rounded">Đáp: {faq.answer}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        function HomeMediaAndFormsSection({ forms, media, navigateToList }) {
            const [activeMediaTab, setActiveMediaTab] = useState('video');

            const mediaTabs = [
                { id: 'video', label: 'Video bài giảng', icon: '' },
                { id: 'longform', label: 'Longform', icon: '' },
                { id: 'infographic', label: 'Infographics', icon: '' },
                { id: 'photo', label: 'Photos', icon: '' }
            ];

            const filteredMedia = media.filter(item => item.type === activeMediaTab);

            return (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between border-b pb-3">
                            <h2 className="text-[20px] font-bold text-[#1b2b49]">Thủ tục pháp lý - Biểu mẫu, hợp đồng</h2>
                            <button onClick={() => navigateToList("tu-van-phap-luat", "bieu-mau-hop-dong")} className="text-[14px] text-[#2580f0] hover:underline">Xem thêm</button>
                        </div>
                        <ul className="space-y-4">
                            {forms.slice(0, 3).map(form => (
                                <li key={form.id} className="group flex items-start gap-4 p-3 hover:bg-[#f8f9fc] rounded transition border border-transparent hover:border-gray-200 shadow-sm bg-white">
                                    <div className="w-16 h-20 shrink-0 bg-gray-100 rounded border border-gray-200 overflow-hidden relative shadow-sm cursor-pointer" onClick={() => window.navigateToPreviewContext && window.navigateToPreviewContext(form.attachments[0])}>
                                        <img src={form.thumb || "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&w=150&q=80"} alt="thumb" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                                        <div className="absolute top-1 left-1 shadow-md scale-90 origin-top-left">
                                            {getFileIcon(form.attachments[0]?.name)}
                                        </div>
                                    </div>
                                    <div className="flex-1 cursor-pointer overflow-hidden py-1" onClick={() => window.navigateToDetailContext && window.navigateToDetailContext(form)}>
                                        <h3 className="text-[15px] font-bold text-[#1b2b49] group-hover:text-[#2580f0] line-clamp-1">{form.title}</h3>
                                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 items-center">
                                            <span className="bg-[#e2e8f0] text-[#475569] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">{form.field}</span>
                                            <span className="text-[#8e98b0] text-[12px] font-medium">{form.date}</span>
                                            {form.agency && <span className="text-[#64748b] text-[12px] truncate max-w-[150px]" title={form.agency}>Cơ quan: {form.agency}</span>}
                                        </div>
                                        <p className="mt-2 text-[13px] text-[#4c566a] line-clamp-2 leading-[1.5]">{form.summary}</p>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); alert(`Đang tải file ${form.attachments[0]?.name} xuống...`); }} 
                                        className="shrink-0 flex items-center justify-center w-8 h-8 mt-6 rounded hover:bg-[#e2e8f0] text-[#66738f] hover:text-[#2580f0] transition tooltip relative border border-transparent hover:border-[#cbd5e1]"
                                        title="Tải xuống"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[8px] border border-[#d8e1f2] bg-white p-5 shadow-sm relative overflow-hidden flex flex-col">
                        <div className="mb-5 pb-3 border-b border-gray-100 flex flex-col gap-3 shrink-0">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateToList("hoat-dong-trung-tam", "multimedia")}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#E3242B]"><path d="M21.582 6.186a2.632 2.632 0 0 0-1.854-1.854C18.093 3.89 12 3.89 12 3.89s-6.093 0-7.728.442A2.632 2.632 0 0 0 2.418 6.186C1.977 7.821 1.977 12 1.977 12s0 4.18.441 5.814a2.632 2.632 0 0 0 1.854 1.854c1.635.442 7.728.442 7.728.442s6.093 0 7.728-.442a2.632 2.632 0 0 0 1.854-1.854c.441-1.634.441-5.814.441-5.814s0-4.179-.441-5.814zM9.995 15.474V8.526l5.318 3.474-5.318 3.474z"/></svg>
                                    <h2 className="text-[20px] font-bold uppercase tracking-wide text-[#1b2b49]">MULTIMEDIA</h2>
                                </div>
                                <button onClick={() => navigateToList("hoat-dong-trung-tam", "multimedia")} className="text-[13px] text-[#2580f0] hover:underline">Xem thêm</button>
                            </div>
                            <div className="flex gap-x-5 gap-y-2 flex-wrap text-[13px] font-bold text-[#66738f]">
                                {mediaTabs.map(tab => (
                                    <span key={tab.id} onClick={() => setActiveMediaTab(tab.id)} className={`flex items-center gap-1.5 cursor-pointer transition ${activeMediaTab === tab.id ? 'text-[#2580f0] border-b-2 border-[#2580f0] pb-0.5' : 'hover:text-[#2580f0]'}`}>
                                        {tab.icon && <span className="text-[#2580f0]">{tab.icon}</span>} {tab.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 flex-1 flex flex-col">
                            {filteredMedia.length > 0 ? (
                                <>
                                    <div className="relative rounded overflow-hidden cursor-pointer group h-52 shadow-sm" onClick={() => window.navigateToDetailContext && window.navigateToDetailContext(filteredMedia[0])}>
                                        <img src={filteredMedia[0].thumb} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Main Multimedia" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                                            <h3 className="text-white font-bold text-[16px] md:text-[18px] leading-snug line-clamp-2 drop-shadow-md">{filteredMedia[0].title}</h3>
                                        </div>
                                    </div>
                                    {filteredMedia.length > 1 && (
                                        <div className="grid grid-cols-2 gap-4 mt-auto">
                                            {filteredMedia.slice(1, 3).map(item => (
                                                <div key={item.id} className="cursor-pointer group flex flex-col gap-2" onClick={() => window.navigateToDetailContext && window.navigateToDetailContext(item)}>
                                                    <div className="w-full h-[90px] bg-gray-200 rounded overflow-hidden relative shadow-sm">
                                                        <img src={item.thumb} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                                    </div>
                                                    <h3 className="text-[13px] font-semibold text-[#1b2b49] group-hover:text-[#2580f0] line-clamp-2 leading-snug transition">{item.title}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                                    Đang cập nhật nội dung...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        function FunctionDutyPage({ menu, subPage, data }) {
            const panelClass = "rounded-[8px] border border-[#d8e1f2] bg-white shadow-[0_2px_10px_rgba(30,79,161,0.07)]";
            
            return (
                <section className={`${panelClass} overflow-hidden`}>
                    <div className="border-b border-[#dbe5ff] bg-white px-5 py-6 lg:px-10 lg:py-8 relative">
                        <p className="text-[13px] font-medium text-[#66738f] mb-4 text-left">Trang chủ / {menu.label} / {subPage.label}</p>
                        <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.3] text-[#1b2b49] mb-2 text-center">
                            {data.title}
                        </h2>
                        <div className="text-[14px] text-[#8e98b0] font-medium text-center">
                            {data.date}
                        </div>
                    </div>
                    
                    <div className="p-5 lg:p-10 lg:pt-8 bg-white">
                        <div className="text-[16px] md:text-[17px] leading-[1.7] text-[#2c364c] space-y-5">
                            <p className="font-medium">{data.content.intro}</p>
                            
                            {data.content.sections.map((section, idx) => (
                                <div key={idx} className="mt-6">
                                    <h3 className="text-[18px] md:text-[19px] font-bold text-[#1b2b49] mb-2">{section.heading}</h3>
                                    <p className="mb-2">{section.text}</p>
                                    {section.list && (
                                        <div className="space-y-2">
                                            {section.list.map((item, iIdx) => (
                                                <p key={iIdx}>{item}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <AttachmentList files={data.attachments} />
                    </div>
                </section>
            );
        }

        function LienNganhProgramPage({ menu, subPage, data, onBack, navigateToPreview }) {
            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4 text-left">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.3] text-[#1b2b49] mb-2 text-center uppercase">
                        {data.title}
                    </h2>
                    
                    <div className="text-[14px] text-[#8e98b0] font-medium text-center mb-8 pb-6 border-b border-[#dbe5ff]">
                        {data.publishDate}
                    </div>

                    <div className="text-[16px] leading-[1.7] text-[#2c364c] space-y-6">
                        <p className="font-medium mb-6">{data.intro}</p>

                        {data.programs.map((program, idx) => (
                            <div key={idx} className="mt-6">
                                <h3 className="text-[18px] md:text-[19px] font-bold text-[#1b2b49] mb-2">{program.title}</h3>
                                <p className="mb-2">{program.desc}</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {program.details.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{__html: item}}></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <AttachmentList files={data.attachments} />
                </section>
            );
        }

        function ContactPage({ menu, subPage, data, onBack, navigateToPreview }) {
            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.3] text-[#1b2b49] mb-2 text-center">{data.title}</h2>
                    <div className="text-[14px] text-[#8e98b0] font-medium text-center mb-8 pb-6 border-b border-[#dbe5ff]">
                        {data.date}
                    </div>
                    <div className="text-[16px] text-[#2c364c]">
                        <table className="w-full text-left border-collapse border border-[#d8e1f2] rounded overflow-hidden shadow-sm">
                            <tbody>
                                <tr className="border-b border-[#d8e1f2]">
                                    <th className="p-4 bg-[#f8f9fc] w-[30%] md:w-[25%] text-[#1b2b49] font-bold border-r border-[#d8e1f2]">Địa chỉ</th>
                                    <td className="p-4">{data.address}</td>
                                </tr>
                                <tr className="border-b border-[#d8e1f2]">
                                    <th className="p-4 bg-[#f8f9fc] text-[#1b2b49] font-bold border-r border-[#d8e1f2]">Điện thoại</th>
                                    <td className="p-4">{data.phone}</td>
                                </tr>
                                <tr className="border-b border-[#d8e1f2]">
                                    <th className="p-4 bg-[#f8f9fc] text-[#1b2b49] font-bold border-r border-[#d8e1f2]">Email</th>
                                    <td className="p-4">{data.email}</td>
                                </tr>
                                <tr>
                                    <th className="p-4 bg-[#f8f9fc] text-[#1b2b49] font-bold border-r border-[#d8e1f2]">Giám đốc Trung tâm</th>
                                    <td className="p-4">{data.director}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <AttachmentList files={data.attachments} navigateToPreview={navigateToPreview} />
                </section>
            );
        }

        function OrgChartPage({ menu, subPage, data, onBack, navigateToPreview }) {
            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.3] text-[#1b2b49] mb-2 text-center">{data.title}</h2>
                    <div className="text-[14px] text-[#8e98b0] font-medium text-center mb-8">
                        {data.date}
                    </div>
                    <div className="bg-[#f8f9fc] p-6 pt-10 rounded-lg text-center border border-[#dbe5ff] mb-8 overflow-x-auto org-chart-scroll">
                        <div className="inline-block relative min-w-[700px]">
                            {/* Level 1: Director */}
                            <div className="relative z-10 inline-block bg-[#1b2b49] text-white px-6 py-3 rounded font-bold text-[18px] mb-8 shadow-md">
                                {data.nodes.director}
                                <div className="absolute bottom-[-32px] left-[50%] w-[1px] h-[32px] bg-[#a0aec0]"></div>
                            </div>
                            
                            {/* Level 2: Vice Directors */}
                            <div className="flex justify-center gap-16 mb-12 relative">
                                <div className="absolute top-[-16px] left-[35%] right-[35%] h-[1px] bg-[#a0aec0]"></div>
                                <div className="absolute top-[-32px] left-[50%] w-[1px] h-[32px] bg-[#a0aec0]"></div>
                                
                                {data.nodes.viceDirectors.map((vd, i) => (
                                    <div key={i} className="relative bg-[#2580f0] text-white px-5 py-2 rounded font-semibold shadow-sm min-w-[160px]">
                                        <div className="absolute top-[-16px] left-[50%] w-[1px] h-[16px] bg-[#a0aec0]"></div>
                                        {vd}
                                    </div>
                                ))}
                                <div className="absolute bottom-[-48px] left-[50%] w-[1px] h-[48px] bg-[#a0aec0]"></div>
                            </div>

                            {/* Level 3: Departments */}
                            <div className="relative pt-6">
                                <div className="absolute top-0 left-[12.5%] right-[12.5%] h-[1px] bg-[#a0aec0] hidden md:block"></div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {data.nodes.departments.map((dep, i) => (
                                        <div key={i} className="relative bg-white p-4 border border-[#d8e1f2] rounded shadow-sm text-[14px] font-medium text-[#2c364c] h-[80px] flex items-center justify-center mt-4 md:mt-0">
                                            <div className="absolute top-[-24px] left-[50%] w-[1px] h-[24px] bg-[#a0aec0] hidden md:block"></div>
                                            <div className="absolute top-[-16px] left-[50%] w-[1px] h-[16px] bg-[#a0aec0] md:hidden"></div>
                                            {dep}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <AttachmentList files={data.attachments} navigateToPreview={navigateToPreview} />
                </section>
            );
        }

        function CategoryListPage({ menu, subPage, items, navigateToDetail, navigateToPreview }) {
            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>
                    <div className="space-y-6">
                        {items.map(item => (
                            <div key={item.id} className="border-b border-gray-100 pb-6 last:border-0">
                                <h3 className="text-[18px] font-semibold text-[#1b2b49] cursor-pointer hover:text-[#2580f0]" onClick={() => navigateToDetail(item)}>{item.title}</h3>
                                <p className="text-[13px] text-[#8e98b0] mt-2 mb-3 flex flex-wrap gap-4 items-center">
                                    <span className="font-medium">{item.date}</span>
                                    {item.field && <span className="bg-[#e2e8f0] text-[#475569] px-2 py-0.5 rounded text-[11px] font-medium tracking-wide">{item.field}</span>}
                                </p>
                                <p className="text-[15px] text-[#4c566a] line-clamp-2">{item.summary}</p>
                            </div>
                        ))}
                    </div>
                </section>
            );
        }

        // ==========================================
        // MODULE: TÀI LIỆU HTPLDN (Đơn giản, không có filter lĩnh vực/cơ quan)
        // ==========================================

        function TaiLieuHTPLListPage({ menu, subPage, items, navigateToDetail, navigateToPreview }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);
            const [draftSearch, setDraftSearch] = useState('');
            const [searchTerm, setSearchTerm] = useState('');

            const filteredItems = items.filter(item => {
                const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
                return matchSearch;
            });

            const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            const currentListItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => {
                setSearchTerm(draftSearch);
                setCurrentPage(1);
            };

            const handleClear = () => {
                setDraftSearch('');
                setSearchTerm('');
                setCurrentPage(1);
            };

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }
            };

            const getFileIcon = (fileName) => {
                const ext = fileName.split('.').pop().toLowerCase();
                if (ext === 'pdf') return { icon: '📄', color: 'bg-red-100 text-red-600', label: 'PDF' };
                if (['doc', 'docx'].includes(ext)) return { icon: '📝', color: 'bg-blue-100 text-blue-600', label: 'Word' };
                if (['xls', 'xlsx'].includes(ext)) return { icon: '📊', color: 'bg-green-100 text-green-600', label: 'Excel' };
                return { icon: '📄', color: 'bg-gray-100 text-gray-600', label: 'File' };
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>

                    {/* Bộ lọc */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        maxLength={100}
                                        placeholder="Nhập tên tài liệu để tìm kiếm..."
                                        value={draftSearch}
                                        onChange={(e) => setDraftSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                    />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa bộ lọc
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách tài liệu */}
                    <div className="space-y-4 mb-8">
                        {currentListItems.length > 0 ? currentListItems.map(item => {
                            const displayName = item.title;
                            const displayDate = item.date;
                            const displaySummary = item.summary;
                            const thumb = item.thumb || `https://images.unsplash.com/photo-${['1554224155-8d04cb21cd6c', '1454165804606-c3d57bc86b40', '1589829085413-56de8ae18c73', '1554224154-26032ffc0d07'][item.id % 4]}?auto=format&fit=crop&w=200&q=80`;
                            return (
                                <div key={item.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#2580f0] hover:shadow-md transition bg-white group">
                                    <div className="w-24 h-20 bg-gray-100 rounded overflow-hidden shrink-0 relative cursor-pointer" onClick={() => navigateToDetail(item)}>
                                        <img src={thumb} alt={displayName} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[15px] font-bold text-[#212121] group-hover:text-[#1E88E5] line-clamp-2 leading-snug mb-1 cursor-pointer" onClick={() => navigateToDetail(item)}>{displayName}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-500 mb-2">
                                            <span>{displayDate}</span>
                                        </div>
                                        <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">{displaySummary}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); alert(`Đang tải file xuống...`); }}
                                            className="px-4 py-2 text-white bg-[#2580f0] rounded-md text-sm font-medium hover:bg-[#1e63dc] transition shadow-sm flex items-center gap-2"
                                            title="Tải xuống"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                            Tải xuống
                                        </button>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <p className="text-[15px] font-medium">Không tìm thấy tài liệu nào</p>
                                <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                            </div>
                        )}
                    </div>

                    {/* Phân trang */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[14px] text-gray-600 font-medium">
                                    <span>Hiển thị:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                        className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-[#2580f0]"
                                    >
                                        <option value={10}>10 bản ghi</option>
                                        <option value={20}>20 bản ghi</option>
                                        <option value={50}>50 bản ghi</option>
                                    </select>
                                </div>
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> của <strong className="text-[#212121]">{filteredItems.length}</strong> bản ghi
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        function FormListPage({ menu, subPage, items, navigateToDetail, navigateToPreview }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);
            const [draftSearch, setDraftSearch] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [draftAgencies, setDraftAgencies] = useState([]);
            const [draftFileTypes, setDraftFileTypes] = useState([]);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [agencySearchTerm, setAgencySearchTerm] = useState('');
            const [fileTypeSearchTerm, setFileTypeSearchTerm] = useState('');
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [isAgencyOpen, setIsAgencyOpen] = useState(false);
            const [isFileTypeOpen, setIsFileTypeOpen] = useState(false);
            const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
            const [searchTerm, setSearchTerm] = useState('');
            const [selectedFields, setSelectedFields] = useState([]);
            const [selectedAgencies, setSelectedAgencies] = useState([]);
            const [selectedFileTypes, setSelectedFileTypes] = useState([]);

            const fieldOptions = [...new Set(items.map(i => i.field).filter(Boolean))];
            const agencyOptions = [...new Set(items.map(i => i.agency).filter(Boolean))];
            const fileTypeOptions = ['Pdf', 'Word', 'Excel'];

            const filteredFieldOpts = fieldOptions.filter(f => f.toLowerCase().includes(fieldSearchTerm.toLowerCase().trim()));
            const filteredAgencyOpts = agencyOptions.filter(f => f.toLowerCase().includes(agencySearchTerm.toLowerCase().trim()));
            const filteredFileTypeOpts = fileTypeOptions.filter(f => f.toLowerCase().includes(fileTypeSearchTerm.toLowerCase().trim()));

            const getFileType = (fileName) => {
                const ext = fileName.split('.').pop().toLowerCase();
                if (ext === 'pdf') return 'Pdf';
                if (['doc', 'docx'].includes(ext)) return 'Word';
                if (['xls', 'xlsx'].includes(ext)) return 'Excel';
                return 'Pdf';
            };

            const filteredItems = items.filter(item => {
                const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchField = selectedFields.length > 0 ? selectedFields.includes(item.field) : true;
                const matchAgency = selectedAgencies.length > 0 ? selectedAgencies.includes(item.agency) : true;
                const matchFileType = selectedFileTypes.length > 0 ? selectedFileTypes.includes(getFileType(item.fileName)) : true;
                return matchSearch && matchField && matchAgency && matchFileType;
            });

            const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            const currentListItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => {
                setSearchTerm(draftSearch);
                setSelectedFields(draftFields);
                setSelectedAgencies(draftAgencies);
                setSelectedFileTypes(draftFileTypes);
                setCurrentPage(1);
                setIsFieldOpen(false);
                setIsAgencyOpen(false);
                setIsFileTypeOpen(false);
            };

            const handleClear = () => {
                setDraftSearch('');
                setDraftFields([]);
                setDraftAgencies([]);
                setDraftFileTypes([]);
                setFieldSearchTerm('');
                setAgencySearchTerm('');
                setFileTypeSearchTerm('');
                setSearchTerm('');
                setSelectedFields([]);
                setSelectedAgencies([]);
                setSelectedFileTypes([]);
                setCurrentPage(1);
                setIsFieldOpen(false);
                setIsAgencyOpen(false);
                setIsFileTypeOpen(false);
            };

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }
            };

            const getFileIcon = (fileName) => {
                const ext = fileName.split('.').pop().toLowerCase();
                if (ext === 'pdf') return { icon: '📄', color: 'bg-red-100 text-red-600', label: 'PDF' };
                if (['doc', 'docx'].includes(ext)) return { icon: '📝', color: 'bg-blue-100 text-blue-600', label: 'Word' };
                if (['xls', 'xlsx'].includes(ext)) return { icon: '📊', color: 'bg-green-100 text-green-600', label: 'Excel' };
                return { icon: '📄', color: 'bg-gray-100 text-gray-600', label: 'File' };
            };

            const MultiSelectDropdown = ({ isOpen, setIsOpen, options, filteredOptions, searchTerm, setSearchTerm, selected, setSelected, placeholder, label }) => (
                <div className="relative w-full md:w-[220px]">
                    <button onClick={() => { setIsOpen(!isOpen); setSearchTerm(''); }} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition text-sm">
                        <span className="truncate">{selected.length > 0 ? `Đã chọn: ${selected.length}` : placeholder}</span>
                        <span className="text-[10px] text-gray-400">▼</span>
                    </button>
                    {isOpen && (
                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-hidden flex flex-col">
                            <div className="p-2 border-b border-gray-200">
                                <div className="relative">
                                    <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <input
                                        type="text"
                                        placeholder={`Tìm ${label}...`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                    />
                                </div>
                            </div>
                            <div className="overflow-auto max-h-40">
                                {filteredOptions.length > 0 ? filteredOptions.map(opt => (
                                    <label key={opt} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                            checked={selected.includes(opt)}
                                            onChange={() => {
                                                if (selected.includes(opt)) setSelected(selected.filter(item => item !== opt));
                                                else setSelected([...selected, opt]);
                                            }}
                                        />
                                        {opt}
                                    </label>
                                )) : (
                                    <div className="px-3 py-3 text-sm text-gray-500 text-center">Không tìm thấy</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>

                    {/* Bộ lọc */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            {/* Dòng 1: Search + Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        maxLength={100}
                                        placeholder="Nhập tên biểu mẫu để tìm kiếm..."
                                        value={draftSearch}
                                        onChange={(e) => setDraftSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                    />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa bộ lọc
                                    </button>
                                    <button onClick={() => setShowAdvancedFilter(!showAdvancedFilter)} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                        {showAdvancedFilter ? 'Ẩn bộ lọc' : 'Bộ lọc'}
                                    </button>
                                </div>
                            </div>
                            {/* Bộ lọc mở rộng */}
                            {showAdvancedFilter && (
                                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                                    <MultiSelectDropdown
                                        isOpen={isFieldOpen} setIsOpen={setIsFieldOpen}
                                        options={fieldOptions} filteredOptions={filteredFieldOpts}
                                        searchTerm={fieldSearchTerm} setSearchTerm={setFieldSearchTerm}
                                        selected={draftFields} setSelected={setDraftFields}
                                        placeholder="-- Chọn lĩnh vực --" label="lĩnh vực"
                                    />
                                    <MultiSelectDropdown
                                        isOpen={isAgencyOpen} setIsOpen={setIsAgencyOpen}
                                        options={agencyOptions} filteredOptions={filteredAgencyOpts}
                                        searchTerm={agencySearchTerm} setSearchTerm={setAgencySearchTerm}
                                        selected={draftAgencies} setSelected={setDraftAgencies}
                                        placeholder="-- Chọn cơ quan ban hành --" label="cơ quan"
                                    />
                                    <MultiSelectDropdown
                                        isOpen={isFileTypeOpen} setIsOpen={setIsFileTypeOpen}
                                        options={fileTypeOptions} filteredOptions={filteredFileTypeOpts}
                                        searchTerm={fileTypeSearchTerm} setSearchTerm={setFileTypeSearchTerm}
                                        selected={draftFileTypes} setSelected={setDraftFileTypes}
                                        placeholder="-- Chọn loại biểu mẫu --" label="loại"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Danh sách biểu mẫu */}
                    <div className="space-y-4 mb-8">
                        {currentListItems.length > 0 ? currentListItems.map(item => {
                            const fileTypeInfo = getFileIcon(item.fileName);
                            return (
                                <div key={item.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#2580f0] hover:shadow-md transition bg-white group">
                                    <div className="w-24 h-20 bg-gray-100 rounded overflow-hidden shrink-0 relative cursor-pointer" onClick={() => navigateToDetail(item)}>
                                        <img src={item.thumb || `https://images.unsplash.com/photo-${['1618044733300-9472054094ee', '1554224155-8d04cb21cd6c', '1454165804606-c3d57bc86b40', '1589829085413-56de8ae18c73'][item.id % 4]}?auto=format&fit=crop&w=200&q=80`} alt={item.title} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                                        <span className={`absolute top-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${fileTypeInfo.color}`}>{fileTypeInfo.label}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[15px] font-bold text-[#212121] group-hover:text-[#1E88E5] line-clamp-2 leading-snug mb-1 cursor-pointer" onClick={() => navigateToDetail(item)}>{item.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-500 mb-2">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field}</span>
                                            <span>{item.agency}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                        </div>
                                        <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">{item.summary}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); alert(`Đang tải file ${item.fileName} xuống...`); }}
                                            className="px-4 py-2 text-white bg-[#2580f0] rounded-md text-sm font-medium hover:bg-[#1e63dc] transition shadow-sm flex items-center gap-2"
                                            title="Tải xuống"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                            Tải xuống
                                        </button>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <p className="text-[15px] font-medium">Không tìm thấy biểu mẫu nào</p>
                                <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                            </div>
                        )}
                    </div>

                    {/* Phân trang */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[14px] text-gray-600 font-medium">
                                    <span>Hiển thị:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                        className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-[#2580f0]"
                                    >
                                        <option value={10}>10 bản ghi</option>
                                        <option value={20}>20 bản ghi</option>
                                        <option value={50}>50 bản ghi</option>
                                    </select>
                                </div>
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> của <strong className="text-[#212121]">{filteredItems.length}</strong> bản ghi
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}
                </section>
            );
        }


        function VanBanPhapLuatListPage({ menu, subPage, items, navigateToDetail }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);
            const [draftKeyword, setDraftKeyword] = useState('');
            const [keyword, setKeyword] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [draftAgencies, setDraftAgencies] = useState([]);
            const [draftTypes, setDraftTypes] = useState([]);
            const [draftStatuses, setDraftStatuses] = useState([]);
            const [selectedFields, setSelectedFields] = useState([]);
            const [selectedAgencies, setSelectedAgencies] = useState([]);
            const [selectedTypes, setSelectedTypes] = useState([]);
            const [selectedStatuses, setSelectedStatuses] = useState([]);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [agencySearchTerm, setAgencySearchTerm] = useState('');
            const [typeSearchTerm, setTypeSearchTerm] = useState('');
            const [statusSearchTerm, setStatusSearchTerm] = useState('');
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [isAgencyOpen, setIsAgencyOpen] = useState(false);
            const [isTypeOpen, setIsTypeOpen] = useState(false);
            const [isStatusOpen, setIsStatusOpen] = useState(false);
            const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

            const fieldOptions = [...new Set(items.map(i => i.linhVuc).filter(Boolean))];
            const agencyOptions = [...new Set(items.map(i => i.coQuanBanHanh).filter(Boolean))];
            const typeOptions = [...new Set(items.map(i => i.loaiVanBan).filter(Boolean))];
            const statusOptions = ['Có hiệu lực', 'Hết hiệu lực', 'Sửa đổi, bổ sung'];
            const statusMap = { 0: 'Hết hiệu lực', 1: 'Có hiệu lực', 2: 'Sửa đổi, bổ sung' };

            const filteredFieldOpts = fieldOptions.filter(f => f.toLowerCase().includes(fieldSearchTerm.toLowerCase().trim()));
            const filteredAgencyOpts = agencyOptions.filter(f => f.toLowerCase().includes(agencySearchTerm.toLowerCase().trim()));
            const filteredTypeOpts = typeOptions.filter(f => f.toLowerCase().includes(typeSearchTerm.toLowerCase().trim()));
            const filteredStatusOpts = statusOptions.filter(f => f.toLowerCase().includes(statusSearchTerm.toLowerCase().trim()));

            const filteredItems = items.filter(item => {
                const matchKeyword = keyword === '' || item.tieuDe.toLowerCase().includes(keyword.toLowerCase()) || item.soHieu.toLowerCase().includes(keyword.toLowerCase());
                const matchField = selectedFields.length === 0 || selectedFields.includes(item.linhVuc);
                const matchAgency = selectedAgencies.length === 0 || selectedAgencies.includes(item.coQuanBanHanh);
                const matchType = selectedTypes.length === 0 || selectedTypes.includes(item.loaiVanBan);
                const matchStatus = selectedStatuses.length === 0 || selectedStatuses.includes(statusMap[item.tinhTrang]);
                return matchKeyword && matchField && matchAgency && matchType && matchStatus;
            }).sort((a, b) => {
                const dateA = a.ngayKy.split('/').reverse().join('');
                const dateB = b.ngayKy.split('/').reverse().join('');
                return dateB.localeCompare(dateA);
            });

            const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            const currentListItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => {
                setKeyword(draftKeyword);
                setSelectedFields(draftFields);
                setSelectedAgencies(draftAgencies);
                setSelectedTypes(draftTypes);
                setSelectedStatuses(draftStatuses);
                setCurrentPage(1);
                setIsFieldOpen(false);
                setIsAgencyOpen(false);
                setIsTypeOpen(false);
                setIsStatusOpen(false);
            };

            const handleClear = () => {
                setDraftKeyword('');
                setDraftFields([]);
                setDraftAgencies([]);
                setDraftTypes([]);
                setDraftStatuses([]);
                setFieldSearchTerm('');
                setAgencySearchTerm('');
                setTypeSearchTerm('');
                setStatusSearchTerm('');
                setKeyword('');
                setSelectedFields([]);
                setSelectedAgencies([]);
                setSelectedTypes([]);
                setSelectedStatuses([]);
                setCurrentPage(1);
                setIsFieldOpen(false);
                setIsAgencyOpen(false);
                setIsTypeOpen(false);
                setIsStatusOpen(false);
            };

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }
            };

            const handleItemsPerPageChange = (newItemsPerPage) => {
                setItemsPerPage(newItemsPerPage);
                setCurrentPage(1);
            };

            const MultiSelectDropdown = ({ isOpen, setIsOpen, options, filteredOptions, searchTerm, setSearchTerm, selected, setSelected, placeholder }) => (
                <div className="relative w-full">
                    <button onClick={() => { setIsOpen(!isOpen); setSearchTerm(''); }} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition text-sm">
                        <span className="truncate">{selected.length > 0 ? `Đã chọn: ${selected.length}` : placeholder}</span>
                        <span className="text-[10px] text-gray-400">▼</span>
                    </button>
                    {isOpen && (
                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col">
                            <div className="p-2 border-b border-gray-200">
                                <input type="text" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2580f0]" placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="overflow-y-auto flex-1">
                                {filteredOptions.map(opt => (
                                    <label key={opt} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                                        <input type="checkbox" className="mr-2" checked={selected.includes(opt)} onChange={() => {
                                            setSelected(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
                                        }} />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                                {filteredOptions.length === 0 && <p className="px-3 py-2 text-gray-500 text-sm">Không tìm thấy</p>}
                            </div>
                        </div>
                    )}
                </div>
            );

            const hasActiveFilters = selectedFields.length > 0 || selectedAgencies.length > 0 || selectedTypes.length > 0 || selectedStatuses.length > 0;

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">Danh sách văn bản pháp luật về doanh nghiệp</h2>

                    {/* Bộ lọc */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            {/* Dòng 1: Search + Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        maxLength={100}
                                        placeholder="Nhập số hiệu, tên văn bản để tìm kiếm..."
                                        value={draftKeyword}
                                        onChange={(e) => setDraftKeyword(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                    />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa bộ lọc
                                    </button>
                                    <button onClick={() => setShowAdvancedFilter(!showAdvancedFilter)} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                        {showAdvancedFilter ? 'Ẩn bộ lọc' : 'Bộ lọc'}
                                    </button>
                                </div>
                            </div>
                            {/* Bộ lọc mở rộng */}
                            {showAdvancedFilter && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-200">
                                    <MultiSelectDropdown
                                        isOpen={isFieldOpen} setIsOpen={setIsFieldOpen}
                                        options={fieldOptions} filteredOptions={filteredFieldOpts}
                                        searchTerm={fieldSearchTerm} setSearchTerm={setFieldSearchTerm}
                                        selected={draftFields} setSelected={setDraftFields}
                                        placeholder="-- Chọn lĩnh vực --" label="lĩnh vực"
                                    />
                                    <MultiSelectDropdown
                                        isOpen={isAgencyOpen} setIsOpen={setIsAgencyOpen}
                                        options={agencyOptions} filteredOptions={filteredAgencyOpts}
                                        searchTerm={agencySearchTerm} setSearchTerm={setAgencySearchTerm}
                                        selected={draftAgencies} setSelected={setDraftAgencies}
                                        placeholder="-- Chọn cơ quan ban hành --" label="cơ quan ban hành"
                                    />
                                    <MultiSelectDropdown
                                        isOpen={isTypeOpen} setIsOpen={setIsTypeOpen}
                                        options={typeOptions} filteredOptions={filteredTypeOpts}
                                        searchTerm={typeSearchTerm} setSearchTerm={setTypeSearchTerm}
                                        selected={draftTypes} setSelected={setDraftTypes}
                                        placeholder="-- Chọn loại văn bản --" label="loại văn bản"
                                    />
                                    <MultiSelectDropdown
                                        isOpen={isStatusOpen} setIsOpen={setIsStatusOpen}
                                        options={statusOptions} filteredOptions={filteredStatusOpts}
                                        searchTerm={statusSearchTerm} setSearchTerm={setStatusSearchTerm}
                                        selected={draftStatuses} setSelected={setDraftStatuses}
                                        placeholder="-- Chọn tình trạng --" label="tình trạng"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Danh sách card */}
                    <div className="space-y-3">
                        {currentListItems.length > 0 ? currentListItems.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#1E88E5] hover:shadow-sm transition-all bg-white">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigateToDetail(item)}>
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{item.soHieu}</span>
                                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${item.tinhTrang === 1 ? 'bg-green-100 text-green-700' : item.tinhTrang === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {statusMap[item.tinhTrang]}
                                            </span>
                                            <span className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded">{item.loaiVanBan}</span>
                                        </div>
                                        <h3 className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] mb-2 line-clamp-2">{item.tieuDe}</h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-600">
                                            <span><strong className="text-gray-700">Cơ quan ban hành:</strong> {item.coQuanBanHanh}</span>
                                            <span><strong className="text-gray-700">Ngày ban hành:</strong> {item.ngayKy}</span>
                                            <span><strong className="text-gray-700">Ngày có hiệu lực:</strong> {item.ngayHieuLuc}</span>
                                            <span><strong className="text-gray-700">Lĩnh vực:</strong> <span className="bg-gray-100 px-2 py-0.5 rounded text-[12px]">{item.linhVuc}</span></span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); alert(`Đang tải file ${item.soHieu}.pdf xuống...`); }}
                                            className="px-4 py-2 text-white bg-[#2580f0] rounded-md text-sm font-medium hover:bg-[#1e63dc] transition shadow-sm flex items-center gap-2"
                                            title="Tải xuống"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                            Tải xuống
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <p className="text-[15px] font-medium">Không tìm thấy văn bản nào</p>
                                <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                            </div>
                        )}
                    </div>

                    {/* Phân trang */}
                    {(totalPages > 1 || filteredItems.length > 0) && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                            <div className="flex items-center gap-4">
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> của <strong className="text-[#212121]">{filteredItems.length}</strong> bản ghi
                                </div>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                    className="px-3 py-1.5 border border-gray-300 rounded-md text-[14px] text-gray-600 focus:outline-none focus:border-[#2580f0] bg-white shadow-sm"
                                >
                                    <option value={10}>10 bản ghi/trang</option>
                                    <option value={20}>20 bản ghi/trang</option>
                                    <option value={50}>50 bản ghi/trang</option>
                                </select>
                            </div>
                            {totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                        ))}
                                    </div>
                                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            );
        }

        function FormDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            const getFileType = (fileName) => {
                if (!fileName) return 'File';
                const ext = fileName.split('.').pop().toLowerCase();
                if (ext === 'pdf') return 'PDF';
                if (['doc', 'docx'].includes(ext)) return 'Word';
                if (['xls', 'xlsx'].includes(ext)) return 'Excel';
                return 'File';
            };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            const fileTypeLabel = getFileType(article.fileName);
            const mainAttachment = article.attachments && article.attachments.length > 0 ? article.attachments[0] : null;
            const placeholderPhotos = [
                '1618044733300-9472054094ee',
                '1554224155-8d04cb21cd6c',
                '1454165804606-c3d57bc86b40',
                '1589829085413-56de8ae18c73'
            ];

            const handleDownload = () => {
                alert(`Đang tải file ${mainAttachment ? mainAttachment.name : article.fileName} xuống...`);
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    {/* Thanh nút: Quay lại + Tải xuống */}
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center justify-between">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 bg-[#1E88E5] text-white px-4 py-2 rounded-md font-medium text-[14px] hover:bg-[#1976D2] transition shadow-sm"
                            title="Tải xuống"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Tải xuống
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        {/* Tiêu đề màn hình */}
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.title}</h1>

                        {/* Thông tin biểu mẫu */}
                        <div className="mb-6">
                            <div className="flex items-start gap-6 mb-5">
                                {/* Ảnh đại diện */}
                                <div className="w-32 h-28 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden group cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const imgEl = e.currentTarget.querySelector('img');
                                        if (document.fullscreenElement) {
                                            document.exitFullscreen();
                                        } else {
                                            imgEl?.requestFullscreen();
                                        }
                                    }}
                                    title="Nhấn để xem toàn màn hình"
                                >
                                    <img
                                        src={article.thumb || `https://images.unsplash.com/photo-${placeholderPhotos[article.id % placeholderPhotos.length]}?auto=format&fit=crop&w=200&q=80`}
                                        alt={article.title}
                                        className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                                    />
                                    <span className="absolute top-2 right-2 text-[11px] font-bold px-2 py-1 rounded bg-gray-900 text-white">{fileTypeLabel}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const imgSrc = article.thumb || `https://images.unsplash.com/photo-${placeholderPhotos[article.id % placeholderPhotos.length]}?auto=format&fit=crop&w=200&q=80`;
                                            const link = document.createElement('a');
                                            link.href = imgSrc;
                                            link.download = 'hinh-anh.jpg';
                                            link.target = '_blank';
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 text-[#1b2b49] px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md whitespace-nowrap"
                                        title="Tải ảnh xuống"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        Tải xuống
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <div className="space-y-2 text-[14px] text-gray-700">
                                        <p><span className="font-semibold text-gray-900">Lĩnh vực:</span> <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">{article.field}</span></p>
                                        <p><span className="font-semibold text-gray-900">Cơ quan ban hành:</span> {article.agency}</p>
                                        <p><span className="font-semibold text-gray-900">Loại biểu mẫu:</span> {fileTypeLabel}</p>
                                        <p><span className="font-semibold text-gray-900">Ngày đăng:</span> {article.date}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tóm tắt - in nghiêng */}
                            {article.summary && (
                                <div className="mb-5 pl-4 border-l-[3px] border-[#2580f0]">
                                    <p className="text-[#616161] italic text-[15px] leading-relaxed">{article.summary}</p>
                                </div>
                            )}

                            {/* Mô tả chi tiết */}
                            {article.description && (
                                <div className="mb-5">
                                    <h3 className="text-[16px] font-bold text-[#212121] mb-2">Mô tả</h3>
                                    <div className="text-[14px] text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.description }} />
                                </div>
                            )}
                        </div>

                        {/* File đính kèm - Preview */}
                        {mainAttachment && (
                            <div className="mb-8">
                                <h4 className="font-bold text-[#1b2b49] mb-3 uppercase text-[15px]">Xem trước file</h4>
                                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm" style={{height: '500px'}}>
                                    <div className="w-full h-full overflow-auto bg-white p-8 md:p-12">
                                        <div className="max-w-3xl mx-auto text-[#212121] text-[14px] leading-relaxed font-serif">
                                            <div className="text-center mb-8">
                                                <p className="text-[11px] text-gray-500 mb-2">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                                <p className="text-[11px] text-gray-500 font-bold">Độc lập - Tự do - Hạnh phúc</p>
                                                <p className="text-[11px] text-gray-500 mt-4">---o0o---</p>
                                            </div>
                                            <h2 className="text-[18px] font-bold text-center mb-6 uppercase">{article.title}</h2>
                                            <div className="space-y-4 text-justify">
                                                <p><strong>Số:</strong> {article.id}/HD-{article.field ? article.field.substring(0,3).toUpperCase() : 'MBH'}</p>
                                                <p><strong>Bên bán (Bên A):</strong> {article.agency}</p>
                                                <p><strong>Bên mua (Bên B):</strong> ............................................................................</p>
                                                <p>Hai bên cùng thỏa thuận ký kết hợp đồng mua bán hàng hóa với các điều khoản sau:</p>
                                                <p className="font-bold">Điều 1. Đối tượng hợp đồng</p>
                                                <p>Bên A đồng ý bán và Bên B đồng ý mua hàng hóa theo danh mục, số lượng, đơn giá đính kèm.</p>
                                                <p className="font-bold">Điều 2. Giá cả và phương thức thanh toán</p>
                                                <p>Giá trị hợp đồng: ............................................................................</p>
                                                <p>Phương thức thanh toán: Chuyển khoản qua ngân hàng.</p>
                                                <p className="font-bold">Điều 3. Thời hạn và địa điểm giao hàng</p>
                                                <p>Thời gian giao hàng: Trong vòng 10 ngày làm việc kể từ ngày ký hợp đồng.</p>
                                                <p className="font-bold">Điều 4. Trách nhiệm của các bên</p>
                                                <p>Các bên cam kết thực hiện đúng và đầy đủ các nghĩa vụ theo quy định của pháp luật.</p>
                                                <div className="mt-12 grid grid-cols-2 gap-8 text-center">
                                                    <div>
                                                        <p className="font-bold mb-8">ĐẠI DIỆN BÊN A</p>
                                                        <p className="text-gray-400">(Ký, ghi rõ họ tên, đóng dấu)</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold mb-8">ĐẠI DIỆN BÊN B</p>
                                                        <p className="text-gray-400">(Ký, ghi rõ họ tên)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        function VanBanPhapLuatDetailPage({ articleId, items, backToList, navigateToPreview }) {
            const article = items.find(item => item.id === articleId);
            if (!article) return null;
            const contentRef = useRef(null);

            const statusMap = { 0: 'Hết hiệu lực', 1: 'Có hiệu lực', 2: 'Sửa đổi, bổ sung' };
            const statusClass = { 0: 'bg-red-100 text-red-700', 1: 'bg-green-100 text-green-700', 2: 'bg-yellow-100 text-yellow-700' };

            const handleDownload = (fileName) => {
                alert(`Đang tải file ${fileName} xuống...`);
            };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            // Attach download overlay to images after render
            useEffect(() => {
                if (!contentRef.current) return;
                const images = contentRef.current.querySelectorAll('img');
                images.forEach(img => {
                    if (img.closest('.img-hover-wrapper')) return;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'img-hover-wrapper';
                    wrapper.style.cssText = 'position: relative; display: inline-block;';

                    img.style.cssText = 'max-width: 100%; height: auto; border-radius: 4px; display: block; margin: 16px 0; cursor: pointer;';
                    img.parentElement?.insertBefore(wrapper, img);
                    wrapper.appendChild(img);

                    // Click to fullscreen
                    img.onclick = (e) => {
                        e.stopPropagation();
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                        } else {
                            img.requestFullscreen();
                        }
                    };
                    img.title = 'Nhấn để xem toàn màn hình';

                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:absolute;top:8px;right:8px;opacity:0;transition:opacity 0.2s;';
                    const btn = document.createElement('button');
                    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="display:inline;vertical-align:middle;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Tải xuống';
                    btn.style.cssText = 'background:rgba(255,255,255,0.95);color:#1b2b49;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.15);white-space:nowrap;';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = 'hinh-anh.jpg';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    };
                    overlay.appendChild(btn);
                    wrapper.appendChild(overlay);

                    wrapper.onmouseenter = () => { overlay.style.opacity = '1'; };
                    wrapper.onmouseleave = () => { overlay.style.opacity = '0'; };
                });
            }, [article.noiDung]);

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    {/* Thanh nút: Quay lại + Tải xuống */}
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center justify-between">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                        <button
                            onClick={() => handleDownload(article.fileDinhKem?.[0]?.name || 'file.pdf')}
                            className="flex items-center gap-2 bg-[#1E88E5] text-white px-4 py-2 rounded-md font-medium text-[14px] hover:bg-[#1976D2] transition shadow-sm"
                            title="Tải xuống"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Tải xuống
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        {/* Tiêu đề màn hình */}
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.tieuDe}</h1>

                        {/* Thông tin văn bản */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Số hiệu:</span>
                                    <span className="text-gray-700 bg-gray-100 px-2 py-0.5 rounded font-medium">{article.soHieu}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Loại văn bản:</span>
                                    <span className="text-gray-700">{article.loaiVanBan}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Cơ quan ban hành:</span>
                                    <span className="text-gray-700">{article.coQuanBanHanh}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Ngày ban hành:</span>
                                    <span className="text-gray-700">{article.ngayKy}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Ngày có hiệu lực:</span>
                                    <span className="text-gray-700">{article.ngayHieuLuc}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Tình trạng:</span>
                                    <span className={`text-[13px] font-medium px-2 py-0.5 rounded ${statusClass[article.tinhTrang] || statusClass[1]}`}>
                                        {statusMap[article.tinhTrang] || statusMap[1]}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-semibold text-gray-900 min-w-[120px]">Lĩnh vực:</span>
                                    <span className="text-gray-700 bg-gray-100 px-2 py-0.5 rounded font-medium">{article.linhVuc}</span>
                                </div>
                            </div>
                        </div>

                        {/* Nội dung văn bản */}
                        {article.noiDung && (
                            <div className="mb-8">
                                <h3 className="text-[16px] font-bold text-[#212121] mb-4 uppercase border-b border-gray-200 pb-2">Nội dung văn bản</h3>
                                <div
                                    ref={contentRef}
                                    className="text-[#212121] text-[14px] leading-relaxed border border-gray-200 rounded-lg p-6 max-h-[600px] overflow-y-auto"
                                    style={{scrollbarWidth: 'thin'}}
                                    dangerouslySetInnerHTML={{ __html: article.noiDung }}
                                />
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        function MultimediaListPage({ menu, subPage, items, navigateToDetail, navigateToList }) {
            const [activeTab, setActiveTab] = useState('video');
            const [currentPage, setCurrentPage] = useState(1);
            const [draftSearch, setDraftSearch] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [searchTerm, setSearchTerm] = useState('');
            const [selectedFields, setSelectedFields] = useState([]);
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [carouselIndex, setCarouselIndex] = useState(0);

            const itemsPerPage = activeTab === 'video' ? 12 : activeTab === 'longform' ? 12 : 12;

            const tabs = [
                { id: 'video', label: 'Video bài giảng' },
                { id: 'longform', label: 'Longform' },
                { id: 'infographic', label: 'Infographics' },
                { id: 'photo', label: 'Photos' }
            ];

            // Sort by date descending (newest first)
            const sortedItems = useMemo(() => {
                return [...items].filter(item => item.type === activeTab).sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items, activeTab]);

            const fields = useMemo(() => [...new Set(sortedItems.map(i => i.field).filter(Boolean))], [sortedItems]);

            // Filter fields by search term in dropdown
            const filteredFields = useMemo(() => {
                const normalized = normalizeText(fieldSearchTerm);
                if (!normalized) return fields;
                return fields.filter(f => normalizeText(f).includes(normalized));
            }, [fields, fieldSearchTerm]);

            // Filter with diacritic-insensitive search
            const filteredItems = useMemo(() => {
                const normalizedSearch = normalizeText(searchTerm);
                return sortedItems.filter(item => {
                    const matchSearch = normalizedSearch === '' || normalizeText(item.title).includes(normalizedSearch);
                    const matchField = selectedFields.length > 0 ? selectedFields.includes(item.field) : true;
                    return matchSearch && matchField;
                });
            }, [sortedItems, searchTerm, selectedFields]);

            // Banner: newest video (BR1)
            const bannerItem = activeTab === 'video' && filteredItems.length > 0 ? filteredItems[0] : null;
            const gridItems = activeTab === 'video' && filteredItems.length > 1 ? filteredItems.slice(1) : filteredItems;
            const featuredItems = (activeTab === 'longform' || activeTab === 'infographic') ? filteredItems.slice(0, 5) : [];
            const latestItem = (activeTab === 'longform' || activeTab === 'infographic') && featuredItems.length > 0 ? featuredItems[0] : null;
            const nextFourItems = (activeTab === 'longform' || activeTab === 'infographic') ? featuredItems.slice(1, 5) : [];
            const photoCarouselItems = activeTab === 'photo' ? filteredItems.slice(0, 8) : [];

            const [photoCarouselIndex, setPhotoCarouselIndex] = useState(0);

            const totalPages = Math.ceil(gridItems.length / itemsPerPage) || 1;
            const currentListItems = gridItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleTabChange = (tabId) => {
                setActiveTab(tabId);
                setCurrentPage(1);
                setSearchTerm('');
                setSelectedFields([]);
                setDraftSearch('');
                setDraftFields([]);
                setCarouselIndex(0);
                setPhotoCarouselIndex(0);
            };

            const handleSearch = () => {
                const trimmed = draftSearch.trim();
                setSearchTerm(trimmed);
                setSelectedFields(draftFields);
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const handleClear = () => {
                setDraftSearch('');
                setDraftFields([]);
                setSearchTerm('');
                setSelectedFields([]);
                setFieldSearchTerm('');
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({top: 400, behavior: 'smooth'});
                }
            };

            // Banner carousel (BR1)
            const nextBanner = () => {
                if (filteredItems.length > 1) {
                    setCarouselIndex((prev) => (prev + 1) % filteredItems.length);
                }
            };

            const prevBanner = () => {
                if (filteredItems.length > 1) {
                    setCarouselIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                }
            };

            const currentBanner = filteredItems[carouselIndex] || bannerItem;

            const renderEmptyState = () => {
                if (sortedItems.length === 0) {
                    return (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            <p className="text-[15px] font-medium">Danh sách trống, chưa có dữ liệu</p>
                        </div>
                    );
                }
                return (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <p className="text-[15px] font-medium">Không tìm thấy kết quả</p>
                    </div>
                );
            };

            // Video tab with full features (banner, search, filter, pagination)
            if (activeTab === 'video') {
                return (
                    <section className="rounded-[8px] border border-[#E0E0E0] bg-white shadow-sm min-h-[600px] overflow-hidden">
                        <p className="text-[13px] font-medium text-[#616161] px-6 pt-6 mb-2">Trang chủ / {menu.label} / {subPage.label}</p>
                        <h2 className="text-[20px] font-bold text-[#212121] px-6 pb-4 border-b border-[#E0E0E0]">{subPage.label}</h2>

                        {/* Tabs */}
                        <div className="flex border-b border-[#E0E0E0] px-6 mb-0 overflow-x-auto hide-scrollbar bg-gray-50">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`px-6 py-4 font-semibold text-[15px] whitespace-nowrap transition-all relative flex items-center gap-2 ${activeTab === tab.id ? 'text-[#1E88E5]' : 'text-gray-500 hover:text-[#1E88E5] hover:bg-gray-100'}`}
                                >
                                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E88E5] rounded-full"></span>}
                                    {tab.id === 'video' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                    )}
                                    {tab.id === 'longform' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    )}
                                    {tab.id === 'infographic' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    )}
                                    {tab.id === 'photo' && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    )}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Banner Video nổi bật (BR1) */}
                        {currentBanner && (
                            <div className="relative w-full h-[300px] md:h-[400px] bg-gray-900 overflow-hidden group cursor-pointer" onClick={() => navigateToDetail(currentBanner)}>
                                {/* Ảnh đại diện làm nền banner với fade transition */}
                                <img
                                    key={currentBanner.id}
                                    src={currentBanner.thumb}
                                    alt={currentBanner.title}
                                    className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out]"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                                    {/* Tiêu đề và lĩnh vực */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-[#1E88E5] text-white text-[11px] font-bold px-2.5 py-1 rounded">{currentBanner.field || 'Pháp lý chung'}</span>
                                        {currentBanner.duration && (
                                            <span className="bg-black/60 text-white text-[12px] px-2 py-1 rounded flex items-center gap-1">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                                                {currentBanner.duration}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-bold line-clamp-2 drop-shadow-lg">{currentBanner.title}</h3>
                                </div>
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/70 flex items-center justify-center pl-1 backdrop-blur-sm bg-black/30 group-hover:scale-110 group-hover:border-white transition-transform shadow-2xl">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" /></svg>
                                    </div>
                                </div>
                                {/* Navigation arrows */}
                                {filteredItems.length > 1 && (
                                    <>
                                        {carouselIndex > 0 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); prevBanner(); }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#1E88E5] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                                title="Video trước"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                            </button>
                                        )}
                                        {carouselIndex < filteredItems.length - 1 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); nextBanner(); }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#1E88E5] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                                title="Xem video tiếp theo"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        <div className="p-6">
                            {/* Tìm kiếm & Lọc */}
                            <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm overflow-hidden transition-all duration-300 mb-8">
                                <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                                    <div className="relative flex-1 w-full">
                                        <input
                                            type="text"
                                            maxLength={100}
                                            placeholder="Nhập tiêu đề để tìm kiếm..."
                                            value={draftSearch}
                                            onChange={(e) => setDraftSearch(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                        />
                                        <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <div className="relative w-full md:w-[250px]">
                                        <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                            <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : "-- Chọn lĩnh vực --"}</span>
                                            <span className="text-[10px] text-gray-400">▼</span>
                                        </button>
                                        {isFieldOpen && (
                                            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                                {/* Search input in dropdown */}
                                                <div className="p-2 border-b border-gray-200">
                                                    <div className="relative">
                                                        <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                        <input
                                                            type="text"
                                                            placeholder="Tìm lĩnh vực..."
                                                            value={fieldSearchTerm}
                                                            onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                        />
                                                    </div>
                                                </div>
                                                {/* Checkbox list */}
                                                <div className="overflow-auto max-h-48">
                                                    {filteredFields.length > 0 ? filteredFields.map(f => (
                                                        <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                            <input
                                                                type="checkbox"
                                                                className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                                checked={draftFields.includes(f)}
                                                                onChange={() => {
                                                                    if (draftFields.includes(f)) setDraftFields(draftFields.filter(item => item !== f));
                                                                    else setDraftFields([...draftFields, f]);
                                                                }}
                                                            />
                                                            {f}
                                                        </label>
                                                    )) : (
                                                        <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy lĩnh vực nào</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button onClick={handleSearch} className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            Tìm kiếm
                                        </button>
                                        <button onClick={handleClear} className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            Xóa bộ lọc
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Grid Video */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                                {currentListItems.length > 0 ? currentListItems.map(item => (
                                    <div
                                        key={item.id}
                                        className="relative group rounded-lg overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
                                        onClick={() => navigateToDetail(item)}
                                        title={item.title}
                                    >
                                        <div className="w-full aspect-video bg-gray-200 relative overflow-hidden shrink-0">
                                            <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                                <div className="w-12 h-12 rounded-full border-[3px] border-white/80 flex items-center justify-center text-white pl-1 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5V19L19 12L8 5Z" /></svg>
                                                </div>
                                            </div>
                                            {item.duration && (
                                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">{item.duration}</span>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <h3 className="text-[15px] font-bold text-[#212121] group-hover:text-[#1E88E5] group-hover:underline line-clamp-2 leading-snug mb-2" title={item.title}>{item.title}</h3>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded truncate max-w-[60%]" title={item.field}>{item.field}</span>
                                                <span className="text-[12px] text-[#757575] shrink-0">{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : renderEmptyState()}
                            </div>

                            {/* Phân trang */}
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                                    <div className="text-[14px] text-gray-600 font-medium">
                                        Hiển thị <strong className="text-[#212121]">{gridItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, gridItems.length)}</strong> của <strong className="text-[#212121]">{gridItems.length}</strong> bản ghi
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                );
            }

            // Other tabs (longform, infographic, photo) - simple grid
            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>

                    {/* Tabs */}
                    <div className="flex border-b border-[#E0E0E0] mb-0 overflow-x-auto hide-scrollbar bg-gray-50">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-6 py-4 font-semibold text-[15px] whitespace-nowrap transition-all relative flex items-center gap-2 ${activeTab === tab.id ? 'text-[#1E88E5]' : 'text-gray-500 hover:text-[#1E88E5] hover:bg-gray-100'}`}
                            >
                                {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E88E5] rounded-full"></span>}
                                {tab.id === 'video' && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                )}
                                {tab.id === 'longform' && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                )}
                                {tab.id === 'infographic' && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                )}
                                {tab.id === 'photo' && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                )}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Banner carousel cho Photos */}
                    {activeTab === 'photo' && photoCarouselItems.length > 0 && (
                        <div className="mb-10">
                            <div className="relative rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
                                {/* Carousel items */}
                                <div className="flex overflow-hidden h-full">
                                    {photoCarouselItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className="flex-shrink-0 w-full transition-transform duration-500 ease-in-out"
                                            style={{ transform: `translateX(-${photoCarouselIndex * 100}%)` }}
                                        >
                                            <div className="relative h-[400px] cursor-pointer" onClick={() => navigateToDetail(item)}>
                                                <img src={item.thumb} alt={item.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <span className="bg-[#E3242B] text-white text-[11px] font-bold px-2.5 py-1 rounded inline-block mb-2">Ảnh nổi bật</span>
                                                    <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 drop-shadow-lg">{item.title}</h3>
                                                    <p className="text-sm text-white/80 mt-2">{item.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Navigation arrows */}
                                {photoCarouselItems.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setPhotoCarouselIndex(prev => prev > 0 ? prev - 1 : photoCarouselItems.length - 1)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition z-10"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                        <button
                                            onClick={() => setPhotoCarouselIndex(prev => prev < photoCarouselItems.length - 1 ? prev + 1 : 0)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition z-10"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </button>
                                    </>
                                )}
                                {/* Dots indicator */}
                                {photoCarouselItems.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {photoCarouselItems.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setPhotoCarouselIndex(idx)}
                                                className={`w-2.5 h-2.5 rounded-full transition ${photoCarouselIndex === idx ? 'bg-white w-6' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Banner nổi bật cho Longform/Infographic */}
                    {(activeTab === 'longform' || activeTab === 'infographic') && featuredItems.length > 0 && (
                        <div className="mb-10">
                            <div className="relative rounded-lg overflow-hidden" style={{ minHeight: '550px' }}>
                                {/* Ảnh to làm nền tràn */}
                                {latestItem && (
                                    <img src={latestItem.thumb} alt={latestItem.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                )}
                                {/* Overlay gradient - chỉ phủ phần trên, chừa part dưới cho 4 ảnh nhỏ */}
                                <div className="absolute inset-x-0 top-0 bottom-[140px] bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                                {/* Nội dung bên trong */}
                                <div className="relative z-10 w-full h-full px-10">
                                    {/* Tiêu đề ảnh to */}
                                    {latestItem && (
                                        <div className="absolute top-6 left-10 right-10">
                                            <span className="bg-[#E3242B] text-white text-[11px] font-bold px-2.5 py-1 rounded inline-block mb-2">Mới nhất</span>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white line-clamp-2 drop-shadow-lg">{latestItem.title}</h3>
                                            <p className="text-sm text-white/80 mt-2">{latestItem.date}</p>
                                        </div>
                                    )}
                                    {/* Click lên ảnh to để xem chi tiết - chỉ phủ部分 trên */}
                                    <div className="absolute inset-x-0 top-0 bottom-[130px] z-0 cursor-pointer" onClick={() => navigateToDetail(latestItem)}></div>
                                </div>
                                {/* 4 item nhỏ nằm phía dưới banner */}
                                {nextFourItems.length > 0 && (
                                    <div className="absolute bottom-12 left-10 right-10 z-30">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {nextFourItems.map(item => (
                                            <div key={item.id} className="cursor-pointer group" onClick={(e) => { e.stopPropagation(); navigateToDetail(item); }}>
                                                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-white/20">
                                                    <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                                    <div className="absolute bottom-2 left-2 right-2">
                                                        <h4 className="text-[11px] md:text-[12px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#a0c4ff] transition-colors">{item.title}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                                {/* Click lên ảnh to để xem chi tiết - phủ toàn bộ banner */}
                                <div className="absolute inset-0 z-0 cursor-pointer group" onClick={() => navigateToDetail(latestItem)}></div>
                            </div>
                        </div>
                    )}

                    {/* Tìm kiếm & Lọc (hiển thị cho longform/infographic/photo) */}
                    {(activeTab === 'longform' || activeTab === 'infographic' || activeTab === 'photo') && (
                        <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm overflow-visible transition-all duration-300 mb-8">
                            <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        maxLength={100}
                                        placeholder="Nhập tiêu đề để tìm kiếm..."
                                        value={draftSearch}
                                        onChange={(e) => setDraftSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                    />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="relative w-full md:w-[250px]">
                                    <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                        <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : "-- Chọn lĩnh vực --"}</span>
                                        <span className="text-[10px] text-gray-400">▼</span>
                                    </button>
                                    {isFieldOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                            <div className="p-2 border-b border-gray-200">
                                                <div className="relative">
                                                    <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                    <input
                                                        type="text"
                                                        placeholder="Tìm lĩnh vực..."
                                                        value={fieldSearchTerm}
                                                        onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="overflow-auto max-h-48">
                                                {filteredFields.length > 0 ? filteredFields.map(f => (
                                                    <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                            checked={draftFields.includes(f)}
                                                            onChange={() => {
                                                                if (draftFields.includes(f)) setDraftFields(draftFields.filter(item => item !== f));
                                                                else setDraftFields([...draftFields, f]);
                                                            }}
                                                        />
                                                        {f}
                                                    </label>
                                                )) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy lĩnh vực nào</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button onClick={handleSearch} className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa bộ lọc
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grid Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {currentListItems.length > 0 ? currentListItems.map(item => (
                            <div key={item.id} className="group cursor-pointer border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col" onClick={() => navigateToDetail(item)}>
                                <div className="w-full h-40 bg-gray-200 relative overflow-hidden">
                                    <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                    {activeTab === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                            <div className="w-12 h-12 rounded-full border-[3px] border-white/80 flex items-center justify-center text-white pl-1 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">▶</div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <p className="text-[12px] font-medium text-gray-500 mb-2">{item.date}</p>
                                    <h3 className="text-[15px] font-bold text-[#1b2b49] group-hover:text-[#2580f0] line-clamp-3 leading-snug transition-colors">{item.title}</h3>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-16 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                                <p>Đang cập nhật nội dung cho chuyên mục này.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                            <div className="text-[14px] text-gray-600 font-medium">
                                Hiển thị <strong className="text-[#212121]">{currentListItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, currentListItems.length)}</strong> của <strong className="text-[#212121]">{currentListItems.length}</strong> bản ghi
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        // ==========================================
        // MODULE: VIDEO BÀI GIẢNG (Specific UI)
        // ==========================================

        // Helper: normalize search text (remove diacritics, lowercase, trim)
        const normalizeText = (text) => {
            if (!text) return '';
            return text
                .toString()
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .replace(/đ/g, 'd');
        };

        function VideoListPage({ menu, subPage, items, navigateToDetail }) {
            const [draftSearch, setDraftSearch] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [searchTerm, setSearchTerm] = useState('');
            const [selectedFields, setSelectedFields] = useState([]);
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [carouselIndex, setCarouselIndex] = useState(0);

            const [currentPage, setCurrentPage] = useState(1);
            const itemsPerPage = 12;

            // Sort by date descending (newest first) - BR3
            const sortedItems = useMemo(() => {
                return [...items].sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const fields = useMemo(() => [...new Set(sortedItems.map(i => i.field).filter(Boolean))], [sortedItems]);

            // Filter logic with diacritic-insensitive, case-insensitive search
            const filteredItems = useMemo(() => {
                const normalizedSearch = normalizeText(searchTerm);
                return sortedItems.filter(item => {
                    const matchSearch = normalizedSearch === '' || normalizeText(item.title).includes(normalizedSearch);
                    const matchField = selectedFields.length > 0 ? selectedFields.includes(item.field) : true;
                    return matchSearch && matchField;
                });
            }, [sortedItems, searchTerm, selectedFields]);

            // Banner: show newest video (BR1)
            const bannerItem = filteredItems.length > 0 ? filteredItems[0] : null;
            const gridItems = filteredItems.length > 1 ? filteredItems.slice(1) : [];

            const totalPages = Math.ceil(gridItems.length / itemsPerPage) || 1;
            const currentListItems = gridItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => {
                const trimmed = draftSearch.trim();
                setSearchTerm(trimmed);
                setSelectedFields(draftFields);
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const handleClear = () => {
                setDraftSearch('');
                setDraftFields([]);
                setSearchTerm('');
                setSelectedFields([]);
                setFieldSearchTerm('');
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({top: 400, behavior: 'smooth'});
                }
            };

            // Banner carousel navigation (BR1)
            const nextBanner = () => {
                if (filteredItems.length > 1) {
                    setCarouselIndex((prev) => (prev + 1) % filteredItems.length);
                }
            };

            const prevBanner = () => {
                if (filteredItems.length > 1) {
                    setCarouselIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                }
            };

            const currentBanner = filteredItems[carouselIndex] || bannerItem;

            // Empty state messages
            const renderEmptyState = () => {
                if (sortedItems.length === 0) {
                    return (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            <p className="text-[15px] font-medium">Danh sách trống, chưa có dữ liệu</p>
                        </div>
                    );
                }
                return (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <p className="text-[15px] font-medium">Không tìm thấy kết quả</p>
                    </div>
                );
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm min-h-[600px] overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                        <span className="text-[#BDBDBD]">|</span>
                        <h2 className="text-[20px] font-bold text-[#212121]">{subPage.label}</h2>
                    </div>

                    {/* Banner Video nổi bật (BR1) */}
                    {currentBanner && (
                        <div className="relative w-full h-[300px] md:h-[400px] bg-gray-900 overflow-hidden group cursor-pointer" onClick={() => navigateToDetail(currentBanner)}>
                            {/* Ảnh đại diện làm nền banner với fade transition */}
                            <img
                                key={currentBanner.id}
                                src={currentBanner.thumb}
                                alt={currentBanner.title}
                                className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out]"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                                {/* Tiêu đề và lĩnh vực */}
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-[#1E88E5] text-white text-[11px] font-bold px-2.5 py-1 rounded">{currentBanner.field || 'Pháp lý chung'}</span>
                                    {currentBanner.duration && (
                                        <span className="bg-black/60 text-white text-[12px] px-2 py-1 rounded flex items-center gap-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                                            {currentBanner.duration}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold line-clamp-2 drop-shadow-lg">{currentBanner.title}</h3>
                            </div>
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/70 flex items-center justify-center pl-1 backdrop-blur-sm bg-black/30 group-hover:scale-110 group-hover:border-white transition-transform shadow-2xl">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" /></svg>
                                </div>
                            </div>
                            {/* Navigation arrows */}
                            {filteredItems.length > 1 && (
                                <>
                                    {carouselIndex > 0 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevBanner(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#1E88E5] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                            title="Video trước"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                    )}
                                    {carouselIndex < filteredItems.length - 1 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextBanner(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#1E88E5] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                            title="Xem video tiếp theo"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    <div className="p-6">
                        {/* Khu vực Tìm kiếm & Lọc */}
                        <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm overflow-hidden transition-all duration-300 mb-8">
                            <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                                {/* Từ khóa - max 100 chars, placeholder as specified */}
                                <div className="relative flex-1 w-full">
                                    <input
                                        type="text"
                                        maxLength={100}
                                        placeholder="Nhập tiêu đề để tìm kiếm..."
                                        value={draftSearch}
                                        onChange={(e) => setDraftSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                    />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                {/* Lĩnh vực - Multi-select (as specified) */}
                                <div className="relative w-full md:w-[250px]">
                                    <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                        <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : "-- Chọn lĩnh vực --"}</span>
                                        <span className="text-[10px] text-gray-400">▼</span>
                                    </button>
                                    {isFieldOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                            {/* Search input in dropdown */}
                                            <div className="p-2 border-b border-gray-200">
                                                <div className="relative">
                                                    <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                    <input
                                                        type="text"
                                                        placeholder="Tìm lĩnh vực..."
                                                        value={fieldSearchTerm}
                                                        onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                    />
                                                </div>
                                            </div>
                                            {/* Checkbox list */}
                                            <div className="overflow-auto max-h-48">
                                                {filteredFields.length > 0 ? filteredFields.map(f => (
                                                    <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                            checked={draftFields.includes(f)}
                                                            onChange={() => {
                                                                if (draftFields.includes(f)) setDraftFields(draftFields.filter(item => item !== f));
                                                                else setDraftFields([...draftFields, f]);
                                                            }}
                                                        />
                                                        {f}
                                                    </label>
                                                )) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy lĩnh vực nào</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button onClick={handleSearch} className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa bộ lọc
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin kết quả */}
                        <div className="mb-6 text-[14px] text-[#616161]">
                            Hiển thị <strong className="text-[#212121]">{gridItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, gridItems.length)}</strong> của <strong className="text-[#212121]">{gridItems.length}</strong> bản ghi
                        </div>

                        {/* Grid Video - 12 items per page (BR2), 16:9 aspect ratio (BR4) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {currentListItems.length > 0 ? currentListItems.map(item => (
                                <div
                                    key={item.id}
                                    className="relative group rounded-lg overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
                                    onClick={() => navigateToDetail(item)}
                                    title={item.title}
                                >
                                    {/* Ảnh đại diện 16:9 (BR4) + hover effect + tooltip */}
                                    <div className="w-full aspect-video bg-gray-200 relative overflow-hidden shrink-0">
                                        <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                            <div className="w-12 h-12 rounded-full border-[3px] border-white/80 flex items-center justify-center text-white pl-1 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5V19L19 12L8 5Z" /></svg>
                                            </div>
                                        </div>
                                        {item.duration && (
                                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">{item.duration}</span>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        {/* Tiêu đề - hover effect + tooltip */}
                                        <h3 className="text-[15px] font-bold text-[#212121] group-hover:text-[#1E88E5] group-hover:underline line-clamp-2 leading-snug mb-2" title={item.title}>{item.title}</h3>
                                        <div className="mt-auto flex items-center justify-between">
                                            {/* Lĩnh vực */}
                                            <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded truncate max-w-[60%]" title={item.field}>{item.field}</span>
                                            {/* Ngày đăng (dd/mm/yyyy) */}
                                            <span className="text-[12px] text-[#757575] shrink-0">{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : renderEmptyState()}
                        </div>

                        {/* Phân trang (BR2: 12 records/page) */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{gridItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, gridItems.length)}</strong> của <strong className="text-[#212121]">{gridItems.length}</strong> bản ghi
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                        ))}
                                    </div>
                                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        function VideoDetailPage({ articleId, backToList, items, navigateToDetail }) {
            const article = items.find(i => i.id === articleId) || items[0];

            // Giả lập video liên quan (cùng lĩnh vực, trừ video hiện tại)
            const relatedVideos = items.filter(i => i.id !== article.id && i.field === article.field);

            // Pagination logic for related videos
            const [relatedPage, setRelatedPage] = useState(1);
            const relatedItemsPerPage = 4;
            const totalRelatedPages = Math.ceil(relatedVideos.length / relatedItemsPerPage) || 1;
            const currentRelatedChunk = relatedVideos.slice((relatedPage - 1) * relatedItemsPerPage, relatedPage * relatedItemsPerPage);

            const nextRelated = () => setRelatedPage(p => Math.min(p + 1, totalRelatedPages));
            const prevRelated = () => setRelatedPage(p => Math.max(p - 1, 1));

            // Ref cho custom carousel scroll
            const carouselRef = useRef(null);
            const [isDragging, setIsDragging] = useState(false);
            const [startX, setStartX] = useState(0);
            const [scrollLeft, setScrollLeft] = useState(0);

            const handleMouseDown = (e) => {
                setIsDragging(true);
                setStartX(e.pageX - carouselRef.current.offsetLeft);
                setScrollLeft(carouselRef.current.scrollLeft);
                carouselRef.current.style.cursor = 'grabbing';
            };

            const handleMouseLeave = () => {
                setIsDragging(false);
                carouselRef.current.style.cursor = 'grab';
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                carouselRef.current.style.cursor = 'grab';
            };

            const handleMouseMove = (e) => {
                if (!isDragging || !carouselRef.current) return;
                e.preventDefault();
                const x = e.pageX - carouselRef.current.offsetLeft;
                const walk = (x - startX) * 2; // scroll speed
                carouselRef.current.scrollLeft = scrollLeft - walk;
            };

            const scrollCarousel = (dir) => {
                if (carouselRef.current) {
                    // Scroll exactly 1 video width (BR5)
                    const itemWidth = carouselRef.current.querySelector('.related-video-item')?.offsetWidth || 240;
                    const scrollAmount = itemWidth + 16; // width + gap
                    carouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
                }
            };

            // Sync relatedPage with scroll position
            useEffect(() => {
                const el = carouselRef.current;
                if (!el) return;
                const handleScroll = () => {
                    const scrollLeft = el.scrollLeft;
                    const itemWidth = el.querySelector('.related-video-item')?.offsetWidth || 240;
                    const newIndex = Math.round(scrollLeft / (itemWidth + 16)) + 1;
                    if (newIndex !== relatedPage && newIndex >= 1 && newIndex <= totalRelatedPages) {
                        setRelatedPage(newIndex);
                    }
                };
                el.addEventListener('scroll', handleScroll);
                return () => el.removeEventListener('scroll', handleScroll);
            }, [relatedPage, totalRelatedPages]);

            // Handle download image (BR4)
            const handleDownloadImage = (imgSrc, e) => {
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = imgSrc;
                link.download = 'hinh-anh-bai-giang.jpg';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        {/* Tiêu đề màn hình */}
                        <h1 className="text-[24px] font-semibold text-[#212121] leading-tight mb-4">{article.title}</h1>

                        {/* Thông tin meta */}
                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium">{article.field || 'Pháp lý chung'}</span>
                            <span>Ngày đăng: <strong>{article.date}</strong></span>
                        </div>

                        {/* Video Player (BR3: fullscreen, pause/resume, volume, progress bar) */}
                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-6 relative">
                            <video
                                className="w-full h-full outline-none"
                                controls
                                poster={article.thumb}
                                playsInline
                                preload="metadata"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const parent = e.target.parentElement;
                                    const err = parent.querySelector('.video-error');
                                    if (err) err.style.display = 'flex';
                                }}
                            >
                                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm" type="video/webm" />
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                            <div className="video-error absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-white" style={{display: 'none'}}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                <p className="text-gray-300 text-sm">Không thể phát video. Vui lòng thử lại sau.</p>
                            </div>
                        </div>

                        {/* Tóm tắt (in nghiêng, đầy đủ) */}
                        <div className="mb-8">
                            <p className="text-[#616161] italic text-[16px] leading-relaxed">
                                {article.summary}
                            </p>
                        </div>

                        <hr className="border-t border-[#E0E0E0] my-8" />

                        {/* Nội dung chi tiết (HTML) - BR2 */}
                        <div className="mb-10">
                            <h3 className="text-[18px] font-bold text-[#1E88E5] mb-4 uppercase">Nội dung chi tiết</h3>
                            <article className="space-y-6 text-[15px] text-gray-600 leading-relaxed text-justify md:text-left">
                                {article.content ? (
                                    <HtmlContent html={article.content} />
                                ) : (
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-base">Phần 1: Khái quát quy định mới</h4>
                                        <p>Bài giảng tập trung làm rõ những điểm mới, quy trình mà doanh nghiệp cần cập nhật theo thông tư hiện hành.</p>
                                        <p>Theo quy định, thời gian giải quyết thủ tục được rút ngắn, nhưng yêu cầu về tính chính xác của hồ sơ cao hơn. Chi tiết tại khoản 2 Điều 15 Luật hiện hành.</p>
                                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Minh họa bài giảng" className="rounded shadow-sm max-w-full my-4" />
                                        <h4 className="font-bold text-base mt-6">Phần 2: Hướng dẫn thực hành</h4>
                                        <p>Chuyên gia sẽ hướng dẫn điền từng trường thông tin cụ thể trên biểu mẫu điện tử để tránh sai sót.</p>
                                    </div>
                                )}
                            </article>
                        </div>

                        {/* Bài giảng liên quan (SCR_DanhSachBaiGiangLienQuan) */}
                        {relatedVideos.length > 0 && (
                            <>
                                <hr className="border-t border-[#E0E0E0] my-8" />
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-[18px] font-bold text-[#212121]">Bài giảng liên quan</h3>
                                        {/* Nút điều hướng chỉ hiện khi > 4 videos (BR4) */}
                                        {relatedVideos.length > 4 && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={prevRelated}
                                                    disabled={relatedPage === 1}
                                                    className="w-8 h-8 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:bg-[#1E88E5] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Video trước"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                </button>
                                                <button
                                                    onClick={nextRelated}
                                                    disabled={relatedPage === totalRelatedPages}
                                                    className="w-8 h-8 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:bg-[#1E88E5] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Video tiếp theo"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Carousel Container (BR1: max 4 videos visible, BR5: scroll 1 video at a time) */}
                                    <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-proximity hide-scrollbar gap-4 pb-4 scroll-smooth" style={{cursor: 'grab'}} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                                        {relatedVideos.map((item, idx) => (
                                            <div
                                                key={item.id}
                                                className="related-video-item snap-start shrink-0 w-[calc(100%-16px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] relative group rounded-lg overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300 flex flex-col"
                                                onClick={() => navigateToDetail(item)}
                                            >
                                                {/* Ảnh đại diện 16:9 (BR6) */}
                                                <div className="w-full aspect-video bg-gray-200 relative overflow-hidden shrink-0">
                                                    <img src={item.thumb} alt={item.title} className="w-full h-full object-cover"/>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                                        <div className="w-10 h-10 rounded-full border-[2px] border-white/80 flex items-center justify-center text-white pl-1 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5V19L19 12L8 5Z" /></svg>
                                                        </div>
                                                    </div>
                                                    {item.duration && (
                                                        <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">{item.duration}</span>
                                                    )}
                                                </div>
                                                <div className="p-3 flex flex-col flex-1">
                                                    {/* Tiêu đề (BR7: click xem chi tiết) */}
                                                    <h3 className="text-[13px] font-bold text-[#212121] group-hover:text-[#1E88E5] line-clamp-2 leading-snug mb-2" title={item.title}>{item.title}</h3>
                                                    <div className="mt-auto flex items-center justify-between">
                                                        {/* Lĩnh vực (BR2: cùng lĩnh vực) */}
                                                        <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded truncate max-w-[60%]" title={item.field}>{item.field}</span>
                                                        {/* Ngày đăng */}
                                                        <span className="text-[11px] text-[#757575] shrink-0">{item.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Dot indicator */}
                                    {relatedVideos.length > 4 && totalRelatedPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-4">
                                            {[...Array(totalRelatedPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setRelatedPage(i + 1);
                                                        if (carouselRef.current) {
                                                            const itemWidth = carouselRef.current.querySelector('.related-video-item')?.offsetWidth || 240;
                                                            carouselRef.current.scrollTo({ left: i * (itemWidth + 16), behavior: 'smooth' });
                                                        }
                                                    }}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all ${relatedPage === i + 1 ? 'bg-[#1E88E5] w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                                                    title={`Trang ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            );
        }

        // ==========================================

        function LongformListPage({ menu, subPage, items, navigateToDetail }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(12);
            const [draftKeyword, setDraftKeyword] = useState('');
            const [keyword, setKeyword] = useState('');

            const sortedItems = useMemo(() => {
                return [...items].filter(item => item.type === 'longform').sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const filteredItems = sortedItems.filter(item => {
                if (!keyword) return true;
                const normalizedKeyword = keyword.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                const normalizedTitle = item.title.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                return normalizedTitle.includes(normalizedKeyword);
            });

            const featuredItems = filteredItems.slice(0, 5);
            const latestItem = featuredItems[0];
            const nextFourItems = featuredItems.slice(1, 5);
            const regularItems = filteredItems.slice(5);
            const regularTotalPages = Math.ceil(regularItems.length / itemsPerPage) || 1;
            const regularCurrentItems = regularItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setKeyword(draftKeyword); setCurrentPage(1); };
            const handleClear = () => { setDraftKeyword(''); setKeyword(''); setCurrentPage(1); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= regularTotalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">Danh sách Longform</h2>

                    {featuredItems.length > 0 && (
                        <div className="mb-10">
                            {/* Banner nổi bật: ảnh to làm nền, 4 ảnh nhỏ ở dưới */}
                            <div className="relative rounded-lg overflow-hidden" style={{ minHeight: '550px' }}>
                                {/* Ảnh to làm nền tràn */}
                                {latestItem && (
                                    <img src={latestItem.thumb} alt={latestItem.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                )}
                                {/* Overlay gradient - chỉ phủ phần trên, chừa phần dưới cho 4 ảnh nhỏ */}
                                <div className="absolute inset-x-0 top-0 bottom-[140px] bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                                {/* Nội dung bên trong */}
                                <div className="relative z-10 max-w-5xl mx-auto px-6 h-full">
                                    {/* Tiêu đề ảnh to */}
                                    {latestItem && (
                                        <div className="absolute top-6 left-6 right-6">
                                            <span className="bg-[#E3242B] text-white text-[11px] font-bold px-2.5 py-1 rounded inline-block mb-2">Mới nhất</span>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white line-clamp-2 drop-shadow-lg">{latestItem.title}</h3>
                                            <p className="text-sm text-white/80 mt-2">{latestItem.date}</p>
                                        </div>
                                    )}
                                    {/* Click lên ảnh to để xem chi tiết - chỉ phủ phần trên */}
                                    <div className="absolute inset-x-0 top-0 bottom-[130px] z-0 cursor-pointer" onClick={() => navigateToDetail(latestItem)}></div>
                                </div>
                                {/* 4 item nhỏ nằm sát mép dưới của banner */}
                                {nextFourItems.length > 0 && (
                                    <div className="absolute bottom-3 left-6 right-6 max-w-5xl mx-auto z-30">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {nextFourItems.map(item => (
                                            <div key={item.id} className="cursor-pointer group" onClick={(e) => { e.stopPropagation(); navigateToDetail(item); }}>
                                                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-white/20">
                                                    <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                                    <div className="absolute bottom-2 left-2 right-2">
                                                        <h4 className="text-[11px] md:text-[12px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#a0c4ff] transition-colors">{item.title}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input type="text" maxLength={100} placeholder="Nhập tiêu đề để tìm kiếm..." value={draftKeyword} onChange={(e) => setDraftKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition" />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {regularItems.length > 0 ? (
                        <>
                            <div className="space-y-4 mb-8">
                                {regularCurrentItems.map(item => (
                                    <div key={item.id} className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:border-[#1E88E5] hover:shadow-sm transition-all bg-white cursor-pointer" onClick={() => navigateToDetail(item)} title={item.title}>
                                        <div className="w-40 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 group">
                                            <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[15px] font-semibold text-[#1E88E5] hover:text-[#1976D2] transition-colors line-clamp-2 mb-1">{item.title}</h4>
                                            <p className="text-[13px] text-gray-500">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {regularTotalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-[14px] text-gray-600 font-medium">
                                            Hiển thị <strong className="text-[#212121]">{regularItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, regularItems.length)}</strong> của <strong className="text-[#212121]">{regularItems.length}</strong> {activeTab === 'infographic' ? 'infographic' : activeTab === 'photo' ? 'photo' : 'longform'}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(regularTotalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === regularTotalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === regularTotalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : keyword ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy {activeTab === 'infographic' ? 'infographic' : activeTab === 'photo' ? 'photo' : 'longform'} nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có {activeTab === 'infographic' ? 'infographic' : activeTab === 'photo' ? 'photo' : 'longform'} nào</p>
                        </div>
                    )}
                </section>
            );
        }

        function ProgramListPage({ menu, subPage, items, navigateToDetail, filterOptions, gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(12);
            const [draftKeyword, setDraftKeyword] = useState('');
            const [keyword, setKeyword] = useState('');
            const [selectedFilters, setSelectedFilters] = useState([]);
            const [isFilterOpen, setIsFilterOpen] = useState(false);
            const [filterSearchTerm, setFilterSearchTerm] = useState('');
            const filterRef = React.useRef(null);

            React.useEffect(() => {
                const handleClickOutside = (e) => {
                    if (filterRef.current && !filterRef.current.contains(e.target)) {
                        setIsFilterOpen(false);
                    }
                };
                if (isFilterOpen) {
                    document.addEventListener('mousedown', handleClickOutside);
                }
                return () => document.removeEventListener('mousedown', handleClickOutside);
            }, [isFilterOpen]);

            const fallbackThumbs = [
                'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=80',
            ];

            const getThumb = (item, index) => {
                if (item.thumb) return item.thumb;
                if (item.thumbnail) return item.thumbnail;
                return fallbackThumbs[index % fallbackThumbs.length];
            };

            const filterLabel = filterOptions?.label || '';
            const filterField = filterOptions?.field || '';
            const filterValues = filterOptions?.values || (filterField ? [...new Set(items.map(i => i[filterField]).filter(Boolean))] : []);
            const filteredFilterValues = filterValues.filter(v => v.toLowerCase().includes(filterSearchTerm.toLowerCase().trim()));

            const filteredItems = useMemo(() => {
                return [...items].filter(item => {
                    if (keyword) {
                        const normalizedKeyword = keyword.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                        const normalizedTitle = item.title.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                        if (!normalizedTitle.includes(normalizedKeyword)) return false;
                    }
                    if (selectedFilters.length > 0 && filterField) {
                        const itemValue = item[filterField] || '';
                        if (!selectedFilters.includes(itemValue)) return false;
                    }
                    return true;
                });
            }, [items, keyword, selectedFilters, filterField]);

            const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setKeyword(draftKeyword); setCurrentPage(1); };
            const handleClear = () => { setDraftKeyword(''); setKeyword(''); setSelectedFilters([]); setFilterSearchTerm(''); setCurrentPage(1); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            const toggleFilter = (value) => {
                setSelectedFilters(prev =>
                    prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
                );
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>

                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input type="text" maxLength={100} placeholder="Nhập tiêu đề để tìm kiếm..." value={draftKeyword} onChange={(e) => setDraftKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition" />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                {filterValues.length > 0 && (
                                    <div ref={filterRef} className="relative w-full sm:w-[220px]">
                                        <button onClick={() => { setIsFilterOpen(!isFilterOpen); setFilterSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition text-[14px]">
                                            <span className="truncate">{selectedFilters.length > 0 ? `Đã chọn: ${selectedFilters.length}` : `-- Chọn ${filterLabel} --`}</span>
                                            <span className="text-[10px] text-gray-400 ml-2">▼</span>
                                        </button>
                                        {isFilterOpen && (
                                            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-hidden flex flex-col">
                                                <div className="p-2 border-b border-gray-200">
                                                    <input type="text" placeholder="Tìm kiếm..." value={filterSearchTerm} onChange={(e) => setFilterSearchTerm(e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded text-[13px] focus:outline-none focus:border-[#2580f0]" />
                                                </div>
                                                <div className="overflow-y-auto flex-1">
                                                    {filteredFilterValues.map(val => (
                                                        <label key={val} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                                            <input type="checkbox" checked={selectedFilters.includes(val)} onChange={() => { toggleFilter(val); setCurrentPage(1); }} className="w-4 h-4 text-[#2580f0] border-gray-300 rounded focus:ring-[#2580f0]" />
                                                            <span className="text-[13px] text-gray-700">{val}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {currentItems.length > 0 ? (
                        <>
                            <div className={`grid ${gridCols} gap-4 mb-8`}>
                                {currentItems.map((item, index) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#1E88E5] hover:shadow-md transition-all bg-white cursor-pointer group" onClick={() => navigateToDetail(item)} title={item.title}>
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                                            <img src={getThumb(item, index)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = fallbackThumbs[index % fallbackThumbs.length]; }} />
                                            {item.field && filterLabel === 'Lĩnh vực' && (
                                                <span className="absolute top-2 left-2 text-[11px] px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded font-medium whitespace-nowrap">{item.field}</span>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-[14px] font-semibold text-[#1E88E5] group-hover:text-[#1976D2] transition-colors line-clamp-2 mb-1 min-h-[36px]">{item.title}</h4>
                                            {item.summary && <p className="text-[12px] text-gray-600 line-clamp-2 mb-1 min-h-[32px]">{item.summary}</p>}
                                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                                <p className="text-[12px] text-gray-500">{item.date}</p>
                                                {item.province && <span className="text-[11px] px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded font-medium whitespace-nowrap">{item.province}</span>}
                                                {item.field && filterLabel === 'Bộ, ngành' && <span className="text-[11px] px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded font-medium whitespace-nowrap">{item.field}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-[14px] text-gray-600 font-medium">
                                            Hiển thị <strong className="text-[#212121]">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> của <strong className="text-[#212121]">{filteredItems.length}</strong> bản ghi
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : keyword || selectedFilters.length > 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy tài liệu nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có tài liệu nào</p>
                        </div>
                    )}
                </section>
            );
        }

        function KeHoachDaoTaoListPage({ menu, subPage, items, navigateToDetail }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(12);
            const [draftKeyword, setDraftKeyword] = useState('');
            const [keyword, setKeyword] = useState('');

            const fallbackThumbs = [
                'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=80',
            ];

            const formatDateRange = (dateStr) => {
                if (!dateStr) return '';
                // Nếu đã có sẵn dấu gạch ngang (dải ngày), giữ nguyên
                if (dateStr.includes(' - ')) return dateStr;
                // Tách lấy tháng/năm từ ngày đơn
                const parts = dateStr.split('/');
                if (parts.length === 3) {
                    const day = parts[0];
                    const month = parts[1];
                    const year = parts[2];
                    // Tạo dải ngày: 01/MM/YYYY - 30/MM/YYYY (trong vòng 1 tháng)
                    return `01/${month}/${year} - 30/${month}/${year}`;
                }
                return dateStr;
            };

            const sortedItems = useMemo(() => {
                return [...items].sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const filteredItems = sortedItems.filter(item => {
                if (!keyword) return true;
                const normalizedKeyword = keyword.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                const normalizedTitle = item.title.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                return normalizedTitle.includes(normalizedKeyword);
            });

            const totalItems = filteredItems.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setKeyword(draftKeyword); setCurrentPage(1); };
            const handleClear = () => { setDraftKeyword(''); setKeyword(''); setCurrentPage(1); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            const getThumb = (item, index) => {
                if (item.thumb) return item.thumb;
                // Dùng index trong currentItems để tránh trùng lặp
                return fallbackThumbs[index % fallbackThumbs.length];
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">Kế hoạch đào tạo</h2>

                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input type="text" maxLength={100} placeholder="Nhập tiêu đề để tìm kiếm..." value={draftKeyword} onChange={(e) => setDraftKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition" />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {currentItems.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {currentItems.map((item, index) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#1E88E5] hover:shadow-md transition-all bg-white cursor-pointer group" onClick={() => navigateToDetail(item)} title={item.title}>
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                                            <img src={getThumb(item, index)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = fallbackThumbs[index % fallbackThumbs.length]; }} />
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-[14px] font-semibold text-[#1E88E5] group-hover:text-[#1976D2] transition-colors line-clamp-2 mb-1 min-h-[36px]">{item.title}</h4>
                                            <p className="text-[12px] text-gray-500 line-clamp-2 mb-1">{item.summary}</p>
                                            <p className="text-[12px] text-gray-500">{formatDateRange(item.date)}</p>
                                            {item.agency && <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">{item.agency}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-[14px] text-gray-600 font-medium">
                                            Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> bản ghi
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : keyword ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy kế hoạch đào tạo nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có kế hoạch đào tạo nào</p>
                        </div>
                    )}
                </section>
            );
        }

        function KhoaHocListPage({ menu, subPage, items, navigateToDetail }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(12);
            const [draftKeyword, setDraftKeyword] = useState('');
            const [keyword, setKeyword] = useState('');

            const fallbackThumbs = [
                'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=80',
            ];

            const formatDateRange = (dateStr) => {
                if (!dateStr) return '';
                if (dateStr.includes(' - ')) return dateStr;
                const parts = dateStr.split('/');
                if (parts.length === 3) {
                    const month = parts[1];
                    const year = parts[2];
                    return `01/${month}/${year} - 30/${month}/${year}`;
                }
                return dateStr;
            };

            const sortedItems = useMemo(() => {
                return [...items].sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const filteredItems = sortedItems.filter(item => {
                if (!keyword) return true;
                const normalizedKeyword = keyword.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                const normalizedTitle = item.title.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                return normalizedTitle.includes(normalizedKeyword);
            });

            const totalItems = filteredItems.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setKeyword(draftKeyword); setCurrentPage(1); };
            const handleClear = () => { setDraftKeyword(''); setKeyword(''); setCurrentPage(1); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            const getThumb = (item, index) => {
                if (item.thumb) return item.thumb;
                return fallbackThumbs[index % fallbackThumbs.length];
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">Khóa học</h2>

                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <div className="relative flex-1 w-full">
                                    <input type="text" maxLength={100} placeholder="Nhập tiêu đề để tìm kiếm..." value={draftKeyword} onChange={(e) => setDraftKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition" />
                                    <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {currentItems.length > 0 ? (
                        <>
                            <div className={`grid ${gridCols} gap-4 mb-8`}>
                                {currentItems.map((item, index) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#1E88E5] hover:shadow-md transition-all bg-white cursor-pointer group" onClick={() => navigateToDetail(item)} title={item.title}>
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                                            <img src={getThumb(item, index)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = fallbackThumbs[index % fallbackThumbs.length]; }} />
                                            {item.field && filterLabel === 'Lĩnh vực' && (
                                                <span className="absolute top-2 left-2 text-[11px] px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded font-medium whitespace-nowrap">{item.field}</span>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-[14px] font-semibold text-[#1E88E5] group-hover:text-[#1976D2] transition-colors line-clamp-2 mb-1 min-h-[36px]">{item.title}</h4>
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-[12px] text-gray-500">{formatDateRange(item.date)}</p>
                                                {item.soLuong && <p className="text-[12px] text-gray-500 shrink-0">SL: {item.soLuong}</p>}
                                            </div>
                                            {item.agency && <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">{item.agency}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-[14px] text-gray-600 font-medium">
                                            Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> bản ghi
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : keyword ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy khóa học nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có khóa học nào</p>
                        </div>
                    )}
                </section>
            );
        }

        function KeHoachDaoTaoDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            const formatDateRange = (dateStr) => {
                if (!dateStr) return 'Chưa xác định';
                return dateStr;
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.title}</h1>

                        {/* Thông tin kế hoạch đào tạo */}
                        <div className="bg-[#f8f9fc] border border-[#dbe5ff] rounded-lg p-5 mb-8">
                            <h3 className="text-[16px] font-bold text-[#1b2b49] mb-4 flex items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                Thông tin kế hoạch
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Thời gian</span>
                                    <span className="text-[14px] text-[#212121] font-medium">{formatDateRange(article.thoiGian)}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Ngân sách dự kiến</span>
                                    <span className="text-[14px] text-[#212121] font-medium">{article.nganSach || 'Đang cập nhật'}</span>
                                </div>
                                <div className="md:col-span-2 flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Nguồn lực</span>
                                    <span className="text-[14px] text-[#212121]">{article.nguonLuc || 'Đang cập nhật'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="text-[#757575]">Ngày đăng: <strong>{article.date}</strong></span>
                            {article.field && (
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium">{article.field}</span>
                            )}
                        </div>

                        {article.summary && (
                            <div className="mb-8">
                                <p className="text-[#616161] italic text-[16px] leading-relaxed">{article.summary}</p>
                            </div>
                        )}

                        {article.thumb && (
                            <div className="mb-8 relative group">
                                <div className="relative w-full overflow-hidden rounded-xl bg-gray-200" style={{paddingTop: '45%'}}>
                                    <img
                                        src={article.thumb}
                                        alt={article.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (document.fullscreenElement) {
                                                document.exitFullscreen();
                                            } else {
                                                e.target.requestFullscreen();
                                            }
                                        }}
                                        title="Nhấn để xem toàn màn hình"
                                    />
                                </div>
                            </div>
                        )}

                        <article className="space-y-6 text-[15px] text-gray-700 leading-relaxed text-justify md:text-left mb-10 prose prose-sm max-w-none">
                            {article.content ? (
                                <HtmlContent html={article.content} />
                            ) : (
                                <div className="space-y-4">
                                    <p className="font-medium">Nội dung chi tiết đang được cập nhật.</p>
                                </div>
                            )}
                        </article>

                        {article.attachments && article.attachments.length > 0 && (
                            <AttachmentList files={article.attachments} navigateToPreview={navigateToPreview} />
                        )}
                    </div>
                </section>
            );
        }

        function KhoaHocDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            const formatDateRange = (dateStr) => {
                if (!dateStr) return 'Chưa xác định';
                return dateStr;
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.title}</h1>

                        {/* Thông tin khóa học */}
                        <div className="bg-[#f8f9fc] border border-[#dbe5ff] rounded-lg p-5 mb-8">
                            <h3 className="text-[16px] font-bold text-[#1b2b49] mb-4 flex items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                                Thông tin khóa học
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Thời gian</span>
                                    <span className="text-[14px] text-[#212121] font-medium">{formatDateRange(article.thoiGian)}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Hình thức đào tạo</span>
                                    <span className="text-[14px] text-[#212121] font-medium">{article.hinhThuc || 'Đang cập nhật'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Địa điểm</span>
                                    <span className="text-[14px] text-[#212121]">{article.diaDiem || 'Đang cập nhật'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Số lượng mở đăng ký</span>
                                    <span className="text-[14px] text-[#212121] font-medium">{article.soLuong || 'Đang cập nhật'}</span>
                                </div>
                                <div className="md:col-span-2 flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Đối tượng tham gia</span>
                                    <span className="text-[14px] text-[#212121]">{article.doiTuong || 'Đang cập nhật'}</span>
                                </div>
                                <div className="md:col-span-2 flex flex-col gap-1">
                                    <span className="text-[13px] text-gray-500 font-medium">Chương trình đào tạo</span>
                                    <span className="text-[14px] text-[#212121] whitespace-pre-line">{article.chuongTrinh || 'Đang cập nhật'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="text-[#757575]">Ngày đăng: <strong>{article.date}</strong></span>
                            {article.field && (
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium">{article.field}</span>
                            )}
                        </div>

                        {article.summary && (
                            <div className="mb-8">
                                <p className="text-[#616161] italic text-[16px] leading-relaxed">{article.summary}</p>
                            </div>
                        )}

                        {article.thumb && (
                            <div className="mb-8 relative group">
                                <div className="relative w-full overflow-hidden rounded-xl bg-gray-200" style={{paddingTop: '45%'}}>
                                    <img
                                        src={article.thumb}
                                        alt={article.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (document.fullscreenElement) {
                                                document.exitFullscreen();
                                            } else {
                                                e.target.requestFullscreen();
                                            }
                                        }}
                                        title="Nhấn để xem toàn màn hình"
                                    />
                                </div>
                            </div>
                        )}

                        <article className="space-y-6 text-[15px] text-gray-700 leading-relaxed text-justify md:text-left mb-10 prose prose-sm max-w-none">
                            {article.content ? (
                                <HtmlContent html={article.content} />
                            ) : (
                                <div className="space-y-4">
                                    <p className="font-medium">Nội dung chi tiết đang được cập nhật.</p>
                                </div>
                            )}
                        </article>

                        {article.attachments && article.attachments.length > 0 && (
                            <AttachmentList files={article.attachments} navigateToPreview={navigateToPreview} />
                        )}
                    </div>
                </section>
            );
        }

        function HoiDapPhapLuatListPage({ menu, subPage, items, navigateToDetail, isLoggedIn, onRequireLogin, onLoginSuccess }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);
            const [draftSearch, setDraftSearch] = useState('');
            const [searchTerm, setSearchTerm] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [selectedFields, setSelectedFields] = useState([]);
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [expandedId, setExpandedId] = useState(null);
            const [showSendModal, setShowSendModal] = useState(false);
            const [showConfirmModal, setShowConfirmModal] = useState(false);
            const [formData, setFormData] = useState({
                fullName: '',
                email: '',
                phone: '',
                field: '',
                question: ''
            });
            const [formErrors, setFormErrors] = useState({});
            const [submitSuccess, setSubmitSuccess] = useState(false);

            const fieldDropdownOptions = [
                { value: '', label: '-- Chọn lĩnh vực --' },
                { value: 'Doanh nghiệp', label: 'Doanh nghiệp' },
                { value: 'Thuế', label: 'Thuế' },
                { value: 'Lao động', label: 'Lao động' },
                { value: 'Đầu tư', label: 'Đầu tư' },
                { value: 'Sở hữu trí tuệ', label: 'Sở hữu trí tuệ' },
                { value: 'Bảo hiểm', label: 'Bảo hiểm' },
                { value: 'Đất đai', label: 'Đất đai' },
                { value: 'Thương mại', label: 'Thương mại' },
                { value: 'Khác', label: 'Khác' }
            ];

            const allFields = useMemo(() => {
                const fields = [...new Set(items.map(item => item.field).filter(Boolean))].sort();
                return fields;
            }, [items]);

            const filteredFields = useMemo(() => {
                if (!fieldSearchTerm) return allFields;
                const normalizedSearch = fieldSearchTerm.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                return allFields.filter(f => f.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').includes(normalizedSearch));
            }, [allFields, fieldSearchTerm]);

            const sortedItems = useMemo(() => {
                return [...items].sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const filteredItems = sortedItems.filter(item => {
                let match = true;
                if (searchTerm) {
                    const normalizedKeyword = searchTerm.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const normalizedQuestion = item.question.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const normalizedAnswer = item.answer.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    match = match && (normalizedQuestion.includes(normalizedKeyword) || normalizedAnswer.includes(normalizedKeyword));
                }
                if (draftFields.length > 0) {
                    match = match && draftFields.includes(item.field);
                }
                return match;
            });

            const totalItems = filteredItems.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setSearchTerm(draftSearch); setSelectedFields(draftFields); setCurrentPage(1); setIsFieldOpen(false); };
            const handleClear = () => { setDraftSearch(''); setDraftFields([]); setFieldSearchTerm(''); setSearchTerm(''); setSelectedFields([]); setCurrentPage(1); setIsFieldOpen(false); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
            const toggleExpand = (id) => { setExpandedId(expandedId === id ? null : id); };

            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }));
                if (formErrors[name]) {
                    setFormErrors(prev => ({ ...prev, [name]: '' }));
                }
            };

            const validateForm = () => {
                const errors = {};
                if (!formData.fullName.trim()) errors.fullName = 'Họ tên không được để trống';
                if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    errors.email = 'Email không hợp lệ';
                }
                if (formData.phone.trim() && !/^[0-9]{10,11}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
                    errors.phone = 'Số điện thoại không hợp lệ';
                }
                if (!formData.question.trim()) errors.question = 'Câu hỏi không được để trống';
                return errors;
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                const errors = validateForm();
                if (Object.keys(errors).length > 0) {
                    setFormErrors(errors);
                    return;
                }
                setShowConfirmModal(true);
            };

            const handleConfirmSend = () => {
                console.log('Submitted:', formData);
                setSubmitSuccess(true);
                setShowConfirmModal(false);
                setTimeout(() => {
                    setShowSendModal(false);
                    setFormData({ fullName: '', email: '', phone: '', field: '', question: '' });
                    setSubmitSuccess(false);
                }, 2000);
            };

            const openSendModal = () => {
                if (!isLoggedIn) {
                    onRequireLogin();
                } else {
                    setFormData(prev => ({ ...prev, fullName: 'Người dùng đã đăng nhập' }));
                    setShowSendModal(true);
                }
            };
            const closeSendModal = () => {
                setShowSendModal(false);
                setFormData({ fullName: '', email: '', phone: '', field: '', question: '' });
                setFormErrors({});
                setSubmitSuccess(false);
            };

            // Auto-open send modal after login success
            useEffect(() => {
                if (isLoggedIn && window._pendingSendQuestion) {
                    window._pendingSendQuestion = false;
                    setFormData(prev => ({ ...prev, fullName: 'Người dùng đã đăng nhập' }));
                    setShowSendModal(true);
                }
            }, [isLoggedIn]);

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#dbe5ff]">
                        <h2 className="text-[28px] font-bold text-[#1b2b49]">Hỏi đáp pháp luật</h2>
                        <button onClick={openSendModal} className="px-5 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center gap-2 shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            Gửi câu hỏi
                        </button>
                    </div>

                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    maxLength={100}
                                    placeholder="Nhập câu hỏi, câu trả lời để tìm kiếm..."
                                    value={draftSearch}
                                    onChange={(e) => setDraftSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                />
                                <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>

                            <div className="relative w-full md:w-[250px]">
                                <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                    <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : '-- Chọn lĩnh vực --'}</span>
                                    <span className="text-[10px] text-gray-400">▼</span>
                                </button>
                                {isFieldOpen && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                        <div className="p-2 border-b border-gray-200">
                                            <div className="relative">
                                                <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                <input
                                                    type="text"
                                                    placeholder="Tìm lĩnh vực..."
                                                    value={fieldSearchTerm}
                                                    onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-auto max-h-48">
                                            {filteredFields.length > 0 ? filteredFields.map(f => (
                                                <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                        checked={draftFields.includes(f)}
                                                        onChange={() => {
                                                            if (draftFields.includes(f)) setDraftFields(draftFields.filter(item => item !== f));
                                                            else setDraftFields([...draftFields, f]);
                                                        }}
                                                    />
                                                    {f}
                                                </label>
                                            )) : (
                                                <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy lĩnh vực nào</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={handleSearch}
                                    className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex justify-center items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    Tìm kiếm
                                </button>

                                <button
                                    onClick={handleClear}
                                    className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>

                    {currentItems.length > 0 ? (
                        <>
                            <div className="space-y-4 mb-8">
                                {currentItems.map(item => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#2580f0] hover:shadow-sm transition">
                                        <div className="p-4 flex items-start gap-3 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={expandedId === item.id ? '#2580f0' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 transition-transform duration-200" style={{ transform: expandedId === item.id ? 'rotate(90deg)' : 'none' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            <div className="flex-1">
                                                <h4 className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition">{item.question}</h4>
                                                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field || 'Pháp luật chung'}</span>
                                                    <span>{item.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {expandedId === item.id && (
                                            <div className="px-4 pb-4 pl-9">
                                                {item.answer ? (
                                                    <div className="bg-[#f8f9fc] rounded-lg p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-sm font-semibold text-[#2580f0]">Trả lời:</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                                                    </div>
                                                ) : (
                                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                                                        Câu hỏi đang được xử lý, vui lòng đợi chuyên gia trả lời.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-[14px] text-gray-600 font-medium">
                                        Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> bản ghi
                                    </div>
                                    <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border border-gray-300 rounded-md px-3 py-1.5 text-[14px] focus:outline-none focus:border-[#2580f0] bg-white">
                                        <option value={10}>10/trang</option>
                                        <option value={20}>20/trang</option>
                                        <option value={50}>50/trang</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                        ))}
                                    </div>
                                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                </div>
                            </div>
                        </>
                    ) : searchTerm || draftFields.length > 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy hỏi đáp nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm with từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có hỏi đáp nào</p>
                        </div>
                    )}

                    {/* Modal Gửi câu hỏi */}
                    {showSendModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeSendModal}>
                            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold text-[#1b2b49]">Gửi câu hỏi pháp lý</h3>
                                        <button onClick={closeSendModal} className="text-gray-400 hover:text-gray-600">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    {submitSuccess ? (
                                        <div className="text-center py-12">
                                            <svg className="w-20 h-20 mx-auto mb-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <p className="text-xl font-semibold text-gray-800">Gửi câu hỏi thành công!</p>
                                            <p className="text-base text-gray-500 mt-3">Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                                                    <input type="text" name="fullName" value={formData.fullName} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed" />
                                                    <p className="mt-1 text-xs text-gray-500">Tự động điền theo tên tài khoản</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                                    {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
                                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="09xxxxxxxx" className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                                                    {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Lĩnh vực</label>
                                                    <select name="field" value={formData.field} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] bg-white">
                                                        {fieldDropdownOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Câu hỏi <span className="text-red-500">*</span></label>
                                                <textarea name="question" value={formData.question} onChange={handleInputChange} rows="6" maxLength={1000} placeholder="Nhập câu hỏi của bạn..." className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] resize-none ${formErrors.question ? 'border-red-500' : 'border-gray-300'}`} />
                                                <div className="flex justify-between mt-1">
                                                    {formErrors.question ? <p className="text-sm text-red-500">{formErrors.question}</p> : <span></span>}
                                                    <span className="text-xs text-gray-500">{formData.question.length}/1000</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-center gap-3 pt-2">
                                                <button type="submit" className="min-w-[120px] px-8 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm text-center">
                                                    Gửi câu hỏi
                                                </button>
                                                <button type="button" onClick={closeSendModal} className="min-w-[120px] px-8 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition text-center">
                                                    Hủy
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                {/* Popup Xác nhận gửi câu hỏi */}
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowConfirmModal(false)}>
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                            <div className="p-8">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e2e8f0] flex items-center justify-center">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1b2b49] mb-2">Xác nhận gửi câu hỏi</h3>
                                    <p className="text-gray-600">Bạn có chắc chắn muốn gửi câu hỏi này?</p>
                                </div>
                                <div className="flex justify-center gap-3">
                                    <button onClick={handleConfirmSend} className="min-w-[120px] px-8 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm text-center">
                                        Gửi câu hỏi
                                    </button>
                                    <button onClick={() => setShowConfirmModal(false)} className="min-w-[120px] px-8 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition text-center">
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </section>
            );
        }

        function TuVanChuyenSauListPage({ menu, subPage, items, navigateToDetail, isLoggedIn, onRequireLogin, onLoginSuccess }) {
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);
            const [draftSearch, setDraftSearch] = useState('');
            const [searchTerm, setSearchTerm] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [selectedFields, setSelectedFields] = useState([]);
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [showSendModal, setShowSendModal] = useState(false);
            const [showConfirmModal, setShowConfirmModal] = useState(false);
            const [formData, setFormData] = useState({
                fullName: '',
                email: '',
                phone: '',
                field: '',
                topic: ''
            });
            const [formErrors, setFormErrors] = useState({});
            const [submitSuccess, setSubmitSuccess] = useState(false);

            const fieldDropdownOptions = [
                { value: '', label: '-- Chọn lĩnh vực --' },
                { value: 'Doanh nghiệp', label: 'Doanh nghiệp' },
                { value: 'Thuế', label: 'Thuế' },
                { value: 'Lao động', label: 'Lao động' },
                { value: 'Thương mại', label: 'Thương mại' },
                { value: 'Sở hữu trí tuệ', label: 'Sở hữu trí tuệ' },
                { value: 'Đầu tư', label: 'Đầu tư' },
                { value: 'Bất động sản', label: 'Bất động sản' },
                { value: 'Tài chính - Chứng khoán', label: 'Tài chính - Chứng khoán' },
                { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
                { value: 'Môi trường', label: 'Môi trường' },
                { value: 'Khác', label: 'Khác' }
            ];

            const allFields = useMemo(() => {
                const fields = [...new Set(items.map(item => item.field).filter(Boolean))].sort();
                return fields;
            }, [items]);

            const filteredFields = useMemo(() => {
                if (!fieldSearchTerm) return allFields;
                const normalizedSearch = fieldSearchTerm.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                return allFields.filter(f => f.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').includes(normalizedSearch));
            }, [allFields, fieldSearchTerm]);

            const sortedItems = useMemo(() => {
                return [...items].sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const filteredItems = sortedItems.filter(item => {
                let match = true;
                if (searchTerm) {
                    const normalizedKeyword = searchTerm.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const normalizedTitle = item.title.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const normalizedContent = item.content.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    match = match && (normalizedTitle.includes(normalizedKeyword) || normalizedContent.includes(normalizedKeyword));
                }
                if (draftFields.length > 0) {
                    match = match && draftFields.includes(item.field);
                }
                return match;
            });

            const totalItems = filteredItems.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setSearchTerm(draftSearch); setSelectedFields(draftFields); setCurrentPage(1); setIsFieldOpen(false); };
            const handleClear = () => { setDraftSearch(''); setDraftFields([]); setFieldSearchTerm(''); setSearchTerm(''); setSelectedFields([]); setCurrentPage(1); setIsFieldOpen(false); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }));
                if (formErrors[name]) {
                    setFormErrors(prev => ({ ...prev, [name]: '' }));
                }
            };

            const validateForm = () => {
                const errors = {};
                if (!formData.fullName.trim()) errors.fullName = 'Họ tên không được để trống';
                if (!formData.email.trim()) {
                    errors.email = 'Email không được để trống';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    errors.email = 'Email không hợp lệ';
                }
                if (!formData.phone.trim()) {
                    errors.phone = 'Số điện thoại không được để trống';
                } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
                    errors.phone = 'Số điện thoại không hợp lệ';
                }
                if (!formData.topic.trim()) errors.topic = 'Chủ đề không được để trống';
                return errors;
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                const errors = validateForm();
                if (Object.keys(errors).length > 0) {
                    setFormErrors(errors);
                    return;
                }
                setShowConfirmModal(true);
            };

            const handleConfirmSend = () => {
                console.log('Submitted:', formData);
                setSubmitSuccess(true);
                setShowConfirmModal(false);
                setTimeout(() => {
                    setShowSendModal(false);
                    setFormData({ fullName: '', email: '', phone: '', field: '', topic: '' });
                    setSubmitSuccess(false);
                }, 2000);
            };

            const openSendModal = () => {
                if (!isLoggedIn) {
                    onRequireLogin();
                } else {
                    setFormData(prev => ({ ...prev, fullName: 'Người dùng đã đăng nhập' }));
                    setShowSendModal(true);
                }
            };
            const closeSendModal = () => {
                setShowSendModal(false);
                setFormData({ fullName: '', email: '', phone: '', field: '', topic: '' });
                setFormErrors({});
                setSubmitSuccess(false);
            };

            useEffect(() => {
                if (isLoggedIn && window._pendingSendQuestion) {
                    window._pendingSendQuestion = false;
                    setFormData(prev => ({ ...prev, fullName: 'Người dùng đã đăng nhập' }));
                    setShowSendModal(true);
                }
            }, [isLoggedIn]);

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#dbe5ff]">
                        <h2 className="text-[28px] font-bold text-[#1b2b49]">Tư vấn chuyên sâu</h2>
                        <button onClick={openSendModal} className="px-5 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center gap-2 shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            Gửi yêu cầu tư vấn
                        </button>
                    </div>

                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    maxLength={100}
                                    placeholder="Nhập tiêu đề để tìm kiếm..."
                                    value={draftSearch}
                                    onChange={(e) => setDraftSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                />
                                <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>

                            <div className="relative w-full md:w-[250px]">
                                <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                    <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : '-- Chọn lĩnh vực --'}</span>
                                    <span className="text-[10px] text-gray-400">▼</span>
                                </button>
                                {isFieldOpen && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                        <div className="p-2 border-b border-gray-200">
                                            <div className="relative">
                                                <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                <input
                                                    type="text"
                                                    placeholder="Tìm lĩnh vực..."
                                                    value={fieldSearchTerm}
                                                    onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-auto max-h-48">
                                            {filteredFields.length > 0 ? filteredFields.map(f => (
                                                <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                        checked={draftFields.includes(f)}
                                                        onChange={() => {
                                                            if (draftFields.includes(f)) setDraftFields(draftFields.filter(item => item !== f));
                                                            else setDraftFields([...draftFields, f]);
                                                        }}
                                                    />
                                                    {f}
                                                </label>
                                            )) : (
                                                <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy lĩnh vực nào</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={handleSearch}
                                    className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex justify-center items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    Tìm kiếm
                                </button>

                                <button
                                    onClick={handleClear}
                                    className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>

                    {currentItems.length > 0 ? (
                        <div className="space-y-4 mb-8">
                            {currentItems.map(item => (
                                <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#2580f0] hover:shadow-md transition bg-white group cursor-pointer" onClick={() => navigateToDetail(item)}>
                                    <div>
                                        <h3 className="text-[15px] font-bold text-[#212121] group-hover:text-[#1E88E5] line-clamp-2 leading-snug mb-1">{item.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-500 mb-2">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field}</span>
                                            <span>Chuyên gia: {item.advisor}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                        </div>
                                        <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : searchTerm || draftFields.length > 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy kết quả</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm with từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có dữ liệu</p>
                        </div>
                    )}

                    {currentItems.length > 0 && totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                            <div className="flex items-center gap-4">
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> bản ghi
                                </div>
                                <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border border-gray-300 rounded-md px-3 py-1.5 text-[14px] focus:outline-none focus:border-[#2580f0] bg-white">
                                    <option value={10}>10/trang</option>
                                    <option value={20}>20/trang</option>
                                    <option value={50}>50/trang</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}

                    {/* Modal Gửi yêu cầu tư vấn */}
                    {showSendModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeSendModal}>
                            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold text-[#1b2b49]">Gửi yêu cầu tư vấn</h3>
                                        <button onClick={closeSendModal} className="text-gray-400 hover:text-gray-600">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    {submitSuccess ? (
                                        <div className="text-center py-12">
                                            <svg className="w-20 h-20 mx-auto mb-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <p className="text-xl font-semibold text-gray-800">Gửi yêu cầu tư vấn thành công!</p>
                                            <p className="text-base text-gray-500 mt-3">Chúng tôi sẽ liên hệ with bạn trong thời gian sớm nhất.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                                                    <input type="text" name="fullName" value={formData.fullName} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed" />
                                                    <p className="mt-1 text-xs text-gray-500">Tự động điền theo tên tài khoản</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                                    {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="09xxxxxxxx" maxLength={11} className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                                                    {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Lĩnh vực</label>
                                                    <select name="field" value={formData.field} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] bg-white">
                                                        {fieldDropdownOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Yêu cầu tư vấn <span className="text-red-500">*</span></label>
                                                <textarea name="topic" value={formData.topic} onChange={handleInputChange} rows="6" maxLength={1000} placeholder="Mô tả chủ đề bạn cần tư vấn..." className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2580f0] resize-none ${formErrors.topic ? 'border-red-500' : 'border-gray-300'}`} />
                                                <div className="flex justify-between mt-1">
                                                    {formErrors.topic ? <p className="text-sm text-red-500">{formErrors.topic}</p> : <span></span>}
                                                    <span className="text-xs text-gray-500">{formData.topic.length}/1000</span>
                                                </div>
                                            </div>

                                            <div className="bg-[#f8f9fc] border border-[#d8e1f2] rounded-md p-4 mb-2">
                                                <p className="text-sm text-gray-600 italic">
                                                    <span className="font-medium text-[#1b2b49]">Lưu ý:</span> Đây là dịch vụ có tính phí. Chi phí tư vấn cụ thể sẽ được Chuyên gia thông báo và thỏa thuận với anh/chị trước khi chính thức tiến hành.
                                                </p>
                                            </div>

                                            <div className="flex justify-center gap-3 pt-2">
                                                <button type="submit" className="min-w-[120px] px-8 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm text-center">
                                                    Gửi yêu cầu
                                                </button>
                                                <button type="button" onClick={closeSendModal} className="min-w-[120px] px-8 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition text-center">
                                                    Hủy
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Popup Xác nhận gửi yêu cầu tư vấn */}
                    {showConfirmModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowConfirmModal(false)}>
                            <div className="bg-white rounded-lg shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e2e8f0] flex items-center justify-center">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1b2b49] mb-2">Xác nhận gửi yêu cầu</h3>
                                        <p className="text-gray-600">Đây là dịch vụ có tính phí. Bạn có chắc chắn muốn gửi yêu cầu tư vấn này?</p>
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <button onClick={handleConfirmSend} className="min-w-[120px] px-8 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm text-center">
                                            Gửi yêu cầu
                                        </button>
                                        <button onClick={() => setShowConfirmModal(false)} className="min-w-[120px] px-8 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition text-center">
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        function TuVanChuyenSauDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            const handleDownload = (file) => {
                if (file && file.url) {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Không thể tải file. Vui lòng thử lại.');
                }
            };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">
                        <a href="#" onClick={(e) => { e.preventDefault(); backToList(); }} className="hover:text-[#2580f0]">Trang chủ</a>
                        {' / '}{menu.label}{' / '}
                        <a href="#" onClick={(e) => { e.preventDefault(); backToList(); }} className="hover:text-[#2580f0]">{subPage.label}</a>
                        {' / '}{article.title}
                    </p>

                    <div className="mb-6">
                        <button
                            onClick={backToList}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition flex items-center gap-2 text-[14px]"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-8">{article.title}</h2>

                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                        <span className="text-[13px] font-medium px-3 py-1 rounded bg-[#e8f0fe] text-[#2580f0]">{article.field}</span>
                        <span className="text-[13px] text-gray-500">Chuyên gia: {article.advisor}</span>
                        <span className="text-[13px] text-gray-500 flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            {article.date}
                        </span>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-[18px] font-bold text-[#1b2b49] mb-4 flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            Nội dung tư vấn
                        </h3>
                        <div className="bg-[#f8f9fc] rounded-lg p-6">
                            <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{article.content}</p>
                        </div>
                    </div>

                    {article.advisorComment && (
                        <div className="mb-8">
                            <h3 className="text-[18px] font-bold text-[#1b2b49] mb-4 flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Kết quả tư vấn
                            </h3>
                            <div className="bg-[#f0f7ff] rounded-lg p-6">
                                <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{article.advisorComment}</p>
                            </div>
                        </div>
                    )}

                    {article.attachments && article.attachments.length > 0 && (
                        <div className="mt-8 border-t border-[#E0E0E0] pt-6">
                            <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {article.attachments.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden flex-1">
                                            <div className="shrink-0 scale-90 origin-center">
                                                {getFileIcon(file.name)}
                                            </div>
                                            <div className="flex flex-col overflow-hidden w-full">
                                                <p className="text-[#1E88E5] font-medium text-[14px] truncate cursor-pointer hover:underline" title={file.name} onClick={() => handleDownload(file)}>
                                                    {file.name}
                                                </p>
                                                <p className="text-gray-400 text-[12px] mt-0.5">{file.size || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDownload(file)} className="shrink-0 ml-2 p-2 text-[#2580f0] hover:bg-[#f8f9fc] rounded transition">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        function MangLuoiTuVanVienPage({ menu, subPage, data, navigateToDetail }) {
            const [activeTab, setActiveTab] = useState('advisors');
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(9);
            const [draftKeyword, setDraftKeyword] = useState('');
            const [keyword, setKeyword] = useState('');
            const [selectedAdvisor, setSelectedAdvisor] = useState(null);
            const [selectedOrg, setSelectedOrg] = useState(null);
            const [selectedFields, setSelectedFields] = useState([]);
            const [selectedProvinces, setSelectedProvinces] = useState([]);
            const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

            const allFields = useMemo(() => {
                const fields = ['Tất cả', ...[...new Set(data.advisors.map(a => a.field))].sort()];
                return fields;
            }, [data.advisors]);

            const allProvinces = useMemo(() => {
                const provinces = [...new Set(data.advisors.map(a => a.province).filter(Boolean))];
                return provinces.sort();
            }, [data.advisors]);

            const currentData = activeTab === 'advisors' ? data.advisors : data.organizations;

            const sortedItems = useMemo(() => {
                return [...currentData].sort((a, b) => b.id - a.id);
            }, [currentData]);

            const filteredItems = sortedItems.filter(item => {
                if (activeTab !== 'advisors') return true;
                let match = true;
                if (keyword) {
                    const normalizedKeyword = keyword.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const normalizedTitle = item.name.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    match = match && normalizedTitle.includes(normalizedKeyword);
                }
                if (selectedFields.length > 0 && !selectedFields.includes('Tất cả')) {
                    match = match && selectedFields.includes(item.field);
                }
                if (selectedProvinces.length > 0) {
                    match = match && selectedProvinces.includes(item.province);
                }
                return match;
            });

            const totalItems = filteredItems.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setKeyword(draftKeyword); setCurrentPage(1); };
            const handleClear = () => { setDraftKeyword(''); setKeyword(''); setSelectedFields([]); setSelectedProvinces([]); setCurrentPage(1); };
            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6">Mạng lưới tư vấn viên</h2>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-8">
                        <button
                            onClick={() => { setActiveTab('advisors'); setCurrentPage(1); setKeyword(''); setDraftKeyword(''); }}
                            className={`px-6 py-3 text-[15px] font-semibold border-b-2 transition-colors ${activeTab === 'advisors' ? 'border-[#2580f0] text-[#2580f0]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Tư vấn viên
                        </button>
                        <button
                            onClick={() => { setActiveTab('organizations'); setCurrentPage(1); setKeyword(''); setDraftKeyword(''); }}
                            className={`px-6 py-3 text-[15px] font-semibold border-b-2 transition-colors ${activeTab === 'organizations' ? 'border-[#2580f0] text-[#2580f0]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Tổ chức tư vấn
                        </button>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row gap-3 items-center">
                                    <div className="relative flex-1 w-full">
                                        <input type="text" maxLength={100} placeholder="Nhập tên tư vấn viên để tìm kiếm..." value={draftKeyword} onChange={(e) => setDraftKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition" />
                                        <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            Tìm kiếm
                                        </button>
                                        <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            Xóa
                                        </button>
                                        <button onClick={() => setShowAdvancedFilter(!showAdvancedFilter)} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                            {showAdvancedFilter ? 'Ẩn bộ lọc' : 'Bộ lọc'}
                                        </button>
                                    </div>
                                </div>
                                {/* Bộ lọc mở rộng */}
                                {showAdvancedFilter && (
                                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                                        <div className="relative">
                                            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white min-w-[160px]">
                                                <span className="text-[13px] text-gray-500">Lĩnh vực:</span>
                                                {selectedFields.length > 0 && <span className="bg-[#2580f0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{selectedFields.length}</span>}
                                            </div>
                                            <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {allFields.map(field => (
                                                    <label key={field} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                                        <input type="checkbox" checked={selectedFields.includes(field)} onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedFields([...selectedFields, field]);
                                                            } else {
                                                                setSelectedFields(selectedFields.filter(f => f !== field));
                                                            }
                                                        }} className="rounded border-gray-300 text-[#2580f0] focus:ring-[#2580f0]" />
                                                        <span className="text-[13px]">{field}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white min-w-[160px]">
                                                <span className="text-[13px] text-gray-500">Tỉnh/thành phố:</span>
                                                {selectedProvinces.length > 0 && <span className="bg-[#2580f0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{selectedProvinces.length}</span>}
                                            </div>
                                            <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {allProvinces.map(province => (
                                                    <label key={province} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                                        <input type="checkbox" checked={selectedProvinces.includes(province)} onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedProvinces([...selectedProvinces, province]);
                                                            } else {
                                                                setSelectedProvinces(selectedProvinces.filter(p => p !== province));
                                                            }
                                                        }} className="rounded border-gray-300 text-[#2580f0] focus:ring-[#2580f0]" />
                                                        <span className="text-[13px]">{province}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {currentItems.length > 0 ? (
                        <>
                            {activeTab === 'advisors' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {currentItems.map(item => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg bg-white hover:border-[#1E88E5] hover:shadow-md transition-all p-5 cursor-pointer" onClick={() => setSelectedAdvisor(item)}>
                                            <div className="flex items-start gap-4">
                                                <img src={item.avatar} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#e2e8f0] hover:shadow-lg transition-shadow" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.name) + '&background=2580f0&color=fff&size=128'; }} />
                                                <div className="flex-1 min-w-0">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setSelectedAdvisor(item); }} className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition-colors line-clamp-2">{item.name}</a>
                                                    <p className="text-[13px] text-[#2580f0] font-medium mt-1">{item.field}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                    <span>{item.phone || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                    <span className="line-clamp-1">{item.email || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    <span>{item.province || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {currentItems.map(item => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg bg-white hover:border-[#1E88E5] hover:shadow-md transition-all p-5 cursor-pointer" onClick={() => setSelectedOrg(item)}>
                                            <div className="flex items-start gap-4">
                                                <img src={item.logo} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#e2e8f0] hover:shadow-lg transition-shadow" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.name) + '&background=2580f0&color=fff&size=128'; }} />
                                                <div className="flex-1 min-w-0">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setSelectedOrg(item); }} className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition-colors line-clamp-2">{item.name}</a>
                                                    <p className="text-[13px] text-[#2580f0] font-medium mt-1">{item.field}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                    <span>{item.phone || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                    <span className="line-clamp-1">{item.email || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    <span>{item.province || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-[14px] text-gray-600 font-medium">
                                            Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> {activeTab === 'advisors' ? 'tư vấn viên' : 'tổ chức'}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : keyword ? (
                        <div className="text-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-[15px] font-medium">Không tìm thấy kết quả nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Chưa có dữ liệu</p>
                        </div>
                    )}

                    {/* Modal chi tiết tư vấn viên */}
                    {selectedAdvisor && (
                        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-16 px-4 bg-black/50 overflow-y-auto" onClick={() => setSelectedAdvisor(null)}>
                            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                                <div className="p-8">
                                    {/* Tiêu đề màn hình */}
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                                        <h2 className="text-[24px] font-bold text-[#1b2b49]">Chi tiết tư vấn viên</h2>
                                        <button onClick={() => setSelectedAdvisor(null)} className="text-gray-400 hover:text-gray-600 transition">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    {/* Thông tin tư vấn viên */}
                                    <div className="flex items-start gap-6 mb-8">
                                        <img src={selectedAdvisor.avatar} alt={selectedAdvisor.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#e2e8f0]" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedAdvisor.name) + '&background=2580f0&color=fff&size=256'; }} />
                                        <div className="flex-1 pt-4">
                                            <h3 className="text-2xl font-bold text-[#1b2b49] mb-1">{selectedAdvisor.name}</h3>
                                            <p className="text-[16px] text-[#2580f0] font-semibold">{selectedAdvisor.field}</p>
                                        </div>
                                    </div>

                                    {/* Chi tiết thông tin */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            <span className="font-medium">{selectedAdvisor.phone || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            {selectedAdvisor.email ? (
                                                <a href={`mailto:${selectedAdvisor.email}`} className="hover:text-[#2580f0] transition-colors">{selectedAdvisor.email}</a>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            <span>{selectedAdvisor.diaChiLamViec || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            <span>{selectedAdvisor.province || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                            <span>{selectedAdvisor.chucDanh || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                            <span>{selectedAdvisor.trinhDo || selectedAdvisor.degree}</span>
                                        </div>
                                    </div>

                                    {/* Các mục chi tiết */}
                                    <div className="space-y-5 mb-8">
                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                                Chứng chỉ bằng cấp
                                            </h4>
                                            <p className="text-[14px] text-gray-700">{selectedAdvisor.chungChiBangCap || selectedAdvisor.certificates}</p>
                                        </div>

                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                Kinh nghiệm
                                            </h4>
                                            <div className="text-[14px] text-gray-700 whitespace-pre-line">{selectedAdvisor.kinhNghiem || selectedAdvisor.experience}</div>
                                        </div>

                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                                Ghi chú
                                            </h4>
                                            <div className="text-[14px] text-gray-700" dangerouslySetInnerHTML={{ __html: selectedAdvisor.ghiChu || '-' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                        <button onClick={() => setSelectedAdvisor(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition">
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal chi tiết tổ chức tư vấn */}
                    {selectedOrg && (
                        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-16 px-4 bg-black/50 overflow-y-auto" onClick={() => setSelectedOrg(null)}>
                            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                                <div className="p-8">
                                    {/* Tiêu đề màn hình */}
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                                        <h2 className="text-[24px] font-bold text-[#1b2b49]">Chi tiết tổ chức tư vấn</h2>
                                        <button onClick={() => setSelectedOrg(null)} className="text-gray-400 hover:text-gray-600 transition">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    {/* Thông tin tổ chức */}
                                    <div className="flex items-start gap-6 mb-8">
                                        <img src={selectedOrg.logo} alt={selectedOrg.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#e2e8f0]" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedOrg.name) + '&background=2580f0&color=fff&size=256'; }} />
                                        <div className="flex-1 pt-4">
                                            <h3 className="text-2xl font-bold text-[#1b2b49] mb-1">{selectedOrg.name}</h3>
                                            <p className="text-[16px] text-[#2580f0] font-semibold">{selectedOrg.field}</p>
                                        </div>
                                    </div>

                                    {/* Chi tiết thông tin */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            <span className="font-medium">{selectedOrg.phone || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            {selectedOrg.email ? (
                                                <a href={`mailto:${selectedOrg.email}`} className="hover:text-[#2580f0] transition-colors">{selectedOrg.email}</a>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            <span>{selectedOrg.address || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[14px] text-gray-700">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            <span>{selectedOrg.province || '-'}</span>
                                        </div>
                                    </div>

                                    {/* Các mục chi tiết */}
                                    <div className="space-y-5 mb-8">
                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                Cá nhân thuộc tổ chức
                                            </h4>
                                            <div className="text-[14px] text-gray-700" dangerouslySetInnerHTML={{ __html: selectedOrg.caNhanThuocToChuc || '-' }}></div>
                                        </div>

                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                                Chứng chỉ bằng cấp
                                            </h4>
                                            <p className="text-[14px] text-gray-700">{selectedOrg.chungChiBangCap || '-'}</p>
                                        </div>

                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                Kinh nghiệm
                                            </h4>
                                            <div className="text-[14px] text-gray-700 whitespace-pre-line">{selectedOrg.kinhNghiem || '-'}</div>
                                        </div>

                                        <div className="bg-[#f8f9fc] rounded-lg p-5">
                                            <h4 className="text-[16px] font-bold text-[#1b2b49] mb-3 flex items-center gap-2">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                                Ghi chú
                                            </h4>
                                            <div className="text-[14px] text-gray-700" dangerouslySetInnerHTML={{ __html: selectedOrg.ghiChu || '-' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                        <button onClick={() => setSelectedOrg(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition">
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        function VuViecPhapLyDetailPage({ menu, subPage, article, backToList }) {
            if (!article) return null;

            const handleDownload = (file) => {
                if (file && file.url) {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Không thể tải file. Vui lòng thử lại.');
                }
            };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    {/* Breadcrumb */}
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">
                        <a href="#" onClick={(e) => { e.preventDefault(); backToList(); }} className="hover:text-[#2580f0]">Trang chủ</a>
                        {' / '}{menu.label}{' / '}
                        <a href="#" onClick={(e) => { e.preventDefault(); backToList(); }} className="hover:text-[#2580f0]">{subPage.label}</a>
                        {' / '}{article.title}
                    </p>

                    {/* Quay lại button */}
                    <div className="mb-6">
                        <button
                            onClick={backToList}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition flex items-center gap-2 text-[14px]"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-8">{article.title}</h2>

                    {/* Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                        <span className="text-[13px] font-medium px-3 py-1 rounded bg-[#e8f0fe] text-[#2580f0]">{article.field}</span>
                        <span className="text-[13px] text-gray-500 flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            {article.date}
                        </span>
                    </div>

                    {/* Nội dung vụ việc */}
                    <div className="mb-8">
                        <h3 className="text-[18px] font-bold text-[#1b2b49] mb-4 flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            Nội dung vụ việc
                        </h3>
                        <div className="bg-[#f8f9fc] rounded-lg p-6">
                            <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{article.summary}</p>
                        </div>
                    </div>

                    {/* Kết quả giải quyết */}
                    <div className="mb-8">
                        <h3 className="text-[18px] font-bold text-[#1b2b49] mb-4 flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            Kết quả giải quyết
                        </h3>
                        <div className="bg-[#f0f7ff] rounded-lg p-6">
                            <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {article.resolution || ''}
                                {article.resolution && article.outcome && '\n\n'}
                                {article.outcome || ''}
                            </p>
                        </div>
                    </div>

                    {/* File đính kèm - style like Contact page */}
                    {article.attachments && article.attachments.length > 0 && (
                        <div className="mt-8 border-t border-[#E0E0E0] pt-6">
                            <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {article.attachments.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden flex-1">
                                            <div className="shrink-0 scale-90 origin-center">
                                                {getFileIcon(file.name)}
                                            </div>
                                            <div className="flex flex-col overflow-hidden w-full">
                                                <p className="text-[#1E88E5] font-medium text-[14px] truncate cursor-pointer hover:underline" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <p className="text-gray-400 text-[12px] mt-0.5">
                                                    {file.size || `${(Math.random() * 4 + 0.5).toFixed(1)} MB`}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDownload(file); }}
                                            className="shrink-0 ml-3 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#1E88E5] transition"
                                            title="Tải xuống"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        function VuViecDienHinhListPage({ menu, subPage, items, navigateToDetail }) {
            const [draftSearch, setDraftSearch] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [searchTerm, setSearchTerm] = useState('');
            const [selectedFields, setSelectedFields] = useState([]);
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);

            const allFields = useMemo(() => {
                const fields = [...new Set(items.map(item => item.field).filter(Boolean))];
                return fields;
            }, [items]);

            const filteredFieldOpts = allFields.filter(f =>
                f.toLowerCase().includes(fieldSearchTerm.toLowerCase().trim())
            );

            const sortedItems = useMemo(() => {
                return [...items].sort((a, b) => {
                    const dateA = a.date ? a.date.split('/').reverse().join('') : '0';
                    const dateB = b.date ? b.date.split('/').reverse().join('') : '0';
                    return parseInt(dateB) - parseInt(dateA);
                });
            }, [items]);

            const filteredItems = sortedItems.filter(item => {
                let match = true;
                if (searchTerm) {
                    const normalizedKeyword = searchTerm.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const normalizedTitle = item.title.toString().trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    match = match && normalizedTitle.includes(normalizedKeyword);
                }
                if (selectedFields.length > 0) {
                    match = match && selectedFields.includes(item.field);
                }
                return match;
            });

            const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            const handleSearchClick = () => {
                setSearchTerm(draftSearch);
                setSelectedFields(draftFields);
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const handleClearFilters = () => {
                setDraftSearch('');
                setDraftFields([]);
                setFieldSearchTerm('');
                setSearchTerm('');
                setSelectedFields([]);
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const toggleField = (field) => {
                setDraftFields(prev =>
                    prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
                );
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>

                    {/* Filters Section */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    maxLength={100}
                                    placeholder="Nhập tiêu đề vụ việc để tìm kiếm..."
                                    value={draftSearch}
                                    onChange={(e) => setDraftSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                />
                                <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>

                            <div className="relative w-full md:w-[250px]">
                                <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                    <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : `-- Chọn lĩnh vực --`}</span>
                                    <span className="text-[10px] text-gray-400">▼</span>
                                </button>
                                {isFieldOpen && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                        <div className="p-2 border-b border-gray-200">
                                            <div className="relative">
                                                <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                <input
                                                    type="text"
                                                    placeholder="Tìm lĩnh vực..."
                                                    value={fieldSearchTerm}
                                                    onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-auto max-h-48">
                                            {filteredFieldOpts.length > 0 ? filteredFieldOpts.map(f => (
                                                <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                        checked={draftFields.includes(f)}
                                                        onChange={() => toggleField(f)}
                                                    />
                                                    {f}
                                                </label>
                                            )) : (
                                                <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy lĩnh vực nào</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={handleSearchClick}
                                    className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex justify-center items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    Tìm kiếm
                                </button>

                                <button
                                    onClick={handleClearFilters}
                                    className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {currentItems.length > 0 ? (
                        <>
                            {/* Card-style List Items */}
                            <div className="space-y-4 mb-8">
                                {currentItems.map(item => (
                                    <div
                                        key={item.id}
                                        className="group flex flex-col sm:flex-row items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#2580f0] hover:shadow-md transition bg-white cursor-pointer"
                                        onClick={() => navigateToDetail(item)}
                                    >
                                        <div className="shrink-0 w-12 h-12 rounded-full bg-[#e8f0fe] flex items-center justify-center">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[16px] font-bold text-[#1b2b49] group-hover:text-[#2580f0] mb-2 leading-snug">{item.title}</h3>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-[#e2e8f0] text-[#475569] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide">{item.field}</span>
                                                <span className="text-[13px] text-[#8e98b0] font-medium">{item.date}</span>
                                            </div>
                                            <p className="text-[14px] text-[#4c566a] line-clamp-2 leading-relaxed">{item.summary}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-[14px] text-gray-600 font-medium">
                                            <span>Hiển thị:</span>
                                            <select
                                                value={itemsPerPage}
                                                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                                className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-[#2580f0]"
                                            >
                                                <option value={10}>10 bản ghi</option>
                                                <option value={20}>20 bản ghi</option>
                                                <option value={50}>50 bản ghi</option>
                                            </select>
                                        </div>
                                        <div className="text-[14px] text-gray-600 font-medium">
                                            Hiển thị <strong className="text-[#212121]">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> của <strong className="text-[#212121]">{filteredItems.length}</strong> bản ghi
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : searchTerm || selectedFields.length > 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                            <p className="text-[15px] font-medium">Không tìm thấy kết quả nào</p>
                            <p className="text-[13px] mt-1">Thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                            <p className="text-[15px] font-medium">Chưa có dữ liệu</p>
                        </div>
                    )}
                </section>
            );
        }

        function LongformDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;
            const contentRef = useRef(null);

            const handleDownload = (fileName) => { alert(`Đang tải file ${fileName} xuống...`); };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            // Attach download overlay to images after render
            useEffect(() => {
                if (!contentRef.current) return;
                const images = contentRef.current.querySelectorAll('img');
                images.forEach(img => {
                    // Skip if already wrapped
                    if (img.closest('.img-hover-wrapper')) return;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'img-hover-wrapper';
                    wrapper.style.cssText = 'position: relative; display: inline-block;';

                    img.style.cssText = 'max-width: 100%; height: auto; border-radius: 4px; display: block; margin: 16px 0; cursor: pointer;';
                    img.parentElement?.insertBefore(wrapper, img);
                    wrapper.appendChild(img);

                    // Click to fullscreen
                    img.onclick = (e) => {
                        e.stopPropagation();
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                        } else {
                            img.requestFullscreen();
                        }
                    };
                    img.title = 'Nhấn để xem toàn màn hình';

                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:absolute;top:8px;right:8px;opacity:0;transition:opacity 0.2s;';
                    const btn = document.createElement('button');
                    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="display:inline;vertical-align:middle;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Tải xuống';
                    btn.style.cssText = 'background:rgba(255,255,255,0.95);color:#1b2b49;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,0.15);white-space:nowrap;';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = 'hinh-anh.jpg';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    };
                    overlay.appendChild(btn);
                    wrapper.appendChild(overlay);

                    wrapper.onmouseenter = () => { overlay.style.opacity = '1'; };
                    wrapper.onmouseleave = () => { overlay.style.opacity = '0'; };
                });
            }, [article.content]);

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center justify-between">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                        {article.attachments && article.attachments.length > 0 && (
                            <button onClick={() => handleDownload(article.attachments[0].name)} className="flex items-center gap-2 bg-[#1E88E5] text-white px-4 py-2 rounded-md font-medium text-[14px] hover:bg-[#1976D2] transition shadow-sm" title="Tải xuống">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Tải xuống
                            </button>
                        )}
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.title}</h1>

                        {article.thumb && (
                            <div className="mb-6 relative group rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
                                <img src={article.thumb} alt={article.title} className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer" onClick={(e) => { if (document.fullscreenElement) document.exitFullscreen(); else e.target.requestFullscreen(); }} title="Nhấn để xem toàn màn hình" />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const link = document.createElement('a');
                                        link.href = article.thumb;
                                        link.download = 'anh-dai-dien.jpg';
                                        link.target = '_blank';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-[#1b2b49] px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-white flex items-center gap-2"
                                    title="Tải ảnh xuống"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    Tải xuống
                                </button>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="text-[#757575]">Ngày đăng: <strong>{article.date}</strong></span>
                        </div>

                        {article.summary && (
                            <div className="mb-8">
                                <p className="text-[#616161] italic text-[16px] leading-relaxed">{article.summary}</p>
                            </div>
                        )}

                        {article.content && (
                            <div className="mb-8">
                                <h3 className="text-[16px] font-bold text-[#212121] mb-4 uppercase border-b border-gray-200 pb-2">Nội dung</h3>
                                <div ref={contentRef} className="text-[#212121] text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
                            </div>
                        )}

                        {article.attachments && article.attachments.length > 0 && (
                            <div className="border-t border-[#E0E0E0] pt-6">
                                <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">File đính kèm</h4>
                                <div className="space-y-3">
                                    {article.attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-[#1E88E5] transition bg-white">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{getFileIcon(file.name)}</span>
                                                <div>
                                                    <p className="text-[#1E88E5] cursor-pointer hover:underline font-medium text-[14px]" onClick={() => navigateToPreview && navigateToPreview(file)} title="Click để xem trước">{file.name}</p>
                                                    {file.size && <p className="text-[12px] text-gray-500 mt-0.5">{file.size}</p>}
                                                </div>
                                            </div>
                                            <button onClick={() => handleDownload(file.name)} className="flex items-center gap-1 text-white bg-[#2580f0] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#1e63dc] transition shadow-sm" title="Tải xuống">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                Tải xuống
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        // ==========================================

        // Custom HTML renderer with download button on images
        const HtmlContent = ({ html }) => {
            const containerRef = useRef(null);

            useEffect(() => {
                if (containerRef.current) {
                    const images = containerRef.current.querySelectorAll('img');
                    images.forEach(img => {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'relative group inline-block';
                        wrapper.style.cssText = 'position: relative; display: inline-block;';

                        img.style.cssText = 'max-width: 100%; height: auto; border-radius: 4px; display: block; margin: 16px 0; cursor: pointer;';
                        img.parentElement?.insertBefore(wrapper, img);
                        wrapper.appendChild(img);

                        // Click to fullscreen
                        img.onclick = (e) => {
                            e.stopPropagation();
                            if (document.fullscreenElement) {
                                document.exitFullscreen();
                            } else {
                                img.requestFullscreen();
                            }
                        };
                        img.title = 'Nhấn để xem toàn màn hình';

                        const downloadBtn = document.createElement('button');
                        downloadBtn.className = 'absolute top-2 right-2 bg-white/95 text-[#1b2b49] px-4 py-2 rounded-md text-sm shadow-md transition-opacity flex items-center gap-2 hover:bg-white z-10';
                        downloadBtn.style.opacity = '0';
                        downloadBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Tải xuống';
                        wrapper.onmouseenter = () => { downloadBtn.style.opacity = '1'; };
                        wrapper.onmouseleave = () => { downloadBtn.style.opacity = '0'; };
                        downloadBtn.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const link = document.createElement('a');
                            link.href = img.src;
                            link.download = 'hinh-anh.jpg';
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        };
                        wrapper.appendChild(downloadBtn);
                    });
                }
            }, [html]);

            return <div ref={containerRef} dangerouslySetInnerHTML={{__html: html}}></div>;
        };

        function NewsDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        {/* Tiêu đề bài viết */}
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.title}</h1>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="text-[#757575]">Ngày đăng: <strong>{article.date}</strong></span>
                            {article.field && (
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium">{article.field}</span>
                            )}
                        </div>

                        {/* Tóm tắt - in nghiêng, hiển thị trước ảnh */}
                        {article.summary && (
                            <div className="mb-8">
                                <p className="text-[#616161] italic text-[16px] leading-relaxed">
                                    {article.summary}
                                </p>
                            </div>
                        )}

                        {/* Thumbnail */}
                        {article.thumb && (
                            <div className="mb-8 relative group">
                                <div className="relative w-full overflow-hidden rounded-xl bg-gray-200" style={{paddingTop: '45%'}}>
                                    <img
                                        src={article.thumb}
                                        alt={article.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (document.fullscreenElement) {
                                                document.exitFullscreen();
                                            } else {
                                                e.target.requestFullscreen();
                                            }
                                        }}
                                        title="Nhấn để xem toàn màn hình"
                                    />
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const link = document.createElement('a');
                                        link.href = article.thumb;
                                        link.download = 'image.jpg';
                                        link.target = '_blank';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="absolute top-4 right-4 bg-white/95 text-[#1b2b49] px-4 py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 hover:bg-white shadow-md z-10"
                                    title="Tải ảnh xuống"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    Tải xuống
                                </button>
                            </div>
                        )}

                        {/* Nội dung bài viết */}
                        <article className="space-y-6 text-[15px] text-gray-700 leading-relaxed text-justify md:text-left mb-10 prose prose-sm max-w-none">
                            {article.content ? (
                                <HtmlContent html={article.content} />
                            ) : (
                                <div className="space-y-4">
                                    <p className="font-medium">{article.description || "Nội dung chi tiết đang được cập nhật."}</p>
                                    <p>Đây là bài viết thuộc lĩnh vực <strong>{article.field || 'Tổng hợp'}</strong>, được đăng tải vào ngày <strong>{article.date}</strong>. Nội dung chi tiết sẽ sớm được bổ sung để cung cấp thông tin đầy đủ nhất cho bạn đọc.</p>
                                    <p>Trong thời gian chờ đợi, quý độc giả có thể tham khảo các bài viết liên quan trong cùng chuyên mục hoặc liên hệ đường dây nóng hỗ trợ để được giải đáp trực tiếp các vướng mắc pháp lý.</p>
                                </div>
                            )}
                        </article>

                        {/* File đính kèm */}
                        {article.attachments && article.attachments.length > 0 && (
                            <AttachmentList files={article.attachments} navigateToPreview={navigateToPreview} />
                        )}
                    </div>
                </section>
            );
        }

        function TaiLieuHTPLDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            const getFileIcon = (fileName) => {
                if (!fileName) return { icon: '📄', color: 'bg-gray-100 text-gray-600', label: 'File' };
                const ext = fileName.split('.').pop().toLowerCase();
                if (ext === 'pdf') return { icon: '📄', color: 'bg-red-100 text-red-600', label: 'PDF' };
                if (['doc', 'docx'].includes(ext)) return { icon: '📝', color: 'bg-blue-100 text-blue-600', label: 'Word' };
                if (['xls', 'xlsx'].includes(ext)) return { icon: '📊', color: 'bg-green-100 text-green-600', label: 'Excel' };
                return { icon: '📄', color: 'bg-gray-100 text-gray-600', label: 'File' };
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-6 px-4 md:px-8">
                        <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-6">{article.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="text-[#757575]">Ngày cập nhật: <strong>{article.date}</strong></span>
                        </div>

                        {article.summary && (
                            <div className="mb-8">
                                <p className="text-[#616161] italic text-[16px] leading-relaxed">
                                    {article.summary}
                                </p>
                            </div>
                        )}

                        {/* Thumbnail */}
                        {article.thumb && (
                            <div className="mb-8 relative group">
                                <div className="relative w-full overflow-hidden rounded-xl bg-gray-200" style={{paddingTop: '45%'}}>
                                    <img
                                        src={article.thumb}
                                        alt={article.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (document.fullscreenElement) {
                                                document.exitFullscreen();
                                            } else {
                                                e.target.requestFullscreen();
                                            }
                                        }}
                                        title="Nhấn để xem toàn màn hình"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Nội dung tài liệu */}
                        <article className="space-y-6 text-[15px] text-gray-700 leading-relaxed text-justify md:text-left mb-10 prose prose-sm max-w-none">
                            {article.content ? (
                                <HtmlContent html={article.content} />
                            ) : (
                                <div className="space-y-4">
                                    <p className="font-medium">{article.description || "Nội dung chi tiết đang được cập nhật."}</p>
                                </div>
                            )}
                        </article>

                        {/* File đính kèm */}
                        {article.attachments && article.attachments.length > 0 && (
                            <div className="border-t border-[#E0E0E0] pt-6">
                                <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {article.attachments.map((file, idx) => {
                                        const fileTypeInfo = getFileIcon(file.name);
                                        return (
                                            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                    <div className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded ${fileTypeInfo.color}`}>{fileTypeInfo.label}</div>
                                                    <div className="flex flex-col overflow-hidden w-full">
                                                        <p
                                                            onClick={() => navigateToPreview(file)}
                                                            className="text-[#1E88E5] font-medium text-[14px] truncate cursor-pointer hover:underline"
                                                            title={file.name}
                                                        >
                                                            {file.name}
                                                        </p>
                                                        <p className="text-gray-400 text-[12px] mt-0.5">
                                                            {file.size || `${(Math.random() * 4 + 0.5).toFixed(1)} MB`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(`Đang tải file ${file.name} xuống...`);
                                                    }}
                                                    className="shrink-0 ml-3 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#1E88E5] transition"
                                                    title="Tải xuống"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        function CategoryDetailPage({ menu, subPage, article, backToList, navigateToPreview }) {
            if (!article) return null;

            const getFileIcon = (fileName) => {
                if (!fileName) return '📄';
                const ext = fileName.split('.').pop().toLowerCase();
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            return (
                <section className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden pb-10">
                    <div className="px-6 py-4 border-b border-[#E0E0E0] bg-white flex items-center gap-2">
                        <button onClick={backToList} className="text-[#616161] hover:text-[#1E88E5] font-medium flex items-center gap-1 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="max-w-4xl mx-auto mt-6 px-4 md:px-8">
                        <h1 className="text-[24px] font-semibold text-[#212121] leading-tight mb-4">{article.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-[#757575] text-[14px] mb-6">
                            <span className="text-[#757575]">Ngày cập nhật: <strong>{article.date}</strong></span>
                        </div>

                        {article.thumb && (
                            <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6 relative group">
                                <img src={article.thumb} alt={article.title} className="w-full h-full object-cover cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (document.fullscreenElement) {
                                            document.exitFullscreen();
                                        } else {
                                            e.target.requestFullscreen();
                                        }
                                    }}
                                    title="Nhấn để xem toàn màn hình"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const link = document.createElement('a');
                                        link.href = article.thumb;
                                        link.download = 'image.jpg';
                                        link.target = '_blank';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                    className="absolute top-4 right-4 bg-white/95 text-[#1b2b49] px-4 py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 hover:bg-white shadow-md z-10"
                                    title="Tải ảnh xuống"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    Tải xuống
                                </button>
                            </div>
                        )}

                        <div className="mb-10">
                            <div className="text-[#212121] leading-relaxed">
                                {article.content ? (
                                    <HtmlContent html={article.content} />
                                ) : (
                                    <div className="space-y-4">
                                        <p>{article.description || article.summary || "Nội dung đang được cập nhật."}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* File đính kèm - Format giống màn Liên hệ */}
                        {article.attachments && article.attachments.length > 0 && (
                            <div className="border-t border-[#E0E0E0] pt-6">
                                <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                                <div className="space-y-3">
                                    {article.attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                            <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                <div className="shrink-0 text-2xl">{getFileIcon(file.name)}</div>
                                                <div className="flex flex-col overflow-hidden w-full">
                                                    <p
                                                        onClick={() => navigateToPreview(file)}
                                                        className="text-[#1E88E5] font-medium text-[14px] truncate cursor-pointer hover:underline"
                                                        title={file.name}
                                                    >
                                                        {file.name}
                                                    </p>
                                                    <p className="text-gray-400 text-[12px] mt-0.5">
                                                        {file.size || `${(Math.random() * 4 + 0.5).toFixed(1)} MB`}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert(`Đang tải file ${file.name} xuống...`);
                                                }}
                                                className="shrink-0 ml-3 flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#1E88E5] transition"
                                                title="Tải xuống"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        // ==========================================

        function NewsListPage({ menu, subPage, items, navigateToDetail, filterType = "field", listCols = 1 }) {
            const [draftSearch, setDraftSearch] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [searchTerm, setSearchTerm] = useState('');
            const [selectedFields, setSelectedFields] = useState([]);
            
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage, setItemsPerPage] = useState(10);

            // Cấu hình linh hoạt bộ lọc dựa theo prop filterType
            let filterOptions = [];
            let filterLabel = "";
            let filterProp = "";

            if (filterType === "field") {
                filterOptions = [...new Set(items.map(i => i.field).filter(Boolean))];
                filterLabel = "lĩnh vực";
                filterProp = "field";
            } else if (filterType === "agency") {
                filterOptions = [...new Set(items.map(i => i.agency).filter(Boolean))];
                filterLabel = "bộ, ngành";
                filterProp = "agency";
            } else if (filterType === "province") {
                filterOptions = [...new Set(items.map(i => i.province).filter(Boolean))];
                filterLabel = "tỉnh/thành phố";
                filterProp = "province";
            }

            // Lọc options theo search term trong dropdown
            const filteredFields = filterOptions.filter(f =>
                f.toLowerCase().includes(fieldSearchTerm.toLowerCase().trim())
            );

            const filteredItems = items.filter(item => {
                const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchFilter = selectedFields.length > 0 ? selectedFields.includes(item[filterProp]) : true;
                return matchSearch && matchFilter;
            });
            
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }
            };
            
            const handleSearchClick = () => {
                setSearchTerm(draftSearch);
                setSelectedFields(draftFields);
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            const handleClearFilters = () => {
                setDraftSearch('');
                setDraftFields([]);
                setFieldSearchTerm('');
                setSearchTerm('');
                setSelectedFields([]);
                setCurrentPage(1);
                setIsFieldOpen(false);
            };

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>
                    <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6 pb-4 border-b border-[#dbe5ff]">{subPage.label}</h2>
                    
                    {/* Filters Section */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm thông tin..."
                                    value={draftSearch}
                                    onChange={(e) => setDraftSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm transition"
                                />
                                <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>

                            {filterType !== "none" && (
                                <div className="relative w-full md:w-[250px]">
                                    <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-gray-700 focus:outline-none focus:border-[#2580f0] shadow-sm transition">
                                        <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} ${filterLabel}` : `-- Chọn ${filterLabel} --`}</span>
                                        <span className="text-[10px] text-gray-400">▼</span>
                                    </button>
                                    {isFieldOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden flex flex-col">
                                            <div className="p-2 border-b border-gray-200">
                                                <div className="relative">
                                                    <svg className="absolute left-2 top-2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                    <input
                                                        type="text"
                                                        placeholder={`Tìm ${filterLabel}...`}
                                                        value={fieldSearchTerm}
                                                        onChange={(e) => setFieldSearchTerm(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="overflow-auto max-h-48">
                                                {filteredFields.length > 0 ? filteredFields.map(f => (
                                                    <label key={f} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2 w-4 h-4 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]"
                                                            checked={draftFields.includes(f)}
                                                            onChange={() => {
                                                                if (draftFields.includes(f)) setDraftFields(draftFields.filter(item => item !== f));
                                                                else setDraftFields([...draftFields, f]);
                                                            }}
                                                        />
                                                        {f}
                                                    </label>
                                                )) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">Không tìm thấy {filterLabel} nào</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={handleSearchClick}
                                    className="flex-1 md:flex-none px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex justify-center items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    Tìm kiếm
                                </button>

                                <button
                                    onClick={handleClearFilters}
                                    className="flex-1 md:flex-none px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={listCols === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" : "space-y-6 mb-8"}>
                        {currentItems.length > 0 ? currentItems.map(item => {
                            const tagText = item.field || item.agency || item.province;
                            return (
                                <div key={item.id} className="group flex flex-col sm:flex-row items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#2580f0] hover:shadow-sm transition bg-white cursor-pointer" onClick={() => navigateToDetail(item)}>
                                    <div className="w-full sm:w-32 h-20 shrink-0 rounded overflow-hidden relative shadow-sm">
                                        <img src={item.thumb || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[14px] font-bold text-[#1b2b49] group-hover:text-[#2580f0] mb-1 leading-snug">{item.title}</h3>
                                        <div className="flex items-center gap-2 mb-1">
                                            {tagText && <span className="bg-[#e2e8f0] text-[#475569] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">{tagText}</span>}
                                            <p className="text-[11px] text-[#8e98b0] font-medium">{item.date}</p>
                                        </div>
                                        <p className="text-[13px] text-[#4c566a] line-clamp-2 leading-relaxed">{item.summary}</p>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
                                <p>Không tìm thấy nội dung nào phù hợp.</p>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[14px] text-gray-600 font-medium">
                                    <span>Hiển thị:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                        className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-[#2580f0]"
                                    >
                                        <option value={10}>10 bản ghi</option>
                                        <option value={20}>20 bản ghi</option>
                                        <option value={50}>50 bản ghi</option>
                                    </select>
                                </div>
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredItems.length)}</strong> của <strong className="text-[#212121]">{filteredItems.length}</strong> bản ghi
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        // ==========================================

        function DocumentPreviewPage({ file, onBack }) {
            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-4 shadow-sm flex flex-col h-[calc(100vh-160px)] min-h-[800px]">
                    <div className="flex items-center justify-between mb-4 border-b pb-4">
                        <button onClick={onBack} className="shrink-0 flex items-center gap-2 text-[#2580f0] hover:text-[#1b2b49] font-medium transition">
                            <span className="text-[20px] font-bold">←</span> Quay lại trang trước
                        </button>
                        <h2 className="text-[18px] font-bold text-[#1b2b49] truncate px-4 flex-1 text-center">
                            Trình xem tài liệu: {file.fileName || file.name}
                        </h2>
                        <button className="shrink-0 flex items-center gap-2 bg-[#2580f0] hover:bg-[#1e63dc] text-white px-5 py-2 rounded shadow-sm font-medium transition">
                            <span className="font-bold">↓</span> Tải xuống
                        </button>
                    </div>
                    <div className="flex-1 bg-[#525659] rounded overflow-auto custom-viewer-scroll p-4 md:p-8">
                        <div className="bg-white mx-auto max-w-[850px] min-h-[1100px] shadow-2xl p-10 md:p-16 text-black relative">
                            <h1 className="text-2xl font-bold mb-8 text-center uppercase">{(file.fileName || file.name || "Preview").replace(/\.(pdf|docx)$/i, '').replace(/_/g, ' ')}</h1>
                            <div className="mt-16 text-center text-gray-400">
                                <p>[Nội dung tài liệu mô phỏng được hiển thị tại đây]</p>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        function Footer() {
            return (
                <footer className="relative mt-8 overflow-hidden bg-[linear-gradient(90deg,#18ace6_0%,#1286ee_38%,#0d2d9a_100%)] text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]"></div>
                    <div className="relative mx-auto flex max-w-[1520px] flex-col items-center px-4 py-10 text-center lg:px-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d62828] text-[14px] font-bold text-[#ffd84d] shadow-md ring-2 ring-white/30">QH</div>
                        <h3 className="mt-4 text-[20px] font-bold uppercase tracking-[0.01em] text-white md:text-[24px]">Cổng Pháp luật Quốc gia</h3>
                        <p className="mt-3 text-[16px] font-medium text-white/95">Đơn vị chủ quản: Bộ Tư pháp</p>
                        <p className="mt-2 text-[15px] leading-7 text-white/90">Địa chỉ: 58 - 60 Trần Phú - Ba Đình - Hà Nội | Điện thoại: 024.6271.7579</p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[15px] text-white/95">
                            <a href="#" className="hover:text-white/75">Quy chế quản lý, vận hành, khai thác</a><span>|</span>
                            <a href="#" className="hover:text-white/75">Khảo sát đánh giá</a><span>|</span>
                            <a href="#" className="hover:text-white/75">Liên hệ</a><span>|</span>
                            <span>Theo dõi Cổng Pháp luật quốc gia trên</span>
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[14px] font-bold text-[#1977f3]">f</span>
                        </div>
                        <p className="mt-5 text-[16px] text-white/95">Tổng lượt truy cập: <span className="font-bold text-[#ffd84d]">1.468.244</span></p>
                        <p className="mt-5 text-[15px] text-white/85">© Bản quyền thuộc Cổng Pháp luật quốc gia</p>
                    </div>
                    <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="absolute bottom-7 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-transparent text-[20px] text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:bg-white/10">↑</button>
                    <button className="absolute bottom-7 right-20 inline-flex h-11 items-center gap-2 rounded-full bg-[#14c4f4] px-5 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(20,196,244,0.35)] hover:bg-[#0fb8e8]">
                        <span className="text-[18px]">◔</span><span>Hỗ trợ trực tuyến</span>
                    </button>
                </footer>
            );
        }


// ==========================================
// 2. ADDITIONAL COMPONENTS AFTER APP
// ==========================================
        function ConsultationHistoryModal({ isOpen, onClose, navigateToHistory }) {
            if (!isOpen) return null;
            React.useEffect(() => {
                if (navigateToHistory) navigateToHistory();
            }, []);
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center" onClick={e => e.stopPropagation()}>
                        <p className="text-gray-600">Đang chuyển đến trang lịch sử...</p>
                    </div>
                </div>
            );
        }

        function LichSuHoiDapTuVanPage({ menu, subPage, backToList }) {
            const [activeTab, setActiveTab] = useState('hoi-dap');
            const [draftSearch, setDraftSearch] = useState('');
            const [searchTerm, setSearchTerm] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [selectedFields, setSelectedFields] = useState([]);
            const [draftStatuses, setDraftStatuses] = useState([]);
            const [selectedStatuses, setSelectedStatuses] = useState([]);
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [isStatusOpen, setIsStatusOpen] = useState(false);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [statusSearchTerm, setStatusSearchTerm] = useState('');
            const [expandedId, setExpandedId] = useState(null);
            const [selectedDetail, setSelectedDetail] = useState(null);
            const [currentPage, setCurrentPage] = useState(1);
            const [itemsPerPage] = useState(10);

            const hoiDapData = [
                { id: 1, title: "Thủ tục chuyển đổi từ công ty TNHH 1 thành viên sang công ty cổ phần", field: "Doanh nghiệp", date: "15/04/2026", status: "da-hoan-thanh", answer: "Hồ sơ chuyển đổi bao gồm: Quyết định của chủ sở hữu, Nghị quyết ĐHCĐ, Điều lệ công ty cổ phần, Danh sách cổ đông sáng lập. Thời gian thực hiện: 05-07 ngày làm việc." },
                { id: 2, title: "Chế độ BHXH cho người lao động nghỉ việc do tinh giảm biên chế", field: "Lao động", date: "12/04/2026", status: "da-hoan-thanh", answer: "Người lao động được hưởng trợ cấp thôi việc 0.5 tháng lương/năm làm việc, cùng với BHXH một lần nếu đủ điều kiện theo quy định." },
                { id: 3, title: "Ưu đãi thuế TNDN cho doanh nghiệp công nghệ cao", field: "Thuế", date: "10/04/2026", status: "da-hoan-thanh", answer: "Doanh nghiệp công nghệ cao được hưởng thuế suất 10% trong 15 năm, miễn thuế 4 năm và giảm 50% trong 9 năm tiếp theo." },
                { id: 4, title: "Đăng ký bảo hộ nhãn hiệu cho sản phẩm mới", field: "Sở hữu trí tuệ", date: "08/04/2026", status: "dang-xu-ly", answer: null },
                { id: 5, title: "Thủ tục cấp phép xây dựng nhà xưởng trong khu công nghiệp", field: "Bất động sản", date: "05/04/2026", status: "da-hoan-thanh", answer: "Cần nộp hồ sơ tại Ban quản lý khu công nghiệp, bao gồm: Giấy phép đầu tư, Bản vẽ thiết kế, Giấy chứng nhận quyền sử dụng đất. Thời gian: 20 ngày làm việc." },
                { id: 6, title: "Điều kiện thành lập công ty luật", field: "Doanh nghiệp", date: "03/04/2026", status: "da-tu-choi", answer: null },
                { id: 7, title: "Trình tự giải quyết tranh chấp đất đai", field: "Đất đai", date: "01/04/2026", status: "dang-xu-ly", answer: null },
                { id: 8, title: "Hồ sơ đăng ký thay đổi ngành nghề kinh doanh", field: "Doanh nghiệp", date: "28/03/2026", status: "da-hoan-thanh", answer: "Hồ sơ gồm: Thông báo thay đổi nội dung đăng ký doanh nghiệp, Quyết định của chủ sở hữu/cổ đông, Giấy ủy quyền (nếu có). Nộp qua Cổng DVCQG." },
                { id: 9, title: "Thời hạn nộp báo cáo tài chính năm 2025", field: "Thuế", date: "25/03/2026", status: "da-hoan-thanh", answer: "Thời hạn nộp BCTC năm là 90 ngày kể from ngày kết thúc năm tài chính. Doanh nghiệp nộp qua hệ thống Thuế điện tử." },
                { id: 10, title: "Điều kiện cấp chứng chỉ hành nghề luật sư", field: "Khác", date: "22/03/2026", status: "da-hoan-thanh", answer: "Cần có bằng cử nhân luật, đã qua đào tạo nghề luật sư, thực tập 12 tháng tại tổ chức hành nghề luật sư, và đạt yêu cầu kiểm tra nghiệp vụ." },
                { id: 11, title: "Thủ tục đăng ký thay đổi con dấu doanh nghiệp", field: "Doanh nghiệp", date: "20/03/2026", status: "dang-xu-ly", answer: null },
                { id: 12, title: "Mức đóng BHXH bắt buộc năm 2026", field: "Lao động", date: "18/03/2026", status: "da-hoan-thanh", answer: "Người lao động đóng 8% (hưu trí, tử tuất), người sử dụng lao động đóng 17.5% (hưu trí 14%, ốm đau 3%, TNLĐ 0.5%)." },
                { id: 13, title: "Quy định về xuất hóa đơn điện tử", field: "Thuế", date: "15/03/2026", status: "da-hoan-thanh", answer: "Hóa đơn điện tử phải được lập ngay khi bán hàng, cung cấp dịch vụ. Thời điểm tối đa là ngày giao hàng hoặc ngày hoàn thành dịch vụ." },
                { id: 14, title: "Thủ tục giải thể doanh nghiệp", field: "Doanh nghiệp", date: "12/03/2026", status: "dang-xu-ly", answer: null },
                { id: 15, title: "Điều kiện kinh doanh dịch vụ bảo vệ", field: "Khác", date: "10/03/2026", status: "da-tu-choi", answer: null },
            ];

            const tuVanData = [
                { id: 101, title: "Tư vấn M&A: Thẩm định pháp lý doanh nghiệp mục tiêu", field: "Doanh nghiệp", advisor: "LS. Vũ Quang Huy", date: "18/04/2026", status: "da-hoan-thanh", question: "Kính thưa chuyên gia, công ty chúng tôi đang có kế hoạch mua lại một doanh nghiệp nhà nước đang trong quá trình cổ phần hóa. Chúng tôi cần tư vấn về quy trình thẩm định pháp lý (due diligence) đối with doanh nghiệp mục tiêu, đặc biệt là các rủi ro pháp lý need lưu ý about tài sản, lao động, and các khoản nợ tiềm tàng. Rất mong nhận được tư vấn from chuyên gia.", answer: "Đối with thương vụ M&A doanh nghiệp nhà nước, need đặc biệt lưu ý: (1) Thẩm định tư cách pháp lý and giấy phép kinh doanh còn hiệu lực; (2) Kiểm tra quyền sở hữu tài sản, đặc biệt là bất động sản (có thể đang thế chấp hoặc tranh chấp); (3) Rà soát hợp đồng lao động, nghĩa vụ BHXH chưa nộp đủ; (4) Đánh giá các khoản nợ tiềm tàng về thuế, phí; (5) Kiểm tra các vụ kiện, tranh chấp đang diễn ra. Nên thuê công ty kiểm toán độc lập and tổ chức tư vấn pháp lý có kinh nghiệm để thực hiện thẩm định toàn diện.", attachments: [{ name: "Bao_cao_tham_dinh_M&A.pdf", size: "2.4 MB" }, { name: "Checklist_rui_ro_phap_ly.xlsx", size: "156 KB" }] },
                { id: 102, title: "Tư vấn cơ cấu lại doanh nghiệp nhà nước theo Luật Doanh nghiệp 2025", field: "Doanh nghiệp", advisor: "LS. Nguyễn Văn Minh", date: "28/04/2026", status: "da-hoan-thanh", question: "Công ty chúng tôi là doanh nghiệp nhà nước, đang thực hiện cơ cấu lại theo Luật Doanh nghiệp 2025. Chúng tôi need tư vấn about trình tự, thủ tục and các vấn đề pháp lý need lưu ý, đặc biệt là xử lý lao động dôi dư and đánh giá lại tài sản.", answer: "Quy trình cơ cấu lại doanh nghiệp nhà nước bao gồm: (1) Xây dựng phương án cơ cấu lại trình cơ quan có thẩm quyền phê duyệt; (2) Thực hiện kiểm kê, đánh giá lại tài sản; (3) Xử lý tài chính, lao động; (4) Chuyển đổi mô hình công ty (nếu có); (5) Công bố thông tin and đăng ký thay đổi. Về xử lý lao động: Người lao động được đào tạo lại, bố trí việc làm mới hoặc nhận trợ cấp mất việc làm (1-2 tháng lương cho mỗi năm làm việc).", attachments: [{ name: "Phuong_an_co_cau_lai.pdf", size: "1.2 MB" }] },
                { id: 103, title: "Giải quyết tranh chấp hợp đồng thương mại quốc tế", field: "Thương mại", advisor: "LS. Phạm Quốc Hưng", date: "24/04/2026", status: "da-hoan-thanh", question: "Công ty chúng tôi có tranh chấp with đối tác nước ngoài về hợp đồng mua bán hàng hóa quốc tế. Giá trị tranh chấp khoảng 500.000 USD. Chúng tôi nên khởi kiện tại Tòa án Việt Nam hay chọn trọng tài quốc tế? Thời gian giải quyết dự kiến bao lâu?", answer: "Đối with tranh chấp thương mại quốc tế, nên chọn trọng tài thương mại (VIAC hoặc trọng tài nước ngoài) thay vì Tòa án, vì: (1) Phán quyết trọng tài có giá trị chung thẩm; (2) Dễ được công nhận and thi hành ở nước ngoài theo Công ước New York 1958; (3) Thủ tục nhanh hơn Tòa án. Thời gian giải quyết tại VIAC thường 6-9 tháng, trọng tài nước ngoài có thể 12-18 tháng. Nên xem xét điều khoản giải quyết tranh chấp trong hợp đồng để xác định cơ quan có thẩm quyền.", attachments: [] },
                { id: 104, title: "Thủ tục đăng ký sáng chế, giải pháp hữu ích", field: "Sở hữu trí tuệ", advisor: "LS. Đỗ Thị Mai", date: "20/04/2026", status: "dang-xu-ly", question: "Chúng tôi đã nghiên cứu thành công một giải pháp kỹ thuật mới trong lĩnh vực xử lý nước thải. Chúng tôi muốn đăng ký bảo hộ dưới dạng sáng chế hoặc giải pháp hữu ích. Xin tư vấn about thủ tục, thời gian and chi phí?", answer: null, attachments: [] },
                { id: 105, title: "Tuân thủ quy định về phòng chống rửa tiền trong BĐS", field: "Bất động sản", advisor: "LS. Nguyễn Thị Thu Hà", date: "12/04/2026", status: "da-hoan-thanh", question: "Công ty BĐS của chúng tôi need tư vấn about nghĩa vụ phòng chống rửa tiền theo quy định mới. Cụ thể, chúng tôi need thực hiện những biện pháp gì để tuân thủ? Có need báo cáo giao dịch đáng ngờ không?", answer: "Doanh nghiệp BĐS phải: (1) Nhận diện, đánh giá rủi ro rửa tiền; (2) Biết khách hàng (KYC) - xác minh danh tính, nguồn gốc tài sản; (3) Báo cáo giao dịch đáng ngờ cho Cục Phòng chống rửa tiền; (4) Lưu trữ hồ sơ tối thiểu 5 năm; (5) Đào tạo nhân viên. Giao dịch đáng ngờ: Thanh toán bằng tiền mặt lớn, giao dịch không phù hợp with năng lực tài chính, sử dụng nhiều tài khoản trung gian.", attachments: [{ name: "Quy_trinh_KYC_BDS.pdf", size: "890 KB" }] },
                { id: 106, title: "Giải quyết khiếu nại quyết định xử phạt môi trường", field: "Môi trường", advisor: "LS. Hoàng Thị Ngọc", date: "16/04/2026", status: "da-tu-choi", question: "Công ty chúng tôi nhận được quyết định xử phạt vi phạm môi trường 200 triệu đồng do xả thải vượt quy chuẩn. Chúng tôi cho rằng mức phạt này quá cao and muốn khiếu nại. Xin tư vấn about thủ tục and thời hạn khiếu nại?", answer: null, attachments: [] },
                { id: 107, title: "Tư vấn phát hành cổ phiếu riêng lẻ", field: "Tài chính - Chứng khoán", advisor: "LS. Phan Đình Tùng", date: "14/04/2026", status: "da-hoan-thanh", question: "Công ty chúng tôi là công ty cổ phần chưa niêm yết, muốn phát hành cổ phiếu riêng lẻ để tăng vốn điều lệ. Xin tư vấn about điều kiện, thủ tục and số lượng nhà đầu tư tối đa?", answer: "Điều kiện phát hành cổ phiếu riêng lẻ: (1) Công ty đã hoạt động tối thiểu 1 năm; (2) Có phương án sử dụng vốn khả thi; (3) ĐHCĐ thông qua; (4) Không đang bị xử phạt về chứng khoán. Đối tượng: Tối đa 100 nhà đầu tư (không tính NĐT chuyên nghiệp). Hạn chế chuyển nhượng: 1 năm. Đăng ký with UBCKNN trước 5 ngày làm việc.", attachments: [{ name: "Phuong_an_phat_hanh.pdf", size: "567 KB" }] },
                { id: 108, title: "Tư vấn thành lập quỹ đầu tư tư nhân", field: "Tài chính - Chứng khoán", advisor: "LS. Đặng Minh Tuấn", date: "10/04/2026", status: "da-hoan-thanh", question: "Chúng tôi muốn thành lập một quỹ đầu tư tư nhân theo Luật Chứng khoán 2025. Xin tư vấn about vốn tối thiểu, số lượng nhà đầu tư, and các hạn chế đầu tư?", answer: "Điều kiện: (1) Vốn điều lệ tối thiểu 50 tỷ đồng; (2) Công ty quản lý quỹ có vốn 25 tỷ, nhân sự có chứng chỉ; (3) Ngân hàng giám sát độc lập; (4) Tối đa 30 NĐT chuyên nghiệp. Hạn chế: Không quá 10% NAV vào một tổ chức phát hành. Ưu đãi: Miễn thuế TNDN from hoạt động đầu tư.", attachments: [] },
                { id: 109, title: "Giải quyết tranh chấp lao động tập thể", field: "Lao động", advisor: "LS. Bùi Thị Hồng", date: "08/04/2026", status: "da-hoan-thanh", question: "Một nhóm 50 người lao động của công ty chúng tôi yêu cầu tăng lương 20% and giảm giờ làm. Họ đe dọa đình công nếu không được đáp ứng. Công ty need xử lý thế nào?", answer: "Tranh chấp về lợi ích (đòi hỏi quyền lợi mới) phải qua hòa giải viên lao động trước. Nếu hòa giải không thành, có thể đưa ra Hội đồng trọng tài lao động. Đình công chỉ hợp pháp sau khi hòa giải thất bại, có biểu quyết của trên 50% NLĐ, and thông báo trước 5 ngày. Công ty không được trả đũa người tham gia đình công hợp pháp.", attachments: [{ name: "Bien_ban_hoa_giai.docx", size: "89 KB" }] },
                { id: 110, title: "Đăng ký lưu hành mỹ phẩm nhập khẩu", field: "Thương mại", advisor: "LS. Võ Thị Thanh Thảo", date: "06/04/2026", status: "da-hoan-thanh", question: "Chúng tôi muốn nhập khẩu mỹ phẩm from Hàn Quốc về Việt Nam. Xin tư vấn about hồ sơ công bố, thời gian and các lưu ý about thành phần?", answer: "Hồ sơ: (1) Phiếu công bố (02 bản); (2) Giấy ủy quyền nhà sản xuất; (3) Giấy chứng nhận GMP; (4) CFS hợp pháp hóa lãnh sự; (5) Giấy phép kinh doanh. Nộp online qua Cổng DVC. Thời gian: 05 ngày. Lưu ý: Mỹ phẩm phải đáp ứng quy chuẩn ASEAN, có nhãn phụ tiếng Việt, không chứa chất cấm.", attachments: [{ name: "Danh_muc_chat_cam.pdf", size: "450 KB" }] },
                { id: 111, title: "Tuân thủ Nghị định 13 về bảo vệ dữ liệu cá nhân", field: "Công nghệ thông tin", advisor: "LS. Lê Hoàng Anh", date: "22/04/2026", status: "dang-xu-ly", question: "Công ty chúng tôi kinh doanh thương mại điện tử, thu thập nhiều dữ liệu khách hàng. Theo Nghị định 13/2023, chúng tôi need thực hiện những biện pháp gì để tuân thủ?", answer: null, attachments: [] },
                { id: 112, title: "Thủ tục đăng ký sáng chế quốc tế theo PCT", field: "Sở hữu trí tuệ", advisor: "LS. Đỗ Thị Mai", date: "04/04/2026", status: "da-hoan-thanh", question: "Chúng tôi đã có sáng chế được cấp bằng at Việt Nam, muốn mở rộng bảo hộ ra nước ngoài. Xin tư vấn about thủ tục đăng ký quốc tế theo Hiệp ước PCT?", answer: "Nộp đơn PCT tại Cục Sở hữu trí tuệ Việt Nam (Cơ quan nhận đơn) trong vòng 12 tháng kể from ngày nộp đơn đầu tiên. Đơn gồm: Tờ khai, bản mô tả, yêu cầu bảo hộ, lệ phí. Sau đó vào giai đoạn quốc gia at các nước chỉ định in vòng 30/31 tháng. Nên thuê đại diện SHCN ở mỗi nước để xử lý.", attachments: [{ name: "Huong_dan_PCT.pdf", size: "1.8 MB" }] },
                { id: 113, title: "Tư vấn đầu tư ra nước ngoài", field: "Đầu tư", advisor: "LS. Trần Minh Đức", date: "02/04/2026", status: "da-tu-choi", question: "Công ty chúng tôi muốn đầu tư thành lập công ty con tại Campuchia. Xin tư vấn about thủ tục, điều kiện and các rủi ro pháp lý?", answer: null, attachments: [] },
                { id: 114, title: "Giải thể công ty TNHH 2 thành viên", field: "Doanh nghiệp", advisor: "LS. Vũ Quang Huy", date: "30/03/2026", status: "da-hoan-thanh", question: "Hai thành viên công ty chúng tôi muốn giải thể do not còn hoạt động hiệu quả. Xin tư vấn about thủ tục and nghĩa vụ tài chính when giải thể?", answer: "Thủ tục: (1) Thông qua quyết định giải thể; (2) Thanh lý tài sản, thanh toán nợ; (3) Nộp hồ sơ giải thể lên Phòng ĐKKD; (4) Công bố quyết định giải thể. Nghĩa vụ: Thanh toán đủ các khoản nợ (lương, BHXH, thuế, nợ khác) trước khi chia tài sản còn lại for thành viên.", attachments: [] },
                { id: 115, title: "Xử lý vi phạm hợp đồng thuê văn phòng", field: "Bất động sản", advisor: "LS. Nguyễn Thị Thu Hà", date: "26/03/2026", status: "da-hoan-thanh", question: "Bên cho thuê văn phòng đơn phương chấm dứt hợp đồng trước thời hạn 1 năm mà không báo before. Chúng tôi đã đầu tư sửa chữa 500 triệu. Có thể đòi bồi thường thế nào?", answer: "Có thể đòi: (1) Phạt vi phạm theo thỏa thuận trong hợp đồng (tối đa 8% giá trị phần nghĩa vụ bị vi phạm); (2) Bồi thường thiệt hại thực tế (chi phí sửa chữa chưa khấu hao, chi phí chuyển văn phòng...); (3) Hoàn trả tiền cọc (nếu có). Nên gửi văn bản yêu cầu bồi thường, nếu not được thì khởi kiện tại Tòa.", attachments: [{ name: "Mau_don_khoi_kien.docx", size: "120 KB" }] },
            ];

            const allFields = activeTab === 'hoi-dap'
                ? [...new Set(hoiDapData.map(i => i.field))].sort()
                : [...new Set(tuVanData.map(i => i.field))].sort();

            const statusOptions = activeTab === 'hoi-dap'
                ? [{ value: 'dang-xu-ly', label: 'Đang xử lý' }, { value: 'da-hoan-thanh', label: 'Đã hoàn thành' }, { value: 'da-tu-choi', label: 'Đã từ chối' }]
                : [{ value: 'dang-xu-ly', label: 'Đang xử lý' }, { value: 'da-hoan-thanh', label: 'Đã hoàn thành' }, { value: 'da-tu-choi', label: 'Đã từ chối' }];

            const statusLabelMap = activeTab === 'hoi-dap'
                ? { 'dang-xu-ly': 'Đang xử lý', 'da-hoan-thanh': 'Đã hoàn thành', 'da-tu-choi': 'Đã từ chối' }
                : { 'dang-xu-ly': 'Đang xử lý', 'da-hoan-thanh': 'Đã hoàn thành', 'da-tu-choi': 'Đã từ chối' };

            const statusColorMap = {
                'dang-xu-ly': 'bg-blue-100 text-blue-800',
                'da-hoan-thanh': 'bg-green-100 text-green-800',
                'da-tu-choi': 'bg-red-100 text-red-800',
            };

            const filteredFields = useMemo(() => {
                if (!fieldSearchTerm) return allFields;
                const normalized = fieldSearchTerm.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                return allFields.filter(f => f.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').includes(normalized));
            }, [allFields, fieldSearchTerm]);

            const filteredStatusOpts = useMemo(() => {
                if (!statusSearchTerm) return statusOptions;
                const normalized = statusSearchTerm.toLowerCase();
                return statusOptions.filter(s => s.label.toLowerCase().includes(normalized));
            }, [statusSearchTerm]);

            const currentData = activeTab === 'hoi-dap' ? hoiDapData : tuVanData;

            const filteredData = currentData.filter(item => {
                let match = true;
                if (searchTerm) {
                    const kw = searchTerm.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const title = item.title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
                    const answer = item.answer ? item.answer.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd') : '';
                    match = match && (title.includes(kw) || answer.includes(kw));
                }
                if (selectedFields.length > 0) {
                    match = match && selectedFields.includes(item.field);
                }
                if (selectedStatuses.length > 0) {
                    match = match && selectedStatuses.includes(item.status);
                }
                return match;
            });

            const totalItems = filteredData.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => { setSearchTerm(draftSearch); setSelectedFields(draftFields); setSelectedStatuses(draftStatuses); setCurrentPage(1); setIsFieldOpen(false); setIsStatusOpen(false); };
            const handleClear = () => { setDraftSearch(''); setDraftFields([]); setDraftStatuses([]); setSearchTerm(''); setSelectedFields([]); setSelectedStatuses([]); setIsFieldOpen(false); setIsStatusOpen(false); setFieldSearchTerm(''); setStatusSearchTerm(''); setCurrentPage(1); };
            const handlePageChange = (newPage) => { if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage); };

            const toggleExpand = (id) => { setExpandedId(expandedId === id ? null : id); };

            const handleDownload = (file) => {
                if (file && file.url) {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Không thể tải file. Vui lòng thử lại.');
                }
            };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            if (selectedDetail) {
                const item = tuVanData.find(i => i.id === selectedDetail);
                if (!item) return null;
                return (
                    <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="mb-4">
                                <button onClick={() => setSelectedDetail(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition flex items-center gap-2 text-[14px]">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    Quay lại
                                </button>
                            </div>

                            <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6">{item.title}</h2>

                            <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                                <span className="text-[13px] font-medium px-3 py-1 rounded bg-[#e8f0fe] text-[#2580f0]">{item.field}</span>
                                <span className="text-[13px] text-gray-500">Chuyên gia: {item.advisor}</span>
                                <span className="text-[13px] text-gray-500">Ngày gửi: {item.date}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabelMap[item.status]}</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-[18px] font-bold text-[#1b2b49] mb-3">Yêu cầu tư vấn</h3>
                                <div className="bg-[#f8f9fc] rounded-lg p-6">
                                    <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{item.question}</p>
                                </div>
                            </div>

                            {item.status === 'da-hoan-thanh' && item.answer && (
                                <div className="mb-6">
                                    <h3 className="text-[18px] font-bold text-[#1b2b49] mb-3">Kết quả tư vấn</h3>
                                    <div className="bg-[#f0f7ff] rounded-lg p-6">
                                        <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</p>
                                    </div>
                                </div>
                            )}

                            {item.status === 'dang-xu-ly' && (
                                <div className="mb-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                                        Yêu cầu đang được xử lý, vui lòng đợi chuyên gia trả lời.
                                    </div>
                                </div>
                            )}

                            {item.status === 'da-tu-choi' && (
                                <div className="mb-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                                        Yêu cầu đã bị từ chối.
                                    </div>
                                </div>
                            )}

                            {item.attachments && item.attachments.length > 0 && (
                                <div className="border-t border-[#E0E0E0] pt-6">
                                    <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {item.attachments.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                    <div className="shrink-0 scale-90 origin-center">{getFileIcon(file.name)}</div>
                                                    <div className="flex flex-col overflow-hidden w-full">
                                                        <p className="text-[#1E88E5] font-medium text-[14px] truncate">{file.name}</p>
                                                        <p className="text-gray-400 text-[12px] mt-0.5">{file.size || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDownload(file)} className="shrink-0 ml-2 p-2 text-[#2580f0] hover:bg-[#f8f9fc] rounded transition">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                );
            }

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#dbe5ff]">
                        <h2 className="text-[28px] font-bold text-[#1b2b49]">Lịch sử hỏi đáp/tư vấn</h2>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <div className="flex gap-6">
                            <button onClick={() => { setActiveTab('hoi-dap'); setExpandedId(null); setCurrentPage(1); }} className={`py-3 text-sm font-semibold border-b-2 transition ${activeTab === 'hoi-dap' ? 'border-[#2580f0] text-[#2580f0]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                    Lịch sử hỏi đáp
                                </button>
                                <button onClick={() => { setActiveTab('tu-van'); setExpandedId(null); setCurrentPage(1); }} className={`py-3 text-sm font-semibold border-b-2 transition ${activeTab === 'tu-van' ? 'border-[#2580f0] text-[#2580f0]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                    Lịch sử tư vấn chuyên sâu
                                </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4 flex flex-col md:flex-row gap-3 items-center">
                            <div className="relative flex-1 w-full">
                                <input type="text" maxLength={100} placeholder={activeTab === 'hoi-dap' ? "Tìm kiếm theo tiêu đề câu hỏi, câu trả lời..." : "Tìm kiếm theo tiêu đề tư vấn..."} value={draftSearch} onChange={(e) => setDraftSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm text-sm" />
                                <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <div className="relative w-full md:w-[200px]">
                                <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-sm text-gray-700 focus:outline-none shadow-sm">
                                    <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : '-- Lĩnh vực --'}</span>
                                    <span className="text-[10px] text-gray-400">▼</span>
                                </button>
                                {isFieldOpen && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-hidden flex flex-col">
                                        <div className="p-2 border-b border-gray-200">
                                            <input type="text" placeholder="Tìm lĩnh vực..." value={fieldSearchTerm} onChange={(e) => setFieldSearchTerm(e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#2580f0]" />
                                        </div>
                                        <div className="overflow-auto">
                                            {filteredFields.map(f => (
                                                <label key={f} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                                                    <input type="checkbox" className="mr-2 w-3 h-3 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]" checked={draftFields.includes(f)} onChange={() => { if (draftFields.includes(f)) setDraftFields(draftFields.filter(i => i !== f)); else setDraftFields([...draftFields, f]); }} />
                                                    {f}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative w-full md:w-[200px]">
                                <button onClick={() => { setIsStatusOpen(!isStatusOpen); setStatusSearchTerm(''); }} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-sm text-gray-700 focus:outline-none shadow-sm">
                                    <span className="truncate">{draftStatuses.length > 0 ? `Đã chọn: ${draftStatuses.length} trạng thái` : '-- Trạng thái --'}</span>
                                    <span className="text-[10px] text-gray-400">▼</span>
                                </button>
                                {isStatusOpen && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-hidden flex flex-col">
                                        <div className="p-2 border-b border-gray-200">
                                            <input type="text" placeholder="Tìm trạng thái..." value={statusSearchTerm} onChange={(e) => setStatusSearchTerm(e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#2580f0]" />
                                        </div>
                                        <div className="overflow-auto">
                                            {filteredStatusOpts.map(s => (
                                                <label key={s.value} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                                                    <input type="checkbox" className="mr-2 w-3 h-3 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]" checked={draftStatuses.includes(s.value)} onChange={() => { if (draftStatuses.includes(s.value)) setDraftStatuses(draftStatuses.filter(i => i !== s.value)); else setDraftStatuses([...draftStatuses, s.value]); }} />
                                                    {s.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] rounded-md text-sm font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    Tìm kiếm
                                </button>
                                <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 rounded-md text-sm font-semibold hover:bg-gray-50 transition flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>

                    {currentItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Không tìm thấy kết quả</p>
                        </div>
                    ) : activeTab === 'hoi-dap' ? (
                        <div className="space-y-4 mb-8">
                            {currentItems.map(item => (
                                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#2580f0] hover:shadow-sm transition">
                                    <div className="p-4 flex items-start gap-3 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={expandedId === item.id ? '#2580f0' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 transition-transform duration-200" style={{ transform: expandedId === item.id ? 'rotate(90deg)' : 'none' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        <div className="flex-1">
                                            <h4 className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition">{item.title}</h4>
                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabelMap[item.status]}</span>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field}</span>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedId === item.id && (
                                        <div className="px-4 pb-4 pl-9">
                                            {item.status === 'dang-xu-ly' && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                                                    Câu hỏi đang được xử lý, vui lòng đợi chuyên gia trả lời.
                                                </div>
                                            )}
                                            {item.status === 'da-tu-choi' && (
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                                                    Câu hỏi đã bị từ chối trả lời.
                                                </div>
                                            )}
                                            {item.status === 'da-hoan-thanh' && item.answer && (
                                                <div className="bg-[#f8f9fc] rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-sm font-semibold text-[#2580f0]">Câu trả lời:</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 mb-8">
                            {currentItems.map(item => (
                                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#2580f0] hover:shadow-sm transition cursor-pointer" onClick={() => setSelectedDetail(item.id)}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <h4 className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition line-clamp-2">{item.title}</h4>
                                            {item.question && (
                                                <p className="text-[13px] text-gray-600 mt-2 line-clamp-2">{item.question}</p>
                                            )}
                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabelMap[item.status]}</span>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field}</span>
                                                <span>Chuyên gia: {item.advisor}</span>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                            <div className="flex items-center gap-4">
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong>-<strong className="text-[#212121]">{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> bản ghi
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}
                </section>
            );
        }


        function TraCuuLichSuHoiDapTuVanPage({ menu, subPage, backToList }) {
            const [draftSearch, setDraftSearch] = useState('');
            const [searchTerm, setSearchTerm] = useState('');
            const [draftFields, setDraftFields] = useState([]);
            const [selectedFields, setSelectedFields] = useState([]);
            const [draftTypes, setDraftTypes] = useState([]);
            const [selectedTypes, setSelectedTypes] = useState([]);
            const [draftStatuses, setDraftStatuses] = useState([]);
            const [selectedStatuses, setSelectedStatuses] = useState([]);
            const [draftTuNgay, setDraftTuNgay] = useState('');
            const [draftDenNgay, setDraftDenNgay] = useState('');
            const [draftTimePeriod, setDraftTimePeriod] = useState('');
            const [isTimeOpen, setIsTimeOpen] = useState(false);
            const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
            const [isFieldOpen, setIsFieldOpen] = useState(false);
            const [isTypeOpen, setIsTypeOpen] = useState(false);
            const [isStatusOpen, setIsStatusOpen] = useState(false);
            const [fieldSearchTerm, setFieldSearchTerm] = useState('');
            const [typeSearchTerm, setTypeSearchTerm] = useState('');
            const [statusSearchTerm, setStatusSearchTerm] = useState('');
            const [expandedId, setExpandedId] = useState(null);
            const [selectedDetail, setSelectedDetail] = useState(null);
            const [currentPage, setCurrentPage] = useState(1);
            const [hasSearched, setHasSearched] = useState(false);
            const [itemsPerPage] = useState(10);

            const hoiDapData = [
                { id: 1, type: 'hoi-dap', title: "Thủ tục chuyển đổi từ công ty TNHH 1 thành viên sang công ty cổ phần", field: "Doanh nghiệp", date: "15/04/2026", status: "da-hoan-thanh", answer: "Hồ sơ chuyển đổi bao gồm: Quyết định của chủ sở hữu, Nghị quyết ĐHCĐ, Điều lệ công ty cổ phần, Danh sách cổ đông sáng lập. Thời gian thực hiện: 05-07 ngày làm việc." },
                { id: 2, type: 'hoi-dap', title: "Chế độ BHXH cho người lao động nghỉ việc do tinh giảm biên chế", field: "Lao động", date: "12/04/2026", status: "da-hoan-thanh", answer: "Người lao động được hưởng trợ cấp thôi việc 0.5 tháng lương/năm làm việc, cùng với BHXH một lần nếu đủ điều kiện theo quy định." },
                { id: 3, type: 'hoi-dap', title: "Ưu đãi thuế TNDN cho doanh nghiệp công nghệ cao", field: "Thuế", date: "10/04/2026", status: "da-hoan-thanh", answer: "Doanh nghiệp công nghệ cao được hưởng thuế suất 10% trong 15 năm, miễn thuế 4 năm và giảm 50% trong 9 năm tiếp theo." },
                { id: 4, type: 'hoi-dap', title: "Đăng ký bảo hộ nhãn hiệu cho sản phẩm mới", field: "Sở hữu trí tuệ", date: "08/04/2026", status: "dang-xu-ly", answer: null },
                { id: 5, type: 'hoi-dap', title: "Thủ tục cấp phép xây dựng nhà xưởng trong khu công nghiệp", field: "Bất động sản", date: "05/04/2026", status: "da-hoan-thanh", answer: "Cần nộp hồ sơ tại Ban quản lý khu công nghiệp, bao gồm: Giấy phép đầu tư, Bản vẽ thiết kế, Giấy chứng nhận quyền sử dụng đất. Thời gian: 20 ngày làm việc." },
                { id: 6, type: 'hoi-dap', title: "Điều kiện thành lập công ty luật", field: "Doanh nghiệp", date: "03/04/2026", status: "da-tu-choi", answer: null },
                { id: 7, type: 'hoi-dap', title: "Trình tự giải quyết tranh chấp đất đai", field: "Đất đai", date: "01/04/2026", status: "dang-xu-ly", answer: null },
                { id: 8, type: 'hoi-dap', title: "Hồ sơ đăng ký thay đổi ngành nghề kinh doanh", field: "Doanh nghiệp", date: "28/03/2026", status: "da-hoan-thanh", answer: "Hồ sơ gồm: Thông báo thay đổi nội dung đăng ký doanh nghiệp, Quyết định của chủ sở hữu/cổ đông, Giấy ủy quyền (nếu có). Nộp qua Cổng DVCQG." },
                { id: 9, type: 'hoi-dap', title: "Thời hạn nộp báo cáo tài chính năm 2025", field: "Thuế", date: "25/03/2026", status: "da-hoan-thanh", answer: "Thời hạn nộp BCTC năm là 90 ngày kể from ngày kết thúc năm tài chính. Doanh nghiệp nộp qua hệ thống Thuế điện tử." },
                { id: 10, type: 'hoi-dap', title: "Điều kiện cấp chứng chỉ hành nghề luật sư", field: "Khác", date: "22/03/2026", status: "da-hoan-thanh", answer: "Cần có bằng cử nhân luật, đã qua đào tạo nghề luật sư, thực tập 12 tháng tại tổ chức hành nghề luật sư, và đạt yêu cầu kiểm tra nghiệp vụ." },
                { id: 11, type: 'hoi-dap', title: "Thủ tục đăng ký thay đổi con dấu doanh nghiệp", field: "Doanh nghiệp", date: "20/03/2026", status: "dang-xu-ly", answer: null },
                { id: 12, type: 'hoi-dap', title: "Mức đóng BHXH bắt buộc năm 2026", field: "Lao động", date: "18/03/2026", status: "da-hoan-thanh", answer: "Người lao động đóng 8% (hưu trí, tử tuất), người sử dụng lao động đóng 17.5% (hưu trí 14%, ốm đau 3%, TNLĐ 0.5%)." },
                { id: 13, type: 'hoi-dap', title: "Quy định về xuất hóa đơn điện tử", field: "Thuế", date: "15/03/2026", status: "da-hoan-thanh", answer: "Hóa đơn điện tử phải được lập ngay khi bán hàng, cung cấp dịch vụ. Thời điểm tối đa là ngày giao hàng hoặc ngày hoàn thành dịch vụ." },
                { id: 14, type: 'hoi-dap', title: "Thủ tục giải thể doanh nghiệp", field: "Doanh nghiệp", date: "12/03/2026", status: "dang-xu-ly", answer: null },
                { id: 15, type: 'hoi-dap', title: "Điều kiện kinh doanh dịch vụ bảo vệ", field: "Khác", date: "10/03/2026", status: "da-tu-choi", answer: null },
            ];

            const tuVanData = [
                { id: 101, type: 'tu-van', title: "Tư vấn M&A: Thẩm định pháp lý doanh nghiệp mục tiêu", field: "Doanh nghiệp", advisor: "LS. Vũ Quang Huy", date: "18/04/2026", status: "da-hoan-thanh", question: "Kính thưa chuyên gia, công ty chúng tôi đang có kế hoạch mua lại một doanh nghiệp nhà nước đang trong quá trình cổ phần hóa.", answer: "Đối with thương vụ M&A doanh nghiệp nhà nước, need đặc biệt lưu ý: (1) Thẩm định tư cách pháp lý and giấy phép kinh doanh còn hiệu lực; (2) Kiểm tra quyền sở hữu tài sản; (3) Rà soát hợp đồng lao động; (4) Đánh giá các khoản nợ tiềm tàng.", attachments: [{ name: "Bao_cao_tham_dinh_M&A.pdf", size: "2.4 MB" }] },
                { id: 102, type: 'tu-van', title: "Tư vấn cơ cấu lại doanh nghiệp nhà nước theo Luật Doanh nghiệp 2025", field: "Doanh nghiệp", advisor: "LS. Nguyễn Văn Minh", date: "28/04/2026", status: "da-hoan-thanh", question: "Công ty chúng tôi là doanh nghiệp nhà nước, đang thực hiện cơ cấu lại theo Luật Doanh nghiệp 2025.", answer: "Quy trình cơ cấu lại doanh nghiệp nhà nước bao gồm: (1) Xây dựng phương án cơ cấu lại; (2) Kiểm kê, đánh giá lại tài sản; (3) Xử lý tài chính, lao động.", attachments: [{ name: "Phuong_an_co_cau_lai.pdf", size: "1.2 MB" }] },
                { id: 103, type: 'tu-van', title: "Giải quyết tranh chấp hợp đồng thương mại quốc tế", field: "Thương mại", advisor: "LS. Phạm Quốc Hưng", date: "24/04/2026", status: "da-hoan-thanh", question: "Công ty chúng tôi có tranh chấp with đối tác nước ngoài về hợp đồng mua bán hàng hóa quốc tế.", answer: "Đối with tranh chấp thương mại quốc tế, nên chọn trọng tài thương mại (VIAC) thay vì Tòa án.", attachments: [] },
                { id: 104, type: 'tu-van', title: "Thủ tục đăng ký sáng chế, giải pháp hữu ích", field: "Sở hữu trí tuệ", advisor: "LS. Đỗ Thị Mai", date: "20/04/2026", status: "dang-xu-ly", question: "Chúng tôi đã nghiên cứu thành công một giải pháp kỹ thuật mới trong lĩnh vực xử lý nước thải.", answer: null, attachments: [] },
                { id: 105, type: 'tu-van', title: "Tuân thủ quy định về phòng chống rửa tiền trong BĐS", field: "Bất động sản", advisor: "LS. Nguyễn Thị Thu Hà", date: "12/04/2026", status: "da-hoan-thanh", question: "Công ty BĐS của chúng tôi need tư vấn about nghĩa vụ phòng chống rửa tiền.", answer: "Doanh nghiệp BĐS phải: (1) Nhận diện, đánh giá rủi ro rửa tiền; (2) Biết khách hàng (KYC); (3) Báo cáo giao dịch đáng ngờ.", attachments: [{ name: "Quy_trinh_KYC_BDS.pdf", size: "890 KB" }] },
                { id: 106, type: 'tu-van', title: "Giải quyết khiếu nại quyết định xử phạt môi trường", field: "Môi trường", advisor: "LS. Hoàng Thị Ngọc", date: "16/04/2026", status: "da-tu-choi", question: "Công ty chúng tôi nhận được quyết định xử phạt vi phạm môi trường 200 triệu đồng.", answer: null, attachments: [] },
                { id: 107, type: 'tu-van', title: "Tư vấn phát hành cổ phiếu riêng lẻ", field: "Tài chính - Chứng khoán", advisor: "LS. Phan Đình Tùng", date: "14/04/2026", status: "da-hoan-thanh", question: "Công ty chúng tôi là công ty cổ phần chưa niêm yết, muốn phát hành cổ phiếu riêng lẻ.", answer: "Điều kiện phát hành cổ phiếu riêng lẻ: (1) Công ty đã hoạt động tối thiểu 1 năm; (2) Có phương án sử dụng vốn khả thi.", attachments: [{ name: "Phuong_an_phat_hanh.pdf", size: "567 KB" }] },
                { id: 108, type: 'tu-van', title: "Tư vấn thành lập quỹ đầu tư tư nhân", field: "Tài chính - Chứng khoán", advisor: "LS. Đặng Minh Tuấn", date: "10/04/2026", status: "da-hoan-thanh", question: "Chúng tôi muốn thành lập một quỹ đầu tư tư nhân theo Luật Chứng khoán 2025.", answer: "Điều kiện: (1) Vốn điều lệ tối thiểu 50 tỷ đồng; (2) Công ty quản lý quỹ có vốn 25 tỷ.", attachments: [] },
                { id: 109, type: 'tu-van', title: "Giải quyết tranh chấp lao động tập thể", field: "Lao động", advisor: "LS. Bùi Thị Hồng", date: "08/04/2026", status: "da-hoan-thanh", question: "Một nhóm 50 người lao động của công ty chúng tôi yêu cầu tăng lương 20%.", answer: "Tranh chấp về lợi ích phải qua hòa giải viên lao động trước.", attachments: [{ name: "Bien_ban_hoa_giai.docx", size: "89 KB" }] },
                { id: 110, type: 'tu-van', title: "Đăng ký lưu hành mỹ phẩm nhập khẩu", field: "Thương mại", advisor: "LS. Võ Thị Thanh Thảo", date: "06/04/2026", status: "da-hoan-thanh", question: "Chúng tôi muốn nhập khẩu mỹ phẩm from Hàn Quốc về Việt Nam.", answer: "Hồ sơ: (1) Phiếu công bố; (2) Giấy ủy quyền nhà sản xuất; (3) Giấy chứng nhận GMP.", attachments: [{ name: "Danh_muc_chat_cam.pdf", size: "450 KB" }] },
                { id: 111, type: 'tu-van', title: "Tuân thủ Nghị định 13 về bảo vệ dữ liệu cá nhân", field: "Công nghệ thông tin", advisor: "LS. Lê Hoàng Anh", date: "22/04/2026", status: "dang-xu-ly", question: "Công ty chúng tôi kinh doanh thương mại điện tử, thu thập nhiều dữ liệu khách hàng.", answer: null, attachments: [] },
                { id: 112, type: 'tu-van', title: "Thủ tục đăng ký sáng chế quốc tế theo PCT", field: "Sở hữu trí tuệ", advisor: "LS. Đỗ Thị Mai", date: "04/04/2026", status: "da-hoan-thanh", question: "Chúng tôi đã có sáng chế được cấp bằng at Việt Nam, muốn mở rộng bảo hộ ra nước ngoài.", answer: "Nộp đơn PCT tại Cục Sở hữu trí tuệ Việt Nam trong vòng 12 tháng.", attachments: [{ name: "Huong_dan_PCT.pdf", size: "1.8 MB" }] },
                { id: 113, type: 'tu-van', title: "Tư vấn đầu tư ra nước ngoài", field: "Đầu tư", advisor: "LS. Trần Minh Đức", date: "02/04/2026", status: "da-tu-choi", question: "Công ty chúng tôi muốn đầu tư thành lập công ty con tại Campuchia.", answer: null, attachments: [] },
                { id: 114, type: 'tu-van', title: "Giải thể công ty TNHH 2 thành viên", field: "Doanh nghiệp", advisor: "LS. Vũ Quang Huy", date: "30/03/2026", status: "da-hoan-thanh", question: "Hai thành viên công ty chúng tôi muốn giải thể do not còn hoạt động hiệu quả.", answer: "Thủ tục: (1) Thông qua quyết định giải thể; (2) Thanh lý tài sản, thanh toán nợ.", attachments: [] },
                { id: 115, type: 'tu-van', title: "Xử lý vi phạm hợp đồng thuê văn phòng", field: "Bất động sản", advisor: "LS. Nguyễn Thị Thu Hà", date: "26/03/2026", status: "da-hoan-thanh", question: "Bên cho thuê văn phòng đơn phương chấm dứt hợp đồng trước thời hạn.", answer: "Có thể đòi: (1) Phạt vi phạm; (2) Bồi thường thiệt hại thực tế.", attachments: [{ name: "Mau_don_khoi_kien.docx", size: "120 KB" }] },
            ];

            const allData = [...hoiDapData, ...tuVanData];
            const allFields = [...new Set(allData.map(i => i.field))].sort();

            const typeOptions = [
                { value: 'hoi-dap', label: 'Hỏi đáp' },
                { value: 'tu-van', label: 'Tư vấn chuyên sâu' }
            ];

            const timePeriodOptions = [
                { value: 'today', label: 'Hôm nay' },
                { value: 'week', label: 'Tuần này' },
                { value: 'month', label: 'Tháng này' },
                { value: 'quarter', label: 'Quý này' },
                { value: 'year', label: 'Năm nay' },
                { value: 'custom', label: 'Tùy chọn' }
            ];

            const statusOptions = [
                { value: 'dang-xu-ly', label: 'Đang xử lý' },
                { value: 'da-hoan-thanh', label: 'Đã hoàn thành' },
                { value: 'da-tu-choi', label: 'Đã từ chối' }
            ];

            const typeLabelMap = { 'hoi-dap': 'Hỏi đáp', 'tu-van': 'Tư vấn chuyên sâu' };
            const typeColorMap = { 'hoi-dap': 'bg-purple-100 text-purple-800', 'tu-van': 'bg-orange-100 text-orange-800' };
            const statusColorMap = {
                'dang-xu-ly': 'bg-blue-100 text-blue-800',
                'da-hoan-thanh': 'bg-green-100 text-green-800',
                'da-tu-choi': 'bg-red-100 text-red-800',
            };
            const statusLabelMap = {
                'dang-xu-ly': 'Đang xử lý',
                'da-hoan-thanh': 'Đã hoàn thành',
                'da-tu-choi': 'Đã từ chối'
            };

            const filteredFields = useMemo(() => {
                if (!fieldSearchTerm) return allFields;
                const normalized = fieldSearchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
                return allFields.filter(f => f.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').includes(normalized));
            }, [allFields, fieldSearchTerm]);

            const filteredTypeOpts = useMemo(() => {
                if (!typeSearchTerm) return typeOptions;
                return typeOptions.filter(s => s.label.toLowerCase().includes(typeSearchTerm.toLowerCase()));
            }, [typeSearchTerm]);

            const isWithinTimePeriod = (dateStr, period) => {
                const date = parseDate(dateStr);
                if (!date) return false;
                const now = new Date();
                switch (period) {
                    case 'today':
                        return date.toDateString() === now.toDateString();
                    case 'week': {
                        const startOfWeek = new Date(now);
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        return date >= startOfWeek;
                    }
                    case 'month':
                        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    case 'quarter': {
                        const quarter = Math.floor(now.getMonth() / 3);
                        return Math.floor(date.getMonth() / 3) === quarter && date.getFullYear() === now.getFullYear();
                    }
                    case 'year':
                        return date.getFullYear() === now.getFullYear();
                    default:
                        return true;
                }
            };

            const filteredStatusOpts = useMemo(() => {
                if (!statusSearchTerm) return statusOptions;
                return statusOptions.filter(s => s.label.toLowerCase().includes(statusSearchTerm.toLowerCase()));
            }, [statusSearchTerm]);

            const parseDate = (dateStr) => {
                if (!dateStr) return null;
                const parts = dateStr.split('/');
                if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
                return null;
            };

            const parseInputDate = (dateStr) => {
                if (!dateStr) return null;
                const parts = dateStr.split('-');
                if (parts.length === 3) return new Date(parts[0], parts[1] - 1, parts[2]);
                return null;
            };

            const filteredData = allData.filter(item => {
                let match = true;
                if (searchTerm) {
                    const kw = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
                    const title = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
                    match = match && title.includes(kw);
                }
                if (selectedFields.length > 0) {
                    match = match && selectedFields.includes(item.field);
                }
                if (selectedTypes.length > 0) {
                    match = match && selectedTypes.includes(item.type);
                }
                if (selectedStatuses.length > 0) {
                    match = match && selectedStatuses.includes(item.status);
                }
                if (draftTimePeriod && draftTimePeriod !== 'custom') {
                    match = match && isWithinTimePeriod(item.date, draftTimePeriod);
                }
                if (draftTuNgay || draftDenNgay) {
                    const itemDate = parseDate(item.date);
                    if (itemDate) {
                        if (draftTuNgay && draftDenNgay) {
                            const tuNgay = parseInputDate(draftTuNgay);
                            const denNgay = parseInputDate(draftDenNgay);
                            match = match && itemDate >= tuNgay && itemDate <= denNgay;
                        } else if (draftTuNgay) {
                            const tuNgay = parseInputDate(draftTuNgay);
                            match = match && itemDate >= tuNgay;
                        } else if (draftDenNgay) {
                            const denNgay = parseInputDate(draftDenNgay);
                            match = match && itemDate <= denNgay;
                        }
                    }
                }
                return match;
            });

            filteredData.sort((a, b) => {
                const dateA = parseDate(a.date);
                const dateB = parseDate(b.date);
                return dateB - dateA;
            });

            const totalItems = filteredData.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
            const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

            const handleSearch = () => {
                if (draftTuNgay && draftDenNgay && parseInputDate(draftTuNgay) > parseInputDate(draftDenNgay)) {
                    alert('Từ ngày phải trước hoặc bằng Đến ngày');
                    return;
                }
                setHasSearched(true);
                setSearchTerm(draftSearch);
                setSelectedFields(draftFields);
                setSelectedTypes(draftTypes);
                setSelectedStatuses(draftStatuses);
                setCurrentPage(1);
                setIsFieldOpen(false);
                setIsTypeOpen(false);
                setIsStatusOpen(false);
            };

            const handleClear = () => {
                setHasSearched(false);
                setDraftSearch('');
                setDraftFields([]);
                setDraftTypes([]);
                setDraftStatuses([]);
                setDraftTuNgay('');
                setDraftDenNgay('');
                setDraftTimePeriod('');
                setSearchTerm('');
                setSelectedFields([]);
                setSelectedTypes([]);
                setSelectedStatuses([]);
                setIsFieldOpen(false);
                setIsTypeOpen(false);
                setIsStatusOpen(false);
                setIsTimeOpen(false);
                setFieldSearchTerm('');
                setTypeSearchTerm('');
                setStatusSearchTerm('');
                setCurrentPage(1);
            };

            const handlePageChange = (newPage) => {
                if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
            };

            const toggleExpand = (id) => {
                setExpandedId(expandedId === id ? null : id);
            };

            const handleDownload = (file) => {
                if (file && file.url) {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Không thể tải file. Vui lòng thử lại.');
                }
            };

            const getFileIcon = (fileName) => {
                const ext = fileName ? fileName.split('.').pop().toLowerCase() : '';
                if (ext === 'pdf') return '📄';
                if (['doc', 'docx'].includes(ext)) return '📝';
                if (['xls', 'xlsx'].includes(ext)) return '📊';
                return '📄';
            };

            // Detail view for consultation items
            if (selectedDetail) {
                const item = tuVanData.find(i => i.id === selectedDetail);
                if (!item) return null;
                return (
                    <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="mb-4">
                                <button onClick={() => setSelectedDetail(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition flex items-center gap-2 text-[14px]">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    Quay lại
                                </button>
                            </div>

                            <h2 className="text-[28px] font-bold text-[#1b2b49] mb-6">{item.title}</h2>

                            <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Tư vấn chuyên sâu</span>
                                <span className="text-[13px] font-medium px-3 py-1 rounded bg-[#e8f0fe] text-[#2580f0]">{item.field}</span>
                                <span className="text-[13px] text-gray-500">Chuyên gia: {item.advisor}</span>
                                <span className="text-[13px] text-gray-500">Ngày gửi: {item.date}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabelMap[item.status]}</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-[18px] font-bold text-[#1b2b49] mb-3">Yêu cầu tư vấn</h3>
                                <div className="bg-[#f8f9fc] rounded-lg p-6">
                                    <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{item.question}</p>
                                </div>
                            </div>

                            {item.status === 'da-hoan-thanh' && item.answer && (
                                <div className="mb-6">
                                    <h3 className="text-[18px] font-bold text-[#1b2b49] mb-3">Kết quả tư vấn</h3>
                                    <div className="bg-[#f0f7ff] rounded-lg p-6">
                                        <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</p>
                                    </div>
                                </div>
                            )}

                            {item.status === 'dang-xu-ly' && (
                                <div className="mb-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                                        Yêu cầu đang được xử lý, vui lòng đợi chuyên gia trả lời.
                                    </div>
                                </div>
                            )}

                            {item.status === 'da-tu-choi' && (
                                <div className="mb-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                                        Yêu cầu đã bị từ chối.
                                    </div>
                                </div>
                            )}

                            {item.attachments && item.attachments.length > 0 && (
                                <div className="border-t border-[#E0E0E0] pt-6">
                                    <h4 className="font-bold text-[#1b2b49] mb-4 uppercase text-[15px]">Tài liệu đính kèm</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {item.attachments.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-[#1E88E5] transition-colors bg-white shadow-sm">
                                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                                    <div className="shrink-0 scale-90 origin-center">{getFileIcon(file.name)}</div>
                                                    <div className="flex flex-col overflow-hidden w-full">
                                                        <p className="text-[#1E88E5] font-medium text-[14px] truncate">{file.name}</p>
                                                        <p className="text-gray-400 text-[12px] mt-0.5">{file.size || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDownload(file)} className="shrink-0 ml-2 p-2 text-[#2580f0] hover:bg-[#f8f9fc] rounded transition">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                );
            }

            return (
                <section className="rounded-[8px] border border-[#d8e1f2] bg-white p-6 lg:p-10 shadow-sm min-h-[600px]">
                    <p className="text-[13px] font-medium text-[#66738f] mb-4">Trang chủ / {menu.label} / {subPage.label}</p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#dbe5ff]">
                        <h2 className="text-[28px] font-bold text-[#1b2b49]">Tra cứu lịch sử hỏi đáp/tư vấn</h2>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-lg border border-[#d8e1f2] shadow-sm mb-8">
                        <div className="p-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row gap-3 items-center">
                                    <div className="relative flex-1 w-full">
                                        <input type="text" maxLength={100} placeholder="Nhập tiêu đề để tìm kiếm..." value={draftSearch} onChange={(e) => setDraftSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2580f0] focus:ring-1 focus:ring-[#2580f0] shadow-sm text-sm" />
                                        <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button onClick={handleSearch} className="px-5 py-2 text-white bg-[#2580f0] border border-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm flex items-center justify-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            Tìm kiếm
                                        </button>
                                        <button onClick={handleClear} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center justify-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            Xóa
                                        </button>
                                        <button onClick={() => setShowAdvancedFilter(!showAdvancedFilter)} className="px-5 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-md transition shadow-sm flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                            {showAdvancedFilter ? 'Ẩn bộ lọc' : 'Bộ lọc'}
                                        </button>
                                    </div>
                                </div>
                                {/* Bộ lọc mở rộng */}
                                {showAdvancedFilter && (
                                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                                        <div className="relative w-full md:w-[180px]">
                                            <button onClick={() => { setIsFieldOpen(!isFieldOpen); setFieldSearchTerm(''); }} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-sm text-gray-700 focus:outline-none shadow-sm">
                                                <span className="truncate">{draftFields.length > 0 ? `Đã chọn: ${draftFields.length} lĩnh vực` : '-- Lĩnh vực --'}</span>
                                                <span className="text-[10px] text-gray-400">▼</span>
                                            </button>
                                            {isFieldOpen && (
                                                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-hidden flex flex-col">
                                                    <div className="p-2 border-b border-gray-200">
                                                        <input type="text" placeholder="Tìm lĩnh vực..." value={fieldSearchTerm} onChange={(e) => setFieldSearchTerm(e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#2580f0]" />
                                                    </div>
                                                    <div className="overflow-auto">
                                                        {filteredFields.map(f => (
                                                            <label key={f} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                                                                <input type="checkbox" className="mr-2 w-3 h-3 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]" checked={draftFields.includes(f)} onChange={() => { if (draftFields.includes(f)) setDraftFields(draftFields.filter(i => i !== f)); else setDraftFields([...draftFields, f]); }} />
                                                                {f}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative w-full md:w-[180px]">
                                            <button onClick={() => { setIsTypeOpen(!isTypeOpen); setTypeSearchTerm(''); }} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-sm text-gray-700 focus:outline-none shadow-sm">
                                                <span className="truncate">{draftTypes.length > 0 ? `Đã chọn: ${draftTypes.length} loại` : '-- Phân loại --'}</span>
                                                <span className="text-[10px] text-gray-400">▼</span>
                                            </button>
                                            {isTypeOpen && (
                                                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-hidden flex flex-col">
                                                    <div className="p-2 border-b border-gray-200">
                                                        <input type="text" placeholder="Tìm loại..." value={typeSearchTerm} onChange={(e) => setTypeSearchTerm(e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#2580f0]" />
                                                    </div>
                                                    <div className="overflow-auto">
                                                        {filteredTypeOpts.map(t => (
                                                            <label key={t.value} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                                                                <input type="checkbox" className="mr-2 w-3 h-3 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]" checked={draftTypes.includes(t.value)} onChange={() => { if (draftTypes.includes(t.value)) setDraftTypes(draftTypes.filter(i => i !== t.value)); else setDraftTypes([...draftTypes, t.value]); }} />
                                                                {t.label}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative w-full md:w-[180px]">
                                            <button onClick={() => { setIsStatusOpen(!isStatusOpen); setStatusSearchTerm(''); }} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-sm text-gray-700 focus:outline-none shadow-sm">
                                                <span className="truncate">{draftStatuses.length > 0 ? `Đã chọn: ${draftStatuses.length} trạng thái` : '-- Trạng thái --'}</span>
                                                <span className="text-[10px] text-gray-400">▼</span>
                                            </button>
                                            {isStatusOpen && (
                                                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-hidden flex flex-col">
                                                    <div className="p-2 border-b border-gray-200">
                                                        <input type="text" placeholder="Tìm trạng thái..." value={statusSearchTerm} onChange={(e) => setStatusSearchTerm(e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#2580f0]" />
                                                    </div>
                                                    <div className="overflow-auto">
                                                        {filteredStatusOpts.map(s => (
                                                            <label key={s.value} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                                                                <input type="checkbox" className="mr-2 w-3 h-3 text-[#2580f0] rounded border-gray-300 focus:ring-[#2580f0]" checked={draftStatuses.includes(s.value)} onChange={() => { if (draftStatuses.includes(s.value)) setDraftStatuses(draftStatuses.filter(i => i !== s.value)); else setDraftStatuses([...draftStatuses, s.value]); }} />
                                                                {s.label}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative w-full md:w-[180px]">
                                            <button onClick={() => { setIsTimeOpen(!isTimeOpen); }} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between text-left text-sm text-gray-700 focus:outline-none shadow-sm">
                                                <span className="truncate">{draftTimePeriod ? timePeriodOptions.find(t => t.value === draftTimePeriod)?.label : '-- Thời gian --'}</span>
                                                <span className="text-[10px] text-gray-400">▼</span>
                                            </button>
                                            {isTimeOpen && (
                                                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-hidden flex flex-col">
                                                    {timePeriodOptions.map(t => (
                                                        <label key={t.value} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700">
                                                            <input type="radio" name="timePeriod" className="mr-2 w-3 h-3 text-[#2580f0] border-gray-300 focus:ring-[#2580f0]" checked={draftTimePeriod === t.value} onChange={() => { setDraftTimePeriod(t.value); setIsTimeOpen(false); }} />
                                                            {t.label}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {(draftTimePeriod === 'custom' || (!draftTimePeriod && (draftTuNgay || draftDenNgay))) && (
                                            <div className="flex items-center gap-2 w-full md:w-auto">
                                                <input type="date" value={draftTuNgay} onChange={(e) => setDraftTuNgay(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#2580f0]" placeholder="Từ ngày" />
                                                <span className="text-gray-500 text-sm">-</span>
                                                <input type="date" value={draftDenNgay} onChange={(e) => setDraftDenNgay(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#2580f0]" placeholder="Đến ngày" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {!hasSearched ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium text-gray-500">Vui lòng nhập điều kiện tìm kiếm và nhấn nút "Tìm kiếm" để tra cứu</p>
                        </div>
                    ) : currentItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-[15px] font-medium">Không tìm thấy kết quả</p>
                        </div>
                    ) : (
                        <div className="space-y-4 mb-8">
                            {currentItems.map(item => (
                                <div key={item.id} className={item.type === 'hoi-dap' ? "border border-gray-200 rounded-lg overflow-hidden hover:border-[#2580f0] hover:shadow-sm transition" : "border border-gray-200 rounded-lg p-4 hover:border-[#2580f0] hover:shadow-sm transition cursor-pointer"} onClick={() => { if (item.type === 'tu-van') setSelectedDetail(item.id); else toggleExpand(item.id); }}>
                                    {item.type === 'hoi-dap' ? (
                                        <>
                                            <div className="p-4 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColorMap[item.type]}`}>{typeLabelMap[item.type]}</span>
                                                        <h4 className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition">{item.title}</h4>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabelMap[item.status]}</span>
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field}</span>
                                                        <span>{item.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {expandedId === item.id && (
                                                <div className="px-4 pb-4">
                                                    {item.status === 'dang-xu-ly' && (
                                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                                                            Câu hỏi đang được xử lý, vui lòng đợi chuyên gia trả lời.
                                                        </div>
                                                    )}
                                                    {item.status === 'da-tu-choi' && (
                                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                                                            Câu hỏi đã bị từ chối trả lời.
                                                        </div>
                                                    )}
                                                    {item.status === 'da-hoan-thanh' && item.answer && (
                                                        <div className="bg-[#f8f9fc] rounded-lg p-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-sm font-semibold text-[#2580f0]">Câu trả lời:</span>
                                                            </div>
                                                            <p className="text-sm text-gray-700">{item.answer}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColorMap[item.type]}`}>{typeLabelMap[item.type]}</span>
                                                    <h4 className="text-[15px] font-semibold text-[#1b2b49] hover:text-[#2580f0] transition line-clamp-2">{item.title}</h4>
                                                </div>
                                                {item.question && (
                                                    <p className="text-[13px] text-gray-600 mt-2 line-clamp-2">{item.question}</p>
                                                )}
                                                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabelMap[item.status]}</span>
                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{item.field}</span>
                                                    <span>Chuyên gia: {item.advisor}</span>
                                                    <span>{item.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {hasSearched && totalPages > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dbe5ff] pt-6 mt-6">
                            <div className="flex items-center gap-4">
                                <div className="text-[14px] text-gray-600 font-medium">
                                    Hiển thị <strong className="text-[#212121]">{currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong>-<strong className="text-[#212121]">{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong className="text-[#212121]">{totalItems}</strong> bản ghi
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === 1 ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Trước</button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center border rounded text-[14px] font-bold transition shadow-sm ${currentPage === i + 1 ? 'border-[#2580f0] bg-[#2580f0] text-white' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] bg-white'}`}>{i + 1}</button>
                                    ))}
                                </div>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1.5 border rounded text-[14px] font-medium ${currentPage === totalPages ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' : 'border-[#d8e1f2] text-[#1b2b49] hover:bg-[#f8f9fc] shadow-sm'}`}>Sau</button>
                            </div>
                        </div>
                    )}
                </section>
            );
        }

        function LoginPopup({ isOpen, onClose, onLogin }) {
            if (!isOpen) return null;
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e2e8f0] flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2580f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#1b2b49] mb-2">Yêu cầu đăng nhập</h3>
                                <p className="text-gray-600">Vui lòng đăng nhập để tiếp tục</p>
                            </div>
                            <div className="flex justify-center gap-3">
                                <button onClick={onLogin} className="min-w-[120px] px-8 py-2.5 text-white bg-[#2580f0] rounded-md font-semibold hover:bg-[#1e63dc] transition shadow-sm text-center">
                                    Đăng nhập
                                </button>
                                <button onClick={onClose} className="min-w-[120px] px-8 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition text-center">
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // const root = ReactDOM.createRoot(document.getElementById("root"));
        // root.render(<App />);

// ==========================================
// 3. MAIN PAGE WRAPPER COMPONENT
// ==========================================
export default function HoTroPhapLyDNPage() {
    const navItems = NAV_ITEMS;
    
    // We inject the App render logic here
            const [activeMenu, setActiveMenu] = useState(null);
            const prevMenuKeyRef = useRef("trang-chu");
            const prevSubKeyRef = useRef(null);
            const [route, setRoute] = useState({
                page: "home",
                menuKey: "trang-chu",
                subKey: null,
                articleId: null,
                previewFileName: null
            });
            const [showAccountMenu, setShowAccountMenu] = useState(false);
            const [showHistory, setShowHistory] = useState(false);
            const [isLoggedIn, setIsLoggedIn] = useState(false);
            const [showLoginPopup, setShowLoginPopup] = useState(false);
            const [pendingAction, setPendingAction] = useState(null); // { type: 'sendQuestion', menuKey, subKey }

            // Update refs when route changes
            useEffect(() => {
                if (route.menuKey) prevMenuKeyRef.current = route.menuKey;
                if (route.subKey) prevSubKeyRef.current = route.subKey;
            }, [route.menuKey, route.subKey]);

            const currentMenu = useMemo(() => navItems.find((item) => item.key === route.menuKey) || navItems[0], [route.menuKey]);
            
            const currentSubPage = useMemo(() => {
                if (!currentMenu?.children?.length) return null;
                const found = currentMenu.children.find((child) => child.key === route.subKey);
                if (found) return found;
                // Nếu không tìm thấy subKey trong children, trả về object giả định thay vì fallback
                if (route.subKey) return { key: route.subKey, label: route.subKey === "longform" ? "Longform" : route.subKey };
                return currentMenu.children[0];
            }, [currentMenu, route.subKey]);

            const currentItems = useMemo(() => {
                if (!currentSubPage) return [];
                return contentBySubPage[currentSubPage.key] || [
                    { id: 99, title: `Danh sách chuyên mục ${currentSubPage.label}`, summary: "Nội dung đang được cập nhật...", date: "06/04/2026", attachments: [{ name: `TaiLieu_${currentSubPage.key}.pdf`, url: "#"}] }
                ];
            }, [currentSubPage]);

            // Tìm article chi tiết - tìm theo subKey của route, sau đó tìm trong tất cả
            let currentArticle = null;
            if (route.articleId) {
                // Tìm trong tất cả các subpage, ưu tiên subKey trùng with route.subKey
                const preferredKey = route.subKey;
                // Tìm ở preferredKey trước
                if (preferredKey && contentBySubPage[preferredKey]) {
                    const found = contentBySubPage[preferredKey].find(item => item.id == route.articleId);
                    if (found) {
                        currentArticle = { ...found, _subKey: preferredKey };
                    }
                }
                // Nếu không thấy, tìm ở các key khác
                if (!currentArticle) {
                    for (const [subKey, items] of Object.entries(contentBySubPage)) {
                        const found = items.find(item => item.id == route.articleId);
                        if (found) {
                            currentArticle = { ...found, _subKey: subKey };
                            break;
                        }
                    }
                }
                console.log('[DEBUG] route.articleId:', route.articleId, 'route.subKey:', route.subKey, 'currentArticle:', currentArticle);
            }

            const navigateHome = () => {
                setRoute({ page: "home", menuKey: "trang-chu", subKey: null, articleId: null, previewFileName: null });
                window.scrollTo({top: 0, behavior: 'smooth'});
            };
            
            const navigateToList = (menuKey, subKey) => {
                const menu = navItems.find((item) => item.key === menuKey);
                const fallbackSub = subKey || menu?.children?.[0]?.key || null;
                setRoute({ page: "list", menuKey, subKey: fallbackSub, articleId: null, previewFileName: null });
                window.scrollTo({top: 0, behavior: 'smooth'});
            };

            const navigateToDetail = (article) => {
                // Tìm menuKey và subKey bằng cách search trong contentBySubPage
                let foundMenuKey = article.menuKey;
                let foundSubKey = article.subKey;
                if (!foundMenuKey || !foundSubKey) {
                    const menuSubMap = {
                        "tin-tuc-noi-bat": { menuKey: "hoat-dong-trung-tam", subKey: "tin-tuc-noi-bat" },
                        "thong-bao": { menuKey: "hoat-dong-trung-tam", subKey: "thong-bao" },
                        "su-kien": { menuKey: "hoat-dong-trung-tam", subKey: "su-kien" },
                        "hoat-dong-phoi-hop": { menuKey: "hoat-dong-trung-tam", subKey: "hoat-dong-phoi-hop" },
                        "multimedia": { menuKey: "hoat-dong-trung-tam", subKey: "multimedia" },
                        "longform": { menuKey: "hoat-dong-trung-tam", subKey: "longform" },
                        "van-ban-moi-ban-hanh": { menuKey: "van-ban-chinh-sach-moi", subKey: "van-ban-moi-ban-hanh" },
                        "van-ban-phap-luat": { menuKey: "van-ban-chinh-sach-moi", subKey: "van-ban-phap-luat" },
                        "bai-giang-truc-tuyen": { menuKey: "dao-tao", subKey: "bai-giang-truc-tuyen" },
                        "tai-lieu-boi-duong": { menuKey: "dao-tao", subKey: "tai-lieu-boi-duong" },
                        "ke-hoach-dao-tao": { menuKey: "dao-tao", subKey: "ke-hoach-dao-tao" },
                        "khoa-hoc": { menuKey: "dao-tao", subKey: "khoa-hoc" },
                        "hoi-dap-phap-luat": { menuKey: "tu-van-phap-luat", subKey: "hoi-dap-phap-luat" },
                        "tu-van-chuyen-sau": { menuKey: "tu-van-phap-luat", subKey: "tu-van-chuyen-sau" },
                        "bieu-mau-hop-dong": { menuKey: "tu-van-phap-luat", subKey: "bieu-mau-hop-dong" },
                        "tai-lieu-htpl": { menuKey: "tu-van-phap-luat", subKey: "tai-lieu-htpl" },
                        "vu-viec-dien-hinh": { menuKey: "tu-van-phap-luat", subKey: "vu-viec-dien-hinh" },
                        "bai-viet-chuyen-gia": { menuKey: "hoat-dong-trung-tam", subKey: "bai-viet-chuyen-gia" },
                        "phong-van": { menuKey: "hoat-dong-trung-tam", subKey: "phong-van" },
                        "nghien-cuu-trao-doi-chi-tiet": { menuKey: "hoat-dong-trung-tam", subKey: "nghien-cuu-trao-doi-chi-tiet" },
                        "kinh-nghiem-thuc-tien": { menuKey: "hoat-dong-trung-tam", subKey: "kinh-nghiem-thuc-tien" },
                        "tong-quan-chuong-trinh": { menuKey: "chuong-trinh", subKey: "tong-quan-chuong-trinh" },
                        "chuong-trinh-bo-nganh": { menuKey: "chuong-trinh", subKey: "chuong-trinh-bo-nganh" },
                        "chuong-trinh-dia-phuong": { menuKey: "chuong-trinh", subKey: "chuong-trinh-dia-phuong" },
                    };
                    // Tìm subKey từ article's context hoặc dùng map
                    for (const [subKey, mapping] of Object.entries(menuSubMap)) {
                        const items = contentBySubPage[subKey];
                        if (items && items.find(i => i.id === article.id)) {
                            foundMenuKey = mapping.menuKey;
                            foundSubKey = subKey;
                            break;
                        }
                    }
                }
                setRoute({
                    page: "detail",
                    articleId: article.id || article,
                    menuKey: foundMenuKey || prevMenuKeyRef.current,
                    subKey: foundSubKey || prevSubKeyRef.current,
                    previewFileName: null
                });
                window.scrollTo({top: 0, behavior: 'smooth'});
            };
            
            const navigateToPreview = (fileData) => {
                setRoute((prev) => ({ 
                    ...prev, 
                    page: "preview", 
                    previewFileName: fileData.name || fileData.fileName || fileData.title || "Tai_lieu.pdf"
                }));
                window.scrollTo({top: 0, behavior: 'smooth'});
            };

            // Gắn vào window để các component cũ có thể truy cập được
            useEffect(() => {
                window.navigateToPreviewContext = navigateToPreview;
                window.navigateToDetailContext = navigateToDetail;
                return () => { 
                    delete window.navigateToPreviewContext; 
                    delete window.navigateToDetailContext;
                };
            }, []);

            const backToList = () => {
                setRoute((prev) => ({
                    page: "list",
                    menuKey: prev.menuKey,
                    subKey: prev.subKey,
                    articleId: null,
                    previewFileName: null
                }));
                window.scrollTo({top: 0, behavior: 'smooth'});
            };

            let newsFilterType = "field";
            if (currentSubPage && currentSubPage.key === "thong-bao") newsFilterType = "none";

            return (
                <div className="min-h-screen bg-[#f4f6fa] font-sans text-[#2f3a4d]">
                    <MegaMenuNav
                        navItems={navItems}
                        activeMenu={route.menuKey}
                        setActiveMenu={setActiveMenu}
                        navigateHome={navigateHome}
                        navigateToList={navigateToList}
                        activeSubMenu={route.subKey}
                    />

                    <div className="min-h-[calc(100vh-200px)]">
                        <LoginPopup
                            isOpen={showLoginPopup}
                            onClose={() => setShowLoginPopup(false)}
                            onLogin={() => { setIsLoggedIn(true); setShowLoginPopup(false); setPendingAction({ type: 'sendQuestion', menuKey: route.menuKey, subKey: route.subKey }); }}
                        />

                        {route.page === "home" && <HeroBanner />}

                        <main className="mx-auto max-w-[1520px] px-4 py-8 lg:px-6">
                        {route.page === "home" && (
                            <div className="space-y-8">
                                <NewsSection 
                                    newsList={newsData} 
                                    notices={thongBaoData.slice(0, 5)} 
                                    taiLieuHTPL={taiLieuHTPLData}
                                    navigateToList={navigateToList} 
                                    navigateToDetail={navigateToDetail}
                                />
                                <HomeDocumentsSection 
                                    policyDocs={policyDocs} 
                                    faqs={faqs} 
                                    resources={resources} 
                                    navigateToList={navigateToList} 
                                />
                                <HomeMediaAndFormsSection 
                                    forms={bieuMauData} 
                                    media={mediaData} 
                                    navigateToList={navigateToList} 
                                />
                            </div>
                        )}
                        {route.page === "list" && currentMenu && currentSubPage && (
                            currentSubPage.key === "lien-he" ? (
                                <ContactPage 
                                    menu={currentMenu} 
                                    subPage={currentSubPage} 
                                    data={contactData} 
                                    onBack={navigateHome} 
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentSubPage.key === "co-cau-to-chuc" ? (
                                <OrgChartPage 
                                    menu={currentMenu} 
                                    subPage={currentSubPage} 
                                    data={orgChartData} 
                                    onBack={navigateHome} 
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentSubPage.key === "chuc-nang-nhiem-vu" ? (
                                <FunctionDutyPage 
                                    menu={currentMenu} 
                                    subPage={currentSubPage} 
                                    data={functionDutyData} 
                                />
                            ) : currentSubPage.key === "chuong-trinh-lien-nganh-intro" ? (
                                <LienNganhProgramPage 
                                    menu={currentMenu} 
                                    subPage={currentSubPage} 
                                    data={lienNganhData} 
                                    onBack={navigateHome} 
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentSubPage.key === "bieu-mau-hop-dong" ? (
                                <FormListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentSubPage.key === "tai-lieu-htpl" ? (
                                <TaiLieuHTPLListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentSubPage.key === "van-ban-phap-luat" ? (
                                <VanBanPhapLuatListPage 
                                    menu={currentMenu} 
                                    subPage={currentSubPage} 
                                    items={currentItems} 
                                    navigateToDetail={navigateToDetail} 
                                />
                            ) : currentSubPage.key === "multimedia" ? (
                                <MultimediaListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    navigateToList={navigateToList}
                                />
                            ) : currentSubPage.key === "longform" ? (
                                <LongformListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                />
                            ) : currentSubPage.key === "bai-giang-truc-tuyen" ? (
                                <VideoListPage 
                                    menu={currentMenu} 
                                    subPage={currentSubPage} 
                                    items={currentItems} 
                                    navigateToDetail={navigateToDetail} 
                                />
                            ) : currentSubPage.key === "tin-tuc-noi-bat" ? (
                                <ProgramListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    filterOptions={{ label: 'Lĩnh vực', field: 'field' }}
                                />
                            ) : currentSubPage.key === "su-kien" ? (
                                <ProgramListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    filterOptions={{ label: 'Lĩnh vực', field: 'field' }}
                                />
                            ) : currentSubPage.key === "hoat-dong-phoi-hop" ? (
                                <ProgramListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    filterOptions={{ label: 'Lĩnh vực', field: 'field' }}
                                />
                            ) : currentSubPage.key === "thong-bao" ? (
                                <NewsListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    filterType="none"
                                    listCols={2}
                                />
                            ) : ["van-ban-moi-ban-hanh", "bai-viet-chuyen-gia", "phong-van", "nghien-cuu-trao-doi-chi-tiet", "kinh-nghiem-thuc-tien"].includes(currentSubPage.key) ? (
                                <NewsListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    filterType={newsFilterType}
                                />
                            ) : ["tong-quan-chuong-trinh", "chuong-trinh-bo-nganh", "chuong-trinh-dia-phuong"].includes(currentSubPage.key) ? (
                                <ProgramListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    filterOptions={currentSubPage.key === "chuong-trinh-bo-nganh" ? { label: 'Bộ, ngành', field: 'field', values: ['Bộ Y tế', 'Bộ Kế hoạch và Đầu tư', 'Bộ Tài chính', 'Bộ Công Thương'] } : currentSubPage.key === "chuong-trinh-dia-phuong" ? { label: 'Tỉnh/thành phố', field: 'province', values: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'] } : undefined}
                                />
                            ) : currentSubPage.key === "ke-hoach-dao-tao" ? (
                                <KeHoachDaoTaoListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                />
                            ) : currentSubPage.key === "khoa-hoc" ? (
                                <KhoaHocListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                />
                            ) : currentSubPage.key === "hoi-dap-phap-luat" ? (
                                <HoiDapPhapLuatListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    isLoggedIn={isLoggedIn}
                                    onRequireLogin={() => setShowLoginPopup(true)}
                                    onLoginSuccess={() => { setIsLoggedIn(true); setShowLoginPopup(false); setPendingAction({ type: 'sendQuestion', menuKey: route.menuKey, subKey: route.subKey }); }}
                                    onLogout={() => setIsLoggedIn(false)}
                                />
                            ) : currentSubPage.key === "lich-su-hoi-dap-tu-van" ? (
                                <LichSuHoiDapTuVanPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    backToList={backToList}
                                />
                            ) : currentSubPage.key === "tra-cuu-lich-su-hoi-dap-tu-van" ? (
                                <TraCuuLichSuHoiDapTuVanPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    backToList={backToList}
                                />
                            ) : currentSubPage.key === "tu-van-chuyen-sau" ? (
                                <TuVanChuyenSauListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    isLoggedIn={isLoggedIn}
                                    onRequireLogin={() => setShowLoginPopup(true)}
                                    onLoginSuccess={() => { setIsLoggedIn(true); setShowLoginPopup(false); setPendingAction({ type: 'sendRequest', menuKey: route.menuKey, subKey: route.subKey }); }}
                                    onLogout={() => setIsLoggedIn(false)}
                                />
                            ) : currentSubPage.key === "mang-luoi-tu-van-vien" ? (
                                <MangLuoiTuVanVienPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    data={currentItems}
                                    navigateToDetail={navigateToDetail}
                                />
                            ) : currentSubPage.key === "vu-viec-dien-hinh" ? (
                                <VuViecDienHinhListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                />
                            ) : (
                                <CategoryListPage
                                    menu={currentMenu}
                                    subPage={currentSubPage}
                                    items={currentItems}
                                    navigateToDetail={navigateToDetail}
                                    navigateToPreview={navigateToPreview}
                                />
                            )
                        )}
                        {route.page === "detail" && currentArticle && (
                            (currentArticle._subKey === "khoa-hoc") ? (
                                <KhoaHocDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Khóa học" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : (currentArticle._subKey === "ke-hoach-dao-tao") ? (
                                <KeHoachDaoTaoDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Kế hoạch đào tạo" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : (currentArticle._subKey === "bieu-mau-hop-dong" || currentArticle._subKey === "tai-lieu-boi-duong") ? (
                                <FormDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Biểu mẫu, hợp đồng" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentArticle._subKey === "van-ban-phap-luat" ? (
                                <VanBanPhapLuatDetailPage
                                    articleId={route.articleId}
                                    items={currentItems}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentArticle._subKey === "bai-giang-truc-tuyen" || currentArticle.type === 'video' ? (
                                <VideoDetailPage
                                    articleId={route.articleId}
                                    items={currentItems}
                                    backToList={backToList}
                                    navigateToDetail={navigateToDetail}
                                />
                            ) : currentArticle.type === 'longform' ? (
                                <LongformDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Longform" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentArticle._subKey === "tu-van-chuyen-sau" ? (
                                <TuVanChuyenSauDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Tư vấn chuyên sâu" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentArticle._subKey === "vu-viec-dien-hinh" ? (
                                <VuViecPhapLyDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Vụ việc điển hình" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                />
                            ) : currentArticle._subKey === "tai-lieu-htpl" ? (
                                <TaiLieuHTPLDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "Tài liệu HTPL doanh nghiệp" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : currentArticle.isNews ? (
                                <NewsDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            ) : (
                                <CategoryDetailPage
                                    menu={currentMenu}
                                    subPage={currentSubPage || { label: "" }}
                                    article={currentArticle}
                                    backToList={backToList}
                                    navigateToPreview={navigateToPreview}
                                />
                            )
                        )}
                        {route.page === "preview" && (
                            <DocumentPreviewPage
                                file={{ fileName: route.previewFileName }}
                                onBack={backToList}
                            />
                        )}
                    </main>
                    </div> {/* Close min-h */}
                    <ConsultationHistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} />
                </div>
            );
        }


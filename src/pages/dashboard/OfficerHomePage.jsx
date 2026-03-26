import React, { useState, useEffect } from 'react';
import { CloudSun, MessageSquare, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALL_ITEMS } from '../../data/personalizationData';

const NumberWidget = () => (
    <div className="flex flex-col flex-1 justify-center p-2 mb-4">
        <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center shadow-inner shrink-0">
                <MessageSquare size={32} />
            </div>
            <div className="flex-1">
                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">1,492</h3>
                <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wide">Tổng tài liệu duyệt</p>
            </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
            <span className="text-green-700 text-xs font-bold bg-green-100/80 border border-green-200 px-2 py-1 rounded-md flex items-center">
                +12.5%
            </span>
            <span className="text-gray-500 text-sm font-medium">so với tháng trước</span>
        </div>
    </div>
);

const SimpleBarChart = () => {
    const data = [12, 19, 15, 25, 22, 30];
    const max = 30;
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    return (
        <div className="flex flex-col h-full flex-1 w-full relative">
            <div className="flex justify-between items-end flex-1 gap-2 sm:gap-4 w-full h-full min-h-[140px] pt-6 relative px-2">
                <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-200"></div>
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-200"></div>
                <div className="absolute bottom-6 left-0 right-0 border-t border-gray-300"></div>

                {data.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group z-10 relative">
                        <div
                            className="bg-blue-500 group-hover:bg-orange-500 rounded-t-md w-full max-w-[40px] transition-colors duration-300 relative"
                            style={{ height: `${(val / max) * 100}%` }}
                        >
                            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-medium">
                                {val}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-2 pt-2">
                {months.map((month, idx) => (
                    <div key={idx} className="flex-1 text-center text-xs text-gray-500 font-semibold">{month}</div>
                ))}
            </div>
        </div>
    );
};

const SimplePieChart = () => {
    return (
        <div className="flex flex-col items-center justify-center p-2 flex-1 w-full">
            <div
                className="w-36 h-36 rounded-full shadow-inner transform hover:scale-105 transition-transform duration-500 relative"
                style={{
                    background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 90%, #6366f1 90% 100%)'
                }}
            >
                <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-gray-400 font-bold"><PieChart size={24} /></span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-8 w-full">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-sm shrink-0"></span> Đất đai</div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shrink-0"></span> Tin nóng</div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shrink-0"></span> Doanh nghiệp</div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium"><span className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-sm shrink-0"></span> Khác</div>
            </div>
        </div>
    );
};

const DEFAULT_BLOCKS = [
    { id: 'dat-dai', viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' },
    { id: 'news-tin-nong', viewMode: 'list', width: '50', recordCount: 10, sortOrder: 'most_viewed' },
    { id: 'forum-luat-su', viewMode: 'card', width: '50', recordCount: 5, sortOrder: 'most_commented' },
];

const OfficerHomePage = () => {
    const { user } = useAuth();
    const [orderedBlocks, setOrderedBlocks] = useState(() => {
        const saved = localStorage.getItem('officerOrderedBlocks');
        return saved ? JSON.parse(saved) : DEFAULT_BLOCKS;
    });

    useEffect(() => {
        const handler = () => {
            const saved = localStorage.getItem('officerOrderedBlocks');
            if (saved) setOrderedBlocks(JSON.parse(saved));
        };
        window.addEventListener('officerSettingsUpdated', handler);
        return () => window.removeEventListener('officerSettingsUpdated', handler);
    }, []);
    const today = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    return (
        <div className="pb-12 animate-fadeIn space-y-6">

            {/* Top Weather & Greeting Section */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-cyan-50/80 rounded-xl shadow-sm border border-indigo-100/60 p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden animate-slideUpFade">
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-300/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex-1 pl-4 md:pl-6">
                    <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-2">
                        Xin chào, <Link to="/can-bo/ho-so" className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors">{user?.name || 'Nguyễn Anh Quân'}</Link>
                    </h1>
                    <p className="text-gray-600 italic flex items-center gap-2">
                        "Luật pháp là nghệ thuật của cái thiện và sự công bằng."
                    </p>
                </div>

                <div className="relative z-10 flex items-center justify-end w-full md:w-auto bg-white/50 backdrop-blur-md p-4 rounded-xl border border-white/80 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center">
                            <CloudSun size={52} className="text-amber-500 drop-shadow-sm" strokeWidth={1.5} />
                            <div className="ml-3 flex items-start">
                                <span className="text-4xl font-bold text-gray-800 tracking-tighter">27</span>
                                <div className="text-gray-500 font-medium text-lg mt-1 ml-1">&deg;C <span className="text-gray-300 font-light mx-1">|</span> &deg;F</div>
                            </div>
                        </div>

                        <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>

                        <div className="text-sm text-gray-600 space-y-0.5 hidden sm:block min-w-[140px]">
                            <p className="flex justify-between">Khả năng có mưa: <span className="font-semibold text-gray-800">25%</span></p>
                            <p className="flex justify-between">Độ ẩm: <span className="font-semibold text-gray-800">66%</span></p>
                            <p className="flex justify-between">Gió: <span className="font-semibold text-gray-800">19 km/h</span></p>
                        </div>

                        <div className="h-12 w-px bg-gray-200"></div>

                        <div className="text-right pl-2">
                            <h3 className="text-xl font-bold text-gray-800 leading-tight">Thời tiết</h3>
                            <p className="text-sm text-gray-500">{days[today.getDay()]}</p>
                            <p className="text-sm text-gray-500">Nhiều mây</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configured Layout Preview */}
            <div className="flex flex-wrap -mx-3 md:-mx-4 lg:-mx-5">
                {orderedBlocks.map((block, idx) => {
                    const itemDef = ALL_ITEMS.find(i => i.id === block.id);
                    if (!itemDef) return null;

                    const isFifty = block.width === '50';
                    const isStatistic = block.id.startsWith('stat-');

                    let wClass = 'w-full';
                    if (block.width === '50') wClass = 'w-full lg:w-1/2';
                    if (block.width === '33') wClass = 'w-full lg:w-1/3 md:w-1/2';
                    if (block.width === '25') wClass = 'w-full xl:w-1/4 md:w-1/2';

                    return (
                        <div
                            key={`officer-home-${block.id}`}
                            className={`${wClass} px-3 md:px-4 lg:px-5 mb-6 md:mb-8 lg:mb-10 animate-slideUpFade`}
                            style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                        >
                            <div className="bg-white p-5 sm:p-6 lg:p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden group">
                                <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-gray-50">
                                    <h4 className="font-bold text-xl text-gray-800 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                                        {itemDef.title}
                                    </h4>
                                    <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1">Xem chi tiết <span className="text-lg leading-none">&rsaquo;</span></span>
                                </div>

                                <div className={`flex-1 mt-2 flex flex-col ${isStatistic ? 'h-full justify-center min-h-[160px]' : ''}`}>
                                    {isStatistic ? (
                                        <>
                                            {block.id === 'stat-comments-count' && <NumberWidget />}
                                            {block.id === 'stat-comments-bar' && <SimpleBarChart />}
                                            {block.id === 'stat-topics-pie' && <SimplePieChart />}
                                        </>
                                    ) : block.viewMode === 'card' ? (
                                        <div className={`grid gap-5 ${isFifty ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
                                            {[...Array(isFifty ? 2 : 4)].map((_, i) => (
                                                <div key={i} className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 shadow-sm transition-all group/card cursor-pointer">
                                                    <div className="h-40 bg-gray-100 relative overflow-hidden">
                                                        <img src={itemDef.thumbnail} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" alt="" />
                                                    </div>
                                                    <div className="p-4 flex flex-col flex-1">
                                                        <h5 className="font-bold text-[15px] leading-snug line-clamp-2 text-gray-800 group-hover/card:text-blue-700 transition-colors mb-2">Bản tin pháp quyết định mới nhất liên quan đến việc thi hành</h5>
                                                        <p className="text-sm text-gray-500 line-clamp-2 mt-auto">Mô tả thông tin chi tiết dành cho khối cán bộ nhà nước.</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={`grid gap-5 ${isFifty ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 lg:gap-x-8'}`}>
                                            {[...Array(isFifty ? 3 : 6)].map((_, i) => (
                                                <div key={i} className="flex gap-4 p-3 bg-white rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all items-center cursor-pointer group/list">
                                                    <div className="w-28 h-20 sm:w-36 sm:h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                                                        <img src={itemDef.thumbnail} className="w-full h-full object-cover group-hover/list:scale-105 transition-transform duration-500" alt="" />
                                                    </div>
                                                    <div className="flex-1 py-1 flex flex-col justify-center min-w-0">
                                                        <h5 className="font-bold text-[15px] leading-snug line-clamp-2 text-gray-800 group-hover/list:text-blue-700 transition-colors mb-1.5">Tiêu đề chi tiết tài liệu {i + 1} cần duyệt</h5>
                                                        <div className="text-xs text-gray-500 flex items-center gap-3">
                                                            <span>10 phút trước</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span>Phân ban tư pháp</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OfficerHomePage;

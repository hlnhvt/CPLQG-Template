import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Landmark, Scale, Briefcase, MapPin, Clock, Search, Copy, Check, Globe, ArrowRight, ChevronLeft, ChevronRight, Flag, Building2, Users, MonitorSmartphone, ShieldCheck, Gavel } from 'lucide-react';
import { laocaiV2HotlineGroups, laocaiV2ConnectedPortals } from '../../data/laocaiV2MockData';

const TAB_ICONS = { 'so-tu-phap': Landmark, 'tro-giup-phap-ly': Scale, 'luat-su': Briefcase };
const HOTLINE_TABS = laocaiV2HotlineGroups.map((g) => ({ ...g, icon: TAB_ICONS[g.key] }));

const ITEMS_PER_PAGE = 6;

// Icon dự phòng theo từng cơ quan (khi trang liên kết không có favicon)
const PORTAL_ICONS = {
    'thanh-uy': Flag, hdnd: Landmark, ubnd: Building2, mttq: Users, 'so-tu-phap': Scale,
    'dich-vu-cong': MonitorSmartphone, congan: ShieldCheck, toaan: Gavel, 'doan-luat-su': Briefcase
};
const PORTAL_COLORS = {
    crimson: 'bg-red-50 text-red-700 border-red-200', red: 'bg-rose-50 text-rose-700 border-rose-200',
    ruby: 'bg-pink-50 text-pink-700 border-pink-200', amber: 'bg-amber-50 text-amber-700 border-amber-200',
    gold: 'bg-yellow-50 text-yellow-700 border-yellow-200', blue: 'bg-blue-50 text-blue-700 border-blue-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200', emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
};

// Logo trang liên kết: dùng favicon; nếu lỗi hoặc Google trả ảnh mặc định (16px) thì dùng icon dự phòng
const PortalLogo = ({ portal }) => {
    const [useFallback, setUseFallback] = useState(false);
    const Icon = PORTAL_ICONS[portal.id] || Globe;
    const color = PORTAL_COLORS[portal.colorTheme] || 'bg-indigo-50 text-[#2c1b92] border-indigo-200';
    return (
        <div className={`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center ${useFallback ? color : 'bg-white border-gray-200'}`}>
            {useFallback ? <Icon size={17} /> : (
                <img
                    src={`https://www.google.com/s2/favicons?domain=${portal.domain}&sz=64`}
                    alt=""
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                    onLoad={(e) => { if (e.currentTarget.naturalWidth <= 16) setUseFallback(true); }}
                    onError={() => setUseFallback(true)}
                />
            )}
        </div>
    );
};

const toTel = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

const LaoCaiV2Hotline = () => {
    const [activeTab, setActiveTab] = useState(HOTLINE_TABS[0].key);
    const [keyword, setKeyword] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const [page, setPage] = useState(1);

    const currentTab = HOTLINE_TABS.find((t) => t.key === activeTab);

    const filteredItems = useMemo(() => {
        const q = keyword.trim().toLowerCase();
        if (!q) return currentTab.items;
        return currentTab.items.filter((item) =>
            [item.name, item.unit, item.address, item.phone]
                .filter(Boolean)
                .some((v) => v.toLowerCase().includes(q))
        );
    }, [currentTab, keyword]);

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
    const pageItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleCopy = (item) => {
        navigator.clipboard?.writeText(item.phone).catch(() => {});
        setCopiedId(`${activeTab}-${item.id}`);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <section id="hotline" className="py-6 laocaiV2-animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <div className="container mx-auto px-4 max-w-[1504px] grid grid-cols-1 lg:grid-cols-10 gap-6">
                {/* CỘT TRÁI (70%): DANH BẠ HOTLINE */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm">
                    {/* Header Khối Hotline: tiêu đề chữ đơn giản, không nền màu */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                        <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                            Hotline - Đường dây nóng
                        </h2>
                        <Link
                            to="/lao-cai-v2/hotline"
                            className="group/btn inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:text-[#4f56ca] transition-colors shrink-0"
                        >
                            <span>Xem tất cả</span>
                            <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Tabs + Tìm kiếm */}
                    <div className="flex flex-col gap-2.5 mb-4">
                        <div role="tablist" className="flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                            {HOTLINE_TABS.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = tab.key === activeTab;
                                return (
                                    <button
                                        key={tab.key}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => { setActiveTab(tab.key); setKeyword(''); setPage(1); }}
                                        className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all active:scale-95 ${isActive
                                            ? 'bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] text-white border-transparent shadow-md shadow-indigo-500/25'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#4f56ca] hover:text-[#2c1b92]'
                                            }`}
                                    >
                                        <Icon size={16} className={isActive ? 'text-amber-300' : ''} />
                                        <span>{tab.label}</span>
                                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                                            {tab.items.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative w-full">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                                placeholder="Tìm theo tên đơn vị, địa chỉ, số điện thoại..."
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4f56ca] focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    {/* Danh sách số điện thoại */}
                    {filteredItems.length === 0 ? (
                        <div className="text-center text-sm text-gray-500 py-10 border border-dashed border-gray-200 rounded-xl">
                            Không tìm thấy đơn vị phù hợp với từ khóa "{keyword}".
                        </div>
                    ) : (
                        <div role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {pageItems.map((item) => {
                                const copyKey = `${activeTab}-${item.id}`;
                                return (
                                    <div
                                        key={copyKey}
                                        className={`relative flex flex-col justify-between rounded-xl p-3.5 border transition-all duration-300 hover:shadow-lg group ${item.featured
                                            ? 'bg-gradient-to-br from-amber-50 to-white border-amber-300 hover:shadow-amber-200/50'
                                            : 'bg-gray-50/60 border-gray-200 hover:border-[#4f56ca]/50 hover:shadow-indigo-100'
                                            }`}
                                    >
                                        <div className="space-y-2">
                                            <span className={`inline-block text-[11px] font-semibold uppercase px-2 py-0.5 rounded ${item.featured ? 'bg-amber-400 text-gray-950' : 'bg-indigo-50 text-[#2c1b92]'}`}>
                                                {item.unit}
                                            </span>
                                            <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#2c1b92] transition-colors" title={item.name}>
                                                {item.name}
                                            </h3>
                                            {item.address && (
                                                <div className="flex items-start gap-1.5 text-xs text-gray-600">
                                                    <MapPin size={13} className="shrink-0 mt-0.5 text-gray-400" />
                                                    <span className="line-clamp-1" title={item.address}>{item.address}</span>
                                                </div>
                                            )}
                                            {item.time && (
                                                <div className="flex items-start gap-1.5 text-xs text-gray-600">
                                                    <Clock size={13} className="shrink-0 mt-0.5 text-gray-400" />
                                                    <span className="line-clamp-1" title={item.time}>{item.time}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-gray-200/80">
                                            <a
                                                href={toTel(item.phone)}
                                                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-sm py-2 rounded-lg shadow-sm transition-all active:scale-95"
                                            >
                                                <Phone size={15} />
                                                <span>{item.phone}</span>
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(item)}
                                                title="Sao chép số điện thoại"
                                                className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-[#2c1b92] hover:border-[#4f56ca] transition-colors"
                                            >
                                                {copiedId === copyKey ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Phân trang: 6 số/trang */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-1.5 mt-4">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                aria-label="Trang trước"
                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40 transition-colors"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded-lg border text-xs font-bold transition-colors ${page === p ? 'bg-[#2c1b92] border-[#2c1b92] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-[#2c1b92] hover:text-[#2c1b92]'}`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                aria-label="Trang sau"
                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40 transition-colors"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    )}
                </div>

                {/* CỘT PHẢI (30%): THÔNG TIN LIÊN KẾT */}
                <aside className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex flex-col">
                    <div className="mb-4 pb-3 border-b border-gray-200">
                        <h2 className="text-lg sm:text-xl md:text-[21px] font-bold text-[#0f4c81]">
                            Thông tin liên kết
                        </h2>
                    </div>

                    {/* Danh sách liên kết: trên desktop cuộn trong khung để cao bằng khối Hotline */}
                    <div className="flex-1 min-h-0 relative">
                        <ul className="lg:absolute lg:inset-0 overflow-y-auto pr-1 space-y-2">
                            {laocaiV2ConnectedPortals.map((portal) => (
                                <li key={portal.id}>
                                    <a
                                        href={`https://${portal.domain}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-indigo-50/60 hover:border-[#4f56ca]/50 transition-all group"
                                    >
                                        <PortalLogo portal={portal} />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-[#2c1b92] transition-colors" title={portal.name}>
                                                {portal.name}
                                            </div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{portal.domain}</div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default LaoCaiV2Hotline;

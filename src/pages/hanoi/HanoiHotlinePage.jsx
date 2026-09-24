import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronDown, Phone, Copy, Check, RotateCw, Search } from 'lucide-react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import { hanoiHotlineGroups } from '../../data/hanoiMockData';

const ALL_KEY = 'tat-ca';
const TABS = [
    { key: ALL_KEY, label: 'Tất cả', items: hanoiHotlineGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.key }))) },
    ...hanoiHotlineGroups.map((g) => ({ ...g, items: g.items.map((i) => ({ ...i, group: g.key })) }))
];
const ITEMS_PER_PAGE = 12;
const EMPTY_ADVANCED = { unit: '', address: '', phone: '' };

const toTel = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;
const norm = (v) => (v || '').toString().toLowerCase().trim();
const escapeRegExp = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// "So sánh có chứa": chứa đủ các từ khóa (không cần đúng thứ tự)
// "Cụm từ chính xác": chứa nguyên cụm từ, khớp trọn từ
const matchKeyword = (text, keyword, mode) => {
    const t = norm(text);
    const q = norm(keyword);
    if (mode === 'exact') return new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(q)}($|[^\\p{L}\\p{N}])`, 'u').test(t);
    return q.split(/\s+/).every((w) => t.includes(w));
};

const HanoiHotlinePage = () => {
    const [activeTab, setActiveTab] = useState(ALL_KEY);
    const [keyword, setKeyword] = useState('');
    const [matchMode, setMatchMode] = useState('contains');
    const [onlyName, setOnlyName] = useState(true);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [advanced, setAdvanced] = useState(EMPTY_ADVANCED);
    // Điều kiện đã áp dụng (chỉ cập nhật khi bấm "Tìm kiếm")
    const [applied, setApplied] = useState({ keyword: '', matchMode: 'contains', onlyName: true, ...EMPTY_ADVANCED });
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        document.title = 'Hotline - Đường dây nóng - Cổng Pháp luật Hà Nội';
        window.scrollTo(0, 0);
    }, []);

    const currentTab = TABS.find((t) => t.key === activeTab);
    const unitOptions = useMemo(() => [...new Set(currentTab.items.map((i) => i.unit))], [currentTab]);

    const filteredItems = useMemo(() => currentTab.items.filter((item) => {
        if (applied.keyword.trim()) {
            const fields = applied.onlyName ? [item.name] : [item.name, item.unit, item.address, item.phone, item.time];
            if (!fields.some((f) => f && matchKeyword(f, applied.keyword, applied.matchMode))) return false;
        }
        if (applied.unit && item.unit !== applied.unit) return false;
        if (applied.address && !norm(item.address).includes(norm(applied.address))) return false;
        if (applied.phone && !item.phone.replace(/\D/g, '').includes(applied.phone.replace(/\D/g, ''))) return false;
        return true;
    }), [currentTab, applied]);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const pageItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearch = () => {
        setApplied({ keyword, matchMode, onlyName, ...advanced });
        setCurrentPage(1);
    };

    const handleReset = () => {
        setKeyword(''); setMatchMode('contains'); setOnlyName(true); setAdvanced(EMPTY_ADVANCED);
        setApplied({ keyword: '', matchMode: 'contains', onlyName: true, ...EMPTY_ADVANCED });
        setCurrentPage(1);
    };

    const handleTab = (key) => {
        setActiveTab(key);
        setAdvanced((prev) => ({ ...prev, unit: '' }));
        setApplied((prev) => ({ ...prev, unit: '' }));
        setCurrentPage(1);
    };

    const handleCopy = (item) => {
        navigator.clipboard?.writeText(item.phone).catch(() => {});
        setCopiedId(`${item.group}-${item.id}`);
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) { setCurrentPage(p); window.scrollTo({ top: 300, behavior: 'smooth' }); }
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#f4f7fb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-[#2c1b92] transition-colors">Trang chủ Hà Nội</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Hotline - Đường dây nóng</span>
                </div>
            </div>

            {/* Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                <style>{`
                    @keyframes hlSweep{0%{transform:translateX(-160%) skewX(-25deg);opacity:0}25%{opacity:.32}70%{opacity:.32}100%{transform:translateX(260%) skewX(-25deg);opacity:0}}
                    @keyframes hlPulse{0%,100%{opacity:.15;transform:scale(.95)}50%{opacity:.38;transform:scale(1.12)}}
                    @keyframes hlRotCW{from{transform:rotate(0)}to{transform:rotate(360deg)}}
                    @keyframes hlRotCCW{from{transform:rotate(360deg)}to{transform:rotate(0)}}
                `}</style>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" style={{ animation: 'hlSweep 5s cubic-bezier(0.4,0,0.2,1) infinite' }} />
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'hlPulse 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'hlPulse 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'hlRotCW 16s linear infinite' }} />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'hlRotCCW 18s linear infinite' }} />
                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">Hotline - Đường dây nóng</h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Danh bạ số điện thoại đường dây nóng của Sở Tư pháp, các Trung tâm Trợ giúp pháp lý và tổ chức hành nghề luật sư trên địa bàn Thành phố Hà Nội
                    </p>
                </div>
            </div>

            {/* Main */}
            <main className="flex-grow">
                <div className="container mx-auto px-4 max-w-[1286px] mt-8 pb-12">
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 sm:p-7">

                        {/* Tabs */}
                        <div role="tablist" className="flex flex-nowrap overflow-x-auto border-b border-gray-200 mb-6" style={{ scrollbarWidth: 'none' }}>
                            {TABS.map((tab) => {
                                const isActive = tab.key === activeTab;
                                return (
                                    <button
                                        key={tab.key}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => handleTab(tab.key)}
                                        className={`shrink-0 whitespace-nowrap px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${isActive
                                            ? 'border-[#2c1b92] text-[#2c1b92]'
                                            : 'border-transparent text-gray-600 hover:text-[#2c1b92] hover:border-indigo-300'}`}
                                    >
                                        {tab.label}
                                        <span className={`ml-2 text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-indigo-50 text-[#2c1b92]' : 'bg-gray-100 text-gray-500'}`}>
                                            {tab.items.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Thanh tìm kiếm */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Tìm kiếm"
                                className="flex-1 min-w-0 h-11 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f56ca] focus:ring-2 focus:ring-indigo-100"
                            />
                            <button
                                onClick={handleSearch}
                                className="h-11 px-5 sm:px-7 inline-flex items-center gap-2 bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] hover:from-[#5b62d6] hover:to-[#3a28a8] text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-95"
                            >
                                <Search size={15} className="sm:hidden" />
                                <span className="hidden sm:inline">Tìm kiếm</span>
                            </button>
                            <button
                                onClick={handleReset}
                                title="Làm mới"
                                className="h-11 w-11 shrink-0 inline-flex items-center justify-center rounded-lg text-gray-600 hover:text-[#2c1b92] hover:bg-indigo-50 transition-colors"
                            >
                                <RotateCw size={18} />
                            </button>
                        </div>

                        {/* Tùy chọn tìm kiếm */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-700">
                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="hotline-match" checked={matchMode === 'contains'} onChange={() => setMatchMode('contains')} className="w-4 h-4 accent-[#2c1b92]" />
                                    So sánh có chứa
                                </label>
                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="hotline-match" checked={matchMode === 'exact'} onChange={() => setMatchMode('exact')} className="w-4 h-4 accent-[#2c1b92]" />
                                    Cụm từ chính xác
                                </label>
                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={onlyName} onChange={(e) => setOnlyName(e.target.checked)} className="w-4 h-4 accent-[#2c1b92]" />
                                    Tên đơn vị
                                </label>
                            </div>
                            <button
                                onClick={() => setShowAdvanced((v) => !v)}
                                className="inline-flex items-center gap-1 text-sm text-[#2c1b92] hover:text-[#4f56ca] underline underline-offset-2"
                            >
                                Tìm kiếm nâng cao
                                <ChevronDown size={15} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Tìm kiếm nâng cao */}
                        {showAdvanced && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                                <div>
                                    <label className="block text-[12px] font-semibold text-gray-600 uppercase mb-1.5">Loại hình đơn vị</label>
                                    <select
                                        value={advanced.unit}
                                        onChange={(e) => setAdvanced((p) => ({ ...p, unit: e.target.value }))}
                                        className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#4f56ca]"
                                    >
                                        <option value="">Tất cả</option>
                                        {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[12px] font-semibold text-gray-600 uppercase mb-1.5">Địa chỉ</label>
                                    <input
                                        type="text"
                                        value={advanced.address}
                                        onChange={(e) => setAdvanced((p) => ({ ...p, address: e.target.value }))}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="VD: Hoàn Kiếm"
                                        className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#4f56ca]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] font-semibold text-gray-600 uppercase mb-1.5">Số điện thoại</label>
                                    <input
                                        type="text"
                                        value={advanced.phone}
                                        onChange={(e) => setAdvanced((p) => ({ ...p, phone: e.target.value }))}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="VD: 3354"
                                        className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#4f56ca]"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tổng số */}
                        <p className="text-sm text-gray-700 mt-5 mb-4">
                            Có tất cả: <strong className="text-gray-900">{filteredItems.length}</strong> dữ liệu
                        </p>

                        {/* Danh sách */}
                        {pageItems.length === 0 ? (
                            <div className="text-center text-sm text-gray-500 py-12 border border-dashed border-gray-300 rounded-xl">
                                Không tìm thấy dữ liệu phù hợp. <button onClick={handleReset} className="text-[#2c1b92] hover:underline">Làm mới tìm kiếm</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {pageItems.map((item) => {
                                    const copyKey = `${item.group}-${item.id}`;
                                    return (
                                        <div key={copyKey} className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 sm:p-5 hover:border-[#4f56ca]/50 hover:shadow-md transition-all">
                                            <div>
                                                <h3 className="text-[15px] sm:text-base font-bold text-[#2c1b92] leading-snug line-clamp-2" title={item.name}>
                                                    {item.name}
                                                </h3>
                                                <p className="text-[15px] sm:text-base font-bold text-red-600 mt-3">{item.phone}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <a
                                                    href={toTel(item.phone)}
                                                    className="inline-flex items-center justify-center gap-2 h-10 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors active:scale-95"
                                                >
                                                    <Phone size={15} fill="currentColor" />
                                                    Gọi ngay
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(item)}
                                                    className="inline-flex items-center justify-center gap-1.5 h-10 border border-gray-300 hover:border-[#4f56ca] text-gray-800 hover:text-[#2c1b92] text-sm font-medium rounded-lg bg-white transition-colors active:scale-95"
                                                >
                                                    {copiedId === copyKey
                                                        ? <><Check size={15} className="text-emerald-600" /> Đã sao chép</>
                                                        : <><Copy size={14} className="sm:hidden" /> Sao chép số</>}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Phân trang */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
                                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}
                                    className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40 text-[14px] transition-colors font-medium">
                                    <ChevronLeft size={16} /> Trước
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button key={p} onClick={() => handlePage(p)}
                                        className={`w-10 h-10 rounded-lg border text-[14px] font-bold transition-colors ${currentPage === p ? 'bg-[#2c1b92] border-[#2c1b92] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-[#2c1b92] hover:text-[#2c1b92]'}`}>
                                        {p}
                                    </button>
                                ))}
                                <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40 text-[14px] transition-colors font-medium">
                                    Sau <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiHotlinePage;

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Download, FileText, X } from 'lucide-react';
import { TuyenQuangPageShell } from '../../components/tuyenquang/TuyenQuangShared';
import { TQ_DOC_GROUPS, tuyenquangDocs } from '../../data/tuyenquangMockData';

const TuyenQuangDocsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const group = searchParams.get('nhom') || 'all';
    const [keyword, setKeyword] = useState(searchParams.get('q') || '');
    const [loai, setLoai] = useState('all');

    useEffect(() => {
        document.title = 'Văn bản chỉ đạo điều hành - Cổng Pháp luật tỉnh Tuyên Quang';
        window.scrollTo(0, 0);
    }, []);

    const loaiOptions = [...new Set(tuyenquangDocs.map((d) => d.loai))];
    const rows = useMemo(() => {
        const k = keyword.trim().toLowerCase();
        return tuyenquangDocs.filter((d) =>
            (group === 'all' || d.group === group) &&
            (loai === 'all' || d.loai === loai) &&
            (!k || `${d.soHieu} ${d.trichYeu} ${d.coQuan}`.toLowerCase().includes(k)));
    }, [group, loai, keyword]);

    const setGroup = (g) => {
        const next = new URLSearchParams(searchParams);
        if (g === 'all') next.delete('nhom'); else next.set('nhom', g);
        setSearchParams(next);
    };

    return (
        <TuyenQuangPageShell
            crumbs={[{ label: 'Văn bản pháp luật' }]}
            title="Thông tin văn bản chỉ đạo điều hành"
            subtitle="Văn bản của Trung ương, Tỉnh ủy, HĐND, UBND tỉnh, Hội đồng phối hợp PBGDPL tỉnh và các cơ quan, đơn vị về công tác phổ biến, giáo dục pháp luật."
        >
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 sm:p-5 mb-5 space-y-4">
                <div className="flex flex-wrap gap-2" role="tablist">
                    {[{ id: 'all', label: 'Tất cả' }, ...TQ_DOC_GROUPS].map((g) => (
                        <button key={g.id} type="button" role="tab" aria-selected={group === g.id} onClick={() => setGroup(g.id)}
                            className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${group === g.id ? 'bg-[#0f4c81] border-[#0f4c81] text-white' : 'border-gray-200 text-gray-700 hover:border-[#0f4c81] hover:text-[#0f4c81]'}`}>
                            {g.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Số hiệu, trích yếu, cơ quan ban hành..." aria-label="Từ khóa"
                            className="w-full bg-gray-50 border border-gray-200 text-sm pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:bg-white focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100 transition" />
                    </div>
                    <select value={loai} onChange={(e) => setLoai(e.target.value)} aria-label="Loại văn bản" className="sm:w-52 bg-gray-50 border border-gray-200 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#0f4c81]">
                        <option value="all">Tất cả loại văn bản</option>
                        {loaiOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    {(keyword || loai !== 'all') && (
                        <button type="button" onClick={() => { setKeyword(''); setLoai('all'); }} className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-gray-600 hover:text-[#991b1b] px-3">
                            <X size={15} /> Xóa lọc
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                <div className="relative overflow-hidden grid grid-cols-12 gap-3 bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white text-[13.5px] font-bold py-3 px-5 border-b-2 border-amber-400">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none" />
                    <div className="relative col-span-3 md:col-span-2">Số hiệu</div>
                    <div className="relative col-span-2 hidden md:block">Ngày ban hành</div>
                    <div className="relative col-span-7 md:col-span-6">Trích yếu</div>
                    <div className="relative col-span-2 text-right">Tải về</div>
                </div>
                {rows.length ? (
                    <ul className="divide-y divide-gray-100">
                        {rows.map((d) => (
                            <li key={d.id} className="grid grid-cols-12 gap-3 items-center px-5 py-3.5 hover:bg-blue-50/40 transition-colors">
                                <div className="col-span-3 md:col-span-2 font-bold text-[#0f4c81] text-[13.5px]">{d.soHieu}</div>
                                <div className="col-span-2 hidden md:block text-[13px] text-gray-700">{d.ngay}</div>
                                <div className="col-span-7 md:col-span-6">
                                    <p className="text-[13.5px] text-gray-800 leading-relaxed">{d.trichYeu}</p>
                                    <p className="text-[11.5px] text-gray-500 mt-0.5">{d.loai} • {d.coQuan}<span className="md:hidden"> • {d.ngay}</span></p>
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    <button type="button" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f4c81] border border-blue-200 hover:bg-[#0f4c81] hover:text-white rounded-lg px-2.5 py-1.5 transition-colors" aria-label={`Tải văn bản ${d.soHieu}`}>
                                        <Download size={13} /><span className="hidden sm:inline">Tải</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="py-12 text-center text-gray-500 flex flex-col items-center gap-2">
                        <FileText size={28} className="text-gray-300" /> Không tìm thấy văn bản phù hợp.
                    </div>
                )}
                <div className="px-5 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">Tìm thấy {rows.length} văn bản</div>
            </div>
        </TuyenQuangPageShell>
    );
};

export default TuyenQuangDocsPage;

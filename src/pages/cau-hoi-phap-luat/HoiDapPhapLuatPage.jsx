import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { HDPL_FIELDS, hoiDapPhapLuatItems } from '../../data/hoiDapPhapLuatData';

const FIELD_LABEL = Object.fromEntries(HDPL_FIELDS.map((f) => [f.id, f.label]));
const PAGE_SIZES = [10, 20, 50];
const normalize = (s) => s.toLowerCase().normalize('NFC');

// Trang Hỏi đáp pháp luật: lọc theo lĩnh vực (trái) + tìm kiếm, tìm kiếm nâng cao, danh sách hỏi - đáp (phải)
const HoiDapPhapLuatPage = () => {
    const [fieldQuery, setFieldQuery] = useState('');
    const [field, setField] = useState(null);
    const [keywordInput, setKeywordInput] = useState('');
    const [keyword, setKeyword] = useState('');
    const [matchMode, setMatchMode] = useState('contains'); // contains | exact
    const [inQuestion, setInQuestion] = useState(true);
    const [inAnswer, setInAnswer] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [openIds, setOpenIds] = useState(() => new Set());

    useEffect(() => {
        document.title = 'Hỏi đáp pháp luật - Cổng Pháp luật quốc gia';
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => { setPage(1); }, [field, keyword, matchMode, inQuestion, inAnswer, fromDate, toDate, pageSize]);

    const visibleFields = HDPL_FIELDS.filter((f) => normalize(f.label).includes(normalize(fieldQuery.trim())));

    const results = useMemo(() => {
        const k = normalize(keyword.trim());
        const words = k.split(/\s+/).filter(Boolean);
        return hoiDapPhapLuatItems.filter((it) => {
            if (field && it.field !== field) return false;
            if (fromDate && it.dateISO < fromDate) return false;
            if (toDate && it.dateISO > toDate) return false;
            if (!k) return true;
            // Phạm vi tìm: câu hỏi và/hoặc câu trả lời (luôn có ít nhất một phạm vi được chọn)
            const text = normalize([inQuestion && it.question, inAnswer && it.answer].filter(Boolean).join(' '));
            // "So sánh có chứa": chứa đủ các từ; "Cụm từ chính xác": chứa nguyên cụm
            return matchMode === 'exact' ? text.includes(k) : words.every((w) => text.includes(w));
        });
    }, [field, keyword, matchMode, inQuestion, inAnswer, fromDate, toDate]);

    const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
    const pageItems = results.slice((page - 1) * pageSize, page * pageSize);

    const toggleAnswer = (id) => setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
    });

    const resetAll = () => {
        setKeywordInput(''); setKeyword(''); setMatchMode('contains'); setInQuestion(true); setInAnswer(false);
        setFromDate(''); setToDate(''); setField(null); setFieldQuery(''); setPageSize(10);
    };
    const clearAdvanced = () => { setFromDate(''); setToDate(''); setPageSize(10); };

    return (
        <div className="bg-[#f4f7fb] min-h-screen">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/cau-hoi-phap-luat" className="hover:text-[#0f4c81]">Hỏi đáp</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Hỏi đáp pháp luật</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px]">
                    <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                        Hỏi đáp
                        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                    </h1>
                    <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                        Khám phá các câu hỏi pháp luật được giải đáp bởi chuyên gia. Tìm kiếm, giải đáp thắc mắc pháp lý của bạn ngay hôm nay.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px] py-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
                    {/* ===== CỘT TRÁI: LỌC THEO LĨNH VỰC ===== */}
                    <aside className="bg-white rounded-xl border border-gray-200 p-4 lg:sticky lg:top-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-[16px] font-bold text-gray-900">Lọc theo lĩnh vực</h2>
                            <button type="button" onClick={() => setField(null)} className="text-[13px] text-[#1d5fd6] underline underline-offset-2 hover:text-[#1a3b8b]">
                                Bỏ chọn
                            </button>
                        </div>
                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-3 border-b border-gray-100">
                                <input
                                    type="search"
                                    value={fieldQuery}
                                    onChange={(e) => setFieldQuery(e.target.value)}
                                    placeholder="Tìm kiếm..."
                                    aria-label="Tìm lĩnh vực"
                                    className="w-full text-[13px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1d5fd6] focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <ul className="max-h-[300px] overflow-y-auto py-1" role="radiogroup" aria-label="Lĩnh vực">
                                {visibleFields.map((f) => (
                                    <li key={f.id}>
                                        <label className="flex items-start gap-2.5 px-3 py-2 cursor-pointer hover:bg-gray-50 text-[13px] text-gray-800 leading-snug">
                                            <input
                                                type="radio"
                                                name="hdpl-field"
                                                checked={field === f.id}
                                                onChange={() => setField(f.id)}
                                                className="mt-0.5 w-4 h-4 accent-[#1d5fd6] shrink-0"
                                            />
                                            <span className={field === f.id ? 'text-[#1d5fd6] font-semibold' : ''}>{f.label}</span>
                                        </label>
                                    </li>
                                ))}
                                {!visibleFields.length && <li className="px-3 py-4 text-[13px] text-gray-500 text-center">Không có lĩnh vực phù hợp</li>}
                            </ul>
                        </div>
                    </aside>

                    {/* ===== CỘT PHẢI: TÌM KIẾM + KẾT QUẢ ===== */}
                    <section className="min-w-0">
                        <form onSubmit={(e) => { e.preventDefault(); setKeyword(keywordInput); }} className="flex items-center gap-2" role="search">
                            <input
                                type="search"
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                placeholder="Tìm kiếm"
                                aria-label="Từ khóa tìm kiếm"
                                className="flex-1 min-w-0 bg-white text-[14px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1d5fd6] focus:ring-2 focus:ring-blue-100"
                            />
                            <button type="submit" className="shrink-0 bg-[#1d5fd6] hover:bg-[#1a3b8b] text-white text-[14px] font-semibold px-6 py-2.5 rounded-lg transition-colors">
                                Tìm kiếm
                            </button>
                            <button type="button" onClick={resetAll} className="shrink-0 w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#1d5fd6] rounded-lg hover:bg-white transition-colors" title="Làm mới" aria-label="Làm mới tìm kiếm">
                                <RotateCcw size={18} />
                            </button>
                        </form>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-[13px] text-gray-800">
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                                <input type="radio" name="hdpl-match" checked={matchMode === 'contains'} onChange={() => setMatchMode('contains')} className="w-4 h-4 accent-[#1d5fd6]" />
                                So sánh có chứa
                            </label>
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                                <input type="radio" name="hdpl-match" checked={matchMode === 'exact'} onChange={() => setMatchMode('exact')} className="w-4 h-4 accent-[#1d5fd6]" />
                                Cụm từ chính xác
                            </label>
                            <label className={`inline-flex items-center gap-1.5 ${inQuestion && !inAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`} title={inQuestion && !inAnswer ? 'Cần chọn ít nhất một phạm vi tìm kiếm' : undefined}>
                                <input type="checkbox" checked={inQuestion} disabled={inQuestion && !inAnswer} onChange={(e) => setInQuestion(e.target.checked)} className="w-4 h-4 accent-[#1d5fd6]" />
                                Câu hỏi
                            </label>
                            <label className={`inline-flex items-center gap-1.5 ${inAnswer && !inQuestion ? 'cursor-not-allowed' : 'cursor-pointer'}`} title={inAnswer && !inQuestion ? 'Cần chọn ít nhất một phạm vi tìm kiếm' : undefined}>
                                <input type="checkbox" checked={inAnswer} disabled={inAnswer && !inQuestion} onChange={(e) => setInAnswer(e.target.checked)} className="w-4 h-4 accent-[#1d5fd6]" />
                                Câu trả lời
                            </label>
                            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} aria-expanded={showAdvanced} className="ml-auto inline-flex items-center gap-1 text-[#1d5fd6] underline underline-offset-2 hover:text-[#1a3b8b]">
                                Tìm kiếm nâng cao {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                        </div>

                        {showAdvanced && (
                            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-3">
                                <div className="flex justify-end mb-1">
                                    <button type="button" onClick={clearAdvanced} className="text-[13px] text-[#1d5fd6] underline underline-offset-2 hover:text-[#1a3b8b]">Xóa dữ liệu tìm kiếm</button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block text-[13px] text-gray-800">
                                        <span className="block mb-1.5">Từ ngày</span>
                                        <input type="date" value={fromDate} max={toDate || undefined} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1d5fd6] focus:ring-2 focus:ring-blue-100 text-gray-700" />
                                    </label>
                                    <label className="block text-[13px] text-gray-800">
                                        <span className="block mb-1.5">Đến ngày</span>
                                        <input type="date" value={toDate} min={fromDate || undefined} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1d5fd6] focus:ring-2 focus:ring-blue-100 text-gray-700" />
                                    </label>
                                </div>
                                <div className="border-t border-gray-200 mt-5 pt-4 flex items-center gap-2 text-[13px] text-gray-800">
                                    <span>Số lượng kết quả trên trang:</span>
                                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} aria-label="Số lượng kết quả trên trang" className="px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#1d5fd6]">
                                        {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                        <p className="text-[14px] text-gray-800 mt-5 mb-3">Có tất cả: <strong>{results.length}</strong> dữ liệu</p>

                        <div className="space-y-4">
                            {pageItems.map((it, idx) => {
                                const isOpen = openIds.has(it.id);
                                return (
                                    <article key={it.id} className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex gap-4">
                                            <span className="w-9 h-9 shrink-0 rounded-md bg-blue-50 text-[#1d5fd6] text-[13px] font-bold flex items-center justify-center">
                                                {String((page - 1) * pageSize + idx + 1).padStart(2, '0')}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-semibold text-gray-900 mb-2">{FIELD_LABEL[it.field]}</p>
                                                <p className="text-[14.5px] font-semibold text-gray-800 leading-relaxed">{it.question}</p>

                                                {isOpen && (
                                                    <div className="mt-4 bg-[#eef5ff] border border-[#c9dcfb] rounded-lg p-4">
                                                        <p className="text-[13px] font-bold text-[#1a3b8b] mb-2">Câu trả lời:</p>
                                                        <p className="text-[13px] text-gray-800 leading-relaxed whitespace-pre-line">{it.answer}</p>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between gap-3 mt-4">
                                                    <p className="text-[13px] text-gray-600">Ngày: <span className="text-gray-900 font-medium">{it.date}</span></p>
                                                    <button type="button" onClick={() => toggleAnswer(it.id)} aria-expanded={isOpen}
                                                        className="inline-flex items-center gap-1.5 bg-[#1d5fd6] hover:bg-[#1a3b8b] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors">
                                                        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                                        {isOpen ? 'Ẩn câu trả lời' : 'Xem câu trả lời'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                            {!pageItems.length && (
                                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-[14px] text-gray-500">
                                    Không tìm thấy câu hỏi phù hợp. Thử bỏ bớt điều kiện lọc hoặc đổi từ khóa.
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <nav className="flex items-center justify-center gap-1.5 mt-6" aria-label="Phân trang">
                                <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Trang trước" className="w-9 h-9 rounded-md border border-gray-300 bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#1d5fd6]"><ChevronLeft size={16} /></button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                    <button key={n} type="button" onClick={() => setPage(n)} aria-current={page === n}
                                        className={`w-9 h-9 rounded-md text-[13px] font-semibold border ${page === n ? 'bg-[#1d5fd6] border-[#1d5fd6] text-white' : 'bg-white border-gray-300 hover:border-[#1d5fd6]'}`}>{n}</button>
                                ))}
                                <button type="button" disabled={page === totalPages} onClick={() => setPage(page + 1)} aria-label="Trang sau" className="w-9 h-9 rounded-md border border-gray-300 bg-white flex items-center justify-center disabled:opacity-40 hover:border-[#1d5fd6]"><ChevronRight size={16} /></button>
                            </nav>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HoiDapPhapLuatPage;

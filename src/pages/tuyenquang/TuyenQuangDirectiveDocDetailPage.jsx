import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ChevronRight, Calendar, Clock, Minus, Plus, Link2, Share2, Printer, Download, Flag, FileText, Eye, X
} from 'lucide-react';
import TuyenQuangHeader from '../../components/tuyenquang/TuyenQuangHeader';
import { TuyenQuangFooter } from '../../components/tuyenquang/TuyenQuangShared';
import {
    TQ_HOME, TQ_DOC_GROUPS, TQ_DIRECTIVE_DOCS_URL, tuyenquangDocs, tqDirectiveDocUrl
} from '../../data/tuyenquangMockData';

const GROUP_LABEL = Object.fromEntries(TQ_DOC_GROUPS.map((g) => [g.id, g.label]));
const THUMBS = ['/thumb1.png', '/thumb2.png', '/thumb3.png', '/fda33db9-762a-4d21-9317-96615cd1968b.jpg', '/02bd53d8-37a5-4927-8d00-a00feb16a3b2.jpg', '/1748a7fd-78c7-4106-9c42-2852c0a58e1e.jpg'];
const FONT_STEP = 10;
const FONT_MIN = 80;
const FONT_MAX = 150;

// Giờ đăng minh họa suy ra từ mã văn bản (dữ liệu mẫu không có giờ)
const postTime = (doc) => {
    const n = Number(doc.id.replace(/\D/g, '')) || 1;
    return `${String(7 + (n % 10)).padStart(2, '0')}:${String((n * 13) % 60).padStart(2, '0')}`;
};
const thumbOf = (doc) => THUMBS[(Number(doc.id.replace(/\D/g, '')) || 0) % THUMBS.length];

const FacebookIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V22h3.4v-10.3h2.6l.4-3.2H14z" />
    </svg>
);

// Trang chi tiết văn bản chỉ đạo điều hành: nội dung + tài liệu đính kèm, cột phải văn bản liên quan
const TuyenQuangDirectiveDocDetailPage = () => {
    const { id } = useParams();
    const doc = tuyenquangDocs.find((d) => d.id === id);
    const [fontScale, setFontScale] = useState(100);
    const [toast, setToast] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        document.title = `${doc ? `${doc.loai} ${doc.soHieu}` : 'Không tìm thấy văn bản'} - Cổng Pháp luật tỉnh Tuyên Quang`;
        window.scrollTo(0, 0);
        setShowPreview(false);
        setFontScale(100);
    }, [doc]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(''), 2500);
        return () => clearTimeout(t);
    }, [toast]);

    const copyLink = () => {
        navigator.clipboard?.writeText(window.location.href);
        setToast('Đã sao chép liên kết');
    };
    const share = () => {
        if (navigator.share) navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
        else copyLink();
    };
    const download = () => setToast('Tệp đính kèm minh họa, sẽ được cập nhật khi vận hành');

    if (!doc) {
        return (
            <div className="bg-[#f8fafc] min-h-screen flex flex-col">
                <TuyenQuangHeader />
                <main className="flex-1 container mx-auto px-4 max-w-[1286px] py-16 text-center text-gray-600">
                    Văn bản không tồn tại hoặc đã được gỡ. <Link to={TQ_DIRECTIVE_DOCS_URL} className="text-[#0f4c81] font-semibold">Xem danh sách văn bản</Link>
                </main>
                <TuyenQuangFooter />
            </div>
        );
    }

    const title = `${doc.loai} số ${doc.soHieu} ${doc.trichYeu.charAt(0).toLowerCase()}${doc.trichYeu.slice(1)}`;
    const summary = `Ngày ${doc.ngay}, ${doc.coQuan} đã ban hành ${doc.loai.toLowerCase()} số ${doc.soHieu} về ${doc.trichYeu.charAt(0).toLowerCase()}${doc.trichYeu.slice(1)}. Các cơ quan, đơn vị và địa phương căn cứ nội dung văn bản để tổ chức triển khai thực hiện theo chức năng, nhiệm vụ được giao.`;
    const fileName = `${doc.loai} ${doc.soHieu} - ${doc.trichYeu}`;
    const related = [
        ...tuyenquangDocs.filter((d) => d.id !== doc.id && d.group === doc.group),
        ...tuyenquangDocs.filter((d) => d.id !== doc.id && d.group !== doc.group)
    ].slice(0, 5);

    const iconBtn = 'w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:border-[#0f4c81] hover:text-[#0f4c81] hover:bg-blue-50 flex items-center justify-center transition-colors';

    return (
        <div className="bg-white min-h-screen font-sans flex flex-col">
            <TuyenQuangHeader />

            <main className="flex-1 container mx-auto px-4 max-w-[1286px] py-5">
                {/* Breadcrumb */}
                <nav className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500 mb-4" aria-label="Breadcrumb">
                    <Link to={TQ_HOME} className="text-[#1d5fd6] hover:underline">Trang chủ</Link>
                    <ChevronRight size={14} />
                    <Link to={`${TQ_HOME}/van-ban`} className="text-[#1d5fd6] hover:underline">Văn bản pháp luật</Link>
                    <ChevronRight size={14} />
                    <Link to={TQ_DIRECTIVE_DOCS_URL} className="text-[#1d5fd6] hover:underline">Thông tin văn bản chỉ đạo điều hành</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800">Chi tiết</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-7 items-start">
                    {/* ===== NỘI DUNG ===== */}
                    <article className="min-w-0">
                        <span className="inline-block text-[11.5px] font-bold uppercase tracking-wide text-[#991b1b] bg-red-50 border border-red-100 rounded px-2 py-0.5 mb-2">
                            {GROUP_LABEL[doc.group]}
                        </span>
                        <h1 className="text-2xl sm:text-[28px] lg:text-[30px] font-bold text-[#1a3b8b] leading-[1.3]">{title}</h1>

                        {/* Dòng tiện ích: ngày giờ, cỡ chữ, chia sẻ */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-4 mb-5">
                            <span className="flex items-center gap-1.5 text-[13px] text-gray-500"><Calendar size={14} /> {doc.ngay}</span>
                            <span className="flex items-center gap-1.5 text-[13px] text-gray-500 -ml-2"><Clock size={14} /> {postTime(doc)}</span>
                            <div className="flex items-center gap-1 border border-gray-200 rounded-full pl-4 pr-1.5 py-1 shadow-sm">
                                <button type="button" onClick={() => setFontScale(100)} className="text-[13px] font-medium text-gray-700 hover:text-[#0f4c81] pr-2 border-r border-gray-200">Đặt lại</button>
                                <button type="button" onClick={() => setFontScale((f) => Math.max(FONT_MIN, f - FONT_STEP))} disabled={fontScale <= FONT_MIN} aria-label="Giảm cỡ chữ" className="w-6 h-6 ml-1 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0f4c81] disabled:opacity-40"><Minus size={12} /></button>
                                <span className="w-14 text-center text-[13px] font-semibold text-gray-800 tabular-nums" aria-live="polite">{fontScale}%</span>
                                <button type="button" onClick={() => setFontScale((f) => Math.min(FONT_MAX, f + FONT_STEP))} disabled={fontScale >= FONT_MAX} aria-label="Tăng cỡ chữ" className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0f4c81] disabled:opacity-40"><Plus size={12} /></button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={copyLink} className={iconBtn} title="Sao chép liên kết" aria-label="Sao chép liên kết"><Link2 size={15} /></button>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noreferrer" className={iconBtn} title="Chia sẻ Facebook" aria-label="Chia sẻ Facebook"><FacebookIcon className="w-4 h-4" /></a>
                                <button type="button" onClick={share} className={iconBtn} title="Chia sẻ" aria-label="Chia sẻ"><Share2 size={15} /></button>
                                <button type="button" onClick={() => window.print()} className={iconBtn} title="In văn bản" aria-label="In văn bản"><Printer size={15} /></button>
                                <button type="button" onClick={download} className={iconBtn} title="Tải về" aria-label="Tải về"><Download size={15} /></button>
                                <button type="button" onClick={() => setToast('Cảm ơn bạn đã phản ánh, Ban Biên tập sẽ kiểm tra lại nội dung')} className={iconBtn} title="Báo lỗi nội dung" aria-label="Báo lỗi nội dung"><Flag size={15} /></button>
                            </div>
                        </div>

                        <div style={{ fontSize: `${(14.5 * fontScale) / 100}px` }} className="text-gray-800 leading-[1.75] font-semibold">
                            <p>{summary}</p>
                        </div>
                        {/* Thông tin văn bản dạng dòng văn bản */}
                        <div className="mt-4 space-y-1.5 text-gray-800 leading-[1.75]" style={{ fontSize: `${(14.5 * fontScale) / 100}px` }}>
                            {[['Số, ký hiệu', doc.soHieu], ['Cơ quan ban hành', doc.coQuan], ['Loại văn bản', doc.loai], ['Ngày ban hành', doc.ngay]].map(([k, v]) => (
                                <p key={k}>{k}: <strong className="font-semibold text-gray-900">{v}</strong></p>
                            ))}
                        </div>

                        {/* Tài liệu đính kèm */}
                        <section className="mt-7 pt-5 border-t border-gray-200" aria-label="Tài liệu đính kèm">
                            <h2 className="text-[15px] font-bold text-gray-900 mb-3">Tài liệu đính kèm</h2>
                            <div className="flex items-center gap-4 bg-gray-50/70 border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                                <span className="w-11 h-11 shrink-0 rounded-lg bg-white border border-red-100 text-[#e04a3a] flex items-center justify-center shadow-sm">
                                    <FileText size={22} />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-semibold text-gray-900 leading-snug line-clamp-2">{fileName}.pdf</p>
                                    <button type="button" onClick={() => setShowPreview(true)} className="mt-1 text-[11.5px] font-semibold uppercase tracking-wide text-gray-500 hover:text-[#1d5fd6] inline-flex items-center gap-1">
                                        <Eye size={12} /> Xem chi tiết
                                    </button>
                                </div>
                                <button type="button" onClick={download} className="w-10 h-10 shrink-0 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-[#1d5fd6] hover:text-[#1d5fd6] flex items-center justify-center transition-colors" title="Tải tài liệu" aria-label="Tải tài liệu đính kèm">
                                    <Download size={18} />
                                </button>
                            </div>
                        </section>
                    </article>

                    {/* ===== CỘT PHẢI ===== */}
                    <aside className="space-y-5 lg:sticky lg:top-4">
                        <div className="bg-white rounded-2xl shadow-[0_6px_24px_-8px_rgba(15,23,42,0.18)] border border-gray-100 p-4">
                            <h2 className="text-[22px] font-bold text-[#1a3b8b] pb-2 mb-3 border-b border-gray-200">Văn bản liên quan</h2>
                            <div className="space-y-3">
                                {related.map((d) => (
                                    <Link key={d.id} to={tqDirectiveDocUrl(d.id)} className="group flex gap-3">
                                        <img src={thumbOf(d)} alt="" loading="lazy" className="w-[88px] h-[52px] shrink-0 rounded-md object-cover" />
                                        <span className="min-w-0">
                                            <span className="block text-[13px] font-semibold text-gray-800 group-hover:text-[#1d5fd6] leading-snug line-clamp-2">{d.loai} {d.soHieu} {d.trichYeu.charAt(0).toLowerCase()}{d.trichYeu.slice(1)}</span>
                                            <span className="flex items-center gap-2.5 text-[11.5px] text-gray-500 mt-1">
                                                <span className="flex items-center gap-1"><Calendar size={11} /> {d.ngay}</span>
                                                <span className="flex items-center gap-1"><Clock size={11} /> {postTime(d)}</span>
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <Link to={TQ_DIRECTIVE_DOCS_URL} className="block mt-4 pt-3 border-t border-gray-200 text-[13px] text-gray-700 hover:text-[#1d5fd6]">Xem tất cả văn bản</Link>
                        </div>
                        <Link to={`${TQ_HOME}/chuyen-muc/hoat-dong-pbgdpl`} className="block rounded-2xl overflow-hidden shadow-sm">
                            <img src="/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg" alt="Đưa Nghị quyết Đại hội XIV của Đảng vào cuộc sống" loading="lazy" className="w-full h-auto hover:scale-[1.02] transition-transform duration-700" />
                        </Link>
                    </aside>
                </div>
            </main>

            {/* Xem trước tài liệu đính kèm */}
            {showPreview && (
                <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Xem trước tài liệu" onClick={() => setShowPreview(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100">
                            <p className="font-semibold text-[14px] text-gray-900 truncate">{fileName}.pdf</p>
                            <button type="button" onClick={() => setShowPreview(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center" aria-label="Đóng"><X size={18} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
                            <div className="bg-white shadow mx-auto max-w-[560px] p-10 text-[13px] leading-relaxed text-gray-800">
                                <p className="text-center font-bold uppercase">{doc.coQuan}</p>
                                <p className="text-center text-gray-500 mt-1">Số: {doc.soHieu}</p>
                                <p className="text-center font-bold uppercase mt-6">{doc.loai}</p>
                                <p className="text-center mt-1">{doc.trichYeu}</p>
                                <p className="mt-6 text-gray-500 italic text-center">Bản xem trước minh họa. Tệp văn bản gốc sẽ được Ban Biên tập cập nhật khi vận hành.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[210] bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg" role="status">{toast}</div>
            )}

            <TuyenQuangFooter />
        </div>
    );
};

export default TuyenQuangDirectiveDocDetailPage;

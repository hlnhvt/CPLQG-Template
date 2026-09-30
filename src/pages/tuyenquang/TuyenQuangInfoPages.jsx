import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Printer, Mail, Send, CheckCircle2, PlayCircle, Clock, Eye, Image as ImageIcon, Share2, Timer, Info } from 'lucide-react';
import { TuyenQuangPageShell } from '../../components/tuyenquang/TuyenQuangShared';
import {
    TQ_HOME, tuyenquangSiteConfig, tuyenquangVideos, tuyenquangPhotos, tuyenquangInfographics, tqVideoUrl
} from '../../data/tuyenquangMockData';

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Cổng Pháp luật tỉnh Tuyên Quang`;
        window.scrollTo(0, 0);
    }, [title]);
};

// ---------------------------------------------------------------------------
// GIỚI THIỆU (Giới thiệu chung / Quy chế hoạt động / Ban Biên tập)
// ---------------------------------------------------------------------------
const ABOUT_TABS = [
    { id: 'chung', label: 'Giới thiệu chung' },
    { id: 'quy-che', label: 'Quy chế hoạt động' },
    { id: 'ban-bien-tap', label: 'Ban Biên tập' }
];

export const TuyenQuangAboutPage = () => {
    useTitle('Giới thiệu');
    const [params, setParams] = useSearchParams();
    const tab = params.get('tab') || 'chung';
    const s = tuyenquangSiteConfig;

    return (
        <TuyenQuangPageShell crumbs={[{ label: 'Giới thiệu' }]} title="Giới thiệu" subtitle="Cổng Pháp luật tỉnh Tuyên Quang - kênh thông tin chính thống về phổ biến, giáo dục pháp luật của tỉnh.">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                <nav className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-2" aria-label="Mục giới thiệu">
                    {ABOUT_TABS.map((t) => (
                        <button key={t.id} type="button" onClick={() => setParams(t.id === 'chung' ? {} : { tab: t.id })} aria-current={tab === t.id ? 'page' : undefined}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${tab === t.id ? 'bg-[#0f4c81] text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-[#0f4c81]'}`}>
                            {t.label}
                        </button>
                    ))}
                </nav>
                <div className="lg:col-span-9 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8 text-[15px] text-gray-700 leading-relaxed space-y-4">
                    {tab === 'chung' && (
                        <>
                            <h2 className="text-xl font-bold text-[#0f4c81]">Giới thiệu chung</h2>
                            <p>Cổng Pháp luật tỉnh Tuyên Quang do {s.governingBody} là cơ quan chủ quản, {s.operatingBody} là cơ quan thường trực, kết nối liên thông với Cổng Pháp luật quốc gia.</p>
                            <p>Cổng cung cấp thông tin về hoạt động phổ biến, giáo dục pháp luật; văn bản chỉ đạo điều hành; tài liệu phổ biến pháp luật; hỏi đáp, tư vấn pháp luật; hoạt động của Hội đồng phối hợp PBGDPL và đội ngũ báo cáo viên, tuyên truyền viên pháp luật trên địa bàn tỉnh.</p>
                        </>
                    )}
                    {tab === 'quy-che' && (
                        <>
                            <h2 className="text-xl font-bold text-[#0f4c81]">Quy chế hoạt động</h2>
                            <p>Quy chế quy định việc quản lý, cập nhật, cung cấp thông tin và trách nhiệm của các cơ quan, đơn vị trong việc cung cấp tin, bài cho Cổng.</p>
                            <p className="text-sm text-gray-500">Nội dung quy chế chính thức sẽ được Ban Biên tập cập nhật khi vận hành.</p>
                        </>
                    )}
                    {tab === 'ban-bien-tap' && (
                        <>
                            <h2 className="text-xl font-bold text-[#0f4c81]">Ban Biên tập</h2>
                            <p><strong>Chịu trách nhiệm chính:</strong> {s.chiefEditor}.</p>
                            <p><strong>Giấy phép:</strong> {s.license}.</p>
                            <Link to={`${TQ_HOME}/lien-he`} className="inline-flex text-sm font-bold text-[#0f4c81] hover:text-[#991b1b]">Liên hệ Ban Biên tập →</Link>
                        </>
                    )}
                </div>
            </div>
        </TuyenQuangPageShell>
    );
};

// ---------------------------------------------------------------------------
// LIÊN HỆ BAN BIÊN TẬP
// ---------------------------------------------------------------------------
// Địa điểm hiển thị trên bản đồ (tra theo tên cơ quan + địa chỉ ở chân trang)
const MAP_QUERY = encodeURIComponent('Sở Tư pháp tỉnh Tuyên Quang, Đường 17/8, Phan Thiết, Tuyên Quang');

export const TuyenQuangContactPage = () => {
    useTitle('Liên hệ Ban Biên tập');
    const s = tuyenquangSiteConfig;
    const [sent, setSent] = useState(false);
    const info = [
        { icon: MapPin, label: 'Địa chỉ', value: s.address },
        { icon: Phone, label: 'Điện thoại', value: s.phone },
        { icon: Printer, label: 'Fax', value: s.fax },
        { icon: Mail, label: 'Email', value: s.email }
    ];
    return (
        <TuyenQuangPageShell crumbs={[{ label: 'Liên hệ' }]} title="Liên hệ Ban Biên tập" subtitle={`${s.operatingBody} - cơ quan thường trực Cổng Pháp luật tỉnh Tuyên Quang.`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                    {info.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex gap-4">
                            <span className="w-11 h-11 shrink-0 rounded-xl bg-[#f0f5f9] text-[#0f4c81] flex items-center justify-center"><Icon size={19} /></span>
                            <span>
                                <span className="block text-xs font-bold uppercase text-gray-500">{label}</span>
                                <span className="block text-[14px] font-semibold text-gray-900 mt-1 break-words">{value}</span>
                            </span>
                        </div>
                    ))}

                    {/* Bản đồ vị trí cơ quan thường trực */}
                    <div className="sm:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100">
                            <span className="flex items-center gap-2 font-bold text-[14px] text-[#0f4c81]"><MapPin size={16} className="text-[#991b1b]" /> Bản đồ</span>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#0f4c81] hover:text-[#991b1b]">
                                Mở trong Google Maps ↗
                            </a>
                        </div>
                        <div className="relative h-[320px] bg-gray-100">
                            <iframe
                                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                                className="absolute inset-0 w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Bản đồ ${s.operatingBody}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                    {sent ? (
                        <div className="py-10 text-center flex flex-col items-center gap-2">
                            <CheckCircle2 size={42} className="text-emerald-600" />
                            <p className="font-bold text-gray-900">Đã gửi thông tin liên hệ</p>
                            <button type="button" onClick={() => setSent(false)} className="text-sm font-semibold text-[#0f4c81]">Gửi liên hệ khác</button>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
                            <h2 className="font-bold text-lg text-[#0f4c81] mb-1">Gửi ý kiến tới Ban Biên tập</h2>
                            <input required placeholder="Họ và tên *" aria-label="Họ và tên" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100" />
                            <input required type="email" placeholder="Email *" aria-label="Email" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100" />
                            <textarea required rows={5} placeholder="Nội dung *" aria-label="Nội dung" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100" />
                            <button type="submit" className="inline-flex items-center gap-2 bg-[#0f4c81] hover:bg-[#991b1b] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors"><Send size={15} /> Gửi</button>
                        </form>
                    )}
                </div>
            </div>
        </TuyenQuangPageShell>
    );
};

// ---------------------------------------------------------------------------
// ĐA PHƯƠNG TIỆN: video / ảnh / infographic
// ---------------------------------------------------------------------------
// Thẻ đa phương tiện: có `to` thì bấm để mở trang chi tiết (video)
const MediaCard = ({ to, children }) => {
    const cls = 'group block bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300';
    return to ? <Link to={to} className={cls}>{children}</Link> : <div className={cls}>{children}</div>;
};

const MEDIA_TABS = [
    { type: 'video', label: 'Video - clip', path: 'video' },
    { type: 'anh', label: 'Ảnh', path: 'anh' },
    { type: 'infographic', label: 'Pano, áp phích, infographic', path: 'infographic' }
];

export const TuyenQuangMediaPage = ({ type = 'video' }) => {
    const current = MEDIA_TABS.find((t) => t.type === type) || MEDIA_TABS[0];
    useTitle(current.label);
    const items = type === 'video' ? tuyenquangVideos : type === 'anh' ? tuyenquangPhotos : tuyenquangInfographics;

    return (
        <TuyenQuangPageShell crumbs={[{ label: 'Multimedia' }, { label: current.label }]} title="Thư viện đa phương tiện" subtitle="Video - clip, hình ảnh, pano, áp phích tuyên truyền pháp luật tỉnh Tuyên Quang.">
            <div className="flex flex-wrap gap-2 mb-5">
                {MEDIA_TABS.map((t) => (
                    <Link key={t.type} to={`${TQ_HOME}/${t.path}`} aria-current={t.type === type ? 'page' : undefined}
                        className={`text-[13px] font-semibold px-4 py-2 rounded-full border transition-colors ${t.type === type ? 'bg-[#0f4c81] border-[#0f4c81] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-[#0f4c81] hover:text-[#0f4c81]'}`}>
                        {t.label}
                    </Link>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((m) => (
                    <MediaCard key={m.id} to={type === 'video' ? tqVideoUrl(m.id) : null}>
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                            <img src={m.thumb} alt={m.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            {type === 'video' && (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                                        <span className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><PlayCircle size={30} /></span>
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-1.5 py-0.5 rounded">{m.duration}</span>
                                </>
                            )}
                            {type === 'anh' && <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-1.5 py-0.5 rounded inline-flex items-center gap-1"><ImageIcon size={11} /> {m.count} ảnh</span>}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-[14.5px] text-gray-900 group-hover:text-[#0f4c81] leading-snug line-clamp-2">{m.title}</h3>
                            <div className="flex items-center gap-3 text-[11.5px] text-gray-500 mt-2">
                                <span className="flex items-center gap-1"><Clock size={11} /> {m.date}</span>
                                {m.views && <span className="flex items-center gap-1"><Eye size={11} /> {m.views.toLocaleString('vi-VN')}</span>}
                            </div>
                        </div>
                    </MediaCard>
                ))}
            </div>
        </TuyenQuangPageShell>
    );
};

// ---------------------------------------------------------------------------
// CHI TIẾT VIDEO
// ---------------------------------------------------------------------------
export const TuyenQuangVideoDetailPage = () => {
    const { id } = useParams();
    const video = tuyenquangVideos.find((v) => v.id === id);
    const [showNotice, setShowNotice] = useState(false);
    useTitle(video ? video.title : 'Không tìm thấy video');
    useEffect(() => { setShowNotice(false); }, [id]);

    if (!video) {
        return (
            <TuyenQuangPageShell crumbs={[{ label: 'Multimedia' }, { label: 'Video - clip', to: `${TQ_HOME}/video` }, { label: 'Không tìm thấy' }]} title="Không tìm thấy video">
                <p className="text-gray-600">Video không tồn tại hoặc đã được gỡ. <Link to={`${TQ_HOME}/video`} className="text-[#0f4c81] font-semibold">Xem thư viện video</Link></p>
            </TuyenQuangPageShell>
        );
    }

    const others = tuyenquangVideos.filter((v) => v.id !== video.id);

    return (
        <TuyenQuangPageShell crumbs={[{ label: 'Multimedia' }, { label: 'Video - clip', to: `${TQ_HOME}/video` }, { label: 'Chi tiết' }]} title="Thư viện video - clip">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                <div className="lg:col-span-8 space-y-5">
                    <button
                        type="button"
                        onClick={() => setShowNotice(true)}
                        className="relative block w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg group"
                        aria-label={`Phát video: ${video.title}`}
                    >
                        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                            <span className="w-20 h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"><PlayCircle size={44} /></span>
                        </span>
                        <span className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-semibold px-2 py-1 rounded">{video.duration}</span>
                        {showNotice && (
                            <span className="absolute inset-x-4 top-4 flex items-center gap-2 bg-white/95 text-gray-800 text-sm font-medium px-4 py-2.5 rounded-xl shadow text-left">
                                <Info size={16} className="text-[#0f4c81] shrink-0" /> Video minh họa, tệp phát sẽ được Ban Biên tập cập nhật khi vận hành.
                            </span>
                        )}
                    </button>

                    <article className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 sm:p-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{video.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-3 pb-4 border-b border-gray-100">
                            <span className="flex items-center gap-1"><Clock size={13} /> {video.date}</span>
                            <span className="flex items-center gap-1"><Timer size={13} /> Thời lượng {video.duration}</span>
                            <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="ml-auto inline-flex items-center gap-1.5 text-[#0f4c81] hover:text-[#991b1b] font-semibold" title="Sao chép liên kết">
                                <Share2 size={14} /> Chia sẻ
                            </button>
                        </div>
                        <p className="text-[15px] text-gray-700 leading-relaxed mt-4">{video.desc}</p>
                    </article>
                </div>

                <aside className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 lg:sticky lg:top-4">
                    <h2 className="font-bold text-[15px] text-[#0f4c81] pb-2 mb-2 border-b border-gray-100">Video khác</h2>
                    <div className="space-y-2">
                        {others.map((v) => (
                            <Link key={v.id} to={tqVideoUrl(v.id)} className="group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <span className="relative w-28 shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-200">
                                    <img src={v.thumb} alt={v.title} loading="lazy" className="w-full h-full object-cover" />
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/25"><PlayCircle size={20} className="text-white" /></span>
                                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{v.duration}</span>
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-[13px] font-semibold text-gray-800 group-hover:text-[#0f4c81] leading-snug line-clamp-2">{v.title}</span>
                                    <span className="block text-[11px] text-gray-400 mt-1">{v.date}</span>
                                </span>
                            </Link>
                        ))}
                    </div>
                    <Link to={`${TQ_HOME}/video`} className="mt-3 inline-flex text-xs font-bold text-[#0f4c81] hover:text-[#991b1b]">Thư viện video →</Link>
                </aside>
            </div>
        </TuyenQuangPageShell>
    );
};

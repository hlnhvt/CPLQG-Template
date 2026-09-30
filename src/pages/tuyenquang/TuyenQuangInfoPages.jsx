import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Printer, Mail, Send, CheckCircle2, PlayCircle, Clock, Eye, Image as ImageIcon } from 'lucide-react';
import { TuyenQuangPageShell } from '../../components/tuyenquang/TuyenQuangShared';
import {
    TQ_HOME, tuyenquangSiteConfig, tuyenquangVideos, tuyenquangPhotos, tuyenquangInfographics
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
                    <div key={m.id} className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
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
                    </div>
                ))}
            </div>
        </TuyenQuangPageShell>
    );
};

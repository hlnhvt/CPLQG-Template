import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PlayCircle, Clock, Eye, Image as ImageIcon, Images } from 'lucide-react';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import { StaticPageBanner } from './LaoCaiV2LegalLibraryPage';
import { laocaiV2MultimediaData } from '../../data/laocaiV2MockData';

const TABS = [
    { key: 'video', label: 'Video' },
    { key: 'anh', label: 'Ảnh' },
    { key: 'infographic', label: 'Infographic' }
];

// Album ảnh mẫu (dữ liệu minh họa)
const PHOTO_ALBUMS = [
    { id: 'album-1', title: 'Hội nghị triển khai công tác tư pháp năm 2026 tỉnh Lào Cai', date: '21/03/2026', cover: '/thumb1.png', count: 24 },
    { id: 'album-2', title: 'Tuyên truyền pháp luật lưu động tại xã Y Tý, Bát Xát', date: '14/03/2026', cover: '/thumb2.png', count: 18 },
    { id: 'album-3', title: 'Hội thi Hòa giải viên giỏi tỉnh Lào Cai năm 2026', date: '08/03/2026', cover: '/thumb3.png', count: 32 },
    { id: 'album-4', title: 'Trợ giúp pháp lý lưu động cho đồng bào vùng cao Sa Pa', date: '02/03/2026', cover: '/thumb2.png', count: 15 },
    { id: 'album-5', title: 'Đối thoại pháp lý với doanh nghiệp tại Khu kinh tế cửa khẩu', date: '25/02/2026', cover: '/thumb1.png', count: 20 },
    { id: 'album-6', title: 'Ngày Pháp luật Việt Nam tại các xã, phường tỉnh Lào Cai', date: '09/11/2025', cover: '/thumb3.png', count: 28 }
];

const LaoCaiV2MultimediaPage = () => {
    const [params, setParams] = useSearchParams();
    const tab = TABS.some((t) => t.key === params.get('tab')) ? params.get('tab') : 'video';
    const { videos, infographics } = laocaiV2MultimediaData;

    useEffect(() => {
        document.title = 'Multimedia - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-white">
            <LaoCaiV2Header />
            <StaticPageBanner
                title="Multimedia"
                subtitle="Video, phóng sự, hình ảnh và infographic về chính sách, pháp luật và hoạt động tư pháp của tỉnh Lào Cai"
            />

            <main className="flex-grow w-full max-w-[1254px] mx-auto px-4 py-8">
                {/* Tab Video / Ảnh / Infographic */}
                <div role="tablist" className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            role="tab"
                            aria-selected={tab === t.key}
                            onClick={() => setParams(t.key === 'video' ? {} : { tab: t.key })}
                            className={`text-sm font-bold px-5 py-2 rounded-lg transition-all ${tab === t.key ? 'bg-white text-[#0f4c81] shadow-sm' : 'text-gray-500 hover:text-[#0f4c81]'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {tab === 'video' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((v) => (
                            <div key={v.id} className="group cursor-pointer">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                                    <img src={v.thumb} alt={v.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                            <PlayCircle size={30} />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-1.5 py-0.5 rounded">{v.duration}</span>
                                </div>
                                <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#0f4c81] mt-3 leading-snug line-clamp-2">{v.title}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{v.desc}</p>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2"><Clock size={12} /> {v.date}</div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'anh' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PHOTO_ALBUMS.map((a) => (
                            <div key={a.id} className="group cursor-pointer">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                                    <img src={a.cover} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-black/70 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                                        <Images size={12} /> {a.count} ảnh
                                    </span>
                                </div>
                                <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#0f4c81] mt-3 leading-snug line-clamp-2">{a.title}</h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2"><ImageIcon size={12} /> {a.date}</div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'infographic' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {infographics.map((info) => (
                            <div key={info.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md hover:border-[#0f4c81]/50 transition flex flex-col">
                                <div className="relative aspect-video overflow-hidden">
                                    <img src={info.thumb} alt={info.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">Infographic</span>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#0f4c81] leading-snug line-clamp-2">{info.title}</h3>
                                    <p className="text-xs text-gray-600 mt-1.5 line-clamp-3 flex-1">{info.summary}</p>
                                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 mt-3 border-t border-gray-100">
                                        <span className="flex items-center gap-1"><Eye size={12} /> {info.views.toLocaleString('vi-VN')} lượt xem</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {info.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2MultimediaPage;

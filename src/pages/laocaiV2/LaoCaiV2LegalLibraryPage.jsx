import React, { useEffect, useMemo } from 'react';
import { BookOpen, FileStack, FileText, FileImage, PlayCircle, Headphones, Eye, Download } from 'lucide-react';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import { RecordExplorer, Card, Badge, Highlight, sortNewest, sortBy } from '../../components/portal/specialized/SpecializedKit';
import { buildLawDissemination } from '../../data/portals/specializedData';
import { laocaiV2Profile } from '../../data/portals/profiles';

const TYPE_ICONS = { 'Sách hỏi đáp': BookOpen, 'Cẩm nang': FileStack, 'Tờ gấp': FileText, 'Infographic': FileImage, 'Video': PlayCircle, 'Podcast': Headphones };
const TYPE_ORDER = Object.keys(TYPE_ICONS);

// Banner tĩnh dùng chung phong cách với trang Tin tức (rộng tối đa 1254px, bo góc, không hiệu ứng động)
export const StaticPageBanner = ({ title, subtitle }) => (
    <div className="px-4 pt-6">
        <div className="relative overflow-hidden w-full max-w-[1254px] mx-auto rounded-2xl text-white py-8 sm:py-10 px-6 sm:px-10 bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border border-indigo-400/30 shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/25 blur-3xl pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/25 blur-3xl pointer-events-none" />
            <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">{title}</h1>
                <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">{subtitle}</p>
            </div>
        </div>
    </div>
);

const LaoCaiV2LegalLibraryPage = () => {
    const library = useMemo(() => buildLawDissemination(laocaiV2Profile).library, []);

    useEffect(() => {
        document.title = 'Thư viện pháp luật - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-white">
            <LaoCaiV2Header />
            <StaticPageBanner
                title="Thư viện pháp luật"
                subtitle="Sách hỏi đáp, cẩm nang, tờ gấp, infographic, video và podcast pháp luật miễn phí cho người dân, doanh nghiệp tỉnh Lào Cai"
            />
            <main className="flex-grow w-full max-w-[1254px] mx-auto px-4 py-8">
                <RecordExplorer
                    records={library}
                    searchKeys={['title', 'topic', 'type', 'publisher', 'language']}
                    chipFilter={{ key: 'type', label: 'Loại tài liệu', order: (a, b) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b) }}
                    selectFilters={[{ key: 'topic', label: 'Chủ đề' }, { key: 'language', label: 'Ngôn ngữ' }, { key: 'publisher', label: 'Đơn vị phát hành' }]}
                    sortOptions={[sortNewest, sortBy('downloads', 'Tải nhiều nhất', 'downloads'), sortBy('views', 'Xem nhiều nhất', 'views')]}
                    pageSize={12}
                    gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    unit="tài liệu"
                    placeholder="Tìm tài liệu, ví dụ: cẩm nang lao động, video giao thông, song ngữ..."
                    renderItem={(b, { query, layout }) => {
                        const Icon = TYPE_ICONS[b.type] || BookOpen;
                        return (
                            <Card className={`p-4 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition ${layout === 'list' ? 'flex flex-col sm:flex-row sm:items-center gap-4' : 'flex flex-col'}`}>
                                <div className={`${layout === 'list' ? 'w-14 h-14' : 'w-full h-24 mb-3'} rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0`}>
                                    <Icon size={layout === 'list' ? 24 : 34} className="text-[#0f4c81]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap gap-1.5"><Badge>{b.type}</Badge><Badge>{b.format} · {b.size}</Badge></div>
                                    <h3 className="font-bold text-sm text-gray-900 mt-2 leading-snug"><Highlight text={b.title} query={query} /></h3>
                                    <p className="text-[11px] text-gray-500 mt-1"><Highlight text={b.publisher} query={query} /> · {b.date}</p>
                                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1.5">
                                        <span className="flex items-center gap-1"><Eye size={11} /> {b.views.toLocaleString('vi-VN')}</span>
                                        <span className="flex items-center gap-1"><Download size={11} /> {b.downloads.toLocaleString('vi-VN')}</span>
                                    </div>
                                </div>
                                <div className={`grid grid-cols-2 gap-2 ${layout === 'list' ? 'shrink-0 w-full sm:w-52' : 'mt-3'}`}>
                                    <button type="button" className="h-9 rounded-lg bg-[#0f4c81] hover:bg-[#0c3e6b] text-white text-xs font-semibold transition-colors">{b.format === 'MP4' || b.format === 'MP3' ? 'Phát' : 'Xem'}</button>
                                    <button type="button" className="h-9 rounded-lg border border-gray-300 hover:border-[#0f4c81] hover:text-[#0f4c81] text-xs font-semibold text-gray-700 transition-colors inline-flex items-center justify-center gap-1"><Download size={13} /> Tải</button>
                                </div>
                            </Card>
                        );
                    }}
                />
            </main>
            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2LegalLibraryPage;

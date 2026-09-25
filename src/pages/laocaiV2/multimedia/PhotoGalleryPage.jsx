import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Images, ChevronRight } from 'lucide-react';

// ---- Mock Data ----
const ALL_ALBUMS = [
    { id: 1, title: "Kỷ niệm 80 năm Ngày Tổng tuyển cử đầu tiên tại tỉnh Lào Cai", date: "06/01/2026", image: "/thumb1.png", count: 24 },
    { id: 2, title: "Giám đốc Sở Tư pháp tỉnh Lào Cai làm việc với các xã vùng biên giới", date: "10/03/2026", image: "/thumb2.png", count: 18 },
    { id: 3, title: "Lào Cai hưởng ứng Ngày Pháp luật nước CHXHCN Việt Nam năm 2026", date: "09/11/2025", image: "/thumb3.png", count: 32 },
    { id: 4, title: "Hội thảo nâng cao hiệu quả thi hành pháp luật tỉnh Lào Cai", date: "15/02/2026", image: "/thumb1.png", count: 15 },
    { id: 5, title: "Kỳ họp HĐND tỉnh Lào Cai – Phiên khai mạc", date: "21/10/2025", image: "/thumb2.png", count: 41 },
    { id: 6, title: "Trợ giúp pháp lý lưu động tại xã Y Tý, Bát Xát", date: "18/03/2026", image: "/thumb3.png", count: 12 },
    { id: 7, title: "Tọa đàm cải cách thủ tục hành chính và chuyển đổi số ngành Tư pháp", date: "05/03/2026", image: "/thumb1.png", count: 9 },
    { id: 8, title: "Hội nghị triển khai Nghị quyết phát triển kinh tế cửa khẩu Lào Cai", date: "28/02/2026", image: "/thumb2.png", count: 20 },
    { id: 9, title: "Khai mạc Triển lãm ảnh Pháp luật vì cuộc sống tỉnh Lào Cai", date: "10/11/2025", image: "/thumb3.png", count: 55 },
    { id: 10, title: "Hội nghị điển hình tiên tiến ngành Tư pháp tỉnh Lào Cai", date: "14/12/2025", image: "/thumb1.png", count: 28 },
    { id: 11, title: "Hội nghị sơ kết công tác tư pháp 6 tháng đầu năm 2026", date: "20/03/2026", image: "/thumb2.png", count: 7 },
    { id: 12, title: "Ký kết phối hợp hỗ trợ pháp lý với Hiệp hội Doanh nghiệp tỉnh", date: "22/03/2026", image: "/thumb3.png", count: 13 },
    { id: 13, title: "Hội thi Hòa giải viên giỏi tỉnh Lào Cai năm 2026", date: "25/03/2026", image: "/thumb1.png", count: 17 },
    { id: 14, title: "Họp báo kết quả rà soát văn bản QPPL của tỉnh Lào Cai", date: "26/03/2026", image: "/thumb2.png", count: 11 },
];

const ITEMS_PER_BATCH = 9;

const PhotoGalleryPage = () => {
    const [keyword, setKeyword] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

    const handleSearch = (e) => {
        e.preventDefault();
        setDateError('');
        if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
            setDateError('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.');
            return;
        }
        setVisibleCount(ITEMS_PER_BATCH);
    };

    const filtered = ALL_ALBUMS.filter(a => {
        const kw = keyword.toLowerCase();
        const matchKw = !kw || a.title.toLowerCase().includes(kw);
        let matchDate = true;
        if (fromDate) matchDate = matchDate && new Date(a.date.split('/').reverse().join('-')) >= new Date(fromDate);
        if (toDate) matchDate = matchDate && new Date(a.date.split('/').reverse().join('-')) <= new Date(toDate);
        return matchKw && matchDate;
    });

    const visible = filtered.slice(0, visibleCount);
    const featured = visible.slice(0, 2);
    const rest = visible.slice(2);
    const hasMore = visibleCount < filtered.length;

    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Multimedia', to: '/lao-cai-v2/video' }, { label: 'Ảnh' }]}
                title="Ảnh"
                subtitle="Hình ảnh các sự kiện, hoạt động tư pháp và phổ biến, giáo dục pháp luật trên địa bàn tỉnh Lào Cai"
            />

            <div className="container mx-auto px-4 max-w-[1200px] mt-6">

                {/* ── Title + Search Bar ── */}
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">

                    <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2 ml-auto">
                        {/* Keyword */}
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                placeholder="Tìm kiếm tin bài..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-400 bg-gray-50 w-56"
                            />
                        </div>
                        {/* From date */}
                        <div className="relative">
                            <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                                className="pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-[12px] outline-none focus:border-blue-400 bg-gray-50" />
                        </div>
                        <span className="text-gray-400 text-[12px]">–</span>
                        {/* To date */}
                        <div className="relative">
                            <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                                className="pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-[12px] outline-none focus:border-blue-400 bg-gray-50" />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-[#1a3b8b] hover:bg-blue-800 text-white font-semibold rounded-lg text-[13px] transition-colors">
                            Tìm kiếm
                        </button>
                    </form>
                </div>

                {dateError && (
                    <div className="mb-4 text-red-600 text-[13px] bg-red-50 border border-red-200 rounded-lg px-4 py-2">{dateError}</div>
                )}

                {/* ── Results ── */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-400">
                        <Images size={48} className="mx-auto mb-4 opacity-40" />
                        <p className="text-[15px]">Không tìm thấy hình ảnh phù hợp với từ khóa đã nhập.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured 2 large */}
                        {featured.length > 0 && (
                            <div className={`grid gap-4 mb-4 ${featured.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                                {featured.map(album => (
                                    <Link key={album.id} to={`/lao-cai-v2/anh/${album.id}`} className="group relative rounded-xl overflow-hidden block aspect-[16/9] bg-gray-200">
                                        <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {/* Count badge */}
                                        <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{album.count} ảnh</div>
                                        {/* Overlay title */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <p className="text-white font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-yellow-300 transition-colors">{album.title}</p>
                                            <p className="text-gray-300 text-[11px] mt-1">{album.date}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* 3-column grid */}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {rest.map(album => (
                                    <Link key={album.id} to={`/lao-cai-v2/anh/${album.id}`} className="group block">
                                        <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-200 mb-2">
                                            <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{album.count} ảnh</div>
                                        </div>
                                        <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{album.title}</p>
                                        <p className="text-[11px] text-gray-400 mt-1">{album.date}</p>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Load More */}
                        {hasMore && (
                            <div className="flex justify-center mt-4 mb-4">
                                <button
                                    onClick={() => setVisibleCount(c => c + ITEMS_PER_BATCH)}
                                    className="px-10 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-full text-[14px] transition-colors shadow"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PhotoGalleryPage;

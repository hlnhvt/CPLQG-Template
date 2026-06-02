import React, { useState } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TotalReviewSection = ({ isHalfWidth = false }) => {
    const [activeReviewTab, setActiveReviewTab] = useState('activities');

    const newsItems = [
        {
            id: 1,
            title: 'Tổng rà soát hệ thống văn bản quy phạm pháp luật, khơi thông mọi nguồn lực cho phát triển',
            date: '27/03/2026',
            time: '09:00',
            summary: 'Sáng 27/3, Thường trực Ủy ban Pháp luật và Tư pháp của Quốc hội (QH) tổ chức cuộc họp cho ý kiến về Đề án Tổng rà soát hệ thống văn bản quy phạm pháp luật (VBQPPL) đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới (Đề án) và dự thảo Nghị quyết của Ủy ban Thường vụ (UBTV) QH về tổng rà soát hệ thống VBQPPL.',
            image: '/TintucTongRaSoatDemo/270326 trs tthieu.jpg'
        },
        {
            id: 2,
            title: 'Thành lập Ban Chỉ đạo tổng rà soát hệ thống văn bản quy phạm pháp luật',
            date: '04/04/2026',
            time: '14:30',
            summary: 'Thay mặt Ủy ban Thường vụ Quốc hội, Chủ tịch Quốc hội Trần Thanh Mẫn vừa ký ban hành Nghị quyết số 2093/NQ-UBTVQH15 Thành lập Ban Chỉ đạo tổng rà soát hệ thống văn bản quy phạm pháp luật.',
            image: '/TintucTongRaSoatDemo/299b1ef2-5adc-4444-afdf-fc1d13236df6.jpeg.avif'
        },
        {
            id: 3,
            title: 'Họp báo Chính phủ: Tập trung xử lý dứt điểm "điểm nghẽn" về thể chế',
            date: '05/05/2026',
            time: '10:15',
            summary: 'Trong năm 2026, Chính phủ chỉ đạo các Bộ, ngành tập trung, ưu tiên nguồn lực để xử lý các vướng mắc, bất cập trong hệ thống pháp luật hiện hành.',
            image: '/thumb1.png'
        }
    ];

    const guidanceDocs = [
        { id: 101, title: 'Sổ tay nghiệp vụ rà soát, hệ thống hóa VBQPPL (Phát hành năm 2026)', date: '20/02/2026' },
        { id: 102, title: 'Hướng dẫn chi tiết số 12/HD-BTP về tiêu chí đánh giá mâu thuẫn văn bản', date: '25/02/2026' },
        { id: 103, title: 'Tài liệu tập huấn sử dụng Cơ sở dữ liệu Quốc gia về VBPL', date: '02/03/2026' },
        { id: 104, title: 'Quy trình chuẩn (SOP) 5 bước báo cáo tổng rà soát', date: '10/03/2026' },
        { id: 105, title: 'Bộ câu hỏi đáp (FAQ) thường gặp về rà soát VBQPPL 2026', date: '15/03/2026' },
    ];

    const renderContent = () => {
        if (isHalfWidth) {
            return (
                <div className="flex flex-col h-full font-sans">
                    {/* Main Section Title - Clean single color */}
                    <div className="flex flex-col mb-6 pb-4 border-b border-slate-200">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0f4c81] tracking-tight leading-tight">
                            Tổng rà soát hệ thống VBQPPL
                        </h2>
                        <p className="text-slate-500 mt-1 text-sm font-light">
                            Đề án rà soát đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới.
                        </p>
                    </div>

                    {/* Pill Tab Selector */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200/60 shrink-0 overflow-x-auto scrollbar-none">
                        <button
                            onClick={() => setActiveReviewTab('activities')}
                            className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
                                activeReviewTab === 'activities'
                                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/30'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            Hoạt động nổi bật
                        </button>
                        <button
                            onClick={() => setActiveReviewTab('guidance')}
                            className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
                                activeReviewTab === 'guidance'
                                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/30'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            Hướng dẫn nghiệp vụ
                        </button>
                    </div>

                    {/* Tab Content Panel - Majestic height aligned to left card */}
                    <div className="flex-grow flex flex-col min-h-[580px]">
                        {activeReviewTab === 'activities' ? (
                            <div className="space-y-4">
                                {newsItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/tong-ra-soat/tin-tuc/${item.id}`}
                                        className="group flex gap-4 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-[110px] sm:w-[130px] shrink-0 aspect-[16/10] overflow-hidden rounded-xl bg-slate-900 border border-slate-100 shadow-3xs">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between py-1 flex-grow min-w-0">
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-[#0f4c81] transition-colors leading-snug line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 font-light leading-relaxed">
                                                    {item.summary}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-slate-400">
                                                <Clock size={11} className="text-[#0f4c81]" />
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col flex-grow">
                                {/* Table Header */}
                                <div className="bg-[#0f4c81] text-white py-3 px-4 flex font-bold text-xs shrink-0">
                                    <div className="w-[100px] shrink-0">Ngày đăng</div>
                                    <div className="flex-1 pl-2">Nội dung văn bản hướng dẫn nghiệp vụ</div>
                                </div>

                                {/* Table List */}
                                <div className="divide-y divide-slate-100 flex-grow">
                                    {guidanceDocs.map((doc) => (
                                        <Link
                                            key={doc.id}
                                            to={`/tong-ra-soat/van-ban/${doc.id}`}
                                            className="flex py-3.5 px-4 hover:bg-blue-50/40 transition group items-start"
                                        >
                                            <div className="w-[100px] shrink-0 text-xs font-semibold text-slate-500 pt-0.5">
                                                {doc.date}
                                            </div>
                                            <div className="flex-1 pl-2 text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-700 leading-normal line-clamp-2">
                                                {doc.title}
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Footer Link */}
                                <Link
                                    to="/tong-ra-soat"
                                    state={{ activeTab: 'chi-dao-huong-dan' }}
                                    className="block w-full py-3.5 bg-slate-50 text-center text-xs font-bold text-[#0f4c81] hover:bg-gray-100 transition-colors border-t border-slate-100 shrink-0"
                                >
                                    Xem tất cả văn bản rà soát hệ thống
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 max-w-[1504px]">
                {/* Main Section Title - Clean single color */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f4c81] leading-tight">
                        Tổng rà soát hệ thống văn bản quy phạm pháp luật
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* Left Column: News Items (66% width on large screens) */}
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-[#0f4c81] border-l-4 border-[#ea492a] pl-3">
                                Hoạt động nổi bật
                            </h3>
                            <Link to="/tong-ra-soat" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                                Xem tất cả <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {newsItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/tong-ra-soat/tin-tuc/${item.id}`}
                                    className="group flex flex-col md:flex-row gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="w-full md:w-[200px] shrink-0 aspect-video md:aspect-[16/10] overflow-hidden rounded-lg shadow-inner">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 py-0.5">
                                        <h4 className="text-[16px] font-bold text-gray-900 group-hover:text-[#0f4c81] transition-colors leading-snug mb-1.5 line-clamp-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 text-[13px] mb-3 line-clamp-2 leading-relaxed">
                                            {item.summary}
                                        </p>
                                        <div className="mt-auto flex items-center gap-4 text-[12px] text-gray-500">
                                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                                <Clock size={14} className="text-[#0f4c81]" />
                                                <span>{item.date}</span>
                                                <span className="mx-1 opacity-30">|</span>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Guidance Documents (33% width on large screens) */}
                    <div className="lg:col-span-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-[#0f4c81] border-l-4 border-[#ea492a] pl-3">
                                Hướng dẫn nghiệp vụ mới nhất
                            </h3>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
                            {/* Table Header */}
                            <div className="bg-[#0f4c81] text-white py-3 px-4 flex font-bold text-sm shrink-0">
                                <div className="w-[100px] shrink-0">Ngày đăng</div>
                                <div className="flex-1 pl-2">Nội dung</div>
                            </div>

                            {/* Table List */}
                            <div className="divide-y divide-gray-100 flex-1 flex flex-col">
                                {guidanceDocs.map((doc) => (
                                    <Link
                                        key={doc.id}
                                        to={`/tong-ra-soat/van-ban/${doc.id}`}
                                        className="flex py-3 px-4 hover:bg-blue-50/50 transition group items-start flex-1"
                                    >
                                        <div className="w-[100px] shrink-0 text-[13px] font-semibold text-gray-500 pt-0.5">
                                            {doc.date}
                                        </div>
                                        <div className="flex-1 pl-2 text-[14px] font-medium text-gray-800 group-hover:text-blue-700 leading-snug line-clamp-2">
                                            {doc.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Footer Link */}
                            <Link
                                to="/tong-ra-soat"
                                state={{ activeTab: 'chi-dao-huong-dan' }}
                                className="block w-full py-3 bg-gray-50 text-center text-sm font-bold text-[#0f4c81] hover:bg-gray-100 transition-colors border-t border-gray-100 shrink-0"
                            >
                                Xem tất cả văn bản
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    if (isHalfWidth) {
        return renderContent();
    }

    return (
        <section className="py-8 bg-[#f8fafc]">
            {renderContent()}
        </section>
    );
};

export default TotalReviewSection;

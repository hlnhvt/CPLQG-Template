import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import LaoCaiV2BannerDecor, { BANNER_BG_CLASS } from './LaoCaiV2BannerDecor';

// Breadcrumb + khối mô tả đầu trang, cùng phong cách trang /lao-cai-v2/van-ban
// crumbs: [{ label, to? }] — mục cuối (không có "to") là trang hiện tại
const LaoCaiV2PageIntro = ({ crumbs = [], title, subtitle }) => (
    <>
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                <Link to="/lao-cai-v2" className="hover:text-blue-700">Trang chủ Lào Cai</Link>
                {crumbs.map((c) => (
                    <React.Fragment key={c.label}>
                        <ChevronRight size={14} />
                        {c.to
                            ? <Link to={c.to} className="hover:text-blue-700">{c.label}</Link>
                            : <span className="text-gray-800 font-semibold">{c.label}</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>

        <div className={`relative text-white py-8 sm:py-10 overflow-hidden ${BANNER_BG_CLASS} border-b border-indigo-400/30`}>
            <LaoCaiV2BannerDecor />
            <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                    {title}
                </h1>
                <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                {subtitle && (
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    </>
);

export default LaoCaiV2PageIntro;

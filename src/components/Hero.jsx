import React from 'react';
import { Search, BookA, Landmark, Users } from 'lucide-react';

const Hero = () => {
    return (
        <div
            className="relative bg-[var(--bg-header-bottom)] text-white pt-24 pb-32 overflow-hidden shadow-inner bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-3.png')" }}
        >
            <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-[500px]">
                <div className="max-w-5xl pt-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-2 text-white drop-shadow-md">
                        Đồng hành cùng<br />người dân, doanh nghiệp
                    </h2>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] drop-shadow-xl mb-12 italic tracking-tight whitespace-nowrap" style={{ textShadow: '0px 0px 20px rgba(255,255,255,0.4)' }}>
                        BƯỚC VÀO KỶ NGUYÊN MỚI
                    </h3>

                    <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                        <div className="flex gap-4 shrink-0">
                            <button className="w-14 h-14 rounded-full border border-white/30 bg-primary/40 backdrop-blur-md flex justify-center items-center hover:bg-primary transition-all hover:scale-105">
                                <Landmark size={24} className="text-white" />
                            </button>
                            <button className="w-14 h-14 rounded-full border border-white/30 bg-primary/40 backdrop-blur-md flex justify-center items-center hover:bg-primary transition-all hover:scale-105">
                                <Users size={24} className="text-white" />
                            </button>
                            <button className="w-14 h-14 rounded-full border border-white/30 bg-primary/40 backdrop-blur-md flex justify-center items-center hover:bg-primary transition-all hover:scale-105">
                                <BookA size={24} className="text-white" />
                            </button>
                        </div>

                        <div className="bg-white rounded-full flex items-center pl-6 pr-2 py-2 shadow-2xl w-full max-w-2xl transition-all focus-within:ring-2 ring-primary-light">
                            <input
                                type="text"
                                placeholder="Tra cứu nhanh văn bản quy phạm pháp luật"
                                className="flex-grow text-gray-800 outline-none bg-transparent placeholder-gray-400 text-sm md:text-base font-medium"
                            />
                            <button className="bg-primary-dark text-white p-2 md:p-3 rounded-full hover:bg-black transition-colors shadow-md ml-2 shrink-0">
                                <Search size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

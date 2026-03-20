import React, { useEffect, useState } from 'react';
import { Search, BookA, Landmark, Users } from 'lucide-react';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            className="relative bg-[var(--bg-header-bottom)] text-white pt-24 pb-20 overflow-hidden shadow-inner min-h-screen flex items-center h-screen"
        >
            {/* Animated Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
                style={{ 
                    backgroundImage: "url('/hero-bg-3.png')",
                    transform: isLoaded ? 'scale(1.05)' : 'scale(1.2)'
                }}
            />
            
            {/* Gradient Overlay for Text Readability - Use very light one or remove to match old brightness */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-header-bottom)]/50 to-transparent z-0 mix-blend-multiply"></div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col w-full h-full justify-center pb-48">
                <div className={`max-w-4xl transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-2 text-white drop-shadow-md">
                        Đồng hành cùng<br />người dân, doanh nghiệp
                    </h2>
                    <h3 
                        className={`text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] drop-shadow-xl mb-10 italic tracking-tight whitespace-nowrap transition-all duration-1000 delay-300 transform pt-2 pb-2 leading-relaxed ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`} 
                        style={{ textShadow: '0px 0px 20px rgba(255,255,255,0.4)' }}
                    >
                        BƯỚC VÀO KỶ NGUYÊN MỚI
                    </h3>

                    <div className={`flex flex-col md:flex-row items-center gap-4 mt-6 transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex gap-3 shrink-0">
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                <Landmark size={18} className="text-white group-hover:drop-shadow-md" />
                            </button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                <Users size={18} className="text-white group-hover:drop-shadow-md" />
                            </button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[1.5px] border-white/40 flex justify-center items-center hover:bg-white/20 transition-all hover:scale-105 group">
                                <BookA size={18} className="text-white group-hover:drop-shadow-md" />
                            </button>
                        </div>

                        <div className="bg-white rounded-full flex items-center pl-5 pr-1.5 py-1.5 shadow-2xl w-full max-w-xl transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] focus-within:ring-4 ring-blue-400 group">
                            <input
                                type="text"
                                placeholder="Tra cứu nhanh văn bản quy phạm pháp luật"
                                className="flex-grow text-gray-800 outline-none bg-transparent placeholder-gray-400 text-xs md:text-sm font-medium"
                            />
                            <button className="bg-[#1a3b8b] text-white p-2 md:p-2.5 rounded-full group-hover:bg-[#0a3a73] transition-colors shadow-md ml-2 shrink-0">
                                <Search size={18} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scroll indicator animation */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-white/60 text-xs tracking-widest uppercase mb-2">Khám phá</span>
                <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

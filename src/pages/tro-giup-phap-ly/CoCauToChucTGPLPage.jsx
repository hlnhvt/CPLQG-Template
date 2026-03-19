import React, { useEffect } from 'react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';
import { Building, Users, Network } from 'lucide-react';

const CoCauToChucTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const units = [
        { name: 'Phòng Quản lý Nghiệp vụ', icon: Building },
        { name: 'Phòng Tổ chức - Hành chính - Tổng hợp', icon: Users },
        { name: 'Trung tâm Thông tin dữ liệu Trợ giúp pháp lý', icon: Network },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-16 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-900/50 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm uppercase tracking-wider">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight drop-shadow-md">
                            CƠ CẤU TỔ CHỨC
                        </h1>
                        <p className="text-blue-50 text-lg leading-relaxed border-l-4 border-yellow-400 pl-4 py-1 font-medium bg-blue-900/20 rounded-r-lg">
                            Cơ cấu tổ chức bộ máy của Cục Trợ giúp pháp lý - Bộ Tư pháp và hệ thống tham gia TGPL tại các địa phương.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT CONTENT */}
                    <div className="flex-1 space-y-8">
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 space-y-8">
                            
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-blue-100 pb-4 uppercase tracking-wide">
                                I. Lãnh đạo Cục Trợ giúp pháp lý
                            </h2>
                            <p className="text-gray-700 text-[16px] font-medium leading-relaxed bg-blue-50/50 p-4 border border-blue-100 rounded-lg">
                                Lãnh đạo Cục Trợ giúp pháp lý gồm Cục trưởng và các Phó Cục trưởng do Bộ trưởng Bộ Tư pháp bổ nhiệm, miễn nhiệm, cách chức theo quy định của pháp luật.
                            </p>

                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-blue-100 pb-4 uppercase tracking-wide mt-10">
                                II. Các đơn vị thuộc Cục
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {units.map((unit, index) => {
                                    const Icon = unit.icon;
                                    return (
                                        <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center hover:bg-blue-50 transition-colors group cursor-pointer">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-sm group-hover:border-blue-300">
                                                <Icon size={28} className="text-blue-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-800 text-[15px]">{unit.name}</h3>
                                        </div>
                                    )
                                })}
                            </div>

                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-blue-100 pb-4 uppercase tracking-wide mt-10">
                                III. Tổ chức thực hiện ở địa phương
                            </h2>
                            <div className="space-y-4">
                                <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Trung tâm Trợ giúp pháp lý Nhà nước</h3>
                                        <p className="text-gray-600 leading-relaxed text-[15px]">
                                            Được thành lập tại 63 tỉnh/thành phố trực thuộc Trung ương. Các Trung tâm là đơn vị sự nghiệp công lập trực thuộc Sở Tư pháp, đóng vai trò nòng cốt trong việc cung cấp dịch vụ TGPL trên địa bàn.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Tổ chức đăng ký tham gia Trợ giúp pháp lý</h3>
                                        <p className="text-gray-600 leading-relaxed text-[15px]">
                                            Bao gồm các Tổ chức hành nghề luật sư, Trung tâm tư vấn pháp luật đáp ứng đủ điều kiện theo quy định của Luật Trợ giúp pháp lý và được Sở Tư pháp cấp Giấy chứng nhận đăng ký tham gia.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <TGPLSidebar />

                </div>
            </div>
        </div>
    );
};

export default CoCauToChucTGPLPage;

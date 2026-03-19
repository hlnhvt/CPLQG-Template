import React, { useEffect } from 'react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';
import { Shield, Users, Map, CheckCircle2 } from 'lucide-react';

const GioiThieuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { label: 'Tổ chức thực hiện TGPL', value: '200+', icon: Map },
        { label: 'Người thực hiện TGPL', value: '1.500+', icon: Users },
        { label: 'Vụ việc được hỗ trợ', value: '100.000+', icon: Shield },
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
                                Bộ Tư pháp
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight drop-shadow-md">
                            GIỚI THIỆU TRỢ GIÚP PHÁP LÝ
                        </h1>
                        <p className="text-blue-50 text-lg leading-relaxed border-l-4 border-yellow-400 pl-4 py-1 font-medium bg-blue-900/20 rounded-r-lg">
                            Bảo đảm quyền tiếp cận pháp luật miễn phí cho người yếu thế, góp phần thực hiện công bằng xã hội và xây dựng Nhà nước pháp quyền XHCN Việt Nam.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT CONTENT */}
                    <div className="flex-1 space-y-8">
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                            <div className="p-8 md:p-10 space-y-8">
                                
                                <div className="text-center pb-8 border-b border-gray-100">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-2 uppercase tracking-wide">Cục Trợ giúp pháp lý Việt Nam</h2>
                                    <p className="text-gray-500 font-medium">Cơ quan chủ quản: Bộ Tư pháp nước Cộng hòa XHCN Việt Nam</p>
                                </div>

                                <div className="space-y-6 text-[16px] text-gray-700 leading-relaxed text-justify">
                                    <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Tổng quan về Trợ giúp pháp lý</h3>
                                    <p>
                                        Trợ giúp pháp lý là việc cung cấp dịch vụ pháp lý miễn phí cho người được trợ giúp pháp lý trong vụ việc trợ giúp pháp lý theo quy định của Luật Trợ giúp pháp lý, góp phần bảo đảm quyền con người, quyền công dân trong tiếp cận công lý và bình đẳng trước pháp luật.
                                    </p>
                                    <p>
                                        Hệ thống cơ quan quản lý nhà nước về trợ giúp pháp lý bao gồm Bộ Tư pháp (Cục Trợ giúp pháp lý trực thuộc Bộ Tư pháp giúp Bộ trưởng thực hiện quản lý nhà nước về trợ giúp pháp lý) và Sở Tư pháp các tỉnh, thành phố trực thuộc Trung ương. Các tổ chức thực hiện trợ giúp pháp lý bao gồm Trung tâm trợ giúp pháp lý nhà nước tại 63 tỉnh/thành phố và các tổ chức hành nghề luật sư, tổ chức tư vấn pháp luật đăng ký tham gia.
                                    </p>

                                    <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mt-8">Đối tượng được trợ giúp pháp lý</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        {[
                                            'Người có công với cách mạng.',
                                            'Người thuộc hộ nghèo.',
                                            'Trẻ em.',
                                            'Người dân tộc thiểu số cư trú ở vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn.',
                                            'Người bị buộc tội từ đủ 16 tuổi đến dưới 18 tuổi.',
                                            'Người bị buộc tội thuộc hộ cận nghèo.',
                                            'Nạn nhân trong vụ việc bạo lực gia đình.',
                                            'Nạn nhân của tội phạm mua bán người.',
                                            'Người khuyết tật, người cao tuổi.'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                                <span className="text-[15px] font-medium text-gray-700 leading-snug">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 italic mt-2">
                                        * Các đối tượng khác theo quy định tại Điều 7 Luật Trợ giúp pháp lý năm 2017.
                                    </p>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mt-10">
                                    <h3 className="text-xl font-bold text-[#1e3a8a] mb-6 text-center uppercase tracking-wide">Mạng lưới & Năng lực phục vụ</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {stats.map((stat, idx) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-sm border border-blue-50 hover:-translate-y-1 transition-transform duration-300">
                                                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                                        <Icon size={28} />
                                                    </div>
                                                    <p className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
                                                    <p className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                                </div>
                                            )
                                        })}
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

export default GioiThieuTGPLPage;

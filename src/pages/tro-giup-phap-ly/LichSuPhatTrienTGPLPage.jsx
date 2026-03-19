import React, { useEffect } from 'react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const LichSuPhatTrienTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const timeline = [
        { year: '1997', title: 'Thành lập Tổ chức Trợ giúp pháp lý', desc: 'Thủ tướng Chính phủ ban hành Quyết định số 734/TTg về việc thành lập tổ chức trợ giúp pháp lý cho người nghèo và đối tượng chính sách.' },
        { year: '2006', title: 'Ban hành Luật Trợ giúp pháp lý đầu tiên', desc: 'Quốc hội khóa XI thông qua Luật Trợ giúp pháp lý ngày 29/6/2006, tạo cơ sở pháp lý vững chắc cho hoạt động trợ giúp pháp lý.' },
        { year: '2017', title: 'Sửa đổi Luật Trợ giúp pháp lý', desc: 'Quốc hội khóa XIV ban hành Luật Trợ giúp pháp lý số 11/2017/QH14 ngày 20/06/2017, nâng cao chất lượng và chuyên nghiệp hóa dịch vụ.' },
        { year: '2022', title: 'Chuyển đổi số trong Trợ giúp pháp lý', desc: 'Triển khai mạnh mẽ việc ứng dụng công nghệ thông tin, xây dựng phần mềm quản lý và số hóa hồ sơ vụ việc.' },
        { year: 'Nay', title: 'Phát triển Mạng lưới toàn quốc', desc: 'Hệ thống Trung tâm TGPL trải rộng khắp 63 tỉnh/thành phố, với hàng ngàn Trợ giúp viên pháp lý và Luật sư tham gia.' }
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
                            LỊCH SỬ HÌNH THÀNH VÀ PHÁT TRIỂN
                        </h1>
                        <p className="text-blue-50 text-lg leading-relaxed border-l-4 border-yellow-400 pl-4 py-1 font-medium bg-blue-900/20 rounded-r-lg">
                            Hành trình hình thành và phát triển của Hệ thống Trợ giúp pháp lý Việt Nam, không ngừng nỗ lực vì quyền tiếp cận công lý của người dân.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT CONTENT */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-10">
                            
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-8 border-b-2 border-blue-100 pb-4">
                                CÁC CỘT MỐC QUAN TRỌNG
                            </h2>

                            <div className="relative border-l-4 border-blue-100 ml-4 lg:ml-8 space-y-12">
                                {timeline.map((item, index) => (
                                    <div key={index} className="relative pl-8 md:pl-10">
                                        <div className="absolute -left-3 top-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-blue-300 transition-colors shadow-sm">
                                            <span className="text-blue-600 font-extrabold text-2xl block mb-2">{item.year}</span>
                                            <h3 className="text-[17px] font-bold text-gray-900 mb-2 uppercase tracking-wide">{item.title}</h3>
                                            <p className="text-gray-600 text-[15px] leading-relaxed text-justify">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
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

export default LichSuPhatTrienTGPLPage;

import LaoCaiV2BannerDecor from '../../../components/laocaiV2/LaoCaiV2BannerDecor';
import React, { useEffect } from 'react';
import TGPLSidebar from '../../../components/laocaiV2/tro-giup-phap-ly/TGPLSidebar';
import { Gavel, Globe, Users, FileText, CheckCircle2 } from 'lucide-react';

const ChucNangNhiemVuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const duties = [
        {
            icon: Gavel,
            title: 'Tư vấn pháp luật',
            desc: 'Hướng dẫn, giải đáp, đưa ra ý kiến, cung cấp thông tin pháp luật, giúp người được TGPL bảo vệ quyền, lợi ích hợp pháp của mình.'
        },
        {
            icon: Users,
            title: 'Tham gia tố tụng',
            desc: 'Cử Trợ giúp viên pháp lý, Luật sư tham gia tố tụng với tư cách người bào chữa, người bảo vệ quyền và lợi ích hợp pháp cho người được TGPL.'
        },
        {
            icon: FileText,
            title: 'Đại diện ngoài tố tụng',
            desc: 'Đại diện cho người được TGPL để thực hiện các công việc liên quan đến pháp luật ngoài quá trình tố tụng.'
        },
        {
            icon: Globe,
            title: 'Tuyên truyền pháp luật',
            desc: 'Tổ chức các hoạt động truyền thông, phổ biến, giáo dục pháp luật tại nhà thường xuyên, định kỳ tại cơ sở.'
        }
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white pt-16 pb-20 relative overflow-hidden">
                <LaoCaiV2BannerDecor />
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-900/50 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm uppercase tracking-wider">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight drop-shadow-md">
                            CHỨC NĂNG, NHIỆM VỤ
                        </h1>
                        <p className="text-blue-50 text-lg leading-relaxed border-l-4 border-yellow-400 pl-4 py-1 font-medium bg-blue-900/20 rounded-r-lg">
                            Các chức năng, nhiệm vụ chính của Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai và các Chi nhánh trợ giúp pháp lý theo quy định hiện hành.
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
                            
                            <section>
                                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-blue-100 pb-4 uppercase tracking-wide">
                                    I. Vị trí và Chức năng
                                </h2>
                                <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-lg p-5">
                                    <p className="text-gray-700 text-[16px] font-medium leading-relaxed text-justify">
                                        Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai là đơn vị sự nghiệp công lập trực thuộc Sở Tư pháp tỉnh Lào Cai, có tư cách pháp nhân, con dấu và tài khoản riêng; có chức năng thực hiện trợ giúp pháp lý miễn phí cho người được trợ giúp pháp lý theo quy định của Luật Trợ giúp pháp lý, góp phần bảo đảm quyền tiếp cận công lý của người dân trên địa bàn tỉnh.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 border-b-2 border-blue-100 pb-4 uppercase tracking-wide mt-10">
                                    II. Các Hình thức Trợ giúp pháp lý
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {duties.map((duty, index) => {
                                        const Icon = duty.icon;
                                        return (
                                            <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 mb-4">
                                                    <Icon size={24} className="text-blue-600" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-lg mb-2">{duty.title}</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed text-justify">{duty.desc}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>

                            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-10">
                                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-emerald-500 pl-3 mb-4 uppercase">
                                    Nhiệm vụ quản lý nhà nước
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Tham mưu Sở Tư pháp trình UBND tỉnh ban hành kế hoạch, văn bản chỉ đạo công tác trợ giúp pháp lý trên địa bàn tỉnh.',
                                        'Hướng dẫn nghiệp vụ, kiểm tra hoạt động trợ giúp pháp lý của các Chi nhánh và cộng tác viên.',
                                        'Tổ chức bồi dưỡng, tập huấn nghiệp vụ cho người thực hiện trợ giúp pháp lý trên địa bàn tỉnh.',
                                        'Phối hợp lựa chọn, ký hợp đồng thực hiện trợ giúp pháp lý với tổ chức hành nghề luật sư, tổ chức tư vấn pháp luật.',
                                        'Thống kê, báo cáo Sở Tư pháp, UBND tỉnh về kết quả công tác trợ giúp pháp lý theo quy định.'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                                            <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <TGPLSidebar />

                </div>
            </div>
        </div>
    );
};

export default ChucNangNhiemVuTGPLPage;

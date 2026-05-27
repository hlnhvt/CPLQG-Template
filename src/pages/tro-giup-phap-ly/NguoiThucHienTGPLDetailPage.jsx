import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserCircle2, Briefcase, MapPin, Award, CheckCircle, ChevronRight, Hash, Phone, Mail } from 'lucide-react';

const NguoiThucHienTGPLDetailPage = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Mock Data based on ID
    // In real app, fetch this data using the id parameter
    const worker = {
        name: 'Nguyễn Văn An',
        code: 'TGV.HN.001',
        title: 'Trợ giúp viên pháp lý hạng II',
        org: 'Trung tâm Trợ giúp pháp lý Nhà nước Thành phố Hà Nội',
        orgId: 1, // To link back to org detail
        province: 'Hà Nội',
        experience: '12 năm',
        education: 'Thạc sĩ Luật học',
        phone: '0988.xxx.xxx',
        email: 'an.nv@tgplhanoi.gov.vn',
        status: 'Đang hoạt động',
        fields: ['Hình sự', 'Dâm sự', 'Hành chính'],
        bio: 'Ông Nguyễn Văn An đã có hơn 12 năm kinh nghiệm công tác trong lĩnh vực trợ giúp pháp lý. Từng trực tiếp tham gia bào chữa, bảo vệ thành công quyền và lợi ích hợp pháp cho hàng trăm người yếu thế trong xã hội, đặc biệt là người nghèo và trẻ em có hoàn cảnh khó khăn trên địa bàn Thủ đô.',
        achievements: [
            'Bằng khen của Bộ trưởng Bộ Tư pháp năm 2021',
            'Chiến sĩ thi đua cấp cơ sở nhiều năm liền (2018 - 2022)'
        ]
    };

    return (
        <div className="bg-[#f0f2f5] min-h-screen pb-20 font-sans">
            
            {/* Breadcrumb Area */}
            <div className="bg-white border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center text-sm text-gray-500 gap-2">

                        <Link to="/tro-giup-phap-ly/nguoi-thuc-hien" className="hover:text-blue-600">Người thực hiện TGPL</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-medium truncate max-w-xs">{worker.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1000px] mt-8">
                
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                    </div>
                    
                    <div className="px-8 pb-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start -mt-16 relative z-10">
                        <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-md">
                            <div className="bg-gray-100 w-full h-full rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
                                <UserCircle2 size={70} className="text-gray-400" />
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left pt-2 sm:pt-16">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1.5">{worker.name}</h1>
                                    <div className="mb-3">
                                        <Link to={`/tro-giup-phap-ly/to-chuc/${worker.orgId}`} className="inline-flex items-center gap-1.5 text-[#1e3a8a] hover:text-blue-600 font-semibold text-lg transition-colors">
                                            <Briefcase size={18} className="text-[#1e3a8a]" />
                                            {worker.org}
                                        </Link>
                                    </div>
                                    <div className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded uppercase tracking-wide">
                                        {worker.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Column - Contact & Fast Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Thông tin thẻ</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Hash size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Mã số thẻ</p>
                                        <p className="font-bold text-gray-900">{worker.code}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Award size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Trình độ chuyên môn</p>
                                        <p className="font-bold text-gray-900">{worker.education}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Thông tin liên hệ</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-blue-500" />
                                    <p className="font-medium text-gray-800">{worker.phone}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-blue-500" />
                                    <a href={`mailto:${worker.email}`} className="font-medium text-blue-600 hover:underline break-all">{worker.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="md:col-span-2 space-y-6">

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <Briefcase size={20} className="text-[#1e3a8a]" />
                                <h2 className="text-lg font-bold text-gray-900">Thông tin hoạt động</h2>
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Lĩnh vực chuyên môn</h3>
                                <div className="flex flex-wrap gap-2">
                                    {worker.fields.map((field, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-md text-[13px] font-medium bg-gray-50 text-gray-700 border border-gray-200">
                                            <CheckCircle size={14} className="mr-1.5 shrink-0 text-emerald-500" />
                                            {field}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default NguoiThucHienTGPLDetailPage;

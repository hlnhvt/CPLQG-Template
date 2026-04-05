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
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{worker.name}</h1>
                                    <p className="text-[#1e3a8a] font-bold text-lg mb-2">{worker.title}</p>
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
                                    <Briefcase size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Kinh nghiệm nghề nghiệp</p>
                                        <p className="font-bold text-gray-900">{worker.experience}</p>
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
                                <UserCircle2 size={20} className="text-[#1e3a8a]" />
                                <h2 className="text-lg font-bold text-gray-900">Giới thiệu bản thân</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed text-[15px] text-justify mb-6">
                                    {worker.bio}
                                </p>
                                
                                {worker.achievements && worker.achievements.length > 0 && (
                                    <>
                                        <h3 className="text-[15px] font-bold text-gray-800 mb-3 block">Thành tích nổi bật:</h3>
                                        <ul className="space-y-2">
                                            {worker.achievements.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-gray-700 text-[15px]">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0"></div>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <Briefcase size={20} className="text-[#1e3a8a]" />
                                <h2 className="text-lg font-bold text-gray-900">Thông tin hoạt động</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Tổ chức trực thuộc</h3>
                                    <Link to={`/tro-giup-phap-ly/to-chuc/${worker.orgId}`} className="flex items-center gap-3 p-4 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors group">
                                        <div className="w-10 h-10 rounded bg-white flex items-center justify-center shrink-0 border border-blue-100">
                                            <Briefcase size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1e3a8a] group-hover:text-blue-600 transition-colors">{worker.org}</p>
                                            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={14}/> {worker.province}</p>
                                        </div>
                                    </Link>
                                </div>

                                <div>
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
        </div>
    );
};

export default NguoiThucHienTGPLDetailPage;

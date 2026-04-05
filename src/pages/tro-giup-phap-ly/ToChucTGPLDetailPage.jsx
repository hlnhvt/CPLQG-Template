import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Globe, Clock, ChevronRight, FileText, CheckCircle } from 'lucide-react';

const ToChucTGPLDetailPage = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Mock Data based on ID
    const org = {
        name: 'Trung tâm Trợ giúp pháp lý Nhà nước Thành phố Hà Nội',
        code: 'TGPL.HN.001',
        type: 'Trung tâm TGPL Nhà nước',
        province: 'Hà Nội',
        address: 'Số 12A, Đường Tôn Thất Thuyết, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành phố Hà Nội',
        phone: '024.1234.5678',
        hotline: '1900.6179',
        email: 'ctgpl.hanoi@moj.gov.vn',
        website: 'https://tgplhanoi.gov.vn',
        workingHours: 'Sáng: 08h00 - 11h30, Chiều: 13h30 - 17h00 (Từ Thứ 2 đến Thứ 6)',
        fields: ['Hình sự', 'Dân sự', 'Hành chính', 'Hôn nhân & Gia đình', 'Lao động', 'Đất đai'],
        director: 'Nguyễn Văn A',
        memberCount: 24,
        description: 'Trung tâm Trợ giúp pháp lý Nhà nước Thành phố Hà Nội là đơn vị sự nghiệp công lập trực thuộc Sở Tư pháp Thành phố Hà Nội, có chức năng cung cấp dịch vụ pháp lý miễn phí cho người được trợ giúp pháp lý theo quy định của pháp luật trong các vụ việc trợ giúp pháp lý, góp phần bảo đảm quyền con người, quyền công dân trong tiếp cận công lý và bình đẳng trước pháp luật.',
    };

    return (
        <div className="bg-[#f0f2f5] min-h-screen pb-20 font-sans">
            
            {/* Breadcrumb Area */}
            <div className="bg-white border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex items-center text-sm text-gray-500 gap-2">

                        <Link to="/tro-giup-phap-ly/to-chuc" className="hover:text-blue-600">Tổ chức thực hiện TGPL</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-medium truncate max-w-xs">{org.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-6">
                
                {/* Org Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#1e3a8a]"></div>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 shadow-inner">
                            <Building2 size={48} className="text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                                    {org.type}
                                </span>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                    {org.name}
                                </h1>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <span className="font-semibold text-gray-500">Mã đơn vị:</span>
                                    <span className="font-bold text-gray-800">{org.code}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <span className="font-semibold text-gray-500">Khu vực:</span>
                                    <span className="font-bold text-gray-800">{org.province}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Col - Details */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Giới thiệu */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <FileText size={20} className="text-[#1e3a8a]" />
                                <h2 className="text-lg font-bold text-gray-900">Giới thiệu chung</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed text-[15px] mb-6 text-justify">
                                    {org.description}
                                </p>
                                
                                <h3 className="text-[15px] font-bold text-gray-800 mb-4 border-l-4 border-emerald-500 pl-3">
                                    Lĩnh vực Trợ giúp pháp lý
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {org.fields.map((field, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-md text-[13px] font-medium bg-blue-50 text-blue-700 border border-blue-100 transition-colors hover:bg-blue-100 cursor-default">
                                            <CheckCircle size={14} className="mr-1.5 shrink-0 opacity-70" />
                                            {field}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Thong tin hoat dong */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <Building2 size={20} className="text-[#1e3a8a]" />
                                <h2 className="text-lg font-bold text-gray-900">Thông tin hoạt động</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Giám đốc / Trưởng tổ chức</p>
                                    <p className="font-bold text-gray-900">{org.director}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Số lượng nhân sự TGPL</p>
                                    <p className="font-bold text-gray-900">{org.memberCount} Người</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Col - Contact Card */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">Thông tin liên hệ</h2>
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                            </div>
                            <div className="p-6 space-y-6">
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                        <MapPin size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Trụ sở chính</p>
                                        <p className="text-[15px] font-medium text-gray-800 leading-snug">{org.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                        <Phone size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Điện thoại / Hotline</p>
                                        <p className="text-[16px] font-bold text-gray-900">{org.phone}</p>
                                        {org.hotline && (
                                            <p className="text-[14px] font-bold text-red-600 mt-0.5 flex items-center gap-1">
                                                Hotline: {org.hotline}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                        <Mail size={20} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Thư điện tử</p>
                                        <a href={`mailto:${org.email}`} className="text-[15px] font-medium text-blue-600 hover:underline">{org.email}</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                        <Globe size={20} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">Website</p>
                                        <a href={org.website} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-blue-600 hover:underline">{org.website}</a>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6">
                                    <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <Clock size={20} className="text-gray-500 shrink-0" />
                                        <div>
                                            <p className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-wider">Giờ làm việc</p>
                                            <p className="text-sm font-medium text-gray-700 leading-relaxed">{org.workingHours}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex gap-3">
                                <button className="flex-1 bg-white border border-blue-200 text-blue-700 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm">
                                    Xem vị trí (Bản đồ)
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ToChucTGPLDetailPage;

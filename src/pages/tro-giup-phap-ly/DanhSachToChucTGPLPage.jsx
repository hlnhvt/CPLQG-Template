import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Building, Briefcase, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const DanhSachToChucTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [page, setPage] = useState(1);

    const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Quảng Ninh', 'Nghệ An', 'Thanh Hóa', 'Bình Dương', 'Đồng Nai'];
    const fields = ['Hình sự', 'Dân sự', 'Hành chính', 'Hôn nhân & Gia đình', 'Lao động', 'Đất đai', 'Doanh nghiệp'];

    // Mock Data
    const mockOrganizations = [
        { id: 1, code: 'TGPL.HN.001', name: 'Trung tâm Trợ giúp pháp lý Nhà nước TP Hà Nội', type: 'Trung tâm TGPL Nhà nước', province: 'Hà Nội', address: 'Số 12A, Tôn Thất Thuyết, Nam Từ Liêm, Hà Nội', phone: '024.1234.5678', fields: ['Hình sự', 'Dân sự', 'Đất đai'] },
        { id: 2, code: 'TGPL.HCM.001', name: 'Trung tâm Trợ giúp pháp lý Nhà nước TP.HCM', type: 'Trung tâm TGPL Nhà nước', province: 'TP. Hồ Chí Minh', address: '470 Nguyễn Tri Phương, Phường 9, Quận 10, TP.HCM', phone: '028.3844.1111', fields: ['Hình sự', 'Dân sự', 'Lao động'] },
        { id: 3, code: 'VP.HN.015', name: 'Văn phòng Luật sư Ánh Sáng Công Lý', type: 'Văn phòng luật sư', province: 'Hà Nội', address: 'Tầng 3, Tòa nhà HL, Cầu Giấy, Hà Nội', phone: '0904.555.666', fields: ['Doanh nghiệp', 'Hôn nhân & Gia đình'] },
        { id: 4, code: 'CTY.DN.022', name: 'Công ty Luật TNHH Miền Trung', type: 'Tổ chức hành nghề luật sư', province: 'Đà Nẵng', address: 'Số 55 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', phone: '0236.888.9999', fields: ['Hành chính', 'Đất đai', 'Dân sự'] },
        { id: 5, code: 'TV.NA.005', name: 'Trung tâm Tư vấn pháp luật Hội Luật gia Nghệ An', type: 'Tổ chức tư vấn pháp luật', province: 'Nghệ An', address: 'Số 10 Trường Thi, TP Vinh, Nghệ An', phone: '0238.355.7777', fields: ['Hôn nhân & Gia đình', 'Dân sự'] },
    ];

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedProvince('');
        setSelectedField('');
        setPage(1);
    };

    const getTypeColor = (type) => {
        switch(type) {
            case 'Trung tâm TGPL Nhà nước': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Tổ chức hành nghề luật sư': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Văn phòng luật sư': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Tổ chức tư vấn pháp luật': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            {/* Header Area */}
            <div className="bg-white border-b border-gray-200 shadow-sm pt-8 pb-8">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2 uppercase tracking-wide flex items-center gap-3">
                        <Building size={32} className="text-blue-600" />
                        Tổ chức thực hiện Trợ giúp pháp lý
                    </h1>
                    <p className="text-gray-500 text-[15px] max-w-3xl">
                        Tìm kiếm và tra cứu thông tin các Trung tâm Trợ giúp pháp lý Nhà nước, tổ chức hành nghề luật sư và tổ chức tư vấn pháp luật có đăng ký tham gia trợ giúp pháp lý trên toàn quốc.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] mt-8">
                
                {/* Search & Filter Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="Nhập tên tổ chức hoặc mã số đơn vị..." 
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-[15px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        </div>
                        <div className="w-full md:w-64 shrink-0">
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-[15px]"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                                <option value="">-- Tất cả Tỉnh/Thành phố --</option>
                                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="w-full md:w-64 shrink-0">
                            <select 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-[15px]"
                                value={selectedField}
                                onChange={(e) => setSelectedField(e.target.value)}
                            >
                                <option value="">-- Tất cả Lĩnh vực TGPL --</option>
                                {fields.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                        <button 
                            onClick={resetFilters}
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Làm mới
                        </button>
                        <button 
                            className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-blue-800 text-white rounded-lg font-medium shadow-md transition-colors flex items-center gap-2"
                        >
                            <Search size={18} />
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Results Area */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        Tìm thấy <span className="text-blue-600">345</span> tổ chức phù hợp
                    </h2>
                    <div className="text-sm text-gray-500 hidden sm:block">
                        Hiển thị 1 - 5 trên 345 kết quả
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="py-4 px-6 text-sm font-bold tracking-wider text-gray-700 uppercase w-16 text-center">STT</th>
                                    <th className="py-4 px-6 text-sm font-bold tracking-wider text-gray-700 uppercase">Tên tổ chức</th>
                                    <th className="py-4 px-6 text-sm font-bold tracking-wider text-gray-700 uppercase w-48">Loại hình</th>
                                    <th className="py-4 px-6 text-sm font-bold tracking-wider text-gray-700 uppercase w-64">Liên hệ & Địa chỉ</th>
                                    <th className="py-4 px-6 text-sm font-bold tracking-wider text-gray-700 uppercase w-40 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockOrganizations.map((org, index) => (
                                    <tr key={org.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                                        <td className="py-4 px-6 text-center font-medium text-gray-500">{index + 1}</td>
                                        <td className="py-4 px-6">
                                            <Link to={`/tro-giup-phap-ly/to-chuc/${org.id}`} className="font-bold text-[#1e3a8a] hover:text-blue-600 text-[15px] mb-1 block">
                                                {org.name}
                                            </Link>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {org.fields.map((field, i) => (
                                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                        {field}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded text-[12px] font-bold border ${getTypeColor(org.type)} text-center leading-tight shadow-sm`}>
                                                {org.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                                    <span className="text-sm text-gray-700 line-clamp-2" title={org.address}>{org.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={16} className="text-gray-400 shrink-0" />
                                                    <span className="text-sm font-medium text-gray-700">{org.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <Link to={`/tro-giup-phap-ly/to-chuc/${org.id}`} className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-md text-sm font-medium transition-colors shadow-sm">
                                                Chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 hidden sm:inline">Hiển thị</span>
                            <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                            <span className="text-sm text-gray-500 hidden sm:inline">kết quả / trang</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-gray-400 bg-white cursor-not-allowed">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-8 h-8 rounded border border-blue-600 bg-blue-600 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                                1
                            </button>
                            <button className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors">
                                2
                            </button>
                            <button className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors">
                                3
                            </button>
                            <span className="px-2 text-gray-400">...</span>
                            <button className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors">
                                35
                            </button>
                            <button className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DanhSachToChucTGPLPage;

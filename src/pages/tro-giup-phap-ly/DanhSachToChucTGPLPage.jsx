import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Building, Briefcase, RefreshCw, ChevronLeft, ChevronRight, Scale, ChevronDown } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const DanhSachToChucTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState('Trung tâm trợ giúp pháp lý');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const tabs = [
        'Trung tâm trợ giúp pháp lý',
        'Tổ chức đăng ký tham gia TGPL',
        'Tổ chức ký hợp đồng TGPL',
        'Chi nhánh'
    ];

    // Mock Data
    const mockOrganizations = [
        { id: 1, code: 'TT.01.66', name: '1_05769', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_13308', phone: '0980013648', status: 'Hoạt động' },
        { id: 2, code: 'TT.01.03', name: '1_29753', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_20961', phone: '0980027164', status: 'Hoạt động' },
        { id: 3, code: 'TT.01.127', name: 'name_1050', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_31150', phone: '0980004054', status: 'Hoạt động' },
        { id: 4, code: 'TT.01.128', name: 'name_1057', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_13741', phone: '0980024683', status: 'Hoạt động' },
        { id: 5, code: 'TT.01.126', name: 'name_1089', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_24998', phone: '0980029525', status: 'Hoạt động' },
        { id: 6, code: 'TT.01.129', name: 'name_1190', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_17297', phone: '0980021596', status: 'Hoạt động' },
        { id: 7, code: 'TT.01.130', name: 'name_1220', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_4491', phone: '0980016123', status: 'Hoạt động' },
        { id: 8, code: 'TT.01.131', name: 'name_1295', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_891', phone: '0980023983', status: 'Hoạt động' },
        { id: 9, code: 'TT.01.132', name: 'name_1334', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_27506', phone: '0980016686', status: 'Hoạt động' },
        { id: 10, code: 'TT.01.134', name: 'name_1432', tabCategory: 'Trung tâm trợ giúp pháp lý', address: 'address_28510', phone: '0980031211', status: 'Hoạt động' },
    ];

    const resetFilters = () => {
        setSearchTerm('');
        setPage(1);
    };

    const filteredOrganizations = mockOrganizations.filter(org => {
        const matchTab = org.tabCategory === activeTab;
        const matchSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            org.code.toLowerCase().includes(searchTerm.toLowerCase());
        return matchTab && matchSearch;
    });

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-16 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-900/50 text-blue-100 text-[11px] font-bold px-4 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm uppercase tracking-wider">
                                VỀ CHÚNG TÔI
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight tracking-tight drop-shadow-md flex items-center gap-3 uppercase">
                            <Scale size={36} className="text-white" />
                            TỔ CHỨC THỰC HIỆN
                        </h1>
                        <p className="text-blue-50 text-[15px] leading-relaxed border-l-4 border-yellow-400 pl-4 py-1.5 font-medium bg-blue-900/20 rounded-r-lg max-w-2xl shadow-sm">
                            Tìm kiếm và tra cứu thông tin các Trung tâm Trợ giúp pháp lý Nhà nước, tổ chức hành nghề luật sư và tổ chức tư vấn pháp luật có đăng ký tham gia trợ giúp pháp lý trên toàn quốc.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-12 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* LEFT CONTENT */}
                    <div className="flex-1">
                        
                        {/* Tabs */}
                        <div className="bg-gray-100 rounded-t-xl flex flex-col md:flex-row border border-gray-200 overflow-hidden shadow-sm">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`whitespace-nowrap px-4 py-3.5 text-[14px] font-bold transition-colors flex-1 text-center md:border-r border-b md:border-b-0 border-gray-200 last:border-r-0 last:border-b-0 ${
                                        activeTab === tab 
                                        ? 'bg-white text-[#1e3a8a]' 
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => { setActiveTab(tab); setPage(1); }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search Area */}
                        <div className="bg-white p-5 border-x border-b border-gray-200 shadow-sm relative mb-6 rounded-b-xl">
                            <div className="flex gap-3 items-center">
                                <div className="flex-1 relative">
                                    <input 
                                        type="text" 
                                        placeholder="Tìm kiếm theo tên tổ chức..." 
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-[14px] focus:outline-none focus:border-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded text-[14px] font-medium hover:bg-blue-800 transition-colors shadow-sm">
                                    Tìm kiếm
                                </button>
                                <button onClick={resetFilters} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded text-[14px] font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                    Xóa
                                </button>
                            </div>
                            <div className="flex justify-end mt-3">
                                <button className="text-blue-600 text-[13px] hover:underline flex items-center gap-1 font-medium">
                                    Tìm kiếm nâng cao <ChevronDown size={14}/>
                                </button>
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-12 text-center">STT</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-28">Mã đơn vị</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800">Tên tổ chức</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-28 text-center">Trạng thái</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-64">Liên hệ & Địa chỉ</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-24 text-center">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrganizations.length > 0 ? (
                                            filteredOrganizations.map((org, index) => (
                                                <tr key={org.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-4 text-center text-[13px] font-semibold text-gray-700">{index + 1}</td>
                                                    <td className="py-4 px-4 text-[13px] text-blue-600 font-bold">{org.code}</td>
                                                    <td className="py-4 px-4 text-[14px] font-bold text-gray-800">{org.name}</td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="whitespace-nowrap inline-block px-3 py-1 border border-green-500 text-green-600 text-[11px] font-bold rounded-sm bg-green-50 uppercase tracking-wide">
                                                            {org.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex flex-col gap-1.5 text-[13px] text-gray-600 font-medium">
                                                            <div className="flex items-start gap-2">
                                                                <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                                                <span className="line-clamp-2">{org.address}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Phone size={14} className="text-gray-400 shrink-0" />
                                                                <span>{org.phone}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <Link to={`/tro-giup-phap-ly/to-chuc/${org.id}`} className="whitespace-nowrap inline-block px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-[13px] hover:bg-gray-50 hover:text-gray-900 transition-colors bg-white font-medium shadow-sm">
                                                            Chi tiết
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-10 text-center text-gray-500 text-[14px]">
                                                    Không tìm thấy dữ liệu phù hợp.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {filteredOrganizations.length > 0 && (
                                <div className="py-5 border-t border-gray-200 flex justify-center items-center gap-1.5">
                                    <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-500 text-[13px] bg-white cursor-not-allowed">Trước</button>
                                    <button className="w-8 h-8 flex items-center justify-center border border-[#1e3a8a] bg-[#1e3a8a] text-white rounded text-[13px] font-bold">1</button>
                                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-700 rounded text-[13px] hover:bg-gray-50 font-medium">2</button>
                                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-700 rounded text-[13px] hover:bg-gray-50 font-medium">3</button>
                                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-700 rounded text-[13px] hover:bg-gray-50 font-medium">4</button>
                                    <span className="px-1 text-gray-400">...</span>
                                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-700 rounded text-[13px] hover:bg-gray-50 font-medium">21</button>
                                    <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 text-[13px] bg-white hover:bg-gray-50 font-medium">Sau</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT CONTENT (SIDEBAR) */}
                    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
                        <TGPLSidebar />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default DanhSachToChucTGPLPage;

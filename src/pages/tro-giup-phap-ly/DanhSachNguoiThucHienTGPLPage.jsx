import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronDown } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const DanhSachNguoiThucHienTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [activeTab, setActiveTab] = useState('Trợ giúp viên pháp lý');

    const tabs = [
        'Trợ giúp viên pháp lý',
        'Luật sư thực hiện trợ giúp pháp lý',
        'Cộng tác viên trợ giúp pháp lý'
    ];
    
    // Mock Data
    const mockWorkers = [
        { id: 1, code: 'BC260615135043', name: 'admin_stp_test', org: 'Sở tư pháp test', role: '-', province: 'Thành phố Hà Nội', tabCategory: 'Trợ giúp viên pháp lý' },
        { id: 2, code: 'BC260615160728', name: 'admin_tt_test', org: 'trung tâm test', role: '-', province: 'Thành phố Đà Nẵng', tabCategory: 'Trợ giúp viên pháp lý' },
        { id: 3, code: '-', name: 'A Lê Hồ Thủy', org: 'Trung tâm TGPL NN tỉnh Phú Yên', role: 'Khác', province: 'Tỉnh Phú Yên', tabCategory: 'Trợ giúp viên pháp lý' },
        { id: 4, code: 'LS.12345', name: 'Luật sư Nguyễn Văn A', org: 'Đoàn Luật sư Hà Nội', role: 'Luật sư', province: 'Thành phố Hà Nội', tabCategory: 'Luật sư thực hiện trợ giúp pháp lý' },
        { id: 5, code: '-', name: 'Âu Đức Nam', org: 'Chi nhánh trợ giúp pháp lý - Tuyên Quang', role: 'Cộng tác viên', province: 'Tuyên Quang', tabCategory: 'Cộng tác viên trợ giúp pháp lý' },
    ];

    const filteredWorkers = mockWorkers.filter(w => 
        w.tabCategory === activeTab && 
        w.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <Users size={36} className="text-white" />
                            NGƯỜI THỰC HIỆN
                        </h1>
                        <p className="text-blue-50 text-[15px] leading-relaxed border-l-4 border-yellow-400 pl-4 py-1.5 font-medium bg-blue-900/20 rounded-r-lg max-w-2xl shadow-sm">
                            Thông tin về các cá nhân thực hiện Trợ giúp pháp lý, bao gồm chuyên gia, Luật sư và Trợ giúp viên pháp lý.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-12 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* LEFT CONTENT */}
                    <div className="flex-1 space-y-6">
                        
                        <div>
                            {/* Tabs */}
                            <div className="bg-gray-100 rounded-t-xl flex flex-col md:flex-row border border-gray-200 overflow-hidden shadow-sm">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`whitespace-nowrap px-4 py-3.5 text-[14px] font-bold transition-colors flex-1 text-center md:border-r border-b md:border-b-0 border-gray-200 last:border-r-0 last:border-b-0 ${
                                            activeTab === tab 
                                            ? 'bg-white text-[#1e3a8a] border-t-2 border-t-blue-600' 
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 border-t-2 border-t-transparent'
                                        }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Search & Filter Area */}
                            <div className="bg-white p-6 border-x border-b border-gray-200 shadow-sm relative mb-6 rounded-b-xl">
                                {/* Simple Search */}
                                <div className="flex gap-3 items-center mb-2">
                                    <div className="flex-1 relative">
                                    <input 
                                        type="text" 
                                        placeholder="Tìm kiếm theo họ tên..." 
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-[14px] focus:outline-none focus:border-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded text-[14px] font-medium hover:bg-blue-800 transition-colors shadow-sm">
                                    Tìm kiếm
                                </button>
                                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded text-[14px] font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                    Xóa
                                </button>
                            </div>
                            <div className="flex justify-end mb-6">
                                <button 
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className="text-blue-600 text-[13px] hover:underline flex items-center gap-1 font-medium"
                                >
                                    Tìm kiếm nâng cao <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {/* Advanced Filters */}
                            {showAdvanced && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                                        <div>
                                            <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">Đơn vị công tác</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-[14px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white">
                                                <option>-- Tất cả --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">Chức vụ</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-[14px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white">
                                                <option>-- Tất cả --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">Trạng thái hoạt động</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-[14px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white">
                                                <option>-- Tất cả --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">Trình độ nghiệp vụ</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-[14px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white">
                                                <option>-- Tất cả --</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] text-gray-700 font-medium">Số lượng kết quả trên trang:</span>
                                        <select className="px-2 py-1 border border-gray-300 rounded text-[13px] focus:outline-none bg-white font-medium">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                        </div>

                        {/* Results Table */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-12 text-center whitespace-nowrap">STT</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-36 whitespace-nowrap">Mã người thực hiện</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 whitespace-nowrap">Tên người thực hiện</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-72 whitespace-nowrap">Thuộc tổ chức</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 whitespace-nowrap">Chức vụ</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 whitespace-nowrap">Khu vực</th>
                                            <th className="py-4 px-4 text-[13px] font-bold text-gray-800 w-24 text-center whitespace-nowrap">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredWorkers.length > 0 ? (
                                            filteredWorkers.map((worker, index) => (
                                                <tr key={worker.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-4 text-center text-[13px] font-semibold text-gray-700">{index + 1}</td>
                                                    <td className="py-4 px-4 text-[13px] text-blue-600 font-medium">{worker.code}</td>
                                                    <td className="py-4 px-4 text-[13px] font-bold text-gray-800">{worker.name}</td>
                                                    <td className="py-4 px-4 text-[13px] text-gray-800 leading-tight">{worker.org}</td>
                                                    <td className="py-4 px-4 text-[13px] text-gray-800 whitespace-nowrap">{worker.role}</td>
                                                    <td className="py-4 px-4 text-[13px] text-gray-800 whitespace-nowrap">{worker.province}</td>
                                                    <td className="py-4 px-4 text-center">
                                                        <Link to={`/tro-giup-phap-ly/nguoi-thuc-hien/${worker.id}`} className="whitespace-nowrap inline-block px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-[13px] hover:bg-gray-50 hover:text-gray-900 transition-colors bg-white font-medium shadow-sm">
                                                            Chi tiết
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="py-8 text-center text-gray-500 text-[14px]">
                                                    Không tìm thấy dữ liệu phù hợp trong mục này.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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

export default DanhSachNguoiThucHienTGPLPage;

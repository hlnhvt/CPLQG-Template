import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Award, RefreshCw, ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react';

const DanhSachNguoiThucHienTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [activeTab, setActiveTab] = useState('tro-giup-vien');

    const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Quảng Ninh', 'Nghệ An'];
    const fields = ['Hình sự', 'Dân sự', 'Hành chính', 'Hôn nhân & Gia đình', 'Lao động', 'Đất đai', 'Doanh nghiệp'];

    const tabs = [
        { id: 'tro-giup-vien', label: 'Trợ giúp viên pháp lý' },
        { id: 'luat-su', label: 'Luật sư thực hiện TGPL' },
        { id: 'cong-tac-vien', label: 'Cộng tác viên TGPL' },
    ];

    // Mock Data
    const mockWorkers = [
        { id: 1, type: 'tro-giup-vien', code: 'TGV.HN.001', name: 'Nguyễn Văn An', org: 'Trung tâm TGPL Nhà nước TP Hà Nội', province: 'Hà Nội', fields: ['Hình sự', 'Dân sự'], experience: '10 năm', photo: null },
        { id: 2, type: 'tro-giup-vien', code: 'TGV.HCM.012', name: 'Trần Thị Bình', org: 'Trung tâm TGPL Nhà nước TP.HCM', province: 'TP. Hồ Chí Minh', fields: ['Hôn nhân & Gia đình', 'Lao động'], experience: '8 năm', photo: null },
        { id: 3, type: 'luat-su', code: 'LS.DN.045', name: 'Lê Hoàng Cường', org: 'Công ty Luật TNHH Miền Trung', province: 'Đà Nẵng', fields: ['Hành chính', 'Đất đai'], experience: '15 năm', photo: null },
        { id: 4, type: 'luat-su', code: 'LS.HN.088', name: 'Phạm Thu Dung', org: 'Văn phòng Luật sư Ánh Sáng Công Lý', province: 'Hà Nội', fields: ['Doanh nghiệp', 'Dân sự'], experience: '12 năm', photo: null },
        { id: 5, type: 'cong-tac-vien', code: 'CTV.NA.005', name: 'Hoàng Văn Em', org: 'Hội Luật gia tỉnh Nghệ An', province: 'Nghệ An', fields: ['Dân sự'], experience: '5 năm', photo: null },
    ];

    const filteredWorkers = mockWorkers.filter(w => w.type === activeTab);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedProvince('');
        setSelectedField('');
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            {/* Header Area */}
            <div className="bg-white border-b border-gray-200 shadow-sm pt-8 pb-8">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2 uppercase tracking-wide flex items-center gap-3">
                        <Briefcase size={32} className="text-blue-600" />
                        Người thực hiện Trợ giúp pháp lý
                    </h1>
                    <p className="text-gray-500 text-[15px] max-w-3xl">
                        Tra cứu thông tin danh sách Trợ giúp viên pháp lý, Luật sư và Cộng tác viên tham gia mạng lưới trợ giúp pháp lý trên toàn quốc.
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
                                placeholder="Nhập họ tên hoặc mã số thẻ..." 
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-[15px]"
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

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 sticky top-16 bg-[#f4f7fb] z-10 pt-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-6 py-4 text-[15px] font-bold tracking-wide uppercase transition-colors relative ${
                                activeTab === tab.id 
                                ? 'text-blue-700' 
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-md"></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        Tìm thấy <span className="text-blue-600">{filteredWorkers.length}</span> người thực hiện phù hợp
                    </h2>
                </div>

                {/* Results List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredWorkers.map((worker) => (
                        <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-5 hover:border-blue-300 transition-colors">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                                {worker.photo ? (
                                    <img src={worker.photo} alt={worker.name} className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle2 size={40} className="text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 space-y-3">
                                <div>
                                    <Link to={`/tro-giup-phap-ly/nguoi-thuc-hien/${worker.id}`} className="text-xl font-bold text-[#1e3a8a] hover:text-blue-600 mb-1 block">
                                        {worker.name}
                                    </Link>
                                    <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100">
                                        Mã thẻ: {worker.code}
                                    </span>
                                </div>
                                <div className="space-y-1.5 text-sm text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <Briefcase size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                        <span className="font-medium text-gray-800">{worker.org}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400 shrink-0" />
                                        <span>Khu vực: <span className="font-medium text-gray-800">{worker.province}</span></span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Award size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                        <span>Lĩnh vực: <span className="font-medium text-gray-800">{worker.fields.join(', ')}</span></span>
                                    </div>
                                </div>
                                <div className="pt-3 flex justify-end">
                                    <Link to={`/tro-giup-phap-ly/nguoi-thuc-hien/${worker.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group">
                                        Xem hồ sơ 
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {filteredWorkers.length > 0 && (
                     <div className="mt-8 flex justify-center">
                        <div className="flex items-center gap-1">
                            <button className="w-10 h-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-400 cursor-not-allowed">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="w-10 h-10 rounded-lg border border-blue-600 bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                                1
                            </button>
                            <button className="w-10 h-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                                2
                            </button>
                            <button className="w-10 h-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DanhSachNguoiThucHienTGPLPage;

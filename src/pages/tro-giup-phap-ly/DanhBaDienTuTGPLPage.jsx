import React, { useState, useEffect } from 'react';
import { Phone, Mail, Building2, Search, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const DanhBaDienTuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const itemsPerPage = 8; // Adjust based on grid layout

    // Precisely 12 Legal Aid Centers across major provinces/cities
    const contacts = [
        {
            name: 'Trung tâm TGPL Nhà nước TP. Hà Nội',
            province: 'Hà Nội',
            phone: '024.37681121',
            email: 'ctgplhanoi@hanoi.gov.vn',
            address: 'Số 145 Hai Bà Trưng, quận Hoàn Kiếm, TP. Hà Nội'
        },
        {
            name: 'Trung tâm TGPL Nhà nước TP. Hồ Chí Minh',
            province: 'TP. Hồ Chí Minh',
            phone: '028.38221520',
            email: 'ctgplhcm@tphcm.gov.vn',
            address: '141-143 Pasteur, Phường 6, Quận 3, TP. Hồ Chí Minh'
        },
        {
            name: 'Trung tâm TGPL Nhà nước TP. Đà Nẵng',
            province: 'Đà Nẵng',
            phone: '0236.3822365',
            email: 'ctgpl@danang.gov.vn',
            address: '16 Bạch Đằng, quận Hải Châu, TP. Đà Nẵng'
        },
        {
            name: 'Trung tâm TGPL Nhà nước TP. Hải Phòng',
            province: 'Hải Phòng',
            phone: '0225.3842111',
            email: 'ctgplhaiphong@haiphong.gov.vn',
            address: 'Số 2 Lạch Tray, quận Ngô Quyền, TP. Hải Phòng'
        },
        {
            name: 'Trung tâm TGPL Nhà nước TP. Cần Thơ',
            province: 'Cần Thơ',
            phone: '0292.3820455',
            email: 'ctgplcantho@cantho.gov.vn',
            address: 'Số 290 đường 30/4, quận Ninh Kiều, TP. Cần Thơ'
        },
        {
            name: 'CN09 [Tỉnh Tuyên Quang]',
            province: 'Tuyên Quang',
            phone: '0980004054',
            email: 'abc@mail.com',
            address: 'address_31150'
        },
        {
            name: '1_05769',
            province: 'Lào Cai',
            phone: '0980013648',
            email: 'abc@mail.com',
            address: 'address_13308'
        },
        {
            name: '1_29753',
            province: 'Lào Cai',
            phone: '0980027164',
            email: 'abc@mail.com',
            address: 'address_20961'
        },
        {
            name: 'name_1057',
            province: 'Nghệ An',
            phone: '0980024683',
            email: 'abc@mail.com',
            address: 'address_13741'
        },
        {
            name: 'name_1089',
            province: 'Nghệ An',
            phone: '0980029525',
            email: 'abc@mail.com',
            address: 'address_24998'
        },
        {
            name: 'name_1190',
            province: 'Nghệ An',
            phone: '0980021596',
            email: 'abc@mail.com',
            address: 'address_17297'
        },
        {
            name: 'name_1220',
            province: 'Cà Mau',
            phone: '0980016123',
            email: 'abc@mail.com',
            address: 'address_4491'
        }
    ];

    const provinces = Array.from(new Set(contacts.map(c => c.province))).sort();

    const filteredContacts = contacts.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.phone.includes(searchTerm);
        const matchProvince = selectedProvince === 'all' || c.province === selectedProvince;
        return matchSearch && matchProvince;
    });

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            {/* HERO SECTION */}
            <div className="bg-[#295fac] text-white pt-10 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                                DANH BẠ
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight flex items-center gap-3 uppercase">
                            <Phone size={32} className="text-white" />
                            DANH BẠ ĐIỆN TỬ TRỢ GIÚP PHÁP LÝ
                        </h1>
                        <div className="bg-[#1e488d] border-l-2 border-[#fbbf24] px-4 py-2 text-white font-semibold text-[14px] uppercase max-w-lg shadow-inner">
                            DANH BẠ ĐIỆN TỬ TRỢ GIÚP PHÁP LÝ
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Search Block */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    placeholder="Tìm kiếm theo tên tổ chức..."
                                    className="w-full md:flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-blue-400 transition-colors text-black"
                                />
                                <div className="flex gap-2 w-full md:w-auto shrink-0">
                                    <button className="flex-1 md:flex-none bg-[#1e3a8a] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm">
                                        Tìm kiếm
                                    </button>
                                    <button 
                                        onClick={() => { setSearchTerm(''); setSelectedProvince('all'); setCurrentPage(1); }}
                                        className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-3 text-[13px]">
                                <span className="text-gray-600 font-medium">
                                    Tổng: <strong className="text-black">{filteredContacts.length}</strong> dữ liệu
                                </span>
                                <button
                                    onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                                >
                                    Tìm kiếm nâng cao {isAdvancedSearchOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>

                            {/* Advanced Search Area */}
                            {isAdvancedSearchOpen && (
                                <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-medium text-gray-700">Tỉnh/Thành phố</label>
                                            <select
                                                value={selectedProvince}
                                                onChange={e => { setSelectedProvince(e.target.value); setCurrentPage(1); }}
                                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-blue-400 text-black bg-white"
                                            >
                                                <option value="all">Tất cả tỉnh/thành phố</option>
                                                {provinces.map(prov => (
                                                    <option key={prov} value={prov}>{prov}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contacts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {paginatedContacts.length > 0 ? (
                                paginatedContacts.map((contact, idx) => (
                                    <div
                                        key={contact.name + idx}
                                        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0 border border-blue-100/50">
                                            <Building2 size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-[15px] text-[#1a2b5e] leading-snug mb-3">
                                                {contact.name}
                                            </h3>
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-2">
                                                    <Phone size={15} className="text-gray-400 shrink-0" />
                                                    <span className="text-[14px] font-bold text-gray-900">{contact.phone}</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <MapPin size={15} className="text-gray-400 shrink-0 mt-0.5" />
                                                    <span className="text-[13px] text-gray-500 line-clamp-2 leading-tight">{contact.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail size={15} className="text-gray-400 shrink-0" />
                                                    <span className="text-[13px] text-blue-600 truncate">{contact.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-16 bg-white rounded-xl border border-gray-100 text-gray-400 text-sm shadow-sm">
                                    Không tìm thấy dữ liệu.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pt-4 pb-2 flex justify-center items-center gap-2">
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Trước
                                </button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-[14px] font-bold transition-colors ${
                                            currentPage === page 
                                                ? 'bg-[#3b82f6] text-white shadow-sm border border-[#3b82f6]' 
                                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-[14px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Sau
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <TGPLSidebar />
                </div>
            </div>
        </div>
    );
};

export default DanhBaDienTuTGPLPage;

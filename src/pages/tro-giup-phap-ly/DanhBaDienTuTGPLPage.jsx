import React, { useState, useEffect } from 'react';
import { Phone, Mail, Building2, Search, Map, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const DanhBaDienTuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
            name: 'Trung tâm TGPL Nhà nước tỉnh Lào Cai',
            province: 'Lào Cai',
            phone: '0214.3824774',
            email: 'tgpllaocai@gmail.com',
            address: 'Tầng 3, Trụ sở Khối 9, phường Nam Cường, TP. Lào Cai'
        },
        {
            name: 'Trung tâm TGPL Nhà nước tỉnh Quảng Ninh',
            province: 'Quảng Ninh',
            phone: '0203.3825355',
            email: 'ctgplquangninh@quangninh.gov.vn',
            address: 'Tầng 2, Liên cơ quan số 3, phường Hồng Hà, TP. Hạ Long'
        },
        {
            name: 'Trung tâm TGPL Nhà nước tỉnh Nghệ An',
            province: 'Nghệ An',
            phone: '0238.3844666',
            email: 'ctgplnghean@nghean.gov.vn',
            address: 'Số 52 Nguyễn Thị Minh Khai, TP. Vinh, tỉnh Nghệ An'
        },
        {
            name: 'Trung tâm TGPL Nhà nước tỉnh Thừa Thiên Huế',
            province: 'Thừa Thiên Huế',
            phone: '0234.3822212',
            email: 'ctgplhue@thuathienhue.gov.vn',
            address: 'Tòa nhà Hành chính, đường Tôn Đức Thắng, TP. Huế'
        },
        {
            name: 'Trung tâm TGPL Nhà nước tỉnh Khánh Hòa',
            province: 'Khánh Hòa',
            phone: '0258.3822188',
            email: 'ctgplkhanhhoa@khanhhoa.gov.vn',
            address: 'Số 3A Hàn Thuyên, phường Xương Huân, TP. Nha Trang'
        },
        {
            name: 'Trung tâm TGPL Nhà nước tỉnh Lâm Đồng',
            province: 'Lâm Đồng',
            phone: '0263.3828999',
            email: 'ctgpllamdong@lamdong.gov.vn',
            address: 'Tầng 1 Khu Hành chính tập trung, số 36 Trần Phú, TP. Đà Lạt'
        },
        {
            name: 'Trung tâm TGPL Nhà nước tỉnh Cà Mau',
            province: 'Cà Mau',
            phone: '0290.3831234',
            email: 'ctgplcamau@camau.gov.vn',
            address: 'Số 84 đường 3/2, Phường 5, TP. Cà Mau, tỉnh Cà Mau'
        }
    ];

    // Extract unique sorted list of provinces
    const provinces = Array.from(new Set(contacts.map(c => c.province))).sort();

    // Filter contacts based on search query and selected province
    const filteredContacts = contacts.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.phone.includes(searchTerm);
        const matchProvince = selectedProvince === 'all' || c.province === selectedProvince;
        return matchSearch && matchProvince;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-[#1e3a8a] text-white pt-12 pb-16 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1100px] relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
                        Danh bạ điện tử Trợ giúp pháp lý
                    </h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        Tra cứu số điện thoại, địa chỉ và thông tin liên hệ chính thức của các Trung tâm Trợ giúp pháp lý Nhà nước tại các tỉnh, thành phố trên toàn quốc.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1100px] -mt-8 relative z-20">
                {/* Search & Filter Top Bar */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                placeholder="Nhập tên trung tâm, địa chỉ hoặc số điện thoại..."
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[14.5px]"
                            />
                            <Search className="absolute left-4 top-4 text-gray-400" size={19} />
                        </div>

                        <div className="w-full md:w-72 relative">
                            <div className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                                <Filter size={18} />
                            </div>
                            <select
                                value={selectedProvince}
                                onChange={e => { setSelectedProvince(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-11 pr-8 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[14.5px] font-medium text-gray-700 appearance-none cursor-pointer"
                            >
                                <option value="all">Tất cả tỉnh/thành phố</option>
                                {provinces.map(prov => (
                                    <option key={prov} value={prov}>{prov}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-4 text-gray-400 pointer-events-none">
                                <span className="text-xs">▼</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedContacts.length > 0 ? (
                        paginatedContacts.map((contact, idx) => (
                            <div
                                key={contact.name + idx}
                                className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm flex items-start gap-4.5 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 border border-blue-100">
                                    <Building2 size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[11.5px] font-bold rounded-md mb-2">
                                        {contact.province}
                                    </div>
                                    <h3 className="font-bold text-base text-[#1e3a8a] leading-snug mb-2.5 line-clamp-2">
                                        {contact.name}
                                    </h3>
                                    <div className="space-y-2 mt-1">
                                        <p className="text-[16px] font-extrabold text-gray-900 flex items-center gap-2">
                                            <Phone size={15} className="text-blue-500 shrink-0" />
                                            <span>{contact.phone}</span>
                                        </p>
                                        <div className="h-px w-full bg-gray-100 my-2.5"></div>
                                        <p className="text-[13.5px] text-gray-600 flex items-start gap-2 leading-relaxed">
                                            <Map size={15} className="mt-0.5 shrink-0 text-gray-400" />
                                            <span className="line-clamp-2">{contact.address}</span>
                                        </p>
                                        {contact.email && (
                                            <p className="text-[13.5px] text-blue-600 flex items-center gap-2 truncate">
                                                <Mail size={15} className="shrink-0 text-gray-400" />
                                                <span className="truncate">{contact.email}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400 text-sm shadow-sm">
                            Không tìm thấy trung tâm trợ giúp pháp lý nào phù hợp với bộ lọc hiện tại.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-colors shadow-sm"
                            title="Trang trước"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl text-[14px] font-bold transition-all shadow-sm ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                    } border`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-colors shadow-sm"
                            title="Trang sau"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DanhBaDienTuTGPLPage;

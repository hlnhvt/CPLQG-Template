import React, { useEffect } from 'react';
import { Phone, Mail, Building2, Search, Map } from 'lucide-react';

const DanhBaDienTuTGPLPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contacts = [
        { name: 'Cục Trợ giúp pháp lý', phone: '024.62739634', email: 'ctgpl@moj.gov.vn', address: '60 Trần Phú, Ba Đình, Hà Nội' },
        { name: 'Đường dây nóng trợ giúp pháp lý', phone: '1900.6179', email: '', address: 'Miễn phí cước gọi toàn quốc', highlight: true },
        { name: 'Trung tâm TGPL Nhà nước TP. Hà Nội', phone: '024.37681121', email: 'ctgplhanoi@hanoi.gov.vn', address: 'Số 145 Hai Bà Trưng, Hà Nội' },
        { name: 'Trung tâm TGPL Nhà nước TP. HCM', phone: '028.38221520', email: 'ctgplhcm@tphcm.gov.vn', address: '141-143 Pasteur, Quận 3, TP. Hồ Chí Minh' },
        { name: 'Trung tâm TGPL Nhà nước Đà Nẵng', phone: '0236.3822365', email: 'ctgpl@danang.gov.vn', address: '16 Bạch Đằng, Hải Châu, Đà Nẵng' },
    ];

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="bg-[#1e3a8a] text-white pt-12 pb-16 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-[1000px] relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
                        Danh bạ điện tử Trợ giúp pháp lý
                    </h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        Tra cứu nhanh đường dây nóng, số điện thoại và địa chỉ liên hệ của các cơ quan quản lý và Trung tâm Trợ giúp pháp lý trên toàn quốc.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1000px] -mt-8 relative z-20">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8 flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Nhập tên cơ quan, tỉnh/thành phố cần tìm..."
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-[15px]"
                        />
                        <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                    </div>
                    <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md">
                        Tra cứu
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contacts.map((contact, idx) => (
                        <div key={idx} className={`rounded-xl p-6 border ${contact.highlight ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-gray-200 shadow-sm'} flex items-start gap-4 hover:-translate-y-1 transition-transform`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${contact.highlight ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg mb-2 ${contact.highlight ? 'text-red-600 uppercase' : 'text-[#1e3a8a]'} line-clamp-1`}>{contact.name}</h3>
                                <div className="space-y-1.5 mt-2">
                                    <p className="text-[17px] font-bold text-gray-900 flex items-center gap-2">
                                        {contact.phone}
                                    </p>
                                    <div className="h-px w-full bg-gray-100 my-2"></div>
                                    <p className="text-[14px] text-gray-600 flex items-start gap-2">
                                        <Map size={16} className="mt-0.5 shrink-0 text-gray-400" />
                                        <span>{contact.address}</span>
                                    </p>
                                    {contact.email && (
                                        <p className="text-[14px] text-blue-600 flex items-center gap-2">
                                            <Mail size={16} className="shrink-0 text-gray-400" />
                                            <span>{contact.email}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DanhBaDienTuTGPLPage;

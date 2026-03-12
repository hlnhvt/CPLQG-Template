import React from 'react';

const LinkedPortals = () => {
    const portals = [
        { name: 'Cổng Thông tin Điện tử Chính phủ' },
        { name: 'Cổng Thông tin Điện tử Bộ Tư pháp' },
        { name: 'Cổng Thông tin Điện tử Quốc hội' },
        { name: 'Cổng Thông tin Điện tử Tòa án nhân dân tối cao' },
        { name: 'Cổng Thông tin Điện tử Viện kiểm sát nhân dân tối cao' },
        { name: 'Bộ Công an' },
        { name: 'Bộ Quốc phòng' },
        { name: 'Bộ Nội vụ' },
        { name: 'Bộ Ngoại giao' },
        { name: 'Cơ sở dữ liệu Quốc gia về Văn bản Pháp luật' },
        { name: 'Cơ sở dữ liệu Quốc gia về TTHC' },
        { name: 'Cơ sở dữ liệu Hộ tịch điện tử' },
    ];

    return (
        <div className="bg-white py-10 border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-bold text-[#0f4c81] text-center mb-8 uppercase tracking-wide">
                    Hệ thống cổng thông tin liên kết
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-center">
                    {portals.map((portal, index) => (
                        <a key={index} href="#" className="flex items-center justify-center p-3 border border-gray-100 rounded hover:border-[#0f4c81] hover:text-[#0f4c81] hover:shadow-sm transition">
                            <span className="font-semibold text-gray-700 hover:text-[#0f4c81] line-clamp-2">{portal.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LinkedPortals;

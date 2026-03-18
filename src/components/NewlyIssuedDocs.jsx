import React from 'react';
import { Link } from 'react-router-dom';

const NewlyIssuedDocs = () => {
    const docs = [
        { date: '10/11/2025', title: 'Thông tư số 12/2025/TT-BTP quy định về tiêu chuẩn nghiệp vụ các ngạch công chức chuyên ngành hành chính...' },
        { date: '05/11/2025', title: 'Nghị định 40/2025/NĐ-CP hướng dẫn chi tiết thi hành một số điều của Luật Đất đai năm 2024' },
        { date: '01/11/2025', title: 'Quyết định 15/2025/QĐ-TTg của Thủ tướng Chính phủ về việc ban hành kế hoạch hành động quốc gia...' },
        { date: '28/10/2025', title: 'Thông tư 08/2025/TT-BCA quy định chi tiết xử phạt vi phạm hành chính trong lĩnh vực giao thông...' }
    ];

    return (
        <div className="container mx-auto px-4 pt-12 pb-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Documents List */}
                <div className="flex-1 flex flex-col h-full min-w-0">
                    <div className="flex justify-between items-center bg-[#07244c] text-white px-4 py-2 rounded-t-lg shrink-0">
                        <h3 className="font-bold text-lg">Văn bản mới ban hành</h3>
                        <a href="#" className="text-sm hover:underline hover:text-yellow-300">Xem tất cả</a>
                    </div>
                    <div className="bg-white border rounded-b-lg shadow-sm flex-1 flex flex-col">
                        <div className="flex font-bold bg-gray-100 text-[#0f4c81] text-sm py-2 px-4 border-b shrink-0">
                            <div className="w-1/4">Ngày ban hành</div>
                            <div className="w-3/4">Trích yếu</div>
                        </div>
                        <ul className="flex flex-col flex-1 pb-1">
                            {docs.map((doc, index) => (
                                <Link to={`/van-ban/${index + 1}`} key={index} className="flex text-sm py-4 px-4 border-b last:border-0 hover:bg-gray-50 transition cursor-pointer flex-1 items-center">
                                    <div className="w-1/4 text-gray-500 font-medium">{doc.date}</div>
                                    <div className="w-3/4 text-gray-800 line-clamp-3 hover:text-[#0f4c81]">{doc.title}</div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column - Highlight Banner */}
                <div className="flex flex-col gap-4 w-full lg:w-[320px] shrink-0">
                    <Link to="/tong-ra-soat" className="rounded-lg overflow-hidden shadow-md relative group block w-full bg-red-800" style={{ flex: 3 }}>
                        <img src="/banner-nghi-quyet.png" alt="Đại hội Đảng" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </Link>
                    <Link to="/tong-ra-soat" className="rounded-lg overflow-hidden shadow-md relative group block w-full bg-red-800" style={{ flex: 1 }}>
                        <img src="/banner-tong-ra-soat-v2.png" alt="Tổng rà soát văn bản quy phạm pháp luật" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewlyIssuedDocs;

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
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Documents List */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center bg-[#07244c] text-white px-4 py-2 rounded-t-lg">
                        <h3 className="font-bold text-lg">Văn bản mới ban hành</h3>
                        <a href="#" className="text-sm hover:underline hover:text-yellow-300">Xem tất cả</a>
                    </div>
                    <div className="bg-white border rounded-b-lg shadow-sm">
                        <div className="flex font-bold bg-gray-100 text-[#0f4c81] text-sm py-2 px-4 border-b">
                            <div className="w-1/4">Ngày ban hành</div>
                            <div className="w-3/4">Trích yếu</div>
                        </div>
                        <ul>
                            {docs.map((doc, index) => (
                                <Link to="/news/1" key={index} className="flex text-sm py-3 px-4 border-b hover:bg-gray-50 transition cursor-pointer">
                                    <div className="w-1/4 text-gray-500 font-medium">{doc.date}</div>
                                    <div className="w-3/4 text-gray-800 line-clamp-2 hover:text-[#0f4c81]">{doc.title}</div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column - Highlight Banner */}
                <div className="lg:col-span-1 rounded-lg overflow-hidden shadow-lg border-2 border-yellow-500 relative bg-red-600 group cursor-pointer h-full min-h-[250px] flex items-center justify-center">
                    {/* Pattern background pattern for banner */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="absolute top-4 border-b-2 border-yellow-400 w-3/4 flex justify-center pb-2">
                        <span className="text-yellow-400 text-3xl font-serif">★</span>
                    </div>

                    <div className="relative z-10 text-center px-6">
                        <h3 className="text-yellow-400 font-bold text-xl md:text-3xl uppercase tracking-wider drop-shadow-md">
                            CHÀO MỪNG ĐẠI HỘI
                        </h3>
                        <h4 className="text-white font-black text-2xl md:text-4xl uppercase mt-2 drop-shadow-md">
                            ĐẠI BIỂU TOÀN QUỐC
                        </h4>
                        <h4 className="text-yellow-400 font-black text-3xl md:text-5xl uppercase mt-1 drop-shadow-lg drop-shadow-yellow-600">
                            LẦN THỨ XIV CỦA ĐẢNG
                        </h4>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-red-800/80 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default NewlyIssuedDocs;

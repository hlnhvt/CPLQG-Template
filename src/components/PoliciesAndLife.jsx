import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliciesAndLife = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#0f4c81] border-b-2 border-[#0f4c81] pb-2 inline-block mb-6 uppercase tracking-wide">
                Chính sách & Cuộc sống
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left - Ban chỉ đạo */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-[#0f4c81]">Ban Chỉ đạo Nghị quyết số 06-NQ/TW</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Featured article */}
                        <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="md:w-1/2 aspect-video overflow-hidden rounded">
                                <Link to="/news/1">
                                    <img src="/thumb1.png" alt="Hội nghị" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                                </Link>
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center">
                                <Link to="/news/1">
                                    <h4 className="font-bold text-[#0f4c81] text-base hover:text-blue-600 cursor-pointer line-clamp-3 leading-snug">
                                        Tổ chức Diễn đàn Thưởng đỉnh về Pháp luật và Phát triển nhân dịp Kỷ niệm Ngày Pháp luật Việt Nam
                                    </h4>
                                </Link>
                                <p className="text-xs text-gray-500 mt-2">Ngày 28/10/2025 | 10:30</p>
                            </div>
                        </div>

                        {/* Secondary article */}
                        <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="md:w-2/5 overflow-hidden rounded">
                                <img src="/thumb2.png" alt="Meeting" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                            </div>
                            <div className="md:w-3/5 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-800 text-sm hover:text-[#0f4c81] cursor-pointer line-clamp-3">
                                    Hội nghị phổ biến, quán triệt các đạo luật do Bộ Công an tham mưu xây dựng
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">Ngày 27/10/2025 | 08:00</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Theo dòng pháp luật */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-[#0f4c81]">Theo dòng pháp luật</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Video post */}
                        <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="md:w-1/2 relative bg-black rounded aspect-video overflow-hidden group cursor-pointer">
                                <img src="/thumb1.png" alt="Speaker" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="text-white w-12 h-12 opacity-80 group-hover:scale-110 transition" />
                                </div>
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center">
                                <h4 className="font-bold text-[#0f4c81] text-base hover:text-blue-600 cursor-pointer line-clamp-3 leading-snug">
                                    Sửa luật Đất đai: Đẩy nhanh quá trình phục hồi của thị trường bất động sản
                                </h4>
                                <p className="text-xs text-gray-500 mt-2">Ngày 26/10/2025 | 14:15</p>
                            </div>
                        </div>

                        {/* Text post */}
                        <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="md:w-2/5 overflow-hidden rounded">
                                <img src="/thumb2.png" alt="Meeting" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                            </div>
                            <div className="md:w-3/5 flex flex-col justify-center">
                                <h4 className="font-bold text-gray-800 text-sm hover:text-[#0f4c81] cursor-pointer line-clamp-3">
                                    Hoàn thiện thể chế xử lý tài sản kê biên, tài sản bảo đảm trong các vụ án
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">Ngày 25/10/2025 | 09:30</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PoliciesAndLife;

import React from 'react';
import { HelpCircle, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsActivities = () => {
    return (
        <div className="bg-[#1b64aa] text-white py-12 mt-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold border-b-2 border-white/30 pb-2 inline-block mb-6 uppercase tracking-wide">
                    Sự kiện & Hoạt động
                </h2>

                {/* Highlight Event with Countdown */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6 flex flex-col md:flex-row text-gray-800">
                    <div className="md:w-1/2 p-6 flex flex-col justify-center relative">
                        <span className="text-blue-600 font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Hoạt động nổi bật
                        </span>
                        <h3 className="text-2xl md:text-3xl text-[#0f4c81] uppercase leading-tight mb-6">
                            CHÀO MỪNG ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ XIV CỦA ĐẢNG
                        </h3>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Thời gian còn lại:</p>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-blue-600">8</div>
                                    <div className="text-xs text-gray-500 uppercase">Tháng</div>
                                </div>
                                <div className="text-3xl font-black text-gray-300">:</div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-blue-600">3</div>
                                    <div className="text-xs text-gray-500 uppercase">Ngày</div>
                                </div>
                                <div className="text-3xl font-black text-gray-300">:</div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-blue-600">45</div>
                                    <div className="text-xs text-gray-500 uppercase">Giờ</div>
                                </div>
                                <div className="text-3xl font-black text-gray-300">:</div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-blue-600">28</div>
                                    <div className="text-xs text-gray-500 uppercase">Phút</div>
                                </div>
                            </div>
                        </div>

                        <Link to="/news/4" className="bg-blue-600 text-white rounded-full px-6 py-2 w-fit font-medium hover:bg-blue-700 transition">
                            Chi tiết
                        </Link>
                    </div>

                    {/* Graphic side of banner */}
                    <div className="md:w-1/2 bg-red-600 relative overflow-hidden flex flex-col items-center justify-center p-8">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                        <span className="text-yellow-400 text-5xl font-serif mb-4 z-10">★</span>
                        <h3 className="text-yellow-400 font-bold text-2xl md:text-3xl uppercase tracking-wider drop-shadow-md z-10 text-center">
                            CHÀO MỪNG ĐẠI HỘI
                        </h3>
                        <h4 className="text-white text-3xl md:text-4xl uppercase mt-2 drop-shadow-md z-10 text-center">
                            ĐẠI BIỂU TOÀN QUỐC LẦN THỨ XIV CỦA ĐẢNG
                        </h4>
                    </div>
                </div>

                {/* Small Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-lg hover:-translate-y-1 transition duration-300 text-gray-800">
                        <div className="bg-blue-100 p-4 rounded-full text-blue-600 relative">
                            <HelpCircle size={40} />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="font-bold text-lg text-[#0f4c81] mb-2">Hỏi đáp</h4>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">Công dân có thể gửi câu hỏi để được cơ quan nhà nước trả lời, tư vấn trực tiếp về các vấn đề pháp luật.</p>
                            <Link to="/news/5" className="text-blue-600 text-sm font-semibold flex items-center justify-center md:justify-start gap-1 hover:underline">
                                Tham gia ngay <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-lg hover:-translate-y-1 transition duration-300 text-gray-800">
                        <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                            <GraduationCap size={40} />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="font-bold text-lg text-[#0f4c81] mb-2">Kỹ năng pháp luật</h4>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">Khóa học kỹ năng, kiến thức chuyên môn về pháp luật cho người dân, doanh nghiệp.</p>
                            <Link to="/news/6" className="text-blue-600 text-sm font-semibold flex items-center justify-center md:justify-start gap-1 hover:underline">
                                Tham gia ngay <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button className="border border-white/50 text-white rounded-full px-8 py-2 hover:bg-white hover:text-[#1b64aa] transition font-medium">
                        Xem thêm sự kiện
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EventsActivities;

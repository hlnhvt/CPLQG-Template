import React from 'react';
import { HelpCircle, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsActivities = () => {
    return (
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-12 mt-8 transition-colors">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold border-b-2 border-white/30 pb-2 inline-block mb-6 uppercase tracking-wide">
                    Sự kiện & Hoạt động
                </h2>

                {/* Highlight Event with Countdown */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6 flex flex-col md:flex-row text-gray-800">
                    <div className="md:w-1/2 p-6 flex flex-col justify-center relative">
                        <span className="text-blue-600 font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Tọa đàm nổi bật
                        </span>
                        <h3 className="text-2xl md:text-2xl text-primary-dark font-bold uppercase leading-tight mb-6">
                            Nhận diện điểm nghẽn và đề xuất giải pháp khắc phục liên quan đến Luật Đất đai
                        </h3>

                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-2 font-medium">Diễn ra lúc:</p>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-blue-600">22</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Tháng 9</div>
                                </div>
                                <div className="text-2xl font-black text-gray-300">/</div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-blue-600">2025</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Năm</div>
                                </div>
                                <div className="text-2xl font-black text-gray-300">|</div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-blue-600">14:00</div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Giờ</div>
                                </div>
                            </div>
                        </div>

                        <Link to="/tin-tuc/toa-dam-su-kien/4" className="bg-blue-600 text-white rounded-full px-8 py-2.5 w-fit font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                            Chi tiết sự kiện
                        </Link>
                    </div>

                    {/* Graphic side of banner */}
                    <div className="md:w-1/2 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
                        <img src="/bc536d54-ce2c-4961-be6f-a1fddb4e086d.jpg" alt="Event" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" />
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
                    <button className="border border-white/50 text-white rounded-full px-8 py-2 hover:bg-white hover:text-primary transition font-medium">
                        Xem thêm sự kiện
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EventsActivities;

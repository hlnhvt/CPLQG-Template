import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function HoiDapGopYBlock() {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10">
            {/* Left side */}
            <div className="md:w-[40%] flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#05b5a6] rounded-[14px] flex items-center justify-center text-white mb-2 shadow-sm">
                    <HelpCircle size={28} />
                </div>
                <h2 className="text-[32px] font-extrabold text-gray-900 leading-[1.2]">
                    Hỏi đáp và <br /> góp ý
                </h2>
                <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">
                    Bạn có thắc mắc về chính sách pháp luật? Hãy gửi câu hỏi cho các chuyên gia của chúng tôi để được giải đáp trong các buổi đối thoại trực tiếp.
                </p>
            </div>

            {/* Right side form */}
            <div className="md:w-[60%] flex flex-col gap-4">
                <div>
                    <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Nhập họ và tên" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Tiêu đề <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Nhập tiêu đề ngắn gọn" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Lĩnh vực <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 bg-white">
                            <option value="">Chọn lĩnh vực</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Câu hỏi của bạn <span className="text-red-500">*</span></label>
                    <textarea rows="3" placeholder="Nhập nội dung thắc mắc tại đây" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                </div>

                <div className="mt-1">
                    <p className="text-[12.5px] font-bold text-gray-700 mb-3">Lưu ý: Vui lòng tích vào ô "Tôi không phải người máy" bên dưới để xác thực trước khi gửi.</p>
                    {/* Mock reCAPTCHA */}
                    <div className="w-[300px] h-[76px] bg-[#f9f9f9] border border-[#d3d3d3] rounded-[3px] flex items-center px-3 justify-between mb-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-white border border-[#c1c1c1] rounded-[2px] cursor-pointer hover:border-gray-400"></div>
                            <span className="text-[14px] text-[#222] font-medium font-sans">I'm not a robot</span>
                        </div>
                        <div className="flex flex-col items-center justify-center mr-1">
                            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="32" alt="reCAPTCHA" className="mb-0.5" />
                            <span className="text-[10px] text-gray-500 leading-none">reCAPTCHA</span>
                        </div>
                    </div>

                    <button className="w-full bg-[#1c5dfd] hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                        Gửi câu hỏi ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

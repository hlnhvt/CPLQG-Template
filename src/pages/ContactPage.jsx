import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-[#f8f9fa] min-h-screen font-sans pb-20">
            {/* Top Banner - Deep Blue Gradient */}
            <div className="bg-gradient-to-r from-[#003cf9] via-[#041c9b] to-[#011466] text-white h-[250px] md:h-[300px] flex flex-col items-center justify-center relative shadow-sm mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 z-10 drop-shadow-md">LIÊN HỆ</h1>
                <p className="text-lg md:text-xl opacity-90 z-10 drop-shadow">Kết nối với Cổng Pháp luật Quốc gia</p>
                {/* Decorative layer (optional, mimic header's swirl if needed) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M0,0 Q150,150 300,0 T600,0 T900,0 T1200,0 T1500,0 T1800,0 T2100,0 V200 H0 Z" fill="rgba(255,255,255,0.05)" />
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* Left Column: Information & Map */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-[18px] md:text-[20px] font-bold text-gray-800 mb-6">Thông tin Cổng Pháp luật quốc gia</h2>

                        <div className="space-y-3 mb-8 text-gray-700 text-[15px]">
                            <p>Địa chỉ: Số 60 Trần Phú, phường Ba Đình, TP Hà Nội</p>
                            <p>Điện thoại: 024.62739715</p>
                        </div>

                        {/* Map Iframe */}
                        <div className="rounded-lg overflow-hidden border border-gray-200 aspect-square md:aspect-auto md:h-[350px] bg-gray-100 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096708453535!2d105.83549667590897!3d21.028816487773284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba64835f3df%3A0xeabf5deedc5fcc3f!2zNjAgUC4gVHLhuqduIFBow7osIMSQaeG7h24gQmnDqm4sIEJhIMSQw6xuaCwgSMOgIE7hu5lpIDExODcyNiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710153400000!5m2!1svi!2s"
                                className="absolute inset-0 w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Bản đồ 60 Trần Phú"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-[18px] md:text-[20px] font-bold text-gray-800 mb-4">Thông tin của bạn</h2>
                        <p className="text-gray-600 mb-8 text-[14px] leading-relaxed">
                            Bạn có câu hỏi hoặc góp ý? Chúng tôi luôn sẵn sàng hỗ trợ. Hãy gửi cho chúng tôi tin
                            nhắn, và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                        </p>

                        <form className="space-y-5" onSubmit={(e) => {
                            e.preventDefault();
                            if (isChecked) setIsSubmitted(true);
                        }}>
                            <div>
                                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    defaultValue="Hoàng Lương Nhân"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-[14px]"
                                    placeholder="Nhập họ và tên"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-[14px]"
                                    placeholder="Nhập số điện thoại của bạn"
                                    pattern="[0-9]{10,11}"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-[14px]"
                                    placeholder="Nhập email của bạn"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Nội dung tin nhắn <span className="text-red-500">*</span></label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[140px] resize-y text-[14px]"
                                    placeholder="Nhập nội dung góp ý (ít nhất 10 ký tự)"
                                    minLength={10}
                                    maxLength={2000}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-400 focus:ring-blue-600 cursor-pointer"
                                />
                                <label htmlFor="privacy" className="text-[13px] text-gray-600 cursor-pointer select-none">
                                    Tôi đồng ý với tất cả các <Link to="#" className="text-blue-600 font-medium hover:underline">chính sách bảo mật</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!isChecked}
                                className={`w-full font-semibold py-3 rounded-lg mt-6 tracking-wide transition-all duration-200 
                                    ${isChecked
                                        ? 'bg-[#153488] hover:bg-[#0f286b] text-white shadow-md cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Popup Overlay */}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-[500px] w-full text-center border-t-4 border-[#00c853]">
                        {/* Custom SVG Checkmark Icon matching the screenshot */}
                        <div className="w-[84px] h-[84px] bg-[#00c853] rounded-full mx-auto relative mb-6 shadow-sm flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {/* Outer circle of the checkmark */}
                                <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="white" className="opacity-90" fill="none" />
                                {/* Checkmark path */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 13l3 3 7-7" />
                            </svg>
                        </div>

                        <h2 className="text-[26px] font-bold text-[#0a1e3f] mb-4">Xin chân thành cảm ơn!</h2>

                        <p className="text-gray-600 text-[15px] leading-relaxed mb-8 px-4">
                            Mọi góp ý của bạn đều là một phần quan trọng giúp Cổng Pháp luật Quốc gia hoàn thiện hơn từng ngày.
                        </p>

                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                navigate('/');
                            }}
                            className="bg-[#1e3a8a] hover:bg-[#153488] text-white font-semibold py-3 px-12 rounded-[5px] transition-colors shadow-sm text-[15px]"
                        >
                            Trở về trang chủ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactPage;

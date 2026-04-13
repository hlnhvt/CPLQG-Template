import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ContactUsPage() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '', email: '', mobile: '', message: ''
    });
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                mobile: user.phone || '',
            }));
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('Vui lòng đồng ý với chính sách bảo mật của chúng tôi.');
            return;
        }
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
        setFormData({ name: '', email: '', mobile: '', message: '' });
        setAgreed(false);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
            {/* ── HERO SECTION ─────────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-[#001540] to-[#002a80] pt-16 pb-20 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-[40px] md:text-[48px] font-bold mb-4">Liên hệ</h1>
                    <p className="text-[16px] md:text-[18px] opacity-80">
                        Kết nối với Cổng Pháp luật Quốc gia
                    </p>
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] -mt-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT COLUMN: Info & Map */}
                    <div className="w-full lg:w-[450px] shrink-0 space-y-6">
                        {/* Info Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                            <h2 className="text-[18px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Thông tin Cổng Pháp luật quốc gia
                            </h2>
                            <div className="space-y-4 text-[14px] text-gray-600">
                                <p>
                                    <span className="font-bold text-gray-800">Địa chỉ:</span> Số 60 Trần Phú, phường Ba Đình, TP Hà Nội
                                </p>
                                <p>
                                    <span className="font-bold text-gray-800">Điện thoại:</span> 024.62739715
                                </p>
                            </div>
                        </div>

                        {/* Map Card */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-[450px]">
                            <iframe 
                                title="Bản đồ vị trí"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.951559139611!2d105.83688197596765!3d21.03432368757471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba43d7c07b3%3A0xc348508f7dbf964a!2zNjAgVHLhuqduIFBow7osIMSQaeG7h24gQmnDqm4sIEJhIMSQw6xuaCwgSMOgIE7hu5lpIDExMzc2LCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1714468000000!5m2!1svi!2s" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact Form */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-gray-100 h-full">
                            <h2 className="text-[22px] font-bold text-gray-900 mb-6">Thông tin của bạn</h2>
                            <p className="text-[14px] text-gray-500 mb-10 leading-relaxed">
                                Bạn có câu hỏi hoặc góp ý? Chúng tôi luôn sẵn sàng hỗ trợ. Hãy gửi cho chúng tôi tin nhắn, và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-[14px] font-semibold text-gray-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="text" required
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-gray-800 placeholder:text-gray-400"
                                                placeholder="Nhập họ và tên của bạn"
                                            />
                                            {user && formData.name === user.name && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-[10px] font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
                                                    <Lock size={10} /> Đã xác thực
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label className="block text-[14px] font-semibold text-gray-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel" required
                                            value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-gray-800 placeholder:text-gray-400"
                                            placeholder="Nhập số điện thoại của bạn"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-[14px] font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email" required
                                            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-gray-800 placeholder:text-gray-400"
                                            placeholder="Nhập email của bạn"
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label className="block text-[14px] font-semibold text-gray-700 mb-2">Nội dung tin nhắn <span className="text-red-500">*</span></label>
                                        <textarea
                                            required rows={5}
                                            value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-gray-800 placeholder:text-gray-400 resize-none"
                                            placeholder="Nhập nội dung góp ý (ít nhất 10 ký tự)"
                                        />
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-center gap-3 py-2">
                                    <input 
                                        type="checkbox" 
                                        id="privacy-policy"
                                        checked={agreed}
                                        onChange={e => setAgreed(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-800 focus:ring-blue-800 cursor-pointer"
                                    />
                                    <label htmlFor="privacy-policy" className="text-[14px] text-gray-600 cursor-pointer">
                                        Tôi đồng ý với tất cả các <a href="#" className="underline text-blue-700 hover:text-blue-900">chính sách bảo mật</a>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#002a80] hover:bg-[#001c57] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                                >
                                    Gửi tin nhắn
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

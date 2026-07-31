import React, { useState } from 'react';
import { MailX, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const UnsubscribeNewsletterPage = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || 'email_cua_ban@example.com';
    const [status, setStatus] = useState('confirm'); // 'confirm' | 'success' | 'loading'

    const handleUnsubscribe = () => {
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-4 font-sans">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
                
                {status === 'confirm' && (
                    <div className="p-8 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MailX size={40} className="text-red-500" strokeWidth={1.5} />
                        </div>
                        
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">Hủy đăng ký bản tin</h1>
                        
                        <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                            Bạn có chắc chắn muốn ngừng nhận các bản tin pháp luật và thông báo từ Cổng Pháp luật Quốc gia cho địa chỉ email <span className="font-bold text-gray-800">{email}</span> không?
                        </p>

                        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-8 flex gap-3 text-left">
                            <AlertCircle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                            <p className="text-[13px] text-yellow-800 leading-relaxed">
                                Bỏ qua thông báo này nếu bạn không yêu cầu hủy đăng ký. Bạn có thể đăng ký lại bất cứ lúc nào tại trang chủ.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={handleUnsubscribe}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                            >
                                Xác nhận hủy
                            </button>
                            <Link 
                                to="/"
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                            >
                                Giữ lại
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'loading' && (
                    <div className="p-12 text-center animate-fade-in flex flex-col items-center justify-center h-[400px]">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Đang xử lý yêu cầu...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="p-8 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-green-500" strokeWidth={1.5} />
                        </div>
                        
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">Hủy đăng ký thành công</h1>
                        
                        <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                            Địa chỉ email <span className="font-bold text-gray-800">{email}</span> đã được gỡ khỏi danh sách nhận bản tin pháp luật của chúng tôi.
                        </p>

                        <Link 
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
                        >
                            <ArrowLeft size={18} />
                            Quay về trang chủ
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UnsubscribeNewsletterPage;

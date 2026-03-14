import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const TOPICS = [
    { id: 't1', label: 'Văn bản QPPL mới ban hành' },
    { id: 't2', label: 'Thông tư – Nghị định – Quyết định' },
    { id: 't3', label: 'Luật – Bộ luật mới' },
    { id: 't4', label: 'Dự thảo đang lấy ý kiến' },
    { id: 't5', label: 'Đất đai – Bất động sản' },
    { id: 't6', label: 'Doanh nghiệp – Đầu tư' },
    { id: 't7', label: 'Lao động – Việc làm' },
    { id: 't8', label: 'Thuế – Tài chính' },
    { id: 't9', label: 'Hôn nhân – Gia đình' },
    { id: 't10', label: 'Hình sự – Tố tụng' },
    { id: 't11', label: 'Hành chính – Công vụ' },
    { id: 't12', label: 'Môi trường – Tài nguyên' },
];

const FREQUENCIES = [
    { id: 'immediate', label: 'Ngay lập tức', desc: 'Nhận email ngay khi có nội dung mới (khuyến cáo chỉ dùng cho chủ đề quan trọng)' },
    { id: 'daily', label: 'Tóm tắt hàng ngày', desc: '1 email tổng hợp vào 8:00 sáng mỗi ngày' },
    { id: 'weekly', label: 'Tóm tắt hàng tuần', desc: '1 email tổng hợp vào sáng Thứ Hai hàng tuần' },
    { id: 'monthly', label: 'Tóm tắt hàng tháng', desc: '1 email tổng hợp vào ngày 1 hàng tháng' },
];

const NewsletterRegistrationPage = () => {
    // Flow states: 'form' -> 'success'
    const [step, setStep] = useState('form');

    // Form states
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [frequency, setFrequency] = useState('weekly');
    const [agreed, setAgreed] = useState(false);

    // Initial check to pre-fill if logged in (mock)
    useEffect(() => {
        const checkAuth = async () => {
            // Note: In a real app, useAuth context would provide this.
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (isLoggedIn) {
                setEmail('nguyenanhquan@moj.gov.vn');
                setName('Nguyễn Anh Quân');
            }
        };
        checkAuth();
    }, []);

    const toggleTopic = (id) => {
        if (selectedTopics.includes(id)) {
            setSelectedTopics(selectedTopics.filter(t => t !== id));
        } else {
            setSelectedTopics([...selectedTopics, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedTopics.length === TOPICS.length) {
            setSelectedTopics([]);
        } else {
            setSelectedTopics(TOPICS.map(t => t.id));
        }
    };

    const isFormValid = email.includes('@') && selectedTopics.length > 0 && agreed;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Simulate API call
        // setTimeout(() => setStep('success'), 800);
        setStep('success');
    };

    // Countdown for resend email
    const [countdown, setCountdown] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
        if (step === 'success' && isResendDisabled) {
            if (countdown > 0) {
                const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timerId);
            } else {
                setIsResendDisabled(false);
            }
        }
    }, [step, countdown, isResendDisabled]);

    const handleResend = () => {
        setIsResendDisabled(true);
        setCountdown(60);
        alert("Đã gửi lại email xác nhận!");
    };

    return (
        <div className="min-h-[calc(100vh-100px)] bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
            
            {step === 'form' && (
                <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#00b2e3] to-[#011466] p-8 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <Mail className="mx-auto mb-4 opacity-90" size={48} />
                        <h1 className="text-3xl font-bold mb-2 tracking-wide">Đăng ký nhận bản tin pháp luật</h1>
                        <p className="text-blue-100 max-w-xl mx-auto text-[15px]">
                            Cập nhật thông tin pháp luật mới nhất, được cá nhân hóa và gửi trực tiếp đến hộp thư của bạn.
                        </p>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="p-8 pb-10">
                        
                        {/* 1. Personal Info */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-[14px] font-bold text-gray-700 mb-2">Địa chỉ Email <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ví dụ: tranvan.a@email.com" 
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                                    required
                                />
                                {email === 'nguyenanhquan@moj.gov.vn' && (
                                    <p className="text-[12px] text-gray-500 mt-1 flex items-center gap-1"><Check size={12} className="text-green-500"/> Đây là email tài khoản của bạn.</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[14px] font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nguyễn Văn A" 
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                                />
                                <p className="text-[12px] text-gray-500 mt-1">Sử dụng để cá nhân hóa email hiển thị.</p>
                            </div>
                        </div>

                        {/* 2. Topics */}
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <label className="block text-[15px] font-bold text-gray-900">Chọn chủ đề quan tâm <span className="text-red-500">*</span></label>
                                    <p className="text-[13px] text-gray-500 mt-0.5">Vui lòng chọn ít nhất 1 chủ đề</p>
                                </div>
                                <button type="button" onClick={handleSelectAll} className="text-[13px] text-blue-600 font-medium hover:underline">
                                    {selectedTopics.length === TOPICS.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                                {TOPICS.map(topic => (
                                    <label key={topic.id} className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                checked={selectedTopics.includes(topic.id)}
                                                onChange={() => toggleTopic(topic.id)}
                                            />
                                        </div>
                                        <span className={`text-[14px] leading-snug transition-colors ${selectedTopics.includes(topic.id) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                            {topic.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 3. Frequency */}
                        <div className="mb-8">
                            <label className="block text-[15px] font-bold text-gray-900 mb-4">Tần suất nhận bản tin <span className="text-red-500">*</span></label>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {FREQUENCIES.map(freq => (
                                    <label 
                                        key={freq.id} 
                                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${frequency === freq.id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-blue-300'}`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="frequency"
                                            value={freq.id}
                                            checked={frequency === freq.id}
                                            onChange={() => setFrequency(freq.id)}
                                            className="w-4 h-4 text-blue-600 mt-1 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <div>
                                            <div className={`font-bold text-[14px] ${frequency === freq.id ? 'text-blue-900' : 'text-gray-900'}`}>{freq.label}</div>
                                            <div className="text-[12px] text-gray-500 mt-1 leading-snug">{freq.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 4. Terms & Submit */}
                        <div className="border-t border-gray-100 pt-6">
                            <label className="flex items-start gap-3 cursor-pointer mb-6">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 mt-0.5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <span className="text-[13px] text-gray-600">
                                    Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a> của Cổng Pháp luật Quốc gia. Tôi hiểu rằng mình có thể hủy đăng ký bất kỳ lúc nào thông qua liên kết ở cuối mỗi email.
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                                    isFormValid 
                                    ? 'bg-[#0f4c81] hover:bg-blue-800 text-white shadow-xl shadow-blue-900/20' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Đăng ký nhận bản tin <ArrowRight size={20} />
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-gray-500">
                                <ShieldCheck size={14} className="text-green-500" />
                                Thông tin của bạn được bảo mật an toàn 100% bằng mã hóa SSL.
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {step === 'success' && (
                <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-center p-10 pt-12 relative border border-gray-100">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                        <Mail size={40} className="text-green-600 relative z-10" />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                            <div className="bg-green-500 rounded-full p-1">
                                <Check size={16} className="text-white" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Kiểm tra hộp thư của bạn!</h2>
                    
                    <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                        Chúng tôi đã gửi một email xác nhận đến địa chỉ<br/>
                        <strong className="text-gray-900">{email}</strong><br/>
                        Vui lòng mở email và click vào liên kết để hoàn tất việc đăng ký bản tin.
                    </p>

                    <div className="bg-orange-50 rounded-xl p-4 text-left flex gap-3 items-start mb-8 text-[13px] text-orange-800">
                        <AlertCircle size={18} className="shrink-0 mt-0.5 text-orange-500" />
                        <p>
                            <strong>Không thấy email?</strong> Hãy kiểm tra kỹ thư mục <em>Spam (Thư rác)</em> hoặc <em>Junk</em>. Email có thể mất từ 2-5 phút để gửi đến nơi.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleResend}
                            disabled={isResendDisabled}
                            className={`w-full py-3 rounded-xl font-medium transition-colors ${isResendDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                        >
                            {isResendDisabled ? `Gửi lại email xác nhận (${countdown}s)` : 'Gửi lại email xác nhận'}
                        </button>
                        
                        <Link to="/" className="block w-full py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors border border-gray-200">
                            Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsletterRegistrationPage;

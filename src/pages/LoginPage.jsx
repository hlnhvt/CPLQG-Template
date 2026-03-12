import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [cccd, setCccd] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Navigate back to where user came from, or to home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!cccd || !password) {
            setError('Vui lòng nhập đầy đủ số định danh cá nhân và mật khẩu.');
            return;
        }
        setLoading(true);
        // Simulate network delay
        await new Promise(r => setTimeout(r, 500));
        const result = login(cccd, password);
        setLoading(false);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Main Login Area - Red background */}
            <div 
                className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #8b1a1a 0%, #c0392b 40%, #8b1a1a 100%)' }}
            >
                {/* Decorative Trống đồng circles */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
                    {[800, 640, 480, 320, 160].map((size, i) => (
                        <div 
                            key={i} 
                            className="absolute rounded-full border border-white/30"
                            style={{ width: size, height: size }}
                        />
                    ))}
                </div>

                <div className="relative z-10 w-full flex flex-col items-center">
                    {/* Logo + Title */}
                    <div className="flex flex-col items-center mb-8">
                        <img src="/logo.png" alt="VNeID Logo" className="w-24 h-24 object-contain drop-shadow-xl mb-3" />
                        <div className="text-white text-center">
                            <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-400 drop-shadow">BỘ CÔNG AN</h1>
                            <p className="text-[14px] text-white/80 mt-1">Trung tâm dữ liệu Quốc gia về dân cư</p>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-[680px] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-0 md:divide-x divide-gray-100">
                        {/* Left: Form */}
                        <div className="flex-1 md:pr-8">
                            <h2 className="text-[18px] font-bold text-gray-800 mb-5">Đăng nhập VNeID</h2>
                            
                            {error && (
                                <div className="flex items-start gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* CCCD Field */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={cccd}
                                        onChange={e => setCccd(e.target.value)}
                                        placeholder="Số định danh cá nhân"
                                        className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg outline-none text-[14px] focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-colors bg-gray-50"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Mật khẩu"
                                        className="w-full py-3 pl-10 pr-12 border border-gray-200 rounded-lg outline-none text-[14px] focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-colors bg-gray-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold rounded-lg transition-colors text-[15px] shadow-sm"
                                >
                                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                </button>
                            </form>

                            <div className="mt-4">
                                <p className="text-[13px] text-gray-500">
                                    Trường hợp không đăng nhập được, vui lòng{' '}
                                    <a href="#" className="text-blue-600 underline hover:text-blue-700">xem hướng dẫn</a>.
                                </p>
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-[13px] text-gray-400 font-medium mb-1">Tài khoản thử nghiệm:</p>
                                    <p className="text-[12px] text-gray-500">CCCD: <code className="bg-gray-100 px-1 rounded">001234567890</code> / Mật khẩu: <code className="bg-gray-100 px-1 rounded">123456</code></p>
                                </div>
                            </div>
                        </div>

                        {/* Right: QR Code */}
                        <div className="flex-1 md:pl-8 flex flex-col items-center justify-center">
                            <img 
                                src="/qr-login.png" 
                                alt="QR Code VNeID" 
                                className="w-40 h-40 object-contain border border-gray-200 rounded-lg"
                            />
                            <p className="text-[13px] text-blue-600 mt-4 text-center leading-relaxed">
                                Hoặc quét mã QR bằng ứng<br />dụng VNeID để đăng nhập.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - White */}
            <div className="bg-white py-8 px-4">
                <div className="max-w-[680px] mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 shrink-0">
                        <img src="/logo.png" alt="Phone mockup" className="w-full object-contain opacity-70" />
                    </div>
                    <div>
                        <h3 className="text-[20px] font-bold text-gray-800 mb-2">Đơn giản hóa mọi thủ tục hành chính</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">
                            Sử dụng định danh điện tử thay thế các loại giấy tờ truyền thống, không phải kê khai biểu mẫu giấy, chủ động chia sẻ thông tin để giải quyết thủ tục hành chính. Quét QR hoặc tải tại trên hai hệ điều hành dưới đây.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-900">
                                <span>🍎</span> App Store
                            </a>
                            <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-900">
                                <span>▶</span> Google Play
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer strip */}
            <div className="bg-[#1a56b0] text-white text-[12px] py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-1">
                <a href="#" className="underline hover:text-yellow-300">Hướng dẫn đăng ký và kích hoạt tài khoản</a>
                <span className="text-white/70">© Bản quyền thuộc về Trung tâm dữ liệu Quốc gia về dân cư</span>
            </div>
        </div>
    );
};

export default LoginPage;

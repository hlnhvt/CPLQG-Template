import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, ShieldCheck, CheckCircle2, User, Lock } from 'lucide-react';
import { LIFE_CATEGORIES } from './HienKeShared';
import { useAuth } from '../contexts/AuthContext';

const CATEGORIES = Array.from(new Set([
    'Đời sống thường ngày - Chung',
    ...LIFE_CATEGORIES.map(c => c.name),
    'Hình sự',
    'Dân sự',
    'Hành chính'
]));

const ISSUANCE_FORMS = [
    'Luật',
    'Nghị quyết',
    'Nghị định',
    'Thông tư',
    'Quyết định',
    'Khác'
];

export default function SimpleFeedbackPage() {
    const [searchParams] = useSearchParams();
    const domainQuery = searchParams.get('domain');
    const topicQuery = searchParams.get('topic');
    const { user } = useAuth();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        issuanceForm: '',
        content: '',
        isAnonymous: false,
        name: '',
        email: '',
        phone: ''
    });

    // Pre-fill from logged-in user profile
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            }));
        }
    }, [user]);

    useEffect(() => {
        if (domainQuery) {
            setFormData(prev => ({ ...prev, category: domainQuery }));
        } else if (topicQuery === 'doi-song') {
            setFormData(prev => ({ ...prev, category: 'Đời sống thường ngày - Chung' }));
        }
    }, [domainQuery, topicQuery]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pb-20">
                <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-[26px] font-black text-gray-900 mb-3">Đã gửi ý kiến!</h2>
                    <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                        Cảm ơn bạn đã đóng góp hiến kế. Ý kiến của bạn đã được chuyển đến bộ phận chuyên môn. Mã theo dõi: <span className="font-mono text-gray-900 font-bold ml-1">HK-89102</span>
                    </p>
                    <Link to="/hien-ke" className="flex items-center justify-center gap-2 w-full py-4 bg-[#1e3a8a] text-white rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-md text-[15px]">
                        Quay lại trang Hiến kế
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Header / Hero */}
            <div className="bg-[#1e3a8a] pt-12 pb-24 relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/dong_son_cover.png')" }} />
                <div className="container mx-auto px-4 md:px-8 max-w-[800px] relative z-10">
                    <Link to="/hien-ke" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 font-medium text-[14px] transition-colors">
                        <ArrowLeft size={16} /> Quay lại trang chủ Hiến kế
                    </Link>
                    <h1 className="text-[32px] md:text-[40px] font-bold text-white mb-3 leading-tight">Gửi hiến kế</h1>
                    <p className="text-blue-100 text-[16px] leading-relaxed max-w-[800px]">
                        Chia sẻ ý kiến, sáng kiến của bạn góp phần nâng cao chất lượng, hiệu quả công tác xây dựng, tổ chức thi hành pháp luật trên toàn diện các lĩnh vực nhằm thúc đẩy phát triển kinh tế - xã hội của đất nước.
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <div className="container mx-auto px-4 md:px-8 max-w-[800px] -mt-16 relative z-20">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 mb-8">

                    <div className="space-y-8">
                        {/* Section 1: Nội dung */}
                        <div>
                            <h3 className="text-[18px] font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[13px] font-black">1</span>
                                Nội dung ý kiến
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Tiêu đề hiến kế <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" required name="title"
                                        placeholder="Tóm tắt ngắn gọn ý kiến của bạn"
                                        value={formData.title} onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px]"
                                    />
                                </div>

                                {topicQuery !== 'doi-song' && (
                                    <div>
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">Lĩnh vực liên quan <span className="text-red-500">*</span></label>
                                        <select
                                            required name="category"
                                            value={formData.category} onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px] cursor-pointer"
                                        >
                                            <option value="" disabled>-- Vui lòng chọn lĩnh vực --</option>
                                            {CATEGORIES.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Đề xuất hình thức ban hành (không bắt buộc)</label>
                                    <select
                                        name="issuanceForm"
                                        value={formData.issuanceForm} onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px] cursor-pointer"
                                    >
                                        <option value="" disabled>-- Vui lòng chọn hình thức --</option>
                                        {ISSUANCE_FORMS.map(f => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Nội dung chi tiết <span className="text-red-500">*</span></label>
                                    <textarea
                                        required rows={6} name="content"
                                        placeholder="Trình bày chi tiết thực trạng, vấn đề và giải pháp đề xuất của bạn..."
                                        value={formData.content} onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px] resize-y"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Đính kèm tài liệu (nếu có)</label>
                                    <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer bg-white">
                                        <Paperclip size={24} className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-[14px] text-gray-600 mb-1">Kéo thả tệp vào đây hoặc nhấn để chọn</p>
                                        <p className="text-[12px] text-gray-400">Hỗ trợ định dạng: PDF, DOC, DOCX, JPG, PNG (Tối đa 5MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Người gửi */}
                        <div>
                            <h3 className="text-[18px] font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[13px] font-black">2</span>
                                Thông tin liên hệ
                            </h3>

                            <div className="bg-gray-50 p-4 rounded-xl mb-5 flex items-start gap-3">
                                <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
                                <div className="text-[13px] text-gray-600 leading-relaxed">
                                    Thông tin của bạn được bảo mật nghiêm ngặt. Việc cung cấp thông tin liên hệ giúp cơ quan chức năng có thể phản hồi kết quả trực tiếp cho bạn.
                                </div>
                            </div>

                            {!formData.isAnonymous && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">

                                    {/* Auto-fill notice if logged in */}
                                    {user && (
                                        <div className="md:col-span-2 flex items-center gap-2.5 bg-blue-50 border border-blue-200 text-blue-800 text-[13px] px-4 py-3 rounded-xl">
                                            <User size={15} className="shrink-0" />
                                            <span>Thông tin liên hệ được điền tự động từ hồ sơ cá nhân của bạn.</span>
                                        </div>
                                    )}

                                    <div className="md:col-span-2">
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">
                                            Họ và tên
                                        </label>
                                        {user ? (
                                            <div className="relative">
                                                <input
                                                    type="text" name="name" readOnly
                                                    value={formData.name}
                                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-[15px] text-gray-700 pr-32 cursor-not-allowed"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200">
                                                    <Lock size={10} /> Đã xác thực
                                                </span>
                                            </div>
                                        ) : (
                                            <input
                                                type="text" name="name"
                                                value={formData.name} onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px]"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">Email</label>
                                        {user ? (
                                            <div className="relative">
                                                <input
                                                    type="email" name="email" readOnly
                                                    value={formData.email}
                                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-[15px] text-gray-700 pr-32 cursor-not-allowed"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200">
                                                    <Lock size={10} /> Đã xác thực
                                                </span>
                                            </div>
                                        ) : (
                                            <input
                                                type="email" name="email"
                                                value={formData.email} onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px]"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-bold text-gray-800 mb-2">Số điện thoại</label>
                                        {user ? (
                                            <div className="relative">
                                                <input
                                                    type="tel" name="phone" readOnly
                                                    value={formData.phone || 'Chưa cập nhật'}
                                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-[15px] text-gray-700 pr-32 cursor-not-allowed"
                                                />
                                                {formData.phone ? (
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200">
                                                        <Lock size={10} /> Đã xác thực
                                                    </span>
                                                ) : (
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                                                        Chưa có
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <input
                                                type="tel" name="phone"
                                                value={formData.phone} onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px]"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="pt-8 mt-8 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-10 py-4 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md text-[15px] flex items-center justify-center gap-2"
                        >
                            <Send size={18} />
                            Gửi ý kiến đóng góp
                        </button>
                    </div>

                </form>

                <div className="text-center text-[13px] text-gray-500 font-medium">
                    &copy; {new Date().getFullYear()} Cổng Pháp luật Quốc gia. All rights reserved.
                </div>
            </div>

            <style>{`.animate-fadeIn { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
}

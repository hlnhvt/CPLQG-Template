import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LivestreamRegistrationModal = ({ isOpen, onClose, onRegister, eventTitle }) => {
    const { user } = useAuth();
    
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        jobTitle: '',
        organization: '',
        purpose: 'Nghiên cứu, học tập',
        purposeOther: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    useEffect(() => {
        if (user && isOpen) {
            setFormData(prev => ({
                ...prev,
                fullName: user.name || '',
                phoneNumber: user.phone || '0987654321',
                jobTitle: user.jobTitle || 'Chuyên viên pháp lý',
                organization: user.organization || 'Công ty Luật TNHH MTV'
            }));
        }
    }, [user, isOpen]);
    
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Mock API call to submit registration
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            
            // Wait 2-3s then close and trigger callback
            setTimeout(() => {
                onRegister();
                setIsSuccess(false);
                onClose();
            }, 2500);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && !isSuccess && onClose()}></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 flex items-center justify-between">
                    <h3 className="font-bold text-lg">Đăng ký tham gia</h3>
                    {!isSubmitting && !isSuccess && (
                        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    )}
                </div>
                
                <div className="p-6">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-fadeIn">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} className="text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h4>
                            <p className="text-gray-500 max-w-sm">
                                Yêu cầu tham gia của bạn đã được gửi. Hệ thống đang chờ phê duyệt từ Ban tổ chức.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {eventTitle && (
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                                    <p className="text-xs text-blue-600 font-bold uppercase mb-1">Sự kiện</p>
                                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{eventTitle}</p>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                                        value={formData.fullName}
                                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input 
                                        type="tel" 
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                                        value={formData.phoneNumber}
                                        onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Chức danh <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                                        value={formData.jobTitle}
                                        onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Đơn vị công tác <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                                        value={formData.organization}
                                        onChange={e => setFormData({...formData, organization: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Mục đích tham gia <span className="text-red-500">*</span></label>
                                <select 
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                                    value={formData.purpose}
                                    onChange={e => setFormData({...formData, purpose: e.target.value})}
                                >
                                    <option value="Nghiên cứu, học tập">Nghiên cứu, học tập</option>
                                    <option value="Tư vấn khách hàng">Tư vấn khách hàng</option>
                                    <option value="Cập nhật quy định mới cho doanh nghiệp">Cập nhật quy định mới cho doanh nghiệp</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            
                            {formData.purpose === 'Khác' && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Mục đích khác <span className="text-red-500">*</span></label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Vui lòng nhập mục đích tham gia của bạn..."
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50 resize-none"
                                        value={formData.purposeOther}
                                        onChange={e => setFormData({...formData, purposeOther: e.target.value})}
                                    ></textarea>
                                </div>
                            )}
                            
                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="px-5 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Đang xử lý...
                                        </>
                                    ) : 'Gửi đăng ký'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LivestreamRegistrationModal;

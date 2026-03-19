import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Check, ArrowRight, Shield, Award, BookOpen, AlertCircle, ChevronLeft, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LEGAL_FIELDS, NEWS_CATEGORIES, FORUMS, STATISTICS, ALL_ITEMS } from '../../data/personalizationData';

const OnboardingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Step 1: Welcome, Step 2: Chọn lĩnh vực
    const [step, setStep] = useState(1);
    const [selectedFields, setSelectedFields] = useState([]);

    // Giả lập loại tài khoản
    const accountType = user?.role === 'collaborator' ? 'ca-nhan' : 'to-chuc'; // Hoặc dựa vào logic của bạn

    // Animations trigger
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Trigger welcome animation after a short delay
        const timer = setTimeout(() => setShowWelcome(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Default selected based on recommendation if this is step 2
    const RECOMMENDED_PERSONAL = ['dat-dai', 'lao-dong', 'dan-su', 'news-tin-nong'];
    const RECOMMENDED_ORG = ['doanh-nghiep', 'thue', 'lao-dong', 'forum-doanh-nghiep'];
    const recommendedIds = accountType === 'ca-nhan' ? RECOMMENDED_PERSONAL : RECOMMENDED_ORG;
    const recommendedTitles = recommendedIds.map(id => ALL_ITEMS.find(i => i.id === id)?.title).filter(Boolean).join(', ');

    const handleSelectAllRecommended = () => {
        const newSelections = new Set([...selectedFields, ...recommendedIds]);
        setSelectedFields(Array.from(newSelections));
    };

    const toggleField = (id) => {
        if (selectedFields.includes(id)) {
            setSelectedFields(selectedFields.filter(fId => fId !== id));
        } else {
            setSelectedFields([...selectedFields, id]);
        }
    };

    const handleComplete = () => {
        // Lưu cấu hình
        localStorage.setItem('userSelectedTopics', JSON.stringify(selectedFields));
        const orderedBlocks = selectedFields.map(id => ({ id, viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' }));
        localStorage.setItem('userOrderedBlocks', JSON.stringify(orderedBlocks));

        // Điều hướng tới bước cảm ơn
        setStep(3);
    };

    const handleSkip = () => {
        navigate('/ca-nhan/trang-chu');
    };

    // Render Step 1: Welcome Screen
    const renderWelcomeStep = () => (
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto z-10 relative px-4">
            <div className={`transition-all duration-1000 transform ${showWelcome ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/30 transition-transform">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Xin chào,<br /> <span className="text-blue-100">{user?.name || 'Nguyễn Anh Quân'}</span>
                </h1>

                <p className="text-xl text-blue-50 mb-10 max-w-lg mx-auto leading-relaxed">
                    Chào mừng bạn đến với Cổng Pháp luật Quốc gia. Hành trình nâng cao kiến thức pháp lý và quản trị rủi ro của bạn bắt đầu từ đây.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
                    {[
                        { icon: BookOpen, title: 'Thư viện', desc: 'Hàng ngàn văn bản & bài viết' },
                        { icon: Shield, title: 'Bảo mật', desc: 'An toàn thông tin tuyệt đối' },
                        { icon: Award, title: 'Cá nhân hóa', desc: 'Trải nghiệm dành riêng cho bạn' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex flex-col items-center text-center text-white hover:bg-white/20 transition-colors">
                            <feature.icon size={24} className="mb-2 text-blue-200" />
                            <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                            <p className="text-xs text-blue-100 opacity-80">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setStep(2)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-blue-600 bg-white rounded-full overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-50 rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span className="relative flex items-center gap-2">
                        Bắt đầu khám phá <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </div>
        </div>
    );

    // Render Step 2: Chọn lĩnh vực
    const renderFieldSelectionStep = () => {
        const isSelectedAllRecommended = recommendedIds.every(id => selectedFields.includes(id));
        const isValid = selectedFields.length > 0;

        const renderTopicGrid = (title, description, items) => (
            <div className="mb-6 animate-fadeIn">
                <h3 className="text-lg font-bold text-gray-800 mb-1 border-b pb-2">{title}</h3>
                {description && <p className="text-gray-500 text-sm mb-4 mt-2">{description}</p>}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                    {items.map(topic => {
                        const isSelected = selectedFields.includes(topic.id);
                        return (
                            <button
                                key={topic.id}
                                onClick={(e) => { e.preventDefault(); toggleField(topic.id); }}
                                className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 w-full text-left relative ${isSelected
                                    ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                                    }`}
                            >
                                <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden relative shadow-sm">
                                    <img src={topic.thumbnail} alt={topic.title} className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-blue-900/10' : 'bg-black/5 hover:bg-black/10'}`}></div>
                                </div>
                                <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                                    <h3 className={`font-bold text-[15px] truncate ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                                        {topic.title}
                                    </h3>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
                                        {isSelected && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                </div>
                                {recommendedIds.includes(topic.id) && !isSelected && (
                                    <div className="absolute top-2 right-2 flex w-2 h-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full w-2 h-2 bg-amber-500"></span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );

        return (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUpFade">
                {/* Header Profile / Progress */}
                <div className="bg-gray-50 border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wider flex items-center gap-2">
                            <button onClick={() => setStep(1)} className="hover:bg-blue-100 p-1 rounded-full transition-colors"><ChevronLeft size={16} /></button>
                            Lĩnh vực quan tâm
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900">Bạn quan tâm đến lĩnh vực pháp luật nào?</h2>
                    </div>
                </div>

                <div className="p-8">
                    <p className="text-gray-600 mb-6">
                        Chọn ít nhất 1 nội dung. Chúng tôi sẽ cá nhân hóa Cổng Pháp luật Quốc gia phù hợp nhất với nhu cầu của bạn.
                    </p>

                    {/* Recommendation Banner */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 bg-blue-100 text-blue-600 p-1.5 rounded-lg shrink-0">
                                <Award size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900 text-sm">
                                    {accountType === 'ca-nhan' ? 'Gợi ý cho Cá nhân' : 'Gợi ý cho Doanh nghiệp & Tổ chức'}
                                </h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    <strong>{recommendedTitles}</strong>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleSelectAllRecommended}
                            disabled={isSelectedAllRecommended}
                            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isSelectedAllRecommended
                                ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                                }`}
                        >
                            {isSelectedAllRecommended ? 'Đã chọn gợi ý' : 'Chọn tất cả gợi ý'}
                        </button>
                    </div>

                    {/* Counter */}
                    <div className="flex justify-between items-end mb-4 font-medium">
                        <span className={`text-sm ${isValid ? 'text-green-600' : 'text-red-500 flex items-center gap-1'}`}>
                            {!isValid && <AlertCircle size={14} />}
                            {selectedFields.length} lĩnh vực được chọn
                        </span>

                        {selectedFields.length > 0 && (
                            <button
                                onClick={() => setSelectedFields([])}
                                className="text-xs text-gray-500 hover:text-red-500 hover:underline transition-colors"
                            >
                                Bỏ chọn tất cả
                            </button>
                        )}
                    </div>

                    {/* Grid Categories */}
                    <div className="max-h-[500px] overflow-y-auto px-1 -mx-1 custom-scrollbar mb-4">
                        {renderTopicGrid('Lĩnh vực Pháp lý', '', LEGAL_FIELDS)}
                        {renderTopicGrid('Chuyên mục Tin tức', '', NEWS_CATEGORIES)}
                        {renderTopicGrid('Diễn đàn & Cộng đồng', '', FORUMS)}
                        {renderTopicGrid('Chỉ tiêu Thống kê', '', STATISTICS)}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                        <button
                            onClick={handleSkip}
                            className="text-sm font-medium text-gray-500 hover:text-gray-800 hover:underline px-4 py-2 transition-colors order-2 sm:order-1"
                        >
                            Bỏ qua bước này
                        </button>
                        <button
                            onClick={handleComplete}
                            disabled={!isValid}
                            className={`order-1 sm:order-2 w-full sm:w-auto px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${isValid
                                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-600/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            Tiếp tục <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderThankYouStep = () => (
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto z-10 relative px-4 text-white">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.6)] border-4 border-green-300 animate-slideUpFade" style={{ animationDelay: '100ms' }}>
                <Check size={64} strokeWidth={3} className="text-white animate-scaleIn" style={{ animationDelay: '400ms' }} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight animate-slideUpFade" style={{ animationDelay: '200ms' }}>
                Cảm ơn bạn đã thiết lập!
            </h1>

            <p className="text-xl text-blue-50 mb-10 max-w-xl mx-auto leading-relaxed animate-slideUpFade" style={{ animationDelay: '300ms' }}>
                Danh sách nội dung quan tâm của bạn đã được đồng bộ thành công. Từ giờ, mọi trải nghiệm trên Cổng Pháp luật Quốc gia đều sẽ được tối ưu riêng biệt cho bạn.
            </p>

            <div className="animate-slideUpFade" style={{ animationDelay: '400ms' }}>
                <button
                    onClick={() => navigate('/ca-nhan/trang-chu')}
                    className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-[#061b36] bg-white rounded-full overflow-hidden shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-50 rounded-full group-hover:w-full group-hover:h-56"></span>
                    <span className="relative flex items-center gap-3 text-lg">
                        Đến Trang chủ Cá nhân <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
                    </span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="onboarding-theme-isolated min-h-screen relative overflow-hidden flex items-center justify-center w-full bg-[#061b36]">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                    style={{ backgroundImage: "url('/onboarding_bg.png')" }}
                ></div>
            </div>


            <div className="container mx-auto px-4 z-10 w-full h-full flex flex-col justify-center py-12">
                {step === 1 && renderWelcomeStep()}
                {step === 2 && renderFieldSelectionStep()}
                {step === 3 && renderThankYouStep()}
            </div>
        </div>
    );
};

export default OnboardingPage;

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, ShieldCheck, CheckCircle2, User, Lock, X, Search, ChevronDown, Info, ChevronUp, Zap, ChevronRight } from 'lucide-react';
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

const POPULAR_TAGS = [
    'Chuyển đổi số', 'Sổ đỏ', 'Căn cước dân công', 'Visa',
    'Thuế thu nhập', 'Bảo hiểm xã hội', 'Bảo hiểm y tế',
    'An toàn giao thông', 'Khởi nghiệp', 'Trí tuệ nhân tạo'
];

export default function SimpleFeedbackPage() {
    const [searchParams] = useSearchParams();
    const domainQuery = searchParams.get('domain');
    const topicQuery = searchParams.get('topic');
    const { user } = useAuth();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [tagSearch, setTagSearch] = useState('');
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const [isIntroOpen, setIsIntroOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        issuanceForm: '',
        content: '',
        tags: [],
        isAnonymous: false,
        name: '',
        email: '',
        phone: ''
    });

    const toggleTag = (tag) => {
        setFormData(prev => {
            if (prev.tags.includes(tag)) {
                return { ...prev, tags: prev.tags.filter(t => t !== tag) };
            }
            return { ...prev, tags: [...prev.tags, tag] };
        });
    };

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
        if (!user) {
            const noticeEl = document.getElementById('login-required-notice');
            if (noticeEl) {
                noticeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }
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
                <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">
                    <div className="mb-8">
                        <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px]">
                            <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                            <ChevronRight size={14} />
                            <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                            <ChevronRight size={14} />
                            {domainQuery ? (
                                <>
                                    <Link to="/hien-ke/linh-vuc" className="hover:text-white transition-colors">Có thể bạn quan tâm</Link>
                                    <ChevronRight size={14} />
                                    <Link to={`/hien-ke/linh-vuc/danh-sach?domain=${encodeURIComponent(domainQuery)}`} className="hover:text-white transition-colors truncate max-w-[200px] md:max-w-none">
                                        {domainQuery}
                                    </Link>
                                    <ChevronRight size={14} />
                                </>
                            ) : null}
                            <span className="text-white/90">Gửi hiến kế</span>
                        </nav>
                    </div>
                    <h1 className="text-[32px] md:text-[40px] font-bold text-white mb-3 leading-tight">Gửi hiến kế</h1>
                    <p className="text-blue-100 text-[16px] leading-relaxed max-w-[1000px]">
                        Chia sẻ ý kiến, sáng kiến của người dân, doanh nghiệp góp phần nâng cao chất lượng, hiệu quả công tác xây dựng, tổ chức thi hành pháp luật trên toàn diện các lĩnh vực nhằm thúc đẩy phát triển kinh tế - xã hội, hội nhập quốc tế của đất nước.
                    </p>

                    {/* Leadership Quote */}
                    <div className="mt-8 max-w-[1000px]">
                        <div className="relative group text-center">
                            <div className="relative z-10">
                                <p className="text-white/95 text-[15px] md:text-[18px] italic leading-relaxed font-medium mb-4">
                                    "Dễ mười lần không dân cũng chịu, khó trăm lần dân liệu cũng xong."
                                </p>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-[2px] bg-amber-400/50 rounded-full mb-1" />
                                    <span className="text-amber-200 text-[13px] font-bold uppercase tracking-widest">Chủ tịch Hồ Chí Minh</span>
                                    {/* <p className="text-blue-200/70 text-[12px] italic">Lời căn dặn của Chủ tịch Hồ Chí Minh về sức mạnh to lớn của Nhân dân</p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 
                    <button
                        type="button"
                        onClick={() => setIsIntroOpen(!isIntroOpen)}
                        className="mt-5 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[14px] font-medium transition-colors border border-white/20 backdrop-blur-sm"
                    >
                        <Info size={16} />
                        {isIntroOpen ? 'Giới thiệu' : 'Giới thiệu'}
                        {isIntroOpen ? <ChevronUp size={16} className="ml-1 opacity-70" /> : <ChevronDown size={16} className="ml-1 opacity-70" />}
                    </button>
*/}

                </div>
            </div>

            {/* Form Content */}
            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] -mt-16 relative z-20">
                {isIntroOpen && (
                    <div className="mb-10 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 text-gray-700 leading-relaxed animate-fadeIn shadow-2xl shadow-blue-900/10 relative overflow-hidden">
                        {/* Dong Son Drum Background Decoration */}
                        <div
                            className="absolute inset-0 bg-no-repeat opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: "url('/images/dong_son_cover.png')", backgroundSize: '140%', backgroundPosition: 'center -220px' }}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="text-center mb-10 max-w-3xl mx-auto">
                                <h4 className="text-[26px] md:text-[32px] font-bold mb-4 leading-tight">
                                    Gửi hiến kế
                                </h4>
                                <div className="w-20 h-1.5 bg-black/60 mx-auto rounded-full mb-6"></div>
                                <p className="text-gray-600 text-[17px] italic font-medium">
                                    Chia sẻ ý kiến, sáng kiến của người dân và doanh nghiệp góp phần nâng cao chất lượng, hiệu quả công tác xây dựng, tổ chức thi hành pháp luật trên toàn diện các lĩnh vực nhằm thúc đẩy phát triển kinh tế - xã hội của đất nước.
                                </p>
                            </div>



                            {/* Content Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                        Sứ mệnh
                                    </h5>
                                    <p className="text-[14px] leading-relaxed text-gray-700">
                                        Chúng tôi cam kết tạo ra một môi trường dân chủ, minh bạch, nơi người dân và doanh nghiệp có thể trực tiếp đóng góp trí tuệ vào việc hoàn thiện hệ thống pháp luật nước nhà, thúc đẩy sự phát triển bền vững của xã hội.
                                    </p>
                                </div>

                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                        Mục tiêu
                                    </h5>
                                    <ul className="text-[14px] space-y-2 text-gray-700">
                                        <li className="flex gap-2"><span>•</span> Tập hợp các góc nhìn đa chiều từ thực tiễn cuộc sống.</li>
                                        <li className="flex gap-2"><span>•</span> Chuyển hóa hiến kế thiết thực thành các giải pháp chính sách hiệu quả.</li>
                                        <li className="flex gap-2"><span>•</span> Rút ngắn khoảng cách giữa chính sách và thực thi.</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                                    <h5 className="font-bold mb-4 text-center text-[#1e3a8a] text-[19px]">
                                        Cam kết
                                    </h5>
                                    <p className="text-[14px] leading-relaxed text-gray-700">
                                        Hệ thống đảm bảo bảo mật tuyệt đối thông tin định danh. Mọi ý kiến đều được hội đồng chuyên môn thẩm định thấu đáo và phản hồi kết quả xử lý một cách minh bạch, kịp thời.
                                    </p>
                                </div>
                            </div>

                            {/* Leadership Quote Section */}
                            <div className="max-w-4xl mx-auto relative">
                                <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl border border-purple-100/50 shadow-inner text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-purple-200/30 transition-all duration-700" />
                                    <p className="text-[17px] md:text-[19px] text-gray-800 italic leading-relaxed relative z-10 mb-4 font-medium">
                                        "Dễ mười lần không dân cũng chịu, khó trăm lần dân liệu cũng xong."
                                    </p>
                                    <div className="w-12 h-0.5 bg-purple-300 mx-auto mb-4" />
                                    <footer className="text-purple-900 font-bold text-[14px] uppercase relative z-10">
                                        — Chủ tịch Hồ Chí Minh —
                                    </footer>
                                    {/* <p className="text-[12px] text-purple-600/70 mt-2 italic font-medium relative z-10">
                                        Lời căn dặn của Chủ tịch Hồ Chí Minh về sức mạnh to lớn của Nhân dân
                                    </p> */}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 mb-8">

                    <div className="space-y-8">
                        {/* Section 1: Nội dung */}
                        <div>
                            <h3 className="text-[18px] font-bold text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[13px] font-black">1</span>
                                Nội dung hiến kế
                            </h3>

                            {!user && (
                                <div id="login-required-notice" className="flex items-center gap-2.5 bg-blue-50 border border-blue-200 text-blue-800 text-[13px] px-4 py-3 rounded-xl mb-5 animate-fadeIn scroll-mt-28 whitespace-nowrap overflow-x-auto max-w-full">
                                    <Info size={15} className="shrink-0 text-blue-600" />
                                    <span>
                                        Vui lòng <Link to="/login" className="font-bold underline hover:text-blue-900">Đăng nhập</Link> trước khi thực hiện hiến kế để đảm bảo tính xác thực và nhận phản hồi về kết quả xử lý.
                                    </span>
                                </div>
                            )}

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
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Nội dung chi tiết <span className="text-red-500">*</span></label>
                                    <textarea
                                        required rows={6} name="content"
                                        placeholder="Trình bày chi tiết thực trạng, vấn đề và giải pháp đề xuất của bạn..."
                                        value={formData.content} onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-[15px] resize-y"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[14px] font-bold text-gray-800 mb-2">Từ khóa liên quan</label>
                                    <div className="relative">
                                        <div
                                            className={`min-h-[50px] w-full px-4 py-2 bg-gray-50 border ${isTagDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200'} rounded-xl transition-all cursor-pointer flex flex-wrap gap-2 items-center`}
                                            onClick={() => setIsTagDropdownOpen(true)}
                                        >
                                            {formData.tags.length > 0 && formData.tags.map(tag => (
                                                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-[13px] font-bold rounded-lg border border-blue-200">
                                                    {tag}
                                                    <X size={14} className="cursor-pointer hover:text-blue-900" onClick={(e) => { e.stopPropagation(); toggleTag(tag); }} />
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                className="flex-1 min-w-[120px] bg-transparent outline-none text-[15px] placeholder:text-gray-400 py-1"
                                                placeholder={formData.tags.length === 0 ? "Tìm kiếm từ khóa..." : ""}
                                                value={tagSearch}
                                                onChange={(e) => { setTagSearch(e.target.value); setIsTagDropdownOpen(true); }}
                                                onFocus={() => setIsTagDropdownOpen(true)}
                                            />
                                            <ChevronDown size={20} className="text-gray-400 shrink-0 ml-auto" onClick={(e) => { e.stopPropagation(); setIsTagDropdownOpen(!isTagDropdownOpen); }} />
                                        </div>

                                        {isTagDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsTagDropdownOpen(false)}></div>
                                                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto p-2 animate-fadeIn">
                                                    {POPULAR_TAGS.filter(t => t.toLowerCase().includes(tagSearch.toLowerCase())).length > 0 ? (
                                                        POPULAR_TAGS.filter(t => t.toLowerCase().includes(tagSearch.toLowerCase())).map(tag => (
                                                            <div
                                                                key={tag}
                                                                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                                onClick={() => { toggleTag(tag); setTagSearch(''); }}
                                                            >
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.tags.includes(tag) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                                                    {formData.tags.includes(tag) && <CheckCircle2 size={12} className="text-white" />}
                                                                </div>
                                                                <span className={`text-[14.5px] ${formData.tags.includes(tag) ? 'font-bold text-blue-700' : 'text-gray-700'}`}>{tag}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-6 text-center text-gray-500 text-[14px]">
                                                            Không tìm thấy từ khóa nào phù hợp với "{tagSearch}"
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

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
                            Gửi hiến kế
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

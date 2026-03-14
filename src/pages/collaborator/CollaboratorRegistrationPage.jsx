import React, { useState } from 'react';
import {
    Check, ChevronRight, ChevronLeft, Upload, FileText, X, AlertCircle, ShieldCheck, Mail, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const MOCK_USER = {
    name: 'Nguyễn Văn A',
    dob: '1990-08-15',
    gender: 'Nam',
    phone: '0987654321',
    email: 'nguyenvana@example.com',
    address: 'Tòa nhà AP, số 12 đường Trần Phú',
    city: 'Hà Nội',
    identityDocs: []
};

const LAW_FIELDS = [
    'Dân sự', 'Hình sự', 'Hành chính', 'Đất đai - Bất động sản', 'Lao động',
    'Doanh nghiệp - Đầu tư', 'Thuế', 'Hôn nhân gia đình', 'Sở hữu trí tuệ', 'Môi trường', 'Quốc tế'
];

const CATEGORIES = [
    'Tin tức pháp luật', 'Phân tích - Bình luận pháp lý', 'Phổ biến giáo dục pháp luật',
    'Nghiên cứu - Trao đổi', 'Tư vấn pháp lý', 'Bài giảng - Tài liệu học tập'
];

const CollaboratorRegistrationPage = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Step 1 State
    const [personalInfo, setPersonalInfo] = useState({ ...MOCK_USER });

    // Step 2 State
    const [experience, setExperience] = useState({
        fields: [],
        years: '',
        workplace: '',
        role: '',
        education: '',
        description: ''
    });

    // Step 3 State
    const [documents, setDocuments] = useState({
        cv: null,
        certs: [],
        introduction: '',
        categories: [],
        portfolio: ''
    });

    // Step 4 State
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState({});

    const handleNext = () => {
        // Simple validation mock
        const newErrors = {};
        if (step === 1) {
            if (!personalInfo.name) newErrors.name = 'Vui lòng nhập họ tên';
            if (personalInfo.identityDocs.length === 0) newErrors.identityDocs = 'Vui lòng đính kèm ít nhất 1 tài liệu chứng nhận';
        } else if (step === 2) {
            if (experience.fields.length === 0) newErrors.fields = 'Vui lòng chọn ít nhất 1 lĩnh vực';
            if (!experience.years) newErrors.years = 'Vui lòng chọn số năm kinh nghiệm';
        } else if (step === 3) {
            if (!documents.cv) newErrors.cv = 'Vui lòng tải lên CV';
            if (documents.introduction.length < 50) newErrors.introduction = 'Giới thiệu bản thân tối thiểu 50 ký tự';
            if (documents.categories.length === 0) newErrors.categories = 'Vui lòng chọn ít nhất 1 chuyên mục';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStep(Math.min(step + 1, 4));
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep(Math.max(step - 1, 1));
        window.scrollTo(0, 0);
    };

    const handleSubmit = () => {
        if (!agreed) return;
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const toggleField = (field) => {
        const selected = experience.fields;
        if (selected.includes(field)) {
            setExperience({ ...experience, fields: selected.filter(f => f !== field) });
        } else {
            if (selected.length < 5) {
                setExperience({ ...experience, fields: [...selected, field] });
            }
        }
    };

    const toggleCategory = (cat) => {
        const selected = documents.categories;
        if (selected.includes(cat)) {
            setDocuments({ ...documents, categories: selected.filter(c => c !== cat) });
        } else {
            setDocuments({ ...documents, categories: [...selected, cat] });
        }
    };

    // --- Render Form Steps ---
    const renderStep1 = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50/50 p-4 rounded-lg flex gap-3 text-blue-800 border border-blue-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">Thông tin được đồng bộ một phần từ hồ sơ cá nhân của bạn. Vui lòng kiểm tra và hoàn thiện để đảm bảo tính chính xác.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={personalInfo.name}
                        onChange={e => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        value={personalInfo.dob}
                        onChange={e => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tài liệu giấy tờ chứng nhận đính kèm <span className="text-red-500">*</span></label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${errors.identityDocs ? 'border-red-300 bg-red-50' : personalInfo.identityDocs.length > 0 ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400 bg-white'}`}>
                        <div className="space-y-1 text-center">
                            {personalInfo.identityDocs.length > 0 ? (
                                <div className="flex flex-col items-center">
                                    <div className="flex flex-wrap gap-2 justify-center mb-3">
                                        {personalInfo.identityDocs.map((doc, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-green-200">
                                                <FileText size={16} className="text-green-600" />
                                                <span className="text-sm font-medium">{doc.name}</span>
                                                <button onClick={() => setPersonalInfo({ ...personalInfo, identityDocs: personalInfo.identityDocs.filter((_, i) => i !== idx) })} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <label className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
                                        + Thêm file khác
                                        <input type="file" className="sr-only" multiple onChange={(e) => {
                                            if (e.target.files.length > 0) {
                                                setPersonalInfo({ ...personalInfo, identityDocs: [...personalInfo.identityDocs, ...Array.from(e.target.files)] });
                                            }
                                        }} />
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-700 justify-center">
                                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Tải các file chứng nhận lên</span>
                                            <input type="file" className="sr-only" multiple onChange={(e) => {
                                                if (e.target.files.length > 0) {
                                                    setPersonalInfo({ ...personalInfo, identityDocs: Array.from(e.target.files) });
                                                }
                                            }} />
                                        </label>
                                        <p className="pl-1">hoặc kéo thả vào đây</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Giúp hoàn thiện và bảo vệ tài khoản (Hỗ trợ PDF, JPG, PNG)</p>
                                </>
                            )}
                        </div>
                    </div>
                    {errors.identityDocs && <p className="text-red-500 text-xs mt-1">{errors.identityDocs}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
                    <select
                        value={personalInfo.gender}
                        onChange={e => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email liên hệ <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tỉnh / Thành phố <span className="text-red-500">*</span></label>
                    <select
                        value={personalInfo.city}
                        onChange={e => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white"
                    >
                        <option value="">Chọn tỉnh thành</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ hiện tại <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                        value={personalInfo.address}
                        onChange={e => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Lĩnh vực pháp luật chuyên sâu <span className="text-red-500">*</span>
                    <span className="text-gray-400 font-normal ml-2 text-xs">(Chọn tối đa 5 lĩnh vực)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {LAW_FIELDS.map(field => {
                        const isSelected = experience.fields.includes(field);
                        const isDisabled = !isSelected && experience.fields.length >= 5;
                        return (
                            <button
                                key={field}
                                onClick={() => toggleField(field)}
                                disabled={isDisabled}
                                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${isSelected
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : isDisabled
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                            >
                                {field}
                            </button>
                        );
                    })}
                </div>
                {errors.fields && <p className="text-red-500 text-xs mt-2">{errors.fields}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số năm kinh nghiệm <span className="text-red-500">*</span></label>
                    <select
                        value={experience.years}
                        onChange={e => setExperience({ ...experience, years: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white ${errors.years ? 'border-red-500' : 'border-gray-200'}`}
                    >
                        <option value="">Chọn khoảng thời gian</option>
                        <option value="Dưới 1 năm">Dưới 1 năm</option>
                        <option value="1–3 năm">1–3 năm</option>
                        <option value="3–5 năm">3–5 năm</option>
                        <option value="5–10 năm">5–10 năm</option>
                        <option value="Trên 10 năm">Trên 10 năm</option>
                    </select>
                    {errors.years && <p className="text-red-500 text-xs mt-1">{errors.years}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trình độ học vấn cao nhất</label>
                    <select
                        value={experience.education}
                        onChange={e => setExperience({ ...experience, education: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white"
                    >
                        <option value="">Chọn trình độ</option>
                        <option value="Đại học">Đại học</option>
                        <option value="Thạc sĩ">Thạc sĩ</option>
                        <option value="Tiến sĩ">Tiến sĩ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Đơn vị công tác hiện tại</label>
                    <input
                        type="text"
                        placeholder="Tên cơ quan, công ty, văn phòng luật, trường học..."
                        value={experience.workplace}
                        onChange={e => setExperience({ ...experience, workplace: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chức vụ / Vai trò hiện tại</label>
                    <input
                        type="text"
                        placeholder="VD: Luật sư, Giảng viên, Chuyên viên pháp lý..."
                        value={experience.role}
                        onChange={e => setExperience({ ...experience, role: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>

                <div className="md:col-span-2">
                    <div className="flex justify-between items-end mb-2">
                        <label className="block text-sm font-semibold text-gray-700">Mô tả ngắn về kinh nghiệm / thành tựu tiêu biểu</label>
                        <span className="text-xs text-gray-400">{experience.description.length}/500</span>
                    </div>
                    <textarea
                        rows="4"
                        placeholder="Tóm tắt về kinh nghiệm chuyên môn của bạn..."
                        value={experience.description}
                        onChange={e => setExperience({ ...experience, description: e.target.value.slice(0, 500) })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-none"
                    ></textarea>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tải lên hồ sơ năng lực (CV) <span className="text-red-500">*</span></label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${errors.cv ? 'border-red-300 bg-red-50' : documents.cv ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400 bg-white'}`}>
                    <div className="space-y-1 text-center">
                        {documents.cv ? (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                    <FileText size={24} />
                                </div>
                                <div className="text-sm text-gray-800 font-medium">CV_NguyenVanA.pdf</div>
                                <div className="text-xs text-gray-500 mb-3">1.2 MB</div>
                                <button onClick={() => setDocuments({ ...documents, cv: null })} className="text-xs text-red-600 hover:text-red-800 font-medium bg-red-100 px-3 py-1 rounded">Xóa file</button>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-700 justify-center">
                                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Tải file lên</span>
                                        <input type="file" className="sr-only" onChange={(e) => {
                                            if (e.target.files[0]) setDocuments({ ...documents, cv: e.target.files[0] });
                                        }} accept=".pdf,.doc,.docx" />
                                    </label>
                                    <p className="pl-1">hoặc kéo thả vào đây</p>
                                </div>
                                <p className="text-xs text-gray-500">Hỗ trợ PDF, DOCX tối đa 10MB</p>
                            </>
                        )}
                    </div>
                </div>
                {errors.cv && <p className="text-red-500 text-xs mt-2">{errors.cv}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Chứng chỉ nghề nghiệp / Bằng cấp <span className="text-gray-400 font-normal ml-2 text-xs">(Không bắt buộc, tối đa 5 file)</span></label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <div className="flex text-sm text-gray-700 justify-center">
                            <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Thêm chứng chỉ</span>
                                <input type="file" className="sr-only" multiple />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">Hỗ trợ PDF, JPG, PNG tối đa 5MB/file</p>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Chuyên mục muốn đóng góp <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={documents.categories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-[14px] text-gray-700 font-medium">{cat}</span>
                        </label>
                    ))}
                </div>
                {errors.categories && <p className="text-red-500 text-xs mt-2">{errors.categories}</p>}
            </div>

            <div>
                <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Giới thiệu bản thân và Lý do muốn trở thành cộng tác viên <span className="text-red-500">*</span></label>
                    <span className="text-xs text-gray-400">{documents.introduction.length}/2000</span>
                </div>
                <textarea
                    rows="5"
                    placeholder="Giới thiệu nhanh về bạn, kinh nghiệm viết bài (nếu có) và mong muốn khi tham gia Cổng..."
                    value={documents.introduction}
                    onChange={e => setDocuments({ ...documents, introduction: e.target.value.slice(0, 2000) })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-y ${errors.introduction ? 'border-red-500' : 'border-gray-200'}`}
                ></textarea>
                {errors.introduction && <p className="text-red-500 text-xs mt-1">{errors.introduction}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Đường dẫn Website / LinkedIn (Tùy chọn)</label>
                <input
                    type="url"
                    placeholder="https://..."
                    value={documents.portfolio}
                    onChange={e => setDocuments({ ...documents, portfolio: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                />
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Rà soát thông tin đăng ký</h3>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 relative">
                <button onClick={() => setStep(1)} className="absolute top-4 right-4 text-sm font-medium text-blue-600 hover:text-blue-800">Chỉnh sửa</button>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><div className="w-1.5 h-4 bg-blue-500 rounded-full"></div> Thông tin cá nhân</h4>
                <div className="grid grid-cols-2 text-sm gap-y-3 gap-x-6">
                    <div><span className="text-gray-500 block text-xs">Họ và tên</span><span className="font-medium text-gray-800">{personalInfo.name}</span></div>
                    <div><span className="text-gray-500 block text-xs">Ngày sinh</span><span className="font-medium text-gray-800">{personalInfo.dob}</span></div>
                    <div><span className="text-gray-500 block text-xs">Chứng nhận đính kèm</span><span className="font-medium text-gray-800">{personalInfo.identityDocs.length > 0 ? `${personalInfo.identityDocs.length} file` : 'Chưa có'}</span></div>
                    <div><span className="text-gray-500 block text-xs">Email</span><span className="font-medium text-gray-800">{personalInfo.email}</span></div>
                    <div className="col-span-2"><span className="text-gray-500 block text-xs">Lĩnh vực chuyên sâu</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                            {experience.fields.map(f => <span key={f} className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">{f}</span>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 relative">
                <button onClick={() => setStep(3)} className="absolute top-4 right-4 text-sm font-medium text-blue-600 hover:text-blue-800">Chỉnh sửa</button>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><div className="w-1.5 h-4 bg-purple-500 rounded-full"></div> Chuyên môn & Tài liệu</h4>
                <div className="grid grid-cols-1 text-sm gap-y-3">
                    <div><span className="text-gray-500 block text-xs">Đơn vị công tác</span><span className="font-medium text-gray-800">{experience.workplace || 'Chưa cung cấp'} - {experience.role}</span></div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-1">Chuyên mục đóng góp</span>
                        <ul className="list-disc pl-5 font-medium text-gray-800">
                            {documents.categories.map(c => <li key={c}>{c}</li>)}
                        </ul>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-1">File Upload</span>
                        <div className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 px-3 py-2 rounded-lg inline-flex"><FileText size={16} /> CV_NguyenVanA.pdf_uploaded</div>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t mt-6">
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl hover:bg-yellow-50 transition-colors">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="text-sm text-gray-700 leading-relaxed">
                        Tôi xác nhận mọi thông tin cung cấp là chính xác và trung thực. Tôi đã đọc và đồng ý với
                        <a href="#" className="font-bold text-blue-600 hover:underline mx-1">Điều khoản & Điều kiện Dành cho Cộng tác viên</a>
                        của Cổng Pháp luật Quốc gia, đồng ý tuân thủ quy chuẩn biên tập nội dung.
                    </div>
                </label>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="py-12 px-4 flex flex-col items-center justify-center text-center animate-fadeInUp">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Gửi hồ sơ thành công!</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-8 text-[15px] leading-relaxed">
                Cảm ơn bạn đã đăng ký trở thành cộng tác viên của Cổng Pháp luật Quốc gia.
                Hồ sơ mã <strong className="text-gray-900">CTV-{new Date().getFullYear()}-00{Math.floor(Math.random() * 10000)}</strong> đã được ghi nhận.
                Chúng tôi đã gửi một email xác nhận đến <strong className="text-gray-900">{personalInfo.email}</strong>.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md border border-gray-100 mb-8 text-left">
                <h4 className="font-bold text-gray-800 mb-4 text-[15px]">Tiến trình xét duyệt:</h4>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {/* Step 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <Check size={14} />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <h5 className="font-bold text-gray-900 text-sm mb-1">Đã nhận hồ sơ</h5>
                            <span className="text-xs text-gray-500">Hôm nay</span>
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                            <h5 className="font-bold text-blue-900 text-sm mb-1">Đang xem xét</h5>
                            <span className="text-xs text-blue-600">Dự kiến 3-5 ngày làm việc</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ca-nhan/ho-so" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                    Về thẻ Hồ sơ
                </Link>
                <Link to="/" className="px-8 py-3 bg-white text-gray-700 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition shadow-sm">
                    Về trang chủ
                </Link>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 max-w-[1500px] py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Đăng ký Cộng tác viên</h1>
                <p className="text-gray-500 text-[15px]">Cùng đóng góp xây dựng hệ thống tư liệu và hỗ trợ cộng đồng pháp lý.</p>
            </div>

            {isSubmitted ? (
                renderSuccess()
            ) : (
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    {/* --- Wizard Header / Progress Bar --- */}
                    <div className="bg-gray-50/80 px-4 py-5 border-b border-gray-100 flex items-center justify-between overflow-x-auto hidden-scrollbar">
                        <div className="flex items-center min-w-max w-full">
                            {[
                                { num: 1, label: 'Cá nhân' },
                                { num: 2, label: 'Chuyên môn' },
                                { num: 3, label: 'Tài liệu' },
                                { num: 4, label: 'Gửi' }
                            ].map((s, i) => (
                                <React.Fragment key={s.num}>
                                    <div className={`flex flex-col items-center relative z-10 w-24 ${step === s.num ? 'opacity-100' : step > s.num ? 'opacity-100 cursor-pointer' : 'opacity-50'}`} onClick={() => { if (step > s.num) setStep(s.num); }}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 transition-colors ${step === s.num ? 'bg-blue-600 text-white ring-4 ring-blue-100' : step > s.num ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            {step > s.num ? <Check size={16} /> : s.num}
                                        </div>
                                        <span className={`text-[11px] font-bold ${step === s.num ? 'text-blue-700' : step > s.num ? 'text-green-600' : 'text-gray-500'}`}>{s.label}</span>
                                    </div>
                                    {i < 3 && (
                                        <div className={`flex-1 h-1 rounded flex-shrink-0 mx-[-10px] sm:mx-0 z-0 ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                {step === 1 && 'Bước 1: Thông tin cá nhân'}
                                {step === 2 && 'Bước 2: Chuyên môn & Kinh nghiệm'}
                                {step === 3 && 'Bước 3: Tài liệu xét duyệt'}
                                {step === 4 && 'Bước 4: Xác nhận & Đồng ý'}
                            </h2>
                            <span className="text-xs text-gray-400 italic hidden sm:inline-block border bg-gray-50 px-2 py-1 rounded">Đã lưu nháp lúc {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}

                        {/* --- Footer Buttons --- */}
                        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                            <button
                                onClick={handleBack}
                                className={`px-6 py-2.5 rounded-xl font-bold text-[14px] flex items-center gap-2 transition-colors ${step === 1 ? 'invisible' : 'text-gray-600 hover:bg-gray-100 border border-gray-200 bg-white'}`}
                            >
                                <ChevronLeft size={18} /> Quay lại
                            </button>

                            {step < 4 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-2.5 rounded-xl font-bold text-[14px] flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                                >
                                    Tiếp theo <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!agreed}
                                    className={`px-8 py-2.5 rounded-xl font-bold text-[14px] flex items-center gap-2 transition shadow-lg ${agreed ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-blue-500/30' : 'text-gray-400 bg-gray-200 cursor-not-allowed shadow-none'}`}
                                    title={!agreed ? "Vui lòng đồng ý với điều khoản" : ""}
                                >
                                    Gửi đăng ký <ShieldCheck size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollaboratorRegistrationPage;

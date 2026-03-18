import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Send, FileUp, X, CheckCircle, Copy, AlertCircle, ArrowLeft, Search } from 'lucide-react';

const MOCK_AGENCIES = {
    'Trung ương': ['Bộ Tài chính', 'Bộ Công an', 'Bộ Xây dựng', 'Bộ Tư pháp', 'Văn phòng Chính phủ'],
    'Địa phương': ['UBND TP. Hà Nội', 'UBND TP. Hồ Chí Minh', 'UBND Tỉnh Bình Dương']
};

const LTV_FIELDS = ['Dân sự', 'Hình sự', 'Đất đai', 'Doanh nghiệp', 'Đầu tư', 'Lao động & Việc làm'];

const MOCK_LEGAL_DOCS = [
    'Luật Đất đai 2024',
    'Luật Nhà ở 2023',
    'Nghị định 102/2024/NĐ-CP',
    'Thông tư 04/2025/TT-BTC',
    'Luật Bảo hiểm xã hội 2024',
    'Luật Giao thông đường bộ 2008'
];

const CreatePhanAnhKienNghiPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/phan-anh-kien-nghi/tao-moi' } });
        }
    }, [user, navigate]);

    const [files, setFiles] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');
    const [formData, setFormData] = useState({
        level: 'Trung ương',
        agency: '',
        field: '',
        title: '',
        content: '',
        legalDocs: '',
        termsAgreed: false
    });
    const [errors, setErrors] = useState({});
    const [docSearchQuery, setDocSearchQuery] = useState('');
    const [showDocDropdown, setShowDocDropdown] = useState(false);

    if (!user) return null;

    const filteredDocs = MOCK_LEGAL_DOCS.filter(doc =>
        doc.toLowerCase().includes(docSearchQuery.toLowerCase())
    );

    const handleSelectDoc = (doc) => {
        setFormData({ ...formData, legalDocs: doc });
        setDocSearchQuery(doc);
        setShowDocDropdown(false);
        setErrors({ ...errors, legalDocs: null });
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            // Validation logic
            const validFiles = newFiles.filter(file => {
                const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
                const isValidType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(file.type);
                return isValidSize && isValidType;
            });

            if (validFiles.length !== newFiles.length) {
                alert('Một số file không hợp lệ (Vượt 10MB hoặc sai định dạng).');
            }

            if (files.length + validFiles.length > 3) {
                alert('Tối đa 3 file đính kèm.');
                return;
            }

            setFiles([...files, ...validFiles]);
        }
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.legalDocs) newErrors.legalDocs = 'Vui lòng chọn hoặc nhập văn bản pháp luật liên quan';
        if (!formData.agency) newErrors.agency = 'Vui lòng chọn cơ quan tiếp nhận';
        if (!formData.field) newErrors.field = 'Vui lòng chọn lĩnh vực';
        if (!formData.title) newErrors.title = 'Vui lòng nhập tiêu đề phản ánh';
        if (!formData.content) newErrors.content = 'Vui lòng nhập nội dung chi tiết';
        if (!formData.termsAgreed) newErrors.termsAgreed = 'Bạn phải đồng ý với cam kết';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Mock API call
            setTimeout(() => {
                setTrackingCode(`PA${Date.now()}`);
                setIsSubmitted(true);
            }, 600);
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(trackingCode);
        alert('Đã sao chép mã theo dõi!');
    };

    const handleCancel = () => {
        if (formData.title || formData.content) {
            if (window.confirm('Bạn có chắc chắn muốn hủy? Thông tin đã nhập sẽ bị mất.')) {
                navigate('/phan-anh-kien-nghi');
            }
        } else {
            navigate('/phan-anh-kien-nghi');
        }
    };

    // View for success
    if (isSubmitted) {
        return (
            <div className="bg-[#f4f7fb] min-h-screen py-16 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full text-center mx-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Gửi phản ánh thành công!</h1>
                    <p className="text-gray-600 mb-8">Lưu mã này để tra cứu kết quả xử lý. Bạn cũng sẽ nhận thông báo qua email khi có kết quả.</p>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                        <p className="text-sm font-medium text-blue-800 mb-2 uppercase tracking-wide">Mã theo dõi của bạn</p>
                        <div className="text-3xl font-black text-[#0f4c81] tracking-widest bg-white py-3 rounded-lg border border-blue-200 shadow-sm flex items-center justify-center gap-3">
                            {trackingCode}
                            <button onClick={handleCopyCode} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-md transition" title="Sao chép">
                                <Copy size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="text-left bg-gray-50 p-5 rounded-lg border text-sm mb-8 space-y-2">
                        <div className="flex gap-2"><span className="text-gray-500 w-32">Cơ quan tiếp nhận:</span> <span className="font-medium">{formData.agency}</span></div>
                        <div className="flex gap-2"><span className="text-gray-500 w-32">Lĩnh vực:</span> <span className="font-medium">{formData.field}</span></div>
                        <div className="flex gap-2"><span className="text-gray-500 w-32">Tiêu đề:</span> <span className="font-medium line-clamp-1">{formData.title}</span></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link to={`/phan-anh-kien-nghi?tab=search&code=${trackingCode}`} className="w-full bg-[#0f4c81] text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-md">
                            Tra cứu phản ánh
                        </Link>
                        <div className="flex gap-3">
                            <button onClick={() => { setIsSubmitted(false); setFormData({ ...formData, title: '', content: '' }); }} className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition">
                                Gửi mới
                            </button>
                            <Link to="/" className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition block">
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Form View
    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/phan-anh-kien-nghi" className="hover:text-[#0f4c81]">Phản ánh kiến nghị</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Gửi phản ánh</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#1a3b8b] text-white p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Gửi phản ánh, kiến nghị</h1>
                        <p className="text-blue-100">Gửi phản ánh, kiến nghị của bạn về chính sách, văn bản pháp luật tới cơ quan có thẩm quyền.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                        {/* Sender info (readonly) */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="bg-blue-100 text-[#0f4c81] w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                Thông tin người gửi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                                    <input type="text" value={user.name || 'Nguyễn Văn A'} readOnly className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-500 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại <span className="text-red-500">*</span></label>
                                    <input type="text" value={'0987654321'} readOnly className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-500 cursor-not-allowed" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input type="email" value={user.email || 'user@example.com'} readOnly className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-500 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        {/* Feedback Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="bg-blue-100 text-[#0f4c81] w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                Nội dung phản ánh kiến nghị
                            </h3>

                            {/* Legal Doc selection */}
                            <div className="relative z-10">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Văn bản pháp luật liên quan <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm hoặc khai báo số hiệu, tên văn bản pháp luật..."
                                        value={docSearchQuery}
                                        onChange={e => {
                                            setDocSearchQuery(e.target.value);
                                            setFormData({ ...formData, legalDocs: e.target.value });
                                            setShowDocDropdown(true);
                                            setErrors({ ...errors, legalDocs: null });
                                        }}
                                        onFocus={() => setShowDocDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowDocDropdown(false), 200)}
                                        className={`w-full border rounded-lg p-2.5 pl-10 ${errors.legalDocs ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                    />
                                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                                {errors.legalDocs && <p className="text-red-500 text-xs mt-1">{errors.legalDocs}</p>}

                                {/* Dropdown */}
                                {showDocDropdown && docSearchQuery && filteredDocs.length > 0 && (
                                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {filteredDocs.map((doc, idx) => (
                                            <li
                                                key={idx}
                                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                                                onClick={() => handleSelectDoc(doc)}
                                            >
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Target selection */}
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cấp xử lý <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="level" value="Trung ương" checked={formData.level === 'Trung ương'} onChange={e => { setFormData({ ...formData, level: e.target.value, agency: '' }); setErrors({ ...errors, agency: null }); }} className="w-4 h-4 text-[#0f4c81]" />
                                            <span>Cấp trung ương</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="level" value="Địa phương" checked={formData.level === 'Địa phương'} onChange={e => { setFormData({ ...formData, level: e.target.value, agency: '' }); setErrors({ ...errors, agency: null }); }} className="w-4 h-4 text-[#0f4c81]" />
                                            <span>Cấp địa phương</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cơ quan tiếp nhận <span className="text-red-500">*</span></label>
                                        <select
                                            value={formData.agency}
                                            onChange={e => { setFormData({ ...formData, agency: e.target.value }); setErrors({ ...errors, agency: null }); }}
                                            className={`w-full border rounded-lg p-2.5 bg-white ${errors.agency ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                        >
                                            <option value="">-- Chọn cơ quan tiếp nhận --</option>
                                            {(MOCK_AGENCIES[formData.level] || []).map(agency => (
                                                <option key={agency} value={agency}>{agency}</option>
                                            ))}
                                        </select>
                                        {errors.agency && <p className="text-red-500 text-xs mt-1">{errors.agency}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực <span className="text-red-500">*</span></label>
                                        <select
                                            value={formData.field}
                                            onChange={e => { setFormData({ ...formData, field: e.target.value }); setErrors({ ...errors, field: null }); }}
                                            className={`w-full border rounded-lg p-2.5 bg-white ${errors.field ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                        >
                                            <option value="">-- Chọn lĩnh vực --</option>
                                            {LTV_FIELDS.map(f => (
                                                <option key={f} value={f}>{f}</option>
                                            ))}
                                        </select>
                                        {errors.field && <p className="text-red-500 text-xs mt-1">{errors.field}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Content inputs */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phản ánh <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Tóm tắt nội dung phản ánh, kiến nghị..."
                                    maxLength={500}
                                    value={formData.title}
                                    onChange={e => { setFormData({ ...formData, title: e.target.value }); setErrors({ ...errors, title: null }); }}
                                    className={`w-full border rounded-lg p-2.5 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                />
                                <div className="flex justify-between mt-1">
                                    {errors.title ? <p className="text-red-500 text-xs">{errors.title}</p> : <span></span>}
                                    <span className="text-xs text-gray-500">{formData.title.length}/500</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết <span className="text-red-500">*</span></label>
                                <textarea
                                    rows={6}
                                    placeholder="Mô tả chi tiết nội dung phản ánh, kiến nghị của bạn..."
                                    value={formData.content}
                                    onChange={e => { setFormData({ ...formData, content: e.target.value }); setErrors({ ...errors, content: null }); }}
                                    className={`w-full border rounded-lg p-3 resize-y ${errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tệp đính kèm</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition relative">
                                    <input
                                        type="file"
                                        multiple
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    <FileUp className="mx-auto text-gray-400 mb-3" size={32} />
                                    <p className="text-gray-700 font-medium mb-1">Kéo thả hoặc bấm để chọn file</p>
                                    <p className="text-xs text-gray-500">Định dạng hỗ trợ: PDF, DOCX, JPG, PNG. Tối đa 10MB/file. Đính kèm tối đa 3 file.</p>
                                </div>

                                {files.length > 0 && (
                                    <ul className="mt-4 flex flex-col gap-2">
                                        {files.map((file, idx) => (
                                            <li key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-sm">
                                                <div className="flex items-center overflow-hidden">
                                                    <span className="text-blue-500 mr-2"><FileUp size={16} /></span>
                                                    <span className="truncate max-w-[200px] sm:max-w-md">{file.name}</span>
                                                    <span className="text-gray-400 ml-2 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                </div>
                                                <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition">
                                                    <X size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Confirmation and Actions */}
                        <div className="pt-6 border-t border-gray-200">
                            <label className="flex items-start gap-3 cursor-pointer mb-6">
                                <input
                                    type="checkbox"
                                    checked={formData.termsAgreed}
                                    onChange={e => { setFormData({ ...formData, termsAgreed: e.target.checked }); setErrors({ ...errors, termsAgreed: null }); }}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0f4c81] focus:ring-[#0f4c81]"
                                />
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Tôi xác nhận thông tin phản ánh là trung thực và chịu trách nhiệm về nội dung đã gửi.</span>
                                    {errors.termsAgreed && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.termsAgreed}</p>}
                                </div>
                            </label>

                            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end">
                                <button type="button" onClick={handleCancel} className="px-6 py-2.5 sm:py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition w-full sm:w-auto">
                                    Hủy bỏ
                                </button>
                                <button type="submit" className="px-8 py-2.5 sm:py-3 bg-[#0f4c81] text-white font-bold rounded-xl hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                                    <Send size={18} /> Gửi phản ánh
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePhanAnhKienNghiPage;

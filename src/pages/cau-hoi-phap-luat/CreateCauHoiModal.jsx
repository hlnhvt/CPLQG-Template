import React, { useState } from 'react';
import { X, Send, AlertCircle, FileText, Trash2, StopCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateCauHoiModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        domain: '',
        title: '',
        content: '',
        isAnonymous: false,
        acceptedTerms: false
    });
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            if (files.length + newFiles.length > 5) {
                alert('Chỉ được đính kèm tối đa 5 file.');
                return;
            }
            setFiles([...files, ...newFiles]);
        }
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setGeneratedCode('CH-2026-00' + Math.floor(Math.random() * 1000));
        }, 1500);
    };

    const handleClose = () => {
        setIsSuccess(false);
        setFormData({ domain: '', title: '', content: '', isAnonymous: false, acceptedTerms: false });
        setFiles([]);
        onClose();
    };

    const handleGoToPersonal = () => {
        handleClose();
        navigate('/dashboard/cau-hoi-ca-nhan');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="bg-[#0f4c81] text-white p-5 flex justify-between items-center shrink-0">
                    <h2 className="text-xl font-bold uppercase tracking-wide">Đặt câu hỏi về pháp luật</h2>
                    <button onClick={handleClose} className="text-white/80 hover:text-white transition bg-white/10 hover:bg-white/20 rounded-full p-1.5 backdrop-blur-sm">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-gray-50">
                    {isSuccess ? (
                        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <AlertCircle size={40} className="text-emerald-500 fill-emerald-100" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0f4c81] mb-2">Gửi câu hỏi thành công!</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
                                Câu hỏi của bạn đã được tiếp nhận và chuyển đến chuyên gia phù hợp xử lý.
                            </p>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 inline-block mb-8 shadow-sm">
                                <span className="text-sm text-gray-500 block mb-1 font-medium">Mã tra cứu câu hỏi:</span>
                                <span className="text-2xl font-black text-blue-700 tracking-wider font-mono">{generatedCode}</span>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <button onClick={handleGoToPersonal} className="bg-[#0f4c81] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition shadow-md">
                                    Xem danh sách câu hỏi của tôi
                                </button>
                                <button onClick={handleClose} className="border-2 border-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 text-sm border border-blue-100">
                                <AlertCircle className="shrink-0 text-blue-500" size={20} />
                                <p>Câu hỏi của bạn sẽ được chuyên gia/cán bộ trả lời trong vòng 3-5 ngày làm việc. Vui lòng cung cấp thông tin chi tiết và chính xác.</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                                        <input type="text" value="Nguyễn Văn A" disabled className="w-full border border-gray-200 bg-gray-100 rounded-lg p-2.5 text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Lĩnh vực pháp luật <span className="text-red-500">*</span></label>
                                        <select required name="domain" value={formData.domain} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0f4c81] transition bg-white">
                                            <option value="">-- Chọn lĩnh vực --</option>
                                            <option value="dan-su">Dân sự</option>
                                            <option value="hinh-su">Hình sự</option>
                                            <option value="lao-dong">Lao động</option>
                                            <option value="doanh-nghiep">Doanh nghiệp</option>
                                            <option value="dat-dai">Đất đai - Nhà ở</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề câu hỏi <span className="text-red-500">*</span></label>
                                    <input required type="text" name="title" value={formData.title} onChange={handleInputChange} maxLength={500} placeholder="Nhập tiêu đề ngắn gọn..." className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0f4c81] transition" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung chi tiết <span className="text-red-500">*</span></label>
                                    <textarea required name="content" value={formData.content} onChange={handleInputChange} maxLength={5000} rows={5} placeholder="Mô tả hoàn cảnh và vấn đề pháp lý bạn cần giải đáp..." className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0f4c81] transition resize-none"></textarea>
                                    <p className="text-right text-xs text-gray-400 mt-1">{formData.content.length}/5000 ký tự</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tài liệu đính kèm <span className="text-gray-400 font-normal">(Tối đa 5 file, dung lượng &lt; 10MB)</span></label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition duration-200">
                                        <input type="file" multiple id="file-upload" className="hidden" onChange={handleFileChange} />
                                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                            <FileText className="text-gray-400 mb-2" size={32} />
                                            <span className="text-[#0f4c81] font-bold hover:underline">Bấm để chọn file</span>
                                            <span className="text-sm text-gray-500 mt-1">hoặc kéo thả file vào đây</span>
                                        </label>
                                    </div>
                                    {files.length > 0 && (
                                        <ul className="mt-4 space-y-2">
                                            {files.map((file, index) => (
                                                <li key={index} className="flex justify-between items-center bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50 text-sm">
                                                    <span className="truncate text-gray-700 font-medium flex-1 mr-4">{file.name}</span>
                                                    <button type="button" onClick={() => removeFile(index)} className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-md transition">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="space-y-3 pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleInputChange} className="w-4 h-4 text-[#0f4c81] rounded border-gray-300 focus:ring-[#0f4c81]" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Ẩn danh (Tên thật của bạn sẽ không hiển thị công khai)</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input required type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleInputChange} className="w-4 h-4 mt-0.5 text-[#0f4c81] rounded border-gray-300 focus:ring-[#0f4c81]" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 leading-tight">
                                            Tôi xác nhận nội dung câu hỏi là trung thực và tuân thủ các quy định của Cổng thông tin. <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex gap-3 justify-end pt-2">
                                <button type="button" onClick={handleClose} className="px-6 py-2.5 border-2 border-gray-200 font-bold text-gray-600 rounded-lg hover:bg-gray-50 transition">
                                    Hủy
                                </button>
                                <button type="submit" disabled={isSubmitting || !formData.acceptedTerms || !formData.title || !formData.content || !formData.domain} className="px-8 py-2.5 bg-[#0f4c81] text-white font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 shadow-md">
                                    {isSubmitting ? (
                                        <><StopCircle className="animate-spin" size={18} /> Đang gửi...</>
                                    ) : (
                                        <><Send size={18} /> Gửi câu hỏi</>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCauHoiModal;

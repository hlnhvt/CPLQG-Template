import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronLeft, CheckCircle2, AlertCircle, FileText, Trash2, StopCircle, Calendar, User, PhoneCall, PlayCircle, MapPin } from 'lucide-react';

const DatLichTuVanPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // In a real app we would load this from location.state or fetch by ID
    const { expert, date, time } = location.state || {
        expert: { name: 'Ls. Hoàng Ngọc Cường', role: 'Luật sư tư vấn', domains: ['Đất đai', 'Dân sự'] },
        date: '2026-03-24',
        time: '09:00 - 09:30'
    };

    const [formData, setFormData] = useState({
        consultMethod: 'Video call',
        title: '',
        content: '',
        acceptedTerms: false
    });

    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookingCode, setBookingCode] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles].slice(0, 3)); // Max 3 files
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
        // Mock processing
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setBookingCode('LH-2026-00045');
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="bg-[#f4f7fb] min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-500 border border-gray-100">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white text-center">
                        <CheckCircle2 size={80} className="mx-auto mb-4 opacity-90" />
                        <h2 className="text-3xl font-bold mb-2">Đặt lịch hẹn thành công!</h2>
                        <p className="text-emerald-100 text-lg">Hệ thống đã gửi email xác nhận chi tiết tới bạn.</p>
                    </div>

                    <div className="p-8">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 text-center shadow-sm">
                            <span className="text-sm text-gray-500 font-bold block mb-1 uppercase tracking-wide">Mã phiếu hẹn</span>
                            <span className="text-4xl font-bold text-[#0f4c81] font-mono tracking-widest">{bookingCode}</span>
                        </div>

                        <div className="border border-gray-100 rounded-xl overflow-hidden mb-8">
                            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 font-bold text-gray-600 text-sm uppercase">Thông tin tóm tắt</div>
                            <div className="p-5 space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-10 text-gray-400 flex justify-center"><User size={24} /></div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Chuyên gia tư vấn</div>
                                        <div className="font-bold text-[#0f4c81] text-lg">{expert.name}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 text-gray-400 flex justify-center"><Calendar size={24} /></div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Thời gian tư vấn</div>
                                        <div className="font-bold text-gray-800 text-lg">{time} | Thứ 3, {date}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 text-gray-400 flex justify-center"><PlayCircle size={24} /></div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Hình thức tư vấn</div>
                                        <div className="font-bold text-gray-800 text-lg">{formData.consultMethod}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800 flex gap-3 border border-amber-100 mb-8">
                            <AlertCircle className="shrink-0 mt-0.5" size={20} />
                            <div>Hệ thống sẽ gửi nhắc nhở qua SMS hoặc Email trước buổi hẹn 24 giờ. Vui lòng chuẩn bị sẵn các câu hỏi và kết nối mạng ổn định nếu tư vấn qua Video.</div>
                        </div>

                        <div className="flex justify-center">
                            <Link to="/" className="bg-[#0f4c81] text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-800 transition text-center shadow-md">
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <button onClick={() => navigate(-1)} className="flex items-center text-[#0f4c81] font-bold hover:underline mb-2 transition">
                        <ChevronLeft size={20} /> Quay lại xem hồ sơ
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-6xl">
                <h1 className="text-3xl font-bold text-[#0f4c81] mb-8">Xác nhận đặt lịch Tư vấn</h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                    {/* Form Input Area */}
                    <div className="lg:w-2/3 space-y-6">
                        {/* Section 1: Consulting Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h3 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                                Hình thức & Nội dung tư vấn
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Hình thức tư vấn ưu tiên <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <label className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center transition-all ${formData.consultMethod === 'Video call' ? 'border-[#0f4c81] bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                            <input type="radio" name="consultMethod" value="Video call" checked={formData.consultMethod === 'Video call'} onChange={handleInputChange} className="hidden" />
                                            <PlayCircle size={24} className={`mb-2 ${formData.consultMethod === 'Video call' ? 'text-[#0f4c81]' : 'text-gray-400'}`} />
                                            <span className={`font-bold ${formData.consultMethod === 'Video call' ? 'text-[#0f4c81]' : 'text-gray-600'}`}>Video call</span>
                                        </label>
                                        <label className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center transition-all ${formData.consultMethod === 'Điện thoại' ? 'border-[#0f4c81] bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                            <input type="radio" name="consultMethod" value="Điện thoại" checked={formData.consultMethod === 'Điện thoại'} onChange={handleInputChange} className="hidden" />
                                            <PhoneCall size={24} className={`mb-2 ${formData.consultMethod === 'Điện thoại' ? 'text-[#0f4c81]' : 'text-gray-400'}`} />
                                            <span className={`font-bold ${formData.consultMethod === 'Điện thoại' ? 'text-[#0f4c81]' : 'text-gray-600'}`}>Điện thoại</span>
                                        </label>
                                        <label className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center transition-all ${formData.consultMethod === 'Gặp trực tiếp' ? 'border-[#0f4c81] bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                            <input type="radio" name="consultMethod" value="Gặp trực tiếp" checked={formData.consultMethod === 'Gặp trực tiếp'} onChange={handleInputChange} className="hidden" />
                                            <MapPin size={24} className={`mb-2 ${formData.consultMethod === 'Gặp trực tiếp' ? 'text-[#0f4c81]' : 'text-gray-400'}`} />
                                            <span className={`font-bold ${formData.consultMethod === 'Gặp trực tiếp' ? 'text-[#0f4c81]' : 'text-gray-600'}`}>Gặp trực tiếp</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề vấn đề cần tư vấn <span className="text-red-500">*</span></label>
                                    <input
                                        required
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Tư vấn quyền nuôi con sau ly hôn"
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#0f4c81] transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả chi tiết <span className="text-red-500">*</span></label>
                                    <textarea
                                        required
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows={5}
                                        placeholder="Mô tả hoàn cảnh, lịch sử sự vụ và những vướng mắc của bạn để chuyên gia có thể chuẩn bị tốt nhất trước buổi tư vấn..."
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#0f4c81] transition resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tài liệu liên quan (tối đa 3 file)</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative overflow-hidden group">
                                        <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                                        <FileText className="mx-auto text-gray-400 mb-2 group-hover:text-[#0f4c81] transition" size={32} />
                                        <span className="text-gray-600 font-medium">Bấm hoặc kéo thả file vào đây</span>
                                    </div>
                                    {files.length > 0 && (
                                        <ul className="mt-4 space-y-2">
                                            {files.map((file, idx) => (
                                                <li key={idx} className="flex justify-between items-center bg-gray-50 px-3 py-2 border rounded-lg">
                                                    <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                                                    <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Contact Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                            <h3 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                                Thông tin liên hệ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                    <input type="text" value="Nguyễn Văn A" disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-500 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                                    <input type="text" value="0901234567" disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-500 cursor-not-allowed" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email nhận lịch</label>
                                    <input type="text" value="nguyenvana@gmail.com" disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-500 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <input required type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleInputChange} className="w-5 h-5 mt-0.5 text-[#0f4c81] border-gray-300 rounded focus:ring focus:ring-blue-200 transition" />
                                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 leading-relaxed">
                                    Tôi xác nhận các thông tin khai báo trên là chính xác và đồng ý với điều khoản dịch vụ tư vấn của Cổng thông tin pháp luật. <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <div className="hidden lg:block pb-10">
                            {/* Action block for desktop */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.acceptedTerms || !formData.title || !formData.content}
                                className="w-full bg-[#0f4c81] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <><StopCircle className="animate-spin" size={24} /> ĐANG XỬ LÝ...</> : 'Xác nhận đặt lịch hẹn'}
                            </button>
                        </div>
                    </div>

                    {/* Sidebar / Summary Area */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#0f4c81] rounded-t-xl p-6 text-white">
                            <h3 className="font-bold text-xl mb-4 text-center">Tóm tắt lịch hẹn</h3>
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                                <p className="text-blue-100 text-sm mb-1 uppercase tracking-wider font-bold">Chuyên gia</p>
                                <p className="font-bold text-xl mb-1">{expert.name}</p>
                                <p className="text-sm font-medium opacity-90">{expert.role}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-b-xl shadow-lg border-x border-b border-gray-100 p-6 relative">
                            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-100/50 to-transparent"></div> {/* Drop shadow effect */}

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-400 text-sm font-bold mb-2 uppercase">Thời gian tư vấn</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center font-bold">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl text-[#0f4c81]">{time}</p>
                                            <p className="font-medium text-gray-600">Thứ 3, {date}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-6">
                                    <p className="text-gray-400 text-sm font-bold mb-2 uppercase">Lĩnh vực tư vấn</p>
                                    <div className="flex gap-2">
                                        {expert.domains.map((d, i) => (
                                            <span key={i} className="bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-lg border border-blue-100">{d}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-6">
                                    <p className="text-gray-400 text-sm font-bold mb-2 uppercase">Phí dịch vụ</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-700">Giá</span>
                                        <span className="text-emerald-500 font-bold text-l bg-emerald-50 px-3 py-1 rounded-xl">Miễn phí</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action block for mobile */}
                        <div className="block lg:hidden mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.acceptedTerms || !formData.title || !formData.content}
                                className="w-full bg-[#0f4c81] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <><StopCircle className="animate-spin" size={24} /> ĐANG XỬ LÝ...</> : 'XÁC NHẬN ĐẶT LỊCH HẸN'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DatLichTuVanPage;

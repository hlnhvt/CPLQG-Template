import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase, Award, ShieldCheck, Upload, Trash2, Edit3, X, Check, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-gray-700">Mức độ hoàn thiện hồ sơ</span>
                <span className="text-[#0f4c81]">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

const EditableSection = ({ title, children, isEditing, onEdit, onSave, onCancel }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-[16px] font-bold text-gray-800">{title}</h3>
                {!isEditing ? (
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-md hover:bg-blue-50"
                    >
                        <Edit3 size={15} /> Chỉnh sửa
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onCancel}
                            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100"
                        >
                            <X size={15} /> Hủy
                        </button>
                        <button
                            onClick={onSave}
                            className="flex items-center gap-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-1.5 rounded-md shadow-sm"
                        >
                            <Check size={15} /> Lưu
                        </button>
                    </div>
                )}
            </div>
            <div className={`px-6 py-5 ${isEditing ? 'bg-blue-50/10' : ''}`}>
                {children}
            </div>
        </div>
    );
};

const Field = ({ label, value, isEditing, type = "text", placeholder, options, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">{label}</label>
            {!isEditing ? (
                <div className="text-[15px] text-gray-900 font-medium pb-2 border-b border-transparent min-h-[32px]">
                    {value || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                </div>
            ) : (
                type === 'select' ? (
                    <select 
                        className="w-full text-[15px] border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                        value={value}
                        onChange={(e) => onChange && onChange(e.target.value)}
                    >
                        <option value="">Chọn {label.toLowerCase()}</option>
                        {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea
                        className="w-full text-[15px] border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm min-h-[100px]"
                        value={value}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        className="w-full text-[15px] border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                        value={value}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        placeholder={placeholder}
                    />
                )
            )}
        </div>
    );
};

const ProfilePage = () => {
    const { user, updateUser } = useAuth();

    // Form data copies for editing
    const [formData, setFormData] = useState({
        name: user?.name || "Nguyễn Văn A",
        dob: user?.dob || "1990-08-15",
        gender: user?.gender || "Nam",
        address: user?.address || "Tòa nhà AP, số 12 đường Trần Phú, Phường Điện Biên, Quận Ba Đình, TP. Hà Nội",
        phone: user?.phone || "0912 345 678",
        altEmail: user?.altEmail || "",
        socialLink: user?.socialLink || "",
        job: user?.job || "",
        workplace: user?.workplace || "",
        expertise: user?.expertise || "",
        description: user?.description || ""
    });

    const [originalData, setOriginalData] = useState({ ...formData });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // States for editing different sections
    const [editState, setEditState] = useState({
        basic: false,
        contact: false,
        career: false
    });

    // Notify state
    const [savedNotice, setSavedNotice] = useState('');

    const toggleEdit = (section) => {
        if (editState[section]) {
            // Cancel -> revert data
            setFormData(originalData);
        } else {
            // Start editing -> reset base
            setOriginalData({ ...formData, name: user?.name });
        }
        setEditState(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSave = (section) => {
        // Save to AuthContext if it's basic section explicitly
        if (section === 'basic') {
            updateUser({ name: formData.name });
        }
        
        setOriginalData({ ...formData }); // Commit local
        setEditState(prev => ({ ...prev, [section]: false }));
        
        setSavedNotice('Lưu thông tin thành công!');
        setTimeout(() => setSavedNotice(''), 3000);
    };

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <h1 className="text-2xl font-bold text-[#0f4c81] mb-2">Hồ sơ cá nhân</h1>



            {savedNotice && (
                <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-lg mb-4 flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <Check size={18} />
                        <span className="font-medium text-sm">{savedNotice}</span>
                    </div>
                </div>
            )}

            {/* Basic Info Section (MH02) */}
            <EditableSection
                title="Thông tin cơ bản"
                isEditing={editState.basic}
                onEdit={() => toggleEdit('basic')}
                onSave={() => handleSave('basic')}
                onCancel={() => toggleEdit('basic')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <Field label="Họ và tên" value={formData.name} onChange={(v) => handleChange('name', v)} isEditing={editState.basic} />
                    <Field label="Ngày sinh" value={formData.dob} onChange={(v) => handleChange('dob', v)} isEditing={editState.basic} type="date" />
                    <Field label="Giới tính" value={formData.gender} onChange={(v) => handleChange('gender', v)} isEditing={editState.basic} type="select" options={['Nam', 'Nữ', 'Khác']} />

                    <div className="md:col-span-2">
                        <Field label="Địa chỉ thường trú" value={formData.address} onChange={(v) => handleChange('address', v)} isEditing={editState.basic} />
                    </div>
                </div>
            </EditableSection>

            {/* Contact Info Section (MH03) */}
            <EditableSection
                title="Thông tin liên hệ"
                isEditing={editState.contact}
                onEdit={() => toggleEdit('contact')}
                onSave={() => handleSave('contact')}
                onCancel={() => toggleEdit('contact')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Readonly verified email */}
                    <div>
                        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Email đăng nhập (Chính)</label>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1 flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed">
                                <Mail size={16} className="mr-2 opacity-50" /> {user?.email || 'nguyenvana@gmail.com'}
                            </div>
                            <button className="text-[13px] font-medium text-blue-600 hover:text-blue-800 shrink-0 border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                                Đổi email
                            </button>
                        </div>
                    </div>

                    {/* Phone with verify button if not editing, just input if editing */}
                    <div>
                        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Số điện thoại</label>
                        {!editState.contact ? (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="text-[15px] font-medium text-gray-900 pb-1">
                                    {formData.phone}
                                </div>
                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">Đã xác thực</span>
                            </div>
                        ) : (
                            <input 
                                type="tel" 
                                className="w-full text-[15px] border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm" 
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)} 
                            />
                        )}
                    </div>

                    <div className="md:col-span-2 pt-2 border-t border-gray-100">
                        <Field label="Email liên hệ phụ" value={formData.altEmail} onChange={(v) => handleChange('altEmail', v)} placeholder="Ví dụ: b.nguyen@company.com" isEditing={editState.contact} type="email" />
                        <Field label="Liên kết (Mạng xã hội, Website)" value={formData.socialLink} onChange={(v) => handleChange('socialLink', v)} placeholder="https://linkedin.com/in/nguyenvana" isEditing={editState.contact} type="url" />
                    </div>
                </div>
            </EditableSection>

            {/* Career Section (MH04) */}
            <EditableSection
                title="Thông tin nghề nghiệp"
                isEditing={editState.career}
                onEdit={() => toggleEdit('career')}
                onSave={() => handleSave('career')}
                onCancel={() => toggleEdit('career')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <Field label="Ngành nghề" value={formData.job} onChange={(v) => handleChange('job', v)} isEditing={editState.career} type="select" options={['Luật sư', 'Công chức, viên chức', 'Doanh nhân', 'Sinh viên', 'Nghiên cứu viên', 'Khác']} />
                    <Field label="Đơn vị công tác / Học tập" value={formData.workplace} onChange={(v) => handleChange('workplace', v)} isEditing={editState.career} placeholder="Nhập tên cơ quan, công ty hoặc trường học" />
                    <div className="md:col-span-2">
                        <Field label="Chuyên môn pháp lý quan tâm" value={formData.expertise} onChange={(v) => handleChange('expertise', v)} isEditing={editState.career} placeholder="Nhập lĩnh vực và nhấn Enter, ví dụ: Luật Doanh nghiệp, Dân sự..." />
                    </div>
                    <div className="md:col-span-2">
                        <Field label="Mô tả công việc" value={formData.description} onChange={(v) => handleChange('description', v)} isEditing={editState.career} type="textarea" placeholder="Giới thiệu ngắn về bản thân..." />
                    </div>
                </div>
            </EditableSection>

            {/* Attachments Section (MH05) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-[16px] font-bold text-gray-800">Tài liệu và Giấy tờ chứng nhận</h3>
                    <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-md">Chưa xác minh</span>
                </div>
                <div className="px-6 py-5">
                    <p className="text-[13px] text-gray-600 mb-6 bg-blue-50/50 p-3 rounded-lg border border-blue-100 italic">
                        Vui lòng đính kèm các giấy tờ chứng nhận (Bằng cấp, chứng chỉ hành nghề, thẻ nhà báo...) để hệ thống lưu hồ sơ và kích hoạt các quyền lợi mở rộng.
                    </p>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer group">
                        <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                            <Upload size={24} />
                        </div>
                        <h4 className="font-semibold text-[15px] text-gray-800 mb-1">Tải lên tài liệu chứng nhận đính kèm</h4>
                        <p className="text-[13px] text-gray-500 mb-5">Hỗ trợ JPG, PNG, PDF (Tối đa 5MB/file).</p>

                        <div className="flex justify-center flex-wrap gap-2 mb-4">
                            <span className="text-[13px] text-gray-400 font-medium pb-2">Chưa có tài liệu nào</span>
                        </div>

                        <label className="text-sm font-medium text-blue-600 bg-white border border-blue-200 px-5 py-2.5 rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors cursor-pointer display-inline-block">
                            Chọn tệp đính kèm
                            <input type="file" className="sr-only" multiple />
                        </label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;

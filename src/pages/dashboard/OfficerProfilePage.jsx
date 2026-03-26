import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase, Award, ShieldCheck, Upload, Trash2, Edit3, X, Check, Eye, Building, BookOpen, Star, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EditableSection = ({ title, icon: Icon, children, isEditing, onEdit, onSave, onCancel }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-[16px] font-bold text-gray-800 flex items-center gap-2">
                    {Icon && <Icon size={18} className="text-[#0f4c81]" />}
                    {title}
                </h3>
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
                <div className="text-[15px] text-gray-900 font-medium pb-2 border-b border-transparent min-h-[32px] break-words whitespace-pre-wrap">
                    {value ? value : <span className="text-gray-400 italic">Chưa cập nhật</span>}
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
                        className="w-full text-[15px] border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm min-h-[120px] resize-y"
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

const OfficerProfilePage = () => {
    const { user, updateUser } = useAuth();

    // Dữ liệu mẫu ban đầu cho Cán bộ
    const [formData, setFormData] = useState({
        name: user?.name || "Nguyễn Anh Quân",
        dob: user?.dob || "1985-11-20",
        gender: user?.gender || "Nam",
        address: user?.address || "Cầu Giấy, TP. Hà Nội",
        email: user?.email || "quan.na@moj.gov.vn",
        phone: user?.phone || "0912 345 678",

        // Thông tin công tác
        position: "Chuyên viên pháp chế",
        department: "Cục Công nghệ Thông tin",
        ministry: "Bộ Tư Pháp",

        // Tiểu sử & Thành tích
        workHistory: "2010 - 2015: Chuyên viên tại Sở Tư Pháp TP Hà Nội\n2015 - 2020: Phó phòng Hành chính Tư pháp, Bộ Tư Pháp\n2020 - Nay: Chuyên viên pháp chế, Cục Công nghệ Thông tin, Bộ Tư Pháp",
        achievements: "- Bằng khen của Bộ trưởng Bộ Tư Pháp năm 2018, 2021\n- Tham gia soạn thảo hiệu chỉnh Luật Công chứng\n- Chiến sĩ thi đua cấp Ngành năm 2022"
    });

    const [originalData, setOriginalData] = useState({ ...formData });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const [editState, setEditState] = useState({
        basic: false,
        work: false,
        history: false
    });

    const [savedNotice, setSavedNotice] = useState('');

    const toggleEdit = (section) => {
        if (editState[section]) {
            setFormData(originalData); // Cancel
        } else {
            setOriginalData({ ...formData }); // Start Edit
        }
        setEditState(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSave = (section) => {
        if (section === 'basic') {
            updateUser({ name: formData.name });
        }
        setOriginalData({ ...formData });
        setEditState(prev => ({ ...prev, [section]: false }));
        setSavedNotice('Cập nhật hồ sơ cán bộ thành công!');
        setTimeout(() => setSavedNotice(''), 3000);
    };

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <h1 className="text-2xl font-bold text-[#0f4c81] mb-2 flex items-center gap-2">
                <ShieldCheck size={28} className="text-blue-600" /> Hồ sơ cán bộ
            </h1>
            <p className="text-gray-500 text-sm mb-6">Quản lý thẻ thông tin công tác, đơn vị trực thuộc và quá trình cống hiến.</p>

            {savedNotice && (
                <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-lg mb-4 flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <Check size={18} />
                        <span className="font-medium text-sm">{savedNotice}</span>
                    </div>
                </div>
            )}

            {/* Thông tin cá nhân cơ bản */}
            <EditableSection
                title="Thông tin cá nhân cơ bản"
                icon={User}
                isEditing={editState.basic}
                onEdit={() => toggleEdit('basic')}
                onSave={() => handleSave('basic')}
                onCancel={() => toggleEdit('basic')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <Field label="Họ và tên" value={formData.name} onChange={(v) => handleChange('name', v)} isEditing={editState.basic} />
                    <Field
                        label="Ngày sinh"
                        value={editState.basic ? formData.dob : (() => {
                            if (!formData.dob) return '';
                            const [y, m, d] = formData.dob.split('-');
                            return y && m && d ? `${d}/${m}/${y}` : formData.dob;
                        })()}
                        onChange={(v) => handleChange('dob', v)}
                        isEditing={editState.basic}
                        type="date"
                    />
                    <Field label="Giới tính" value={formData.gender} onChange={(v) => handleChange('gender', v)} isEditing={editState.basic} type="select" options={['Nam', 'Nữ', 'Khác']} />
                    <Field label="Số điện thoại" value={formData.phone} onChange={(v) => handleChange('phone', v)} isEditing={editState.basic} type="tel" />
                    <div className="md:col-span-2">
                        <Field label="Email công vụ" value={formData.email} onChange={(v) => handleChange('email', v)} isEditing={editState.basic} type="email" />
                        <Field label="Nơi ở hiện nay" value={formData.address} onChange={(v) => handleChange('address', v)} isEditing={editState.basic} />
                    </div>
                </div>
            </EditableSection>

            {/* Thông tin đơn vị công tác */}
            <EditableSection
                title="Thông tin đơn vị công tác"
                icon={Building}
                isEditing={editState.work}
                onEdit={() => toggleEdit('work')}
                onSave={() => handleSave('work')}
                onCancel={() => toggleEdit('work')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="md:col-span-2">
                        <Field label="Chức vụ hiện tại" value={formData.position} onChange={(v) => handleChange('position', v)} isEditing={editState.work} placeholder="Ví dụ: Chuyên viên, Phó trưởng phòng..." />
                    </div>
                    <Field label="Phòng ban / Đơn vị trực thuộc" value={formData.department} onChange={(v) => handleChange('department', v)} isEditing={editState.work} placeholder="Ví dụ: Vụ Phổ biến GDPL" />
                    <Field label="Bộ / Ban / Ngành / Cơ quan chủ quản" value={formData.ministry} onChange={(v) => handleChange('ministry', v)} isEditing={editState.work} type="select" options={['Bộ Tư Pháp', 'Tòa án nhân dân tối cao', 'Viện kiểm sát nhân dân tối cao', 'Sở Tư Pháp (Tỉnh/TP)', 'Khác']} />
                </div>
            </EditableSection>

            {/* Quá trình công tác / Thành tích */}
            <EditableSection
                title="Tiểu sử công tác & Thành tích tư pháp"
                icon={BookOpen}
                isEditing={editState.history}
                onEdit={() => toggleEdit('history')}
                onSave={() => handleSave('history')}
                onCancel={() => toggleEdit('history')}
            >
                <div className="grid grid-cols-1 gap-y-4">
                    <Field
                        label="Tiểu sử công tác"
                        value={formData.workHistory}
                        onChange={(v) => handleChange('workHistory', v)}
                        isEditing={editState.history}
                        type="textarea"
                        placeholder="Mô tả các mốc thời gian và vị trí công tác..."
                    />
                    <Field
                        label="Thành tích nổi bật / Khen thưởng"
                        value={formData.achievements}
                        onChange={(v) => handleChange('achievements', v)}
                        isEditing={editState.history}
                        type="textarea"
                        placeholder="Liệt kê các danh hiệu, bằng khen trong ngành tư pháp..."
                    />
                </div>
            </EditableSection>

            {/* Tài liệu công vụ đính kèm */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-[16px] font-bold text-gray-800 flex items-center gap-2">
                        <Star size={18} className="text-[#0f4c81]" /> Thẻ công chức / Giấy tờ ủy quyền
                    </h3>
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-md">Đã xác minh nghiệp vụ</span>
                </div>
                <div className="px-6 py-5 flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                        <Award size={32} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-[15px] text-gray-800 mb-1">Thẻ ngành Tư Pháp</h4>
                        <p className="text-[13px] text-gray-500 mb-2">Số hiệu thẻ: BTP-2022-XXXXX</p>
                        <button className="text-[13px] font-medium text-blue-600 hover:underline">Xem bản PDF đính kèm</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OfficerProfilePage;

import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, Save, RotateCcw, AlertTriangle, Clock, Moon, Check, X, Search, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const NOTIFICATION_TYPES = [
    { id: 'vanban', label: 'Văn bản QPPL mới', desc: 'Thông báo khi có văn bản pháp luật mới trong lĩnh vực bạn quan tâm', locked: false },
    { id: 'duthao', label: 'Dự thảo đang lấy ý kiến', desc: 'Thông báo khi có dự thảo mới hoặc sắp hết hạn góp ý', locked: false },
    { id: 'hoidap', label: 'Hỏi đáp được trả lời', desc: 'Thông báo khi câu hỏi của bạn có câu trả lời mới', locked: false },
    { id: 'tinbai', label: 'Tin bài trong lĩnh vực quan tâm', desc: 'Tin tức pháp luật mới trong các lĩnh vực bạn theo dõi', locked: false },
    { id: 'hethong', label: 'Thông báo hệ thống', desc: 'Thông báo bảo trì, yêu cầu xác thực, cảnh báo bảo mật', locked: true }, // Cannot be turned off completely
    { id: 'khaosat', label: 'Thông báo khảo sát', desc: 'Lời mời tham gia khảo sát và phản hồi chất lượng dịch vụ', locked: false },
];

const CHANNELS = [
    { id: 'inapp', icon: Bell, label: 'In-app' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'push', icon: Smartphone, label: 'Push' },
];

const TOPIC_GROUPS = [
    {
        id: 'g1', title: 'Dân sự & Gia đình',
        topics: [
            { id: 't1', label: 'Dân sự' },
            { id: 't2', label: 'Gia đình & Hôn nhân' },
            { id: 't3', label: 'Thừa kế' },
            { id: 't4', label: 'Hợp đồng' }
        ]
    },
    {
        id: 'g2', title: 'Kinh tế & Doanh nghiệp',
        topics: [
            { id: 't5', label: 'Doanh nghiệp & Đầu tư' },
            { id: 't6', label: 'Thuế' },
            { id: 't7', label: 'Thương mại' },
            { id: 't8', label: 'Tài chính & Ngân hàng' },
            { id: 't9', label: 'Sở hữu trí tuệ' }
        ]
    },
    {
        id: 'g3', title: 'Đất đai & Xây dựng',
        topics: [
            { id: 't10', label: 'Đất đai & Nhà ở' },
            { id: 't11', label: 'Xây dựng' },
            { id: 't12', label: 'Quy hoạch & Đô thị' }
        ]
    },
    {
        id: 'g4', title: 'Lao động & Xã hội',
        topics: [
            { id: 't13', label: 'Lao động & Việc làm' },
            { id: 't14', label: 'Bảo hiểm' },
            { id: 't15', label: 'Giáo dục' },
            { id: 't16', label: 'Y tế & Dược' }
        ]
    },
    {
        id: 'g5', title: 'Hành chính & Tư pháp',
        topics: [
            { id: 't17', label: 'Hành chính' },
            { id: 't18', label: 'Hình sự' },
            { id: 't19', label: 'Tố tụng & Thi hành án' }
        ]
    },
    {
        id: 'g6', title: 'Môi trường & Tài nguyên',
        topics: [
            { id: 't20', label: 'Môi trường' },
            { id: 't21', label: 'Tài nguyên thiên nhiên' },
            { id: 't22', label: 'Biển & Đảo' }
        ]
    }
];

const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
        type="button"
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-200'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
    >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

const NotificationSettingsPage = () => {
    // 1. Settings state (Types & Channels)
    const [settings, setSettings] = useState({
        vanban: { enabled: true, channels: ['inapp', 'email'] },
        duthao: { enabled: true, channels: ['inapp'] },
        hoidap: { enabled: true, channels: ['inapp', 'email', 'push'] },
        tinbai: { enabled: false, channels: ['inapp'] },
        hethong: { enabled: true, channels: ['inapp', 'email'] },
        khaosat: { enabled: false, channels: ['inapp'] },
    });

    // 2. Quiet Hours State (Do Not Disturb)
    const [dndEnabled, setDndEnabled] = useState(false);
    const [dndTime, setDndTime] = useState({ start: '22:00', end: '07:00' });
    const [dndDays, setDndDays] = useState('all'); // 'all', 'weekdays', 'custom'
    const [dndCustomDays, setDndCustomDays] = useState([true, true, true, true, true, true, true]); // Mon-Sun
    const [dndAllowUrgent, setDndAllowUrgent] = useState(true);

    // 3. Pause Notifications State (Snooze)
    const [isPaused, setIsPaused] = useState(false);
    const [pauseUntil, setPauseUntil] = useState(null); // null means not paused, or indefinite if 'indefinite'
    const [pauseDurationText, setPauseDurationText] = useState('1 giờ');
    const [showPauseConfig, setShowPauseConfig] = useState(false);

    // 4. Topic Interests State
    const [selectedTopics, setSelectedTopics] = useState(['t1', 't5', 't17', 't18']); // Default pre-selected
    const [topicSearch, setTopicSearch] = useState('');
    const [expandedGroups, setExpandedGroups] = useState(['g1', 'g2', 'g5']); // Initially expand groups with selected items

    // UI States
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [showSaveToast, setShowSaveToast] = useState(false);

    // Filter topics based on search
    const filteredGroups = TOPIC_GROUPS.map(group => {
        const filteredTopics = group.topics.filter(t => 
            t.label.toLowerCase().includes(topicSearch.toLowerCase())
        );
        return { ...group, topics: filteredTopics };
    }).filter(group => group.topics.length > 0);

    // --- Handlers ---
    const handleToggleType = (typeId, currentStatus) => {
        if (NOTIFICATION_TYPES.find(t => t.id === typeId).locked) return;
        setSettings({
            ...settings,
            [typeId]: { ...settings[typeId], enabled: !currentStatus }
        });
    };

    const handleToggleChannel = (typeId, channelId) => {
        if (typeId === 'hethong' && channelId === 'inapp') return; // Cannot disable in-app for system

        const currentChannels = settings[typeId].channels;
        const newChannels = currentChannels.includes(channelId)
            ? currentChannels.filter(c => c !== channelId)
            : [...currentChannels, channelId];
        
        // Ensure at least one channel is selected if the type is enabled (except system which forces inapp)
        if (newChannels.length === 0 && typeId !== 'hethong') return;

        setSettings({
            ...settings,
            [typeId]: { ...settings[typeId], channels: newChannels }
        });
    };

    const toggleGroupExpand = (groupId) => {
        setExpandedGroups(prev => 
            prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
        );
    };

    const handleTopicToggle = (topicId) => {
        setSelectedTopics(prev => 
            prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
        );
    };

    const handleSelectAllTopics = () => {
        const allVisibleIds = filteredGroups.flatMap(g => g.topics.map(t => t.id));
        const allSelected = allVisibleIds.every(id => selectedTopics.includes(id));
        
        if (allSelected) {
            // Deselect visible
            setSelectedTopics(prev => prev.filter(id => !allVisibleIds.includes(id)));
        } else {
            // Select all visible
            const newSelection = new Set([...selectedTopics, ...allVisibleIds]);
            setSelectedTopics(Array.from(newSelection));
        }
    };

    const handlePauseToggle = (checked) => {
        if (checked) {
            setShowPauseConfig(true);
        } else {
            setIsPaused(false);
            setPauseUntil(null);
            setShowPauseConfig(false);
        }
    };

    const applyPause = (duration, label) => {
        setIsPaused(true);
        setPauseDurationText(label);
        setShowPauseConfig(false);
        if (duration === '1h') {
            const date = new Date();
            date.setHours(date.getHours() + 1);
            setPauseUntil(date);
        } else if (duration === '4h') {
            const date = new Date();
            date.setHours(date.getHours() + 4);
            setPauseUntil(date);
        } else if (duration === 'today') {
            const date = new Date();
            date.setHours(23, 59, 59, 999);
            setPauseUntil(date);
        } else {
            setPauseUntil('indefinite');
        }
    };

    const handleReset = () => {
        setSettings({
            vanban: { enabled: true, channels: ['inapp', 'email'] },
            duthao: { enabled: true, channels: ['inapp'] },
            hoidap: { enabled: true, channels: ['inapp', 'email'] },
            tinbai: { enabled: false, channels: ['inapp'] },
            hethong: { enabled: true, channels: ['inapp', 'email'] },
            khaosat: { enabled: false, channels: ['inapp'] },
        });
        setDndEnabled(false);
        setIsPaused(false);
        setPauseUntil(null);
        setSelectedTopics(['t1']); // Minimal default
        setIsResetModalOpen(false);
    };

    const handleSave = () => {
        console.log('Saved data:', { settings, dndEnabled, dndTime, dndDays, dndCustomDays, dndAllowUrgent, selectedTopics, isPaused, pauseUntil });
        setShowSaveToast(true);
        setTimeout(() => setShowSaveToast(false), 3000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="animate-fadeIn pb-24 max-w-[1000px] mx-auto">
            
            {showSaveToast && (
                <div className="fixed top-20 right-8 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-fadeIn">
                    <Check size={20} />
                    <span className="font-medium">Đã lưu cài đặt thông báo thành công</span>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Cấu hình Thông báo cá nhân</h1>
                <p className="text-gray-500 text-[15px] mt-1">Tùy chỉnh lĩnh vực, loại thông báo và thời gian nhận để hệ thống phục vụ bạn tốt nhất.</p>
            </div>

            <div className="space-y-8">
                
                {/* 1. Pause Notifications (Sticky Alert level) */}
                <div className={`rounded-2xl shadow-sm border overflow-hidden transition-colors ${isPaused ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}>
                    <div className="px-6 py-5 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isPaused ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                            <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                            <h2 className={`text-[17px] font-bold ${isPaused ? 'text-orange-900' : 'text-gray-900'}`}>
                                {isPaused ? 'Thông báo đang tạm dừng' : 'Tạm dừng thông báo (Snooze)'}
                            </h2>
                            <p className={`text-[14px] mt-0.5 ${isPaused ? 'text-orange-700' : 'text-gray-500'}`}>
                                {isPaused 
                                    ? `Các thông báo mới sẽ không đổ chuông hay đẩy thông báo cho đến ${pauseUntil === 'indefinite' ? 'khi bạn bật lại' : pauseUntil?.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}. Chúng vẫn được lưu trong hộp thư.` 
                                    : 'Tắt tạm thời toàn bộ thông báo (push, in-app pop-up) trong khoảng thời gian bạn cần yên tĩnh.'}
                            </p>
                        </div>
                        <div className="ml-4 shrink-0 flex items-center gap-3">
                            {isPaused && (
                                <button onClick={() => handlePauseToggle(false)} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-[13px] font-bold rounded-lg transition-colors">
                                    Bật lại ngay
                                </button>
                            )}
                            <ToggleSwitch checked={isPaused || showPauseConfig} onChange={handlePauseToggle} />
                        </div>
                    </div>

                    {showPauseConfig && !isPaused && (
                        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex flex-wrap gap-3 animate-fadeIn">
                            <span className="text-[14px] text-gray-700 font-medium self-center mr-2">Tạm dừng trong:</span>
                            <button onClick={() => applyPause('1h', '1 giờ')} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">1 giờ</button>
                            <button onClick={() => applyPause('4h', '4 giờ')} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">4 giờ</button>
                            <button onClick={() => applyPause('today', 'Hôm nay')} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">Hết hôm nay</button>
                            <button onClick={() => applyPause('indefinite', 'Đến khi bật lại')} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[14px] font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">Đến khi bật lại</button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: Types and channels (the complex matrix) */}
                    <div className="lg:col-span-7 space-y-8">
                        
                        {/* Types & Channels */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <h2 className="text-[17px] font-bold text-gray-900">Loại & Kênh thông báo</h2>
                                    <p className="text-[13px] text-gray-500">Chọn nội dung bạn muốn nhận và phương thức gửi tương ứng</p>
                                </div>
                            </div>
                            
                            <div className="divide-y divide-gray-100">
                                {NOTIFICATION_TYPES.map(type => {
                                    const isEnabled = settings[type.id]?.enabled;
                                    return (
                                        <div key={type.id} className={`p-6 transition-colors ${!isEnabled ? 'bg-gray-50/30' : ''}`}>
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className={`font-semibold text-[15px] mb-1 ${isEnabled ? 'text-gray-900' : 'text-gray-600'}`}>
                                                        {type.label}
                                                        {type.locked && <span className="ml-2 text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Bắt buộc</span>}
                                                    </h3>
                                                    <p className="text-[13px] text-gray-500 leading-relaxed">{type.desc}</p>
                                                </div>
                                                <div className="pt-1 shrink-0">
                                                    <ToggleSwitch 
                                                        checked={isEnabled} 
                                                        onChange={() => handleToggleType(type.id, isEnabled)} 
                                                        disabled={type.locked}
                                                    />
                                                </div>
                                            </div>

                                            {/* Channels Selector */}
                                            <div className={`mt-4 overflow-hidden transition-all duration-300 origin-top ${isEnabled ? 'max-h-20 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'}`}>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {CHANNELS.map(channel => {
                                                        const Icon = channel.icon;
                                                        const isChannelSelected = settings[type.id]?.channels.includes(channel.id);
                                                        const isChannelLocked = type.id === 'hethong' && channel.id === 'inapp';

                                                        return (
                                                            <button
                                                                key={channel.id}
                                                                onClick={() => handleToggleChannel(type.id, channel.id)}
                                                                disabled={isChannelLocked}
                                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                                                                    isChannelSelected 
                                                                    ? 'border-blue-200 bg-blue-50 text-blue-700' 
                                                                    : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-gray-50'
                                                                } ${isChannelLocked ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500' : ''}`}
                                                                title={isChannelLocked ? "Kênh này là bắt buộc đối với loại thông báo hệ thống" : ""}
                                                            >
                                                                <Icon size={14} className={isChannelSelected ? 'text-blue-600' : 'text-gray-400'} />
                                                                {channel.label}
                                                                {isChannelSelected && <Check size={14} className="ml-0.5 text-blue-600" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quiet Hours (Do Not Disturb) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                        <Moon size={18} />
                                    </div>
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">Khung giờ yên tĩnh</h2>
                                        <p className="text-[13px] text-gray-500">Tắt âm báo và pop-up trong khoảng thời gian nhất định</p>
                                    </div>
                                </div>
                                <ToggleSwitch checked={dndEnabled} onChange={setDndEnabled} />
                            </div>
                            
                            {dndEnabled && (
                                <div className="p-6 bg-white animate-fadeIn space-y-6">
                                    
                                    {/* Time Config */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[14px] text-gray-900">Giờ áp dụng</h3>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                                            <Clock size={16} className="text-gray-400" />
                                            <input 
                                                type="time" 
                                                value={dndTime.start}
                                                onChange={(e) => setDndTime({...dndTime, start: e.target.value})}
                                                className="bg-transparent border-none text-[15px] font-medium outline-none cursor-pointer w-[60px]" 
                                            />
                                            <span className="text-gray-400 text-[13px] mx-1">đến</span>
                                            <input 
                                                type="time" 
                                                value={dndTime.end}
                                                onChange={(e) => setDndTime({...dndTime, end: e.target.value})}
                                                className="bg-transparent border-none text-[15px] font-medium outline-none cursor-pointer w-[60px]" 
                                            />
                                        </div>
                                    </div>

                                    {/* Day Config */}
                                    <div>
                                        <h3 className="font-semibold text-[14px] text-gray-900 mb-3">Ngày áp dụng</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <button onClick={() => setDndDays('all')} className={`px-4 py-1.5 text-[13px] font-medium rounded-full border ${dndDays === 'all' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}>Tất cả các ngày</button>
                                            <button onClick={() => setDndDays('weekdays')} className={`px-4 py-1.5 text-[13px] font-medium rounded-full border ${dndDays === 'weekdays' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}>Ngày làm việc (T2-T6)</button>
                                            <button onClick={() => setDndDays('custom')} className={`px-4 py-1.5 text-[13px] font-medium rounded-full border ${dndDays === 'custom' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}>Tùy chỉnh</button>
                                        </div>
                                        
                                        {dndDays === 'custom' && (
                                            <div className="flex gap-2 mt-2 animate-fadeIn">
                                                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => (
                                                    <button 
                                                        key={day}
                                                        onClick={() => {
                                                            const newDays = [...dndCustomDays];
                                                            newDays[idx] = !newDays[idx];
                                                            setDndCustomDays(newDays);
                                                        }}
                                                        className={`w-9 h-9 rounded-full text-[13px] font-bold flex items-center justify-center transition-colors ${dndCustomDays[idx] ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                                    >
                                                        {day}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Urgent Exceptions */}
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[14px] text-gray-900">Cho phép thông báo khẩn cấp</h3>
                                            <p className="text-[12px] text-gray-500">Giữ liên lạc với các thông báo rủi ro cao từ hệ thống</p>
                                        </div>
                                        <ToggleSwitch checked={dndAllowUrgent} onChange={setDndAllowUrgent} />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Topic Interests */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="text-[17px] font-bold text-gray-900 mb-1">Lĩnh vực quan tâm</h2>
                                <p className="text-[13px] text-gray-500 mb-4">Chọn lĩnh vực pháp luật để nhận thông báo Văn bản và Dự thảo phù hợp.</p>
                                
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Tìm lĩnh vực..." 
                                        value={topicSearch}
                                        onChange={(e) => {
                                            setTopicSearch(e.target.value);
                                            // Expand all on search
                                            if (e.target.value) setExpandedGroups(TOPIC_GROUPS.map(g => g.id));
                                        }}
                                        className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex justify-between items-center text-[13px]">
                                <span className="font-medium text-gray-700">Đã chọn: <span className="text-blue-600 font-bold">{selectedTopics.length}</span></span>
                                <button onClick={handleSelectAllTopics} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                    Chọn tất cả
                                </button>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto custom-scrollbar p-2">
                                {filteredGroups.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500 text-[14px]">
                                        Không tìm thấy lĩnh vực phù hợp.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {filteredGroups.map(group => {
                                            const isExpanded = expandedGroups.includes(group.id);
                                            // Count how many in this group are selected
                                            const selectedInGroup = group.topics.filter(t => selectedTopics.includes(t.id)).length;
                                            
                                            return (
                                                <div key={group.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                    <button 
                                                        onClick={() => toggleGroupExpand(group.id)}
                                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-[14px] text-gray-900">{group.title}</span>
                                                            {selectedInGroup > 0 && (
                                                                <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                                                                    {selectedInGroup}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                                    </button>
                                                    
                                                    {isExpanded && (
                                                        <div className="px-4 pb-3 space-y-2 border-t border-gray-50 pt-3 bg-gray-50/30">
                                                            {group.topics.map(topic => (
                                                                <label key={topic.id} className="flex items-start gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-white transition-colors">
                                                                    <div className="relative flex items-center mt-0.5 shrink-0">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                                            checked={selectedTopics.includes(topic.id)}
                                                                            onChange={() => handleTopicToggle(topic.id)}
                                                                        />
                                                                    </div>
                                                                    <span className={`text-[13px] leading-tight ${selectedTopics.includes(topic.id) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                                                        {topic.label}
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 mt-8 gap-4 bg-gray-50 -mx-4 px-4 sm:mx-0 sm:bg-transparent -mb-8 sm:mb-0 pb-8 sm:pb-0">
                    <button 
                        onClick={() => setIsResetModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:text-red-600 font-medium transition-colors w-full sm:w-auto justify-center"
                    >
                        <RotateCcw size={18} /> Khôi phục mặc định
                    </button>
                    <button 
                        onClick={handleSave}
                        className="flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-800 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 w-full sm:w-auto hover:translate-y-[-2px]"
                    >
                        <Save size={18} /> Lưu Cài đặt
                    </button>
                </div>
            </div>

            {/* Reset Modal */}
            {isResetModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center scale-100" onClick={e => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle size={32} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">Khôi phục mặc định?</h3>
                            <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                                Toàn bộ cài đặt về loại thông báo, kênh nhận, giờ yên tĩnh và lĩnh vực quan tâm sẽ bị xóa và quay về chế độ gốc.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setIsResetModalOpen(false)} className="px-4 py-2.5 font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    Hủy bỏ
                                </button>
                                <button onClick={handleReset} className="px-4 py-2.5 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm shadow-red-600/20">
                                    Khôi phục
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Custom Scrollbar Styles embedded for this complex component */}
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #94a3b8;
                }
            `}} />
        </div>
    );
};

export default NotificationSettingsPage;

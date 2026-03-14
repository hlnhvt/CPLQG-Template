import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, FileText, HelpCircle, Edit } from 'lucide-react';

const MOCK_DROPDOWN_NOTIFICATIONS = [
    { id: 1, type: 'vanban', icon: FileText, title: 'Ban hành Luật Đất đai mới (Số 31/2024/QH15)', time: '10 phút trước', isRead: false },
    { id: 2, type: 'hoidap', icon: HelpCircle, title: 'Câu hỏi của bạn đã được trả lời bởi Chuyên gia', time: 'Hôm qua', isRead: true },
    { id: 3, type: 'duthao', icon: Edit, title: 'Mời tham gia đóng góp: Dự thảo Nghị định hướng dẫn Luật Đất đai', time: '2 ngày trước', isRead: true },
    { id: 4, type: 'hethong', icon: Settings, title: 'Hệ thống sẽ bảo trì từ 22h-00h hôm nay', time: '3 ngày trước', isRead: false },
];

const NotificationDropdown = ({ setNotifOpen }) => {
    const [activeTab, setActiveTab] = useState('chua-doc');
    const [notifications, setNotifications] = useState(MOCK_DROPDOWN_NOTIFICATIONS);

    const filtered = notifications.filter(n => activeTab === 'tat-ca' || !n.isRead);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden animate-fadeIn text-left cursor-default">
            {/* Header & Settings Link */}
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-[15px]">Thông báo</h3>
                <div className="flex gap-3">
                    <button onClick={markAllRead} className="text-[12px] text-gray-500 hover:text-blue-600 font-medium">Đánh dấu tất cả</button>
                    <Link to="/ca-nhan/cai-dat-thong-bao" className="text-gray-400 hover:text-gray-600" onClick={() => setNotifOpen(false)} title="Cài đặt">
                        <Settings size={14} />
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex px-4 border-b border-gray-100 bg-white">
                <button 
                    onClick={() => setActiveTab('chua-doc')}
                    className={`py-2 text-[13px] font-medium border-b-2 mr-4 ${activeTab === 'chua-doc' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                >
                    Chưa đọc <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full ml-1">{notifications.filter(n => !n.isRead).length}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('tat-ca')}
                    className={`py-2 text-[13px] font-medium border-b-2 ${activeTab === 'tat-ca' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                >
                    Tất cả
                </button>
            </div>

            {/* List */}
            <div className="max-h-[320px] overflow-y-auto hidden-scrollbar bg-white">
                {filtered.length > 0 ? (
                    filtered.map(notif => {
                        const Icon = notif.icon;
                        return (
                            <Link 
                                key={notif.id}
                                to={`/ca-nhan/thong-bao/${notif.id}`} 
                                className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-blue-50/30' : ''}`} 
                                onClick={() => setNotifOpen(false)}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                    notif.type === 'vanban' ? 'bg-green-100 text-green-600' : 
                                    notif.type === 'hoidap' ? 'bg-purple-100 text-purple-600' : 
                                    notif.type === 'duthao' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    <Icon size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[13px] leading-snug ${!notif.isRead ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                                        {notif.title}
                                    </p>
                                    <p className={`text-[11px] mt-1 ${!notif.isRead ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                                        {notif.time}
                                    </p>
                                </div>
                                {!notif.isRead && (
                                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5"></div>
                                )}
                            </Link>
                        );
                    })
                ) : (
                    <div className="p-6 text-center">
                        <Bell className="mx-auto text-gray-300 mb-2" size={24} />
                        <p className="text-[13px] text-gray-500">Không có thông báo nào cần xem.</p>
                    </div>
                )}
            </div>
            
            <div className="border-t border-gray-100">
                <Link to="/ca-nhan/thong-bao" className="block w-full py-2.5 text-center text-[13px] text-blue-600 font-medium hover:bg-blue-50 transition-colors" onClick={() => setNotifOpen(false)}>
                    Xem tất cả thông báo
                </Link>
            </div>
        </div>
    );
};

export default NotificationDropdown;

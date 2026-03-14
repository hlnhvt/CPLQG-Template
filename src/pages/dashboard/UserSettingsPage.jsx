import React, { useState } from 'react';
import { Settings, Save, RefreshCw, LayoutGrid, List, Sun, Moon, Monitor, ArrowUp, ArrowDown, Type, CheckCircle } from 'lucide-react';

const TOPICS_DATA = [
    { id: 'dat-dai', icon: '🏠', title: 'Đất đai & Nhà ở' },
    { id: 'doanh-nghiep', icon: '🏢', title: 'Doanh nghiệp & Đầu tư' },
    { id: 'lao-dong', icon: '👷', title: 'Lao động & Việc làm' },
    { id: 'thue', icon: '💰', title: 'Thuế & Tài chính' },
    { id: 'dan-su', icon: '⚖️', title: 'Dân sự' },
    { id: 'hinh-su', icon: '🔨', title: 'Hình sự' },
    { id: 'hanh-chinh', icon: '🏛️', title: 'Hành chính' },
    { id: 'gia-dinh', icon: '👨‍👩‍👧', title: 'Gia đình & Hôn nhân' },
    { id: 'so-huu-tri-tue', icon: '💡', title: 'Sở hữu trí tuệ' }
];

const UserSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('topics');
    
    // Topics State
    const [selectedTopics, setSelectedTopics] = useState(['dat-dai', 'doanh-nghiep', 'lao-dong']);
    
    // Ordered Topics State
    const [orderedTopics, setOrderedTopics] = useState(
        TOPICS_DATA.filter(t => ['dat-dai', 'doanh-nghiep', 'lao-dong'].includes(t.id))
    );

    // UI State
    const [uiSettings, setUiSettings] = useState({
        viewMode: 'card', 
        fontSize: '100%',
        theme: 'system'
    });

    const [isSaved, setIsSaved] = useState(false);

    const handleTopicToggle = (id) => {
        setIsSaved(false);
        const newSelected = selectedTopics.includes(id) 
            ? selectedTopics.filter(t => t !== id)
            : [...selectedTopics, id];
        
        setSelectedTopics(newSelected);
        
        // Update ordered topics
        if (newSelected.includes(id) && !orderedTopics.find(t => t.id === id)) {
            setOrderedTopics([...orderedTopics, TOPICS_DATA.find(t => t.id === id)]);
        } else {
            setOrderedTopics(orderedTopics.filter(t => t.id !== id));
        }
    };

    const moveTopic = (index, direction) => {
        setIsSaved(false);
        if (direction === 'up' && index > 0) {
            const newOrder = [...orderedTopics];
            [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
            setOrderedTopics(newOrder);
        } else if (direction === 'down' && index < orderedTopics.length - 1) {
            const newOrder = [...orderedTopics];
            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
            setOrderedTopics(newOrder);
        }
    };

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="animate-fadeIn pb-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Cấu hình cá nhân hóa</h1>
                <p className="text-gray-500 text-sm mt-1">Điều chỉnh trải nghiệm của Cổng Pháp luật theo sở thích của bạn.</p>
            </div>

            {/* Quick action bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sticky top-4 z-10 transition-all">
                {/* Tabs */}
                <div className="flex bg-gray-50 p-1 rounded-lg w-full sm:w-auto overflow-x-auto hide-scrollbar">
                    <button 
                        onClick={() => setActiveTab('topics')}
                        className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${activeTab === 'topics' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        Lĩnh vực quan tâm
                    </button>
                    <button 
                        onClick={() => setActiveTab('order')}
                        className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${activeTab === 'order' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        Sắp xếp ưu tiên
                    </button>
                    <button 
                        onClick={() => setActiveTab('ui')}
                        className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${activeTab === 'ui' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        Tùy chỉnh giao diện
                    </button>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <RefreshCw size={16}/> Khôi phục
                    </button>
                    <button 
                        onClick={handleSave}
                        className={`flex items-center justify-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                            isSaved ? 'bg-green-500 text-white' : 'bg-[#0f4c81] hover:bg-blue-800 text-white'
                        }`}
                    >
                        {isSaved ? <><CheckCircle size={16} /> Đã lưu</> : <><Save size={16}/> Lưu cài đặt</>}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                
                {/* TOPICS TAB */}
                {activeTab === 'topics' && (
                    <div className="p-6 md:p-8 animate-fadeIn">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-1">Chọn lĩnh vực pháp lý</h2>
                            <p className="text-gray-500 text-sm">Hệ thống sẽ ưu tiên hiển thị văn bản và tin tức thuộc các lĩnh vực bạn chọn. Bắt buộc chọn ít nhất 1 lĩnh vực.</p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    Đã chọn: {selectedTopics.length}/{TOPICS_DATA.length}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {TOPICS_DATA.map(topic => {
                                const isSelected = selectedTopics.includes(topic.id);
                                return (
                                    <button 
                                        key={topic.id}
                                        onClick={() => handleTopicToggle(topic.id)}
                                        className={`flex items-center text-left p-4 rounded-xl border-2 transition-all duration-300 group ${
                                            isSelected 
                                            ? 'border-blue-500 bg-blue-50/50 shadow-sm transform scale-[1.02]' 
                                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="text-3xl mr-4 group-hover:scale-110 transition-transform origin-center">
                                            {topic.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold text-[15px] ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
                                                {topic.title}
                                            </h3>
                                        </div>
                                        {isSelected && (
                                            <div className="text-blue-500 animate-fadeIn">
                                                <CheckCircle size={20} className="fill-blue-100" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ORDER TAB */}
                {activeTab === 'order' && (
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 animate-fadeIn">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-800 mb-1">Sắp xếp mức độ ưu tiên</h2>
                            <p className="text-gray-500 text-sm mb-6">Trang chủ sẽ được thiết kế bố cục theo thứ tự ưu tiên của bạn dưới đây.</p>
                            
                            {orderedTopics.length === 0 ? (
                                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                                    <p className="text-gray-500">Bạn chưa chọn lĩnh vực nào. Hãy quay lại tab "Lĩnh vực quan tâm".</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {orderedTopics.map((topic, index) => (
                                        <div key={topic.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 shadow-sm rounded-xl group hover:border-blue-300 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                    index === 0 ? 'bg-orange-100 text-orange-600' : 
                                                    index === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    #{index + 1}
                                                </div>
                                                <span className="text-2xl">{topic.icon}</span>
                                                <span className="font-semibold text-gray-800">{topic.title}</span>
                                                {index === 0 && <span className="hidden sm:inline-block ml-2 px-2 py-0.5 bg-orange-50 text-orange-600 text-xs font-bold rounded">Ưu tiên cao nhất</span>}
                                            </div>
                                            <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                                                <button 
                                                    onClick={() => moveTopic(index, 'up')}
                                                    disabled={index === 0}
                                                    className={`p-1.5 rounded-md ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
                                                >
                                                    <ArrowUp size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => moveTopic(index, 'down')}
                                                    disabled={index === orderedTopics.length - 1}
                                                    className={`p-1.5 rounded-md ${index === orderedTopics.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
                                                >
                                                    <ArrowDown size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Live Preview Panel */}
                        <div className="w-full md:w-80 lg:w-96 shrink-0">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden sticky top-24">
                                <div className="bg-gray-800 text-white text-center py-2 text-xs font-semibold uppercase tracking-wider">
                                    Bản xem trước Trang Chủ
                                </div>
                                <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto hide-scrollbar">
                                    <div className="h-16 bg-white rounded shadow-sm border border-gray-100 mb-6 flex items-center px-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-100"></div>
                                        <div className="ml-3 h-3 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                    
                                    {orderedTopics.map((topic, idx) => (
                                        <div key={`preview-${topic.id}`} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5">
                                                    {topic.icon} {topic.title}
                                                </h4>
                                                <span className="text-[10px] text-blue-500">Xem thêm</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-20 bg-white border border-gray-100 shadow-sm rounded flex-1"></div>
                                                {idx === 0 && <div className="h-20 bg-white border border-gray-100 shadow-sm rounded flex-1"></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* UI CUSTOMIZATION TAB */}
                {activeTab === 'ui' && (
                    <div className="p-6 md:p-8 animate-fadeIn">
                        <h2 className="text-lg font-bold text-gray-800 mb-6">Tùy chỉnh giao diện hiển thị</h2>

                        <div className="space-y-8">
                            {/* View Mode */}
                            <div>
                                <h3 className="text-[15px] font-semibold text-gray-700 mb-3 block">Chế độ xem</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                    <button 
                                        onClick={() => {setUiSettings({...uiSettings, viewMode: 'card'}); setIsSaved(false);}}
                                        className={`relative border-2 p-4 rounded-xl text-left transition-all ${uiSettings.viewMode === 'card' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-200 hover:border-blue-300'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <LayoutGrid size={18} className={uiSettings.viewMode === 'card' ? 'text-blue-600' : 'text-gray-500'} />
                                            <span className={`font-semibold ${uiSettings.viewMode === 'card' ? 'text-blue-800' : 'text-gray-800'}`}>Dạng thẻ</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 opacity-60">
                                            <div className="h-10 bg-gray-200 rounded"></div>
                                            <div className="h-10 bg-gray-200 rounded"></div>
                                        </div>
                                        {uiSettings.viewMode === 'card' && <div className="absolute top-4 right-4 text-blue-500"><CheckCircle size={18}/></div>}
                                    </button>
                                    
                                    <button 
                                        onClick={() => {setUiSettings({...uiSettings, viewMode: 'list'}); setIsSaved(false);}}
                                        className={`relative border-2 p-4 rounded-xl text-left transition-all ${uiSettings.viewMode === 'list' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-200 hover:border-blue-300'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <List size={18} className={uiSettings.viewMode === 'list' ? 'text-blue-600' : 'text-gray-500'} />
                                            <span className={`font-semibold ${uiSettings.viewMode === 'list' ? 'text-blue-800' : 'text-gray-800'}`}>Dạng danh sách</span>
                                        </div>
                                        <div className="space-y-2 opacity-60">
                                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                        {uiSettings.viewMode === 'list' && <div className="absolute top-4 right-4 text-blue-500"><CheckCircle size={18}/></div>}
                                    </button>
                                </div>
                            </div>

                            {/* Theme */}
                            <div>
                                <h3 className="text-[15px] font-semibold text-gray-700 mb-3 block">Chủ đề màu sắc</h3>
                                <div className="flex flex-wrap gap-4">
                                    <button onClick={() => {setUiSettings({...uiSettings, theme: 'light'}); setIsSaved(false);}} className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl transition-all ${uiSettings.theme === 'light' ? 'border-blue-500 text-blue-700 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <Sun size={18} /> Sáng
                                    </button>
                                    <button onClick={() => {setUiSettings({...uiSettings, theme: 'dark'}); setIsSaved(false);}} className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl transition-all ${uiSettings.theme === 'dark' ? 'border-blue-500 text-blue-700 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <Moon size={18} /> Tối
                                    </button>
                                    <button onClick={() => {setUiSettings({...uiSettings, theme: 'system'}); setIsSaved(false);}} className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl transition-all ${uiSettings.theme === 'system' ? 'border-blue-500 text-blue-700 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <Monitor size={18} /> Theo hệ thống
                                    </button>
                                </div>
                            </div>

                            {/* Font Size */}
                            <div>
                                <h3 className="text-[15px] font-semibold text-gray-700 mb-3 block">Cỡ chữ hệ thống</h3>
                                <div className="max-w-md bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <div className="flex justify-between text-gray-500 font-medium mb-4">
                                        <span className="text-sm">Nhỏ</span>
                                        <span className="text-base">Tiêu chuẩn</span>
                                        <span className="text-lg text-blue-600 font-bold">Lớn</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="90" max="115" step="5" 
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        defaultValue="100"
                                        onChange={(e) => {setUiSettings({...uiSettings, fontSize: e.target.value + '%'}); setIsSaved(false);}}
                                    />
                                    <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white shadow-sm" style={{fontSize: uiSettings.fontSize}}>
                                        Đoạn văn này minh họa cho kích thước chữ bạn đã chọn. Nếu bạn thấy chữ quá nhỏ hoặc quá to, bạn có thể tự điều chỉnh thanh trượt. {uiSettings.fontSize}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSettingsPage;

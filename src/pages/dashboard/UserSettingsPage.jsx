import React, { useState } from 'react';
import { Settings, Save, RefreshCw, LayoutGrid, List, Sun, Moon, Monitor, ArrowUp, ArrowDown, CheckCircle, ChevronDown, ChevronUp, Settings2, Type, BarChart2 } from 'lucide-react';

import { LEGAL_FIELDS, NEWS_CATEGORIES, FORUMS, STATISTICS, ALL_ITEMS } from '../../data/personalizationData';

const UserSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('topics');

    // Currently selected IDs
    const [selectedTopics, setSelectedTopics] = useState(() => {
        const saved = localStorage.getItem('userSelectedTopics');
        return saved ? JSON.parse(saved) : ['dat-dai', 'news-tin-nong', 'forum-luat-su'];
    });

    // Ordered list of block configs
    const [orderedBlocks, setOrderedBlocks] = useState(() => {
        const saved = localStorage.getItem('userOrderedBlocks');
        return saved ? JSON.parse(saved) : [
            { id: 'dat-dai', viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' },
            { id: 'news-tin-nong', viewMode: 'list', width: '50', recordCount: 10, sortOrder: 'most_viewed' },
            { id: 'forum-luat-su', viewMode: 'card', width: '50', recordCount: 5, sortOrder: 'most_commented' },
        ];
    });

    // UI state
    const [uiSettings, setUiSettings] = useState({
        fontSize: '100%',
        theme: 'system'
    });

    const [isSaved, setIsSaved] = useState(false);
    const [expandedBlock, setExpandedBlock] = useState(null);

    // DnD State
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleTopicToggle = (id) => {
        setIsSaved(false);
        const isSelected = selectedTopics.includes(id);

        if (isSelected) {
            setSelectedTopics(prev => prev.filter(t => t !== id));
            setOrderedBlocks(prev => prev.filter(b => b.id !== id));
            if (expandedBlock === id) setExpandedBlock(null);
        } else {
            setSelectedTopics(prev => [...prev, id]);
            // Automatically add to the end of the order list with default config
            setOrderedBlocks(prev => [...prev, { id, viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' }]);
        }
    };

    const moveBlock = (index, direction) => {
        setIsSaved(false);
        const newOrder = [...orderedBlocks];
        if (direction === 'up' && index > 0) {
            [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        } else if (direction === 'down' && index < newOrder.length - 1) {
            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        }
        setOrderedBlocks(newOrder);
    };

    const updateBlockConfig = (id, newConfig) => {
        setIsSaved(false);
        setOrderedBlocks(prev => prev.map(b => b.id === id ? { ...b, ...newConfig } : b));
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Reduce opacity to show it's being dragged (need slight delay for browser to clone original style first)
        setTimeout(() => {
            if (e.target && e.target.classList) e.target.classList.add('opacity-40');
        }, 0);
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragEnd = (e) => {
        if (e.target && e.target.classList) e.target.classList.remove('opacity-40');
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        setIsSaved(false);
        const newOrder = [...orderedBlocks];
        const draggedItem = newOrder[draggedIndex];
        
        // Move item
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedItem);
        
        setOrderedBlocks(newOrder);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleSave = () => {
        setIsSaved(true);
        localStorage.setItem('userSelectedTopics', JSON.stringify(selectedTopics));
        localStorage.setItem('userOrderedBlocks', JSON.stringify(orderedBlocks));
        setTimeout(() => setIsSaved(false), 3000);
    };

    const renderTopicGrid = (title, description, items) => (
        <div className="mb-10 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 mb-1 border-b pb-2">{title}</h3>
            {description && <p className="text-gray-500 text-sm mb-4 mt-2">{description}</p>}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                {items.map(topic => {
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                        <button
                            key={topic.id}
                            onClick={() => handleTopicToggle(topic.id)}
                            className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 w-full text-left ${isSelected
                                ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden relative shadow-sm">
                                <img src={topic.thumbnail} alt={topic.title} className="w-full h-full object-cover" />
                                <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-blue-900/10' : 'bg-black/5 hover:bg-black/10'}`}></div>
                            </div>

                            <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                                <h3 className={`font-bold text-[15px] truncate ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                                    {topic.title}
                                </h3>

                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
                                    {isSelected && <CheckCircle size={14} className="text-white" />}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const getCategoryInfo = (id) => {
        if (LEGAL_FIELDS.some(item => item.id === id)) return { name: 'Lĩnh vực Pháp lý', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
        if (NEWS_CATEGORIES.some(item => item.id === id)) return { name: 'Tin tức', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
        if (FORUMS.some(item => item.id === id)) return { name: 'Cộng đồng', color: 'bg-amber-100 text-amber-700 border-amber-200' };
        if (STATISTICS.some(item => item.id === id)) return { name: 'Thống kê', color: 'bg-rose-100 text-rose-700 border-rose-200' };
        return { name: 'Khác', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    };

    return (
        <div className="animate-fadeIn pb-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0f4c81]">Cấu hình cá nhân hóa</h1>
                <p className="text-gray-500 text-sm mt-1">Nâng cao trải nghiệm bằng cách lựa chọn và sắp xếp các nội dung bạn đặc biệt quan tâm.</p>
            </div>

            {/* Quick action bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sticky top-4 z-10 transition-all">
                {/* Tabs */}
                <div className="flex bg-gray-50 p-1 rounded-lg w-full sm:w-auto overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('topics')}
                        className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${activeTab === 'topics' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        Nội dung quan tâm
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
                        <RefreshCw size={16} /> Khôi phục
                    </button>
                    <button
                        onClick={handleSave}
                        className={`flex items-center justify-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${isSaved ? 'bg-green-500 text-white' : 'bg-[#0f4c81] hover:bg-blue-800 text-white'
                            }`}
                    >
                        {isSaved ? <><CheckCircle size={16} /> Đã lưu</> : <><Save size={16} /> Lưu cài đặt</>}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                {/* TOPICS TAB */}
                {activeTab === 'topics' && (
                    <div className="p-6 md:p-8">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Lựa chọn Nội dung Quan tâm</h2>
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                Đã chọn: {selectedTopics.length} mục
                            </span>
                        </div>

                        {renderTopicGrid('Lĩnh vực Pháp lý', 'Hệ thống sẽ ưu tiên hiển thị văn bản thuộc các lĩnh vực pháp luật mà bạn chọn.', LEGAL_FIELDS)}
                        {renderTopicGrid('Chuyên mục Tin tức', 'Các mục tin tức, bài viết, chính sách mà bạn muốn theo dõi thường xuyên.', NEWS_CATEGORIES)}
                        {renderTopicGrid('Diễn đàn & Cộng đồng', 'Các diễn đàn trao đổi, thảo luận phổ biến dành cho thành viên.', FORUMS)}
                        {renderTopicGrid('Chỉ tiêu Thống kê', 'Biểu đồ và số liệu bạn muốn theo dõi trực quan.', STATISTICS)}
                    </div>
                )}

                {/* ORDER TAB */}
                {activeTab === 'order' && (
                    <div className="p-6 md:p-8 animate-fadeIn flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Sắp xếp mức độ ưu tiên & Tùy chỉnh hiển thị</h2>
                            <p className="text-gray-500 text-sm max-w-3xl">Danh sách dưới đây tương ứng với các nội dung bạn đã chọn ở tab "Nội dung quan tâm". Hãy kéo thả hoặc dùng mũi tên để thay đổi thứ tự ưu tiên. Bấm vào nút "Cập nhật" trên từng dòng để thiết lập giao diện hiển thị cho cụm đó trên Trang chủ.</p>
                        </div>

                        {orderedBlocks.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                <p className="text-gray-500">Bạn chưa chọn nội dung nào. Hãy quay lại phần "Nội dung quan tâm" để chọn.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 mb-12 max-w-4xl mx-auto w-full">
                                {orderedBlocks.map((block, index) => {
                                    const itemDef = ALL_ITEMS.find(i => i.id === block.id);
                                    if (!itemDef) return null;
                                    const isExpanded = expandedBlock === block.id;
                                    const isStatistic = block.id.startsWith('stat-');

                                    return (
                                        <div 
                                            key={block.id} 
                                            draggable={!isExpanded}
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragEnter={(e) => handleDragEnter(e, index)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragEnd={handleDragEnd}
                                            onDrop={(e) => handleDrop(e, index)}
                                            className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-300 ring-2 ring-blue-50' : 'border-gray-200 hover:border-blue-200'} ${!isExpanded ? 'cursor-grab active:cursor-grabbing' : ''} ${dragOverIndex === index && draggedIndex !== index ? 'border-2 border-dashed border-blue-500 scale-[1.01] shadow-lg box-border relative after:absolute after:inset-0 after:bg-blue-50/50 after:pointer-events-none after:z-50' : ''}`}
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between p-3 sm:p-4 bg-white relative z-10 transition-colors">
                                                <div className="flex items-center gap-3 sm:gap-5 flex-1 cursor-pointer" onClick={() => setExpandedBlock(isExpanded ? null : block.id)}>
                                                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border-2 ${index === 0 ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                                        index < 3 ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                                                        }`}>
                                                        #{index + 1}
                                                    </div>
                                                    <div className="flex flex-col flex-1">
                                                        <div className="flex items-center gap-3 mb-1.5">
                                                            <span className="font-bold text-gray-800 text-base">{itemDef.title}</span>
                                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getCategoryInfo(block.id).color}`}>
                                                                {getCategoryInfo(block.id).name}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex flex-wrap items-center gap-3">
                                                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                                                {isStatistic ? <BarChart2 size={12} /> : block.viewMode === 'card' ? <LayoutGrid size={12} /> : <List size={12} />}
                                                                {isStatistic ? 'Biểu đồ' : block.viewMode === 'card' ? 'Dạng thẻ' : 'Dạng danh sách'}
                                                            </span>
                                                            <span className="hidden sm:inline">•</span>
                                                            <span>Rộng {block.width}%</span>
                                                            {!isStatistic && (
                                                                <>
                                                                    <span className="hidden sm:inline">•</span>
                                                                    <span>{block.recordCount} bài</span>
                                                                    <span className="hidden sm:inline">•</span>
                                                                    <span className="italic text-blue-600 font-medium">{
                                                                        block.sortOrder === 'newest' ? 'Mới nhất' :
                                                                            block.sortOrder === 'most_viewed' ? 'Được xem nhiều nhất' :
                                                                                block.sortOrder === 'most_commented' ? 'Bình luận cao nhất' :
                                                                                    block.sortOrder === 'most_shared' ? 'Chia sẻ cao nhất' :
                                                                                        block.sortOrder === 'most_feedback' ? 'Góp ý nhiều nhất' :
                                                                                            'Yêu thích nhất'
                                                                    }</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 pl-4 border-l border-gray-100 ml-2 shrink-0">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setExpandedBlock(isExpanded ? null : block.id); }}
                                                        className={`flex items-center justify-center min-w-[100px] gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isExpanded ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                                                    >
                                                        <Settings2 size={16} />
                                                        <span className="hidden md:inline">{isExpanded ? 'Đóng' : 'Cập nhật'}</span>
                                                        {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                                                    </button>

                                                    <div className="flex flex-col bg-gray-50 rounded-lg p-0.5 border border-gray-200 ml-1">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }}
                                                            disabled={index === 0}
                                                            className={`p-1 rounded-sm ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
                                                        >
                                                            <ArrowUp size={16} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }}
                                                            disabled={index === orderedBlocks.length - 1}
                                                            className={`p-1 rounded-sm ${index === orderedBlocks.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
                                                        >
                                                            <ArrowDown size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Config Panel (Accordion Body) */}
                                            {isExpanded && (
                                                <div className="p-5 sm:p-6 bg-gray-50/80 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
                                                    {!isStatistic && (
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-800 mb-2">Chế độ xem mặc định</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <button
                                                                    onClick={() => updateBlockConfig(block.id, { viewMode: 'card' })}
                                                                    className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${block.viewMode === 'card' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}
                                                                >
                                                                    <LayoutGrid size={18} /> Dạng thẻ
                                                                </button>
                                                                <button
                                                                    onClick={() => updateBlockConfig(block.id, { viewMode: 'list' })}
                                                                    className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${block.viewMode === 'list' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}
                                                                >
                                                                    <List size={18} /> Danh sách
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className={isStatistic ? "col-span-1 md:col-span-2" : ""}>
                                                        <label className="block text-sm font-bold text-gray-800 mb-2">Khối hiển thị (Chiều ngang trang)</label>
                                                        <div className={`grid gap-3 ${isStatistic ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
                                                            <button
                                                                onClick={() => updateBlockConfig(block.id, { width: '100' })}
                                                                className={`p-3 border-2 rounded-xl transition-all text-center font-medium ${block.width === '100' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}
                                                            >
                                                                100% {isStatistic ? '' : '(Cả màn hình)'}
                                                            </button>
                                                            <button
                                                                onClick={() => updateBlockConfig(block.id, { width: '50' })}
                                                                className={`p-3 border-2 rounded-xl transition-all text-center font-medium ${block.width === '50' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}
                                                            >
                                                                50% {isStatistic ? '' : '(Nửa màn hình)'}
                                                            </button>
                                                            {isStatistic && (
                                                                <button
                                                                    onClick={() => updateBlockConfig(block.id, { width: '33' })}
                                                                    className={`p-3 border-2 rounded-xl transition-all text-center font-medium ${block.width === '33' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}
                                                                >
                                                                    33%
                                                                </button>
                                                            )}
                                                            {isStatistic && (
                                                                <button
                                                                    onClick={() => updateBlockConfig(block.id, { width: '25' })}
                                                                    className={`p-3 border-2 rounded-xl transition-all text-center font-medium ${block.width === '25' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}
                                                                >
                                                                    25%
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {!isStatistic && (
                                                        <>
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-800 mb-2">Số lượng bản ghi</label>
                                                                <select
                                                                    value={block.recordCount}
                                                                    onChange={(e) => updateBlockConfig(block.id, { recordCount: Number(e.target.value) })}
                                                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none bg-white font-medium text-gray-700 transition-colors"
                                                                >
                                                                    <option value={5}>5 bản ghi (Mặc định)</option>
                                                                    <option value={10}>10 bản ghi</option>
                                                                    <option value={15}>15 bản ghi</option>
                                                                    <option value={20}>20 bản ghi</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-800 mb-2">Ưu tiên các bản ghi</label>
                                                                <select
                                                                    value={block.sortOrder}
                                                                    onChange={(e) => updateBlockConfig(block.id, { sortOrder: e.target.value })}
                                                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none bg-white font-medium text-gray-700 transition-colors"
                                                                >
                                                                    <option value="newest">Mới nhất (Mặc định)</option>
                                                                    <option value="most_viewed">Được xem nhiều nhất</option>
                                                                    <option value="most_commented">Được bình luận nhiều nhất</option>
                                                                    <option value="most_shared">Được chia sẻ nhiều nhất</option>
                                                                    <option value="most_feedback">Được góp ý nhiều nhất</option>
                                                                    <option value="most_liked">Được yêu thích nhất</option>
                                                                </select>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Live Preview below Ordering - Takes full width now */}
                        {orderedBlocks.length > 0 && (
                            <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-gray-50 scale-100 transform origin-top w-full">
                                <div className="bg-[#0f4c81] text-white px-6 py-4 flex items-center justify-between">
                                    <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                        <Monitor size={18} /> Bản xem trước Màn hình Trang Chủ
                                    </h3>
                                    <span className="text-xs text-blue-200 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-400/30">Mô phỏng bố cục</span>
                                </div>
                                <div className="p-6 md:p-8 space-y-6 max-h-[700px] overflow-y-auto custom-scrollbar">
                                    {/* Mock Top Banner */}
                                    <div className="h-20 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center px-6">
                                        <div className="w-12 h-12 rounded-full bg-blue-100"></div>
                                        <div className="ml-4 space-y-2">
                                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                            <div className="h-2 w-24 bg-gray-100 rounded"></div>
                                        </div>
                                        <div className="ml-auto w-1/4 h-10 bg-gray-50 rounded-lg border border-gray-100"></div>
                                    </div>

                                    {/* Mock the blocks based on config */}
                                    <div className="flex flex-wrap -mx-4">
                                        {orderedBlocks.map((block) => {
                                            const itemDef = ALL_ITEMS.find(i => i.id === block.id);
                                            if (!itemDef) return null;

                                            const isStatistic = block.id.startsWith('stat-');
                                            const isFifty = block.width === '50';

                                            let wClass = 'w-full';
                                            if (block.width === '50') wClass = 'w-full lg:w-1/2';
                                            if (block.width === '33') wClass = 'w-full lg:w-1/3 md:w-1/2';
                                            if (block.width === '25') wClass = 'w-full lg:w-1/4 md:w-1/2';

                                            return (
                                                <div key={`preview-render-${block.id}`} className={`${wClass} px-4 mb-8`}>
                                                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 py-1.5 px-3 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-10">
                                                            {isStatistic ? <BarChart2 size={10} /> : block.viewMode === 'card' ? <LayoutGrid size={10} /> : <List size={10} />}
                                                            <span>• {block.width}% ngang {!isStatistic && `• ${block.sortOrder} • ${block.recordCount} records`}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-gray-50">
                                                            <h4 className="font-bold text-lg text-gray-800 flex items-center gap-3">
                                                                <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                                                                <span className="truncate">{itemDef.title}</span>
                                                            </h4>
                                                            <span className="text-sm font-semibold text-blue-600 shrink-0">Xem tất cả →</span>
                                                        </div>

                                                        <div className={`flex-1 mt-2 flex flex-col ${isStatistic ? 'h-full justify-center min-h-[160px]' : ''}`}>
                                                            {isStatistic ? (
                                                                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                                                    <BarChart2 className="text-gray-400 mb-2" size={32} />
                                                                    <span className="text-sm font-semibold text-gray-500">Mô phỏng biểu đồ</span>
                                                                </div>
                                                            ) : block.viewMode === 'card' ? (
                                                                <div className={`grid gap-4 ${isFifty ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
                                                                    {[...Array(isFifty ? 2 : 4)].map((_, i) => (
                                                                        <div key={i} className="flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                                                            <div className="h-32 sm:h-40 bg-gray-200 relative">
                                                                                <img src={itemDef.thumbnail} className="w-full h-full object-cover opacity-60 grayscale" alt="" />
                                                                            </div>
                                                                            <div className="p-4 flex-1 flex flex-col justify-center">
                                                                                <div className="h-4 bg-gray-300 rounded-md w-full mb-3"></div>
                                                                                <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-4"></div>
                                                                                <div className="h-2 bg-gray-200 rounded-sm w-1/3 mt-auto"></div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className={`grid gap-5 ${isFifty ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 gap-x-8'}`}>
                                                                    {[...Array(isFifty ? 3 : 6)].map((_, i) => (
                                                                        <div key={i} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-white transition-all items-center">
                                                                            <div className="w-24 h-24 sm:w-32 sm:h-24 shrink-0 bg-gray-200 rounded-lg overflow-hidden hidden sm:block">
                                                                                <img src={itemDef.thumbnail} className="w-full h-full object-cover opacity-50 grayscale" alt="" />
                                                                            </div>
                                                                            <div className="flex-1 py-1">
                                                                                <div className="h-4 bg-gray-300 rounded-md w-[90%] mb-3"></div>
                                                                                <div className="h-4 bg-gray-300 rounded-md w-[60%] mb-4"></div>
                                                                                <div className="flex gap-3">
                                                                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                                                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* UI CUSTOMIZATION TAB */}
                {activeTab === 'ui' && (
                    <div className="p-6 md:p-8 animate-fadeIn">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800">Tùy chỉnh hệ thống</h2>
                            <p className="text-gray-500 text-sm mt-1">Giao diện thẻ/danh sách đã được chuyển vào phần "Cập nhật" của từng khối bên tab "Sắp xếp ưu tiên". Tại đây, bạn có thể thiết lập cỡ chữ và giao diện Sáng/Tối cho toàn Cổng.</p>
                        </div>

                        <div className="space-y-10 max-w-3xl">
                            {/* Theme */}
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><Sun size={20} className="text-orange-500" /> Chủ đề màu sắc</h3>
                                <div className="flex flex-wrap gap-4">
                                    <button onClick={() => { setUiSettings({ ...uiSettings, theme: 'light' }); setIsSaved(false); }} className={`flex items-center gap-2 px-6 py-3.5 border-2 rounded-xl font-medium transition-all ${uiSettings.theme === 'light' ? 'border-blue-500 text-blue-700 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600 hover:text-gray-800'}`}>
                                        <Sun size={20} /> Sáng
                                    </button>
                                    <button onClick={() => { setUiSettings({ ...uiSettings, theme: 'dark' }); setIsSaved(false); }} className={`flex items-center gap-2 px-6 py-3.5 border-2 rounded-xl font-medium transition-all ${uiSettings.theme === 'dark' ? 'border-blue-500 text-blue-700 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600 hover:text-gray-800'}`}>
                                        <Moon size={20} /> Tối
                                    </button>
                                    <button onClick={() => { setUiSettings({ ...uiSettings, theme: 'system' }); setIsSaved(false); }} className={`flex items-center gap-2 px-6 py-3.5 border-2 rounded-xl font-medium transition-all ${uiSettings.theme === 'system' ? 'border-blue-500 text-blue-700 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600 hover:text-gray-800'}`}>
                                        <Monitor size={20} /> Theo hệ thống
                                    </button>
                                </div>
                            </div>

                            {/* Font Size */}
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><Type size={20} className="text-blue-500" /> Cỡ chữ hệ thống</h3>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex justify-between text-gray-500 font-medium mb-4">
                                        <span className="text-sm">Nhỏ</span>
                                        <span className="text-base">Tiêu chuẩn</span>
                                        <span className="text-lg text-blue-600 font-bold">Lớn</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="90" max="115" step="5"
                                        className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 my-2"
                                        defaultValue="100"
                                        onChange={(e) => { setUiSettings({ ...uiSettings, fontSize: e.target.value + '%' }); setIsSaved(false); }}
                                    />
                                    <div className="mt-8 border border-blue-100 rounded-lg p-5 bg-blue-50/30 text-gray-800 shadow-sm" style={{ fontSize: uiSettings.fontSize }}>
                                        <h4 className="font-bold mb-2">Đoạn văn thực tế minh họa</h4>
                                        <p>Đoạn văn này minh họa cho kích thước chữ bạn đã chọn. Nếu bạn thấy chữ quá nhỏ hoặc quá to so với màn hình máy tính của bạn, hãy tiếp tục kéo thanh trượt ở trên để thay đổi. Kích thước hiện tại: <strong>{uiSettings.fontSize}</strong>.</p>
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

import React, { useState } from 'react';
import { Settings, Save, RefreshCw, LayoutGrid, List, Sun, Moon, Monitor, ArrowUp, ArrowDown, CheckCircle, ChevronDown, ChevronUp, Settings2, Type, BarChart2, ShieldCheck, Check } from 'lucide-react';
import { LEGAL_FIELDS, NEWS_CATEGORIES, FORUMS, STATISTICS, ALL_ITEMS } from '../../data/personalizationData';

// Officer-specific topic sets - pháp luật, văn bản nội bộ, tin ban ngành
const OFFICER_TOPIC_GROUPS = [
    {
        key: 'legal',
        title: 'Lĩnh vực Pháp lý ưu tiên',
        description: 'Hệ thống sẽ ưu tiên hiển thị văn bản pháp luật theo lĩnh vực cán bộ quan tâm.',
        items: LEGAL_FIELDS
    },
    {
        key: 'news',
        title: 'Tin tức Bộ - Ban ngành',
        description: 'Chuyên mục tin tức chính sách và hoạt động liên quan tới đơn vị công tác.',
        items: NEWS_CATEGORIES
    },
    {
        key: 'forum',
        title: 'Diễn đàn liên ngành',
        description: 'Theo dõi các diễn đàn trao đổi nghiệp vụ trong hệ thống tư pháp.',
        items: FORUMS
    },
    {
        key: 'stat',
        title: 'Chỉ tiêu Thống kê công vụ',
        description: 'Biểu đồ số liệu nghiệp vụ bạn muốn theo dõi trực quan trên Trang chủ cán bộ.',
        items: STATISTICS
    },
];

const OfficerSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('topics');

    const [selectedTopics, setSelectedTopics] = useState(() => {
        const saved = localStorage.getItem('officerSelectedTopics');
        return saved ? JSON.parse(saved) : ['dat-dai', 'news-tin-nong', 'forum-luat-su'];
    });

    const [orderedBlocks, setOrderedBlocks] = useState(() => {
        const saved = localStorage.getItem('officerOrderedBlocks');
        return saved ? JSON.parse(saved) : [
            { id: 'dat-dai', viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' },
            { id: 'news-tin-nong', viewMode: 'list', width: '50', recordCount: 10, sortOrder: 'most_viewed' },
            { id: 'forum-luat-su', viewMode: 'card', width: '50', recordCount: 5, sortOrder: 'most_commented' },
        ];
    });

    // Sub-fields state
    const [expandedTopics, setExpandedTopics] = useState([]);
    const [selectedSubFields, setSelectedSubFields] = useState(() => {
        const saved = localStorage.getItem('officerSelectedSubTopics');
        return saved ? JSON.parse(saved) : [];
    });

    const [uiSettings, setUiSettings] = useState({ fontSize: '100%', theme: 'system' });
    const [isSaved, setIsSaved] = useState(false);
    const [expandedBlock, setExpandedBlock] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleTopicToggle = (id) => {
        setIsSaved(false);
        const isSelected = selectedTopics.includes(id);
        const item = ALL_ITEMS.find(i => i.id === id);
        const subIds = item?.subFields ? item.subFields.map(sf => sf.id) : [];

        if (isSelected) {
            setSelectedTopics(prev => prev.filter(t => t !== id));
            setOrderedBlocks(prev => prev.filter(b => b.id !== id));
            if (subIds.length > 0) {
                setSelectedSubFields(prev => prev.filter(sfId => !subIds.includes(sfId)));
            }
            if (expandedBlock === id) setExpandedBlock(null);
        } else {
            setSelectedTopics(prev => [...prev, id]);
            setOrderedBlocks(prev => [...prev, { id, viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' }]);
            if (subIds.length > 0) {
                setSelectedSubFields(prev => Array.from(new Set([...prev, ...subIds])));
            }
        }
    };

    const toggleSubField = (subId, parentId) => {
        setIsSaved(false);
        setSelectedSubFields(prev => {
            const isSelected = prev.includes(subId);
            const next = isSelected ? prev.filter(id => id !== subId) : [...prev, subId];

            // Auto select parent if at least one subfield is selected
            if (!isSelected && !selectedTopics.includes(parentId)) {
                setSelectedTopics(pf => [...pf, parentId]);
                setOrderedBlocks(ob => [...ob, { id: parentId, viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' }]);
            }
            return next;
        });
    };

    const toggleAllSubFields = (parentId) => {
        setIsSaved(false);
        const item = ALL_ITEMS.find(i => i.id === parentId);
        if (!item || !item.subFields) return;

        const subIds = item.subFields.map(sf => sf.id);
        const isAllSelected = subIds.every(id => selectedSubFields.includes(id));

        if (isAllSelected) {
            setSelectedSubFields(prev => prev.filter(id => !subIds.includes(id)));
            // Optionally deselect parent
            setSelectedTopics(prev => prev.filter(id => id !== parentId));
            setOrderedBlocks(prev => prev.filter(b => b.id !== parentId));
            if (expandedBlock === parentId) setExpandedBlock(null);
        } else {
            setSelectedSubFields(prev => Array.from(new Set([...prev, ...subIds])));
            // Select parent
            if (!selectedTopics.includes(parentId)) {
                setSelectedTopics(prev => [...prev, parentId]);
                setOrderedBlocks(prev => [...prev, { id: parentId, viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' }]);
            }
        }
    };

    const toggleExpand = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedTopics(prev => prev.includes(id) ? prev.filter(topicId => topicId !== id) : [...prev, id]);
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
        setTimeout(() => { if (e.target?.classList) e.target.classList.add('opacity-40'); }, 0);
    };
    const handleDragEnter = (e, index) => { e.preventDefault(); setDragOverIndex(index); };
    const handleDragEnd = (e) => { if (e.target?.classList) e.target.classList.remove('opacity-40'); setDraggedIndex(null); setDragOverIndex(null); };
    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;
        setIsSaved(false);
        const newOrder = [...orderedBlocks];
        const draggedItem = newOrder[draggedIndex];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedItem);
        setOrderedBlocks(newOrder);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleSave = () => {
        setIsSaved(true);
        localStorage.setItem('officerSelectedTopics', JSON.stringify(selectedTopics));
        localStorage.setItem('officerSelectedSubTopics', JSON.stringify(selectedSubFields));
        localStorage.setItem('officerOrderedBlocks', JSON.stringify(orderedBlocks));
        // Dispatch event so OfficerHomePage reacts without needing a page reload
        window.dispatchEvent(new Event('officerSettingsUpdated'));
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleReset = () => {
        const defaults = [
            { id: 'dat-dai', viewMode: 'card', width: '100', recordCount: 5, sortOrder: 'newest' },
            { id: 'news-tin-nong', viewMode: 'list', width: '50', recordCount: 10, sortOrder: 'most_viewed' },
            { id: 'forum-luat-su', viewMode: 'card', width: '50', recordCount: 5, sortOrder: 'most_commented' },
        ];
        setSelectedTopics(['dat-dai', 'news-tin-nong', 'forum-luat-su']);
        setOrderedBlocks(defaults);
        setIsSaved(false);
    };

    const getCategoryInfo = (id) => {
        if (LEGAL_FIELDS.some(item => item.id === id)) return { name: 'Pháp lý', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
        if (NEWS_CATEGORIES.some(item => item.id === id)) return { name: 'Tin tức', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
        if (FORUMS.some(item => item.id === id)) return { name: 'Diễn đàn', color: 'bg-amber-100 text-amber-700 border-amber-200' };
        if (STATISTICS.some(item => item.id === id)) return { name: 'Thống kê', color: 'bg-rose-100 text-rose-700 border-rose-200' };
        return { name: 'Khác', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    };

    const renderTopicGrid = (title, description, items) => (
        <div className="mb-10 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 mb-1 border-b pb-2">{title}</h3>
            {description && <p className="text-gray-500 text-sm mb-4 mt-2">{description}</p>}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                {items.map(topic => {
                    const isSelected = selectedTopics.includes(topic.id);
                    const isExpanded = expandedTopics.includes(topic.id);
                    return (
                        <div key={topic.id} className="flex flex-col relative">
                            <button
                                onClick={() => handleTopicToggle(topic.id)}
                                className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 w-full text-left relative z-10 ${isSelected
                                    ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'}`}
                            >
                                <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden relative shadow-sm">
                                    <img src={topic.thumbnail} alt={topic.title} className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-blue-900/10' : 'bg-black/5'}`}></div>
                                </div>
                                <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                                    <div className="flex flex-col pr-2">
                                        <h3 className={`font-bold text-[15px] ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{topic.title}</h3>
                                        {topic.subFields && (
                                            <div
                                                className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 font-semibold cursor-pointer hover:text-blue-800 self-start"
                                                onClick={(e) => toggleExpand(e, topic.id)}
                                            >
                                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                {isExpanded ? 'Thu gọn lĩnh vực' : 'Chọn lĩnh vực chi tiết'}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
                                        {isSelected && <span className="text-white text-xs font-bold">{orderedBlocks.findIndex(b => b.id === topic.id) + 1}</span>}
                                    </div>
                                </div>
                            </button>

                            {/* Subfields Expandable Area (Inline nested list) */}
                            {topic.subFields && (
                                <div className={`overflow-hidden transition-all duration-300 -mt-2 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl pt-4 pb-3 px-4 shadow-inner">
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {/* Select All Checkbox */}
                                            <label
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors font-medium ${topic.subFields.every(sf => selectedSubFields.includes(sf.id))
                                                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                                                        : 'bg-white border-gray-400 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={topic.subFields.every(sf => selectedSubFields.includes(sf.id))}
                                                    onChange={() => toggleAllSubFields(topic.id)}
                                                />
                                                <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${topic.subFields.every(sf => selectedSubFields.includes(sf.id)) ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}>
                                                    {topic.subFields.every(sf => selectedSubFields.includes(sf.id)) && <Check size={12} className="text-white" />}
                                                    {!topic.subFields.every(sf => selectedSubFields.includes(sf.id)) && topic.subFields.some(sf => selectedSubFields.includes(sf.id)) && <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>}
                                                </div>
                                                <span>Tất cả</span>
                                            </label>

                                            {topic.subFields.map(sub => {
                                                const isSubSelected = selectedSubFields.includes(sub.id);
                                                return (
                                                    <label
                                                        key={sub.id}
                                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors ${isSubSelected
                                                                ? 'bg-blue-100 border-blue-300 text-blue-800'
                                                                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={isSubSelected}
                                                            onChange={() => toggleSubField(sub.id, topic.id)}
                                                        />
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${isSubSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                                            {isSubSelected && <Check size={12} className="text-white" />}
                                                        </div>
                                                        <span>{sub.title}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="animate-fadeIn pb-12">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0f4c81] flex items-center gap-2">
                    <ShieldCheck size={26} className="text-blue-600" /> Cấu hình cá nhân hóa — Cán bộ
                </h1>
                <p className="text-gray-500 text-sm mt-1">Lựa chọn và sắp xếp các nội dung hiển thị trên Trang chủ Khu vực cán bộ của bạn.</p>
            </div>

            {/* Action bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sticky top-4 z-10">
                <div className="flex bg-gray-50 p-1 rounded-lg w-full sm:w-auto overflow-x-auto hide-scrollbar">
                    {[
                        { key: 'topics', label: 'Nội dung quan tâm' },
                        { key: 'order', label: 'Sắp xếp ưu tiên' },
                        { key: 'ui', label: 'Tùy chỉnh giao diện' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${activeTab === tab.key ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
                    <button onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <RefreshCw size={16} /> Khôi phục
                    </button>
                    <button
                        onClick={handleSave}
                        className={`flex items-center justify-center gap-1.5 px-5 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${isSaved ? 'bg-green-500 text-white' : 'bg-[#0f4c81] hover:bg-blue-800 text-white'}`}
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
                        {OFFICER_TOPIC_GROUPS.map(group => renderTopicGrid(group.title, group.description, group.items))}
                    </div>
                )}

                {/* ORDER TAB */}
                {activeTab === 'order' && (
                    <div className="p-6 md:p-8 animate-fadeIn flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Sắp xếp mức độ ưu tiên & Tùy chỉnh hiển thị</h2>
                            <p className="text-gray-500 text-sm max-w-3xl">Danh sách dưới đây tương ứng với các nội dung bạn đã chọn. Kéo thả hoặc dùng mũi tên để sắp xếp. Nhấn "Cập nhật" để tinh chỉnh giao diện từng khối trên Trang chủ cán bộ. Lưu lại để áp dụng ngay.</p>
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
                                            className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-300 ring-2 ring-blue-50' : 'border-gray-200 hover:border-blue-200'} ${!isExpanded ? 'cursor-grab active:cursor-grabbing' : ''} ${dragOverIndex === index && draggedIndex !== index ? 'border-2 border-dashed border-blue-500 scale-[1.01] shadow-lg' : ''}`}
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between p-3 sm:p-4 bg-white relative z-10">
                                                <div className="flex items-center gap-3 sm:gap-5 flex-1 cursor-pointer" onClick={() => setExpandedBlock(isExpanded ? null : block.id)}>
                                                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border-2 ${index === 0 ? 'bg-orange-50 text-orange-600 border-orange-200' : index < 3 ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
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
                                                            <span>•</span><span>Rộng {block.width}%</span>
                                                            {!isStatistic && <><span>•</span><span>{block.recordCount} bài</span></>}
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
                                                        <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }} disabled={index === 0} className={`p-1 rounded-sm ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:text-blue-600'}`}>
                                                            <ArrowUp size={16} />
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }} disabled={index === orderedBlocks.length - 1} className={`p-1 rounded-sm ${index === orderedBlocks.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:text-blue-600'}`}>
                                                            <ArrowDown size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Accordion Config Panel */}
                                            {isExpanded && (
                                                <div className="p-5 sm:p-6 bg-gray-50/80 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
                                                    {!isStatistic && (
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-800 mb-2">Chế độ xem mặc định</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <button onClick={() => updateBlockConfig(block.id, { viewMode: 'card' })} className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${block.viewMode === 'card' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}>
                                                                    <LayoutGrid size={18} /> Dạng thẻ
                                                                </button>
                                                                <button onClick={() => updateBlockConfig(block.id, { viewMode: 'list' })} className={`flex items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${block.viewMode === 'list' ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}>
                                                                    <List size={18} /> Danh sách
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className={isStatistic ? 'col-span-1 md:col-span-2' : ''}>
                                                        <label className="block text-sm font-bold text-gray-800 mb-2">Khối hiển thị (Chiều ngang trang)</label>
                                                        <div className={`grid gap-3 ${isStatistic ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
                                                            {['100', '50', ...(isStatistic ? ['33', '25'] : [])].map(w => (
                                                                <button key={w} onClick={() => updateBlockConfig(block.id, { width: w })} className={`p-3 border-2 rounded-xl transition-all text-center font-medium ${block.width === w ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}>
                                                                    {w}%{!isStatistic && w === '100' ? ' (Cả màn)' : !isStatistic && w === '50' ? ' (Nửa màn)' : ''}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {!isStatistic && (
                                                        <>
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-800 mb-2">Số lượng bản ghi</label>
                                                                <select value={block.recordCount} onChange={(e) => updateBlockConfig(block.id, { recordCount: Number(e.target.value) })} className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none bg-white font-medium text-gray-700">
                                                                    {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n} bản ghi{n === 5 ? ' (Mặc định)' : ''}</option>)}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-800 mb-2">Ưu tiên các bản ghi</label>
                                                                <select value={block.sortOrder} onChange={(e) => updateBlockConfig(block.id, { sortOrder: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none bg-white font-medium text-gray-700">
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

                        {/* Live Layout Preview */}
                        {orderedBlocks.length > 0 && (
                            <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-gray-50">
                                <div className="bg-[#0f4c81] text-white px-6 py-4 flex items-center justify-between">
                                    <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                        <Monitor size={18} /> Bản xem trước — Trang chủ cán bộ
                                    </h3>
                                    <span className="text-xs text-blue-200 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-400/30">Mô phỏng bố cục</span>
                                </div>
                                <div className="p-6 md:p-8 space-y-6 max-h-[700px] overflow-y-auto custom-scrollbar">
                                    <div className="h-20 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center px-6 gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 shrink-0"></div>
                                        <div className="space-y-2 flex-1">
                                            <div className="h-3 w-48 bg-gray-200 rounded"></div>
                                            <div className="h-2 w-32 bg-gray-100 rounded"></div>
                                        </div>
                                        <div className="w-1/4 h-10 bg-gray-50 rounded-lg border border-gray-100 hidden md:block"></div>
                                    </div>
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
                                                <div key={`prev-${block.id}`} className={`${wClass} px-4 mb-8`}>
                                                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                                                        <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-gray-50">
                                                            <h4 className="font-bold text-lg text-gray-800 flex items-center gap-3">
                                                                <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                                                                <span className="truncate">{itemDef.title}</span>
                                                            </h4>
                                                            <span className="text-sm font-semibold text-blue-600 shrink-0">Xem tất cả →</span>
                                                        </div>
                                                        <div className="flex-1 mt-2">
                                                            {isStatistic ? (
                                                                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 min-h-[120px]">
                                                                    <BarChart2 className="text-gray-400 mb-2" size={32} />
                                                                    <span className="text-sm font-semibold text-gray-500">Mô phỏng biểu đồ</span>
                                                                </div>
                                                            ) : block.viewMode === 'card' ? (
                                                                <div className={`grid gap-4 ${isFifty ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
                                                                    {[...Array(isFifty ? 2 : 4)].map((_, i) => (
                                                                        <div key={i} className="flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                                                            <div className="h-24 bg-gray-200 relative">
                                                                                <img src={itemDef.thumbnail} className="w-full h-full object-cover opacity-60 grayscale" alt="" />
                                                                            </div>
                                                                            <div className="p-3">
                                                                                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                                                                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-3">
                                                                    {[...Array(isFifty ? 3 : 4)].map((_, i) => (
                                                                        <div key={i} className="flex gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100 items-center">
                                                                            <div className="w-20 h-14 shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                                                                <img src={itemDef.thumbnail} className="w-full h-full object-cover opacity-50 grayscale" alt="" />
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                                                                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
                            <p className="text-gray-500 text-sm mt-1">Thiết lập cỡ chữ và giao diện Sáng/Tối cho Khu vực cán bộ.</p>
                        </div>
                        <div className="space-y-10 max-w-3xl">
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><Sun size={20} className="text-orange-500" /> Chủ đề màu sắc</h3>
                                <div className="flex flex-wrap gap-4">
                                    {[{ key: 'light', icon: <Sun size={20} />, label: 'Sáng' }, { key: 'dark', icon: <Moon size={20} />, label: 'Tối' }, { key: 'system', icon: <Monitor size={20} />, label: 'Theo hệ thống' }].map(t => (
                                        <button key={t.key} onClick={() => { setUiSettings({ ...uiSettings, theme: t.key }); setIsSaved(false); }} className={`flex items-center gap-2 px-6 py-3.5 border-2 rounded-xl font-medium transition-all ${uiSettings.theme === t.key ? 'border-blue-500 text-blue-700 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'}`}>
                                            {t.icon} {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><Type size={20} className="text-blue-500" /> Cỡ chữ hệ thống</h3>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex justify-between text-gray-500 font-medium mb-4">
                                        <span className="text-sm">Nhỏ</span>
                                        <span className="text-base">Tiêu chuẩn</span>
                                        <span className="text-lg text-blue-600 font-bold">Lớn</span>
                                    </div>
                                    <input type="range" min="90" max="115" step="5" className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 my-2" defaultValue="100"
                                        onChange={(e) => { setUiSettings({ ...uiSettings, fontSize: e.target.value + '%' }); setIsSaved(false); }}
                                    />
                                    <div className="mt-8 border border-blue-100 rounded-lg p-5 bg-blue-50/30 text-gray-800 shadow-sm" style={{ fontSize: uiSettings.fontSize }}>
                                        <h4 className="font-bold mb-2">Đoạn văn thực tế minh họa</h4>
                                        <p>Đoạn văn này minh họa kích thước chữ bạn đã chọn. Kích thước hiện tại: <strong>{uiSettings.fontSize}</strong>.</p>
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

export default OfficerSettingsPage;

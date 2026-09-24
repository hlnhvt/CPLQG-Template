import React, { useState } from 'react';
import { 
    FileText, 
    BookOpen, 
    Newspaper, 
    Calendar, 
    Download, 
    Eye, 
    MessageSquarePlus, 
    Clock, 
    Tag, 
    ChevronRight,
    Search,
    Filter,
    CheckCircle2
} from 'lucide-react';
import { laocaiLegalDocs, laocaiDraftDocs, laocaiNewsArticles } from '../../data/laocaiMockData';

const LaoCaiDocsAndNews = () => {
    const [activeTab, setActiveTab] = useState('docs'); // 'docs' | 'drafts' | 'news'
    const [filterField, setFilterField] = useState('all');
    const [searchFilter, setSearchFilter] = useState('');

    const filteredDocs = laocaiLegalDocs.filter(d => {
        const matchesField = filterField === 'all' || d.linhVuc.includes(filterField);
        const matchesSearch = !searchFilter || d.soHieu.toLowerCase().includes(searchFilter.toLowerCase()) || d.trichYeu.toLowerCase().includes(searchFilter.toLowerCase());
        return matchesField && matchesSearch;
    });

    return (
        <section id="van-ban-lao-cai" className="py-14 bg-white">
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Section Title with Tabs */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 border-b border-gray-200 gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                            Dữ liệu pháp lý địa phương
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            Hệ Thống Văn Bản & Hoạt Động Pháp Luật Tỉnh Lào Cai
                        </h2>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-gray-100 p-1 rounded-xl gap-1 text-xs sm:text-sm font-bold w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab('docs')}
                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition ${
                                activeTab === 'docs' 
                                    ? 'bg-red-700 text-white shadow-md' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                            }`}
                        >
                            <FileText size={16} />
                            <span>Văn bản QPPL Lào Cai</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'docs' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {laocaiLegalDocs.length}
                            </span>
                        </button>

                        <button
                            id="du-thao-lao-cai"
                            onClick={() => setActiveTab('drafts')}
                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition ${
                                activeTab === 'drafts' 
                                    ? 'bg-red-700 text-white shadow-md' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                            }`}
                        >
                            <BookOpen size={16} />
                            <span>Lấy ý kiến dự thảo</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'drafts' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {laocaiDraftDocs.length}
                            </span>
                        </button>

                        <button
                            id="pbgdpl-lao-cai"
                            onClick={() => setActiveTab('news')}
                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition ${
                                activeTab === 'news' 
                                    ? 'bg-red-700 text-white shadow-md' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                            }`}
                        >
                            <Newspaper size={16} />
                            <span>Tin tức & PBGDPL</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'news' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {laocaiNewsArticles.length}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Tab 1: Legal Documents of LaoCai */}
                {activeTab === 'docs' && (
                    <div className="space-y-6">
                        {/* Filter Bar */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-2 flex-1">
                                <Search size={16} className="text-gray-400 ml-1" />
                                <input
                                    type="text"
                                    value={searchFilter}
                                    onChange={(e) => setSearchFilter(e.target.value)}
                                    placeholder="Lọc nhanh số hiệu hoặc nội dung trích yếu..."
                                    className="bg-transparent border-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none w-full"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Filter size={14} className="text-gray-500" />
                                <select
                                    value={filterField}
                                    onChange={(e) => setFilterField(e.target.value)}
                                    className="bg-white border border-gray-200 text-xs text-gray-700 rounded-lg px-2.5 py-1.5 font-medium focus:ring-1 focus:ring-red-600"
                                >
                                    <option value="all">Tất cả lĩnh vực</option>
                                    <option value="Đất đai">Đất đai - Tái định cư</option>
                                    <option value="Đầu tư">Đầu tư - Doanh nghiệp</option>
                                    <option value="Du lịch">Du lịch - Phí, lệ phí</option>
                                    <option value="Cải cách">Cải cách hành chính - Số hóa</option>
                                    <option value="Tư pháp">Tư pháp - PBGDPL</option>
                                </select>
                            </div>
                        </div>

                        {/* Document List */}
                        <div className="grid grid-cols-1 gap-4">
                            {filteredDocs.map((doc) => (
                                <div 
                                    key={doc.id}
                                    className="bg-white rounded-xl border border-gray-200 hover:border-red-400 p-5 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-bold text-sm text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded">
                                                {doc.soHieu}
                                            </span>
                                            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                                {doc.coQuan}
                                            </span>
                                            <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                                <Tag size={12} /> {doc.linhVuc}
                                            </span>
                                            {doc.isNew && (
                                                <span className="text-[10px] font-bold text-white bg-red-600 px-1.5 py-0.2 rounded uppercase">
                                                    Mới
                                                </span>
                                            )}
                                            {doc.isHot && (
                                                <span className="text-[10px] font-bold text-amber-900 bg-amber-300 px-1.5 py-0.2 rounded uppercase">
                                                    Quan tâm
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-xs text-gray-500 flex items-center gap-3">
                                            <span>Ban hành: <strong>{doc.ngayBanHanh}</strong></span>
                                            <span>Hiệu lực: <strong className="text-emerald-700">{doc.ngayHieuLuc}</strong></span>
                                        </div>
                                    </div>

                                    <div className="py-3">
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-700 transition leading-snug">
                                            {doc.trichYeu}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs">
                                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                                            <CheckCircle2 size={13} /> Đang còn hiệu lực thi hành
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <button 
                                                type="button" 
                                                className="inline-flex items-center gap-1 text-gray-700 hover:text-red-700 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium transition"
                                            >
                                                <Eye size={14} />
                                                <span>Xem chi tiết</span>
                                            </button>
                                            <button 
                                                type="button" 
                                                className="inline-flex items-center gap-1 text-red-700 hover:text-white px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-700 font-semibold transition"
                                            >
                                                <Download size={14} />
                                                <span>Tải PDF</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 2: Draft Documents for Public Feedback */}
                {activeTab === 'drafts' && (
                    <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm p-4 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-bold shrink-0">
                                📢
                            </div>
                            <p>
                                Mọi người dân, tổ chức và chuyên gia trên địa bàn tỉnh đều có quyền tham gia đóng góp ý kiến xây dựng các dự thảo Nghị quyết HĐND tỉnh và Quyết định UBND tỉnh Lào Cai nhằm hoàn thiện chính sách phát triển của tỉnh.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {laocaiDraftDocs.map((draft) => (
                                <div 
                                    key={draft.id}
                                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded">
                                                {draft.trangThai}
                                            </span>
                                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                                <Clock size={12} /> Hạn: <strong>{draft.hanGopY}</strong>
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-gray-900 text-sm leading-snug hover:text-red-700 cursor-pointer">
                                            {draft.title}
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            Cơ quan soạn thảo: <strong>{draft.coQuanSoanThao}</strong>
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                                        <span className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                                            <MessageSquarePlus size={14} />
                                            {draft.soLuotGopY} ý kiến
                                        </span>

                                        <button 
                                            type="button"
                                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition"
                                        >
                                            Gửi ý kiến ngay
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 3: News & Legal Education in LaoCai */}
                {activeTab === 'news' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {laocaiNewsArticles.map((art) => (
                            <div 
                                key={art.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                            >
                                <div className="h-44 overflow-hidden relative">
                                    <img 
                                        src={art.thumb} 
                                        alt={art.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <span className="absolute top-2.5 left-2.5 bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                                        {art.category}
                                    </span>
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="text-[11px] text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} />
                                            <span>{art.date}</span>
                                            <span>•</span>
                                            <span>{art.author}</span>
                                        </div>

                                        <h3 className="font-bold text-gray-900 text-sm leading-snug hover:text-red-700 cursor-pointer">
                                            {art.title}
                                        </h3>

                                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                                            {art.summary}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between text-xs">
                                        <span className="text-red-700 font-bold hover:underline cursor-pointer flex items-center gap-1">
                                            Xem chi tiết <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LaoCaiDocsAndNews;

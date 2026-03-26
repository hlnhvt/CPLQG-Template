import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Link as LinkIcon, Folder, Copy, Trash2, Edit3, Share2, FileEdit, ExternalLink, Calendar, FileText, ChevronRight, BookmarkPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_COLLECTIONS = [
    { id: 1, name: 'Tài liệu Luật Đất đai 2024', emoji: '🏡', image: '/images/collections/land_law.png', count: 12, updatedAt: '15/03/2026', isShared: true, desc: 'Tổng hợp các văn bản hướng dẫn thi hành Luật Đất đai mới' },
    { id: 2, name: 'Quy định Thuế Doanh nghiệp', emoji: '💰', image: '/images/collections/corp_tax.png', count: 5, updatedAt: '12/03/2026', isShared: false, desc: 'Thuế TNDN, Thuế GTGT và các thông tư liên quan' },
    { id: 3, name: 'Hợp đồng lao động & BHXH', emoji: '🤝', image: '/images/collections/labor.png', count: 28, updatedAt: '01/03/2026', isShared: true, desc: 'Mẫu hợp đồng và quy định bảo hiểm' },
    { id: 4, name: 'Lưu trữ Tin tức tuần 10', emoji: '📰', image: '/images/collections/news.png', count: 3, updatedAt: '10/03/2026', isShared: false, desc: '' },
];

const CollectionCard = ({ collection }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group relative flex flex-col h-full">
            {/* Header Image Block */}
            <div className="h-28 relative bg-[#eef2ff] overflow-hidden shrink-0 flex items-center justify-center">
                {collection.image ? (
                    <img src={collection.image} alt={collection.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
                ) : null}
                <Folder size={40} className="text-indigo-300 absolute" style={{ display: collection.image ? 'none' : 'flex' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none transition-opacity duration-300 opacity-80 group-hover:opacity-100"></div>
                <div className="absolute -bottom-5 left-6 w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center border-2 border-white z-10 transition-transform group-hover:-translate-y-1 overflow-hidden">
                    {collection.emoji ? <span className="text-2xl">{collection.emoji}</span> : <Folder size={24} className="text-blue-500" />}
                </div>
                {collection.isShared && (
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs px-2.5 py-1.5 rounded-md flex items-center gap-1.5 z-10 font-medium shadow-sm">
                        <LinkIcon size={12} /> Đã chia sẻ
                    </div>
                )}
            </div>

            {/* Content Array */}
            <div className="px-6 pt-10 pb-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/ca-nhan/bo-suu-tap/${collection.id}`} className="font-bold text-gray-900 text-[17px] hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {collection.name}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button 
                            onClick={(e) => { e.preventDefault(); setMenuOpen(!menuOpen); }}
                            onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                            className="text-gray-400 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <MoreVertical size={18} />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10 animate-fade-in">
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-[14px] text-gray-700"><Edit3 size={15}/> Chỉnh sửa</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-[14px] text-gray-700"><Share2 size={15}/> Chia sẻ</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-[14px] text-gray-700"><Copy size={15}/> Nhân bản</button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-[14px] text-red-600"><Trash2 size={15}/> Xóa</button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-[13px] text-gray-500 mb-4 line-clamp-1 flex-1">
                    {collection.desc || <span className="italic">Không có mô tả</span>}
                </p>

                <div className="flex items-center justify-between text-[12px] font-medium text-gray-500 border-t border-gray-100 pt-3 mt-auto">
                    <div className="flex items-center gap-1.5"><Folder size={14} className="text-blue-500" /> {collection.count} mục</div>
                    <div>Cập nhật: {collection.updatedAt}</div>
                </div>
            </div>
        </div>
    );
};

const CollectionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('collections'); // 'collections' or 'notes'
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [collections, setCollections] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Load collections from localStorage or fallback to MOCK
        const storedColsStr = localStorage.getItem('cplqg_collections');
        if (storedColsStr) {
            try {
                const storedCols = JSON.parse(storedColsStr);
                // Merge mock collections with stored collections
                const merged = [...MOCK_COLLECTIONS];
                storedCols.forEach(sc => {
                    if (!merged.find(m => m.id === sc.id)) {
                        merged.push({
                            id: sc.id,
                            name: sc.name,
                            emoji: '📁',
                            count: sc.docs ? sc.docs.length : 0,
                            updatedAt: new Date().toLocaleDateString('vi-VN'),
                            isShared: false,
                            desc: 'Bộ sưu tập cá nhân tự tạo'
                        });
                    }
                });
                setCollections(merged);
            } catch (e) {
                setCollections(MOCK_COLLECTIONS);
            }
        } else {
            setCollections(MOCK_COLLECTIONS);
        }

        // Load notes from localStorage
        const loadedNotes = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('cplqg_note_')) {
                const docId = key.replace('cplqg_note_', '');
                const content = localStorage.getItem(key);
                if (content && content.trim() !== '') {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = content;
                    const plainText = tempDiv.textContent || tempDiv.innerText || '';
                    
                    loadedNotes.push({
                        id: docId,
                        docTitle: docId === '1' ? 'Hiến pháp Nước Cộng hòa xã hội chủ nghĩa Việt Nam' : 
                                  docId === '2' ? 'Thông tư 78/2014/TT-BTC hướng dẫn thi hành Nghị định 218/2013/NĐ-CP' : 
                                  `Văn bản pháp luật mang số định danh ${docId}`,
                        content: content,
                        updatedAt: new Date().toLocaleDateString('vi-VN'),
                        excerpt: plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
                    });
                }
            }
        }

        if (loadedNotes.length === 0) {
            loadedNotes.push({
                id: '1',
                docTitle: 'Hiến pháp Nước Cộng hòa xã hội chủ nghĩa Việt Nam',
                content: '<p>Cần xem lại Chương II về <strong>quyền con người</strong>, đặc biệt là các điều khoản liên quan tới tự do kinh doanh.</p>',
                excerpt: 'Cần xem lại Chương II về quyền con người, đặc biệt là các điều khoản liên quan tới tự do kinh doanh.',
                updatedAt: new Date().toLocaleDateString('vi-VN')
            });
        }
        setNotes(loadedNotes);
    }, []);

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f4c81]">Khu vực lưu trữ</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý không gian tài liệu cá nhân hóa của bạn</p>
                </div>
                {activeTab === 'collections' && (
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Plus size={18} /> Tạo bộ sưu tập
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex bg-gray-50 p-1 rounded-lg min-w-max">
                    <button 
                        onClick={() => setActiveTab('collections')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'collections' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <BookmarkPlus size={16} className={activeTab === 'collections' ? 'fill-blue-100' : ''} /> 
                        Danh sách Bộ sưu tập <span className="hidden sm:inline-block ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">{collections.length}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('notes')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'notes' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900 duration-200'}`}
                    >
                        <FileEdit size={16} className={activeTab === 'notes' ? 'fill-blue-100' : ''} /> 
                        Ghi chú Văn bản <span className="hidden sm:inline-block ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">{notes.length}</span>
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder={activeTab === 'collections' ? "Tìm bộ sưu tập..." : "Tìm kiếm ghi chú hoặc văn bản..."}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <select className="px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                        <option>Cập nhật gần nhất</option>
                        <option>Tên (A-Z)</option>
                    </select>
                </div>
            </div>

            {/* Collections Content */}
            {activeTab === 'collections' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collections.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(collection => (
                            <CollectionCard key={collection.id} collection={collection} />
                        ))}
                    </div>

                    {collections.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Folder size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Không tìm thấy bộ sưu tập</h3>
                            <p className="text-gray-500 text-sm">Thử thay đổi từ khóa tìm kiếm của bạn.</p>
                        </div>
                    )}
                </>
            )}

            {/* Notes Content */}
            {activeTab === 'notes' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {notes.filter(n => n.docTitle.toLowerCase().includes(searchTerm.toLowerCase()) || n.excerpt.toLowerCase().includes(searchTerm.toLowerCase())).map((note, idx) => (
                            <div key={idx} className="p-5 hover:bg-blue-50/30 transition-colors flex items-start gap-4 cursor-pointer" onClick={() => setSelectedNote(note)}>
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200 mt-1">
                                    <FileEdit size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-2 hover:text-blue-600 transition-colors">{note.docTitle}</h3>
                                    <p className="text-[14px] text-gray-600 line-clamp-2 mb-3 leading-relaxed opacity-90">{note.excerpt}</p>
                                    <div className="flex items-center gap-4 text-[12px] font-medium text-gray-500">
                                        <div className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" /> Cập nhật lần cuối: {note.updatedAt}</div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); navigate(`/van-ban/${note.id}`); }} 
                                            className="ml-auto flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            <ExternalLink size={14} /> Đi tới văn bản
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {notes.filter(n => n.docTitle.toLowerCase().includes(searchTerm.toLowerCase()) || n.excerpt.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                            <div className="text-center py-20">
                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <FileEdit size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Chưa có ghi chú nào</h3>
                                <p className="text-gray-500 text-[14px]">Bạn chưa tạo ghi chú nào hoặc không tìm thấy kết quả phù hợp.<br/>Hãy vào xem chi tiết một văn bản để trải nghiệm chức năng Ghi chú nhé!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Create Modal Mock */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900 text-lg">Tạo bộ sưu tập mới</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên bộ sưu tập <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Nhập tên..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Emoji đại diện</label>
                                    <button className="w-12 h-12 border border-gray-300 rounded-lg text-2xl flex items-center justify-center hover:bg-gray-50">📁</button>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ảnh nền bìa</label>
                                    <div className="flex gap-2 relative">
                                        <button className="w-full h-12 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center gap-2 transition-colors">
                                            <Folder size={18} /> Chọn ảnh từ máy
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả ngắn</label>
                                <textarea placeholder="Mục đích của bộ sưu tập này..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20"></textarea>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Hủy</button>
                            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 font-medium bg-[#0f4c81] text-white hover:bg-blue-800 rounded-lg transition-colors">Tạo mới</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Note Detail Modal */}
            {selectedNote && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedNote(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                            <h3 className="font-bold text-gray-900 text-[16px] flex items-center gap-2">
                                <FileText size={18} className="text-blue-600"/> Chi tiết Ghi chú
                            </h3>
                            <button onClick={() => setSelectedNote(null)} className="text-gray-400 hover:text-gray-700 bg-white shadow-sm border border-gray-200 p-1.5 rounded-lg transition-colors">✕</button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="mb-6 pb-4 border-b border-gray-100">
                                <div className="text-[12px] font-semibold text-blue-600 uppercase tracking-wide mb-1 flex items-center gap-1.5"><ExternalLink size={14}/> Văn bản liên quan:</div>
                                <h4 className="font-bold text-[18px] text-gray-800 leading-snug">{selectedNote.docTitle}</h4>
                            </div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-500 mb-2">NỘI DUNG GHI CHÚ:</div>
                                <div 
                                    className="prose prose-sm max-w-none text-[15px] leading-relaxed text-gray-800 bg-yellow-50/50 p-4 rounded-xl border border-yellow-100"
                                    dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
                            <button onClick={() => setSelectedNote(null)} className="px-4 py-2 font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-[14px]">Đóng</button>
                            <button onClick={() => navigate(`/van-ban/${selectedNote.id}`)} className="px-5 py-2 font-semibold bg-[#1a3b8b] text-white hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-2 text-[14px]">
                                <ExternalLink size={16} /> Truy cập văn bản
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionsPage;

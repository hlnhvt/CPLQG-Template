import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Download, Eye, FileText, Share2, Calendar, RefreshCw } from 'lucide-react';

/* ──────────────────────────── STATIC DATA ────────────────────────────── */

const MOCK_NEW_DOCS = [
    { id: '1', soHieu: '22/2026/TT-BCT', date: '29/04/2026', title: 'Thông tư 22/2026/TT-BCT quy định về hoạt động xây dựng, áp dụng tiêu chuẩn quốc gia và quy chuẩn kỹ thuật quốc gia của Bộ Công Thương' },
    { id: '2', soHieu: '19/2026/NQ-CP', date: '29/04/2026', title: 'Nghị quyết số 19/2026/NQ-CP cắt giảm, phân cấp, đơn giản hoá thủ tục hành chính, điều kiện kinh doanh thuộc phạm vi quản lý của Bộ Công Thương' },
    { id: '3', soHieu: '23/2026/TT-BCT', date: '29/04/2026', title: 'Thông tư 23/2026/TT-BCT Quy định về giám định tư pháp trong lĩnh vực chuyên môn thuộc thẩm quyền quản lý của Bộ Công Thương' },
    { id: '4', soHieu: '20/2026/TT-BCT', date: '17/04/2026', title: 'Thông tư 20/2026/TT-BCT Sửa đổi, bổ sung một số điều của Thông tư số 10/2025/TT-BCT ngày 01 tháng 02 năm 2025 quy định phương pháp xác định...' },
    { id: '5', soHieu: '19/2026/NQ-CP', date: '29/04/2026', title: 'Nghị quyết số 19/2026/NQ-CP cắt giảm, phân cấp, đơn giản hoá thủ tục hành chính, điều kiện kinh doanh thuộc phạm vi quản lý của Bộ Công Thương' },
];

const MOCK_ACTIVE_DOCS = [
    {
        id: '101',
        title: 'Nghị định số 135/2026/NĐ-CP Quy định cơ chế, chính sách ưu đãi, ưu tiên cho đơn vị điều độ hệ thống điện quốc gia và đơn vị điều hành giao dịch thị trường điện',
        status: 'Chưa có hiệu lực',
        issueDate: '07/04/2026',
        effectiveDate: '25/05/2026',
        isNew: true
    },
    {
        id: '102',
        title: 'Nghị định số 112/2026/NĐ-CP Về trao đổi quốc tế kết quả giảm nhẹ phát thải khí nhà kính và tín chỉ các-bon',
        status: 'Chưa có hiệu lực',
        issueDate: '01/04/2026',
        effectiveDate: '19/05/2026',
        isNew: true
    },
    {
        id: '103',
        title: 'Thông tư 05/2026/TT-BYT BAN HÀNH DANH MỤC HÓA CHẤT KHÔNG ĐƯỢC SỬ DỤNG VÀ DANH MỤC HÓA CHẤT NGUY HIỂM CẦN CÔNG BỐ THÔNG TIN TRONG CHẾ PHẨM DIỆT CÔN TRÙNG, DIỆT KHUẨN DÙNG TRONG LĨNH VỰC GIA DỤNG VÀ Y TẾ',
        status: 'Chưa có hiệu lực',
        issueDate: '31/03/2026',
        effectiveDate: '15/05/2026',
        isNew: true
    }
];

const MOCK_POPULAR_DOCS = [
    { id: 'p1', title: 'Nghị định 140/2026/NĐ-CP Về Báo cáo tài chính...' },
    { id: 'p2', title: 'Nghị định 136/2026/NĐ-CP Sửa đổi, bổ sung một...' },
    { id: 'p3', title: 'Nghị định số 135/2026/NĐ-CP Quy định cơ chế, c...' },
    { id: 'p4', title: 'Thông tư số 200/2014/TT-BTC Hướng dẫn Chế độ...' },
    { id: 'p5', title: 'Nghị định 138/2026/NĐ-CP Quy định chi tiết một...' },
];

/* ──────────────────────────── MAIN COMPONENT ────────────────────────────── */
const VanBanHomePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('sap-co-hieu-luc');
    const [searchScope, setSearchScope] = useState('tat-ca');
    const [exactPhrase, setExactPhrase] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [loaiVanBan, setLoaiVanBan] = useState('');
    const [coQuanBanHanh, setCoQuanBanHanh] = useState('');
    const [ngayBanHanh, setNgayBanHanh] = useState('');
    const [tinhTrangHieuLuc, setTinhTrangHieuLuc] = useState('');
    const [xaPhuong, setXaPhuong] = useState('');
    const [ngayCoHieuLuc, setNgayCoHieuLuc] = useState('');
    const [ngayHetHieuLuc, setNgayHetHieuLuc] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() || showAdvanced) {
            navigate(`/van-ban/tim-kiem?q=${encodeURIComponent(searchQuery)}&scope=${searchScope}&exact=${exactPhrase}`);
        }
    };

    return (
        <div className="bg-[#f9f9f9] min-h-screen font-sans">
            {/* ═══════════════════ 1. HERO SEARCH ═══════════════════ */}
            <div className="bg-gradient-to-b from-[#003399] to-[#00aeef] pt-8 pb-10 text-white relative overflow-hidden">
                {/* Dong Son drum background */}
                <div
                    className="absolute inset-0 z-0 opacity-10 bg-center bg-no-repeat bg-cover mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />

                <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
                    {/* National Emblem */}
                    <img
                        src="/logo.png"
                        alt="Quốc huy"
                        className="w-[60px] h-[60px] mb-3 drop-shadow-md"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />

                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center uppercase">
                        CƠ SỞ DỮ LIỆU QUỐC GIA VỀ PHÁP LUẬT
                    </h1>

                    <form onSubmit={handleSearch} className="w-full max-w-4xl">
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                            {/* Search Input Container */}
                            <div className="relative flex-1 w-full flex items-center bg-white rounded-md overflow-hidden p-1 shadow-md">
                                <input
                                    type="text"
                                    placeholder="Nhập từ khóa tìm kiếm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2.5 text-gray-800 text-[15px] outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#007bff] hover:bg-[#0056b3] text-white px-5 py-2.5 rounded flex items-center gap-2 font-semibold text-[14px] transition-colors whitespace-nowrap"
                                >
                                    <Search size={16} /> Tìm kiếm
                                </button>
                            </div>

                            {/* Advanced Search Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-1.5 text-[15px] font-medium whitespace-nowrap hover:opacity-80 transition-opacity border border-white/30 rounded px-3 py-2 bg-white/5"
                            >
                                {showAdvanced ? 'Thu gọn' : 'Tìm kiếm nâng cao'}
                                <ChevronRight size={16} className={`transition-transform duration-300 ${showAdvanced ? '-rotate-90' : ''}`} />
                            </button>
                        </div>

                        {/* Search Options (Basic) */}
                        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mt-4 text-[14px]">
                            <div className="flex items-center gap-4">
                                <span>Tìm kiếm trong:</span>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input type="radio" name="scope" value="tat-ca" checked={searchScope === 'tat-ca'} onChange={(e) => setSearchScope(e.target.value)} className="w-4 h-4 accent-white" /> Tất cả
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input type="radio" name="scope" value="tieu-de" checked={searchScope === 'tieu-de'} onChange={(e) => setSearchScope(e.target.value)} className="w-4 h-4 accent-white" /> Tiêu đề văn bản
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input type="radio" name="scope" value="so-hieu" checked={searchScope === 'so-hieu'} onChange={(e) => setSearchScope(e.target.value)} className="w-4 h-4 accent-white" /> Số hiệu văn bản
                                </label>
                            </div>
                            <div className="flex items-center gap-4 md:ml-auto">
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" checked={exactPhrase} onChange={(e) => setExactPhrase(e.target.checked)} className="w-4 h-4 accent-white rounded-sm" /> Chính xác cụm từ trên
                                </label>
                                <Link to="/huong-dan-tra-cuu" className="hover:underline opacity-90 border-b border-dashed border-white/60 pb-0.5">Hướng dẫn tra cứu</Link>
                            </div>
                        </div>

                        {/* Advanced Search Panel */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showAdvanced ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                            <div className="border border-white/40 rounded-xl p-5 bg-white/10 backdrop-blur-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
                                    {/* Row 1 */}
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Loại văn bản</label>
                                        <select 
                                            value={loaiVanBan}
                                            onChange={e => setLoaiVanBan(e.target.value)}
                                            className={`w-full bg-white text-[13px] py-2 px-3 rounded outline-none shadow-sm cursor-pointer border-r-[12px] border-transparent ${loaiVanBan ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="">Chọn loại văn bản</option>
                                            <option value="Luật">Luật</option>
                                            <option value="Nghị định">Nghị định</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Cơ quan ban hành</label>
                                        <select 
                                            value={coQuanBanHanh}
                                            onChange={e => setCoQuanBanHanh(e.target.value)}
                                            className={`w-full bg-white text-[13px] py-2 px-3 rounded outline-none shadow-sm cursor-pointer border-r-[12px] border-transparent ${coQuanBanHanh ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="">Chọn cơ quan ban hành</option>
                                            <option value="Chính phủ">Chính phủ</option>
                                            <option value="Quốc hội">Quốc hội</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Ngày ban hành</label>
                                        <div className="relative text-gray-700">
                                            <input 
                                                type="text" 
                                                placeholder="dd/mm/yyyy - dd/mm/yyyy" 
                                                value={ngayBanHanh}
                                                onChange={e => setNgayBanHanh(e.target.value)}
                                                className={`w-full bg-white text-[13px] py-2 px-3 pr-8 rounded outline-none shadow-sm ${ngayBanHanh ? 'text-gray-900' : 'text-gray-400 placeholder:text-gray-400'}`} 
                                            />
                                            <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Tình trạng hiệu lực</label>
                                        <select 
                                            value={tinhTrangHieuLuc}
                                            onChange={e => setTinhTrangHieuLuc(e.target.value)}
                                            className={`w-full bg-white text-[13px] py-2 px-3 rounded outline-none shadow-sm cursor-pointer border-r-[12px] border-transparent ${tinhTrangHieuLuc ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="">Chọn tình trạng hiệu lực</option>
                                            <option value="Còn hiệu lực">Còn hiệu lực</option>
                                            <option value="Hết hiệu lực">Hết hiệu lực</option>
                                        </select>
                                    </div>

                                    {/* Row 2 */}
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Tỉnh/Thành phố</label>
                                        <select 
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value)}
                                            className={`w-full bg-white text-[13px] py-2 px-3 rounded outline-none shadow-sm cursor-pointer border-r-[12px] border-transparent ${selectedProvince ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="">Chọn Tỉnh/Thành phố</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Xã/Phường</label>
                                        <select 
                                            disabled={!selectedProvince}
                                            value={xaPhuong}
                                            onChange={e => setXaPhuong(e.target.value)}
                                            className={`w-full text-[13px] py-2 px-3 rounded outline-none border-r-[12px] border-transparent ${!selectedProvince ? 'bg-gray-200/90 text-gray-500 cursor-not-allowed' : `bg-white shadow-sm cursor-pointer ${xaPhuong ? 'text-gray-900' : 'text-gray-400'}`}`}
                                        >
                                            <option value="">Chọn Xã/Phường</option>
                                            {selectedProvince === 'Hà Nội' && (
                                                <>
                                                    <option value="Quận Ba Đình">Quận Ba Đình</option>
                                                    <option value="Quận Hoàn Kiếm">Quận Hoàn Kiếm</option>
                                                </>
                                            )}
                                            {selectedProvince === 'Hồ Chí Minh' && (
                                                <>
                                                    <option value="Quận 1">Quận 1</option>
                                                    <option value="Quận 3">Quận 3</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Ngày có hiệu lực</label>
                                        <div className="relative text-gray-700">
                                            <input 
                                                type="text" 
                                                placeholder="dd/mm/yyyy - dd/mm/yyyy" 
                                                value={ngayCoHieuLuc}
                                                onChange={e => setNgayCoHieuLuc(e.target.value)}
                                                className={`w-full bg-white text-[13px] py-2 px-3 pr-8 rounded outline-none shadow-sm ${ngayCoHieuLuc ? 'text-gray-900' : 'text-gray-400 placeholder:text-gray-400'}`} 
                                            />
                                            <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium mb-1.5">Ngày hết hiệu lực</label>
                                        <div className="relative text-gray-700">
                                            <input 
                                                type="text" 
                                                placeholder="dd/mm/yyyy - dd/mm/yyyy" 
                                                value={ngayHetHieuLuc}
                                                onChange={e => setNgayHetHieuLuc(e.target.value)}
                                                className={`w-full bg-white text-[13px] py-2 px-3 pr-8 rounded outline-none shadow-sm ${ngayHetHieuLuc ? 'text-gray-900' : 'text-gray-400 placeholder:text-gray-400'}`} 
                                            />
                                            <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3 - CSDL options and Buttons */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mt-6 pt-5 border-t border-white/20">
                                    <div className="flex flex-wrap items-center gap-4 text-[14px]">
                                        <span className="font-medium mr-2">Tìm kiếm trong CSDL:</span>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="csdl" defaultChecked className="w-4 h-4 accent-white" /> Tất cả
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="csdl" className="w-4 h-4 accent-white" /> Trung ương
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="csdl" className="w-4 h-4 accent-white" /> Địa phương
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3 w-full lg:w-auto">
                                        <button type="button" className="flex-1 lg:flex-none bg-[#ff8c00] hover:bg-[#e67e00] text-white px-5 py-2.5 rounded flex items-center justify-center gap-2 font-medium text-[14px] transition-colors shadow-sm">
                                            <RefreshCw size={15} /> Xóa dữ liệu tìm kiếm
                                        </button>
                                        <button type="submit" className="flex-1 lg:flex-none bg-[#007bff] hover:bg-[#0056b3] text-white px-6 py-2.5 rounded flex items-center justify-center gap-2 font-medium text-[14px] transition-colors shadow-sm">
                                            <Search size={15} /> Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* ═══════════════════ 2. MAIN LAYOUT ═══════════════════ */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-stretch">
                    {/* Văn bản mới (Table) */}
                    <section className="lg:col-span-8 xl:col-span-9 flex flex-col">
                        <h2 className="text-[22px] font-bold text-gray-800 mb-4 shrink-0">Văn bản mới</h2>
                        <div className="bg-white rounded border border-gray-200 overflow-hidden flex-1">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 bg-[#155e9e] text-white font-semibold text-[14px] p-3">
                                <div className="col-span-3 lg:col-span-2">Số ký hiệu</div>
                                <div className="col-span-3 lg:col-span-2">Ngày ban hành</div>
                                <div className="col-span-6 lg:col-span-8">Tên văn bản</div>
                            </div>
                            {/* Table Body */}
                            <div className="divide-y divide-gray-200 h-full">
                                {MOCK_NEW_DOCS.map((doc) => (
                                    <div key={doc.id} className="grid grid-cols-12 p-3 text-[14px] hover:bg-gray-50 transition-colors">
                                        <div className="col-span-3 lg:col-span-2 text-gray-600 font-medium">{doc.soHieu}</div>
                                        <div className="col-span-3 lg:col-span-2 text-gray-500">{doc.date}</div>
                                        <div className="col-span-6 lg:col-span-8">
                                            <Link to={`/van-ban/${doc.id}`} className="text-gray-800 hover:text-[#0056b3] transition-colors leading-relaxed">
                                                {doc.title}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Văn bản được xem nhiều */}
                    <section className="lg:col-span-4 xl:col-span-3 flex flex-col">
                        <h2 className="text-[22px] font-bold mb-4 shrink-0 invisible hidden lg:block">Spacer</h2>
                        <div className="bg-white border border-gray-200 rounded overflow-hidden flex-1 flex flex-col">
                            <div className="bg-[#155e9e] text-white p-3.5 flex items-center gap-2 shrink-0">
                                <Eye size={18} />
                                <h3 className="font-bold text-[14px] uppercase tracking-wide">Văn bản được xem nhiều</h3>
                            </div>
                            <ul className="divide-y divide-gray-200 flex-1 overflow-y-auto">
                                {MOCK_POPULAR_DOCS.map((doc, i) => (
                                    <li key={doc.id}>
                                        <Link to={`/van-ban/${doc.id}`} className="block p-3.5 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-[#0056b3] transition-colors leading-relaxed line-clamp-2">
                                            {doc.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Tabs Section (Sắp có hiệu lực / Sắp hết hiệu lực - chiếm hết chiều rộng) */}
                <section>
                    {/* Tabs */}
                    <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-4 gap-1">
                        <button
                            onClick={() => setActiveTab('sap-co-hieu-luc')}
                            className={`flex-1 py-3 px-2 text-center font-bold text-[15px] transition-colors rounded-t ${activeTab === 'sap-co-hieu-luc' ? 'bg-[#0056b3] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-b-0 border-gray-200'}`}
                        >
                            Sắp có hiệu lực trong 30 ngày
                        </button>
                        <button
                            onClick={() => setActiveTab('sap-het-hieu-luc')}
                            className={`flex-1 py-3 px-2 text-center font-bold text-[15px] transition-colors rounded-t ${activeTab === 'sap-het-hieu-luc' ? 'bg-[#0056b3] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-b-0 border-gray-200'}`}
                        >
                            Sắp hết hiệu lực trong 30 ngày
                        </button>
                    </div>

                    {/* List */}
                    <div className="space-y-3">
                        {MOCK_ACTIVE_DOCS.map((doc) => (
                            <div key={doc.id} className="bg-white border border-gray-200 rounded p-4 flex flex-col md:flex-row gap-4 hover:shadow-sm transition-shadow">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start gap-2">
                                        {doc.isNew && (
                                            <span className="bg-[#dc3545] text-white text-[11px] font-bold px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                                                Mới
                                            </span>
                                        )}
                                        <Link to={`/van-ban/${doc.id}`} className="text-[15px] font-medium text-gray-800 hover:text-[#0056b3] leading-relaxed line-clamp-3">
                                            {doc.title}
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                            <FileText size={13} /> PDF
                                        </button>
                                        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                            <Share2 size={13} /> Lược đồ
                                        </button>
                                        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                            <Download size={13} /> Tải về
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full md:w-[200px] shrink-0 text-[12px] border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Trạng thái:</span>
                                        <span className="text-[#d9a406] font-medium text-right">{doc.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Ngày ban hành:</span>
                                        <span className="text-gray-700 text-right">{doc.issueDate}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Ngày hiệu lực:</span>
                                        <span className="text-gray-700 text-right">{doc.effectiveDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VanBanHomePage;

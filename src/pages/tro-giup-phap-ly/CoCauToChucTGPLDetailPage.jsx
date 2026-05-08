import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Users, FileText, Calendar, Building, Briefcase, ChevronRight, Search } from 'lucide-react';
import { MOCK_ORG_UNITS, MOCK_ORG_MEMBERS } from '../../data/mockCoCauToChuc';

const InfoItem = ({ icon: Icon, label, value, isBadge, badgeClass }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
        <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Icon size={16} />
        </div>
        <div className="flex-1">
            <p className="text-[13px] text-gray-500 mb-0.5">{label}</p>
            {isBadge ? (
                <span className={`inline-block px-2.5 py-0.5 rounded text-[12px] font-medium ${badgeClass}`}>
                    {value}
                </span>
            ) : (
                <p className="text-[14px] font-medium text-gray-900">{value}</p>
            )}
        </div>
    </div>
);

const flattenTree = (nodes) => {
    let result = [];
    nodes.forEach(node => {
        result.push(node);
        if (node.children && node.children.length > 0) {
            result = result.concat(flattenTree(node.children));
        }
    });
    return result;
};

const CoCauToChucTGPLDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allUnits = flattenTree(MOCK_ORG_UNITS);
    const unit = allUnits.find(u => u.id === id) || allUnits.find(u => u.id === '7'); // Fallback

    if (!unit) return <div className="text-center py-20">Không tìm thấy đơn vị</div>;

    const filteredMembers = MOCK_ORG_MEMBERS.filter(m => 
        m.tenCanBo.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.maCanBo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMembers.length / pageSize);
    const paginatedMembers = filteredMembers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Minimal Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 py-3 max-w-[1200px] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px] text-gray-500">
                        <Link to="/tro-giup-phap-ly/co-cau-to-chuc" className="hover:text-blue-600 transition-colors">Cơ cấu tổ chức</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">{unit.tenDonVi}</span>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-[14px] transition-colors bg-blue-50 px-3 py-1.5 rounded-full"
                    >
                        <ArrowLeft size={16} /> Quay lại
                    </button>
                </div>
            </div>

            {/* Profile Hero */}
            <div className="bg-gradient-to-r from-[#003399] to-[#00aeef] text-white py-12 relative overflow-hidden shadow-md">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                                Thông tin Đơn vị
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{unit.tenDonVi}</h1>
                            <p className="text-blue-100 font-medium flex items-center gap-2">
                                <Building size={16} /> {unit.donViChuQuan}
                            </p>
                        </div>
                        {unit.trangThai && (
                            <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/50 text-green-100 font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
                                {unit.trangThai}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1200px] -mt-6 relative z-20 space-y-6">
                {/* INFO SECTIONS - STACKED FULL WIDTH */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                        <h3 className="font-bold text-gray-900 text-[16px] border-b border-gray-100 pb-3 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <FileText size={18} className="text-blue-600" /> Tổng quan
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <InfoItem icon={Building} label="Mã đơn vị" value={unit.maDonVi} />
                            <InfoItem icon={Calendar} label="Ngày thành lập" value={unit.ngayThanhLap || '—'} />
                            <InfoItem icon={FileText} label="Số quyết định" value={unit.soQuyetDinh || '—'} />
                            <InfoItem icon={Users} label="Quy mô nhân sự" value={`${unit.soLuongNhanSu || unit.soLuongCanBo} cán bộ`} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                        <h3 className="font-bold text-gray-900 text-[16px] border-b border-gray-100 pb-3 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <Phone size={18} className="text-blue-600" /> Liên hệ
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <InfoItem icon={MapPin} label="Địa chỉ" value={unit.diaChi || 'Chưa cập nhật'} />
                            <InfoItem icon={Phone} label="Số điện thoại" value={unit.soDienThoai || 'Chưa cập nhật'} />
                            <InfoItem icon={Mail} label="Email" value={unit.email || 'Chưa cập nhật'} />
                            <InfoItem icon={Globe} label="Website" value={unit.website || 'Chưa cập nhật'} />
                        </div>
                    </div>
                </div>

                {/* STAFF DIRECTORY - BOTTOM FULL WIDTH */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-gray-900 text-[18px] flex items-center gap-2">
                                <Users size={20} className="text-blue-600" /> Danh sách Cán bộ & Trợ giúp viên
                            </h3>
                            <p className="text-gray-500 text-[13px] mt-1">Tra cứu danh bạ nhân sự thuộc đơn vị</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm tên hoặc mã cán bộ..." 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-blue-500 transition-colors shadow-sm bg-white"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-white text-gray-600 text-[13px] font-bold uppercase tracking-wider border-b border-gray-200">
                                    <th className="py-4 px-6 text-center w-20">STT</th>
                                    <th className="py-4 px-4">Thông tin cán bộ</th>
                                    <th className="py-4 px-4">Mã cán bộ</th>
                                    <th className="py-4 px-4">Chức vụ</th>
                                    <th className="py-4 px-4 text-right">Liên hệ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedMembers.map((member, index) => (
                                    <tr key={member.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                                        <td className="py-5 px-6 text-center text-gray-400 font-medium">
                                            {(currentPage - 1) * pageSize + index + 1}
                                        </td>
                                        <td className="py-5 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[15px] shrink-0">
                                                    {member.tenCanBo.charAt(0)}
                                                </div>
                                                <div className="font-bold text-gray-900 text-[15px] group-hover:text-blue-600 transition-colors">
                                                    {member.tenCanBo}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-4 text-gray-600 text-[14px]">
                                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-[12px]">{member.maCanBo}</span>
                                        </td>
                                        <td className="py-5 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[13px] font-medium border border-blue-100">
                                                <Briefcase size={14} /> {member.chucVu !== '—' ? member.chucVu : 'Cán bộ'}
                                            </span>
                                        </td>
                                        <td className="py-5 px-4 text-right">
                                            <div className="text-[14px] font-medium text-gray-900">{member.sdt || '—'}</div>
                                            <div className="text-[12px] text-gray-500">{member.email || '—'}</div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredMembers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center text-gray-500 italic bg-gray-50/30">
                                            Không tìm thấy cán bộ nào phù hợp với từ khóa tìm kiếm.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <p className="text-[13px] text-gray-500">
                                Hiển thị <span className="font-bold">{(currentPage - 1) * pageSize + 1}</span> - <span className="font-bold">{Math.min(currentPage * pageSize, filteredMembers.length)}</span> trong tổng số <span className="font-bold">{filteredMembers.length}</span> cán bộ
                            </p>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={18} className="rotate-180" />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-9 h-9 rounded border transition-colors text-[14px] font-medium ${
                                            currentPage === i + 1 
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoCauToChucTGPLDetailPage;

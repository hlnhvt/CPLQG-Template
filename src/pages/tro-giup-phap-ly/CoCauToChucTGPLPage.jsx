import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Users, MapPin, Building2, User } from 'lucide-react';
import { MOCK_ORG_UNITS } from '../../data/mockCoCauToChuc';
import TGPLSidebar from '../../components/tro-giup-phap-ly/TGPLSidebar';

const flattenTree = (nodes, level = 0, parentPath = []) => {
    let result = [];
    nodes.forEach(node => {
        const currentPath = [...parentPath, node.id];
        result.push({ ...node, level, path: currentPath });
        if (node.children && node.children.length > 0) {
            result = result.concat(flattenTree(node.children, level + 1, currentPath));
        }
    });
    return result;
};

const CoCauToChucTGPLPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedIds, setExpandedIds] = useState(new Set());

    const flatData = useMemo(() => {
        return flattenTree(MOCK_ORG_UNITS);
    }, []);

    useEffect(() => {
        const initialExpanded = new Set();
        flatData.forEach(node => {
            if (node.children && node.children.length > 0) {
                initialExpanded.add(node.id);
            }
        });
        setExpandedIds(initialExpanded);
        window.scrollTo(0, 0);
    }, [flatData]);

    const toggleExpand = (e, id) => {
        e.stopPropagation();
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

    const visibleRows = flatData.filter(node => {
        for (let i = 0; i < node.path.length - 1; i++) {
            if (!expandedIds.has(node.path[i])) return false;
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesQuery = node.tenDonVi.toLowerCase().includes(query) || node.maDonVi.toLowerCase().includes(query);
            // In a real app, we'd ensure parents of matched items also stay visible, but for simplicity here we just filter visually
            if (!matchesQuery) return false;
        }
        return true;
    });

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-16 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay"></div>
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-900/50 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-sm uppercase ">
                                Về chúng tôi
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight drop-shadow-md">
                            CƠ CẤU TỔ CHỨC
                        </h1>
                        <p className="text-blue-50 text-lg leading-relaxed border-l-4 border-yellow-400 pl-4 py-1 font-medium bg-blue-900/20 rounded-r-lg">
                            Hệ thống mạng lưới Trợ giúp pháp lý toàn quốc.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 max-w-[1200px] -mt-10 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT CONTENT */}
                    <div className="flex-1 space-y-6">

                        {/* Search Bar */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc mã đơn vị..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[15px] outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Directory List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[13px] font-bold uppercase ">
                                            <th className="py-4 px-6 w-[40%]">Cơ quan / Đơn vị</th>
                                            <th className="py-4 px-4 w-[20%]">Người đại diện</th>
                                            <th className="py-4 px-4 w-[25%]">Địa chỉ</th>
                                            <th className="py-4 px-4 text-center">Nhân sự</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleRows.map((row) => {
                                            const hasChildren = row.children && row.children.length > 0;
                                            const isExpanded = expandedIds.has(row.id);

                                            return (
                                                <tr
                                                    key={row.id}
                                                    onClick={() => navigate(`/tro-giup-phap-ly/co-cau-to-chuc/${row.id}`)}
                                                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                                >
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center" style={{ paddingLeft: `${row.level * 28}px` }}>
                                                            {hasChildren ? (
                                                                <button
                                                                    onClick={(e) => toggleExpand(e, row.id)}
                                                                    className="mr-2 text-blue-500 hover:bg-blue-100 w-6 h-6 rounded flex items-center justify-center transition-colors"
                                                                >
                                                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                                </button>
                                                            ) : (
                                                                <span className="w-6 mr-2 inline-block"></span>
                                                            )}
                                                            <div>
                                                                <div className="font-bold text-gray-800 text-[15px] mb-0.5 group-hover:text-blue-600 transition-colors">{row.tenDonVi}</div>
                                                                <div className="flex items-center gap-3 text-[12px] text-gray-500 font-medium">
                                                                    <span className="flex items-center gap-1"><Building2 size={12} /> {row.maDonVi}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                                                <User size={14} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[14px] font-medium text-gray-800">{row.nguoiDaiDien !== '—' ? row.nguoiDaiDien : 'Chưa cập nhật'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-start gap-2 text-[14px] text-gray-600">
                                                            <MapPin size={14} className="mt-1 text-gray-400 shrink-0" />
                                                            <span>{row.diaChi && row.diaChi !== '—' ? row.diaChi : 'Chưa cập nhật'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[13px] font-medium">
                                                            <Users size={14} /> {row.soLuongCanBo !== '—' ? row.soLuongCanBo : '0'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {visibleRows.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="py-12 text-center text-gray-500">
                                                    Không tìm thấy kết quả phù hợp.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="lg:w-[320px] shrink-0">
                        <TGPLSidebar />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CoCauToChucTGPLPage;

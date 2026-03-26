import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Star, Clock, Calendar, ChevronRight, User, Shield, Briefcase, PlayCircle, PhoneCall, Filter } from 'lucide-react';

const MOCK_EXPERTS = [
    { id: 1, name: 'Ls. Hoàng Ngọc Cường', role: 'Luật sư - Đoàn Luật sư TP. Hà Nội', avatar: '/images/experts/expert_avatar_1.png', domains: ['Đất đai', 'Dân sự', 'Hành chính'], rating: 4.9, reviews: 120, sessions: 350, available: true, methods: ['Gặp trực tiếp', 'Video call'] },
    { id: 2, name: 'Ts. Trần Thị Thu Thủy', role: 'Tiến sĩ Luật - Đại học Luật HN', avatar: '/images/experts/expert_avatar_2.png', domains: ['Doanh nghiệp', 'Sở hữu trí tuệ'], rating: 4.8, reviews: 85, sessions: 210, available: true, methods: ['Video call', 'Điện thoại'] },
    { id: 3, name: 'Ls. Nguyễn Hải Đăng', role: 'Luật sư cao cấp', avatar: '/images/experts/expert_avatar_3.png', domains: ['Hình sự', 'Dân sự'], rating: 4.7, reviews: 156, sessions: 420, available: false, methods: ['Gặp trực tiếp'] },
    { id: 4, name: 'Ths. Lê Cẩm Phương', role: 'Chuyên viên pháp lý cấp cao', avatar: '/images/experts/expert_avatar_4.png', domains: ['Lao động', 'Bảo hiểm'], rating: 4.9, reviews: 65, sessions: 180, available: true, methods: ['Video call', 'Điện thoại'] },
    { id: 5, name: 'Ls. Phạm Việt Hoàng', role: 'Luật sư điều hành - V&H Law', avatar: '/images/experts/expert_avatar_5.png', domains: ['Đầu tư', 'Thương mại quốc tế'], rating: 5.0, reviews: 42, sessions: 110, available: true, methods: ['Gặp trực tiếp', 'Video call'] },
];

const ChuyenGiaListPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleBookClick = (expertId) => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: `/cau-hoi-phap-luat/chuyen-gia/${expertId}` } });
        } else {
            navigate(`/cau-hoi-phap-luat/chuyen-gia/${expertId}`);
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/cau-hoi-phap-luat" className="hover:text-[#0f4c81]">Hỏi đáp pháp luật</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Tư vấn chuyên gia</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#1a3b8b] text-white py-14">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Danh sách chuyên gia tư vấn</h1>
                    <p className="text-blue-100 text-lg mb-8">
                        Lựa chọn chuyên gia pháp lý phù hợp và đặt lịch tư vấn trực tiếp 1:1 qua Video, điện thoại hoặc gặp mặt trực tiếp.
                    </p>
                    <div className="relative max-w-2xl mx-auto shadow-2xl">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên chuyên gia hoặc đơn vị..."
                            className="w-full h-14 rounded-xl pl-5 pr-14 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        />
                        <button className="absolute right-2 top-2 h-10 w-10 bg-[#0f4c81] text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Advanced Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 font-bold text-gray-700">
                        <Filter size={20} className="text-[#0f4c81]" /> Bộ lọc tìm kiếm
                    </div>
                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <select className="border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm font-medium outline-none focus:border-[#0f4c81] flex-1 md:w-48">
                            <option>Tất cả lĩnh vực</option>
                            <option>Dân sự</option>
                            <option>Hình sự</option>
                            <option>Doanh nghiệp</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg p-2.5 bg-gray-50 text-sm font-medium outline-none focus:border-[#0f4c81] flex-1 md:w-48">
                            <option>Tất cả trạng thái</option>
                            <option>Còn lịch trống</option>
                            <option>Không còn lịch</option>
                        </select>
                    </div>
                </div>

                {/* Expert Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_EXPERTS.map(expert => (
                        <div key={expert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
                            <div className="p-6 text-center border-b border-gray-50 relative">
                                {expert.available ? (
                                    <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Còn lịch trống
                                    </div>
                                ) : (
                                    <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">
                                        Kín lịch
                                    </div>
                                )}
                                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex justify-center items-center overflow-hidden">
                                    {expert.avatar ? (
                                        <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} className="text-gray-300" />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-[#0f4c81] mb-1 group-hover:text-blue-600 transition">
                                    {expert.name}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 line-clamp-1">{expert.role}</p>

                                <div className="flex justify-center items-center gap-1 mt-3">
                                    <Star size={16} className="fill-amber-400 text-amber-400" />
                                    <span className="font-bold text-gray-800">{expert.rating}</span>
                                    <span className="text-xs text-gray-400">({expert.reviews} đánh giá)</span>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col bg-gray-50/30">
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lĩnh vực chuyên môn</p>
                                    <div className="flex flex-wrap gap-2">
                                        {expert.domains.map((d, i) => (
                                            <span key={i} className="bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md text-xs font-bold">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Hình thức tư vấn</p>
                                    <div className="flex gap-4">
                                        {expert.methods.map((m, i) => (
                                            <div key={i} className="flex items-center gap-1.5 text-sm text-[#0f4c81] font-medium bg-blue-50 px-2 rounded">
                                                {m === 'Video call' && <PlayCircle size={14} />}
                                                {m === 'Điện thoại' && <PhoneCall size={14} />}
                                                {m === 'Gặp trực tiếp' && <Briefcase size={14} />}
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 flex gap-3">
                                    <Link to={`/cau-hoi-phap-luat/chuyen-gia/${expert.id}`} className="flex-1 text-[#0f4c81] border border-[#0f4c81] text-center font-bold py-2.5 rounded-lg hover:bg-blue-50 transition">
                                        Hồ sơ
                                    </Link>
                                    <button
                                        onClick={() => handleBookClick(expert.id)}
                                        disabled={!expert.available}
                                        className="flex-1 bg-[#0f4c81] text-white font-bold py-2.5 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0f4c81] shadow-sm flex items-center justify-center gap-2"
                                    >
                                        <Calendar size={18} /> Đặt lịch
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border rounded-lg text-gray-400 bg-white font-bold cursor-not-allowed">Trang trước</button>
                        <button className="px-4 py-2 border rounded-lg bg-[#0f4c81] text-white font-bold shadow-md">1</button>
                        <button className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-bold transition">2</button>
                        <button className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-bold transition">3</button>
                        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-bold transition">Trang sau</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChuyenGiaListPage;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    MapPin, Building2, Calendar, Clock, Star, Award,
    Heart, MessageSquare, BookOpen, Shield, ChevronRight
} from 'lucide-react';

/* ──── MOCK DATA ──── */
const MOCK_USERS = {
    '1': {
        id: '1',
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        role: 'Thành viên',
        roleColor: 'bg-blue-100 text-blue-700',
        badge: null,
        verified: false,
        joinDate: '07/02/2022',
        lastActive: '2 giờ trước',
        workplace: 'Công ty TNHH ABC',
        location: 'Hà Nội',
        bio: 'Chuyên viên pháp chế tại doanh nghiệp. Quan tâm đến các lĩnh vực Luật Doanh nghiệp, Lao động và Sở hữu trí tuệ.',
        stats: { posts: 141, reactions: 113, points: 43, contributions: 8 },
        expertise: ['Luật Doanh nghiệp', 'Lao động', 'Hợp đồng'],
    },
    '2': {
        id: '2',
        name: 'Luật sư Lê Văn C',
        username: 'ls-levanc',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        role: 'Luật sư',
        roleColor: 'bg-emerald-100 text-emerald-700',
        badge: 'Chuyên gia',
        verified: true,
        joinDate: '15/05/2021',
        lastActive: '10 phút trước',
        workplace: 'Đoàn Luật sư Hà Nội',
        location: 'Hà Nội',
        bio: 'Luật sư thành viên Đoàn Luật sư TP. Hà Nội. Hơn 10 năm kinh nghiệm tư vấn pháp luật doanh nghiệp, đầu tư và bất động sản.',
        stats: { posts: 342, reactions: 1205, points: 850, contributions: 47 },
        expertise: ['Doanh nghiệp', 'Bất động sản', 'Đầu tư', 'Tranh tụng'],
    },
};

const DEFAULT_USER = {
    id: 'unknown', name: 'Người dùng', username: 'unknown',
    avatar: null, role: 'Thành viên', roleColor: 'bg-gray-100 text-gray-600',
    badge: null, verified: false, joinDate: 'N/A', lastActive: 'N/A',
    workplace: '', location: '', bio: '',
    stats: { posts: 0, reactions: 0, points: 0, contributions: 0 },
    expertise: [],
};

const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    return parts[parts.length - 1].charAt(0).toUpperCase();
};

/* ──── COMPONENT ──── */
const PublicUserProfilePage = () => {
    const { id } = useParams();
    const user = MOCK_USERS[id] || DEFAULT_USER;

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            {/* Breadcrumb */}
            <div className="bg-white border-b shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-2">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span>/</span>
                        <Link to="/dien-dan" className="hover:text-[#0f4c81]">Diễn đàn</Link>
                        <span>/</span>
                        <span className="text-[#0f4c81] font-bold">Hồ sơ thành viên</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-4xl">

                {/* ══ PROFILE HEADER CARD ══ */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">

                    {/* Banner */}
                    <div className="h-40 bg-gradient-to-r from-[#0a1e3f] to-[#1a3b8b] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                        {/* Decorative orbs */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-500 blur-3xl opacity-20 pointer-events-none" />
                        <div className="absolute -bottom-8 left-1/3 w-32 h-32 rounded-full bg-indigo-400 blur-2xl opacity-20 pointer-events-none" />
                    </div>

                    {/* Avatar row — overlaps banner */}
                    <div className="px-6 pb-5">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
                            {/* Left: Avatar + Name */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                                {/* Avatar */}
                                <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-gray-200 shrink-0">
                                    {user.avatar
                                        ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"
                                            onError={(e) => { e.target.style.display = 'none'; }} />
                                        : <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white bg-[#1a3b8b]">
                                            {getInitials(user.name)}
                                          </div>
                                    }
                                </div>

                                {/* Name + role + meta */}
                                <div className="pb-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                        <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
                                        {user.verified && (
                                            <span className="flex items-center gap-1 text-[11px] font-bold bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                                                ✓ Đã xác minh
                                            </span>
                                        )}
                                        {user.badge && (
                                            <span className="flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                                                <Star size={11} className="fill-amber-400 text-amber-400" /> {user.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-[14px] font-medium mb-1">{user.role}</p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-gray-400">
                                        {user.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin size={13} /> {user.location}
                                            </span>
                                        )}
                                        {user.lastActive && (
                                            <span className="flex items-center gap-1">
                                                <Clock size={13} /> Hoạt động {user.lastActive}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Workplace badge */}
                            {user.workplace && (
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] shrink-0 mb-1">
                                    <div className="w-7 h-7 rounded bg-[#1a3b8b] flex items-center justify-center shrink-0">
                                        <Building2 size={14} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-[13px] leading-tight">{user.workplace}</p>
                                        <p className="text-[11px] text-gray-400">Đơn vị công tác</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ══ DETAIL GRID ══ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left: About + Stats */}
                    <div className="md:col-span-1 space-y-5">

                        {/* Stats */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Thống kê hoạt động</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Bài viết',    value: user.stats.posts,          icon: <MessageSquare size={15} />, color: 'bg-blue-50 text-blue-600' },
                                    { label: 'Điểm uy tín', value: user.stats.points,          icon: <Award size={15} />,         color: 'bg-amber-50 text-amber-600' },
                                    { label: 'Lượt thích',  value: user.stats.reactions,       icon: <Heart size={15} />,          color: 'bg-red-50 text-red-600' },
                                    { label: 'Góp ý',       value: user.stats.contributions,   icon: <BookOpen size={15} />,       color: 'bg-emerald-50 text-emerald-600' },
                                ].map((s) => (
                                    <div key={s.label} className="flex flex-col items-center bg-gray-50 rounded-lg p-3 gap-1">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${s.color}`}>{s.icon}</div>
                                        <div className="text-lg font-black text-gray-800 tabular-nums">{s.value.toLocaleString()}</div>
                                        <div className="text-[11px] text-gray-500 font-medium">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Expertise */}
                        {user.expertise.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <Shield size={13} className="text-[#1a3b8b]" /> Lĩnh vực chuyên môn
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.expertise.map((tag) => (
                                        <span key={tag} className="text-[12px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Bio + Details */}
                    <div className="md:col-span-2 space-y-5">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4">Giới thiệu</h3>

                            {user.bio && (
                                <p className="text-[14.5px] text-gray-700 leading-relaxed mb-5 border-l-4 border-blue-100 pl-4 italic">
                                    "{user.bio}"
                                </p>
                            )}

                            <div className="space-y-3 text-[14px]">
                                {user.workplace && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Building2 size={16} className="text-gray-400 shrink-0" />
                                        <span>Công tác tại <strong className="text-gray-800">{user.workplace}</strong></span>
                                    </div>
                                )}
                                {user.location && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin size={16} className="text-gray-400 shrink-0" />
                                        <span>{user.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar size={16} className="text-gray-400 shrink-0" />
                                    <span>Tham gia từ <strong className="text-gray-800">{user.joinDate}</strong></span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock size={16} className="text-gray-400 shrink-0" />
                                    <span>Hoạt động lần cuối: <strong className="text-gray-800">{user.lastActive}</strong></span>
                                </div>
                            </div>
                        </div>

                        {/* Privacy notice */}
                        <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 text-[13px] text-gray-500">
                            <Shield size={16} className="text-gray-400 shrink-0 mt-0.5" />
                            <p>Thông tin hoạt động chi tiết của thành viên này được bảo mật theo chính sách quyền riêng tư của Cổng Pháp luật Quốc gia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicUserProfilePage;

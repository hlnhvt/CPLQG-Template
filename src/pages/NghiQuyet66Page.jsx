import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, FileText, Users, Briefcase, BookOpen, Building } from 'lucide-react';

const MEMBERS = [
    { name: "Đồng chí Tô Lâm", role: "Tổng Bí thư, Chủ tịch nước", title: "Trưởng ban", group: "head" },
    { name: "Đồng chí Phạm Minh Chính", role: "Ủy viên Bộ Chính trị, Thủ tướng Chính phủ", title: "Phó Trưởng ban", group: "deputy" },
    { name: "Đồng chí Trần Thanh Mẫn", role: "Ủy viên Bộ Chính trị, Chủ tịch Quốc hội", title: "Phó Trưởng ban", group: "deputy" },
    { name: "Đồng chí Phan Đình Trạc", role: "Ủy viên Bộ Chính trị, Bí thư Trung ương Đảng, Trưởng ban Nội chính Trung ương, Phó Trưởng ban Thường trực Ban Chỉ đạo Cải cách tư pháp Trung ương", title: "Thành viên", group: "member" },
    { name: "Đồng chí Lê Minh Hưng", role: "Ủy viên Bộ Chính trị, Bí thư Trung ương Đảng, Trưởng ban Tổ chức Trung ương", title: "Thành viên", group: "member" },
    { name: "Đồng chí Trịnh Văn Quyết", role: "Ủy viên Bộ Chính trị, Bí thư Trung ương Đảng, Chủ nhiệm Tổng cục Chính trị Quân đội nhân dân Việt Nam", title: "Thành viên", group: "member" },
    { name: "Đồng chí Trần Sỹ Thanh", role: "Ủy viên Bộ Chính trị, Phó Bí thư Thành ủy, Chủ tịch UBND TP Hà Nội", title: "Thành viên", group: "member" },
    { name: "Đồng chí Nguyễn Thanh Nghị", role: "Ủy viên Bộ Chính trị, Bí thư Thành ủy TP HCM", title: "Thành viên", group: "member" },
    { name: "Đồng chí Bùi Thị Minh Hoài", role: "Ủy viên Bộ Chính trị, Bí thư Thành ủy Hà Nội", title: "Thành viên", group: "member" },
    { name: "Đồng chí Phan Văn Giang", role: "Ủy viên Bộ Chính trị, Bộ trưởng Bộ Quốc phòng", title: "Thành viên", group: "member" },
    { name: "Đồng chí Lương Tam Quang", role: "Ủy viên Bộ Chính trị, Bộ trưởng Bộ Công an", title: "Thành viên", group: "member" },
    { name: "Đồng chí Nguyễn Duy Ngọc", role: "Bí thư Trung ương Đảng, Chánh Văn phòng Trung ương Đảng", title: "Thành viên", group: "member" },
    { name: "Đồng chí Hồ Quốc Dũng", role: "Bí thư Trung ương Đảng, Viện trưởng Viện Kiểm sát nhân dân tối cao", title: "Thành viên", group: "member" },
    { name: "Đồng chí Lê Thành Long", role: "Bí thư Trung ương Đảng, Phó Thủ tướng Chính phủ", title: "Thành viên", group: "member" },
    { name: "Đồng chí Bùi Thanh Sơn", role: "Ủy viên Trung ương Đảng, Phó Thủ tướng Chính phủ, Bộ trưởng Bộ Ngoại giao", title: "Thành viên", group: "member" },
    { name: "Đồng chí Nguyễn Hải Ninh", role: "Ủy viên Trung ương Đảng, Bộ trưởng Bộ Tư pháp", title: "Thành viên", group: "member" }
];

const TABS = [
    { id: 'toan-van', label: 'Toàn văn', icon: FileText },
    { id: 'ban-chi-dao', label: 'Ban chỉ đạo', icon: Users },
    { id: 'to-bien-tap', label: 'Tổ biên tập', icon: BookOpen },
    { id: 'to-chuyen-gia', label: 'Tổ chuyên gia', icon: Briefcase },
    { id: 'co-quan-thuong-truc', label: 'Cơ quan thường trực', icon: Building },
];

const NghiQuyet66Page = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabFromUrl || 'ban-chi-dao');

    useEffect(() => {
        if (tabFromUrl && TABS.find(t => t.id === tabFromUrl)) {
            setActiveTab(tabFromUrl);
        } else {
            setSearchParams({ tab: 'ban-chi-dao' }, { replace: true });
        }
    }, [tabFromUrl, setSearchParams]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSearchParams({ tab: tabId });
    };

    const renderBanChiDao = () => {
        const heads = MEMBERS.filter(m => m.group === 'head');
        const deputies = MEMBERS.filter(m => m.group === 'deputy');
        const members = MEMBERS.filter(m => m.group === 'member');

        const Card = ({ member, isHead = false, isDeputy = false }) => {
            // Logic to match the text hierarchy on the real site
            let topRole = member.title === 'Thành viên' ? 'Đồng chí' : member.role.split(',')[0];
            if (isHead) topRole = 'Tổng Bí thư, Chủ tịch nước';
            else if (member.name.includes('Phạm Minh Chính')) topRole = 'Đồng chí';
            else if (member.name.includes('Trần Thanh Mẫn')) topRole = 'Chủ tịch Quốc hội';

            let desc = member.role + (member.title !== 'Thành viên' ? `, ${member.title}` : '');
            if (isHead) desc = 'Tổng Bí thư Ban Chấp hành Trung ương Đảng, Chủ tịch nước Cộng hòa xã hội chủ nghĩa Việt nam, Trưởng Ban Chỉ đạo';
            else if (member.name.includes('Phạm Minh Chính')) desc = 'Phó trưởng ban Chỉ đạo';
            else if (member.name.includes('Trần Thanh Mẫn')) desc = 'Uỷ viên Bộ Chính trị, Chủ tịch Quốc hội, Phó Trưởng Ban Chỉ đạo';

            return (
                <div className={`flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isHead ? 'max-w-[360px]' : isDeputy ? 'max-w-[320px]' : 'max-w-[280px]'}`}>
                    <div className="relative w-full pt-[120%] bg-[#F8F9FA]">
                        <div className="absolute inset-0 w-full h-full object-cover">
                            {/* In a real scenario, use <img src="..." className="absolute inset-0 w-full h-full object-cover" /> */}
                            <UserAvatar name={member.name} />
                        </div>
                    </div>
                    <div className={`bg-[#002B66] p-5 text-center flex flex-col justify-center items-center flex-grow ${isHead ? 'min-h-[160px] p-6' : 'min-h-[150px]'}`}>
                        <div className={`text-[#E5B800] font-semibold uppercase tracking-wider mb-1 ${isHead ? 'text-sm mb-2' : 'text-xs'}`}>
                            {topRole}
                        </div>
                        <div className={`text-white font-bold uppercase mb-2 ${isHead ? 'text-xl mb-3' : 'text-lg'}`}>
                            {member.name.replace('Đồng chí ', '')}
                        </div>
                        <div className="text-white/80 text-xs leading-relaxed max-w-[90%]">
                            {desc}
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className="animate-fadeIn bg-[#F4F6F9] py-10 rounded-3xl mt-2 border border-gray-100 shadow-inner">
                <div className="text-center mb-10 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4 uppercase">Danh sách Ban Chỉ đạo</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto italic">
                        Ban Chỉ đạo Trung ương về đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới
                    </p>
                </div>

                {/* Trưởng ban */}
                <div className="flex justify-center mb-10 w-full px-4">
                    {heads.map((m, i) => <Card key={i} member={m} isHead={true} />)}
                </div>

                {/* Phó Trưởng ban */}
                <div className="flex flex-wrap justify-center gap-8 mb-10 w-full px-4">
                    {deputies.map((m, i) => (
                        <Card key={i} member={m} isDeputy={true} />
                    ))}
                </div>

                {/* Thành viên */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center w-full px-4 md:px-8">
                    {members.map((m, i) => (
                        <Card key={i} member={m} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Banner */}
            <div className="relative pt-8 pb-16 overflow-hidden bg-[#0f172a]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
                
                <div className="container mx-auto px-4 relative z-10 max-w-[1280px]">
                    <nav className="flex items-center gap-1.5 text-gray-300 text-[13px] mb-8">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Nghị quyết 66</span>
                    </nav>

                    <div className="max-w-4xl">
                        <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            Văn kiện Trung ương
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Nghị quyết số 66-NQ/TW
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                            Về đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1280px]">
                    <div className="flex overflow-x-auto hide-scrollbar">
                        <div className="flex space-x-2 md:space-x-8">
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                            isActive
                                                ? 'border-[#1e3a8a] text-[#1e3a8a]'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon size={16} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 max-w-[1280px] py-10">
                {activeTab === 'ban-chi-dao' && renderBanChiDao()}
                
                {activeTab !== 'ban-chi-dao' && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm animate-fadeIn">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            {React.createElement(TABS.find(t => t.id === activeTab)?.icon || FileText, { size: 24 })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Nội dung đang được cập nhật</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Dữ liệu cho mục "{TABS.find(t => t.id === activeTab)?.label}" hiện đang được biên soạn và sẽ sớm được công bố.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Simple Avatar Component since we don't have real images
const UserAvatar = ({ name }) => {
    const initials = name
        .replace('Đồng chí ', '')
        .split(' ')
        .map(n => n[0])
        .slice(-2)
        .join('');
    
    return (
        <div className="w-full h-full bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] text-white flex items-center justify-center text-2xl font-bold uppercase">
            {initials}
        </div>
    );
};

export default NghiQuyet66Page;

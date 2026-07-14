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
    { id: 'ban-chi-dao', label: 'Ban Chỉ đạo TW về hoàn thiện thể chế và thực thi pháp luật' },
    { id: 'van-ban-trien-khai', label: 'Văn bản triển khai' },
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

    const renderVanBanTrienKhai = () => {
        const MOCK_DOCS = [
            {
                title: 'Nan test 2/7',
                desc: 'a b c d e g',
                date: '02/07/2026',
                time: '16:31',
                image: '/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg'
            },
            {
                title: 'T test 2/7',
                desc: '',
                date: '02/07/2026',
                time: '10:42',
                image: '/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg'
            },
            {
                title: 'Law amending and supplementing a number of articles of the Law on Pharmacy',
                desc: 'The Ministry of Health has drafted a Law amending and supplementing a number of articles of the Law on Pharmacy to address current shortcomings in...',
                date: '01/07/2026',
                time: '09:15',
                image: '/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg'
            },
            {
                title: 'Thảo test toàn văn nghị quyết 9/6',
                desc: 's',
                date: '09/06/2026',
                time: '15:41',
                image: '/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg'
            },
            {
                title: 'Chương trình công tác năm 2025 của Ban Chỉ đạo Trung ương về hoàn thiện thể chế, pháp luật',
                desc: 'Căn cứ Quy định số 297-QĐ/TW, ngày 04/6/2025 của Bộ Chính trị về chức năng, nhiệm vụ, quyền hạn, chế độ làm việc, quan hệ công tác của Ban Chỉ đạo...',
                date: '12/06/2025',
                time: '03:57',
                image: '/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg'
            },
            {
                title: 'TOÀN VĂN: Nghị quyết 140/NQ-CP về Chương trình hành động của Chính phủ thực hiện đổi mới công tác xây dựng và thi hành pháp luật',
                desc: 'Năm 2025, cơ bản hoàn thành việc tháo gỡ những "điểm nghẽn" do quy định pháp luật Chương trình nhằm tổ chức thể chế hóa và thực hiện đầy đủ các quan...',
                date: '29/05/2025',
                time: '17:08',
                image: '/images/800-800-dua-nghi-quyet-dai-hoi-xiv-cua-dang-vao-cuoc-song.jpg'
            }
        ];

        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fadeIn mt-2">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#003366] mb-3">Tài liệu Nghị quyết số 66-NQ/TW và các văn bản liên quan</h2>
                    <p className="text-gray-500 text-sm">
                        Các tài liệu, văn bản chính thức liên quan đến Nghị quyết số 66-NQ/TW về hoàn thiện thể chế, pháp luật
                    </p>
                </div>
                
                <div className="flex flex-col">
                    {MOCK_DOCS.map((doc, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-5 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <div className="w-full md:w-[280px] h-[160px] shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                <img src={doc.image} alt={doc.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center py-2 flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#0066FF] cursor-pointer transition-colors">
                                    {doc.title}
                                </h3>
                                {doc.desc && (
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                        {doc.desc}
                                    </p>
                                )}
                                <div className="mt-auto flex items-center text-xs font-medium text-gray-400 gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                                        <span>{doc.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        <span>{doc.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                    <div className="flex gap-2 items-center">
                        <button className="px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-400 cursor-not-allowed">Trước</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#0066FF] text-white font-medium text-sm shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm">2</button>
                        <button className="px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Sau</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Banner */}
            <div className="relative pt-8 pb-8 bg-gradient-to-b from-[#e8f1fc] to-white border-b border-gray-200/60 shadow-sm">
                <div className="container mx-auto px-4 max-w-[1280px]">
                    <h1 className="text-[#003366] text-lg md:text-xl font-bold leading-relaxed max-w-6xl">
                        Nghị quyết số 66-NQ/TW ngày 30/4/2025 của Bộ Chính trị về đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới
                    </h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white sticky top-0 z-40">
                <div className="container mx-auto px-4 max-w-[1280px] py-4">
                    <div className="flex items-center space-x-2 md:space-x-4 p-2 bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto hide-scrollbar">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`font-medium text-[15px] whitespace-nowrap transition-all px-6 py-2.5 rounded-full ${
                                        isActive
                                            ? 'bg-[#0066FF] text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 bg-transparent'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 max-w-[1280px] py-6">
                {activeTab === 'ban-chi-dao' && renderBanChiDao()}
                {activeTab === 'van-ban-trien-khai' && renderVanBanTrienKhai()}
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

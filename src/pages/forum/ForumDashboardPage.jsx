import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Home, ChevronRight, BarChart2, Filter, Download,
    FileText, MessageSquare, Edit3, Eye, Users,
    TrendingUp, TrendingDown, Calendar, Search, UserPlus, CheckCircle
} from 'lucide-react';
import { MOCK_TOPICS } from '../../data/mockForumData';
import LivestreamRegistrationModal from '../../components/LivestreamRegistrationModal';

const KpiCard = ({ title, value, delta, deltaType, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-110 ${colorClass}`}></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
                <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
                <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
            </div>
        </div>
        <div className="flex items-center gap-1.5 relative z-10 text-sm font-medium">
            {deltaType === 'up' ? (
                <span className="flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><TrendingUp size={14} className="mr-1" /> {delta}</span>
            ) : (
                <span className="flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded-full"><TrendingDown size={14} className="mr-1" /> {delta}</span>
            )}
            <span className="text-gray-400">so với kỳ trước</span>
        </div>
    </div>
);

// Mock data for the chart
const chartData = [
    { day: '01/03', topics: 12, comments: 45 },
    { day: '05/03', topics: 19, comments: 80 },
    { day: '10/03', topics: 15, comments: 65 },
    { day: '15/03', topics: 25, comments: 110 },
    { day: '20/03', topics: 22, comments: 90 },
    { day: '25/03', topics: 30, comments: 135 },
    { day: '30/03', topics: 18, comments: 75 },
];

const ForumDashboardPage = () => {
    const [dateRange, setDateRange] = useState('30days');
    const [selectedForum, setSelectedForum] = useState('all');

    // Registration State
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationModalState, setRegistrationModalState] = useState({
        isOpen: false,
        eventTitle: 'Đăng ký tham gia chuyên mục: Diễn đàn Pháp luật'
    });

    // Simple manual chart rendering
    const maxComments = Math.max(...chartData.map(d => d.comments));

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-12">
            {/* Breadcrumb & Header Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link to="/" className="hover:text-blue-600"><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <Link to="/dien-dan" className="hover:text-blue-600">Diễn đàn</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-medium">Thống kê</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-[#1e3a8a]">
                            <BarChart2 className="text-blue-600" />
                            Thống kê Diễn đàn
                        </h1>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Filters */}
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <Filter size={16} className="text-gray-400 ml-2" />
                                <select
                                    className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 py-1.5 pr-2"
                                    value={selectedForum}
                                    onChange={(e) => setSelectedForum(e.target.value)}
                                >
                                    <option value="all">Tất cả diễn đàn</option>
                                    <option value="1">Luật Doanh nghiệp</option>
                                    <option value="2">Luật Đất đai</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <Calendar size={16} className="text-gray-400 ml-2" />
                                <select
                                    className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 py-1.5 pr-2"
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <option value="7days">7 ngày qua</option>
                                    <option value="30days">30 ngày qua</option>
                                    <option value="3months">3 tháng qua</option>
                                </select>
                            </div>

                            <button className="flex items-center gap-2 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                                <Download size={16} /> Xuất báo cáo
                            </button>

                            {/* Registration Button */}

                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <KpiCard title="Tổng chủ đề" value="12,345" delta="+234" deltaType="up" icon={FileText} colorClass="bg-blue-500" />
                    <KpiCard title="Tổng bình luận" value="45,678" delta="+1,024" deltaType="up" icon={MessageSquare} colorClass="bg-green-500" />
                    <KpiCard title="Góp ý, phản biện" value="3,456" delta="-12" deltaType="down" icon={Edit3} colorClass="bg-orange-500" />
                    <KpiCard title="Tổng lượt xem" value="1.2M" delta="+250K" deltaType="up" icon={Eye} colorClass="bg-purple-500" />
                    <KpiCard title="Thành viên tham gia" value="8,901" delta="+450" deltaType="up" icon={Users} colorClass="bg-indigo-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Chart Mock */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-lg text-gray-800">Hoạt động theo thời gian</h2>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Chủ đề</div>
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"></div> Bình luận</div>
                            </div>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-2 pt-6 border-b border-gray-200">
                            {chartData.map((d, i) => (
                                <div key={i} className="flex flex-col items-center justify-end w-full group relative">
                                    <div className="absolute opacity-0 group-hover:opacity-100 -top-12 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none z-10">
                                        {d.topics} Chủ đề | {d.comments} Bình luận
                                    </div>
                                    <div className="flex items-end gap-1 w-full justify-center">
                                        <div
                                            className="w-1/3 bg-blue-500 rounded-t-sm hover:brightness-110 transition-all"
                                            style={{ height: `${(d.topics / maxComments) * 100}%` }}
                                        ></div>
                                        <div
                                            className="w-1/3 bg-green-500 rounded-t-sm hover:brightness-110 transition-all"
                                            style={{ height: `${(d.comments / maxComments) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2">{d.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-lg text-gray-800">Top người dùng đóng góp</h2>
                            <select className="text-sm font-medium text-blue-600 bg-blue-50 rounded-md outline-none px-2 py-1">
                                <option>Tháng này</option>
                                <option>Tuần này</option>
                            </select>
                        </div>
                        <div className="flex-grow space-y-4">
                            {[
                                { name: "Luật sư Lê Văn C", role: "Chuyên gia", comments: 120, contribs: 45, score: 980 },
                                { name: "Nguyễn Thị D", role: "Cộng đồng", comments: 85, contribs: 12, score: 650 },
                                { name: "Trần Hữu E", role: "Luật sư", comments: 60, contribs: 30, score: 540 },
                                { name: "Phạm Văn F", role: "Cơ quan NN", comments: 40, contribs: 25, score: 410 },
                            ].map((user, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center font-bold text-indigo-700">
                                            {user.name.split(' ').pop().charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{user.role}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-yellow-600">{user.score} đ</p>
                                        <p className="text-xs text-gray-500">{user.contribs} góp ý</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Topics Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg text-gray-800">Top chủ đề nổi bật</h2>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm chủ đề..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:bg-white transition-colors" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-sm text-gray-500">
                                    <th className="pb-3 font-medium px-4 w-12">Hạng</th>
                                    <th className="pb-3 font-medium min-w-[300px]">Tiêu đề chủ đề</th>
                                    <th className="pb-3 font-medium">Lĩnh vực</th>
                                    <th className="pb-3 font-medium text-right">Lượt xem</th>
                                    <th className="pb-3 font-medium text-right">Bình luận</th>
                                    <th className="pb-3 font-medium text-right">Ngày đăng</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {MOCK_TOPICS.map((topic, idx) => (
                                    <tr key={topic.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                                                ${idx === 0 ? 'bg-yellow-100 text-yellow-600' :
                                                    idx === 1 ? 'bg-gray-200 text-gray-600' :
                                                        idx === 2 ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}>
                                                {idx + 1}
                                            </div>
                                        </td>
                                        <td className="py-4 font-semibold text-gray-800 pr-4">
                                            <Link to={`/dien-dan/bai-viet/${topic.id}`} className="hover:text-blue-600 transition-colors line-clamp-2">
                                                {topic.title}
                                            </Link>
                                        </td>
                                        <td className="py-4 text-gray-500">
                                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{topic.tags[0]}</span>
                                        </td>
                                        <td className="py-4 text-right font-medium text-gray-700">{topic.views.toLocaleString()}</td>
                                        <td className="py-4 text-right font-medium text-gray-700">{topic.comments.toLocaleString()}</td>
                                        <td className="py-4 text-right text-gray-500">{topic.createdAt}</td>
                                    </tr>
                                ))}
                                {/* Mocking a few more rows since MOCK_TOPICS only has 2 */}
                                {[3, 4, 5].map(id => (
                                    <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4"><div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-gray-400">{id}</div></td>
                                        <td className="py-4 font-semibold text-gray-800 pr-4"><Link to="#" className="hover:text-blue-600">Thủ tục kê khai thuế thu nhập cá nhân {2024 - id}</Link></td>
                                        <td className="py-4 text-gray-500"><span className="bg-gray-100 px-2 py-1 rounded text-xs">Thuế</span></td>
                                        <td className="py-4 text-right font-medium text-gray-700">{(1200 - id * 100).toLocaleString()}</td>
                                        <td className="py-4 text-right font-medium text-gray-700">{30 - id}</td>
                                        <td className="py-4 text-right text-gray-500">10/03/2024</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            <LivestreamRegistrationModal
                isOpen={registrationModalState.isOpen}
                onClose={() => setRegistrationModalState(prev => ({ ...prev, isOpen: false }))}
                onRegister={() => setIsRegistered(true)}
                eventTitle={registrationModalState.eventTitle}
            />
        </div>
    );
};

export default ForumDashboardPage;

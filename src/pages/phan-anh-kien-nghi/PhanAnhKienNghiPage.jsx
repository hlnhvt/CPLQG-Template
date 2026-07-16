import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Clock, Search, Send, ExternalLink, HelpCircle, FileText, CheckCircle2, RotateCw, Filter, RefreshCcw, ArrowRight, FileSpreadsheet, FileText as FilePdf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList, Legend } from 'recharts';
import * as XLSX from 'xlsx';

const MOCK_STATS_LINH_VUC = [
    { name: 'Đất đai', daXuLy: 600, dangXuLy: 45 },
    { name: 'Xây dựng', daXuLy: 450, dangXuLy: 30 },
    { name: 'Giao thông', daXuLy: 320, dangXuLy: 20 },
    { name: 'Môi trường', daXuLy: 280, dangXuLy: 15 },
    { name: 'Y tế', daXuLy: 250, dangXuLy: 10 },
    { name: 'Giáo dục', daXuLy: 210, dangXuLy: 12 },
    { name: 'Kinh tế', daXuLy: 190, dangXuLy: 5 },
    { name: 'Nông nghiệp', daXuLy: 150, dangXuLy: 8 },
    { name: 'Công thương', daXuLy: 120, dangXuLy: 4 },
    { name: 'Lao động', daXuLy: 100, dangXuLy: 3 },
    { name: 'Văn hóa', daXuLy: 80, dangXuLy: 2 },
    { name: 'Tư pháp', daXuLy: 60, dangXuLy: 1 },
    { name: 'Nội vụ', daXuLy: 50, dangXuLy: 0 },
    { name: 'Khác', daXuLy: 40, dangXuLy: 2 },
];

const MOCK_STATS_CO_QUAN = [
    { name: 'BỘ NÔNG NGHIỆP...', daXuLy: 684, dangXuLy: 25 },
    { name: 'BỘ TƯ PHÁP', daXuLy: 327, dangXuLy: 37 },
    { name: 'BỘ CÔNG AN', daXuLy: 300, dangXuLy: 13 },
    { name: 'BỘ NỘI VỤ', daXuLy: 267, dangXuLy: 32 },
    { name: 'BỘ TÀI CHÍNH', daXuLy: 267, dangXuLy: 23 },
    { name: 'BỘ GIÁO DỤC VÀ...', daXuLy: 129, dangXuLy: 15 },
    { name: 'BỘ XÂY DỰNG', daXuLy: 118, dangXuLy: 5 },
    { name: 'TP Hồ Chí Minh', daXuLy: 109, dangXuLy: 6 },
    { name: 'THANH TRA CHÍNH...', daXuLy: 89, dangXuLy: 3 },
    { name: 'BỘ Y TẾ', daXuLy: 78, dangXuLy: 13 },
    { name: 'BỘ KHOA HỌC VÀ...', daXuLy: 82, dangXuLy: 2 },
    { name: 'Hà Nội', daXuLy: 70, dangXuLy: 3 },
    { name: 'BỘ CÔNG THƯƠNG', daXuLy: 53, dangXuLy: 0 },
    { name: 'NGÂN HÀNG NHÀ...', daXuLy: 41, dangXuLy: 0 },
];

const MOCK_STATS_TY_LE = [
    { name: 'Đã xử lý', value: 85 },
    { name: 'Đang xử lý', value: 15 },
];
const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

const MOCK_DATA = [
    { id: '1771794882779', title: 'Thông tư số 04/2025/TT-BTC hướng dẫn quản lý thu ngân sách...', content: 'Tôi đề nghị bộ tài chính làm rõ khoản 2 điều 5 về việc thu phí bảo vệ môi trường đối với khí thải công nghiệp, hiện tại nội dung này đang gây chồng chéo với Nghị định 06/2022/NĐ-CP.', date: '11:09 17/03/2026', status: 'Đã xử lý', agency: 'Bộ Tài chính', level: 'Trung ương' },
    { id: '1771794882780', title: 'Nghị định 102/2024/NĐ-CP chi tiết thi hành Luật Đất đai', content: 'Cần làm rõ thêm quy định bồi thường giải phóng mặt bằng tại Điều 91 khi thu hồi đất ở nông thôn có sự khác biệt giữa các vùng miền, gây khó khăn cho địa phương khi áp dụng.', date: '09:15 16/03/2026', status: 'Đang xử lý', agency: 'Bộ Tài nguyên và Môi trường', level: 'Trung ương' },
    { id: '1771794882781', title: 'Quy định về quản lý và sử dụng lòng đường, vỉa hè (Nghị quyết số 12/2024/NQ-HĐND)', content: 'Kiến nghị rà soát tính thống nhất của Nghị quyết này với Luật Giao thông đường bộ 2008 về thẩm quyền cấp phép sử dụng tạm thời lòng đường cho mục đích kinh doanh.', date: '14:20 15/03/2026', status: 'Đã xử lý', agency: 'HĐND TP Hà Nội', level: 'Địa phương' },
    { id: '1771794882782', title: 'Luật BHXH (sửa đổi) - Kiến nghị về lộ trình đóng BHXH', content: 'Đề nghị xem xét lại Khoản 3 Điều 64 về điều kiện hưởng lương hưu một lần, cần có lộ trình chuyển tiếp rõ ràng để bảo vệ quyền lợi cho người lao động đã đóng trên 15 năm.', date: '08:30 14/03/2026', status: 'Đang xử lý', agency: 'Bộ Lao động - Thương binh và Xã hội', level: 'Trung ương' },
    { id: '1771794882783', title: 'Nghị định 15/2021/NĐ-CP về quản lý dự án đầu tư xây dựng', content: 'Kiến nghị làm rõ quy trình thẩm định báo cáo nghiên cứu khả thi tại Điều 12 để rút ngắn thời gian thực hiện thủ tục hành chính cho doanh nghiệp FDI.', date: '16:45 13/03/2026', status: 'Đã xử lý', agency: 'Bộ Xây dựng', level: 'Trung ương' },
];

const PhanAnhKienNghiPage = () => {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Tab logic
    const initialTab = searchParams.get('tab') || 'statistics';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['statistics', 'latest', 'search'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    const handleSendFeedbackClick = () => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/phan-anh-kien-nghi/tao-moi' } });
        } else {
            navigate('/phan-anh-kien-nghi/tao-moi');
        }
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Phản ánh kiến nghị</span>
                    </div>
                </div>
            </div>

            {/* Header Cấp 1 */}
            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                            Phản ánh, kiến nghị
                            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                        </h1>
                        <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                            Thông tin thống kê, danh sách và tra cứu phản ánh, kiến nghị chính sách, văn bản pháp luật từ người dân, doanh nghiệp.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                        <Link to="/phan-anh-kien-nghi/huong-dan" className="border-2 border-white/60 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-white hover:text-[#1a3b8b] transition flex items-center justify-center gap-2 text-[14px]">
                            <HelpCircle size={18} /> Hướng dẫn
                        </Link>
                        <button onClick={handleSendFeedbackClick} className="bg-white text-[#1a3b8b] font-bold py-2.5 px-6 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 text-[14px] shadow-sm">
                            <Send size={18} /> Gửi phản ánh
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tab Cấp 2 */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 mb-8">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-2 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => handleTabChange('statistics')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'statistics' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}
                    >
                        <BarChart3 size={16} /> THỐNG KÊ
                    </button>
                    <button
                        onClick={() => handleTabChange('latest')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'latest' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}
                    >
                        <Clock size={16} /> MỚI NHẤT
                    </button>
                    <button
                        onClick={() => handleTabChange('search')}
                        className={`px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'search' ? 'border-[#fdb714] text-[#1a3b8b]' : 'border-transparent text-gray-500 hover:text-[#1a3b8b]'
                            }`}
                    >
                        <Search size={16} /> TRA CỨU
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1280px] pb-16">

                {/* Tab Contents */}
                <div className="min-h-[500px]">
                    {activeTab === 'statistics' && <StatisticsTab />}
                    {activeTab === 'latest' && <LatestTab />}
                    {activeTab === 'search' && <SearchTab codeParams={searchParams.get('code')} />}
                </div>
            </div>
        </div>
    );
};

// ==============================
// 1. STATISTICS TAB
// ==============================
const StatisticsTab = () => {
    const handleExport = (type) => {
        if (type === 'XLSX') {
            // 1. Dữ liệu tổng quan
            const tongQuanData = [
                { 'Chỉ tiêu': 'Tổng số PAKN', 'Giá trị': '8,452' },
                { 'Chỉ tiêu': 'Đã xử lý', 'Giá trị': '7,100' },
                { 'Chỉ tiêu': 'Đang xử lý', 'Giá trị': '1,352' },
                { 'Chỉ tiêu': 'Thời gian xử lý trung bình', 'Giá trị': '5.2 ngày' }
            ];

            // 2. Dữ liệu lĩnh vực
            const linhVucData = MOCK_STATS_LINH_VUC.map(item => ({
                'Lĩnh vực': item.name,
                'Đã xử lý': item.daXuLy,
                'Đang xử lý': item.dangXuLy
            }));

            // 3. Dữ liệu cơ quan
            const coQuanData = MOCK_STATS_CO_QUAN.map(item => ({
                'Cơ quan': item.name,
                'Đã xử lý': item.daXuLy,
                'Đang xử lý': item.dangXuLy
            }));

            // 4. Danh sách PAKN
            const paknData = MOCK_DATA.map(item => ({
                'Mã PAKN': item.id,
                'Tiêu đề': item.title,
                'Nội dung': item.content,
                'Thời gian gửi': item.date,
                'Trạng thái': item.status,
                'Cơ quan xử lý': item.agency,
                'Cấp xử lý': item.level
            }));

            // Tạo workbook
            const wb = XLSX.utils.book_new();

            // Tạo các worksheet
            const ws1 = XLSX.utils.json_to_sheet(tongQuanData);
            const ws2 = XLSX.utils.json_to_sheet(linhVucData);
            const ws3 = XLSX.utils.json_to_sheet(coQuanData);
            const ws4 = XLSX.utils.json_to_sheet(paknData);

            // Điều chỉnh độ rộng cột
            ws1['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 30 }];
            ws2['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }];
            ws3['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }];
            ws4['!cols'] = [{ wch: 15 }, { wch: 50 }, { wch: 80 }, { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 15 }];

            // Thêm worksheet vào workbook
            XLSX.utils.book_append_sheet(wb, ws1, "Tổng quan");
            XLSX.utils.book_append_sheet(wb, ws2, "Theo lĩnh vực");
            XLSX.utils.book_append_sheet(wb, ws3, "Theo cơ quan");
            XLSX.utils.book_append_sheet(wb, ws4, "Danh sách PAKN");

            // Xuất file
            XLSX.writeFile(wb, "Thong_ke_PAKN.xlsx");
        } else {
            alert(`Tính năng xuất file ${type} đang được cập nhật...`);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#0f4c81] flex items-center gap-2">
                    <BarChart3 className="text-blue-500" size={20} /> Tổng quan số liệu thống kê
                </h2>
                <div className="flex gap-3">
                    <button onClick={() => handleExport('XLSX')} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200 shadow-sm text-[13px]">
                        <FileSpreadsheet size={16} /> Xuất XLSX
                    </button>
                    <button onClick={() => handleExport('PDF')} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 font-bold rounded-lg hover:bg-red-100 transition-colors border border-red-200 shadow-sm text-[13px]">
                        <FilePdf size={16} /> Xuất PDF
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-[13px] font-bold mb-1 uppercase">Tổng số PAKN</div>
                    <div className="text-3xl font-bold text-[#0f4c81]">8,452</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-[13px] font-bold mb-1 uppercase">Đã xử lý</div>
                    <div className="text-3xl font-bold text-[#0f4c81]">7,100</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-[13px] font-bold mb-1 uppercase">Đang xử lý</div>
                    <div className="text-3xl font-bold text-[#0f4c81]">1,352</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-gray-500 text-[13px] font-bold mb-1 uppercase">Thời gian xử lý trung bình</div>
                    <div className="text-3xl font-bold text-[#0f4c81]">5.2 <span className="text-lg">ngày</span></div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lĩnh vực */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <h3 className="font-bold text-[16px] text-white bg-[#0f4c81] p-4 text-center uppercase">Thống kê PAKN theo lĩnh vực</h3>
                    <div className="p-4 h-[600px] w-full relative pb-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOCK_STATS_LINH_VUC} layout="vertical" margin={{ top: 20, right: 40, bottom: 20, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#374151', fontWeight: 500 }} width={100} />
                                <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="daXuLy" name="Đã xử lý" stackId="a" fill="#16a34a" maxBarSize={24}>
                                    <LabelList dataKey="daXuLy" position="insideRight" fill="#fff" fontSize={12} fontWeight={700} />
                                </Bar>
                                <Bar dataKey="dangXuLy" name="Đang xử lý" stackId="a" fill="#0ea5e9" maxBarSize={24}>
                                    <LabelList dataKey="dangXuLy" position="right" fill="#1e293b" fontSize={12} fontWeight={700} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-12 left-0 right-0 text-center text-[13px] text-gray-500 font-medium">Số lượng phản ánh chính sách</div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#16a34a]"></div><span className="text-sm font-medium">Đã xử lý</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div><span className="text-sm font-medium">Đang xử lý</span></div>
                        </div>
                    </div>
                </div>

                {/* Cơ quan */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <h3 className="font-bold text-[16px] text-white bg-[#0f4c81] p-4 text-center uppercase">Thống kê PAKN theo đơn vị</h3>
                    <div className="p-4 h-[600px] w-full relative pb-12 flex">
                        <div className="w-8 shrink-0 flex items-center justify-center">
                            <div className="transform -rotate-90 whitespace-nowrap text-gray-500 font-medium text-sm">Bộ/Ban/Ngành/Địa phương</div>
                        </div>
                        <div className="flex-1 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={MOCK_STATS_CO_QUAN} layout="vertical" margin={{ top: 20, right: 40, bottom: 20, left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280' }} />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#374151', fontWeight: 500 }} width={130} />
                                    <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="daXuLy" name="Đã xử lý" stackId="a" fill="#16a34a" maxBarSize={20}>
                                        <LabelList dataKey="daXuLy" position="insideRight" fill="#fff" fontSize={12} fontWeight={700} />
                                    </Bar>
                                    <Bar dataKey="dangXuLy" name="Đang xử lý" stackId="a" fill="#0ea5e9" maxBarSize={20}>
                                        <LabelList dataKey="dangXuLy" position="right" fill="#1e293b" fontSize={12} fontWeight={700} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="absolute bottom-12 left-0 right-0 text-center text-[13px] text-gray-500 font-medium z-10 pl-8">Số lượng phản ánh chính sách</div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-10 pl-8">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#16a34a]"></div><span className="text-sm font-medium">Đã xử lý</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div><span className="text-sm font-medium">Đang xử lý</span></div>
                        </div>
                    </div>
                </div>

                {/* Tỷ lệ xử lý */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <h3 className="font-bold text-[16px] text-white bg-[#0f4c81] p-4 text-center uppercase">Tỷ lệ xử lý</h3>
                    <div className="p-4 h-[600px] w-full flex flex-col items-center justify-center relative">
                        <div className="h-[300px] w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={MOCK_STATS_TY_LE}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={90}
                                        outerRadius={130}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {MOCK_STATS_TY_LE.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-bold text-gray-800">85%</span>
                                <span className="text-sm text-gray-500 font-medium">Đã xử lý</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-6 mt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-[#10b981]"></div>
                                <span className="text-sm text-gray-600 font-medium">Đã xử lý</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-[#f59e0b]"></div>
                                <span className="text-sm text-gray-600 font-medium">Đang xử lý</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==============================
// 2. LATEST TAB
// ==============================
const LatestTab = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                <h2 className="text-xl font-bold text-[#0f4c81] flex items-center gap-2">
                    <Clock className="text-blue-500" /> DANH SÁCH PHẢN ÁNH ĐÃ XỬ LÝ MỚI NHẤT
                </h2>
                <div className="flex gap-4 w-full md:w-auto">
                    <select className="border border-gray-300 rounded-lg p-2 bg-white text-sm font-medium flex-1 md:w-48 outline-none focus:ring-2 ring-blue-200 transition">
                        <option>Tất cả cấp xử lý</option>
                        <option>Trung ương</option>
                        <option>Địa phương</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg p-2 bg-white text-sm font-medium flex-1 md:w-48 outline-none focus:ring-2 ring-blue-200 transition">
                        <option>Tất cả trạng thái</option>
                        <option>Đã xử lý</option>
                        <option>Đang xử lý</option>
                    </select>
                </div>
            </div>

            <ul className="divide-y divide-gray-100">
                {MOCK_DATA.map(item => (
                    <li key={item.id} className="p-6 hover:bg-blue-50/50 transition-colors group">
                        <Link to={`/phan-anh-kien-nghi/${item.id}`} className="flex flex-col sm:flex-row gap-6">
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-blue-600 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                <FileText size={32} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#0f4c81] text-lg hover:underline mb-2 leading-snug">
                                    [{item.agency}] {item.title}
                                </h3>
                                <p className="text-gray-600 text-[15px] mb-4">"{item.content}"</p>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
                                    <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                        <Clock size={16} /> {item.date}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[#0f4c81] font-medium bg-blue-50 px-2.5 py-1 rounded">
                                        <ExternalLink size={16} /> Gửi tới: {item.agency}
                                    </span>
                                    {item.status === 'Đã xử lý' ?
                                        <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                                            <CheckCircle2 size={14} /> Đã xử lý
                                        </span>
                                        :
                                        <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                                            <RotateCw size={14} /> Đang xử lý
                                        </span>
                                    }
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                <span className="text-gray-500 text-sm font-medium">Tổng số: 4,024 bản ghi</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 border rounded-lg text-gray-500 hover:bg-gray-100 bg-white font-medium cursor-not-allowed">Trang trước</button>
                    <button className="px-3 py-1.5 border rounded-lg bg-[#0f4c81] text-white font-medium">1</button>
                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">2</button>
                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">3</button>
                    <button className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-medium transition">Trang sau</button>
                </div>
            </div>
        </div>
    );
};

// ==============================
// 3. SEARCH TAB
// ==============================
const SearchTab = ({ codeParams }) => {
    const [searchCode, setSearchCode] = useState(codeParams || '');
    const [hasSearched, setHasSearched] = useState(true); // Default to true to show list initially

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
    };

    const handleReset = () => {
        setSearchCode('');
        setHasSearched(false);
    };

    return (
        <div className="text-gray-800">
            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-bold text-[#0f4c81] mb-6 flex items-center gap-2">
                    <Search className="text-blue-500" /> TRA CỨU PHẢN ÁNH, KIẾN NGHỊ
                </h2>

                <form onSubmit={handleSearch} className="space-y-6 max-w-4xl">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tra cứu theo mã phản ánh</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value)}
                                placeholder="Nhập mã phản ánh để tra cứu (Ví dụ: 1771794882779)..."
                                className="w-full border-2 border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:border-[#0f4c81] outline-none transition text-lg bg-gray-50 focus:bg-white"
                            />
                            <Search className="absolute right-4 top-3.5 text-gray-400" size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cấp xử lý</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Cấp trung ương</option>
                                <option>Cấp địa phương</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cơ quan tiếp nhận</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Bộ Tài chính</option>
                                <option>Bộ Xây dựng</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                            <select className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white outline-none focus:border-blue-500">
                                <option>Tất cả</option>
                                <option>Đang xử lý</option>
                                <option>Đã xử lý</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button type="submit" className="bg-[#0f4c81] text-white font-bold py-2.5 px-8 rounded-lg hover:bg-blue-800 transition shadow-md flex items-center justify-center gap-2">
                            <Search size={18} /> Tìm kiếm
                        </button>
                        <button type="button" onClick={handleReset} className="border-2 border-gray-200 text-gray-700 font-bold py-2.5 px-8 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                            <RefreshCcw size={18} /> Đặt lại
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Area */}
            {hasSearched ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#0f4c81] text-white p-4 font-bold flex justify-between items-center">
                        <span>KẾT QUẢ TÌM KIẾM</span>
                        <span className="text-blue-200 font-medium text-sm">Tìm thấy {searchCode ? 1 : MOCK_DATA.length} kết quả</span>
                    </div>
                    {searchCode ? (
                        <ul className="divide-y divide-gray-100">
                            <li className="p-6 hover:bg-blue-50/50 transition-colors group">
                                <Link to={`/phan-anh-kien-nghi/1771794882779`} className="flex gap-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0f4c81] hover:underline mb-1">Mã PAKN: {searchCode}</h3>
                                        <p className="text-sm font-bold text-gray-800 mb-1">[Bộ Tài chính] Thông tư số 04/2025/TT-BTC hướng dẫn quản lý thu ngân sách...</p>
                                        <div className="flex flex-wrap items-center gap-x-4 text-xs mt-2">
                                            <span className="flex items-center gap-1 text-gray-500 font-medium"><Clock size={12} /> 11:09 17/03/2026</span>
                                            <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded"><CheckCircle2 size={12} /> Đã xử lý</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <div>
                            <ul className="divide-y divide-gray-100">
                                {MOCK_DATA.map(item => (
                                    <li key={item.id} className="p-6 hover:bg-blue-50/50 transition-colors group">
                                        <Link to={`/phan-anh-kien-nghi/${item.id}`} className="flex flex-col sm:flex-row gap-6">
                                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-blue-600 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                                <FileText size={32} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-[#0f4c81] text-lg hover:underline mb-2 leading-snug">
                                                    [{item.agency}] {item.title}
                                                </h3>
                                                <p className="text-gray-600 text-[15px] mb-4">"{item.content}"</p>
                                                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
                                                    <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                                        <Clock size={16} /> {item.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-[#0f4c81] font-medium bg-blue-50 px-2.5 py-1 rounded">
                                                        <ExternalLink size={16} /> Gửi tới: {item.agency}
                                                    </span>
                                                    {item.status === 'Đã xử lý' ?
                                                        <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                                                            <CheckCircle2 size={14} /> Đã xử lý
                                                        </span>
                                                        :
                                                        <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                                                            <RotateCw size={14} /> Đang xử lý
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-gray-500 text-sm font-medium">Tổng số: 4,024 bản ghi</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 border rounded-lg text-gray-500 hover:bg-gray-100 bg-white font-medium cursor-not-allowed">Trang trước</button>
                                    <button className="px-3 py-1.5 border rounded-lg bg-[#0f4c81] text-white font-medium">1</button>
                                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">2</button>
                                    <button className="px-3 py-1.5 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 font-medium transition">3</button>
                                    <button className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-medium transition">Trang sau</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default PhanAnhKienNghiPage;

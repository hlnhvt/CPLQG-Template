import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Users, CheckCircle, Clock, BarChart2, PieChart, Star, FileText, Calendar, Building2, UserCheck, HelpCircle, Timer, Scale } from 'lucide-react';

// --- MOCK DATA ---
const SURVEY_DATA = {
    id: 1,
    title: "Khảo sát về chất lượng dịch vụ hành chính công - Đợt 1",
    topicId: 1,
    topicTitle: "Khảo sát về chất lượng dịch vụ hành chính công",
    status: "opening",
    statusText: "Đang mở",
    dateRange: "01/03/2026 - 31/03/2026",
    daysLeft: 19,
    totalParticipants: 2450,
    totalCompleted: 1890,
    completionRate: 77,
    lastUpdated: "12/03/2026 08:30",
    image: "/thumb1.png",
    // Info fields
    objective: "Khảo sát nhằm đánh giá mức độ hài lòng của người dân và doanh nghiệp đối với chất lượng thực hiện thủ tục hành chính tại các cơ quan nhà nước, góp phần cải thiện môi trường đầu tư và nâng cao chỉ số hài lòng của người dân về sự phục vụ của cơ quan hành chính nhà nước (SIPAS).",
    organization: "Bộ Tư pháp – Cục Phổ biến, Giáo dục pháp luật",
    audience: "Người dân, doanh nghiệp đã sử dụng dịch vụ hành chính công trong 12 tháng gần đây",
    questionCount: 12,
    estimatedTime: "Khoảng 8-12 phút",
    legalBasis: [
        "Nghị quyết số 76/NQ-CP ngày 15/7/2021 của Chính phủ ban hành Chương trình tổng thể cải cách hành chính nhà nước giai đoạn 2021-2030",
        "Quyết định số 766/QĐ-TTg ngày 23/6/2022 của Thủ tướng Chính phủ phê duyệt Bộ chỉ số chỉ đạo, điều hành và đánh giá chất lượng phục vụ người dân, doanh nghiệp trong thực hiện thủ tục hành chính"
    ],
    // Questions statistics
    questions: [
        {
            id: 1,
            type: "radio",
            text: "Bạn đánh giá thế nào về thái độ phục vụ của cán bộ tiếp nhận hồ sơ?",
            options: [
                { label: "Rất hài lòng", percent: 45 },
                { label: "Hài lòng", percent: 35 },
                { label: "Bình thường", percent: 14 },
                { label: "Không hài lòng", percent: 6 }
            ]
        },
        {
            id: 2,
            type: "rating",
            text: "Đánh giá số sao cho chất lượng dịch vụ tổng thể:",
            avgScore: 4.2,
            distribution: [
                { stars: 5, count: 820 },
                { stars: 4, count: 675 },
                { stars: 3, count: 277 },
                { stars: 2, count: 82 },
                { stars: 1, count: 36 }
            ]
        },
        {
            id: 3,
            type: "radio",
            text: "Thời gian xử lý hồ sơ có đúng theo quy định không?",
            options: [
                { label: "Đúng hẹn", percent: 62 },
                { label: "Sớm hơn", percent: 18 },
                { label: "Trễ hẹn", percent: 20 }
            ]
        },
        {
            id: 4,
            type: "text",
            text: "Đề xuất, góp ý của bạn để cải thiện chất lượng dịch vụ hành chính công:",
            responseCount: 1250
        }
    ]
};

const CHART_COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0891b2'];

const SurveyDetailPage = () => {
    const { surveyId } = useParams();
    const [activeTab, setActiveTab] = useState('stats');
    const survey = SURVEY_DATA; // In real app this would be fetched using surveyId

    const statusConfig = {
        opening: { text: 'Đang mở', classes: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
        upcoming: { text: 'Sắp diễn ra', classes: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
        closed: { text: 'Đã kết thúc', classes: 'bg-gray-100 text-gray-700 border-gray-200', dot: 'bg-gray-500' }
    };
    const sc = statusConfig[survey.status];

    const renderBarChartQuestion = (question) => (
        <div className="space-y-3">
            {question.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <div className="w-36 md:w-48 text-right text-[13px] text-gray-600 shrink-0 font-medium leading-tight">{opt.label}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                            className="h-full rounded-lg transition-all duration-700"
                            style={{ width: `${opt.percent}%`, backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                        />
                    </div>
                    <div className="w-10 text-[13px] font-bold text-gray-700 shrink-0">{opt.percent}%</div>
                </div>
            ))}
        </div>
    );

    const renderRatingQuestion = (question) => {
        const maxCount = Math.max(...question.distribution.map(d => d.count));
        return (
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-2.5 w-full">
                    {[...question.distribution].reverse().map((d, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="flex items-center justify-end gap-0.5 w-14 shrink-0">
                                <span className="text-[13px] font-medium text-gray-600">{d.stars}</span>
                                <Star size={13} className="fill-yellow-400 text-yellow-400 ml-0.5" />
                            </div>
                            <div className="flex-1 h-7 bg-gray-100 rounded overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded transition-all duration-700"
                                    style={{ width: `${(d.count / maxCount) * 100}%` }}
                                />
                            </div>
                            <div className="w-12 text-[13px] text-gray-600 shrink-0">{d.count.toLocaleString('vi-VN')}</div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center w-40 shrink-0">
                    <div className="text-5xl font-black text-[#0f4c81]">{question.avgScore}</div>
                    <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={18} className={s <= Math.round(question.avgScore) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                        ))}
                    </div>
                    <div className="text-[13px] text-gray-500 mt-1">Điểm trung bình</div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Header with Breadcrumbs, Title, Tabs */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-0">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    {/* Breadcrumbs */}
                    <div className="flex items-center flex-wrap text-[13px] text-gray-500 mb-4 gap-1">
                        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <Link to="/chu-de-khao-sat" className="hover:text-blue-600">Khảo sát</Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <Link to={`/chu-de-khao-sat/${survey.topicId}`} className="hover:text-blue-600 hidden md:inline truncate max-w-[200px]">{survey.topicTitle}</Link>
                        <ChevronRight size={14} className="shrink-0 hidden md:inline" />
                        <span className="text-gray-800 font-medium truncate max-w-[200px]">{survey.title}</span>
                    </div>

                    {/* Title + Status Badge */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold border flex items-center gap-1.5 ${sc.classes}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>{sc.text}
                                </span>
                                {survey.status === 'opening' && (
                                    <span className="text-orange-600 text-[13px] font-semibold flex items-center gap-1">
                                        <Clock size={14} /> Còn {survey.daysLeft} ngày
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] leading-tight">{survey.title}</h1>
                        </div>
                        {survey.status === 'opening' && (
                            <Link to={`/khao-sat/${survey.id}/tham-gia`} className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors text-[15px]">
                                Tham gia khảo sát
                            </Link>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-nowrap overflow-x-auto border-b-2 border-gray-100 no-scrollbar">
                        <button className={`flex items-center gap-2 px-6 py-3.5 font-semibold text-[15px] whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${activeTab === 'stats' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`} onClick={() => setActiveTab('stats')}>
                            <BarChart2 size={17} /> Thống kê
                        </button>
                        <button className={`flex items-center gap-2 px-6 py-3.5 font-semibold text-[15px] whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${activeTab === 'detail' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`} onClick={() => setActiveTab('detail')}>
                            <FileText size={17} /> Thông tin chi tiết
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-[1200px] mt-8">

                {/* TAB 1: STATISTICS (UC82) */}
                {activeTab === 'stats' && (
                    <div className="space-y-6">
                        {/* Summary Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: <Users size={24} className="text-blue-500" />, value: survey.totalParticipants.toLocaleString('vi-VN'), label: 'Lượt tham gia', bg: 'bg-blue-50' },
                                { icon: <CheckCircle size={24} className="text-green-500" />, value: survey.totalCompleted.toLocaleString('vi-VN'), label: 'Tổng hoàn thành', bg: 'bg-green-50' },
                                { icon: <BarChart2 size={24} className="text-purple-500" />, value: `${survey.completionRate}%`, label: 'Tỷ lệ hoàn thành', bg: 'bg-purple-50' },
                                { icon: <Clock size={24} className="text-orange-500" />, value: `31/03/2026`, label: 'Ngày kết thúc', bg: 'bg-orange-50' }
                            ].map((card, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} shrink-0`}>{card.icon}</div>
                                    <div>
                                        <div className="text-2xl font-black text-[#0f4c81]">{card.value}</div>
                                        <div className="text-[13px] text-gray-500">{card.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Completion Rate Progress Bar */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-gray-700">Tỷ lệ hoàn thành</span>
                                <span className="font-bold text-[#0f4c81]">{survey.completionRate}%</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" style={{ width: `${survey.completionRate}%` }} />
                            </div>
                            <div className="flex justify-between text-[13px] text-gray-500 mt-2">
                                <span>{survey.totalCompleted.toLocaleString('vi-VN')} lượt hoàn thành</span>
                                <span>{survey.totalParticipants.toLocaleString('vi-VN')} lượt tham gia</span>
                            </div>
                        </div>

                        {/* Per-Question Charts */}
                        {/* {survey.questions.map((q, index) => (
                            <div key={q.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
                                <div className="font-bold text-[16px] text-gray-800 mb-5">
                                    <span className="text-blue-600 mr-2">Câu {index + 1}:</span>
                                    {q.text}
                                </div>
                                {q.type === 'radio' && renderBarChartQuestion(q)}
                                {q.type === 'rating' && renderRatingQuestion(q)}
                                {q.type === 'text' && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <FileText size={22} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="text-[20px] font-black text-[#0f4c81]">{q.responseCount.toLocaleString('vi-VN')}</div>
                                            <div className="text-[13px] text-gray-500">lượt trả lời văn bản</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))} */}

                        <div className="text-[13px] text-gray-400 text-right">Cập nhật lần cuối: {survey.lastUpdated}</div>
                    </div>
                )}

                {/* TAB 2: DETAIL INFO (UC83) */}
                {activeTab === 'detail' && (
                    <div className="space-y-6">
                        {/* Survey Thumbnail Image */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="relative w-full aspect-[16/9] bg-gray-200">
                                <img src={survey.image} alt={survey.title} className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Main Info Grid */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
                            {/* Objective */}
                            <div>
                                <h3 className="flex items-center gap-2 font-bold text-[16px] text-[#0f4c81] mb-3">
                                    <HelpCircle size={18} className="text-blue-500" /> Mục tiêu khảo sát
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{survey.objective}</p>
                            </div>

                            <div className="border-t border-gray-100" />

                            {/* Fields: 2 column grid on md */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex gap-3">
                                    <Building2 size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-500 mb-1">Đơn vị thực hiện</div>
                                        <div className="font-semibold text-gray-800">{survey.organization}</div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Calendar size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-500 mb-1">Thời gian khảo sát</div>
                                        <div className="font-semibold text-gray-800">{survey.dateRange}</div>
                                        {survey.status === 'opening' && (
                                            <div className="text-orange-600 text-[13px] font-medium mt-0.5">Còn {survey.daysLeft} ngày</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <UserCheck size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-500 mb-1">Đối tượng tham gia</div>
                                        <div className="font-semibold text-gray-800">{survey.audience}</div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <HelpCircle size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-500 mb-1">Số câu hỏi</div>
                                        <div className="font-semibold text-gray-800">{survey.questionCount} câu hỏi</div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Timer size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-500 mb-1">Thời gian hoàn thành</div>
                                        <div className="font-semibold text-gray-800">{survey.estimatedTime}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100" />

                            {/* Legal Basis */}
                            <div>
                                <h3 className="flex items-center gap-2 font-bold text-[16px] text-[#0f4c81] mb-3">
                                    <Scale size={18} className="text-blue-500" /> Căn cứ pháp lý
                                </h3>
                                <ul className="space-y-2">
                                    {survey.legalBasis.map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-[14px] text-gray-700 leading-relaxed">
                                            <span className="text-blue-500 mt-1 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* CTA Button */}
                        {survey.status === 'opening' && (
                            <div className="flex justify-center">
                                <Link to={`/khao-sat/${survey.id}/tham-gia`} className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-105 text-[16px]">
                                    <CheckCircle size={20} />
                                    Tham gia khảo sát ngay
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyDetailPage;

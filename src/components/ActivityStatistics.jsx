import React, { useState, useEffect } from 'react';
import { Users, HelpCircle, MessageSquare, Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        data.push({
            name: `${d.getDate()}/${d.getMonth() + 1}`,
            qa: Math.floor(Math.random() * 200) + 100,
            forum: Math.floor(Math.random() * 300) + 150,
            hienke: Math.floor(Math.random() * 100) + 50,
        });
    }
    return data;
};

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
    <div className={`p-5 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300 cursor-default`}>
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-700 ${colorClass}`}></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-gray-500 text-[13px] font-semibold uppercase tracking-wide mb-1">{title}</p>
                <div className="flex items-end gap-3">
                    <h4 className="text-3xl font-black text-slate-800 tracking-tight">{value.toLocaleString()}</h4>
                    <span className="text-emerald-500 text-sm font-bold flex items-center mb-1 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        <TrendingUp size={14} className="mr-1" />
                        {trend}
                    </span>
                </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${colorClass}`}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const ActivityStatistics = () => {
    const [chartData, setChartData] = useState(generateData());
    const [onlineUsers, setOnlineUsers] = useState(2543);
    const [todayQuestions, setTodayQuestions] = useState(342);

    // Simulate realtime updates
    useEffect(() => {
        const interval = setInterval(() => {
            setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
            // Occasionally increment questions
            if (Math.random() > 0.7) {
                setTodayQuestions(prev => prev + 1);
            }
            
            // Randomly update the last data point in the chart to simulate realtime flow
            setChartData(prevData => {
                const newData = [...prevData];
                const lastPoint = { ...newData[newData.length - 1] };
                lastPoint.qa += Math.random() > 0.5 ? 1 : 0;
                lastPoint.forum += Math.random() > 0.5 ? 2 : 0;
                newData[newData.length - 1] = lastPoint;
                return newData;
            });

        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
                    <p className="text-white/70 text-xs font-semibold mb-3 uppercase tracking-wider">{`Ngày ${label}`}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2 last:mb-0">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span className="text-white/90 text-sm font-medium w-24">{
                                entry.name === 'qa' ? 'Hỏi đáp' : 
                                entry.name === 'forum' ? 'Diễn đàn' : 'Hiến kế'
                            }</span>
                            <span className="text-white font-bold text-sm ml-auto">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full p-6 bg-transparent overflow-y-auto custom-scrollbar relative z-10 sm:rounded-b-2xl flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                            <span className="text-emerald-400 font-bold text-sm tracking-wide uppercase">Cập nhật theo thời gian thực</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Thống kê hoạt động trực tuyến</h2>
                        <p className="text-white/60 mt-1 text-[13px] font-medium">Theo dõi các chỉ số tương tác và lưu lượng hệ thống</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left side: Stats Cards */}
                    <div className="col-span-1 lg:col-span-4 flex flex-col gap-5">
                        <StatCard 
                            title="Đang truy cập" 
                            value={onlineUsers} 
                            icon={Users} 
                            trend="+12%" 
                            colorClass="bg-gradient-to-br from-emerald-400 to-emerald-600" 
                        />
                        <StatCard 
                            title="Câu hỏi gửi mới (Hôm nay)" 
                            value={todayQuestions} 
                            icon={HelpCircle} 
                            trend="+5.2%" 
                            colorClass="bg-gradient-to-br from-blue-500 to-indigo-600" 
                        />
                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-orange-500/20">
                                    <MessageSquare size={20} />
                                </div>
                                <h4 className="text-xl font-black text-white">1,204</h4>
                                <p className="text-[11px] text-white/50 font-bold uppercase mt-1">Chủ đề thảo luận</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-purple-500/20">
                                    <Activity size={20} />
                                </div>
                                <h4 className="text-xl font-black text-white">8,912</h4>
                                <p className="text-[11px] text-white/50 font-bold uppercase mt-1">Lượt tương tác</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Chart */}
                    <div className="col-span-1 lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h3 className="text-lg font-bold text-white">Lưu lượng tương tác 7 ngày qua</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#818cf8]"></div>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-wide">Diễn đàn</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-wide">Hỏi đáp</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-wide">Hiến kế</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorQa" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorForum" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorHienke" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff15" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 600 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="forum" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorForum)" />
                                    <Area type="monotone" dataKey="qa" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorQa)" />
                                    <Area type="monotone" dataKey="hienke" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorHienke)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ActivityStatistics;

import React, { useEffect, useState } from 'react';
import { ChevronDown, Send, CheckCircle2, Search } from 'lucide-react';
import { TuyenQuangPageShell } from '../../components/tuyenquang/TuyenQuangShared';
import { TQ_FAQ_GROUPS, tuyenquangFAQs } from '../../data/tuyenquangMockData';

const EMPTY_FORM = { name: '', contact: '', group: 'hoi-dap', question: '' };

const TuyenQuangFAQPage = () => {
    const [tab, setTab] = useState('hoi-dap');
    const [open, setOpen] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [form, setForm] = useState(EMPTY_FORM);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        document.title = 'Hỏi đáp, tư vấn pháp luật - Cổng Pháp luật tỉnh Tuyên Quang';
        if (window.location.hash === '#gui-cau-hoi') {
            document.getElementById('gui-cau-hoi')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    const k = keyword.trim().toLowerCase();
    const list = tuyenquangFAQs.filter((f) => f.group === tab && (!k || `${f.q} ${f.a}`.toLowerCase().includes(k)));

    const submit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm(EMPTY_FORM);
    };

    return (
        <TuyenQuangPageShell
            crumbs={[{ label: 'Hỏi đáp, tư vấn' }]}
            title="Hỏi đáp, tư vấn pháp luật"
            subtitle="Giải đáp vướng mắc pháp luật, tư vấn pháp luật và đối thoại chính sách - pháp luật với người dân, doanh nghiệp."
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl" role="tablist">
                            {TQ_FAQ_GROUPS.map((g) => (
                                <button key={g.id} type="button" role="tab" aria-selected={tab === g.id} onClick={() => { setTab(g.id); setOpen(null); }}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${tab === g.id ? 'bg-white text-[#0f4c81] shadow-sm' : 'text-gray-500 hover:text-[#0f4c81]'}`}>
                                    {g.label}
                                </button>
                            ))}
                        </div>
                        <div className="relative md:ml-auto md:w-64">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm câu hỏi..." aria-label="Tìm câu hỏi"
                                className="w-full bg-gray-50 border border-gray-200 text-sm pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:bg-white focus:border-[#0f4c81]" />
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        {list.map((f) => {
                            const isOpen = open === f.id;
                            return (
                                <div key={f.id} className={`rounded-xl border transition-colors ${isOpen ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 hover:border-blue-200'}`}>
                                    <button type="button" onClick={() => setOpen(isOpen ? null : f.id)} aria-expanded={isOpen} className="w-full flex items-start gap-3 text-left p-4">
                                        <span className="w-7 h-7 shrink-0 rounded-lg bg-[#0f4c81] text-white text-xs font-bold flex items-center justify-center">H</span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block font-semibold text-[14.5px] text-gray-900 leading-snug">{f.q}</span>
                                            <span className="block text-[11.5px] text-gray-500 mt-1">{f.asker} • {f.date}</span>
                                        </span>
                                        <ChevronDown size={18} className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0f4c81]' : ''}`} />
                                    </button>
                                    <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className="flex items-start gap-3 px-4 pb-4">
                                                <span className="w-7 h-7 shrink-0 rounded-lg bg-[#991b1b] text-white text-xs font-bold flex items-center justify-center">Đ</span>
                                                <p className="text-[14px] text-gray-700 leading-relaxed">{f.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {!list.length && <p className="text-sm text-gray-500 text-center py-8">Không có câu hỏi phù hợp.</p>}
                    </div>
                </div>

                <div id="gui-cau-hoi" className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden scroll-mt-4">
                    <div className="bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white px-5 py-3.5">
                        <h2 className="font-bold text-[15px] uppercase tracking-wide">Gửi câu hỏi pháp luật</h2>
                        <p className="text-xs text-white/80 mt-0.5">Ban Biên tập sẽ chuyển câu hỏi tới cơ quan chuyên môn trả lời</p>
                    </div>
                    {sent ? (
                        <div className="p-6 text-center flex flex-col items-center gap-2">
                            <CheckCircle2 size={40} className="text-emerald-600" />
                            <p className="font-bold text-gray-900">Đã gửi câu hỏi</p>
                            <p className="text-sm text-gray-600">Cảm ơn bạn. Câu trả lời sẽ được đăng tải tại chuyên mục Hỏi đáp.</p>
                            <button type="button" onClick={() => setSent(false)} className="mt-2 text-sm font-semibold text-[#0f4c81] hover:text-[#991b1b]">Gửi câu hỏi khác</button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="p-5 space-y-3">
                            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Họ và tên *" aria-label="Họ và tên" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100" />
                            <input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Email hoặc số điện thoại *" aria-label="Email hoặc số điện thoại" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100" />
                            <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} aria-label="Hình thức" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81]">
                                {TQ_FAQ_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                            </select>
                            <textarea required rows={5} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Nội dung câu hỏi *" aria-label="Nội dung câu hỏi" className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0f4c81] focus:ring-4 focus:ring-blue-100" />
                            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-[#991b1b] text-white text-sm font-bold py-2.5 rounded-xl transition-colors">
                                <Send size={15} /> Gửi câu hỏi
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </TuyenQuangPageShell>
    );
};

export default TuyenQuangFAQPage;

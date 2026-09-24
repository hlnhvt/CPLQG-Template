import React, { useMemo, useState } from 'react';
import {
    BookOpenText, Compass, Landmark, FileStack, MessageCircleQuestion, UserCheck, Send, Building2, Briefcase, Download,
    Target, Phone, Star, PlusCircle, X, CheckCircle2, Calendar, Eye, FileText, FileSpreadsheet, BookOpen, ClipboardCheck, Sparkles
} from 'lucide-react';
import {
    SpecializedShell, IntroSection, useTabParam, SectionTitle, Card, Badge, toneFor, StatGrid, QuickNav, ProcessStepper,
    RecordExplorer, Highlight, QAItem, sortNewest, sortOldest, sortBy
} from './SpecializedKit';
import { buildBusinessSupport } from '../../../data/portals/specializedData';
import { buildIntros } from '../../../data/portals/introData';

const DOC_ICONS = { 'Mẫu hợp đồng': FileText, 'Sổ tay pháp lý': BookOpen, 'Hướng dẫn nghiệp vụ': FileStack, 'Bộ câu hỏi tự kiểm tra': FileSpreadsheet };
const CONSULTANT_KINDS = ['Luật sư', 'Chuyên gia pháp lý', 'Tổ chức tư vấn', 'Trọng tài viên'];
const REQUEST_STEPS = [
    { title: 'Gửi yêu cầu', desc: 'Doanh nghiệp gửi câu hỏi, vướng mắc qua biểu mẫu trực tuyến, kèm thông tin liên hệ.', time: 'Trực tuyến 24/7' },
    { title: 'Phân loại', desc: 'Bộ phận tiếp nhận phân loại theo lĩnh vực và chuyển cơ quan chuyên môn hoặc tư vấn viên phù hợp.', time: '01 ngày làm việc' },
    { title: 'Giải đáp, tư vấn', desc: 'Cơ quan chuyên môn trả lời bằng văn bản hoặc tư vấn viên liên hệ tư vấn trực tiếp cho doanh nghiệp.', time: 'Theo thời hạn quy định' },
    { title: 'Công khai & đánh giá', desc: 'Câu trả lời có giá trị tham khảo chung được công khai trên chuyên trang; doanh nghiệp đánh giá mức độ hài lòng.', time: 'Sau khi trả lời' }
];


// Popup tạo câu hỏi mới (đồng bộ với popup của chuyên mục Hỏi đáp)
const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600';
const AskQuestionModal = ({ profile, fields, onClose }) => {
    const [form, setForm] = useState({ field: fields[0], title: '', content: '', company: '', name: '', phone: '' });
    const [done, setDone] = useState(false);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    const submit = (e) => {
        e.preventDefault();
        setDone(true);
        setTimeout(onClose, 2200);
    };
    return (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden spx-fade-up max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] text-white p-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <PlusCircle size={20} className="text-amber-400" />
                        <h3 className="font-bold text-base text-white">Gửi câu hỏi pháp luật cho doanh nghiệp</h3>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition" aria-label="Đóng"><X size={18} /></button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {done ? (
                        <div className="p-8 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                            <CheckCircle2 size={42} className="mx-auto text-emerald-600" />
                            <h4 className="font-bold text-base">Gửi câu hỏi thành công!</h4>
                            <p className="text-xs text-emerald-700 leading-relaxed">{profile.siteName} đã tiếp nhận câu hỏi của doanh nghiệp. {profile.stp} sẽ phân loại và phản hồi trong thời gian sớm nhất.</p>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-3.5 text-xs">
                            <label className="block">
                                <span className="block font-semibold text-slate-700 mb-1">Lĩnh vực vướng mắc *</span>
                                <select value={form.field} onChange={set('field')} className={inputCls}>
                                    {fields.map((f) => <option key={f}>{f}</option>)}
                                </select>
                            </label>
                            <label className="block">
                                <span className="block font-semibold text-slate-700 mb-1">Tiêu đề câu hỏi tóm tắt *</span>
                                <input required value={form.title} onChange={set('title')} placeholder="Ví dụ: Thủ tục tạm ngừng kinh doanh của công ty TNHH..." className={inputCls} />
                            </label>
                            <label className="block">
                                <span className="block font-semibold text-slate-700 mb-1">Nội dung chi tiết tình huống vướng mắc *</span>
                                <textarea required rows={4} value={form.content} onChange={set('content')} placeholder="Mô tả cụ thể tình huống, văn bản liên quan và nội dung cần hướng dẫn..." className={`${inputCls} leading-relaxed`} />
                            </label>
                            <label className="block">
                                <span className="block font-semibold text-slate-700 mb-1">Tên doanh nghiệp / hộ kinh doanh *</span>
                                <input required value={form.company} onChange={set('company')} placeholder="Công ty TNHH ..." className={inputCls} />
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="block font-semibold text-slate-700 mb-1">Người liên hệ *</span>
                                    <input required value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" className={inputCls} />
                                </label>
                                <label className="block">
                                    <span className="block font-semibold text-slate-700 mb-1">Số điện thoại liên hệ *</span>
                                    <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="0912..." className={inputCls} />
                                </label>
                            </div>
                            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                                <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Hủy bỏ</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-800 hover:from-indigo-950 hover:to-indigo-900 text-white font-bold flex items-center gap-1.5 shadow-md"><Send size={14} /> Gửi câu hỏi</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const BusinessSupportPortalPage = ({ profile, Header, Footer }) => {
    const data = useMemo(() => buildBusinessSupport(profile), [profile]);
    const intro = useMemo(() => buildIntros(profile).business, [profile]);
    const tabs = [
        { key: 'gioi-thieu', label: 'Giới thiệu chung', icon: BookOpenText },
        { key: 'tong-quan', label: 'Tổng quan', icon: Compass },
        { key: 'chinh-sach', label: 'Chính sách hỗ trợ', icon: Landmark, count: data.policies.length },
        { key: 'tai-lieu', label: 'Tài liệu & Biểu mẫu', icon: FileStack, count: data.documents.length },
        { key: 'hoi-dap', label: 'Hỏi đáp doanh nghiệp', icon: MessageCircleQuestion, count: data.faqs.length },
        { key: 'tu-van-vien', label: 'Mạng lưới tư vấn viên', icon: UserCheck, count: data.consultants.length }
    ];
    const [tab, setTab] = useTabParam(tabs);
    const policyFields = [...new Set(data.policies.map((p) => p.field))];
    const docTypes = Object.keys(DOC_ICONS);

    const [askOpen, setAskOpen] = useState(false);
    const faqBase = `${profile.homeUrl}/ho-tro-phap-ly-doanh-nghiep/hoi-dap`;

    return (
        <SpecializedShell
            profile={profile} Header={Header} Footer={Footer}
            title="Hỗ trợ pháp lý doanh nghiệp"
            subtitle={`Đồng hành cùng cộng đồng doanh nghiệp, hộ kinh doanh trên địa bàn ${profile.name} tháo gỡ vướng mắc pháp lý`}
            tabs={tabs} activeTab={tab} onTabChange={setTab}
        >
            {/* ===== GIỚI THIỆU CHUNG ===== */}
            {tab === 'gioi-thieu' && <IntroSection intro={intro} heroIcon={Building2} />}

            {/* ===== TỔNG QUAN ===== */}
            {tab === 'tong-quan' && (
                <div className="space-y-8">
                    <StatGrid items={[
                        { icon: Building2, value: profile.stats.businessesSupported.toLocaleString('vi-VN'), label: 'Lượt doanh nghiệp được hỗ trợ năm 2025' },
                        { icon: UserCheck, value: profile.stats.consultants, label: 'Tư vấn viên pháp luật' },
                        { icon: Landmark, value: data.policies.length, label: 'Chính sách hỗ trợ đang áp dụng' },
                        { icon: FileStack, value: data.documents.length, label: 'Tài liệu, biểu mẫu miễn phí' }
                    ]} />

                    <Card className="p-5 sm:p-7">
                        <SectionTitle icon={ClipboardCheck} title="Quy trình tiếp nhận, giải đáp vướng mắc" desc="Bấm vào từng bước để xem chi tiết." />
                        <ProcessStepper steps={REQUEST_STEPS} />
                    </Card>

                    <div>
                        <SectionTitle icon={Compass} title="Tra cứu nhanh" />
                        <QuickNav onGo={setTab} items={[
                            { key: 'chinh-sach', icon: Landmark, label: 'Chính sách hỗ trợ', count: data.policies.length, desc: 'Chính sách của Trung ương và cơ chế riêng của địa phương.' },
                            { key: 'tai-lieu', icon: FileStack, label: 'Tài liệu & Biểu mẫu', count: data.documents.length, desc: 'Mẫu hợp đồng, sổ tay pháp lý, hướng dẫn nghiệp vụ.' },
                            { key: 'hoi-dap', icon: MessageCircleQuestion, label: 'Hỏi đáp doanh nghiệp', count: data.faqs.length, desc: 'Giải đáp vướng mắc thường gặp khi kinh doanh.' },
                            { key: 'tu-van-vien', icon: UserCheck, label: 'Mạng lưới tư vấn viên', count: data.consultants.length, desc: 'Luật sư, chuyên gia, tổ chức tư vấn theo lĩnh vực.' }
                        ]} />
                    </div>
                </div>
            )}

            {/* ===== CHÍNH SÁCH ===== */}
            {tab === 'chinh-sach' && (
                <div>
                    <SectionTitle icon={Landmark} title="Chính sách hỗ trợ doanh nghiệp" desc="Lọc theo cấp ban hành, lĩnh vực, đối tượng; tìm theo tên chính sách hoặc căn cứ pháp lý." />
                    <RecordExplorer
                        records={data.policies}
                        searchKeys={['title', 'basis', 'desc', 'field', 'target']}
                        chipFilter={{ key: 'level', label: 'Cấp ban hành' }}
                        selectFilters={[{ key: 'field', label: 'Lĩnh vực' }, { key: 'target', label: 'Đối tượng' }]}
                        unit="chính sách"
                        placeholder="Ví dụ: khởi nghiệp, nhãn hiệu, logistics, hộ kinh doanh..."
                        renderItem={(p, { query, layout }) => (
                            <Card className={`p-5 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition ${layout === 'list' ? 'flex flex-col md:flex-row md:items-center gap-4' : 'flex flex-col'}`}>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap gap-1.5"><Badge tone={p.level === 'Địa phương' ? 'amber' : 'rose'}>{p.level}</Badge><Badge tone={toneFor(p.field, policyFields)}>{p.field}</Badge></div>
                                    <h3 className="font-bold text-gray-900 mt-2 leading-snug"><Highlight text={p.title} query={query} /></h3>
                                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed"><Highlight text={p.desc} query={query} /></p>
                                </div>
                                <div className={`text-xs space-y-1 ${layout === 'list' ? 'md:w-64 shrink-0' : 'mt-3 pt-3 border-t border-gray-100'}`}>
                                    <p className="flex items-start gap-1.5 text-gray-600"><Target size={13} className="text-[#4f56ca] shrink-0 mt-0.5" /><span><Highlight text={p.target} query={query} /></span></p>
                                    <p className="text-gray-500">Căn cứ: <span className="text-gray-700 font-medium"><Highlight text={p.basis} query={query} /></span></p>
                                </div>
                            </Card>
                        )}
                    />
                </div>
            )}

            {/* ===== TÀI LIỆU ===== */}
            {tab === 'tai-lieu' && (
                <div>
                    <SectionTitle icon={FileStack} title="Tài liệu, biểu mẫu pháp lý miễn phí" desc="Lọc theo loại tài liệu, lĩnh vực, định dạng." />
                    <RecordExplorer
                        records={data.documents}
                        searchKeys={['title', 'field', 'type', 'publisher']}
                        chipFilter={{ key: 'type', label: 'Loại tài liệu', order: (a, b) => docTypes.indexOf(a) - docTypes.indexOf(b) }}
                        selectFilters={[{ key: 'field', label: 'Lĩnh vực' }, { key: 'format', label: 'Định dạng' }, { key: 'publisher', label: 'Đơn vị phát hành' }]}
                        sortOptions={[sortNewest, sortBy('downloads', 'Tải nhiều nhất', 'downloads'), sortOldest]}
                        unit="tài liệu"
                        placeholder="Ví dụ: hợp đồng lao động, nhãn hiệu, hóa đơn điện tử..."
                        renderItem={(d, { query, layout }) => {
                            const Icon = DOC_ICONS[d.type] || FileText;
                            return (
                                <Card className={`p-4 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition ${layout === 'list' ? 'flex flex-col sm:flex-row sm:items-center gap-4' : 'flex flex-col'}`}>
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <div className="w-11 h-11 rounded-xl bg-indigo-50 text-[#2c1b92] flex items-center justify-center shrink-0"><Icon size={20} /></div>
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap gap-1.5"><Badge tone={toneFor(d.type, docTypes)}>{d.type}</Badge><Badge tone="gray">{d.format} · {d.size}</Badge></div>
                                            <h3 className="font-bold text-sm text-gray-900 mt-1.5 leading-snug"><Highlight text={d.title} query={query} /></h3>
                                            <p className="text-[11px] text-gray-500 mt-1">{d.field} · <Highlight text={d.publisher} query={query} /></p>
                                            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-3"><span className="flex items-center gap-1"><Calendar size={11} /> {d.date}</span><span className="flex items-center gap-1"><Download size={11} /> {d.downloads.toLocaleString('vi-VN')}</span></p>
                                        </div>
                                    </div>
                                    <button type="button" className={`${layout === 'list' ? 'shrink-0' : 'mt-3 w-full'} h-9 px-4 rounded-lg bg-[#2c1b92] hover:bg-[#4f56ca] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors`}><Download size={14} /> Tải miễn phí</button>
                                </Card>
                            );
                        }}
                    />
                </div>
            )}

            {/* ===== HỎI ĐÁP ===== */}
            {tab === 'hoi-dap' && (
                <div>
                    <SectionTitle
                        title="Hỏi đáp pháp luật cho doanh nghiệp"
                        desc="Bấm vào câu hỏi để xem nhanh giải đáp, hoặc chọn “Chi tiết” để xem toàn văn. Chưa có câu trả lời phù hợp? Hãy tạo câu hỏi mới."
                        action={(
                            <button onClick={() => setAskOpen(true)} className="shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-[#4f56ca] to-[#2c1b92] hover:from-[#5b62d6] hover:to-[#3a28a8] text-white text-sm font-bold shadow-md transition-all">
                                <PlusCircle size={17} /> Tạo câu hỏi mới
                            </button>
                        )}
                    />
                    <RecordExplorer
                        records={data.faqs}
                        searchKeys={['title', 'a', 'basis', 'field']}
                        chipFilter={{ key: 'field', label: 'Lĩnh vực' }}
                        sortOptions={[sortBy('views', 'Được quan tâm nhất', 'views'), sortNewest, sortOldest]}
                        layout="list"
                        allowLayoutToggle={false}
                        pageSize={10}
                        unit="câu hỏi"
                        placeholder="Ví dụ: tạm ngừng kinh doanh, phạt vi phạm hợp đồng, thử việc..."
                        renderItem={(f, { query }) => (
                            <QAItem item={f} query={query} detailTo={`${faqBase}/${f.id}`} extra={<><Badge tone={toneFor(f.field, data.fields)}>{f.field}</Badge><span className="flex items-center gap-1"><Eye size={11} /> {f.views.toLocaleString('vi-VN')}</span><span>{f.date}</span></>} />
                        )}
                    />
                </div>
            )}

            {/* ===== TƯ VẤN VIÊN ===== */}
            {tab === 'tu-van-vien' && (
                <div>
                    <SectionTitle icon={UserCheck} title="Mạng lưới tư vấn viên pháp luật" desc="Tìm tư vấn viên theo lĩnh vực chuyên sâu, địa bàn hoặc tổ chức." />
                    <RecordExplorer
                        records={data.consultants}
                        searchKeys={['name', 'org', 'fields', 'area', 'kind']}
                        chipFilter={{ key: 'kind', label: 'Loại hình', order: (a, b) => CONSULTANT_KINDS.indexOf(a) - CONSULTANT_KINDS.indexOf(b) }}
                        selectFilters={[{ key: 'fields', label: 'Lĩnh vực' }, { key: 'area', label: 'Địa bàn' }]}
                        sortOptions={[sortBy('supported', 'Hỗ trợ nhiều nhất', 'supported'), sortBy('experience', 'Kinh nghiệm nhiều nhất', 'experience'), sortBy('name', 'Tên A → Z', 'name', false)]}
                        unit="tư vấn viên"
                        placeholder="Ví dụ: sở hữu trí tuệ, lao động, trọng tài..."
                        renderItem={(c, { query }) => (
                            <Card className="p-5 h-full flex flex-col hover:border-[#4f56ca]/50 hover:shadow-md transition">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4f56ca] to-[#2c1b92] text-white font-bold flex items-center justify-center shrink-0">
                                        {c.kind === 'Tổ chức tư vấn' ? <Briefcase size={20} /> : c.name.split(' ').pop().charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <Badge tone={toneFor(c.kind, CONSULTANT_KINDS)}>{c.kind}</Badge>
                                        <h3 className="font-bold text-sm sm:text-[15px] text-gray-900 mt-1 leading-snug"><Highlight text={c.name} query={query} /></h3>
                                        <p className="text-xs text-gray-500"><Highlight text={c.org} query={query} /></p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-3">{c.fields.map((f) => <Badge key={f} tone="gray">{f}</Badge>)}</div>
                                <div className="grid grid-cols-2 gap-2 mt-3 text-center flex-1 content-end">
                                    <div className="rounded-lg bg-gray-50 py-2"><p className="font-bold text-[#2c1b92]">{c.supported}</p><p className="text-[10px] text-gray-500">DN đã hỗ trợ</p></div>
                                    <div className="rounded-lg bg-gray-50 py-2"><p className="font-bold text-[#2c1b92] flex items-center justify-center gap-1">{c.experience} <Star size={12} className="text-amber-500 fill-amber-400" /></p><p className="text-[10px] text-gray-500">Năm kinh nghiệm</p></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-3">Địa bàn: <Highlight text={c.area} query={query} /></p>
                                <a href={`tel:${c.phone.replace(/\D/g, '')}`} className="mt-3 inline-flex items-center justify-center gap-2 h-9 rounded-lg border border-gray-300 hover:border-[#2c1b92] hover:text-[#2c1b92] text-sm font-semibold text-gray-700 transition-colors"><Phone size={14} /> {c.phone}</a>
                            </Card>
                        )}
                    />
                </div>
            )}

            {askOpen && <AskQuestionModal profile={profile} fields={data.fields} onClose={() => setAskOpen(false)} />}
        </SpecializedShell>
    );
};

export default BusinessSupportPortalPage;

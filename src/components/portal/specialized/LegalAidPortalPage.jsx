import React, { useMemo, useState } from 'react';
import {
    BookOpenText, Compass, Users, FileText, MapPin, Award, Send, Scale, Phone, Building2, ShieldCheck, Clock,
    CheckCircle2, ChevronDown, Briefcase, UserCheck, Gavel, HeartHandshake
} from 'lucide-react';
import {
    SpecializedShell, IntroSection, useTabParam, SectionTitle, Card, Badge, toneFor, StatGrid, QuickNav, ProcessStepper,
    RecordExplorer, Highlight, sortNewest, sortOldest, sortBy
} from './SpecializedKit';
import { buildLegalAid } from '../../../data/portals/specializedData';
import { buildIntros } from '../../../data/portals/introData';

const NETWORK_KINDS = ['Trung tâm', 'Chi nhánh', 'Tổ chức ký hợp đồng', 'Trợ giúp viên pháp lý', 'Luật sư', 'Cộng tác viên'];
const KIND_ICONS = { 'Trung tâm': Building2, 'Chi nhánh': MapPin, 'Tổ chức ký hợp đồng': Briefcase, 'Trợ giúp viên pháp lý': UserCheck, 'Luật sư': Gavel, 'Cộng tác viên': HeartHandshake };
const RESULT_TONE = { 'Thành công': 'emerald', 'Thành công một phần': 'amber', 'Đang thực hiện': 'sky' };
const FORM_ICONS = [Gavel, FileText, ShieldCheck];

const ProcedureItem = ({ item, query }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`bg-white rounded-xl border transition-all ${open ? 'border-[#4f56ca]/50 shadow-md' : 'border-gray-200 hover:border-[#4f56ca]/40'}`}>
            <button onClick={() => setOpen((v) => !v)} className="w-full text-left p-4 flex items-start gap-3">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-[#2c1b92] flex items-center justify-center"><FileText size={17} /></span>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-[15px] text-gray-900"><Highlight text={item.name} query={query} /></h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <Badge tone="gray">{item.level}</Badge>
                        <Badge tone="amber"><Clock size={11} /> {item.time}</Badge>
                        <Badge tone="emerald">{item.fee}</Badge>
                    </div>
                </div>
                <ChevronDown size={18} className={`shrink-0 text-gray-400 mt-1 transition-transform ${open ? 'rotate-180 text-[#2c1b92]' : ''}`} />
            </button>
            {open && (
                <div className="px-4 pb-4 pl-16 spx-fade-up text-sm">
                    <p className="font-semibold text-gray-700 mb-1.5">Thành phần hồ sơ</p>
                    <ul className="space-y-1.5">
                        {item.docs.map((d) => <li key={d} className="flex items-start gap-2 text-gray-600"><CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" /> {d}</li>)}
                    </ul>
                    <p className="text-xs text-gray-500 mt-3">Cơ quan thực hiện: {item.agency}</p>
                </div>
            )}
        </div>
    );
};

const LegalAidPortalPage = ({ profile, Header, Footer }) => {
    const data = useMemo(() => buildLegalAid(profile), [profile]);

    const intro = useMemo(() => buildIntros(profile).legalAid, [profile]);
    const tabs = [
        { key: 'gioi-thieu', label: 'Giới thiệu chung', icon: BookOpenText },
        { key: 'tong-quan', label: 'Tổng quan', icon: Compass },
        { key: 'doi-tuong', label: 'Đối tượng & Hình thức', icon: Users, count: data.beneficiaries.length },
        { key: 'quy-trinh', label: 'Quy trình & Thủ tục', icon: FileText, count: data.procedures.length },
        { key: 'mang-luoi', label: 'Mạng lưới TGPL', icon: MapPin, count: data.network.length },
        { key: 'vu-viec', label: 'Vụ việc tiêu biểu', icon: Award, count: data.cases.length }
    ];
    const [tab, setTab] = useTabParam(tabs);


    return (
        <SpecializedShell
            profile={profile} Header={Header} Footer={Footer}
            title="Trợ giúp pháp lý"
            subtitle={`Dịch vụ pháp lý miễn phí của Nhà nước, bảo vệ quyền và lợi ích hợp pháp của ${profile.people}`}
            tabs={tabs} activeTab={tab} onTabChange={setTab}
        >
            {/* ===== GIỚI THIỆU CHUNG ===== */}
            {tab === 'gioi-thieu' && <IntroSection intro={intro} heroIcon={Scale} />}

            {/* ===== TỔNG QUAN ===== */}
            {tab === 'tong-quan' && (
                <div className="space-y-8">
                    <StatGrid items={[
                        { icon: Scale, value: profile.stats.legalAidCases.toLocaleString('vi-VN'), label: 'Vụ việc TGPL năm 2025' },
                        { icon: UserCheck, value: profile.stats.collaborators, label: 'Trợ giúp viên, luật sư, cộng tác viên' },
                        { icon: Briefcase, value: data.network.filter((n) => n.kind === 'Tổ chức ký hợp đồng').length, label: 'Tổ chức hành nghề ký hợp đồng' },
                        { icon: ShieldCheck, value: '96,8%', label: 'Người được trợ giúp hài lòng' }
                    ]} />

                    <Card className="p-5 sm:p-7">
                        <SectionTitle icon={FileText} title="Quy trình trợ giúp pháp lý 5 bước" desc="Bấm vào từng bước để xem nội dung và thời hạn thực hiện." />
                        <ProcessStepper steps={data.steps} />
                    </Card>

                    <div>
                        <SectionTitle icon={Compass} title="Tra cứu nhanh" desc="Truy cập nhanh các nhóm thông tin của chuyên trang." />
                        <QuickNav onGo={setTab} items={[
                            { key: 'doi-tuong', icon: Users, label: 'Đối tượng & Hình thức', count: data.beneficiaries.length, desc: 'Kiểm tra bạn có thuộc diện được trợ giúp pháp lý miễn phí.' },
                            { key: 'quy-trinh', icon: FileText, label: 'Thủ tục hành chính', count: data.procedures.length, desc: 'Thành phần hồ sơ, thời hạn giải quyết các thủ tục về TGPL.' },
                            { key: 'mang-luoi', icon: MapPin, label: 'Mạng lưới TGPL', count: data.network.length, desc: 'Chi nhánh, tổ chức ký hợp đồng, trợ giúp viên và luật sư.' },
                            { key: 'vu-viec', icon: Award, label: 'Vụ việc tiêu biểu', count: data.cases.length, desc: 'Các vụ việc trợ giúp pháp lý thành công, có tác động tích cực.' }
                        ]} />
                    </div>
                </div>
            )}

            {/* ===== ĐỐI TƯỢNG & HÌNH THỨC ===== */}
            {tab === 'doi-tuong' && (
                <div className="space-y-8">
                    <div>
                        <SectionTitle icon={Scale} title="3 hình thức trợ giúp pháp lý" desc="Người thực hiện trợ giúp pháp lý gồm Trợ giúp viên pháp lý, luật sư thực hiện theo hợp đồng và cộng tác viên." />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.forms.map((f, i) => {
                                const Icon = FORM_ICONS[i];
                                return (
                                    <Card key={f.name} className="p-5 hover:shadow-md transition">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4f56ca] to-[#2c1b92] text-amber-300 flex items-center justify-center mb-3"><Icon size={21} /></div>
                                        <h3 className="font-bold text-gray-900">{f.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{f.desc}</p>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <SectionTitle icon={Users} title="Tra cứu diện người được trợ giúp pháp lý" desc="Tìm theo nhóm đối tượng hoặc giấy tờ chứng minh." />
                        <RecordExplorer
                            records={data.beneficiaries}
                            searchKeys={['group', 'condition', 'proof']}
                            chipFilter={{ key: 'condition', label: 'Điều kiện' }}
                            sortOptions={[]}
                            pageSize={9}
                            unit="nhóm đối tượng"
                            placeholder="Ví dụ: người cao tuổi, hộ nghèo, trẻ em, khuyết tật..."
                            renderItem={(b, { query, layout }) => (
                                <Card className={`p-4 sm:p-5 h-full flex ${layout === 'list' ? 'flex-row items-center gap-4' : 'flex-col'} hover:border-[#4f56ca]/50 hover:shadow-md transition`}>
                                    <div className="flex-1 min-w-0">
                                        <Badge tone={b.condition.startsWith('Không') ? 'emerald' : 'amber'}>{b.condition}</Badge>
                                        <h3 className="font-bold text-gray-900 mt-2 leading-snug"><Highlight text={b.group} query={query} /></h3>
                                        <p className="text-xs text-gray-500 mt-2"><span className="font-semibold text-gray-600">Giấy tờ chứng minh:</span> <Highlight text={b.proof} query={query} /></p>
                                    </div>
                                </Card>
                            )}
                        />
                    </div>
                </div>
            )}

            {/* ===== QUY TRÌNH & THỦ TỤC ===== */}
            {tab === 'quy-trinh' && (
                <div className="space-y-8">
                    <Card className="p-5 sm:p-7">
                        <SectionTitle icon={Clock} title="Quy trình tiếp nhận và giải quyết yêu cầu" desc="Quy trình khép kín, minh bạch; người dân được thông báo kết quả ở từng bước." />
                        <ProcessStepper steps={data.steps} />
                    </Card>
                    <div>
                        <SectionTitle icon={FileText} title="Thủ tục hành chính về trợ giúp pháp lý" desc="Bấm vào từng thủ tục để xem thành phần hồ sơ." />
                        <RecordExplorer
                            records={data.procedures}
                            searchKeys={['name', 'docs', 'time']}
                            sortOptions={[]}
                            layout="list"
                            allowLayoutToggle={false}
                            pageSize={10}
                            unit="thủ tục"
                            placeholder="Tìm thủ tục, ví dụ: yêu cầu, cộng tác viên, khiếu nại..."
                            renderItem={(item, { query }) => <ProcedureItem item={item} query={query} />}
                        />
                    </div>
                </div>
            )}

            {/* ===== MẠNG LƯỚI ===== */}
            {tab === 'mang-luoi' && (
                <div>
                    <SectionTitle icon={MapPin} title={`Mạng lưới trợ giúp pháp lý ${profile.name}`} desc="Tìm theo tên, địa bàn hoặc lĩnh vực; lọc theo loại hình tổ chức, người thực hiện." />
                    <RecordExplorer
                        records={data.network}
                        searchKeys={['name', 'area', 'address', 'phone', 'fields']}
                        chipFilter={{ key: 'kind', label: 'Loại hình', order: (a, b) => NETWORK_KINDS.indexOf(a) - NETWORK_KINDS.indexOf(b) }}
                        selectFilters={[{ key: 'fields', label: 'Lĩnh vực' }, { key: 'area', label: 'Địa bàn' }]}
                        sortOptions={[{ key: 'kind', label: 'Theo loại hình', compare: (a, b) => NETWORK_KINDS.indexOf(a.kind) - NETWORK_KINDS.indexOf(b.kind) }, sortBy('name', 'Tên A → Z', 'name', false)]}
                        pageSize={9}
                        unit="đầu mối"
                        placeholder="Ví dụ: chi nhánh, luật sư, đất đai, tên xã/phường..."
                        renderItem={(n, { query }) => {
                            const Icon = KIND_ICONS[n.kind] || Building2;
                            return (
                                <Card className="p-4 sm:p-5 h-full flex flex-col hover:border-[#4f56ca]/50 hover:shadow-md transition">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#2c1b92] flex items-center justify-center shrink-0"><Icon size={19} /></div>
                                        <div className="min-w-0 flex-1">
                                            <Badge tone={toneFor(n.kind, NETWORK_KINDS)}>{n.kind}</Badge>
                                            <h3 className="font-bold text-sm sm:text-[15px] text-gray-900 mt-1.5 leading-snug"><Highlight text={n.name} query={query} /></h3>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 text-xs text-gray-600 mt-3 flex-1">
                                        <p className="flex items-start gap-1.5"><MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" /><span><Highlight text={n.address} query={query} /></span></p>
                                        <p className="text-gray-500">Địa bàn: <Highlight text={n.area} query={query} /></p>
                                        <div className="flex flex-wrap gap-1 pt-1">{n.fields.map((f) => <Badge key={f} tone="gray">{f}</Badge>)}</div>
                                    </div>
                                    <a href={`tel:${n.phone.replace(/\D/g, '')}`} className="mt-4 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"><Phone size={14} /> {n.phone}</a>
                                </Card>
                            );
                        }}
                    />
                </div>
            )}

            {/* ===== VỤ VIỆC TIÊU BIỂU ===== */}
            {tab === 'vu-viec' && (
                <div>
                    <SectionTitle icon={Award} title="Vụ việc trợ giúp pháp lý tiêu biểu" desc="Lọc theo lĩnh vực, hình thức, kết quả; tìm theo địa bàn hoặc đối tượng được trợ giúp." />
                    <RecordExplorer
                        records={data.cases}
                        searchKeys={['title', 'locality', 'beneficiary', 'executor', 'field']}
                        chipFilter={{ key: 'field', label: 'Lĩnh vực' }}
                        selectFilters={[{ key: 'form', label: 'Hình thức' }, { key: 'result', label: 'Kết quả' }, { key: 'locality', label: 'Địa bàn' }]}
                        layout="list"
                        pageSize={8}
                        unit="vụ việc"
                        placeholder="Ví dụ: đất đai, trẻ em, bạo lực gia đình, tên xã/phường..."
                        renderItem={(c, { query, layout }) => (
                            <Card className={`p-4 sm:p-5 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition ${layout === 'list' ? 'flex flex-col sm:flex-row sm:items-center gap-3' : 'flex flex-col'}`}>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        <Badge tone={toneFor(c.field, data.fields)}>{c.field}</Badge>
                                        <Badge tone="gray">{c.form}</Badge>
                                        <Badge tone={RESULT_TONE[c.result]}>{c.result}</Badge>
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-[15px] text-gray-900 leading-snug"><Highlight text={c.title} query={query} /></h3>
                                    <p className="text-xs text-gray-500 mt-1.5">Đối tượng: <Highlight text={c.beneficiary} query={query} /></p>
                                </div>
                                <div className={`text-xs text-gray-500 ${layout === 'list' ? 'sm:text-right shrink-0' : 'mt-3 pt-3 border-t border-gray-100'}`}>
                                    <p className="font-semibold text-gray-700"><Highlight text={c.executor} query={query} /></p>
                                    <p>{c.date}</p>
                                </div>
                            </Card>
                        )}
                        sortOptions={[sortNewest, sortOldest]}
                    />
                </div>
            )}

        </SpecializedShell>
    );
};

export default LegalAidPortalPage;

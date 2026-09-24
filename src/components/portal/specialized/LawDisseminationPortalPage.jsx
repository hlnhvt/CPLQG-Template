import React, { useMemo } from 'react';
import {
    BookOpenText, Compass, Newspaper, FileText, MessageCircleQuestion, Library, HeartHandshake, Calendar, Eye, Download,
    Megaphone, Users, CheckCircle2, BookOpen, FileImage, PlayCircle, Headphones, FileStack, MapPin, Landmark
} from 'lucide-react';
import {
    SpecializedShell, IntroSection, useTabParam, SectionTitle, Card, Badge, toneFor, StatGrid, QuickNav, ProcessStepper,
    RecordExplorer, Highlight, QAItem, sortNewest, sortOldest, sortBy
} from './SpecializedKit';
import { buildLawDissemination } from '../../../data/portals/specializedData';
import { buildIntros } from '../../../data/portals/introData';

const LIB_ICONS = { 'Sách hỏi đáp': BookOpen, 'Cẩm nang': FileStack, 'Tờ gấp': FileText, 'Infographic': FileImage, 'Video': PlayCircle, 'Podcast': Headphones };
const MED_RESULT_TONE = { 'Hòa giải thành': 'emerald', 'Hòa giải không thành': 'rose', 'Đang hòa giải': 'sky' };
const MEDIATION_STEPS = [
    { title: 'Tiếp nhận', desc: 'Tổ hòa giải tiếp nhận vụ việc theo yêu cầu của một hoặc các bên, hoặc khi hòa giải viên chứng kiến, biết vụ việc.', time: 'Ngay khi phát sinh' },
    { title: 'Chuẩn bị', desc: 'Phân công hòa giải viên, tìm hiểu nguyên nhân, nghiên cứu quy định pháp luật và phong tục, tập quán tốt đẹp liên quan.', time: '1 - 3 ngày' },
    { title: 'Tiến hành hòa giải', desc: 'Hòa giải viên giúp các bên hiểu quyền, nghĩa vụ, phân tích, thuyết phục để các bên tự nguyện thỏa thuận.', time: 'Theo thỏa thuận các bên' },
    { title: 'Kết thúc & theo dõi', desc: 'Lập văn bản hòa giải thành hoặc không thành; theo dõi, đôn đốc việc thực hiện thỏa thuận đã đạt được.', time: 'Sau hòa giải' }
];
const year = (r) => r.date.slice(-4);

const LawDisseminationPortalPage = ({ profile, Header, Footer }) => {
    const data = useMemo(() => buildLawDissemination(profile), [profile]);
    const intro = useMemo(() => buildIntros(profile).dissemination, [profile]);
    const tabs = [
        { key: 'gioi-thieu', label: 'Giới thiệu chung', icon: BookOpenText },
        { key: 'tong-quan', label: 'Tổng quan', icon: Compass },
        { key: 'tin-tuc', label: 'Tin tức & Sự kiện', icon: Newspaper, count: data.news.length },
        { key: 'van-ban', label: 'Văn bản chỉ đạo', icon: FileText, count: data.docs.length },
        { key: 'hoi-dap', label: 'Tình huống & Hỏi đáp', icon: MessageCircleQuestion, count: data.situations.length },
        { key: 'tu-sach', label: 'Tủ sách pháp luật', icon: Library, count: data.library.length },
        { key: 'hoa-giai', label: 'Hòa giải ở cơ sở', icon: HeartHandshake, count: data.mediation.length }
    ];
    const [tab, setTab] = useTabParam(tabs);
    const newsCats = [...new Set(data.news.map((n) => n.category))];
    const sitCats = [...new Set(data.situations.map((n) => n.category))];
    const docTypes = [...new Set(data.docs.map((n) => n.type))];
    const libTypes = Object.keys(LIB_ICONS);
    const mediationDone = data.mediation.filter((m) => m.result === 'Hòa giải thành').length;

    return (
        <SpecializedShell
            profile={profile} Header={Header} Footer={Footer}
            title="Phổ biến, giáo dục pháp luật"
            subtitle={`Đưa pháp luật vào cuộc sống, nâng cao ý thức tôn trọng và chấp hành pháp luật của ${profile.people}`}
            tabs={tabs} activeTab={tab} onTabChange={setTab}
        >
            {/* ===== GIỚI THIỆU CHUNG ===== */}
            {tab === 'gioi-thieu' && <IntroSection intro={intro} heroIcon={Megaphone} />}

            {/* ===== TỔNG QUAN ===== */}
            {tab === 'tong-quan' && (
                <div className="space-y-8">
                    <StatGrid items={[
                        { icon: Megaphone, value: profile.stats.disseminationEvents.toLocaleString('vi-VN'), label: 'Cuộc tuyên truyền năm 2025' },
                        { icon: Users, value: profile.stats.reached, label: 'Lượt người được tiếp cận' },
                        { icon: HeartHandshake, value: profile.stats.mediationTeams.toLocaleString('vi-VN'), label: 'Tổ hòa giải ở cơ sở' },
                        { icon: CheckCircle2, value: profile.stats.mediationRate, label: 'Tỷ lệ hòa giải thành' }
                    ]} />

                    <div>
                        <SectionTitle icon={Compass} title="Tra cứu nhanh" desc="Các nhóm thông tin phổ biến, giáo dục pháp luật." />
                        <QuickNav onGo={setTab} items={[
                            { key: 'tin-tuc', icon: Newspaper, label: 'Tin tức & Sự kiện', count: data.news.length, desc: 'Hoạt động tuyên truyền, Ngày Pháp luật, cuộc thi tìm hiểu pháp luật.' },
                            { key: 'van-ban', icon: FileText, label: 'Văn bản chỉ đạo', count: data.docs.length, desc: 'Luật, nghị định, kế hoạch, hướng dẫn của Trung ương và địa phương.' },
                            { key: 'hoi-dap', icon: MessageCircleQuestion, label: 'Tình huống & Hỏi đáp', count: data.situations.length, desc: 'Giải đáp tình huống pháp luật thường gặp trong đời sống.' },
                            { key: 'tu-sach', icon: Library, label: 'Tủ sách pháp luật', count: data.library.length, desc: 'Sách, cẩm nang, tờ gấp, infographic, video, podcast pháp luật.' },
                            { key: 'hoa-giai', icon: HeartHandshake, label: 'Hòa giải ở cơ sở', count: data.mediation.length, desc: 'Quy trình và các vụ việc hòa giải tiêu biểu tại cơ sở.' }
                        ]} />
                    </div>

                    <div>
                        <SectionTitle icon={Newspaper} title="Tin mới nhất" action={<button onClick={() => setTab('tin-tuc')} className="text-sm font-semibold text-[#4f56ca] hover:text-[#2c1b92]">Xem tất cả →</button>} />
                        <div className="grid md:grid-cols-3 gap-4">
                            {data.news.slice(0, 3).map((n) => (
                                <Card key={n.id} className="overflow-hidden group hover:shadow-lg transition">
                                    <div className="aspect-[16/9] overflow-hidden bg-gray-100"><img src={n.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                                    <div className="p-4">
                                        <Badge tone={toneFor(n.category, newsCats)}>{n.category}</Badge>
                                        <h3 className="font-bold text-sm text-gray-900 mt-2 line-clamp-2 group-hover:text-[#2c1b92]">{n.title}</h3>
                                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Calendar size={12} /> {n.date}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== TIN TỨC ===== */}
            {tab === 'tin-tuc' && (
                <div>
                    <SectionTitle icon={Newspaper} title="Tin tức & Sự kiện phổ biến, giáo dục pháp luật" desc="Tìm theo tiêu đề, nội dung, địa bàn; lọc theo chuyên mục." />
                    <RecordExplorer
                        records={data.news}
                        searchKeys={['title', 'summary', 'locality', 'category']}
                        chipFilter={{ key: 'category', label: 'Chuyên mục' }}
                        selectFilters={[{ key: 'locality', label: 'Địa bàn' }, { key: 'year', label: 'Năm', getValue: year }]}
                        sortOptions={[sortNewest, sortOldest, sortBy('views', 'Xem nhiều nhất', 'views')]}
                        unit="tin bài"
                        placeholder="Ví dụ: Ngày Pháp luật, hòa giải, chuyển đổi số, tên xã/phường..."
                        renderItem={(n, { query, layout }) => (
                            <Card className={`overflow-hidden group hover:shadow-lg hover:border-[#4f56ca]/40 transition h-full ${layout === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
                                <div className={`overflow-hidden bg-gray-100 shrink-0 ${layout === 'list' ? 'sm:w-56 aspect-[16/9] sm:aspect-auto' : 'aspect-[16/9]'}`}>
                                    <img src={n.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex flex-wrap gap-1.5"><Badge tone={toneFor(n.category, newsCats)}>{n.category}</Badge><Badge tone="gray"><MapPin size={11} /> {n.locality}</Badge></div>
                                    <h3 className="font-bold text-sm sm:text-[15px] text-gray-900 mt-2 leading-snug group-hover:text-[#2c1b92] line-clamp-2"><Highlight text={n.title} query={query} /></h3>
                                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed line-clamp-2 flex-1"><Highlight text={n.summary} query={query} /></p>
                                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-3"><span className="flex items-center gap-1"><Calendar size={12} /> {n.date}</span><span className="flex items-center gap-1"><Eye size={12} /> {n.views.toLocaleString('vi-VN')}</span></div>
                                </div>
                            </Card>
                        )}
                    />
                </div>
            )}

            {/* ===== VĂN BẢN ===== */}
            {tab === 'van-ban' && (
                <div>
                    <SectionTitle icon={Landmark} title="Văn bản chỉ đạo, hướng dẫn" desc="Tra cứu theo số, ký hiệu hoặc trích yếu; lọc theo cấp ban hành, loại văn bản, cơ quan ban hành, năm." />
                    <RecordExplorer
                        records={data.docs}
                        searchKeys={['code', 'title', 'agency', 'type']}
                        chipFilter={{ key: 'level', label: 'Cấp ban hành' }}
                        selectFilters={[{ key: 'type', label: 'Loại văn bản' }, { key: 'agency', label: 'Cơ quan ban hành' }, { key: 'year', label: 'Năm ban hành', getValue: year, order: (a, b) => b - a }]}
                        layout="list"
                        pageSize={10}
                        unit="văn bản"
                        placeholder="Ví dụ: 14/2012/QH13, hòa giải, Ngày Pháp luật, kế hoạch..."
                        renderItem={(d, { query, layout }) => (
                            <Card className={`p-4 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition ${layout === 'list' ? 'flex flex-col md:flex-row md:items-center gap-3' : 'flex flex-col'}`}>
                                <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"><FileText size={20} /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-sm font-bold text-[#2c1b92]"><Highlight text={d.code} query={query} /></span>
                                        <Badge tone={toneFor(d.type, docTypes)}>{d.type}</Badge>
                                        <Badge tone={d.level === 'Trung ương' ? 'rose' : 'indigo'}>{d.level}</Badge>
                                    </div>
                                    <h3 className="text-sm text-gray-800 mt-1 leading-snug"><Highlight text={d.title} query={query} /></h3>
                                    <p className="text-xs text-gray-500 mt-1"><Highlight text={d.agency} query={query} /> · Ban hành {d.date}</p>
                                </div>
                                <button type="button" className={`${layout === 'list' ? 'shrink-0' : 'mt-3'} inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg border border-gray-300 hover:border-[#2c1b92] hover:text-[#2c1b92] text-sm font-semibold text-gray-700 transition-colors`}><Download size={14} /> Tải về <span className="text-[11px] text-gray-400 font-normal">{d.size}</span></button>
                            </Card>
                        )}
                    />
                </div>
            )}

            {/* ===== HỎI ĐÁP ===== */}
            {tab === 'hoi-dap' && (
                <div>
                    <SectionTitle icon={MessageCircleQuestion} title="Tình huống pháp luật & Hỏi đáp" desc="Bấm vào câu hỏi để xem giải đáp và căn cứ pháp lý. Có thể gõ không dấu." />
                    <RecordExplorer
                        records={data.situations}
                        searchKeys={['title', 'a', 'basis', 'category']}
                        chipFilter={{ key: 'category', label: 'Lĩnh vực' }}
                        sortOptions={[sortBy('views', 'Được quan tâm nhất', 'views'), sortNewest, sortOldest]}
                        layout="list"
                        allowLayoutToggle={false}
                        pageSize={10}
                        unit="câu hỏi"
                        placeholder="Ví dụ: ly hôn, sổ đỏ, tảo hôn, nồng độ cồn, thừa kế..."
                        renderItem={(s, { query }) => (
                            <QAItem item={s} query={query} extra={<><Badge tone={toneFor(s.category, sitCats)}>{s.category}</Badge><span className="flex items-center gap-1"><Eye size={11} /> {s.views.toLocaleString('vi-VN')}</span><span>{s.date}</span></>} />
                        )}
                    />
                </div>
            )}

            {/* ===== TỦ SÁCH ===== */}
            {tab === 'tu-sach' && (
                <div>
                    <SectionTitle icon={Library} title="Tủ sách pháp luật điện tử" desc="Tài liệu miễn phí dưới nhiều định dạng; lọc theo loại tài liệu, chủ đề, ngôn ngữ." />
                    <RecordExplorer
                        records={data.library}
                        searchKeys={['title', 'topic', 'type', 'publisher', 'language']}
                        chipFilter={{ key: 'type', label: 'Loại tài liệu', order: (a, b) => libTypes.indexOf(a) - libTypes.indexOf(b) }}
                        selectFilters={[{ key: 'topic', label: 'Chủ đề' }, { key: 'language', label: 'Ngôn ngữ' }, { key: 'publisher', label: 'Đơn vị phát hành' }]}
                        sortOptions={[sortNewest, sortBy('downloads', 'Tải nhiều nhất', 'downloads'), sortBy('views', 'Xem nhiều nhất', 'views')]}
                        gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        unit="tài liệu"
                        placeholder="Ví dụ: cẩm nang lao động, video giao thông, song ngữ..."
                        renderItem={(b, { query, layout }) => {
                            const Icon = LIB_ICONS[b.type] || BookOpen;
                            return (
                                <Card className={`p-4 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition ${layout === 'list' ? 'flex flex-col sm:flex-row sm:items-center gap-4' : 'flex flex-col'}`}>
                                    <div className={`${layout === 'list' ? 'w-14 h-14' : 'w-full h-24 mb-3'} rounded-xl bg-gradient-to-br from-indigo-50 to-amber-50 border border-indigo-100 flex items-center justify-center shrink-0`}>
                                        <Icon size={layout === 'list' ? 24 : 34} className="text-[#2c1b92]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap gap-1.5"><Badge tone={toneFor(b.type, libTypes)}>{b.type}</Badge><Badge tone="gray">{b.format} · {b.size}</Badge></div>
                                        <h3 className="font-bold text-sm text-gray-900 mt-2 leading-snug"><Highlight text={b.title} query={query} /></h3>
                                        <p className="text-[11px] text-gray-500 mt-1"><Highlight text={b.publisher} query={query} /> · {b.date}</p>
                                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1.5"><span className="flex items-center gap-1"><Eye size={11} /> {b.views.toLocaleString('vi-VN')}</span><span className="flex items-center gap-1"><Download size={11} /> {b.downloads.toLocaleString('vi-VN')}</span></div>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-2 ${layout === 'list' ? 'shrink-0 w-full sm:w-52' : 'mt-3'}`}>
                                        <button type="button" className="h-9 rounded-lg bg-[#2c1b92] hover:bg-[#4f56ca] text-white text-xs font-semibold transition-colors">{b.format === 'MP4' || b.format === 'MP3' ? 'Phát' : 'Xem'}</button>
                                        <button type="button" className="h-9 rounded-lg border border-gray-300 hover:border-[#2c1b92] hover:text-[#2c1b92] text-xs font-semibold text-gray-700 transition-colors inline-flex items-center justify-center gap-1"><Download size={13} /> Tải</button>
                                    </div>
                                </Card>
                            );
                        }}
                    />
                </div>
            )}

            {/* ===== HÒA GIẢI ===== */}
            {tab === 'hoa-giai' && (
                <div className="space-y-8">
                    <StatGrid items={[
                        { icon: HeartHandshake, value: profile.stats.mediationTeams.toLocaleString('vi-VN'), label: 'Tổ hòa giải ở cơ sở' },
                        { icon: CheckCircle2, value: profile.stats.mediationRate, label: 'Tỷ lệ hòa giải thành năm 2025' },
                        { icon: FileText, value: data.mediation.length, label: 'Vụ việc tiêu biểu được cập nhật' },
                        { icon: Users, value: mediationDone, label: 'Vụ việc tiêu biểu hòa giải thành' }
                    ]} />
                    <Card className="p-5 sm:p-7">
                        <SectionTitle icon={HeartHandshake} title="Quy trình hòa giải ở cơ sở" desc="Theo Luật Hòa giải ở cơ sở năm 2013. Bấm từng bước để xem chi tiết." />
                        <ProcessStepper steps={MEDIATION_STEPS} />
                    </Card>
                    <div>
                        <SectionTitle icon={FileText} title="Vụ việc hòa giải tiêu biểu" desc="Lọc theo kết quả, lĩnh vực và địa bàn." />
                        <RecordExplorer
                            records={data.mediation}
                            searchKeys={['title', 'team', 'locality', 'field']}
                            chipFilter={{ key: 'result', label: 'Kết quả' }}
                            selectFilters={[{ key: 'field', label: 'Lĩnh vực' }, { key: 'locality', label: 'Địa bàn' }]}
                            layout="list"
                            pageSize={8}
                            unit="vụ việc"
                            placeholder="Ví dụ: ranh giới đất, thừa kế, ngõ đi chung, tên xã/phường..."
                            renderItem={(m, { query }) => (
                                <Card className="p-4 h-full hover:border-[#4f56ca]/50 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap gap-1.5"><Badge tone={MED_RESULT_TONE[m.result]}>{m.result}</Badge><Badge tone="gray">{m.field}</Badge></div>
                                        <h3 className="font-bold text-sm text-gray-900 mt-2 leading-snug"><Highlight text={m.title} query={query} /></h3>
                                        <p className="text-xs text-gray-500 mt-1"><Highlight text={m.team} query={query} /></p>
                                    </div>
                                    <span className="text-xs text-gray-400 shrink-0 flex items-center gap-1"><Calendar size={12} /> {m.date}</span>
                                </Card>
                            )}
                        />
                    </div>
                </div>
            )}
        </SpecializedShell>
    );
};

export default LawDisseminationPortalPage;

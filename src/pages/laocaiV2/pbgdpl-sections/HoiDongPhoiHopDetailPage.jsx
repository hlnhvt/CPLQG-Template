import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, FileText, MapPin, CalendarDays, Users, ClipboardList, Hash, Layers } from 'lucide-react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import { LAOCAI_V2_COUNCILS, findCouncil } from '../../../data/laocaiV2Councils';

// Chi tiết Hội đồng phối hợp PBGDPL: thông tin chung, thành viên, Tổ thư ký. Dữ liệu mẫu.

const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Icon size={17} /></div>
        <div>
            <p className="text-[12px] text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

const PeopleTable = ({ title, icon: Icon, people, roleHeader }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <Icon size={18} className="text-blue-600" />
            <h2 className="text-[17px] font-bold text-[#1b2b49]">{title}</h2>
            <span className="ml-auto text-sm text-gray-500">{people.length} người</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-slate-50 text-slate-600 text-[12px] uppercase tracking-wide border-b border-gray-100">
                        <th className="px-5 py-3 font-bold w-16 text-center">STT</th>
                        <th className="px-5 py-3 font-bold">Chức vụ, cơ quan công tác</th>
                        <th className="px-5 py-3 font-bold w-72">{roleHeader}</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {people.map((p, i) => (
                        <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-slate-50/70">
                            <td className="px-5 py-3.5 text-center text-gray-500 font-medium">{i + 1}</td>
                            <td className="px-5 py-3.5 font-semibold text-[#1b2b49]">{p.position}</td>
                            <td className="px-5 py-3.5 text-gray-700">{p.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const HoiDongPhoiHopDetailPage = () => {
    const { id } = useParams();
    const council = findCouncil(id) || LAOCAI_V2_COUNCILS[0];

    useEffect(() => {
        document.title = `${council.name} - Cổng Pháp luật tỉnh Lào Cai`;
        window.scrollTo(0, 0);
    }, [council.id]);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[
                    { label: 'Phổ biến, giáo dục pháp luật' },
                    { label: 'Hội đồng phối hợp PBGDPL tỉnh', to: '/lao-cai-v2/hoi-dong-phoi-hop' },
                    { label: 'Chi tiết' },
                ]}
                title={council.name}
                subtitle={`Thông tin chung, thành viên và Tổ thư ký của ${council.name.charAt(0).toLowerCase() + council.name.slice(1)}`}
            />

            <div className="container mx-auto px-4 max-w-[1286px] pt-8 flex flex-col gap-5">
                <Link to="/lao-cai-v2/hoi-dong-phoi-hop" className="self-start flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800">
                    <ArrowLeft size={16} /> Quay lại danh sách hội đồng
                </Link>

                {/* Thông tin chung */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
                        <h2 className="text-[17px] font-bold text-[#1b2b49]">Thông tin chung</h2>
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">{council.status}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <InfoItem icon={Hash} label="Mã hội đồng" value={council.code} />
                        <InfoItem icon={Layers} label="Cấp hội đồng" value={council.level} />
                        <InfoItem icon={Building2} label="Đơn vị thường trực" value={council.unit} />
                        <InfoItem icon={MapPin} label="Địa bàn" value={council.area} />
                        <InfoItem icon={FileText} label="Quyết định thành lập / kiện toàn" value={`Số ${council.decision} ngày ${council.decisionDate}`} />
                        <InfoItem icon={CalendarDays} label="Nhiệm kỳ" value={council.term} />
                        <InfoItem icon={Users} label="Số thành viên" value={`${council.members.length} thành viên`} />
                        <InfoItem icon={ClipboardList} label="Tổ thư ký" value={`${council.secretariat.length} người`} />
                    </div>
                </div>

                <PeopleTable title="Thành viên Hội đồng" icon={Users} people={council.members} roleHeader="Chức danh trong Hội đồng" />
                <PeopleTable title="Tổ thư ký giúp việc Hội đồng" icon={ClipboardList} people={council.secretariat} roleHeader="Nhiệm vụ trong Tổ thư ký" />
            </div>
        </div>
    );
};

export default HoiDongPhoiHopDetailPage;

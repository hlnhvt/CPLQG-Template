import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, MapPin, Award, CheckCircle, ChevronRight, Hash, Phone, Mail, Clock } from 'lucide-react';

const NguoiThucHienTGPLDetailPage = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Mock Data based on ID
    const worker = {
        name: 'Nguyễn Văn An',
        code: 'TGV.HN.001',
        title: 'Trợ giúp viên pháp lý hạng II',
        org: 'Trung tâm Trợ giúp pháp lý Nhà nước Thành phố Hà Nội',
        orgId: 1, // To link back to org detail
        province: 'Hà Nội',
        experience: '12 năm',
        education: 'Thạc sĩ Luật học',
        phone: '0988.xxx.xxx',
        email: 'an.nv@tgplhanoi.gov.vn',
        status: 'Đang hoạt động',
        fields: ['Hình sự', 'Dân sự', 'Hành chính'],
        bio: 'Ông Nguyễn Văn An đã có hơn 12 năm kinh nghiệm công tác trong lĩnh vực trợ giúp pháp lý. Từng trực tiếp tham gia bào chữa, bảo vệ thành công quyền và lợi ích hợp pháp cho hàng trăm người yếu thế trong xã hội, đặc biệt là người nghèo và trẻ em có hoàn cảnh khó khăn trên địa bàn Thủ đô.',
        achievements: [
            'Bằng khen của Bộ trưởng Bộ Tư pháp năm 2021',
            'Chiến sĩ thi đua cấp cơ sở nhiều năm liền (2018 - 2022)'
        ]
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">

            {/* Breadcrumb Area */}
            <div className="bg-white border-b border-gray-200 py-3">
                <div className="container mx-auto px-4 max-w-[1000px]">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                        <Link to="/tro-giup-phap-ly/nguoi-thuc-hien" className="hover:text-blue-600 transition-colors">Người thực hiện TGPL</Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-800 font-medium truncate max-w-xs">{worker.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-[1000px] mt-8">

                {/* Profile Header (No Avatar) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                    {/* Top gradient accent line */}
                    <div className="h-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500"></div>

                    <div className="p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                        <div className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold uppercase">
                                Trợ giúp viên pháp lý
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                {worker.name}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-600 shrink-0" />
                                    <Link to={`/tro-giup-phap-ly/to-chuc/${worker.orgId}`} className="text-gray-700 hover:text-blue-600 font-bold hover:underline transition-colors leading-relaxed">
                                        {worker.org}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {worker.status}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-full uppercase tracking-wider">
                                    <MapPin size={12} className="text-gray-500" />
                                    {worker.province}
                                </span>
                            </div>
                        </div>

                        {/* Quick Contact Card on Right */}
                        <div className="w-full md:w-auto bg-gray-50/80 rounded-xl p-5 border border-gray-100 min-w-[280px]">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Liên hệ trợ giúp</h4>
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2.5 text-sm">
                                    <Phone size={15} className="text-blue-600 shrink-0" />
                                    <span className="font-bold text-gray-800">{worker.phone}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm">
                                    <Mail size={15} className="text-blue-600 shrink-0" />
                                    <a href={`mailto:${worker.email}`} className="font-bold text-blue-600 hover:underline break-all">{worker.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Credentials Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                                <Hash size={18} className="text-blue-600" />
                                Thông tin cá nhân
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-blue-600 shrink-0">
                                        <Hash size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Mã thẻ</p>
                                        <p className="font-bold text-gray-900 text-sm tracking-wide">{worker.code}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-blue-600 shrink-0">
                                        <Award size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Trình độ chuyên môn</p>
                                        <p className="font-bold text-gray-900 text-sm">{worker.education}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expertise Fields Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                                <CheckCircle size={18} className="text-blue-600" />
                                Lĩnh vực
                            </h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Lĩnh vực pháp luật được cấp phép hoạt động và thực hiện hỗ trợ trợ giúp pháp lý cho công dân:
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {worker.fields.map((field, idx) => (
                                    <span key={idx} className="inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-bold bg-blue-50/50 text-[#1e3a8a] border border-blue-100/80 transition-all hover:bg-blue-50">
                                        <CheckCircle size={14} className="mr-2 text-emerald-500 shrink-0" />
                                        {field}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kinh nghiem */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
                    <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                        <Clock size={18} className="text-blue-600" />
                        Kinh nghiệm
                    </h3>
                    <div className="p-4 text-center text-gray-500 italic text-[14px]">
                        Chưa có dữ liệu
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NguoiThucHienTGPLDetailPage;

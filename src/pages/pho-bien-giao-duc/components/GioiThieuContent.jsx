import React from 'react';
import { Building2, Users, Target, CheckCircle } from 'lucide-react';

export default function GioiThieuContent() {
    return (
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 min-h-[600px] font-sans">
            <h2 className="text-3xl font-bold text-[#1b2b49] mb-8 text-center">Giới thiệu Hệ thống Phổ biến Giáo dục Pháp luật</h2>
            
            <div className="prose max-w-none text-gray-600 leading-relaxed space-y-6">
                <p className="text-lg text-gray-700 font-medium">
                    Hệ thống Phổ biến Giáo dục Pháp luật (PBGDPL) là nền tảng trực tuyến quốc gia được xây dựng nhằm mục đích cung cấp thông tin, kiến thức pháp luật một cách nhanh chóng, chính xác và tiện lợi nhất cho mọi tầng lớp nhân dân và cộng đồng doanh nghiệp.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#1b2b49] mb-3">Tầm nhìn & Sứ mệnh</h3>
                        <p className="text-sm">Trở thành cổng thông tin pháp luật uy tín, đóng vai trò cầu nối vững chắc giữa nhà nước và nhân dân, góp phần nâng cao ý thức chấp hành pháp luật, xây dựng xã hội thượng tôn pháp luật.</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#1b2b49] mb-3">Đối tượng phục vụ</h3>
                        <p className="text-sm">Phục vụ đa dạng đối tượng từ người dân, cán bộ công chức, viên chức, học sinh, sinh viên cho đến các doanh nghiệp, tổ chức đang hoạt động trên lãnh thổ Việt Nam.</p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1b2b49] mt-8 mb-4">Chức năng, nhiệm vụ chính</h3>
                <ul className="space-y-4 list-none p-0">
                    {[
                        'Cập nhật, phổ biến kịp thời các văn bản quy phạm pháp luật mới ban hành.',
                        'Tổ chức các chương trình đào tạo, tập huấn, bồi dưỡng kiến thức pháp luật trực tuyến.',
                        'Cung cấp tài liệu, cẩm nang, ấn phẩm hướng dẫn nghiệp vụ PBGDPL.',
                        'Hỗ trợ giải đáp, tư vấn pháp luật trực tuyến cho người dân và doanh nghiệp.',
                        'Số hóa và quản lý cơ sở dữ liệu về mạng lưới báo cáo viên, tuyên truyền viên, hòa giải viên cơ sở.'
                    ].map((task, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{task}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                        <Building2 size={32} className="text-slate-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-1">Đơn vị quản lý và vận hành</h4>
                        <p className="text-gray-600 mb-1">Cục Phổ biến, giáo dục pháp luật - Bộ Tư pháp</p>
                        <p className="text-sm text-gray-500">Địa chỉ: 58-60 Trần Phú, Ba Đình, Hà Nội</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

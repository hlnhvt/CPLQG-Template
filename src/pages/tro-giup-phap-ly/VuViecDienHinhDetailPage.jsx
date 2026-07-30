import React, { useEffect } from 'react';
import {
    ChevronRight, Scale, FileText, User, Building2, Users, CheckCircle2, ShieldCheck, Lightbulb, Activity
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const VuViecDienHinhDetailPage = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20 font-sans">
            <div className="container mx-auto px-4 max-w-[1200px] pt-8">

                {/* Breadcrumb */}
                <div className="flex items-center text-[13px] text-blue-600 gap-2 mb-6 font-medium">
                    <Link to="/" className="hover:underline">Trang chủ</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <Link to="/tro-giup-phap-ly" className="hover:underline">Trợ giúp pháp lý</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <Link to="/tro-giup-phap-ly/vu-viec-dien-hinh" className="hover:underline">Vụ việc</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-gray-600">Chi tiết</span>
                </div>

                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#1e3a8a] p-6 lg:p-8 mb-6 relative">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        {/* Icon box */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#f0f7ff] flex items-center justify-center shrink-0">
                            <Scale size={40} className="text-blue-700" strokeWidth={1.5} />
                        </div>
                        {/* Info */}
                        <div className="flex-1">
                            <span className="inline-block bg-[#e0f2fe] text-teal-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                                BÀO CHỮA
                            </span>
                            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-5 leading-tight">Vụ án "Gây rối trật tự công cộng"</h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-[#f8f9fa] border border-gray-100 text-gray-600 text-[13px] px-3.5 py-1.5 rounded-md font-medium">Mã vụ việc: <span className="font-bold text-gray-800">TT.19.01.TGTT.180.2026</span></span>
                                <span className="bg-[#f8f9fa] border border-gray-100 text-gray-600 text-[13px] px-3.5 py-1.5 rounded-md font-medium">Ngày thụ lý: <span className="font-bold text-gray-800">26/05/2026</span></span>
                                <span className="bg-[#f8f9fa] border border-gray-100 text-gray-600 text-[13px] px-3.5 py-1.5 rounded-md font-medium">Ngày tiếp nhận: <span className="font-bold text-gray-800">06/04/2026</span></span>
                                <span className="bg-[#f8f9fa] border border-gray-100 text-gray-600 text-[13px] px-3.5 py-1.5 rounded-md font-medium w-full lg:w-auto mt-1 lg:mt-0">Lĩnh vực: <span className="font-bold text-gray-800">Nhóm 1: Các tội xâm phạm tính mạng, sức khỏe (Điều 123 - Điều 140)</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content Area */}
                    <div className="flex-1 lg:w-[70%] space-y-6">

                        {/* Người được trợ giúp pháp lý */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-50 px-5 py-4 flex items-center gap-2.5">
                                <User size={18} className="text-[#1e3a8a]" />
                                <h2 className="text-[15px] font-bold text-gray-900 uppercase">Người được trợ giúp pháp lý</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                    <div>
                                        <div className="text-[13px] text-gray-500 mb-1">Họ và tên</div>
                                        <div className="text-[15px] font-bold text-gray-900">Phạm Tùng S</div>
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-gray-500 mb-1">Giới tính</div>
                                        <div className="text-[15px] font-bold text-gray-900">Nam</div>
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-gray-500 mb-1">Dân tộc</div>
                                        <div className="text-[14px] italic text-gray-400">Chưa cập nhật</div>
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-gray-500 mb-1">Nghề nghiệp</div>
                                        <div className="text-[14px] italic text-gray-400">Chưa cập nhật</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bối cảnh */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-50 px-5 py-4 flex items-center gap-2.5">
                                <FileText size={18} className="text-[#1e3a8a]" />
                                <h2 className="text-[15px] font-bold text-gray-900 uppercase">Bối cảnh</h2>
                            </div>
                            <div className="p-5 text-gray-700 text-[14px] leading-relaxed">
                                Ngày 15/02/2026, tại khu vực chợ trung tâm thành phố, do mâu thuẫn cá nhân trong việc tranh giành vị trí bán hàng, ông Phạm Tùng S đã có hành vi xô xát, la hét và đập phá một số gian hàng xung quanh. Sự việc thu hút đông đảo người dân tụ tập, gây ùn tắc giao thông và ảnh hưởng nghiêm trọng đến an ninh trật tự tại địa phương.
                            </div>
                        </div>

                        {/* Nội dung vụ việc */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-50 px-5 py-4 flex items-center gap-2.5">
                                <FileText size={18} className="text-[#1e3a8a]" />
                                <h2 className="text-[15px] font-bold text-gray-900 uppercase">Nội dung vụ việc</h2>
                            </div>
                            <div className="p-5 text-gray-700 text-[14px] leading-relaxed">
                                Cơ quan điều tra đã khởi tố vụ án, khởi tố bị can đối với ông Phạm Tùng S về tội "Gây rối trật tự công cộng" theo quy định tại khoản 1 Điều 318 Bộ luật Hình sự. Gia đình ông L có hoàn cảnh đặc biệt khó khăn, thuộc diện hộ nghèo của xã, do đó đã làm đơn đề nghị Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Thái Nguyên cử Trợ giúp viên pháp lý tham gia tố tụng để bào chữa cho ông L.
                            </div>
                        </div>

                        {/* Phương pháp trợ giúp */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-50 px-5 py-4 flex items-center gap-2.5">
                                <ShieldCheck size={18} className="text-[#1e3a8a]" />
                                <h2 className="text-[15px] font-bold text-gray-900 uppercase">Phương pháp trợ giúp</h2>
                            </div>
                            <div className="p-5 text-gray-700 text-[14px] leading-relaxed">
                                Trợ giúp viên pháp lý đã tiến hành nghiên cứu kỹ hồ sơ vụ án, tiếp xúc với bị can và thu thập các tài liệu, chứng cứ về hoàn cảnh gia đình, nhân thân (nhân thân tốt, phạm tội lần đầu, thuộc hộ nghèo, là lao động chính trong gia đình). Đồng thời, tham gia đầy đủ các buổi hỏi cung để bảo vệ quyền và lợi ích hợp pháp cho bị can. Tại phiên tòa sơ thẩm, Trợ giúp viên pháp lý đã đưa ra các luận cứ bào chữa sắc bén, đề nghị Hội đồng xét xử xem xét áp dụng các tình tiết giảm nhẹ trách nhiệm hình sự cho ông L.
                            </div>
                        </div>

                        {/* Kết quả */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-50 px-5 py-4 flex items-center gap-2.5">
                                <CheckCircle2 size={18} className="text-[#1e3a8a]" />
                                <h2 className="text-[15px] font-bold text-gray-900 uppercase">Kết quả</h2>
                            </div>
                            <div className="p-5 text-gray-700 text-[14px] leading-relaxed">
                                Trên cơ sở đánh giá toàn diện, khách quan vụ án và đề nghị có căn cứ của Trợ giúp viên pháp lý, Hội đồng xét xử đã quyết định áp dụng mức hình phạt nhẹ nhất trong khung hình phạt. Cụ thể, tuyên phạt bị cáo Phạm Tùng S 06 tháng tù nhưng cho hưởng án treo, thời gian thử thách là 12 tháng và giao cho chính quyền địa phương giám sát, giáo dục.
                            </div>
                        </div>

                        {/* Bài học kinh nghiệm */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="border-b border-gray-50 px-5 py-4 flex items-center gap-2.5">
                                <Lightbulb size={18} className="text-[#1e3a8a]" />
                                <h2 className="text-[15px] font-bold text-gray-900 uppercase">Bài học kinh nghiệm</h2>
                            </div>
                            <div className="p-5 text-gray-700 text-[14px] leading-relaxed">
                                Vụ việc cho thấy tầm quan trọng của công tác phổ biến, giáo dục pháp luật tại cơ sở để người dân hiểu và tuân thủ các quy định về trật tự nơi công cộng, biết cách giải quyết mâu thuẫn bằng các biện pháp hòa giải. Đồng thời, sự can thiệp kịp thời, trách nhiệm của Trợ giúp pháp lý đã giúp bảo vệ tối đa quyền lợi chính đáng cho người dân yếu thế, thể hiện rõ tính nhân văn và sự khoan hồng của pháp luật Nhà nước.
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="w-full lg:w-[30%] space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                            <div className="px-5 py-4 border-b border-gray-50">
                                <h3 className="font-bold text-[16px] text-gray-900">Thông tin xử lý</h3>
                            </div>
                            <div className="p-6 space-y-7">


                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Building2 size={18} className="text-blue-600" />
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">ĐƠN VỊ THỰC HIỆN</div>
                                        <div className="text-[14px] font-medium text-gray-800 leading-snug">Trung tâm TGPL NN tỉnh Thái Nguyên</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Users size={18} className="text-blue-600" />
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">NGƯỜI THỰC HIỆN</div>
                                        <div className="text-[14px] font-medium text-gray-800">Mạc Thị Hợp <span className="text-gray-400 font-normal ml-1">0912015738</span></div>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <User size={18} className="text-blue-600" />
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">NGƯỜI TIẾP NHẬN</div>
                                        <div className="text-[14px] font-medium text-gray-800">Mạc Thị Hợp</div>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <FileText size={18} className="text-blue-600" />
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">HÌNH THỨC TIẾP NHẬN</div>
                                        <div className="text-[14px] font-medium text-gray-800">Trực tiếp</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VuViecDienHinhDetailPage;

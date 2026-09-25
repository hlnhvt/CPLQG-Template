import React, { useEffect } from 'react';
import { 
    Brain, 
    Scale, 
    Users, 
    Shield, 
    Building2, 
    Award, 
    FileText, 
    ChevronRight, 
    Phone, 
    Mail, 
    MapPin, 
    CheckCircle2,
    Sparkles,
    BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LaoCaiHeader from '../../components/laocai/LaoCaiHeader';
import LaoCaiFooter from '../../components/laocai/LaoCaiFooter';

const LaoCaiAboutPage = () => {
    useEffect(() => {
        document.title = "Giới thiệu - Cổng Pháp luật tỉnh Lào Cai";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#fcfcfb]">
            <LaoCaiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai" className="hover:text-[#0f4c81] transition-colors">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">Giới thiệu Cổng</span>
                </div>
            </div>

            {/* About Hero Banner - Đồng bộ màu sắc & phong cách Banner trang chủ Cổng Lào Cai */}
            <div className="relative text-white min-h-[360px] md:min-h-[400px] overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes laocaiRotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes laocaiRotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes laocaiPulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes laocaiFloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes laocaiSweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'laocaiSweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiPulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'laocaiPulseGlow 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'laocaiPulseGlow 5.5s ease-in-out infinite 0.5s' }} />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiRotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'laocaiRotateCCW 18s linear infinite' }} />

                {/* 5. Điểm nhấn kim cương ánh kim */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiFloatDiamond 3.2s ease-in-out infinite' }} />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'laocaiFloatDiamond 3.6s ease-in-out infinite 0.8s' }} />

                <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 py-10">
                    <img src="/logo.png" alt="Quốc huy" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3 drop-shadow-xl" />
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 drop-shadow-md text-white">
                        CỔNG PHÁP LUẬT TỈNH LÀO CAI
                    </h1>

                    <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-2 rounded-full" />
                    
                    <p className="text-sm sm:text-base text-amber-50/95 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
                        Đồng hành cùng chính quyền, người dân và cộng đồng doanh nghiệp Lào Cai bước vào kỷ nguyên số, phát triển xanh, hài hòa và bản sắc
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-12 max-w-[1286px] space-y-16">
                
                {/* 1. Tổng quan & Sứ mệnh */}
                <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200/90 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <div className="inline-flex items-center gap-2 border-b-2 border-red-700 pb-1 text-xs font-bold text-red-700 uppercase">
                                <Sparkles size={14} />
                                <span>Tôn chỉ & Mục đích</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f4c81] leading-tight">
                                Nền tảng số hóa pháp lý thống nhất, phục vụ người dân và doanh nghiệp Lào Cai
                            </h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                                Cổng Pháp luật tỉnh Lào Cai là kênh thông tin pháp lý chính thống của chính quyền tỉnh Lào Cai, được vận hành dưới sự chỉ đạo của UBND tỉnh và giao <strong>Sở Tư pháp tỉnh Lào Cai</strong> trực tiếp chủ trì quản lý kỹ thuật và nội dung, kết nối liên thông trực tiếp với Cổng Pháp luật quốc gia.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                                Cổng là nơi tập hợp đầy đủ, minh bạch toàn bộ hệ thống Nghị quyết của HĐND tỉnh, Quyết định của UBND tỉnh, các <strong>chính sách đặc thù phát triển tỉnh Lào Cai</strong> về kinh tế cửa khẩu, du lịch, nông nghiệp vùng cao, cùng mạng lưới hỗ trợ pháp lý và trợ giúp pháp lý tại các xã, phường.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                                    <div className="text-2xl font-bold text-blue-900 mb-1">100%</div>
                                    <div className="text-xs text-gray-600 font-medium">Xã, Phường</div>
                                </div>
                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-center">
                                    <div className="text-2xl font-bold text-red-900 mb-1">1.860+</div>
                                    <div className="text-xs text-gray-600 font-medium">Văn bản QPPL của tỉnh</div>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-center">
                                    <div className="text-2xl font-bold text-amber-900 mb-1">100%</div>
                                    <div className="text-xs text-amber-800 font-semibold">Liên thông Cổng Dịch vụ công tỉnh</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group">
                                <img src="/thumb1.png" alt="LaoCai Office" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                                    <div className="text-xs font-bold text-amber-300 uppercase mb-1">Cơ quan vận hành</div>
                                    <div className="font-bold text-lg">Sở Tư pháp tỉnh Lào Cai</div>
                                    <div className="text-xs text-gray-200 mt-1">Số 1B Hoàng Liên, P. Nam Cường, tỉnh Lào Cai</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Sơ đồ AI & Công nghệ số (Tương đồng Cổng Quốc Gia) */}
                <section className="bg-gradient-to-br from-blue-50/60 via-white to-amber-50/40 rounded-2xl p-6 sm:p-10 border border-blue-100 shadow-sm">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Left Text */}
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase bg-blue-100/70 px-3 py-1 rounded-full">
                                <Brain size={14} />
                                <span>Ứng dụng Trí tuệ nhân tạo (AI)</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl text-[#0f4c81] font-bold leading-tight">
                                Công nghệ số & AI tối ưu hóa tra cứu pháp luật tỉnh Lào Cai
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                                Tương tự Cổng Pháp luật quốc gia, Cổng Pháp luật tỉnh Lào Cai tích hợp công nghệ AI trợ lý ảo thông minh, giúp người dân và doanh nghiệp tra cứu nhanh các quy định bồi thường giải phóng mặt bằng, chính sách ưu đãi đầu tư tại Khu kinh tế cửa khẩu, chính sách hỗ trợ đồng bào dân tộc thiểu số và quy trình xử lý thủ tục hành chính tư pháp.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-600" /> Nhanh chóng
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-600" /> Chính xác
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-600" /> Minh bạch
                                </div>
                            </div>
                        </div>

                        {/* Right AI Diagram */}
                        <div className="flex-1 flex justify-center items-center py-6 relative">
                            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-dashed border-blue-300 relative animate-[spin_60s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#0f4c81] text-[#0f4c81]">
                                    <Brain size={20} />
                                </div>
                                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#0f4c81] text-[#0f4c81]">
                                    <Users size={20} />
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#0f4c81] text-[#0f4c81]">
                                    <Scale size={20} />
                                </div>
                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#0f4c81] text-[#0f4c81]">
                                    <Shield size={20} />
                                </div>
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 pointer-events-none">
                                <h4 className="text-[#0f4c81] font-bold text-base md:text-lg mb-1">Trợ lý AI Lào Cai</h4>
                                <p className="text-gray-500 text-xs max-w-[180px]">Tra cứu, hỏi đáp chính sách và định danh pháp lý tức thì</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 4 Trụ cột chức năng chính */}
                <section>
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f4c81] uppercase mb-2">
                            Bốn Trụ Cột Hoạt Động Cốt Lõi
                        </h2>
                        <p className="text-sm text-gray-600">
                            Đưa hệ thống văn bản pháp luật của tỉnh Lào Cai công khai, minh bạch, dễ tiếp cận và đi vào thực tiễn cuộc sống
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="font-bold text-base text-gray-900 mb-2">Số hóa Văn bản QPPL</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Cập nhật kịp thời, chính xác 100% văn bản quy phạm pháp luật của HĐND và UBND tỉnh Lào Cai, phân loại theo chuyên đề và tình trạng hiệu lực.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="font-bold text-base text-gray-900 mb-2">Phổ biến, giáo dục pháp luật</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Đổi mới tuyên truyền số, Hội đồng PBGDPL tỉnh phối hợp đưa chính sách pháp luật đến từng thôn, bản, tổ dân phố, chú trọng tuyên truyền song ngữ cho đồng bào dân tộc thiểu số.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-4">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-bold text-base text-gray-900 mb-2">Trợ giúp pháp lý cơ sở</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Kết nối Trung tâm TGPL Nhà nước tỉnh Lào Cai và 4 chi nhánh phụ trách các xã, phường, tư vấn miễn phí cho đối tượng chính sách.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                                <Building2 size={24} />
                            </div>
                            <h3 className="font-bold text-base text-gray-900 mb-2">Đồng hành Doanh nghiệp</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Tháo gỡ khó khăn về thể chế, tư vấn chính sách ưu đãi đầu tư, thủ tục xuất nhập khẩu qua cửa khẩu và kinh doanh du lịch theo các nghị quyết đặc thù của tỉnh.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Cơ cấu quản lý & Đầu mối liên hệ */}
                <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">
                    <h2 className="text-2xl font-bold text-[#0f4c81] mb-6 pb-2 border-b border-gray-200 uppercase">
                        Cơ quan Quản lý & Vận hành Thường trực
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 mb-1">Địa chỉ trụ sở</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Số 1B Hoàng Liên, P. Nam Cường, tỉnh Lào Cai
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 mb-1">Đường dây nóng hỗ trợ</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    0214.3824.163 - 0214.3824.155
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 mb-1">Thư điện tử chính thức</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    sotp@laocai.gov.vn
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <LaoCaiFooter />
        </div>
    );
};

export default LaoCaiAboutPage;

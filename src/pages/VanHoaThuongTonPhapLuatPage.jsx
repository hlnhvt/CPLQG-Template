import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubNavigator } from './NewsHighlightsPage';

const Image16x9 = ({ src, alt, className = "" }) => (
    <div className={`aspect-video w-full relative overflow-hidden ${className}`}>
        <img
            src={src}
            alt={alt}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
    </div>
);

const VanHoaThuongTonPhapLuatPage = () => {
    return (
        <div className="bg-white min-h-screen font-sans pb-20">
            {/* Sub Navigator */}
            <SubNavigator activeLabel="Xây dựng Văn hóa thượng tôn pháp luật" />

            <div className="container mx-auto px-4 py-8 max-w-[1286px]">

                {/* Tiểu mục: Xây dựng văn hóa thượng tôn pháp luật */}
                <div className="mb-2">
                    <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat/xay-dung-van-hoa" className="group inline-block mb-6">
                        <h2 className="text-2xl font-bold text-[#0f4c81] group-hover:text-red-700 border-b-2 border-red-700 pb-2 pr-8 uppercase tracking-wide transition-colors">
                            Xây dựng văn hóa thượng tôn pháp luật
                        </h2>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Cột Trái (3 tin nhỏ) */}
                        <div className="lg:col-span-1 flex flex-col space-y-4">
                            {[
                                {
                                    id: 201,
                                    title: 'Đẩy mạnh tuyên truyền văn hóa thượng tôn pháp luật trong các cơ quan, đơn vị hành chính nhà nước',
                                    date: '12/03/2026',
                                    thumb: '/thumb2.png'
                                },
                                {
                                    id: 202,
                                    title: 'Hội nghị toàn quốc quán triệt đổi mới công tác phổ biến, giáo dục pháp luật trong tình hình mới',
                                    date: '11/03/2026',
                                    thumb: '/thumb3.png'
                                },
                                {
                                    id: 203,
                                    title: 'Đoàn thanh niên phát động đợt thi đua "Tuổi trẻ xung kích sống và làm theo Hiến pháp, pháp luật"',
                                    date: '10/03/2026',
                                    thumb: '/thumb1.png'
                                }
                            ].map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h3 className="font-bold text-[13px] md:text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-3 leading-snug">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                            <Clock size={12} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Cột Giữa (1 tin cực lớn) */}
                        <Link to="/news/200" className="lg:col-span-2 group flex flex-col">
                            <div className="w-full mb-4 shrink-0">
                                <Image16x9 src="/thumb1.png" alt="Main News" className="rounded-lg shadow-sm border border-gray-100" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className="text-xl md:text-[22px] font-bold text-[#0f4c81] group-hover:text-blue-700 mb-2 leading-tight">
                                    Xây dựng văn hóa thượng tôn pháp luật: Nền tảng kiến tạo kỷ cương xã hội và phát triển bền vững đất nước
                                </h3>
                                <p className="text-gray-600 text-[14px] mb-3 line-clamp-2 leading-relaxed">
                                    Xây dựng văn hóa thượng tôn pháp luật đòi hỏi sự vào cuộc đồng bộ của cả hệ thống chính trị, đưa tinh thần tuân thủ pháp luật trở thành nếp sống, chuẩn mực đạo đức tự giác của mỗi công dân và cán bộ...
                                </p>
                                <div className="mt-auto flex items-center gap-1 text-[12px] text-gray-400">
                                    <Clock size={14} /> <span>12/03/2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* Cột Phải (2 tin) */}
                        <div className="lg:col-span-1 flex flex-col space-y-6">
                            {[
                                {
                                    id: 204,
                                    title: 'Tăng cường ứng dụng công nghệ thông tin trong khảo sát mức độ am hiểu pháp luật của người dân',
                                    date: '10/03/2026',
                                    thumb: '/thumb2.png'
                                },
                                {
                                    id: 205,
                                    title: 'Lan tỏa thông điệp ngày Pháp luật Việt Nam: Hành động vì một xã hội văn minh, công bằng, kỷ cương',
                                    date: '09/03/2026',
                                    thumb: '/thumb3.png'
                                }
                            ].map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="group flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-full mb-3 shrink-0">
                                        <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-[#0f4c81] mb-2 leading-snug line-clamp-3">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                                            <Clock size={12} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Đường gạch ngang phân cách */}
                <div className="border-t border-gray-200 mt-4 mb-6" />

                {/* 3. Tiểu mục 2: Góc nhìn (Dịch lên trên & Bỏ banner bên phải) */}
                <div className="mb-2">
                    <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat/goc-nhin" className="group inline-block mb-6">
                        <h2 className="text-2xl font-bold text-[#0f4c81] group-hover:text-red-700 border-b-2 border-red-700 pb-2 pr-8 uppercase tracking-wide transition-colors">
                            Góc nhìn
                        </h2>
                    </Link>

                    <div className="flex flex-col">
                        {/* Tin lớn nằm ngang */}
                        <Link to="/news/301" className="flex flex-col md:flex-row items-start gap-6 group border-b border-gray-100 pb-8 mb-8">
                            <div className="w-full md:w-[48%] shrink-0">
                                <Image16x9 src="/thumb3.png" alt="Góc nhìn" className="rounded-lg shadow-sm border border-gray-100" />
                            </div>
                            <div className="w-full md:w-[52%] flex flex-col min-w-0">
                                <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 group-hover:text-[#0f4c81] mb-3 leading-tight line-clamp-4">
                                    Thượng tôn pháp luật phải bắt đầu từ văn hóa nêu gương và tinh thần liêm chính của đội ngũ cán bộ, công chức
                                </h3>
                                <p className="text-gray-600 text-[14px] leading-relaxed mb-4 line-clamp-3">
                                    Một đạo luật dù có hoàn thiện đến đâu cũng chỉ phát huy giá trị khi nó được tôn trọng và thi hành triệt để, bắt đầu từ trách nhiệm và sự gương mẫu của người đứng đầu cơ quan, tổ chức trong việc chấp hành kỷ cương, thượng tôn pháp luật...
                                </p>
                                <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                    <Clock size={14} /> <span>10/03/2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* 3 tin nhỏ phía dưới trải đều */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                {
                                    id: 302,
                                    title: 'Văn hóa tuân thủ pháp luật trên không gian mạng: Thách thức và giải pháp thời đại AI',
                                    date: '09/03/2026',
                                    thumb: '/thumb1.png'
                                },
                                {
                                    id: 303,
                                    title: 'Kỷ cương từ những hành động nhỏ: Thói quen chấp hành luật giao thông và trật tự đô thị',
                                    date: '08/03/2026',
                                    thumb: '/thumb2.png'
                                },
                                {
                                    id: 304,
                                    title: 'Phát huy sức mạnh của dư luận xã hội trong việc củng cố chuẩn mực văn hóa pháp lý',
                                    date: '07/03/2026',
                                    thumb: '/thumb3.png'
                                }
                            ].map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="group flex flex-col">
                                    <div className="w-full shrink-0 mb-3">
                                        <Image16x9 src={item.thumb} alt={item.title} className="rounded-lg" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h4 className="font-bold text-[14px] text-gray-800 group-hover:text-[#0f4c81] line-clamp-3 leading-snug mb-2">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Đường gạch ngang phân cách */}
                <div className="border-t border-gray-200 mt-4 mb-6" />

                {/* 4. Tiểu mục 3: Gương sáng & Tiểu mục 4: Tư vấn pháp luật */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-2">
                    {/* Tiểu mục 3: Gương sáng */}
                    <div>
                        <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat/guong-sang" className="group inline-block mb-6">
                            <h2 className="text-2xl font-bold text-[#0f4c81] group-hover:text-red-700 border-b-2 border-red-700 pb-2 pr-8 uppercase tracking-wide transition-colors">
                                Gương sáng
                            </h2>
                        </Link>
                        <Link to="/news/401" className="flex items-start gap-4 group mb-6 border-b border-gray-100 pb-6">
                            <div className="w-[50%] shrink-0">
                                <Image16x9 src="/thumb2.png" alt="Gương sáng" className="rounded" />
                            </div>
                            <div className="w-[50%] flex flex-col min-w-0">
                                <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">
                                    Người cán bộ tư pháp cơ sở hơn 20 năm tận tụy mang ánh sáng pháp luật đến từng thôn bản vùng cao
                                </h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                    <Clock size={12} /> <span>10/03/2026</span>
                                </div>
                            </div>
                        </Link>
                        <div className="space-y-4">
                            {[
                                {
                                    id: 402,
                                    title: 'Hòa giải viên tiêu biểu giải quyết êm thấm hơn 80 vụ việc tranh chấp phức tạp tại cơ sở',
                                    date: '08/03/2026',
                                    thumb: '/thumb1.png'
                                },
                                {
                                    id: 403,
                                    title: 'Doanh nghiệp gương mẫu tuân thủ nghiêm ngặt quy định an toàn lao động và nghĩa vụ thuế',
                                    date: '06/03/2026',
                                    thumb: '/thumb3.png'
                                }
                            ].map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tiểu mục 4: Tư vấn pháp luật */}
                    <div>
                        <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat/tu-van-phap-luat" className="group inline-block mb-6">
                            <h2 className="text-2xl font-bold text-[#0f4c81] group-hover:text-red-700 border-b-2 border-red-700 pb-2 pr-8 uppercase tracking-wide transition-colors">
                                Tư vấn pháp luật
                            </h2>
                        </Link>
                        <Link to="/news/501" className="flex items-start gap-4 group mb-6 border-b border-gray-100 pb-6">
                            <div className="w-[50%] shrink-0">
                                <Image16x9 src="/thumb3.png" alt="Tư vấn pháp luật" className="rounded" />
                            </div>
                            <div className="w-[50%] flex flex-col min-w-0">
                                <h3 className="font-bold text-[16px] md:text-[18px] text-gray-900 group-hover:text-[#0f4c81] leading-tight mb-3 line-clamp-4">
                                    Giải đáp quy định mới về cấp giấy chứng nhận quyền sử dụng đất và quyền sở hữu nhà ở
                                </h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                    <Clock size={12} /> <span>09/03/2026</span>
                                </div>
                            </div>
                        </Link>
                        <div className="space-y-4">
                            {[
                                {
                                    id: 502,
                                    title: 'Mức xử phạt và thủ tục nộp phạt vi phạm giao thông trực tuyến qua cổng Dịch vụ công',
                                    date: '07/03/2026',
                                    thumb: '/thumb1.png'
                                },
                                {
                                    id: 503,
                                    title: 'Quyền lợi người lao động khi tham gia bảo hiểm xã hội bắt buộc và bảo hiểm thất nghiệp',
                                    date: '05/03/2026',
                                    thumb: '/thumb2.png'
                                }
                            ].map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="flex items-start gap-4 group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-1/3 shrink-0">
                                        <Image16x9 src={item.thumb} alt={item.title} className="rounded" />
                                    </div>
                                    <div className="w-2/3 flex flex-col min-w-0">
                                        <h4 className="font-semibold text-[14px] text-gray-900 group-hover:text-[#0f4c81] line-clamp-2 leading-snug mb-2">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Đường gạch ngang phân cách */}
                <div className="border-t border-gray-200 mt-4 mb-6" />

                {/* 5. Tiểu mục 5: Trao đổi - Kinh nghiệm (Thiết kế giống khối Góc nhìn) */}
                <div className="mb-6">
                    <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat/trao-doi-kinh-nghiem" className="group inline-block mb-6">
                        <h2 className="text-2xl font-bold text-[#0f4c81] group-hover:text-red-700 border-b-2 border-red-700 pb-2 pr-8 uppercase tracking-wide transition-colors">
                            Trao đổi - Kinh nghiệm
                        </h2>
                    </Link>

                    <div className="flex flex-col">
                        {/* Tin lớn nằm ngang */}
                        <Link to="/news/601" className="flex flex-col md:flex-row items-start gap-6 group border-b border-gray-100 pb-8 mb-8">
                            <div className="w-full md:w-[48%] shrink-0">
                                <Image16x9 src="/thumb1.png" alt="Trao đổi - Kinh nghiệm" className="rounded-lg shadow-sm border border-gray-100" />
                            </div>
                            <div className="w-full md:w-[52%] flex flex-col min-w-0">
                                <h3 className="text-[20px] md:text-[24px] font-bold text-gray-900 group-hover:text-[#0f4c81] mb-3 leading-tight line-clamp-4">
                                    Kinh nghiệm sân khấu hóa và tổ chức hội thi tìm hiểu pháp luật thu hút đông đảo các tầng lớp nhân dân tham gia
                                </h3>
                                <p className="text-gray-600 text-[14px] leading-relaxed mb-4 line-clamp-3">
                                    Đổi mới phương thức tuyên truyền thông qua hình thức sân khấu hóa, tiểu phẩm tình huống và hội thi trực quan đã mang lại hiệu quả rõ nét, giúp các quy định pháp luật vốn khô cứng trở nên gần gũi, dễ nhớ và đi sâu vào đời sống nhân dân...
                                </p>
                                <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-auto">
                                    <Clock size={14} /> <span>10/03/2026</span>
                                </div>
                            </div>
                        </Link>

                        {/* 3 tin nhỏ phía dưới dàn đều 3 cột */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                {
                                    id: 602,
                                    title: 'TP. Hà Nội: Đột phá trong việc đưa tủ sách pháp luật điện tử đến 100% trường học và tổ dân phố',
                                    date: '09/03/2026',
                                    thumb: '/thumb2.png'
                                },
                                {
                                    id: 603,
                                    title: 'Giải pháp nâng cao chất lượng hòa giải ở cơ sở gắn với tiêu chí xây dựng nông thôn mới văn minh',
                                    date: '08/03/2026',
                                    thumb: '/thumb3.png'
                                },
                                {
                                    id: 604,
                                    title: 'Tỉnh Quảng Ninh: Kinh nghiệm gắn hương ước, quy ước làng văn hóa với chuẩn mực pháp lý',
                                    date: '07/03/2026',
                                    thumb: '/thumb1.png'
                                }
                            ].map((item) => (
                                <Link key={item.id} to={`/news/${item.id}`} className="group flex flex-col">
                                    <div className="w-full shrink-0 mb-3">
                                        <Image16x9 src={item.thumb} alt={item.title} className="rounded-lg" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h4 className="font-bold text-[14px] text-gray-800 group-hover:text-[#0f4c81] line-clamp-3 leading-snug mb-2">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-auto">
                                            <Clock size={12} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VanHoaThuongTonPhapLuatPage;

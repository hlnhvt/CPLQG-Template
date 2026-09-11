import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ChevronRight, ChevronLeft, ArrowRight, Phone, MessageSquare, Newspaper } from 'lucide-react';
import { SubNavigator } from './NewsHighlightsPage';

// Categorized Data for each sub-topic
const CATEGORY_MAP = {
    'xay-dung-van-hoa': {
        title: 'Xây dựng văn hóa thượng tôn pháp luật',
        badge: 'Chuyên đề trọng tâm',
        main: {
            id: 200,
            title: 'Xây dựng văn hóa thượng tôn pháp luật: Nền tảng kiến tạo kỷ cương xã hội và phát triển bền vững đất nước',
            summary: 'Xây dựng văn hóa thượng tôn pháp luật đòi hỏi sự vào cuộc đồng bộ của cả hệ thống chính trị, đưa tinh thần tuân thủ pháp luật trở thành nếp sống, chuẩn mực đạo đức tự giác của mỗi công dân và cán bộ.',
            date: '12/03/2026',
            image: '/thumb1.png'
        },
        sub: [
            { id: 201, title: 'Đẩy mạnh tuyên truyền văn hóa thượng tôn pháp luật trong các cơ quan, đơn vị hành chính nhà nước', date: '12/03/2026', image: '/thumb2.png' },
            { id: 202, title: 'Hội nghị toàn quốc quán triệt đổi mới công tác phổ biến, giáo dục pháp luật trong tình hình mới', date: '11/03/2026', image: '/thumb3.png' },
            { id: 203, title: 'Đoàn thanh niên phát động đợt thi đua "Tuổi trẻ xung kích sống và làm theo Hiến pháp, pháp luật"', date: '10/03/2026', image: '/thumb1.png' },
        ],
        articles: [
            { id: 204, title: 'Tăng cường ứng dụng công nghệ thông tin trong khảo sát mức độ am hiểu pháp luật của người dân', summary: 'Ứng dụng nền tảng số và dữ liệu dân cư giúp các cơ quan quản lý nắm bắt chính xác nhu cầu tìm hiểu pháp luật của từng nhóm đối tượng.', date: '10/03/2026', image: '/thumb2.png' },
            { id: 205, title: 'Lan tỏa thông điệp ngày Pháp luật Việt Nam: Hành động vì một xã hội văn minh, công bằng, kỷ cương', summary: 'Ngày Pháp luật không chỉ là một sự kiện thường niên mà là lời nhắc nhở thường trực về trách nhiệm và nghĩa vụ thượng tôn pháp luật.', date: '09/03/2026', image: '/thumb3.png' },
            { id: 206, title: 'Xây dựng chuẩn mực văn hóa công vụ liêm chính gắn liền với việc chấp hành nghiêm kỷ luật hành chính', summary: 'Mỗi cán bộ, công chức phải là tấm gương sáng trong việc tuân thủ pháp luật, thực hiện đúng chức trách, quyền hạn được giao.', date: '08/03/2026', image: '/thumb1.png' },
            { id: 207, title: 'Nâng cao vai trò của Mặt trận Tổ quốc và các đoàn thể trong giám sát thực thi chính sách pháp luật', summary: 'Phát huy quyền làm chủ của nhân dân, tạo cơ chế phản biện xã hội hiệu quả nhằm phát hiện, kiến nghị sửa đổi quy định bất cập.', date: '06/03/2026', image: '/thumb2.png' },
            { id: 208, title: 'Đưa nội dung văn hóa thượng tôn pháp luật vào chương trình giảng dạy trong các cấp học phổ thông', summary: 'Giáo dục ý thức pháp luật từ sớm giúp hình thành thói quen sống và làm việc theo pháp luật ngay từ khi còn ngồi trên ghế nhà trường.', date: '04/03/2026', image: '/thumb3.png' },
            { id: 209, title: 'Bài học từ các quốc gia tiên tiến trong việc xây dựng ý thức pháp quyền và văn hóa tuân thủ luật lệ', summary: 'Kinh nghiệm quốc tế cho thấy tính nghiêm minh của chế tài và sự công khai, minh bạch là cốt lõi để duy trì trật tự pháp luật bền vững.', date: '02/03/2026', image: '/thumb1.png' },
        ]
    },
    'goc-nhin': {
        title: 'Góc nhìn',
        badge: 'Góc nhìn - Bình luận',
        main: {
            id: 301,
            title: 'Thượng tôn pháp luật phải bắt đầu từ văn hóa nêu gương và tinh thần liêm chính của đội ngũ cán bộ, công chức',
            summary: 'Một đạo luật dù có hoàn thiện đến đâu cũng chỉ phát huy giá trị khi nó được tôn trọng và thi hành triệt để, bắt đầu từ trách nhiệm và sự gương mẫu của người đứng đầu cơ quan, tổ chức trong việc chấp hành kỷ cương, thượng tôn pháp luật.',
            date: '10/03/2026',
            image: '/thumb3.png'
        },
        sub: [
            { id: 302, title: 'Văn hóa tuân thủ pháp luật trên không gian mạng: Thách thức và giải pháp thời đại AI', date: '09/03/2026', image: '/thumb1.png' },
            { id: 303, title: 'Kỷ cương từ những hành động nhỏ: Thói quen chấp hành luật giao thông và trật tự đô thị', date: '08/03/2026', image: '/thumb2.png' },
            { id: 304, title: 'Phát huy sức mạnh của dư luận xã hội trong việc củng cố chuẩn mực văn hóa pháp lý', date: '07/03/2026', image: '/thumb3.png' },
        ],
        articles: [
            { id: 305, title: 'Ý thức chấp hành pháp luật: Khoảng cách từ nhận thức đến hành vi thực tế của công dân', summary: 'Tại sao có những quy định ai cũng biết nhưng vẫn cố tình vi phạm? Cần giải pháp gì để chuyển hóa nhận thức thành thói quen tự giác?', date: '06/03/2026', image: '/thumb1.png' },
            { id: 306, title: 'Thước đo văn minh của một xã hội: Nhìn từ thái độ ứng xử với các quy định pháp luật', summary: 'Xã hội càng phát triển thì mức độ văn minh càng thể hiện rõ qua sự tự nguyện tuân thủ các quy tắc trật tự chung thay vì đối phó.', date: '05/03/2026', image: '/thumb2.png' },
            { id: 307, title: 'Văn hóa pháp luật trong doanh nghiệp: Giá trị cốt lõi để phát triển bền vững và hội nhập', summary: 'Tuân thủ pháp luật không chỉ giúp doanh nghiệp tránh rủi ro pháp lý mà còn là nền tảng xây dựng uy tín thương hiệu trên trường quốc tế.', date: '03/03/2026', image: '/thumb3.png' },
            { id: 308, title: 'Bàn về tính nghiêm minh và công bằng: Điều kiện tiên quyết để nuôi dưỡng niềm tin công lý', summary: 'Mọi công dân đều bình đẳng trước pháp luật. Khi các hành vi vi phạm đều bị xử lý nghiêm minh, niềm tin vào luật pháp sẽ được củng cố.', date: '01/03/2026', image: '/thumb1.png' },
            { id: 309, title: 'Văn hóa ứng xử trên mạng xã hội: Trách nhiệm pháp lý và đạo đức của người dùng thông thái', summary: 'Không gian mạng không phải vùng đất vô luật. Mỗi phát ngôn, chia sẻ đều phải nằm trong khuôn khổ quy định pháp luật hiện hành.', date: '28/02/2026', image: '/thumb2.png' },
        ]
    },
    'guong-sang': {
        title: 'Gương sáng',
        badge: 'Gương sáng điển hình',
        main: {
            id: 401,
            title: 'Người cán bộ tư pháp cơ sở hơn 20 năm tận tụy mang ánh sáng pháp luật đến từng thôn bản vùng cao',
            summary: 'Bất kể nắng mưa, đường rừng hiểm trở, ông Lầu A Sáng đã kiên trì đến từng nóc nhà để giải thích các quy định của pháp luật bằng tiếng bản địa, giúp bà con xóa bỏ hủ tục và bảo vệ quyền lợi chính đáng.',
            date: '10/03/2026',
            image: '/thumb2.png'
        },
        sub: [
            { id: 402, title: 'Hòa giải viên tiêu biểu giải quyết êm thấm hơn 80 vụ việc tranh chấp phức tạp tại cơ sở', date: '08/03/2026', image: '/thumb1.png' },
            { id: 403, title: 'Doanh nghiệp gương mẫu tuân thủ nghiêm ngặt quy định an toàn lao động và nghĩa vụ thuế', date: '06/03/2026', image: '/thumb3.png' },
            { id: 404, title: 'Thầy giáo vùng biên kiên trì gieo mầm hiểu biết pháp luật cho học trò đồng bào thiểu số', date: '05/03/2026', image: '/thumb2.png' },
        ],
        articles: [
            { id: 405, title: 'Nữ thẩm phán tận tâm: Đưa chữ tình hòa vào chữ lý trong từng phán quyết nhân văn', summary: 'Không chỉ hoàn thành xuất sắc nhiệm vụ xét xử, chị còn dành nhiều tâm huyết hòa giải, gắn kết các gia đình bên bờ vực đổ vỡ.', date: '04/03/2026', image: '/thumb1.png' },
            { id: 406, title: 'Chuyện về người cựu chiến binh làm hạt nhân giữ gìn an ninh trật tự và hòa giải khu phố', summary: 'Bằng uy tín và sự kiên trì, ông đã cảm hóa nhiều thanh thiếu niên lầm lỡ trở về nẻo thiện, trở thành công dân có ích cho xã hội.', date: '02/03/2026', image: '/thumb3.png' },
            { id: 407, title: 'Chi đoàn Công an xã xung kích trong phong trào phổ biến pháp luật phòng chống lừa đảo trực tuyến', summary: 'Sáng kiến làm video ngắn và tờ rơi trực quan của chi đoàn đã giúp hàng nghìn người dân phòng tránh được các bẫy lừa đảo tinh vi.', date: '28/02/2026', image: '/thumb2.png' },
            { id: 408, title: 'Trưởng thôn gương mẫu đi đầu trong việc vận động nhân dân hiến đất làm đường giao thông nông thôn', summary: 'Vận dụng đúng chính sách pháp luật về đất đai và phát huy quy chế dân chủ ở cơ sở, ông đã nhận được sự đồng thuận tuyệt đối của bà con.', date: '25/02/2026', image: '/thumb1.png' },
        ]
    },
    'tu-van-phap-luat': {
        title: 'Tư vấn pháp luật',
        badge: 'Giải đáp chính sách',
        main: {
            id: 501,
            title: 'Giải đáp quy định mới về cấp giấy chứng nhận quyền sử dụng đất và quyền sở hữu nhà ở',
            summary: 'Chuyên gia pháp lý phân tích chi tiết các điểm mới trong Luật Đất đai, trình tự hồ sơ đăng ký cấp sổ đỏ trực tuyến và giải đáp các tình huống vướng mắc thường gặp của người dân.',
            date: '09/03/2026',
            image: '/thumb3.png'
        },
        sub: [
            { id: 502, title: 'Mức xử phạt và thủ tục nộp phạt vi phạm giao thông trực tuyến qua cổng Dịch vụ công', date: '07/03/2026', image: '/thumb1.png' },
            { id: 503, title: 'Quyền lợi người lao động khi tham gia bảo hiểm xã hội bắt buộc và bảo hiểm thất nghiệp', date: '05/03/2026', image: '/thumb2.png' },
            { id: 504, title: 'Thủ tục đăng ký thành lập doanh nghiệp và các nghĩa vụ pháp lý ban đầu cần lưu ý', date: '03/03/2026', image: '/thumb3.png' },
        ],
        articles: [
            { id: 505, title: 'Quy định về thời hiệu khởi kiện thừa kế và giải quyết tranh chấp di sản không có di chúc', summary: 'Hướng dẫn cụ thể các bước phân chia di sản theo pháp luật, nghĩa vụ của các đồng thừa kế và thủ tục giải quyết tại Tòa án.', date: '02/03/2026', image: '/thumb1.png' },
            { id: 506, title: 'Chế độ thai sản cho lao động nam khi vợ sinh con: Điều kiện hưởng và mức trợ cấp mới nhất', summary: 'Người lao động nam đóng BHXH từ đủ thời gian quy định sẽ được nghỉ thai sản hưởng nguyên lương cùng tiền trợ cấp một lần.', date: '28/02/2026', image: '/thumb2.png' },
            { id: 507, title: 'Xử lý hợp đồng đặt cọc mua bán nhà đất khi một bên vi phạm cam kết hoặc xảy ra tranh chấp', summary: 'Cần ghi nhận các điều khoản gì trong văn bản đặt cọc để bảo vệ quyền lợi tối đa và tránh rủi ro mất trắng tiền cọc?', date: '26/02/2026', image: '/thumb3.png' },
            { id: 508, title: 'Những lưu ý pháp lý quan trọng khi giao kết hợp đồng lao động điện tử theo quy định mới', summary: 'Hợp đồng lao động điện tử có giá trị như bản giấy nếu đáp ứng đầy đủ điều kiện về chữ ký số và bảo mật dữ liệu theo quy định.', date: '24/02/2026', image: '/thumb1.png' },
        ]
    },
    'trao-doi-kinh-nghiem': {
        title: 'Trao đổi - Kinh nghiệm',
        badge: 'Kinh nghiệm thực tiễn',
        main: {
            id: 601,
            title: 'Kinh nghiệm sân khấu hóa và tổ chức hội thi tìm hiểu pháp luật thu hút đông đảo các tầng lớp nhân dân tham gia',
            summary: 'Đổi mới phương thức tuyên truyền thông qua hình thức sân khấu hóa, tiểu phẩm tình huống và hội thi trực quan đã mang lại hiệu quả rõ nét, giúp các quy định pháp luật vốn khô cứng trở nên gần gũi, dễ nhớ và đi sâu vào đời sống nhân dân.',
            date: '10/03/2026',
            image: '/thumb1.png'
        },
        sub: [
            { id: 602, title: 'TP. Hà Nội: Đột phá trong việc đưa tủ sách pháp luật điện tử đến 100% trường học và tổ dân phố', date: '09/03/2026', image: '/thumb2.png' },
            { id: 603, title: 'Giải pháp nâng cao chất lượng hòa giải ở cơ sở gắn với tiêu chí xây dựng nông thôn mới văn minh', date: '08/03/2026', image: '/thumb3.png' },
            { id: 604, title: 'Tỉnh Quảng Ninh: Kinh nghiệm gắn hương ước, quy ước làng văn hóa với chuẩn mực pháp lý', date: '07/03/2026', image: '/thumb1.png' },
        ],
        articles: [
            { id: 605, title: 'Ứng dụng mạng xã hội và kênh truyền thông số trong phổ biến pháp luật cho đồng bào dân tộc thiểu số', summary: 'Chia sẻ cách làm hay của tỉnh Lào Cai trong việc xây dựng các video hoạt hình ngắn giải thích luật hôn nhân gia đình bằng tiếng Mông, Dao.', date: '05/03/2026', image: '/thumb2.png' },
            { id: 606, title: 'Mô hình "Phiên tòa giả định" trong trường học: Hiệu quả răn đe và giáo dục pháp luật học đường', summary: 'Thông qua việc tái hiện trực quan các vụ án thực tế về bạo lực học đường, học sinh được nâng cao ý thức tuân thủ kỷ luật và tôn trọng bạn bè.', date: '03/03/2026', image: '/thumb3.png' },
            { id: 607, title: 'Kinh nghiệm huy động nguồn lực xã hội hóa cho công tác trợ giúp pháp lý tại các địa bàn khó khăn', summary: 'Bài học từ sự phối hợp chặt chẽ giữa Trung tâm TGPL nhà nước với các tổ chức hành nghề luật sư và các tổ chức thiện nguyện.', date: '01/03/2026', image: '/thumb1.png' },
            { id: 608, title: 'Nâng cao kỹ năng xử lý xung đột trong hòa giải cơ sở: Nghệ thuật "lắng nghe và thấu hiểu"', summary: 'Kinh nghiệm từ các hòa giải viên lâu năm trong việc hạ nhiệt các điểm nóng mâu thuẫn tranh chấp đất đai, lối đi chung giữa các hộ dân.', date: '27/02/2026', image: '/thumb2.png' },
        ]
    }
};

const ITEMS_PER_PAGE = 5;


const VanHoaSubCategoryPage = () => {
    const { categorySlug } = useParams();
    const currentCategory = CATEGORY_MAP[categorySlug] || CATEGORY_MAP['xay-dung-van-hoa'];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(currentCategory.articles.length / ITEMS_PER_PAGE);
    const currentArticles = currentCategory.articles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) {
            setCurrentPage(p);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    const paginationPages = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 3) return [1, 2, 3, '...', totalPages];
        if (currentPage >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage, '...', totalPages];
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Sub Navigator của Tin tức */}
            <SubNavigator activeLabel="Xây dựng Văn hóa thượng tôn pháp luật" />

            <div className="container mx-auto px-4 max-w-[1286px] pt-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
                    <ChevronRight size={14} className="text-gray-400 shrink-0" />
                    <Link to="/tin-tuc/noi-bat" className="hover:text-blue-600 transition-colors">Tin tức</Link>
                    <ChevronRight size={14} className="text-gray-400 shrink-0" />
                    <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat" className="hover:text-blue-600 transition-colors">
                        Xây dựng Văn hóa thượng tôn pháp luật
                    </Link>
                    <ChevronRight size={14} className="text-gray-400 shrink-0" />
                    <span className="text-gray-900 font-semibold">{currentCategory.title}</span>
                </div>

                {/* Tiêu đề Chuyên mục (Không có khối mô tả banner trên cùng theo đúng yêu cầu) */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-[26px] font-bold text-[#0f4c81] border-b-2 border-red-700 inline-block pb-2 pr-8 uppercase tracking-wide">
                        {currentCategory.title}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* === MAIN CONTENT === */}
                    <div className="flex-1 min-w-0">
                        {/* --- Featured Section --- */}
                        <div className="mb-8">
                            {/* Main Feature */}
                            <Link to={`/news/${currentCategory.main.id}`} className="block group mb-5">
                                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-gray-200 shadow-sm border border-gray-100">
                                    <img
                                        src={currentCategory.main.image}
                                        alt={currentCategory.main.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                        <span className="inline-block bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded mb-2 shadow-sm uppercase tracking-wide">
                                            {currentCategory.badge}
                                        </span>
                                        <h2 className="text-white font-bold text-[18px] md:text-[22px] leading-snug line-clamp-2 group-hover:text-yellow-300 transition-colors">
                                            {currentCategory.main.title}
                                        </h2>
                                        <p className="text-gray-200 text-[13px] md:text-[14px] mt-2 line-clamp-2 leading-relaxed">
                                            {currentCategory.main.summary}
                                        </p>
                                        <div className="flex items-center gap-1 text-gray-300 text-[12px] mt-3">
                                            <Calendar size={13} /> {currentCategory.main.date}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Sub Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {currentCategory.sub.map(item => (
                                    <Link
                                        key={item.id}
                                        to={`/news/${item.id}`}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-shadow flex flex-col"
                                    >
                                        <div className="aspect-[16/9] overflow-hidden bg-gray-100 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-3.5 flex flex-col flex-1">
                                            <h3 className="font-semibold text-[13px] md:text-[13.5px] text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-auto">
                                                <Calendar size={11} /> {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>


                        {/* Article List */}
                        <div className="space-y-4 mb-8">
                            {currentArticles.map(article => (
                                <Link
                                    key={article.id}
                                    to={`/news/${article.id}`}
                                    className="group flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md p-4 transition-shadow"
                                >
                                    <div className="w-full sm:w-44 md:w-52 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <h3 className="font-bold text-[15px] md:text-[16px] text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-2 mb-3">
                                            {article.summary}
                                        </p>
                                        <div className="flex items-center gap-1 text-gray-400 text-[12px] mt-auto">
                                            <Calendar size={12} /> {article.date}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
                                <button
                                    onClick={() => handlePage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 h-9 px-3 border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 text-[13px]"
                                >
                                    <ChevronLeft size={15} /> Trước
                                </button>
                                {paginationPages().map((p, i) => p === '...'
                                    ? <span key={i} className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
                                    : <button
                                        key={p}
                                        onClick={() => handlePage(p)}
                                        className={`w-9 h-9 rounded border text-[13px] font-semibold ${currentPage === p ? 'bg-[#0f4c81] border-[#0f4c81] text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'}`}
                                    >
                                        {p}
                                    </button>
                                )}
                                <button
                                    onClick={() => handlePage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 h-9 px-3 border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 text-[13px]"
                                >
                                    Sau <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* === SIDEBAR === */}
                    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">

                        {/* Latest News */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-[#0f4c81] px-4 py-3">
                                <h3 className="text-white font-bold text-[14px]">Tin mới cập nhật</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {currentCategory.articles.slice(0, 4).map(item => (
                                    <Link key={item.id} to={`/news/${item.id}`} className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group">
                                        <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </p>
                                            <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1">
                                                <Calendar size={10} /> {item.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-3 border-t border-gray-100">
                                <Link to="/tin-tuc/van-hoa-thuong-ton-phap-luat" className="flex items-center gap-1 text-[13px] text-blue-600 font-semibold hover:text-blue-800">
                                    Về trang tổng quan <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Contact Widget */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-[15px] text-gray-800 mb-2">Chúng tôi luôn lắng nghe & phản hồi</h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                                Người dân và doanh nghiệp có thể gửi kiến nghị, góp ý trực tiếp tới Ban biên tập Cổng Pháp luật Quốc gia.
                            </p>
                            <div className="space-y-2">
                                <a href="tel:18009090" className="flex items-center gap-2 w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-[13px] justify-center">
                                    <Phone size={15} /> Tổng đài 1800 9090
                                </a>
                                <Link to="/lien-he" className="flex items-center gap-2 w-full px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-100 transition-colors text-[13px] justify-center">
                                    <MessageSquare size={15} /> Gửi góp ý trực tiếp
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default VanHoaSubCategoryPage;

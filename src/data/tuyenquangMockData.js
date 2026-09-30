// Dữ liệu mẫu Cổng Pháp luật tỉnh Tuyên Quang.
// Cấu trúc chuyên mục bám theo trang PBGDPL hiện tại (pbgdpl.tuyenquang.gov.vn);
// thông tin liên hệ lấy từ chân trang của trang đó; bài viết, văn bản, số liệu là dữ liệu minh họa.

export const TQ_HOME = '/tuyen-quang';

export const tuyenquangSiteConfig = {
    name: 'CỔNG PHÁP LUẬT TỈNH TUYÊN QUANG',
    shortName: 'Cổng Pháp luật Tuyên Quang',
    governingBody: 'Ủy ban nhân dân tỉnh Tuyên Quang',
    operatingBody: 'Sở Tư pháp tỉnh Tuyên Quang',
    address: 'Đường 17/8, Phường Phan Thiết, tỉnh Tuyên Quang',
    phone: '(0207) 3.822.831',
    fax: '(0207) 3.922.187',
    email: 'banbientapstptq@gmail.com',
    chiefEditor: 'Ông Nguyễn Khánh Lâm, Giám đốc Sở Tư pháp tỉnh Tuyên Quang, Phó Chủ tịch Thường trực Hội đồng phổ biến, giáo dục pháp luật tỉnh',
    license: 'Giấy phép xuất bản số 21/GP-TTĐT ngày 25/05/2021 của Sở Thông tin và Truyền thông tỉnh Tuyên Quang',
    stats: [
        { key: 'bcv', label: 'Báo cáo viên pháp luật cấp tỉnh', value: 186 },
        { key: 'ttv', label: 'Tuyên truyền viên pháp luật cơ sở', value: 2450 },
        { key: 'tailieu', label: 'Tài liệu PBGDPL đã phát hành', value: 1320 },
        { key: 'hoinghi', label: 'Hội nghị PBGDPL trong năm', value: 412 }
    ]
};

// ---------------------------------------------------------------------------
// CHUYÊN MỤC (slug → thông tin), dùng cho trang chuyên mục dùng chung
// ---------------------------------------------------------------------------
export const TQ_CATEGORIES = {
    'tin-tuc-su-kien': { title: 'Tin tức sự kiện', group: 'Tin tức', icon: 'newspaper', desc: 'Tin tức, sự kiện nổi bật về công tác tư pháp và phổ biến, giáo dục pháp luật trên địa bàn tỉnh Tuyên Quang.' },
    'chinh-sach-phap-luat-moi': { title: 'Tin chính sách, pháp luật mới', group: 'Tin tức', icon: 'sparkles', desc: 'Giới thiệu chính sách, văn bản pháp luật mới của Trung ương và của tỉnh có hiệu lực thi hành.' },
    'thong-cao-bao-chi': { title: 'Thông cáo báo chí', group: 'Tin tức', icon: 'megaphone', desc: 'Thông cáo báo chí về văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành.' },
    'hoat-dong-pbgdpl': {
        title: 'Hoạt động PBGDPL', group: 'Phổ biến, giáo dục pháp luật', icon: 'activity',
        desc: 'Hoạt động phổ biến, giáo dục pháp luật của Trung ương và địa phương.',
        subs: [{ slug: 'trung-uong', label: 'Hoạt động PBGDPL Trung ương' }, { slug: 'dia-phuong', label: 'Hoạt động PBGDPL địa phương' }]
    },
    'hoi-dong-phoi-hop': {
        title: 'Hội đồng phối hợp PBGDPL', group: 'Phổ biến, giáo dục pháp luật', icon: 'users',
        desc: 'Văn bản, kế hoạch và hoạt động của Hội đồng phối hợp phổ biến, giáo dục pháp luật các cấp.',
        subs: [{ slug: 'cap-tinh', label: 'Hội đồng phối hợp PBGDPL tỉnh' }, { slug: 'cap-xa', label: 'Hội đồng phối hợp PBGDPL cấp xã' }]
    },
    'bao-cao-vien': {
        title: 'Báo cáo viên, tuyên truyền viên Pháp luật', group: 'Phổ biến, giáo dục pháp luật', icon: 'mic',
        desc: 'Danh sách, quyết định công nhận và hoạt động của đội ngũ báo cáo viên, tuyên truyền viên pháp luật.',
        subs: [{ slug: 'cap-tinh', label: 'Báo cáo viên pháp luật cấp tỉnh' }, { slug: 'cap-xa', label: 'Báo cáo viên pháp luật cấp xã' }, { slug: 'tuyen-truyen-vien', label: 'Tuyên truyền viên pháp luật' }]
    },
    'tai-lieu-pbgdpl': {
        title: 'Tài liệu PBGDPL', group: 'Phổ biến, giáo dục pháp luật', icon: 'book',
        desc: 'Kho tài liệu giới thiệu văn bản, tờ gấp, sách hỏi - đáp, tình huống và ấn phẩm tuyên truyền pháp luật.',
        subs: [
            { slug: 'vbqppl-tw', label: 'Tài liệu giới thiệu VBQPPL Trung ương' },
            { slug: 'vbqppl-tinh', label: 'Tài liệu giới thiệu VBQPPL tỉnh' },
            { slug: 'de-cuong', label: 'Đề cương giới thiệu luật' },
            { slug: 'to-gap', label: 'Tờ gấp' },
            { slug: 'sach-hoi-dap', label: 'Sách, hỏi - đáp pháp luật' },
            { slug: 'tinh-huong', label: 'Tiểu phẩm, tình huống pháp luật' },
            { slug: 'cau-chuyen', label: 'Câu chuyện pháp luật' },
            { slug: 'pano', label: 'Pano, áp phích, file âm thanh' }
        ]
    },
    'truyen-thong-du-thao': { title: 'Truyền thông dự thảo chính sách', group: 'Phổ biến, giáo dục pháp luật', icon: 'filePen', desc: 'Truyền thông nội dung dự thảo chính sách, văn bản quy phạm pháp luật để lấy ý kiến nhân dân.' },
    'huong-dan-nghiep-vu': { title: 'Hướng dẫn nghiệp vụ', group: 'Phổ biến, giáo dục pháp luật', icon: 'bookmark', desc: 'Hướng dẫn nghiệp vụ phổ biến, giáo dục pháp luật, hòa giải ở cơ sở, chuẩn tiếp cận pháp luật.' },
    'thong-ke-bao-cao': { title: 'Thống kê, báo cáo về PBGDPL', group: 'Phổ biến, giáo dục pháp luật', icon: 'chart', desc: 'Số liệu thống kê, báo cáo định kỳ về công tác phổ biến, giáo dục pháp luật.' },
    'hoa-giai-co-so': { title: 'Hòa giải ở cơ sở', group: 'Phổ biến, giáo dục pháp luật', icon: 'handshake', desc: 'Hoạt động hòa giải ở cơ sở, mô hình tổ hòa giải tiêu biểu tại thôn, bản, tổ dân phố.' },
    'chuan-tiep-can': { title: 'Chuẩn tiếp cận pháp luật', group: 'Phổ biến, giáo dục pháp luật', icon: 'badge', desc: 'Đánh giá, công nhận cấp xã đạt chuẩn tiếp cận pháp luật.' },
    'cuoc-thi': { title: 'Cuộc thi, hội thi', group: 'Phổ biến, giáo dục pháp luật', icon: 'trophy', desc: 'Cuộc thi, hội thi tìm hiểu pháp luật trực tuyến và trực tiếp.' },
    'tro-giup-phap-ly': { title: 'Trợ giúp pháp lý', group: 'Chuyên trang', icon: 'scale', desc: 'Trợ giúp pháp lý miễn phí cho người thuộc diện được trợ giúp pháp lý trên địa bàn tỉnh Tuyên Quang.' },
    'ho-tro-phap-ly-doanh-nghiep': { title: 'Hỗ trợ pháp lý doanh nghiệp', group: 'Chuyên trang', icon: 'briefcase', desc: 'Hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa, hợp tác xã, hộ kinh doanh trên địa bàn tỉnh.' }
};

// Chuyên mục hiển thị ở khối "Chuyên mục tin tức" trang chủ (thứ tự hiển thị)
export const TQ_HOME_CATEGORY_SLUGS = [
    'tin-tuc-su-kien', 'hoat-dong-pbgdpl', 'hoi-dong-phoi-hop', 'tai-lieu-pbgdpl', 'thong-cao-bao-chi',
    'hoa-giai-co-so', 'chuan-tiep-can', 'cuoc-thi', 'huong-dan-nghiep-vu'
];

// Menu PBGDPL trên thanh nav header (theo menu trang PBGDPL Tuyên Quang)
export const TUYENQUANG_SPECIAL_NAV = [
    {
        label: 'Phổ biến, giáo dục pháp luật',
        children: [
            { path: 'chuyen-muc/hoat-dong-pbgdpl', label: 'Hoạt động PBGDPL' },
            { path: 'chuyen-muc/hoi-dong-phoi-hop', label: 'Hội đồng phối hợp PBGDPL' },
            { path: 'chuyen-muc/bao-cao-vien', label: 'Báo cáo viên, tuyên truyền viên Pháp luật' },
            { path: 'chuyen-muc/tai-lieu-pbgdpl', label: 'Tài liệu PBGDPL' },
            { path: 'chuyen-muc/truyen-thong-du-thao', label: 'Truyền thông dự thảo chính sách' },
            { path: 'chuyen-muc/hoa-giai-co-so', label: 'Hòa giải ở cơ sở' },
            { path: 'chuyen-muc/chuan-tiep-can', label: 'Chuẩn tiếp cận pháp luật' },
            { path: 'chuyen-muc/huong-dan-nghiep-vu', label: 'Hướng dẫn nghiệp vụ' },
            { path: 'chuyen-muc/thong-ke-bao-cao', label: 'Thống kê, báo cáo về PBGDPL' }
        ]
    },
    { path: 'tro-giup-phap-ly', label: 'Trợ giúp pháp lý' },
    { path: 'ho-tro-phap-ly-doanh-nghiep', label: 'Hỗ trợ pháp lý doanh nghiệp' }
];

// Đường dẫn chuyên mục: chuyên mục tin tức dùng /tin-tuc/:slug, chuyên trang dùng /:slug, còn lại /chuyen-muc/:slug
export const tqCategoryUrl = (slug, sub) => {
    const base = TQ_CATEGORIES[slug]?.group === 'Tin tức'
        ? `${TQ_HOME}/tin-tuc/${slug}`
        : TQ_CATEGORIES[slug]?.group === 'Chuyên trang'
            ? `${TQ_HOME}/${slug}`
            : `${TQ_HOME}/chuyen-muc/${slug}`;
    return sub ? `${base}?muc=${sub}` : base;
};

// ---------------------------------------------------------------------------
// BÀI VIẾT (dữ liệu minh họa)
// ---------------------------------------------------------------------------
const IMAGES = ['/thumb1.png', '/thumb2.png', '/thumb3.png', '/fda33db9-762a-4d21-9317-96615cd1968b.jpg', '/02bd53d8-37a5-4927-8d00-a00feb16a3b2.jpg', '/1748a7fd-78c7-4106-9c42-2852c0a58e1e.jpg', '/BO NHAN DIEN TONG RA SOAT/đại hội 1200 800 jpg.jpg'];

// [chuyên mục, mục con, ngày, tiêu đề, tóm tắt]
const RAW_ARTICLES = [
    ['tin-tuc-su-kien', null, '30/09/2026', 'Sở Tư pháp tỉnh Tuyên Quang đưa pháp luật đến gần hơn với người dân xã Lâm Bình', 'Đoàn công tác Sở Tư pháp tổ chức hội nghị tuyên truyền, tư vấn pháp luật trực tiếp và cấp phát tài liệu song ngữ cho bà con dân tộc thiểu số tại xã Lâm Bình.'],
    ['tin-tuc-su-kien', null, '28/09/2026', 'Sở Tư pháp đổi mới phương thức, tăng cường ứng dụng công nghệ AI trong tổ chức hội nghị phổ biến pháp luật', 'Ứng dụng trợ lý ảo hỏi đáp pháp luật, bài giảng điện tử và hình thức hội nghị trực tuyến giúp mở rộng đối tượng tiếp cận pháp luật.'],
    ['tin-tuc-su-kien', null, '25/09/2026', 'Tuyên Quang kết nối điểm cầu trực tuyến Hội thảo lấy ý kiến đối với dự thảo Báo cáo tổng kết công tác PBGDPL', 'Các sở, ngành và UBND cấp xã tham dự tại điểm cầu tỉnh, đóng góp ý kiến vào dự thảo báo cáo tổng kết giai đoạn 2021 - 2026.'],
    ['tin-tuc-su-kien', null, '22/09/2026', 'Hội nghị tập huấn nghiệp vụ cho đội ngũ báo cáo viên, tuyên truyền viên pháp luật năm 2026', 'Hơn 300 học viên được bồi dưỡng kỹ năng truyền thông pháp luật, xây dựng bài giảng và sử dụng mạng xã hội trong tuyên truyền.'],
    ['tin-tuc-su-kien', null, '18/09/2026', 'Ra quân hưởng ứng Ngày Pháp luật Việt Nam năm 2026 trên địa bàn tỉnh Tuyên Quang', 'Nhiều hoạt động thiết thực được triển khai đồng loạt tại các cơ quan, đơn vị, trường học và khu dân cư.'],
    ['chinh-sach-phap-luat-moi', null, '27/09/2026', 'Chủ tịch UBND tỉnh Tuyên Quang yêu cầu đổi mới, nâng cao chất lượng công tác xây dựng và thi hành pháp luật', 'Các sở, ngành được giao rà soát, tham mưu ban hành kịp thời văn bản quy định chi tiết, bảo đảm tính khả thi và đồng bộ.'],
    ['chinh-sach-phap-luat-moi', null, '20/09/2026', 'Những chính sách mới có hiệu lực từ tháng 10/2026', 'Tổng hợp các luật, nghị định và văn bản của tỉnh có hiệu lực thi hành từ tháng 10/2026 liên quan trực tiếp đến người dân, doanh nghiệp.'],
    ['chinh-sach-phap-luat-moi', null, '12/09/2026', 'Phân cấp thẩm quyền quyết định phân bổ, điều chỉnh kế hoạch đầu tư công trên địa bàn tỉnh', 'Nghị quyết của HĐND tỉnh quy định cụ thể thẩm quyền, trình tự phân bổ và điều chỉnh kế hoạch đầu tư công vốn ngân sách địa phương.'],
    ['thong-cao-bao-chi', null, '26/09/2026', 'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 9/2026', 'Giới thiệu nội dung cơ bản, phạm vi điều chỉnh và hiệu lực thi hành của các văn bản quy phạm pháp luật mới ban hành.'],
    ['thong-cao-bao-chi', null, '28/08/2026', 'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 8/2026', 'Tổng hợp các nghị quyết, quyết định quy phạm pháp luật của tỉnh ban hành trong tháng 8/2026.'],
    ['hoat-dong-pbgdpl', 'dia-phuong', '24/09/2026', 'Tuyên truyền pháp luật về phòng, chống ma túy cho học sinh các trường THPT vùng cao', 'Chương trình ngoại khóa kết hợp sân khấu hóa giúp học sinh nắm được tác hại của ma túy và trách nhiệm của bản thân.'],
    ['hoat-dong-pbgdpl', 'dia-phuong', '16/09/2026', 'Phổ biến Luật Đất đai năm 2024 cho cán bộ, người dân các xã biên giới', 'Báo cáo viên pháp luật tỉnh giới thiệu những điểm mới về bồi thường, hỗ trợ, tái định cư và cấp giấy chứng nhận quyền sử dụng đất.'],
    ['hoat-dong-pbgdpl', 'trung-uong', '10/09/2026', 'Bộ Tư pháp tổ chức hội nghị toàn quốc triển khai công tác PBGDPL 6 tháng cuối năm 2026', 'Hội nghị trực tuyến kết nối đến các tỉnh, thành phố, trong đó có điểm cầu tỉnh Tuyên Quang.'],
    ['hoat-dong-pbgdpl', 'trung-uong', '02/09/2026', 'Hội đồng phối hợp PBGDPL Trung ương ban hành định hướng tuyên truyền quý IV/2026', 'Định hướng tập trung vào các luật mới được Quốc hội thông qua và các vấn đề dư luận quan tâm.'],
    ['hoi-dong-phoi-hop', 'cap-tinh', '31/08/2026', 'Công văn số 18/HĐPB ngày 31/8/2026 v/v định hướng tuyên truyền tháng 9 năm 2026', 'Hội đồng phối hợp PBGDPL tỉnh đề nghị các thành viên tập trung tuyên truyền các chính sách mới có hiệu lực và các ngày lễ lớn.'],
    ['hoi-dong-phoi-hop', 'cap-tinh', '15/08/2026', 'Kế hoạch hoạt động của Hội đồng phối hợp PBGDPL tỉnh 6 tháng cuối năm 2026', 'Xác định nhiệm vụ trọng tâm, phân công cơ quan chủ trì và thời gian thực hiện từng nội dung.'],
    ['hoi-dong-phoi-hop', 'cap-xa', '05/08/2026', 'Kiện toàn Hội đồng phối hợp PBGDPL cấp xã sau sắp xếp đơn vị hành chính', 'Hướng dẫn thành phần, quy chế hoạt động của Hội đồng phối hợp PBGDPL cấp xã.'],
    ['bao-cao-vien', 'cap-tinh', '20/08/2026', 'Quyết định công nhận Báo cáo viên pháp luật tỉnh Tuyên Quang', 'Công nhận bổ sung báo cáo viên pháp luật cấp tỉnh thuộc các sở, ban, ngành và tổ chức chính trị - xã hội.'],
    ['bao-cao-vien', 'tuyen-truyen-vien', '12/08/2026', 'Danh sách tuyên truyền viên pháp luật các xã khu vực Sơn Dương, Lâm Bình, Chiêm Hóa', 'Danh sách tuyên truyền viên pháp luật được công nhận tại các thôn, bản, tổ dân phố.'],
    ['bao-cao-vien', 'cap-xa', '01/08/2026', 'Bồi dưỡng kỹ năng cho báo cáo viên pháp luật cấp xã', 'Tập trung kỹ năng nói trước công chúng, xử lý tình huống và tuyên truyền bằng tiếng dân tộc.'],
    ['tai-lieu-pbgdpl', 'vbqppl-tw', '23/09/2026', 'Tài liệu giới thiệu Chương trình quốc gia về khởi nghiệp sáng tạo do Bộ trưởng Bộ Khoa học và Công nghệ phê duyệt', 'Tài liệu tóm tắt mục tiêu, đối tượng thụ hưởng và cơ chế hỗ trợ của chương trình.'],
    ['tai-lieu-pbgdpl', 'vbqppl-tinh', '14/09/2026', 'Tài liệu giới thiệu Nghị quyết phân cấp thẩm quyền quyết định phân bổ, điều chỉnh kế hoạch đầu tư công', 'Tài liệu giới thiệu phục vụ tuyên truyền đến cán bộ, công chức và người dân.'],
    ['tai-lieu-pbgdpl', 'de-cuong', '08/09/2026', 'Đề cương giới thiệu Luật sửa đổi, bổ sung một số điều của Luật Thuế thu nhập cá nhân', 'Đề cương phục vụ báo cáo viên, tuyên truyền viên trong các hội nghị phổ biến pháp luật.'],
    ['tai-lieu-pbgdpl', 'to-gap', '30/08/2026', 'Tờ gấp: Một số quy định của Luật Trẻ em về quyền và bổn phận của trẻ em', 'Tờ gấp minh họa, dễ hiểu, dùng cho tuyên truyền tại trường học và khu dân cư.'],
    ['tai-lieu-pbgdpl', 'sach-hoi-dap', '18/08/2026', 'Hỏi - đáp Luật Du lịch năm 2017 và các văn bản hướng dẫn thi hành', 'Sách hỏi - đáp giúp hộ kinh doanh du lịch cộng đồng nắm vững quy định pháp luật.'],
    ['tai-lieu-pbgdpl', 'tinh-huong', '10/08/2026', '05 tình huống tuyên truyền pháp luật về phòng, chống bạo lực, xâm hại trẻ em', 'Tình huống pháp luật kèm lời giải đáp, dùng trong sinh hoạt ngoại khóa và hội nghị ở cơ sở.'],
    ['tai-lieu-pbgdpl', 'cau-chuyen', '02/08/2026', 'Câu chuyện pháp luật: Nhà nước thu hồi đất để phát triển kinh tế - xã hội', 'Câu chuyện giúp người dân hiểu quyền, nghĩa vụ khi Nhà nước thu hồi đất.'],
    ['tai-lieu-pbgdpl', 'pano', '25/07/2026', 'Áp phích: Mưa lớn và nguyên tắc phòng tránh', 'Áp phích tuyên truyền kỹ năng phòng, tránh thiên tai trong mùa mưa lũ.'],
    ['truyen-thong-du-thao', null, '21/09/2026', 'Dự thảo Quyết định của UBND tỉnh quy định về điển hình tiên tiến', 'Truyền thông nội dung dự thảo để lấy ý kiến rộng rãi của cơ quan, tổ chức và nhân dân.'],
    ['truyen-thong-du-thao', null, '09/09/2026', 'Dự thảo Nghị quyết quy định chính sách hỗ trợ phát triển du lịch cộng đồng', 'Dự thảo quy định đối tượng, điều kiện và mức hỗ trợ đối với các điểm du lịch cộng đồng.'],
    ['huong-dan-nghiep-vu', null, '15/09/2026', 'Hướng dẫn đánh giá, công nhận cấp xã đạt chuẩn tiếp cận pháp luật năm 2026', 'Hướng dẫn trình tự chấm điểm, hồ sơ đề nghị công nhận và thời gian thực hiện.'],
    ['huong-dan-nghiep-vu', null, '28/07/2026', 'Hướng dẫn nghiệp vụ hòa giải ở cơ sở cho hòa giải viên mới', 'Tài liệu hướng dẫn quy trình hòa giải, kỹ năng thuyết phục và lập sổ theo dõi.'],
    ['thong-ke-bao-cao', null, '10/09/2026', 'Báo cáo kết quả công tác PBGDPL 9 tháng đầu năm 2026', 'Tổng hợp số liệu hội nghị, tài liệu phát hành, lượt người được tiếp cận pháp luật.'],
    ['thong-ke-bao-cao', null, '15/07/2026', 'Báo cáo sơ kết 6 tháng công tác của Hội đồng phối hợp PBGDPL tỉnh', 'Đánh giá kết quả, tồn tại và phương hướng nhiệm vụ 6 tháng cuối năm.'],
    ['hoa-giai-co-so', null, '19/09/2026', 'Tổ hòa giải thôn Bản Bó: điểm sáng giữ gìn đoàn kết ở cơ sở', 'Mô hình hòa giải gắn với già làng, người có uy tín giúp giải quyết thành công nhiều vụ việc.'],
    ['hoa-giai-co-so', null, '04/09/2026', 'Tập huấn kỹ năng hòa giải ở cơ sở năm 2026', 'Hòa giải viên được hướng dẫn kỹ năng xử lý các tranh chấp đất đai, hôn nhân và gia đình.'],
    ['chuan-tiep-can', null, '11/09/2026', 'Tuyên Quang đẩy mạnh xây dựng cấp xã đạt chuẩn tiếp cận pháp luật', 'Gắn tiêu chí tiếp cận pháp luật với xây dựng nông thôn mới và chuyển đổi số ở cơ sở.'],
    ['cuoc-thi', null, '26/09/2026', "Hướng dẫn đăng ký tham gia cuộc thi 'Công dân số hiểu luật'", 'Hướng dẫn tạo tài khoản, đăng nhập và làm bài thi trực tuyến trên nền tảng của cuộc thi.'],
    ['cuoc-thi', null, '05/09/2026', 'Phát động cuộc thi tìm hiểu pháp luật về phòng, chống thiên tai năm 2026', 'Cuộc thi dành cho cán bộ, công chức, học sinh và nhân dân trên địa bàn tỉnh.'],
    ['tro-giup-phap-ly', null, '17/09/2026', 'Trợ giúp pháp lý lưu động cho người dân tộc thiểu số tại các xã vùng cao', 'Trợ giúp viên pháp lý tư vấn trực tiếp về đất đai, hôn nhân gia đình và chính sách an sinh xã hội.'],
    ['tro-giup-phap-ly', null, '29/08/2026', 'Truyền thông về trợ giúp pháp lý tại cơ sở năm 2026', 'Hướng dẫn người dân về đối tượng được trợ giúp pháp lý và cách thức yêu cầu trợ giúp.'],
    ['ho-tro-phap-ly-doanh-nghiep', null, '23/09/2026', 'Đối thoại tháo gỡ vướng mắc pháp lý cho doanh nghiệp nhỏ và vừa', 'Đại diện các sở, ngành trả lời trực tiếp kiến nghị của doanh nghiệp về đất đai, thuế và thủ tục đầu tư.'],
    ['ho-tro-phap-ly-doanh-nghiep', null, '06/09/2026', 'Bồi dưỡng kiến thức pháp luật cho hợp tác xã nông nghiệp', 'Nội dung tập trung vào hợp đồng tiêu thụ nông sản, sở hữu trí tuệ và chỉ dẫn địa lý.']
];

// Bài bổ sung cho từng chuyên mục (dữ liệu minh họa, ngày cũ hơn các bài ở trên).
// Chuyên mục có mục con: bài được chia lần lượt cho các mục con.
const EXTRA_TITLES = {
    'tin-tuc-su-kien': [
        'Sở Tư pháp làm việc với UBND các xã về công tác tư pháp 6 tháng cuối năm',
        'Tuyên Quang sơ kết công tác phổ biến, giáo dục pháp luật 6 tháng đầu năm 2026',
        'Tổ chức hội nghị trực tuyến quán triệt các luật mới được Quốc hội thông qua',
        'Sở Tư pháp ký kết chương trình phối hợp tuyên truyền pháp luật với Đài Phát thanh - Truyền hình tỉnh',
        'Đoàn công tác liên ngành kiểm tra công tác hòa giải ở cơ sở tại các xã vùng cao',
        'Hội nghị giao ban công tác tư pháp quý II/2026',
        'Ra mắt trang thông tin pháp luật song ngữ Việt - Tày trên nền tảng số',
        'Tập huấn kỹ năng số cho cán bộ tư pháp - hộ tịch cấp xã',
        'Tuyên Quang triển khai Ngày Pháp luật tại các trường học đầu năm học mới',
        'Tổng kết mô hình “Thôn, bản tuân thủ pháp luật” giai đoạn 2021 - 2026'
    ],
    'chinh-sach-phap-luat-moi': [
        'Quy định mới về hỗ trợ phát triển sản xuất nông nghiệp hàng hóa trên địa bàn tỉnh',
        'Chính sách hỗ trợ học sinh, sinh viên dân tộc thiểu số năm học 2026 - 2027',
        'Điểm mới về cấp Giấy chứng nhận quyền sử dụng đất theo Luật Đất đai năm 2024',
        'Quy định mức thu phí, lệ phí mới trên địa bàn tỉnh từ tháng 8/2026',
        'Chính sách hỗ trợ đào tạo nghề cho lao động nông thôn giai đoạn 2026 - 2030',
        'Quy định về quản lý, sử dụng nhà văn hóa thôn, tổ dân phố',
        'Những điểm mới của Luật Phòng, chống ma túy sửa đổi',
        'Quy định về bảo vệ và phát triển rừng đặc dụng trên địa bàn tỉnh',
        'Chính sách hỗ trợ nhà ở cho hộ nghèo, hộ cận nghèo',
        'Hướng dẫn thực hiện chế độ trợ cấp xã hội hằng tháng'
    ],
    'thong-cao-bao-chi': [
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 7/2026',
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 6/2026',
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 5/2026',
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 4/2026',
        'Thông cáo báo chí kỳ họp thường lệ giữa năm 2026 của HĐND tỉnh',
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 3/2026',
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 2/2026',
        'Thông cáo báo chí văn bản quy phạm pháp luật do HĐND, UBND tỉnh ban hành tháng 1/2026',
        'Thông cáo báo chí kết quả kỳ họp chuyên đề của HĐND tỉnh',
        'Thông cáo báo chí về các quyết định quy phạm pháp luật mới của UBND tỉnh'
    ],
    'hoat-dong-pbgdpl': [
        'Bộ Tư pháp tổ chức tọa đàm về đổi mới công tác PBGDPL trong kỷ nguyên số',
        'Tuyên truyền Luật Giao thông đường bộ cho người dân các xã miền núi',
        'Hội nghị phổ biến pháp luật về phòng, chống bạo lực gia đình',
        'Phổ biến pháp luật cho phạm nhân, trại viên tại cơ sở giam giữ',
        'Cục Phổ biến, giáo dục pháp luật hướng dẫn triển khai Đề án PBGDPL giai đoạn mới',
        'Tuyên truyền pháp luật về bảo vệ môi trường tại các làng nghề',
        'Hội nghị trực tuyến toàn quốc về chuyển đổi số trong PBGDPL',
        'Phổ biến pháp luật về hôn nhân và gia đình, phòng chống tảo hôn',
        'Tổng kết Đề án tuyên truyền pháp luật cho đồng bào dân tộc thiểu số',
        'Sân khấu hóa tuyên truyền pháp luật tại các chợ phiên vùng cao'
    ],
    'hoi-dong-phoi-hop': [
        'Công văn định hướng tuyên truyền tháng 8 năm 2026',
        'Họp Hội đồng phối hợp PBGDPL cấp xã quý III/2026',
        'Công văn định hướng tuyên truyền tháng 7 năm 2026',
        'Kế hoạch kiểm tra hoạt động của Hội đồng phối hợp PBGDPL cấp xã',
        'Quy chế hoạt động của Hội đồng phối hợp PBGDPL tỉnh (sửa đổi)',
        'Hội đồng phối hợp PBGDPL cấp xã triển khai nhiệm vụ trọng tâm năm 2026',
        'Công văn định hướng tuyên truyền tháng 6 năm 2026',
        'Phân công nhiệm vụ thành viên Hội đồng phối hợp PBGDPL cấp xã',
        'Báo cáo kết quả hoạt động của Hội đồng phối hợp PBGDPL tỉnh quý II/2026',
        'Tập huấn nghiệp vụ cho thành viên Hội đồng phối hợp PBGDPL cấp xã'
    ],
    'bao-cao-vien': [
        'Quyết định công nhận bổ sung báo cáo viên pháp luật tỉnh đợt 2 năm 2026',
        'Quyết định công nhận báo cáo viên pháp luật cấp xã tại các xã phía Bắc tỉnh',
        'Danh sách tuyên truyền viên pháp luật các xã khu vực Na Hang, Hàm Yên',
        'Quyết định miễn nhiệm báo cáo viên pháp luật tỉnh năm 2026',
        'Hội thi báo cáo viên pháp luật giỏi cấp xã năm 2026',
        'Danh sách tuyên truyền viên pháp luật các tổ dân phố',
        'Bồi dưỡng kiến thức pháp luật mới cho báo cáo viên pháp luật tỉnh',
        'Báo cáo viên cấp xã tham gia tuyên truyền tại các buổi sinh hoạt cộng đồng',
        'Tuyên truyền viên pháp luật với công tác vận động người dân chấp hành pháp luật',
        'Kế hoạch sử dụng đội ngũ báo cáo viên pháp luật năm 2026'
    ],
    'tai-lieu-pbgdpl': [
        'Tài liệu giới thiệu Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ',
        'Tài liệu giới thiệu Nghị quyết của HĐND tỉnh về chính sách hỗ trợ giáo dục',
        'Đề cương giới thiệu Luật Đất đai năm 2024',
        'Tờ gấp: Phòng, chống lừa đảo trên không gian mạng',
        'Hỏi - đáp pháp luật về an toàn giao thông đường bộ',
        'Tình huống pháp luật về tranh chấp hợp đồng mua bán nông sản',
        'Câu chuyện pháp luật: Chuyện ở bản Pác Ngòi',
        'File âm thanh tuyên truyền phòng, chống ma túy bằng tiếng dân tộc',
        'Tài liệu giới thiệu Luật Thanh niên',
        'Tờ gấp: Quyền và nghĩa vụ của người lao động'
    ],
    'truyen-thong-du-thao': [
        'Dự thảo Nghị quyết quy định mức hỗ trợ cán bộ không chuyên trách cấp xã',
        'Dự thảo Quyết định ban hành quy chế quản lý cụm công nghiệp',
        'Dự thảo Nghị quyết về chính sách thu hút đầu tư vào nông nghiệp',
        'Dự thảo Quyết định quy định giá dịch vụ thu gom rác thải sinh hoạt',
        'Dự thảo Nghị quyết hỗ trợ bảo tồn văn hóa truyền thống các dân tộc',
        'Dự thảo Quyết định quy định về quản lý hoạt động khai thác cát, sỏi',
        'Dự thảo Nghị quyết quy định mức chi cho công tác hòa giải ở cơ sở',
        'Dự thảo Quyết định ban hành quy định về quản lý nghĩa trang',
        'Dự thảo Nghị quyết về chính sách hỗ trợ chuyển đổi số cấp xã',
        'Dự thảo Quyết định quy định tiêu chí xét công nhận làng nghề'
    ],
    'huong-dan-nghiep-vu': [
        'Hướng dẫn xây dựng kế hoạch PBGDPL năm 2027',
        'Hướng dẫn quản lý, khai thác tủ sách pháp luật',
        'Hướng dẫn tổ chức Ngày Pháp luật tại cơ quan, đơn vị',
        'Hướng dẫn nghiệp vụ theo dõi thi hành pháp luật cấp xã',
        'Hướng dẫn thống kê số liệu PBGDPL, hòa giải ở cơ sở',
        'Hướng dẫn biên soạn tài liệu tuyên truyền pháp luật',
        'Hướng dẫn tổ chức cuộc thi tìm hiểu pháp luật trực tuyến',
        'Hướng dẫn thanh, quyết toán kinh phí hòa giải ở cơ sở',
        'Hướng dẫn nghiệp vụ tuyên truyền pháp luật qua hệ thống loa truyền thanh cơ sở',
        'Hướng dẫn đánh giá hiệu quả công tác PBGDPL'
    ],
    'thong-ke-bao-cao': [
        'Báo cáo kết quả công tác PBGDPL quý II/2026',
        'Thống kê số lượng tổ hòa giải, hòa giải viên năm 2026',
        'Báo cáo kết quả đánh giá chuẩn tiếp cận pháp luật năm 2025',
        'Thống kê số liệu hội nghị PBGDPL 6 tháng đầu năm 2026',
        'Báo cáo tổng kết công tác PBGDPL năm 2025',
        'Thống kê tài liệu PBGDPL phát hành năm 2025',
        'Báo cáo kết quả thực hiện Đề án PBGDPL cho người dân tộc thiểu số',
        'Báo cáo kết quả hoạt động của đội ngũ báo cáo viên năm 2025',
        'Thống kê kết quả hòa giải ở cơ sở năm 2025',
        'Báo cáo kết quả Ngày Pháp luật năm 2025'
    ],
    'hoa-giai-co-so': [
        'Tổ hòa giải xã Minh Quang giải quyết thành công tranh chấp đất rừng',
        'Kinh nghiệm hòa giải các vụ việc hôn nhân, gia đình ở thôn bản',
        'Hội thi hòa giải viên giỏi cấp tỉnh năm 2026',
        'Người có uy tín trong đồng bào dân tộc với công tác hòa giải',
        'Kiện toàn tổ hòa giải ở cơ sở sau sắp xếp thôn, tổ dân phố',
        'Mô hình “Tổ hòa giải - Điểm tựa bình yên” tại xã vùng cao',
        'Hòa giải viên nữ và câu chuyện giữ gìn hạnh phúc gia đình',
        'Tập huấn kỹ năng hòa giải tranh chấp lối đi chung',
        'Biểu dương hòa giải viên tiêu biểu năm 2026',
        'Công tác hòa giải góp phần giữ vững an ninh trật tự ở cơ sở'
    ],
    'chuan-tiep-can': [
        'Kết quả đánh giá cấp xã đạt chuẩn tiếp cận pháp luật năm 2025',
        'Hội đồng đánh giá chuẩn tiếp cận pháp luật tỉnh họp xét công nhận',
        'Giải pháp nâng cao chỉ tiêu tiếp cận thông tin ở cấp xã',
        'Các xã vùng cao nỗ lực đạt chuẩn tiếp cận pháp luật',
        'Kiện toàn Hội đồng đánh giá chuẩn tiếp cận pháp luật tỉnh',
        'Tiêu chí tiếp cận pháp luật trong xây dựng nông thôn mới',
        'Tập huấn nghiệp vụ đánh giá chuẩn tiếp cận pháp luật',
        'Kinh nghiệm xây dựng xã đạt chuẩn tiếp cận pháp luật',
        'Kế hoạch đánh giá chuẩn tiếp cận pháp luật năm 2026',
        'Công khai kết quả tự đánh giá chuẩn tiếp cận pháp luật cấp xã'
    ],
    'cuoc-thi': [
        'Kết quả cuộc thi trực tuyến tìm hiểu pháp luật tuần 1',
        'Trao giải cuộc thi tìm hiểu Luật Đất đai năm 2024',
        'Phát động cuộc thi viết về gương người tốt, việc tốt trong chấp hành pháp luật',
        'Hội thi “Hòa giải viên giỏi” cấp tỉnh',
        'Cuộc thi tìm hiểu pháp luật về phòng, chống ma túy dành cho học sinh',
        'Kết quả cuộc thi trực tuyến tìm hiểu pháp luật tuần 2',
        'Thể lệ cuộc thi “Tuổi trẻ với pháp luật” năm 2026',
        'Trao giải hội thi báo cáo viên pháp luật giỏi',
        'Cuộc thi sáng tác tiểu phẩm tuyên truyền pháp luật',
        'Tổng kết cuộc thi trực tuyến tìm hiểu Hiến pháp'
    ],
    'tro-giup-phap-ly': [
        'Trợ giúp pháp lý trong các vụ án hình sự có người dưới 18 tuổi',
        'Trợ giúp pháp lý lưu động tại xã Thượng Lâm',
        'Hướng dẫn thủ tục yêu cầu trợ giúp pháp lý',
        'Vụ việc trợ giúp pháp lý điển hình về tranh chấp đất đai',
        'Tập huấn kỹ năng cho người thực hiện trợ giúp pháp lý',
        'Đặt bảng thông tin trợ giúp pháp lý tại trụ sở UBND cấp xã',
        'Trợ giúp pháp lý cho người khuyết tật',
        'Phối hợp liên ngành trong hoạt động trợ giúp pháp lý tố tụng',
        'Kết quả công tác trợ giúp pháp lý 6 tháng đầu năm 2026',
        'Trợ giúp pháp lý cho nạn nhân bạo lực gia đình'
    ],
    'ho-tro-phap-ly-doanh-nghiep': [
        'Tập huấn pháp luật về thuế cho hộ kinh doanh chuyển đổi lên doanh nghiệp',
        'Giải đáp vướng mắc pháp lý về hợp đồng lao động cho doanh nghiệp',
        'Hỗ trợ doanh nghiệp đăng ký nhãn hiệu cho sản phẩm OCOP',
        'Hội nghị phổ biến pháp luật về phòng cháy chữa cháy cho doanh nghiệp',
        'Mạng lưới tư vấn viên pháp luật hỗ trợ doanh nghiệp nhỏ và vừa',
        'Pháp luật về bảo vệ môi trường đối với cơ sở sản xuất',
        'Hỗ trợ pháp lý cho doanh nghiệp khởi nghiệp sáng tạo',
        'Tọa đàm về pháp luật đầu tư theo phương thức đối tác công tư',
        'Hướng dẫn doanh nghiệp thực hiện thủ tục đầu tư trên địa bàn tỉnh',
        'Giải đáp vướng mắc về bảo hiểm xã hội cho người lao động'
    ]
};

const extraSummary = (cat) => `Bài viết thuộc chuyên mục ${TQ_CATEGORIES[cat].title}. ${TQ_CATEGORIES[cat].desc}`;

Object.entries(EXTRA_TITLES).forEach(([cat, titles]) => {
    const subs = TQ_CATEGORIES[cat].subs;
    titles.forEach((title, i) => {
        const day = String(28 - ((i * 3) % 27)).padStart(2, '0');
        const month = String(6 - Math.floor(i / 2)).padStart(2, '0');
        RAW_ARTICLES.push([cat, subs ? subs[i % subs.length].slug : null, `${day}/${month}/2026`, title, extraSummary(cat)]);
    });
});

export const tuyenquangArticles = RAW_ARTICLES.map(([category, sub, date, title, summary], idx) => ({
    id: String(idx + 1),
    category,
    sub,
    date,
    title,
    summary,
    image: IMAGES[idx % IMAGES.length],
    views: 320 + ((idx * 137) % 2400),
    author: 'Ban Biên tập Cổng Pháp luật Tuyên Quang'
}));

export const tqArticlesOf = (category, sub) =>
    tuyenquangArticles.filter((a) => a.category === category && (!sub || a.sub === sub));

export const tqArticleUrl = (id) => `${TQ_HOME}/tin-tuc/chi-tiet/${id}`;
export const tqVideoUrl = (id) => `${TQ_HOME}/video/${id}`;
// Trang riêng Thông tin văn bản chỉ đạo điều hành (liên kết từ khối trên trang chủ)
export const TQ_DIRECTIVE_DOCS_URL = `${TQ_HOME}/van-ban-chi-dao-dieu-hanh`;
export const tqDirectiveDocUrl = (id) => `${TQ_DIRECTIVE_DOCS_URL}/${id}`;

// ---------------------------------------------------------------------------
// VĂN BẢN CHỈ ĐẠO ĐIỀU HÀNH (4 nhóm như trang PBGDPL Tuyên Quang)
// ---------------------------------------------------------------------------
export const TQ_DOC_GROUPS = [
    { id: 'tw', label: 'VB của Trung ương' },
    { id: 'tinh', label: 'VB của Tỉnh ủy, HĐND, UBND tỉnh' },
    { id: 'hdph', label: 'VB của HĐPH PBGDPL tỉnh' },
    { id: 'co-quan', label: 'VB của các cơ quan, đơn vị' }
];

export const tuyenquangDocs = [
    { id: 'd1', group: 'tinh', soHieu: '125/KH-UBND', coQuan: 'UBND tỉnh', loai: 'Kế hoạch', ngay: '26/09/2026', trichYeu: 'Kế hoạch tổ chức các hoạt động hưởng ứng Ngày Pháp luật Việt Nam năm 2026 trên địa bàn tỉnh Tuyên Quang' },
    { id: 'd2', group: 'hdph', soHieu: '18/HĐPB', coQuan: 'HĐPH PBGDPL tỉnh', loai: 'Công văn', ngay: '31/08/2026', trichYeu: 'Định hướng tuyên truyền tháng 9 năm 2026' },
    { id: 'd3', group: 'tw', soHieu: '1520/QĐ-BTP', coQuan: 'Bộ Tư pháp', loai: 'Quyết định', ngay: '20/08/2026', trichYeu: 'Ban hành Kế hoạch triển khai công tác phổ biến, giáo dục pháp luật 6 tháng cuối năm 2026' },
    { id: 'd4', group: 'tinh', soHieu: '09/CT-UBND', coQuan: 'UBND tỉnh', loai: 'Chỉ thị', ngay: '15/08/2026', trichYeu: 'Tăng cường công tác phổ biến, giáo dục pháp luật cho đồng bào dân tộc thiểu số' },
    { id: 'd5', group: 'co-quan', soHieu: '842/STP-PBGDPL', coQuan: 'Sở Tư pháp', loai: 'Công văn', ngay: '10/08/2026', trichYeu: 'Hướng dẫn đánh giá, công nhận cấp xã đạt chuẩn tiếp cận pháp luật năm 2026' },
    { id: 'd6', group: 'hdph', soHieu: '15/KH-HĐPH', coQuan: 'HĐPH PBGDPL tỉnh', loai: 'Kế hoạch', ngay: '05/08/2026', trichYeu: 'Kế hoạch hoạt động của Hội đồng phối hợp PBGDPL tỉnh 6 tháng cuối năm 2026' },
    { id: 'd7', group: 'tw', soHieu: '45/HD-HĐPH', coQuan: 'HĐPH PBGDPL Trung ương', loai: 'Hướng dẫn', ngay: '28/07/2026', trichYeu: 'Hướng dẫn tổ chức Ngày Pháp luật Việt Nam năm 2026' },
    { id: 'd8', group: 'tinh', soHieu: '12/NQ-HĐND', coQuan: 'HĐND tỉnh', loai: 'Nghị quyết', ngay: '18/07/2026', trichYeu: 'Quy định phân cấp thẩm quyền quyết định phân bổ, điều chỉnh kế hoạch đầu tư công vốn ngân sách địa phương' },
    { id: 'd9', group: 'co-quan', soHieu: '215/KH-CAT', coQuan: 'Công an tỉnh', loai: 'Kế hoạch', ngay: '10/07/2026', trichYeu: 'Tuyên truyền pháp luật về phòng, chống ma túy trong trường học năm học 2026 - 2027' },
    { id: 'd10', group: 'tinh', soHieu: '31-KH/TU', coQuan: 'Tỉnh ủy', loai: 'Kế hoạch', ngay: '02/07/2026', trichYeu: 'Thực hiện Chỉ thị của Ban Bí thư về tăng cường sự lãnh đạo của Đảng đối với công tác PBGDPL' },
    { id: 'd11', group: 'tw', soHieu: '88/2026/NĐ-CP', coQuan: 'Chính phủ', loai: 'Nghị định', ngay: '25/06/2026', trichYeu: 'Quy định chi tiết một số điều của Luật Phổ biến, giáo dục pháp luật' },
    { id: 'd12', group: 'co-quan', soHieu: '96/KH-SGDĐT', coQuan: 'Sở Giáo dục và Đào tạo', loai: 'Kế hoạch', ngay: '15/06/2026', trichYeu: 'Giáo dục pháp luật trong nhà trường năm học 2026 - 2027' },
    { id: 'd13', group: 'tw', soHieu: '1045/QĐ-TTg', coQuan: 'Thủ tướng Chính phủ', loai: 'Quyết định', ngay: '10/06/2026', trichYeu: 'Phê duyệt Đề án tăng cường ứng dụng công nghệ số trong phổ biến, giáo dục pháp luật' },
    { id: 'd14', group: 'tinh', soHieu: '87/KH-UBND', coQuan: 'UBND tỉnh', loai: 'Kế hoạch', ngay: '02/06/2026', trichYeu: 'Triển khai công tác phổ biến, giáo dục pháp luật, hòa giải ở cơ sở năm 2026' },
    { id: 'd15', group: 'hdph', soHieu: '12/HĐPB', coQuan: 'HĐPH PBGDPL tỉnh', loai: 'Công văn', ngay: '28/05/2026', trichYeu: 'Định hướng tuyên truyền tháng 6 năm 2026' },
    { id: 'd16', group: 'co-quan', soHieu: '512/STP-PBGDPL', coQuan: 'Sở Tư pháp', loai: 'Công văn', ngay: '20/05/2026', trichYeu: 'Hướng dẫn tổ chức hội nghị phổ biến pháp luật trực tuyến tại cấp xã' },
    { id: 'd17', group: 'tw', soHieu: '1210/BTP-PBGDPL', coQuan: 'Bộ Tư pháp', loai: 'Công văn', ngay: '12/05/2026', trichYeu: 'Hướng dẫn đánh giá hiệu quả công tác phổ biến, giáo dục pháp luật' },
    { id: 'd18', group: 'tinh', soHieu: '05/CT-UBND', coQuan: 'UBND tỉnh', loai: 'Chỉ thị', ngay: '05/05/2026', trichYeu: 'Tăng cường công tác hòa giải ở cơ sở trên địa bàn tỉnh' },
    { id: 'd19', group: 'hdph', soHieu: '09/KH-HĐPH', coQuan: 'HĐPH PBGDPL tỉnh', loai: 'Kế hoạch', ngay: '25/04/2026', trichYeu: 'Kiểm tra công tác phổ biến, giáo dục pháp luật tại một số sở, ngành và cấp xã năm 2026' },
    { id: 'd20', group: 'co-quan', soHieu: '188/KH-TĐTN', coQuan: 'Tỉnh đoàn', loai: 'Kế hoạch', ngay: '18/04/2026', trichYeu: 'Tuyên truyền pháp luật cho đoàn viên, thanh niên năm 2026' },
    { id: 'd21', group: 'tinh', soHieu: '08/NQ-HĐND', coQuan: 'HĐND tỉnh', loai: 'Nghị quyết', ngay: '10/04/2026', trichYeu: 'Quy định mức chi bảo đảm cho công tác phổ biến, giáo dục pháp luật và chuẩn tiếp cận pháp luật' },
    { id: 'd22', group: 'co-quan', soHieu: '76/KH-HLHPN', coQuan: 'Hội Liên hiệp Phụ nữ tỉnh', loai: 'Kế hoạch', ngay: '02/04/2026', trichYeu: 'Tuyên truyền pháp luật về phòng, chống bạo lực gia đình cho hội viên phụ nữ' }
];

// ---------------------------------------------------------------------------
// HỎI ĐÁP, TƯ VẤN PHÁP LUẬT
// ---------------------------------------------------------------------------
export const TQ_FAQ_GROUPS = [
    { id: 'hoi-dap', label: 'Hỏi đáp pháp luật' },
    { id: 'tu-van', label: 'Tư vấn pháp luật' },
    { id: 'doi-thoai', label: 'Đối thoại chính sách - pháp luật' }
];

export const tuyenquangFAQs = [
    { id: 'q1', group: 'hoi-dap', date: '27/09/2026', asker: 'Nguyễn Văn H., xã Yên Sơn', q: 'Hủy hoại đất là gì? Hành vi hủy hoại đất bị xử lý như thế nào?', a: 'Theo Luật Đất đai, hủy hoại đất là hành vi làm biến dạng địa hình, làm suy giảm chất lượng đất, gây ô nhiễm đất mà làm mất hoặc giảm khả năng sử dụng đất theo mục đích đã được xác định. Tùy tính chất, mức độ vi phạm, người có hành vi hủy hoại đất có thể bị xử phạt vi phạm hành chính và buộc khôi phục tình trạng ban đầu của đất.' },
    { id: 'q2', group: 'hoi-dap', date: '20/09/2026', asker: 'Hoàng Thị M., xã Lâm Bình', q: 'Người dân tộc thiểu số ở xã đặc biệt khó khăn có được trợ giúp pháp lý miễn phí không?', a: 'Người dân tộc thiểu số cư trú ở vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn thuộc diện được trợ giúp pháp lý theo Luật Trợ giúp pháp lý. Người dân có thể liên hệ Trung tâm Trợ giúp pháp lý nhà nước tỉnh hoặc chi nhánh gần nhất để được hỗ trợ.' },
    { id: 'q3', group: 'hoi-dap', date: '12/09/2026', asker: 'Trần Văn K., phường Minh Xuân', q: 'Thủ tục đăng ký khai sinh trực tuyến cần chuẩn bị những gì?', a: 'Người đi đăng ký chuẩn bị bản chụp giấy chứng sinh và giấy tờ tùy thân, thực hiện trên Cổng Dịch vụ công và nhận kết quả theo hình thức đã đăng ký.' },
    { id: 'q4', group: 'tu-van', date: '24/09/2026', asker: 'Hộ kinh doanh Đ.T., xã Na Hang', q: 'Hộ kinh doanh homestay cần đáp ứng điều kiện gì về an ninh trật tự và phòng cháy?', a: 'Cơ sở lưu trú du lịch phải đáp ứng điều kiện về an ninh, trật tự, phòng cháy và chữa cháy, vệ sinh môi trường theo quy định; thực hiện thông báo lưu trú cho khách theo quy định của pháp luật về cư trú.' },
    { id: 'q5', group: 'tu-van', date: '15/09/2026', asker: 'Lê Thị P., xã Chiêm Hóa', q: 'Xả rác thải sinh hoạt không đúng nơi quy định bị xử phạt như thế nào?', a: 'Hành vi vứt, thải, bỏ rác thải sinh hoạt không đúng nơi quy định có thể bị xử phạt vi phạm hành chính trong lĩnh vực bảo vệ môi trường; mức phạt tùy theo hành vi và địa bàn vi phạm.' },
    { id: 'q6', group: 'doi-thoai', date: '10/09/2026', asker: 'Hội nghị đối thoại tại xã Sơn Dương', q: 'Người dân kiến nghị về tiến độ cấp giấy chứng nhận quyền sử dụng đất sau đo đạc lại', a: 'Đại diện cơ quan chuyên môn tiếp thu, cam kết rà soát hồ sơ tồn đọng và thông báo công khai tiến độ giải quyết tại trụ sở UBND xã.' }
];

// ---------------------------------------------------------------------------
// ĐA PHƯƠNG TIỆN
// ---------------------------------------------------------------------------
export const tuyenquangVideos = [
    { id: 'v1', title: "Hướng dẫn đăng ký tham gia cuộc thi 'Công dân số hiểu luật'", date: '26/09/2026', duration: '06:24', thumb: '/thumb1.png', desc: 'Video hướng dẫn từng bước đăng ký tài khoản và tham gia làm bài thi trực tuyến.' },
    { id: 'v2', title: "Khởi động chiến dịch truyền thông 'Tin AI'", date: '19/09/2026', duration: '04:10', thumb: '/thumb2.png', desc: 'Chiến dịch nâng cao kỹ năng nhận diện thông tin sai lệch do trí tuệ nhân tạo tạo ra.' },
    { id: 'v3', title: 'Tiểu phẩm: Hòa giải tranh chấp ranh giới đất ở thôn bản', date: '08/09/2026', duration: '12:35', thumb: '/thumb3.png', desc: 'Tiểu phẩm do tổ hòa giải cơ sở dàn dựng, tuyên truyền pháp luật đất đai.' },
    { id: 'v4', title: 'Phóng sự: Trợ giúp pháp lý đến với đồng bào vùng cao', date: '30/08/2026', duration: '09:48', thumb: '/fda33db9-762a-4d21-9317-96615cd1968b.jpg', desc: 'Ghi nhận hoạt động trợ giúp pháp lý lưu động tại các xã vùng cao của tỉnh.' }
];

export const tuyenquangPhotos = [
    { id: 'p1', title: 'Hội nghị tuyên truyền pháp luật tại xã Lâm Bình', date: '30/09/2026', thumb: '/thumb1.png', count: 18 },
    { id: 'p2', title: 'Ngày hội hưởng ứng Ngày Pháp luật Việt Nam', date: '18/09/2026', thumb: '/02bd53d8-37a5-4927-8d00-a00feb16a3b2.jpg', count: 24 },
    { id: 'p3', title: 'Tập huấn báo cáo viên, tuyên truyền viên pháp luật', date: '22/09/2026', thumb: '/1748a7fd-78c7-4106-9c42-2852c0a58e1e.jpg', count: 15 }
];

export const tuyenquangInfographics = [
    { id: 'i1', title: 'Infographic: Mưa lớn và nguyên tắc phòng tránh', date: '25/07/2026', thumb: '/thumb2.png', views: 4210 },
    { id: 'i2', title: 'Infographic: Quyền và bổn phận của trẻ em theo Luật Trẻ em', date: '30/08/2026', thumb: '/thumb3.png', views: 3180 },
    { id: 'i3', title: 'Infographic: 5 bước đánh giá cấp xã đạt chuẩn tiếp cận pháp luật', date: '15/09/2026', thumb: '/thumb1.png', views: 2760 }
];

// ---------------------------------------------------------------------------
// TIN TRÔI NGANG & LIÊN KẾT
// ---------------------------------------------------------------------------
export const tuyenquangTicker = tuyenquangArticles.slice(0, 6).map((a) => ({
    id: a.id,
    tag: TQ_CATEGORIES[a.category].title,
    title: a.title,
    link: tqArticleUrl(a.id)
}));

// Chỉ dùng các tên miền chính thức đã biết
export const tuyenquangLinks = [
    { id: 'ubnd', name: 'Cổng TTĐT tỉnh Tuyên Quang', domain: 'tuyenquang.gov.vn', icon: 'building' },
    { id: 'pbgdpl', name: 'Trang PBGDPL tỉnh Tuyên Quang', domain: 'pbgdpl.tuyenquang.gov.vn', icon: 'book' },
    { id: 'btp', name: 'Bộ Tư pháp', domain: 'moj.gov.vn', icon: 'scale' },
    { id: 'chinhphu', name: 'Cổng TTĐT Chính phủ', domain: 'chinhphu.vn', icon: 'landmark' },
    { id: 'dvc', name: 'Cổng Dịch vụ công quốc gia', domain: 'dichvucong.gov.vn', icon: 'monitor' },
    { id: 'vbpl', name: 'Cơ sở dữ liệu quốc gia về VBPL', domain: 'vbpl.vn', icon: 'file' }
];

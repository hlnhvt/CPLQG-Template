// Hồ sơ từng Cổng địa phương: dùng để sinh nội dung cho các chuyên trang (PBGDPL, TGPL, Hỗ trợ pháp lý DN)
// Toàn bộ là dữ liệu mẫu phục vụ giao diện.

export const hanoiProfile = {
    key: 'ha-noi',
    homeUrl: '/ha-noi',
    homeLabel: 'Trang chủ Hà Nội',
    siteName: 'Cổng Pháp luật Thành phố Hà Nội',
    name: 'Thành phố Hà Nội',
    shortName: 'Hà Nội',
    scopeWord: 'Thành phố',
    people: 'người dân Thủ đô',
    ubnd: 'UBND Thành phố Hà Nội',
    hdnd: 'HĐND Thành phố Hà Nội',
    stp: 'Sở Tư pháp Thành phố Hà Nội',
    stpShort: 'Sở Tư pháp Hà Nội',
    council: 'Hội đồng phối hợp PBGDPL Thành phố Hà Nội',
    center: 'Trung tâm Trợ giúp pháp lý Nhà nước Thành phố Hà Nội',
    bar: 'Đoàn Luật sư Thành phố Hà Nội',
    businessAssoc: 'Hiệp hội Doanh nghiệp nhỏ và vừa Thành phố Hà Nội',
    areaCode: '024',
    centerAddress: 'Số 1B Trần Phú, phường Hà Đông, TP. Hà Nội',
    localities: [
        { name: 'Hoàn Kiếm', type: 'phường' }, { name: 'Ba Đình', type: 'phường' }, { name: 'Đống Đa', type: 'phường' },
        { name: 'Cầu Giấy', type: 'phường' }, { name: 'Tây Hồ', type: 'phường' }, { name: 'Long Biên', type: 'phường' },
        { name: 'Hà Đông', type: 'phường' }, { name: 'Hoàng Mai', type: 'phường' }, { name: 'Thanh Xuân', type: 'phường' },
        { name: 'Sơn Tây', type: 'phường' }, { name: 'Ba Vì', type: 'xã' }, { name: 'Sóc Sơn', type: 'xã' },
        { name: 'Mỹ Đức', type: 'xã' }, { name: 'Đông Anh', type: 'xã' }, { name: 'Gia Lâm', type: 'xã' }, { name: 'Thạch Thất', type: 'xã' }
    ],
    // Nhóm dân cư/khu vực ưu tiên trong tuyên truyền, trợ giúp
    focusGroups: ['công nhân khu công nghiệp', 'người lao động ngoại tỉnh', 'người cao tuổi', 'học sinh, sinh viên', 'hộ kinh doanh cá thể'],
    hotTopics: ['Luật Thủ đô 2024', 'trật tự đô thị', 'bồi thường, tái định cư', 'an toàn giao thông', 'phòng cháy chữa cháy nhà chung cư'],
    publicationLanguages: ['Tiếng Việt'],
    stats: { disseminationEvents: 4860, reached: '2,1 triệu', mediationTeams: 5120, mediationRate: '82,4%', legalAidCases: 3820, collaborators: 412, businessesSupported: 1560, consultants: 186 },
    // Chính sách/cơ chế đặc thù của địa phương cho doanh nghiệp
    localPolicies: [
        { title: 'Cơ chế thử nghiệm có kiểm soát (Sandbox) công nghệ mới', basis: 'Điều 25 Luật Thủ đô số 39/2024/QH15', field: 'Đổi mới sáng tạo', target: 'DN công nghệ, khởi nghiệp', desc: 'Cho phép thử nghiệm giải pháp công nghệ mới (AI, fintech, dữ liệu) trong phạm vi, thời gian giới hạn dưới sự giám sát của cơ quan có thẩm quyền.' },
        { title: 'Hỗ trợ chi phí ươm tạo tại Khu Công nghệ cao Hòa Lạc', basis: 'Nghị quyết của HĐND Thành phố Hà Nội', field: 'Đổi mới sáng tạo', target: 'DN khoa học công nghệ', desc: 'Hỗ trợ một phần chi phí thuê không gian làm việc, phòng thí nghiệm dùng chung cho doanh nghiệp khoa học công nghệ giai đoạn đầu.' },
        { title: 'Hỗ trợ thuê mặt bằng tại cụm công nghiệp làng nghề', basis: 'Quyết định của UBND Thành phố Hà Nội', field: 'Đất đai & mặt bằng', target: 'DN nhỏ và vừa, làng nghề', desc: 'Ưu tiên bố trí mặt bằng sản xuất, hỗ trợ di dời cơ sở gây ô nhiễm ra khỏi khu dân cư vào cụm công nghiệp tập trung.' },
        { title: 'Phát triển kinh tế ban đêm và dịch vụ văn hóa - du lịch', basis: 'Đề án của UBND Thành phố Hà Nội', field: 'Thương mại & dịch vụ', target: 'DN du lịch, dịch vụ', desc: 'Hướng dẫn điều kiện kinh doanh, an ninh trật tự và phòng cháy tại các tuyến phố, khu vực thí điểm kinh tế ban đêm.' },
        { title: 'Chuyển đổi xanh và vùng phát thải thấp', basis: 'Nghị quyết của HĐND Thành phố Hà Nội', field: 'Môi trường', target: 'DN vận tải, sản xuất', desc: 'Hướng dẫn lộ trình chuyển đổi phương tiện, tiêu chuẩn khí thải và chính sách hỗ trợ đổi mới công nghệ sạch.' }
    ],
    localDocs: [
        { code: 'Kế hoạch số 12/KH-UBND', title: 'Kế hoạch tuyên truyền, phổ biến Luật Thủ đô năm 2024 và các văn bản quy định chi tiết', agency: 'UBND Thành phố Hà Nội', type: 'Kế hoạch' },
        { code: 'Công văn số 318/STP-PBGDPL', title: 'Tổ chức tuyên truyền pháp luật về trật tự đô thị, an toàn phòng cháy tại nhà chung cư, nhà ở nhiều tầng', agency: 'Sở Tư pháp Thành phố Hà Nội', type: 'Công văn' }
    ]
};

export const laocaiProfile = {
    key: 'lao-cai',
    homeUrl: '/lao-cai',
    homeLabel: 'Trang chủ Lào Cai',
    siteName: 'Cổng Pháp luật tỉnh Lào Cai',
    name: 'tỉnh Lào Cai',
    shortName: 'Lào Cai',
    scopeWord: 'Tỉnh',
    people: 'nhân dân các dân tộc tỉnh Lào Cai',
    ubnd: 'UBND tỉnh Lào Cai',
    hdnd: 'HĐND tỉnh Lào Cai',
    stp: 'Sở Tư pháp tỉnh Lào Cai',
    stpShort: 'Sở Tư pháp Lào Cai',
    council: 'Hội đồng phối hợp PBGDPL tỉnh Lào Cai',
    center: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
    bar: 'Đoàn Luật sư tỉnh Lào Cai',
    businessAssoc: 'Hiệp hội Doanh nghiệp tỉnh Lào Cai',
    areaCode: '0214',
    centerAddress: 'Đại lộ Trần Hưng Đạo, phường Cam Đường, tỉnh Lào Cai',
    localities: [
        { name: 'Cam Đường', type: 'phường' }, { name: 'Lào Cai', type: 'phường' }, { name: 'Sa Pa', type: 'phường' },
        { name: 'Bát Xát', type: 'xã' }, { name: 'Y Tý', type: 'xã' }, { name: 'Mường Khương', type: 'xã' },
        { name: 'Bắc Hà', type: 'xã' }, { name: 'Si Ma Cai', type: 'xã' }, { name: 'Bảo Thắng', type: 'xã' },
        { name: 'Bảo Yên', type: 'xã' }, { name: 'Văn Bàn', type: 'xã' }, { name: 'Tả Van', type: 'xã' },
        { name: 'Pha Long', type: 'xã' }, { name: 'Bản Lầu', type: 'xã' }, { name: 'Phong Hải', type: 'xã' }, { name: 'Nghĩa Đô', type: 'xã' }
    ],
    focusGroups: ['đồng bào dân tộc thiểu số', 'người dân khu vực biên giới', 'phụ nữ và trẻ em vùng cao', 'người lao động tự do', 'hộ sản xuất nông nghiệp'],
    hotTopics: ['phòng, chống tảo hôn và hôn nhân cận huyết thống', 'xuất nhập cảnh, biên giới', 'đất đai, rừng', 'phòng, chống mua bán người', 'hướng dẫn kinh doanh du lịch cộng đồng'],
    publicationLanguages: ['Tiếng Việt', 'Song ngữ Việt - Mông', 'Song ngữ Việt - Dao'],
    stats: { disseminationEvents: 2140, reached: '680 nghìn', mediationTeams: 1860, mediationRate: '85,1%', legalAidCases: 1240, collaborators: 168, businessesSupported: 540, consultants: 72 },
    localPolicies: [
        { title: 'Ưu đãi đầu tư tại Khu kinh tế cửa khẩu Lào Cai', basis: 'Quy định về ưu đãi đầu tư khu kinh tế và Quyết định của UBND tỉnh Lào Cai', field: 'Đầu tư & logistics', target: 'DN logistics, xuất nhập khẩu', desc: 'Hướng dẫn thủ tục đầu tư, ưu đãi thuế và thuê đất đối với dự án kho bãi, logistics, dịch vụ xuất nhập khẩu tại khu kinh tế cửa khẩu.' },
        { title: 'Hỗ trợ phát triển du lịch cộng đồng và homestay vùng cao', basis: 'Nghị quyết của HĐND tỉnh Lào Cai', field: 'Du lịch & dịch vụ', target: 'Hộ kinh doanh, DN du lịch', desc: 'Hỗ trợ đào tạo, xúc tiến và hướng dẫn điều kiện kinh doanh lưu trú, an toàn phòng cháy cho cơ sở homestay tại Sa Pa, Bắc Hà, Y Tý.' },
        { title: 'Phát triển nông nghiệp hàng hóa, sản phẩm OCOP', basis: 'Nghị quyết của HĐND tỉnh Lào Cai', field: 'Nông nghiệp', target: 'HTX, DN nông nghiệp', desc: 'Hỗ trợ liên kết sản xuất, chứng nhận chất lượng, truy xuất nguồn gốc và đăng ký bảo hộ nhãn hiệu cho nông sản chủ lực của tỉnh.' },
        { title: 'Tháo gỡ vướng mắc pháp lý cho hoạt động thương mại biên giới', basis: 'Kế hoạch của UBND tỉnh Lào Cai', field: 'Thương mại & dịch vụ', target: 'DN xuất nhập khẩu', desc: 'Tổ công tác liên ngành tiếp nhận, giải đáp vướng mắc về thủ tục hải quan, kiểm dịch và hợp đồng thương mại quốc tế.' },
        { title: 'Hỗ trợ chuyển đổi số cho doanh nghiệp nhỏ và hộ kinh doanh', basis: 'Chương trình chuyển đổi số của tỉnh Lào Cai', field: 'Đổi mới sáng tạo', target: 'DN nhỏ, hộ kinh doanh', desc: 'Hướng dẫn hóa đơn điện tử, chữ ký số, thương mại điện tử và bảo vệ dữ liệu cá nhân khi kinh doanh trực tuyến.' }
    ],
    localDocs: [
        { code: 'Kế hoạch số 15/KH-UBND', title: 'Kế hoạch tuyên truyền, phổ biến pháp luật cho đồng bào dân tộc thiểu số và người dân khu vực biên giới', agency: 'UBND tỉnh Lào Cai', type: 'Kế hoạch' },
        { code: 'Công văn số 205/STP-PBGDPL', title: 'Biên soạn tài liệu tuyên truyền song ngữ tiếng Việt - tiếng Mông, tiếng Dao về phòng, chống tảo hôn', agency: 'Sở Tư pháp tỉnh Lào Cai', type: 'Công văn' }
    ]
};

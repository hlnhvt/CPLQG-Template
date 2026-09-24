// Sinh dữ liệu mẫu cho 3 chuyên trang theo hồ sơ Cổng (xem ./profiles.js).
// Nội dung pháp luật chung dùng cho mọi địa phương; nội dung địa phương lấy từ hồ sơ.
// Toàn bộ là dữ liệu mẫu phục vụ giao diện, cần rà soát trước khi đưa vào vận hành.

const pad = (n) => String(n).padStart(2, '0');
const pick = (arr, i) => arr[i % arr.length];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Ngày giảm dần tính từ 20/09/2026
export const dateAt = (i, step = 5) => {
    const d = new Date(2026, 8, 20);
    d.setDate(d.getDate() - i * step);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};
const locOf = (p, i) => {
    const l = pick(p.localities, i);
    return `${l.type} ${l.name}`;
};
const phoneOf = (p, i) => `${p.areaCode}.${3700 + ((i * 137) % 290)}.${100 + ((i * 457) % 900)}`;

const SURNAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Ngô', 'Dương', 'Lý'];
const MIDDLES = ['Văn', 'Thị', 'Minh', 'Thu', 'Đức', 'Thanh', 'Hồng', 'Quang', 'Ngọc', 'Hải'];
const GIVENS = ['An', 'Bình', 'Hà', 'Hùng', 'Lan', 'Long', 'Mai', 'Nam', 'Phương', 'Quân', 'Sơn', 'Trang', 'Tuấn', 'Vân', 'Yến', 'Khánh'];
// Cặp (họ, tên) không lặp trong 48 người đầu
const personOf = (i) => `${pick(SURNAMES, i)} ${pick(MIDDLES, i * 3 + 1)} ${pick(GIVENS, i * 7 + 2)}`;
// Chỉ số địa bàn thay đổi theo vòng lặp mẫu để tránh trùng cặp (mẫu, địa bàn)
const roundLoc = (i, size, shift = 0) => i * 3 + Math.floor(i / size) * 5 + shift;

/* ================================================================== */
/*  PHỔ BIẾN, GIÁO DỤC PHÁP LUẬT                                        */
/* ================================================================== */

const NEWS_TEMPLATES = [
    { cat: 'Hoạt động chỉ đạo', t: (p, l) => `${p.council} triển khai nhiệm vụ trọng tâm, chỉ đạo điểm tại ${l}`, s: (p) => `Hội đồng thống nhất các nhiệm vụ trọng tâm, giao chỉ tiêu cụ thể cho từng cơ quan thành viên và UBND cấp xã trên địa bàn ${p.name}.` },
    { cat: 'Tuyên truyền cơ sở', t: (p, l, i) => `Tuyên truyền pháp luật về ${pick(p.hotTopics, i)} cho ${pick(p.focusGroups, i)} tại ${l}`, s: (p, l) => `Buổi tuyên truyền được tổ chức theo hình thức đối thoại, hỏi đáp tình huống, thu hút đông đảo người dân ${l} tham gia.` },
    { cat: 'Ngày Pháp luật', t: (p, l) => `${cap(l)} tổ chức hưởng ứng Ngày Pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam`, s: (p) => `Chuỗi hoạt động gồm mít tinh, sân khấu hóa, trưng bày tài liệu pháp luật và tư vấn pháp luật miễn phí cho ${p.people}.` },
    { cat: 'Chuyển đổi số PBGDPL', t: (p, l) => `Ứng dụng mã QR, video ngắn đưa pháp luật đến gần người dân ${l}`, s: (p) => `Các tài liệu pháp luật được số hóa, gắn mã QR tại nhà văn hóa, trụ sở UBND cấp xã; người dân quét mã để xem nội dung trên điện thoại.` },
    { cat: 'Tiếp cận pháp luật', t: (p, l) => `Đánh giá, công nhận ${l} đạt chuẩn tiếp cận pháp luật năm 2025`, s: (p) => `Kết quả đánh giá dựa trên bộ tiêu chí theo Quyết định số 25/2021/QĐ-TTg, gắn với việc nâng cao chất lượng thực thi pháp luật tại cơ sở.` },
    { cat: 'Thi tìm hiểu pháp luật', t: (p, l, i) => `Sôi nổi cuộc thi tìm hiểu pháp luật về ${pick(p.hotTopics, i + 2)} dành cho ${pick(p.focusGroups, i + 1)} ${l}`, s: (p) => `Cuộc thi được tổ chức trực tuyến kết hợp trực tiếp, với hàng nghìn lượt dự thi trên toàn ${p.name}.` },
    { cat: 'Tuyên truyền cơ sở', t: (p, l) => `Đưa pháp luật về thôn, tổ dân phố thông qua hệ thống loa truyền thanh cơ sở tại ${l}`, s: () => 'Các chuyên mục pháp luật được phát định kỳ hằng tuần, nội dung ngắn gọn, gắn với tình huống thực tế tại địa phương.' },
    { cat: 'Hoạt động chỉ đạo', t: (p, l) => `${p.stp} tập huấn nghiệp vụ cho báo cáo viên, tuyên truyền viên pháp luật tại ${l}`, s: () => 'Nội dung tập huấn tập trung vào kỹ năng truyền thông pháp luật, xây dựng nội dung trên nền tảng số và xử lý tình huống.' },
    { cat: 'Chuyển đổi số PBGDPL', t: (p, l, i) => `Ra mắt chuyên mục podcast pháp luật số ${i + 1} về ${pick(p.hotTopics, i + 3)}`, s: (p) => `Chuyên mục được phát hành trên ${p.siteName} và các nền tảng mạng xã hội chính thức của ${p.stp}.` },
    { cat: 'Tiếp cận pháp luật', t: (p, l) => `Tủ sách pháp luật ${l} được bổ sung tài liệu mới`, s: () => 'Tài liệu bổ sung gồm sách hỏi đáp, tờ gấp, cẩm nang pháp luật thiết thực với đời sống người dân.' }
];

const NATIONAL_DISSEMINATION_DOCS = [
    { code: 'Luật số 14/2012/QH13', title: 'Luật Phổ biến, giáo dục pháp luật', agency: 'Quốc hội', type: 'Luật', date: '20/06/2012' },
    { code: 'Luật số 35/2013/QH13', title: 'Luật Hòa giải ở cơ sở', agency: 'Quốc hội', type: 'Luật', date: '20/06/2013' },
    { code: 'Chỉ thị số 32-CT/TW', title: 'Chỉ thị về tăng cường sự lãnh đạo của Đảng trong công tác phổ biến, giáo dục pháp luật, nâng cao ý thức chấp hành pháp luật', agency: 'Ban Bí thư Trung ương Đảng', type: 'Chỉ thị', date: '09/12/2003' },
    { code: 'Kết luận số 80-KL/TW', title: 'Kết luận về tiếp tục thực hiện Chỉ thị số 32-CT/TW về công tác phổ biến, giáo dục pháp luật', agency: 'Ban Bí thư Trung ương Đảng', type: 'Kết luận', date: '20/06/2020' },
    { code: 'Nghị định số 15/2014/NĐ-CP', title: 'Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Hòa giải ở cơ sở', agency: 'Chính phủ', type: 'Nghị định', date: '27/02/2014' },
    { code: 'Quyết định số 25/2021/QĐ-TTg', title: 'Quyết định quy định về xã, phường, thị trấn đạt chuẩn tiếp cận pháp luật', agency: 'Thủ tướng Chính phủ', type: 'Quyết định', date: '22/07/2021' }
];

const LOCAL_DISSEMINATION_DOC_TEMPLATES = [
    { type: 'Kế hoạch', t: (p) => `Kế hoạch công tác phổ biến, giáo dục pháp luật; hòa giải ở cơ sở; xây dựng cấp xã đạt chuẩn tiếp cận pháp luật năm 2026 trên địa bàn ${p.name}`, a: (p) => p.ubnd },
    { type: 'Kế hoạch', t: (p) => `Kế hoạch tổ chức Ngày Pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam năm 2026`, a: (p) => p.ubnd },
    { type: 'Quyết định', t: (p) => `Quyết định kiện toàn ${p.council}`, a: (p) => p.ubnd },
    { type: 'Hướng dẫn', t: () => 'Hướng dẫn đánh giá, công nhận cấp xã đạt chuẩn tiếp cận pháp luật năm 2026', a: (p) => p.stp },
    { type: 'Hướng dẫn', t: () => 'Hướng dẫn tổ chức hoạt động hòa giải ở cơ sở và thực hiện chi hỗ trợ hòa giải viên', a: (p) => p.stp },
    { type: 'Kế hoạch', t: () => 'Kế hoạch bồi dưỡng, cập nhật kiến thức pháp luật cho đội ngũ báo cáo viên, tuyên truyền viên và hòa giải viên', a: (p) => p.stp },
    { type: 'Kế hoạch', t: (p) => `Kế hoạch tổ chức cuộc thi tìm hiểu pháp luật trực tuyến trên ${p.siteName}`, a: (p) => p.stp },
    { type: 'Báo cáo', t: (p) => `Báo cáo tổng kết công tác phổ biến, giáo dục pháp luật năm 2025 của ${p.council}`, a: (p) => p.council },
    { type: 'Công văn', t: (p, i) => `Tăng cường tuyên truyền pháp luật về ${pick(p.hotTopics, i)}`, a: (p) => p.stp },
    { type: 'Công văn', t: (p, i) => `Đẩy mạnh chuyển đổi số trong phổ biến, giáo dục pháp luật cho ${pick(p.focusGroups, i)}`, a: (p) => p.stp }
];

const SITUATIONS = [
    { category: 'Đất đai', q: 'Thủ tục cấp Giấy chứng nhận quyền sử dụng đất lần đầu cần chuẩn bị những giấy tờ gì?', a: 'Người sử dụng đất chuẩn bị đơn đăng ký đất đai, tài sản gắn liền với đất theo mẫu; giấy tờ về quyền sử dụng đất (nếu có); giấy tờ về tài sản gắn liền với đất; chứng từ thực hiện nghĩa vụ tài chính (nếu có). Hồ sơ nộp tại Bộ phận Một cửa cấp xã hoặc Văn phòng đăng ký đất đai.', basis: 'Luật Đất đai năm 2024' },
    { category: 'Đất đai', q: 'Đất sử dụng ổn định nhưng không có giấy tờ có được cấp Giấy chứng nhận không?', a: 'Có thể được xem xét cấp Giấy chứng nhận nếu đất được sử dụng ổn định, không vi phạm pháp luật về đất đai, không có tranh chấp, phù hợp quy hoạch và được UBND cấp xã xác nhận. Người sử dụng đất phải thực hiện nghĩa vụ tài chính theo quy định (nếu có).', basis: 'Luật Đất đai năm 2024' },
    { category: 'Đất đai', q: 'Tranh chấp đất đai có bắt buộc phải hòa giải tại UBND cấp xã trước khi khởi kiện không?', a: 'Nhà nước khuyến khích các bên tự hòa giải hoặc hòa giải ở cơ sở. Đối với tranh chấp về việc ai là người có quyền sử dụng đất, hòa giải tại UBND cấp xã là thủ tục bắt buộc trước khi khởi kiện tại Tòa án.', basis: 'Luật Đất đai năm 2024' },
    { category: 'Hôn nhân & gia đình', q: 'Độ tuổi kết hôn theo quy định là bao nhiêu? Tảo hôn bị xử lý như thế nào?', a: 'Nam từ đủ 20 tuổi, nữ từ đủ 18 tuổi mới được kết hôn. Tảo hôn (lấy vợ, lấy chồng khi một bên chưa đủ tuổi kết hôn) bị nghiêm cấm; người vi phạm có thể bị xử phạt vi phạm hành chính, trường hợp tổ chức tảo hôn đã bị xử phạt mà còn vi phạm có thể bị truy cứu trách nhiệm hình sự.', basis: 'Luật Hôn nhân và gia đình năm 2014; Bộ luật Hình sự năm 2015' },
    { category: 'Hôn nhân & gia đình', q: 'Pháp luật có cấm kết hôn giữa những người có họ hàng gần không?', a: 'Có. Pháp luật cấm kết hôn giữa những người cùng dòng máu về trực hệ và giữa những người có họ trong phạm vi ba đời. Hôn nhân cận huyết thống ảnh hưởng nghiêm trọng đến sức khỏe thế hệ sau.', basis: 'Luật Hôn nhân và gia đình năm 2014' },
    { category: 'Hôn nhân & gia đình', q: 'Ly hôn đơn phương cần chuẩn bị hồ sơ gì và nộp ở đâu?', a: 'Hồ sơ gồm đơn khởi kiện ly hôn, bản chính Giấy chứng nhận kết hôn, giấy tờ tùy thân, giấy khai sinh của con chung (nếu có) và giấy tờ về tài sản chung (nếu có yêu cầu chia). Hồ sơ nộp tại Tòa án nhân dân khu vực nơi bị đơn cư trú, làm việc.', basis: 'Bộ luật Tố tụng dân sự năm 2015' },
    { category: 'Hộ tịch & căn cước', q: 'Cha mẹ chưa đăng ký kết hôn thì đăng ký khai sinh cho con như thế nào?', a: 'Con vẫn được đăng ký khai sinh bình thường. Nếu cha có yêu cầu nhận con thì UBND cấp xã kết hợp giải quyết đăng ký khai sinh và nhận cha, con. Người dân có thể nộp hồ sơ trực tuyến trên Cổng Dịch vụ công.', basis: 'Luật Hộ tịch năm 2014' },
    { category: 'Hộ tịch & căn cước', q: 'Trẻ em dưới 14 tuổi có được cấp thẻ căn cước không?', a: 'Có. Công dân Việt Nam dưới 14 tuổi được cấp thẻ căn cước theo nhu cầu. Người đại diện hợp pháp thực hiện thủ tục cho trẻ; đối với trẻ dưới 6 tuổi có thể thực hiện qua Cổng Dịch vụ công hoặc ứng dụng định danh quốc gia.', basis: 'Luật Căn cước năm 2023' },
    { category: 'Hộ tịch & căn cước', q: 'Đăng ký kết hôn thực hiện ở đâu, có làm trực tuyến được không?', a: 'Hai bên đăng ký kết hôn tại UBND cấp xã nơi cư trú của một trong hai bên. Hồ sơ có thể nộp trực tuyến, sau đó hai bên có mặt để ký và nhận Giấy chứng nhận kết hôn.', basis: 'Luật Hộ tịch năm 2014' },
    { category: 'Dân sự & thừa kế', q: 'Người mất không để lại di chúc thì di sản được chia như thế nào?', a: 'Di sản được chia theo pháp luật theo thứ tự hàng thừa kế. Hàng thừa kế thứ nhất gồm vợ, chồng, cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi, con đẻ, con nuôi của người chết; những người cùng hàng được hưởng phần di sản bằng nhau.', basis: 'Bộ luật Dân sự năm 2015' },
    { category: 'Dân sự & thừa kế', q: 'Di chúc miệng có giá trị pháp lý không?', a: 'Di chúc miệng chỉ được lập khi tính mạng một người bị cái chết đe dọa và không thể lập di chúc bằng văn bản; phải có ít nhất hai người làm chứng, được ghi chép lại và công chứng hoặc chứng thực trong thời hạn 05 ngày làm việc. Sau 03 tháng mà người lập di chúc còn sống, minh mẫn thì di chúc miệng bị hủy bỏ.', basis: 'Bộ luật Dân sự năm 2015' },
    { category: 'Dân sự & thừa kế', q: 'Cho vay tiền không viết giấy thì làm sao đòi lại?', a: 'Hợp đồng vay có thể giao kết bằng lời nói. Người cho vay cần thu thập chứng cứ như tin nhắn, lịch sử chuyển khoản, người làm chứng; có thể đề nghị hòa giải ở cơ sở hoặc khởi kiện tại Tòa án để đòi lại tài sản.', basis: 'Bộ luật Dân sự năm 2015' },
    { category: 'Lao động', q: 'Người lao động có bắt buộc phải ký hợp đồng lao động bằng văn bản không?', a: 'Hợp đồng lao động phải được giao kết bằng văn bản (hoặc phương tiện điện tử dưới hình thức thông điệp dữ liệu), trừ trường hợp hợp đồng có thời hạn dưới 01 tháng được giao kết bằng lời nói theo quy định.', basis: 'Bộ luật Lao động năm 2019' },
    { category: 'Lao động', q: 'Người lao động muốn nghỉ việc phải báo trước bao nhiêu ngày?', a: 'Ít nhất 45 ngày với hợp đồng không xác định thời hạn; ít nhất 30 ngày với hợp đồng xác định thời hạn từ 12 đến 36 tháng; ít nhất 03 ngày làm việc với hợp đồng dưới 12 tháng. Một số trường hợp đặc biệt được nghỉ không cần báo trước.', basis: 'Bộ luật Lao động năm 2019' },
    { category: 'Lao động', q: 'Doanh nghiệp chậm đóng bảo hiểm xã hội, người lao động cần làm gì?', a: 'Người lao động kiểm tra quá trình đóng bảo hiểm trên ứng dụng của cơ quan bảo hiểm xã hội, đề nghị người sử dụng lao động thực hiện nghĩa vụ; nếu không được giải quyết có thể gửi đơn đến cơ quan bảo hiểm xã hội, thanh tra lao động hoặc tổ chức công đoàn.', basis: 'Luật Bảo hiểm xã hội năm 2024' },
    { category: 'Giao thông', q: 'Điều khiển xe mô tô sau khi uống rượu, bia bị xử lý như thế nào?', a: 'Pháp luật nghiêm cấm điều khiển phương tiện khi trong máu hoặc hơi thở có nồng độ cồn. Người vi phạm bị phạt tiền, trừ điểm giấy phép lái xe và có thể bị tạm giữ phương tiện theo quy định xử phạt vi phạm hành chính về trật tự, an toàn giao thông đường bộ.', basis: 'Luật Trật tự, an toàn giao thông đường bộ năm 2024' },
    { category: 'Giao thông', q: 'Học sinh chưa đủ 18 tuổi có được điều khiển xe máy không?', a: 'Người từ đủ 16 tuổi được điều khiển xe gắn máy (dung tích xi-lanh đến 50 cm³ hoặc động cơ điện có công suất tương đương). Người từ đủ 18 tuổi mới được cấp giấy phép lái xe hạng A1 để điều khiển xe mô tô.', basis: 'Luật Trật tự, an toàn giao thông đường bộ năm 2024' },
    { category: 'Phòng, chống tội phạm', q: 'Làm sao nhận biết thủ đoạn mua bán người và cần báo tin ở đâu?', a: 'Đối tượng thường hứa hẹn việc nhẹ lương cao, môi giới hôn nhân, rủ đi làm thuê ở nơi xa hoặc nước ngoài rồi cắt đứt liên lạc với gia đình. Khi nghi ngờ, người dân báo ngay cho Công an cấp xã, Bộ đội Biên phòng hoặc gọi 113.', basis: 'Luật Phòng, chống mua bán người năm 2024' },
    { category: 'Phòng, chống tội phạm', q: 'Nhận cuộc gọi giả danh công an yêu cầu chuyển tiền thì xử lý thế nào?', a: 'Cơ quan công an không làm việc qua điện thoại và không yêu cầu người dân chuyển tiền hay cung cấp mã OTP. Người dân cần ngắt liên lạc, không cung cấp thông tin và trình báo cơ quan công an gần nhất; hành vi này có thể bị xử lý về tội lừa đảo chiếm đoạt tài sản.', basis: 'Bộ luật Hình sự năm 2015' },
    { category: 'Môi trường & rừng', q: 'Hộ gia đình có được khai thác gỗ rừng trồng do mình đầu tư không?', a: 'Chủ rừng được khai thác rừng trồng do mình tự đầu tư, nhưng phải tuân thủ quy định về khai thác, hồ sơ nguồn gốc lâm sản. Hành vi phá rừng, khai thác rừng tự nhiên trái phép bị xử lý nghiêm theo quy định.', basis: 'Luật Lâm nghiệp năm 2017' },
    { category: 'Môi trường & rừng', q: 'Vứt rác, đốt rác thải bừa bãi có bị xử phạt không?', a: 'Có. Hành vi vứt, thải, đốt chất thải không đúng nơi quy định bị xử phạt vi phạm hành chính trong lĩnh vực bảo vệ môi trường. Hộ gia đình, cá nhân có trách nhiệm phân loại chất thải rắn sinh hoạt tại nguồn.', basis: 'Luật Bảo vệ môi trường năm 2020' },
    { category: 'Thông tin & mạng xã hội', q: 'Chia sẻ thông tin sai sự thật trên mạng xã hội bị xử lý ra sao?', a: 'Hành vi đưa, chia sẻ thông tin sai sự thật, xúc phạm danh dự, nhân phẩm người khác có thể bị xử phạt vi phạm hành chính; trường hợp nghiêm trọng có thể bị truy cứu trách nhiệm hình sự. Người dùng cần kiểm chứng nguồn tin trước khi chia sẻ.', basis: 'Luật An ninh mạng năm 2018' },
    { category: 'Thông tin & mạng xã hội', q: 'Đăng ảnh người khác lên mạng xã hội có cần xin phép không?', a: 'Việc sử dụng hình ảnh của cá nhân phải được người đó đồng ý (trừ một số trường hợp vì lợi ích công cộng hoặc hoạt động công cộng không làm tổn hại danh dự). Người có hình ảnh bị sử dụng trái phép có quyền yêu cầu gỡ bỏ, bồi thường.', basis: 'Bộ luật Dân sự năm 2015' },
    { category: 'Hộ tịch & căn cước', q: 'Chứng thực bản sao từ bản chính có thể làm ở đâu?', a: 'Người dân có thể chứng thực bản sao từ bản chính tại UBND cấp xã hoặc tổ chức hành nghề công chứng. Nhiều thủ tục hiện chấp nhận bản sao điện tử, dữ liệu đã được kết nối, người dân không phải nộp bản sao giấy.', basis: 'Nghị định về cấp bản sao từ sổ gốc, chứng thực bản sao' }
];

const LIBRARY_TYPES = [
    { type: 'Sách hỏi đáp', format: 'PDF', size: (i) => `${60 + (i * 13) % 120} trang` },
    { type: 'Cẩm nang', format: 'PDF', size: (i) => `${40 + (i * 11) % 80} trang` },
    { type: 'Tờ gấp', format: 'PDF', size: () => '2 trang' },
    { type: 'Infographic', format: 'PNG', size: () => '1 trang' },
    { type: 'Video', format: 'MP4', size: (i) => `${3 + (i % 9)} phút` },
    { type: 'Podcast', format: 'MP3', size: (i) => `${8 + (i % 15)} phút` }
];
const LIBRARY_TOPICS = ['Hôn nhân & gia đình', 'Đất đai', 'Lao động', 'Giao thông', 'Phòng, chống tội phạm', 'Môi trường & rừng', 'Hộ tịch & căn cước', 'Dân sự & thừa kế', 'Thông tin & mạng xã hội'];

const MEDIATION_TEMPLATES = [
    { field: 'Đất đai - ranh giới', t: (l) => `Hòa giải thành tranh chấp ranh giới đất vườn giữa hai hộ gia đình tại ${l}` },
    { field: 'Hôn nhân & gia đình', t: (l) => `Tổ hòa giải giúp vợ chồng trẻ ở ${l} hàn gắn, rút đơn ly hôn` },
    { field: 'Thừa kế', t: (l) => `Giải quyết êm thấm bất đồng phân chia di sản thừa kế nhà đất tại ${l}` },
    { field: 'Ngõ đi chung', t: (l) => `Thống nhất mở rộng ngõ đi chung sau buổi hòa giải tại ${l}` },
    { field: 'Trật tự cộng đồng', t: (l) => `Hòa giải mâu thuẫn do gia súc phá hoại hoa màu giữa các hộ tại ${l}` },
    { field: 'Hợp đồng dân sự', t: (l) => `Hòa giải tranh chấp tiền công xây dựng nhà ở giữa chủ nhà và thợ tại ${l}` },
    { field: 'Nước sinh hoạt - thủy lợi', t: (l) => `Thống nhất phương án chia nước tưới tiêu mùa khô giữa các hộ tại ${l}` },
    { field: 'Hôn nhân & gia đình', t: (l) => `Tổ hòa giải can thiệp kịp thời vụ việc có nguy cơ bạo lực gia đình tại ${l}` }
];
const MEDIATION_RESULTS = ['Hòa giải thành', 'Hòa giải thành', 'Hòa giải thành', 'Hòa giải không thành', 'Đang hòa giải'];

export const buildLawDissemination = (p) => {
    const news = Array.from({ length: 24 }, (_, i) => {
        const tpl = NEWS_TEMPLATES[i % NEWS_TEMPLATES.length];
        const l = locOf(p, roundLoc(i, NEWS_TEMPLATES.length, 1));
        return {
            id: `news-${i + 1}`, title: tpl.t(p, l, i), summary: tpl.s(p, l, i), category: tpl.cat,
            locality: cap(l), date: dateAt(i, 4), views: 480 + ((i * 373) % 4200), image: pick(['/thumb1.png', '/thumb2.png', '/thumb3.png'], i)
        };
    });

    const localDocs = [
        ...LOCAL_DISSEMINATION_DOC_TEMPLATES.map((tpl, i) => ({
            code: `${tpl.type === 'Quyết định' ? 'Quyết định' : tpl.type === 'Công văn' ? 'Công văn' : tpl.type} số ${18 + i * 7}/${tpl.type === 'Quyết định' ? 'QĐ-UBND' : tpl.type === 'Kế hoạch' ? 'KH-UBND' : tpl.type === 'Báo cáo' ? 'BC-HĐPH' : 'STP-PBGDPL'}`,
            title: tpl.t(p, i), agency: tpl.a(p), type: tpl.type, date: dateAt(i * 2 + 1, 9)
        })),
        ...p.localDocs.map((d, i) => ({ ...d, date: dateAt(i * 5 + 2, 7) }))
    ];
    const docs = [
        ...localDocs.map((d, i) => ({ ...d, id: `doc-l-${i}`, level: 'Địa phương', size: `${(0.3 + (i * 0.37) % 2.4).toFixed(1)} MB` })),
        ...NATIONAL_DISSEMINATION_DOCS.map((d, i) => ({ ...d, id: `doc-n-${i}`, level: 'Trung ương', size: `${(0.6 + (i * 0.53) % 3).toFixed(1)} MB` }))
    ];

    const situations = SITUATIONS.map((s, i) => ({ ...s, id: `sit-${i + 1}`, title: s.q, date: dateAt(i, 6), views: 900 + ((i * 617) % 8000) }));

    const library = Array.from({ length: 27 }, (_, i) => {
        const tp = LIBRARY_TYPES[i % LIBRARY_TYPES.length];
        const topic = LIBRARY_TOPICS[(i * 2) % LIBRARY_TOPICS.length];
        const lang = pick(p.publicationLanguages, i);
        return {
            id: `lib-${i + 1}`, type: tp.type, format: tp.format, size: tp.size(i), topic, language: lang,
            title: `${tp.type} pháp luật về ${topic.toLowerCase()}${lang !== 'Tiếng Việt' ? ` (${lang})` : ''}${i >= LIBRARY_TYPES.length * 1.5 ? ` - tập ${Math.floor(i / 9) + 1}` : ''}`,
            publisher: i % 3 === 0 ? 'Bộ Tư pháp' : p.stp, date: dateAt(i, 8), views: 300 + ((i * 431) % 6000), downloads: 60 + ((i * 197) % 1800)
        };
    });

    const mediation = Array.from({ length: 22 }, (_, i) => {
        const tpl = MEDIATION_TEMPLATES[i % MEDIATION_TEMPLATES.length];
        const l = pick(p.localities, roundLoc(i, MEDIATION_TEMPLATES.length, 2));
        const loc = `${l.type} ${l.name}`;
        return {
            id: `med-${i + 1}`, title: tpl.t(loc), field: tpl.field, locality: cap(loc),
            team: `Tổ hòa giải ${l.type === 'phường' ? 'tổ dân phố' : 'thôn'} số ${1 + (i * 3) % 12}, ${loc}`,
            result: pick(MEDIATION_RESULTS, i), date: dateAt(i, 5)
        };
    });

    return { news, docs, situations, library, mediation };
};

/* ================================================================== */
/*  TRỢ GIÚP PHÁP LÝ                                                  */
/* ================================================================== */

// Diện người được trợ giúp pháp lý (tóm lược theo Luật Trợ giúp pháp lý năm 2017)
const BENEFICIARIES = [
    { group: 'Người có công với cách mạng', condition: 'Không phụ thuộc điều kiện tài chính', proof: 'Giấy tờ chứng minh là người có công với cách mạng' },
    { group: 'Người thuộc hộ nghèo', condition: 'Không phụ thuộc điều kiện tài chính', proof: 'Giấy chứng nhận hộ nghèo hoặc quyết định công nhận hộ nghèo' },
    { group: 'Trẻ em', condition: 'Không phụ thuộc điều kiện tài chính', proof: 'Giấy khai sinh, thẻ căn cước hoặc giấy tờ chứng minh độ tuổi' },
    { group: 'Người dân tộc thiểu số cư trú ở vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn', condition: 'Không phụ thuộc điều kiện tài chính', proof: 'Giấy tờ chứng minh dân tộc và nơi cư trú' },
    { group: 'Người bị buộc tội từ đủ 16 tuổi đến dưới 18 tuổi', condition: 'Không phụ thuộc điều kiện tài chính', proof: 'Giấy tờ chứng minh độ tuổi, tư cách người bị buộc tội' },
    { group: 'Người bị buộc tội thuộc hộ cận nghèo', condition: 'Không phụ thuộc điều kiện tài chính', proof: 'Giấy chứng nhận hộ cận nghèo' },
    { group: 'Cha đẻ, mẹ đẻ, vợ, chồng, con của liệt sĩ và người có công nuôi dưỡng liệt sĩ', condition: 'Có khó khăn về tài chính', proof: 'Giấy tờ chứng minh quan hệ và giấy tờ chứng minh khó khăn tài chính' },
    { group: 'Người nhiễm chất độc da cam', condition: 'Có khó khăn về tài chính', proof: 'Quyết định trợ cấp, giấy tờ chứng minh khó khăn tài chính' },
    { group: 'Người cao tuổi', condition: 'Có khó khăn về tài chính', proof: 'Giấy tờ chứng minh độ tuổi và khó khăn tài chính' },
    { group: 'Người khuyết tật', condition: 'Có khó khăn về tài chính', proof: 'Giấy xác nhận khuyết tật và giấy tờ chứng minh khó khăn tài chính' },
    { group: 'Người từ đủ 16 tuổi đến dưới 18 tuổi là bị hại trong vụ án hình sự', condition: 'Có khó khăn về tài chính', proof: 'Giấy tờ chứng minh độ tuổi, tư cách bị hại' },
    { group: 'Nạn nhân trong vụ việc bạo lực gia đình', condition: 'Có khó khăn về tài chính', proof: 'Giấy tờ chứng minh là nạn nhân bạo lực gia đình' },
    { group: 'Nạn nhân của hành vi mua bán người', condition: 'Có khó khăn về tài chính', proof: 'Giấy tờ xác nhận là nạn nhân theo quy định' },
    { group: 'Người nhiễm HIV', condition: 'Có khó khăn về tài chính', proof: 'Giấy tờ chứng minh tình trạng và khó khăn tài chính' }
];

const AID_FORMS = [
    { name: 'Tham gia tố tụng', desc: 'Bào chữa cho người bị buộc tội; bảo vệ quyền, lợi ích hợp pháp của bị hại, đương sự trong vụ án hình sự, dân sự, hành chính.' },
    { name: 'Tư vấn pháp luật', desc: 'Giải đáp, hướng dẫn, đưa ra ý kiến và giúp soạn thảo văn bản, đơn từ liên quan đến vụ việc của người được trợ giúp.' },
    { name: 'Đại diện ngoài tố tụng', desc: 'Đại diện cho người được trợ giúp làm việc với cơ quan, tổ chức, cá nhân để bảo vệ quyền, lợi ích hợp pháp ngoài quá trình tố tụng.' }
];

const AID_STEPS = [
    { title: 'Nộp yêu cầu', desc: 'Nộp đơn yêu cầu TGPL kèm giấy tờ chứng minh thuộc diện được trợ giúp: trực tiếp, qua bưu chính, điện thoại hoặc trực tuyến trên Cổng.', time: 'Ngay khi có nhu cầu' },
    { title: 'Tiếp nhận & kiểm tra', desc: 'Tổ chức thực hiện TGPL kiểm tra hồ sơ, hướng dẫn bổ sung nếu thiếu; vụ việc cấp thiết được thụ lý ngay.', time: 'Trong ngày làm việc' },
    { title: 'Thụ lý & phân công', desc: 'Thụ lý vụ việc và cử Trợ giúp viên pháp lý hoặc luật sư ký hợp đồng thực hiện.', time: 'Không quá 03 ngày làm việc' },
    { title: 'Thực hiện TGPL', desc: 'Người thực hiện gặp gỡ, nghiên cứu hồ sơ, thu thập tài liệu và tham gia tố tụng, tư vấn hoặc đại diện ngoài tố tụng.', time: 'Theo tiến độ vụ việc' },
    { title: 'Kết thúc & đánh giá', desc: 'Kết thúc vụ việc, trả lại giấy tờ, đánh giá chất lượng và lấy ý kiến hài lòng của người được trợ giúp.', time: 'Sau khi hoàn thành' }
];

const AID_PROCEDURES = [
    { name: 'Thủ tục yêu cầu trợ giúp pháp lý', level: 'Cấp tỉnh', time: 'Thụ lý ngay khi hồ sơ đầy đủ', docs: ['Đơn yêu cầu trợ giúp pháp lý', 'Giấy tờ chứng minh thuộc diện người được TGPL', 'Các giấy tờ, tài liệu liên quan đến vụ việc'] },
    { name: 'Thủ tục rút yêu cầu trợ giúp pháp lý', level: 'Cấp tỉnh', time: 'Trong ngày làm việc', docs: ['Văn bản rút yêu cầu trợ giúp pháp lý'] },
    { name: 'Thủ tục thay đổi người thực hiện trợ giúp pháp lý', level: 'Cấp tỉnh', time: '03 ngày làm việc', docs: ['Đơn đề nghị thay đổi người thực hiện TGPL', 'Tài liệu liên quan (nếu có)'] },
    { name: 'Thủ tục giải quyết khiếu nại về trợ giúp pháp lý', level: 'Cấp tỉnh', time: 'Theo quy định của pháp luật về khiếu nại', docs: ['Đơn khiếu nại', 'Tài liệu, chứng cứ liên quan'] },
    { name: 'Thủ tục đăng ký tham gia trợ giúp pháp lý của tổ chức hành nghề luật sư', level: 'Cấp tỉnh', time: '05 ngày làm việc', docs: ['Văn bản đăng ký tham gia TGPL', 'Giấy đăng ký hoạt động', 'Danh sách luật sư tham gia'] },
    { name: 'Thủ tục lựa chọn, ký hợp đồng với tổ chức hành nghề luật sư', level: 'Cấp tỉnh', time: 'Theo thông báo lựa chọn', docs: ['Hồ sơ tham gia lựa chọn', 'Giấy đăng ký hoạt động', 'Danh sách luật sư dự kiến thực hiện'] },
    { name: 'Thủ tục cấp thẻ cộng tác viên trợ giúp pháp lý', level: 'Cấp tỉnh', time: '05 ngày làm việc', docs: ['Đơn đề nghị làm cộng tác viên', 'Sơ yếu lý lịch', 'Bản sao văn bằng chuyên môn', 'Ảnh chân dung'] },
    { name: 'Thủ tục cấp lại thẻ cộng tác viên trợ giúp pháp lý', level: 'Cấp tỉnh', time: '03 ngày làm việc', docs: ['Đơn đề nghị cấp lại thẻ', 'Thẻ cũ (nếu bị hỏng)', 'Ảnh chân dung'] }
];

const CASE_TEMPLATES = [
    { field: 'Hình sự', form: 'Tham gia tố tụng', t: (l) => `Bào chữa cho người chưa thành niên bị buộc tội trộm cắp tài sản tại ${l}` },
    { field: 'Đất đai', form: 'Đại diện ngoài tố tụng', t: (l) => `Đại diện hộ nghèo làm việc với cơ quan chức năng về bồi thường khi thu hồi đất tại ${l}` },
    { field: 'Hôn nhân & gia đình', form: 'Tham gia tố tụng', t: (l) => `Bảo vệ quyền nuôi con cho phụ nữ là nạn nhân bạo lực gia đình ở ${l}` },
    { field: 'Lao động', form: 'Tư vấn pháp luật', t: (l) => `Tư vấn cho người lao động khuyết tật đòi tiền lương, bảo hiểm xã hội bị nợ tại ${l}` },
    { field: 'Dân sự', form: 'Tham gia tố tụng', t: (l) => `Bảo vệ quyền lợi người cao tuổi trong tranh chấp hợp đồng tặng cho nhà đất tại ${l}` },
    { field: 'Hình sự', form: 'Tham gia tố tụng', t: (l) => `Bảo vệ quyền lợi hợp pháp cho bị hại là trẻ em trong vụ án xâm hại tại ${l}` },
    { field: 'Hành chính', form: 'Đại diện ngoài tố tụng', t: (l) => `Hỗ trợ người có công hoàn thiện hồ sơ hưởng chế độ ưu đãi tại ${l}` },
    { field: 'Dân sự', form: 'Tư vấn pháp luật', t: (l) => `Tư vấn phân chia di sản thừa kế cho người dân tộc thiểu số tại ${l}` }
];
const CASE_RESULTS = ['Thành công', 'Thành công', 'Thành công một phần', 'Đang thực hiện'];
const LAW_FIRM_NAMES = ['Công ty Luật TNHH Công Minh', 'Văn phòng Luật sư Chính Nghĩa', 'Công ty Luật Hợp danh An Phát', 'Văn phòng Luật sư Tâm Đức', 'Công ty Luật TNHH Bảo Tín', 'Văn phòng Luật sư Trung Thực', 'Công ty Luật TNHH Hòa Bình', 'Văn phòng Luật sư Đại Việt'];
const AID_FIELDS = ['Hình sự', 'Dân sự', 'Đất đai', 'Hôn nhân & gia đình', 'Lao động', 'Hành chính'];

export const buildLegalAid = (p) => {
    const beneficiaries = BENEFICIARIES.map((b, i) => ({ ...b, id: `ben-${i + 1}` }));

    const branchLocs = [0, 3, 6, 9, 12].map((i) => pick(p.localities, i));
    const network = [
        { kind: 'Trung tâm', name: p.center, area: `Toàn ${p.name}`, address: p.centerAddress, phone: phoneOf(p, 0), fields: AID_FIELDS },
        ...branchLocs.map((l, i) => ({ kind: 'Chi nhánh', name: `Chi nhánh Trợ giúp pháp lý số ${i + 1}`, area: `Cụm ${l.type} ${l.name} và vùng lân cận`, address: `Trụ sở UBND ${l.type} ${l.name}`, phone: phoneOf(p, i + 1), fields: AID_FIELDS.slice(0, 4) })),
        ...LAW_FIRM_NAMES.map((n, i) => ({ kind: 'Tổ chức ký hợp đồng', name: n, area: cap(locOf(p, i * 2 + 1)), address: `Số ${12 + i * 9}, ${locOf(p, i * 2 + 1)}`, phone: phoneOf(p, i + 10), fields: [pick(AID_FIELDS, i), pick(AID_FIELDS, i + 2)] })),
        ...Array.from({ length: 16 }, (_, i) => {
            const kind = pick(['Trợ giúp viên pháp lý', 'Luật sư', 'Cộng tác viên'], i);
            return { kind, name: `${kind === 'Luật sư' ? 'LS.' : kind === 'Trợ giúp viên pháp lý' ? 'TGV.' : 'CTV.'} ${personOf(i)}`, area: cap(locOf(p, i * 3)), address: kind === 'Luật sư' ? pick(LAW_FIRM_NAMES, i) : p.center, phone: phoneOf(p, i + 20), fields: [pick(AID_FIELDS, i), pick(AID_FIELDS, i + 3)] };
        })
    ].map((n, i) => ({ ...n, id: `net-${i + 1}` }));

    const cases = Array.from({ length: 20 }, (_, i) => {
        const tpl = CASE_TEMPLATES[i % CASE_TEMPLATES.length];
        const l = locOf(p, roundLoc(i, CASE_TEMPLATES.length, 1));
        return { id: `case-${i + 1}`, title: tpl.t(l), field: tpl.field, form: tpl.form, locality: cap(l), beneficiary: pick(BENEFICIARIES, i * 3).group, result: pick(CASE_RESULTS, i), date: dateAt(i, 7), executor: `${pick(['TGV.', 'LS.'], i)} ${personOf(i + 4)}` };
    });

    const procedures = AID_PROCEDURES.map((x, i) => ({ ...x, id: `proc-${i + 1}`, agency: p.center, fee: 'Miễn phí' }));

    return { beneficiaries, forms: AID_FORMS, steps: AID_STEPS, procedures, network, cases, fields: AID_FIELDS };
};

/* ================================================================== */
/*  HỖ TRỢ PHÁP LÝ DOANH NGHIỆP                                         */
/* ================================================================== */

const NATIONAL_POLICIES = [
    { title: 'Hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa', basis: 'Nghị định số 55/2019/NĐ-CP', field: 'Pháp lý & tư vấn', target: 'DN nhỏ và vừa', desc: 'Cung cấp thông tin pháp luật, giải đáp vướng mắc, đào tạo pháp luật và hỗ trợ một phần chi phí tư vấn pháp luật cho doanh nghiệp nhỏ và vừa.' },
    { title: 'Chính sách hỗ trợ doanh nghiệp nhỏ và vừa', basis: 'Luật Hỗ trợ doanh nghiệp nhỏ và vừa số 04/2017/QH14', field: 'Tài chính & tín dụng', target: 'DN nhỏ và vừa', desc: 'Hỗ trợ tiếp cận tín dụng, thuế, mặt bằng sản xuất, công nghệ, mở rộng thị trường và phát triển nguồn nhân lực.' },
    { title: 'Hỗ trợ hộ kinh doanh chuyển đổi thành doanh nghiệp', basis: 'Luật Hỗ trợ doanh nghiệp nhỏ và vừa; Nghị định số 80/2021/NĐ-CP', field: 'Thành lập & chuyển đổi', target: 'Hộ kinh doanh', desc: 'Hướng dẫn thủ tục thành lập doanh nghiệp, miễn lệ phí đăng ký lần đầu và tư vấn về kế toán, thuế trong giai đoạn đầu chuyển đổi.' },
    { title: 'Phát triển kinh tế tư nhân', basis: 'Nghị quyết số 68-NQ/TW của Bộ Chính trị', field: 'Pháp lý & tư vấn', target: 'Mọi loại hình DN tư nhân', desc: 'Định hướng hoàn thiện thể chế, bảo vệ quyền tài sản, quyền kinh doanh và giảm chi phí tuân thủ cho khu vực kinh tế tư nhân.' },
    { title: 'Hỗ trợ doanh nghiệp khởi nghiệp sáng tạo', basis: 'Luật Hỗ trợ doanh nghiệp nhỏ và vừa; Nghị định số 80/2021/NĐ-CP', field: 'Đổi mới sáng tạo', target: 'DN khởi nghiệp sáng tạo', desc: 'Hỗ trợ tư vấn sở hữu trí tuệ, thử nghiệm, hoàn thiện sản phẩm, tham gia chương trình ươm tạo và kết nối đầu tư.' },
    { title: 'Ưu đãi và hỗ trợ đầu tư', basis: 'Luật Đầu tư năm 2020', field: 'Đầu tư & logistics', target: 'Nhà đầu tư', desc: 'Ưu đãi về thuế thu nhập doanh nghiệp, tiền thuê đất và thủ tục đối với dự án thuộc ngành, nghề hoặc địa bàn ưu đãi đầu tư.' },
    { title: 'Bảo hộ quyền sở hữu công nghiệp', basis: 'Luật Sở hữu trí tuệ (sửa đổi, bổ sung)', field: 'Đổi mới sáng tạo', target: 'Mọi loại hình DN', desc: 'Hướng dẫn đăng ký bảo hộ nhãn hiệu, kiểu dáng công nghiệp, sáng chế và xử lý hành vi xâm phạm quyền sở hữu trí tuệ.' }
];

const DOC_TYPES = [
    { type: 'Mẫu hợp đồng', format: 'DOCX' },
    { type: 'Sổ tay pháp lý', format: 'PDF' },
    { type: 'Hướng dẫn nghiệp vụ', format: 'PDF' },
    { type: 'Bộ câu hỏi tự kiểm tra', format: 'XLSX' }
];
const DOC_TOPICS = [
    { topic: 'Hợp đồng mua bán hàng hóa', field: 'Hợp đồng & thương mại' },
    { topic: 'Hợp đồng lao động và nội quy lao động', field: 'Lao động' },
    { topic: 'Hợp đồng thuê mặt bằng kinh doanh', field: 'Đất đai & mặt bằng' },
    { topic: 'Bảo vệ dữ liệu cá nhân khách hàng', field: 'Công nghệ & dữ liệu' },
    { topic: 'Đăng ký và bảo hộ nhãn hiệu', field: 'Sở hữu trí tuệ' },
    { topic: 'Hóa đơn điện tử và nghĩa vụ thuế', field: 'Thuế & kế toán' },
    { topic: 'Hợp đồng đại lý, phân phối', field: 'Hợp đồng & thương mại' },
    { topic: 'Thành lập và quản trị công ty', field: 'Doanh nghiệp & quản trị' },
    { topic: 'Giải quyết tranh chấp thương mại', field: 'Hợp đồng & thương mại' }
];

const BUSINESS_FAQS = [
    { field: 'Doanh nghiệp & quản trị', q: 'Thành lập doanh nghiệp trực tuyến thực hiện như thế nào?', a: 'Doanh nghiệp nộp hồ sơ đăng ký trên Cổng thông tin quốc gia về đăng ký doanh nghiệp, sử dụng chữ ký số hoặc tài khoản định danh điện tử. Cơ quan đăng ký kinh doanh xem xét và cấp Giấy chứng nhận trong thời hạn 03 ngày làm việc kể từ khi nhận hồ sơ hợp lệ.', basis: 'Luật Doanh nghiệp năm 2020' },
    { field: 'Doanh nghiệp & quản trị', q: 'Doanh nghiệp muốn tạm ngừng kinh doanh phải thông báo trước bao lâu?', a: 'Doanh nghiệp phải thông báo bằng văn bản cho cơ quan đăng ký kinh doanh chậm nhất 03 ngày làm việc trước ngày tạm ngừng kinh doanh hoặc tiếp tục kinh doanh trước thời hạn đã thông báo.', basis: 'Luật Doanh nghiệp năm 2020' },
    { field: 'Doanh nghiệp & quản trị', q: 'Thành viên công ty TNHH hai thành viên trở lên muốn chuyển nhượng vốn góp cần lưu ý gì?', a: 'Thành viên phải chào bán phần vốn cho các thành viên còn lại theo tỷ lệ vốn góp trước. Chỉ khi các thành viên còn lại không mua hoặc không mua hết trong thời hạn 30 ngày thì mới được chuyển nhượng cho người không phải là thành viên với cùng điều kiện.', basis: 'Luật Doanh nghiệp năm 2020' },
    { field: 'Pháp lý & tư vấn', q: 'Doanh nghiệp nhỏ và vừa có được hỗ trợ chi phí thuê tư vấn pháp luật không?', a: 'Có. Doanh nghiệp nhỏ và vừa được hỗ trợ một phần chi phí tư vấn pháp luật cho vụ việc, vướng mắc theo mức và điều kiện quy định, ưu tiên doanh nghiệp siêu nhỏ, doanh nghiệp do phụ nữ làm chủ, doanh nghiệp sử dụng nhiều lao động nữ.', basis: 'Nghị định số 55/2019/NĐ-CP' },
    { field: 'Pháp lý & tư vấn', q: 'Doanh nghiệp gửi câu hỏi vướng mắc pháp luật đến cơ quan nào?', a: 'Doanh nghiệp có thể gửi yêu cầu qua biểu mẫu trực tuyến tại chuyên trang này, qua Sở Tư pháp hoặc cơ quan chuyên môn phụ trách lĩnh vực. Cơ quan tiếp nhận có trách nhiệm trả lời trong thời hạn quy định.', basis: 'Nghị định số 55/2019/NĐ-CP' },
    { field: 'Hợp đồng & thương mại', q: 'Hợp đồng thương mại nên có những điều khoản nào để hạn chế tranh chấp?', a: 'Cần quy định rõ chủ thể, đối tượng, số lượng, chất lượng, giá và phương thức thanh toán, thời hạn và địa điểm giao nhận, bảo hành, phạt vi phạm, bồi thường thiệt hại, bất khả kháng và cơ chế giải quyết tranh chấp.', basis: 'Luật Thương mại năm 2005; Bộ luật Dân sự năm 2015' },
    { field: 'Hợp đồng & thương mại', q: 'Mức phạt vi phạm hợp đồng thương mại tối đa là bao nhiêu?', a: 'Mức phạt vi phạm do các bên thỏa thuận trong hợp đồng nhưng không quá 8% giá trị phần nghĩa vụ hợp đồng bị vi phạm, trừ một số trường hợp đặc thù theo quy định.', basis: 'Luật Thương mại năm 2005' },
    { field: 'Hợp đồng & thương mại', q: 'Giải quyết tranh chấp bằng trọng tài thương mại có ưu điểm gì?', a: 'Thủ tục linh hoạt, bảo mật, các bên được lựa chọn trọng tài viên; phán quyết trọng tài là chung thẩm. Điều kiện là các bên phải có thỏa thuận trọng tài hợp lệ.', basis: 'Luật Trọng tài thương mại năm 2010' },
    { field: 'Sở hữu trí tuệ', q: 'Đăng ký nhãn hiệu cho sản phẩm thực hiện ở đâu, được bảo hộ bao lâu?', a: 'Doanh nghiệp nộp đơn đăng ký nhãn hiệu tại Cục Sở hữu trí tuệ (có thể nộp trực tuyến). Giấy chứng nhận đăng ký nhãn hiệu có hiệu lực 10 năm kể từ ngày nộp đơn và được gia hạn nhiều lần, mỗi lần 10 năm.', basis: 'Luật Sở hữu trí tuệ' },
    { field: 'Thuế & kế toán', q: 'Doanh nghiệp có bắt buộc sử dụng hóa đơn điện tử không?', a: 'Có. Doanh nghiệp khi bán hàng hóa, cung cấp dịch vụ phải sử dụng hóa đơn điện tử theo quy định về hóa đơn, chứng từ và pháp luật về quản lý thuế.', basis: 'Luật Quản lý thuế năm 2019' },
    { field: 'Công nghệ & dữ liệu', q: 'Doanh nghiệp thu thập dữ liệu cá nhân của khách hàng cần tuân thủ những gì?', a: 'Doanh nghiệp phải có sự đồng ý của chủ thể dữ liệu, thông báo mục đích xử lý, chỉ thu thập dữ liệu cần thiết, áp dụng biện pháp bảo vệ và thực hiện quyền của chủ thể dữ liệu như truy cập, chỉnh sửa, xóa dữ liệu.', basis: 'Pháp luật về bảo vệ dữ liệu cá nhân' },
    { field: 'Lao động', q: 'Thời gian thử việc tối đa theo quy định là bao lâu?', a: 'Không quá 180 ngày với người quản lý doanh nghiệp; 60 ngày với công việc cần trình độ cao đẳng trở lên; 30 ngày với trình độ trung cấp, công nhân kỹ thuật; 06 ngày làm việc với công việc khác. Không áp dụng thử việc với hợp đồng dưới 01 tháng.', basis: 'Bộ luật Lao động năm 2019' },
    { field: 'Lao động', q: 'Doanh nghiệp tuyển người lao động nước ngoài cần thủ tục gì?', a: 'Doanh nghiệp phải xác định nhu cầu sử dụng lao động nước ngoài và đề nghị cấp giấy phép lao động cho người lao động, trừ các trường hợp được miễn theo quy định.', basis: 'Bộ luật Lao động năm 2019' },
    { field: 'Đất đai & mặt bằng', q: 'Góp vốn bằng quyền sử dụng đất vào công ty thực hiện thế nào?', a: 'Các bên định giá tài sản góp vốn, lập hợp đồng góp vốn và thực hiện thủ tục chuyển quyền sử dụng đất sang công ty, đăng ký biến động đất đai tại Văn phòng đăng ký đất đai.', basis: 'Luật Doanh nghiệp năm 2020; Luật Đất đai năm 2024' },
    { field: 'Pháp lý & tư vấn', q: 'Khi bị thanh tra, kiểm tra, doanh nghiệp có những quyền gì?', a: 'Doanh nghiệp có quyền yêu cầu xuất trình quyết định thanh tra, kiểm tra; giải trình, cung cấp chứng cứ; khiếu nại, tố cáo hành vi trái pháp luật của người tiến hành thanh tra, kiểm tra.', basis: 'Luật Thanh tra năm 2022' }
];

const CONSULTANT_KINDS = ['Luật sư', 'Chuyên gia pháp lý', 'Tổ chức tư vấn', 'Trọng tài viên'];
const BUSINESS_FIELDS = ['Hợp đồng & thương mại', 'Doanh nghiệp & quản trị', 'Lao động', 'Thuế & kế toán', 'Sở hữu trí tuệ', 'Đất đai & mặt bằng', 'Công nghệ & dữ liệu'];

export const buildBusinessSupport = (p) => {
    const policies = [
        ...p.localPolicies.map((x, i) => ({ ...x, id: `pol-l-${i}`, level: 'Địa phương', date: dateAt(i * 3 + 1, 11) })),
        ...NATIONAL_POLICIES.map((x, i) => ({ ...x, id: `pol-n-${i}`, level: 'Trung ương', date: dateAt(i * 4 + 6, 13) }))
    ];

    const documents = Array.from({ length: 24 }, (_, i) => {
        const dt = DOC_TYPES[i % DOC_TYPES.length];
        const tp = DOC_TOPICS[(i * 5) % DOC_TOPICS.length];
        return {
            id: `bdoc-${i + 1}`, type: dt.type, format: dt.format, field: tp.field,
            title: `${dt.type}: ${tp.topic}`, publisher: i % 3 === 0 ? 'Bộ Tư pháp' : p.stp,
            size: `${(0.2 + (i * 0.41) % 3.2).toFixed(1)} MB`, downloads: 80 + ((i * 263) % 2600), date: dateAt(i, 9)
        };
    });

    const COMPANY_PREFIX = ['Công ty TNHH', 'Công ty Cổ phần', 'Hộ kinh doanh', 'Hợp tác xã'];
    const COMPANY_NAMES = ['Minh Phát', 'Hoàng Gia', 'An Khang', 'Thành Đạt', 'Việt Tiến', 'Phú Hưng', 'Tân Lộc', 'Hải Đăng'];
    const faqs = BUSINESS_FAQS.map((x, i) => ({
        ...x,
        id: `${i + 1}`,
        title: x.q,
        content: `${pick(COMPANY_PREFIX, i)} ${pick(COMPANY_NAMES, i * 3 + 1)} hoạt động tại ${locOf(p, i * 2 + 1)}, ${p.name}. ${x.q} Kính đề nghị cơ quan có thẩm quyền hướng dẫn cụ thể để doanh nghiệp thực hiện đúng quy định.`,
        author: `${pick(COMPANY_PREFIX, i)} ${pick(COMPANY_NAMES, i * 3 + 1)}`,
        status: 'Đã trả lời',
        agency: p.stp,
        date: dateAt(i, 8),
        views: 400 + ((i * 541) % 5000),
        likes: 12 + ((i * 37) % 180)
    }));

    const consultants = Array.from({ length: 20 }, (_, i) => {
        const kind = pick(CONSULTANT_KINDS, i);
        return {
            id: `cons-${i + 1}`, kind,
            name: kind === 'Tổ chức tư vấn' ? pick(LAW_FIRM_NAMES, Math.floor(i / 4)) : `${kind === 'Luật sư' ? 'LS.' : kind === 'Trọng tài viên' ? 'TTV.' : 'TS.'} ${personOf(i + 7)}`,
            org: kind === 'Tổ chức tư vấn' ? p.bar : pick([p.bar, p.businessAssoc, pick(LAW_FIRM_NAMES, i + 3)], i),
            fields: [pick(BUSINESS_FIELDS, i), pick(BUSINESS_FIELDS, i + 2)],
            area: cap(locOf(p, i * 2)), phone: phoneOf(p, i + 40), supported: 12 + ((i * 29) % 140), experience: 5 + (i * 3) % 20
        };
    });

    return { policies, documents, faqs, consultants, fields: BUSINESS_FIELDS };
};

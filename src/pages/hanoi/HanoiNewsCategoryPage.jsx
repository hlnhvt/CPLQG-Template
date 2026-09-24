import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Calendar, ChevronRight, ChevronLeft, Search,
    Newspaper, ArrowRight, Eye
} from 'lucide-react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';

/* ------------------------------------------------------------------ */
/*  Category config                                                       */
/* ------------------------------------------------------------------ */
export const HANOI_NEWS_CATEGORIES = [
    { id: 'tin-hoat-dong',  label: 'Tin hoạt động' },
    { id: 'chinh-sach',     label: 'Chính sách Thủ đô' },
    { id: 'pbgdpl',         label: 'Phổ biến giáo dục pháp luật' },
    { id: 'doanh-nghiep',   label: 'Hỗ trợ doanh nghiệp' },
    { id: 'tro-giup',       label: 'Trợ giúp pháp lý' },
    { id: 'tu-phap',        label: 'Hoạt động Tư pháp' },
    { id: 'van-ban',        label: 'Văn bản & Chính sách mới' },
    { id: 'nghien-cuu',     label: 'Nghiên cứu & Trao đổi' },
];

/* ------------------------------------------------------------------ */
/*  Mock articles per category                                           */
/* ------------------------------------------------------------------ */
const CATEGORY_ARTICLES = {
    'tin-hoat-dong': [
        { id: 101, title: 'Hà Nội tổ chức Hội nghị tổng kết công tác tư pháp năm 2025, triển khai nhiệm vụ 2026', summary: 'UBND Thành phố Hà Nội vừa tổ chức hội nghị tổng kết đánh giá kết quả đạt được và đề ra phương hướng trọng tâm cho năm 2026 nhằm tiếp tục nâng cao chất lượng dịch vụ công và cải cách hành chính tư pháp.', date: '23/03/2026', views: 2450, image: '/thumb1.png', tag: 'Hội nghị' },
        { id: 102, title: 'Sở Tư pháp Hà Nội ký kết hợp tác toàn diện với Đoàn Luật sư Thành phố về dịch vụ pháp lý công', summary: 'Biên bản hợp tác được ký kết nhằm nâng cao chất lượng cung cấp dịch vụ pháp lý miễn phí cho người dân, hỗ trợ doanh nghiệp và bảo vệ quyền lợi hợp pháp của người yếu thế.', date: '22/03/2026', views: 1820, image: '/thumb2.png', tag: 'Hợp tác' },
        { id: 103, title: 'Hội đồng PBGDPL Hà Nội họp triển khai Kế hoạch số 78/KH-UBND năm 2026 đến các quận, huyện', summary: 'Kế hoạch được triển khai đến 30 quận, huyện, thị xã với mục tiêu phủ sóng tuyên truyền pháp luật đến 100% xã, phường, thị trấn trên địa bàn Thủ đô.', date: '21/03/2026', views: 3100, image: '/thumb3.png', tag: 'Kế hoạch' },
        { id: 104, title: 'Hà Nội phát động tháng hành động cao điểm phổ biến pháp luật vùng ngoại thành', summary: 'Chuỗi chương trình tuyên truyền lưu động và tư vấn pháp luật miễn phí triển khai tại các huyện ngoại thành, ưu tiên vùng đồng bào dân tộc thiểu số, người lao động.', date: '20/03/2026', views: 1420, image: '/thumb1.png', tag: 'Sự kiện' },
        { id: 105, title: 'Giám đốc Sở Tư pháp tiếp xúc cử tri, trả lời kiến nghị về hộ tịch và lý lịch tư pháp', summary: 'Tại buổi tiếp xúc cử tri, Giám đốc Sở Tư pháp đã giải đáp trực tiếp hơn 40 kiến nghị của người dân liên quan đến thủ tục hộ tịch, cấp phiếu lý lịch tư pháp và chứng thực.', date: '19/03/2026', views: 2890, image: '/thumb2.png', tag: 'Tiếp dân' },
        { id: 106, title: 'Hà Nội tập huấn cho 3.000 cán bộ tư pháp xã, phường áp dụng Luật Thủ Đô 2024', summary: 'Chương trình tập huấn chuyên sâu được tổ chức theo hình thức trực tuyến kết hợp trực tiếp, cung cấp kiến thức và kỹ năng cần thiết để cán bộ tư pháp cơ sở triển khai đúng các quy định của Luật Thủ Đô.', date: '18/03/2026', views: 1650, image: '/thumb3.png', tag: 'Tập huấn' },
        { id: 107, title: 'Lễ ra mắt Cổng thông tin hỗ trợ pháp lý doanh nghiệp Hà Nội tích hợp AI tra cứu thông minh', summary: 'Cổng thông tin mới cho phép doanh nghiệp tra cứu tức thì thủ tục, chính sách ưu đãi và nhận tư vấn pháp lý trực tuyến miễn phí, được đánh giá là bước đột phá trong chuyển đổi số tư pháp.', date: '17/03/2026', views: 3200, image: '/thumb1.png', tag: 'Ra mắt' },
        { id: 108, title: 'Hà Nội hoàn thành phân loại và hệ thống hóa 100% văn bản QPPL hiện hành đến cấp xã', summary: 'Đây là kết quả của quá trình rà soát, hệ thống hóa toàn diện kho văn bản quy phạm pháp luật, góp phần nâng cao hiệu lực và hiệu quả quản lý nhà nước bằng pháp luật trên địa bàn Thủ đô.', date: '16/03/2026', views: 1230, image: '/thumb2.png', tag: 'Hành chính' },
    ],
    'chinh-sach': [
        { id: 201, title: 'Hà Nội ban hành kế hoạch triển khai thi hành Luật Thủ Đô số 39/2024/QH15 đến cơ sở', summary: 'Kế hoạch tổng thể cụ thể hóa các cơ chế chính sách đặc thù của Luật Thủ Đô, bao gồm Sandbox công nghệ, ưu đãi nhân tài và linh hoạt quản lý đô thị.', date: '23/03/2026', views: 3100, image: '/thumb3.png', tag: 'Luật Thủ Đô' },
        { id: 202, title: 'Chính sách hỗ trợ nhà ở xã hội, nhà lưu trú công nhân tại các khu công nghiệp Hà Nội 2026', summary: 'Thành phố dành nguồn lực đáng kể để phát triển nhà ở xã hội, ưu tiên người thu nhập thấp và công nhân lao động nhập cư làm việc tại các khu công nghiệp, khu chế xuất trên địa bàn.', date: '22/03/2026', views: 2890, image: '/thumb1.png', tag: 'Nhà ở' },
        { id: 203, title: 'Cơ chế Sandbox thí điểm cho doanh nghiệp AI, Fintech và xe tự hành theo Luật Thủ Đô', summary: 'Hà Nội là địa phương đầu tiên áp dụng cơ chế thử nghiệm có kiểm soát cho các sản phẩm công nghệ mới, tạo môi trường pháp lý an toàn để đổi mới sáng tạo phát triển.', date: '21/03/2026', views: 4200, image: '/thumb2.png', tag: 'Đổi mới sáng tạo' },
        { id: 204, title: 'Hà Nội ban hành chính sách ưu đãi đặc biệt thu hút nhân tài trình độ cao về Thủ đô', summary: 'Nghị quyết mới quy định cụ thể chính sách lương thưởng, phụ cấp, hỗ trợ nhà ở nhằm thu hút và giữ chân nhân tài trong các lĩnh vực khoa học, công nghệ và quản lý nhà nước.', date: '20/03/2026', views: 2100, image: '/thumb3.png', tag: 'Nhân tài' },
        { id: 205, title: 'HĐND Thành phố thông qua Nghị quyết phát triển kinh tế xã hội giai đoạn 2026-2030', summary: 'Nghị quyết đặt mục tiêu GRDP Hà Nội tăng trưởng bình quân 8,5%/năm, hoàn thiện cơ sở hạ tầng và trở thành trung tâm đổi mới sáng tạo hàng đầu khu vực Đông Nam Á.', date: '19/03/2026', views: 3500, image: '/thumb1.png', tag: 'Nghị quyết' },
        { id: 206, title: 'Chính sách thu hút đầu tư vào khu công nghệ cao Hòa Lạc và vùng đổi mới sáng tạo phía Tây', summary: 'Các ưu đãi về thuế, đất đai và hỗ trợ hạ tầng được điều chỉnh mạnh mẽ nhằm biến Hòa Lạc thành trung tâm công nghệ hàng đầu khu vực trong thập kỷ tới.', date: '18/03/2026', views: 1980, image: '/thumb2.png', tag: 'Đầu tư' },
    ],
    'pbgdpl': [
        { id: 301, title: 'Hà Nội đẩy mạnh tuyên truyền pháp luật lưu động đến 100% xã, phường, thị trấn năm 2026', summary: 'Hội đồng phối hợp PBGDPL cùng các sở ngành triển khai chuỗi hoạt động tuyên truyền lưu động, phủ sóng đến 579 đơn vị hành chính cơ sở trong năm 2026.', date: '22/03/2026', views: 1820, image: '/thumb2.png', tag: 'Lưu động' },
        { id: 302, title: 'Hội thi "Cán bộ tư pháp giỏi" 2026 thu hút 1.200 thí sinh từ 30 quận, huyện, thị xã', summary: 'Cuộc thi nhằm nâng cao năng lực đội ngũ cán bộ tư pháp, đồng thời phát hiện, tôn vinh những cán bộ xuất sắc trong công tác phổ biến và áp dụng pháp luật tại cơ sở.', date: '21/03/2026', views: 2400, image: '/thumb3.png', tag: 'Hội thi' },
        { id: 303, title: 'Mạng lưới tuyên truyền viên pháp luật cơ sở Hà Nội vượt mốc 25.000 người hoạt động tích cực', summary: 'Đây là lực lượng nòng cốt trong hệ thống PBGDPL của Thành phố, trực tiếp đưa thông tin pháp luật đến người dân thông qua các buổi họp tổ dân phố, sinh hoạt câu lạc bộ pháp luật.', date: '20/03/2026', views: 1650, image: '/thumb1.png', tag: 'Mạng lưới' },
        { id: 304, title: 'Đổi mới PBGDPL qua ứng dụng iHanoi và mạng xã hội đạt hiệu quả cao trong năm 2025', summary: 'Các video ngắn, infographic pháp luật được đăng tải trên các nền tảng số đã tiếp cận hàng triệu người dân, đặc biệt là thế hệ trẻ, với tỷ lệ tương tác tăng 150% so với cùng kỳ.', date: '19/03/2026', views: 3100, image: '/thumb2.png', tag: 'Chuyển đổi số' },
        { id: 305, title: 'Tập huấn kỹ năng hòa giải tranh chấp đất đai cho 500 hòa giải viên toàn Thành phố', summary: 'Chương trình được thiết kế sát thực tế với các tình huống giả định từ các vụ tranh chấp điển hình, giúp hòa giải viên nâng cao kỹ năng và tỷ lệ hòa giải thành công đạt trên 85%.', date: '18/03/2026', views: 1890, image: '/thumb3.png', tag: 'Tập huấn' },
        { id: 306, title: 'Hà Nội tổ chức Ngày Pháp luật với chuỗi 50 sự kiện trên toàn địa bàn Thủ đô', summary: 'Các hoạt động đa dạng bao gồm tư vấn pháp lý miễn phí, thi tìm hiểu pháp luật, triển lãm sách pháp luật và phát sóng chương trình Radio pháp luật trên hệ thống phát thanh của Thành phố.', date: '17/03/2026', views: 2760, image: '/thumb1.png', tag: 'Sự kiện' },
    ],
    'doanh-nghiep': [
        { id: 401, title: 'Tuần lễ đối thoại tháo gỡ điểm nghẽn pháp lý cho 500 doanh nghiệp vừa và nhỏ Thủ đô', summary: 'Sở Tư pháp Hà Nội chủ trì phối hợp Hiệp hội Doanh nghiệp TP tổ chức hội nghị giải đáp trực tiếp hơn 120 vướng mắc pháp lý về thuế, thủ tục đầu tư và quy định cấp phép Sandbox.', date: '21/03/2026', views: 4200, image: '/thumb1.png', tag: 'Đối thoại' },
        { id: 402, title: 'Ra mắt "Cổng thông tin hỗ trợ pháp lý doanh nghiệp" tích hợp tra cứu thủ tục và tư vấn trực tuyến', summary: 'Cổng thông tin mới cho phép doanh nghiệp tra cứu tức thì thủ tục đăng ký kinh doanh, các chính sách ưu đãi và kết nối với luật sư tư vấn pháp lý 24/7 hoàn toàn miễn phí.', date: '20/03/2026', views: 3800, image: '/thumb2.png', tag: 'Ra mắt' },
        { id: 403, title: 'Sở Tư pháp và VCCI tổ chức hội thảo về bảo vệ quyền sở hữu trí tuệ cho doanh nghiệp', summary: 'Hội thảo thu hút hơn 300 doanh nghiệp, cung cấp kiến thức thiết thực về đăng ký nhãn hiệu, bảo hộ sáng chế và giải quyết tranh chấp sở hữu trí tuệ trong bối cảnh hội nhập.', date: '19/03/2026', views: 2100, image: '/thumb3.png', tag: 'Sở hữu trí tuệ' },
        { id: 404, title: 'Hỗ trợ 100% chi phí ươm tạo khởi nghiệp tại Khu Công nghệ cao Hòa Lạc năm 2026', summary: 'Chính sách ưu đãi đặc biệt cho startup công nghệ, giúp họ tiếp cận trang thiết bị, không gian làm việc và mentoring từ chuyên gia hàng đầu mà không tốn chi phí trong 2 năm đầu.', date: '18/03/2026', views: 3500, image: '/thumb1.png', tag: 'Khởi nghiệp' },
        { id: 405, title: 'Thủ tục cấp phép Sandbox đơn giản hóa: Hà Nội giảm thời gian xét duyệt xuống 30 ngày', summary: 'Cải cách thủ tục hành chính mạnh mẽ giúp doanh nghiệp công nghệ tiếp cận cơ chế thử nghiệm nhanh chóng hơn, tạo động lực đổi mới sáng tạo và thu hút đầu tư vào Thủ đô.', date: '17/03/2026', views: 2890, image: '/thumb2.png', tag: 'Cải cách' },
    ],
    'tro-giup': [
        { id: 501, title: 'Trung tâm TGPL Nhà nước mở rộng tư vấn miễn phí qua tổng đài và ứng dụng iHanoi 24/7', summary: 'Người dân thuộc diện chính sách, hộ nghèo và người yếu thế tại 30 quận, huyện có thể kết nối với trợ giúp viên pháp lý để được thụ lý hồ sơ và cử luật sư bào chữa miễn phí.', date: '20/03/2026', views: 2760, image: '/thumb3.png', tag: 'Miễn phí' },
        { id: 502, title: 'Hà Nội thành lập thêm 5 Chi nhánh TGPL tại các huyện ngoại thành', summary: 'Các chi nhánh mới tại Ba Vì, Mỹ Đức, Ứng Hòa, Thạch Thất và Quốc Oai nhằm đưa dịch vụ pháp lý miễn phí đến gần hơn với người dân vùng ven đô còn nhiều khó khăn.', date: '19/03/2026', views: 1980, image: '/thumb1.png', tag: 'Mở rộng' },
        { id: 503, title: 'TGPL thành công cho 12.000 người yếu thế năm 2025, vượt 120% kế hoạch', summary: 'Trong đó 40% là vụ việc tố tụng, 35% tư vấn pháp luật và 25% đại diện ngoài tố tụng. Tỷ lệ vụ việc được giải quyết có lợi cho đối tượng được trợ giúp đạt trên 78%.', date: '18/03/2026', views: 2400, image: '/thumb2.png', tag: 'Kết quả' },
        { id: 504, title: 'Kết nối 200 luật sư tình nguyện tham gia mạng lưới TGPL cộng đồng Hà Nội', summary: 'Mạng lưới luật sư tình nguyện đóng vai trò quan trọng trong việc bổ sung nguồn lực cho hệ thống trợ giúp pháp lý nhà nước, đặc biệt tại các địa bàn thiếu trợ giúp viên pháp lý.', date: '17/03/2026', views: 1650, image: '/thumb3.png', tag: 'Tình nguyện' },
        { id: 505, title: 'Hội thảo nâng cao năng lực trợ giúp viên: Kỹ năng tranh tụng vụ án hình sự phức tạp', summary: 'Chương trình tập huấn chuyên sâu với sự tham gia của các thẩm phán, kiểm sát viên và luật sư kinh nghiệm, giúp trợ giúp viên pháp lý nâng cao hiệu quả bào chữa, bảo vệ quyền lợi thân chủ.', date: '16/03/2026', views: 1420, image: '/thumb1.png', tag: 'Tập huấn' },
    ],
    'tu-phap': [
        { id: 601, title: 'Hà Nội hoàn thành số hóa 100% văn bản QPPL tích hợp tra cứu thông minh AI', summary: 'Hệ thống Cổng Pháp luật Thành phố chính thức vận hành công cụ tra cứu thông minh, hỗ trợ người dân và doanh nghiệp tiếp cận thông tin pháp điển hóa nhanh chóng và chuẩn xác.', date: '19/03/2026', views: 3500, image: '/thumb2.png', tag: 'Chuyển đổi số' },
        { id: 602, title: 'Triển khai đăng ký hộ tịch trực tuyến 100% tại 579 xã, phường, thị trấn năm 2026', summary: 'Người dân có thể thực hiện toàn bộ các thủ tục hộ tịch như khai sinh, khai tử, đăng ký kết hôn trực tuyến mà không cần đến trực tiếp cơ quan nhà nước, trừ trường hợp đặc biệt.', date: '18/03/2026', views: 2890, image: '/thumb3.png', tag: 'Hộ tịch' },
        { id: 603, title: 'Hà Nội cải cách thủ tục hành chính tư pháp: Giảm 40% thời gian, 60% giấy tờ', summary: 'Đề án cải cách thủ tục hành chính trong lĩnh vực tư pháp đặt mục tiêu đưa Hà Nội vào nhóm địa phương có chỉ số cải cách hành chính cao nhất cả nước.', date: '17/03/2026', views: 2100, image: '/thumb1.png', tag: 'Cải cách' },
        { id: 604, title: 'Tổng kết 3 năm "Thành phố thông minh - Tư pháp số" giai đoạn 2022-2025', summary: 'Báo cáo cho thấy các chỉ số về mức độ hài lòng của người dân, doanh nghiệp với dịch vụ tư pháp tăng vượt bậc, khẳng định đúng hướng đi của công cuộc chuyển đổi số tư pháp Thủ đô.', date: '16/03/2026', views: 1890, image: '/thumb2.png', tag: 'Tổng kết' },
        { id: 605, title: 'Kết quả kiểm tra, rà soát VBQPPL do HĐND và UBND Thành phố ban hành năm 2025', summary: 'Qua rà soát, phát hiện và xử lý kịp thời các văn bản có nội dung chưa phù hợp với quy định cấp trên, góp phần bảo đảm tính hợp hiến, hợp pháp của hệ thống pháp luật.', date: '15/03/2026', views: 1340, image: '/thumb3.png', tag: 'Kiểm tra' },
    ],
    'van-ban': [
        { id: 701, title: 'Luật Thủ Đô 2024 – Những điểm đặc thù đột phá trong cơ chế thể chế cho Hà Nội', summary: 'Luật số 39/2024/QH15 trao cho Hà Nội nhiều cơ chế đặc thù nổi bật như Sandbox công nghệ, ưu đãi đặc biệt thu hút nhân tài và linh hoạt trong quản lý đô thị.', date: '18/03/2026', views: 5100, image: '/thumb1.png', tag: 'Luật Thủ Đô' },
        { id: 702, title: 'Quyết định 61/2024/QĐ-UBND: Bảng giá đất mới áp dụng từ 01/01/2026', summary: 'Bảng giá đất mới được điều chỉnh toàn diện, tiệm cận giá thị trường, tác động trực tiếp đến việc tính thuế, bồi thường giải phóng mặt bằng và cấp quyền sử dụng đất trên địa bàn Hà Nội.', date: '17/03/2026', views: 4200, image: '/thumb2.png', tag: 'Đất đai' },
        { id: 703, title: 'Hướng dẫn thi hành quy định đăng ký kinh doanh hộ cá thể và doanh nghiệp nhỏ mới', summary: 'Thông tư hướng dẫn chi tiết quy trình, hồ sơ và thời gian giải quyết thủ tục đăng ký kinh doanh, giúp cá nhân và doanh nghiệp tiếp cận pháp luật dễ dàng và nhanh chóng hơn.', date: '16/03/2026', views: 2890, image: '/thumb3.png', tag: 'Kinh doanh' },
        { id: 704, title: 'Nghị định 100/2019/NĐ-CP: Xử phạt vi phạm giao thông đường bộ, đường sắt – Tổng hợp mức phạt', summary: 'Tổng hợp và phân tích các quy định xử phạt vi phạm giao thông hiện hành, giúp người dân nắm rõ mức phạt và các hình thức xử lý để chủ động tuân thủ pháp luật.', date: '15/03/2026', views: 6500, image: '/thumb1.png', tag: 'Giao thông' },
        { id: 705, title: 'Thông tư hướng dẫn cấp phép xây dựng nhà ở riêng lẻ trong khu vực quy hoạch đô thị', summary: 'Các quy định mới được áp dụng thống nhất trên địa bàn Hà Nội nhằm quản lý trật tự xây dựng, bảo đảm phát triển đô thị theo quy hoạch và bảo vệ quyền lợi của người dân.', date: '14/03/2026', views: 3200, image: '/thumb2.png', tag: 'Xây dựng' },
        { id: 706, title: 'Kế hoạch 78/KH-UBND: Triển khai PBGDPL, hòa giải cơ sở và xây dựng xã đạt chuẩn tiếp cận pháp luật 2026', summary: 'Kế hoạch xác định rõ mục tiêu, nhiệm vụ, phân công trách nhiệm và nguồn lực cho công tác PBGDPL, hòa giải ở cơ sở và xây dựng xã, phường đạt chuẩn tiếp cận pháp luật năm 2026.', date: '13/03/2026', views: 1980, image: '/thumb3.png', tag: 'Kế hoạch' },
    ],
    'nghien-cuu': [
        { id: 801, title: 'Nghiên cứu hoàn thiện khung pháp lý về kinh tế đô thị đặc biệt cho Thủ đô Hà Nội', summary: 'Các chuyên gia tiếp tục nghiên cứu, đề xuất hoàn thiện hệ thống pháp luật về quản lý đô thị đặc biệt, tham khảo kinh nghiệm quốc tế và vận dụng vào điều kiện đặc thù của Thủ đô.', date: '17/03/2026', views: 2400, image: '/thumb3.png', tag: 'Nghiên cứu' },
        { id: 802, title: 'So sánh cơ chế hành chính đô thị đặc biệt: Kinh nghiệm Tokyo, Seoul, Singapore cho Hà Nội', summary: 'Bài nghiên cứu phân tích sâu cơ chế quản trị đô thị của các thành phố hàng đầu châu Á, đề xuất các mô hình phù hợp có thể vận dụng vào thực tiễn quản lý và phát triển Thủ đô Hà Nội.', date: '16/03/2026', views: 1890, image: '/thumb1.png', tag: 'So sánh quốc tế' },
        { id: 803, title: 'Đánh giá hiệu quả 2 năm thực thi Luật Đất đai 2024: Tháo gỡ điểm nghẽn trong thực tiễn', summary: 'Sau 2 năm triển khai, nhiều vướng mắc trong thực tiễn đã được phát hiện và xử lý. Bài viết tổng hợp kết quả nghiên cứu và kiến nghị hoàn thiện các quy định còn chưa phù hợp.', date: '15/03/2026', views: 3100, image: '/thumb2.png', tag: 'Đất đai' },
        { id: 804, title: 'Hoàn thiện cơ chế kiểm soát quyền lực nhà nước trong lĩnh vực đất đai và phòng, chống tham nhũng', summary: 'Nghiên cứu đề xuất các giải pháp hoàn thiện cơ chế kiểm soát quyền lực, nâng cao tính minh bạch, trách nhiệm giải trình trong quản lý, sử dụng đất đai.', date: '14/03/2026', views: 2760, image: '/thumb3.png', tag: 'Chống tham nhũng' },
        { id: 805, title: 'Trao đổi về kỹ năng lập luận pháp lý trong giải quyết tranh chấp hành chính tại tòa án', summary: 'Bài viết chia sẻ kinh nghiệm thực tiễn và phương pháp tiếp cận hiệu quả trong việc xây dựng lập luận pháp lý, thu thập chứng cứ và bảo vệ quyền lợi khách hàng trong các vụ án hành chính.', date: '13/03/2026', views: 1650, image: '/thumb1.png', tag: 'Kỹ năng' },
        { id: 806, title: 'Mô hình quản trị liên vùng Thủ đô: Hà Nội – Hải Phòng – Quảng Ninh trong kỷ nguyên mới', summary: 'Đề xuất khung pháp lý và cơ chế điều phối liên vùng cho vùng kinh tế trọng điểm phía Bắc, nhằm tối ưu hóa phân bổ nguồn lực và thúc đẩy phát triển kinh tế toàn vùng.', date: '12/03/2026', views: 1340, image: '/thumb2.png', tag: 'Liên vùng' },
    ],
};

const ITEMS_PER_PAGE = 5;

/* ------------------------------------------------------------------ */
/*  Sticky Sub-Nav – uses Link for real route navigation                 */
/* ------------------------------------------------------------------ */
const HanoiNewsSubNav = ({ activeId }) => {
    const scrollRef = useRef(null);
    const [showArrow, setShowArrow] = useState(true);
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowArrow(scrollLeft + clientWidth < scrollWidth - 8);
    };
    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[40]">
            <div className="container mx-auto px-4 max-w-[1286px]">
                <div className="flex items-center h-11">
                    <div className="shrink-0 pr-3 border-r border-gray-200 flex items-center text-indigo-700">
                        <Newspaper size={18} />
                    </div>
                    <div ref={scrollRef} onScroll={handleScroll}
                        className="flex-1 overflow-x-auto flex items-center gap-1 px-3"
                        style={{ scrollbarWidth: 'none' }}>
                        {HANOI_NEWS_CATEGORIES.map((cat) => {
                            const isActive = cat.id === activeId;
                            return (
                                <Link key={cat.id} to={`/ha-noi/tin-tuc/${cat.id}`}
                                    className={`whitespace-nowrap text-[13px] font-medium px-3 py-2 border-b-2 transition-colors shrink-0 ${isActive
                                        ? 'border-[#2c1b92] text-[#2c1b92] font-semibold'
                                        : 'border-transparent text-gray-600 hover:text-[#2c1b92] hover:border-indigo-300'}`}>
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                    {showArrow && (
                        <button onClick={scrollRight}
                            className="shrink-0 pl-2 border-l border-gray-200 text-gray-400 hover:text-indigo-700 transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                        */
/* ------------------------------------------------------------------ */
const HanoiNewsCategoryPage = () => {
    const { categorySlug } = useParams();
    const category = HANOI_NEWS_CATEGORIES.find((c) => c.id === categorySlug) || HANOI_NEWS_CATEGORIES[0];
    const allArticles = CATEGORY_ARTICLES[category.id] || [];
    const featuredMain = allArticles[0];
    const featuredSub = allArticles.slice(1, 4);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = `${category.label} - Cổng Pháp luật Hà Nội`;
        window.scrollTo(0, 0);
        setCurrentPage(1);
    }, [categorySlug]);

    const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);
    const currentArticles = allArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePage = (p) => {
        if (p >= 1 && p <= totalPages) { setCurrentPage(p); window.scrollTo({ top: 500, behavior: 'smooth' }); }
    };

    const paginationPages = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#f4f7fb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-[#2c1b92] transition-colors">Trang chủ Hà Nội</Link>
                    <ChevronRight size={14} />
                    <Link to="/ha-noi/tin-tuc" className="hover:text-[#2c1b92] transition-colors">Tin tức &amp; Sự kiện</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-medium">{category.label}</span>
                </div>
            </div>

            {/* Banner */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                <style>{`
                    @keyframes catSweep{0%{transform:translateX(-160%) skewX(-25deg);opacity:0}25%{opacity:.32}70%{opacity:.32}100%{transform:translateX(260%) skewX(-25deg);opacity:0}}
                    @keyframes catPulse{0%,100%{opacity:.15;transform:scale(.95)}50%{opacity:.38;transform:scale(1.12)}}
                    @keyframes catRotCW{from{transform:rotate(0)}to{transform:rotate(360deg)}}
                    @keyframes catRotCCW{from{transform:rotate(360deg)}to{transform:rotate(0)}}
                `}</style>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />
                <div className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" style={{ animation: 'catSweep 5s cubic-bezier(0.4,0,0.2,1) infinite' }} />
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'catPulse 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'catPulse 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'catRotCW 16s linear infinite' }} />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none" style={{ animation: 'catRotCCW 18s linear infinite' }} />
                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">{category.label}</h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Cập nhật liên tục tin tức, sự kiện và hoạt động pháp luật trong chuyên mục {category.label} của Cổng Pháp luật Thành phố Hà Nội
                    </p>
                </div>
            </div>

            {/* Sub Nav */}
            <HanoiNewsSubNav activeId={category.id} />

            {/* Main */}
            <main className="flex-grow">
                <div className="container mx-auto px-4 max-w-[1286px] mt-8 pb-12">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ── Main Content ── */}
                        <div className="flex-1 min-w-0">

                            {/* Featured block */}
                            {featuredMain && (
                                <div className="mb-10">
                                    <Link to={`/news/${featuredMain.id}`} className="block group mb-5">
                                        <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-gray-200 shadow-md">
                                            <img src={featuredMain.image} alt={featuredMain.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1440] via-black/40 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                                <span className="inline-block bg-[#4f56ca]/90 backdrop-blur-sm text-white text-[12px] font-bold px-3 py-1 rounded mb-3">{featuredMain.tag}</span>
                                                <h2 className="text-white font-bold text-[20px] md:text-[26px] leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors drop-shadow-md">{featuredMain.title}</h2>
                                                <p className="text-gray-200 text-[14px] mt-3 line-clamp-2 leading-relaxed opacity-90">{featuredMain.summary}</p>
                                                <div className="flex items-center gap-4 text-indigo-200 text-[13px] mt-4 font-medium">
                                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredMain.date}</span>
                                                    <span className="w-1 h-1 rounded-full bg-indigo-300" />
                                                    <span className="flex items-center gap-1.5"><Eye size={14} /> {featuredMain.views.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        {featuredSub.map((item) => (
                                            <Link key={item.id} to={`/news/${item.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col">
                                                <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <span className="absolute top-2 left-2 bg-[#2c1b92]/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">{item.tag}</span>
                                                </div>
                                                <div className="p-4 flex flex-col flex-1">
                                                    <h3 className="font-bold text-[14px] text-gray-800 group-hover:text-[#2c1b92] line-clamp-3 leading-snug mb-3 flex-1">{item.title}</h3>
                                                    <div className="flex items-center justify-between text-gray-400 text-[12px]">
                                                        <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                                        <span className="flex items-center gap-1"><Eye size={12} /> {item.views.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Article list */}
                            <div className="space-y-5 mb-10">
                                {currentArticles.length === 0 ? (
                                    <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
                                        <Search size={40} className="mx-auto text-gray-300 mb-3" />
                                        <p className="text-lg font-medium text-gray-600 mb-1">Chưa có tin tức trong chuyên mục này</p>
                                    </div>
                                ) : currentArticles.map((article) => (
                                    <Link key={article.id} to={`/news/${article.id}`}
                                        className="group flex flex-col md:flex-row gap-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="w-full md:w-56 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <span className="absolute bottom-2 right-2 bg-[#2c1b92]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">{article.tag}</span>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-[16px] md:text-[18px] text-[#2c1b92] group-hover:text-[#4f56ca] transition-colors leading-snug line-clamp-2 mb-2">{article.title}</h3>
                                                <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">{article.summary}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-500 text-[12px] font-medium mt-4">
                                                <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span className="flex items-center gap-1.5"><Eye size={13} /> {article.views.toLocaleString()} lượt xem</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                                    <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}
                                        className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40 text-[14px] transition-colors font-medium">
                                        <ChevronLeft size={16} /> Trước
                                    </button>
                                    {paginationPages().map((p, i) => p === '...'
                                        ? <span key={i} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                                        : <button key={p} onClick={() => handlePage(p)}
                                            className={`w-10 h-10 rounded-lg border text-[14px] font-bold transition-colors ${currentPage === p ? 'bg-[#2c1b92] border-[#2c1b92] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-[#2c1b92] hover:text-[#2c1b92]'}`}>
                                            {p}
                                        </button>
                                    )}
                                    <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}
                                        className="flex items-center gap-1 h-10 px-4 border border-gray-200 rounded-lg bg-white text-gray-500 hover:border-[#2c1b92] hover:text-[#2c1b92] disabled:opacity-40 text-[14px] transition-colors font-medium">
                                        Sau <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ── Sidebar ── */}
                        <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
                            {/* Latest news */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="bg-gradient-to-r from-[#2c1b92] to-[#4f56ca] px-5 py-3.5">
                                    <h3 className="text-white font-bold text-[15px]">Tin mới nhất</h3>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {allArticles.slice(0, 5).map((item) => (
                                        <Link key={item.id} to={`/news/${item.id}`} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group">
                                            <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-bold text-gray-800 group-hover:text-[#2c1b92] transition-colors line-clamp-2 leading-snug">{item.title}</p>
                                                <div className="flex items-center gap-1 text-gray-400 text-[11px] mt-1.5"><Calendar size={11} /> {item.date}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="p-3.5 border-t border-gray-100 bg-gray-50/50">
                                    <Link to="/ha-noi/tin-tuc" className="text-[13px] text-[#2c1b92] font-bold hover:text-[#4f56ca] flex items-center gap-1.5 w-fit mx-auto">
                                        Xem tất cả <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Newsletter CTA */}
                            <div className="bg-gradient-to-b from-[#2c1b92] to-[#0d1140] text-white p-6 rounded-2xl shadow-md text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:16px_16px]" />
                                <Newspaper size={36} className="mx-auto mb-3 text-amber-300 relative z-10" />
                                <h3 className="text-[16px] font-bold text-white mb-2 relative z-10">Đăng ký nhận tin</h3>
                                <p className="text-[12px] text-indigo-200 leading-relaxed mb-4 relative z-10">
                                    Nhận ngay các cập nhật pháp luật mới nhất về <strong>{category.label}</strong> qua email.
                                </p>
                                <Link to="/ban-tin/dang-ky"
                                    className="block w-full py-2.5 bg-amber-400 text-[#0d1140] font-bold rounded-lg hover:bg-amber-300 transition-colors text-[13px] relative z-10">
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <HanoiFooter />
        </div>
    );
};

export default HanoiNewsCategoryPage;

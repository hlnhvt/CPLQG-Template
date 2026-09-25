import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Calendar, ChevronRight, ChevronLeft, Search,
    Newspaper, ArrowRight, Eye
} from 'lucide-react';
import LaoCaiV2Header from '../../components/laocaiV2/LaoCaiV2Header';
import LaoCaiV2Footer from '../../components/laocaiV2/LaoCaiV2Footer';
import LaoCaiV2NewsSubNav from '../../components/laocaiV2/LaoCaiV2NewsSubNav';

/* ------------------------------------------------------------------ */
/*  Category config                                                       */
/* ------------------------------------------------------------------ */
export const LAOCAI_NEWS_CATEGORIES = [
    { id: 'tin-hoat-dong',  label: 'Tin hoạt động' },
    { id: 'chinh-sach',     label: 'Chính sách Lào Cai' },
    { id: 'pbgdpl',         label: 'Phổ biến, giáo dục pháp luật' },
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
        { id: 101, title: 'UBND tỉnh Lào Cai tổ chức Hội nghị tổng kết công tác tư pháp năm 2025, triển khai nhiệm vụ 2026', summary: 'UBND tỉnh Lào Cai vừa tổ chức hội nghị tổng kết đánh giá kết quả đạt được và đề ra phương hướng trọng tâm cho năm 2026 nhằm tiếp tục nâng cao chất lượng dịch vụ công và cải cách hành chính tư pháp.', date: '23/03/2026', views: 2450, image: '/thumb1.png', tag: 'Hội nghị' },
        { id: 102, title: 'Sở Tư pháp tỉnh Lào Cai ký kết quy chế phối hợp với Đoàn Luật sư tỉnh về dịch vụ pháp lý công', summary: 'Biên bản hợp tác được ký kết nhằm nâng cao chất lượng cung cấp dịch vụ pháp lý miễn phí cho người dân, hỗ trợ doanh nghiệp và bảo vệ quyền lợi hợp pháp của người yếu thế.', date: '22/03/2026', views: 1820, image: '/thumb2.png', tag: 'Hợp tác' },
        { id: 103, title: 'Hội đồng PBGDPL Lào Cai họp triển khai Kế hoạch số 78/KH-UBND năm 2026 đến các xã, phường', summary: 'Kế hoạch được triển khai đến các xã, phường với mục tiêu phủ sóng tuyên truyền pháp luật đến 100% thôn, bản, tổ dân phố trên địa bàn tỉnh Lào Cai.', date: '21/03/2026', views: 3100, image: '/thumb3.png', tag: 'Kế hoạch' },
        { id: 104, title: 'Lào Cai phát động tháng cao điểm phổ biến pháp luật cho đồng bào vùng cao, biên giới', summary: 'Chuỗi chương trình tuyên truyền lưu động và tư vấn pháp luật miễn phí triển khai tại các xã vùng cao, biên giới như Y Tý, Bản Lầu, Si Ma Cai, Mường Khương, ưu tiên đồng bào dân tộc thiểu số.', date: '20/03/2026', views: 1420, image: '/thumb1.png', tag: 'Sự kiện' },
        { id: 105, title: 'Giám đốc Sở Tư pháp tiếp xúc cử tri, trả lời kiến nghị về hộ tịch và lý lịch tư pháp', summary: 'Tại buổi tiếp xúc cử tri, Giám đốc Sở Tư pháp đã giải đáp trực tiếp hơn 40 kiến nghị của người dân liên quan đến thủ tục hộ tịch, cấp phiếu lý lịch tư pháp và chứng thực.', date: '19/03/2026', views: 2890, image: '/thumb2.png', tag: 'Tiếp dân' },
        { id: 106, title: 'Lào Cai tập huấn cho 1.000 công chức tư pháp - hộ tịch cấp xã sau sắp xếp chính quyền hai cấp', summary: 'Chương trình tập huấn chuyên sâu được tổ chức theo hình thức trực tuyến kết hợp trực tiếp, cung cấp kiến thức và kỹ năng cần thiết để công chức tư pháp cấp xã thực hiện đúng thẩm quyền mới được phân cấp, phân quyền.', date: '18/03/2026', views: 1650, image: '/thumb3.png', tag: 'Tập huấn' },
        { id: 107, title: 'Lễ ra mắt Cổng thông tin hỗ trợ pháp lý doanh nghiệp Lào Cai tích hợp AI tra cứu thông minh', summary: 'Cổng thông tin mới cho phép doanh nghiệp tra cứu tức thì thủ tục, chính sách ưu đãi và nhận tư vấn pháp lý trực tuyến miễn phí, được đánh giá là bước đột phá trong chuyển đổi số tư pháp.', date: '17/03/2026', views: 3200, image: '/thumb1.png', tag: 'Ra mắt' },
        { id: 108, title: 'Lào Cai hoàn thành phân loại và hệ thống hóa 100% văn bản QPPL hiện hành đến cấp xã', summary: 'Đây là kết quả của quá trình rà soát, hệ thống hóa toàn diện kho văn bản quy phạm pháp luật, góp phần nâng cao hiệu lực và hiệu quả quản lý nhà nước bằng pháp luật trên địa bàn Lào Cai.', date: '16/03/2026', views: 1230, image: '/thumb2.png', tag: 'Hành chính' },
    ],
    'chinh-sach': [
        { id: 201, title: 'Lào Cai ban hành kế hoạch triển khai các chính sách đặc thù phát triển tỉnh giai đoạn 2026 - 2030', summary: 'Kế hoạch tổng thể cụ thể hóa các nghị quyết của HĐND tỉnh về kinh tế cửa khẩu, du lịch Sa Pa, nông nghiệp hàng hóa vùng cao và hỗ trợ đồng bào dân tộc thiểu số.', date: '23/03/2026', views: 3100, image: '/thumb3.png', tag: 'Chính sách đặc thù' },
        { id: 202, title: 'Chính sách hỗ trợ nhà ở xã hội, nhà lưu trú công nhân tại các khu công nghiệp Lào Cai 2026', summary: 'Tỉnh dành nguồn lực đáng kể để phát triển nhà ở xã hội, ưu tiên người thu nhập thấp và công nhân lao động nhập cư làm việc tại các khu công nghiệp Tằng Loỏng, Bắc Duyên Hải và Khu kinh tế cửa khẩu.', date: '22/03/2026', views: 2890, image: '/thumb1.png', tag: 'Nhà ở' },
        { id: 203, title: 'Chính sách hỗ trợ phát triển du lịch cộng đồng tại Sa Pa, Bắc Hà, Y Tý', summary: 'Hộ gia đình, hợp tác xã kinh doanh homestay tại các bản du lịch được hỗ trợ cải tạo cơ sở lưu trú, đào tạo kỹ năng và quảng bá sản phẩm gắn với bảo tồn bản sắc văn hóa dân tộc.', date: '21/03/2026', views: 4200, image: '/thumb2.png', tag: 'Du lịch' },
        { id: 204, title: 'Lào Cai ban hành chính sách thu hút người có trình độ cao về công tác tại các xã vùng cao', summary: 'Nghị quyết mới quy định cụ thể chính sách hỗ trợ ban đầu, phụ cấp và nhà ở công vụ nhằm thu hút, giữ chân cán bộ có trình độ cao về làm việc tại các xã vùng cao, biên giới của tỉnh.', date: '20/03/2026', views: 2100, image: '/thumb3.png', tag: 'Nhân tài' },
        { id: 205, title: 'HĐND tỉnh thông qua Nghị quyết phát triển kinh tế - xã hội giai đoạn 2026-2030', summary: 'Nghị quyết đặt mục tiêu GRDP tỉnh Lào Cai tăng trưởng bình quân trên 8%/năm, hoàn thiện hạ tầng giao thông kết nối và phát triển Lào Cai thành trung tâm kinh tế, du lịch của vùng trung du và miền núi phía Bắc.', date: '19/03/2026', views: 3500, image: '/thumb1.png', tag: 'Nghị quyết' },
        { id: 206, title: 'Chính sách thu hút đầu tư vào Khu kinh tế cửa khẩu Lào Cai và các khu công nghiệp', summary: 'Các ưu đãi về thuế, tiền thuê đất và hỗ trợ hạ tầng được điều chỉnh nhằm phát huy lợi thế cửa khẩu, đưa Lào Cai trở thành trung tâm logistics kết nối Việt Nam - ASEAN với vùng Tây Nam Trung Quốc.', date: '18/03/2026', views: 1980, image: '/thumb2.png', tag: 'Đầu tư' },
    ],
    'pbgdpl': [
        { id: 301, title: 'Lào Cai đẩy mạnh tuyên truyền pháp luật lưu động đến 100% xã, phường năm 2026', summary: 'Hội đồng phối hợp PBGDPL tỉnh cùng các sở ngành triển khai chuỗi hoạt động tuyên truyền lưu động, phủ kín 99 xã, phường, ưu tiên các thôn, bản vùng cao trong năm 2026.', date: '22/03/2026', views: 1820, image: '/thumb2.png', tag: 'Lưu động' },
        { id: 302, title: 'Hội thi "Hòa giải viên giỏi" cấp tỉnh năm 2026 thu hút hơn 300 hòa giải viên cơ sở', summary: 'Cuộc thi nhằm nâng cao năng lực đội ngũ cán bộ tư pháp, đồng thời phát hiện, tôn vinh những cán bộ xuất sắc trong công tác phổ biến và áp dụng pháp luật tại cơ sở.', date: '21/03/2026', views: 2400, image: '/thumb3.png', tag: 'Hội thi' },
        { id: 303, title: 'Mạng lưới tuyên truyền viên pháp luật cơ sở Lào Cai vượt mốc 5.000 người hoạt động tích cực', summary: 'Đây là lực lượng nòng cốt trong hệ thống PBGDPL của tỉnh, trực tiếp đưa thông tin pháp luật đến người dân thông qua các buổi họp thôn, bản, tổ dân phố và sinh hoạt câu lạc bộ pháp luật.', date: '20/03/2026', views: 1650, image: '/thumb1.png', tag: 'Mạng lưới' },
        { id: 304, title: 'Đổi mới PBGDPL qua loa truyền thanh thôn, bản và mạng xã hội bằng tiếng dân tộc', summary: 'Các video ngắn, bản tin pháp luật bằng tiếng Mông, tiếng Dao được phát trên hệ thống truyền thanh cơ sở và nền tảng số, giúp đồng bào vùng cao tiếp cận pháp luật dễ hiểu, gần gũi.', date: '19/03/2026', views: 3100, image: '/thumb2.png', tag: 'Chuyển đổi số' },
        { id: 305, title: 'Tập huấn kỹ năng hòa giải tranh chấp đất đai, đất rừng cho 500 hòa giải viên vùng cao', summary: 'Chương trình được thiết kế sát thực tế với các tình huống giả định từ các vụ tranh chấp điển hình, giúp hòa giải viên nâng cao kỹ năng và tỷ lệ hòa giải thành công đạt trên 85%.', date: '18/03/2026', views: 1890, image: '/thumb3.png', tag: 'Tập huấn' },
        { id: 306, title: 'Lào Cai tổ chức Ngày Pháp luật Việt Nam với chuỗi sự kiện hướng về cơ sở trên toàn tỉnh', summary: 'Các hoạt động đa dạng bao gồm tư vấn pháp lý miễn phí, thi tìm hiểu pháp luật, triển lãm sách pháp luật và phát sóng chương trình pháp luật trên hệ thống truyền thanh cơ sở của tỉnh.', date: '17/03/2026', views: 2760, image: '/thumb1.png', tag: 'Sự kiện' },
    ],
    'doanh-nghiep': [
        { id: 401, title: 'Tuần lễ đối thoại tháo gỡ vướng mắc pháp lý cho doanh nghiệp, hợp tác xã tỉnh Lào Cai', summary: 'Sở Tư pháp tỉnh Lào Cai chủ trì phối hợp Hiệp hội Doanh nghiệp tỉnh tổ chức hội nghị giải đáp trực tiếp hơn 120 vướng mắc pháp lý về thuế, thủ tục đầu tư và xuất nhập khẩu qua cửa khẩu.', date: '21/03/2026', views: 4200, image: '/thumb1.png', tag: 'Đối thoại' },
        { id: 402, title: 'Ra mắt chuyên trang hỗ trợ pháp lý doanh nghiệp tỉnh Lào Cai tích hợp tra cứu thủ tục và tư vấn trực tuyến', summary: 'Cổng thông tin mới cho phép doanh nghiệp tra cứu tức thì thủ tục đăng ký kinh doanh, các chính sách ưu đãi và kết nối với luật sư tư vấn pháp lý 24/7 hoàn toàn miễn phí.', date: '20/03/2026', views: 3800, image: '/thumb2.png', tag: 'Ra mắt' },
        { id: 403, title: 'Sở Tư pháp và VCCI tổ chức hội thảo về bảo vệ quyền sở hữu trí tuệ cho doanh nghiệp', summary: 'Hội thảo thu hút hơn 300 doanh nghiệp, cung cấp kiến thức thiết thực về đăng ký nhãn hiệu, bảo hộ sáng chế và giải quyết tranh chấp sở hữu trí tuệ trong bối cảnh hội nhập.', date: '19/03/2026', views: 2100, image: '/thumb3.png', tag: 'Sở hữu trí tuệ' },
        { id: 404, title: 'Hỗ trợ bảo hộ nhãn hiệu cho sản phẩm OCOP: chè Shan tuyết, quế Văn Bàn, mận Bắc Hà', summary: 'Doanh nghiệp, hợp tác xã được hỗ trợ chi phí đăng ký nhãn hiệu, chỉ dẫn địa lý và truy xuất nguồn gốc, nâng cao giá trị nông sản vùng cao khi xuất khẩu qua cửa khẩu.', date: '18/03/2026', views: 3500, image: '/thumb1.png', tag: 'OCOP' },
        { id: 405, title: 'Rút ngắn thời gian thông quan tại Cửa khẩu quốc tế Lào Cai', summary: 'Quy chế phối hợp liên ngành giúp doanh nghiệp xuất khẩu nông sản giảm thời gian chờ thông quan, minh bạch quy trình kiểm tra chuyên ngành và thu hút thêm đầu tư vào tỉnh Lào Cai.', date: '17/03/2026', views: 2890, image: '/thumb2.png', tag: 'Cải cách' },
    ],
    'tro-giup': [
        { id: 501, title: 'Trung tâm TGPL Nhà nước tỉnh Lào Cai mở rộng tư vấn miễn phí qua tổng đài và Cổng Dịch vụ công tỉnh', summary: 'Người dân thuộc diện chính sách, hộ nghèo và người yếu thế tại các xã, phường có thể kết nối với trợ giúp viên pháp lý để được thụ lý hồ sơ và cử luật sư bào chữa miễn phí.', date: '20/03/2026', views: 2760, image: '/thumb3.png', tag: 'Miễn phí' },
        { id: 502, title: 'Lào Cai tăng cường điểm trợ giúp pháp lý lưu động tại các xã vùng cao, biên giới', summary: 'Các điểm trợ giúp pháp lý lưu động tại Tả Van, Trịnh Tường, Võ Lao, Gia Phú và Khánh Yên nhằm đưa dịch vụ pháp lý miễn phí đến gần hơn với đồng bào vùng cao còn nhiều khó khăn.', date: '19/03/2026', views: 1980, image: '/thumb1.png', tag: 'Mở rộng' },
        { id: 503, title: 'TGPL thành công cho hơn 2.000 lượt người yếu thế năm 2025, vượt kế hoạch đề ra', summary: 'Trong đó 40% là vụ việc tố tụng, 35% tư vấn pháp luật và 25% đại diện ngoài tố tụng. Tỷ lệ vụ việc được giải quyết có lợi cho đối tượng được trợ giúp đạt trên 78%.', date: '18/03/2026', views: 2400, image: '/thumb2.png', tag: 'Kết quả' },
        { id: 504, title: 'Kết nối luật sư, cộng tác viên tham gia mạng lưới TGPL cộng đồng tỉnh Lào Cai', summary: 'Mạng lưới luật sư tình nguyện đóng vai trò quan trọng trong việc bổ sung nguồn lực cho hệ thống trợ giúp pháp lý nhà nước, đặc biệt tại các địa bàn thiếu trợ giúp viên pháp lý.', date: '17/03/2026', views: 1650, image: '/thumb3.png', tag: 'Tình nguyện' },
        { id: 505, title: 'Hội thảo nâng cao năng lực trợ giúp viên: Kỹ năng tranh tụng vụ án hình sự phức tạp', summary: 'Chương trình tập huấn chuyên sâu với sự tham gia của các thẩm phán, kiểm sát viên và luật sư kinh nghiệm, giúp trợ giúp viên pháp lý nâng cao hiệu quả bào chữa, bảo vệ quyền lợi thân chủ.', date: '16/03/2026', views: 1420, image: '/thumb1.png', tag: 'Tập huấn' },
    ],
    'tu-phap': [
        { id: 601, title: 'Lào Cai hoàn thành số hóa 100% văn bản QPPL tích hợp tra cứu thông minh AI', summary: 'Cổng Pháp luật tỉnh Lào Cai chính thức vận hành công cụ tra cứu thông minh, hỗ trợ người dân và doanh nghiệp tiếp cận thông tin pháp điển hóa nhanh chóng và chuẩn xác.', date: '19/03/2026', views: 3500, image: '/thumb2.png', tag: 'Chuyển đổi số' },
        { id: 602, title: 'Triển khai đăng ký hộ tịch trực tuyến tại 100% xã, phường tỉnh Lào Cai năm 2026', summary: 'Người dân có thể thực hiện toàn bộ các thủ tục hộ tịch như khai sinh, khai tử, đăng ký kết hôn trực tuyến mà không cần đến trực tiếp cơ quan nhà nước, trừ trường hợp đặc biệt.', date: '18/03/2026', views: 2890, image: '/thumb3.png', tag: 'Hộ tịch' },
        { id: 603, title: 'Lào Cai cải cách thủ tục hành chính tư pháp: Giảm 40% thời gian, 60% giấy tờ', summary: 'Đề án cải cách thủ tục hành chính trong lĩnh vực tư pháp đặt mục tiêu đưa Lào Cai vào nhóm địa phương có chỉ số cải cách hành chính cao nhất cả nước.', date: '17/03/2026', views: 2100, image: '/thumb1.png', tag: 'Cải cách' },
        { id: 604, title: 'Sơ kết Đề án chuyển đổi số ngành Tư pháp tỉnh Lào Cai giai đoạn 2022-2025', summary: 'Báo cáo cho thấy các chỉ số về mức độ hài lòng của người dân, doanh nghiệp với dịch vụ tư pháp tăng vượt bậc, khẳng định đúng hướng đi của công cuộc chuyển đổi số tư pháp Lào Cai.', date: '16/03/2026', views: 1890, image: '/thumb2.png', tag: 'Tổng kết' },
        { id: 605, title: 'Kết quả kiểm tra, rà soát VBQPPL do HĐND và UBND tỉnh ban hành năm 2025', summary: 'Qua rà soát, phát hiện và xử lý kịp thời các văn bản có nội dung chưa phù hợp với quy định cấp trên, góp phần bảo đảm tính hợp hiến, hợp pháp của hệ thống pháp luật.', date: '15/03/2026', views: 1340, image: '/thumb3.png', tag: 'Kiểm tra' },
    ],
    'van-ban': [
        { id: 701, title: 'Chính sách đặc thù phát triển tỉnh Lào Cai – Những điểm mới trong nghị quyết của HĐND tỉnh', summary: 'Các nghị quyết mới tập trung vào ưu đãi đầu tư tại Khu kinh tế cửa khẩu, hỗ trợ du lịch cộng đồng, nông nghiệp hàng hóa vùng cao và chính sách cho đồng bào dân tộc thiểu số.', date: '18/03/2026', views: 5100, image: '/thumb1.png', tag: 'Chính sách đặc thù' },
        { id: 702, title: 'Bảng giá đất mới tỉnh Lào Cai áp dụng từ 01/01/2026', summary: 'Bảng giá đất mới được điều chỉnh toàn diện, tiệm cận giá thị trường, tác động trực tiếp đến việc tính thuế, bồi thường giải phóng mặt bằng và cấp quyền sử dụng đất trên địa bàn Lào Cai.', date: '17/03/2026', views: 4200, image: '/thumb2.png', tag: 'Đất đai' },
        { id: 703, title: 'Hướng dẫn thi hành quy định đăng ký kinh doanh hộ cá thể và doanh nghiệp nhỏ mới', summary: 'Thông tư hướng dẫn chi tiết quy trình, hồ sơ và thời gian giải quyết thủ tục đăng ký kinh doanh, giúp cá nhân và doanh nghiệp tiếp cận pháp luật dễ dàng và nhanh chóng hơn.', date: '16/03/2026', views: 2890, image: '/thumb3.png', tag: 'Kinh doanh' },
        { id: 704, title: 'Nghị định 100/2019/NĐ-CP: Xử phạt vi phạm giao thông đường bộ, đường sắt – Tổng hợp mức phạt', summary: 'Tổng hợp và phân tích các quy định xử phạt vi phạm giao thông hiện hành, giúp người dân nắm rõ mức phạt và các hình thức xử lý để chủ động tuân thủ pháp luật.', date: '15/03/2026', views: 6500, image: '/thumb1.png', tag: 'Giao thông' },
        { id: 705, title: 'Hướng dẫn cấp phép xây dựng nhà ở riêng lẻ tại khu du lịch quốc gia Sa Pa và các đô thị trong tỉnh', summary: 'Các quy định mới được áp dụng thống nhất trên địa bàn tỉnh Lào Cai nhằm quản lý trật tự xây dựng, giữ gìn cảnh quan, kiến trúc đặc trưng vùng cao và bảo vệ quyền lợi của người dân.', date: '14/03/2026', views: 3200, image: '/thumb2.png', tag: 'Xây dựng' },
        { id: 706, title: 'Kế hoạch 78/KH-UBND: Triển khai PBGDPL, hòa giải cơ sở và xây dựng xã đạt chuẩn tiếp cận pháp luật 2026', summary: 'Kế hoạch xác định rõ mục tiêu, nhiệm vụ, phân công trách nhiệm và nguồn lực cho công tác PBGDPL, hòa giải ở cơ sở và xây dựng xã, phường đạt chuẩn tiếp cận pháp luật năm 2026.', date: '13/03/2026', views: 1980, image: '/thumb3.png', tag: 'Kế hoạch' },
    ],
    'nghien-cuu': [
        { id: 801, title: 'Nghiên cứu hoàn thiện khung pháp lý phát triển kinh tế cửa khẩu tỉnh Lào Cai', summary: 'Các chuyên gia tiếp tục nghiên cứu, đề xuất hoàn thiện chính sách về quản lý khu kinh tế cửa khẩu, logistics và thương mại biên giới, vận dụng vào điều kiện thực tiễn của tỉnh Lào Cai.', date: '17/03/2026', views: 2400, image: '/thumb3.png', tag: 'Nghiên cứu' },
        { id: 802, title: 'Phát triển du lịch bền vững vùng cao: Kinh nghiệm quốc tế và bài học cho Sa Pa', summary: 'Bài nghiên cứu phân tích mô hình quản lý du lịch miền núi của một số quốc gia châu Á, đề xuất giải pháp pháp lý phù hợp để phát triển du lịch Sa Pa gắn với bảo tồn cảnh quan và văn hóa bản địa.', date: '16/03/2026', views: 1890, image: '/thumb1.png', tag: 'So sánh quốc tế' },
        { id: 803, title: 'Đánh giá hiệu quả 2 năm thực thi Luật Đất đai 2024: Tháo gỡ điểm nghẽn trong thực tiễn', summary: 'Sau 2 năm triển khai, nhiều vướng mắc trong thực tiễn đã được phát hiện và xử lý. Bài viết tổng hợp kết quả nghiên cứu và kiến nghị hoàn thiện các quy định còn chưa phù hợp.', date: '15/03/2026', views: 3100, image: '/thumb2.png', tag: 'Đất đai' },
        { id: 804, title: 'Hoàn thiện cơ chế kiểm soát quyền lực nhà nước trong lĩnh vực đất đai và phòng, chống tham nhũng', summary: 'Nghiên cứu đề xuất các giải pháp hoàn thiện cơ chế kiểm soát quyền lực, nâng cao tính minh bạch, trách nhiệm giải trình trong quản lý, sử dụng đất đai.', date: '14/03/2026', views: 2760, image: '/thumb3.png', tag: 'Chống tham nhũng' },
        { id: 805, title: 'Trao đổi về kỹ năng lập luận pháp lý trong giải quyết tranh chấp hành chính tại tòa án', summary: 'Bài viết chia sẻ kinh nghiệm thực tiễn và phương pháp tiếp cận hiệu quả trong việc xây dựng lập luận pháp lý, thu thập chứng cứ và bảo vệ quyền lợi khách hàng trong các vụ án hành chính.', date: '13/03/2026', views: 1650, image: '/thumb1.png', tag: 'Kỹ năng' },
        { id: 806, title: 'Hành lang kinh tế Lào Cai – Hải Phòng: Cơ chế liên kết vùng cho tỉnh cửa ngõ biên giới', summary: 'Đề xuất khung pháp lý và cơ chế điều phối liên vùng cho vùng trung du và miền núi phía Bắc, nhằm tối ưu hóa phân bổ nguồn lực và thúc đẩy phát triển kinh tế toàn vùng.', date: '12/03/2026', views: 1340, image: '/thumb2.png', tag: 'Liên vùng' },
    ],
};

const ITEMS_PER_PAGE = 5;

/* ------------------------------------------------------------------ */
/*  Sticky Sub-Nav – uses Link for real route navigation                 */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Page Component                                                        */
/* ------------------------------------------------------------------ */
const LaoCaiV2NewsCategoryPage = () => {
    const { categorySlug } = useParams();
    const category = LAOCAI_NEWS_CATEGORIES.find((c) => c.id === categorySlug) || LAOCAI_NEWS_CATEGORIES[0];
    const allArticles = CATEGORY_ARTICLES[category.id] || [];
    const featuredMain = allArticles[0];
    const featuredSub = allArticles.slice(1, 4);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = `${category.label} - Cổng Pháp luật Lào Cai`;
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
            <LaoCaiV2Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/lao-cai-v2" className="hover:text-[#2c1b92] transition-colors">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} />
                    <Link to="/lao-cai-v2/tin-tuc" className="hover:text-[#2c1b92] transition-colors">Tin tức &amp; Sự kiện</Link>
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
                        Cập nhật liên tục tin tức, sự kiện và hoạt động pháp luật trong chuyên mục {category.label} của Cổng Pháp luật tỉnh Lào Cai
                    </p>
                </div>
            </div>

            {/* Sub Nav */}
            <LaoCaiV2NewsSubNav activeId={category.id} />

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
                                    <Link to="/lao-cai-v2/tin-tuc" className="text-[13px] text-[#2c1b92] font-bold hover:text-[#4f56ca] flex items-center gap-1.5 w-fit mx-auto">
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

            <LaoCaiV2Footer />
        </div>
    );
};

export default LaoCaiV2NewsCategoryPage;
